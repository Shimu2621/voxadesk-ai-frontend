"use client";

import { Cable, Rocket, WandSparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { BorderBeam } from "@/components/magicui/border-beam";
import { MagicCard } from "@/components/magicui/magic-card";
import { SectionBadge } from "@/components/landing/section-badge";

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
      className="relative overflow-hidden border-y border-white/6 bg-[#080b14] px-6 py-24 sm:py-28"
      aria-labelledby="how-heading"
    >
      <AnimatedGridPattern className="text-primary opacity-25 mask-[radial-gradient(ellipse_at_center,black,transparent_72%)]" />
      <motion.div
        className="pointer-events-none absolute -left-32 top-1/3 size-72 rounded-full bg-blue-500/[0.07] blur-[100px]"
        animate={
          reduceMotion
            ? undefined
            : { x: [0, 90, 0], y: [0, -35, 0], opacity: [0.45, 0.8, 0.45] }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <SectionBadge icon={Cable} tone="blue">
            From setup to live in three steps
          </SectionBadge>
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
            className="pointer-events-none absolute left-[16.6%] right-[16.6%] top-8 hidden h-px bg-white/8 lg:block"
            aria-hidden="true"
          >
            <motion.span
              className="block h-px origin-left bg-linear-to-r from-primary/20 via-primary to-violet-400/40"
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
              whileHover={reduceMotion ? undefined : { y: -6, scale: 1.01 }}
            >
              <MagicCard className="group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-[#0d111d]/90 p-6 pt-8 shadow-[0_18px_55px_rgba(0,0,0,0.2)]">
                <BorderBeam delay={index * 0.8} duration={6.2} />
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <motion.span
                      className="grid size-12 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary shadow-[0_0_24px_oklch(0.82_0.16_170/0.08)]"
                      animate={
                        reduceMotion
                          ? undefined
                          : { y: [0, -4, 0], scale: [1, 1.045, 1] }
                      }
                      transition={{
                        duration: 3.8,
                        delay: index * 0.45,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Icon size={22} />
                    </motion.span>
                    <motion.span
                      className="font-display text-3xl font-semibold text-white/8"
                      animate={
                        reduceMotion
                          ? undefined
                          : { opacity: [0.08, 0.18, 0.08] }
                      }
                      transition={{
                        duration: 4.2,
                        delay: index * 0.6,
                        repeat: Infinity,
                      }}
                    >
                      {number}
                    </motion.span>
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
