"use client";
import type { FormEvent } from "react";
import {
  useArchiveKnowledgeMutation,
  useCreateKnowledgeMutation,
  useGetKnowledgeQuery,
  useSyncKnowledgeMutation,
} from "@/lib/voxadesk-api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
export default function Page() {
  const { data, isLoading, error } = useGetKnowledgeQuery(undefined, {
    pollingInterval: 5_000,
    skipPollingIfUnfocused: true,
  });
  const [create, creating] = useCreateKnowledgeMutation();
  const [sync] = useSyncKnowledgeMutation();
  const [archive] = useArchiveKnowledgeMutation();
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    await create({
      type: "TEXT",
      name: String(values.name),
      content: String(values.content),
    }).unwrap();
    form.reset();
  }
  return (
    <>
      <p className="text-sm text-cyan-400">Approved sources</p>
      <h1 className="mt-1 text-3xl font-bold">Knowledge</h1>
      <p className="mt-2 text-slate-400">
        Only reviewed, tenant-owned sources are available to agents.
      </p>
      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1.4fr]">
        <Card>
          <h2 className="font-bold">Add manual text</h2>
          <form className="mt-4 space-y-3" onSubmit={submit}>
            <label className="block text-sm">
              Source name
              <input
                required
                minLength={2}
                name="name"
                className="mt-1 w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
              />
            </label>
            <label className="block text-sm">
              Approved content
              <textarea
                required
                name="content"
                rows={8}
                className="mt-1 w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
              />
            </label>
            <Button disabled={creating.isLoading}>Add source</Button>
          </form>
        </Card>
        <Card>
          <h2 className="font-bold">Sources</h2>
          {isLoading && <p className="mt-4">Loading…</p>}
          {error && (
            <p className="mt-4 text-red-300">Sources could not be loaded.</p>
          )}
          <div className="mt-4 space-y-3">
            {data?.data.map((source) => (
              <div key={source.id} className="rounded-xl bg-white/5 p-4">
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="font-semibold">{source.name}</p>
                    <p className="text-xs text-slate-400">
                      {source.type} · {source.status}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {source.status === "failed" && (
                      <Button onClick={() => void sync(source.id)}>
                        Retry
                      </Button>
                    )}
                    {source.status !== "archived" && (
                      <Button onClick={() => void archive(source.id)}>
                        Archive
                      </Button>
                    )}
                  </div>
                </div>
                {source.error && (
                  <p className="mt-2 text-sm text-red-300">{source.error}</p>
                )}
              </div>
            ))}
            {data?.data.length === 0 && (
              <p className="text-slate-400">No knowledge sources yet.</p>
            )}
          </div>
        </Card>
      </div>
    </>
  );
}
