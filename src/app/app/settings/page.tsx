"use client";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  useConnectIntegrationMutation,
  useCreateCheckoutMutation,
  useGetBillingQuery,
  useGetIntegrationsQuery,
  useGetOrganizationQuery,
  useGetTeamQuery,
  useInviteMemberMutation,
  useUpdateOrganizationMutation,
} from "@/lib/voxadesk-api";
const field =
  "mt-1 w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2";
export default function Page() {
  const organization = useGetOrganizationQuery();
  const integrations = useGetIntegrationsQuery();
  const team = useGetTeamQuery();
  const billing = useGetBillingQuery();
  const [update] = useUpdateOrganizationMutation();
  const [connect, connectState] = useConnectIntegrationMutation();
  const [invite, inviteState] = useInviteMemberMutation();
  const [checkout] = useCreateCheckoutMutation();
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    await update({
      name: String(values.name),
      timezone: String(values.timezone),
      locale: "en-US",
      onboardingStep: 6,
    }).unwrap();
  }
  async function sendInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    await invite({
      email: String(values.email),
      role: String(values.role),
    }).unwrap();
    form.reset();
  }
  return (
    <>
      <p className="text-sm text-cyan-400">Workspace administration</p>
      <h1 className="mt-1 text-3xl font-bold">Settings</h1>
      <div className="mt-8 grid gap-5 xl:grid-cols-2">
        <Card>
          <h2 className="font-bold">Organization</h2>
          {organization.data && (
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
              <Button>Save organization</Button>
            </form>
          )}
        </Card>
        <Card>
          <h2 className="font-bold">Provider integrations</h2>
          <p className="mt-2 text-sm text-slate-400">
            The backend is running in{" "}
            {billing.data?.data.providerMode ?? "unknown"} provider mode.
            Credentials remain server-side.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["ELEVENLABS", "TWILIO", "GOOGLE_CALENDAR", "STRIPE"].map(
              (type) => (
                <Button
                  key={type}
                  disabled={
                    connectState.isLoading ||
                    integrations.data?.data.some(
                      (item) =>
                        item.type === type && item.status === "connected",
                    )
                  }
                  onClick={() =>
                    void connect({
                      type,
                      mode: billing.data?.data.providerMode ?? "disabled",
                    })
                  }
                >
                  {type}
                </Button>
              ),
            )}
          </div>
        </Card>
        <Card>
          <h2 className="font-bold">Team</h2>
          <form className="mt-4 flex flex-wrap gap-2" onSubmit={sendInvite}>
            <input
              className={field}
              type="email"
              name="email"
              required
              placeholder="member@example.com"
            />
            <select className={field} name="role" defaultValue="OPERATOR">
              <option>MANAGER</option>
              <option>OPERATOR</option>
              <option>VIEWER</option>
            </select>
            <Button disabled={inviteState.isLoading}>Invite</Button>
          </form>
          <div className="mt-4 space-y-2">
            {team.data?.data.members.map((member) => (
              <p key={member.id} className="rounded-lg bg-white/5 p-3 text-sm">
                {member.user.name ?? member.user.email} · {member.role}
              </p>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="font-bold">Billing</h2>
          <p className="mt-2 text-sm text-slate-400">
            Current plan: {billing.data?.data.planCode ?? "loading"} ·{" "}
            {billing.data?.data.subscription?.status ?? "no paid subscription"}
          </p>
          <div className="mt-4 flex gap-2">
            {["growth", "agency"].map((plan) => (
              <Button
                key={plan}
                onClick={async () => {
                  const result = await checkout(plan).unwrap();
                  window.location.assign(result.data.url);
                }}
              >
                Choose {plan}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
