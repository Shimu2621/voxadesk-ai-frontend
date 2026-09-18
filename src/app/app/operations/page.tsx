"use client";
import { Card } from "@/components/ui/card";
import { RainbowButton } from "@/components/ui/rainbow-button";
import {
  useGetOperationsHealthQuery,
  useGetWebhookDeliveriesQuery,
  useReplayWebhookDeliveryMutation,
} from "@/lib/voxadesk-api";
import { FeedbackMessage } from "@/components/feedback-message";
import { apiErrorMessage } from "@/lib/api-error";
import { useState } from "react";
import { Activity, RefreshCw, ServerCog, Webhook } from "lucide-react";
import {
  DashboardSkeleton,
  ErrorState,
  StatusBadge,
  PageHeader,
} from "@/components/dashboard-ui";

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
  const [feedback, setFeedback] = useState<{
    message: string;
    error?: boolean;
  }>();
  async function replayDelivery(id: string) {
    setFeedback(undefined);
    try {
      await replay(id).unwrap();
      setFeedback({ message: "Webhook delivery queued for replay." });
    } catch (error) {
      setFeedback({
        message: apiErrorMessage(error, "Could not replay the delivery."),
        error: true,
      });
    }
  }
  if (health.isLoading)
    return <DashboardSkeleton label="Loading operations" cards={4} />;
  if (health.error)
    return (
      <ErrorState
        title="Operations unavailable"
        description="Operations data is available to workspace owners only."
      />
    );
  return (
    <>
      <PageHeader
        eyebrow="Reliability center"
        title="Operations"
        description="Monitor queue pressure, provider health, and outbound webhook delivery state."
        icon={Activity}
      />
      <FeedbackMessage
        message={feedback?.message}
        tone={feedback?.error ? "error" : "success"}
      />
      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {health.data?.data.queues.map((queue) => (
          <Card
            key={queue.queue}
            className="bg-linear-to-br from-primary/[0.045] to-[#090e19]"
          >
            <h2 className="flex items-center gap-2 font-semibold">
              <ServerCog size={17} className="text-primary" />
              {queue.queue}
            </h2>
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
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Activity size={18} className="text-sky-300" />
          Provider health
        </h2>
        <div className="mt-4 space-y-2">
          {health.data?.data.providers.map((provider) => (
            <p
              key={provider.id}
              className="dashboard-row rounded-xl border border-white/[0.07] bg-white/[0.035] p-4 text-sm"
            >
              {provider.provider} ·{" "}
              <StatusBadge
                tone={provider.status === "healthy" ? "success" : "warning"}
              >
                {provider.status}
              </StatusBadge>
              {provider.latencyMs != null ? ` · ${provider.latencyMs}ms` : ""}
            </p>
          ))}
          {health.data?.data.providers.length === 0 && (
            <p className="text-slate-400">No provider checks recorded yet.</p>
          )}
        </div>
      </Card>
      <Card className="mt-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Webhook size={18} className="text-violet-300" />
          Outbound webhook deliveries
        </h2>
        <div className="mt-4 space-y-2">
          {deliveries.data?.data.map((delivery) => (
            <div
              key={delivery.id}
              className="dashboard-row flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.035] p-4 text-sm"
            >
              <span>
                {delivery.eventType} · {delivery.status} ·{" "}
                {delivery.attemptCount} attempts
              </span>
              {delivery.status !== "delivered" && (
                <RainbowButton
                  disabled={replayState.isLoading}
                  onClick={() => void replayDelivery(delivery.id)}
                >
                  <RefreshCw size={15} />
                  {replayState.isLoading ? "Queueing…" : "Replay"}
                </RainbowButton>
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
