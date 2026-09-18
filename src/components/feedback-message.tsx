import { AlertCircle, CheckCircle2 } from "lucide-react";

export function FeedbackMessage({
  message,
  tone = "success",
}: {
  message?: string;
  tone?: "success" | "error";
}) {
  if (!message) return null;
  const Icon = tone === "error" ? AlertCircle : CheckCircle2;
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={`mt-4 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm shadow-lg shadow-black/10 ${
        tone === "error"
          ? "border-red-400/20 bg-red-400/10 text-red-200"
          : "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
      }`}
    >
      <Icon className="mt-0.5 shrink-0" size={17} aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}
