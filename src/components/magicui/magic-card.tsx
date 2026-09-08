"use client";

import type { CSSProperties, HTMLAttributes, MouseEvent } from "react";
import { cn } from "@/lib/utils";

export function MagicCard({
  className,
  style,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  function trackPointer(event: MouseEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--mouse-x",
      `${event.clientX - bounds.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--mouse-y",
      `${event.clientY - bounds.top}px`,
    );
  }

  return (
    <div
      className={cn("magic-card", className)}
      onMouseMove={trackPointer}
      style={
        { "--mouse-x": "50%", "--mouse-y": "50%", ...style } as CSSProperties
      }
      {...props}
    />
  );
}
