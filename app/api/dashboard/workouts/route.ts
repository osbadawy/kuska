import { randomUUID } from "node:crypto";
import { headers } from "next/headers";
import {
  NextRequest,
  NextResponse,
} from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  supabaseAdmin,
  WORKOUT_BUCKET,
} from "@/lib/supabase-admin";

export const runtime = "nodejs";

const MAX_IMAGE_SIZE =
  8 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const WORKOUT_DIFFICULTIES = [
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
] as const;

type WorkoutDifficulty =
  (typeof WORKOUT_DIFFICULTIES)[number];

type WorkoutExerciseInput = {
  name: string;
  sets: number | null;
  reps: string | null;
  durationSeconds: number | null;
  restSeconds: number | null;
  notes: string | null;
  order: number;
};

/* ═════════════════════════════════════
   AUTH
═════════════════════════════════════ */

async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

/* ═════════════════════════════════════
   HELPERS
═════════════════════════════════════ */

function getRequiredString(
  formData: FormData,
  key: string
) {
  const value = formData.get(key);

  if (
    typeof value !== "string" ||
    value.trim().length === 0
  ) {
    throw new Error(
      `${key} is required.`
    );
  }

  return value.trim();
}

function getOptionalString(
  formData: FormData,
  key: string
) {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  return trimmed.length > 0
    ? trimmed
    : null;
}

function getOptionalInteger(
  formData: FormData,
  key: string
) {
  const value = formData.get(key);

  if (
    typeof value !== "string" ||
    value.trim() === ""
  ) {
    return null;
  }

  const parsed = Number.parseInt(
    value,
    10
  );

  if (
    !Number.isFinite(parsed) ||
    parsed < 0
  ) {
    throw new Error(
      `${key} must be a valid number.`
    );
  }

  return parsed;
}

function getBoolean(
  formData: FormData,
  key: string
) {
  return (
    formData.get(key) === "true"
  );
}

function getStringArray(
  formData: FormData,
  key: string
) {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return [];
  }

  try {
    const parsed = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter(
        (item): item is string =>
          typeof item === "string"
      )
      .map((item) =>
        item.trim()
      )
      .filter(Boolean);
  } catch {
    return [];
  }
}

function getDifficulty(
  formData: FormData
): WorkoutDifficulty {
  const value =
    getRequiredString(
      formData,
      "difficulty"
    ).toUpperCase();

  if (
    !WORKOUT_DIFFICULTIES.includes(
      value as WorkoutDifficulty
    )
  ) {
    throw new Error(
      "Invalid workout difficulty."
    );
  }

  return value as WorkoutDifficulty;
}

function parseNullableInteger(
  value: unknown
) {
  if (
    typeof value !== "number" &&
    typeof value !== "string"
  ) {
    return null;
  }

  if (
    value === "" ||
    value === null
  ) {
    return null;
  }

  const parsed = Number(value);

  if (
    !Number.isFinite(parsed) ||
    parsed < 0
  ) {
    return null;
  }

  return Math.floor(parsed);
}

function getExercises(
  formData: FormData
): WorkoutExerciseInput[] {
  const value =
    formData.get("exercises");

  if (typeof value !== "string") {
    return [];
  }

  try {
    const parsed = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map(
        (
          item: unknown,
          index: number
        ) => {
          if (
            !item ||
            typeof item !== "object"
          ) {
            return null;
          }

          const exercise =
            item as Record<
              string,
              unknown
            >;

          const name =
            typeof exercise.name ===
            "string"
              ? exercise.name.trim()
              : "";

          if (!name) {
            return null;
          }

          return {
            name,

            sets:
              parseNullableInteger(
                exercise.sets
              ),

            reps:
              typeof exercise.reps ===
                "string" &&
              exercise.reps.trim()
                ? exercise.reps.trim()
                : null,

            durationSeconds:
              parseNullableInteger(
                exercise.durationSeconds
              ),

            restSeconds:
              parseNullableInteger(
                exercise.restSeconds
              ),

            notes:
              typeof exercise.notes ===
                "string" &&
              exercise.notes.trim()
                ? exercise.notes.trim()
                : null,

            order: index,
          };
        }
      )
      .filter(
        (
          item
        ): item is WorkoutExerciseInput =>
          item !== null
      );
  } catch {
    return [];
  }
}

function createSlug(
  value: string
) {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .replace(
      /[^a-z0-9]+/g,
      "-"
    )
    .replace(
      /^-+|-+$/g,
      ""
    );
}

async function createUniqueSlug(
  title: string
) {
  const base =
    createSlug(title) || "workout";

  let slug = base;
  let index = 2;

  while (
    await prisma.workout.findUnique({
      where: {
        slug,
      },

      select: {
        id: true,
      },
    })
  ) {
    slug = `${base}-${index}`;
    index += 1;
  }

  return slug;
}

async function uploadWorkoutImage(
  file: File
) {
  if (
    !ALLOWED_IMAGE_TYPES.includes(
      file.type
    )
  ) {
    throw new Error(
      "Image must be JPG, PNG or WebP."
    );
  }

  if (
    file.size > MAX_IMAGE_SIZE
  ) {
    throw new Error(
      "Image must be smaller than 8 MB."
    );
  }

  const extension =
    file.name
      .split(".")
      .pop()
      ?.toLowerCase() ||
    "jpg";

  const path =
    `covers/${randomUUID()}.${extension}`;

  const buffer = Buffer.from(
    await file.arrayBuffer()
  );

  const {
    data: uploadData,
    error: uploadError,
  } =
    await supabaseAdmin.storage
      .from(WORKOUT_BUCKET)
      .upload(path, buffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      });

  if (uploadError) {
    console.error(
      "WORKOUT_IMAGE_UPLOAD_ERROR",
      uploadError
    );

    throw new Error(
      `Unable to upload workout image: ${uploadError.message}`
    );
  }

  const {
    data: publicUrlData,
  } =
    supabaseAdmin.storage
      .from(WORKOUT_BUCKET)
      .getPublicUrl(
        uploadData.path
      );

  return {
    image:
      publicUrlData.publicUrl,

    imagePath:
      uploadData.path,
  };
}

/* ═════════════════════════════════════
   GET
═════════════════════════════════════ */

export async function GET() {
  try {
    const session =
      await getSession();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    const workouts =
      await prisma.workout.findMany(
        {
          orderBy: {
            createdAt: "desc",
          },

          include: {
            exercises: {
              orderBy: {
                order: "asc",
              },
            },
          },
        }
      );

    return NextResponse.json({
      success: true,
      workouts,
    });
  } catch (error) {
    console.error(
      "GET_WORKOUTS_ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to load workouts.",
      },
      {
        status: 500,
      }
    );
  }
}

/* ═════════════════════════════════════
   POST
═════════════════════════════════════ */

export async function POST(
  request: NextRequest
) {
  try {
    const session =
      await getSession();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    const formData =
      await request.formData();

    const title =
      getRequiredString(
        formData,
        "title"
      );

    const category =
      getRequiredString(
        formData,
        "category"
      );

    const difficulty =
      getDifficulty(formData);

    const description =
      getOptionalString(
        formData,
        "description"
      );

    const durationMinutes =
      getOptionalInteger(
        formData,
        "durationMinutes"
      );

    const caloriesBurned =
      getOptionalInteger(
        formData,
        "caloriesBurned"
      );

    const equipment =
      getStringArray(
        formData,
        "equipment"
      );

    const targetAreas =
      getStringArray(
        formData,
        "targetAreas"
      );

    const exercises =
      getExercises(formData);

    const isPublished =
      getBoolean(
        formData,
        "isPublished"
      );

    const isFeatured =
      getBoolean(
        formData,
        "isFeatured"
      );

    const imageValue =
      formData.get("image");

    if (
      !(imageValue instanceof File) ||
      imageValue.size === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Workout image is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      exercises.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Add at least one exercise.",
        },
        {
          status: 400,
        }
      );
    }

    const slug =
      await createUniqueSlug(
        title
      );

    const uploadedImage =
      await uploadWorkoutImage(
        imageValue
      );

    try {
      const workout =
        await prisma.workout.create({
          data: {
            title,
            slug,
            description,

            image:
              uploadedImage.image,

            imagePath:
              uploadedImage.imagePath,

            category,
            difficulty,

            durationMinutes,
            caloriesBurned,

            equipment,
            targetAreas,

            isPublished,
            isFeatured,

            exercises: {
              create:
                exercises.map(
                  (exercise) => ({
                    name:
                      exercise.name,

                    sets:
                      exercise.sets,

                    reps:
                      exercise.reps,

                    durationSeconds:
                      exercise.durationSeconds,

                    restSeconds:
                      exercise.restSeconds,

                    notes:
                      exercise.notes,

                    order:
                      exercise.order,
                  })
                ),
            },
          },

          include: {
            exercises: {
              orderBy: {
                order: "asc",
              },
            },
          },
        });

      return NextResponse.json(
        {
          success: true,
          workout,
        },
        {
          status: 201,
        }
      );
    } catch (error) {
      await supabaseAdmin.storage
        .from(WORKOUT_BUCKET)
        .remove([
          uploadedImage.imagePath,
        ]);

      throw error;
    }
  } catch (error) {
    console.error(
      "CREATE_WORKOUT_ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Unable to create workout.",
      },
      {
        status: 400,
      }
    );
  }
}