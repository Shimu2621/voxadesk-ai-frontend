import { Card } from "@/components/ui/card";

export function SectionPlaceholder({ title, description, action }: { title: string; description: string; action: string }) {
  return <><p className="text-sm text-cyan-400">VoxaDesk AI workspace</p><h1 className="mt-1 text-3xl font-bold">{title}</h1><p className="mt-2 max-w-2xl text-slate-400">{description}</p><Card className="mt-8 min-h-72"><div className="grid min-h-60 place-items-center text-center"><div><div className="mx-auto h-14 w-14 rounded-2xl bg-cyan-400/10 ring-1 ring-cyan-400/20" /><h2 className="mt-5 font-semibold">Ready for your data</h2><p className="mt-2 text-sm text-slate-500">{action}</p></div></div></Card></>;
}
