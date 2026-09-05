import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type VlogCardProps = {
  title: string;
  category: string;
  date: string;
  image: string;
  href: string;
};

export function VlogCard({
  title,
  category,
  date,
  image,
  href,
}: VlogCardProps) {
  return (
    <article className="group grid grid-cols-[130px_1fr] gap-5 sm:grid-cols-[150px_1fr]">
      <Link
        href={href}
        className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-[#F3ECE8]"
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="160px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </Link>

      <div className="flex flex-col justify-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#C79288]">
          {category}
        </p>

        <Link href={href}>
          <h3 className="mt-3 font-serif text-[23px] leading-[1.15] tracking-[-0.02em] text-[#2C2421] transition-colors duration-300 group-hover:text-[#B9796E]">
            {title}
          </h3>
        </Link>

        <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.13em] text-[#A0918B]">
          {date}
        </p>

        <Link
          href={href}
          className="mt-5 inline-flex w-fit items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#4A403C] transition-colors hover:text-[#B9796E]"
        >
          Read more
          <ArrowRight size={13} strokeWidth={1.6} />
        </Link>
      </div>
    </article>
  );
}