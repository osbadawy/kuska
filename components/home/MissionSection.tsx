"use client";

import {
  Apple,
  Dumbbell,
  Plane,
  Sparkles,
  Sun,
} from "lucide-react";

type MissionItem = {
  title: string;
  description: string;
  icon: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
    className?: string;
  }>;
};

const MISSION_ITEMS: MissionItem[] = [
  {
    title: "Training",
    description: "Effective workouts for strength & confidence.",
    icon: Dumbbell,
  },
  {
    title: "Nutrition",
    description: "Healthy, high-protein recipes & balanced meals.",
    icon: Apple,
  },
  {
    title: "Mindset",
    description: "Self-growth, discipline & daily habits.",
    icon: Sparkles,
  },
  {
    title: "Lifestyle",
    description: "Routines, habits & real-life balance.",
    icon: Sun,
  },
  {
    title: "Travel",
    description: "Discovering new places & cultures.",
    icon: Plane,
  },
];

export function MissionSection() {
  return (
    <section className="bg-[#FBF8F6] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1440px]">
        {/* Section title */}
        <div className="mb-12 flex items-center justify-center gap-4">
          <div className="h-px w-10 bg-[#D8B2AA]" />

          <p className="text-center text-[11px] font-medium uppercase tracking-[0.24em] text-[#C79288]">
            Focusing on balance in every area of life
          </p>

          <div className="h-px w-10 bg-[#D8B2AA]" />
        </div>

        {/* Mission pillars */}
        <div className="grid grid-cols-1 divide-y divide-[#EAE0DC] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-5 lg:divide-x lg:divide-[#EAE0DC]">
          {MISSION_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex flex-col items-center px-6 py-8 text-center"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#F4E9E5] text-[#C79288]">
                  <Icon
                    size={22}
                    strokeWidth={1.5}
                  />
                </div>

                <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#342C29]">
                  {item.title}
                </h3>

                <p className="mt-3 max-w-[180px] text-sm leading-6 text-[#81736E]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}