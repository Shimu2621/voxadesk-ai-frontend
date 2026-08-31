import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

export default function SignupPage() {
  return (
    <AuthForm
      mode="signup"
      footer={
        <span>
          Already have an account?{" "}
          <Link className="text-cyan-400" href="/login">
            Log in
          </Link>
        </span>
      }
    />
  );
}
