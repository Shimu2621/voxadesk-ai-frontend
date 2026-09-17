"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useGetSessionQuery } from "@/lib/voxadesk-api";

export function SessionGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const session = useGetSessionQuery();

  useEffect(() => {
    if (session.isError) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [pathname, router, session.isError]);

  if (session.isLoading || session.isError) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-950 text-slate-300">
        <p role="status">
          {session.isError ? "Redirecting to login…" : "Restoring session…"}
        </p>
      </main>
    );
  }

  return children;
}
