"use client";

import type { LucideIcon } from "lucide-react";
import { AlertCircle, Inbox, Sparkles } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const dashboardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.055, delayChildren: 0.04 },
  },
};

export const dashboardItemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] },
  },
};

export function DashboardPage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={cn("relative mx-auto max-w-7xl pb-10", className)}
      variants={reduceMotion ? undefined : dashboardContainerVariants}
      initial={reduceMotion ? undefined : "hidden"}
      animate={reduceMotion ? undefined : "visible"}
    >
      <div
        className="pointer-events-none absolute -right-20 -top-16 size-72 rounded-full bg-primary/[0.045] blur-[110px]"
        aria-hidden="true"
      />
      {children}
    </motion.div>
  );
}

export function DashboardItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reduceMotion ? undefined : dashboardItemVariants}
    >
      {children}
    </motion.div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  icon: Icon = Sparkles,
  actions,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  actions?: ReactNode;
}) {
  return (
    <DashboardItem>
      <header className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            <span className="grid size-7 place-items-center rounded-lg border border-primary/20 bg-primary/10">
              <Icon size={14} aria-hidden="true" />
            </span>
            {eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </header>
    </DashboardItem>
  );
}

export function SectionCard({
  title,
  description,
  icon: Icon,
  action,
  children,
  className,
}: {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "dashboard-card relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#090e19]/95 p-5 shadow-[0_18px_55px_rgba(0,0,0,0.18)] sm:p-6",
        className,
      )}
    >
      {(title || action) && (
        <div className="relative flex flex-wrap items-start justify-between gap-3">
          <div>
            {title && (
              <h2 className="flex items-center gap-2 text-base font-semibold text-white sm:text-lg">
                {Icon && <Icon size={18} className="text-primary" />}
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-1 text-sm leading-6 text-slate-400">
                {description}
              </p>
            )}
          </div>
          {action}
        </div>
      )}
      <div className={title || action ? "relative mt-5" : "relative"}>
        {children}
      </div>
    </section>
  );
}

export function SummaryCard({
  label,
  value,
  detail,
  icon: Icon,
  tone = "mint",
}: {
  label: string;
  value: ReactNode;
  detail?: string;
  icon: LucideIcon;
  tone?: "mint" | "blue" | "violet" | "amber" | "rose";
}) {
  const styles = {
    mint: "border-primary/20 from-primary/[0.1] text-primary",
    blue: "border-sky-400/20 from-sky-400/[0.1] text-sky-300",
    violet: "border-violet-400/20 from-violet-400/[0.1] text-violet-300",
    amber: "border-amber-400/20 from-amber-400/[0.1] text-amber-300",
    rose: "border-rose-400/20 from-rose-400/[0.1] text-rose-300",
  };
  const reduceMotion = useReducedMotion();
  return (
    <motion.article
      className={cn(
        "dashboard-card rounded-2xl border bg-linear-to-br via-[#090e19] to-[#090e19] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.16)]",
        styles[tone],
      )}
      variants={reduceMotion ? undefined : dashboardItemVariants}
      whileHover={reduceMotion ? undefined : { y: -3 }}
    >
      <span className="grid size-10 place-items-center rounded-xl border border-current/20 bg-current/10">
        <Icon size={18} aria-hidden="true" />
      </span>
      <p className="mt-5 text-sm text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight text-white">
        {value}
      </p>
      {detail && <p className="mt-1 text-xs text-slate-500">{detail}</p>}
    </motion.article>
  );
}

const statusStyles = {
  success: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  warning: "border-amber-400/20 bg-amber-400/10 text-amber-200",
  danger: "border-red-400/20 bg-red-400/10 text-red-200",
  info: "border-sky-400/20 bg-sky-400/10 text-sky-200",
  neutral: "border-white/10 bg-white/[0.06] text-slate-300",
};

export function StatusBadge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: keyof typeof statusStyles;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider",
        statusStyles[tone],
      )}
    >
      {children}
    </span>
  );
}

export function EmptyState({
  title,
  description,
  icon: Icon = Inbox,
  action,
}: {
  title: string;
  description: string;
  icon?: LucideIcon;
  action?: ReactNode;
}) {
  return (
    <div className="grid min-h-48 place-items-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-6 text-center">
      <div>
        <span className="mx-auto grid size-12 place-items-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
          <Icon size={20} />
        </span>
        <h3 className="mt-4 font-semibold text-white">{title}</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-400">
          {description}
        </p>
        {action && <div className="mt-4">{action}</div>}
      </div>
    </div>
  );
}

export function DashboardSkeleton({
  label = "Loading workspace",
  cards = 3,
}: {
  label?: string;
  cards?: number;
}) {
  return (
    <div className="space-y-6" role="status" aria-label={label}>
      <span className="sr-only">{label}</span>
      <div className="h-24 animate-pulse rounded-2xl bg-white/[0.045] motion-reduce:animate-none" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: cards }, (_, index) => (
          <div
            key={index}
            className="h-44 animate-pulse rounded-2xl bg-white/[0.045] motion-reduce:animate-none"
          />
        ))}
      </div>
    </div>
  );
}

export function ErrorState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      role="alert"
      className="mx-auto mt-16 max-w-lg rounded-2xl border border-red-400/20 bg-red-400/[0.06] p-7 text-center"
    >
      <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-red-400/10 text-red-300">
        <AlertCircle size={20} />
      </span>
      <h1 className="mt-4 text-xl font-semibold text-white">{title}</h1>
      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
    </div>
  );
}

export function AnimatedList({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reduceMotion ? undefined : dashboardContainerVariants}
      initial={reduceMotion ? undefined : "hidden"}
      animate={reduceMotion ? undefined : "visible"}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedRow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={cn(
        "dashboard-row rounded-xl border border-white/[0.07] bg-white/[0.035] p-4",
        className,
      )}
      variants={reduceMotion ? undefined : dashboardItemVariants}
      whileHover={reduceMotion ? undefined : { y: -2 }}
    >
      {children}
    </motion.div>
  );
}
