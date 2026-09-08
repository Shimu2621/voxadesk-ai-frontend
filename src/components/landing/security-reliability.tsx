"use client";

import {
  Activity,
  Fingerprint,
  KeyRound,
  LockKeyhole,
  Radar,
  ShieldCheck,
  Webhook,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { MagicCard } from "@/components/magicui/magic-card";

const controls = [
  {
    icon: Fingerprint,
    title: "Tenant-isolated access",
    copy: "Workspace-aware authorization keeps organization data and actions scoped correctly.",
  },
  {
    icon: KeyRound,
    title: "Protected credentials",
    copy: "Provider credentials are encrypted and never returned through ordinary API responses.",
  },
  {
    icon: Webhook,
    title: "Verified event handling",
    copy: "Signature checks, replay protection, and safe URL policies guard integration traffic.",
  },
  {
    icon: Activity,
    title: "Observable reliability",
    copy: "Tracked deliveries, retries, metrics, and operational views make failures actionable.",
  },
] as const;

export function SecurityReliability() {
  const reduceMotion = useReducedMotion();
  return (
    <section
      id="security"
      className="relative overflow-hidden border-y border-white/[0.06] bg-[#080b14] px-6 py-24 sm:py-28"
      aria-labelledby="security-heading"
    >
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, x: -24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Security with operational depth
          </p>
          <h2
            id="security-heading"
            className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl"
          >
            Trust every action, not just every answer.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-400">
            VoxaDesk is designed to keep AI actions scoped, observable, and
            recoverable—from the first webhook to the final human handoff.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {[
              "Role-aware permissions",
              "Auditable outcomes",
              "Guarded provider access",
              "Safe human escalation",
            ].map((label, index) => (
              <motion.div
                key={label}
                className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3 text-xs text-slate-300"
                initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
              >
                <ShieldCheck size={15} className="text-primary" />
                {label}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="relative">
          <motion.div
            className="relative mx-auto grid aspect-square max-w-[480px] place-items-center"
            initial={reduceMotion ? undefined : { opacity: 0, scale: 0.92 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75 }}
            aria-hidden="true"
          >
            {[88, 66, 44].map((size, index) => (
              <motion.div
                key={size}
                className="absolute rounded-full border border-primary/[0.12]"
                style={{ width: `${size}%`, height: `${size}%` }}
                animate={
                  reduceMotion ? undefined : { rotate: index % 2 ? -360 : 360 }
                }
                transition={{
                  duration: 24 + index * 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <span className="absolute left-1/2 top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/70 shadow-[0_0_12px_var(--primary)]" />
              </motion.div>
            ))}
            <div className="absolute size-[76%] rounded-full bg-primary/[0.025] blur-2xl" />
            <motion.div
              className="relative z-10 grid size-28 place-items-center rounded-[2rem] border border-primary/25 bg-[#0b121b] text-primary shadow-[0_0_70px_oklch(0.82_0.16_170_/_0.14)]"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      boxShadow: [
                        "0 0 40px oklch(0.82 0.16 170 / .08)",
                        "0 0 80px oklch(0.82 0.16 170 / .18)",
                        "0 0 40px oklch(0.82 0.16 170 / .08)",
                      ],
                    }
              }
              transition={{ duration: 4, repeat: Infinity }}
            >
              <LockKeyhole size={42} strokeWidth={1.5} />
            </motion.div>
            <Radar
              className="absolute right-[11%] top-[18%] text-blue-300/70"
              size={20}
            />
            <KeyRound
              className="absolute bottom-[14%] left-[18%] text-violet-300/70"
              size={19}
            />
            <Webhook
              className="absolute bottom-[23%] right-[10%] text-amber-300/70"
              size={18}
            />
          </motion.div>
        </div>
      </div>

      <div className="relative mx-auto mt-14 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {controls.map(({ icon: Icon, title, copy }, index) => (
          <motion.div
            key={title}
            initial={reduceMotion ? undefined : { opacity: 0, y: 22 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: reduceMotion ? 0 : index * 0.08,
            }}
            whileHover={reduceMotion ? undefined : { y: -4 }}
          >
            <MagicCard className="relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b0f1a]/90 p-5">
              <div className="relative z-10">
                <Icon size={19} className="text-primary" />
                <h3 className="mt-5 text-base font-medium text-white">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{copy}</p>
              </div>
            </MagicCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
