"use client";

import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Car,
  HeartPulse,
  Home,
  Scale,
  Scissors,
  UtensilsCrossed,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { MagicCard } from "@/components/magicui/magic-card";
import { SectionBadge } from "@/components/landing/section-badge";

const industries = [
  {
    icon: HeartPulse,
    title: "Healthcare",
    copy: "Handle routine inquiries, appointment requests, and safe staff escalation.",
    accent: "text-rose-300 bg-rose-400/10 border-rose-400/20",
  },
  {
    icon: Home,
    title: "Home services",
    copy: "Capture job details, prioritize emergencies, and schedule estimates around the clock.",
    accent: "text-amber-300 bg-amber-400/10 border-amber-400/20",
  },
  {
    icon: Building2,
    title: "Real estate",
    copy: "Qualify buyers and renters, coordinate viewings, and route high-intent opportunities.",
    accent: "text-blue-300 bg-blue-400/10 border-blue-400/20",
  },
  {
    icon: Scale,
    title: "Legal offices",
    copy: "Collect structured intake details while keeping sensitive matters on guarded paths.",
    accent: "text-violet-300 bg-violet-400/10 border-violet-400/20",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurants",
    copy: "Answer common questions, manage reservation requests, and handle peak-hour overflow.",
    accent: "text-orange-300 bg-orange-400/10 border-orange-400/20",
  },
  {
    icon: Scissors,
    title: "Wellness & salons",
    copy: "Book services, explain availability, and reduce interruptions for client-facing teams.",
    accent: "text-pink-300 bg-pink-400/10 border-pink-400/20",
  },
  {
    icon: Car,
    title: "Automotive",
    copy: "Capture service needs, coordinate appointments, and route roadside requests quickly.",
    accent: "text-cyan-300 bg-cyan-400/10 border-cyan-400/20",
  },
  {
    icon: BriefcaseBusiness,
    title: "Professional services",
    copy: "Qualify inquiries and create a consistent front door for every client conversation.",
    accent: "text-primary bg-primary/10 border-primary/20",
  },
] as const;

export function IndustryUseCases() {
  const reduceMotion = useReducedMotion();
  return (
    <section
      className="relative overflow-hidden px-6 py-24 sm:py-28"
      aria-labelledby="industries-heading"
    >
      <div className="pointer-events-none absolute -left-40 top-20 size-96 rounded-full bg-primary/[0.045] blur-[110px]" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-3xl">
            <SectionBadge icon={BriefcaseBusiness} tone="pink">
              Purpose-built customer experiences
            </SectionBadge>
            <h2
              id="industries-heading"
              className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl"
            >
              Flexible enough for your industry. Specific enough to be useful.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-slate-400 lg:pb-1">
            Start with the workflows your team handles every day, then expand as
            your AI receptionist learns your operation.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map(({ icon: Icon, title, copy, accent }, index) => (
            <motion.div
              key={title}
              initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.48,
                delay: reduceMotion ? 0 : (index % 4) * 0.07,
              }}
              whileHover={reduceMotion ? undefined : { y: -5 }}
            >
              <MagicCard className="group h-full min-h-[245px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b0f1a]/90 p-6 transition-colors hover:border-white/[0.14]">
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between">
                    <span
                      className={`grid size-11 place-items-center rounded-xl border ${accent}`}
                    >
                      <Icon size={20} />
                    </span>
                    <motion.span
                      className="text-slate-700 transition-colors group-hover:text-primary"
                      whileHover={reduceMotion ? undefined : { x: 2, y: -2 }}
                    >
                      <ArrowUpRight size={18} />
                    </motion.span>
                  </div>
                  <div className="mt-auto pt-10">
                    <h3 className="text-lg font-medium text-white">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {copy}
                    </p>
                  </div>
                </div>
                <div
                  className="pointer-events-none absolute -bottom-12 -right-12 size-28 rounded-full bg-white/[0.02] transition-transform duration-500 group-hover:scale-150"
                  aria-hidden="true"
                />
              </MagicCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-primary/15 bg-primary/[0.045] px-6 py-5 text-center sm:flex-row sm:text-left"
          initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <p className="text-sm font-medium text-white">
              Don’t see your industry?
            </p>
            <p className="mt-1 text-xs text-slate-500">
              VoxaDesk workflows can be configured around your business rules.
            </p>
          </div>
          <a
            href="/signup"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-cyan-300"
          >
            Explore your use case <ArrowUpRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
