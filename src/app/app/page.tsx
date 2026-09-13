"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Bot,
  CalendarCheck2,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Headphones,
  ListTodo,
  PhoneCall,
  Sparkles,
  TrendingUp,
  UserRoundCheck,
  Users,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { BorderBeam } from "@/components/magicui/border-beam";
import { AvatarCircles } from "@/components/magicui/avatar-circles";
import { MagicCard } from "@/components/magicui/magic-card";
import { Card } from "@/components/ui/card";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useGetDashboardQuery } from "@/lib/voxadesk-api";

const periods = ["7 days", "30 days", "90 days"] as const;
type Period = (typeof periods)[number];

const chartPatterns: Record<Period, number[]> = {
  "7 days": [42, 58, 48, 72, 64, 88, 78],
  "30 days": [35, 48, 43, 58, 52, 68, 61, 77, 69, 83, 76, 92],
  "90 days": [29, 37, 34, 46, 43, 55, 51, 64, 59, 72, 68, 80, 75, 88],
};

const quickActions = [
  {
    label: "Create AI agent",
    copy: "Configure a new receptionist",
    href: "/app/agents",
    icon: Bot,
    tone: "text-primary bg-primary/10 border-primary/20",
  },
  {
    label: "Review calls",
    copy: "Inspect transcripts and outcomes",
    href: "/app/calls",
    icon: Headphones,
    tone: "text-blue-300 bg-blue-400/10 border-blue-400/20",
  },
  {
    label: "Manage knowledge",
    copy: "Keep agent answers accurate",
    href: "/app/knowledge",
    icon: Sparkles,
    tone: "text-violet-300 bg-violet-400/10 border-violet-400/20",
  },
] as const;

const teamAvatars = [
  {
    name: "Customer success specialist",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80",
  },
  {
    name: "Operations manager",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80",
  },
  {
    name: "AI workflow specialist",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&q=80",
  },
] as const;

function DashboardSkeleton() {
  return (
    <div className="space-y-7" aria-label="Loading dashboard" role="status">
      <div className="h-24 animate-pulse rounded-2xl bg-white/[0.04]" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-2xl bg-white/[0.04]"
          />
        ))}
      </div>
      <div className="h-96 animate-pulse rounded-2xl bg-white/[0.04]" />
    </div>
  );
}

function DashboardBadge({
  icon: Icon,
  children,
  className,
  delay = 0,
}: {
  icon: LucideIcon;
  children: string;
  className: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      className={`group/badge relative inline-flex items-center gap-2 overflow-hidden rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] ${className}`}
      initial={reduceMotion ? undefined : { opacity: 0, scale: 0.92, y: 4 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={reduceMotion ? undefined : { y: -1, scale: 1.025 }}
      transition={{ duration: 0.35, delay }}
    >
      <motion.span
        className="pointer-events-none absolute inset-y-0 w-8 skew-x-[-18deg] bg-linear-to-r from-transparent via-white/30 to-transparent"
        animate={reduceMotion ? undefined : { x: ["-250%", "650%"] }}
        transition={{
          duration: 3.4,
          delay: 0.8 + delay,
          repeat: Infinity,
          repeatDelay: 2.6,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />
      <motion.span
        className="relative inline-flex"
        animate={reduceMotion ? undefined : { rotate: [0, 8, -5, 0] }}
        transition={{
          duration: 4.2,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Icon size={12} aria-hidden="true" />
      </motion.span>
      <span className="relative">{children}</span>
    </motion.span>
  );
}

export default function DashboardPage() {
  const { data, isLoading, error, refetch } = useGetDashboardQuery();
  const [period, setPeriod] = useState<Period>("30 days");
  const [activeBar, setActiveBar] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const chart = useMemo(() => chartPatterns[period], [period]);

  if (isLoading) return <DashboardSkeleton />;
  if (error || !data)
    return (
      <Card className="mx-auto mt-20 max-w-lg border-red-400/20 bg-red-400/[0.05] text-center">
        <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-red-400/10 text-red-300">
          <Zap size={20} />
        </div>
        <h1 className="mt-4 text-xl font-semibold">Dashboard unavailable</h1>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          We could not reach your VoxaDesk workspace. Check the backend and try
          again.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-5 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:brightness-110"
        >
          Try again
        </button>
      </Card>
    );

  const metrics = [
    {
      label: "Conversations",
      value: String(data.metrics.totalConversations),
      detail: "Production calls",
      icon: PhoneCall,
      accent: "text-primary bg-primary/10 border-primary/20",
      surface:
        "border-primary/20 bg-linear-to-br from-primary/[0.09] via-[#0a0f1b] to-[#0a0f1b]",
      glow: "bg-primary/15",
    },
    {
      label: "Booking rate",
      value: `${(data.metrics.bookingRate * 100).toFixed(1)}%`,
      detail: "Confirmed outcomes",
      icon: CalendarCheck2,
      accent: "text-blue-300 bg-blue-400/10 border-blue-400/20",
      surface:
        "border-blue-400/20 bg-linear-to-br from-blue-400/[0.09] via-[#0a0f1b] to-[#0a0f1b]",
      glow: "bg-blue-400/15",
    },
    {
      label: "Qualified leads",
      value: String(data.metrics.qualifiedLeads),
      detail: "Lead score 50+",
      icon: UserRoundCheck,
      accent: "text-violet-300 bg-violet-400/10 border-violet-400/20",
      surface:
        "border-violet-400/20 bg-linear-to-br from-violet-400/[0.09] via-[#0a0f1b] to-[#0a0f1b]",
      glow: "bg-violet-400/15",
    },
    {
      label: "Open follow-ups",
      value: String(data.metrics.unresolvedTasks),
      detail: data.metrics.unresolvedTasks ? "Needs review" : "All clear",
      icon: ListTodo,
      accent: "text-amber-300 bg-amber-400/10 border-amber-400/20",
      surface:
        "border-amber-400/20 bg-linear-to-br from-amber-400/[0.09] via-[#0a0f1b] to-[#0a0f1b]",
      glow: "bg-amber-400/15",
    },
  ] as const;
  const attentionItems: Array<{
    label: string;
    value: string;
    icon: LucideIcon;
    href: string;
    tone: string;
    surface: string;
  }> = [
    {
      label: "Unresolved follow-ups",
      value: String(data.metrics.unresolvedTasks),
      icon: ListTodo,
      href: "/app/inbox",
      tone: "border-violet-400/20 bg-violet-400/10 text-violet-300",
      surface: "hover:border-violet-400/25 hover:bg-violet-400/[0.045]",
    },
    {
      label: "Average call duration",
      value: `${Math.round(data.metrics.averageDurationSeconds)}s`,
      icon: Clock3,
      href: "/app/calls",
      tone: "border-blue-400/20 bg-blue-400/10 text-blue-300",
      surface: "hover:border-blue-400/25 hover:bg-blue-400/[0.045]",
    },
    {
      label: "Estimated usage cost",
      value: `$${Number(data.metrics.estimatedCost).toFixed(2)}`,
      icon: CircleDollarSign,
      href: "/app/analytics",
      tone: "border-rose-400/20 bg-rose-400/10 text-rose-300",
      surface: "hover:border-rose-400/25 hover:bg-rose-400/[0.045]",
    },
  ];
  const totalConversations = Math.max(0, data.metrics.totalConversations);
  const bookingPercent = Math.min(
    100,
    Math.max(0, data.metrics.bookingRate * 100),
  );
  const estimatedBookings = Math.round(
    totalConversations * data.metrics.bookingRate,
  );
  const estimatedCost = Number(data.metrics.estimatedCost);
  const costPerConversation = totalConversations
    ? estimatedCost / totalConversations
    : 0;
  const leadRatio = totalConversations
    ? Math.min(100, (data.metrics.qualifiedLeads / totalConversations) * 100)
    : 0;
  const followUpRatio = totalConversations
    ? Math.min(100, (data.metrics.unresolvedTasks / totalConversations) * 100)
    : 0;
  const chartTotal = chart.reduce((sum, value) => sum + value, 0);
  const chartVolumes = chart.map((value) =>
    totalConversations
      ? Math.max(1, Math.round((value / chartTotal) * totalConversations))
      : 0,
  );
  const performanceRatios = [
    {
      label: "Booking outcomes",
      value: bookingPercent,
      display: `${bookingPercent.toFixed(1)}%`,
      color: "from-primary to-cyan-300",
    },
    {
      label: "Qualified leads",
      value: leadRatio,
      display: `${leadRatio.toFixed(1)}%`,
      color: "from-violet-400 to-blue-300",
    },
    {
      label: "Follow-up load",
      value: followUpRatio,
      display: `${followUpRatio.toFixed(1)}%`,
      color: "from-amber-400 to-orange-300",
    },
  ];

  return (
    <div className="relative mx-auto max-w-7xl pb-10">
      <div className="pointer-events-none absolute -right-24 -top-20 size-80 rounded-full bg-primary/[0.045] blur-[110px]" />

      <motion.header
        className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        initial={reduceMotion ? undefined : { opacity: 0, y: -12 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-50 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            {data.organization.name}
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
            Your AI front desk, at a glance.
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-400 sm:text-base">
            Monitor conversations, outcomes, and the work that needs your team.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <RainbowButton
            asChild
            variant="outline"
            className="rounded-full px-3 py-2 text-xs"
          >
            <span role="status">
              <CheckCircle2 size={14} /> Systems operational
            </span>
          </RainbowButton>
          <RainbowButton asChild className="group py-2.5">
            <Link href="/app/agents">
              Manage agent
              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </RainbowButton>
        </div>
      </motion.header>

      <section
        className="relative mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        aria-label="Workspace metrics"
      >
        {metrics.map(
          (
            { label, value, detail, icon: Icon, accent, surface, glow },
            index,
          ) => (
            <motion.div
              key={label}
              initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              whileHover={reduceMotion ? undefined : { y: -4 }}
            >
              <MagicCard
                className={`group relative h-full overflow-hidden rounded-2xl border p-5 shadow-[16px_-16px_60px_rgba(0,0,0,0.18)] ${surface}`}
              >
                <span
                  className={`pointer-events-none absolute -right-9 -top-9 size-28 rounded-full blur-2xl ${glow}`}
                  aria-hidden="true"
                />
                <div className="relative flex items-start justify-between">
                  <span
                    className={`grid size-10 place-items-center rounded-xl border transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:scale-105 ${accent}`}
                  >
                    <Icon size={18} />
                  </span>
                  <span
                    className={`${accent.split(" ")[0]} opacity-40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-80`}
                  >
                    <TrendingUp size={15} />
                  </span>
                </div>
                <p className="relative mt-5 text-sm text-slate-400">{label}</p>
                <div className="relative mt-2 flex items-end justify-between gap-3">
                  <p className="font-display text-3xl font-semibold tracking-tight text-white">
                    {value}
                  </p>
                  <p className="pb-1 text-[11px] text-slate-500">{detail}</p>
                </div>
              </MagicCard>
            </motion.div>
          ),
        )}
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_0.75fr]">
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          <MagicCard className="relative h-full overflow-hidden rounded-2xl border border-white/[0.09] bg-[#090e19]/95 p-5 sm:p-6">
            <BorderBeam duration={9} colorFrom="#58e8c7" colorTo="#38bdf8" />
            <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <DashboardBadge
                  icon={PhoneCall}
                  className="border-primary/20 bg-primary/10 text-primary"
                  delay={0.05}
                >
                  Conversation activity
                </DashboardBadge>
                <p className="mt-2 text-xs text-slate-500">
                  Operational trend based on current volume
                </p>
              </div>
              <div className="flex rounded-xl border border-white/[0.07] bg-black/20 p-1">
                {periods.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setPeriod(item)}
                    className={`relative rounded-lg px-3 py-1.5 text-[11px] font-medium transition ${period === item ? "text-slate-950" : "text-slate-500 hover:text-slate-300"}`}
                    aria-pressed={period === item}
                  >
                    {period === item && (
                      <motion.span
                        layoutId="dashboard-period"
                        className="absolute inset-0 rounded-lg bg-primary"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                    <span className="relative">{item}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-8 flex h-64 items-end gap-2 rounded-xl border border-white/[0.06] bg-black/15 px-4 pb-4 pt-8 sm:gap-3 sm:px-6">
              {[25, 50, 75].map((top) => (
                <div
                  key={top}
                  className="pointer-events-none absolute inset-x-4 border-t border-dashed border-white/[0.05]"
                  style={{ top: `${top}%` }}
                />
              ))}
              {chart.map((height, index) => (
                <div
                  key={`${period}-${index}`}
                  className="group/bar relative flex h-full flex-1 items-end"
                >
                  <motion.button
                    type="button"
                    aria-label={`Activity segment ${index + 1}: approximately ${chartVolumes[index]} conversations`}
                    onMouseEnter={() => setActiveBar(index)}
                    onMouseLeave={() => setActiveBar(null)}
                    onFocus={() => setActiveBar(index)}
                    onBlur={() => setActiveBar(null)}
                    className="relative w-full overflow-hidden rounded-t-md bg-linear-to-t from-primary/20 via-primary/55 to-cyan-300 shadow-[0_-5px_20px_oklch(0.82_0.16_170_/_0.08)]"
                    initial={{ height: reduceMotion ? `${height}%` : 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{
                      duration: 0.55,
                      delay: reduceMotion ? 0 : index * 0.035,
                      ease: "easeOut",
                    }}
                  >
                    <motion.span
                      className="absolute inset-x-0 h-1/3 bg-linear-to-b from-white/20 to-transparent"
                      animate={
                        reduceMotion ? undefined : { y: ["250%", "-120%"] }
                      }
                      transition={{
                        duration: 3.2,
                        delay: index * 0.08,
                        repeat: Infinity,
                        repeatDelay: 1.2,
                      }}
                    />
                  </motion.button>
                  {activeBar === index && (
                    <motion.span
                      initial={reduceMotion ? undefined : { opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-lg border border-primary/20 bg-slate-950 px-2.5 py-1.5 text-[10px] font-semibold text-white shadow-xl"
                    >
                      ~{chartVolumes[index]} calls
                    </motion.span>
                  )}
                </div>
              ))}
            </div>
            <div className="relative z-10 mt-4 flex items-center justify-between text-[10px] uppercase tracking-wider text-slate-600">
              <span>Earlier</span>
              <span>Illustrative distribution</span>
              <span>Today</span>
            </div>
          </MagicCard>
        </motion.div>

        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, x: 18 }}
          animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.28 }}
        >
          <Card className="relative h-full overflow-hidden border-amber-400/15 bg-[#090e19]/95 p-5 shadow-[18px_-18px_70px_rgba(251,191,36,0.035)] sm:p-6">
            <div
              className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-amber-400/[0.075] blur-3xl"
              aria-hidden="true"
            />
            <div className="flex items-center justify-between">
              <div>
                <DashboardBadge
                  icon={ListTodo}
                  className="border-amber-400/20 bg-amber-400/10 text-amber-300"
                  delay={0.12}
                >
                  Needs attention
                </DashboardBadge>
                <p className="mt-2 text-xs text-slate-500">
                  Live operational signals
                </p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {attentionItems.map(
                (
                  { label, value, icon: ItemIcon, href, tone, surface },
                  index,
                ) => (
                  <motion.div
                    key={label}
                    initial={reduceMotion ? undefined : { opacity: 0, x: 10 }}
                    animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                    transition={{ delay: 0.36 + index * 0.08 }}
                  >
                    <Link
                      href={href}
                      className={`group relative flex items-center gap-3 overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.025] p-3.5 transition ${surface}`}
                    >
                      <span
                        className={`grid size-9 shrink-0 place-items-center rounded-lg border transition-transform duration-200 group-hover:scale-105 ${tone}`}
                      >
                        <ItemIcon size={16} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs text-slate-400">
                          {label}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-white">
                          {value}
                        </p>
                      </div>
                      <span
                        className={`${tone.split(" ").at(-1)} opacity-40 transition group-hover:translate-x-0.5 group-hover:opacity-80`}
                      >
                        <ChevronRight size={15} />
                      </span>
                    </Link>
                  </motion.div>
                ),
              )}
            </div>
          </Card>
        </motion.div>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
        >
          <MagicCard className="relative h-full overflow-hidden rounded-2xl border border-rose-400/20 bg-linear-to-br from-rose-500/[0.075] via-[#090e19] to-[#090e19] p-6 shadow-[18px_-18px_70px_rgba(251,113,133,0.055)]">
            <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-rose-400/[0.11] blur-3xl" />
            <div className="flex items-start justify-between">
              <div>
                <DashboardBadge
                  icon={CalendarCheck2}
                  className="border-rose-400/25 bg-rose-400/10 text-rose-300"
                  delay={0.18}
                >
                  Booking performance
                </DashboardBadge>
                <p className="mt-2 text-xs text-slate-500">
                  Confirmed outcome efficiency
                </p>
              </div>
            </div>
            <div className="mt-7 flex flex-col items-center gap-7 sm:flex-row sm:justify-center">
              <div className="relative grid size-40 shrink-0 place-items-center">
                <svg
                  className="size-full -rotate-90"
                  viewBox="0 0 160 160"
                  role="img"
                  aria-label={`Booking rate ${bookingPercent.toFixed(1)} percent`}
                >
                  <circle
                    cx="80"
                    cy="80"
                    r="66"
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="12"
                  />
                  <motion.circle
                    cx="80"
                    cy="80"
                    r="66"
                    fill="none"
                    stroke="url(#booking-gradient)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    pathLength="100"
                    initial={{ strokeDasharray: "0 100" }}
                    whileInView={{
                      strokeDasharray: `${bookingPercent} 100`,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: reduceMotion ? 0 : 1.1,
                      ease: "easeOut",
                    }}
                  />
                  <defs>
                    <linearGradient id="booking-gradient">
                      <stop stopColor="#fb7185" />
                      <stop offset="1" stopColor="#f43f5e" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute text-center">
                  <p className="font-display text-3xl font-semibold text-white">
                    {bookingPercent.toFixed(1)}%
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">
                    booking rate
                  </p>
                </div>
              </div>
              <div className="grid w-full gap-3">
                {[
                  ["Estimated bookings", String(estimatedBookings)],
                  [
                    "Cost per conversation",
                    `$${costPerConversation.toFixed(2)}`,
                  ],
                  [
                    "Average duration",
                    `${Math.round(data.metrics.averageDurationSeconds)}s`,
                  ],
                ].map(([label, value], index) => (
                  <motion.div
                    key={label}
                    initial={reduceMotion ? undefined : { opacity: 0, x: 10 }}
                    whileInView={
                      reduceMotion ? undefined : { opacity: 1, x: 0 }
                    }
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-3"
                  >
                    <span className="text-xs text-slate-500">{label}</span>
                    <span className="text-sm font-semibold text-white">
                      {value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </MagicCard>
        </motion.div>

        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          <Card className="relative h-full overflow-hidden border-violet-400/15 bg-[#090e19]/95 p-6 shadow-[18px_-18px_70px_rgba(167,139,250,0.04)]">
            <div
              className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full bg-violet-400/[0.075] blur-3xl"
              aria-hidden="true"
            />
            <div className="flex items-start justify-between">
              <div>
                <DashboardBadge
                  icon={TrendingUp}
                  className="border-violet-400/20 bg-violet-400/10 text-violet-300"
                  delay={0.25}
                >
                  Performance ratios
                </DashboardBadge>
                <p className="mt-2 text-xs text-slate-500">
                  Relative to total production conversations
                </p>
              </div>
            </div>
            <div className="mt-8 space-y-7">
              {performanceRatios.map(
                ({ label, value, display, color }, index) => (
                  <div key={label}>
                    <div className="mb-2.5 flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-300">
                        {label}
                      </span>
                      <motion.span
                        key={display}
                        initial={
                          reduceMotion ? undefined : { opacity: 0, scale: 0.9 }
                        }
                        animate={{ opacity: 1, scale: 1 }}
                        className="font-display text-sm font-semibold text-white"
                      >
                        {display}
                      </motion.span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/[0.055]">
                      <motion.div
                        className={`relative h-full rounded-full bg-linear-to-r ${color}`}
                        initial={{ width: reduceMotion ? `${value}%` : 0 }}
                        whileInView={{ width: `${value}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: reduceMotion ? 0 : 0.9,
                          delay: index * 0.12,
                          ease: "easeOut",
                        }}
                      >
                        <motion.span
                          className="absolute inset-y-0 w-12 bg-linear-to-r from-transparent via-white/45 to-transparent"
                          animate={
                            reduceMotion ? undefined : { x: ["-100%", "500%"] }
                          }
                          transition={{
                            duration: 2.8,
                            delay: index * 0.4,
                            repeat: Infinity,
                            repeatDelay: 1.4,
                          }}
                        />
                      </motion.div>
                    </div>
                  </div>
                ),
              )}
            </div>
            <div className="mt-8 grid grid-cols-3 divide-x divide-white/[0.07] rounded-xl border border-white/[0.06] bg-black/15 py-4 text-center">
              <div>
                <p className="font-display text-lg font-semibold text-primary">
                  {estimatedBookings}
                </p>
                <p className="mt-1 text-[10px] text-slate-600">Booked</p>
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-violet-300">
                  {data.metrics.qualifiedLeads}
                </p>
                <p className="mt-1 text-[10px] text-slate-600">Qualified</p>
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-amber-300">
                  {data.metrics.unresolvedTasks}
                </p>
                <p className="mt-1 text-[10px] text-slate-600">Pending</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="relative overflow-hidden border-blue-400/15 bg-[#090e19]/95 p-5 shadow-[18px_-18px_70px_rgba(96,165,250,0.035)] sm:p-6">
          <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-blue-400/[0.065] blur-3xl" />
          <div className="flex items-center justify-between">
            <div>
              <DashboardBadge
                icon={Zap}
                className="border-blue-400/20 bg-blue-400/10 text-blue-300"
                delay={0.32}
              >
                Quick actions
              </DashboardBadge>
              <p className="mt-2 text-xs text-slate-500">
                Move your workspace forward
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {quickActions.map(({ label, copy, href, icon: Icon, tone }) => (
              <motion.div
                key={label}
                whileHover={reduceMotion ? undefined : { y: -3 }}
                transition={{ duration: 0.18 }}
              >
                <Link
                  href={href}
                  className="group block h-full rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 transition hover:border-primary/20"
                >
                  <span
                    className={`grid size-9 place-items-center rounded-lg border ${tone}`}
                  >
                    <Icon size={16} />
                  </span>
                  <p className="mt-4 text-sm font-medium text-white">{label}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {copy}
                  </p>
                  <ArrowUpRight
                    size={14}
                    className="mt-4 text-slate-700 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </Card>

        <MagicCard className="relative overflow-hidden rounded-2xl border border-primary/15 bg-primary/[0.035] p-5 sm:p-6">
          <BorderBeam
            duration={8.6}
            delay={3}
            colorFrom="#58e8c7"
            colorTo="#a78bfa"
          />
          <div className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative">
            <DashboardBadge
              icon={Users}
              className="border-primary/20 bg-primary/10 text-primary"
              delay={0.4}
            >
              Team performance
            </DashboardBadge>
            <h2 className="mt-5 text-xl font-semibold tracking-tight text-white">
              Ready for the next conversation.
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Your receptionist is healthy and your workspace is ready to
              capture the next customer opportunity.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <motion.div
                initial={reduceMotion ? undefined : { opacity: 0, x: -10 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <AvatarCircles avatars={[...teamAvatars]} extraCount={4} />
              </motion.div>
              <p className="text-xs text-slate-500">
                AI and human teams aligned
              </p>
            </div>
          </div>
        </MagicCard>
      </section>
    </div>
  );
}
