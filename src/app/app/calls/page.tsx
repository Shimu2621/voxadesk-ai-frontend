"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  MessageSquareText,
  PhoneCall,
} from "lucide-react";
import { useGetConversationsQuery } from "@/lib/voxadesk-api";
import { RainbowButton } from "@/components/ui/rainbow-button";
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
  const { data, isLoading, isFetching, error } = useGetConversationsQuery({
    cursor: cursors[page],
    limit: 10,
  });
  const conversations = data?.data ?? [];
  return (
    <>
      <PageHeader
        eyebrow="Operator workspace"
        title="Conversations"
        description="Trace customer interactions, outcomes, and channel activity without changing historical records."
        icon={PhoneCall}
      />
      <DashboardItem className="mt-8">
        <SectionCard
          title="Conversation history"
          description="Open a record to review the full transcript, tool activity, and linked appointments."
          icon={MessageSquareText}
          action={<StatusBadge tone="neutral">10 per page</StatusBadge>}
        >
          {isLoading && (
            <DashboardSkeleton label="Loading conversations" cards={3} />
          )}
          {error && (
            <p role="alert" className="text-sm text-red-300">
              Conversations could not be loaded.
            </p>
          )}
          <AnimatedList className="space-y-3" aria-busy={isFetching}>
            {conversations.map((item) => (
              <AnimatedRow key={item.id} className="p-0">
                <Link
                  href={`/app/calls/${item.id}`}
                  className="group grid gap-4 rounded-xl p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:grid-cols-[1.25fr_0.75fr_1fr_1.2fr_auto] sm:items-center"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                      <Bot size={17} />
                    </span>
                    <span className="truncate font-semibold text-white">
                      {item.agent?.name ?? "Unknown agent"}
                    </span>
                  </span>
                  <StatusBadge
                    tone={item.channel === "PHONE" ? "success" : "info"}
                  >
                    {item.channel.replaceAll("_", " ")}
                  </StatusBadge>
                  <span className="capitalize text-sm text-slate-300">
                    {(item.outcome ?? item.status).replaceAll("_", " ")}
                  </span>
                  <time
                    className="text-sm text-slate-500"
                    dateTime={item.createdAt}
                  >
                    {new Date(item.createdAt).toLocaleString()}
                  </time>
                  <ArrowRight
                    size={17}
                    className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-primary motion-reduce:transition-none"
                  />
                </Link>
              </AnimatedRow>
            ))}
            {conversations.length === 0 && !isLoading && (
              <EmptyState
                title="No production conversations"
                description="Calls and messages handled by published agents will appear here."
                icon={PhoneCall}
              />
            )}
          </AnimatedList>
          <nav
            aria-label="Conversation pagination"
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
