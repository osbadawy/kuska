import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Dumbbell,
  Footprints,
  Heart,
  Route,
  Salad,
  Sparkles,
  Utensils,
} from "lucide-react";

import { FoodCard } from "@/components/UI/FoodCard";
import { WorkoutCard } from "@/components/UI/WorkoutCard";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Guides | Kuska Motion",
  description:
    "Explore running guides, workouts and recipes from Kuska Motion.",
};

type RunningContentType =
  | "GUIDE"
  | "PLAN"
  | "JOURNAL"
  | "CITY_GUIDE"
  | "CHALLENGE"
  | "RUN_CLUB_EVENT";

type RunningDifficulty =
  | "ALL_LEVELS"
  | "BEGINNER"
  | "INTERMEDIATE"
  | "ADVANCED";

type RunningGuideCardItem = {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  image: string;

  type: RunningContentType;

  difficulty: RunningDifficulty;

  durationWeeks: number | null;
  runsPerWeek: number | null;
  distanceKm: number | null;

  isFeatured: boolean;
};

/* ═════════════════════════════════════
   PAGE
═════════════════════════════════════ */

export default async function GuidesPage() {
  const [
    runningGuides,
    workouts,
    recipes,
    runningCount,
    workoutCount,
    recipeCount,
  ] = await Promise.all([
    prisma.runningContent.findMany({
      where: {
        isPublished: true,
        type: {
          in: ["GUIDE", "PLAN"],
        },
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
        summary: true,
        image: true,
        type: true,
        difficulty: true,
        durationWeeks: true,
        runsPerWeek: true,
        distanceKm: true,
        isFeatured: true,
      },
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

    prisma.runningContent.count({
      where: {
        isPublished: true,
        type: {
          in: ["GUIDE", "PLAN"],
        },
      },
    }),

    prisma.workout.count({
      where: {
        isPublished: true,
      },
    }),

    prisma.nutritionRecipe.count({
      where: {
        isPublished: true,
      },
    }),
  ]);

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
          pb-24
          pt-36
          sm:px-8
          lg:px-16
          lg:pb-32
          lg:pt-44
          xl:px-20
        "
      >
        {/* atmosphere */}

        <div
          className="
            pointer-events-none
            absolute
            -right-[12%]
            -top-[55%]
            h-[850px]
            w-[850px]
            rounded-full
            bg-[#E7B6AB]/35
            blur-[130px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-[90%]
            left-[5%]
            h-[700px]
            w-[700px]
            rounded-full
            bg-white/80
            blur-[125px]
          "
        />

        <div className="relative mx-auto max-w-[1440px]">
          <div
            className="
              grid
              gap-12
              lg:grid-cols-[1fr_420px]
              lg:items-end
            "
          >
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
                <Sparkles
                  size={11}
                  className="text-[#B87E74]"
                />

                <span
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.22em]
                    text-[#B87E74]
                  "
                >
                  Kuska Guides
                </span>
              </div>

              <h1
                className="
                  mt-7
                  max-w-[1000px]
                  font-serif
                  text-[60px]
                  leading-[0.88]
                  tracking-[-0.055em]
                  sm:text-[80px]
                  lg:text-[96px]
                "
              >
                Move better.
                <br />
                Eat well.
                <br />

                <span className="italic text-[#B87E74]">
                  Enjoy the process.
                </span>
              </h1>
            </div>

            <div className="lg:pb-2">
              <p
                className="
                  max-w-[400px]
                  text-sm
                  leading-7
                  text-[#74625C]
                "
              >
                Everything practical lives here.
                Running guidance, training sessions and
                food worth looking forward to — without
                making wellbeing more complicated than
                it needs to be.
              </p>

              <Link
                href="#explore"
                className="
                  group
                  mt-7
                  inline-flex
                  items-center
                  gap-3
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                "
              >
                Explore the guides

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
                    transition
                    group-hover:translate-y-1
                  "
                >
                  <ArrowRight
                    size={12}
                    className="rotate-90"
                  />
                </span>
              </Link>
            </div>
          </div>

          {/* THREE PILLARS */}

          <div
            id="explore"
            className="
              mt-20
              grid
              gap-px
              overflow-hidden
              rounded-[30px]
              border
              border-white/60
              bg-[#28211F]/10
              shadow-[0_30px_90px_rgba(72,48,40,0.07)]
              lg:grid-cols-3
            "
          >
            <GuideWorld
              number="01"
              icon={Footprints}
              eyebrow="Running"
              title="Find your rhythm."
              description="Running guides, plans and simple explanations for becoming a more confident runner."
              count={runningCount}
              countLabel="running guides"
              href="/running"
            />

            <GuideWorld
              number="02"
              icon={Dumbbell}
              eyebrow="Training"
              title="Move with purpose."
              description="Strength and movement sessions that work alongside your life rather than taking it over."
              count={workoutCount}
              countLabel="workouts"
              href="/workout"
            />

            <GuideWorld
              number="03"
              icon={Salad}
              eyebrow="Nutrition"
              title="Eat something good."
              description="Simple meals, useful nutrition and food designed to be enjoyed as much as it fuels you."
              count={recipeCount}
              countLabel="recipes"
              href="/nutrition"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          INTRODUCTION
      ═══════════════════════════════════════ */}

      <section
        className="
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
              grid
              gap-12
              lg:grid-cols-[280px_1fr]
              lg:gap-24
            "
          >
            <div>
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-[#B87E74]
                "
              >
                The idea
              </p>
            </div>

            <div>
              <h2
                className="
                  max-w-[1000px]
                  font-serif
                  text-[45px]
                  leading-[0.98]
                  tracking-[-0.04em]
                  sm:text-[58px]
                  lg:text-[68px]
                "
              >
                You don&apos;t need to optimize
                <br />
                every part of your life.

                <span className="italic text-[#B87E74]">
                  {" "}Just support it.
                </span>
              </h2>

              <div
                className="
                  mt-10
                  grid
                  gap-8
                  sm:grid-cols-2
                "
              >
                <p className="text-sm leading-7 text-[#7A6C67]">
                  Kuska Motion is about finding ways to
                  move, eat and live that you can
                  genuinely keep doing. No perfect week
                  required.
                </p>

                <p className="text-sm leading-7 text-[#7A6C67]">
                  Browse wherever you need something
                  today — a run to follow, a workout to
                  get moving or something good to make
                  afterwards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          RUNNING
      ═══════════════════════════════════════ */}

      <section
        className="
          bg-[#28211F]
          px-5
          py-24
          text-white
          sm:px-8
          lg:px-16
          lg:py-32
        "
      >
        <div className="mx-auto max-w-[1440px]">
          <SectionHeader
            number="01"
            eyebrow="Running guides"
            title="One foot"
            italic="after another."
            description="Whether you're just starting, working towards a distance or simply trying to enjoy your runs more."
            href="/running"
            dark
          />

          {runningGuides.length > 0 ? (
            <div
              className="
                mt-12
                grid
                gap-5
                md:grid-cols-2
                xl:grid-cols-3
              "
            >
              {runningGuides.map(
                (guide, index) => (
                  <RunningGuideCard
                    key={guide.id}
                    item={guide}
                    index={index}
                  />
                )
              )}
            </div>
          ) : (
            <EmptySection
              dark
              text="Running guides are coming soon."
            />
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WORKOUTS
      ═══════════════════════════════════════ */}

      <section
        className="
          px-5
          py-24
          sm:px-8
          lg:px-16
          lg:py-32
        "
      >
        <div className="mx-auto max-w-[1240px]">
          <SectionHeader
            number="02"
            eyebrow="Workout guides"
            title="Get strong."
            italic="Stay useful."
            description="Training sessions designed to build strength, movement and confidence without needing your entire day."
            href="/workout"
          />

          {workouts.length > 0 ? (
            <div className="mt-12 space-y-5">
              {workouts.map(
                (workout) => (
                  <WorkoutCard
                    key={workout.id}
                    title={workout.title}
                    description={
                      workout.description
                    }
                    image={workout.image}
                    category={
                      workout.category
                    }
                    difficulty={
                      workout.difficulty
                    }
                    durationMinutes={
                      workout.durationMinutes
                    }
                    caloriesBurned={
                      workout.caloriesBurned
                    }
                    exerciseCount={
                      workout._count.exercises
                    }
                    targetAreas={
                      workout.targetAreas
                    }
                    featured={
                      workout.isFeatured
                    }
                    href={`/workout/${workout.slug}`}
                  />
                )
              )}
            </div>
          ) : (
            <EmptySection text="Workouts are coming soon." />
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          INTERLUDE
      ═══════════════════════════════════════ */}

      <section className="px-5 sm:px-8 lg:px-16">
        <div
          className="
            relative
            mx-auto
            max-w-[1440px]
            overflow-hidden
            rounded-[36px]
            bg-[#E7B6AB]
            px-7
            py-14
            sm:px-10
            lg:px-16
            lg:py-20
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              -right-[12%]
              -top-[160%]
              h-[800px]
              w-[800px]
              rounded-full
              bg-white/25
              blur-[100px]
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
              <Heart
                size={17}
                strokeWidth={1.4}
                className="text-[#74544D]"
              />

              <h2
                className="
                  mt-6
                  max-w-[850px]
                  font-serif
                  text-[48px]
                  leading-[0.93]
                  tracking-[-0.045em]
                  sm:text-[64px]
                "
              >
                Movement and food
                <br />
                aren&apos;t opposites.

                <span className="italic text-white">
                  {" "}They support each other.
                </span>
              </h2>
            </div>

            <p className="text-sm leading-7 text-[#684C46]">
              Train because your body can do things.
              Eat because it needs energy. Enjoy both
              because life is much better that way.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          NUTRITION
      ═══════════════════════════════════════ */}

      <section
        className="
          px-5
          py-24
          sm:px-8
          lg:px-16
          lg:py-32
        "
      >
        <div className="mx-auto max-w-[1440px]">
          <SectionHeader
            number="03"
            eyebrow="Nutrition guides"
            title="Food worth"
            italic="looking forward to."
            description="Meals that taste good, support an active life and don't require food to become a full-time job."
            href="/nutrition"
          />

          {recipes.length > 0 ? (
            <div
              className="
                mt-12
                grid
                gap-5
                md:grid-cols-2
                xl:grid-cols-3
              "
            >
              {recipes.map(
                (recipe) => (
                  <FoodCard
                    key={recipe.id}
                    title={recipe.title}
                    image={recipe.image}
                    category={
                      recipe.category
                    }
                    protein={
                      recipe.protein
                    }
                    calories={
                      recipe.calories
                    }
                    href={`/nutrition/${recipe.slug}`}
                  />
                )
              )}
            </div>
          ) : (
            <EmptySection text="Recipes are coming soon." />
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          JOURNEY / THREE STEPS
      ═══════════════════════════════════════ */}

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
              grid
              gap-12
              lg:grid-cols-[360px_1fr]
              lg:gap-20
            "
          >
            <div>
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-[#B87E74]
                "
              >
                Keep it simple
              </p>

              <h2
                className="
                  mt-5
                  font-serif
                  text-[48px]
                  leading-[0.94]
                  tracking-[-0.04em]
                  sm:text-[60px]
                "
              >
                A pretty good
                <br />

                <span className="italic text-[#B87E74]">
                  formula.
                </span>
              </h2>
            </div>

            <div
              className="
                grid
                gap-px
                overflow-hidden
                rounded-[30px]
                bg-[#28211F]/10
                md:grid-cols-3
              "
            >
              <SimpleStep
                number="01"
                icon={Footprints}
                title="Move"
                text="Run, walk, lift, stretch — use your body."
              />

              <SimpleStep
                number="02"
                icon={Utensils}
                title="Fuel"
                text="Give yourself enough good food to support it."
              />

              <SimpleStep
                number="03"
                icon={Heart}
                title="Live"
                text="Then go do something that isn't about fitness."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════ */}

      <section
        className="
          px-5
          py-24
          sm:px-8
          lg:px-16
          lg:py-32
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1440px]
            gap-10
            border-t
            border-[#28211F]/10
            pt-14
            lg:grid-cols-[1fr_450px]
            lg:items-end
          "
        >
          <div>
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.22em]
                text-[#B87E74]
              "
            >
              Kuska Motion
            </p>

            <h2
              className="
                mt-5
                max-w-[830px]
                font-serif
                text-[49px]
                leading-[0.94]
                tracking-[-0.045em]
                sm:text-[64px]
              "
            >
              Pick what you need.
              <br />

              <span className="italic text-[#B87E74]">
                Leave the rest.
              </span>
            </h2>
          </div>

          <div>
            <p className="text-sm leading-7 text-[#7A6C67]">
              There&apos;s no need to do everything at
              once. Find something useful today and
              come back when you need something else.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              <MiniLink
                href="/running"
                label="Running"
              />

              <MiniLink
                href="/workout"
                label="Workouts"
              />

              <MiniLink
                href="/nutrition"
                label="Nutrition"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ═════════════════════════════════════
   GUIDE WORLD
═════════════════════════════════════ */

function GuideWorld({
  number,
  icon: Icon,
  eyebrow,
  title,
  description,
  count,
  countLabel,
  href,
}: {
  number: string;
  icon: typeof Footprints;
  eyebrow: string;
  title: string;
  description: string;
  count: number;
  countLabel: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="
        group
        relative
        min-h-[390px]
        overflow-hidden
        bg-white/55
        p-7
        backdrop-blur-xl
        transition-all
        duration-500
        hover:bg-[#28211F]
        sm:p-8
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-64
          w-64
          rounded-full
          bg-[#E7B6AB]/15
          blur-[50px]
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

      <div
        className="
          relative
          z-10
          flex
          h-full
          min-h-[330px]
          flex-col
          justify-between
        "
      >
        <div className="flex items-center justify-between">
          <span
            className="
              text-[9px]
              font-semibold
              tracking-[0.18em]
              text-[#B87E74]
              group-hover:text-[#E7B6AB]
            "
          >
            {number}
          </span>

          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-[#F1E7E3]
              text-[#B87E74]
              transition
              group-hover:bg-[#E7B6AB]
              group-hover:text-[#28211F]
            "
          >
            <Icon
              size={16}
              strokeWidth={1.5}
            />
          </div>
        </div>

        <div className="mt-16">
          <p
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-[#B87E74]
              group-hover:text-[#E7B6AB]
            "
          >
            {eyebrow}
          </p>

          <h2
            className="
              mt-3
              font-serif
              text-[36px]
              leading-[0.96]
              tracking-[-0.035em]
              group-hover:text-white
            "
          >
            {title}
          </h2>

          <p
            className="
              mt-5
              max-w-[350px]
              text-xs
              leading-6
              text-[#7A6C67]
              group-hover:text-white/45
            "
          >
            {description}
          </p>

          <div
            className="
              mt-7
              flex
              items-center
              justify-between
              border-t
              border-[#28211F]/10
              pt-5
              group-hover:border-white/10
            "
          >
            <span
              className="
                text-[9px]
                text-[#8A7770]
                group-hover:text-white/35
              "
            >
              {count} {countLabel}
            </span>

            <ArrowUpRight
              size={14}
              className="
                text-[#B87E74]
                transition-transform
                duration-300
                group-hover:-translate-y-1
                group-hover:translate-x-1
                group-hover:text-[#E7B6AB]
              "
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ═════════════════════════════════════
   SECTION HEADER
═════════════════════════════════════ */

function SectionHeader({
  number,
  eyebrow,
  title,
  italic,
  description,
  href,
  dark = false,
}: {
  number: string;
  eyebrow: string;
  title: string;
  italic: string;
  description: string;
  href: string;
  dark?: boolean;
}) {
  return (
    <div
      className="
        flex
        flex-col
        justify-between
        gap-8
        lg:flex-row
        lg:items-end
      "
    >
      <div>
        <div className="flex items-center gap-3">
          <span
            className={`
              font-serif
              text-[14px]

              ${
                dark
                  ? "text-[#E7B6AB]"
                  : "text-[#B87E74]"
              }
            `}
          >
            {number}
          </span>

          <span
            className={`
              h-px
              w-8

              ${
                dark
                  ? "bg-white/15"
                  : "bg-[#28211F]/15"
              }
            `}
          />

          <p
            className={`
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.2em]

              ${
                dark
                  ? "text-[#E7B6AB]"
                  : "text-[#B87E74]"
              }
            `}
          >
            {eyebrow}
          </p>
        </div>

        <h2
          className={`
            mt-5
            font-serif
            text-[49px]
            leading-[0.94]
            tracking-[-0.045em]
            sm:text-[62px]

            ${
              dark
                ? "text-white"
                : "text-[#28211F]"
            }
          `}
        >
          {title}
          <br />

          <span
            className={`
              italic

              ${
                dark
                  ? "text-[#E7B6AB]"
                  : "text-[#B87E74]"
              }
            `}
          >
            {italic}
          </span>
        </h2>
      </div>

      <div className="max-w-[430px]">
        <p
          className={`
            text-sm
            leading-7

            ${
              dark
                ? "text-white/45"
                : "text-[#7A6C67]"
            }
          `}
        >
          {description}
        </p>

        <Link
          href={href}
          className={`
            group
            mt-6
            inline-flex
            items-center
            gap-2
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.16em]

            ${
              dark
                ? "text-[#E7B6AB]"
                : "text-[#28211F]"
            }
          `}
        >
          Explore all

          <ArrowRight
            size={12}
            className="
              transition-transform
              group-hover:translate-x-1
            "
          />
        </Link>
      </div>
    </div>
  );
}

/* ═════════════════════════════════════
   RUNNING GUIDE CARD
═════════════════════════════════════ */

function RunningGuideCard({
  item,
  index,
}: {
  item: RunningGuideCardItem;
  index: number;
}) {
  return (
    <Link
      href="/running#explore-running"
      className="
        group
        relative
        min-h-[430px]
        overflow-hidden
        rounded-[28px]
        bg-white/[0.06]
      "
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="
          (max-width: 768px) 100vw,
          (max-width: 1280px) 50vw,
          33vw
        "
        className="
          object-cover
          opacity-65
          transition-transform
          duration-700
          group-hover:scale-[1.05]
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-[#211C1A]
          via-[#211C1A]/55
          to-transparent
        "
      />

      <div
        className="
          relative
          z-10
          flex
          min-h-[430px]
          flex-col
          justify-between
          p-7
        "
      >
        <div className="flex items-center justify-between">
          <span
            className="
              rounded-full
              border
              border-white/20
              bg-black/15
              px-3
              py-2
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.15em]
              text-white
              backdrop-blur-xl
            "
          >
            {item.type === "PLAN"
              ? "Running plan"
              : "Running guide"}
          </span>

          <span className="font-serif text-[13px] text-white/35">
            0{index + 1}
          </span>
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            <DarkPill>
              {difficultyLabel(
                item.difficulty
              )}
            </DarkPill>

            {item.durationWeeks !== null && (
              <DarkPill>
                {item.durationWeeks} weeks
              </DarkPill>
            )}

            {item.runsPerWeek !== null && (
              <DarkPill>
                {item.runsPerWeek} runs / week
              </DarkPill>
            )}

            {item.distanceKm !== null && (
              <DarkPill>
                {item.distanceKm} km
              </DarkPill>
            )}
          </div>

          <h3
            className="
              mt-5
              max-w-[380px]
              font-serif
              text-[35px]
              leading-[0.98]
              tracking-[-0.035em]
              text-white
            "
          >
            {item.title}
          </h3>

          {item.summary && (
            <p
              className="
                mt-4
                line-clamp-2
                text-xs
                leading-6
                text-white/50
              "
            >
              {item.summary}
            </p>
          )}

          <div
            className="
              mt-6
              flex
              items-center
              gap-2
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.15em]
              text-[#E7B6AB]
            "
          >
            Explore running

            <ArrowUpRight
              size={12}
              className="
                transition-transform
                group-hover:-translate-y-1
                group-hover:translate-x-1
              "
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ═════════════════════════════════════
   SIMPLE STEP
═════════════════════════════════════ */

function SimpleStep({
  number,
  icon: Icon,
  title,
  text,
}: {
  number: string;
  icon: typeof Footprints;
  title: string;
  text: string;
}) {
  return (
    <div
      className="
        min-h-[300px]
        bg-white
        p-7
        sm:p-8
      "
    >
      <div className="flex items-center justify-between">
        <span
          className="
            font-serif
            text-[13px]
            text-[#B87E74]
          "
        >
          {number}
        </span>

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-[#F1E7E3]
            text-[#B87E74]
          "
        >
          <Icon
            size={15}
            strokeWidth={1.5}
          />
        </div>
      </div>

      <div className="mt-20">
        <h3
          className="
            font-serif
            text-[32px]
            tracking-[-0.03em]
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-4
            max-w-[270px]
            text-xs
            leading-6
            text-[#7A6C67]
          "
        >
          {text}
        </p>
      </div>
    </div>
  );
}

/* ═════════════════════════════════════
   SMALL HELPERS
═════════════════════════════════════ */

function DarkPill({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span
      className="
        rounded-full
        border
        border-white/15
        bg-white/10
        px-3
        py-1.5
        text-[8px]
        text-white/70
        backdrop-blur-xl
      "
    >
      {children}
    </span>
  );
}

function MiniLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="
        group
        inline-flex
        h-11
        items-center
        gap-2
        rounded-full
        border
        border-[#28211F]/10
        px-4
        text-[9px]
        font-semibold
        uppercase
        tracking-[0.14em]
        transition
        hover:bg-[#28211F]
        hover:text-white
      "
    >
      {label}

      <ArrowUpRight
        size={11}
        className="
          transition-transform
          group-hover:-translate-y-0.5
          group-hover:translate-x-0.5
        "
      />
    </Link>
  );
}

function EmptySection({
  text,
  dark = false,
}: {
  text: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`
        mt-12
        flex
        min-h-[240px]
        items-center
        justify-center
        rounded-[28px]
        border
        border-dashed
        px-6
        text-center

        ${
          dark
            ? "border-white/10 text-white/40"
            : "border-[#28211F]/15 text-[#7A6C67]"
        }
      `}
    >
      <p className="font-serif text-[24px]">
        {text}
      </p>
    </div>
  );
}

function difficultyLabel(
  difficulty:
    | "ALL_LEVELS"
    | "BEGINNER"
    | "INTERMEDIATE"
    | "ADVANCED"
) {
  switch (difficulty) {
    case "ALL_LEVELS":
      return "All levels";

    case "BEGINNER":
      return "Beginner";

    case "INTERMEDIATE":
      return "Intermediate";

    case "ADVANCED":
      return "Advanced";
  }
}