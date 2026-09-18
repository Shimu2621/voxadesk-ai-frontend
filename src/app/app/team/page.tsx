"use client";

import { useState, type FormEvent } from "react";
import { MailPlus, Trash2, Users } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Card } from "@/components/ui/card";
import { FeedbackMessage } from "@/components/feedback-message";
import { apiErrorMessage } from "@/lib/api-error";
import {
  useCancelInvitationMutation,
  useGetSessionQuery,
  useGetTeamQuery,
  useInviteMemberMutation,
  useRemoveMemberMutation,
  useUpdateMemberRoleMutation,
} from "@/lib/voxadesk-api";
import { PageHeader } from "@/components/dashboard-ui";

const field =
  "rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm";

export default function TeamPage() {
  const team = useGetTeamQuery();
  const session = useGetSessionQuery();
  const [invite, inviteState] = useInviteMemberMutation();
  const [cancelInvitation] = useCancelInvitationMutation();
  const [updateRole] = useUpdateMemberRoleMutation();
  const [removeMember] = useRemoveMemberMutation();
  const [feedback, setFeedback] = useState<{
    message: string;
    error?: boolean;
  }>();
  const fail = (error: unknown, fallback: string) =>
    setFeedback({ message: apiErrorMessage(error, fallback), error: true });

  async function sendInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    try {
      await invite({
        email: String(values.email),
        role: String(values.role),
      }).unwrap();
      form.reset();
      setFeedback({
        message:
          "Invitation created. Mock email delivery requires the development outbox/debugger.",
      });
    } catch (error) {
      fail(error, "Could not create the invitation.");
    }
  }

  async function changeRole(id: string, role: string) {
    try {
      await updateRole({ id, role }).unwrap();
      setFeedback({ message: "Member role updated." });
    } catch (error) {
      fail(error, "Could not update the member role.");
    }
  }
  async function cancel(id: string) {
    if (!window.confirm("Cancel this invitation?")) return;
    try {
      await cancelInvitation(id).unwrap();
      setFeedback({ message: "Invitation cancelled." });
    } catch (error) {
      fail(error, "Could not cancel the invitation.");
    }
  }
  async function remove(id: string) {
    if (!window.confirm("Remove this member from the organization?")) return;
    try {
      await removeMember(id).unwrap();
      setFeedback({ message: "Member removed." });
    } catch (error) {
      fail(error, "Could not remove the member.");
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Owner administration"
        title="Team"
        description="Invite teammates, assign least-privilege roles, and manage workspace access."
        icon={Users}
      />
      <p className="sr-only">
        Invitations use the mock email outbox in portfolio mode; they are not
        delivered by a live email provider.
      </p>
      <FeedbackMessage
        message={feedback?.message}
        tone={feedback?.error ? "error" : "success"}
      />
      <div className="mt-8 grid gap-5 xl:grid-cols-2">
        <Card className="border-primary/15 bg-linear-to-br from-primary/[0.05] to-[#090e19]">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <MailPlus size={18} className="text-primary" />
            Invite member
          </h2>
          <form
            className="mt-4 flex flex-col gap-3 sm:flex-row"
            onSubmit={sendInvite}
          >
            <input
              aria-label="Invite email"
              className={`${field} flex-1`}
              type="email"
              name="email"
              required
              placeholder="member@example.com"
            />
            <select
              aria-label="Invite role"
              className={field}
              name="role"
              defaultValue="OPERATOR"
            >
              <option>MANAGER</option>
              <option>OPERATOR</option>
              <option>VIEWER</option>
            </select>
            <RainbowButton disabled={inviteState.isLoading}>
              <MailPlus size={16} />
              {inviteState.isLoading ? "Inviting…" : "Send invite"}
            </RainbowButton>
          </form>
          <h2 className="mt-8 font-bold">Pending invitations</h2>
          <div className="mt-3 space-y-2">
            {team.data?.data.invitations.map((invitation) => (
              <div
                key={invitation.id}
                className="dashboard-row flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/[0.07] bg-white/[0.035] p-4"
              >
                <div>
                  <p>{invitation.email}</p>
                  <p className="text-xs text-slate-400">
                    {invitation.role} · expires{" "}
                    {new Date(invitation.expiresAt).toLocaleDateString()}
                  </p>
                </div>
                <RainbowButton
                  variant="destructive"
                  onClick={() => void cancel(invitation.id)}
                >
                  <Trash2 size={15} />
                  Cancel invitation
                </RainbowButton>
              </div>
            ))}
            {team.data?.data.invitations.length === 0 && (
              <p className="text-sm text-slate-400">No pending invitations.</p>
            )}
          </div>
        </Card>
        <Card>
          <h2 className="font-bold">Members</h2>
          {team.isLoading && (
            <p role="status" className="mt-4">
              Loading team…
            </p>
          )}
          {team.error && (
            <p role="alert" className="mt-4 text-red-300">
              Team data is available to owners only.
            </p>
          )}
          <div className="mt-4 space-y-3">
            {team.data?.data.members.map((member) => (
              <div
                key={member.id}
                className="dashboard-row rounded-xl border border-white/[0.07] bg-white/[0.035] p-4"
              >
                <p className="font-semibold">
                  {member.user.name ?? member.user.email}
                </p>
                <p className="text-xs text-slate-400">{member.user.email}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <label className="text-xs text-slate-400">
                    Role{" "}
                    <select
                      className={`${field} ml-2`}
                      value={member.role}
                      onChange={(event) =>
                        void changeRole(member.id, event.target.value)
                      }
                    >
                      <option>OWNER</option>
                      <option>MANAGER</option>
                      <option>OPERATOR</option>
                      <option>VIEWER</option>
                    </select>
                  </label>
                  {member.user.id !== session.data?.data.user.id && (
                    <RainbowButton
                      variant="destructive"
                      onClick={() => void remove(member.id)}
                    >
                      <Trash2 size={15} />
                      Remove
                    </RainbowButton>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
