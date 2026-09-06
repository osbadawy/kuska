import Link from "next/link";
import {
  ArrowDown,
  Dumbbell,
  Footprints,
  HeartPulse,
  Sparkles,
} from "lucide-react";

import { WorkoutCard } from "@/components/UI/WorkoutCard";
import { prisma } from "@/lib/prisma";

export const dynamic =
  "force-dynamic";

export default async function WorkoutPage() {
  const workouts =
    await prisma.workout.findMany({
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
    });

  return (
    <main
      className="
        overflow-hidden
        bg-[#FAF7F5]
        text-[#28211F]
      "
    >
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
        {/* ATMOSPHERE */}

        <div
          className="
            pointer-events-none
            absolute
            -right-[10%]
            -top-[45%]
            h-[700px]
            w-[700px]
            rounded-full
            bg-[#E7B6AB]/30
            blur-[125px]
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
            bg-white/75
            blur-[120px]
          "
        />

        <div className="relative mx-auto max-w-[1440px]">
          <div
            className="
              grid
              gap-12
              lg:grid-cols-[1fr_400px]
              lg:items-end
            "
          >
            {/* LEFT */}

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
                <Dumbbell
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
                  Training
                </span>
              </div>

              <h1
                className="
                  mt-7
                  max-w-[950px]
                  font-serif
                  text-[58px]
                  leading-[0.89]
                  tracking-[-0.052em]
                  sm:text-[76px]
                  lg:text-[92px]
                "
              >
                Move because
                <br />
                it feels{" "}

                <span className="italic text-[#B87E74]">
                  good.
                </span>
              </h1>
            </div>

            {/* RIGHT */}

            <div className="lg:pb-1">
              <p
                className="
                  max-w-[380px]
                  text-sm
                  leading-7
                  text-[#74625C]
                "
              >
                Simple training sessions built to help
                you move, get stronger and feel better —
                without turning fitness into your entire
                life.
              </p>

              <Link
                href="#workouts"
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
                Browse workouts

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
                  <ArrowDown
                    size={13}
                  />
                </span>
              </Link>
            </div>
          </div>

          {/* HERO NOTES */}

          <div
            className="
              mt-16
              grid
              overflow-hidden
              rounded-[26px]
              border
              border-white/60
              bg-white/30
              backdrop-blur-xl
              sm:grid-cols-3
              lg:max-w-[820px]
            "
          >
            <HeroPoint
              icon={Footprints}
              title="Move consistently"
              text="Progress comes from showing up."
            />

            <HeroPoint
              icon={Dumbbell}
              title="Train with purpose"
              text="Sessions with a reason behind them."
            />

            <HeroPoint
              icon={HeartPulse}
              title="Feel better"
              text="Wellbeing always comes first."
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          INTRO
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
              gap-10
              lg:grid-cols-[280px_1fr]
              lg:gap-20
            "
          >
            <div>
              <p
                className="
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-[0.24em]
                  text-[#B87E74]
                "
              >
                The approach
              </p>
            </div>

            <div>
              <h2
                className="
                  max-w-[950px]
                  font-serif
                  text-[42px]
                  leading-[0.98]
                  tracking-[-0.04em]
                  sm:text-[56px]
                  lg:text-[66px]
                "
              >
                You don&apos;t need the perfect plan.
                <br />
                You need one you&apos;ll{" "}

                <span className="italic text-[#B87E74]">
                  actually do.
                </span>
              </h2>

              <div
                className="
                  mt-9
                  grid
                  gap-7
                  sm:grid-cols-2
                "
              >
                <p
                  className="
                    text-sm
                    leading-7
                    text-[#7A6C67]
                  "
                >
                  These workouts are designed to fit
                  into real schedules. Some are short,
                  some are challenging, and some are
                  simply about getting your body moving.
                </p>

                <p
                  className="
                    text-sm
                    leading-7
                    text-[#7A6C67]
                  "
                >
                  Choose the session that makes sense
                  for where you are today and focus on
                  consistency rather than perfection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WORKOUT LIBRARY
      ═══════════════════════════════════════ */}

      <section
        id="workouts"
        className="
          px-5
          pb-28
          sm:px-8
          lg:px-16
          lg:pb-36
        "
      >
        <div className="mx-auto max-w-[1240px]">
          {/* HEADER */}

          <div
            className="
              mb-9
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
                  Training library
                </p>
              </div>

              <h2
                className="
                  mt-4
                  font-serif
                  text-[43px]
                  tracking-[-0.04em]
                  sm:text-[56px]
                "
              >
                All workouts.
              </h2>
            </div>

            {workouts.length > 0 && (
              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.15em]
                  text-[#8D7B75]
                "
              >
                {workouts.length}{" "}
                {workouts.length === 1
                  ? "workout"
                  : "workouts"}
              </p>
            )}
          </div>

          {/* WORKOUTS */}

          {workouts.length > 0 ? (
            <div className="space-y-5">
              {workouts.map(
                (workout) => (
                  <WorkoutCard
                    key={workout.id}
                    title={
                      workout.title
                    }
                    description={
                      workout.description
                    }
                    image={
                      workout.image
                    }
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
                      workout._count
                        .exercises
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
            <EmptyWorkouts />
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BOTTOM MESSAGE
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
            max-w-[1240px]
            overflow-hidden
            rounded-[34px]
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
              -top-[130%]
              h-[700px]
              w-[700px]
              rounded-full
              bg-[#E7B6AB]/15
              blur-[110px]
            "
          />

          <div
            className="
              relative
              z-10
              grid
              gap-8
              lg:grid-cols-[1fr_380px]
              lg:items-end
            "
          >
            <div>
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#E7B6AB]
                "
              >
                Kuska Motion
              </p>

              <h2
                className="
                  mt-4
                  max-w-[760px]
                  font-serif
                  text-[44px]
                  leading-[0.95]
                  tracking-[-0.04em]
                  sm:text-[58px]
                "
              >
                Movement should add
                <br />
                to your life.{" "}

                <span className="italic text-[#E7B6AB]">
                  Not take it over.
                </span>
              </h2>
            </div>

            <p
              className="
                text-sm
                leading-7
                text-white/45
              "
            >
              Pick something that feels right,
              move your body and then get on with
              enjoying the rest of your day.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ═════════════════════════════════════
   HERO POINT
═════════════════════════════════════ */

function HeroPoint({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Dumbbell;
  title: string;
  text: string;
}) {
  return (
    <div
      className="
        border-b
        border-[#28211F]/10
        p-5
        last:border-b-0
        sm:border-b-0
        sm:border-r
        sm:last:border-r-0
      "
    >
      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#28211F]
            text-[#E7B6AB]
          "
        >
          <Icon
            size={13}
            strokeWidth={1.5}
          />
        </div>

        <p
          className="
            text-[11px]
            font-semibold
            text-[#4F423E]
          "
        >
          {title}
        </p>
      </div>

      <p
        className="
          mt-3
          text-[10px]
          leading-5
          text-[#8B7972]
        "
      >
        {text}
      </p>
    </div>
  );
}

/* ═════════════════════════════════════
   EMPTY STATE
═════════════════════════════════════ */

function EmptyWorkouts() {
  return (
    <div
      className="
        flex
        min-h-[380px]
        flex-col
        items-center
        justify-center
        rounded-[30px]
        border
        border-dashed
        border-[#28211F]/15
        bg-white/40
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
        <Dumbbell
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
        New workouts are coming.
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
        There aren&apos;t any published workouts yet.
        Check back soon for a new way to move.
      </p>
    </div>
  );
}