import { BrainCircuit, Cable, ClipboardCheck, DatabaseZap, Eye, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

const focusAreas = [
  { title: "Tool Calling", icon: Cable, text: "Agents choose and call APIs, functions and workflow tools safely." },
  { title: "Context & Memory", icon: DatabaseZap, text: "The harness controls what the model sees, remembers and retrieves." },
  { title: "Workflow Orchestration", icon: BrainCircuit, text: "Tasks move through plan, act, observe and final response states." },
  { title: "Evaluation", icon: ClipboardCheck, text: "Agent quality is measured with scenarios, expected behavior and reviews." },
  { title: "Observability", icon: Eye, text: "Tool calls, latency, cost and errors should be visible and debuggable." },
  { title: "Guardrails", icon: ShieldCheck, text: "The system keeps users in control and knows when to ask for help." },
];

export function AgentFocus() {
  return (
    <section id="focus" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">Agent Focus</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          The portfolio is centered on agent harness design.
        </h2>
        <p className="mt-4 text-slate-400">
          The goal is to show how agents are controlled, observed and integrated into real workflows.
        </p>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {focusAreas.map((area) => (
          <Card key={area.title} className="transition hover:-translate-y-1 hover:border-cyan-300/30">
            <area.icon className="size-7 text-cyan-200" />
            <h3 className="mt-5 text-lg font-semibold text-white">{area.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">{area.text}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
