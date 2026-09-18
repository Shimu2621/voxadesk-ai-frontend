import type { ReactNode } from "react";
import { AppShell } from "@/components/app-shell";
import { SessionGate } from "@/components/session-gate";
import { DashboardPage } from "@/components/dashboard-ui";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SessionGate>
      <AppShell>
        <DashboardPage>{children}</DashboardPage>
      </AppShell>
    </SessionGate>
  );
}
