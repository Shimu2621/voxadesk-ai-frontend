import { Suspense } from "react";
import { AuthLifecycleForm } from "@/components/auth-lifecycle-form";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AuthLifecycleForm flow="verify" />
    </Suspense>
  );
}
