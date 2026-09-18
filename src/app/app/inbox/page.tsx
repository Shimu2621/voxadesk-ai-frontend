"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Inbox,
  UserRound,
} from "lucide-react";
import { useGetInboxQuery, useUpdateInboxMutation } from "@/lib/voxadesk-api";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { FeedbackMessage } from "@/components/feedback-message";
import { apiErrorMessage } from "@/lib/api-error";
import {
  AnimatedList,
  AnimatedRow,
  DashboardItem,
  DashboardSkeleton,
  EmptyState,
  PageHeader,
  SectionCard,
  StatusBadge,
} from "@/components/dashboard-ui";

export default function Page() {
  const [cursors, setCursors] = useState<Array<string | undefined>>([
    undefined,
  ]);
  const page = cursors.length - 1;
  const { data, isLoading, isFetching, error } = useGetInboxQuery({
    cursor: cursors[page],
    limit: 10,
  });
  const [update, state] = useUpdateInboxMutation();
  const [feedback, setFeedback] = useState<{
    message: string;
    error?: boolean;
  }>();
  async function resolve(id: string) {
    setFeedback(undefined);
    try {
      await update({ id, status: "RESOLVED" }).unwrap();
      setFeedback({ message: "Follow-up marked as resolved." });
    } catch (cause) {
      setFeedback({
        message: apiErrorMessage(cause, "Could not resolve the follow-up."),
        error: true,
      });
    }
  }
  const tasks = data?.data ?? [];
  return (
    <>
      <PageHeader
        eyebrow="Follow-up queue"
        title="Operator inbox"
        description="Prioritize customer requests, ownership, and due dates from one focused queue."
        icon={Inbox}
      />
      <FeedbackMessage
        message={feedback?.message}
        tone={feedback?.error ? "error" : "success"}
      />
      <DashboardItem className="mt-8">
        <SectionCard
          title="Follow-up tasks"
          description="Resolve completed work while retaining the full customer history."
          icon={Inbox}
          action={<StatusBadge tone="neutral">Page {page + 1}</StatusBadge>}
        >
          {isLoading && <DashboardSkeleton label="Loading inbox" cards={3} />}
          {error && (
            <p role="alert" className="text-sm text-red-300">
              Inbox could not be loaded.
            </p>
          )}
          <AnimatedList className="space-y-3" aria-busy={isFetching}>
            {tasks.map((task) => (
              <AnimatedRow
                key={task.id}
                className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="capitalize font-semibold text-white">
                      {task.type.replaceAll("_", " ")}
                    </h3>
                    <StatusBadge
                      tone={task.priority === "HIGH" ? "warning" : "neutral"}
                    >
                      {task.priority}
                    </StatusBadge>
                    <StatusBadge
                      tone={task.status === "RESOLVED" ? "success" : "info"}
                    >
                      {task.status}
                    </StatusBadge>
                  </div>
                  <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-400">
                    <span className="inline-flex items-center gap-1.5">
                      <UserRound size={14} />
                      {task.contact?.name ?? "Unknown caller"}
                    </span>
                    {task.dueAt && (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 size={14} />
                        Due {new Date(task.dueAt).toLocaleString()}
                      </span>
                    )}
                  </p>
                </div>
                {task.status !== "RESOLVED" && (
                  <RainbowButton
                    disabled={state.isLoading}
                    onClick={() => void resolve(task.id)}
                  >
                    <CheckCircle2 size={16} />
                    {state.isLoading ? "Resolving…" : "Mark resolved"}
                  </RainbowButton>
                )}
              </AnimatedRow>
            ))}
            {tasks.length === 0 && !isLoading && (
              <EmptyState
                title="Inbox zero"
                description="There are no follow-up tasks waiting for your team."
                icon={CheckCircle2}
              />
            )}
          </AnimatedList>
          <nav
            aria-label="Inbox pagination"
            className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-5"
          >
            <RainbowButton
              variant="secondary"
              disabled={page === 0 || isFetching}
              onClick={() => setCursors((current) => current.slice(0, -1))}
            >
              <ArrowLeft size={16} />
              Previous
            </RainbowButton>
            <span className="text-sm text-slate-500">Page {page + 1}</span>
            <RainbowButton
              variant="secondary"
              disabled={!data?.nextCursor || isFetching}
              onClick={() =>
                data?.nextCursor &&
                setCursors((current) => [
                  ...current,
                  data.nextCursor ?? undefined,
                ])
              }
            >
              Next
              <ArrowRight size={16} />
            </RainbowButton>
          </nav>
        </SectionCard>
      </DashboardItem>
    </>
  );
}
