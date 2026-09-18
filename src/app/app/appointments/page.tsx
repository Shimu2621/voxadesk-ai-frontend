"use client";

import { useState } from "react";
import {
  Ban,
  CalendarCheck2,
  CalendarDays,
  Clock3,
  MapPin,
} from "lucide-react";
import {
  useGetAppointmentsQuery,
  useUpdateAppointmentMutation,
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
  SummaryCard,
} from "@/components/dashboard-ui";

export default function Page() {
  const { data, isLoading, error } = useGetAppointmentsQuery();
  const [update, state] = useUpdateAppointmentMutation();
  const [feedback, setFeedback] = useState<{
    message: string;
    error?: boolean;
  }>();
  async function cancel(id: string) {
    setFeedback(undefined);
    try {
      await update({ id, status: "CANCELLED" }).unwrap();
      setFeedback({ message: "Appointment cancelled." });
    } catch (cause) {
      setFeedback({
        message: apiErrorMessage(cause, "Could not cancel the appointment."),
        error: true,
      });
    }
  }
  const appointments = data?.data ?? [];
  const confirmed = appointments.filter(
    (item) => item.status === "CONFIRMED",
  ).length;
  const locations = new Set(appointments.map((item) => item.location.name))
    .size;
  return (
    <>
      <PageHeader
        eyebrow="Calendar operations"
        title="Appointments"
        description="Review confirmed bookings, scheduling context, and synchronization status across every location."
        icon={CalendarDays}
      />
      <FeedbackMessage
        message={feedback?.message}
        tone={feedback?.error ? "error" : "success"}
      />
      {!isLoading && !error && (
        <DashboardItem className="mt-8 grid gap-4 sm:grid-cols-3">
          <SummaryCard
            label="Appointments"
            value={appointments.length}
            detail="Currently listed"
            icon={CalendarDays}
          />
          <SummaryCard
            label="Confirmed"
            value={confirmed}
            detail="Ready on the calendar"
            icon={CalendarCheck2}
            tone="blue"
          />
          <SummaryCard
            label="Locations"
            value={locations}
            detail="Represented in this view"
            icon={MapPin}
            tone="violet"
          />
        </DashboardItem>
      )}
      <DashboardItem className="mt-5">
        <SectionCard
          title="Schedule"
          description="Booking times are shown in the browser locale with the source timezone retained."
          icon={Clock3}
        >
          {isLoading && (
            <DashboardSkeleton label="Loading appointments" cards={2} />
          )}
          {error && (
            <p role="alert" className="text-sm text-red-300">
              Appointments could not be loaded.
            </p>
          )}
          <AnimatedList className="space-y-3">
            {appointments.map((item) => (
              <AnimatedRow
                key={item.id}
                className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-white">
                      {item.contact.name ?? "Caller"}
                    </h3>
                    <StatusBadge
                      tone={
                        item.status === "CONFIRMED"
                          ? "success"
                          : item.status === "CANCELLED"
                            ? "danger"
                            : "neutral"
                      }
                    >
                      {item.status}
                    </StatusBadge>
                    <StatusBadge
                      tone={item.syncStatus === "synced" ? "info" : "warning"}
                    >
                      {item.syncStatus}
                    </StatusBadge>
                  </div>
                  <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 size={14} />
                      {new Date(item.startAt).toLocaleString()}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={14} />
                      {item.location.name} · {item.timezone}
                    </span>
                  </p>
                </div>
                {item.status === "CONFIRMED" && (
                  <RainbowButton
                    variant="destructive"
                    disabled={state.isLoading}
                    onClick={() => void cancel(item.id)}
                  >
                    <Ban size={16} />
                    {state.isLoading ? "Cancelling…" : "Cancel appointment"}
                  </RainbowButton>
                )}
              </AnimatedRow>
            ))}
            {appointments.length === 0 && (
              <EmptyState
                title="No appointments yet"
                description="Confirmed bookings will appear here when agents or team members create them."
                icon={CalendarDays}
              />
            )}
          </AnimatedList>
        </SectionCard>
      </DashboardItem>
    </>
  );
}
