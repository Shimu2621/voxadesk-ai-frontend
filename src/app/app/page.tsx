"use client";
import { Card } from "@/components/ui/card";
import { useGetDashboardQuery } from "@/lib/voxadesk-api";

export default function DashboardPage() {
  const { data, isLoading, error } = useGetDashboardQuery();
  if (isLoading) return <p>Loading dashboard…</p>;
  if (error || !data)
    return <p className="text-red-300">Dashboard could not be loaded.</p>;
  const metrics = [
    [
      "Conversations",
      String(data.metrics.totalConversations),
      "Production only",
    ],
    [
      "Booking rate",
      `${(data.metrics.bookingRate * 100).toFixed(1)}%`,
      "Confirmed outcomes",
    ],
    ["Qualified leads", String(data.metrics.qualifiedLeads), "Lead score 50+"],
    ["Open follow-ups", String(data.metrics.unresolvedTasks), "Needs review"],
  ];
  return (
    <>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm text-cyan-400">{data.organization.name}</p>
          <h1 className="mt-1 text-3xl font-bold">Good morning</h1>
          <p className="mt-2 text-slate-400">
            Here is how your receptionist is performing.
          </p>
        </div>
        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
          Agent healthy
        </span>
      </div>
      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(([label, value, detail]) => (
          <Card key={label}>
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-3 text-3xl font-black">{value}</p>
            <p className="mt-2 text-xs text-cyan-300">{detail}</p>
          </Card>
        ))}
      </section>
      <section className="mt-6 grid gap-4 lg:grid-cols-[2fr_1fr]">
        <Card>
          <h2 className="font-bold">Conversation volume</h2>
          <p className="mt-8 text-4xl font-black">
            {data.metrics.totalConversations}
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Production conversations; test sessions are excluded.
          </p>
        </Card>
        <Card>
          <h2 className="font-bold">Needs attention</h2>
          <div className="mt-5 space-y-4 text-sm">
            <div className="rounded-xl bg-white/5 p-3 text-slate-300">
              {data.metrics.unresolvedTasks} unresolved follow-up tasks
            </div>
            <div className="rounded-xl bg-white/5 p-3 text-slate-300">
              Average duration:{" "}
              {Math.round(data.metrics.averageDurationSeconds)} seconds
            </div>
            <div className="rounded-xl bg-white/5 p-3 text-slate-300">
              Estimated cost: ${Number(data.metrics.estimatedCost).toFixed(2)}
            </div>
          </div>
        </Card>
      </section>
    </>
  );
}
