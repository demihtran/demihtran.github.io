import { Card } from "@/components/ui/card";

const principles = [
  ["Reliability over demos", "A good AI feature should be repeatable, observable and recoverable after the impressive first run."],
  ["Tools before magic", "The harness defines what the model can do, what it can see and when it should stop."],
  ["Evaluation as product work", "Shipping AI means designing test cases, review loops and quality signals alongside the interface."],
];

export function About() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-white/40">About</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            Operating principles for building with LLMs.
          </h2>
        </div>
        <Card className="p-7 sm:p-8">
          <p className="text-lg leading-8 text-white/60">
            My work sits between product engineering and AI systems: turning model capability into workflows people can understand, trust and improve.
          </p>
          <div className="mt-8 space-y-6 border-t border-white/10 pt-8">
            {principles.map(([title, text]) => (
              <div key={title}>
                <h3 className="text-base font-medium text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/50">{text}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
