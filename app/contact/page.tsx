"use client";

import {
  FormEvent,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  HeartHandshake,
  Mail,
  MessageCircle,
  Send,
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

type ContactCategory =
  | "GENERAL"
  | "COLLABORATION"
  | "PARTNERSHIP"
  | "COMMUNITY";

type ContactOption = {
  id: ContactCategory;
  number: string;
  title: string;
  description: string;
  icon: typeof MessageCircle;
};

const contactOptions: ContactOption[] = [
  {
    id: "GENERAL",
    number: "01",
    title: "Say Hello",
    description:
      "A question, thought or just something you'd like to share.",
    icon: MessageCircle,
  },
  {
    id: "COLLABORATION",
    number: "02",
    title: "Collaborate",
    description:
      "Content, campaigns, events or an idea you'd like to create together.",
    icon: Sparkles,
  },
  {
    id: "PARTNERSHIP",
    number: "03",
    title: "Partnership",
    description:
      "Brand partnerships and longer-term opportunities with Kuska Motion.",
    icon: HeartHandshake,
  },
  {
    id: "COMMUNITY",
    number: "04",
    title: "Community",
    description:
      "Run clubs, community events, meetups or bringing Kuska Motion to your city.",
    icon: Users,
  },
];

export default function ContactPage() {
  const heroRef = useRef<HTMLElement>(null);

  const [category, setCategory] =
    useState<ContactCategory>("GENERAL");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  /* ═════════════════════════════════════
     HERO PARALLAX
  ══════════════════════════════════════ */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const networkXRaw = useTransform(
    mouseX,
    [-1, 1],
    [-20, 20]
  );

  const networkYRaw = useTransform(
    mouseY,
    [-1, 1],
    [-14, 14]
  );

  const cardXRaw = useTransform(
    mouseX,
    [-1, 1],
    [7, -7]
  );

  const cardYRaw = useTransform(
    mouseY,
    [-1, 1],
    [5, -5]
  );

  const networkX = useSpring(networkXRaw, {
    stiffness: 65,
    damping: 24,
  });

  const networkY = useSpring(networkYRaw, {
    stiffness: 65,
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
      (event.clientX - bounds.left) /
      bounds.width;

    const y =
      (event.clientY - bounds.top) /
      bounds.height;

    mouseX.set(x * 2 - 1);
    mouseY.set(y * 2 - 1);
  }

  function handlePointerLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  /* ═════════════════════════════════════
     FORM
  ══════════════════════════════════════ */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess(false);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          company,
          category,
          message,
        }),
      });

      const payload = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok || !payload.success) {
        throw new Error(
          payload.error ||
            "Unable to send your message."
        );
      }

      setSuccess(true);

      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
      setCategory("GENERAL");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to send your message."
      );
    } finally {
      setIsSubmitting(false);
    }
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
          bg-[#EEE3DF]
        "
      >
        {/* Background atmosphere */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_72%_38%,rgba(217,161,152,0.38),transparent_30%),radial-gradient(circle_at_15%_75%,rgba(255,255,255,0.8),transparent_32%)]
          "
        />

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
            -right-[12%]
            top-[3%]
            h-[700px]
            w-[700px]
            rounded-full
            bg-[#D8A399]/30
            blur-[120px]
          "
        />

        {/* ======================================
            CONVERSATION NETWORK
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
            h-[75%]
            w-[56%]
            lg:block
          "
        >
          <svg
            viewBox="0 0 800 700"
            fill="none"
            className="absolute inset-0 h-full w-full"
          >
            {/* orbital circles */}

            <motion.circle
              cx="405"
              cy="350"
              r="255"
              stroke="rgba(80,55,48,0.08)"
              strokeWidth="1"
              strokeDasharray="5 13"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 55,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                transformOrigin: "405px 350px",
              }}
            />

            <motion.circle
              cx="405"
              cy="350"
              r="185"
              stroke="rgba(184,126,116,0.14)"
              strokeWidth="1"
              strokeDasharray="3 10"
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 42,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                transformOrigin: "405px 350px",
              }}
            />

            {/* Messages flowing toward Kuska */}

            {[
              "M120 180 C235 190 270 265 405 350",
              "M680 160 C580 210 535 280 405 350",
              "M120 535 C230 480 290 415 405 350",
              "M695 535 C570 475 525 415 405 350",
            ].map((path, index) => (
              <g key={path}>
                <path
                  d={path}
                  stroke="rgba(61,43,38,0.08)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />

                <motion.path
                  d={path}
                  stroke="#B87E74"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="3 14"
                  animate={{
                    strokeDashoffset: -70,
                  }}
                  transition={{
                    duration: 4 + index * 0.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </g>
            ))}

            {/* pulse */}

            <motion.circle
              cx="405"
              cy="350"
              r="95"
              stroke="#B87E74"
              strokeWidth="1"
              initial={{
                scale: 0.8,
                opacity: 0.35,
              }}
              animate={{
                scale: 1.5,
                opacity: 0,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              style={{
                transformOrigin: "405px 350px",
              }}
            />
          </svg>

          {/* Center */}

          <motion.div
            style={{
              x: cardX,
              y: cardY,
            }}
            animate={{
              scale: [1, 1.025, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="
              absolute
              left-1/2
              top-1/2
              flex
              h-[170px]
              w-[170px]
              -translate-x-1/2
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-white/60
              bg-white/35
              shadow-[0_25px_80px_rgba(89,55,47,0.12)]
              backdrop-blur-[25px]
            "
          >
            <div className="text-center">
              <Image
                src="/logo.png"
                alt="Kuska Motion"
                width={100}
                height={40}
                className="mx-auto h-auto w-[100px]"
              />

              <p className="mt-3 text-[8px] font-medium uppercase tracking-[0.2em] text-[#B87E74]">
                Say hello
              </p>
            </div>
          </motion.div>

          <FloatingMessage
            className="left-[3%] top-[14%]"
            delay={0}
            text="Collaborate"
          />

          <FloatingMessage
            className="right-[2%] top-[12%]"
            delay={0.7}
            text="Partnerships"
          />

          <FloatingMessage
            className="bottom-[10%] left-[2%]"
            delay={1.2}
            text="Run club"
          />

          <FloatingMessage
            className="bottom-[8%] right-[1%]"
            delay={1.7}
            text="Just saying hi"
          />
        </motion.div>

        {/* ======================================
            HERO COPY
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
          <div className="grid w-full gap-16 lg:grid-cols-[0.9fr_1.1fr]">
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
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[#B87E74]/20
                  bg-white/30
                  px-4
                  py-2
                  backdrop-blur-xl
                "
              >
                <MessageCircle
                  size={12}
                  className="text-[#B87E74]"
                />

                <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#B87E74]">
                  Get in touch
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
                }}
                className="
                  mt-7
                  max-w-[700px]
                  font-serif
                  text-[60px]
                  leading-[0.88]
                  tracking-[-0.05em]
                  sm:text-[78px]
                  lg:text-[94px]
                "
              >
                Good things
                <br />
                usually start
                <br />

                <span className="italic text-[#B87E74]">
                  with hello.
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
                }}
                className="mt-7 max-w-[490px] text-sm leading-7 text-[#76645E]"
              >
                A collaboration, a run club, a brand idea,
                a question or simply something you&apos;d
                like to share — we&apos;d love to hear it.
              </motion.p>

              <Link
                href="#contact-form"
                className="
                  group
                  mt-8
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
                  transition
                  hover:-translate-y-1
                "
              >
                Start a conversation

                <ArrowDown
                  size={14}
                  className="transition-transform group-hover:translate-y-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          REASON FOR CONTACT
      ═══════════════════════════════════════ */}

      <section className="px-5 py-24 sm:px-8 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-[330px_1fr] lg:gap-20">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#B87E74]">
                What&apos;s on your mind?
              </p>

              <h2 className="mt-5 font-serif text-[48px] leading-[0.95] tracking-[-0.04em] sm:text-[60px]">
                Choose where
                <br />
                we should{" "}

                <span className="italic text-[#B87E74]">
                  start.
                </span>
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {contactOptions.map((option) => {
                const Icon = option.icon;

                const active =
                  category === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() =>
                      setCategory(option.id)
                    }
                    className={`
                      group
                      min-h-[230px]
                      rounded-[24px]
                      border
                      p-7
                      text-left
                      transition-all
                      duration-300

                      ${
                        active
                          ? "border-[#28211F] bg-[#28211F] text-white"
                          : "border-[#28211F]/10 bg-white/30 hover:-translate-y-1 hover:bg-white"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={
                          active
                            ? "text-[10px] text-[#E7B6AB]"
                            : "text-[10px] text-[#B87E74]"
                        }
                      >
                        {option.number}
                      </span>

                      <Icon
                        size={18}
                        strokeWidth={1.5}
                        className={
                          active
                            ? "text-[#E7B6AB]"
                            : "text-[#B87E74]"
                        }
                      />
                    </div>

                    <h3 className="mt-12 font-serif text-[30px]">
                      {option.title}
                    </h3>

                    <p
                      className={
                        active
                          ? "mt-4 text-sm leading-6 text-white/50"
                          : "mt-4 text-sm leading-6 text-[#7A6C67]"
                      }
                    >
                      {option.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CONTACT FORM
      ═══════════════════════════════════════ */}

      <section
        id="contact-form"
        className="px-5 pb-24 sm:px-8 lg:px-16 lg:pb-32"
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1440px]
            overflow-hidden
            rounded-[32px]
            bg-[#28211F]
            lg:grid-cols-[0.8fr_1.2fr]
          "
        >
          {/* LEFT */}

          <div
            className="
              relative
              overflow-hidden
              border-b
              border-white/10
              p-8
              text-white
              sm:p-10
              lg:border-b-0
              lg:border-r
              lg:p-14
            "
          >
            <div
              className="
                pointer-events-none
                absolute
                -left-[40%]
                top-[20%]
                h-[500px]
                w-[500px]
                rounded-full
                bg-[#E7B6AB]/10
                blur-[100px]
              "
            />

            <div className="relative z-10">
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#E7B6AB]">
                Contact Kuska Motion
              </p>

              <h2 className="mt-6 font-serif text-[46px] leading-[0.95] tracking-[-0.04em] sm:text-[58px]">
                Tell us a little
                <br />

                <span className="italic text-[#E7B6AB]">
                  about your idea.
                </span>
              </h2>

              <p className="mt-7 max-w-[390px] text-sm leading-7 text-white/45">
                There&apos;s no need for a perfect pitch.
                Just tell us who you are and what you have
                in mind.
              </p>

              <div className="mt-14 space-y-4">
                <a
                  href="mailto:hello@kuskamotion.com"
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    rounded-[18px]
                    border
                    border-white/10
                    bg-white/[0.04]
                    p-4
                    transition
                    hover:bg-white/[0.08]
                  "
                >
                  <div className="flex items-center gap-3">
                    <Mail
                      size={16}
                      className="text-[#E7B6AB]"
                    />

                    <div>
                      <p className="text-[9px] uppercase tracking-[0.18em] text-white/30">
                        Email
                      </p>

                      <p className="mt-1 text-sm text-white/70">
                        hello@kuskamotion.com
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight
                    size={14}
                    className="text-white/30 transition group-hover:text-[#E7B6AB]"
                  />
                </a>

                <a
                  href="https://instagram.com/basically_kuska"
                  target="_blank"
                  rel="noreferrer"
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    rounded-[18px]
                    border
                    border-white/10
                    bg-white/[0.04]
                    p-4
                    transition
                    hover:bg-white/[0.08]
                  "
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src="/icons/InstagramLogo.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="h-4 w-4"
                    />

                    <div>
                      <p className="text-[9px] uppercase tracking-[0.18em] text-white/30">
                        Instagram
                      </p>

                      <p className="mt-1 text-sm text-white/70">
                        @basically_kuska
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight
                    size={14}
                    className="text-white/30 transition group-hover:text-[#E7B6AB]"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="bg-[#F4EEEB] p-8 sm:p-10 lg:p-14"
          >
            <div className="mb-9">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#B87E74]">
                You&apos;re contacting us about
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {contactOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() =>
                      setCategory(option.id)
                    }
                    className={`
                      rounded-full
                      border
                      px-4
                      py-2
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.13em]
                      transition-all

                      ${
                        category === option.id
                          ? "border-[#28211F] bg-[#28211F] text-white"
                          : "border-[#28211F]/10 bg-white/40 text-[#7A6C67] hover:bg-white"
                      }
                    `}
                  >
                    {option.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label="Your name"
                required
              >
                <input
                  required
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="Your name"
                  className={inputClass}
                />
              </Field>

              <Field
                label="Email"
                required
              >
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="mt-6">
              <Field label="Company or brand">
                <input
                  value={company}
                  onChange={(event) =>
                    setCompany(event.target.value)
                  }
                  placeholder="Optional"
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="mt-6">
              <Field
                label="Tell us about it"
                required
              >
                <textarea
                  required
                  rows={7}
                  value={message}
                  onChange={(event) =>
                    setMessage(event.target.value)
                  }
                  placeholder="What's on your mind?"
                  className={`${inputClass} min-h-[180px] resize-none py-4`}
                />
              </Field>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.p
                  initial={{
                    opacity: 0,
                    y: -5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  className="mt-5 text-sm text-red-600"
                >
                  {error}
                </motion.p>
              )}

{success && (
  <motion.div
    initial={{
      opacity: 0,
      y: 12,
      scale: 0.98,
    }}
    animate={{
      opacity: 1,
      y: 0,
      scale: 1,
    }}
    exit={{
      opacity: 0,
      y: -8,
    }}
    transition={{
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="
      mt-5
      overflow-hidden
      rounded-[22px]
      border
      border-[#82997E]/20
      bg-[#F4FBF2]
      p-5
      text-[#576953]
      shadow-[0_18px_50px_rgba(87,105,83,0.08)]
    "
  >
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <SuccessDog />

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <div
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              bg-[#82997E]
              text-white
            "
          >
            <Check size={13} />
          </div>

          <p className="text-sm font-medium text-[#4E614A]">
            Message delivered successfully
          </p>
        </div>

        <p className="mt-3 max-w-[460px] text-sm leading-6 text-[#6C7F67]">
          Your note is on its way to Kuska Motion. Our little
          good-boy messenger is very proud of you.
        </p>
      </div>
    </div>
  </motion.div>
)}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                group
                mt-8
                inline-flex
                h-14
                items-center
                justify-center
                gap-3
                rounded-full
                bg-[#D8A399]
                px-7
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-white
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#C98F84]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {isSubmitting
                ? "Sending..."
                : "Send message"}

              {!isSubmitting && (
                <Send
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              )}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

/* ═════════════════════════════════════
   INPUTS
═════════════════════════════════════ */

const inputClass = `
  w-full
  rounded-[14px]
  border
  border-[#28211F]/10
  bg-white/55
  px-4
  py-3.5
  text-[14px]
  text-[#28211F]
  outline-none
  transition-all
  placeholder:text-[#8D7C76]/50
  focus:border-[#D8A399]
  focus:bg-white
  focus:ring-4
  focus:ring-[#D8A399]/10
`;

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-medium uppercase tracking-[0.17em] text-[#796761]">
        {label}

        {required && (
          <span className="ml-1 text-[#B87E74]">
            *
          </span>
        )}
      </span>

      {children}
    </label>
  );
}

/* ═════════════════════════════════════
   HERO MESSAGE
═════════════════════════════════════ */

function FloatingMessage({
  text,
  className,
  delay,
}: {
  text: string;
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      animate={{
        y: [0, -9, 0],
      }}
      transition={{
        duration: 5.5,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`
        absolute
        rounded-full
        border
        border-white/60
        bg-white/40
        px-5
        py-3
        text-[10px]
        font-medium
        uppercase
        tracking-[0.16em]
        text-[#6D5851]
        shadow-[0_15px_45px_rgba(78,52,44,0.08)]
        backdrop-blur-[18px]
        ${className}
      `}
    >
      {text}
    </motion.div>
  );
}

function SuccessDog() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative shrink-0"
    >
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          relative
          flex
          h-[120px]
          w-[120px]
          items-center
          justify-center
          rounded-[24px]
          bg-white
          shadow-[0_16px_40px_rgba(90,70,55,0.08)]
        "
      >
        <svg
          width="96"
          height="96"
          viewBox="0 0 96 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          {/* tail */}
          <motion.g
            animate={{ rotate: [10, -14, 10] }}
            transition={{
              duration: 0.45,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "67px 54px" }}
          >
            <path
              d="M66 55C75 48 79 41 76 34"
              stroke="#9B6C52"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </motion.g>

          {/* body */}
          <ellipse
            cx="49"
            cy="57"
            rx="19"
            ry="16"
            fill="#C58F85"
          />

          {/* chest */}
          <ellipse
            cx="47"
            cy="61"
            rx="10"
            ry="9"
            fill="#F7E9E3"
          />

          {/* legs */}
          <rect
            x="36"
            y="67"
            width="6"
            height="14"
            rx="3"
            fill="#9B6C52"
          />
          <rect
            x="48"
            y="67"
            width="6"
            height="14"
            rx="3"
            fill="#9B6C52"
          />
          <rect
            x="58"
            y="66"
            width="6"
            height="13"
            rx="3"
            fill="#9B6C52"
          />

          {/* head */}
          <circle
            cx="39"
            cy="38"
            r="18"
            fill="#C58F85"
          />

          {/* ears */}
          <motion.ellipse
            cx="27"
            cy="32"
            rx="6"
            ry="11"
            fill="#9B6C52"
            animate={{ rotate: [-4, 4, -4] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "27px 32px" }}
          />
          <motion.ellipse
            cx="50"
            cy="31"
            rx="6"
            ry="11"
            fill="#9B6C52"
            animate={{ rotate: [4, -4, 4] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "50px 31px" }}
          />

          {/* face */}
          <circle
            cx="34"
            cy="37"
            r="2.2"
            fill="#2D231F"
          />
          <circle
            cx="44"
            cy="37"
            r="2.2"
            fill="#2D231F"
          />
          <ellipse
            cx="39"
            cy="44"
            rx="4.5"
            ry="3.5"
            fill="#F4D9D1"
          />
          <circle
            cx="39"
            cy="42"
            r="2.2"
            fill="#2D231F"
          />
          <path
            d="M36 47C37.5 49 40.5 49 42 47"
            stroke="#2D231F"
            strokeWidth="1.7"
            strokeLinecap="round"
          />

          {/* collar */}
          <rect
            x="26"
            y="52"
            width="26"
            height="5"
            rx="2.5"
            fill="#82997E"
          />
          <circle
            cx="39"
            cy="58"
            r="3.2"
            fill="#E7B6AB"
          />
        </svg>

        {/* floating success bubble */}
        <motion.div
          animate={{
            y: [0, -5, 0],
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            right-[-6px]
            top-[-8px]
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-[#82997E]
            text-white
            shadow-[0_10px_30px_rgba(87,105,83,0.18)]
          "
        >
          <Check size={15} />
        </motion.div>

        {/* tiny hearts */}
        <motion.span
          animate={{
            y: [0, -10, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-[10px]
            top-[10px]
            text-[14px]
          "
        >
          ✦
        </motion.span>

        <motion.span
          animate={{
            y: [0, -8, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2.1,
            delay: 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            right-[14px]
            bottom-[12px]
            text-[13px]
          "
        >
          ♡
        </motion.span>
      </motion.div>
    </motion.div>
  );
}