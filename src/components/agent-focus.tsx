import { Card } from "@/components/ui/card";

const focusAreas = [
  { title: "Tool Use", text: "Agents call APIs, functions and workflow tools with clear boundaries." },
  { title: "Context", text: "The system controls what the model sees, retrieves and remembers." },
  { title: "Orchestration", text: "Tasks move through plan, act, observe and final response states." },
  { title: "Evaluation", text: "Quality is measured with scenarios, expected behavior and reviews." },
  { title: "Observability", text: "Tool calls, latency, cost and errors stay visible and debuggable." },
  { title: "Guardrails", text: "The product keeps users in control and knows when to ask for help." },
];

export function AgentFocus() {
  return (
    <section id="focus" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-white/40">Focus</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            The harness matters as much as the model.
          </h2>
        </div>
        <p className="max-w-2xl text-lg leading-8 text-white/55 lg:justify-self-end">
          I frame AI work as systems engineering: tools, state, context, evaluation and user control around the LLM.
        </p>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {focusAreas.map((area, index) => (
          <Card key={area.title} className="group hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.045]">
            <p className="font-mono text-sm text-white/35">0{index + 1}</p>
            <h3 className="mt-8 text-xl font-medium text-white">{area.title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/50">{area.text}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
