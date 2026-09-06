"use client";

import {
  useMemo,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  Clock3,
  Coffee,
  Dumbbell,
  Flame,
  Footprints,
  Gauge,
  Globe2,
  HeartPulse,
  MapPin,
  Route,
  Salad,
  Sparkles,
  Target,
  TimerReset,
  Users,
  X,
  Zap,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import { FoodCard } from "@/components/UI/FoodCard";
import { WorkoutCard } from "@/components/UI/WorkoutCard";

/* ═════════════════════════════════════
   TYPES
═════════════════════════════════════ */

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

type RunningContentItem = {
  id: string;

  title: string;
  slug: string;

  summary: string | null;
  content: string | null;

  type: RunningContentType;
  difficulty: RunningDifficulty;

  image: string;
  imagePath: string | null;

  durationWeeks: number | null;
  runsPerWeek: number | null;
  distanceKm: number | null;

  location: string | null;
  eventDate: string | null;
  meetingPoint: string | null;
  pace: string | null;

  challengeTarget: string | null;

  tags: string[];

  isPublished: boolean;
  isFeatured: boolean;

  createdAt: string;
  updatedAt: string;
};

type WorkoutItem = {
  id: string;
  title: string;
  slug: string;

  description: string | null;
  image: string;

  category: string;

  difficulty:
    | "BEGINNER"
    | "INTERMEDIATE"
    | "ADVANCED";

  durationMinutes: number | null;
  caloriesBurned: number | null;

  targetAreas: string[];

  isFeatured: boolean;

  _count: {
    exercises: number;
  };
};

type RecipeItem = {
  id: string;
  title: string;
  slug: string;

  image: string;
  category: string;

  protein: number;
  calories: number;
};

type RunningPageClientProps = {
  runningContent: RunningContentItem[];
  workouts: WorkoutItem[];
  recipes: RecipeItem[];
};

/* ═════════════════════════════════════
   RUN TYPES
═════════════════════════════════════ */

const runTypes = [
  {
    id: "easy",
    title: "Easy Run",
    tagline: "The one you should do more often.",
    description:
      "Comfortable, controlled running where conversation should still be possible. Easy runs build consistency without draining you.",
    effort: "3–4 / 10",
    purpose: "Aerobic base",
    icon: Footprints,
  },
  {
    id: "long",
    title: "Long Run",
    tagline: "More time on your feet.",
    description:
      "A longer controlled effort designed to build endurance. The focus is time and consistency rather than trying to make every kilometre fast.",
    effort: "4–5 / 10",
    purpose: "Endurance",
    icon: Route,
  },
  {
    id: "tempo",
    title: "Tempo",
    tagline: "Comfortably uncomfortable.",
    description:
      "A sustained harder effort that teaches your body to hold speed. Challenging, but still controlled rather than all-out.",
    effort: "7 / 10",
    purpose: "Speed endurance",
    icon: Gauge,
  },
  {
    id: "intervals",
    title: "Intervals",
    tagline: "Fast. Recover. Repeat.",
    description:
      "Shorter faster efforts separated by recovery. Great for improving speed and making quicker running feel more natural.",
    effort: "8–9 / 10",
    purpose: "Speed",
    icon: Zap,
  },
  {
    id: "recovery",
    title: "Recovery",
    tagline: "Slow is the point.",
    description:
      "A deliberately gentle run between harder sessions. There is nothing to prove here — the goal is simply movement.",
    effort: "2–3 / 10",
    purpose: "Recovery",
    icon: HeartPulse,
  },
];

/* ═════════════════════════════════════
   PAGE
═════════════════════════════════════ */

export function RunningPageClient({
  runningContent,
  workouts,
  recipes,
}: RunningPageClientProps) {
  const heroRef =
    useRef<HTMLElement>(null);

  const [activeRunType, setActiveRunType] =
    useState(runTypes[0]);

  const [
    selectedContent,
    setSelectedContent,
  ] =
    useState<RunningContentItem | null>(
      null
    );

  const mouseX =
    useMotionValue(0);

  const mouseY =
    useMotionValue(0);

  const routeXRaw =
    useTransform(
      mouseX,
      [-1, 1],
      [-24, 24]
    );

  const routeYRaw =
    useTransform(
      mouseY,
      [-1, 1],
      [-14, 14]
    );

  const copyXRaw =
    useTransform(
      mouseX,
      [-1, 1],
      [5, -5]
    );

  const copyYRaw =
    useTransform(
      mouseY,
      [-1, 1],
      [4, -4]
    );

  const routeX =
    useSpring(routeXRaw, {
      stiffness: 60,
      damping: 22,
    });

  const routeY =
    useSpring(routeYRaw, {
      stiffness: 60,
      damping: 22,
    });

  const copyX =
    useSpring(copyXRaw, {
      stiffness: 80,
      damping: 26,
    });

  const copyY =
    useSpring(copyYRaw, {
      stiffness: 80,
      damping: 26,
    });

  function handlePointerMove(
    event: PointerEvent<HTMLElement>
  ) {
    if (
      event.pointerType === "touch"
    ) {
      return;
    }

    const bounds =
      event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX -
        bounds.left) /
      bounds.width;

    const y =
      (event.clientY -
        bounds.top) /
      bounds.height;

    mouseX.set(x * 2 - 1);
    mouseY.set(y * 2 - 1);
  }

  function handlePointerLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  /* ═════════════════════════════════════
     CONTENT GROUPS
  ══════════════════════════════════════ */

  const guides = useMemo(
    () =>
      runningContent.filter(
        (item) =>
          item.type === "GUIDE"
      ),
    [runningContent]
  );

  const plans = useMemo(
    () =>
      runningContent.filter(
        (item) =>
          item.type === "PLAN"
      ),
    [runningContent]
  );

  const journals = useMemo(
    () =>
      runningContent.filter(
        (item) =>
          item.type === "JOURNAL"
      ),
    [runningContent]
  );

  const cityGuides = useMemo(
    () =>
      runningContent.filter(
        (item) =>
          item.type ===
          "CITY_GUIDE"
      ),
    [runningContent]
  );

  const challenges = useMemo(
    () =>
      runningContent.filter(
        (item) =>
          item.type ===
          "CHALLENGE"
      ),
    [runningContent]
  );

  const runClubEvents = useMemo(
    () =>
      runningContent
        .filter(
          (item) =>
            item.type ===
            "RUN_CLUB_EVENT"
        )
        .sort((a, b) => {
          if (!a.eventDate) {
            return 1;
          }

          if (!b.eventDate) {
            return -1;
          }

          return (
            new Date(
              a.eventDate
            ).getTime() -
            new Date(
              b.eventDate
            ).getTime()
          );
        }),
    [runningContent]
  );

  const featuredChallenge =
    challenges.find(
      (item) =>
        item.isFeatured
    ) ||
    challenges[0] ||
    null;

  return (
    <main className="overflow-hidden bg-[#FAF7F5] text-[#28211F]">
      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}

      <section
        ref={heroRef}
        onPointerMove={
          handlePointerMove
        }
        onPointerLeave={
          handlePointerLeave
        }
        className="
          relative
          min-h-screen
          overflow-hidden
          bg-[#EDE3DF]
        "
      >
        {/* atmosphere */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_72%_32%,rgba(216,163,153,0.38),transparent_30%),radial-gradient(circle_at_15%_78%,rgba(255,255,255,0.85),transparent_32%)]
          "
        />

        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -25, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none
            absolute
            -right-[18%]
            -top-[10%]
            h-[800px]
            w-[800px]
            rounded-full
            bg-[#E7B6AB]/30
            blur-[125px]
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            min-h-screen
            max-w-[1440px]
            items-center
            px-5
            pb-16
            pt-32
            sm:px-8
            lg:px-16
            xl:px-20
          "
        >
          <div
            className="
              grid
              w-full
              gap-14
              lg:grid-cols-[0.92fr_1.08fr]
              lg:items-center
            "
          >
            {/* COPY */}

            <motion.div
              style={{
                x: copyX,
                y: copyY,
              }}
            >
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
                <Footprints
                  size={12}
                  className="text-[#B87E74]"
                />

                <span
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.22em]
                    text-[#B87E74]
                  "
                >
                  Kuska Running
                </span>
              </div>

              <h1
                className="
                  mt-7
                  max-w-[780px]
                  font-serif
                  text-[60px]
                  leading-[0.87]
                  tracking-[-0.055em]
                  sm:text-[80px]
                  lg:text-[96px]
                "
              >
                Run fast.
                <br />
                Run slow.
                <br />

                <span className="italic text-[#B87E74]">
                  Just keep moving.
                </span>
              </h1>

              <p
                className="
                  mt-8
                  max-w-[540px]
                  text-sm
                  leading-7
                  text-[#74625C]
                  sm:text-[15px]
                "
              >
                Running is where movement becomes
                beautifully simple. Shoes on,
                outside, one foot after another —
                whether you&apos;re chasing a goal or
                simply clearing your head.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="#explore-running"
                  className="
                    group
                    inline-flex
                    h-12
                    items-center
                    gap-3
                    rounded-full
                    bg-[#28211F]
                    px-6
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-white
                    transition
                    hover:-translate-y-1
                  "
                >
                  Explore running

                  <ArrowDown
                    size={13}
                    className="
                      transition-transform
                      group-hover:translate-y-1
                    "
                  />
                </Link>

                {runClubEvents.length >
                  0 && (
                  <Link
                    href="#run-club"
                    className="
                      inline-flex
                      h-12
                      items-center
                      rounded-full
                      border
                      border-[#28211F]/10
                      bg-white/35
                      px-6
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.15em]
                      backdrop-blur-xl
                      transition
                      hover:bg-white
                    "
                  >
                    Run with us
                  </Link>
                )}
              </div>
            </motion.div>

            {/* ROUTE VISUAL */}

            <motion.div
              style={{
                x: routeX,
                y: routeY,
              }}
              className="
                relative
                hidden
                h-[610px]
                lg:block
              "
            >
              <svg
                viewBox="0 0 700 620"
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  overflow-visible
                "
                fill="none"
              >
                {/* orbital routes */}

                <path
                  d="
                    M75 360
                    C120 170 265 125 355 270
                    C420 380 515 385 595 270
                    C645 198 628 120 565 80
                  "
                  stroke="rgba(40,33,31,0.09)"
                  strokeWidth="16"
                  strokeLinecap="round"
                />

                <motion.path
                  d="
                    M75 360
                    C120 170 265 125 355 270
                    C420 380 515 385 595 270
                    C645 198 628 120 565 80
                  "
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="8 18"
                  animate={{
                    strokeDashoffset:
                      -104,
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                <motion.path
                  d="
                    M75 360
                    C120 170 265 125 355 270
                    C420 380 515 385 595 270
                    C645 198 628 120 565 80
                  "
                  stroke="#B87E74"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="35 160"
                  animate={{
                    strokeDashoffset:
                      -390,
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* markers */}

                <circle
                  cx="75"
                  cy="360"
                  r="8"
                  fill="#28211F"
                />

                <circle
                  cx="355"
                  cy="270"
                  r="8"
                  fill="#B87E74"
                />

                <circle
                  cx="565"
                  cy="80"
                  r="8"
                  fill="#28211F"
                />

                <motion.circle
                  cx="565"
                  cy="80"
                  r="15"
                  stroke="#B87E74"
                  strokeWidth="1"
                  animate={{
                    r: [15, 30],
                    opacity: [0.6, 0],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                  }}
                />
              </svg>

              {/* CARD 1 */}

              <motion.div
                animate={{
                  y: [0, -9, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  absolute
                  left-[9%]
                  top-[14%]
                  rounded-[22px]
                  border
                  border-white/60
                  bg-white/45
                  p-5
                  shadow-[0_20px_60px_rgba(74,48,40,0.08)]
                  backdrop-blur-[24px]
                "
              >
                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-[#B87E74]
                  "
                >
                  Reka&apos;s rhythm
                </p>

                <p
                  className="
                    mt-2
                    font-serif
                    text-[30px]
                    leading-none
                  "
                >
                  3–4
                </p>

                <p
                  className="
                    mt-2
                    text-[10px]
                    text-[#7A6C67]
                  "
                >
                  runs most weeks
                </p>
              </motion.div>

              {/* CARD 2 */}

              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 6.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  absolute
                  bottom-[18%]
                  right-[4%]
                  w-[210px]
                  rounded-[22px]
                  border
                  border-white/60
                  bg-white/45
                  p-5
                  shadow-[0_20px_60px_rgba(74,48,40,0.08)]
                  backdrop-blur-[24px]
                "
              >
                <div className="flex items-center gap-2">
                  <HeartPulse
                    size={13}
                    className="text-[#B87E74]"
                  />

                  <p
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-[#B87E74]
                    "
                  >
                    The goal
                  </p>
                </div>

                <p
                  className="
                    mt-4
                    font-serif
                    text-[25px]
                    leading-[1]
                  "
                >
                  Feel better.
                </p>

                <p
                  className="
                    mt-3
                    text-[10px]
                    leading-5
                    text-[#7A6C67]
                  "
                >
                  Progress matters.
                  Wellbeing matters more.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          GUIDES
      ═══════════════════════════════════════ */}

      {guides.length > 0 && (
        <section
          id="explore-running"
          className="
            bg-[#EDE3DF]
            px-5
            py-24
            sm:px-8
            lg:px-16
            lg:py-32
          "
        >
          <div className="mx-auto max-w-[1440px]">
            <SectionHeading
              eyebrow="Learn to run"
              title="Explore running."
              italic="Start where you are."
              description=""
            />

            <div
              className="
                mt-12
                grid
                gap-5
                md:grid-cols-2
                xl:grid-cols-3
              "
            >
              {guides.map(
                (guide, index) => (
                  <RunningContentCard
                    key={guide.id}
                    item={guide}
                    index={index}
                    onClick={() =>
                      setSelectedContent(
                        guide
                      )
                    }
                  />
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          PLANS
      ═══════════════════════════════════════ */}

      {plans.length > 0 && (
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
            <SectionHeading
              eyebrow="Running plans"
              title="Have a goal?"
              italic="Give it some structure."
              description="Plans for building consistency, reaching a new distance or giving your running a little more direction."
            />

            <div
              className="
                mt-12
                grid
                gap-px
                overflow-hidden
                rounded-[30px]
                bg-[#28211F]/10
                lg:grid-cols-3
              "
            >
              {plans.map(
                (plan, index) => (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() =>
                      setSelectedContent(
                        plan
                      )
                    }
                    className="
                      group
                      min-h-[380px]
                      bg-white
                      p-8
                      text-left
                      transition-colors
                      duration-500
                      hover:bg-[#28211F]
                      sm:p-9
                    "
                  >
                    <div
                      className="
                        flex
                        h-full
                        flex-col
                        justify-between
                      "
                    >
                      <div
                        className="
                          flex
                          items-center
                          justify-between
                        "
                      >
                        <span
                          className="
                            text-[10px]
                            tracking-[0.18em]
                            text-[#B87E74]
                            group-hover:text-[#E7B6AB]
                          "
                        >
                          0{index + 1}
                        </span>

                        <Route
                          size={17}
                          className="
                            text-[#B87E74]
                            group-hover:text-[#E7B6AB]
                          "
                        />
                      </div>

                      <div className="mt-20">
                        <div
                          className="
                            flex
                            flex-wrap
                            gap-2
                          "
                        >
                          {plan.durationWeeks !==
                            null && (
                            <PlanPill>
                              {
                                plan.durationWeeks
                              }{" "}
                              weeks
                            </PlanPill>
                          )}

                          {plan.runsPerWeek !==
                            null && (
                            <PlanPill>
                              {
                                plan.runsPerWeek
                              }{" "}
                              runs / week
                            </PlanPill>
                          )}

                          {plan.distanceKm !==
                            null && (
                            <PlanPill>
                              {
                                plan.distanceKm
                              }{" "}
                              km goal
                            </PlanPill>
                          )}
                        </div>

                        <h3
                          className="
                            mt-5
                            font-serif
                            text-[35px]
                            leading-[1]
                            tracking-[-0.03em]
                            transition-colors
                            group-hover:text-white
                          "
                        >
                          {plan.title}
                        </h3>

                        {plan.summary && (
                          <p
                            className="
                              mt-5
                              text-sm
                              leading-7
                              text-[#7A6C67]
                              transition-colors
                              group-hover:text-white/50
                            "
                          >
                            {plan.summary}
                          </p>
                        )}

                        <div
                          className="
                            mt-7
                            flex
                            items-center
                            gap-2
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-[0.15em]
                            text-[#B87E74]
                            group-hover:text-[#E7B6AB]
                          "
                        >
                          Explore plan

                          <ArrowRight
                            size={12}
                          />
                        </div>
                      </div>
                    </div>
                  </button>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          UNDERSTAND THE RUN
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
                  text-[#E7B6AB]
                "
              >
                Understand your run
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
                Not every run
                <br />
                should feel{" "}

                <span className="italic text-[#E7B6AB]">
                  the same.
                </span>
              </h2>

              <p
                className="
                  mt-7
                  max-w-[340px]
                  text-sm
                  leading-7
                  text-white/45
                "
              >
                Different sessions have different
                jobs. Click through them and learn
                what each run is actually for.
              </p>
            </div>

            <div>
              {/* SELECTOR */}

              <div
                className="
                  flex
                  gap-2
                  overflow-x-auto
                  pb-3
                "
              >
                {runTypes.map(
                  (run) => (
                    <button
                      key={run.id}
                      type="button"
                      onClick={() =>
                        setActiveRunType(
                          run
                        )
                      }
                      className={`
                        shrink-0
                        rounded-full
                        border
                        px-4
                        py-2.5
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        transition

                        ${
                          activeRunType.id ===
                          run.id
                            ? "border-[#E7B6AB] bg-[#E7B6AB] text-[#28211F]"
                            : "border-white/10 bg-white/[0.04] text-white/45 hover:text-white"
                        }
                      `}
                    >
                      {run.title}
                    </button>
                  )
                )}
              </div>

              <div
                className="
                  mt-5
                  min-h-[390px]
                  overflow-hidden
                  rounded-[30px]
                  border
                  border-white/10
                  bg-white/[0.04]
                  p-8
                  sm:p-10
                "
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={
                      activeRunType.id
                    }
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                  >
                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-5
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
                          bg-[#E7B6AB]
                          text-[#28211F]
                        "
                      >
                        <activeRunType.icon
                          size={18}
                        />
                      </div>

                      <p
                        className="
                          font-serif
                          text-[70px]
                          leading-none
                          text-white/[0.05]
                        "
                      >
                        RUN
                      </p>
                    </div>

                    <p
                      className="
                        mt-10
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                        text-[#E7B6AB]
                      "
                    >
                      {
                        activeRunType.tagline
                      }
                    </p>

                    <h3
                      className="
                        mt-3
                        font-serif
                        text-[45px]
                        tracking-[-0.04em]
                      "
                    >
                      {
                        activeRunType.title
                      }
                    </h3>

                    <p
                      className="
                        mt-6
                        max-w-[720px]
                        text-sm
                        leading-7
                        text-white/50
                      "
                    >
                      {
                        activeRunType.description
                      }
                    </p>

                    <div
                      className="
                        mt-9
                        grid
                        gap-px
                        overflow-hidden
                        rounded-[18px]
                        bg-white/10
                        sm:grid-cols-2
                      "
                    >
                      <RunMetric
                        label="Effort"
                        value={
                          activeRunType.effort
                        }
                      />

                      <RunMetric
                        label="Main purpose"
                        value={
                          activeRunType.purpose
                        }
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          RUNNING + STRENGTH
      ═══════════════════════════════════════ */}

      {workouts.length > 0 && (
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
            <SectionHeading
              eyebrow="Running × strength"
              title="Running isn't"
              italic="the whole picture."
              description="Strength work can make your running more resilient, balanced and enjoyable. These sessions fit naturally alongside your weekly runs."
            />

            <div className="mt-12 space-y-5">
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
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          FUEL YOUR RUN
      ═══════════════════════════════════════ */}

      {recipes.length > 0 && (
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
                gap-10
                lg:grid-cols-[330px_1fr]
                lg:gap-20
              "
            >
              <div>
                <div className="flex items-center gap-2">
                  <Salad
                    size={13}
                    className="text-[#B87E74]"
                  />

                  <p
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-[#B87E74]
                    "
                  >
                    Fuel your run
                  </p>
                </div>

                <h2
                  className="
                    mt-5
                    font-serif
                    text-[48px]
                    leading-[0.95]
                    tracking-[-0.04em]
                    sm:text-[58px]
                  "
                >
                  Run.
                  <br />
                  Eat.
                  <br />

                  <span className="italic text-[#B87E74]">
                    Recover.
                  </span>
                </h2>

                <p
                  className="
                    mt-7
                    max-w-[310px]
                    text-sm
                    leading-7
                    text-[#7A6C67]
                  "
                >
                  Good running needs good
                  food. Nothing exotic — just
                  enough energy, enough protein
                  and meals you actually enjoy.
                </p>

                <Link
                  href="/nutrition"
                  className="
                    group
                    mt-7
                    inline-flex
                    items-center
                    gap-2
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                  "
                >
                  All recipes

                  <ArrowUpRight
                    size={12}
                    className="
                      transition-transform
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                    "
                  />
                </Link>
              </div>

              <div
                className="
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
                      title={
                        recipe.title
                      }
                      image={
                        recipe.image
                      }
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
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          RUN THE WORLD
      ═══════════════════════════════════════ */}

      {cityGuides.length > 0 && (
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
            <SectionHeading
              eyebrow="Run the world"
              title="The best way to"
              italic="see a city?"
              description="Sometimes the best travel plan starts with running shoes. Explore places through routes, movement, food and whatever comes after."
            />

            <div
              className="
                mt-12
                grid
                gap-5
                md:grid-cols-2
              "
            >
              {cityGuides.map(
                (guide, index) => (
                  <CityGuideCard
                    key={guide.id}
                    item={guide}
                    index={index}
                    onClick={() =>
                      setSelectedContent(
                        guide
                      )
                    }
                  />
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          RUN CLUB
      ═══════════════════════════════════════ */}

      {runClubEvents.length > 0 && (
        <section
          id="run-club"
          className="
            bg-[#EDE3DF]
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
                lg:grid-cols-[370px_1fr]
                lg:gap-20
              "
            >
              <div>
                <div className="flex items-center gap-2">
                  <Users
                    size={13}
                    className="text-[#B87E74]"
                  />

                  <p
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-[#B87E74]
                    "
                  >
                    Kuska Run Club
                  </p>
                </div>

                <h2
                  className="
                    mt-5
                    font-serif
                    text-[49px]
                    leading-[0.94]
                    tracking-[-0.04em]
                    sm:text-[60px]
                  "
                >
                  Come for the run.
                  <br />

                  <span className="italic text-[#B87E74]">
                    Stay for the people.
                  </span>
                </h2>

                <p
                  className="
                    mt-7
                    max-w-[350px]
                    text-sm
                    leading-7
                    text-[#7A6C67]
                  "
                >
                  No pace pressure. No need to
                  prove anything. Just people
                  moving together, usually with
                  something good afterwards.
                </p>

                <div
                  className="
                    mt-7
                    flex
                    items-center
                    gap-2
                    text-[10px]
                    text-[#806C65]
                  "
                >
                  <Coffee
                    size={13}
                    className="text-[#B87E74]"
                  />

                  Running + coffee is encouraged.
                </div>
              </div>

              <div className="space-y-4">
                {runClubEvents.map(
                  (event) => (
                    <RunClubCard
                      key={event.id}
                      item={event}
                      onClick={() =>
                        setSelectedContent(
                          event
                        )
                      }
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          JOURNAL
      ═══════════════════════════════════════ */}

      {journals.length > 0 && (
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
            <SectionHeading
              eyebrow="Running journal"
              title="Not everything needs"
              italic="to be a guide."
              description="Thoughts, good runs, terrible runs, things learned along the way and whatever else happens between the kilometres."
            />

            <div
              className="
                mt-12
                grid
                gap-px
                overflow-hidden
                rounded-[30px]
                bg-[#28211F]/10
                md:grid-cols-2
                xl:grid-cols-3
              "
            >
              {journals.map(
                (journal, index) => (
                  <button
                    key={journal.id}
                    type="button"
                    onClick={() =>
                      setSelectedContent(
                        journal
                      )
                    }
                    className="
                      group
                      min-h-[320px]
                      bg-white
                      p-8
                      text-left
                      transition
                      hover:bg-[#28211F]
                    "
                  >
                    <div
                      className="
                        flex
                        h-full
                        flex-col
                        justify-between
                      "
                    >
                      <div
                        className="
                          flex
                          items-center
                          justify-between
                        "
                      >
                        <span
                          className="
                            text-[10px]
                            text-[#B87E74]
                            group-hover:text-[#E7B6AB]
                          "
                        >
                          0{index + 1}
                        </span>

                        <Sparkles
                          size={13}
                          className="
                            text-[#B87E74]
                            group-hover:text-[#E7B6AB]
                          "
                        />
                      </div>

                      <div className="mt-16">
                        <p
                          className="
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-[0.16em]
                            text-[#B87E74]
                            group-hover:text-[#E7B6AB]
                          "
                        >
                          From Reka
                        </p>

                        <h3
                          className="
                            mt-3
                            font-serif
                            text-[31px]
                            leading-[1]
                            tracking-[-0.03em]
                            group-hover:text-white
                          "
                        >
                          {
                            journal.title
                          }
                        </h3>

                        {journal.summary && (
                          <p
                            className="
                              mt-5
                              text-sm
                              leading-7
                              text-[#7A6C67]
                              group-hover:text-white/50
                            "
                          >
                            {
                              journal.summary
                            }
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          CHALLENGE
      ═══════════════════════════════════════ */}

      {featuredChallenge && (
        <section
          className="
            px-5
            pb-24
            sm:px-8
            lg:px-16
            lg:pb-32
          "
        >
          <button
            type="button"
            onClick={() =>
              setSelectedContent(
                featuredChallenge
              )
            }
            className="
              group
              relative
              mx-auto
              block
              w-full
              max-w-[1440px]
              overflow-hidden
              rounded-[34px]
              bg-[#E7B6AB]
              px-7
              py-16
              text-left
              sm:px-10
              lg:px-16
              lg:py-20
            "
          >
            <div
              className="
                pointer-events-none
                absolute
                -right-[15%]
                -top-[120%]
                h-[750px]
                w-[750px]
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
                gap-12
                lg:grid-cols-[1fr_390px]
                lg:items-end
              "
            >
              <div>
                <div className="flex items-center gap-2">
                  <Target
                    size={13}
                    className="text-[#704F48]"
                  />

                  <p
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.22em]
                      text-[#704F48]
                    "
                  >
                    Current challenge
                  </p>
                </div>

                <h2
                  className="
                    mt-6
                    max-w-[850px]
                    font-serif
                    text-[48px]
                    leading-[0.94]
                    tracking-[-0.04em]
                    sm:text-[64px]
                  "
                >
                  {
                    featuredChallenge.title
                  }
                </h2>

                {featuredChallenge.challengeTarget && (
                  <div
                    className="
                      mt-7
                      inline-flex
                      rounded-full
                      border
                      border-[#704F48]/15
                      bg-white/20
                      px-4
                      py-2
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-[#704F48]
                    "
                  >
                    {
                      featuredChallenge.challengeTarget
                    }
                  </div>
                )}
              </div>

              <div>
                {featuredChallenge.summary && (
                  <p
                    className="
                      text-sm
                      leading-7
                      text-[#674D47]
                    "
                  >
                    {
                      featuredChallenge.summary
                    }
                  </p>
                )}

                <div
                  className="
                    mt-7
                    flex
                    items-center
                    gap-2
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-[#5F4540]
                  "
                >
                  View challenge

                  <ArrowUpRight
                    size={13}
                    className="
                      transition-transform
                      group-hover:-translate-y-1
                      group-hover:translate-x-1
                    "
                  />
                </div>
              </div>
            </div>
          </button>
        </section>
      )}

      {/* ═══════════════════════════════════════
          FINAL
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
            mx-auto
            max-w-[1440px]
            border-t
            border-[#28211F]/10
            pt-14
          "
        >
          <div
            className="
              grid
              gap-10
              lg:grid-cols-[1fr_400px]
              lg:items-end
            "
          >
            <h2
              className="
                max-w-[780px]
                font-serif
                text-[46px]
                leading-[0.95]
                tracking-[-0.04em]
                sm:text-[60px]
              "
            >
              Your pace.
              <br />
              Your distance.
              <br />

              <span className="italic text-[#B87E74]">
                Your run.
              </span>
            </h2>

            <p
              className="
                text-sm
                leading-7
                text-[#7A6C67]
              "
            >
              Running doesn&apos;t have to look
              impressive to matter. Start where
              you are, keep moving, and let the
              rest come with time.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CONTENT DETAIL MODAL
      ═══════════════════════════════════════ */}

      <AnimatePresence>
        {selectedContent && (
          <ContentDetailModal
            item={selectedContent}
            onClose={() =>
              setSelectedContent(
                null
              )
            }
          />
        )}
      </AnimatePresence>
    </main>
  );
}

/* ═════════════════════════════════════
   RUNNING CONTENT CARD
═════════════════════════════════════ */

function RunningContentCard({
  item,
  index,
  onClick,
}: {
  item: RunningContentItem;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{
        opacity: 0,
        y: 25,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        delay: index * 0.06,
      }}
      className="
        group
        relative
        min-h-[360px]
        overflow-hidden
        rounded-[28px]
        bg-[#28211F]
        text-left
      "
    >
      <img
        src={item.image}
        alt=""
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          opacity-70
          transition
          duration-700
          group-hover:scale-[1.04]
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-[#28211F]
          via-[#28211F]/45
          to-transparent
        "
      />

      <div
        className="
          relative
          z-10
          flex
          h-full
          min-h-[360px]
          flex-col
          justify-between
          p-7
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
          "
        >
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
              tracking-[0.16em]
              text-white
              backdrop-blur-xl
            "
          >
            {difficultyLabel(
              item.difficulty
            )}
          </span>

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/20
              bg-white/10
              text-white
              backdrop-blur-xl
              transition
              group-hover:bg-white
              group-hover:text-[#28211F]
            "
          >
            <ArrowUpRight
              size={14}
            />
          </div>
        </div>

        <div>
          <p
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-[#E7B6AB]
            "
          >
            Running guide
          </p>

          <h3
            className="
              mt-3
              max-w-[360px]
              font-serif
              text-[34px]
              leading-[0.98]
              tracking-[-0.03em]
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
                text-white/55
              "
            >
              {item.summary}
            </p>
          )}
        </div>
      </div>
    </motion.button>
  );
}

/* ═════════════════════════════════════
   CITY CARD
═════════════════════════════════════ */

function CityGuideCard({
  item,
  index,
  onClick,
}: {
  item: RunningContentItem;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{
        opacity: 0,
        y: 25,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        delay: index * 0.08,
      }}
      className="
        group
        grid
        overflow-hidden
        rounded-[28px]
        border
        border-[#E7DDD8]
        bg-white
        text-left
        sm:grid-cols-[220px_1fr]
      "
    >
      <div
        className="
          relative
          min-h-[230px]
          overflow-hidden
        "
      >
        <img
          src={item.image}
          alt=""
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            transition
            duration-700
            group-hover:scale-[1.05]
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-black/10
          "
        />
      </div>

      <div
        className="
          flex
          flex-col
          justify-between
          p-7
        "
      >
        <div>
          <div className="flex items-center gap-2">
            <Globe2
              size={12}
              className="text-[#B87E74]"
            />

            <p
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#B87E74]
              "
            >
              Run the world
            </p>
          </div>

          <h3
            className="
              mt-4
              font-serif
              text-[31px]
              leading-[1]
            "
          >
            {item.title}
          </h3>

          {item.location && (
            <p
              className="
                mt-3
                flex
                items-center
                gap-2
                text-xs
                text-[#806E68]
              "
            >
              <MapPin
                size={11}
              />

              {item.location}
            </p>
          )}

          {item.summary && (
            <p
              className="
                mt-5
                line-clamp-3
                text-xs
                leading-6
                text-[#7A6C67]
              "
            >
              {item.summary}
            </p>
          )}
        </div>

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
          "
        >
          Explore city

          <ChevronRight
            size={12}
          />
        </div>
      </div>
    </motion.button>
  );
}

/* ═════════════════════════════════════
   RUN CLUB CARD
═════════════════════════════════════ */

function RunClubCard({
  item,
  onClick,
}: {
  item: RunningContentItem;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        grid
        w-full
        gap-6
        rounded-[26px]
        border
        border-[#28211F]/10
        bg-white/60
        p-6
        text-left
        transition
        hover:-translate-y-1
        hover:bg-white
        sm:grid-cols-[120px_1fr_auto]
        sm:items-center
      "
    >
      <div>
        <p
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.16em]
            text-[#B87E74]
          "
        >
          Next run
        </p>

        <p
          className="
            mt-2
            font-serif
            text-[22px]
            leading-none
          "
        >
          {item.eventDate
            ? formatDate(
                item.eventDate
              )
            : "Coming soon"}
        </p>
      </div>

      <div>
        <h3
          className="
            font-serif
            text-[27px]
            leading-none
          "
        >
          {item.title}
        </h3>

        <div
          className="
            mt-4
            flex
            flex-wrap
            gap-x-5
            gap-y-2
            text-[10px]
            text-[#7A6C67]
          "
        >
          {item.location && (
            <span className="flex items-center gap-1.5">
              <MapPin
                size={11}
                className="text-[#B87E74]"
              />

              {item.location}
            </span>
          )}

          {item.distanceKm !==
            null && (
            <span className="flex items-center gap-1.5">
              <Route
                size={11}
                className="text-[#B87E74]"
              />

              {item.distanceKm} km
            </span>
          )}

          {item.pace && (
            <span className="flex items-center gap-1.5">
              <Gauge
                size={11}
                className="text-[#B87E74]"
              />

              {item.pace}
            </span>
          )}
        </div>
      </div>

      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          bg-[#28211F]
          text-white
          transition
          group-hover:bg-[#B87E74]
        "
      >
        <ArrowUpRight
          size={14}
        />
      </div>
    </button>
  );
}

/* ═════════════════════════════════════
   DETAIL MODAL
═════════════════════════════════════ */

function ContentDetailModal({
  item,
  onClose,
}: {
  item: RunningContentItem;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-end
        justify-center
        bg-[#28211F]/45
        p-0
        backdrop-blur-md
        sm:items-center
        sm:p-6
      "
      onClick={onClose}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 30,
        }}
        transition={{
          duration: 0.3,
        }}
        onClick={(event) =>
          event.stopPropagation()
        }
        className="
          relative
          max-h-[90vh]
          w-full
          max-w-[920px]
          overflow-y-auto
          rounded-t-[30px]
          bg-[#FAF7F5]
          shadow-[0_40px_120px_rgba(0,0,0,0.25)]
          sm:rounded-[30px]
        "
      >
        <div
          className="
            relative
            aspect-[16/7]
            overflow-hidden
            bg-[#EDE3DF]
          "
        >
          <img
            src={item.image}
            alt=""
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/45
              to-transparent
            "
          />

          <button
            type="button"
            onClick={onClose}
            className="
              absolute
              right-5
              top-5
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/20
              bg-black/20
              text-white
              backdrop-blur-xl
            "
          >
            <X size={15} />
          </button>

          <div
            className="
              absolute
              bottom-6
              left-6
              right-6
              text-white
            "
          >
            <p
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#F3CBC3]
              "
            >
              {typeLabel(item.type)}
            </p>

            <h2
              className="
                mt-2
                max-w-[700px]
                font-serif
                text-[37px]
                leading-[0.97]
                tracking-[-0.035em]
                sm:text-[48px]
              "
            >
              {item.title}
            </h2>
          </div>
        </div>

        <div
          className="
            p-7
            sm:p-10
          "
        >
          <div
            className="
              flex
              flex-wrap
              gap-2
            "
          >
            <MetaPill>
              {difficultyLabel(
                item.difficulty
              )}
            </MetaPill>

            {item.durationWeeks !==
              null && (
              <MetaPill>
                {
                  item.durationWeeks
                }{" "}
                weeks
              </MetaPill>
            )}

            {item.runsPerWeek !==
              null && (
              <MetaPill>
                {
                  item.runsPerWeek
                }{" "}
                runs / week
              </MetaPill>
            )}

            {item.distanceKm !==
              null && (
              <MetaPill>
                {item.distanceKm} km
              </MetaPill>
            )}

            {item.location && (
              <MetaPill>
                {item.location}
              </MetaPill>
            )}
          </div>

          {item.summary && (
            <p
              className="
                mt-7
                font-serif
                text-[25px]
                leading-[1.25]
                text-[#4F423E]
              "
            >
              {item.summary}
            </p>
          )}

          {item.content && (
            <div
              className="
                mt-7
                whitespace-pre-line
                text-sm
                leading-8
                text-[#6F5F59]
              "
            >
              {item.content}
            </div>
          )}

          {item.eventDate && (
            <div
              className="
                mt-8
                grid
                gap-3
                rounded-[20px]
                bg-[#F1E8E4]
                p-5
                sm:grid-cols-2
              "
            >
              <DetailRow
                icon={CalendarDays}
                label="Date"
                value={formatDateLong(
                  item.eventDate
                )}
              />

              {item.meetingPoint && (
                <DetailRow
                  icon={MapPin}
                  label="Meeting point"
                  value={
                    item.meetingPoint
                  }
                />
              )}

              {item.pace && (
                <DetailRow
                  icon={Gauge}
                  label="Pace"
                  value={item.pace}
                />
              )}

              {item.distanceKm !==
                null && (
                <DetailRow
                  icon={Route}
                  label="Distance"
                  value={`${item.distanceKm} km`}
                />
              )}
            </div>
          )}

          {item.challengeTarget && (
            <div
              className="
                mt-8
                rounded-[20px]
                bg-[#E7B6AB]
                p-6
              "
            >
              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-[#704F48]
                "
              >
                Challenge
              </p>

              <p
                className="
                  mt-2
                  font-serif
                  text-[28px]
                "
              >
                {
                  item.challengeTarget
                }
              </p>
            </div>
          )}

          {item.tags.length > 0 && (
            <div
              className="
                mt-8
                flex
                flex-wrap
                gap-2
              "
            >
              {item.tags.map(
                (tag) => (
                  <span
                    key={tag}
                    className="
                      rounded-full
                      border
                      border-[#28211F]/10
                      px-3
                      py-2
                      text-[9px]
                      text-[#79665F]
                    "
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═════════════════════════════════════
   SMALL COMPONENTS
═════════════════════════════════════ */

function SectionHeading({
  eyebrow,
  title,
  italic,
  description,
}: {
  eyebrow: string;
  title: string;
  italic: string;
  description: string;
}) {
  return (
    <div
      className="
        flex
        flex-col
        justify-between
        gap-7
        lg:flex-row
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
          {eyebrow}
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
          {title}
          <br />

          <span className="italic text-[#B87E74]">
            {italic}
          </span>
        </h2>
      </div>

      <p
        className="
          max-w-[440px]
          text-sm
          leading-7
          text-[#7A6C67]
        "
      >
        {description}
      </p>
    </div>
  );
}

function PlanPill({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span
      className="
        rounded-full
        border
        border-[#28211F]/10
        bg-[#FAF7F5]
        px-3
        py-2
        text-[8px]
        font-semibold
        uppercase
        tracking-[0.1em]
        text-[#79665F]
      "
    >
      {children}
    </span>
  );
}

function RunMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        bg-white/[0.04]
        p-5
      "
    >
      <p
        className="
          text-[8px]
          font-semibold
          uppercase
          tracking-[0.16em]
          text-white/30
        "
      >
        {label}
      </p>

      <p
        className="
          mt-3
          font-serif
          text-[23px]
          text-[#E7B6AB]
        "
      >
        {value}
      </p>
    </div>
  );
}

function MetaPill({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span
      className="
        rounded-full
        bg-[#F1E8E4]
        px-3
        py-2
        text-[9px]
        font-medium
        text-[#705E58]
      "
    >
      {children}
    </span>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock3;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon
        size={13}
        className="mt-0.5 text-[#B87E74]"
      />

      <div>
        <p
          className="
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.14em]
            text-[#9B8881]
          "
        >
          {label}
        </p>

        <p
          className="
            mt-1
            text-xs
            text-[#564944]
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}

/* ═════════════════════════════════════
   FORMATTERS
═════════════════════════════════════ */

function difficultyLabel(
  value: RunningDifficulty
) {
  switch (value) {
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

function typeLabel(
  type: RunningContentType
) {
  switch (type) {
    case "GUIDE":
      return "Running guide";

    case "PLAN":
      return "Training plan";

    case "JOURNAL":
      return "Running journal";

    case "CITY_GUIDE":
      return "City running guide";

    case "CHALLENGE":
      return "Challenge";

    case "RUN_CLUB_EVENT":
      return "Run club";
  }
}

function formatDate(
  value: string
) {
  return new Intl.DateTimeFormat(
    "en",
    {
      day: "2-digit",
      month: "short",
    }
  ).format(new Date(value));
}

function formatDateLong(
  value: string
) {
  return new Intl.DateTimeFormat(
    "en",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(new Date(value));
}