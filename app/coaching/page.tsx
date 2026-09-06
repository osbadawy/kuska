"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Coffee,
  Heart,
  Moon,
  Plane,
  Sparkles,
  SunMedium,
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import type { PointerEvent } from "react";

const floatingNotes = [
  {
    icon: Coffee,
    label: "little rituals",
    className:
      "left-[6%] top-[18%] rotate-[-7deg]",
    delay: 0,
  },
  {
    icon: Plane,
    label: "places I love",
    className:
      "right-[5%] top-[16%] rotate-[6deg]",
    delay: 0.6,
  },
  {
    icon: Moon,
    label: "slower days",
    className:
      "left-[10%] bottom-[15%] rotate-[5deg]",
    delay: 1.2,
  },
  {
    icon: Heart,
    label: "things that feel good",
    className:
      "right-[7%] bottom-[16%] rotate-[-5deg]",
    delay: 1.8,
  },
];

export default function LifestylePage() {
  const mouseX =
    useMotionValue(0);

  const mouseY =
    useMotionValue(0);

  const cardXRaw =
    useTransform(
      mouseX,
      [-1, 1],
      [-12, 12]
    );

  const cardYRaw =
    useTransform(
      mouseY,
      [-1, 1],
      [-8, 8]
    );

  const cardX =
    useSpring(cardXRaw, {
      stiffness: 70,
      damping: 22,
    });

  const cardY =
    useSpring(cardYRaw, {
      stiffness: 70,
      damping: 22,
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

  return (
    <main
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
        bg-[#F3E9E5]
        px-5
        pb-16
        pt-28
        text-[#28211F]
        sm:px-8
        lg:px-16
      "
    >
      {/* ═════════════════════════════════════
          BACKGROUND
      ══════════════════════════════════════ */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_18%_30%,rgba(255,255,255,0.9),transparent_24%),radial-gradient(circle_at_80%_22%,rgba(231,182,171,0.45),transparent_27%),radial-gradient(circle_at_60%_85%,rgba(255,255,255,0.75),transparent_25%)]
        "
      />

      <motion.div
        animate={{
          x: [0, 35, 0],
          y: [0, -20, 0],
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
          top-[-18%]
          h-[650px]
          w-[650px]
          rounded-full
          bg-[#E7B6AB]/30
          blur-[120px]
        "
      />

      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 25, 0],
        }}
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -left-[15%]
          bottom-[-20%]
          h-[600px]
          w-[600px]
          rounded-full
          bg-white/70
          blur-[120px]
        "
      />

      {/* tiny floating dots */}

      <div
        className="
          pointer-events-none
          absolute
          left-[22%]
          top-[19%]
          h-2
          w-2
          rounded-full
          bg-[#B87E74]/30
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-[26%]
          top-[31%]
          h-1.5
          w-1.5
          rounded-full
          bg-[#28211F]/15
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[22%]
          left-[31%]
          h-2.5
          w-2.5
          rounded-full
          bg-white/80
        "
      />

      {/* ═════════════════════════════════════
          BACK
      ══════════════════════════════════════ */}

      <div className="relative z-20 mx-auto max-w-[1440px]">
        <Link
          href="/"
          className="
            group
            inline-flex
            items-center
            gap-2
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-[#76645E]
            transition
            hover:text-[#B87E74]
          "
        >
          <ArrowLeft
            size={13}
            className="
              transition-transform
              group-hover:-translate-x-1
            "
          />

          Back home
        </Link>
      </div>

      {/* ═════════════════════════════════════
          FLOATING NOTES
      ══════════════════════════════════════ */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          hidden
          lg:block
        "
      >
        {floatingNotes.map(
          (
            note
          ) => {
            const Icon =
              note.icon;

            return (
              <motion.div
                key={
                  note.label
                }
                animate={{
                  y: [
                    0,
                    -10,
                    0,
                  ],
                }}
                transition={{
                  duration:
                    4.5 +
                    note.delay,
                  repeat:
                    Infinity,
                  ease:
                    "easeInOut",
                  delay:
                    note.delay,
                }}
                className={`
                  absolute
                  z-10
                  ${note.className}
                `}
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2.5
                    rounded-[18px]
                    border
                    border-white/70
                    bg-white/55
                    px-4
                    py-3
                    shadow-[0_15px_45px_rgba(77,52,45,0.07)]
                    backdrop-blur-xl
                  "
                >
                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      bg-[#F1E4DF]
                      text-[#B87E74]
                    "
                  >
                    <Icon
                      size={13}
                      strokeWidth={
                        1.6
                      }
                    />
                  </div>

                  <span
                    className="
                      text-[9px]
                      font-medium
                      lowercase
                      tracking-[0.03em]
                      text-[#705E58]
                    "
                  >
                    {
                      note.label
                    }
                  </span>
                </div>
              </motion.div>
            );
          }
        )}
      </div>

      {/* ═════════════════════════════════════
          MAIN
      ══════════════════════════════════════ */}

      <section
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[calc(100vh-150px)]
          max-w-[1440px]
          items-center
          justify-center
          py-14
        "
      >
        <motion.div
          style={{
            x: cardX,
            y: cardY,
          }}
          className="
            relative
            w-full
            max-w-[900px]
          "
        >
          {/* white backing sheet */}

          <motion.div
            animate={{
              rotate: [
                -2,
                -1,
                -2,
              ],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              inset-4
              rounded-[38px]
              bg-white/50
              shadow-[0_30px_90px_rgba(70,47,40,0.06)]
            "
          />

          {/* MAIN CARD */}

          <div
            className="
              relative
              overflow-hidden
              rounded-[38px]
              border
              border-white/80
              bg-white/55
              px-7
              py-12
              text-center
              shadow-[0_35px_110px_rgba(80,54,45,0.09)]
              backdrop-blur-[28px]
              sm:px-12
              sm:py-16
              lg:px-16
              lg:py-20
            "
          >
            {/* little sun */}

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                -right-8
                -top-8
                flex
                h-32
                w-32
                items-center
                justify-center
                rounded-full
                bg-[#E7B6AB]/20
                text-[#B87E74]/40
              "
            >
              <SunMedium
                size={42}
                strokeWidth={
                  1.2
                }
              />
            </motion.div>

            {/* sparkles */}

            <motion.div
              animate={{
                y: [
                  0,
                  -7,
                  0,
                ],
                rotate: [
                  0,
                  6,
                  0,
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                left-8
                top-8
                text-[#B87E74]/50
              "
            >
              <Sparkles
                size={22}
                strokeWidth={
                  1.3
                }
              />
            </motion.div>

            {/* eyebrow */}

            <motion.div
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              className="
                mx-auto
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#B87E74]/15
                bg-[#F8F2EF]/70
                px-4
                py-2
              "
            >
              <Heart
                size={11}
                className="fill-[#E7B6AB] text-[#B87E74]"
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
                Lifestyle
              </span>
            </motion.div>

            {/* title */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.1,
                duration: 0.6,
              }}
              className="
                mx-auto
                mt-7
                max-w-[720px]
                font-serif
                text-[54px]
                leading-[0.9]
                tracking-[-0.05em]
                text-[#28211F]
                sm:text-[72px]
                lg:text-[88px]
              "
            >
              A little more
              <br />
              life is{" "}

              <span className="italic text-[#B87E74]">
                coming.
              </span>
            </motion.h1>

            {/* description */}

            <motion.p
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
                duration: 0.6,
              }}
              className="
                mx-auto
                mt-7
                max-w-[560px]
                text-sm
                leading-7
                text-[#74625C]
                sm:text-[15px]
              "
            >
              This little corner of Kuska Motion is
              still being put together — a space for
              routines, places, thoughts, travel,
              favourite things and all the small bits
              of life that happen between workouts.
            </motion.p>

            {/* COMING SOON PILL */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: 0.3,
                duration: 0.5,
              }}
              className="
                mx-auto
                mt-9
                inline-flex
                items-center
                gap-3
                rounded-full
                bg-[#28211F]
                px-5
                py-3
                text-white
                shadow-[0_12px_30px_rgba(40,33,31,0.15)]
              "
            >
              <motion.span
                animate={{
                  scale: [
                    1,
                    1.5,
                    1,
                  ],
                  opacity: [
                    1,
                    0.45,
                    1,
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-[#E7B6AB]
                "
              />

              <span
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                "
              >
                Coming soon
              </span>
            </motion.div>

            {/* WHAT'S COMING */}

            <div
              className="
                mx-auto
                mt-12
                grid
                max-w-[680px]
                gap-2
                sm:grid-cols-4
              "
            >
              <CuteItem
                icon={
                  Coffee
                }
                label="Rituals"
              />

              <CuteItem
                icon={
                  Plane
                }
                label="Travel"
              />

              <CuteItem
                icon={
                  Heart
                }
                label="Favourites"
              />

              <CuteItem
                icon={
                  Moon
                }
                label="Slow living"
              />
            </div>

            {/* FOOTER COPY */}

            <motion.p
              animate={{
                opacity: [
                  0.55,
                  1,
                  0.55,
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                mt-10
                font-serif
                text-[18px]
                italic
                text-[#A77A71]
              "
            >
              currently collecting the good stuff ♡
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* ═════════════════════════════════════
          BOTTOM NAV
      ══════════════════════════════════════ */}

      <div
        className="
          relative
          z-20
          mx-auto
          flex
          max-w-[1440px]
          flex-col
          items-center
          justify-between
          gap-5
          border-t
          border-[#28211F]/10
          pt-8
          sm:flex-row
        "
      >
        <p
          className="
            text-[10px]
            text-[#8E7B74]
          "
        >
          In the meantime, there&apos;s plenty to
          explore.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <ExploreLink
            href="/running"
            label="Running"
          />

          <ExploreLink
            href="/workout"
            label="Workouts"
          />

          <ExploreLink
            href="/nutrition"
            label="Nutrition"
          />
        </div>
      </div>
    </main>
  );
}

/* ═════════════════════════════════════
   CUTE ITEM
═════════════════════════════════════ */

function CuteItem({
  icon: Icon,
  label,
}: {
  icon: typeof Coffee;
  label: string;
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        rotate:
          Math.random() >
          0.5
            ? 1.5
            : -1.5,
      }}
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-[18px]
        border
        border-[#28211F]/[0.07]
        bg-white/50
        px-3
        py-4
      "
    >
      <div
        className="
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-full
          bg-[#F0E1DC]
          text-[#B87E74]
        "
      >
        <Icon
          size={13}
          strokeWidth={
            1.5
          }
        />
      </div>

      <span
        className="
          mt-2
          text-[9px]
          font-medium
          text-[#705E58]
        "
      >
        {label}
      </span>
    </motion.div>
  );
}

/* ═════════════════════════════════════
   EXPLORE LINK
═════════════════════════════════════ */

function ExploreLink({
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
        h-10
        items-center
        gap-2
        rounded-full
        border
        border-[#28211F]/10
        bg-white/45
        px-4
        text-[9px]
        font-semibold
        uppercase
        tracking-[0.13em]
        text-[#65544E]
        backdrop-blur-xl
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