import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex min-h-10 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:transform-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none",
  {
    variants: {
      variant: {
        primary:
          "border border-primary/60 bg-linear-to-r from-primary via-emerald-300 to-cyan-300 px-5 py-3 text-slate-950 shadow-[0_10px_30px_rgba(88,232,199,0.16)] hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[0_14px_34px_rgba(88,232,199,0.22)]",
        secondary:
          "border border-white/12 bg-white/[0.06] px-5 py-3 text-white shadow-sm shadow-black/20 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.1]",
        outline:
          "border border-primary/25 bg-primary/[0.04] px-5 py-3 text-primary hover:-translate-y-0.5 hover:border-primary/45 hover:bg-primary/[0.09]",
        ghost:
          "px-3 py-2 text-slate-300 hover:bg-white/[0.07] hover:text-white",
        destructive:
          "border border-red-400/25 bg-red-400/[0.08] px-4 py-2.5 text-red-200 hover:-translate-y-0.5 hover:border-red-400/40 hover:bg-red-400/[0.14]",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, asChild, ...props }: ButtonProps) {
  const Component = asChild ? Slot : "button";
  return (
    <Component
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  );
}
