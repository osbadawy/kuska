-- CreateTable
CREATE TABLE "NutritionRecipe" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "calories" INTEGER NOT NULL,
    "protein" INTEGER NOT NULL,
    "carbs" INTEGER,
    "fat" INTEGER,
    "prepTime" INTEGER,
    "cookTime" INTEGER,
    "servings" INTEGER,
    "ingredients" TEXT[],
    "instructions" TEXT[],
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NutritionRecipe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NutritionRecipe_slug_key" ON "NutritionRecipe"("slug");

-- CreateIndex
CREATE INDEX "NutritionRecipe_category_idx" ON "NutritionRecipe"("category");

-- CreateIndex
CREATE INDEX "NutritionRecipe_isPublished_idx" ON "NutritionRecipe"("isPublished");

-- CreateIndex
CREATE INDEX "NutritionRecipe_isFeatured_idx" ON "NutritionRecipe"("isFeatured");

-- CreateIndex
CREATE INDEX "NutritionRecipe_createdAt_idx" ON "NutritionRecipe"("createdAt");
