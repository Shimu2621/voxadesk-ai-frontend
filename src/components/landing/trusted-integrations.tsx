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
      className="relative border-y border-white/[0.07] bg-white/[0.018] py-10"
      initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      aria-labelledby="integrations-title"
    >
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p
          id="integrations-title"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400"
        >
          Designed to work with your business stack
        </p>
      </div>
      <div className="relative mx-auto mt-7 max-w-6xl">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-slate-950 to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-slate-950 to-transparent sm:w-32" />
        <Marquee>
          {integrations.map(({ name, icon: Icon, color }) => (
            <div
              key={name}
              className="group flex min-w-[190px] items-center justify-center gap-3 rounded-xl border border-white/[0.08] bg-[#0e1220]/80 px-5 py-4 text-sm font-medium text-slate-300 backdrop-blur transition hover:border-primary/25 hover:bg-white/[0.06] hover:text-white"
            >
              <Icon className={color} size={19} aria-hidden="true" />
              {name}
            </div>
          ))}
        </Marquee>
      </div>
      <p className="mx-auto mt-5 max-w-xl px-6 text-center text-xs text-slate-500">
        Integration availability varies by plan and provider configuration.
      </p>
    </motion.section>
  );
}
