import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Marquee({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "magic-marquee flex overflow-hidden [--duration:32s] [--gap:1rem]",
        className,
      )}
    >
      <div className="magic-marquee-track">{children}</div>
      <div className="magic-marquee-track" aria-hidden="true">
        {children}
      </div>
    </div>
  );
}
