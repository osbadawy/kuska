import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  Dumbbell,
  Flame,
  Target,
} from "lucide-react";

export type WorkoutCardProps = {
  title: string;
  description?: string | null;

  image: string;
  category: string;
  difficulty:
    | "BEGINNER"
    | "INTERMEDIATE"
    | "ADVANCED";

  durationMinutes?: number | null;
  caloriesBurned?: number | null;

  exerciseCount: number;

  targetAreas?: string[];

  href: string;

  featured?: boolean;
};

export function WorkoutCard({
  title,
  description,
  image,
  category,
  difficulty,
  durationMinutes,
  caloriesBurned,
  exerciseCount,
  targetAreas = [],
  href,
  featured = false,
}: WorkoutCardProps) {
  return (
    <Link
      href={href}
      className="
        group
        relative
        grid
        overflow-hidden
        rounded-[28px]
        border
        border-[#E5DAD5]
        bg-white
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-[#D8B3A9]
        hover:shadow-[0_24px_70px_rgba(77,52,45,0.09)]
        md:grid-cols-[300px_1fr]
        lg:grid-cols-[340px_1fr]
      "
    >
      {/* ═════════════════════════════════════
          IMAGE
      ══════════════════════════════════════ */}

      <div
        className="
          relative
          min-h-[240px]
          overflow-hidden
          bg-[#EDE3DF]
          md:min-h-[300px]
        "
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="
            (max-width: 768px) 100vw,
            340px
          "
          className="
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-[1.04]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/25
            via-transparent
            to-transparent
          "
        />

        {/* CATEGORY */}

        <div
          className="
            absolute
            left-5
            top-5
            rounded-full
            border
            border-white/30
            bg-black/20
            px-3.5
            py-2
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.17em]
            text-white
            backdrop-blur-xl
          "
        >
          {category}
        </div>

        {/* FEATURED */}

        {featured && (
          <div
            className="
              absolute
              bottom-5
              left-5
              rounded-full
              bg-[#E7B6AB]
              px-3.5
              py-2
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-[#28211F]
            "
          >
            Kuska&apos;s pick
          </div>
        )}
      </div>

      {/* ═════════════════════════════════════
          CONTENT
      ══════════════════════════════════════ */}

      <div
        className="
          relative
          flex
          min-w-0
          flex-col
          justify-between
          p-6
          sm:p-7
          lg:p-9
        "
      >
        {/* ARROW */}

        <div
          className="
            absolute
            right-6
            top-6
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-[#28211F]/10
            bg-[#FAF7F5]
            text-[#28211F]
            transition-all
            duration-300
            group-hover:-translate-y-1
            group-hover:translate-x-1
            group-hover:bg-[#28211F]
            group-hover:text-white
          "
        >
          <ArrowUpRight
            size={15}
            strokeWidth={1.7}
          />
        </div>

        {/* TOP */}

        <div className="pr-14">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#B87E74]
              "
            >
              {prettyDifficulty(
                difficulty
              )}
            </span>

            <span
              className="
                h-1
                w-1
                rounded-full
                bg-[#CDBDB7]
              "
            />

            <span
              className="
                text-[9px]
                font-medium
                uppercase
                tracking-[0.15em]
                text-[#9A8881]
              "
            >
              Workout
            </span>
          </div>

          <h3
            className="
              mt-4
              max-w-[650px]
              font-serif
              text-[31px]
              leading-[1]
              tracking-[-0.035em]
              text-[#28211F]
              sm:text-[35px]
            "
          >
            {title}
          </h3>

          {description && (
            <p
              className="
                mt-5
                max-w-[650px]
                text-sm
                leading-7
                text-[#7A6C67]
                [display:-webkit-box]
                overflow-hidden
                [-webkit-box-orient:vertical]
                [-webkit-line-clamp:2]
              "
            >
              {description}
            </p>
          )}
        </div>

        {/* BOTTOM */}

        <div className="mt-8">
          {/* STATS */}

          <div
            className="
              flex
              flex-wrap
              gap-x-6
              gap-y-4
              border-t
              border-[#28211F]/10
              pt-5
            "
          >
            {durationMinutes !== null &&
              durationMinutes !== undefined && (
                <Stat
                  icon={Clock3}
                  value={`${durationMinutes} min`}
                  label="Duration"
                />
              )}

            <Stat
              icon={Dumbbell}
              value={`${exerciseCount}`}
              label={
                exerciseCount === 1
                  ? "Exercise"
                  : "Exercises"
              }
            />

            {caloriesBurned !== null &&
              caloriesBurned !== undefined && (
                <Stat
                  icon={Flame}
                  value={`${caloriesBurned}`}
                  label="Approx. cal"
                />
              )}
          </div>

          {/* TARGET AREAS */}

          {targetAreas.length > 0 && (
            <div
              className="
                mt-5
                flex
                flex-wrap
                items-center
                gap-2
              "
            >
              <Target
                size={13}
                strokeWidth={1.5}
                className="mr-1 text-[#B87E74]"
              />

              {targetAreas
                .slice(0, 4)
                .map((area) => (
                  <span
                    key={area}
                    className="
                      rounded-full
                      bg-[#F3ECE8]
                      px-3
                      py-1.5
                      text-[9px]
                      font-medium
                      text-[#78645E]
                    "
                  >
                    {area}
                  </span>
                ))}

              {targetAreas.length > 4 && (
                <span
                  className="
                    px-1
                    text-[9px]
                    text-[#9D8A83]
                  "
                >
                  +
                  {targetAreas.length -
                    4}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

/* ═════════════════════════════════════
   STAT
═════════════════════════════════════ */

function Stat({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Clock3;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-full
          bg-[#F2E9E5]
          text-[#B87E74]
        "
      >
        <Icon
          size={13}
          strokeWidth={1.6}
        />
      </div>

      <div>
        <p
          className="
            text-[11px]
            font-semibold
            leading-none
            text-[#4D403C]
          "
        >
          {value}
        </p>

        <p
          className="
            mt-1
            text-[8px]
            uppercase
            tracking-[0.12em]
            text-[#9B8982]
          "
        >
          {label}
        </p>
      </div>
    </div>
  );
}

/* ═════════════════════════════════════
   DIFFICULTY
═════════════════════════════════════ */

function prettyDifficulty(
  difficulty:
    | "BEGINNER"
    | "INTERMEDIATE"
    | "ADVANCED"
) {
  switch (difficulty) {
    case "BEGINNER":
      return "Beginner";

    case "INTERMEDIATE":
      return "Intermediate";

    case "ADVANCED":
      return "Advanced";
  }
}