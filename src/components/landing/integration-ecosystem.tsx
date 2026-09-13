"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CircleDollarSign,
  Cloud,
  Database,
  Mail,
  Phone,
  Webhook,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MagicCard } from "@/components/magicui/magic-card";
import { SectionBadge } from "@/components/landing/section-badge";

const connections = {
  calendar: {
    label: "Calendars",
    icon: CalendarDays,
    color: "text-blue-300 border-blue-400/20 bg-blue-400/10",
    tools: ["Google Calendar", "Microsoft Outlook"],
    flow: [
      "Caller requests a time",
      "Availability is checked",
      "Appointment is confirmed",
    ],
  },
  telephony: {
    label: "Telephony",
    icon: Phone,
    color: "text-rose-300 border-rose-400/20 bg-rose-400/10",
    tools: ["Twilio", "Voice providers"],
    flow: [
      "Inbound call arrives",
      "AI handles the intent",
      "Call is resolved or transferred",
    ],
  },
  crm: {
    label: "CRM & data",
    icon: Database,
    color: "text-violet-300 border-violet-400/20 bg-violet-400/10",
    tools: ["CRM adapters", "Secure API"],
    flow: [
      "Lead details are captured",
      "Record is matched",
      "Owner receives context",
    ],
  },
  messaging: {
    label: "Email & SMS",
    icon: Mail,
    color: "text-amber-300 border-amber-400/20 bg-amber-400/10",
    tools: ["Email providers", "SMS follow-up"],
    flow: [
      "Conversation ends",
      "Summary is generated",
      "Follow-up is delivered",
    ],
  },
  payments: {
    label: "Payments",
    icon: CircleDollarSign,
    color: "text-emerald-300 border-emerald-400/20 bg-emerald-400/10",
    tools: ["Stripe", "Billing events"],
    flow: [
      "Plan event is received",
      "Access is evaluated",
      "Workspace stays in sync",
    ],
  },
  webhooks: {
    label: "Webhooks",
    icon: Webhook,
    color: "text-cyan-300 border-cyan-400/20 bg-cyan-400/10",
    tools: ["Inbound events", "Outbound actions"],
    flow: [
      "Verified event arrives",
      "Workflow is processed",
      "Delivery is tracked",
    ],
  },
} as const;
type Connection = keyof typeof connections;

export function IntegrationEcosystem() {
  const [selected, setSelected] = useState<Connection>("calendar");
  const reduceMotion = useReducedMotion();
  const current = connections[selected];
  return (
    <section
      id="integrations"
      className="relative overflow-hidden border-y border-white/6 bg-[#080b14] px-6 py-24 sm:py-28"
      aria-labelledby="ecosystem-heading"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-155 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/4 blur-[120px]" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.6 }}
        >
          <SectionBadge icon={Webhook} tone="blue">
            Connected by design
          </SectionBadge>
          <h2
            id="ecosystem-heading"
            className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl"
          >
            One AI layer across your customer stack.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400">
            Connect conversations to the calendars, providers, data, and
            workflows that keep your operation moving.
          </p>
        </motion.div>

        <svg
          className="pointer-events-none absolute inset-x-0 top-52 hidden h-130 w-full opacity-35 lg:block"
          viewBox="0 0 1200 520"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          {[80, 180, 285, 390, 490].map((y, index) => (
            <motion.path
              key={y}
              d={`M 360 ${y} C 520 ${y}, 545 260, 720 260`}
              stroke={index % 2 === 0 ? "#58e8c7" : "#7dd3fc"}
              strokeWidth="1"
              strokeDasharray="7 13"
              initial={{ opacity: 0, pathLength: 0 }}
              whileInView={{ opacity: 0.42, pathLength: 1 }}
              animate={
                reduceMotion ? undefined : { strokeDashoffset: [0, -80] }
              }
              viewport={{ once: true }}
              transition={{
                pathLength: { duration: 1.4, delay: index * 0.1 },
                opacity: { duration: 0.6, delay: index * 0.1 },
                strokeDashoffset: {
                  duration: 4 + index * 0.35,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            />
          ))}
        </svg>

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: reduceMotion ? 0 : 0.07 },
              },
            }}
          >
            {(Object.keys(connections) as Connection[]).map((key) => {
              const item = connections[key];
              const Icon = item.icon;
              const active = selected === key;
              return (
                <motion.button
                  key={key}
                  type="button"
                  onClick={() => setSelected(key)}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={reduceMotion ? undefined : { y: -3 }}
                  className={`relative overflow-hidden rounded-2xl border p-5 text-left transition ${active ? "border-primary/30 bg-primary/[0.07]" : "border-white/8 bg-white/2.5 hover:border-white/[0.14]"}`}
                  aria-pressed={active}
                >
                  {active && (
                    <>
                      <motion.span
                        layoutId="integration-active"
                        className="absolute inset-0 rounded-2xl bg-primary/2.5"
                        transition={{
                          type: "spring",
                          stiffness: 280,
                          damping: 28,
                        }}
                      />
                      <motion.span
                        className="absolute inset-x-4 bottom-0 h-px bg-primary shadow-[0_0_12px_var(--primary)]"
                        animate={
                          reduceMotion
                            ? undefined
                            : {
                                opacity: [0.4, 1, 0.4],
                                scaleX: [0.45, 1, 0.45],
                              }
                        }
                        transition={{ duration: 2.8, repeat: Infinity }}
                      />
                    </>
                  )}
                  <motion.span
                    className={`grid size-10 place-items-center rounded-xl border ${item.color}`}
                    animate={
                      active && !reduceMotion
                        ? {
                            y: [0, -3, 0],
                            rotate: [0, 3, 0],
                            scale: [1, 1.06, 1],
                          }
                        : undefined
                    }
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Icon size={18} />
                  </motion.span>
                  <span
                    className={`mt-4 block text-sm font-medium ${active ? "text-white" : "text-slate-300"}`}
                  >
                    {item.label}
                  </span>
                  <span className="mt-1 block text-[11px] text-slate-600">
                    {item.tools.join(" · ")}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>

          <MagicCard className="relative min-h-107.5 overflow-hidden rounded-2xl border border-white/9 bg-[#0b0f1a]/95 p-6 sm:p-8">
            <motion.div
              className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-primary/7.5 blur-[80px]"
              animate={
                reduceMotion
                  ? undefined
                  : { x: [0, -90, 0], y: [0, 70, 0], opacity: [0.3, 0.75, 0.3] }
              }
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            />
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                    Workflow preview
                  </p>
                  <h3 className="mt-2 text-xl font-medium text-white">
                    {current.label} automation
                  </h3>
                </div>
                <motion.span
                  className="relative grid size-10 place-items-center rounded-xl border border-primary/20 bg-primary/10 text-primary"
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          y: [0, -3, 0],
                          boxShadow: [
                            "0 0 0px transparent",
                            "0 0 22px oklch(0.82 0.16 170 / 0.2)",
                            "0 0 0px transparent",
                          ],
                        }
                  }
                  transition={{
                    duration: 3.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Cloud size={19} />
                  {!reduceMotion && (
                    <motion.span
                      className="absolute -inset-2 rounded-xl border border-primary/15"
                      animate={{ scale: [0.8, 1.35], opacity: [0.55, 0] }}
                      transition={{ duration: 2.6, repeat: Infinity }}
                      aria-hidden="true"
                    />
                  )}
                </motion.span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected}
                  initial={reduceMotion ? undefined : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="mt-10"
                >
                  <div className="space-y-4">
                    {current.flow.map((step, index) => (
                      <div
                        key={step}
                        className="relative flex items-center gap-4"
                      >
                        <div className="relative flex flex-col items-center self-stretch">
                          <motion.span
                            className="relative z-10 grid size-9 place-items-center rounded-full border border-primary/25 bg-[#0d1420] font-display text-xs font-semibold text-primary"
                            initial={
                              reduceMotion
                                ? undefined
                                : { scale: 0.7, opacity: 0 }
                            }
                            animate={
                              reduceMotion
                                ? { scale: 1, opacity: 1 }
                                : {
                                    scale: [1, 1.08, 1],
                                    opacity: 1,
                                    boxShadow: [
                                      "0 0 0px transparent",
                                      "0 0 18px oklch(0.82 0.16 170 / 0.2)",
                                      "0 0 0px transparent",
                                    ],
                                  }
                            }
                            transition={{
                              duration: 3.2,
                              delay: index * 0.55,
                              repeat: reduceMotion ? 0 : Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            {index + 1}
                          </motion.span>
                          {index < current.flow.length - 1 && (
                            <span className="absolute -bottom-4.5 top-9 w-px overflow-hidden bg-white/8">
                              <motion.span
                                className="block h-1/2 w-px bg-linear-to-b from-primary to-transparent"
                                animate={
                                  reduceMotion
                                    ? undefined
                                    : { y: ["-100%", "220%"] }
                                }
                                transition={{
                                  duration: 1.8,
                                  repeat: Infinity,
                                  delay: index * 0.4,
                                }}
                              />
                            </span>
                          )}
                        </div>
                        <motion.div
                          className="flex-1 rounded-xl border border-white/[0.07] bg-white/2.5 px-4 py-4"
                          initial={
                            reduceMotion ? undefined : { opacity: 0, y: 8 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.08 + index * 0.12 }}
                          whileHover={reduceMotion ? undefined : { x: 5 }}
                        >
                          <p className="text-sm font-medium text-slate-200">
                            {step}
                          </p>
                          <p className="mt-1 text-xs text-slate-600">
                            Secure, observable, and workspace-aware
                          </p>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 flex items-center gap-3 rounded-xl border border-primary/15 bg-primary/4.5 px-4 py-3">
                    <motion.span
                      className="size-2 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]"
                      animate={
                        reduceMotion
                          ? undefined
                          : { opacity: [0.4, 1, 0.4], scale: [0.8, 1.25, 0.8] }
                      }
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <p className="text-xs text-slate-400">
                      Every action is recorded as a traceable outcome.
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </MagicCard>
        </div>
        <div className="mt-7 flex justify-center">
          <Link
            href="/signup"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-cyan-300"
          >
            Connect your first workflow{" "}
            <ArrowRight
              className="transition-transform group-hover:translate-x-1"
              size={15}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
