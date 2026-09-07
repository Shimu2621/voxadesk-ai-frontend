import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

export default function LoginPage() {
  return (
    <AuthForm
      mode="login"
      footer={
        <span>
          New to VoxaDesk AI?{" "}
          <Link
            className="font-bold text-[#58E8C7] hover:text-[#70ECD2]"
            href="/signup"
          >
            Sign up
          </Link>
        </span>
      }
    />
  );
}
