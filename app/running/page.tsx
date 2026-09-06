import type { Metadata } from "next";

import { RunningPageClient } from "@/components/running/RunningPageClient";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Running | Kuska Motion",
  description:
    "Running guides, training plans, city runs, community events and stories from Kuska Motion.",
};

export default async function RunningPage() {
  const [runningContent, workouts, recipes] =
    await Promise.all([
      prisma.runningContent.findMany({
        where: {
          isPublished: true,
        },

        orderBy: [
          {
            isFeatured: "desc",
          },
          {
            createdAt: "desc",
          },
        ],
      }),

      prisma.workout.findMany({
        where: {
          isPublished: true,
        },

        orderBy: [
          {
            isFeatured: "desc",
          },
          {
            createdAt: "desc",
          },
        ],

        take: 3,

        select: {
          id: true,
          title: true,
          slug: true,
          description: true,

          image: true,

          category: true,
          difficulty: true,

          durationMinutes: true,
          caloriesBurned: true,

          targetAreas: true,

          isFeatured: true,

          _count: {
            select: {
              exercises: true,
            },
          },
        },
      }),

      prisma.nutritionRecipe.findMany({
        where: {
          isPublished: true,
        },

        orderBy: [
          {
            isFeatured: "desc",
          },
          {
            createdAt: "desc",
          },
        ],

        take: 3,

        select: {
          id: true,
          title: true,
          slug: true,
          image: true,
          category: true,
          protein: true,
          calories: true,
        },
      }),
    ]);

  return (
    <RunningPageClient
      runningContent={runningContent.map(
        (item) => ({
          ...item,

          eventDate:
            item.eventDate?.toISOString() ??
            null,

          createdAt:
            item.createdAt.toISOString(),

          updatedAt:
            item.updatedAt.toISOString(),
        })
      )}
      workouts={workouts}
      recipes={recipes}
    />
  );
}