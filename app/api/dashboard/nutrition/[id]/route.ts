import { randomUUID } from "node:crypto";
import { headers } from "next/headers";
import {
  NextRequest,
  NextResponse,
} from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  NUTRITION_BUCKET,
  supabaseAdmin,
} from "@/lib/supabase-admin";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

const MAX_IMAGE_SIZE = 8 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

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

function getRequiredInteger(
  formData: FormData,
  key: string
) {
  const parsed = Number.parseInt(
    getRequiredString(formData, key),
    10
  );

  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new Error(`${key} is invalid.`);
  }

  return parsed;
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

  const parsed = Number.parseInt(value, 10);

  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new Error(`${key} is invalid.`);
  }

  return parsed;
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
      .map((item) => item.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

async function uploadImage(file: File) {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error(
      "Image must be JPG, PNG or WebP."
    );
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error(
      "Image must be smaller than 8 MB."
    );
  }

  const extension =
    file.name.split(".").pop()?.toLowerCase() ||
    "jpg";

  const path = `recipes/${randomUUID()}.${extension}`;

  const buffer = Buffer.from(
    await file.arrayBuffer()
  );

  const { error } = await supabaseAdmin.storage
    .from(NUTRITION_BUCKET)
    .upload(path, buffer, {
      contentType: file.type,
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error(
      "Unable to upload recipe image."
    );
  }

  const { data } = supabaseAdmin.storage
    .from(NUTRITION_BUCKET)
    .getPublicUrl(path);

  return {
    image: data.publicUrl,
    imagePath: path,
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
    const session = await getSession();

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

    const { id } = await context.params;

    const recipe =
      await prisma.nutritionRecipe.findUnique({
        where: {
          id,
        },
      });

    if (!recipe) {
      return NextResponse.json(
        {
          success: false,
          error: "Recipe not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      recipe,
    });
  } catch (error) {
    console.error(
      "GET_NUTRITION_RECIPE_ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Unable to load recipe.",
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
  let newImagePath: string | null = null;

  try {
    const session = await getSession();

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

    const { id } = await context.params;

    const existing =
      await prisma.nutritionRecipe.findUnique({
        where: {
          id,
        },
      });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error: "Recipe not found.",
        },
        {
          status: 404,
        }
      );
    }

    const formData = await request.formData();

    const title = getRequiredString(
      formData,
      "title"
    );

    const description = getOptionalString(
      formData,
      "description"
    );

    const category = getRequiredString(
      formData,
      "category"
    );

    const calories = getRequiredInteger(
      formData,
      "calories"
    );

    const protein = getRequiredInteger(
      formData,
      "protein"
    );

    const carbs = getOptionalInteger(
      formData,
      "carbs"
    );

    const fat = getOptionalInteger(
      formData,
      "fat"
    );

    const prepTime = getOptionalInteger(
      formData,
      "prepTime"
    );

    const cookTime = getOptionalInteger(
      formData,
      "cookTime"
    );

    const servings = getOptionalInteger(
      formData,
      "servings"
    );

    const ingredients = getStringArray(
      formData,
      "ingredients"
    );

    const instructions = getStringArray(
      formData,
      "instructions"
    );

    const isPublished = getBoolean(
      formData,
      "isPublished"
    );

    const isFeatured = getBoolean(
      formData,
      "isFeatured"
    );

    let image = existing.image;
    let imagePath = existing.imagePath;

    const imageValue = formData.get("image");

    if (
      imageValue instanceof File &&
      imageValue.size > 0
    ) {
      const uploadedImage =
        await uploadImage(imageValue);

      image = uploadedImage.image;
      imagePath = uploadedImage.imagePath;
      newImagePath = uploadedImage.imagePath;
    }

    const recipe =
      await prisma.nutritionRecipe.update({
        where: {
          id,
        },

        data: {
          title,
          description,
          category,

          image,
          imagePath,

          calories,
          protein,
          carbs,
          fat,

          prepTime,
          cookTime,
          servings,

          ingredients,
          instructions,

          isPublished,
          isFeatured,
        },
      });

    if (
      newImagePath &&
      existing.imagePath &&
      existing.imagePath !== newImagePath
    ) {
      const { error } = await supabaseAdmin.storage
        .from(NUTRITION_BUCKET)
        .remove([existing.imagePath]);

      if (error) {
        console.error(
          "DELETE_OLD_NUTRITION_IMAGE_ERROR",
          error
        );
      }
    }

    return NextResponse.json({
      success: true,
      recipe,
    });
  } catch (error) {
    if (newImagePath) {
      await supabaseAdmin.storage
        .from(NUTRITION_BUCKET)
        .remove([newImagePath]);
    }

    console.error(
      "UPDATE_NUTRITION_RECIPE_ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to update recipe.",
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
    const session = await getSession();

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

    const { id } = await context.params;

    const existing =
      await prisma.nutritionRecipe.findUnique({
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
          error: "Recipe not found.",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.nutritionRecipe.delete({
      where: {
        id,
      },
    });

    if (existing.imagePath) {
      const { error } = await supabaseAdmin.storage
        .from(NUTRITION_BUCKET)
        .remove([existing.imagePath]);

      if (error) {
        console.error(
          "DELETE_NUTRITION_IMAGE_ERROR",
          error
        );
      }
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "DELETE_NUTRITION_RECIPE_ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Unable to delete recipe.",
      },
      {
        status: 500,
      }
    );
  }
}