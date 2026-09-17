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
        className="pointer-events-none absolute left-0 top-0 h-px w-48 bg-linear-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_14px_rgba(103,232,249,0.45)]"
        animate={reduceMotion ? undefined : { x: ["-15vw", "110vw"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute -top-32 left-1/2 size-80 -translate-x-1/2 rounded-full bg-primary/5 blur-[100px]"
        animate={
          reduceMotion
            ? undefined
            : { opacity: [0.35, 0.75, 0.35], scale: [0.9, 1.08, 0.9] }
        }
        transition={{ duration: 7, repeat: Infinity }}
        aria-hidden="true"
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
              className="group relative mt-6 inline-flex items-center gap-2 overflow-hidden pb-1 text-sm font-semibold text-primary hover:text-cyan-300"
            >
              Start building today{" "}
              <ArrowUpRight
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                size={15}
              />
              <motion.span
                className="absolute bottom-0 left-0 h-px w-full origin-left bg-linear-to-r from-primary via-cyan-300 to-transparent"
                animate={
                  reduceMotion
                    ? undefined
                    : { scaleX: [0.2, 1, 0.2], opacity: [0.35, 1, 0.35] }
                }
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                aria-hidden="true"
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
                  {column.links.map(([label, href], linkIndex) => (
                    <motion.li
                      key={label}
                      initial={reduceMotion ? undefined : { opacity: 0, x: -8 }}
                      whileInView={
                        reduceMotion ? undefined : { opacity: 1, x: 0 }
                      }
                      viewport={{ once: true }}
                      transition={{
                        delay: index * 0.08 + linkIndex * 0.045,
                      }}
                      whileHover={reduceMotion ? undefined : { x: 4 }}
                    >
                      <Link
                        href={href}
                        className="group/link inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-primary"
                      >
                        <span className="size-1 rounded-full bg-primary/0 transition group-hover/link:bg-primary group-hover/link:shadow-[0_0_7px_var(--primary)]" />
                        {label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          className="flex flex-col items-center justify-between gap-5 pt-7 text-center sm:flex-row sm:text-left"
          initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.2 }}
        >
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} VoxaDesk AI. Built for responsible
            customer automation.
          </p>
          <div className="flex items-center gap-3">
            <span className="mr-2 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-600">
              <motion.span
                className="inline-flex text-primary"
                animate={
                  reduceMotion
                    ? undefined
                    : { rotate: [0, 12, -8, 0], scale: [1, 1.18, 1] }
                }
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles size={11} />
              </motion.span>{" "}
              Always improving
            </span>
            <motion.a
              href="https://github.com/Shimu2621/voxadesk-ai-frontend"
              target="_blank"
              rel="noreferrer"
              aria-label="VoxaDesk AI on GitHub"
              className="grid size-8 place-items-center rounded-lg border border-white/8 text-slate-500 transition hover:border-primary/25 hover:text-primary"
              whileHover={
                reduceMotion ? undefined : { y: -2, rotate: 4, scale: 1.05 }
              }
              whileTap={reduceMotion ? undefined : { scale: 0.94 }}
            >
              <Github size={15} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
