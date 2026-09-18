"use client";

import { useState, type FormEvent } from "react";
import { Building2, Clock3, MapPin, Pencil, Save } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Card } from "@/components/ui/card";
import { FeedbackMessage } from "@/components/feedback-message";
import { apiErrorMessage } from "@/lib/api-error";
import {
  type Hours,
  type Location,
  useCreateLocationMutation,
  useGetOrganizationQuery,
  useGetSessionQuery,
  useUpdateLocationMutation,
} from "@/lib/voxadesk-api";
import { EmptyState, PageHeader } from "@/components/dashboard-ui";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;
const emptyHours: Hours = {
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: [],
};
const field =
  "mt-1 w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2";

export default function OrganizationPage() {
  const organization = useGetOrganizationQuery();
  const session = useGetSessionQuery();
  const [create, createState] = useCreateLocationMutation();
  const [update, updateState] = useUpdateLocationMutation();
  const [editing, setEditing] = useState<Location>();
  const [feedback, setFeedback] = useState<{
    message: string;
    error?: boolean;
  }>();
  const canManage =
    session.data?.data.role === "OWNER" ||
    session.data?.data.role === "MANAGER";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const hoursJson = { ...emptyHours };
    for (const day of days) {
      const open = String(values[`${day}Open`] ?? "");
      const close = String(values[`${day}Close`] ?? "");
      hoursJson[day] = open && close ? [{ open, close }] : [];
    }
    const closureDate = String(values.closureDate ?? "");
    const body = {
      name: String(values.name),
      timezone: String(values.timezone),
      phone: String(values.phone).trim() || null,
      hoursJson,
      closuresJson: closureDate
        ? [
            {
              date: closureDate,
              label: String(values.closureLabel || "Closed"),
            },
          ]
        : [],
    };
    setFeedback(undefined);
    try {
      if (editing) await update({ id: editing.id, body }).unwrap();
      else await create(body).unwrap();
      setFeedback({
        message: editing ? "Location updated." : "Location created.",
      });
      setEditing(undefined);
      form.reset();
    } catch (error) {
      setFeedback({
        message: apiErrorMessage(error, "Could not save the location."),
        error: true,
      });
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Organization operations"
        title="Locations & hours"
        description="Keep routing, local contact details, weekly availability, and closures accurate."
        icon={Building2}
      />
      <p className="sr-only">
        Times are interpreted in each location’s configured timezone.
      </p>
      <FeedbackMessage
        message={feedback?.message}
        tone={feedback?.error ? "error" : "success"}
      />
      <div className="mt-8 grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
        {canManage && (
          <Card className="border-primary/15 bg-linear-to-br from-primary/[0.045] to-[#090e19]">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <MapPin size={18} className="text-primary" />
              {editing ? `Edit ${editing.name}` : "Add location"}
            </h2>
            <form
              key={editing?.id ?? "new"}
              className="mt-4 space-y-4"
              onSubmit={submit}
            >
              <label className="block text-sm">
                Name
                <input
                  className={field}
                  name="name"
                  minLength={2}
                  required
                  defaultValue={editing?.name}
                />
              </label>
              <label className="block text-sm">
                Timezone
                <input
                  className={field}
                  name="timezone"
                  required
                  defaultValue={
                    editing?.timezone ??
                    organization.data?.data.timezone ??
                    "America/New_York"
                  }
                />
              </label>
              <label className="block text-sm">
                Phone
                <input
                  className={field}
                  name="phone"
                  defaultValue={editing?.phone ?? ""}
                />
              </label>
              <fieldset>
                <legend className="text-sm font-semibold">Weekly hours</legend>
                <div className="mt-2 space-y-2">
                  {days.map((day) => (
                    <div
                      key={day}
                      className="grid grid-cols-[1fr_1fr_1fr] items-center gap-2"
                    >
                      <span className="capitalize text-sm">{day}</span>
                      <input
                        aria-label={`${day} open`}
                        className={field}
                        type="time"
                        name={`${day}Open`}
                        defaultValue={
                          editing?.hoursJson?.[day]?.[0]?.open ?? ""
                        }
                      />
                      <input
                        aria-label={`${day} close`}
                        className={field}
                        type="time"
                        name={`${day}Close`}
                        defaultValue={
                          editing?.hoursJson?.[day]?.[0]?.close ?? ""
                        }
                      />
                    </div>
                  ))}
                </div>
              </fieldset>
              <fieldset className="grid gap-2 sm:grid-cols-2">
                <legend className="text-sm font-semibold sm:col-span-2">
                  Optional closure
                </legend>
                <input
                  aria-label="Closure date"
                  className={field}
                  type="date"
                  name="closureDate"
                  defaultValue={editing?.closuresJson?.[0]?.date ?? ""}
                />
                <input
                  aria-label="Closure label"
                  className={field}
                  name="closureLabel"
                  placeholder="Holiday"
                  defaultValue={editing?.closuresJson?.[0]?.label ?? ""}
                />
              </fieldset>
              <div className="flex gap-2">
                <RainbowButton
                  disabled={createState.isLoading || updateState.isLoading}
                >
                  <Save size={16} />
                  {createState.isLoading || updateState.isLoading
                    ? "Saving…"
                    : "Save location"}
                </RainbowButton>
                {editing && (
                  <RainbowButton
                    type="button"
                    variant="ghost"
                    onClick={() => setEditing(undefined)}
                  >
                    Cancel
                  </RainbowButton>
                )}
              </div>
            </form>
          </Card>
        )}
        <Card>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Building2 size={18} className="text-sky-300" />
            Locations
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Configured offices and customer-facing availability.
          </p>
          {organization.isLoading && (
            <p role="status" className="mt-4">
              Loading locations…
            </p>
          )}
          {organization.error && (
            <p role="alert" className="mt-4 text-red-300">
              Locations could not be loaded.
            </p>
          )}
          <div className="mt-4 space-y-3">
            {organization.data?.data.locations?.map((location) => (
              <article
                key={location.id}
                className="dashboard-row rounded-xl border border-white/[0.07] bg-white/[0.035] p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{location.name}</h3>
                    <p className="text-sm text-slate-400">
                      {location.timezone}
                      {location.phone ? ` · ${location.phone}` : ""}
                    </p>
                  </div>
                  {canManage && (
                    <RainbowButton
                      variant="ghost"
                      onClick={() => setEditing(location)}
                    >
                      <Pencil size={15} />
                      Edit
                    </RainbowButton>
                  )}
                </div>
                <div className="mt-4 flex items-center gap-2 border-t border-white/[0.07] pt-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <Clock3 size={14} />
                  Weekly hours
                </div>
                <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                  {days.map((day) => (
                    <div key={day} className="flex justify-between gap-3">
                      <dt className="capitalize text-slate-400">{day}</dt>
                      <dd>
                        {location.hoursJson?.[day]
                          ?.map((slot) => `${slot.open}–${slot.close}`)
                          .join(", ") || "Closed"}
                      </dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
            {organization.data?.data.locations?.length === 0 && (
              <EmptyState
                title="No locations yet"
                description="Add a location to configure phone routing and business hours."
                icon={MapPin}
              />
            )}
          </div>
        </Card>
      </div>
    </>
  );
}
