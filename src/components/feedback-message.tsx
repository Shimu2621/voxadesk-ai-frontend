export function FeedbackMessage({
  message,
  tone = "success",
}: {
  message?: string;
  tone?: "success" | "error";
}) {
  if (!message) return null;
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={`mt-3 rounded-lg border px-3 py-2 text-sm ${
        tone === "error"
          ? "border-red-400/20 bg-red-400/10 text-red-200"
          : "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
      }`}
    >
      {message}
    </p>
  );
}
