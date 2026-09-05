"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  const isActive = active === item;

  return (
    <div
      onMouseEnter={() => setActive(item)}
      className="relative"
    >
      <motion.p
        transition={{
          duration: 0.2,
        }}
        className={`
          cursor-pointer
          whitespace-nowrap
          text-[14px]
          font-medium
          tracking-[0.04em]
          transition-colors
          duration-200
          ${
            isActive
              ? "text-white"
              : "text-white/80 hover:text-white"
          }
        `}
      >
        {item}
      </motion.p>

      {active !== null && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.94,
            y: 8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={transition}
        >
          {isActive && (
            <div
              className="
                absolute
                left-1/2
                top-[calc(100%+0.55rem)]
                -translate-x-1/2
                pt-3
              "
            >
              <motion.div
                layoutId="active"
                transition={transition}
                className="
                  relative
                  overflow-hidden
                  rounded-[22px]
                  border
                  border-white/[0.16]
                  bg-[#211D1B]/80
                  shadow-[0_24px_80px_rgba(0,0,0,0.35)]
                  backdrop-blur-[32px]
                  backdrop-saturate-[180%]
                "
              >
                {/* Frosted glass texture */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-br
                    from-white/[0.12]
                    via-white/[0.035]
                    to-black/[0.08]
                  "
                />

                {/* Top reflection */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-x-8
                    top-0
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-white/40
                    to-transparent
                  "
                />

                <motion.div
                  layout
                  className="
                    relative
                    z-10
                    h-full
                    w-max
                    p-5
                  "
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="
        relative
        flex
        w-full
        items-center

        rounded-full

        border
        border-white/[0.16]

        bg-[#292321]/25

        px-5
        py-3

        shadow-[0_12px_40px_rgba(0,0,0,0.22)]

        backdrop-blur-[22px]
        backdrop-saturate-[170%]

        before:pointer-events-none
        before:absolute
        before:inset-0
        before:rounded-full
        before:bg-gradient-to-b
        before:from-white/[0.16]
        before:via-white/[0.025]
        before:to-transparent
      "
    >
      {/* Glass top rim */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-7
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-white/50
          to-transparent
        "
      />

      {/* Logo */}
      <Link
        href="/"
        className="
          relative
          z-10
          flex
          shrink-0
          items-center
          transition-opacity
          duration-300
          hover:opacity-80
        "
      >
        <Image
          src="/logo.png"
          alt="Kuska Motion"
          width={120}
          height={40}
          priority
          className="
            h-[34px]
            w-auto
            object-contain
          "
        />
      </Link>

      {/* Centered navigation */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          z-10
          flex
          -translate-x-1/2
          -translate-y-1/2
          items-center
          gap-10
        "
      >
        {children}
      </div>
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <a
      href={href}
      className="
        group
        flex
        w-[310px]
        items-center
        gap-4
        rounded-xl
        p-3
        transition-all
        duration-300
        hover:bg-white/[0.08]
      "
    >
      <img
        src={src}
        width={115}
        height={68}
        alt={title}
        className="
          h-[68px]
          w-[115px]
          shrink-0
          rounded-lg
          object-cover
          ring-1
          ring-white/10
          shadow-[0_8px_24px_rgba(0,0,0,0.3)]
        "
      />

      <div>
        <h4
          className="
            mb-1
            text-[14px]
            font-semibold
            text-white
          "
        >
          {title}
        </h4>

        <p
          className="
            max-w-[145px]
            text-[12px]
            leading-[1.55]
            text-white/60
          "
        >
          {description}
        </p>
      </div>
    </a>
  );
};

export const HoveredLink = ({
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a
      {...rest}
      className="
        rounded-lg
        px-3
        py-2.5
        text-[14px]
        text-white/70
        transition-all
        duration-200
        hover:translate-x-1
        hover:bg-white/[0.06]
        hover:text-white
      "
    >
      {children}
    </a>
  );
};