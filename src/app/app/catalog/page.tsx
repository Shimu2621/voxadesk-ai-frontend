"use client";

import { useState, type FormEvent } from "react";
import {
  BookOpenCheck,
  CircleHelp,
  Pencil,
  Save,
  Trash2,
  Wrench,
} from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Card } from "@/components/ui/card";
import { FeedbackMessage } from "@/components/feedback-message";
import { apiErrorMessage } from "@/lib/api-error";
import {
  type Faq,
  type Service,
  useDeleteFaqMutation,
  useDeleteServiceMutation,
  useGetFaqsQuery,
  useGetServicesQuery,
  useGetSessionQuery,
  useSaveFaqMutation,
  useSaveServiceMutation,
} from "@/lib/voxadesk-api";
import { EmptyState, PageHeader, StatusBadge } from "@/components/dashboard-ui";

const field =
  "mt-1 w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2";

export default function CatalogPage() {
  const services = useGetServicesQuery();
  const faqs = useGetFaqsQuery();
  const session = useGetSessionQuery();
  const [saveService, serviceState] = useSaveServiceMutation();
  const [deleteService] = useDeleteServiceMutation();
  const [saveFaq, faqState] = useSaveFaqMutation();
  const [deleteFaq] = useDeleteFaqMutation();
  const [editingService, setEditingService] = useState<Service>();
  const [editingFaq, setEditingFaq] = useState<Faq>();
  const [feedback, setFeedback] = useState<{
    message: string;
    error?: boolean;
  }>();
  const canManage =
    session.data?.data.role === "OWNER" ||
    session.data?.data.role === "MANAGER";
  const fail = (error: unknown, fallback: string) =>
    setFeedback({ message: apiErrorMessage(error, fallback), error: true });

  async function submitService(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    try {
      await saveService({
        id: editingService?.id,
        body: {
          name: String(values.name),
          description: String(values.description),
          durationMinutes: Number(values.durationMinutes),
          bufferMinutes: Number(values.bufferMinutes),
          priceLabel: String(values.priceLabel),
          bookingRulesJson: {
            horizonDays: Number(values.horizonDays),
            minimumNoticeHours: Number(values.minimumNoticeHours),
          },
          active: true,
        },
      }).unwrap();
      setFeedback({
        message: editingService ? "Service updated." : "Service created.",
      });
      setEditingService(undefined);
      form.reset();
    } catch (error) {
      fail(error, "Could not save the service.");
    }
  }

  async function submitFaq(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    try {
      await saveFaq({
        id: editingFaq?.id,
        body: {
          question: String(values.question),
          answer: String(values.answer),
          active: true,
        },
      }).unwrap();
      setFeedback({ message: editingFaq ? "FAQ updated." : "FAQ created." });
      setEditingFaq(undefined);
      form.reset();
    } catch (error) {
      fail(error, "Could not save the FAQ.");
    }
  }

  async function deactivate(kind: "service" | "faq", id: string) {
    if (!window.confirm(`Deactivate this ${kind}?`)) return;
    try {
      await (kind === "service" ? deleteService(id) : deleteFaq(id)).unwrap();
      setFeedback({
        message: `${kind === "service" ? "Service" : "FAQ"} deactivated.`,
      });
    } catch (error) {
      fail(error, `Could not deactivate the ${kind}.`);
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Bookable catalog"
        title="Services & FAQs"
        description="Manage the services agents can book and the approved answers they can confidently provide."
        icon={BookOpenCheck}
      />
      <p className="sr-only">
        Delete actions deactivate records so historical references remain
        intact.
      </p>
      <FeedbackMessage
        message={feedback?.message}
        tone={feedback?.error ? "error" : "success"}
      />
      <div className="mt-8 grid gap-5 xl:grid-cols-2">
        <Card className="border-primary/15 bg-linear-to-br from-primary/4 to-[#090e19]">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Wrench size={18} className="text-primary" />
            Services
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Bookable offerings, duration, pricing context, and notice rules.
          </p>
          {canManage && (
            <form
              key={editingService?.id ?? "new-service"}
              className="mt-4 grid gap-3 sm:grid-cols-2"
              onSubmit={submitService}
            >
              <label className="text-sm">
                Name
                <input
                  className={field}
                  name="name"
                  required
                  minLength={2}
                  defaultValue={editingService?.name}
                />
              </label>
              <label className="text-sm">
                Price label
                <input
                  className={field}
                  name="priceLabel"
                  defaultValue={editingService?.priceLabel ?? ""}
                />
              </label>
              <label className="text-sm sm:col-span-2">
                Description
                <textarea
                  className={field}
                  name="description"
                  defaultValue={editingService?.description ?? ""}
                />
              </label>
              <label className="text-sm">
                Duration (minutes)
                <input
                  className={field}
                  type="number"
                  name="durationMinutes"
                  min={5}
                  max={480}
                  required
                  defaultValue={editingService?.durationMinutes ?? 60}
                />
              </label>
              <label className="text-sm">
                Buffer (minutes)
                <input
                  className={field}
                  type="number"
                  name="bufferMinutes"
                  min={0}
                  max={240}
                  required
                  defaultValue={editingService?.bufferMinutes ?? 0}
                />
              </label>
              <label className="text-sm">
                Booking horizon (days)
                <input
                  className={field}
                  type="number"
                  name="horizonDays"
                  min={1}
                  max={365}
                  required
                  defaultValue={
                    editingService?.bookingRulesJson?.horizonDays ?? 60
                  }
                />
              </label>
              <label className="text-sm">
                Minimum notice (hours)
                <input
                  className={field}
                  type="number"
                  name="minimumNoticeHours"
                  min={0}
                  max={720}
                  required
                  defaultValue={
                    editingService?.bookingRulesJson?.minimumNoticeHours ?? 2
                  }
                />
              </label>
              <div className="flex gap-2 sm:col-span-2">
                <RainbowButton disabled={serviceState.isLoading}>
                  <Save size={16} />
                  {serviceState.isLoading ? "Saving…" : "Save service"}
                </RainbowButton>
                {editingService && (
                  <RainbowButton
                    type="button"
                    variant="ghost"
                    onClick={() => setEditingService(undefined)}
                  >
                    Cancel
                  </RainbowButton>
                )}
              </div>
            </form>
          )}
          {services.isLoading && (
            <p role="status" className="mt-4">
              Loading services…
            </p>
          )}
          {services.error && (
            <p role="alert" className="mt-4 text-red-300">
              Services could not be loaded.
            </p>
          )}
          <div className="mt-5 space-y-2">
            {services.data?.data.map((service) => (
              <article
                className="dashboard-row rounded-xl border border-white/[0.07] bg-white/[0.035] p-4"
                key={service.id}
              >
                <div className="flex flex-wrap justify-between gap-2">
                  <div>
                    <h3 className="font-semibold">{service.name}</h3>
                    <p className="text-sm text-slate-400">
                      {service.durationMinutes} min ·{" "}
                      {service.priceLabel || "Price on request"} ·{" "}
                      {service.active ? "Active" : "Inactive"}
                    </p>
                    <div className="mt-2">
                      <StatusBadge
                        tone={service.active ? "success" : "neutral"}
                      >
                        {service.active ? "Active" : "Inactive"}
                      </StatusBadge>
                    </div>
                  </div>
                  {canManage && service.active && (
                    <div className="flex gap-2">
                      <RainbowButton
                        variant="ghost"
                        onClick={() => setEditingService(service)}
                      >
                        <Pencil size={15} />
                        Edit
                      </RainbowButton>
                      <RainbowButton
                        variant="destructive"
                        onClick={() => void deactivate("service", service.id)}
                      >
                        <Trash2 size={15} />
                        Deactivate
                      </RainbowButton>
                    </div>
                  )}
                </div>
              </article>
            ))}
            {services.data?.data.length === 0 && (
              <EmptyState
                title="No services yet"
                description="Add a service to make it available for agent-assisted bookings."
                icon={Wrench}
              />
            )}
          </div>
        </Card>
        <Card>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <CircleHelp size={18} className="text-sky-300" />
            Frequently asked questions
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Reviewed answers agents can use during customer conversations.
          </p>
          {canManage && (
            <form
              key={editingFaq?.id ?? "new-faq"}
              className="mt-4 space-y-3"
              onSubmit={submitFaq}
            >
              <label className="block text-sm">
                Question
                <input
                  className={field}
                  name="question"
                  required
                  minLength={3}
                  defaultValue={editingFaq?.question}
                />
              </label>
              <label className="block text-sm">
                Answer
                <textarea
                  className={field}
                  name="answer"
                  rows={4}
                  required
                  minLength={2}
                  defaultValue={editingFaq?.answer}
                />
              </label>
              <div className="flex gap-2">
                <RainbowButton disabled={faqState.isLoading}>
                  <Save size={16} />
                  {faqState.isLoading ? "Saving…" : "Save FAQ"}
                </RainbowButton>
                {editingFaq && (
                  <RainbowButton
                    type="button"
                    variant="ghost"
                    onClick={() => setEditingFaq(undefined)}
                  >
                    Cancel
                  </RainbowButton>
                )}
              </div>
            </form>
          )}
          {faqs.isLoading && (
            <p role="status" className="mt-4">
              Loading FAQs…
            </p>
          )}
          {faqs.error && (
            <p role="alert" className="mt-4 text-red-300">
              FAQs could not be loaded.
            </p>
          )}
          <div className="mt-5 space-y-2">
            {faqs.data?.data.map((faq) => (
              <article
                className="dashboard-row rounded-xl border border-white/[0.07] bg-white/[0.035] p-4"
                key={faq.id}
              >
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="mt-1 text-sm text-slate-300">{faq.answer}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {faq.active ? "Active" : "Inactive"}
                </p>
                {canManage && faq.active && (
                  <div className="mt-2 flex gap-2">
                    <RainbowButton
                      variant="secondary"
                      onClick={() => setEditingFaq(faq)}
                    >
                      <Pencil size={15} />
                      Edit
                    </RainbowButton>
                    <RainbowButton
                      variant="destructive"
                      onClick={() => void deactivate("faq", faq.id)}
                    >
                      <Trash2 size={15} />
                      Deactivate
                    </RainbowButton>
                  </div>
                )}
              </article>
            ))}
            {faqs.data?.data.length === 0 && (
              <EmptyState
                title="No FAQs yet"
                description="Add approved answers for common customer questions."
                icon={CircleHelp}
              />
            )}
          </div>
        </Card>
      </div>
    </>
  );
}
