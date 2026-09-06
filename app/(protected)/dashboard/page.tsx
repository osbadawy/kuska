import { headers } from "next/headers";
import {
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import { DashboardTabs } from "@/components/dashboard/DashboardTabs";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userName =
    session?.user.name?.trim() || "Kuska";

  const firstName =
    userName.split(" ")[0] || "Kuska";

  const initial =
    firstName.charAt(0).toUpperCase();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F7F2EF]">
      {/* ═════════════════════════════════════
          BACKGROUND ATMOSPHERE
      ══════════════════════════════════════ */}

      <div
        className="
          pointer-events-none
          absolute
          -right-[15%]
          top-[-140px]
          h-[650px]
          w-[650px]
          rounded-full
          bg-[#E7B6AB]/25
          blur-[130px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-[10%]
          top-[420px]
          h-[500px]
          w-[500px]
          rounded-full
          bg-white/70
          blur-[110px]
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1480px]
          px-5
          pb-28
          pt-28
          sm:px-8
          lg:px-12
          lg:pt-32
        "
      >
        {/* ═════════════════════════════════════
            HEADER
        ══════════════════════════════════════ */}

        <section
          className="
            relative
            overflow-hidden
            rounded-[34px]
            border
            border-white/70
            bg-[#EDE3DF]
            shadow-[0_30px_100px_rgba(71,49,42,0.07)]
          "
        >
          {/* decorative background */}

          <div
            className="
              pointer-events-none
              absolute
              -right-[140px]
              -top-[220px]
              h-[550px]
              w-[550px]
              rounded-full
              bg-[#D8A399]/25
              blur-[100px]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              bottom-[-200px]
              left-[25%]
              h-[450px]
              w-[450px]
              rounded-full
              bg-white/70
              blur-[110px]
            "
          />

          <div
            className="
              relative
              z-10
              grid
              gap-12
              px-7
              py-9
              sm:px-10
              sm:py-11
              lg:grid-cols-[1fr_360px]
              lg:items-end
              lg:px-12
              lg:py-12
            "
          >
            {/* LEFT */}

            <div>
              <div className="flex items-center gap-2">
                <Sparkles
                  size={13}
                  strokeWidth={1.6}
                  className="text-[#B87E74]"
                />

                <p
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.24em]
                    text-[#B87E74]
                  "
                >
                  Kuska Motion Studio
                </p>
              </div>

              <h1
                className="
                  mt-5
                  max-w-[850px]
                  font-serif
                  text-[48px]
                  leading-[0.94]
                  tracking-[-0.045em]
                  text-[#28211F]
                  sm:text-[62px]
                  lg:text-[70px]
                "
              >
                Welcome back,
                <br />

                <span className="italic text-[#B87E74]">
                  {firstName}.
                </span>
              </h1>

              <p
                className="
                  mt-6
                  max-w-[540px]
                  text-sm
                  leading-7
                  text-[#74625C]
                "
              >
                Create and manage the content that lives
                across Kuska Motion — from recipes to training
                sessions and everything still to come.
              </p>
            </div>

            {/* USER CARD */}

            <div
              className="
                rounded-[26px]
                border
                border-white/60
                bg-white/45
                p-5
                shadow-[0_15px_50px_rgba(76,53,45,0.06)]
                backdrop-blur-xl
              "
            >
              <div className="flex items-center gap-4">
                <div
                  className="
                    flex
                    h-14
                    w-14
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#28211F]
                    font-serif
                    text-[22px]
                    text-[#E7B6AB]
                  "
                >
                  {initial}
                </div>

                <div className="min-w-0">
                  <p
                    className="
                      truncate
                      font-serif
                      text-[22px]
                      tracking-[-0.02em]
                      text-[#28211F]
                    "
                  >
                    {userName}
                  </p>

                  <p
                    className="
                      mt-1
                      truncate
                      text-[11px]
                      text-[#8E7A73]
                    "
                  >
                    {session?.user.email}
                  </p>
                </div>
              </div>

              <div
                className="
                  mt-5
                  flex
                  items-center
                  justify-between
                  border-t
                  border-[#28211F]/10
                  pt-4
                "
              >
                <div>
                  <p
                    className="
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-[#A38A82]
                    "
                  >
                    Workspace
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      font-medium
                      text-[#5F504B]
                    "
                  >
                    Content management
                  </p>
                </div>

                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-[#E7B6AB]/30
                    text-[#9E675E]
                  "
                >
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════
            CONTENT AREA
        ══════════════════════════════════════ */}

        <section className="mt-8">
          <DashboardTabs />
        </section>
      </div>
    </main>
  );
}