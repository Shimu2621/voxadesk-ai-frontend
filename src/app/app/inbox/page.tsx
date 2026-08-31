"use client";
import { useGetInboxQuery, useUpdateInboxMutation } from "@/lib/voxadesk-api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
export default function Page() {
  const { data, isLoading, error } = useGetInboxQuery();
  const [update, state] = useUpdateInboxMutation();
  return (
    <>
      <p className="text-sm text-cyan-400">Follow-up queue</p>
      <h1 className="mt-1 text-3xl font-bold">Operator inbox</h1>
      <Card className="mt-8">
        {isLoading && <p>Loading…</p>}
        {error && <p className="text-red-300">Inbox could not be loaded.</p>}
        <div className="space-y-3">
          {data?.data.map((task) => (
            <div
              key={task.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white/5 p-4"
            >
              <div>
                <p className="font-semibold">
                  {task.type} · {task.contact?.name ?? "Unknown caller"}
                </p>
                <p className="text-sm text-slate-400">
                  {task.priority} priority · {task.status}
                  {task.dueAt
                    ? ` · due ${new Date(task.dueAt).toLocaleString()}`
                    : ""}
                </p>
              </div>
              {task.status !== "RESOLVED" && (
                <Button
                  disabled={state.isLoading}
                  onClick={() =>
                    void update({ id: task.id, status: "RESOLVED" })
                  }
                >
                  Resolve
                </Button>
              )}
            </div>
          ))}
          {data?.data.length === 0 && (
            <p className="text-slate-400">No follow-up tasks.</p>
          )}
        </div>
      </Card>
    </>
  );
}
