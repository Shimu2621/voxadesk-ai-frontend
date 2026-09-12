import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Marquee({
  children,
  className,
  reverse = false,
}: {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={cn(
        "magic-marquee flex overflow-hidden [--duration:32s] [--gap:1rem]",
        className,
      )}
    >
      <div className={cn("magic-marquee-track", reverse && "magic-marquee-track-reverse")}>
        {children}
      </div>
      <div
        className={cn("magic-marquee-track", reverse && "magic-marquee-track-reverse")}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}
