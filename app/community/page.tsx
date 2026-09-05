"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Coffee,
  Footprints,
  Heart,
  MapPin,
  Sparkles,
  Timer,
  Users,
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

/* ═════════════════════════════════════
   DATA
═════════════════════════════════════ */

const communityFeatures = [
  {
    number: "01",
    icon: Footprints,
    title: "Run Together",
    description:
      "Easy runs, longer sessions and social miles built around showing up, moving and enjoying the process.",
  },
  {
    number: "02",
    icon: Users,
    title: "Find Your People",
    description:
      "Meet people who care about movement, balance, good energy and making fitness part of real life.",
  },
  {
    number: "03",
    icon: Coffee,
    title: "Stay for Coffee",
    description:
      "Because the best run clubs are about more than the run. Coffee, breakfast, conversations and new friendships matter too.",
  },
  {
    number: "04",
    icon: Heart,
    title: "No Pressure",
    description:
      "You do not need to be fast. You do not need to look a certain way. Just come ready to move.",
  },
];

const runTypes = [
  {
    label: "Social Run",
    distance: "3–5 KM",
    pace: "Easy",
    description:
      "A relaxed community run where conversation matters more than the clock.",
  },
  {
    label: "Long Run",
    distance: "8–15 KM",
    pace: "Steady",
    description:
      "Build endurance together with a supportive group and an easy shared rhythm.",
  },
  {
    label: "Run + Coffee",
    distance: "5 KM",
    pace: "Social",
    description:
      "Move first, then stay around. Coffee, breakfast and community afterwards.",
  },
  {
    label: "Challenge Day",
    distance: "Your call",
    pace: "Personal",
    description:
      "A playful community challenge designed around progress rather than competition.",
  },
];

const values = [
  "Come as you are",
  "Progress over pace",
  "Move for yourself",
  "Community over competition",
  "Celebrate the small wins",
  "Leave with more energy",
];

/* ═════════════════════════════════════
   PAGE
═════════════════════════════════════ */

export default function CommunityPage() {
  const heroRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const routeXRaw = useTransform(
    mouseX,
    [-1, 1],
    [-16, 16]
  );

  const routeYRaw = useTransform(
    mouseY,
    [-1, 1],
    [-10, 10]
  );

  const cardXRaw = useTransform(
    mouseX,
    [-1, 1],
    [8, -8]
  );

  const cardYRaw = useTransform(
    mouseY,
    [-1, 1],
    [5, -5]
  );

  const routeX = useSpring(routeXRaw, {
    stiffness: 70,
    damping: 24,
  });

  const routeY = useSpring(routeYRaw, {
    stiffness: 70,
    damping: 24,
  });

  const cardX = useSpring(cardXRaw, {
    stiffness: 80,
    damping: 25,
  });

  const cardY = useSpring(cardYRaw, {
    stiffness: 80,
    damping: 25,
  });

  function handlePointerMove(
    event: React.PointerEvent<HTMLElement>
  ) {
    if (event.pointerType === "touch") return;

    const bounds =
      event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - bounds.left) / bounds.width;

    const y =
      (event.clientY - bounds.top) / bounds.height;

    mouseX.set(x * 2 - 1);
    mouseY.set(y * 2 - 1);
  }

  function handlePointerLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <main className="overflow-hidden bg-[#FAF7F5] text-[#28211F]">
      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}

      <section
        ref={heroRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="
          relative
          min-h-screen
          overflow-hidden
          bg-[#F1E7E3]
        "
      >
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,rgba(231,182,171,0.45),transparent_32%),radial-gradient(circle_at_20%_75%,rgba(200,148,137,0.18),transparent_28%)]" />

        {/* Animated atmosphere */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none
            absolute
            -right-[10%]
            top-[4%]
            h-[650px]
            w-[650px]
            rounded-full
            bg-[#D9A198]/25
            blur-[100px]
          "
        />

        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none
            absolute
            -bottom-[20%]
            left-[4%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-white/50
            blur-[90px]
          "
        />

        {/* Route artwork */}
        <motion.div
          style={{
            x: routeX,
            y: routeY,
          }}
          className="
            pointer-events-none
            absolute
            right-[-8%]
            top-[12%]
            hidden
            h-[78%]
            w-[62%]
            lg:block
          "
        >
          <svg
            viewBox="0 0 900 720"
            className="h-full w-full"
            fill="none"
          >
            {/* faint route */}
            <motion.path
              d="
                M80 550
                C170 430 160 280 310 260
                C460 240 430 420 580 400
                C735 380 700 190 810 120
              "
              stroke="rgba(78,61,56,0.10)"
              strokeWidth="38"
              strokeLinecap="round"
            />

            {/* white glass path */}
            <motion.path
              d="
                M80 550
                C170 430 160 280 310 260
                C460 240 430 420 580 400
                C735 380 700 190 810 120
              "
              stroke="rgba(255,255,255,0.65)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="18 18"
              initial={{
                strokeDashoffset: 0,
              }}
              animate={{
                strokeDashoffset: -72,
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* rose path */}
            <motion.path
              d="
                M80 550
                C170 430 160 280 310 260
                C460 240 430 420 580 400
                C735 380 700 190 810 120
              "
              stroke="#C58F85"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="6 20"
              initial={{
                strokeDashoffset: 0,
              }}
              animate={{
                strokeDashoffset: -104,
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* start */}
            <circle
              cx="80"
              cy="550"
              r="12"
              fill="#28211F"
            />

            <circle
              cx="80"
              cy="550"
              r="24"
              stroke="rgba(40,33,31,0.12)"
              strokeWidth="2"
            />

            {/* end */}
            <circle
              cx="810"
              cy="120"
              r="12"
              fill="#C58F85"
            />

            <motion.circle
              cx="810"
              cy="120"
              r="25"
              stroke="#C58F85"
              strokeWidth="2"
              initial={{
                opacity: 0.7,
                scale: 0.8,
              }}
              animate={{
                opacity: 0,
                scale: 1.5,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </svg>
        </motion.div>

        {/* Floating labels */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            right-[12%]
            top-[21%]
            hidden
            rounded-full
            border
            border-white/60
            bg-white/45
            px-5
            py-3
            text-[10px]
            font-medium
            uppercase
            tracking-[0.18em]
            text-[#6F5C56]
            shadow-[0_10px_40px_rgba(63,44,39,0.08)]
            backdrop-blur-xl
            lg:block
          "
        >
          Community miles
        </motion.div>

        <motion.div
          animate={{
            y: [0, 12, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            bottom-[25%]
            right-[31%]
            hidden
            rounded-full
            border
            border-white/60
            bg-white/40
            px-5
            py-3
            text-[10px]
            font-medium
            uppercase
            tracking-[0.18em]
            text-[#6F5C56]
            shadow-[0_10px_40px_rgba(63,44,39,0.08)]
            backdrop-blur-xl
            lg:block
          "
        >
          Run · connect · repeat
        </motion.div>

        {/* HERO CONTENT */}

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
          <div className="grid w-full gap-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            {/* Text */}
            <div>
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                }}
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
                  size={12}
                  className="text-[#B87E74]"
                />

                <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#B87E74]">
                  Kuska Motion Community
                </span>
              </motion.div>

              <motion.h1
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  mt-7
                  max-w-[700px]
                  font-serif
                  text-[58px]
                  leading-[0.88]
                  tracking-[-0.05em]
                  sm:text-[76px]
                  lg:text-[92px]
                "
              >
                Come for
                <br />
                the run.
                <br />

                <span className="italic text-[#B87E74]">
                  Stay for the people.
                </span>
              </motion.h1>

              <motion.p
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.35,
                }}
                className="
                  mt-7
                  max-w-[500px]
                  text-sm
                  leading-7
                  text-[#76655F]
                  sm:text-[15px]
                "
              >
                Running is better when it becomes part of something
                bigger. Kuska Motion is building a community around
                movement, friendship, progress and good energy.
              </motion.p>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.45,
                }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Link
                  href="#join"
                  className="
                    group
                    inline-flex
                    h-12
                    items-center
                    gap-3
                    rounded-full
                    bg-[#28211F]
                    px-6
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-white
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-[#3B312E]
                  "
                >
                  Join the community

                  <ArrowDown
                    size={14}
                    className="transition-transform group-hover:translate-y-1"
                  />
                </Link>

                <Link
                  href="#runs"
                  className="
                    inline-flex
                    h-12
                    items-center
                    rounded-full
                    border
                    border-[#28211F]/10
                    bg-white/35
                    px-6
                    text-[11px]
                    font-medium
                    uppercase
                    tracking-[0.15em]
                    text-[#28211F]
                    backdrop-blur-xl
                    transition-all
                    hover:bg-white/70
                  "
                >
                  Explore the runs
                </Link>
              </motion.div>
            </div>

            {/* floating information card */}
            <motion.div
              style={{
                x: cardX,
                y: cardY,
              }}
              className="
                relative
                z-20
                hidden
                justify-self-end
                lg:block
              "
            >
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  w-[320px]
                  rounded-[28px]
                  border
                  border-white/60
                  bg-white/38
                  p-6
                  shadow-[0_24px_80px_rgba(74,48,42,0.12)]
                  backdrop-blur-[24px]
                "
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#B87E74]">
                      The idea
                    </p>

                    <p className="mt-2 font-serif text-[30px] leading-none">
                      Move together.
                    </p>
                  </div>

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-full
                      bg-[#28211F]
                      text-white
                    "
                  >
                    <Users size={17} />
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <div className="flex items-center justify-between border-b border-[#28211F]/10 pb-3 text-xs">
                    <span className="text-[#86726B]">
                      Pace
                    </span>

                    <span className="font-medium">
                      Whatever feels good
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-[#28211F]/10 pb-3 text-xs">
                    <span className="text-[#86726B]">
                      Level
                    </span>

                    <span className="font-medium">
                      Everyone
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#86726B]">
                      Goal
                    </span>

                    <span className="font-medium">
                      Show up
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          MANIFESTO
      ═══════════════════════════════════════ */}

      <section className="px-5 py-24 sm:px-8 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-[300px_1fr] lg:gap-24">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#B87E74]">
                Community first
              </p>
            </div>

            <div>
              <h2
                className="
                  max-w-[980px]
                  font-serif
                  text-[44px]
                  leading-[0.98]
                  tracking-[-0.04em]
                  sm:text-[58px]
                  lg:text-[70px]
                "
              >
                Running can be personal.
                <br />
                It doesn&apos;t have to be{" "}
                <span className="italic text-[#B87E74]">
                  lonely.
                </span>
              </h2>

              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <p className="text-sm leading-7 text-[#7A6C67]">
                  Kuska Motion is not trying to build the fastest run
                  club. It&apos;s about building a place where people
                  genuinely enjoy showing up.
                </p>

                <p className="text-sm leading-7 text-[#7A6C67]">
                  Run, walk, improve, meet someone new, grab a coffee
                  and leave feeling a little better than when you
                  arrived.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          COMMUNITY CARDS
      ═══════════════════════════════════════ */}

      <section className="px-5 pb-24 sm:px-8 lg:px-16 lg:pb-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid overflow-hidden rounded-[30px] border border-[#28211F]/10 sm:grid-cols-2">
            {communityFeatures.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
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
                    amount: 0.25,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                  }}
                  className="
                    group
                    relative
                    min-h-[330px]
                    overflow-hidden
                    border-[#28211F]/10
                    p-8
                    even:border-l
                    [&:nth-child(n+3)]:border-t
                    sm:p-10
                    lg:min-h-[370px]
                    lg:p-12
                  "
                >
                  <div
                    className="
                      absolute
                      inset-0
                      origin-bottom
                      scale-y-0
                      bg-[#28211F]
                      transition-transform
                      duration-500
                      ease-out
                      group-hover:scale-y-100
                    "
                  />

                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] tracking-[0.2em] text-[#B87E74] group-hover:text-[#E7B6AB]">
                        {item.number}
                      </span>

                      <div
                        className="
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-[#28211F]/10
                          transition
                          group-hover:border-white/15
                          group-hover:bg-white/5
                        "
                      >
                        <Icon
                          size={18}
                          strokeWidth={1.5}
                          className="text-[#B87E74] group-hover:text-[#E7B6AB]"
                        />
                      </div>
                    </div>

                    <div className="mt-16">
                      <h3 className="font-serif text-[34px] tracking-[-0.03em] transition-colors group-hover:text-white">
                        {item.title}
                      </h3>

                      <p className="mt-5 max-w-[420px] text-sm leading-7 text-[#7A6C67] transition-colors group-hover:text-white/55">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          RUN FORMATS
      ═══════════════════════════════════════ */}

      <section
        id="runs"
        className="bg-[#EDE3DF] px-5 py-24 sm:px-8 lg:px-16 lg:py-32"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-14 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#B87E74]">
                Run with us
              </p>

              <h2
                className="
                  mt-5
                  font-serif
                  text-[48px]
                  leading-[0.95]
                  tracking-[-0.04em]
                  sm:text-[62px]
                "
              >
                Different runs.
                <br />

                <span className="italic text-[#B87E74]">
                  Same energy.
                </span>
              </h2>
            </div>

            <p className="max-w-[410px] text-sm leading-7 text-[#7A6C67]">
              The community should have space for easy miles,
              progress, challenges and the kind of runs that simply
              make your week better.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-4">
            {runTypes.map((run, index) => (
              <motion.article
                key={run.label}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.07,
                }}
                whileHover={{
                  y: -8,
                }}
                className="
                  group
                  min-h-[390px]
                  rounded-[26px]
                  border
                  border-[#28211F]/10
                  bg-[#F8F4F2]
                  p-7
                  transition-shadow
                  duration-300
                  hover:shadow-[0_24px_60px_rgba(76,53,47,0.10)]
                "
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-medium tracking-[0.18em] text-[#B87E74]">
                    0{index + 1}
                  </span>

                  <Footprints
                    size={18}
                    strokeWidth={1.5}
                    className="text-[#B87E74]"
                  />
                </div>

                <div className="mt-16">
                  <h3 className="font-serif text-[32px] tracking-[-0.03em]">
                    {run.label}
                  </h3>

                  <p className="mt-5 text-sm leading-7 text-[#7A6C67]">
                    {run.description}
                  </p>
                </div>

                <div className="mt-10 border-t border-[#28211F]/10 pt-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 text-[#86736C]">
                      <MapPin size={13} />
                      Distance
                    </span>

                    <span className="font-medium">
                      {run.distance}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 text-[#86736C]">
                      <Timer size={13} />
                      Pace
                    </span>

                    <span className="font-medium">
                      {run.pace}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          COMMUNITY VALUES
      ═══════════════════════════════════════ */}

      <section className="px-5 py-24 sm:px-8 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-14 lg:grid-cols-[390px_1fr] lg:gap-24">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#B87E74]">
                Our energy
              </p>

              <h2 className="mt-5 font-serif text-[48px] leading-[0.95] tracking-[-0.04em] sm:text-[60px]">
                The kind of
                <br />
                community we&apos;re
                <br />

                <span className="italic text-[#B87E74]">
                  building.
                </span>
              </h2>
            </div>

            <div className="border-y border-[#28211F]/10">
              {values.map((value, index) => (
                <motion.div
                  key={value}
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    border-b
                    border-[#28211F]/10
                    py-5
                    last:border-b-0
                    sm:py-6
                  "
                >
                  <div className="flex items-center gap-5">
                    <span className="text-[10px] text-[#B87E74]">
                      0{index + 1}
                    </span>

                    <span
                      className="
                        font-serif
                        text-[26px]
                        tracking-[-0.02em]
                        transition-transform
                        duration-300
                        group-hover:translate-x-2
                        sm:text-[32px]
                      "
                    >
                      {value}
                    </span>
                  </div>

                  <ArrowRight
                    size={15}
                    className="
                      -translate-x-2
                      text-[#B87E74]
                      opacity-0
                      transition-all
                      duration-300
                      group-hover:translate-x-0
                      group-hover:opacity-100
                    "
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FUTURE RUN CLUB / CITY SECTION
      ═══════════════════════════════════════ */}

      <section className="px-5 pb-24 sm:px-8 lg:px-16 lg:pb-32">
        <div
          className="
            relative
            mx-auto
            max-w-[1440px]
            overflow-hidden
            rounded-[32px]
            bg-[#28211F]
            p-7
            text-white
            sm:p-10
            lg:p-14
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              -right-[10%]
              -top-[80%]
              h-[650px]
              w-[650px]
              rounded-full
              bg-[#E7B6AB]/15
              blur-[100px]
            "
          />

          <div className="relative z-10 grid gap-12 lg:grid-cols-[1fr_420px] lg:items-end">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#E7B6AB]">
                Run clubs
              </p>

              <h2
                className="
                  mt-5
                  max-w-[800px]
                  font-serif
                  text-[48px]
                  leading-[0.94]
                  tracking-[-0.04em]
                  sm:text-[64px]
                "
              >
                One community.
                <br />

                <span className="italic text-[#E7B6AB]">
                  More cities to come.
                </span>
              </h2>

              <p className="mt-7 max-w-[520px] text-sm leading-7 text-white/50">
                As the community grows, this is where local Kuska
                Motion runs, meetups, route guides and club chapters
                can live.
              </p>
            </div>

            <div
              className="
                rounded-[24px]
                border
                border-white/10
                bg-white/[0.05]
                p-6
                backdrop-blur-xl
              "
            >
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#E7B6AB]">
                  Coming next
                </p>

                <MapPin
                  size={16}
                  className="text-[#E7B6AB]"
                />
              </div>

              <p className="mt-6 font-serif text-[30px]">
                Your city?
              </p>

              <p className="mt-3 text-sm leading-6 text-white/45">
                Want to see a Kuska Motion community run where you
                live?
              </p>

              <Link
                href="/contact"
                className="
                  group
                  mt-6
                  inline-flex
                  items-center
                  gap-2
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-[#E7B6AB]
                "
              >
                Tell us where

                <ArrowUpRight
                  size={13}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          JOIN CTA
      ═══════════════════════════════════════ */}

      <section
        id="join"
        className="px-5 pb-24 sm:px-8 lg:px-16 lg:pb-32"
      >
        <div
          className="
            relative
            mx-auto
            max-w-[1440px]
            overflow-hidden
            rounded-[34px]
            border
            border-[#28211F]/10
            bg-[#E7B6AB]
            px-7
            py-16
            sm:px-12
            lg:px-16
            lg:py-20
          "
        >
          <motion.div
            animate={{
              x: [0, 30, 0],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              pointer-events-none
              absolute
              -right-[10%]
              -top-[100%]
              h-[700px]
              w-[700px]
              rounded-full
              bg-white/25
              blur-[100px]
            "
          />

          <div className="relative z-10 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#71544D]">
                Join Kuska Motion
              </p>

              <h2
                className="
                  mt-5
                  max-w-[900px]
                  font-serif
                  text-[50px]
                  leading-[0.92]
                  tracking-[-0.045em]
                  text-[#28211F]
                  sm:text-[66px]
                  lg:text-[78px]
                "
              >
                Your pace.
                <br />
                Your people.
                <br />

                <span className="italic text-white">
                  Your next run.
                </span>
              </h2>

              <p className="mt-7 max-w-[500px] text-sm leading-7 text-[#624B45]">
                Follow the community and be the first to know about
                runs, meetups, challenges and new city chapters.
              </p>
            </div>

            <Link
              href="/contact"
              className="
                group
                inline-flex
                h-14
                items-center
                gap-4
                rounded-full
                bg-[#28211F]
                px-7
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-white
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-white
                hover:text-[#28211F]
              "
            >
              Join the community

              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}