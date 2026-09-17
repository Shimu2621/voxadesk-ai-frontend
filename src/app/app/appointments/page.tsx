"use client";
import {
  useGetAppointmentsQuery,
  useUpdateAppointmentMutation,
} from "@/lib/voxadesk-api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FeedbackMessage } from "@/components/feedback-message";
import { apiErrorMessage } from "@/lib/api-error";
import { useState } from "react";
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
    } catch (error) {
      setFeedback({
        message: apiErrorMessage(error, "Could not cancel the appointment."),
        error: true,
      });
    }
  }
  return (
    <>
      <p className="text-sm text-cyan-400">Calendar operations</p>
      <h1 className="mt-1 text-3xl font-bold">Appointments</h1>
      <FeedbackMessage
        message={feedback?.message}
        tone={feedback?.error ? "error" : "success"}
      />
      <Card className="mt-8">
        {isLoading && <p>Loading…</p>}
        {error && (
          <p className="text-red-300">Appointments could not be loaded.</p>
        )}
        <div className="space-y-3">
          {data?.data.map((item) => (
            <div
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white/5 p-4"
            >
              <div>
                <p className="font-semibold">
                  {item.contact.name ?? "Caller"} · {item.location.name}
                </p>
                <p className="text-sm text-slate-400">
                  {new Date(item.startAt).toLocaleString()} · {item.timezone} ·{" "}
                  {item.status} · {item.syncStatus}
                </p>
              </div>
              {item.status === "CONFIRMED" && (
                <Button
                  disabled={state.isLoading}
                  onClick={() => void cancel(item.id)}
                >
                  Cancel
                </Button>
              )}
            </div>
          ))}
          {data?.data.length === 0 && (
            <p className="text-slate-400">No appointments yet.</p>
          )}
        </div>
      </Card>
    </>
  );
}
