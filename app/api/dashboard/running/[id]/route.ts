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

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

const TYPES = [
  "GUIDE",
  "PLAN",
  "JOURNAL",
  "CITY_GUIDE",
  "CHALLENGE",
  "RUN_CLUB_EVENT",
] as const;

const DIFFICULTIES = [
  "ALL_LEVELS",
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
] as const;

type RunningType =
  (typeof TYPES)[number];

type RunningDifficulty =
  (typeof DIFFICULTIES)[number];

const MAX_IMAGE_SIZE =
  8 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

function requiredString(
  data: FormData,
  key: string
) {
  const value = data.get(key);

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
  data: FormData,
  key: string
) {
  const value = data.get(key);

  if (
    typeof value !== "string"
  ) {
    return null;
  }

  return value.trim() || null;
}

function optionalInteger(
  data: FormData,
  key: string
) {
  const raw = data.get(key);

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

function optionalFloat(
  data: FormData,
  key: string
) {
  const raw = data.get(key);

  if (
    typeof raw !== "string" ||
    !raw.trim()
  ) {
    return null;
  }

  const value =
    Number.parseFloat(raw);

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

function optionalDate(
  data: FormData,
  key: string
) {
  const raw = data.get(key);

  if (
    typeof raw !== "string" ||
    !raw.trim()
  ) {
    return null;
  }

  const value = new Date(raw);

  if (
    Number.isNaN(value.getTime())
  ) {
    throw new Error(
      `${key} is invalid.`
    );
  }

  return value;
}

function booleanValue(
  data: FormData,
  key: string
) {
  return data.get(key) === "true";
}

function stringArray(
  data: FormData,
  key: string
) {
  const raw = data.get(key);

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

function contentType(
  data: FormData
): RunningType {
  const value =
    requiredString(
      data,
      "type"
    ).toUpperCase();

  if (
    !TYPES.includes(
      value as RunningType
    )
  ) {
    throw new Error(
      "Invalid content type."
    );
  }

  return value as RunningType;
}

function difficultyValue(
  data: FormData
): RunningDifficulty {
  const value =
    requiredString(
      data,
      "difficulty"
    ).toUpperCase();

  if (
    !DIFFICULTIES.includes(
      value as RunningDifficulty
    )
  ) {
    throw new Error(
      "Invalid difficulty."
    );
  }

  return value as RunningDifficulty;
}

async function uploadImage(
  file: File
) {
  if (
    !ALLOWED_TYPES.includes(
      file.type
    )
  ) {
    throw new Error(
      "Image must be JPG, PNG or WebP."
    );
  }

  if (
    file.size >
    MAX_IMAGE_SIZE
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

  const buffer =
    Buffer.from(
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

    const content =
      await prisma.runningContent.findUnique({
        where: {
          id,
        },
      });

    if (!content) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Running content not found.",
        },
        {
          status: 404,
        }
      );
    }

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
   UPDATE
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
      await prisma.runningContent.findUnique({
        where: {
          id,
        },
      });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Running content not found.",
        },
        {
          status: 404,
        }
      );
    }

    const data =
      await request.formData();

    const title =
      requiredString(
        data,
        "title"
      );

    let image =
      existing.image;

    let imagePath =
      existing.imagePath;

    const imageValue =
      data.get("image");

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

    const content =
      await prisma.runningContent.update({
        where: {
          id,
        },

        data: {
          title,

          summary:
            optionalString(
              data,
              "summary"
            ),

          content:
            optionalString(
              data,
              "content"
            ),

          type:
            contentType(data),

          difficulty:
            difficultyValue(
              data
            ),

          image,
          imagePath,

          durationWeeks:
            optionalInteger(
              data,
              "durationWeeks"
            ),

          runsPerWeek:
            optionalInteger(
              data,
              "runsPerWeek"
            ),

          distanceKm:
            optionalFloat(
              data,
              "distanceKm"
            ),

          location:
            optionalString(
              data,
              "location"
            ),

          eventDate:
            optionalDate(
              data,
              "eventDate"
            ),

          meetingPoint:
            optionalString(
              data,
              "meetingPoint"
            ),

          pace:
            optionalString(
              data,
              "pace"
            ),

          challengeTarget:
            optionalString(
              data,
              "challengeTarget"
            ),

          tags:
            stringArray(
              data,
              "tags"
            ),

          isPublished:
            booleanValue(
              data,
              "isPublished"
            ),

          isFeatured:
            booleanValue(
              data,
              "isFeatured"
            ),
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
          .from(
            RUNNING_BUCKET
          )
          .remove([
            existing.imagePath,
          ]);

      if (error) {
        console.error(
          "DELETE_OLD_RUNNING_IMAGE_ERROR",
          error
        );
      }
    }

    return NextResponse.json({
      success: true,
      content,
    });
  } catch (error) {
    if (newImagePath) {
      await supabaseAdmin.storage
        .from(RUNNING_BUCKET)
        .remove([
          newImagePath,
        ]);
    }

    console.error(
      "UPDATE_RUNNING_CONTENT_ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Unable to update running content.",
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
      await prisma.runningContent.findUnique({
        where: {
          id,
        },

        select: {
          id: true,
          imagePath: true,
        },
      });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Running content not found.",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.runningContent.delete({
      where: {
        id,
      },
    });

    if (existing.imagePath) {
      const { error } =
        await supabaseAdmin.storage
          .from(
            RUNNING_BUCKET
          )
          .remove([
            existing.imagePath,
          ]);

      if (error) {
        console.error(
          "DELETE_RUNNING_IMAGE_ERROR",
          error
        );
      }
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "DELETE_RUNNING_CONTENT_ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to delete running content.",
      },
      {
        status: 500,
      }
    );
  }
}