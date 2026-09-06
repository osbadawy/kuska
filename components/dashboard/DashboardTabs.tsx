"use client";

import { useState } from "react";
import {
  Dumbbell,
  Footprints,
  Salad,
} from "lucide-react";

import { NutritionManager } from "@/components/dashboard/NutritionManager";
import { WorkoutManager } from "@/components/dashboard/WorkoutManager";
import { RunningManager } from "@/components/dashboard/RunningManager";

type DashboardTab =
  | "nutrition"
  | "workouts"
  | "running";

const tabs = [
  {
    id: "nutrition" as const,
    label: "Nutrition",
    description:
      "Recipes, meals & nutrition",
    icon: Salad,
  },
  {
    id: "workouts" as const,
    label: "Workouts",
    description:
      "Training sessions & exercises",
    icon: Dumbbell,
  },
  {
    id: "running" as const,
    label: "Running",
    description:
      "Running routes & activities",
    icon: Footprints,
  },
];

export function DashboardTabs() {
  const [activeTab, setActiveTab] =
    useState<DashboardTab>("nutrition");

  return (
    <div>
      {/* ═════════════════════════════════════
          NAVIGATION CARD
      ══════════════════════════════════════ */}

      <div
        className="
          rounded-[28px]
          border
          border-[#28211F]/10
          bg-white/70
          p-2.5
          shadow-[0_18px_60px_rgba(72,50,43,0.05)]
          backdrop-blur-xl
        "
      >
        <div
          className="
            grid
            gap-2
            md:grid-cols-3
          "
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive =
              activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() =>
                  setActiveTab(tab.id)
                }
                className={`
                  group
                  relative
                  overflow-hidden
                  rounded-[22px]
                  px-5
                  py-5
                  text-left
                  transition-all
                  duration-300

                  ${
                    isActive
                      ? `
                        bg-[#28211F]
                        text-white
                        shadow-[0_15px_40px_rgba(40,33,31,0.14)]
                      `
                      : `
                        bg-transparent
                        text-[#28211F]
                        hover:bg-[#F7F2EF]
                      `
                  }
                `}
              >
                {isActive && (
                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-14
                      -top-20
                      h-[180px]
                      w-[180px]
                      rounded-full
                      bg-[#E7B6AB]/15
                      blur-[45px]
                    "
                  />
                )}

                <div
                  className="
                    relative
                    z-10
                    flex
                    items-center
                    gap-4
                  "
                >
                  <div
                    className={`
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-[16px]
                      transition-all
                      duration-300

                      ${
                        isActive
                          ? `
                            bg-[#E7B6AB]
                            text-[#28211F]
                          `
                          : `
                            bg-[#F1E8E4]
                            text-[#B87E74]
                            group-hover:bg-[#EADBD5]
                          `
                      }
                    `}
                  >
                    <Icon
                      size={18}
                      strokeWidth={1.6}
                    />
                  </div>

                  <div>
                    <p
                      className={`
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.17em]

                        ${
                          isActive
                            ? "text-[#E7B6AB]"
                            : "text-[#B87E74]"
                        }
                      `}
                    >
                      Manage
                    </p>

                    <h2
                      className="
                        mt-1
                        font-serif
                        text-[27px]
                        leading-none
                        tracking-[-0.025em]
                      "
                    >
                      {tab.label}
                    </h2>

                    <p
                      className={`
                        mt-2
                        text-[11px]

                        ${
                          isActive
                            ? "text-white/45"
                            : "text-[#94827B]"
                        }
                      `}
                    >
                      {tab.description}
                    </p>
                  </div>
                </div>

                {/* ACTIVE INDICATOR */}

                <div
                  className={`
                    absolute
                    bottom-0
                    left-6
                    right-6
                    h-[2px]
                    rounded-full
                    transition-all
                    duration-300

                    ${
                      isActive
                        ? "bg-[#E7B6AB]"
                        : "bg-transparent"
                    }
                  `}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* ═════════════════════════════════════
          ACTIVE WORKSPACE
      ══════════════════════════════════════ */}

      <div
        className="
          mt-7
          rounded-[32px]
          border
          border-[#28211F]/10
          bg-[#FCF9F7]
          px-4
          shadow-[0_25px_80px_rgba(72,50,43,0.045)]
          sm:px-6
          lg:px-8
        "
      >
        {activeTab ===
          "nutrition" && (
          <NutritionManager />
        )}

        {activeTab ===
          "workouts" && (
          <WorkoutManager />
        )}

        {activeTab === "running" && (
          <RunningManager />
        )}
      </div>
    </div>
  );
}