import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FoodCard, type FoodCardProps } from "@/components/UI/FoodCard";

const recipes: FoodCardProps[] = [
  {
    title: "Honey Garlic Salmon Bowl",
    image: "/food/food1.jpg",
    category: "High Protein",
    protein: 38,
    calories: 520,
    href: "/recipes/honey-garlic-salmon-bowl",
  },
  {
    title: "Protein Pancakes with Berries",
    image: "/food/food2.jpg",
    category: "Breakfast",
    protein: 28,
    calories: 420,
    href: "/recipes/protein-pancakes",
  },
  {
    title: "Creamy Chicken Pesto Pasta",
    image: "/food/food3.jpg",
    category: "Easy & Balanced",
    protein: 42,
    calories: 610,
    href: "/recipes/chicken-pesto-pasta",
  },
  {
    title: "Chocolate Protein Bites",
    image: "/food/food4.jpg",
    category: "Healthy Sweet",
    protein: 19,
    calories: 180,
    href: "/recipes/chocolate-protein-bites",
  },
];

export function FoodSection() {
  return (
    <section className="bg-[#FAF7F5] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-16">
          {/* Intro */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#C58F85]">
                Nutrition
              </p>

              <h2 className="mt-4 font-serif text-[44px] leading-[0.98] tracking-[-0.03em] text-[#28211F] sm:text-[52px]">
                Fuel your body.
                <br />
                <span className="italic text-[#B87E74]">
                  Love your food.
                </span>
              </h2>

              <p className="mt-6 max-w-[260px] text-sm leading-6 text-[#7A6C67]">
                Simple, high-protein recipes made for real life.
                Balanced food without unnecessary restriction.
              </p>
            </div>

            <Link
              href="/recipes"
              className="group mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-[#D8A399] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#C98F84]"
            >
              Browse recipes

              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Recipe cards */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {recipes.map((recipe) => (
              <FoodCard
                key={recipe.title}
                {...recipe}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}