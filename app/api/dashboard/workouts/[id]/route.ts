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

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

const MAX_IMAGE_SIZE =
  8 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const DIFFICULTIES = [
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
] as const;

type Difficulty =
  (typeof DIFFICULTIES)[number];

type ExerciseInput = {
  name: string;
  sets: number | null;
  reps: string | null;
  durationSeconds: number | null;
  restSeconds: number | null;
  notes: string | null;
  order: number;
};

async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

function requiredString(
  formData: FormData,
  key: string
) {
  const value =
    formData.get(key);

  if (
    typeof value !== "string" ||
    !value.trim()
  ) {
    throw new Error(
      `${key} is required.`
    );
  }

  return value.trim();
}

function optionalString(
  formData: FormData,
  key: string
) {
  const value =
    formData.get(key);

  if (
    typeof value !== "string"
  ) {
    return null;
  }

  return value.trim() || null;
}

function optionalInteger(
  formData: FormData,
  key: string
) {
  const raw =
    formData.get(key);

  if (
    typeof raw !== "string" ||
    !raw.trim()
  ) {
    return null;
  }

  const value =
    Number.parseInt(raw, 10);

  if (
    !Number.isFinite(value) ||
    value < 0
  ) {
    throw new Error(
      `${key} is invalid.`
    );
  }

  return value;
}

function booleanValue(
  formData: FormData,
  key: string
) {
  return (
    formData.get(key) === "true"
  );
}

function stringArray(
  formData: FormData,
  key: string
) {
  const value =
    formData.get(key);

  if (
    typeof value !== "string"
  ) {
    return [];
  }

  try {
    const parsed =
      JSON.parse(value);

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

function nullableNumber(
  value: unknown
) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  const parsed = Number(value);

  return Number.isFinite(parsed) &&
    parsed >= 0
    ? Math.floor(parsed)
    : null;
}

function exercisesFromForm(
  formData: FormData
): ExerciseInput[] {
  const raw =
    formData.get("exercises");

  if (
    typeof raw !== "string"
  ) {
    return [];
  }

  try {
    const parsed =
      JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((item, index) => {
        if (
          !item ||
          typeof item !== "object"
        ) {
          return null;
        }

        const value =
          item as Record<
            string,
            unknown
          >;

        const name =
          typeof value.name ===
            "string"
            ? value.name.trim()
            : "";

        if (!name) {
          return null;
        }

        return {
          name,

          sets:
            nullableNumber(
              value.sets
            ),

          reps:
            typeof value.reps ===
              "string" &&
            value.reps.trim()
              ? value.reps.trim()
              : null,

          durationSeconds:
            nullableNumber(
              value.durationSeconds
            ),

          restSeconds:
            nullableNumber(
              value.restSeconds
            ),

          notes:
            typeof value.notes ===
              "string" &&
            value.notes.trim()
              ? value.notes.trim()
              : null,

          order: index,
        };
      })
      .filter(
        (
          exercise
        ): exercise is ExerciseInput =>
          exercise !== null
      );
  } catch {
    return [];
  }
}

function difficultyFromForm(
  formData: FormData
): Difficulty {
  const value =
    requiredString(
      formData,
      "difficulty"
    ).toUpperCase();

  if (
    !DIFFICULTIES.includes(
      value as Difficulty
    )
  ) {
    throw new Error(
      "Invalid difficulty."
    );
  }

  return value as Difficulty;
}

async function uploadImage(
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
    data,
    error,
  } =
    await supabaseAdmin.storage
      .from(WORKOUT_BUCKET)
      .upload(path, buffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      });

  if (error) {
    throw new Error(
      `Unable to upload image: ${error.message}`
    );
  }

  const {
    data: publicData,
  } =
    supabaseAdmin.storage
      .from(WORKOUT_BUCKET)
      .getPublicUrl(data.path);

  return {
    image:
      publicData.publicUrl,
    imagePath: data.path,
  };
}

/* ═════════════════════════════════════
   GET ONE
═════════════════════════════════════ */

export async function GET(
  _request: NextRequest,
  context: RouteContext
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

    const { id } =
      await context.params;

    const workout =
      await prisma.workout.findUnique(
        {
          where: {
            id,
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

    if (!workout) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Workout not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      workout,
    });
  } catch (error) {
    console.error(
      "GET_WORKOUT_ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to load workout.",
      },
      {
        status: 500,
      }
    );
  }
}

/* ═════════════════════════════════════
   PUT
═════════════════════════════════════ */

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  let newImagePath:
    | string
    | null = null;

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

    const { id } =
      await context.params;

    const existing =
      await prisma.workout.findUnique(
        {
          where: {
            id,
          },
        }
      );

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Workout not found.",
        },
        {
          status: 404,
        }
      );
    }

    const formData =
      await request.formData();

    const title =
      requiredString(
        formData,
        "title"
      );

    const description =
      optionalString(
        formData,
        "description"
      );

    const category =
      requiredString(
        formData,
        "category"
      );

    const difficulty =
      difficultyFromForm(
        formData
      );

    const durationMinutes =
      optionalInteger(
        formData,
        "durationMinutes"
      );

    const caloriesBurned =
      optionalInteger(
        formData,
        "caloriesBurned"
      );

    const equipment =
      stringArray(
        formData,
        "equipment"
      );

    const targetAreas =
      stringArray(
        formData,
        "targetAreas"
      );

    const exercises =
      exercisesFromForm(
        formData
      );

    if (
      exercises.length === 0
    ) {
      throw new Error(
        "Add at least one exercise."
      );
    }

    const isPublished =
      booleanValue(
        formData,
        "isPublished"
      );

    const isFeatured =
      booleanValue(
        formData,
        "isFeatured"
      );

    let image =
      existing.image;

    let imagePath =
      existing.imagePath;

    const imageValue =
      formData.get("image");

    if (
      imageValue instanceof File &&
      imageValue.size > 0
    ) {
      const uploaded =
        await uploadImage(
          imageValue
        );

      image =
        uploaded.image;

      imagePath =
        uploaded.imagePath;

      newImagePath =
        uploaded.imagePath;
    }

    const workout =
      await prisma.workout.update({
        where: {
          id,
        },

        data: {
          title,
          description,

          category,
          difficulty,

          image,
          imagePath,

          durationMinutes,
          caloriesBurned,

          equipment,
          targetAreas,

          isPublished,
          isFeatured,

          exercises: {
            deleteMany: {},

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

    if (
      newImagePath &&
      existing.imagePath &&
      existing.imagePath !==
        newImagePath
    ) {
      const { error } =
        await supabaseAdmin.storage
          .from(WORKOUT_BUCKET)
          .remove([
            existing.imagePath,
          ]);

      if (error) {
        console.error(
          "DELETE_OLD_WORKOUT_IMAGE_ERROR",
          error
        );
      }
    }

    return NextResponse.json({
      success: true,
      workout,
    });
  } catch (error) {
    if (newImagePath) {
      await supabaseAdmin.storage
        .from(WORKOUT_BUCKET)
        .remove([
          newImagePath,
        ]);
    }

    console.error(
      "UPDATE_WORKOUT_ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Unable to update workout.",
      },
      {
        status: 400,
      }
    );
  }
}

/* ═════════════════════════════════════
   DELETE
═════════════════════════════════════ */

export async function DELETE(
  _request: NextRequest,
  context: RouteContext
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

    const { id } =
      await context.params;

    const existing =
      await prisma.workout.findUnique(
        {
          where: {
            id,
          },

          select: {
            id: true,
            imagePath: true,
          },
        }
      );

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Workout not found.",
        },
        {
          status: 404,
        }
      );
    }

    /*
      WorkoutExercise records are removed
      automatically because of onDelete: Cascade.
    */
    await prisma.workout.delete({
      where: {
        id,
      },
    });

    if (existing.imagePath) {
      const { error } =
        await supabaseAdmin.storage
          .from(WORKOUT_BUCKET)
          .remove([
            existing.imagePath,
          ]);

      if (error) {
        console.error(
          "DELETE_WORKOUT_IMAGE_ERROR",
          error
        );
      }
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "DELETE_WORKOUT_ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to delete workout.",
      },
      {
        status: 500,
      }
    );
  }
}