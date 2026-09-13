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
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { BorderBeam } from "@/components/magicui/border-beam";
import { SectionBadge } from "@/components/landing/section-badge";

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

function CardVisual({
  type,
  reduceMotion,
}: {
  type?: "conversation" | "workflow";
  reduceMotion: boolean | null;
}) {
  if (type === "conversation")
    return (
      <div className="mt-8 space-y-3 rounded-xl border border-white/[0.07] bg-black/15 p-4">
        <motion.div
          className="mr-10 rounded-lg bg-white/5.5 px-3 py-2 text-xs text-slate-400"
          animate={
            reduceMotion
              ? undefined
              : { x: [0, 3, 0], opacity: [0.72, 1, 0.72] }
          }
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        >
          How can I help with your appointment today?
        </motion.div>
        <motion.div
          className="ml-12 rounded-lg bg-primary/10 px-3 py-2 text-xs text-slate-300 ring-1 ring-primary/10"
          animate={
            reduceMotion
              ? undefined
              : { x: [0, -3, 0], opacity: [0.72, 1, 0.72] }
          }
          transition={{
            duration: 4.2,
            delay: 0.7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          I need the earliest available time this week.
        </motion.div>
        <div className="flex items-center gap-2 pt-1 text-[10px] uppercase tracking-wider text-primary">
          <motion.span
            className="size-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]"
            animate={
              reduceMotion
                ? undefined
                : { opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }
            }
            transition={{ duration: 2.2, repeat: Infinity }}
          />{" "}
          Intent understood
        </div>
      </div>
    );
  if (type === "workflow")
    return (
      <div className="mt-6 flex items-center justify-between gap-2 rounded-xl border border-white/[0.07] bg-black/15 p-4 text-[10px] font-medium text-slate-400 sm:text-xs">
        <span className="rounded-lg bg-white/6 px-3 py-2">Call ended</span>
        <motion.span
          animate={
            reduceMotion
              ? undefined
              : { x: [0, 4, 0], opacity: [0.45, 1, 0.45] }
          }
          transition={{ duration: 2.4, repeat: Infinity }}
        >
          <ArrowUpRight size={14} className="text-primary" />
        </motion.span>
        <span className="rounded-lg bg-primary/10 px-3 py-2 text-primary">
          CRM updated
        </span>
        <motion.span
          animate={
            reduceMotion
              ? undefined
              : { x: [0, 4, 0], opacity: [0.45, 1, 0.45] }
          }
          transition={{ duration: 2.4, delay: 0.45, repeat: Infinity }}
        >
          <ArrowUpRight size={14} className="text-primary" />
        </motion.span>
        <span className="rounded-lg bg-white/6 px-3 py-2">Team notified</span>
      </div>
    );
  return null;
}

export function AutomationBento() {
  const reduceMotion = useReducedMotion();
  return (
    <section
      className="relative overflow-hidden px-6 py-24 sm:py-28"
      aria-labelledby="automation-heading"
    >
      <AnimatedGridPattern className="text-violet-300 opacity-[0.08] mask-[radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="pointer-events-none absolute right-0 top-1/3 size-96 rounded-full bg-violet-500/4.5 blur-[100px]" />
      <motion.div
        className="pointer-events-none absolute -right-24 top-1/4 size-80 rounded-full bg-violet-500/7.5 blur-[105px]"
        animate={
          reduceMotion
            ? undefined
            : { x: [0, -100, 0], y: [0, 55, 0], opacity: [0.35, 0.75, 0.35] }
        }
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="max-w-3xl"
          initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.6 }}
        >
          <SectionBadge icon={Sparkles} tone="violet">
            One agent. Every front-desk workflow.
          </SectionBadge>
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
                <MagicCard className="group relative h-full min-h-55 overflow-hidden rounded-2xl border border-white/8 bg-[#0c101b]/90 p-6">
                  <BorderBeam
                    colorFrom="#c4b5fd"
                    colorTo="#58e8c7"
                    delay={index * 0.55}
                    duration={7}
                  />
                  <div className="relative z-10">
                    <motion.span
                      className={`grid size-11 place-items-center rounded-xl border ${tone}`}
                      animate={
                        reduceMotion
                          ? undefined
                          : { y: [0, -3, 0], rotate: [0, 1.5, 0] }
                      }
                      transition={{
                        duration: 4 + (index % 3) * 0.5,
                        delay: index * 0.32,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Icon size={20} />
                    </motion.span>
                    <h3 className="mt-5 text-lg font-medium text-white">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {copy}
                    </p>
                    <CardVisual type={visual} reduceMotion={reduceMotion} />
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
