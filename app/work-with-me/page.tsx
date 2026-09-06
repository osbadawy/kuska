"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Camera,
  Film,
  HeartHandshake,
  MapPin,
  Megaphone,
  Mic2,
  Plane,
  Sparkles,
  Users,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

/* ═════════════════════════════════════
   TYPES
═════════════════════════════════════ */

type WorkType = {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  detail: string;
  deliverables: string[];
  icon: typeof Camera;
};

/* ═════════════════════════════════════
   DATA
═════════════════════════════════════ */

const workTypes: WorkType[] = [
  {
    id: "campaigns",
    number: "01",
    title: "Brand Campaigns",
    shortTitle: "Campaigns",
    description:
      "Campaign-led content that puts the brand naturally inside Reka's lifestyle.",
    detail:
      "From one focused campaign to a larger launch, the aim is always to create content that feels like something Reka would genuinely share — rather than a message placed on top of her audience.",
    deliverables: [
      "Social campaigns",
      "Launch content",
      "Product storytelling",
      "Short-form video",
      "Photography",
    ],
    icon: Megaphone,
  },
  {
    id: "content",
    number: "02",
    title: "Content Creation",
    shortTitle: "Content",
    description:
      "Original lifestyle content created around movement, food, wellness and travel.",
    detail:
      "Reka combines a creator's perspective with her background in design and product thinking. Content can be created for her own channels or produced specifically for a brand to use across its platforms.",
    deliverables: [
      "Reels & short video",
      "Lifestyle photography",
      "UGC-style content",
      "Recipe content",
      "Fitness content",
    ],
    icon: Film,
  },
  {
    id: "ambassador",
    number: "03",
    title: "Ambassadorships",
    shortTitle: "Ambassador",
    description:
      "Longer-term relationships with brands that genuinely fit Reka and Kuska Motion.",
    detail:
      "The strongest partnerships usually grow over time. Repeated, natural integration allows the audience to understand why Reka actually uses or believes in the brand rather than seeing it once and moving on.",
    deliverables: [
      "Long-term partnerships",
      "Brand integration",
      "Campaign series",
      "Product launches",
      "Community activations",
    ],
    icon: HeartHandshake,
  },
  {
    id: "travel",
    number: "04",
    title: "Travel & Hospitality",
    shortTitle: "Travel",
    description:
      "Destinations, hotels and experiences shown through an active lifestyle lens.",
    detail:
      "Travel content can combine movement, beautiful locations, good food and genuine experience. The result should make people want to experience the place — without turning the trip into one long advertisement.",
    deliverables: [
      "Hotel stays",
      "Destination campaigns",
      "Travel storytelling",
      "Experience coverage",
      "Lifestyle photography",
    ],
    icon: Plane,
  },
  {
    id: "events",
    number: "05",
    title: "Events & Appearances",
    shortTitle: "Events",
    description:
      "Brand events, launches, fitness experiences and community-led appearances.",
    detail:
      "Reka can bring the Kuska Motion energy into real-world experiences — whether that is joining a launch, participating in an activation, hosting movement-led experiences or simply connecting with the community.",
    deliverables: [
      "Brand events",
      "Launch appearances",
      "Fitness experiences",
      "Community events",
      "Event content",
    ],
    icon: Mic2,
  },
  {
    id: "community",
    number: "06",
    title: "Community Activations",
    shortTitle: "Community",
    description:
      "Running, movement and wellness experiences built around real participation.",
    detail:
      "Kuska Motion is growing beyond content into community. Brands can become part of runs, challenges, meetups and movement-led experiences when there is a genuine reason for them to be there.",
    deliverables: [
      "Run clubs",
      "Community challenges",
      "Meetups",
      "Wellness activations",
      "Branded experiences",
    ],
    icon: Users,
  },
];

const values = [
  {
    title: "Authentic",
    description:
      "If Reka would not naturally use it, talk about it or enjoy it, the partnership probably does not belong here.",
  },
  {
    title: "Useful",
    description:
      "Good content should give the audience something — an idea, experience, recommendation or reason to care.",
  },
  {
    title: "Beautiful",
    description:
      "The visual quality matters. Content should feel intentional while still staying natural and believable.",
  },
  {
    title: "Personal",
    description:
      "The strongest work sounds like Reka, looks like Kuska Motion and fits naturally into her real life.",
  },
];

const process = [
  {
    number: "01",
    title: "Tell me about the idea",
    description:
      "Share the brand, campaign, timing and what you're hoping to create.",
  },
  {
    number: "02",
    title: "Find the right format",
    description:
      "We shape the collaboration around what makes sense for both the brand and Reka's audience.",
  },
  {
    number: "03",
    title: "Build the story",
    description:
      "The campaign is developed around a clear idea rather than simply a list of deliverables.",
  },
  {
    number: "04",
    title: "Create & share",
    description:
      "Content is produced, refined and brought to life across the agreed channels and experiences.",
  },
];

/* ═════════════════════════════════════
   PAGE
═════════════════════════════════════ */

export default function WorkWithMePage() {
  const heroRef = useRef<HTMLElement>(null);

  const [activeWork, setActiveWork] = useState<WorkType>(
    workTypes[0]
  );

  /* ═════════════════════════════════════
     HERO MOUSE MOVEMENT
  ══════════════════════════════════════ */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const portraitXRaw = useTransform(
    mouseX,
    [-1, 1],
    [-14, 14]
  );

  const portraitYRaw = useTransform(
    mouseY,
    [-1, 1],
    [-9, 9]
  );

  const cardsXRaw = useTransform(
    mouseX,
    [-1, 1],
    [-28, 28]
  );

  const cardsYRaw = useTransform(
    mouseY,
    [-1, 1],
    [-18, 18]
  );

  const copyXRaw = useTransform(
    mouseX,
    [-1, 1],
    [5, -5]
  );

  const copyYRaw = useTransform(
    mouseY,
    [-1, 1],
    [3, -3]
  );

  const portraitX = useSpring(portraitXRaw, {
    stiffness: 70,
    damping: 24,
  });

  const portraitY = useSpring(portraitYRaw, {
    stiffness: 70,
    damping: 24,
  });

  const cardsX = useSpring(cardsXRaw, {
    stiffness: 55,
    damping: 22,
  });

  const cardsY = useSpring(cardsYRaw, {
    stiffness: 55,
    damping: 22,
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
          bg-[#F0E5E1]
        "
      >
        {/* Ambient background */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_72%_32%,rgba(216,163,153,0.40),transparent_30%),radial-gradient(circle_at_14%_75%,rgba(255,255,255,0.85),transparent_30%)]
          "
        />

        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -25, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none
            absolute
            -right-[15%]
            -top-[10%]
            h-[750px]
            w-[750px]
            rounded-full
            bg-[#E7B6AB]/30
            blur-[125px]
          "
        />

        {/* decorative orbit */}

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            pointer-events-none
            absolute
            right-[8%]
            top-[9%]
            hidden
            h-[680px]
            w-[680px]
            rounded-full
            border
            border-dashed
            border-[#B87E74]/10
            lg:block
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
              gap-16
              lg:grid-cols-[0.9fr_1.1fr]
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
                  Work with Reka
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
                  max-w-[760px]
                  font-serif
                  text-[60px]
                  leading-[0.88]
                  tracking-[-0.055em]
                  sm:text-[78px]
                  lg:text-[96px]
                "
              >
                Create something
                <br />
                people actually
                <br />

                <span className="italic text-[#B87E74]">
                  want to watch.
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
                  delay: 0.3,
                  duration: 0.8,
                }}
                className="
                  mt-7
                  max-w-[510px]
                  text-sm
                  leading-7
                  text-[#74625C]
                  sm:text-[15px]
                "
              >
                Campaigns, content, travel, events and
                long-term partnerships built around Reka&apos;s
                real lifestyle and the world of Kuska Motion.
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
                  delay: 0.42,
                }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Link
                  href="#ways-to-work"
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
                  "
                >
                  Ways to work together

                  <ArrowDown
                    size={14}
                    className="transition-transform group-hover:translate-y-1"
                  />
                </Link>

                <Link
                  href="/contact"
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
                    backdrop-blur-xl
                    transition
                    hover:bg-white
                  "
                >
                  Send an enquiry
                </Link>
              </motion.div>
            </motion.div>

            {/* VISUAL */}

            <div
              className="
                relative
                mx-auto
                h-[620px]
                w-full
                max-w-[600px]
                lg:justify-self-end
              "
            >
              {/* cards behind portrait */}

              <motion.div
                style={{
                  x: cardsX,
                  y: cardsY,
                }}
                className="absolute inset-0"
              >
                <FloatingWorkCard
                  className="left-[2%] top-[14%]"
                  icon={Camera}
                  title="Campaign"
                  subtitle="Content creation"
                  delay={0}
                />

                <FloatingWorkCard
                  className="right-[0%] top-[7%]"
                  icon={Plane}
                  title="Travel"
                  subtitle="Experiences"
                  delay={0.7}
                />

                <FloatingWorkCard
                  className="bottom-[8%] left-[0%]"
                  icon={HeartHandshake}
                  title="Ambassador"
                  subtitle="Long-term"
                  delay={1.2}
                />

                <FloatingWorkCard
                  className="bottom-[4%] right-[2%]"
                  icon={Users}
                  title="Community"
                  subtitle="Real-world"
                  delay={1.7}
                />
              </motion.div>

              {/* portrait */}

              <motion.div
                style={{
                  x: portraitX,
                  y: portraitY,
                }}
                initial={{
                  opacity: 0,
                  scale: 0.94,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 1,
                  delay: 0.15,
                }}
                className="
                  absolute
                  left-1/2
                  top-1/2
                  z-10
                  h-[500px]
                  w-[360px]
                  -translate-x-1/2
                  -translate-y-1/2
                  overflow-hidden
                  rounded-[180px]
                  border
                  border-white/70
                  bg-[#D8C7C1]
                  shadow-[0_35px_100px_rgba(83,54,46,0.18)]
                "
              >
                <Image
                  src="/images/about/reka-hero.jpg"
                  alt="Reka Tokaji"
                  fill
                  priority
                  sizes="360px"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

                <div
                  className="
                    absolute
                    bottom-5
                    left-1/2
                    flex
                    -translate-x-1/2
                    items-center
                    gap-2
                    whitespace-nowrap
                    rounded-full
                    border
                    border-white/20
                    bg-black/15
                    px-4
                    py-2
                    text-[9px]
                    font-medium
                    uppercase
                    tracking-[0.16em]
                    text-white
                    backdrop-blur-xl
                  "
                >
                  <MapPin size={11} />

                  Spain · Available worldwide
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          INTRO
      ═══════════════════════════════════════ */}

      <section className="px-5 py-24 sm:px-8 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-[300px_1fr] lg:gap-24">
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#B87E74]">
              The approach
            </p>

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
                The brand should fit into the content.
                <br />
                Not the other{" "}

                <span className="italic text-[#B87E74]">
                  way around.
                </span>
              </h2>

              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <p className="text-sm leading-7 text-[#7A6C67]">
                  Reka&apos;s audience follows her because the
                  lifestyle is real — running, training, eating
                  well, travelling and sharing the experiences
                  around it.
                </p>

                <p className="text-sm leading-7 text-[#7A6C67]">
                  The best collaborations respect that. Instead
                  of interrupting the story, the brand becomes
                  part of something that already makes sense.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          INTERACTIVE WORK TYPES
      ═══════════════════════════════════════ */}

      <section
        id="ways-to-work"
        className="px-5 pb-24 sm:px-8 lg:px-16 lg:pb-32"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#B87E74]">
                Ways to work together
              </p>

              <h2 className="mt-5 font-serif text-[48px] leading-[0.95] tracking-[-0.04em] sm:text-[62px]">
                Choose the
                <br />

                <span className="italic text-[#B87E74]">
                  right format.
                </span>
              </h2>
            </div>

            <p className="max-w-[440px] text-sm leading-7 text-[#7A6C67]">
              Every partnership starts differently. Explore
              the formats that can become part of the Kuska
              Motion world.
            </p>
          </div>

          <div
            className="
              overflow-hidden
              rounded-[30px]
              border
              border-[#28211F]/10
              bg-[#F1E8E4]
              lg:grid
              lg:grid-cols-[390px_1fr]
            "
          >
            {/* Selector */}

            <div className="border-[#28211F]/10 lg:border-r">
              {workTypes.map((item) => {
                const Icon = item.icon;

                const active =
                  activeWork.id === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setActiveWork(item)
                    }
                    className={`
                      group
                      flex
                      w-full
                      items-center
                      justify-between
                      border-b
                      border-[#28211F]/10
                      px-6
                      py-5
                      text-left
                      transition-all
                      duration-300
                      last:border-b-0
                      sm:px-8

                      ${
                        active
                          ? "bg-[#28211F] text-white"
                          : "hover:bg-white/70"
                      }
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={
                          active
                            ? "text-[9px] tracking-[0.18em] text-[#E7B6AB]"
                            : "text-[9px] tracking-[0.18em] text-[#B87E74]"
                        }
                      >
                        {item.number}
                      </span>

                      <span className="font-serif text-[23px] tracking-[-0.02em]">
                        {item.shortTitle}
                      </span>
                    </div>

                    <Icon
                      size={16}
                      strokeWidth={1.5}
                      className={
                        active
                          ? "text-[#E7B6AB]"
                          : "text-[#B87E74]"
                      }
                    />
                  </button>
                );
              })}
            </div>

            {/* Detail */}

            <div
              className="
                relative
                min-h-[570px]
                overflow-hidden
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
                  -right-[20%]
                  -top-[30%]
                  h-[550px]
                  w-[550px]
                  rounded-full
                  bg-[#E7B6AB]/10
                  blur-[110px]
                "
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeWork.id}
                  initial={{
                    opacity: 0,
                    y: 20,
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
                    duration: 0.35,
                  }}
                  className="
                    relative
                    z-10
                    flex
                    min-h-[450px]
                    flex-col
                    justify-between
                  "
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#E7B6AB]">
                        {activeWork.number}
                      </p>

                      <div
                        className="
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-white/10
                          bg-white/[0.05]
                        "
                      >
                        <activeWork.icon
                          size={17}
                          strokeWidth={1.5}
                          className="text-[#E7B6AB]"
                        />
                      </div>
                    </div>

                    <h3
                      className="
                        mt-7
                        max-w-[700px]
                        font-serif
                        text-[42px]
                        leading-[0.98]
                        tracking-[-0.035em]
                        sm:text-[54px]
                      "
                    >
                      {activeWork.title}
                    </h3>

                    <p className="mt-7 max-w-[680px] text-sm leading-7 text-white/50">
                      {activeWork.detail}
                    </p>
                  </div>

                  <div className="mt-12">
                    <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/30">
                      Possible formats
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {activeWork.deliverables.map(
                        (deliverable) => (
                          <span
                            key={deliverable}
                            className="
                              rounded-full
                              border
                              border-white/10
                              bg-white/[0.04]
                              px-4
                              py-2
                              text-[10px]
                              text-white/60
                            "
                          >
                            {deliverable}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WHY REKA
      ═══════════════════════════════════════ */}

      <section className="bg-[#EDE3DF] px-5 py-24 sm:px-8 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-14 lg:grid-cols-[400px_1fr] lg:gap-24">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#B87E74]">
                The fit
              </p>

              <h2
                className="
                  mt-5
                  font-serif
                  text-[48px]
                  leading-[0.95]
                  tracking-[-0.04em]
                  sm:text-[60px]
                "
              >
                More creator.
                <br />
                Less{" "}

                <span className="italic text-[#B87E74]">
                  billboard.
                </span>
              </h2>

              <p className="mt-7 max-w-[350px] text-sm leading-7 text-[#7A6C67]">
                The goal is not to squeeze as many brands as
                possible into Kuska Motion. It is to build the
                right relationships well.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-[28px] bg-[#28211F]/10 sm:grid-cols-2">
              {values.map((value, index) => (
                <motion.article
                  key={value.title}
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
                    delay: index * 0.08,
                  }}
                  className="
                    group
                    min-h-[280px]
                    bg-[#F7F2EF]
                    p-8
                    transition-colors
                    duration-500
                    hover:bg-[#28211F]
                    sm:p-10
                  "
                >
                  <div className="flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#B87E74] group-hover:text-[#E7B6AB]">
                        0{index + 1}
                      </span>

                      <BadgeCheck
                        size={16}
                        strokeWidth={1.5}
                        className="
                          text-[#B87E74]
                          opacity-0
                          transition-opacity
                          group-hover:opacity-100
                        "
                      />
                    </div>

                    <div className="mt-14">
                      <h3 className="font-serif text-[32px] tracking-[-0.03em] transition-colors group-hover:text-white">
                        {value.title}
                      </h3>

                      <p className="mt-4 text-sm leading-7 text-[#7A6C67] transition-colors group-hover:text-white/50">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </motion.article>
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
          <div className="mb-14">
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#B87E74]">
              From brief to reality
            </p>

            <h2 className="mt-5 font-serif text-[48px] leading-[0.95] tracking-[-0.04em] sm:text-[62px]">
              Keep the process
              <br />

              <span className="italic text-[#B87E74]">
                simple.
              </span>
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden rounded-[30px] bg-[#28211F]/10 lg:grid-cols-4">
            {process.map((step, index) => (
              <motion.div
                key={step.title}
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
                  delay: index * 0.07,
                }}
                className="
                  group
                  min-h-[350px]
                  bg-[#FAF7F5]
                  p-8
                  transition-colors
                  duration-400
                  hover:bg-white
                  lg:p-9
                "
              >
                <div className="flex h-full flex-col justify-between">
                  <span className="text-[10px] font-medium tracking-[0.2em] text-[#B87E74]">
                    {step.number}
                  </span>

                  <div className="mt-20">
                    <h3 className="font-serif text-[29px] leading-[1] tracking-[-0.025em]">
                      {step.title}
                    </h3>

                    <p className="mt-5 text-sm leading-7 text-[#7A6C67]">
                      {step.description}
                    </p>

                    <ArrowRight
                      size={15}
                      className="
                        mt-7
                        -translate-x-2
                        text-[#B87E74]
                        opacity-0
                        transition-all
                        duration-300
                        group-hover:translate-x-0
                        group-hover:opacity-100
                      "
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PERSONAL NOTE
      ═══════════════════════════════════════ */}

      <section className="px-5 pb-24 sm:px-8 lg:px-16 lg:pb-32">
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
              duration: 10,
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
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#704F48]">
                A note from Reka
              </p>

              <h2
                className="
                  mt-6
                  max-w-[880px]
                  font-serif
                  text-[48px]
                  leading-[0.94]
                  tracking-[-0.045em]
                  sm:text-[64px]
                  lg:text-[74px]
                "
              >
                If it feels natural,
                <br />

                <span className="italic text-white">
                  people can feel that too.
                </span>
              </h2>
            </div>

            <p className="text-sm leading-7 text-[#674D47]">
              I want partnerships to feel like something I
              would genuinely talk about even if there wasn&apos;t
              a campaign attached to it. That&apos;s when the
              content becomes better, the audience trusts it
              more and the brand gets something much more
              valuable than a placement.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA
      ═══════════════════════════════════════ */}

      <section className="px-5 pb-24 sm:px-8 lg:px-16 lg:pb-32">
        <div
          className="
            relative
            mx-auto
            max-w-[1440px]
            overflow-hidden
            rounded-[34px]
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
              -top-[100%]
              h-[700px]
              w-[700px]
              rounded-full
              bg-[#E7B6AB]/15
              blur-[110px]
            "
          />

          <div className="relative z-10 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#E7B6AB]">
                Have something in mind?
              </p>

              <h2
                className="
                  mt-5
                  max-w-[850px]
                  font-serif
                  text-[50px]
                  leading-[0.93]
                  tracking-[-0.045em]
                  sm:text-[66px]
                  lg:text-[76px]
                "
              >
                Let&apos;s see what
                <br />

                <span className="italic text-[#E7B6AB]">
                  we can create.
                </span>
              </h2>

              <p className="mt-7 max-w-[500px] text-sm leading-7 text-white/45">
                Tell us about the brand, the idea and what
                you&apos;re hoping to build with Reka.
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
              Work with me

              <ArrowUpRight
                size={15}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ═════════════════════════════════════
   FLOATING HERO CARD
═════════════════════════════════════ */

function FloatingWorkCard({
  icon: Icon,
  title,
  subtitle,
  className,
  delay,
}: {
  icon: typeof Camera;
  title: string;
  subtitle: string;
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 5.5,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1.05,
      }}
      className={`
        absolute
        z-20
        hidden
        w-[165px]
        rounded-[20px]
        border
        border-white/60
        bg-white/48
        p-4
        shadow-[0_18px_55px_rgba(78,50,43,0.10)]
        backdrop-blur-[22px]
        sm:block
        ${className}
      `}
    >
      <div className="flex items-center justify-between">
        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-[#28211F]
            text-[#E7B6AB]
          "
        >
          <Icon
            size={14}
            strokeWidth={1.5}
          />
        </div>

        <Sparkles
          size={11}
          className="text-[#B87E74]"
        />
      </div>

      <p className="mt-5 font-serif text-[21px] tracking-[-0.02em]">
        {title}
      </p>

      <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-[#8E746D]">
        {subtitle}
      </p>
    </motion.div>
  );
}