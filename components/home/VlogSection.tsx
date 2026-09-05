import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { VlogCard } from "@/components/UI/VlogCard";

const posts = [
  {
    title: "How to stay consistent even when you don’t feel like it",
    category: "Mindset",
    date: "May 12, 2026",
    image: "/vlog/log2.jpg",
    href: "/vlog/staying-consistent",
  },
  {
    title: "My full body workout for strength & confidence",
    category: "Fitness",
    date: "Apr 28, 2026",
    image: "/vlog/log1.jpg",
    href: "/vlog/full-body-workout",
  },
  {
    title: "High protein meals that keep me full all day",
    category: "Nutrition",
    date: "Apr 15, 2026",
    image: "/vlog/log3.jpg",
    href: "/vlog/high-protein-meals",
  },
];

export function VlogSection() {
  return (
    <section className="bg-[#FFFCFA] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1440px]">
        {/* Heading */}
        <div className="mb-12 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#C79288]">
              Latest Updates
            </p>

            <h2 className="mt-3 font-serif text-[42px] leading-none tracking-[-0.03em] text-[#2B2320] sm:text-[50px]">
              Stories, thoughts
              <span className="italic text-[#B9796E]"> & movement.</span>
            </h2>
          </div>

          <Link
            href="/vlog"
            className="hidden items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#615551] transition hover:text-[#B9796E] sm:flex"
          >
            View all posts
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Posts */}
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
          {posts.map((post) => (
            <VlogCard
              key={post.title}
              {...post}
            />
          ))}
        </div>

        {/* Mobile CTA */}
        <Link
          href="/vlog"
          className="mt-10 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#615551] sm:hidden"
        >
          View all posts
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}