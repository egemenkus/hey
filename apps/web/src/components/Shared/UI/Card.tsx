import cn from "@/helpers/cn";
import type { ElementType, MouseEvent, ReactNode } from "react";

interface CardProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  forceRounded?: boolean;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

export const Card = ({
  as: Tag = "div",
  children,
  className = "",
  forceRounded = false,
  onClick
}: CardProps) => {
  return (
    <Tag
      className={cn(
        forceRounded
          ? "rounded-xl border"
          : "rounded-none border-y md:rounded-xl md:border",
        "border-gray-200 dark:border-gray-700",
        "bg-white dark:bg-black",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Tag>
  );
};
