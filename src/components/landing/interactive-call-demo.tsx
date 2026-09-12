"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  CalendarCheck2,
  Check,
  Headphones,
  PhoneCall,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Card } from "@/components/ui/card";
import { SectionBadge } from "@/components/landing/section-badge";

const scenarios = {
  appointment: {
    label: "Appointment",
    icon: CalendarCheck2,
    outcome: "Appointment ready",
    lines: [
      ["AI", "Thanks for calling Bright Dental. How can I help today?"],
      ["Caller", "I’d like to schedule a cleaning next Tuesday."],
      [
        "AI",
        "I found an opening at 10:30 AM. Would you like me to reserve it?",
      ],
    ],
  },
  lead: {
    label: "Lead capture",
    icon: Sparkles,
    outcome: "Qualified lead captured",
    lines: [
      ["AI", "What kind of project can our team help you with?"],
      ["Caller", "We need after-hours support for three locations."],
      [
        "AI",
        "I’ve captured the details and prioritized a callback for your team.",
      ],
    ],
  },
  handoff: {
    label: "Smart handoff",
    icon: Headphones,
    outcome: "Context sent to team",
    lines: [
      ["AI", "I can bring in a specialist for that request."],
      ["Caller", "Yes, I’d like to speak with someone now."],
      [
        "AI",
        "I’m connecting you and sharing a summary so you won’t need to repeat yourself.",
      ],
    ],
  },
} as const;

type Scenario = keyof typeof scenarios;

export function InteractiveCallDemo() {
  const [scenario, setScenario] = useState<Scenario>("appointment");
  const [active, setActive] = useState(false);
  const reduceMotion = useReducedMotion();
  const current = scenarios[scenario];

  return (
    <section
      className="relative overflow-hidden px-6 py-24 sm:py-28"
      aria-labelledby="demo-heading"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.055] blur-[110px]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, x: -24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <SectionBadge icon={PhoneCall}>Interactive preview</SectionBadge>
          <h2
            id="demo-heading"
            className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl"
          >
            Hear how every call becomes an outcome.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-400">
            Explore how VoxaDesk AI answers naturally, understands intent, and
            takes action while your team stays focused.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <RainbowButton asChild>
              <Link href="/demo">
                Try the live demo <ArrowRight size={16} />
              </Link>
            </RainbowButton>
            <RainbowButton asChild variant="outline">
              <Link href="/signup">Build your receptionist</Link>
            </RainbowButton>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-primary" /> No credit card
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-primary" /> Guided setup
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={
            reduceMotion ? undefined : { opacity: 0, y: 28, scale: 0.98 }
          }
          whileInView={
            reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }
          }
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
        >
          <Card className="relative overflow-hidden border-white/[0.1] bg-[#0b0e19]/90 p-0 shadow-[0_30px_100px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="relative flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/25">
                  <PhoneCall size={17} />
                  {active && (
                    <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-primary ring-2 ring-[#0b0e19]" />
                  )}
                </span>
                <div>
                  <p className="text-sm font-medium text-white">
                    VoxaDesk live preview
                  </p>
                  <p className="text-xs text-slate-500">
                    AI receptionist · secure session
                  </p>
                </div>
              </div>
              <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-slate-400">
                {active ? "Listening" : "Ready"}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 border-b border-white/[0.08] p-3 sm:p-4">
              {(Object.keys(scenarios) as Scenario[]).map((key) => {
                const item = scenarios[key];
                const Icon = item.icon;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setScenario(key);
                      setActive(false);
                    }}
                    className={`flex items-center justify-center gap-2 rounded-lg px-2 py-2.5 text-xs font-medium transition ${scenario === key ? "bg-primary/12 text-primary ring-1 ring-primary/25" : "text-slate-500 hover:bg-white/[0.04] hover:text-slate-300"}`}
                    aria-pressed={scenario === key}
                  >
                    <Icon size={14} />{" "}
                    <span className="hidden sm:inline">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="min-h-[330px] p-5 sm:p-6">
              <div
                className="mb-6 flex h-12 items-center justify-center gap-1 rounded-xl border border-white/[0.07] bg-white/[0.025] px-5"
                aria-hidden="true"
              >
                {Array.from({ length: 30 }, (_, index) => (
                  <motion.span
                    key={index}
                    className="w-0.5 rounded-full bg-primary"
                    animate={
                      active && !reduceMotion
                        ? { height: [5, 10 + ((index * 7) % 25), 6] }
                        : { height: 5 + ((index * 5) % 9) }
                    }
                    transition={{
                      duration: 0.9 + (index % 4) * 0.18,
                      repeat: active ? Infinity : 0,
                      delay: index * 0.025,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${scenario}-${active}`}
                  initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                  className="space-y-3"
                >
                  {active ? (
                    current.lines.map(([speaker, line], index) => (
                      <motion.div
                        key={line}
                        initial={
                          reduceMotion
                            ? undefined
                            : { opacity: 0, x: speaker === "AI" ? -10 : 10 }
                        }
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: reduceMotion ? 0 : index * 0.14 }}
                        className={`max-w-[88%] rounded-xl px-4 py-3 text-sm leading-6 ${speaker === "AI" ? "bg-white/[0.055] text-slate-300" : "ml-auto bg-primary/10 text-slate-200 ring-1 ring-primary/15"}`}
                      >
                        <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-primary">
                          {speaker}
                        </span>
                        {line}
                      </motion.div>
                    ))
                  ) : (
                    <div className="grid min-h-[190px] place-items-center text-center">
                      <div>
                        <p className="font-medium text-white">
                          Preview an AI-handled call
                        </p>
                        <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500">
                          Choose a scenario, then start the conversation to see
                          VoxaDesk respond.
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-white/[0.08] bg-white/[0.02] px-5 py-4 sm:px-6">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-600">
                  Expected outcome
                </p>
                <p className="mt-1 text-xs font-medium text-slate-300">
                  {current.outcome}
                </p>
              </div>
              <Button
                type="button"
                onClick={() => setActive((value) => !value)}
                className="min-w-32"
              >
                {active ? "Reset preview" : "Start preview"}
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
