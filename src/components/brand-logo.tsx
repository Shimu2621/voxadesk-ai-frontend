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
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="VoxaDesk AI home"
    >
      <span
        className={cn(
          "rainbow-logo relative isolate shrink-0 rounded-md p-px",
          compact ? "size-6" : "size-9",
        )}
      >
        <span className="relative block size-full overflow-hidden rounded-[calc(0.375rem-1px)] bg-primary">
          <Image
            src="/voxadesk-logo-new.jpg"
            alt=""
            fill
            priority
            sizes={compact ? "22px" : "34px"}
            className="scale-x-125 scale-y-110 object-cover mix-blend-multiply"
          />
        </span>
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
