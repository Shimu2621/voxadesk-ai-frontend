import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function BrandLogo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-2.5", className)}
      aria-label="VoxaDesk AI home"
    >
      <span
        className={cn(
          "relative isolate shrink-0 overflow-hidden rounded-md bg-primary shadow-[0_0_20px_oklch(0.82_0.16_170/0.14)] ring-1 ring-primary/30",
          compact ? "size-6" : "size-9",
        )}
      >
        <Image
          src="/voxadesk-logo-new.jpg"
          alt=""
          fill
          priority
          sizes={compact ? "24px" : "36px"}
          className="scale-x-125 scale-y-110 object-cover mix-blend-multiply"
        />
      </span>

      <span
        className={cn(
          "font-display font-bold tracking-[-0.035em] text-white",
          compact ? "text-lg" : "text-xl",
        )}
      >
        VoxaDesk<span className="text-primary"> AI</span>
      </span>
    </Link>
  );
}
