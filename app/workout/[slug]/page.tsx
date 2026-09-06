import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  Dumbbell,
  Flame,
  Layers3,
  Sparkles,
  Target,
  TimerReset,
} from "lucide-react";

import { WorkoutCard } from "@/components/UI/WorkoutCard";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type WorkoutPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/* ═════════════════════════════════════
   METADATA
═════════════════════════════════════ */

export async function generateMetadata({
  params,
}: WorkoutPageProps): Promise<Metadata> {
  const { slug } = await params;

  const workout = await prisma.workout.findFirst({
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

  if (!workout) {
    return {
      title: "Workout not found | Kuska Motion",
    };
  }

  return {
    title: `${workout.title} | Kuska Motion`,

    description:
      workout.description ||
      `Try the ${workout.title} workout from Kuska Motion.`,

    openGraph: {
      title: workout.title,
      description:
        workout.description ||
        `Try the ${workout.title} workout from Kuska Motion.`,
      images: [
        {
          url: workout.image,
        },
      ],
    },
  };
}

/* ═════════════════════════════════════
   PAGE
═════════════════════════════════════ */

export default async function WorkoutSlugPage({
  params,
}: WorkoutPageProps) {
  const { slug } = await params;

  const workout = await prisma.workout.findFirst({
    where: {
      slug,
      isPublished: true,
    },

    include: {
      exercises: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  if (!workout) {
    notFound();
  }

  /*
    First try to show workouts from the same category.
  */
  let relatedWorkouts = await prisma.workout.findMany({
    where: {
      isPublished: true,

      id: {
        not: workout.id,
      },

      category: workout.category,
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
  });

  /*
    If there aren't enough workouts in the same category,
    fill the remaining positions with other published workouts.
  */
  if (relatedWorkouts.length < 3) {
    const existingIds = [
      workout.id,
      ...relatedWorkouts.map((item) => item.id),
    ];

    const additionalWorkouts =
      await prisma.workout.findMany({
        where: {
          isPublished: true,

          id: {
            notIn: existingIds,
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

        take: 3 - relatedWorkouts.length,

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

    relatedWorkouts = [
      ...relatedWorkouts,
      ...additionalWorkouts,
    ];
  }

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
        {/* Background atmosphere */}

        <div
          className="
            pointer-events-none
            absolute
            -right-[12%]
            -top-[40%]
            h-[720px]
            w-[720px]
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
            bg-white/70
            blur-[115px]
          "
        />

        <div className="relative mx-auto max-w-[1440px]">
          {/* BACK */}

          <Link
            href="/workout"
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

            All workouts
          </Link>

          <div
            className="
              mt-9
              grid
              gap-12
              lg:grid-cols-[0.88fr_1.12fr]
              lg:items-end
              lg:gap-16
            "
          >
            {/* COPY */}

            <div className="lg:pb-7">
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
                  <Dumbbell
                    size={12}
                    strokeWidth={1.5}
                  />

                  {workout.category}
                </span>

                <span
                  className="
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
                  {prettyDifficulty(
                    workout.difficulty
                  )}
                </span>

                {workout.isFeatured && (
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

                    Kuska&apos;s pick
                  </span>
                )}
              </div>

              <h1
                className="
                  mt-7
                  max-w-[720px]
                  font-serif
                  text-[52px]
                  leading-[0.91]
                  tracking-[-0.05em]
                  sm:text-[68px]
                  lg:text-[78px]
                "
              >
                {workout.title}
              </h1>

              {workout.description && (
                <p
                  className="
                    mt-7
                    max-w-[610px]
                    text-sm
                    leading-7
                    text-[#74625C]
                    sm:text-[15px]
                  "
                >
                  {workout.description}
                </p>
              )}

              {/* HERO STATS */}

              <div
                className="
                  mt-9
                  grid
                  max-w-[650px]
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
                {workout.durationMinutes !== null && (
                  <HeroStat
                    label="Duration"
                    value={`${workout.durationMinutes}`}
                    suffix="min"
                  />
                )}

                <HeroStat
                  label="Exercises"
                  value={`${workout.exercises.length}`}
                />

                {workout.caloriesBurned !== null && (
                  <HeroStat
                    label="Burn"
                    value={`${workout.caloriesBurned}`}
                    suffix="cal"
                  />
                )}

                <HeroStat
                  label="Level"
                  value={shortDifficulty(
                    workout.difficulty
                  )}
                />
              </div>
            </div>

            {/* IMAGE */}

            <div
              className="
                relative
                aspect-[4/3]
                overflow-hidden
                rounded-[32px]
                border
                border-white/60
                bg-[#DDD0CA]
                shadow-[0_35px_100px_rgba(88,57,48,0.14)]
                lg:aspect-[5/4]
              "
            >
              <Image
                src={workout.image}
                alt={workout.title}
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
                  from-black/20
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
                Kuska Motion Training
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WORKOUT INFORMATION
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
              lg:grid-cols-[340px_1fr]
              lg:items-start
              lg:gap-20
            "
          >
            {/* ═════════════════════════════════
                STICKY SIDEBAR
            ═════════════════════════════════ */}

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
                  <Dumbbell
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
                    Workout
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
                {workout.durationMinutes !== null && (
                  <SummaryRow
                    icon={Clock3}
                    label="Duration"
                    value={`${workout.durationMinutes} min`}
                  />
                )}

                <SummaryRow
                  icon={Layers3}
                  label="Exercises"
                  value={`${workout.exercises.length}`}
                />

                <SummaryRow
                  icon={Dumbbell}
                  label="Difficulty"
                  value={prettyDifficulty(
                    workout.difficulty
                  )}
                />

                {workout.caloriesBurned !== null && (
                  <SummaryRow
                    icon={Flame}
                    label="Approx. burn"
                    value={`${workout.caloriesBurned} cal`}
                  />
                )}
              </div>

              {/* EQUIPMENT */}

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
                  Equipment
                </p>

                {workout.equipment.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {workout.equipment.map((item) => (
                      <span
                        key={item}
                        className="
                          rounded-full
                          border
                          border-[#28211F]/10
                          bg-white/50
                          px-3
                          py-2
                          text-[9px]
                          text-[#6E5D57]
                        "
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-xs text-[#8D7972]">
                    No equipment required.
                  </p>
                )}
              </div>

              {/* TARGET AREAS */}

              {workout.targetAreas.length > 0 && (
                <div
                  className="
                    mt-7
                    border-t
                    border-[#28211F]/10
                    pt-7
                  "
                >
                  <div className="flex items-center gap-2">
                    <Target
                      size={12}
                      className="text-[#B87E74]"
                    />

                    <p
                      className="
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                        text-[#A1847B]
                      "
                    >
                      Target areas
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {workout.targetAreas.map(
                      (area) => (
                        <span
                          key={area}
                          className="
                            rounded-full
                            bg-[#E7B6AB]/25
                            px-3
                            py-2
                            text-[9px]
                            font-medium
                            text-[#805F57]
                          "
                        >
                          {area}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}
            </aside>

            {/* ═════════════════════════════════
                EXERCISES
            ═════════════════════════════════ */}

            <div>
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
                    The session
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
                    Your workout.
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
                  {workout.exercises.length}{" "}
                  {workout.exercises.length === 1
                    ? "exercise"
                    : "exercises"}
                </p>
              </div>

              {workout.exercises.length > 0 ? (
                <div className="mt-6 space-y-4">
                  {workout.exercises.map(
                    (exercise, index) => (
                      <ExerciseCard
                        key={exercise.id}
                        number={index + 1}
                        name={exercise.name}
                        sets={exercise.sets}
                        reps={exercise.reps}
                        durationSeconds={
                          exercise.durationSeconds
                        }
                        restSeconds={
                          exercise.restSeconds
                        }
                        notes={exercise.notes}
                      />
                    )
                  )}
                </div>
              ) : (
                <div
                  className="
                    mt-7
                    rounded-[24px]
                    border
                    border-dashed
                    border-[#28211F]/15
                    p-8
                  "
                >
                  <p className="text-sm text-[#7A6C67]">
                    Exercises haven&apos;t been added to
                    this workout yet.
                  </p>
                </div>
              )}

              {/* GENERAL NOTE */}

              <div
                className="
                  mt-10
                  rounded-[24px]
                  border
                  border-[#B87E74]/15
                  bg-[#F3E9E5]
                  p-6
                  sm:p-7
                "
              >
                <div className="flex items-start gap-4">
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#28211F]
                      text-[#E7B6AB]
                    "
                  >
                    <Sparkles
                      size={14}
                      strokeWidth={1.5}
                    />
                  </div>

                  <div>
                    <p
                      className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.17em]
                        text-[#B87E74]
                      "
                    >
                      Remember
                    </p>

                    <p
                      className="
                        mt-2
                        max-w-[720px]
                        text-sm
                        leading-7
                        text-[#6F5D57]
                      "
                    >
                      Use the suggested sets, reps and rest
                      periods as a guide. Adjust the session
                      when needed so you can keep your form
                      strong and train at a level that makes
                      sense for you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PHILOSOPHY
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
              lg:grid-cols-[1fr_390px]
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
                  max-w-[800px]
                  font-serif
                  text-[44px]
                  leading-[0.95]
                  tracking-[-0.04em]
                  sm:text-[58px]
                "
              >
                Train enough to improve.
                <br />
                Not so much that you{" "}

                <span className="italic text-white">
                  stop enjoying it.
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
              A good workout should leave you feeling like
              you did something for yourself. Progress
              matters, but consistency and wellbeing matter
              more.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          OTHER WORKOUTS
      ═══════════════════════════════════════ */}

      {relatedWorkouts.length > 0 && (
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
          <div className="mx-auto max-w-[1240px]">
            <div
              className="
                mb-10
                flex
                flex-col
                justify-between
                gap-6
                border-b
                border-[#28211F]/10
                pb-8
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
                    Keep moving
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
                  Try another
                  <br />

                  <span className="italic text-[#B87E74]">
                    workout.
                  </span>
                </h2>
              </div>

              <Link
                href="/workout"
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
                View all workouts

                <ArrowRight
                  size={14}
                  className="
                    transition-transform
                    group-hover:translate-x-1
                  "
                />
              </Link>
            </div>

            <div className="space-y-5">
              {relatedWorkouts.map(
                (relatedWorkout) => (
                  <WorkoutCard
                    key={relatedWorkout.id}
                    title={
                      relatedWorkout.title
                    }
                    description={
                      relatedWorkout.description
                    }
                    image={
                      relatedWorkout.image
                    }
                    category={
                      relatedWorkout.category
                    }
                    difficulty={
                      relatedWorkout.difficulty
                    }
                    durationMinutes={
                      relatedWorkout.durationMinutes
                    }
                    caloriesBurned={
                      relatedWorkout.caloriesBurned
                    }
                    exerciseCount={
                      relatedWorkout._count
                        .exercises
                    }
                    targetAreas={
                      relatedWorkout.targetAreas
                    }
                    featured={
                      relatedWorkout.isFeatured
                    }
                    href={`/workout/${relatedWorkout.slug}`}
                  />
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          BOTTOM NAVIGATION
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
            max-w-[1240px]
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
              Kuska Motion Training
            </p>

            <p
              className="
                mt-2
                font-serif
                text-[28px]
                tracking-[-0.03em]
              "
            >
              Find your next session.
            </p>
          </div>

          <Link
            href="/workout"
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
            Browse workouts

            <ArrowRight
              size={13}
              className="
                transition-transform
                group-hover:translate-x-1
              "
            />
          </Link>
        </div>
      </section>
    </main>
  );
}

/* ═════════════════════════════════════
   EXERCISE CARD
═════════════════════════════════════ */

function ExerciseCard({
  number,
  name,
  sets,
  reps,
  durationSeconds,
  restSeconds,
  notes,
}: {
  number: number;
  name: string;

  sets: number | null;
  reps: string | null;

  durationSeconds: number | null;
  restSeconds: number | null;

  notes: string | null;
}) {
  return (
    <article
      className="
        group
        overflow-hidden
        rounded-[24px]
        border
        border-[#28211F]/10
        bg-white
        transition-all
        duration-300
        hover:border-[#D8B3A9]
        hover:shadow-[0_16px_45px_rgba(77,52,45,0.06)]
      "
    >
      <div
        className="
          grid
          gap-5
          p-6
          sm:grid-cols-[70px_1fr]
          sm:p-7
        "
      >
        {/* NUMBER */}

        <div>
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-[#F1E8E4]
              font-serif
              text-[18px]
              text-[#B87E74]
              transition-all
              duration-300
              group-hover:bg-[#28211F]
              group-hover:text-[#E7B6AB]
            "
          >
            {String(number).padStart(
              2,
              "0"
            )}
          </div>
        </div>

        {/* CONTENT */}

        <div>
          <h3
            className="
              font-serif
              text-[30px]
              leading-none
              tracking-[-0.03em]
              text-[#28211F]
            "
          >
            {name}
          </h3>

          <div
            className="
              mt-5
              flex
              flex-wrap
              gap-2
            "
          >
            {sets !== null && (
              <ExerciseValue
                label="Sets"
                value={`${sets}`}
              />
            )}

            {reps && (
              <ExerciseValue
                label="Reps"
                value={reps}
              />
            )}

            {durationSeconds !== null && (
              <ExerciseValue
                label="Duration"
                value={formatSeconds(
                  durationSeconds
                )}
              />
            )}

            {restSeconds !== null && (
              <ExerciseValue
                label="Rest"
                value={formatSeconds(
                  restSeconds
                )}
                icon
              />
            )}
          </div>

          {notes && (
            <div
              className="
                mt-6
                border-t
                border-[#28211F]/10
                pt-5
              "
            >
              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-[#B87E74]
                "
              >
                Kuska&apos;s note
              </p>

              <p
                className="
                  mt-2
                  max-w-[730px]
                  text-sm
                  leading-7
                  text-[#74625C]
                "
              >
                {notes}
              </p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

/* ═════════════════════════════════════
   EXERCISE VALUE
═════════════════════════════════════ */

function ExerciseValue({
  label,
  value,
  icon = false,
}: {
  label: string;
  value: string;
  icon?: boolean;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-2
        rounded-full
        border
        border-[#28211F]/10
        bg-[#FAF7F5]
        px-3.5
        py-2
      "
    >
      {icon && (
        <TimerReset
          size={11}
          strokeWidth={1.5}
          className="text-[#B87E74]"
        />
      )}

      <span
        className="
          text-[8px]
          font-semibold
          uppercase
          tracking-[0.12em]
          text-[#9A8780]
        "
      >
        {label}
      </span>

      <span
        className="
          text-[10px]
          font-semibold
          text-[#514440]
        "
      >
        {value}
      </span>
    </div>
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
            text-[24px]
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
   HELPERS
═════════════════════════════════════ */

function prettyDifficulty(
  difficulty:
    | "BEGINNER"
    | "INTERMEDIATE"
    | "ADVANCED"
) {
  switch (difficulty) {
    case "BEGINNER":
      return "Beginner";

    case "INTERMEDIATE":
      return "Intermediate";

    case "ADVANCED":
      return "Advanced";
  }
}

function shortDifficulty(
  difficulty:
    | "BEGINNER"
    | "INTERMEDIATE"
    | "ADVANCED"
) {
  switch (difficulty) {
    case "BEGINNER":
      return "Beginner";

    case "INTERMEDIATE":
      return "Intermediate";

    case "ADVANCED":
      return "Advanced";
  }
}

function formatSeconds(seconds: number) {
  if (seconds < 60) {
    return `${seconds} sec`;
  }

  const minutes = Math.floor(
    seconds / 60
  );

  const remainingSeconds =
    seconds % 60;

  if (remainingSeconds === 0) {
    return `${minutes} min`;
  }

  return `${minutes}m ${remainingSeconds}s`;
}