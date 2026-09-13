import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

export function BorderBeam({
  className,
  colorFrom = "#58e8c7",
  colorTo = "#38bdf8",
  delay = 0,
  duration = 6,
}: {
  className?: string;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <span
      className={cn("card-border-beam", className)}
      style={
        {
          "--beam-color-from": colorFrom,
          "--beam-color-to": colorTo,
          "--beam-delay": `${delay}s`,
          "--beam-duration": `${duration}s`,
        } as CSSProperties
      }
      aria-hidden="true"
    />
  );
}
