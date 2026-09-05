"use client";

import Link from "next/link";
import {
  Apple,
  Dumbbell,
  SportShoe,
  Sparkles,
} from "lucide-react";

type HeroLink = {
  label: string;
  description: string;
  href: string;
  icon: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
    className?: string;
  }>;
};

const HERO_LINKS: HeroLink[] = [
  {
    label: "Nutrition",
    description: "Balanced meals, recipes & everyday food.",
    href: "/nutrition",
    icon: Apple,
  },
  {
    label: "Workout",
    description: "Training, strength & movement.",
    href: "/workouts",
    icon: Dumbbell,
  },
  {
    label: "Lifestyle",
    description: "Routines, habits & real life.",
    href: "/lifestyle",
    icon: Sparkles,
  },
  {
    label: "Running",
    description: "Places, experiences & inspiration.",
    href: "/running",
    icon: SportShoe,
  },
];

export function GlassNavigation() {
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/20 bg-white/[0.08] shadow-[0_30px_80px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.13] via-white/[0.03] to-[#D8A399]/[0.08]" />

      <div className="relative grid grid-cols-2">
        {HERO_LINKS.map((item, index) => {
          const Icon = item.icon;
          const isLeft = index % 2 === 0;
          const isTop = index < 2;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`
                group
                relative
                flex
                min-h-[210px]
                flex-col
                justify-between
                p-7
                transition-all
                duration-300
                sm:min-h-[230px]
                sm:p-8
                ${isLeft ? "border-r border-white/15" : ""}
                ${isTop ? "border-b border-white/15" : ""}
                hover:bg-white/[0.1]
              `}
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.08] text-[#E7B6AB] transition duration-300 group-hover:border-[#E7B6AB]/40 group-hover:bg-[#E7B6AB]/10">
                  <Icon
                    size={20}
                    strokeWidth={1.5}
                  />
                </div>

                <span className="translate-x-1 text-[18px] text-white/35 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  ↗
                </span>
              </div>

              <div>
                <p className="font-serif text-[28px] leading-none text-white sm:text-[32px]">
                  {item.label}
                </p>

                <p className="mt-3 max-w-[180px] text-sm leading-5 text-white/55">
                  {item.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}