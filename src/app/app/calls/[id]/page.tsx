"use client";
import { use } from "react";
import { useGetConversationQuery } from "@/lib/voxadesk-api";
import { Card } from "@/components/ui/card";
export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data, isLoading, error } = useGetConversationQuery(id);
  if (isLoading) return <p>Loading conversation…</p>;
  if (error || !data)
    return <p className="text-red-300">Conversation could not be loaded.</p>;
  const item = data.data;
  return (
    <>
      <p className="text-sm text-cyan-400">Conversation trace</p>
      <h1 className="mt-1 text-3xl font-bold">{item.agent.name}</h1>
      <p className="mt-2 text-slate-400">
        {item.channel} · {item.outcome ?? item.status}
      </p>
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <Card>
          <h2 className="font-bold">Transcript</h2>
          <div className="mt-4 space-y-3">
            {item.messages?.map((message) => (
              <div key={message.id} className="rounded-xl bg-white/5 p-3">
                <p className="text-xs uppercase text-cyan-300">
                  {message.role}
                </p>
                <p className="mt-1 text-sm">{message.content}</p>
              </div>
            ))}
          </div>
        </Card>
        <div className="space-y-5">
          <Card>
            <h2 className="font-bold">Tool activity</h2>
            <div className="mt-4 space-y-2">
              {item.toolExecutions.map((tool) => (
                <p key={tool.id} className="rounded-lg bg-white/5 p-3 text-sm">
                  {tool.toolName} · {tool.status}
                </p>
              ))}
            </div>
          </Card>
          <Card>
            <h2 className="font-bold">Appointments</h2>
            <div className="mt-4 space-y-2">
              {data.appointments.map((appointment) => (
                <p
                  key={appointment.id}
                  className="rounded-lg bg-white/5 p-3 text-sm"
                >
                  {new Date(appointment.startAt).toLocaleString()} ·{" "}
                  {appointment.status}
                </p>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
