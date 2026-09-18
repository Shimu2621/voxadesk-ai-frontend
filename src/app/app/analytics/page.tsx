"use client";

import { BarChart3, Clock3, Coins, ListTodo, PhoneCall } from "lucide-react";
import { useGetAnalyticsQuery } from "@/lib/voxadesk-api";
import { Card } from "@/components/ui/card";
import {
  AnimatedList,
  AnimatedRow,
  DashboardItem,
  DashboardPage,
  DashboardSkeleton,
  EmptyState,
  ErrorState,
  PageHeader,
} from "@/components/dashboard-ui";

export default function Page() {
  const { data, isLoading, error } = useGetAnalyticsQuery();
  if (isLoading)
    return <DashboardSkeleton label="Loading analytics" cards={4} />;
  if (error || !data)
    return (
      <ErrorState
        title="Analytics unavailable"
        description="Workspace analytics could not be loaded. Check the API connection and try again."
      />
    );
  const summary = data.data;
  const metrics = [
    {
      label: "Conversations",
      value: summary.totalConversations,
      icon: PhoneCall,
      tone: "text-primary",
      surface: "from-primary/[0.08]",
    },
    {
      label: "Average duration",
      value: `${Math.round(summary.averageDurationSeconds)}s`,
      icon: Clock3,
      tone: "text-sky-300",
      surface: "from-sky-400/[0.08]",
    },
    {
      label: "Estimated cost",
      value: `$${Number(summary.estimatedCost).toFixed(2)}`,
      icon: Coins,
      tone: "text-violet-300",
      surface: "from-violet-400/[0.08]",
    },
    {
      label: "Open follow-ups",
      value: summary.unresolvedTasks,
      icon: ListTodo,
      tone: "text-amber-300",
      surface: "from-amber-400/[0.08]",
    },
  ];
  return (
    <DashboardPage>
      <PageHeader
        eyebrow="Production conversations"
        title="Analytics"
        description="Understand conversation volume, outcomes, cost, and the follow-up load across your workspace."
        icon={BarChart3}
      />
      <DashboardItem className="mt-8">
        <section
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          aria-label="Analytics summary"
        >
          {metrics.map(({ label, value, icon: Icon, tone, surface }) => (
            <Card
              key={label}
              className={`bg-linear-to-br ${surface} to-[#090e19]`}
            >
              <Icon size={18} className={tone} aria-hidden="true" />
              <p className="mt-5 text-sm text-slate-400">{label}</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
                {value}
              </p>
            </Card>
          ))}
        </section>
      </DashboardItem>
      <DashboardItem>
        <Card className="mt-6">
          <h2 className="text-lg font-semibold">Conversation outcomes</h2>
          <p className="mt-1 text-sm text-slate-400">
            Completed production conversations grouped by result.
          </p>
          <AnimatedList className="mt-5 space-y-3">
            {summary.outcomes.map((item) => (
              <AnimatedRow
                key={item.outcome}
                className="flex items-center justify-between"
              >
                <span className="capitalize text-slate-200">
                  {item.outcome.replaceAll("_", " ")}
                </span>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                  {item.count}
                </span>
              </AnimatedRow>
            ))}
            {summary.outcomes.length === 0 && (
              <EmptyState
                title="No outcomes yet"
                description="Production outcomes will appear here as conversations are completed."
              />
            )}
          </AnimatedList>
        </Card>
      </DashboardItem>
    </DashboardPage>
  );
}
