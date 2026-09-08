"use client";

import {
  ArrowUpRight,
  Bot,
  CalendarCheck2,
  GitBranch,
  Languages,
  MessageSquareText,
  PhoneForwarded,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { MagicCard } from "@/components/magicui/magic-card";

type Capability = {
  icon: LucideIcon;
  title: string;
  copy: string;
  className: string;
  tone: string;
  visual?: "conversation" | "workflow";
};

const capabilities: Capability[] = [
  {
    icon: Bot,
    title: "Natural AI conversations",
    copy: "Respond with the context, tone, and clarity customers expect from your best receptionist.",
    className: "md:col-span-2 md:row-span-2",
    tone: "text-primary bg-primary/10 border-primary/20",
    visual: "conversation",
  },
  {
    icon: CalendarCheck2,
    title: "Calendar action",
    copy: "Find valid availability and turn a conversation into a confirmed appointment.",
    className: "md:col-span-1",
    tone: "text-blue-300 bg-blue-400/10 border-blue-400/20",
  },
  {
    icon: PhoneForwarded,
    title: "Human-safe handoff",
    copy: "Transfer urgent or sensitive calls with context attached.",
    className: "md:col-span-1",
    tone: "text-violet-300 bg-violet-400/10 border-violet-400/20",
  },
  {
    icon: MessageSquareText,
    title: "Instant summaries",
    copy: "Capture decisions, intent, and next steps after every conversation.",
    className: "md:col-span-1",
    tone: "text-amber-300 bg-amber-400/10 border-amber-400/20",
  },
  {
    icon: GitBranch,
    title: "Workflow automation",
    copy: "Trigger follow-ups and downstream actions through controlled tools and webhooks.",
    className: "md:col-span-2",
    tone: "text-cyan-300 bg-cyan-400/10 border-cyan-400/20",
    visual: "workflow",
  },
  {
    icon: Languages,
    title: "Customer-ready voice",
    copy: "Create consistent, branded experiences for every caller and channel.",
    className: "md:col-span-1",
    tone: "text-rose-300 bg-rose-400/10 border-rose-400/20",
  },
  {
    icon: ShieldCheck,
    title: "Secure by design",
    copy: "Tenant isolation, permissions, audit trails, and guarded provider access.",
    className: "md:col-span-1",
    tone: "text-emerald-300 bg-emerald-400/10 border-emerald-400/20",
  },
];

function CardVisual({ type }: { type?: "conversation" | "workflow" }) {
  if (type === "conversation")
    return (
      <div className="mt-8 space-y-3 rounded-xl border border-white/[0.07] bg-black/15 p-4">
        <div className="mr-10 rounded-lg bg-white/[0.055] px-3 py-2 text-xs text-slate-400">
          How can I help with your appointment today?
        </div>
        <div className="ml-12 rounded-lg bg-primary/10 px-3 py-2 text-xs text-slate-300 ring-1 ring-primary/10">
          I need the earliest available time this week.
        </div>
        <div className="flex items-center gap-2 pt-1 text-[10px] uppercase tracking-wider text-primary">
          <span className="size-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />{" "}
          Intent understood
        </div>
      </div>
    );
  if (type === "workflow")
    return (
      <div className="mt-6 flex items-center justify-between gap-2 rounded-xl border border-white/[0.07] bg-black/15 p-4 text-[10px] font-medium text-slate-400 sm:text-xs">
        <span className="rounded-lg bg-white/[0.06] px-3 py-2">Call ended</span>
        <ArrowUpRight size={14} className="text-primary" />
        <span className="rounded-lg bg-primary/10 px-3 py-2 text-primary">
          CRM updated
        </span>
        <ArrowUpRight size={14} className="text-primary" />
        <span className="rounded-lg bg-white/[0.06] px-3 py-2">
          Team notified
        </span>
      </div>
    );
  return null;
}

export function AutomationBento() {
  const reduceMotion = useReducedMotion();
  return (
    <section
      className="relative px-6 py-24 sm:py-28"
      aria-labelledby="automation-heading"
    >
      <div className="pointer-events-none absolute right-0 top-1/3 size-96 rounded-full bg-violet-500/[0.045] blur-[100px]" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="max-w-3xl"
          initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <Sparkles size={14} /> One agent. Every front-desk workflow.
          </span>
          <h2
            id="automation-heading"
            className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl"
          >
            Automation that goes beyond answering.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
            Turn customer conversations into safe, trackable business actions
            without losing the human context.
          </p>
        </motion.div>

        <div className="mt-14 grid auto-rows-auto gap-4 md:grid-cols-4">
          {capabilities.map(
            ({ icon: Icon, title, copy, className, tone, visual }, index) => (
              <motion.div
                key={title}
                className={className}
                initial={
                  reduceMotion ? undefined : { opacity: 0, y: 22, scale: 0.985 }
                }
                whileInView={
                  reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }
                }
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.5,
                  delay: reduceMotion ? 0 : (index % 4) * 0.08,
                }}
                whileHover={reduceMotion ? undefined : { y: -3 }}
              >
                <MagicCard className="group h-full min-h-[220px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c101b]/90 p-6">
                  <div className="relative z-10">
                    <span
                      className={`grid size-11 place-items-center rounded-xl border ${tone}`}
                    >
                      <Icon size={20} />
                    </span>
                    <h3 className="mt-5 text-lg font-medium text-white">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {copy}
                    </p>
                    <CardVisual type={visual} />
                  </div>
                </MagicCard>
              </motion.div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
