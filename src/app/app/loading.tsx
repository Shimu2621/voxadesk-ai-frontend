import { DashboardSkeleton } from "@/components/dashboard-ui";

export default function Loading() {
  return <DashboardSkeleton label="Loading workspace" cards={4} />;
}
