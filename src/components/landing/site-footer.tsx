"use client";

import Link from "next/link";
import { ArrowUpRight, Github, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { BrandLogo } from "@/components/brand-logo";

const columns = [
  {
    title: "Product",
    links: [
      ["Voice demo", "/demo"],
      ["Integrations", "#integrations"],
      ["Security", "#security"],
      ["Plans", "#pricing"],
    ],
  },
  {
    title: "Platform",
    links: [
      ["AI agents", "/app/agents"],
      ["Analytics", "/app/analytics"],
      ["Knowledge", "/app/knowledge"],
      ["Operations", "/app/operations"],
    ],
  },
  {
    title: "Get started",
    links: [
      ["Create account", "/signup"],
      ["Log in", "/login"],
      ["Try the demo", "/demo"],
      ["Dashboard", "/app"],
    ],
  },
] as const;

export function SiteFooter() {
  const reduceMotion = useReducedMotion();
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-[#060810] px-6 pb-8 pt-16">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-linear-to-r from-transparent via-primary/60 to-transparent" />
      <motion.div
        className="pointer-events-none absolute -top-32 left-1/2 size-80 -translate-x-1/2 rounded-full bg-primary/5 blur-[100px]"
        animate={
          reduceMotion
            ? undefined
            : { opacity: [0.35, 0.75, 0.35], scale: [0.9, 1.08, 0.9] }
        }
        transition={{ duration: 7, repeat: Infinity }}
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 border-b border-white/[0.07] pb-14 lg:grid-cols-[1.4fr_2fr]">
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <BrandLogo />
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
              The operational AI receptionist for teams that want every customer
              conversation answered, understood, and moved forward.
            </p>
            <Link
              href="/signup"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-cyan-300"
            >
              Start building today{" "}
              <ArrowUpRight
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                size={15}
              />
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((column, index) => (
              <motion.div
                key={column.title}
                initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: reduceMotion ? 0 : index * 0.08,
                }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                  {column.title}
                </p>
                <ul className="mt-5 space-y-3">
                  {column.links.map(([label, href]) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-sm text-slate-400 transition hover:text-primary"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-5 pt-7 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} VoxaDesk AI. Built for responsible
            customer automation.
          </p>
          <div className="flex items-center gap-3">
            <span className="mr-2 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-600">
              <Sparkles size={11} className="text-primary" /> Always improving
            </span>
            <a
              href="https://github.com/Shimu2621/voxadesk-ai-frontend"
              target="_blank"
              rel="noreferrer"
              aria-label="VoxaDesk AI on GitHub"
              className="grid size-8 place-items-center rounded-lg border border-white/8 text-slate-500 transition hover:border-primary/25 hover:text-primary"
            >
              <Github size={15} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
