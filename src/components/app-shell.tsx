"use client";

import Link from "next/link";
import {
  Bot,
  CalendarDays,
  ChartNoAxesCombined,
  Inbox,
  LayoutDashboard,
  Library,
  PhoneCall,
  Settings,
  Activity,
} from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { useGetSessionQuery, useLogoutMutation } from "@/lib/voxadesk-api";
import { apiErrorMessage } from "@/lib/api-error";

const navigation = [
  ["Overview", "/app", LayoutDashboard],
  ["Agents", "/app/agents", Bot],
  ["Calls", "/app/calls", PhoneCall],
  ["Appointments", "/app/appointments", CalendarDays],
  ["Inbox", "/app/inbox", Inbox],
  ["Knowledge", "/app/knowledge", Library],
  ["Analytics", "/app/analytics", ChartNoAxesCombined],
  ["Operations", "/app/operations", Activity],
  ["Settings", "/app/settings", Settings],
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data: session } = useGetSessionQuery();
  const [logout, logoutState] = useLogoutMutation();
  const [logoutError, setLogoutError] = useState<string>();

  async function signOut() {
    setLogoutError(undefined);
    try {
      await logout().unwrap();
      router.replace("/login");
      router.refresh();
    } catch (error) {
      setLogoutError(apiErrorMessage(error, "Could not log out. Try again."));
    }
  }
  return (
    <div className="min-h-screen bg-slate-950 text-white md:grid md:grid-cols-[250px_1fr]">
      <aside className="border-b border-white/10 bg-slate-950/95 p-5 md:min-h-screen md:border-b-0 md:border-r">
        <BrandLogo compact />
        <p className="mt-2 text-xs text-slate-500">AI receptionist workspace</p>
        <p className="mt-4 truncate text-xs text-slate-400">
          {session?.data.user.name ?? session?.data.user.email}
        </p>
        <nav className="mt-8 grid grid-cols-2 gap-1 md:grid-cols-1">
          {navigation.map(([label, href, Icon]) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 hover:bg-white/10 hover:text-white"
            >
              <Icon size={17} /> {label}
            </Link>
          ))}
        </nav>
        <Button
          className="mt-6 w-full"
          disabled={logoutState.isLoading}
          onClick={() => void signOut()}
        >
          {logoutState.isLoading ? "Logging out…" : "Log out"}
        </Button>
        {logoutError && (
          <p role="alert" className="mt-2 text-xs text-red-300">
            {logoutError}
          </p>
        )}
      </aside>
      <main className="p-5 md:p-8">{children}</main>
    </div>
  );
}
