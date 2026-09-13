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
import { BorderBeam } from "@/components/magicui/border-beam";
import { MagicCard } from "@/components/magicui/magic-card";
import { SectionBadge } from "@/components/landing/section-badge";

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
      className="relative overflow-hidden border-y border-white/6 bg-[#080b14] px-6 py-24 sm:py-28"
      aria-labelledby="security-heading"
    >
      <motion.div
        className="pointer-events-none absolute -left-32 top-1/4 size-80 rounded-full bg-violet-500/6.5 blur-[110px]"
        animate={
          reduceMotion
            ? undefined
            : { x: [0, 120, 0], y: [0, 70, 0], opacity: [0.3, 0.65, 0.3] }
        }
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, x: -24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65 }}
        >
          <SectionBadge icon={ShieldCheck} tone="violet">
            Security with operational depth
          </SectionBadge>
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
                className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/2.5 px-4 py-3 text-xs text-slate-300"
                initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
              >
                <motion.span
                  className="text-primary"
                  animate={
                    reduceMotion
                      ? undefined
                      : { opacity: [0.5, 1, 0.5], scale: [0.9, 1.08, 0.9] }
                  }
                  transition={{
                    duration: 2.8,
                    delay: index * 0.45,
                    repeat: Infinity,
                  }}
                >
                  <ShieldCheck size={15} />
                </motion.span>
                {label}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="relative">
          <motion.div
            className="relative mx-auto grid aspect-square max-w-120 place-items-center"
            initial={reduceMotion ? undefined : { opacity: 0, scale: 0.92 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75 }}
            aria-hidden="true"
          >
            {!reduceMotion && (
              <motion.div
                className="absolute size-[88%] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,oklch(0.82_0.16_170/0.13)_342deg,transparent_360deg)] mask-[radial-gradient(circle,transparent_0%,black_38%,black_100%)]"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                aria-hidden="true"
              />
            )}
            {[0, 1].map((pulse) => (
              <motion.div
                key={pulse}
                className="absolute size-28 rounded-4xl border border-primary/25"
                animate={
                  reduceMotion
                    ? { opacity: 0.15 }
                    : { scale: [1, 2.7], opacity: [0.35, 0] }
                }
                transition={{
                  duration: 4.2,
                  delay: pulse * 2.1,
                  repeat: reduceMotion ? 0 : Infinity,
                  ease: "easeOut",
                }}
                aria-hidden="true"
              />
            ))}
            {[88, 66, 44].map((size, index) => (
              <motion.div
                key={size}
                className="absolute rounded-full border border-primary/12"
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
            <div className="absolute size-[76%] rounded-full bg-primary/2.5 blur-2xl" />
            <motion.div
              className="relative z-10 grid size-28 place-items-center rounded-4xl border border-primary/25 bg-[#0b121b] text-primary shadow-[0_0_70px_oklch(0.82_0.16_170/0.14)]"
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
              <motion.span
                className="absolute -right-1 -top-1 grid size-6 place-items-center rounded-full border border-[#0b121b] bg-primary text-[#06110f] shadow-[0_0_16px_var(--primary)]"
                animate={
                  reduceMotion
                    ? undefined
                    : { scale: [0.9, 1.12, 0.9], rotate: [0, 8, 0] }
                }
                transition={{ duration: 2.6, repeat: Infinity }}
              >
                <ShieldCheck size={13} strokeWidth={2.5} />
              </motion.span>
            </motion.div>
            {[
              {
                Icon: Radar,
                className: "right-[11%] top-[18%] text-blue-300/70",
                delay: 0,
              },
              {
                Icon: KeyRound,
                className: "bottom-[14%] left-[18%] text-violet-300/70",
                delay: 0.8,
              },
              {
                Icon: Webhook,
                className: "bottom-[23%] right-[10%] text-amber-300/70",
                delay: 1.6,
              },
            ].map(({ Icon, className, delay }) => (
              <motion.span
                key={className}
                className={`absolute ${className}`}
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, -5, 0],
                        opacity: [0.45, 1, 0.45],
                        scale: [0.92, 1.08, 0.92],
                      }
                }
                transition={{
                  duration: 3.6,
                  delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Icon size={20} />
              </motion.span>
            ))}
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
            <MagicCard className="relative h-full overflow-hidden rounded-2xl border border-white/8 bg-[#0b0f1a]/90 p-5">
              <BorderBeam
                colorFrom="#c4b5fd"
                colorTo="#58e8c7"
                delay={index * 0.85}
                duration={7.5}
              />
              <motion.span
                className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-linear-to-b from-primary/8 to-transparent"
                animate={
                  reduceMotion
                    ? { opacity: 0.25 }
                    : { y: ["-110%", "470%"], opacity: [0, 0.7, 0] }
                }
                transition={{
                  duration: 4.8,
                  delay: index * 0.75,
                  repeat: reduceMotion ? 0 : Infinity,
                  repeatDelay: 1.2,
                  ease: "easeInOut",
                }}
                aria-hidden="true"
              />
              <div className="relative z-10">
                <motion.span
                  className="inline-flex text-primary"
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          y: [0, -3, 0],
                          filter: [
                            "brightness(0.85)",
                            "brightness(1.35)",
                            "brightness(0.85)",
                          ],
                        }
                  }
                  transition={{
                    duration: 3.4,
                    delay: index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Icon size={19} />
                </motion.span>
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
