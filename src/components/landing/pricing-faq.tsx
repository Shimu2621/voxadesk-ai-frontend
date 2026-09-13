"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, ChevronDown, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { BorderBeam } from "@/components/magicui/border-beam";
import { MagicCard } from "@/components/magicui/magic-card";
import { SectionBadge } from "@/components/landing/section-badge";

const plans = [
  {
    name: "Starter",
    eyebrow: "Essential coverage",
    description: "For one team launching its first AI receptionist.",
    limits: [
      "1 active AI agent",
      "500 voice minutes / month",
      "3 workspace seats",
      "1 location and phone number",
    ],
    featured: false,
  },
  {
    name: "Growth",
    eyebrow: "Scaling operations",
    description: "For growing teams automating multiple customer workflows.",
    limits: [
      "5 active AI agents",
      "5,000 voice minutes / month",
      "15 workspace seats",
      "Up to 10 locations and numbers",
    ],
    featured: true,
  },
  {
    name: "Agency",
    eyebrow: "Multi-location scale",
    description: "For operators managing complex, high-volume workspaces.",
    limits: [
      "Up to 50 active AI agents",
      "50,000 voice minutes / month",
      "Up to 250 workspace seats",
      "Up to 100 locations and numbers",
    ],
    featured: false,
  },
] as const;

const faqs = [
  [
    "Can I test an agent before publishing?",
    "Yes. VoxaDesk supports private test conversations so your team can review behavior before an agent handles production traffic.",
  ],
  [
    "What happens when the AI should not continue?",
    "You can configure guarded escalation paths that transfer the conversation or create a prioritized callback with context for your team.",
  ],
  [
    "Can VoxaDesk connect to our existing tools?",
    "The platform supports provider adapters for calendars, telephony, billing, email, knowledge sources, and verified webhook workflows. Availability depends on your configuration.",
  ],
  [
    "How is usage controlled across plans?",
    "Each plan defines limits for active agents, seats, locations, phone numbers, monthly voice minutes, concurrency, and knowledge storage.",
  ],
  [
    "Are the results shown on this page guaranteed?",
    "No. Preview metrics and estimates are illustrative. Your actual outcomes depend on call volume, workflow design, provider availability, and customer behavior.",
  ],
] as const;

export function PricingFaq() {
  const [open, setOpen] = useState(0);
  const reduceMotion = useReducedMotion();
  return (
    <section
      id="pricing"
      className="relative overflow-hidden px-6 py-24 sm:py-28"
      aria-labelledby="pricing-heading"
    >
      <div className="pointer-events-none absolute left-1/2 top-32 size-140 -translate-x-1/2 rounded-full bg-primary/4.5 blur-[120px]" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.6 }}
        >
          <SectionBadge icon={Sparkles} tone="cyan">
            Plans for every stage
          </SectionBadge>
          <h2
            id="pricing-heading"
            className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl"
          >
            Start focused. Scale without rebuilding.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400">
            Choose the operating capacity that fits your team. Final billing
            terms are displayed securely before checkout.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={reduceMotion ? undefined : { opacity: 0, y: 28 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.55,
                delay: reduceMotion ? 0 : index * 0.1,
              }}
              whileHover={reduceMotion ? undefined : { y: -5 }}
            >
              <MagicCard
                className={`relative h-full overflow-hidden rounded-2xl border p-6 sm:p-7 ${plan.featured ? "border-primary/35 bg-primary/6.5 shadow-[0_24px_80px_oklch(0.82_0.16_170/0.08)]" : "border-white/8 bg-[#0b0f1a]/90"}`}
              >
                <BorderBeam
                  colorFrom={plan.featured ? "#58e8c7" : "#7dd3fc"}
                  colorTo={plan.featured ? "#f9a8d4" : "#c4b5fd"}
                  delay={index * 0.9}
                  duration={plan.featured ? 6.5 : 8}
                />
                {plan.featured && (
                  <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                    <Sparkles size={11} /> Recommended
                  </div>
                )}
                <div className="relative z-10 flex h-full flex-col">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                    {plan.eyebrow}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">
                    {plan.name}
                  </h3>
                  <p className="mt-3 min-h-12 text-sm leading-6 text-slate-400">
                    {plan.description}
                  </p>
                  <div className="my-6 h-px bg-white/[0.07]" />
                  <ul className="space-y-3">
                    {plan.limits.map((limit) => (
                      <li
                        key={limit}
                        className="flex items-start gap-2.5 text-sm text-slate-300"
                      >
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                          <Check size={12} />
                        </span>
                        {limit}
                      </li>
                    ))}
                  </ul>
                  <RainbowButton
                    asChild
                    variant={plan.featured ? "default" : "outline"}
                    className="mt-8 w-full"
                  >
                    <Link href="/signup">Choose {plan.name}</Link>
                  </RainbowButton>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </div>

        <div className="relative mx-auto mt-24 max-w-3xl">
          <motion.div
            className="pointer-events-none absolute -left-28 top-24 size-64 rounded-full bg-pink-400/5.5 blur-[90px]"
            animate={
              reduceMotion
                ? undefined
                : { x: [0, 110, 0], y: [0, 70, 0], opacity: [0.3, 0.7, 0.3] }
            }
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <motion.div
            className="relative text-center"
            initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionBadge icon={Sparkles} tone="pink">
              Frequently asked questions
            </SectionBadge>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
              Clear answers before you start.
            </h2>
          </motion.div>
          <motion.div
            className="relative mt-10 space-y-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: reduceMotion ? 0 : 0.08 },
              },
            }}
          >
            {faqs.map(([question, answer], index) => {
              const expanded = open === index;
              return (
                <motion.div
                  layout
                  key={question}
                  variants={{
                    hidden: { opacity: 0, y: 16, scale: 0.99 },
                    visible: { opacity: 1, y: 0, scale: 1 },
                  }}
                  transition={{ duration: 0.42, ease: "easeOut" }}
                  whileHover={reduceMotion ? undefined : { x: 4 }}
                  className={`relative overflow-hidden rounded-2xl border transition-colors duration-300 ${expanded ? "border-primary/30 bg-primary/5.5 shadow-[0_16px_45px_oklch(0.82_0.16_170/0.06)]" : "border-white/8 bg-white/[0.022] hover:border-white/15 hover:bg-white/[0.035]"}`}
                >
                  {expanded && (
                    <>
                      <BorderBeam
                        colorFrom="#f9a8d4"
                        colorTo="#58e8c7"
                        delay={index * 0.35}
                        duration={7}
                      />
                      <motion.span
                        layoutId="faq-active-glow"
                        className="pointer-events-none absolute -right-16 -top-20 size-44 rounded-full bg-primary/8 blur-3xl"
                      />
                    </>
                  )}
                  <button
                    type="button"
                    className="relative z-10 flex w-full items-center justify-between gap-6 px-5 py-5 text-left text-sm font-medium text-slate-200 hover:text-white sm:px-6"
                    onClick={() => setOpen(expanded ? -1 : index)}
                    aria-expanded={expanded}
                  >
                    <span className="flex items-center gap-3">
                      <motion.span
                        className={`size-1.5 shrink-0 rounded-full ${expanded ? "bg-primary shadow-[0_0_10px_var(--primary)]" : "bg-slate-700"}`}
                        animate={
                          expanded && !reduceMotion
                            ? {
                                opacity: [0.45, 1, 0.45],
                                scale: [0.8, 1.25, 0.8],
                              }
                            : undefined
                        }
                        transition={{ duration: 2, repeat: Infinity }}
                        aria-hidden="true"
                      />
                      {question}
                    </span>
                    <motion.span
                      animate={{
                        rotate: expanded ? 180 : 0,
                        scale: expanded ? 1.06 : 1,
                      }}
                      transition={{ duration: reduceMotion ? 0 : 0.25 }}
                      className={`grid size-8 shrink-0 place-items-center rounded-full border transition-colors ${expanded ? "border-primary/25 bg-primary/10 text-primary" : "border-white/8 bg-white/2.5 text-slate-500"}`}
                    >
                      <ChevronDown size={16} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {expanded && (
                      <motion.div
                        initial={
                          reduceMotion
                            ? undefined
                            : { height: 0, opacity: 0, filter: "blur(5px)" }
                        }
                        animate={{
                          height: "auto",
                          opacity: 1,
                          filter: "blur(0px)",
                        }}
                        exit={
                          reduceMotion
                            ? undefined
                            : { height: 0, opacity: 0, filter: "blur(4px)" }
                        }
                        transition={{ duration: 0.32, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="relative z-10 mx-5 mb-5 border-l border-primary/25 pl-4 sm:mx-6">
                          <p className="max-w-2xl text-sm leading-6 text-slate-400">
                            {answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          className="relative mt-24 overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-br from-primary/11 via-[#0c111b] to-violet-500/8 px-6 py-14 text-center sm:px-12 sm:py-16"
          initial={
            reduceMotion ? undefined : { opacity: 0, y: 24, scale: 0.985 }
          }
          whileInView={
            reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }
          }
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65 }}
        >
          <BorderBeam colorFrom="#58e8c7" colorTo="#f9a8d4" duration={8.5} />
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 size-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/15"
            animate={
              reduceMotion ? undefined : { scale: [1, 1.5], opacity: [0.5, 0] }
            }
            transition={{ duration: 3.5, repeat: Infinity }}
          />
          <div className="relative">
            <h2 className="text-3xl font-semibold tracking-[-0.035em] text-white sm:text-5xl">
              Your next customer is already calling.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
              Give every conversation a fast, helpful, and measurable next step
              with VoxaDesk AI.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <RainbowButton asChild>
                <Link href="/signup">Build your AI receptionist</Link>
              </RainbowButton>
              <RainbowButton asChild variant="outline">
                <Link href="/demo">Try the voice demo</Link>
              </RainbowButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
