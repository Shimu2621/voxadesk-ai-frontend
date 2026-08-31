import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  Headphones,
  PhoneCall,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const features = [
  [
    PhoneCall,
    "Never miss a call",
    "VoxaDesk AI answers phone and browser conversations around the clock.",
  ],
  [
    CalendarCheck,
    "Book while you sleep",
    "Live calendar tools find valid slots and create confirmed appointments.",
  ],
  [
    Headphones,
    "Know when to hand off",
    "Sensitive or complex calls transfer to staff or create a prioritized callback.",
  ],
] as const;

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
      <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="text-xl font-black">
          <span className="text-cyan-400">Voxa</span>Desk AI
        </Link>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost">
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get started</Link>
          </Button>
        </div>
      </nav>
      <section className="relative mx-auto max-w-5xl px-6 pb-24 pt-20 text-center">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
          <Sparkles size={15} /> Real-time AI reception, built for action
        </div>
        <h1 className="text-5xl font-black tracking-tight sm:text-7xl">
          Every call answered.
          <br />
          <span className="text-cyan-400">Every opportunity captured.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          VoxaDesk AI answers questions, qualifies leads, books appointments,
          and brings in your team when a human touch matters.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/signup">
              Build your receptionist <ArrowRight className="ml-2" size={17} />
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/demo">Try the voice demo</Link>
          </Button>
        </div>
        <div className="mt-10 flex justify-center gap-6 text-xs text-slate-400">
          <span className="flex gap-2">
            <ShieldCheck size={15} /> Tenant-isolated
          </span>
          <span>Human-safe handoff</span>
          <span>Auditable outcomes</span>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-4 px-6 pb-24 md:grid-cols-3">
        {features.map(([Icon, title, body]) => (
          <Card key={title}>
            <Icon className="mb-5 text-cyan-400" />
            <h2 className="text-lg font-bold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
          </Card>
        ))}
      </section>
    </main>
  );
}
