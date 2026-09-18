"use client";
import { useState, type FormEvent } from "react";
import {
  Building2,
  Check,
  CreditCard,
  PlugZap,
  Save,
  Settings,
} from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Card } from "@/components/ui/card";
import {
  useConnectIntegrationMutation,
  useCreateCheckoutMutation,
  useGetBillingQuery,
  useGetIntegrationsQuery,
  useGetOrganizationQuery,
  useUpdateOrganizationMutation,
  useCreateBillingPortalMutation,
  useGetSessionQuery,
} from "@/lib/voxadesk-api";
import { FeedbackMessage } from "@/components/feedback-message";
import { apiErrorMessage } from "@/lib/api-error";
import { PageHeader, StatusBadge } from "@/components/dashboard-ui";
const field =
  "mt-1 w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2";
export default function Page() {
  const organization = useGetOrganizationQuery();
  const integrations = useGetIntegrationsQuery();
  const session = useGetSessionQuery();
  const billing = useGetBillingQuery();
  const [update] = useUpdateOrganizationMutation();
  const [connect, connectState] = useConnectIntegrationMutation();
  const [checkout] = useCreateCheckoutMutation();
  const [portal, portalState] = useCreateBillingPortalMutation();
  const isOwner = session.data?.data.role === "OWNER";
  const canManage = isOwner || session.data?.data.role === "MANAGER";
  const [feedback, setFeedback] = useState<{
    message: string;
    error?: boolean;
  }>();
  function failed(error: unknown, fallback: string) {
    setFeedback({ message: apiErrorMessage(error, fallback), error: true });
  }
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    setFeedback(undefined);
    try {
      await update({
        name: String(values.name),
        timezone: String(values.timezone),
        locale: "en-US",
        onboardingStep: 6,
      }).unwrap();
      setFeedback({ message: "Organization settings saved." });
    } catch (error) {
      failed(error, "Could not save organization settings.");
    }
  }
  async function connectProvider(type: string) {
    setFeedback(undefined);
    try {
      await connect({
        type,
        mode: billing.data?.data.providerMode ?? "disabled",
      }).unwrap();
      setFeedback({ message: `${type} connected.` });
    } catch (error) {
      failed(error, `Could not connect ${type}.`);
    }
  }
  async function choosePlan(plan: string) {
    setFeedback(undefined);
    try {
      const result = await checkout(plan).unwrap();
      window.location.assign(result.data.url);
    } catch (error) {
      failed(error, `Could not start ${plan} checkout.`);
    }
  }
  async function openPortal() {
    setFeedback(undefined);
    try {
      const result = await portal().unwrap();
      window.location.assign(result.data.url);
    } catch (error) {
      failed(error, "Could not open the Stripe customer portal.");
    }
  }
  return (
    <>
      <PageHeader
        eyebrow="Workspace administration"
        title="Settings & billing"
        description="Manage organization defaults, provider connections, and subscription controls."
        icon={Settings}
      />
      <FeedbackMessage
        message={feedback?.message}
        tone={feedback?.error ? "error" : "success"}
      />
      <div className="mt-8 grid gap-5 xl:grid-cols-2">
        <Card className="border-primary/15 bg-linear-to-br from-primary/[0.045] to-[#090e19]">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Building2 size={18} className="text-primary" />
            Organization profile
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Defaults used throughout your customer-facing workspace.
          </p>
          {canManage && organization.data && (
            <form className="mt-4 space-y-3" onSubmit={save}>
              <label className="block text-sm">
                Name
                <input
                  className={field}
                  name="name"
                  required
                  defaultValue={organization.data.data.name}
                />
              </label>
              <label className="block text-sm">
                Timezone
                <input
                  className={field}
                  name="timezone"
                  required
                  defaultValue={organization.data.data.timezone}
                />
              </label>
              <RainbowButton>
                <Save size={16} />
                Save organization
              </RainbowButton>
            </form>
          )}
        </Card>
        <Card>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <PlugZap size={18} className="text-sky-300" />
            Provider integrations
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            The backend is running in{" "}
            {billing.data?.data.providerMode ?? "unknown"} provider mode.
            Credentials remain server-side.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {isOwner &&
              ["ELEVENLABS", "TWILIO", "GOOGLE_CALENDAR", "STRIPE"].map(
                (type) => (
                  <RainbowButton
                    variant={
                      integrations.data?.data.some(
                        (item) =>
                          item.type === type && item.status === "connected",
                      )
                        ? "secondary"
                        : "outline"
                    }
                    key={type}
                    disabled={
                      connectState.isLoading ||
                      integrations.data?.data.some(
                        (item) =>
                          item.type === type && item.status === "connected",
                      )
                    }
                    onClick={() => void connectProvider(type)}
                  >
                    {integrations.data?.data.some(
                      (item) =>
                        item.type === type && item.status === "connected",
                    ) && <Check size={15} />}
                    {type.replaceAll("_", " ")}
                  </RainbowButton>
                ),
              )}
          </div>
        </Card>
        <Card className="xl:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <CreditCard size={18} className="text-violet-300" />
                Billing
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Choose a plan or manage the current subscription.
              </p>
            </div>
            <StatusBadge
              tone={
                billing.data?.data.subscription?.status === "active"
                  ? "success"
                  : "neutral"
              }
            >
              {billing.data?.data.subscription?.status ?? "No subscription"}
            </StatusBadge>
          </div>
          <p className="mt-2 text-sm text-slate-400">
            Current plan: {billing.data?.data.planCode ?? "loading"} ·{" "}
            {billing.data?.data.subscription?.status ?? "no paid subscription"}
          </p>
          <p className="mt-2 text-xs text-amber-200">
            Stripe Checkout and the customer portal require a configured
            provider. Mock mode opens simulated URLs only.
          </p>
          <div className="mt-4 flex gap-2">
            {isOwner &&
              ["growth", "agency"].map((plan) => (
                <RainbowButton key={plan} onClick={() => void choosePlan(plan)}>
                  <CreditCard size={16} />
                  Choose {plan}
                </RainbowButton>
              ))}
            {isOwner && billing.data?.data.subscription && (
              <RainbowButton
                variant="secondary"
                disabled={portalState.isLoading}
                onClick={() => void openPortal()}
              >
                Manage billing
              </RainbowButton>
            )}
          </div>
        </Card>
      </div>
    </>
  );
}
