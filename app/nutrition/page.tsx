import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Salad,
  Sparkles,
} from "lucide-react";

import { FoodCard } from "@/components/UI/FoodCard";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function NutritionPage() {
  const recipes = await prisma.nutritionRecipe.findMany({
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
    <main className="overflow-hidden bg-[#FAF7F5] text-[#28211F]">
      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}

      <section
        className="
          relative
          overflow-hidden
          bg-[#EDE3DF]
          px-5
          pb-20
          pt-36
          sm:px-8
          lg:px-16
          lg:pb-28
          lg:pt-44
          xl:px-20
        "
      >
        {/* Background glow */}
        <div
          className="
            pointer-events-none
            absolute
            -right-[10%]
            -top-[30%]
            h-[650px]
            w-[650px]
            rounded-full
            bg-[#E7B6AB]/30
            blur-[120px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-[50%]
            left-[5%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-white/60
            blur-[100px]
          "
        />

        <div className="relative mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:items-end">
            <div>
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[#B87E74]/20
                  bg-white/35
                  px-4
                  py-2
                  backdrop-blur-xl
                "
              >
                <Salad
                  size={12}
                  strokeWidth={1.6}
                  className="text-[#B87E74]"
                />

                <span
                  className="
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.22em]
                    text-[#B87E74]
                  "
                >
                  Nutrition
                </span>
              </div>

              <h1
                className="
                  mt-7
                  max-w-[900px]
                  font-serif
                  text-[58px]
                  leading-[0.9]
                  tracking-[-0.05em]
                  sm:text-[76px]
                  lg:text-[92px]
                "
              >
                Eat well.
                <br />

                <span className="italic text-[#B87E74]">
                  Enjoy every bite.
                </span>
              </h1>
            </div>

            <div className="lg:pb-2">
              <p
                className="
                  max-w-[360px]
                  text-sm
                  leading-7
                  text-[#74625C]
                "
              >
                High-protein meals, easy everyday recipes and
                food that fits into real life. Simple nutrition
                without making eating complicated.
              </p>

              <Link
                href="#recipes"
                className="
                  group
                  mt-7
                  inline-flex
                  items-center
                  gap-3
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#28211F]
                "
              >
                Browse recipes

                <span
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-[#28211F]
                    text-white
                    transition-transform
                    duration-300
                    group-hover:translate-y-1
                  "
                >
                  <ArrowDown size={13} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          RECIPES
      ═══════════════════════════════════════ */}

      <section
        id="recipes"
        className="
          px-5
          pb-24
          mt-20
          sm:px-8
          lg:px-16
          lg:pb-32
        "
      >
        <div className="mx-auto max-w-[1440px]">
          {/* Header */}

          <div
            className="
              mb-10
              flex
              flex-col
              justify-between
              gap-6
              border-b
              border-[#28211F]/10
              pb-7
              sm:flex-row
              sm:items-end
            "
          >
            <div>
              <div className="flex items-center gap-2">
                <Sparkles
                  size={13}
                  strokeWidth={1.5}
                  className="text-[#B87E74]"
                />

                <p
                  className="
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.2em]
                    text-[#B87E74]
                  "
                >
                  Kuska&apos;s kitchen
                </p>
              </div>

              <h2
                className="
                  mt-4
                  font-serif
                  text-[42px]
                  tracking-[-0.04em]
                  sm:text-[54px]
                "
              >
                All recipes.
              </h2>
            </div>

            {recipes.length > 0 && (
              <p
                className="
                  text-[11px]
                  uppercase
                  tracking-[0.15em]
                  text-[#8D7B75]
                "
              >
                {recipes.length}{" "}
                {recipes.length === 1
                  ? "recipe"
                  : "recipes"}
              </p>
            )}
          </div>

          {/* Cards */}

          {recipes.length > 0 ? (
            <div
              className="
                grid
                gap-6
                sm:grid-cols-2
                lg:grid-cols-3
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
            <EmptyRecipes />
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BOTTOM CTA
      ═══════════════════════════════════════ */}

      <section
        className="
          px-5
          pb-24
          sm:px-8
          lg:px-16
          lg:pb-32
        "
      >
        <div
          className="
            relative
            mx-auto
            max-w-[1440px]
            overflow-hidden
            rounded-[32px]
            bg-[#28211F]
            px-7
            py-14
            text-white
            sm:px-10
            lg:px-14
            lg:py-16
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              -right-[15%]
              -top-[120%]
              h-[650px]
              w-[650px]
              rounded-full
              bg-[#E7B6AB]/15
              blur-[100px]
            "
          />

          <div
            className="
              relative
              z-10
              grid
              gap-10
              lg:grid-cols-[1fr_auto]
              lg:items-end
            "
          >
            <div>
              <p
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.22em]
                  text-[#E7B6AB]
                "
              >
                More than recipes
              </p>

              <h2
                className="
                  mt-5
                  max-w-[760px]
                  font-serif
                  text-[44px]
                  leading-[0.95]
                  tracking-[-0.04em]
                  sm:text-[56px]
                "
              >
                Food that works with
                <br />

                <span className="italic text-[#E7B6AB]">
                  your life.
                </span>
              </h2>
            </div>

            <Link
              href="/guides"
              className="
                group
                inline-flex
                h-12
                items-center
                gap-3
                rounded-full
                bg-[#E7B6AB]
                px-6
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.15em]
                text-[#28211F]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-white
              "
            >
              Explore guides

              <ArrowUpRight
                size={14}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ═════════════════════════════════════
   EMPTY STATE
═════════════════════════════════════ */

function EmptyRecipes() {
  return (
    <div
      className="
        flex
        min-h-[380px]
        flex-col
        items-center
        justify-center
        rounded-[28px]
        border
        border-dashed
        border-[#28211F]/15
        bg-white/30
        px-6
        text-center
      "
    >
      <div
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-[#E7B6AB]/20
          text-[#B87E74]
        "
      >
        <Salad
          size={19}
          strokeWidth={1.5}
        />
      </div>

      <h3
        className="
          mt-6
          font-serif
          text-[30px]
          tracking-[-0.03em]
        "
      >
        Something good is cooking.
      </h3>

      <p
        className="
          mt-3
          max-w-[400px]
          text-sm
          leading-6
          text-[#7A6C67]
        "
      >
        There aren&apos;t any published recipes yet.
        Check back soon for something delicious.
      </p>
    </div>
  );
}