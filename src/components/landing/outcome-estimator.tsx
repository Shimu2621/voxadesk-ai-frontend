"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Clock3,
  FileCheck2,
  PhoneIncoming,
  Sparkles,
  Users,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/magicui/magic-card";

const proofPoints = [
  {
    icon: FileCheck2,
    title: "Outcome-level audit trail",
    copy: "Review what happened, which tools ran, and where a human stepped in.",
  },
  {
    icon: BarChart3,
    title: "Operational visibility",
    copy: "Track intent, resolution, appointments, leads, and transfers in one view.",
  },
  {
    icon: Users,
    title: "Context your team can use",
    copy: "Give staff concise summaries and next actions instead of another raw voicemail.",
  },
] as const;

export function OutcomeEstimator() {
  const [calls, setCalls] = useState(250);
  const reduceMotion = useReducedMotion();
  const estimates = [
    {
      label: "After-hours calls covered",
      value: Math.round(calls * 0.28),
      icon: PhoneIncoming,
    },
    {
      label: "Potential intents captured",
      value: Math.round(calls * 0.34),
      icon: Sparkles,
    },
    {
      label: "Estimated admin hours redirected",
      value: Math.max(1, Math.round(calls / 24)),
      icon: Clock3,
    },
  ];
  return (
    <section
      className="relative overflow-hidden px-6 py-24 sm:py-28"
      aria-labelledby="outcomes-heading"
    >
      <div className="pointer-events-none absolute right-[-10%] top-0 size-[480px] rounded-full bg-violet-500/[0.045] blur-[120px]" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Built for measurable outcomes
          </p>
          <h2
            id="outcomes-heading"
            className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl"
          >
            Model the opportunity hiding in your call volume.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400">
            Explore an illustrative scenario, then use VoxaDesk reporting to
            measure your real results after launch.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <MagicCard className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0b0f1a]/95 p-6 sm:p-8">
            <div className="relative z-10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-white">
                    Illustrative weekly call volume
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Adjust the model to match your operation
                  </p>
                </div>
                <div className="rounded-xl border border-primary/20 bg-primary/10 px-4 py-2 text-right">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={calls}
                      initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                      className="block font-display text-2xl font-semibold text-primary"
                    >
                      {calls}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500">
                    calls / week
                  </span>
                </div>
              </div>
              <label className="mt-8 block">
                <span className="sr-only">Weekly call volume</span>
                <input
                  className="outcome-range w-full"
                  type="range"
                  min="50"
                  max="1000"
                  step="50"
                  value={calls}
                  onChange={(event) => setCalls(Number(event.target.value))}
                />
              </label>
              <div className="mt-2 flex justify-between text-[10px] text-slate-600">
                <span>50</span>
                <span>1,000</span>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {estimates.map(({ label, value, icon: Icon }, index) => (
                  <motion.div
                    key={label}
                    className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4"
                    initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
                    whileInView={
                      reduceMotion ? undefined : { opacity: 1, y: 0 }
                    }
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <Icon size={16} className="text-primary" />
                    <AnimatePresence mode="popLayout">
                      <motion.p
                        key={value}
                        initial={
                          reduceMotion ? undefined : { opacity: 0, scale: 0.92 }
                        }
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-4 font-display text-3xl font-semibold text-white"
                      >
                        {value}
                      </motion.p>
                    </AnimatePresence>
                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      {label}
                    </p>
                  </motion.div>
                ))}
              </div>
              <p className="mt-5 text-[11px] leading-5 text-slate-600">
                Illustrative estimates use generalized assumptions, not
                guaranteed results. Actual outcomes depend on call mix,
                configuration, availability, and customer behavior.
              </p>
            </div>
          </MagicCard>

          <div className="grid gap-3">
            {proofPoints.map(({ icon: Icon, title, copy }, index) => (
              <motion.div
                key={title}
                initial={reduceMotion ? undefined : { opacity: 0, x: 20 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.5,
                  delay: reduceMotion ? 0 : index * 0.1,
                }}
                whileHover={reduceMotion ? undefined : { x: 4 }}
              >
                <MagicCard className="relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
                  <div className="relative z-10 flex gap-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                      <Icon size={18} />
                    </span>
                    <div>
                      <h3 className="text-base font-medium text-white">
                        {title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {copy}
                      </p>
                    </div>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-white/[0.08] bg-gradient-to-r from-primary/[0.07] via-white/[0.025] to-violet-500/[0.06] px-6 py-6 text-center sm:flex-row sm:text-left"
          initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div>
            <p className="text-lg font-medium text-white">
              Ready to measure your own outcomes?
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Launch a controlled test workspace and start with one real
              workflow.
            </p>
          </div>
          <Button asChild>
            <Link href="/signup">
              Start building <ArrowRight size={15} />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
