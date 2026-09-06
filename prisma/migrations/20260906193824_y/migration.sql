-- CreateEnum
CREATE TYPE "RunningContentType" AS ENUM ('GUIDE', 'PLAN', 'JOURNAL', 'CITY_GUIDE', 'CHALLENGE', 'RUN_CLUB_EVENT');

-- CreateEnum
CREATE TYPE "RunningDifficulty" AS ENUM ('ALL_LEVELS', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateTable
CREATE TABLE "RunningContent" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "summary" TEXT,
    "content" TEXT,
    "type" "RunningContentType" NOT NULL,
    "difficulty" "RunningDifficulty" NOT NULL DEFAULT 'ALL_LEVELS',
    "image" TEXT NOT NULL,
    "imagePath" TEXT,
    "durationWeeks" INTEGER,
    "runsPerWeek" INTEGER,
    "distanceKm" DOUBLE PRECISION,
    "location" TEXT,
    "eventDate" TIMESTAMP(3),
    "meetingPoint" TEXT,
    "pace" TEXT,
    "challengeTarget" TEXT,
    "tags" TEXT[],
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RunningContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RunningContent_slug_key" ON "RunningContent"("slug");

-- CreateIndex
CREATE INDEX "RunningContent_type_idx" ON "RunningContent"("type");

-- CreateIndex
CREATE INDEX "RunningContent_difficulty_idx" ON "RunningContent"("difficulty");

-- CreateIndex
CREATE INDEX "RunningContent_isPublished_idx" ON "RunningContent"("isPublished");

-- CreateIndex
CREATE INDEX "RunningContent_isFeatured_idx" ON "RunningContent"("isFeatured");

-- CreateIndex
CREATE INDEX "RunningContent_eventDate_idx" ON "RunningContent"("eventDate");

-- CreateIndex
CREATE INDEX "RunningContent_createdAt_idx" ON "RunningContent"("createdAt");
