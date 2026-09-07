import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

export default function SignupPage() {
  return (
    <AuthForm
      mode="signup"
      footer={
        <span>
          Already have an account?{" "}
          <Link
            className="font-bold text-[#58E8C7] hover:text-[#70ECD2]"
            href="/login"
          >
            Log in
          </Link>
        </span>
      }
    />
  );
}
