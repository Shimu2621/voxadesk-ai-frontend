"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  useGetOperationsHealthQuery,
  useGetWebhookDeliveriesQuery,
  useReplayWebhookDeliveryMutation,
} from "@/lib/voxadesk-api";

export default function OperationsPage() {
  const health = useGetOperationsHealthQuery(undefined, {
    pollingInterval: 15_000,
    skipPollingIfUnfocused: true,
  });
  const deliveries = useGetWebhookDeliveriesQuery(undefined, {
    pollingInterval: 15_000,
    skipPollingIfUnfocused: true,
  });
  const [replay, replayState] = useReplayWebhookDeliveryMutation();
  if (health.isLoading) return <p>Loading operations…</p>;
  if (health.error)
    return (
      <p className="text-red-300">
        Operations data is available to workspace owners only.
      </p>
    );
  return (
    <>
      <p className="text-sm text-cyan-400">Reliability and provider state</p>
      <h1 className="mt-1 text-3xl font-bold">Operations</h1>
      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {health.data?.data.queues.map((queue) => (
          <Card key={queue.queue}>
            <h2 className="font-semibold">{queue.queue}</h2>
            <p className="mt-3 text-sm text-slate-400">
              Waiting {queue.waiting} · Active {queue.active} · Delayed{" "}
              {queue.delayed}
            </p>
            <p
              className={
                queue.failed ? "mt-2 text-red-300" : "mt-2 text-emerald-300"
              }
            >
              {queue.failed} permanently failed
            </p>
          </Card>
        ))}
      </section>
      <Card className="mt-6">
        <h2 className="font-bold">Provider health</h2>
        <div className="mt-4 space-y-2">
          {health.data?.data.providers.map((provider) => (
            <p key={provider.id} className="rounded-lg bg-white/5 p-3 text-sm">
              {provider.provider} · {provider.status}
              {provider.latencyMs != null ? ` · ${provider.latencyMs}ms` : ""}
            </p>
          ))}
          {health.data?.data.providers.length === 0 && (
            <p className="text-slate-400">No provider checks recorded yet.</p>
          )}
        </div>
      </Card>
      <Card className="mt-6">
        <h2 className="font-bold">Outbound webhook deliveries</h2>
        <div className="mt-4 space-y-2">
          {deliveries.data?.data.map((delivery) => (
            <div
              key={delivery.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-white/5 p-3 text-sm"
            >
              <span>
                {delivery.eventType} · {delivery.status} ·{" "}
                {delivery.attemptCount} attempts
              </span>
              {delivery.status !== "delivered" && (
                <Button
                  disabled={replayState.isLoading}
                  onClick={() => void replay(delivery.id)}
                >
                  Replay
                </Button>
              )}
            </div>
          ))}
          {deliveries.data?.data.length === 0 && (
            <p className="text-slate-400">No outbound deliveries.</p>
          )}
        </div>
      </Card>
    </>
  );
}
