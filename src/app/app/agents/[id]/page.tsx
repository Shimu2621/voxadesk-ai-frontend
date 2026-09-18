"use client";

import { use, useRef, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Archive, ArrowLeft, Bot, Copy, RotateCcw, Save } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Card } from "@/components/ui/card";
import { FeedbackMessage } from "@/components/feedback-message";
import { apiErrorMessage } from "@/lib/api-error";
import {
  DashboardSkeleton,
  ErrorState,
  PageHeader,
  StatusBadge,
} from "@/components/dashboard-ui";
import {
  type AgentConfig,
  useArchiveAgentMutation,
  useDuplicateAgentMutation,
  useGetAgentQuery,
  useGetSessionQuery,
  useRollbackAgentMutation,
  useUpdateAgentMutation,
} from "@/lib/voxadesk-api";

const field =
  "mt-1 w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2";

export function AgentDetail({ id }: { id: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const agent = useGetAgentQuery(id);
  const session = useGetSessionQuery();
  const [update, updateState] = useUpdateAgentMutation();
  const [duplicate, duplicateState] = useDuplicateAgentMutation();
  const [archive, archiveState] = useArchiveAgentMutation();
  const [rollback, rollbackState] = useRollbackAgentMutation();
  const [feedback, setFeedback] = useState<{
    message: string;
    error?: boolean;
  }>();
  const [isNavigatingAfterDuplicate, setIsNavigatingAfterDuplicate] =
    useState(false);
  const duplicationGuard = useRef(false);
  const canManage =
    session.data?.data.role === "OWNER" ||
    session.data?.data.role === "MANAGER";

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!agent.data) return;
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const current = agent.data.data.draftConfig;
    const config: AgentConfig = {
      ...current,
      name: String(values.name),
      greeting: String(values.greeting),
      voiceId: String(values.voiceId),
      timezone: String(values.timezone),
      tone: String(values.tone),
      role: String(values.role),
      disclosure: String(values.disclosure),
      unknownFallback: String(values.unknownFallback),
      transferNumbers: String(values.transferNumber).trim()
        ? [String(values.transferNumber).trim()]
        : [],
    };
    setFeedback(undefined);
    try {
      await update({ id, config }).unwrap();
      setFeedback({ message: "Agent draft saved." });
    } catch (error) {
      setFeedback({
        message: apiErrorMessage(error, "Could not save the agent."),
        error: true,
      });
    }
  }

  async function duplicateAgent() {
    if (duplicationGuard.current) return;
    duplicationGuard.current = true;
    setIsNavigatingAfterDuplicate(true);
    setFeedback(undefined);
    try {
      const result = await duplicate(id).unwrap();
      router.push(`/app/agents/${result.data.id}?duplicated=1`);
    } catch (error) {
      duplicationGuard.current = false;
      setIsNavigatingAfterDuplicate(false);
      setFeedback({
        message: apiErrorMessage(error, "Could not duplicate the agent."),
        error: true,
      });
    }
  }

  async function archiveAgent() {
    if (!window.confirm("Archive this agent? It will no longer be active."))
      return;
    try {
      await archive(id).unwrap();
      router.push("/app/agents");
    } catch (error) {
      setFeedback({
        message: apiErrorMessage(error, "Could not archive the agent."),
        error: true,
      });
    }
  }

  async function rollbackVersion(versionId: string, version: number) {
    if (!window.confirm(`Roll back to version ${version}?`)) return;
    try {
      await rollback({ id, versionId }).unwrap();
      setFeedback({ message: `Rolled back to version ${version}.` });
    } catch (error) {
      setFeedback({
        message: apiErrorMessage(error, "Could not roll back the agent."),
        error: true,
      });
    }
  }

  if (agent.isLoading)
    return <DashboardSkeleton label="Loading agent" cards={3} />;
  if (agent.error || !agent.data)
    return (
      <ErrorState
        title="Agent unavailable"
        description="This agent could not be loaded or is no longer available in this workspace."
      />
    );
  const item = agent.data.data;
  const config = item.draftConfig;
  return (
    <>
      <PageHeader
        eyebrow="Agent configuration"
        title={item.name}
        description="Shape the agent's voice, behavior, routing, and customer-facing fallback. Draft changes stay private until published."
        icon={Bot}
        actions={
          <>
            <StatusBadge
              tone={item.status === "PUBLISHED" ? "success" : "warning"}
            >
              {item.status}
            </StatusBadge>
            <RainbowButton asChild variant="secondary">
              <Link href="/app/agents">
                <ArrowLeft size={16} />
                All agents
              </Link>
            </RainbowButton>
          </>
        }
      />
      <p className="sr-only">
        {item.status} · Draft changes require publishing from the agent list.
      </p>
      <FeedbackMessage
        message={
          feedback?.message ??
          (searchParams.get("duplicated") === "1"
            ? "Agent duplicated successfully. You are now editing the new copy."
            : undefined)
        }
        tone={feedback?.error ? "error" : "success"}
      />
      <div className="mt-8 grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
        <Card>
          <h2 className="font-bold">Draft configuration</h2>
          <form className="mt-4 grid gap-4 md:grid-cols-2" onSubmit={save}>
            {(
              [
                ["name", "Name", config.name],
                ["voiceId", "Voice ID", config.voiceId],
                ["timezone", "Timezone", config.timezone],
                ["tone", "Tone", config.tone],
                ["role", "Role", config.role],
                [
                  "transferNumber",
                  "Transfer number",
                  config.transferNumbers[0] ?? "",
                ],
              ] as const
            ).map(([name, label, value]) => (
              <label className="block text-sm" key={name}>
                {label}
                <input
                  className={field}
                  name={name}
                  defaultValue={value}
                  required={name !== "transferNumber"}
                />
              </label>
            ))}
            <label className="block text-sm md:col-span-2">
              Greeting
              <textarea
                className={field}
                name="greeting"
                rows={3}
                defaultValue={config.greeting}
                required
              />
            </label>
            <label className="block text-sm md:col-span-2">
              AI disclosure
              <textarea
                className={field}
                name="disclosure"
                rows={2}
                defaultValue={config.disclosure}
                required
              />
            </label>
            <label className="block text-sm md:col-span-2">
              Unknown-answer fallback
              <textarea
                className={field}
                name="unknownFallback"
                rows={2}
                defaultValue={config.unknownFallback}
                required
              />
            </label>
            {canManage && (
              <RainbowButton disabled={updateState.isLoading}>
                <Save size={16} />
                {updateState.isLoading ? "Saving…" : "Save draft"}
              </RainbowButton>
            )}
          </form>
          {!canManage && (
            <p className="mt-4 text-sm text-amber-200">
              Your role has read-only access.
            </p>
          )}
          {canManage && (
            <div className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-5">
              <RainbowButton
                variant="secondary"
                disabled={
                  duplicateState.isLoading || isNavigatingAfterDuplicate
                }
                onClick={() => void duplicateAgent()}
              >
                <Copy size={16} />
                {duplicateState.isLoading || isNavigatingAfterDuplicate
                  ? "Duplicating…"
                  : "Duplicate agent"}
              </RainbowButton>
              <RainbowButton
                variant="destructive"
                disabled={archiveState.isLoading}
                onClick={() => void archiveAgent()}
              >
                <Archive size={16} />
                {archiveState.isLoading ? "Archiving…" : "Archive agent"}
              </RainbowButton>
            </div>
          )}
        </Card>
        <Card>
          <h2 className="font-bold">Version history</h2>
          <div className="mt-4 space-y-3">
            {item.versions.map((version) => (
              <div key={version.id} className="rounded-xl bg-white/5 p-3">
                <p className="font-semibold">
                  Version {version.version}
                  {item.activeVersion?.id === version.id ? " · active" : ""}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {new Date(version.publishedAt).toLocaleString()}
                </p>
                {canManage && item.activeVersion?.id !== version.id && (
                  <RainbowButton
                    className="mt-3"
                    variant="ghost"
                    disabled={rollbackState.isLoading}
                    onClick={() =>
                      void rollbackVersion(version.id, version.version)
                    }
                  >
                    <RotateCcw size={15} />
                    {rollbackState.isLoading ? "Rolling back…" : "Roll back"}
                  </RainbowButton>
                )}
              </div>
            ))}
            {item.versions.length === 0 && (
              <p className="text-sm text-slate-400">
                No published versions yet.
              </p>
            )}
          </div>
        </Card>
      </div>
    </>
  );
}

export default function AgentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <AgentDetail id={id} />;
}
