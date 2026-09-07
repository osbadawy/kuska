import Link from "next/link";
import {
  ArrowRight,
  Salad,
} from "lucide-react";

import { EmptyState } from "@/components/UI/EmptyState";
import { FoodCard } from "@/components/UI/FoodCard";
import { prisma } from "@/lib/prisma";

export async function FoodSection() {
  const recipes =
    await prisma.nutritionRecipe.findMany({
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

      take: 4,

      select: {
        id: true,
        title: true,
        slug: true,
        image: true,
        category: true,
        protein: true,
        calories: true,
      },
    });

  return (
    <section className="bg-[#FAF7F5] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1440px]">
        <div
          className="
            grid
            gap-12
            lg:grid-cols-[280px_1fr]
            lg:gap-16
          "
        >
          {/* Intro */}

          <div className="flex flex-col justify-between">
            <div>
              <p
                className="
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-[0.22em]
                  text-[#C58F85]
                "
              >
                Nutrition
              </p>

              <h2
                className="
                  mt-4
                  font-serif
                  text-[44px]
                  leading-[0.98]
                  tracking-[-0.03em]
                  text-[#28211F]
                  sm:text-[52px]
                "
              >
                Fuel your body.
                <br />

                <span className="italic text-[#B87E74]">
                  Love your food.
                </span>
              </h2>

              <p
                className="
                  mt-6
                  max-w-[260px]
                  text-sm
                  leading-6
                  text-[#7A6C67]
                "
              >
                Simple, high-protein recipes made for real
                life. Balanced food without unnecessary
                restriction.
              </p>
            </div>

            {recipes.length > 0 && (
              <Link
                href="/nutrition"
                className="
                  group
                  mt-8
                  inline-flex
                  w-fit
                  items-center
                  gap-3
                  rounded-full
                  bg-[#D8A399]
                  px-6
                  py-3
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-white
                  transition
                  hover:bg-[#C98F84]
                "
              >
                Browse recipes

                <ArrowRight
                  size={15}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>
            )}
          </div>

          {/* Recipe cards / empty state */}

          {recipes.length > 0 ? (
            <div
              className="
                grid
                gap-5
                sm:grid-cols-2
                xl:grid-cols-4
              "
            >
              {recipes.map((recipe) => (
                <FoodCard
                  key={recipe.id}
                  title={recipe.title}
                  image={recipe.image}
                  category={recipe.category}
                  protein={recipe.protein}
                  calories={recipe.calories}
                  href={`/nutrition/${recipe.slug}`}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Salad}
              title="Something good is cooking."
              description="There aren't any published recipes yet. Check back soon for something delicious."
            />
          )}
        </div>
      </div>
    </section>
  );
}