"use client";

import { useState } from "react";
import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock3,
  PhoneCall,
  Users,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { BorderBeam } from "@/components/magicui/border-beam";
import { SectionBadge } from "@/components/landing/section-badge";

const views = {
  calls: {
    label: "Calls",
    icon: PhoneCall,
    stats: [
      ["Calls handled", "48", "+12%"],
      ["Avg. response", "0.8s", "Live"],
      ["Resolved by AI", "84%", "+6%"],
    ],
    bars: [38, 54, 43, 68, 58, 82, 74, 91, 66, 78],
    activity: [
      ["New patient appointment", "Booked", "2m"],
      ["Pricing inquiry", "Qualified", "8m"],
      ["Urgent service request", "Transferred", "14m"],
    ],
  },
  appointments: {
    label: "Appointments",
    icon: CalendarDays,
    stats: [
      ["Appointments", "21", "+18%"],
      ["Confirmation rate", "96%", "+4%"],
      ["Hours recovered", "7.5", "Today"],
    ],
    bars: [28, 42, 35, 61, 48, 73, 64, 86, 72, 92],
    activity: [
      ["Dental cleaning", "Confirmed", "10:30"],
      ["Property consultation", "Confirmed", "1:00"],
      ["Service estimate", "Pending", "3:45"],
    ],
  },
  analytics: {
    label: "Analytics",
    icon: BarChart3,
    stats: [
      ["Positive outcomes", "89%", "+9%"],
      ["Leads captured", "17", "+21%"],
      ["Human handoffs", "6", "Safe"],
    ],
    bars: [32, 46, 52, 44, 71, 65, 79, 72, 88, 94],
    activity: [
      ["Appointment intent", "42%", "Top intent"],
      ["New lead", "31%", "Growing"],
      ["Support request", "18%", "Stable"],
    ],
  },
} as const;

type View = keyof typeof views;

export function DashboardShowcase() {
  const [view, setView] = useState<View>("calls");
  const reduceMotion = useReducedMotion();
  const current = views[view];
  return (
    <section
      className="relative overflow-hidden border-y border-white/6 bg-[#080b14] px-6 py-24 sm:py-28"
      aria-labelledby="dashboard-heading"
    >
      <AnimatedGridPattern className="text-primary opacity-15 mask-[linear-gradient(to_bottom,transparent,black_30%,black_75%,transparent)]" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.6 }}
        >
          <SectionBadge icon={BarChart3} tone="cyan">
            One operational command center
          </SectionBadge>
          <h2
            id="dashboard-heading"
            className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl"
          >
            See every conversation become measurable work.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400">
            Monitor calls, appointments, outcomes, and handoffs from one focused
            workspace built for real-time teams.
          </p>
        </motion.div>

        <motion.div
          className="relative mt-14"
          initial={reduceMotion ? undefined : { opacity: 0, y: 30, rotateX: 3 }}
          whileInView={
            reduceMotion ? undefined : { opacity: 1, y: 0, rotateX: 0 }
          }
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <div className="pointer-events-none absolute -inset-6 rounded-4xl bg-primary/4.5 blur-3xl" />
          <motion.div
            className="pointer-events-none absolute -inset-y-10 -left-24 w-64 rounded-full bg-cyan-400/7.5 blur-[85px]"
            animate={
              reduceMotion
                ? undefined
                : { x: [0, 760, 0], opacity: [0.25, 0.65, 0.25] }
            }
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <Card className="relative overflow-hidden border-white/10 bg-[#090d17]/95 p-0 shadow-[0_35px_100px_rgba(0,0,0,0.45)]">
            <BorderBeam duration={8} colorFrom="#58e8c7" colorTo="#22d3ee" />
            {!reduceMotion && (
              <motion.div
                className="pointer-events-none absolute inset-x-0 z-20 h-px bg-linear-to-r from-transparent via-primary/45 to-transparent shadow-[0_0_18px_oklch(0.82_0.16_170/0.2)]"
                animate={{ top: ["12%", "94%"], opacity: [0, 0.7, 0.7, 0] }}
                transition={{
                  duration: 6.5,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                  ease: "easeInOut",
                }}
                aria-hidden="true"
              />
            )}
            <div className="flex flex-col border-b border-white/8 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3 px-5 py-4 sm:px-6">
                <motion.span
                  className="relative flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20"
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          boxShadow: [
                            "0 0 0px transparent",
                            "0 0 18px oklch(0.82 0.16 170 / 0.18)",
                            "0 0 0px transparent",
                          ],
                        }
                  }
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <BarChart3 size={16} />
                  <motion.span
                    className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-primary ring-2 ring-[#090d17]"
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            opacity: [0.45, 1, 0.45],
                            scale: [0.85, 1.15, 0.85],
                          }
                    }
                    transition={{ duration: 1.8, repeat: Infinity }}
                    aria-hidden="true"
                  />
                </motion.span>
                <div>
                  <p className="text-sm font-medium text-white">
                    VoxaDesk overview
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Live workspace preview
                  </p>
                </div>
              </div>
              <div className="flex border-t border-white/[0.07] p-2 sm:border-l sm:border-t-0">
                {(Object.keys(views) as View[]).map((key) => {
                  const item = views[key];
                  const Icon = item.icon;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setView(key)}
                      className={`relative flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition sm:flex-none ${view === key ? "text-primary" : "text-slate-500 hover:text-slate-300"}`}
                      aria-pressed={view === key}
                    >
                      {view === key && (
                        <motion.span
                          layoutId="dashboard-tab"
                          className="absolute inset-0 rounded-lg bg-primary/10 ring-1 ring-primary/15"
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 30,
                          }}
                        />
                      )}
                      <Icon className="relative" size={14} />
                      <span className="relative">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="p-4 sm:p-6"
              >
                <div className="grid gap-3 sm:grid-cols-3">
                  {current.stats.map(([label, value, trend], index) => (
                    <motion.div
                      key={label}
                      initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.07 }}
                      className="relative overflow-hidden rounded-xl border border-white/[0.07] bg-white/2.5 p-4"
                    >
                      <motion.span
                        className="pointer-events-none absolute -right-8 -top-8 size-20 rounded-full bg-primary/[0.07] blur-xl"
                        animate={
                          reduceMotion
                            ? undefined
                            : {
                                opacity: [0.25, 0.7, 0.25],
                                scale: [0.8, 1.15, 0.8],
                              }
                        }
                        transition={{
                          duration: 4.5,
                          delay: index * 0.6,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        aria-hidden="true"
                      />
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-slate-500">{label}</p>
                        <span className="text-[10px] font-medium text-primary">
                          {trend}
                        </span>
                      </div>
                      <p className="mt-3 font-display text-2xl font-semibold text-white">
                        {value}
                      </p>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
                  <div className="rounded-xl border border-white/[0.07] bg-white/2.5 p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">
                          Conversation volume
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Illustrative activity · today
                        </p>
                      </div>
                      <Clock3 size={16} className="text-slate-600" />
                    </div>
                    <div className="mt-8 flex h-40 items-end gap-2 sm:gap-3">
                      {current.bars.map((height, index) => (
                        <div
                          key={index}
                          className="flex h-full flex-1 items-end"
                        >
                          <motion.div
                            className="dashboard-live-bar relative w-full overflow-hidden rounded-t bg-linear-to-t from-primary/25 to-primary"
                            initial={{
                              height: reduceMotion ? `${height}%` : 0,
                            }}
                            animate={{ height: `${height}%` }}
                            transition={{
                              duration: 0.55,
                              delay: reduceMotion ? 0 : index * 0.035,
                              ease: "easeOut",
                            }}
                          >
                            <span
                              className="dashboard-bar-shine"
                              aria-hidden="true"
                            />
                          </motion.div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/[0.07] bg-white/2.5 p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-white">
                        Recent outcomes
                      </p>
                      <Users size={16} className="text-slate-600" />
                    </div>
                    <div className="mt-5 space-y-3">
                      {current.activity.map(([title, status, time], index) => (
                        <motion.div
                          key={title}
                          initial={
                            reduceMotion ? undefined : { opacity: 0, x: 12 }
                          }
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.12 + index * 0.08 }}
                          className="flex items-center gap-3 rounded-lg border border-white/6 bg-black/10 p-3"
                        >
                          <motion.span
                            className="shrink-0 text-primary"
                            animate={
                              reduceMotion
                                ? undefined
                                : {
                                    opacity: [0.45, 1, 0.45],
                                    scale: [0.9, 1.08, 0.9],
                                  }
                            }
                            transition={{
                              duration: 2.6,
                              delay: index * 0.45,
                              repeat: Infinity,
                            }}
                          >
                            <CheckCircle2 size={15} />
                          </motion.span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-medium text-slate-300">
                              {title}
                            </p>
                            <p className="mt-1 text-[10px] text-slate-600">
                              {status}
                            </p>
                          </div>
                          <span className="text-[10px] text-slate-600">
                            {time}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </Card>
          <p className="mt-4 text-center text-[11px] text-slate-600">
            Interface preview shown with illustrative data.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
