"use client";
import Link from "next/link";
import { useGetConversationsQuery } from "@/lib/voxadesk-api";
import { Card } from "@/components/ui/card";
export default function Page() {
  const { data, isLoading, error } = useGetConversationsQuery();
  return (
    <>
      <p className="text-sm text-cyan-400">Operator workspace</p>
      <h1 className="mt-1 text-3xl font-bold">Conversations</h1>
      <p className="mt-2 text-slate-400">
        Trace outcomes and tool activity without changing historical records.
      </p>
      <Card className="mt-8">
        {isLoading && <p>Loading…</p>}
        {error && (
          <p className="text-red-300">Conversations could not be loaded.</p>
        )}
        <div className="space-y-3">
          {data?.data.map((item) => (
            <Link
              href={`/app/calls/${item.id}`}
              key={item.id}
              className="grid gap-2 rounded-xl bg-white/5 p-4 hover:bg-white/10 sm:grid-cols-4"
            >
              <span className="font-semibold">{item.agent.name}</span>
              <span>{item.channel}</span>
              <span>{item.outcome ?? item.status}</span>
              <span className="text-slate-400">
                {new Date(item.createdAt).toLocaleString()}
              </span>
            </Link>
          ))}
          {data?.data.length === 0 && (
            <p className="text-slate-400">No production conversations yet.</p>
          )}
        </div>
      </Card>
    </>
  );
}
