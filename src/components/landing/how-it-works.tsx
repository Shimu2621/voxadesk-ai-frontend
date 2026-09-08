"use client";

import { Cable, Rocket, WandSparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { MagicCard } from "@/components/magicui/magic-card";

const steps = [
  {
    number: "01",
    icon: Cable,
    title: "Connect your tools",
    copy: "Link your phone workflow, calendar, business inbox, and approved knowledge sources.",
  },
  {
    number: "02",
    icon: WandSparkles,
    title: "Shape your AI agent",
    copy: "Define its voice, goals, business rules, escalation paths, and customer experience.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Test, publish, and improve",
    copy: "Run private test conversations, launch confidently, and optimize from real outcomes.",
  },
] as const;

export function HowItWorks() {
  const reduceMotion = useReducedMotion();
  return (
    <section
      className="relative overflow-hidden border-y border-white/[0.06] bg-[#080b14] px-6 py-24 sm:py-28"
      aria-labelledby="how-heading"
    >
      <AnimatedGridPattern className="text-primary opacity-25 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            From setup to live in three steps
          </p>
          <h2
            id="how-heading"
            className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl"
          >
            Your AI receptionist, built around your business.
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-400">
            Configure the experience without rebuilding your workflow. VoxaDesk
            connects the systems and people you already rely on.
          </p>
        </motion.div>

        <div className="relative mt-14 grid gap-5 lg:grid-cols-3">
          <div
            className="pointer-events-none absolute left-[16.6%] right-[16.6%] top-8 hidden h-px bg-white/[0.08] lg:block"
            aria-hidden="true"
          >
            <motion.span
              className="block h-px origin-left bg-gradient-to-r from-primary/20 via-primary to-violet-400/40"
              initial={{ scaleX: reduceMotion ? 1 : 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.25, ease: "easeInOut" }}
            />
            {!reduceMotion && (
              <motion.span
                className="absolute top-1/2 size-2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_14px_var(--primary)]"
                animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 4.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 1.2,
                }}
              />
            )}
          </div>
          {steps.map(({ number, icon: Icon, title, copy }, index) => (
            <motion.div
              key={number}
              initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.55,
                delay: reduceMotion ? 0 : index * 0.12,
              }}
            >
              <MagicCard className="relative h-full rounded-2xl border border-white/[0.08] bg-[#0d111d]/90 p-6 pt-8 shadow-[0_18px_55px_rgba(0,0,0,0.2)]">
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                      <Icon size={22} />
                    </span>
                    <span className="font-display text-3xl font-semibold text-white/[0.08]">
                      {number}
                    </span>
                  </div>
                  <h3 className="mt-7 text-xl font-medium text-white">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {copy}
                  </p>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
