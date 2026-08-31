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
  return (
    <div className="min-h-screen bg-slate-950 text-white md:grid md:grid-cols-[250px_1fr]">
      <aside className="border-b border-white/10 bg-slate-950/95 p-5 md:min-h-screen md:border-b-0 md:border-r">
        <Link href="/" className="text-xl font-black tracking-tight">
          <span className="text-cyan-400">Voxa</span>Desk AI
        </Link>
        <p className="mt-2 text-xs text-slate-500">AI receptionist workspace</p>
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
      </aside>
      <main className="p-5 md:p-8">{children}</main>
    </div>
  );
}
