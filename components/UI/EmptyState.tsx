import type { LucideIcon } from "lucide-react";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
};

export function EmptyState({
  icon: Icon,
  title,
  description,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`
        flex
        min-h-[380px]
        flex-col
        items-center
        justify-center
        rounded-[28px]
        border
        border-dashed
        border-[#28211F]/15
        bg-white/30
        px-6
        text-center
        ${className}
      `}
    >
      <div
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-[#E7B6AB]/20
          text-[#B87E74]
        "
      >
        <Icon
          size={19}
          strokeWidth={1.5}
        />
      </div>

      <h3
        className="
          mt-6
          font-serif
          text-[30px]
          tracking-[-0.03em]
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-3
          max-w-[400px]
          text-sm
          leading-6
          text-[#7A6C67]
        "
      >
        {description}
      </p>
    </div>
  );
}