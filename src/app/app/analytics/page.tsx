"use client";
import { useGetAnalyticsQuery } from "@/lib/voxadesk-api";
import { Card } from "@/components/ui/card";
export default function Page() {
  const { data, isLoading, error } = useGetAnalyticsQuery();
  if (isLoading) return <p>Loading analytics…</p>;
  if (error || !data)
    return <p className="text-red-300">Analytics could not be loaded.</p>;
  const summary = data.data;
  return (
    <>
      <p className="text-sm text-cyan-400">Production conversations</p>
      <h1 className="mt-1 text-3xl font-bold">Analytics</h1>
      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <p className="text-sm text-slate-400">Conversations</p>
          <p className="mt-3 text-3xl font-black">
            {summary.totalConversations}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-slate-400">Average duration</p>
          <p className="mt-3 text-3xl font-black">
            {Math.round(summary.averageDurationSeconds)}s
          </p>
        </Card>
        <Card>
          <p className="text-sm text-slate-400">Estimated cost</p>
          <p className="mt-3 text-3xl font-black">
            ${Number(summary.estimatedCost).toFixed(2)}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-slate-400">Open follow-ups</p>
          <p className="mt-3 text-3xl font-black">{summary.unresolvedTasks}</p>
        </Card>
      </section>
      <Card className="mt-6">
        <h2 className="font-bold">Outcomes</h2>
        <div className="mt-4 space-y-3">
          {summary.outcomes.map((item) => (
            <div
              key={item.outcome}
              className="flex justify-between rounded-lg bg-white/5 p-3"
            >
              <span>{item.outcome.replaceAll("_", " ")}</span>
              <span>{item.count}</span>
            </div>
          ))}
          {summary.outcomes.length === 0 && (
            <p className="text-slate-400">No production outcomes yet.</p>
          )}
        </div>
      </Card>
    </>
  );
}
