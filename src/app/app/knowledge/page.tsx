"use client";

import { useState, type FormEvent } from "react";
import {
  Archive,
  BookOpenCheck,
  FileText,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import {
  useArchiveKnowledgeMutation,
  useCreateKnowledgeMutation,
  useGetKnowledgeQuery,
  useSyncKnowledgeMutation,
} from "@/lib/voxadesk-api";
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

const field =
  "mt-2 w-full rounded-xl border border-white/10 bg-[#080d17] px-3.5 py-3 text-sm";
export default function Page() {
  const { data, isLoading, error } = useGetKnowledgeQuery(undefined, {
    pollingInterval: 5_000,
    skipPollingIfUnfocused: true,
  });
  const [create, creating] = useCreateKnowledgeMutation();
  const [sync, syncing] = useSyncKnowledgeMutation();
  const [archive, archiving] = useArchiveKnowledgeMutation();
  const [feedback, setFeedback] = useState<{
    message: string;
    error?: boolean;
  }>();
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    setFeedback(undefined);
    try {
      await create({
        type: "TEXT",
        name: String(values.name),
        content: String(values.content),
      }).unwrap();
      form.reset();
      setFeedback({
        message: "Knowledge source added and queued for processing.",
      });
    } catch (cause) {
      setFeedback({
        message: apiErrorMessage(cause, "Could not add the source."),
        error: true,
      });
    }
  }
  async function runAction(action: "sync" | "archive", id: string) {
    setFeedback(undefined);
    try {
      await (action === "sync" ? sync(id) : archive(id)).unwrap();
      setFeedback({
        message:
          action === "sync" ? "Source queued for retry." : "Source archived.",
      });
    } catch (cause) {
      setFeedback({
        message: apiErrorMessage(cause, `Could not ${action} the source.`),
        error: true,
      });
    }
  }
  const sources = data?.data ?? [];
  return (
    <>
      <PageHeader
        eyebrow="Approved sources"
        title="Knowledge"
        description="Give agents accurate, tenant-owned answers from reviewed source material."
        icon={BookOpenCheck}
      />
      <FeedbackMessage
        message={feedback?.message}
        tone={feedback?.error ? "error" : "success"}
      />
      <div className="mt-8 grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <DashboardItem>
          <SectionCard
            title="Add manual text"
            description="Paste concise, approved information the agent can safely use."
            icon={Sparkles}
            className="border-primary/15 bg-linear-to-br from-primary/[0.05] to-[#090e19]"
          >
            <form className="space-y-5" onSubmit={submit}>
              <label className="block text-sm">
                Source name
                <input
                  required
                  minLength={2}
                  name="name"
                  className={field}
                  placeholder="Business hours and policies"
                />
              </label>
              <label className="block text-sm">
                Approved content
                <textarea
                  required
                  name="content"
                  rows={9}
                  className={field}
                  placeholder="Add reviewed customer-facing information…"
                />
              </label>
              <RainbowButton disabled={creating.isLoading}>
                <Sparkles size={16} />
                {creating.isLoading ? "Adding source…" : "Add knowledge source"}
              </RainbowButton>
            </form>
          </SectionCard>
        </DashboardItem>
        <DashboardItem>
          <SectionCard
            title="Sources"
            description={`${sources.length} source${sources.length === 1 ? "" : "s"} available in this workspace.`}
            icon={FileText}
          >
            {isLoading && (
              <DashboardSkeleton label="Loading knowledge sources" cards={3} />
            )}
            {error && (
              <p role="alert" className="text-sm text-red-300">
                Sources could not be loaded.
              </p>
            )}
            <AnimatedList className="space-y-3">
              {sources.map((source) => (
                <AnimatedRow
                  key={source.id}
                  className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-white">
                        {source.name}
                      </h3>
                      <StatusBadge
                        tone={
                          source.status === "ready"
                            ? "success"
                            : source.status === "failed"
                              ? "danger"
                              : source.status === "archived"
                                ? "neutral"
                                : "warning"
                        }
                      >
                        {source.status}
                      </StatusBadge>
                    </div>
                    <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">
                      {source.type}
                    </p>
                    {source.error && (
                      <p className="mt-2 text-sm text-red-300">
                        {source.error}
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2">
                    {source.status === "failed" && (
                      <RainbowButton
                        variant="outline"
                        disabled={syncing.isLoading}
                        onClick={() => void runAction("sync", source.id)}
                      >
                        <RefreshCw size={15} />
                        {syncing.isLoading ? "Queueing…" : "Retry"}
                      </RainbowButton>
                    )}
                    {source.status !== "archived" && (
                      <RainbowButton
                        variant="destructive"
                        disabled={archiving.isLoading}
                        onClick={() => void runAction("archive", source.id)}
                      >
                        <Archive size={15} />
                        {archiving.isLoading ? "Archiving…" : "Archive"}
                      </RainbowButton>
                    )}
                  </div>
                </AnimatedRow>
              ))}
              {sources.length === 0 && !isLoading && (
                <EmptyState
                  title="No knowledge sources"
                  description="Add approved text to give your agents a trustworthy answer base."
                  icon={BookOpenCheck}
                />
              )}
            </AnimatedList>
          </SectionCard>
        </DashboardItem>
      </div>
    </>
  );
}
