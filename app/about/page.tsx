"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Dumbbell,
  Footprints,
  Globe2,
  Heart,
  Laptop,
  MapPin,
  Palette,
  Plane,
  Salad,
  Sparkles,
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

const journey = [
  {
    place: "Hungary",
    label: "Where it started",
    description:
      "Reka grew up in Hungary with movement already part of her life. Staying active and eating well were never temporary phases — they were simply things she naturally enjoyed.",
  },
  {
    place: "Portugal",
    label: "A new chapter",
    description:
      "Living abroad became part of her story. Portugal brought a different pace of life, new surroundings and the beginning of a lifestyle shaped by movement, curiosity and beautiful places.",
  },
  {
    place: "Berlin",
    label: "Design meets tech",
    description:
      "After studying design and product management, Reka spent time in Berlin and explored the technology space — bringing together creativity, digital thinking and an instinct for building things people can actually use.",
  },
  {
    place: "Spain",
    label: "Where life is now",
    description:
      "Today, Reka lives in Spain, working full-time as a creator while building Kuska Motion around the things she genuinely loves: running, training, food, travel and living well.",
  },
];

const pillars = [
  {
    number: "01",
    title: "Run often.",
    icon: Footprints,
    description:
      "Running is the movement Reka comes back to most. Some runs are about progress, some are about clearing her head, and some are simply about getting outside and feeling good.",
  },
  {
    number: "02",
    title: "Train with purpose.",
    icon: Dumbbell,
    description:
      "Around four training days each week keep strength and movement part of everyday life — not for perfection, but to feel capable, energetic and strong.",
  },
  {
    number: "03",
    title: "Eat intelligently.",
    icon: Salad,
    description:
      "Food does not need to be complicated. Reka uses macros as a simple framework that gives structure while still leaving plenty of room for genuinely good food.",
  },
  {
    number: "04",
    title: "Live beyond fitness.",
    icon: Plane,
    description:
      "Training matters, but so do good meals, beautiful places, travel, friendships and experiences. Wellness should make life bigger — not smaller.",
  },
];

const facts = [
  {
    label: "Home",
    value: "Spain",
  },
  {
    label: "From",
    value: "Hungary",
  },
  {
    label: "Age",
    value: "27",
  },
  {
    label: "Runs",
    value: "3–4 × weekly",
  },
  {
    label: "Training",
    value: "4 × weekly",
  },
  {
    label: "Approach",
    value: "Wellbeing first",
  },
];

/* ═════════════════════════════════════
   PAGE
═════════════════════════════════════ */

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const portraitXRaw = useTransform(
    mouseX,
    [-1, 1],
    [-16, 16]
  );

  const portraitYRaw = useTransform(
    mouseY,
    [-1, 1],
    [-10, 10]
  );

  const copyXRaw = useTransform(
    mouseX,
    [-1, 1],
    [5, -5]
  );

  const copyYRaw = useTransform(
    mouseY,
    [-1, 1],
    [4, -4]
  );

  const portraitX = useSpring(portraitXRaw, {
    stiffness: 70,
    damping: 24,
  });

  const portraitY = useSpring(portraitYRaw, {
    stiffness: 70,
    damping: 24,
  });

  const copyX = useSpring(copyXRaw, {
    stiffness: 80,
    damping: 25,
  });

  const copyY = useSpring(copyYRaw, {
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
          bg-[#EDE3DF]
        "
      >
        {/* atmosphere */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_70%_35%,rgba(216,163,153,0.35),transparent_30%),radial-gradient(circle_at_20%_75%,rgba(255,255,255,0.9),transparent_30%)]
          "
        />

        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -25, 0],
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
            -right-[15%]
            -top-[10%]
            h-[700px]
            w-[700px]
            rounded-full
            bg-[#E7B6AB]/30
            blur-[120px]
          "
        />

        {/* travel route */}
        <div
          className="
            pointer-events-none
            absolute
            bottom-[8%]
            left-[35%]
            hidden
            h-[48%]
            w-[60%]
            lg:block
          "
        >
          <svg
            viewBox="0 0 850 420"
            className="h-full w-full"
            fill="none"
          >
            <motion.path
              d="
                M60 250
                C180 145 255 300 360 200
                C470 95 535 275 650 185
                C730 125 770 110 815 80
              "
              stroke="rgba(40,33,31,0.12)"
              strokeWidth="2"
              strokeDasharray="5 13"
              animate={{
                strokeDashoffset: -80,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {[
              [60, 250],
              [360, 200],
              [650, 185],
              [815, 80],
            ].map(([cx, cy], index) => (
              <g key={`${cx}-${cy}`}>
                <circle
                  cx={cx}
                  cy={cy}
                  r="7"
                  fill={
                    index === 3
                      ? "#B87E74"
                      : "#28211F"
                  }
                />

                {index === 3 && (
                  <motion.circle
                    cx={cx}
                    cy={cy}
                    r="14"
                    stroke="#B87E74"
                    strokeWidth="1"
                    animate={{
                      scale: [1, 1.8],
                      opacity: [0.6, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    style={{
                      transformOrigin: `${cx}px ${cy}px`,
                    }}
                  />
                )}
              </g>
            ))}
          </svg>
        </div>

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
              lg:grid-cols-[0.82fr_1.18fr]
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
              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
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
                  Meet Kuska
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
                  delay: 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  mt-7
                  max-w-[680px]
                  font-serif
                  text-[62px]
                  leading-[0.87]
                  tracking-[-0.055em]
                  sm:text-[80px]
                  lg:text-[98px]
                "
              >
                Reka
                <br />
                Tokaji.

                <span
                  className="
                    mt-4
                    block
                    text-[0.62em]
                    italic
                    leading-[0.95]
                    text-[#B87E74]
                  "
                >
                  Always in motion.
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
                  delay: 0.3,
                }}
                className="
                  mt-8
                  max-w-[520px]
                  text-sm
                  leading-7
                  text-[#74625C]
                  sm:text-[15px]
                "
              >
                Hungarian by birth, currently living in
                Spain, and happiest somewhere between a good
                run, a great meal and the next beautiful
                place to explore.
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
                  delay: 0.4,
                }}
                className="mt-8"
              >
                <Link
                  href="#story"
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
                    hover:-translate-y-1
                  "
                >
                  Meet Reka

                  <ArrowDown
                    size={14}
                    className="transition-transform group-hover:translate-y-1"
                  />
                </Link>
              </motion.div>
            </motion.div>

            {/* PORTRAIT */}

            <motion.div
              style={{
                x: portraitX,
                y: portraitY,
              }}
              className="
                relative
                mx-auto
                w-full
                max-w-[560px]
                lg:justify-self-end
              "
            >
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.95,
                  rotate: 2,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  duration: 1,
                  delay: 0.15,
                }}
                className="
                  relative
                  aspect-[4/5]
                  overflow-hidden
                  rounded-[38px]
                  border
                  border-white/60
                  bg-[#DCCBC5]
                  shadow-[0_35px_100px_rgba(88,57,48,0.15)]
                "
              >
                <Image
                  src="/images/about/reka-hero.jpg"
                  alt="Reka Tokaji"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

                <div
                  className="
                    absolute
                    bottom-5
                    left-5
                    right-5
                    flex
                    items-center
                    justify-between
                    rounded-[20px]
                    border
                    border-white/20
                    bg-black/15
                    p-4
                    text-white
                    backdrop-blur-xl
                  "
                >
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.18em] text-white/55">
                      Currently
                    </p>

                    <p className="mt-1 font-serif text-[22px]">
                      Spain
                    </p>
                  </div>

                  <MapPin
                    size={17}
                    className="text-[#E7B6AB]"
                  />
                </div>
              </motion.div>

              {/* floating fact */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  absolute
                  -left-7
                  top-[18%]
                  hidden
                  rounded-[20px]
                  border
                  border-white/60
                  bg-white/55
                  px-5
                  py-4
                  shadow-[0_15px_50px_rgba(83,53,45,0.10)]
                  backdrop-blur-xl
                  sm:block
                "
              >
                <p className="text-[9px] uppercase tracking-[0.18em] text-[#A07A71]">
                  Favourite movement
                </p>

                <p className="mt-2 font-serif text-[24px]">
                  Running.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STORY
      ═══════════════════════════════════════ */}

      <section
        id="story"
        className="px-5 py-24 sm:px-8 lg:px-16 lg:py-32"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-[300px_1fr] lg:gap-24">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#B87E74]">
                Her story
              </p>
            </div>

            <div>
              <h2
                className="
                  max-w-[1000px]
                  font-serif
                  text-[44px]
                  leading-[0.98]
                  tracking-[-0.04em]
                  sm:text-[58px]
                  lg:text-[70px]
                "
              >
                Fitness was never the destination.
                <br />
                It was simply part of{" "}

                <span className="italic text-[#B87E74]">
                  how she lived.
                </span>
              </h2>

              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <p className="text-sm leading-7 text-[#7A6C67]">
                  Reka has always been active. Movement,
                  training and eating well were things she
                  naturally gravitated toward long before
                  they became part of her work.
                </p>

                <p className="text-sm leading-7 text-[#7A6C67]">
                  What started as a personal passion
                  eventually became something worth sharing.
                  Kuska Motion grew from the idea that taking
                  care of yourself can be practical,
                  enjoyable and part of a genuinely full life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          LIFE JOURNEY
      ═══════════════════════════════════════ */}

      <section className="bg-[#EDE3DF] px-5 py-24 sm:px-8 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-14">
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#B87E74]">
              A life in motion
            </p>

            <h2 className="mt-5 font-serif text-[48px] leading-[0.95] tracking-[-0.04em] sm:text-[62px]">
              Hungary to Spain.
              <br />

              <span className="italic text-[#B87E74]">
                With a few chapters between.
              </span>
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden rounded-[30px] bg-[#28211F]/10 lg:grid-cols-4">
            {journey.map((item, index) => (
              <motion.article
                key={item.place}
                initial={{
                  opacity: 0,
                  y: 30,
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
                  min-h-[420px]
                  bg-[#F7F2EF]
                  p-8
                  transition-colors
                  duration-500
                  hover:bg-[#28211F]
                  sm:p-9
                "
              >
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.2em] text-[#B87E74] group-hover:text-[#E7B6AB]">
                      0{index + 1}
                    </span>

                    <Globe2
                      size={17}
                      strokeWidth={1.5}
                      className="text-[#B87E74] group-hover:text-[#E7B6AB]"
                    />
                  </div>

                  <div className="mt-20">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#9D8981] transition-colors group-hover:text-white/35">
                      {item.label}
                    </p>

                    <h3 className="mt-3 font-serif text-[36px] tracking-[-0.03em] transition-colors group-hover:text-white">
                      {item.place}
                    </h3>

                    <p className="mt-5 text-sm leading-7 text-[#7A6C67] transition-colors group-hover:text-white/50">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          DESIGN / TECH BACKGROUND
      ═══════════════════════════════════════ */}

      <section className="px-5 py-24 sm:px-8 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
            <div
              className="
                relative
                aspect-[4/3]
                overflow-hidden
                rounded-[30px]
                bg-[#E8DDD8]
              "
            >
              <Image
                src="/images/about/reka-lifestyle.jpg"
                alt="Reka lifestyle"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#B87E74]">
                Before Kuska Motion
              </p>

              <h2
                className="
                  mt-5
                  max-w-[650px]
                  font-serif
                  text-[46px]
                  leading-[0.96]
                  tracking-[-0.04em]
                  sm:text-[60px]
                "
              >
                Creativity was always
                <br />

                <span className="italic text-[#B87E74]">
                  part of the equation.
                </span>
              </h2>

              <p className="mt-7 max-w-[560px] text-sm leading-7 text-[#7A6C67]">
                Reka studied design and product management
                before spending time in the technology world.
                That background still shapes how she thinks:
                aesthetics matter, but so does usefulness.
              </p>

              <p className="mt-5 max-w-[560px] text-sm leading-7 text-[#7A6C67]">
                Kuska Motion brings those worlds together —
                personal experience, visual storytelling and
                practical ideas that people can actually take
                into their own lives.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <SkillPill
                  icon={Palette}
                  text="Design"
                />

                <SkillPill
                  icon={Laptop}
                  text="Product"
                />

                <SkillPill
                  icon={Sparkles}
                  text="Content"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          MOVEMENT PHILOSOPHY
      ═══════════════════════════════════════ */}

      <section className="px-5 pb-24 sm:px-8 lg:px-16 lg:pb-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#B87E74]">
                Her approach
              </p>

              <h2 className="mt-5 font-serif text-[48px] leading-[0.95] tracking-[-0.04em] sm:text-[62px]">
                Healthy,
                <br />

                <span className="italic text-[#B87E74]">
                  without making life boring.
                </span>
              </h2>
            </div>

            <p className="max-w-[430px] text-sm leading-7 text-[#7A6C67]">
              The goal is not to build a life around fitness.
              It is to use movement, food and better habits
              to make the rest of life feel better.
            </p>
          </div>

          <div className="grid overflow-hidden rounded-[30px] border border-[#28211F]/10 sm:grid-cols-2">
            {pillars.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="
                    group
                    min-h-[350px]
                    border-[#28211F]/10
                    p-8
                    even:border-l
                    [&:nth-child(n+3)]:border-t
                    sm:p-10
                    lg:p-12
                    transition-colors
                    duration-500
                    hover:bg-[#28211F]
                  "
                >
                  <div className="flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] tracking-[0.2em] text-[#B87E74] group-hover:text-[#E7B6AB]">
                        {item.number}
                      </span>

                      <Icon
                        size={18}
                        strokeWidth={1.5}
                        className="text-[#B87E74] group-hover:text-[#E7B6AB]"
                      />
                    </div>

                    <div className="mt-16">
                      <h3 className="font-serif text-[36px] tracking-[-0.03em] transition-colors group-hover:text-white">
                        {item.title}
                      </h3>

                      <p className="mt-5 max-w-[440px] text-sm leading-7 text-[#7A6C67] transition-colors group-hover:text-white/50">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          QUICK FACTS
      ═══════════════════════════════════════ */}

      <section className="bg-[#28211F] px-5 py-24 text-white sm:px-8 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-14 lg:grid-cols-[390px_1fr] lg:gap-24">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#E7B6AB]">
                Quick facts
              </p>

              <h2 className="mt-5 font-serif text-[48px] leading-[0.94] tracking-[-0.04em] sm:text-[62px]">
                A little more
                <br />

                <span className="italic text-[#E7B6AB]">
                  about Reka.
                </span>
              </h2>

              <p className="mt-7 max-w-[340px] text-sm leading-7 text-white/45">
                Creator, runner, traveller and someone who
                thinks a good meal should always still taste
                like a good meal.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-[28px] bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
              {facts.map((fact) => (
                <motion.div
                  key={fact.label}
                  whileHover={{
                    y: -4,
                  }}
                  className="
                    min-h-[180px]
                    bg-white/[0.035]
                    p-7
                    transition-colors
                    hover:bg-white/[0.07]
                  "
                >
                  <p className="text-[9px] uppercase tracking-[0.18em] text-[#E7B6AB]">
                    {fact.label}
                  </p>

                  <p className="mt-10 font-serif text-[27px] tracking-[-0.025em]">
                    {fact.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          KUSKA MOTION
      ═══════════════════════════════════════ */}

      <section className="px-5 py-24 sm:px-8 lg:px-16 lg:py-32">
        <div
          className="
            relative
            mx-auto
            max-w-[1440px]
            overflow-hidden
            rounded-[34px]
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
              x: [0, 35, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              pointer-events-none
              absolute
              -right-[15%]
              -top-[100%]
              h-[700px]
              w-[700px]
              rounded-full
              bg-white/25
              blur-[110px]
            "
          />

          <div className="relative z-10 grid gap-12 lg:grid-cols-[1fr_400px] lg:items-end">
            <div>
              <div className="flex items-center gap-2">
                <Heart
                  size={14}
                  className="text-[#704F48]"
                />

                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#704F48]">
                  Why Kuska Motion?
                </p>
              </div>

              <h2
                className="
                  mt-6
                  max-w-[880px]
                  font-serif
                  text-[50px]
                  leading-[0.93]
                  tracking-[-0.045em]
                  text-[#28211F]
                  sm:text-[66px]
                  lg:text-[76px]
                "
              >
                Helping people move more,
                <br />
                learn more and{" "}

                <span className="italic text-white">
                  live better.
                </span>
              </h2>
            </div>

            <div>
              <p className="text-sm leading-7 text-[#674D47]">
                Reka created Kuska Motion to turn the things
                she has learned through her own lifestyle into
                something useful for other people — from
                running and training to recipes, travel,
                community and everyday wellbeing.
              </p>

              <p className="mt-4 text-sm leading-7 text-[#674D47]">
                It is not about becoming somebody else. It is
                about finding better ways to keep moving and
                improving your own life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════ */}

      <section className="px-5 pb-24 sm:px-8 lg:px-16 lg:pb-32">
        <div className="mx-auto max-w-[1440px] border-t border-[#28211F]/10 pt-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#B87E74]">
                Keep exploring
              </p>

              <h2
                className="
                  mt-5
                  max-w-[800px]
                  font-serif
                  text-[48px]
                  leading-[0.95]
                  tracking-[-0.04em]
                  sm:text-[62px]
                "
              >
                This is only part of
                <br />

                <span className="italic text-[#B87E74]">
                  the story.
                </span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/guides"
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
                  tracking-[0.15em]
                  text-white
                  transition
                  hover:-translate-y-1
                "
              >
                Explore guides

                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>

              <Link
                href="/community"
                className="
                  inline-flex
                  h-12
                  items-center
                  rounded-full
                  border
                  border-[#28211F]/10
                  px-6
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-[0.15em]
                  transition
                  hover:bg-white
                "
              >
                Join the community
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ═════════════════════════════════════
   SKILL PILL
═════════════════════════════════════ */

function SkillPill({
  icon: Icon,
  text,
}: {
  icon: typeof Palette;
  text: string;
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
        bg-white/40
        px-4
        py-2.5
      "
    >
      <Icon
        size={13}
        strokeWidth={1.5}
        className="text-[#B87E74]"
      />

      <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#6F5C56]">
        {text}
      </span>
    </div>
  );
}