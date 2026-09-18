import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type RainbowButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive";
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
        "group/button inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:transform-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none",
        "rainbow-button",
        variant === "outline" && "rainbow-button-outline",
        variant === "secondary" && "rainbow-button-secondary",
        variant === "ghost" && "rainbow-button-ghost px-3 py-2",
        variant === "destructive" && "rainbow-button-destructive px-4 py-2.5",
        className,
      )}
      {...props}
    />
  );
}
