import Image from "next/image";
import Link from "next/link";

export type FoodCardProps = {
  title: string;
  image: string;
  category: string;
  protein: number;
  calories: number;
  href?: string;
};

export function FoodCard({
  title,
  image,
  category,
  protein,
  calories,
  href = "#",
}: FoodCardProps) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-[28px] border border-[#E8DDD8] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(89,63,55,0.08)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F4ECE8]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="p-5">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#C58F85]">
          {category}
        </span>

        <h3 className="mt-3 min-h-[52px] font-serif text-[22px] leading-[1.15] text-[#2A2422]">
          {title}
        </h3>

        <div className="mt-5 flex items-center gap-4 border-t border-[#EEE5E1] pt-4 text-xs text-[#8B7D78]">
          <span>
            <strong className="font-medium text-[#5E504B]">
              {protein}g
            </strong>{" "}
            protein
          </span>

          <span className="h-3 w-px bg-[#DDD0CA]" />

          <span>
            <strong className="font-medium text-[#5E504B]">
              {calories}
            </strong>{" "}
            cal
          </span>
        </div>
      </div>
    </Link>
  );
}