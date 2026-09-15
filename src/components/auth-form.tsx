"use client";

import type { FormEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import {
  CalendarCheck2,
  Eye,
  EyeOff,
  Github,
  Headphones,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand-logo";

type AuthResponse = {
  data?: {
    organization?: { id: string };
    organizations?: Array<{ id: string }>;
  };
  message?: string;
};

const features = [
  {
    icon: Headphones,
    title: "Always-on call handling",
    copy: "Answer every call with a natural AI receptionist, day or night.",
    tone: "border-primary/25 bg-primary/10 text-primary",
  },
  {
    icon: CalendarCheck2,
    title: "Effortless scheduling",
    copy: "Book appointments and capture qualified leads while you focus on growth.",
    tone: "border-violet-400/25 bg-violet-400/10 text-violet-300",
  },
  {
    icon: ShieldCheck,
    title: "Built for your team",
    copy: "Secure handoffs, shared context, and full visibility across every conversation.",
    tone: "border-amber-400/25 bg-amber-400/10 text-amber-300",
  },
];

export function AuthForm({
  mode,
  footer,
}: {
  mode: "login" | "signup";
  footer: ReactNode;
}) {
  const signup = mode === "signup";
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const reduceMotion = useReducedMotion();
  const entrance = reduceMotion
    ? {}
    : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 } };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(undefined);
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 12_000);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1"}/auth/${mode}`,
        {
          method: "POST",
          credentials: "include",
          signal: controller.signal,
          headers: { "content-type": "application/json" },
          body: JSON.stringify(values),
        },
      );
      const payload = (await response.json()) as AuthResponse;
      if (!response.ok)
        throw new Error(payload.message ?? "Authentication failed.");
      router.push("/app");
      router.refresh();
    } catch (cause) {
      setError(
        cause instanceof DOMException && cause.name === "AbortError"
          ? "The server is taking too long to respond. Make sure the backend and Redis are running, then try again."
          : cause instanceof Error
            ? cause.message
            : "Authentication failed.",
      );
    } finally {
      window.clearTimeout(timeoutId);
      setSubmitting(false);
    }
  }

  return (
    <main className="auth-page min-h-screen overflow-hidden bg-[#070910] text-[#f4f5ff]">
      <header className="relative z-20 flex h-21.5 items-center border-b border-white/[0.07] px-6 sm:px-10 lg:px-12">
        <BrandLogo />
      </header>
      <div className="relative grid min-h-[calc(100vh-86px)] lg:grid-cols-2">
        <section className="auth-grid relative hidden overflow-hidden border-r border-white/[0.07] px-12 py-14 lg:flex lg:flex-col xl:px-20 xl:py-16">
          <AnimatedGridPattern className="text-primary mask-[linear-gradient(to_bottom,black,transparent_92%)]" />
          <div
            className="auth-dots pointer-events-none absolute inset-0 overflow-hidden"
            aria-hidden="true"
          >
            <span className="auth-dot auth-dot-1" />
            <span className="auth-dot auth-dot-2" />
            <span className="auth-dot auth-dot-3" />
            <span className="auth-dot auth-dot-4" />
            <span className="auth-dot auth-dot-5" />
            <span className="auth-dot auth-dot-6" />
            <span className="auth-dot auth-dot-7" />
            <span className="auth-dot auth-dot-8" />
          </div>
          <div className="pointer-events-none absolute left-[61%] top-16 size-2 rounded-full bg-primary shadow-[0_0_18px_var(--primary)]" />
          <motion.div
            className="relative z-10 max-w-167.5"
            {...entrance}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <span className="relative inline-flex min-h-9 min-w-67.5 items-center justify-center pt-1 rounded-full border border-primary/25 bg-primary/10 px-10 text-center text-xs font-semibold uppercase leading-none tracking-[0.12em] text-primary">
              <Sparkles
                className="absolute left-4 top-1/2 -translate-y-1/2"
                size={14}
              />
              <span className="whitespace-nowrap">
                Built for modern service teams
              </span>
            </span>
            <h1 className="mt-7 max-w-xl text-4xl font-semibold leading-[1.16] tracking-[-0.035em] xl:text-5xl">
              Every call answered. Every opportunity captured.
            </h1>
            <p className="mt-5 max-w-xl text-base font-normal leading-7 text-[#a1a6c1]">
              VoxaDesk AI gives your business a smart, always-available
              receptionist that sounds human and works around the clock.
            </p>
            <motion.div
              className="mt-10 space-y-6 xl:mt-12"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: reduceMotion ? 0 : 0.12,
                    delayChildren: 0.2,
                  },
                },
              }}
            >
              {features.map(({ icon: Icon, title, copy, tone }) => (
                <motion.div
                  key={title}
                  className="flex items-start gap-4"
                  variants={{
                    hidden: { opacity: 0, x: -14 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <span
                    className={`grid size-11 shrink-0 place-items-center rounded-xl border ${tone}`}
                  >
                    <Icon size={21} />
                  </span>
                  <div>
                    <h2 className="font-medium text-[#eeeffa]">{title}</h2>
                    <p className="mt-1 text-sm font-normal leading-6 text-[#989db9]">
                      {copy}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.figure
            className="relative z-10 mt-auto max-w-167.5 rounded-2xl border border-white/9 bg-white/[0.035] p-6 backdrop-blur-sm"
            {...entrance}
            transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.35 }}
            whileHover={
              reduceMotion
                ? {}
                : { y: -3, borderColor: "rgba(88,232,199,0.22)" }
            }
          >
            <blockquote className="text-sm font-normal italic leading-6 text-[#adb1ca]">
              “VoxaDesk makes sure our customers always reach a helpful
              voice—even when our team is busy helping someone else.”
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-primary text-xs font-extrabold text-primary-foreground">
                VO
              </span>
              <span>
                <strong className="block text-sm font-semibold text-white">
                  VoxaDesk Operations
                </strong>
                <span className="text-xs font-normal text-[#9297b2]">
                  Customer experience team
                </span>
              </span>
            </figcaption>
          </motion.figure>
        </section>

        <section className="relative flex items-center justify-center px-5 py-12 sm:px-10 lg:px-14">
          <div className="auth-glow pointer-events-none absolute inset-0" />
          <motion.div
            className="relative z-10 w-full max-w-112.5"
            {...entrance}
            transition={{
              duration: 0.6,
              delay: reduceMotion ? 0 : 0.12,
              ease: "easeOut",
            }}
          >
            <div className="mb-10 flex justify-center lg:hidden">
              <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary">
                Your AI receptionist
              </span>
            </div>
            <div className="mb-9 text-center lg:text-left">
              <h1 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                {signup ? "Create your workspace" : "Welcome back"}
              </h1>
              <p className="mt-2 text-sm font-normal text-[#989db8]">
                {signup
                  ? "Launch your AI receptionist in a few guided steps."
                  : "Sign in to your VoxaDesk AI account"}
              </p>
            </div>
            {!signup && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    className="social-button"
                    variant="outline"
                    type="button"
                    disabled
                    title="Google sign-in coming soon"
                  >
                    <span className="google-g text-base font-black">G</span>{" "}
                    Google
                  </Button>
                  <Button
                    className="social-button"
                    variant="outline"
                    type="button"
                    disabled
                    title="GitHub sign-in coming soon"
                  >
                    <Github size={18} /> GitHub
                  </Button>
                </div>
                <div className="my-7 flex items-center gap-4 text-xs font-normal text-[#858aa7]">
                  <span className="h-px flex-1 bg-white/8" />
                  <span>or continue with email</span>
                  <span className="h-px flex-1 bg-white/8" />
                </div>
              </>
            )}
            <form
              className="space-y-5"
              onSubmit={submit}
              autoComplete={signup ? "on" : "off"}
              data-form-type={signup ? undefined : "other"}
            >
              {signup && (
                <label className="auth-label">
                  Full name
                  <input
                    className="auth-input"
                    name="name"
                    autoComplete="name"
                    placeholder="Your full name"
                  />
                </label>
              )}
              {signup && (
                <label className="auth-label">
                  Organization name
                  <input
                    className="auth-input"
                    name="organizationName"
                    required
                    minLength={2}
                    placeholder="Your company name"
                  />
                </label>
              )}
              <label className="auth-label">
                Email
                <input
                  className="auth-input"
                  type="email"
                  name="email"
                  autoComplete={signup ? "email" : "off"}
                  data-1p-ignore={signup ? undefined : true}
                  data-lpignore={signup ? undefined : "true"}
                  required
                  placeholder="you@company.com"
                />
              </label>
              <label className="auth-label">
                Password
                <span className="relative mt-2 block">
                  <input
                    className="auth-input mt-0! pr-12"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="new-password"
                    data-1p-ignore={signup ? undefined : true}
                    data-lpignore={signup ? undefined : "true"}
                    required
                    minLength={10}
                    placeholder={
                      signup ? "At least 10 characters" : "Enter your password"
                    }
                  />
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7e83a3] transition hover:text-primary"
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </span>
              </label>
              {!signup && (
                <div className="flex items-center justify-between gap-4 text-sm">
                  <label className="flex cursor-pointer items-center gap-2.5 text-[#9297b4]">
                    <input
                      className="auth-checkbox"
                      type="checkbox"
                      name="remember"
                    />
                    Remember me
                  </label>
                  <span className="font-semibold text-primary">
                    Forgot password?
                  </span>
                </div>
              )}
              {error && (
                <p
                  role="alert"
                  className="rounded-lg border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300"
                >
                  {error}
                </p>
              )}
              <motion.div
                whileHover={submitting || reduceMotion ? {} : { scale: 1.01 }}
                whileTap={submitting || reduceMotion ? {} : { scale: 0.985 }}
              >
                <Button
                  className="auth-submit"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting
                    ? "Please wait…"
                    : signup
                      ? "Create account"
                      : "Log in"}
                </Button>
              </motion.div>
            </form>
            <p className="mt-7 text-center text-sm font-normal text-[#989db8]">
              {footer}
            </p>
            <p className="mt-8 text-center text-xs font-normal leading-5 text-[#777c97]">
              By continuing, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
