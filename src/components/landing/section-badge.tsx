import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type SectionBadgeProps = {
  children: ReactNode;
  className?: string;
  icon: LucideIcon;
  id?: string;
  tone?: "cyan" | "blue" | "violet" | "pink" | "amber";
};

export function SectionBadge({
  children,
  className,
  icon: Icon,
  id,
  tone = "cyan",
}: SectionBadgeProps) {
  return (
    <span
      id={id}
      className={cn("section-badge", `section-badge-${tone}`, className)}
    >
      <Icon className="relative z-10 size-3.5" aria-hidden="true" />
      <span className="relative z-10">{children}</span>
    </span>
  );
}
