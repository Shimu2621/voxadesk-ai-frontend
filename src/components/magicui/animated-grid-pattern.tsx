"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const illuminatedCells = [
  [2, 1],
  [6, 2],
  [9, 4],
  [3, 6],
  [11, 7],
  [7, 9],
  [1, 10],
  [13, 11],
];

export function AnimatedGridPattern({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 size-full",
        className,
      )}
    >
      <defs>
        <pattern
          id="voxadesk-grid"
          width="58"
          height="58"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 58 0 L 0 0 0 58"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.14"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#voxadesk-grid)" />
      {illuminatedCells.map(([x, y], index) => (
        <motion.rect
          key={`${x}-${y}`}
          x={x * 58 + 1}
          y={y * 58 + 1}
          width="56"
          height="56"
          fill="rgb(88 232 199)"
          initial={{ opacity: 0.02 }}
          animate={
            reduceMotion ? { opacity: 0.04 } : { opacity: [0.02, 0.11, 0.02] }
          }
          transition={{
            duration: 4.5,
            delay: index * 0.38,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}
