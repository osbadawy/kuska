"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Camera,
  Dumbbell,
  HeartHandshake,
  Plane,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";

const collaborationTypes = [
  {
    icon: Camera,
    number: "01",
    title: "Content & Campaigns",
    description:
      "Authentic branded content across lifestyle, wellness, fitness, food and travel — created to feel natural within the world of Kuska in Motion.",
  },
  {
    icon: HeartHandshake,
    number: "02",
    title: "Brand Partnerships",
    description:
      "Long-term partnerships with brands that genuinely align with Kuska's lifestyle, values and community.",
  },
  {
    icon: Dumbbell,
    number: "03",
    title: "Fitness & Wellness",
    description:
      "Training experiences, wellness campaigns, activewear, nutrition and products that support a healthier way of living.",
  },
  {
    icon: Plane,
    number: "04",
    title: "Travel & Experiences",
    description:
      "Hotels, destinations, retreats and experiences told through a personal, visual and lifestyle-led perspective.",
  },
];

const values = [
  "Authenticity first",
  "Wellness without obsession",
  "Movement that feels good",
  "Food without unnecessary restriction",
  "Travel with intention",
  "Partnerships that make sense",
];

export default function CollaboratePage() {
  return (
    <main className="overflow-hidden bg-[#FAF7F5] text-[#28211F]">
      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}

      <section className="relative min-h-screen overflow-hidden bg-[#211C1A]">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0"
        >
          <Image
            src="/images/hero.jpg"
            alt="Kuska in Motion"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* Image grading */}
        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15" />

        {/* warm atmosphere */}
        <div
          className="
            pointer-events-none
            absolute
            -right-[15%]
            top-[10%]
            h-[650px]
            w-[650px]
            rounded-full
            bg-[#E7B6AB]/20
            blur-[130px]
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
            items-end
            px-5
            pb-20
            pt-32
            sm:px-8
            lg:px-16
            lg:pb-24
            xl:px-20
          "
        >
          <div className="grid w-full gap-12 lg:grid-cols-[1fr_350px] lg:items-end">
            <div>
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
                  delay: 0.15,
                  duration: 0.8,
                }}
                className="
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-[0.28em]
                  text-[#E7B6AB]
                "
              >
                Collaborate with Kuska
              </motion.p>

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
                  delay: 0.25,
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  mt-5
                  max-w-[900px]
                  font-serif
                  text-[56px]
                  leading-[0.9]
                  tracking-[-0.045em]
                  text-white
                  sm:text-[72px]
                  lg:text-[96px]
                "
              >
                Let&apos;s create
                <br />

                <span className="italic text-[#E7B6AB]">
                  something meaningful.
                </span>
              </motion.h1>
            </div>

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.45,
                duration: 0.8,
              }}
              className="lg:pb-3"
            >
              <p className="max-w-[330px] text-sm leading-7 text-white/60">
                Kuska in Motion works with brands that naturally fit
                within a world of movement, wellness, food,
                lifestyle and travel.
              </p>

              <Link
                href="#work-together"
                className="
                  group
                  mt-7
                  inline-flex
                  items-center
                  gap-3
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-white
                "
              >
                Explore partnerships

                <span
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/20
                    bg-white/10
                    backdrop-blur-xl
                    transition
                    duration-300
                    group-hover:bg-white
                    group-hover:text-[#28211F]
                  "
                >
                  <ArrowDown size={14} />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          INTRO
      ═══════════════════════════════════════ */}

      <section
        id="work-together"
        className="px-5 py-24 sm:px-8 lg:px-16 lg:py-32"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <div>
              <p
                className="
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-[0.25em]
                  text-[#B87E74]
                "
              >
                Partnership philosophy
              </p>
            </div>

            <div>
              <h2
                className="
                  max-w-[900px]
                  font-serif
                  text-[42px]
                  leading-[1]
                  tracking-[-0.035em]
                  sm:text-[56px]
                  lg:text-[68px]
                "
              >
                The best collaborations don&apos;t feel like ads.
                They feel like{" "}
                <span className="italic text-[#B87E74]">
                  part of the story.
                </span>
              </h2>

              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <p className="text-sm leading-7 text-[#7A6C67]">
                  Kuska in Motion is built around a real lifestyle —
                  training, running, eating well, travelling and
                  finding balance. Partnerships should naturally
                  live inside that world.
                </p>

                <p className="text-sm leading-7 text-[#7A6C67]">
                  The goal is simple: create beautiful, useful and
                  credible content while protecting the trust of the
                  audience and the identity of the brand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          COLLABORATION TYPES
      ═══════════════════════════════════════ */}

      <section className="px-5 pb-24 sm:px-8 lg:px-16 lg:pb-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid overflow-hidden rounded-[30px] border border-[#28211F]/10 sm:grid-cols-2">
            {collaborationTypes.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
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
                    duration: 0.7,
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
                    lg:min-h-[380px]
                    lg:p-12
                  "
                >
                  {/* hover background */}
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
                      <span
                        className="
                          text-[10px]
                          font-medium
                          tracking-[0.2em]
                          text-[#B87E74]
                          transition-colors
                          group-hover:text-[#E7B6AB]
                        "
                      >
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
                          transition-all
                          duration-300
                          group-hover:rotate-6
                          group-hover:border-white/15
                          group-hover:bg-white/5
                        "
                      >
                        <Icon
                          size={18}
                          strokeWidth={1.5}
                          className="
                            text-[#B87E74]
                            transition-colors
                            group-hover:text-[#E7B6AB]
                          "
                        />
                      </div>
                    </div>

                    <div className="mt-20">
                      <h3
                        className="
                          font-serif
                          text-[32px]
                          tracking-[-0.03em]
                          text-[#28211F]
                          transition-colors
                          duration-300
                          group-hover:text-white
                          sm:text-[38px]
                        "
                      >
                        {item.title}
                      </h3>

                      <p
                        className="
                          mt-5
                          max-w-[430px]
                          text-sm
                          leading-7
                          text-[#7A6C67]
                          transition-colors
                          duration-300
                          group-hover:text-white/55
                        "
                      >
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
          BRAND VALUES
      ═══════════════════════════════════════ */}

      <section className="bg-[#EDE3DF] px-5 py-24 sm:px-8 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-16 lg:grid-cols-[420px_1fr]">
            <div>
              <p
                className="
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-[0.25em]
                  text-[#B87E74]
                "
              >
                The fit matters
              </p>

              <h2
                className="
                  mt-5
                  font-serif
                  text-[46px]
                  leading-[0.95]
                  tracking-[-0.035em]
                  sm:text-[58px]
                "
              >
                What the brand
                <br />

                <span className="italic text-[#B87E74]">
                  stands for.
                </span>
              </h2>

              <p className="mt-7 max-w-[350px] text-sm leading-7 text-[#7A6C67]">
                Not every brand needs to be part of Kuska in Motion.
                The ones that are should genuinely add something to
                the life of the community.
              </p>
            </div>

            <div className="divide-y divide-[#28211F]/10 border-y border-[#28211F]/10">
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
                    duration: 0.5,
                    delay: index * 0.05,
                  }}
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    py-5
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
                        text-[24px]
                        tracking-[-0.02em]
                        transition-transform
                        duration-300
                        group-hover:translate-x-2
                        sm:text-[30px]
                      "
                    >
                      {value}
                    </span>
                  </div>

                  <Sparkles
                    size={16}
                    strokeWidth={1.4}
                    className="
                      text-[#B87E74]
                      opacity-0
                      transition-opacity
                      duration-300
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
          PROCESS
      ═══════════════════════════════════════ */}

      <section className="px-5 py-24 sm:px-8 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p
                className="
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-[0.25em]
                  text-[#B87E74]
                "
              >
                How it works
              </p>

              <h2
                className="
                  mt-4
                  font-serif
                  text-[44px]
                  tracking-[-0.035em]
                  sm:text-[58px]
                "
              >
                Simple from the start.
              </h2>
            </div>

            <p className="max-w-[360px] text-sm leading-7 text-[#7A6C67]">
              Every collaboration starts with whether the idea
              genuinely fits Kuska and the Kuska in Motion audience.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-[28px] bg-[#28211F]/10 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Say hello",
                text: "Tell us about the brand, campaign and what you have in mind.",
              },
              {
                number: "02",
                title: "Find the fit",
                text: "We shape an approach that feels natural for Kuska and valuable to the audience.",
              },
              {
                number: "03",
                title: "Create",
                text: "We turn the idea into content, experiences or a longer-term partnership.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="
                  bg-[#FAF7F5]
                  p-8
                  transition-colors
                  duration-300
                  hover:bg-white
                  sm:p-10
                  lg:p-12
                "
              >
                <p className="text-[10px] font-medium tracking-[0.2em] text-[#B87E74]">
                  {step.number}
                </p>

                <h3 className="mt-16 font-serif text-[32px] tracking-[-0.03em]">
                  {step.title}
                </h3>

                <p className="mt-4 max-w-[300px] text-sm leading-7 text-[#7A6C67]">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FINAL CTA
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
            px-7
            py-16
            text-white
            sm:px-12
            lg:px-16
            lg:py-20
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              -right-[15%]
              -top-[70%]
              h-[600px]
              w-[600px]
              rounded-full
              bg-[#E7B6AB]/15
              blur-[100px]
            "
          />

          <div className="relative z-10 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p
                className="
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-[0.25em]
                  text-[#E7B6AB]
                "
              >
                Start a conversation
              </p>

              <h2
                className="
                  mt-5
                  max-w-[800px]
                  font-serif
                  text-[48px]
                  leading-[0.95]
                  tracking-[-0.04em]
                  sm:text-[64px]
                  lg:text-[76px]
                "
              >
                Have something
                <br />

                <span className="italic text-[#E7B6AB]">
                  interesting in mind?
                </span>
              </h2>

              <p className="mt-7 max-w-[460px] text-sm leading-7 text-white/50">
                Tell us a little about your brand, your idea and why
                you think it belongs in the Kuska in Motion world.
              </p>
            </div>

            <a
              href="mailto:hello@kuskamotion.com?subject=Collaboration%20with%20Kuska%20Motion"
              className="
                group
                inline-flex
                h-14
                items-center
                gap-4
                rounded-full
                bg-[#E7B6AB]
                px-7
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-[#28211F]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-white
              "
            >
              Collaborate with us

              <ArrowUpRight
                size={15}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}