"use client";

import {
  AudioWaveform,
  CalendarDays,
  CreditCard,
  Mail,
  Phone,
  Webhook,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Marquee } from "@/components/magicui/marquee";
import { SectionBadge } from "@/components/landing/section-badge";

const integrations = [
  { name: "Google Calendar", icon: CalendarDays, color: "text-blue-300" },
  { name: "Microsoft Outlook", icon: Mail, color: "text-sky-300" },
  { name: "Twilio", icon: Phone, color: "text-rose-300" },
  { name: "ElevenLabs", icon: AudioWaveform, color: "text-violet-300" },
  { name: "Stripe", icon: CreditCard, color: "text-indigo-300" },
  { name: "Webhooks", icon: Webhook, color: "text-primary" },
] as const;

export function TrustedIntegrations() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.section
      className="relative isolate overflow-hidden border-y border-white/[0.07] bg-white/[0.018] py-12 sm:py-16"
      initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      aria-labelledby="integrations-title"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.82_0.16_170/0.055),transparent_48%)]"
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute inset-y-0 w-1/3 bg-linear-to-r from-transparent via-cyan-300/4.5 to-transparent blur-2xl"
        initial={reduceMotion ? { left: "33%" } : { left: "-35%" }}
        animate={reduceMotion ? undefined : { left: ["-35%", "110%"] }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-6  text-center">
        <SectionBadge id="integrations-title" icon={Webhook} tone="blue">
          Designed to work with your business stack
        </SectionBadge>
      </div>
      <div className="relative mx-auto mt-8 max-w-6xl space-y-3">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r from-slate-950 to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-slate-950 to-transparent sm:w-32" />
        <Marquee className="py-2 [--duration:36s]">
          {integrations.map(({ name, icon: Icon, color }) => (
            <div
              key={name}
              className="integration-chip group flex min-w-47.5 items-center justify-center gap-3 rounded-xl px-5 py-4 text-sm font-medium text-slate-300 backdrop-blur"
            >
              <span className="integration-icon relative grid size-8 place-items-center rounded-lg border border-white/8 bg-white/[0.035]">
                <Icon className={color} size={17} aria-hidden="true" />
              </span>
              <span className="relative">{name}</span>
            </div>
          ))}
        </Marquee>
        <div aria-hidden="true">
          <Marquee className="py-2 [--duration:40s]" reverse>
            {[...integrations].reverse().map(({ name, icon: Icon, color }) => (
              <div
                key={`secondary-${name}`}
                className="integration-chip group flex min-w-47.5 items-center justify-center gap-3 rounded-xl px-5 py-4 text-sm font-medium text-slate-300 backdrop-blur"
              >
                <span className="integration-icon relative grid size-8 place-items-center rounded-lg border border-white/8 bg-white/[0.035]">
                  <Icon className={color} size={17} aria-hidden="true" />
                </span>
                <span className="relative">{name}</span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
      <p className="relative mx-auto mt-5 max-w-xl px-6 text-center text-xs text-slate-500">
        Integration availability varies by plan and provider configuration.
      </p>
    </motion.section>
  );
}
