"use client";
import Link from "next/link";
import { Mic, ShieldCheck } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  useCreateSignedSessionMutation,
  useGetAgentsQuery,
} from "@/lib/voxadesk-api";
import {
  ConversationProvider,
  useConversationControls,
  useConversationStatus,
} from "@elevenlabs/react";

function DemoConsole() {
  const agents = useGetAgentsQuery();
  const [start, startState] = useCreateSignedSessionMutation();
  const [mode, setMode] = useState<"voice" | "text">("voice");
  const [notice, setNotice] = useState<string>();
  const [messages, setMessages] = useState<string[]>([]);
  const { startSession, endSession } = useConversationControls();
  const { status } = useConversationStatus();
  const published = agents.data?.data.find(
    (agent) => agent.status === "PUBLISHED",
  );
  async function begin() {
    if (!published) {
      setNotice("Publish an agent before starting a test.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      const session = await start(published.id).unwrap();
      if (session.data.token.startsWith("mock-session-")) {
        setNotice(
          "Mock voice session provisioned. Use live provider mode for audio transport.",
        );
      } else {
        await startSession({ signedUrl: session.data.token });
        setNotice(
          "Private voice session connected. This test is excluded from production analytics.",
        );
      }
    } catch {
      setMode("text");
      setNotice(
        "Microphone access was denied or unavailable. Text mode is ready.",
      );
    }
  }
  function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const text = String(new FormData(form).get("message") ?? "").trim();
    if (text) setMessages((current) => [...current, text]);
    form.reset();
  }
  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 p-5">
      <Card className="w-full max-w-xl p-8 text-center">
        <Link href="/" className="text-xl font-black">
          <span className="text-cyan-400">Voxa</span>Desk AI
        </Link>
        <div className="mx-auto mt-10 grid h-24 w-24 place-items-center rounded-full bg-cyan-400/10 ring-1 ring-cyan-400/30">
          <Mic className="text-cyan-400" size={36} />
        </div>
        <h1 className="mt-7 text-3xl font-bold">Private receptionist test</h1>
        <p className="mx-auto mt-3 max-w-md text-slate-400">
          By starting, you consent to a labeled test conversation with an AI
          receptionist.
        </p>
        <div className="mt-7 flex justify-center gap-3">
          <Button
            disabled={
              startState.isLoading ||
              status === "connected" ||
              status === "connecting"
            }
            onClick={() => void begin()}
          >
            Start voice test
          </Button>
          {status === "connected" && (
            <Button onClick={() => void endSession()}>End voice test</Button>
          )}
          <Button onClick={() => setMode("text")}>Use text</Button>
        </div>
        {notice && (
          <p role="status" className="mt-4 text-sm text-cyan-300">
            {notice}
          </p>
        )}
        {mode === "text" && (
          <form className="mt-6 flex gap-2" onSubmit={send}>
            <input
              name="message"
              required
              aria-label="Test message"
              className="flex-1 rounded-xl border border-white/10 bg-slate-900 px-4"
              placeholder="Ask a test question"
            />
            <Button>Send</Button>
          </form>
        )}
        <div className="mt-4 space-y-2 text-left">
          {messages.map((message, index) => (
            <p
              key={`${message}-${index}`}
              className="rounded-lg bg-white/5 p-3 text-sm"
            >
              You: {message}
            </p>
          ))}
        </div>
        <p className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck size={14} /> Permanent provider credentials are never
          sent to this browser.
        </p>
      </Card>
    </main>
  );
}

export default function DemoPage() {
  return (
    <ConversationProvider>
      <DemoConsole />
    </ConversationProvider>
  );
}
