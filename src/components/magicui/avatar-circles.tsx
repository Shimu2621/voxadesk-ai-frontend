import Image from "next/image";

import { cn } from "@/lib/utils";

type Avatar = {
  imageUrl: string;
  profileUrl?: string;
  name: string;
};

export function AvatarCircles({
  avatars,
  className,
  extraCount = 0,
}: {
  avatars: Avatar[];
  className?: string;
  extraCount?: number;
}) {
  return (
    <div className={cn("flex -space-x-2.5", className)}>
      {avatars.map(({ imageUrl, profileUrl, name }) => {
        const avatar = (
          <Image
            src={imageUrl}
            alt={name}
            width={40}
            height={40}
            unoptimized
            className="size-full object-cover"
          />
        );

        return profileUrl ? (
          <a
            key={name}
            href={profileUrl}
            aria-label={name}
            className="relative size-10 overflow-hidden rounded-full border-2 border-[#0b111c] ring-1 ring-white/10 transition hover:z-10 hover:-translate-y-1 hover:scale-105 hover:ring-primary/50"
          >
            {avatar}
          </a>
        ) : (
          <span
            key={name}
            className="relative size-10 overflow-hidden rounded-full border-2 border-[#0b111c] ring-1 ring-white/10"
          >
            {avatar}
          </span>
        );
      })}
      {extraCount > 0 && (
        <span className="relative grid size-10 place-items-center rounded-full border-2 border-[#0b111c] bg-slate-800 text-[10px] font-semibold text-slate-300 ring-1 ring-white/10">
          +{extraCount}
        </span>
      )}
    </div>
  );
}
