import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProgramBentoCard } from "./ProgramBentoCard";

export function ProgramsSection() {
  return (
    <section
      aria-labelledby="programs-heading"
      className="bg-[#FBF8F6] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#C79288]">
              Ways we can work together
            </p>

            <h2
              id="programs-heading"
              className="mt-3 font-serif text-[44px] leading-none tracking-[-0.03em] text-[#2B2320] sm:text-[54px]"
            >
              Programs
            </h2>
          </div>

          <Link
            href="/programs"
            className="hidden items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#655955] transition hover:text-[#C79288] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C79288] sm:flex"
          >
            View all programs
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid auto-rows-[220px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[240px]">
          <ProgramBentoCard
            title="Gym Programs"
            description="Structured training to build strength, confidence and real progress."
            details="Progressive plans with clear sessions, thoughtful pacing and enough flexibility to fit around real life."
            meta="Build strength"
            image="/programs/home.jpg"
            href="/workout"
            className="md:col-span-2 md:row-span-2"
          />

          <ProgramBentoCard
            title="Home Workouts"
            description="Effective workouts you can do anywhere."
            details="Short, focused sessions designed for the days when your living room is the gym."
            meta="Train anywhere"
            image="/programs/gym.jpg"
            href="/workout"
            className="lg:col-span-1"
          />

          <ProgramBentoCard
            title="Guides"
            description="Simple guides for training, nutrition and mindset."
            details="Practical resources to help you make confident choices between workouts, meals and rest."
            meta="Learn more"
            image="/programs/guides.png"
            href="/guides"
            className="lg:col-span-1"
          />

          <ProgramBentoCard
            title="1:1 Coaching"
            description="Personalised coaching built around your goals, lifestyle and pace."
            details="A personal plan, regular check-ins and expert adjustments as your goals and schedule evolve."
            meta="Personal support"
            image="/programs/coaching.jpg"
            href="/coaching"
            className="md:col-span-2 lg:col-span-2"
          />
        </div>

        <Link
          href="/programs"
          className="mt-8 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#655955] transition hover:text-[#C79288] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C79288] sm:hidden"
        >
          View all programs
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
