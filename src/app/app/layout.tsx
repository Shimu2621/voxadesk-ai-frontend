import type { ReactNode } from "react";
import { AppShell } from "@/components/app-shell";
import { SessionGate } from "@/components/session-gate";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SessionGate>
      <AppShell>{children}</AppShell>
    </SessionGate>
  );
}
