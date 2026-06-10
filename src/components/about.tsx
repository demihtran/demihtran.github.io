import { Card } from "@/components/ui/card";

export function About() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">About</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            I build the harness around LLMs, not just prompts.
          </h2>
        </div>
        <Card>
          <p className="text-lg leading-8 text-slate-300">
            My focus is AI Agent Harness engineering: designing the systems that help LLMs use tools,
            manage context, follow workflows, recover from failures and produce reliable outputs. I am
            interested in practical agentic applications where AI can support real workflows instead of
            staying as a one-off demo.
          </p>
          <p className="mt-5 text-slate-400">
            This portfolio is built to showcase agent projects, case studies and engineering decisions around
            tool calling, memory, evaluation, tracing and user control.
          </p>
        </Card>
      </div>
    </section>
  );
}
