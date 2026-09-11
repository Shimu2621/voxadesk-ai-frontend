import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WordRotate } from "@/components/ui/word-rotate";
import { BrandLogo } from "@/components/brand-logo";
import { TrustedIntegrations } from "@/components/landing/trusted-integrations";
import { InteractiveCallDemo } from "@/components/landing/interactive-call-demo";
import { HowItWorks } from "@/components/landing/how-it-works";
import { AutomationBento } from "@/components/landing/automation-bento";
import { DashboardShowcase } from "@/components/landing/dashboard-showcase";
import { IndustryUseCases } from "@/components/landing/industry-use-cases";
import { IntegrationEcosystem } from "@/components/landing/integration-ecosystem";
import { OutcomeEstimator } from "@/components/landing/outcome-estimator";
import { SecurityReliability } from "@/components/landing/security-reliability";
import { PricingFaq } from "@/components/landing/pricing-faq";
import { SiteFooter } from "@/components/landing/site-footer";

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
        <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <BrandLogo />
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
            <span className="block">Every call answered.</span>
            <span className="mt-2 block text-white">
              Every{" "}
              <WordRotate
                words={["opportunity", "conversation", "appointment"]}
                aurora
              />{" "}
              captured.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            VoxaDesk AI answers questions, qualifies leads, books appointments,
            and brings in your team when a human touch matters.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/signup">
                Build your receptionist{" "}
                <ArrowRight className="ml-2" size={17} />
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
        <TrustedIntegrations />
        <InteractiveCallDemo />
        <HowItWorks />
        <AutomationBento />
        <DashboardShowcase />
        <IndustryUseCases />
        <IntegrationEcosystem />
        <OutcomeEstimator />
        <SecurityReliability />
        <PricingFaq />
      </main>
      <SiteFooter />
    </>
  );
}
