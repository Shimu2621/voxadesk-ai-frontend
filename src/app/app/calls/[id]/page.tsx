"use client";
import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  MessageSquareText,
  PhoneCall,
  Wrench,
} from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useGetConversationQuery } from "@/lib/voxadesk-api";
import { Card } from "@/components/ui/card";
import {
  DashboardSkeleton,
  EmptyState,
  ErrorState,
  StatusBadge,
  PageHeader,
} from "@/components/dashboard-ui";
export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data, isLoading, error } = useGetConversationQuery(id);
  if (isLoading)
    return <DashboardSkeleton label="Loading conversation" cards={3} />;
  if (error || !data)
    return (
      <ErrorState
        title="Conversation unavailable"
        description="The conversation trace could not be loaded."
      />
    );
  const item = data.data;
  return (
    <>
      <PageHeader
        eyebrow="Conversation trace"
        title={item.contact?.name ?? "Conversation detail"}
        description="Review the immutable transcript, provider tool activity, and downstream booking results."
        icon={PhoneCall}
        actions={
          <>
            <StatusBadge tone="info">{item.channel}</StatusBadge>
            <StatusBadge
              tone={item.status === "COMPLETED" ? "success" : "warning"}
            >
              {item.outcome ?? item.status}
            </StatusBadge>
            <RainbowButton asChild variant="secondary">
              <Link href="/app/calls">
                <ArrowLeft size={16} />
                All conversations
              </Link>
            </RainbowButton>
          </>
        }
      />
      <p className="sr-only">
        {item.channel} · {item.outcome ?? item.status}
      </p>
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <Card className="border-primary/15 bg-linear-to-br from-primary/[0.04] to-[#090e19]">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <MessageSquareText size={18} className="text-primary" />
            Transcript
          </h2>
          <div className="mt-4 space-y-3">
            {item.messages?.map((message) => (
              <div
                key={message.id}
                className="dashboard-row rounded-xl border border-white/[0.07] bg-white/[0.035] p-4"
              >
                <p className="text-xs uppercase text-cyan-300">
                  <StatusBadge
                    tone={message.role === "agent" ? "success" : "info"}
                  >
                    {message.role}
                  </StatusBadge>
                </p>
                <p className="mt-1 text-sm">{message.content}</p>
              </div>
            ))}
            {item.messages?.length === 0 && (
              <EmptyState
                title="No transcript"
                description="No messages were recorded for this conversation."
              />
            )}
          </div>
        </Card>
        <div className="space-y-5">
          <Card>
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Wrench size={18} className="text-sky-300" />
              Tool activity
            </h2>
            <div className="mt-4 space-y-2">
              {item.toolExecutions.map((tool) => (
                <p key={tool.id} className="rounded-lg bg-white/5 p-3 text-sm">
                  {tool.toolName} · {tool.status}
                </p>
              ))}
              {item.toolExecutions.length === 0 && (
                <EmptyState
                  title="No tool activity"
                  description="This conversation did not invoke any tools."
                />
              )}
            </div>
          </Card>
          <Card>
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <CalendarDays size={18} className="text-violet-300" />
              Appointments
            </h2>
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
              {data.appointments.length === 0 && (
                <EmptyState
                  title="No appointments"
                  description="No appointments are linked to this conversation."
                />
              )}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
