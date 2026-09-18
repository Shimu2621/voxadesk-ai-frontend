import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "dashboard-card rounded-2xl border border-white/[0.09] bg-[#090e19]/95 p-5 shadow-[0_18px_55px_rgba(0,0,0,0.18)] sm:p-6",
        className,
      )}
      {...props}
    />
  );
}
