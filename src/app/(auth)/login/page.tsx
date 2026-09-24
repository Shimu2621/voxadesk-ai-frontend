import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ oauth_error?: string }>;
}) {
  const { oauth_error: oauthError } = await searchParams;
  return (
    <AuthForm
      mode="login"
      initialError={oauthError}
      footer={
        <span>
          New to VoxaDesk AI?{" "}
          <Link
            className="font-bold text-primary hover:text-cyan-300"
            href="/signup"
          >
            Sign up
          </Link>
        </span>
      }
    />
  );
}
