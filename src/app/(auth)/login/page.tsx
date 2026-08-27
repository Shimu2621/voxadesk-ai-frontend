import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

export default function LoginPage() {
  return <AuthForm mode="login" footer={<span>New to VoxaDesk AI? <Link className="text-cyan-400" href="/signup">Create an account</Link></span>} />;
}
