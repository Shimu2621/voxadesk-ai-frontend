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
  Building2,
  BookOpenCheck,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/brand-logo";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useGetSessionQuery, useLogoutMutation } from "@/lib/voxadesk-api";
import { apiErrorMessage } from "@/lib/api-error";

const navigation: Array<{
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  roles?: readonly string[];
}> = [
  { label: "Overview", href: "/app", icon: LayoutDashboard },
  { label: "Agents", href: "/app/agents", icon: Bot },
  { label: "Calls", href: "/app/calls", icon: PhoneCall },
  { label: "Appointments", href: "/app/appointments", icon: CalendarDays },
  { label: "Inbox", href: "/app/inbox", icon: Inbox },
  { label: "Knowledge", href: "/app/knowledge", icon: Library },
  { label: "Catalog", href: "/app/catalog", icon: BookOpenCheck },
  { label: "Locations", href: "/app/organization", icon: Building2 },
  { label: "Analytics", href: "/app/analytics", icon: ChartNoAxesCombined },
  { label: "Team", href: "/app/team", icon: Users, roles: ["OWNER"] },
  {
    label: "Operations",
    href: "/app/operations",
    icon: Activity,
    roles: ["OWNER"],
  },
  {
    label: "Settings",
    href: "/app/settings",
    icon: Settings,
    roles: ["OWNER", "MANAGER"],
  },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
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
    <div className="min-h-screen bg-[#050812] text-white md:grid md:grid-cols-[250px_1fr]">
      <aside className="border-b border-white/[0.08] bg-[#070b14]/95 p-4 backdrop-blur-xl md:sticky md:top-0 md:h-screen md:border-b-0 md:border-r md:p-5">
        <BrandLogo compact />
        <p className="mt-2 hidden text-xs text-slate-500 md:block">
          AI receptionist workspace
        </p>
        <p className="mt-2 truncate text-xs text-slate-400 md:mt-4">
          {session?.data.user.name ?? session?.data.user.email}
        </p>
        <nav className="mt-4 flex gap-1 overflow-x-auto pb-2 [scrollbar-width:none] md:mt-8 md:grid md:grid-cols-1 md:overflow-visible md:pb-0">
          {navigation
            .filter(
              (item) =>
                !item.roles ||
                item.roles.some((role) => role === session?.data.role),
            )
            .map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                aria-current={pathname === href ? "page" : undefined}
                className={`flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:gap-3 md:py-2.5 md:text-sm ${
                  pathname === href
                    ? "border-primary/20 bg-primary/10 text-primary shadow-[0_0_24px_rgba(88,232,199,0.06)]"
                    : "border-transparent text-slate-400 hover:border-white/[0.07] hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                <Icon size={17} /> {label}
              </Link>
            ))}
        </nav>
        <RainbowButton
          className="mt-2 w-full md:mt-6"
          disabled={logoutState.isLoading}
          onClick={() => void signOut()}
        >
          {logoutState.isLoading ? "Logging out…" : "Log out"}
        </RainbowButton>
        {logoutError && (
          <p role="alert" className="mt-2 text-xs text-red-300">
            {logoutError}
          </p>
        )}
      </aside>
      <main className="dashboard-main min-w-0 p-5 sm:p-7 md:p-8 lg:p-10">
        {children}
      </main>
    </div>
  );
}
