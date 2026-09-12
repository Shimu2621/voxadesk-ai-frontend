import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type RainbowButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: "default" | "outline";
};

export function RainbowButton({
  asChild,
  className,
  variant = "default",
  ...props
}: RainbowButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      className={cn(
        "rainbow-button inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50",
        variant === "outline" && "rainbow-button-outline text-white",
        className,
      )}
      {...props}
    />
  );
}
