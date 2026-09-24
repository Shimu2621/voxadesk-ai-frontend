"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  BadgeCheck,
  KeyRound,
  MailCheck,
  Send,
  ShieldCheck,
  UserPlus,
} from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { SectionBadge } from "@/components/landing/section-badge";
import { RainbowButton } from "@/components/ui/rainbow-button";
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

const content = {
  verify: {
    title: "Verify your email",
    copy: "Enter the one-time token from your verification email.",
    eyebrow: "Secure verification",
    icon: MailCheck,
    tone: "cyan",
  },
  forgot: {
    title: "Reset your password",
    copy: "Enter your email and we’ll send reset instructions if the account exists.",
    eyebrow: "Account recovery",
    icon: KeyRound,
    tone: "blue",
  },
  reset: {
    title: "Choose a new password",
    copy: "Use the one-time token from your password reset email.",
    eyebrow: "Secure reset",
    icon: ShieldCheck,
    tone: "violet",
  },
  invitation: {
    title: "Accept your invitation",
    copy: "Existing users only need the token. New users must also choose a name and password.",
    eyebrow: "Join your workspace",
    icon: UserPlus,
    tone: "pink",
  },
} as const;

const fieldVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
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
  const reduceMotion = useReducedMotion();
  const pageContent = content[flow];
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
        router.push(result.data.requiresLogin ? "/login" : "/app");
      }
    } catch (cause) {
      setError(apiErrorMessage(cause, "The request could not be completed."));
    }
  }

  return (
    <main className="auth-page relative grid min-h-screen place-items-center overflow-hidden px-5 py-10 text-white sm:px-8">
      <AnimatedGridPattern className="text-primary opacity-30 mask-[radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-1/4 size-72 rounded-full bg-primary/10 blur-3xl"
        animate={reduceMotion ? undefined : { x: [0, 28, 0], y: [0, -18, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-12 size-64 rounded-full bg-violet-500/10 blur-3xl"
        animate={reduceMotion ? undefined : { x: [0, -22, 0], y: [0, 16, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="relative z-10 w-full max-w-xl"
        initial={reduceMotion ? undefined : { opacity: 0, y: 24, scale: 0.985 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <Card className="relative overflow-hidden border-primary/15 bg-[#0b0f19]/90 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-9">
          <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-linear-to-r from-transparent via-primary/70 to-transparent" />
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, x: -12 }}
            animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            transition={{ delay: 0.12, duration: 0.4 }}
          >
            <BrandLogo />
          </motion.div>
          <div className="mt-8">
            <SectionBadge icon={pageContent.icon} tone={pageContent.tone}>
              {pageContent.eyebrow}
            </SectionBadge>
            <h1 className="mt-5 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              {pageContent.title}
            </h1>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
              {pageContent.copy}
            </p>
          </div>
          <motion.form
            className="mt-7 space-y-5"
            onSubmit={submit}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: reduceMotion ? 0 : 0.08,
                  delayChildren: reduceMotion ? 0 : 0.18,
                },
              },
            }}
          >
            <motion.div variants={fieldVariants}>
              {flow === "forgot" ? (
                <label className="auth-label">
                  Email
                  <input
                    className="auth-input"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                  />
                </label>
              ) : (
                <label className="auth-label">
                  One-time token
                  <input
                    className="auth-input font-mono text-sm"
                    name="token"
                    required
                    minLength={32}
                    defaultValue={searchParams.get("token") ?? ""}
                    autoComplete="one-time-code"
                    placeholder="Paste your secure token"
                  />
                </label>
              )}
            </motion.div>
            {(flow === "reset" || flow === "invitation") && (
              <motion.label className="auth-label" variants={fieldVariants}>
                {flow === "invitation"
                  ? "Password (new users)"
                  : "New password"}
                <input
                  className="auth-input"
                  type="password"
                  name="password"
                  minLength={10}
                  required={flow === "reset"}
                  autoComplete="new-password"
                  placeholder="At least 10 characters"
                />
              </motion.label>
            )}
            {flow === "invitation" && (
              <motion.label className="auth-label" variants={fieldVariants}>
                Name (new users)
                <input
                  className="auth-input"
                  name="name"
                  minLength={2}
                  autoComplete="name"
                  placeholder="Your full name"
                />
              </motion.label>
            )}
            <motion.div variants={fieldVariants}>
              <RainbowButton
                className="w-full"
                disabled={busy}
                aria-busy={busy}
              >
                {success ? <BadgeCheck size={17} /> : <Send size={17} />}
                {busy ? "Submitting…" : pageContent.title}
              </RainbowButton>
            </motion.div>
          </motion.form>
          <FeedbackMessage message={success} />
          <FeedbackMessage message={error} tone="error" />
          <Link
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            href="/login"
          >
            <ArrowLeft size={15} />
            Back to login
          </Link>
        </Card>
      </motion.div>
    </main>
  );
}
