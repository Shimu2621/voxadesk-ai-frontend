"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type MotionProps,
} from "motion/react";

import { cn } from "@/lib/utils";
import { AuroraText } from "@/components/ui/aurora-text";

interface WordRotateProps {
  words: string[];
  duration?: number;
  motionProps?: MotionProps;
  className?: string;
  aurora?: boolean;
}

export function WordRotate({
  words,
  duration = 2500,
  motionProps = {
    initial: { opacity: 1, y: "-0.3em" },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "0.3em" },
    transition: { duration: 0.3, ease: "easeOut" },
  },
  className,
  aurora = false,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const widestWord = useMemo(
    () =>
      words.reduce(
        (longest, word) => (word.length > longest.length ? word : longest),
        "",
      ),
    [words],
  );

  useEffect(() => {
    if (shouldReduceMotion || words.length < 2) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [words, duration, shouldReduceMotion]);

  if (words.length === 0) return null;

  return (
    <span
      className={cn(
        "relative inline-grid h-[1.2em] place-items-center align-[-0.12em] leading-none",
        className,
      )}
    >
      <span
        className="invisible col-start-1 row-start-1 whitespace-nowrap"
        aria-hidden="true"
      >
        {widestWord}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className="absolute inset-x-0 top-0 flex h-full items-center justify-center whitespace-nowrap"
          {...motionProps}
        >
          {aurora ? <AuroraText>{words[index]}</AuroraText> : words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
