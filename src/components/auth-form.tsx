"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

type AuthResponse = {
  data?: {
    organization?: { id: string };
    organizations?: Array<{ id: string }>;
  };
  message?: string;
};

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

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(undefined);
    const values = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1"}/auth/${mode}`,
        {
          method: "POST",
          credentials: "include",
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
        cause instanceof Error ? cause.message : "Authentication failed.",
      );
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-5">
      <Card className="w-full max-w-md p-7">
        <Link href="/" className="text-xl font-black">
          <span className="text-cyan-400">Voxa</span>Desk AI
        </Link>
        <h1 className="mt-8 text-3xl font-bold">
          {signup ? "Create your workspace" : "Welcome back"}
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          {signup
            ? "Launch your AI receptionist in a few guided steps."
            : "Sign in to manage calls and appointments."}
        </p>
        <form className="mt-7 space-y-4" onSubmit={submit}>
          {signup && (
            <label className="block text-sm">
              Full name
              <input
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none focus:border-cyan-400"
                name="name"
                autoComplete="name"
              />
            </label>
          )}
          {signup && (
            <label className="block text-sm">
              Organization name
              <input
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none focus:border-cyan-400"
                name="organizationName"
                required
                minLength={2}
              />
            </label>
          )}
          <label className="block text-sm">
            Email
            <input
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none focus:border-cyan-400"
              type="email"
              name="email"
              autoComplete="email"
              required
            />
          </label>
          <label className="block text-sm">
            Password
            <input
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none focus:border-cyan-400"
              type="password"
              name="password"
              autoComplete={signup ? "new-password" : "current-password"}
              required
              minLength={10}
            />
          </label>
          {error && (
            <p role="alert" className="text-sm text-red-300">
              {error}
            </p>
          )}
          <Button className="w-full" type="submit" disabled={submitting}>
            {submitting ? "Please wait…" : signup ? "Create account" : "Log in"}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-400">{footer}</p>
      </Card>
    </main>
  );
}
