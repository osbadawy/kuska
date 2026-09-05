"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import { GlassNavigation } from "./GlassNavigation";

type HeroProps = {
  backgroundImage?: string;
};

export function Hero({
  backgroundImage = "/images/hero.jpg",
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  const shouldReduceMotion = useReducedMotion();

  /* ═══════════════════════════════════════
     SCROLL PARALLAX
  ═══════════════════════════════════════ */

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  /*
   * Background moves slowly.
   */
  const backgroundYRaw = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "14%"]
  );

  const backgroundScaleRaw = useTransform(
    scrollYProgress,
    [0, 1],
    [1.08, 1.16]
  );

  /*
   * Foreground foliage moves faster than the background.
   */
  const foregroundYRaw = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -120]
  );

  const foregroundRotateRaw = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 3]
  );

  /*
   * Light / atmosphere moves at a middle depth.
   */
  const lightYRaw = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -55]
  );

  const lightScaleRaw = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1.12]
  );

  /*
   * Content moves upward slightly.
   */
  const contentYRaw = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -75]
  );

  const contentOpacityRaw = useTransform(
    scrollYProgress,
    [0, 0.75],
    [1, 0]
  );

  const navigationYRaw = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -30]
  );

  /* ═══════════════════════════════════════
     SPRING SMOOTHING
  ═══════════════════════════════════════ */

  const backgroundY = useSpring(backgroundYRaw, {
    stiffness: 90,
    damping: 25,
    mass: 0.5,
  });

  const backgroundScale = useSpring(backgroundScaleRaw, {
    stiffness: 90,
    damping: 25,
    mass: 0.5,
  });

  const foregroundY = useSpring(foregroundYRaw, {
    stiffness: 75,
    damping: 22,
    mass: 0.8,
  });

  const foregroundRotate = useSpring(foregroundRotateRaw, {
    stiffness: 75,
    damping: 22,
    mass: 0.8,
  });

  const lightY = useSpring(lightYRaw, {
    stiffness: 65,
    damping: 25,
    mass: 0.8,
  });

  const lightScale = useSpring(lightScaleRaw, {
    stiffness: 65,
    damping: 25,
    mass: 0.8,
  });

  const contentY = useSpring(contentYRaw, {
    stiffness: 100,
    damping: 25,
    mass: 0.5,
  });

  const navigationY = useSpring(navigationYRaw, {
    stiffness: 100,
    damping: 25,
    mass: 0.5,
  });

  /* ═══════════════════════════════════════
     MOUSE PARALLAX
  ═══════════════════════════════════════ */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  /*
   * Background:
   * smallest mouse movement.
   */
  const backgroundMouseXRaw = useTransform(
    mouseX,
    [-1, 1],
    [-12, 12]
  );

  const backgroundMouseYRaw = useTransform(
    mouseY,
    [-1, 1],
    [-8, 8]
  );

  /*
   * Foreground leaves:
   * much stronger movement.
   */
  const foregroundMouseXRaw = useTransform(
    mouseX,
    [-1, 1],
    [-32, 32]
  );

  const foregroundMouseYRaw = useTransform(
    mouseY,
    [-1, 1],
    [-22, 22]
  );

  /*
   * Light layer.
   */
  const lightMouseXRaw = useTransform(
    mouseX,
    [-1, 1],
    [-22, 22]
  );

  const lightMouseYRaw = useTransform(
    mouseY,
    [-1, 1],
    [-14, 14]
  );

  /*
   * Content goes very slightly in the
   * opposite direction.
   */
  const contentMouseXRaw = useTransform(
    mouseX,
    [-1, 1],
    [5, -5]
  );

  const contentMouseYRaw = useTransform(
    mouseY,
    [-1, 1],
    [4, -4]
  );

  /* ═══════════════════════════════════════
     MOUSE SPRINGS
  ═══════════════════════════════════════ */

  const backgroundMouseX = useSpring(backgroundMouseXRaw, {
    stiffness: 70,
    damping: 25,
    mass: 0.8,
  });

  const backgroundMouseY = useSpring(backgroundMouseYRaw, {
    stiffness: 70,
    damping: 25,
    mass: 0.8,
  });

  const foregroundMouseX = useSpring(foregroundMouseXRaw, {
    stiffness: 55,
    damping: 20,
    mass: 1,
  });

  const foregroundMouseY = useSpring(foregroundMouseYRaw, {
    stiffness: 55,
    damping: 20,
    mass: 1,
  });

  const lightMouseX = useSpring(lightMouseXRaw, {
    stiffness: 45,
    damping: 25,
    mass: 1.2,
  });

  const lightMouseY = useSpring(lightMouseYRaw, {
    stiffness: 45,
    damping: 25,
    mass: 1.2,
  });

  const contentMouseX = useSpring(contentMouseXRaw, {
    stiffness: 80,
    damping: 25,
    mass: 0.8,
  });

  const contentMouseY = useSpring(contentMouseYRaw, {
    stiffness: 80,
    damping: 25,
    mass: 0.8,
  });

  /* ═══════════════════════════════════════
     POINTER
  ═══════════════════════════════════════ */

  function handlePointerMove(
    event: React.PointerEvent<HTMLElement>
  ) {
    if (shouldReduceMotion) return;
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
    <section
      ref={heroRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="
        relative
        min-h-[680px]
        overflow-hidden
        bg-[#171513]
        lg:min-h-[760px]
      "
    >
      {/* ═══════════════════════════════════════
          BACKGROUND
      ═══════════════════════════════════════ */}

      <motion.div
        className="absolute -inset-[5%]"
        style={
          shouldReduceMotion
            ? undefined
            : {
                y: backgroundY,
                scale: backgroundScale,
              }
        }
      >
        <motion.div
          className="relative h-full w-full"
          style={
            shouldReduceMotion
              ? undefined
              : {
                  x: backgroundMouseX,
                  y: backgroundMouseY,
                }
          }
        >
          <Image
            src={backgroundImage}
            alt="Kuska Motion fitness and lifestyle"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
      </motion.div>

      {/* ═══════════════════════════════════════
          BASE PHOTO GRADING
      ═══════════════════════════════════════ */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          bg-gradient-to-r
          from-black/55
          via-black/15
          to-black/5
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          bg-gradient-to-t
          from-black/30
          via-transparent
          to-black/10
        "
      />

      {/* ═══════════════════════════════════════
          WARM SUNLIGHT LAYER
      ═══════════════════════════════════════ */}

      <motion.div
        className="
          pointer-events-none
          absolute
          -right-[8%]
          -top-[35%]
          z-[2]
          h-[650px]
          w-[650px]
          rounded-full
          opacity-40
          blur-[70px]
          mix-blend-screen
          bg-[radial-gradient(circle,rgba(255,220,176,0.45)_0%,rgba(239,185,142,0.18)_38%,transparent_72%)]
        "
        style={
          shouldReduceMotion
            ? undefined
            : {
                x: lightMouseX,
                y: lightY,
                scale: lightScale,
              }
        }
      />

      {/* SECOND SMALLER LIGHT PATCH */}

      <motion.div
        className="
          pointer-events-none
          absolute
          right-[18%]
          top-[18%]
          z-[2]
          h-[260px]
          w-[380px]
          rotate-[-20deg]
          rounded-[50%]
          opacity-20
          blur-[55px]
          mix-blend-screen
          bg-gradient-to-br
          from-[#FFE2BD]
          via-[#F4C6A3]/40
          to-transparent
        "
        style={
          shouldReduceMotion
            ? undefined
            : {
                x: lightMouseX,
                y: lightMouseY,
              }
        }
      />

      {/* ═══════════════════════════════════════
          DAPPLED SHADOWS
      ═══════════════════════════════════════ */}

      <motion.div
        className="
          pointer-events-none
          absolute
          -right-[5%]
          top-[-12%]
          z-[3]
          h-[620px]
          w-[440px]
          origin-top-right
          opacity-[0.18]
          blur-[7px]
          mix-blend-multiply
        "
        style={
          shouldReduceMotion
            ? undefined
            : {
                x: foregroundMouseX,
                y: foregroundY,
                rotate: foregroundRotate,
              }
        }
      >
        <svg
          viewBox="0 0 440 620"
          className="h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main stem */}
          <path
            d="M425 10C330 125 310 210 255 315C205 410 155 493 60 610"
            stroke="rgba(15,12,10,0.75)"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* Branches */}
          <path
            d="M340 170C275 145 215 128 155 85"
            stroke="rgba(15,12,10,0.72)"
            strokeWidth="8"
            strokeLinecap="round"
          />

          <path
            d="M292 250C350 225 385 190 420 150"
            stroke="rgba(15,12,10,0.7)"
            strokeWidth="8"
            strokeLinecap="round"
          />

          <path
            d="M235 350C175 330 120 290 80 245"
            stroke="rgba(15,12,10,0.7)"
            strokeWidth="8"
            strokeLinecap="round"
          />

          <path
            d="M175 445C230 420 280 380 315 335"
            stroke="rgba(15,12,10,0.68)"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Leaves */}
          <ellipse
            cx="145"
            cy="78"
            rx="50"
            ry="20"
            transform="rotate(25 145 78)"
            fill="rgba(12,10,8,0.72)"
          />

          <ellipse
            cx="205"
            cy="118"
            rx="45"
            ry="18"
            transform="rotate(34 205 118)"
            fill="rgba(12,10,8,0.68)"
          />

          <ellipse
            cx="390"
            cy="150"
            rx="52"
            ry="20"
            transform="rotate(-45 390 150)"
            fill="rgba(12,10,8,0.7)"
          />

          <ellipse
            cx="345"
            cy="205"
            rx="48"
            ry="18"
            transform="rotate(-28 345 205)"
            fill="rgba(12,10,8,0.68)"
          />

          <ellipse
            cx="80"
            cy="242"
            rx="55"
            ry="21"
            transform="rotate(40 80 242)"
            fill="rgba(12,10,8,0.7)"
          />

          <ellipse
            cx="135"
            cy="295"
            rx="47"
            ry="18"
            transform="rotate(30 135 295)"
            fill="rgba(12,10,8,0.66)"
          />

          <ellipse
            cx="315"
            cy="335"
            rx="52"
            ry="20"
            transform="rotate(-40 315 335)"
            fill="rgba(12,10,8,0.7)"
          />

          <ellipse
            cx="270"
            cy="390"
            rx="45"
            ry="18"
            transform="rotate(-28 270 390)"
            fill="rgba(12,10,8,0.65)"
          />

          <ellipse
            cx="72"
            cy="560"
            rx="56"
            ry="22"
            transform="rotate(-40 72 560)"
            fill="rgba(12,10,8,0.68)"
          />
        </svg>
      </motion.div>

      {/* ═══════════════════════════════════════
          FOREGROUND OUT-OF-FOCUS PLANT
      ═══════════════════════════════════════ */}

      <motion.div
        className="
          pointer-events-none
          absolute
          -bottom-[180px]
          -right-[120px]
          z-[7]
          hidden
          h-[650px]
          w-[440px]
          origin-bottom-right
          opacity-[0.22]
          blur-[3px]
          lg:block
        "
        style={
          shouldReduceMotion
            ? undefined
            : {
                x: foregroundMouseX,
                y: foregroundMouseY,
                rotate: foregroundRotate,
              }
        }
      >
        <svg
          viewBox="0 0 440 650"
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M390 650C360 510 330 390 290 285C255 190 210 105 155 25"
            stroke="#17120F"
            strokeWidth="15"
            strokeLinecap="round"
            fill="none"
          />

          <path
            d="M318 380C365 320 395 270 420 220"
            stroke="#17120F"
            strokeWidth="10"
            strokeLinecap="round"
          />

          <path
            d="M283 290C225 250 185 215 150 170"
            stroke="#17120F"
            strokeWidth="10"
            strokeLinecap="round"
          />

          <path
            d="M245 205C290 155 315 105 325 50"
            stroke="#17120F"
            strokeWidth="9"
            strokeLinecap="round"
          />

          <ellipse
            cx="415"
            cy="205"
            rx="74"
            ry="28"
            transform="rotate(-55 415 205)"
            fill="#17120F"
          />

          <ellipse
            cx="365"
            cy="300"
            rx="78"
            ry="30"
            transform="rotate(-42 365 300)"
            fill="#17120F"
          />

          <ellipse
            cx="152"
            cy="168"
            rx="76"
            ry="27"
            transform="rotate(42 152 168)"
            fill="#17120F"
          />

          <ellipse
            cx="195"
            cy="220"
            rx="68"
            ry="25"
            transform="rotate(38 195 220)"
            fill="#17120F"
          />

          <ellipse
            cx="326"
            cy="55"
            rx="70"
            ry="26"
            transform="rotate(-62 326 55)"
            fill="#17120F"
          />
        </svg>
      </motion.div>

      {/* ═══════════════════════════════════════
          VERY SUBTLE ATMOSPHERIC HAZE
      ═══════════════════════════════════════ */}

      <motion.div
        className="
          pointer-events-none
          absolute
          left-[34%]
          top-[20%]
          z-[4]
          h-[420px]
          w-[520px]
          rounded-full
          opacity-[0.13]
          blur-[90px]
          bg-[#E8B59E]
        "
        style={
          shouldReduceMotion
            ? undefined
            : {
                x: lightMouseX,
                y: lightMouseY,
              }
        }
      />

      {/* Vignette */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[5]
          bg-[radial-gradient(circle_at_45%_40%,transparent_0%,transparent_40%,rgba(0,0,0,0.16)_100%)]
        "
      />

      {/* ═══════════════════════════════════════
          CONTENT
      ═══════════════════════════════════════ */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[680px]
          w-full
          max-w-[1440px]
          items-center
          px-5
          py-24
          sm:px-8
          lg:min-h-[760px]
          lg:px-16
          xl:px-20
        "
      >
        <motion.div
          className="w-full max-w-[570px]"
          style={
            shouldReduceMotion
              ? undefined
              : {
                  y: contentY,
                  opacity: contentOpacityRaw,
                }
          }
        >
          <motion.div
            style={
              shouldReduceMotion
                ? undefined
                : {
                    x: contentMouseX,
                    y: contentMouseY,
                  }
            }
          >
            {/* Heading */}

            <div className="mb-6">
              <motion.p
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 15,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-[0.26em]
                  text-[#E7B6AB]
                "
              >
                Explore the journey
              </motion.p>

              <motion.h1
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 25,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  mt-3
                  max-w-[520px]
                  font-serif
                  text-[42px]
                  leading-[0.98]
                  tracking-[-0.03em]
                  text-white
                  sm:text-[50px]
                "
              >
                Move well.

                <span className="ml-2 italic text-[#E7B6AB]">
                  Live fully.
                </span>
              </motion.h1>

              <motion.p
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 20,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.28,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  mt-4
                  max-w-[430px]
                  text-sm
                  leading-6
                  text-white/60
                  sm:text-[15px]
                "
              >
                Training, food, lifestyle and travel — everything
                that shapes a stronger, healthier and more balanced
                life.
              </motion.p>
            </div>

            {/* Navigation */}

            <motion.div
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 35,
                      scale: 0.98,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.9,
                delay: 0.38,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={
                shouldReduceMotion
                  ? undefined
                  : {
                      translateY: navigationY,
                    }
              }
            >
              <GlassNavigation />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}