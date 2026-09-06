import { randomUUID } from "node:crypto";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  NUTRITION_BUCKET,
  supabaseAdmin,
} from "@/lib/supabase-admin";

export const runtime = "nodejs";

const MAX_IMAGE_SIZE = 8 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

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

  return trimmed.length > 0 ? trimmed : null;
}

function getRequiredInteger(
  formData: FormData,
  key: string
) {
  const raw = getRequiredString(formData, key);

  const value = Number.parseInt(raw, 10);

  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`${key} must be a valid number.`);
  }

  return value;
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
    throw new Error(`${key} must be a valid number.`);
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

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function createUniqueSlug(title: string) {
  const base = createSlug(title) || "recipe";

  let slug = base;
  let index = 2;

  while (
    await prisma.nutritionRecipe.findUnique({
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
    console.error(
      "NUTRITION_IMAGE_UPLOAD_ERROR",
      error
    );

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
   GET
═════════════════════════════════════ */

export async function GET() {
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

    const recipes =
      await prisma.nutritionRecipe.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json({
      success: true,
      recipes,
    });
  } catch (error) {
    console.error(
      "GET_NUTRITION_RECIPES_ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Unable to load recipes.",
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

    const formData = await request.formData();

    const title = getRequiredString(
      formData,
      "title"
    );

    const category = getRequiredString(
      formData,
      "category"
    );

    const description = getOptionalString(
      formData,
      "description"
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

    const imageValue = formData.get("image");

    if (
      !(imageValue instanceof File) ||
      imageValue.size === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Recipe image is required.",
        },
        {
          status: 400,
        }
      );
    }

    const slug = await createUniqueSlug(title);

    const uploadedImage =
      await uploadImage(imageValue);

    try {
      const recipe =
        await prisma.nutritionRecipe.create({
          data: {
            title,
            slug,
            description,

            image: uploadedImage.image,
            imagePath:
              uploadedImage.imagePath,

            category,

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

      return NextResponse.json(
        {
          success: true,
          recipe,
        },
        {
          status: 201,
        }
      );
    } catch (error) {
      await supabaseAdmin.storage
        .from(NUTRITION_BUCKET)
        .remove([uploadedImage.imagePath]);

      throw error;
    }
  } catch (error) {
    console.error(
      "CREATE_NUTRITION_RECIPE_ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to create recipe.",
      },
      {
        status: 400,
      }
    );
  }
}