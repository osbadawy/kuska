"use client";

import {
  useRef,
  useState,
  type PointerEvent,
}  from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Dumbbell,
  HeartPulse,
  Hotel,
  Salad,
  Sparkles,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

type PartnershipCategory = {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  detail: string;
  examples: string[];
  icon: typeof Dumbbell;
};

const partnershipCategories: PartnershipCategory[] = [
  {
    id: "movement",
    number: "01",
    title: "Fitness & Movement",
    shortTitle: "Movement",
    description:
      "Activewear, training, running, recovery and movement-led brands that naturally belong in Kuska's everyday life.",
    detail:
      "These partnerships work best when the product becomes part of the experience rather than the focus of it. Training sessions, running days, challenges, routines and real-life use create a much stronger story than traditional promotion.",
    examples: [
      "Activewear",
      "Running",
      "Training equipment",
      "Recovery",
      "Fitness technology",
    ],
    icon: Dumbbell,
  },
  {
    id: "nutrition",
    number: "02",
    title: "Food & Nutrition",
    shortTitle: "Nutrition",
    description:
      "Food, nutrition and kitchen brands that fit naturally into a balanced, enjoyable approach to eating.",
    detail:
      "Kuska Motion treats food as part of living well, not something to fear or overcomplicate. Partnerships can live inside recipes, everyday meals, grocery habits, recovery nutrition and simple moments around food.",
    examples: [
      "Food brands",
      "Healthy snacks",
      "Kitchen products",
      "Functional drinks",
      "Nutrition",
    ],
    icon: Salad,
  },
  {
    id: "wellness",
    number: "03",
    title: "Lifestyle & Wellness",
    shortTitle: "Wellness",
    description:
      "Products and experiences that support better routines, recovery, confidence and everyday wellbeing.",
    detail:
      "Wellness partnerships should feel useful and believable. The strongest ideas are those that genuinely become part of Kuska's routines and can be shared through personal experience rather than scripted messaging.",
    examples: [
      "Wellness",
      "Beauty",
      "Recovery",
      "Self-care",
      "Healthy habits",
    ],
    icon: HeartPulse,
  },
  {
    id: "travel",
    number: "04",
    title: "Travel & Hospitality",
    shortTitle: "Travel",
    description:
      "Hotels, destinations, retreats and travel experiences told through an active lifestyle perspective.",
    detail:
      "Travel is a major part of the Kuska Motion world. Partnerships can combine movement, food, local culture and beautiful environments to create content that feels more like a genuine experience than a campaign.",
    examples: [
      "Hotels",
      "Destinations",
      "Airlines",
      "Retreats",
      "Travel experiences",
    ],
    icon: Hotel,
  },
];

const principles = [
  {
    number: "01",
    title: "Natural fit",
    text: "A partnership should make sense even before the campaign begins.",
  },
  {
    number: "02",
    title: "Real use",
    text: "Products and experiences should genuinely become part of Kuska's life.",
  },
  {
    number: "03",
    title: "Creative freedom",
    text: "The strongest content feels personal rather than overly scripted.",
  },
  {
    number: "04",
    title: "Long-term thinking",
    text: "Repeated, meaningful exposure builds more trust than one isolated post.",
  },
];

const formats = [
  "Social campaigns",
  "Brand ambassadorships",
  "Content production",
  "Product integration",
  "Travel campaigns",
  "Event appearances",
  "Long-term partnerships",
  "Community activations",
];

export default function PartnershipsPage() {
  const [activeCategory, setActiveCategory] = useState(
    partnershipCategories[0]
  );
  const heroRef = useRef<HTMLElement>(null);

const mouseX = useMotionValue(0);
const mouseY = useMotionValue(0);

/* Network moves slightly with cursor */
const networkXRaw = useTransform(
  mouseX,
  [-1, 1],
  [-18, 18]
);

const networkYRaw = useTransform(
  mouseY,
  [-1, 1],
  [-12, 12]
);

/* Center node moves slightly opposite */
const centerXRaw = useTransform(
  mouseX,
  [-1, 1],
  [6, -6]
);

const centerYRaw = useTransform(
  mouseY,
  [-1, 1],
  [4, -4]
);

const networkX = useSpring(networkXRaw, {
  stiffness: 65,
  damping: 24,
});

const networkY = useSpring(networkYRaw, {
  stiffness: 65,
  damping: 24,
});

const centerX = useSpring(centerXRaw, {
  stiffness: 80,
  damping: 25,
});

const centerY = useSpring(centerYRaw, {
  stiffness: 80,
  damping: 25,
});

function handleHeroPointerMove(
  event: PointerEvent<HTMLElement>
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

function handleHeroPointerLeave() {
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
  onPointerMove={handleHeroPointerMove}
  onPointerLeave={handleHeroPointerLeave}
  className="
    relative
    min-h-screen
    overflow-hidden
    bg-[#211C1A]
  "
>
  {/* ======================================
      BACKGROUND ATMOSPHERE
  ====================================== */}

  <div
    className="
      pointer-events-none
      absolute
      inset-0
      bg-[radial-gradient(circle_at_72%_42%,rgba(231,182,171,0.15),transparent_30%),radial-gradient(circle_at_15%_80%,rgba(197,143,133,0.10),transparent_26%)]
    "
  />

  {/* animated rose glow */}

  <motion.div
    animate={{
      x: [0, 45, 0],
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
      -right-[10%]
      top-[3%]
      h-[700px]
      w-[700px]
      rounded-full
      bg-[#E7B6AB]/10
      blur-[130px]
    "
  />

  {/* secondary glow */}

  <motion.div
    animate={{
      x: [0, -25, 0],
      y: [0, 35, 0],
    }}
    transition={{
      duration: 11,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="
      pointer-events-none
      absolute
      -bottom-[30%]
      left-[10%]
      h-[550px]
      w-[550px]
      rounded-full
      bg-[#C58F85]/8
      blur-[120px]
    "
  />

  {/* subtle grain-like light */}

  <div
    className="
      pointer-events-none
      absolute
      inset-0
      opacity-[0.025]
      bg-[radial-gradient(circle,white_1px,transparent_1px)]
      bg-[size:28px_28px]
    "
  />

  {/* ======================================
      PARTNERSHIP NETWORK
  ====================================== */}

  <motion.div
    style={{
      x: networkX,
      y: networkY,
    }}
    className="
      pointer-events-none
      absolute
      right-[2%]
      top-[12%]
      hidden
      h-[76%]
      w-[58%]
      lg:block
    "
  >
    {/* connection artwork */}

    <svg
      viewBox="0 0 850 720"
      className="absolute inset-0 h-full w-full"
      fill="none"
    >
      {/* Outer orbital rings */}

      <motion.ellipse
        cx="430"
        cy="350"
        rx="300"
        ry="245"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1"
        strokeDasharray="5 12"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          transformOrigin: "430px 350px",
        }}
      />

      <motion.ellipse
        cx="430"
        cy="350"
        rx="225"
        ry="180"
        stroke="rgba(231,182,171,0.10)"
        strokeWidth="1"
        strokeDasharray="3 10"
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 48,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          transformOrigin: "430px 350px",
        }}
      />

      {/* Connections */}

      {[
        "M430 350 C360 250 300 200 200 155",
        "M430 350 C530 245 600 210 710 175",
        "M430 350 C335 440 275 495 180 545",
        "M430 350 C540 450 610 505 710 560",
      ].map((path, index) => (
        <g key={path}>
          <path
            d={path}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="10"
            strokeLinecap="round"
          />

          <motion.path
            d={path}
            stroke="#C58F85"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="4 13"
            animate={{
              strokeDashoffset: -70,
            }}
            transition={{
              duration: 4 + index * 0.4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </g>
      ))}

      {/* center pulse */}

      <motion.circle
        cx="430"
        cy="350"
        r="105"
        stroke="rgba(231,182,171,0.18)"
        strokeWidth="1"
        initial={{
          scale: 0.8,
          opacity: 0.7,
        }}
        animate={{
          scale: 1.4,
          opacity: 0,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeOut",
        }}
        style={{
          transformOrigin: "430px 350px",
        }}
      />

      <motion.circle
        cx="430"
        cy="350"
        r="80"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
        initial={{
          scale: 0.9,
          opacity: 0.5,
        }}
        animate={{
          scale: 1.25,
          opacity: 0,
        }}
        transition={{
          duration: 3,
          delay: 1.2,
          repeat: Infinity,
          ease: "easeOut",
        }}
        style={{
          transformOrigin: "430px 350px",
        }}
      />
    </svg>

    {/* ======================================
        CENTRAL KUSKA NODE
    ====================================== */}

    <motion.div
      style={{
        x: centerX,
        y: centerY,
      }}
      animate={{
        scale: [1, 1.025, 1],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="
        pointer-events-auto
        absolute
        left-1/2
        top-1/2
        z-20
        flex
        h-[170px]
        w-[170px]
        -translate-x-1/2
        -translate-y-1/2
        items-center
        justify-center
        rounded-full
        border
        border-white/20
        bg-white/[0.09]
        shadow-[0_24px_80px_rgba(0,0,0,0.25)]
        backdrop-blur-[28px]
      "
    >
      {/* glass reflection */}

      <div
        className="
          pointer-events-none
          absolute
          inset-[1px]
          rounded-full
          bg-gradient-to-br
          from-white/15
          via-transparent
          to-transparent
        "
      />

      <div className="relative text-center">
        <Image
          src="/logo.png"
          alt="Kuska Motion"
          width={105}
          height={40}
          className="
            mx-auto
            h-auto
            w-[100px]
            object-contain
          "
        />

        <p className="mt-3 text-[8px] font-medium uppercase tracking-[0.22em] text-[#E7B6AB]">
          Brand ecosystem
        </p>
      </div>
    </motion.div>

    {/* ======================================
        MOVEMENT NODE
    ====================================== */}

    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 5.2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="
        pointer-events-auto
        absolute
        left-[13%]
        top-[12%]
        group
      "
    >
      <PartnershipNode
        label="Movement"
        detail="Training · Running"
        number="01"
        icon={Dumbbell}
      />
    </motion.div>

    {/* ======================================
        NUTRITION NODE
    ====================================== */}

    <motion.div
      animate={{
        y: [0, 12, 0],
      }}
      transition={{
        duration: 6.2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="
        pointer-events-auto
        absolute
        right-[7%]
        top-[15%]
      "
    >
      <PartnershipNode
        label="Nutrition"
        detail="Food · Everyday fuel"
        number="02"
        icon={Salad}
      />
    </motion.div>

    {/* ======================================
        WELLNESS NODE
    ====================================== */}

    <motion.div
      animate={{
        y: [0, 10, 0],
      }}
      transition={{
        duration: 5.7,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="
        pointer-events-auto
        absolute
        bottom-[7%]
        left-[10%]
      "
    >
      <PartnershipNode
        label="Wellness"
        detail="Recovery · Lifestyle"
        number="03"
        icon={HeartPulse}
      />
    </motion.div>

    {/* ======================================
        TRAVEL NODE
    ====================================== */}

    <motion.div
      animate={{
        y: [0, -11, 0],
      }}
      transition={{
        duration: 6.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="
        pointer-events-auto
        absolute
        bottom-[5%]
        right-[6%]
      "
    >
      <PartnershipNode
        label="Travel"
        detail="Hotels · Experiences"
        number="04"
        icon={Hotel}
      />
    </motion.div>

    {/* ======================================
        FLOATING SIGNAL LABEL
    ====================================== */}

    <motion.div
      animate={{
        y: [0, -7, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="
        absolute
        right-[32%]
        top-[7%]
        rounded-full
        border
        border-white/10
        bg-white/[0.05]
        px-4
        py-2
        text-[9px]
        uppercase
        tracking-[0.18em]
        text-white/40
        backdrop-blur-xl
      "
    >
      authentic alignment
    </motion.div>
  </motion.div>

  {/* ======================================
      HERO CONTENT
  ====================================== */}

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
    <div className="grid w-full gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      {/* LEFT COPY */}

      <div>
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
            delay: 0.1,
          }}
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-[#E7B6AB]/20
            bg-white/[0.05]
            px-4
            py-2
            backdrop-blur-xl
          "
        >
          <Sparkles
            size={12}
            className="text-[#E7B6AB]"
          />

          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#E7B6AB]">
            Brand Partnerships
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
            max-w-[720px]
            font-serif
            text-[58px]
            leading-[0.88]
            tracking-[-0.05em]
            text-white
            sm:text-[76px]
            lg:text-[92px]
          "
        >
          The right brands
          <br />
          become part of
          <br />

          <span className="italic text-[#E7B6AB]">
            the story.
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
            text-white/55
            sm:text-[15px]
          "
        >
          Kuska Motion connects movement, nutrition, wellness
          and travel with brands that genuinely belong inside
          Kuska&apos;s lifestyle.
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
            href="#partnership-world"
            className="
              group
              inline-flex
              h-12
              items-center
              gap-3
              rounded-full
              bg-[#E7B6AB]
              px-6
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
            Explore partnerships

            <ArrowDown
              size={14}
              className="
                transition-transform
                duration-300
                group-hover:translate-y-1
              "
            />
          </Link>

          <Link
            href="/collaborate"
            className="
              inline-flex
              h-12
              items-center
              rounded-full
              border
              border-white/10
              bg-white/[0.05]
              px-6
              text-[11px]
              font-medium
              uppercase
              tracking-[0.15em]
              text-white/75
              backdrop-blur-xl
              transition-all
              hover:bg-white/10
              hover:text-white
            "
          >
            Work with Kuska
          </Link>
        </motion.div>
      </div>

      {/* Empty space occupied by ecosystem on desktop */}

      <div className="hidden lg:block" />
    </div>
  </div>

  {/* ======================================
      MOBILE PARTNERSHIP CHIPS
  ====================================== */}

  <div
    className="
      relative
      z-20
      mx-auto
      -mt-28
      grid
      max-w-[600px]
      grid-cols-2
      gap-2
      px-5
      pb-10
      lg:hidden
    "
  >
    {partnershipCategories.map((category) => {
      const Icon = category.icon;

      return (
        <div
          key={category.id}
          className="
            flex
            items-center
            gap-3
            rounded-[18px]
            border
            border-white/10
            bg-white/[0.06]
            p-4
            backdrop-blur-xl
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#E7B6AB]/10
              text-[#E7B6AB]
            "
          >
            <Icon
              size={15}
              strokeWidth={1.5}
            />
          </div>

          <div>
            <p className="font-serif text-[18px] text-white">
              {category.shortTitle}
            </p>

            <p className="mt-0.5 text-[9px] uppercase tracking-[0.13em] text-white/35">
              Partnership
            </p>
          </div>
        </div>
      );
    })}
  </div>
</section>

      {/* ═══════════════════════════════════════
          INTRO
      ═══════════════════════════════════════ */}

      <section
        id="partnership-world"
        className="px-5 py-24 sm:px-8 lg:px-16 lg:py-32"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-[300px_1fr] lg:gap-24">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#B87E74]">
                The Kuska Motion world
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
                Brands become part of the story when they fit
                naturally into{" "}
                <span className="italic text-[#B87E74]">
                  real life.
                </span>
              </h2>

              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <p className="text-sm leading-7 text-[#7A6C67]">
                  Kuska Motion sits at the intersection of movement,
                  food, wellness and travel. That creates a natural
                  environment for brands to be experienced rather
                  than simply advertised.
                </p>

                <p className="text-sm leading-7 text-[#7A6C67]">
                  Every partnership should strengthen the Kuska
                  Motion world while giving the brand a credible,
                  personal and visually distinctive way to connect
                  with the audience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          INTERACTIVE PARTNERSHIP CATEGORIES
      ═══════════════════════════════════════ */}

      <section className="px-5 pb-24 sm:px-8 lg:px-16 lg:pb-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#B87E74]">
                Partnership areas
              </p>

              <h2 className="mt-4 font-serif text-[44px] tracking-[-0.035em] sm:text-[58px]">
                Where brands can fit.
              </h2>
            </div>

            <p className="max-w-[420px] text-sm leading-7 text-[#7A6C67]">
              Choose an area to explore how different brands can
              naturally become part of Kuska&apos;s content and
              lifestyle.
            </p>
          </div>

          <div
            className="
              overflow-hidden
              rounded-[30px]
              border
              border-[#28211F]/10
              bg-[#F4EEEB]
              lg:grid
              lg:grid-cols-[360px_1fr]
            "
          >
            {/* LEFT SELECTOR */}

            <div className="border-[#28211F]/10 lg:border-r">
              {partnershipCategories.map((category) => {
                const Icon = category.icon;
                const isActive =
                  activeCategory.id === category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() =>
                      setActiveCategory(category)
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
                      py-6
                      text-left
                      transition-all
                      duration-300
                      last:border-b-0
                      sm:px-8
                      ${
                        isActive
                          ? "bg-[#28211F] text-white"
                          : "hover:bg-white/70"
                      }
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`
                          text-[10px]
                          tracking-[0.18em]
                          ${
                            isActive
                              ? "text-[#E7B6AB]"
                              : "text-[#B87E74]"
                          }
                        `}
                      >
                        {category.number}
                      </span>

                      <span className="font-serif text-[24px] tracking-[-0.02em]">
                        {category.shortTitle}
                      </span>
                    </div>

                    <Icon
                      size={17}
                      strokeWidth={1.5}
                      className={
                        isActive
                          ? "text-[#E7B6AB]"
                          : "text-[#B87E74]"
                      }
                    />
                  </button>
                );
              })}
            </div>

            {/* RIGHT PANEL */}

            <div className="relative min-h-[520px] overflow-hidden bg-[#28211F] p-7 text-white sm:p-10 lg:p-14">
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-[20%]
                  -top-[30%]
                  h-[500px]
                  w-[500px]
                  rounded-full
                  bg-[#E7B6AB]/10
                  blur-[100px]
                "
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory.id}
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
                  className="relative z-10 flex min-h-[410px] flex-col justify-between"
                >
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#E7B6AB]">
                      {activeCategory.number}
                    </p>

                    <h3
                      className="
                        mt-5
                        max-w-[700px]
                        font-serif
                        text-[40px]
                        leading-[0.98]
                        tracking-[-0.035em]
                        sm:text-[52px]
                      "
                    >
                      {activeCategory.title}
                    </h3>

                    <p className="mt-7 max-w-[650px] text-sm leading-7 text-white/55">
                      {activeCategory.detail}
                    </p>
                  </div>

                  <div className="mt-12">
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/35">
                      Natural fits
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {activeCategory.examples.map(
                        (example) => (
                          <span
                            key={example}
                            className="
                              rounded-full
                              border
                              border-white/10
                              bg-white/[0.05]
                              px-4
                              py-2
                              text-[11px]
                              text-white/65
                              backdrop-blur-xl
                            "
                          >
                            {example}
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
          PRINCIPLES
      ═══════════════════════════════════════ */}

      <section className="bg-[#EDE3DF] px-5 py-24 sm:px-8 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-14 lg:grid-cols-[400px_1fr] lg:gap-20">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#B87E74]">
                Partnership principles
              </p>

              <h2
                className="
                  mt-5
                  font-serif
                  text-[46px]
                  leading-[0.96]
                  tracking-[-0.035em]
                  sm:text-[58px]
                "
              >
                What makes it
                <br />

                <span className="italic text-[#B87E74]">
                  work.
                </span>
              </h2>

              <p className="mt-7 max-w-[340px] text-sm leading-7 text-[#7A6C67]">
                The relationship between Kuska, the brand and the
                audience matters more than simply placing a product
                in front of a camera.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-[26px] bg-[#28211F]/10 sm:grid-cols-2">
              {principles.map((principle, index) => (
                <motion.div
                  key={principle.title}
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
                    min-h-[260px]
                    bg-[#F6F0ED]
                    p-8
                    transition-all
                    duration-500
                    hover:bg-[#28211F]
                    sm:p-10
                  "
                >
                  <div className="flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-medium tracking-[0.2em] text-[#B87E74] group-hover:text-[#E7B6AB]">
                        {principle.number}
                      </span>

                      <Sparkles
                        size={15}
                        strokeWidth={1.4}
                        className="
                          text-[#B87E74]
                          opacity-0
                          transition
                          duration-300
                          group-hover:rotate-12
                          group-hover:opacity-100
                        "
                      />
                    </div>

                    <div className="mt-14">
                      <h3 className="font-serif text-[30px] tracking-[-0.025em] transition-colors group-hover:text-white">
                        {principle.title}
                      </h3>

                      <p className="mt-4 max-w-[300px] text-sm leading-7 text-[#7A6C67] transition-colors group-hover:text-white/50">
                        {principle.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PARTNERSHIP FORMATS
      ═══════════════════════════════════════ */}

      <section className="px-5 py-24 sm:px-8 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#B87E74]">
                Ways to work together
              </p>

              <h2
                className="
                  mt-5
                  max-w-[600px]
                  font-serif
                  text-[46px]
                  leading-[0.96]
                  tracking-[-0.035em]
                  sm:text-[60px]
                "
              >
                One idea can take
                <br />

                <span className="italic text-[#B87E74]">
                  many forms.
                </span>
              </h2>

              <p className="mt-7 max-w-[430px] text-sm leading-7 text-[#7A6C67]">
                Every collaboration can be shaped around the brand,
                campaign objective and the most natural way Kuska
                would actually experience it.
              </p>
            </div>

            <div className="border-y border-[#28211F]/10">
              {formats.map((format, index) => (
                <motion.div
                  key={format}
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
                    duration: 0.45,
                    delay: index * 0.04,
                  }}
                  className="
                    group
                    flex
                    cursor-default
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
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className="
                        font-serif
                        text-[25px]
                        tracking-[-0.02em]
                        transition-transform
                        duration-300
                        group-hover:translate-x-2
                        sm:text-[31px]
                      "
                    >
                      {format}
                    </span>
                  </div>

                  <ArrowRight
                    size={16}
                    strokeWidth={1.5}
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
          FUTURE PARTNERS SECTION
      ═══════════════════════════════════════ */}

      <section className="px-5 pb-24 sm:px-8 lg:px-16 lg:pb-32">
        <div
          className="
            mx-auto
            max-w-[1440px]
            overflow-hidden
            rounded-[32px]
            border
            border-[#28211F]/10
            bg-white/40
            p-7
            sm:p-10
            lg:p-14
          "
        >
          <div className="grid gap-12 lg:grid-cols-[1fr_420px] lg:items-end">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#B87E74]">
                Selected partners
              </p>

              <h2
                className="
                  mt-5
                  max-w-[700px]
                  font-serif
                  text-[42px]
                  leading-[0.98]
                  tracking-[-0.035em]
                  sm:text-[56px]
                "
              >
                Partnerships worth
                <br />

                <span className="italic text-[#B87E74]">
                  remembering.
                </span>
              </h2>
            </div>

            <p className="text-sm leading-7 text-[#7A6C67]">
              As Kuska Motion grows, this space can showcase selected
              collaborations, campaigns and long-term brand
              relationships — with campaign imagery, results and
              stories behind each partnership.
            </p>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Movement",
              "Nutrition",
              "Wellness",
              "Travel",
            ].map((category) => (
              <div
                key={category}
                className="
                  group
                  flex
                  min-h-[150px]
                  items-center
                  justify-center
                  rounded-[20px]
                  border
                  border-[#28211F]/10
                  bg-[#F4EEEB]
                  transition-all
                  duration-400
                  hover:-translate-y-1
                  hover:bg-[#28211F]
                "
              >
                <span
                  className="
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.2em]
                    text-[#9D8981]
                    transition-colors
                    group-hover:text-[#E7B6AB]
                  "
                >
                  {category}
                </span>
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
          <motion.div
            animate={{
              x: [0, 40, 0],
              y: [0, -25, 0],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              pointer-events-none
              absolute
              -right-[10%]
              -top-[70%]
              h-[650px]
              w-[650px]
              rounded-full
              bg-[#E7B6AB]/15
              blur-[110px]
            "
          />

          <div className="relative z-10 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#E7B6AB]">
                Become part of the story
              </p>

              <h2
                className="
                  mt-5
                  max-w-[850px]
                  font-serif
                  text-[48px]
                  leading-[0.94]
                  tracking-[-0.04em]
                  sm:text-[64px]
                  lg:text-[76px]
                "
              >
                Think your brand belongs
                <br />

                <span className="italic text-[#E7B6AB]">
                  in this world?
                </span>
              </h2>

              <p className="mt-7 max-w-[500px] text-sm leading-7 text-white/50">
                Tell us what you&apos;re building and let&apos;s
                explore whether there&apos;s a natural way to create
                something together.
              </p>
            </div>

            <Link
              href="/collaborate"
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
              Start a partnership

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

function PartnershipNode({
  label,
  detail,
  number,
  icon: Icon,
}: {
  label: string;
  detail: string;
  number: string;
  icon: typeof Dumbbell;
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.06,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 18,
      }}
      className="
        group
        relative
        w-[190px]
        cursor-default
        overflow-hidden
        rounded-[22px]
        border
        border-white/[0.14]
        bg-white/[0.075]
        p-5
        shadow-[0_20px_60px_rgba(0,0,0,0.18)]
        backdrop-blur-[22px]
        transition-colors
        duration-300
        hover:bg-white/[0.12]
      "
    >
      {/* Glass highlight */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-br
          from-white/[0.12]
          via-transparent
          to-transparent
        "
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-medium tracking-[0.2em] text-[#E7B6AB]">
            {number}
          </span>

          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/[0.05]
              text-[#E7B6AB]
              transition-transform
              duration-300
              group-hover:rotate-6
            "
          >
            <Icon
              size={15}
              strokeWidth={1.5}
            />
          </div>
        </div>

        <h3 className="mt-8 font-serif text-[25px] tracking-[-0.025em] text-white">
          {label}
        </h3>

        <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-white/35">
          {detail}
        </p>

        {/* connection indicator */}

        <div className="mt-5 flex items-center gap-2">
          <motion.div
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="h-1.5 w-1.5 rounded-full bg-[#E7B6AB]"
          />

          <span className="text-[9px] uppercase tracking-[0.15em] text-white/30">
            Connected
          </span>
        </div>
      </div>
    </motion.div>
  );
}