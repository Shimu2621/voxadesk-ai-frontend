"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FeedbackMessage } from "@/components/feedback-message";
import { apiErrorMessage } from "@/lib/api-error";
import {
  useAcceptInvitationMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
} from "@/lib/voxadesk-api";

type Flow = "verify" | "forgot" | "reset" | "invitation";

const content: Record<Flow, { title: string; copy: string }> = {
  verify: {
    title: "Verify your email",
    copy: "Enter the one-time token from your verification email.",
  },
  forgot: {
    title: "Reset your password",
    copy: "Enter your email and we’ll send reset instructions if the account exists.",
  },
  reset: {
    title: "Choose a new password",
    copy: "Use the one-time token from your password reset email.",
  },
  invitation: {
    title: "Accept your invitation",
    copy: "Existing users only need the token. New users must also choose a name and password.",
  },
};

export function AuthLifecycleForm({ flow }: { flow: Flow }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [verify, verifyState] = useVerifyEmailMutation();
  const [forgot, forgotState] = useForgotPasswordMutation();
  const [reset, resetState] = useResetPasswordMutation();
  const [accept, acceptState] = useAcceptInvitationMutation();
  const [success, setSuccess] = useState<string>();
  const [error, setError] = useState<string>();
  const busy =
    verifyState.isLoading ||
    forgotState.isLoading ||
    resetState.isLoading ||
    acceptState.isLoading;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess(undefined);
    setError(undefined);
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    try {
      if (flow === "verify") {
        await verify(String(values.token)).unwrap();
        setSuccess("Email verified. You can now log in.");
      } else if (flow === "forgot") {
        const result = await forgot(String(values.email)).unwrap();
        setSuccess(result.message);
        form.reset();
      } else if (flow === "reset") {
        await reset({
          token: String(values.token),
          password: String(values.password),
        }).unwrap();
        setSuccess("Password updated. You can now log in.");
        form.reset();
      } else {
        const name = String(values.name ?? "").trim();
        const password = String(values.password ?? "");
        const result = await accept({
          token: String(values.token),
          ...(name ? { name } : {}),
          ...(password ? { password } : {}),
        }).unwrap();
        if (result.data.requiresLogin) {
          router.push("/login");
        } else {
          router.push("/app");
        }
      }
    } catch (cause) {
      setError(apiErrorMessage(cause, "The request could not be completed."));
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 p-5 text-white">
      <Card className="w-full max-w-lg p-7">
        <BrandLogo />
        <h1 className="mt-8 text-3xl font-bold">{content[flow].title}</h1>
        <p className="mt-2 text-sm text-slate-400">{content[flow].copy}</p>
        <form className="mt-6 space-y-4" onSubmit={submit}>
          {flow === "forgot" ? (
            <label className="block text-sm">
              Email
              <input
                className="mt-1 w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
                type="email"
                name="email"
                required
              />
            </label>
          ) : (
            <label className="block text-sm">
              One-time token
              <input
                className="mt-1 w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
                name="token"
                required
                minLength={32}
                defaultValue={searchParams.get("token") ?? ""}
                autoComplete="one-time-code"
              />
            </label>
          )}
          {(flow === "reset" || flow === "invitation") && (
            <label className="block text-sm">
              {flow === "invitation" ? "Password (new users)" : "New password"}
              <input
                className="mt-1 w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
                type="password"
                name="password"
                minLength={10}
                required={flow === "reset"}
                autoComplete="new-password"
              />
            </label>
          )}
          {flow === "invitation" && (
            <label className="block text-sm">
              Name (new users)
              <input
                className="mt-1 w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2"
                name="name"
                minLength={2}
                autoComplete="name"
              />
            </label>
          )}
          <Button disabled={busy}>
            {busy ? "Submitting…" : content[flow].title}
          </Button>
        </form>
        <FeedbackMessage message={success} />
        <FeedbackMessage message={error} tone="error" />
        <Link className="mt-6 inline-block text-sm text-cyan-400" href="/login">
          Back to login
        </Link>
      </Card>
    </main>
  );
}
