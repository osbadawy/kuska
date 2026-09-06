import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChefHat,
  Clock3,
  Flame,
  Salad,
  Sparkles,
  Timer,
  UsersRound,
} from "lucide-react";

import { FoodCard } from "@/components/UI/FoodCard";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type RecipePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/* ═════════════════════════════════════
   METADATA
═════════════════════════════════════ */

export async function generateMetadata({
  params,
}: RecipePageProps): Promise<Metadata> {
  const { slug } = await params;

  const recipe =
    await prisma.nutritionRecipe.findFirst({
      where: {
        slug,
        isPublished: true,
      },

      select: {
        title: true,
        description: true,
        image: true,
      },
    });

  if (!recipe) {
    return {
      title: "Recipe not found | Kuska Motion",
    };
  }

  return {
    title: `${recipe.title} | Kuska Motion`,

    description:
      recipe.description ||
      `Discover ${recipe.title}, a Kuska Motion recipe.`,

    openGraph: {
      title: recipe.title,
      description:
        recipe.description ||
        `Discover ${recipe.title} from Kuska Motion.`,
      images: [
        {
          url: recipe.image,
        },
      ],
    },
  };
}

/* ═════════════════════════════════════
   PAGE
═════════════════════════════════════ */

export default async function RecipePage({
  params,
}: RecipePageProps) {
  const { slug } = await params;

  const recipe =
    await prisma.nutritionRecipe.findFirst({
      where: {
        slug,
        isPublished: true,
      },
    });

  if (!recipe) {
    notFound();
  }

  const relatedRecipes =
    await prisma.nutritionRecipe.findMany({
      where: {
        isPublished: true,

        id: {
          not: recipe.id,
        },

        category: recipe.category,
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

  const totalTime =
    (recipe.prepTime || 0) +
    (recipe.cookTime || 0);

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
          pb-16
          pt-32
          sm:px-8
          lg:px-16
          lg:pb-24
          lg:pt-40
          xl:px-20
        "
      >
        {/* atmosphere */}

        <div
          className="
            pointer-events-none
            absolute
            -right-[10%]
            -top-[30%]
            h-[700px]
            w-[700px]
            rounded-full
            bg-[#E7B6AB]/30
            blur-[120px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-[70%]
            left-[5%]
            h-[600px]
            w-[600px]
            rounded-full
            bg-white/70
            blur-[110px]
          "
        />

        <div className="relative mx-auto max-w-[1440px]">
          {/* breadcrumb */}

          <Link
            href="/nutrition"
            className="
              group
              inline-flex
              items-center
              gap-2
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-[#796760]
              transition-colors
              hover:text-[#B87E74]
            "
          >
            <ArrowLeft
              size={13}
              className="
                transition-transform
                duration-300
                group-hover:-translate-x-1
              "
            />

            All recipes
          </Link>

          <div
            className="
              mt-9
              grid
              gap-12
              lg:grid-cols-[0.85fr_1.15fr]
              lg:items-end
              lg:gap-16
            "
          >
            {/* COPY */}

            <div className="lg:pb-8">
              <div className="flex flex-wrap items-center gap-3">
                <span
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
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.18em]
                    text-[#B87E74]
                    backdrop-blur-xl
                  "
                >
                  <Salad
                    size={12}
                    strokeWidth={1.5}
                  />

                  {recipe.category}
                </span>

                {recipe.isFeatured && (
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-[#28211F]/10
                      bg-white/30
                      px-4
                      py-2
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.16em]
                      text-[#6F5D57]
                    "
                  >
                    <Sparkles
                      size={11}
                      className="text-[#B87E74]"
                    />

                    Kuska favourite
                  </span>
                )}
              </div>

              <h1
                className="
                  mt-7
                  max-w-[720px]
                  font-serif
                  text-[52px]
                  leading-[0.92]
                  tracking-[-0.05em]
                  sm:text-[68px]
                  lg:text-[78px]
                "
              >
                {recipe.title}
              </h1>

              {recipe.description && (
                <p
                  className="
                    mt-7
                    max-w-[600px]
                    text-sm
                    leading-7
                    text-[#74625C]
                    sm:text-[15px]
                  "
                >
                  {recipe.description}
                </p>
              )}

              {/* quick facts */}

              <div
                className="
                  mt-9
                  grid
                  max-w-[620px]
                  grid-cols-2
                  gap-px
                  overflow-hidden
                  rounded-[22px]
                  border
                  border-[#28211F]/10
                  bg-[#28211F]/10
                  sm:grid-cols-4
                "
              >
                <HeroStat
                  label="Calories"
                  value={`${recipe.calories}`}
                  suffix="kcal"
                />

                <HeroStat
                  label="Protein"
                  value={`${recipe.protein}`}
                  suffix="g"
                />

                {recipe.prepTime !== null && (
                  <HeroStat
                    label="Prep"
                    value={`${recipe.prepTime}`}
                    suffix="min"
                  />
                )}

                {recipe.servings !== null && (
                  <HeroStat
                    label="Serves"
                    value={`${recipe.servings}`}
                  />
                )}
              </div>
            </div>

            {/* IMAGE */}

            <div
              className="
                relative
                aspect-[4/3]
                overflow-hidden
                rounded-[30px]
                border
                border-white/60
                bg-[#E8DDD8]
                shadow-[0_35px_100px_rgba(88,57,48,0.14)]
                lg:aspect-[5/4]
              "
            >
              <Image
                src={recipe.image}
                alt={recipe.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="
                  object-cover
                  transition-transform
                  duration-700
                  hover:scale-[1.02]
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/15
                  via-transparent
                  to-transparent
                "
              />

              <div
                className="
                  absolute
                  bottom-5
                  left-5
                  rounded-full
                  border
                  border-white/25
                  bg-black/20
                  px-4
                  py-2
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.18em]
                  text-white
                  backdrop-blur-xl
                "
              >
                Kuska&apos;s kitchen
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          RECIPE OVERVIEW
      ═══════════════════════════════════════ */}

      <section
        className="
          px-5
          py-20
          sm:px-8
          lg:px-16
          lg:py-28
        "
      >
        <div className="mx-auto max-w-[1440px]">
          <div
            className="
              grid
              gap-12
              lg:grid-cols-[350px_1fr]
              lg:items-start
              lg:gap-20
            "
          >
            {/* STICKY SUMMARY */}

            <aside
              className="
                rounded-[28px]
                border
                border-[#28211F]/10
                bg-[#F1E8E4]
                p-7
                lg:sticky
                lg:top-28
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-[#28211F]
                    text-[#E7B6AB]
                  "
                >
                  <ChefHat
                    size={17}
                    strokeWidth={1.5}
                  />
                </div>

                <div>
                  <p
                    className="
                      text-[9px]
                      font-medium
                      uppercase
                      tracking-[0.18em]
                      text-[#B87E74]
                    "
                  >
                    Recipe
                  </p>

                  <p className="mt-1 font-serif text-[23px]">
                    At a glance
                  </p>
                </div>
              </div>

              <div
                className="
                  mt-7
                  divide-y
                  divide-[#28211F]/10
                  border-y
                  border-[#28211F]/10
                "
              >
                {recipe.prepTime !== null && (
                  <SummaryRow
                    icon={Timer}
                    label="Prep time"
                    value={`${recipe.prepTime} min`}
                  />
                )}

                {recipe.cookTime !== null && (
                  <SummaryRow
                    icon={Flame}
                    label="Cook time"
                    value={`${recipe.cookTime} min`}
                  />
                )}

                {totalTime > 0 && (
                  <SummaryRow
                    icon={Clock3}
                    label="Total time"
                    value={`${totalTime} min`}
                  />
                )}

                {recipe.servings !== null && (
                  <SummaryRow
                    icon={UsersRound}
                    label="Servings"
                    value={`${recipe.servings}`}
                  />
                )}
              </div>

              <div className="mt-7">
                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-[#A1847B]
                  "
                >
                  Per serving
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <MacroBox
                    label="Calories"
                    value={`${recipe.calories}`}
                    suffix="kcal"
                  />

                  <MacroBox
                    label="Protein"
                    value={`${recipe.protein}`}
                    suffix="g"
                  />

                  {recipe.carbs !== null && (
                    <MacroBox
                      label="Carbs"
                      value={`${recipe.carbs}`}
                      suffix="g"
                    />
                  )}

                  {recipe.fat !== null && (
                    <MacroBox
                      label="Fat"
                      value={`${recipe.fat}`}
                      suffix="g"
                    />
                  )}
                </div>
              </div>

              <p
                className="
                  mt-5
                  text-[10px]
                  leading-5
                  text-[#9A8881]
                "
              >
                Nutrition values are approximate and can vary
                depending on the exact ingredients and portions
                used.
              </p>
            </aside>

            {/* RECIPE CONTENT */}

            <div>
              {/* Ingredients */}

              <section>
                <div
                  className="
                    flex
                    flex-col
                    justify-between
                    gap-5
                    border-b
                    border-[#28211F]/10
                    pb-7
                    sm:flex-row
                    sm:items-end
                  "
                >
                  <div>
                    <p
                      className="
                        text-[10px]
                        font-medium
                        uppercase
                        tracking-[0.22em]
                        text-[#B87E74]
                      "
                    >
                      What you&apos;ll need
                    </p>

                    <h2
                      className="
                        mt-3
                        font-serif
                        text-[44px]
                        tracking-[-0.04em]
                        sm:text-[56px]
                      "
                    >
                      Ingredients.
                    </h2>
                  </div>

                  <p
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.14em]
                      text-[#927F78]
                    "
                  >
                    {recipe.ingredients.length}{" "}
                    {recipe.ingredients.length === 1
                      ? "ingredient"
                      : "ingredients"}
                  </p>
                </div>

                {recipe.ingredients.length > 0 ? (
                  <div className="mt-7">
                    {recipe.ingredients.map(
                      (ingredient, index) => (
                        <div
                          key={`${ingredient}-${index}`}
                          className="
                            group
                            flex
                            items-start
                            gap-4
                            border-b
                            border-[#28211F]/10
                            py-5
                            last:border-b-0
                          "
                        >
                          <div
                            className="
                              mt-0.5
                              flex
                              h-7
                              w-7
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              border
                              border-[#B87E74]/20
                              bg-[#E7B6AB]/15
                              text-[#B87E74]
                              transition
                              group-hover:bg-[#B87E74]
                              group-hover:text-white
                            "
                          >
                            <Check
                              size={11}
                              strokeWidth={2}
                            />
                          </div>

                          <p
                            className="
                              pt-1
                              text-[15px]
                              leading-6
                              text-[#574A46]
                            "
                          >
                            {ingredient}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <p className="mt-7 text-sm text-[#7A6C67]">
                    Ingredients haven&apos;t been added to
                    this recipe yet.
                  </p>
                )}
              </section>

              {/* Instructions */}

              <section className="mt-20">
                <div
                  className="
                    border-b
                    border-[#28211F]/10
                    pb-7
                  "
                >
                  <p
                    className="
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.22em]
                      text-[#B87E74]
                    "
                  >
                    Let&apos;s cook
                  </p>

                  <h2
                    className="
                      mt-3
                      font-serif
                      text-[44px]
                      tracking-[-0.04em]
                      sm:text-[56px]
                    "
                  >
                    Method.
                  </h2>
                </div>

                {recipe.instructions.length > 0 ? (
                  <div className="mt-4">
                    {recipe.instructions.map(
                      (instruction, index) => (
                        <div
                          key={`${instruction}-${index}`}
                          className="
                            group
                            grid
                            gap-5
                            border-b
                            border-[#28211F]/10
                            py-8
                            last:border-b-0
                            sm:grid-cols-[90px_1fr]
                          "
                        >
                          <div>
                            <span
                              className="
                                inline-flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-[#28211F]/10
                                bg-[#F1E8E4]
                                font-serif
                                text-[19px]
                                text-[#B87E74]
                                transition-all
                                duration-300
                                group-hover:bg-[#28211F]
                                group-hover:text-[#E7B6AB]
                              "
                            >
                              {String(
                                index + 1
                              ).padStart(2, "0")}
                            </span>
                          </div>

                          <p
                            className="
                              max-w-[760px]
                              text-[15px]
                              leading-8
                              text-[#62534E]
                            "
                          >
                            {instruction}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <p className="mt-7 text-sm text-[#7A6C67]">
                    Cooking instructions haven&apos;t been
                    added yet.
                  </p>
                )}
              </section>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PHILOSOPHY CTA
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
            rounded-[34px]
            bg-[#E7B6AB]
            px-7
            py-14
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
              -top-[150%]
              h-[700px]
              w-[700px]
              rounded-full
              bg-white/25
              blur-[110px]
            "
          />

          <div
            className="
              relative
              z-10
              grid
              gap-10
              lg:grid-cols-[1fr_400px]
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
                  text-[#74544D]
                "
              >
                Kuska&apos;s approach
              </p>

              <h2
                className="
                  mt-5
                  max-w-[780px]
                  font-serif
                  text-[44px]
                  leading-[0.95]
                  tracking-[-0.04em]
                  sm:text-[58px]
                "
              >
                Track the macros.
                <br />
                But don&apos;t forget to{" "}

                <span className="italic text-white">
                  enjoy the food.
                </span>
              </h2>
            </div>

            <p
              className="
                text-sm
                leading-7
                text-[#674D47]
              "
            >
              Nutrition doesn&apos;t need to become another
              full-time job. Know roughly what your body
              needs, make food that supports it and leave
              enough space to actually enjoy eating.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          RELATED RECIPES
      ═══════════════════════════════════════ */}

      {relatedRecipes.length > 0 && (
        <section
          className="
            bg-[#F0E7E3]
            px-5
            py-24
            sm:px-8
            lg:px-16
            lg:py-32
          "
        >
          <div className="mx-auto max-w-[1440px]">
            <div
              className="
                mb-10
                flex
                flex-col
                justify-between
                gap-6
                sm:flex-row
                sm:items-end
              "
            >
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles
                    size={12}
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
                    Keep cooking
                  </p>
                </div>

                <h2
                  className="
                    mt-4
                    font-serif
                    text-[44px]
                    leading-[0.95]
                    tracking-[-0.04em]
                    sm:text-[56px]
                  "
                >
                  You might also
                  <br />

                  <span className="italic text-[#B87E74]">
                    like these.
                  </span>
                </h2>
              </div>

              <Link
                href="/nutrition"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.17em]
                  text-[#28211F]
                "
              >
                View all recipes

                <ArrowRight
                  size={14}
                  className="
                    transition-transform
                    group-hover:translate-x-1
                  "
                />
              </Link>
            </div>

            <div
              className="
                grid
                gap-6
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
              "
            >
              {relatedRecipes.map(
                (relatedRecipe) => (
                  <FoodCard
                    key={relatedRecipe.id}
                    title={relatedRecipe.title}
                    image={relatedRecipe.image}
                    category={
                      relatedRecipe.category
                    }
                    protein={
                      relatedRecipe.protein
                    }
                    calories={
                      relatedRecipe.calories
                    }
                    href={`/nutrition/${relatedRecipe.slug}`}
                  />
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          FINAL LINK
      ═══════════════════════════════════════ */}

      <section
        className="
          px-5
          py-20
          sm:px-8
          lg:px-16
          lg:py-24
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-[1440px]
            flex-col
            justify-between
            gap-8
            border-t
            border-[#28211F]/10
            pt-12
            sm:flex-row
            sm:items-center
          "
        >
          <div>
            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.18em]
                text-[#B87E74]
              "
            >
              Kuska Motion Nutrition
            </p>

            <p
              className="
                mt-2
                font-serif
                text-[28px]
                tracking-[-0.03em]
              "
            >
              Ready for another one?
            </p>
          </div>

          <Link
            href="/nutrition"
            className="
              group
              inline-flex
              h-12
              items-center
              gap-3
              self-start
              rounded-full
              bg-[#28211F]
              px-6
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.15em]
              text-white
              transition-all
              duration-300
              hover:-translate-y-1
              sm:self-auto
            "
          >
            More recipes

            <ArrowUpRight
              size={13}
              className="
                transition-transform
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </Link>
        </div>
      </section>
    </main>
  );
}

/* ═════════════════════════════════════
   HERO STAT
═════════════════════════════════════ */

function HeroStat({
  label,
  value,
  suffix,
}: {
  label: string;
  value: string;
  suffix?: string;
}) {
  return (
    <div
      className="
        flex
        min-h-[95px]
        flex-col
        justify-between
        bg-white/40
        p-4
        backdrop-blur-xl
      "
    >
      <p
        className="
          text-[8px]
          font-medium
          uppercase
          tracking-[0.16em]
          text-[#947D75]
        "
      >
        {label}
      </p>

      <div className="mt-5 flex items-end gap-1">
        <span
          className="
            font-serif
            text-[25px]
            leading-none
            text-[#28211F]
          "
        >
          {value}
        </span>

        {suffix && (
          <span
            className="
              pb-[2px]
              text-[9px]
              uppercase
              tracking-[0.08em]
              text-[#947D75]
            "
          >
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

/* ═════════════════════════════════════
   SUMMARY ROW
═════════════════════════════════════ */

function SummaryRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock3;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-4
        py-4
      "
    >
      <div
        className="
          flex
          items-center
          gap-3
          text-[#806C65]
        "
      >
        <Icon
          size={14}
          strokeWidth={1.5}
          className="text-[#B87E74]"
        />

        <span className="text-xs">
          {label}
        </span>
      </div>

      <span
        className="
          text-xs
          font-medium
          text-[#4F423E]
        "
      >
        {value}
      </span>
    </div>
  );
}

/* ═════════════════════════════════════
   MACRO BOX
═════════════════════════════════════ */

function MacroBox({
  label,
  value,
  suffix,
}: {
  label: string;
  value: string;
  suffix?: string;
}) {
  return (
    <div
      className="
        rounded-[16px]
        border
        border-[#28211F]/10
        bg-white/45
        p-4
      "
    >
      <p
        className="
          text-[8px]
          font-medium
          uppercase
          tracking-[0.15em]
          text-[#9A827A]
        "
      >
        {label}
      </p>

      <div className="mt-3 flex items-end gap-1">
        <span className="font-serif text-[24px] leading-none">
          {value}
        </span>

        {suffix && (
          <span className="pb-[2px] text-[9px] text-[#8F7B74]">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}