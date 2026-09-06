import { randomUUID } from "node:crypto";
import { headers } from "next/headers";
import {
  NextRequest,
  NextResponse,
} from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  RUNNING_BUCKET,
  supabaseAdmin,
} from "@/lib/supabase-admin";

export const runtime = "nodejs";

const MAX_IMAGE_SIZE = 8 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const RUNNING_TYPES = [
  "GUIDE",
  "PLAN",
  "JOURNAL",
  "CITY_GUIDE",
  "CHALLENGE",
  "RUN_CLUB_EVENT",
] as const;

const RUNNING_DIFFICULTIES = [
  "ALL_LEVELS",
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
] as const;

type RunningContentType =
  (typeof RUNNING_TYPES)[number];

type RunningDifficulty =
  (typeof RUNNING_DIFFICULTIES)[number];

async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

function getRequiredString(
  formData: FormData,
  key: string
) {
  const value = formData.get(key);

  if (
    typeof value !== "string" ||
    value.trim().length === 0
  ) {
    throw new Error(`${key} is required.`);
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

  return trimmed || null;
}

function getOptionalInteger(
  formData: FormData,
  key: string
) {
  const raw = formData.get(key);

  if (
    typeof raw !== "string" ||
    !raw.trim()
  ) {
    return null;
  }

  const value = Number.parseInt(raw, 10);

  if (
    !Number.isFinite(value) ||
    value < 0
  ) {
    throw new Error(
      `${key} must be a valid number.`
    );
  }

  return value;
}

function getOptionalFloat(
  formData: FormData,
  key: string
) {
  const raw = formData.get(key);

  if (
    typeof raw !== "string" ||
    !raw.trim()
  ) {
    return null;
  }

  const value = Number.parseFloat(raw);

  if (
    !Number.isFinite(value) ||
    value < 0
  ) {
    throw new Error(
      `${key} must be a valid number.`
    );
  }

  return value;
}

function getOptionalDate(
  formData: FormData,
  key: string
) {
  const raw = formData.get(key);

  if (
    typeof raw !== "string" ||
    !raw.trim()
  ) {
    return null;
  }

  const date = new Date(raw);

  if (
    Number.isNaN(date.getTime())
  ) {
    throw new Error(
      `${key} must be a valid date.`
    );
  }

  return date;
}

function getBoolean(
  formData: FormData,
  key: string
) {
  return formData.get(key) === "true";
}

function getStringArray(
  formData: FormData,
  key: string
) {
  const raw = formData.get(key);

  if (typeof raw !== "string") {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter(
        (item): item is string =>
          typeof item === "string"
      )
      .map((item) => item.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

function getType(
  formData: FormData
): RunningContentType {
  const value = getRequiredString(
    formData,
    "type"
  ).toUpperCase();

  if (
    !RUNNING_TYPES.includes(
      value as RunningContentType
    )
  ) {
    throw new Error(
      "Invalid running content type."
    );
  }

  return value as RunningContentType;
}

function getDifficulty(
  formData: FormData
): RunningDifficulty {
  const value = getRequiredString(
    formData,
    "difficulty"
  ).toUpperCase();

  if (
    !RUNNING_DIFFICULTIES.includes(
      value as RunningDifficulty
    )
  ) {
    throw new Error(
      "Invalid running difficulty."
    );
  }

  return value as RunningDifficulty;
}

function createSlug(value: string) {
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
    createSlug(title) ||
    "running";

  let slug = base;
  let index = 2;

  while (
    await prisma.runningContent.findUnique({
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
    `content/${randomUUID()}.${extension}`;

  const buffer = Buffer.from(
    await file.arrayBuffer()
  );

  const {
    data,
    error,
  } = await supabaseAdmin.storage
    .from(RUNNING_BUCKET)
    .upload(path, buffer, {
      contentType: file.type,
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error(
      "RUNNING_IMAGE_UPLOAD_ERROR",
      error
    );

    throw new Error(
      `Unable to upload image: ${error.message}`
    );
  }

  const {
    data: publicData,
  } = supabaseAdmin.storage
    .from(RUNNING_BUCKET)
    .getPublicUrl(data.path);

  return {
    image: publicData.publicUrl,
    imagePath: data.path,
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

    const content =
      await prisma.runningContent.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json({
      success: true,
      content,
    });
  } catch (error) {
    console.error(
      "GET_RUNNING_CONTENT_ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to load running content.",
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

    const type =
      getType(formData);

    const difficulty =
      getDifficulty(formData);

    const summary =
      getOptionalString(
        formData,
        "summary"
      );

    const content =
      getOptionalString(
        formData,
        "content"
      );

    const durationWeeks =
      getOptionalInteger(
        formData,
        "durationWeeks"
      );

    const runsPerWeek =
      getOptionalInteger(
        formData,
        "runsPerWeek"
      );

    const distanceKm =
      getOptionalFloat(
        formData,
        "distanceKm"
      );

    const location =
      getOptionalString(
        formData,
        "location"
      );

    const eventDate =
      getOptionalDate(
        formData,
        "eventDate"
      );

    const meetingPoint =
      getOptionalString(
        formData,
        "meetingPoint"
      );

    const pace =
      getOptionalString(
        formData,
        "pace"
      );

    const challengeTarget =
      getOptionalString(
        formData,
        "challengeTarget"
      );

    const tags =
      getStringArray(
        formData,
        "tags"
      );

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
            "Running image is required.",
        },
        {
          status: 400,
        }
      );
    }

    const slug =
      await createUniqueSlug(title);

    const uploadedImage =
      await uploadImage(
        imageValue
      );

    try {
      const runningContent =
        await prisma.runningContent.create({
          data: {
            title,
            slug,
            summary,
            content,

            type,
            difficulty,

            image:
              uploadedImage.image,

            imagePath:
              uploadedImage.imagePath,

            durationWeeks,
            runsPerWeek,
            distanceKm,

            location,
            eventDate,
            meetingPoint,
            pace,

            challengeTarget,

            tags,

            isPublished,
            isFeatured,
          },
        });

      return NextResponse.json(
        {
          success: true,
          content:
            runningContent,
        },
        {
          status: 201,
        }
      );
    } catch (error) {
      await supabaseAdmin.storage
        .from(RUNNING_BUCKET)
        .remove([
          uploadedImage.imagePath,
        ]);

      throw error;
    }
  } catch (error) {
    console.error(
      "CREATE_RUNNING_CONTENT_ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Unable to create running content.",
      },
      {
        status: 400,
      }
    );
  }
}