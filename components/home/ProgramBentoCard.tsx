"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";

type ProgramBentoCardProps = {
  title: string;
  description: string;
  image: string;
  href: string;
  details?: string;
  meta?: string;
  className?: string;
  imageClassName?: string;
};

export function ProgramBentoCard({
  title,
  description,
  image,
  href,
  details,
  meta,
  className = "",
  imageClassName = "",
}: ProgramBentoCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article
      className={`group relative overflow-hidden rounded-[30px] bg-[#F7F1EE] ${className}`}
      data-open={isOpen}
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
        className={`object-cover transition duration-700 ease-out group-hover:scale-[1.03] ${
          isOpen ? "scale-[1.03]" : ""
        } ${imageClassName}`}
      />

      {/* The overlay becomes slightly deeper when a card is open, keeping the details legible without changing the image treatment. */}
      <div
        className={`absolute inset-0 transition duration-500 ${
          isOpen
            ? "bg-gradient-to-t from-black/85 via-black/35 to-black/5"
            : "bg-gradient-to-t from-black/65 via-black/10 to-transparent"
        }`}
        aria-hidden="true"
      />

      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 sm:p-6">
        {meta ? (
          <span className="rounded-full border border-white/20 bg-black/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white/75 backdrop-blur-md">
            {meta}
          </span>
        ) : (
          <span />
        )}

        {details && (
          <button
            type="button"
            aria-expanded={isOpen}
            aria-label={`${isOpen ? "Hide" : "Show"} details for ${title}`}
            onClick={() => setIsOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition duration-300 hover:bg-white hover:text-[#2B2320] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/20"
          >
            <ChevronDown
              size={17}
              strokeWidth={1.6}
              className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-serif text-[28px] leading-none text-white sm:text-[32px]">
              {title}
            </h3>

            <p className="mt-3 max-w-[300px] text-sm leading-6 text-white/70">
              {description}
            </p>
          </div>

          <Link
            href={href}
            aria-label={`Explore ${title}`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition duration-300 hover:bg-white hover:text-[#2B2320] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/20"
          >
            <ArrowUpRight
              size={18}
              strokeWidth={1.6}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        <div
          className={`grid transition-[grid-template-rows,opacity,margin] duration-400 ease-out ${
            isOpen
              ? "mt-5 grid-rows-[1fr] opacity-100"
              : "mt-0 grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="border-t border-white/20 pt-4">
              <p className="max-w-[390px] text-sm leading-6 text-white/80">
                {details}
              </p>

              <Link
                href={href}
                className="mt-4 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white transition hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Explore program
                <ArrowRight size={13} strokeWidth={1.6} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}