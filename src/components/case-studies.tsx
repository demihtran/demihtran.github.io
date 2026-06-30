import { caseStudies } from "@/data/projects";
import { Card } from "@/components/ui/card";

const labels = ["Problem", "Approach", "Outcome"] as const;

export function CaseStudies() {
  return (
    <section id="case-studies" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div data-reveal className="mb-12 max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#2a1b14]/40">Notes</p>
        <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-[#2a1b14] sm:text-5xl">
          How I design AI systems.
        </h2>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {caseStudies.map((study, index) => {
          const values = [study.problem, study.approach, study.outcome];

          return (
            <Card data-reveal key={study.title} className="p-7 sm:p-8">
              <p className="font-mono text-sm text-[#2a1b14]/35">0{index + 1}</p>
              <h3 className="mt-5 text-2xl font-medium tracking-[-0.02em] text-[#2a1b14]">{study.title}</h3>
              <div className="mt-8 divide-y divide-[#2a1b14]/10 border-y border-[#2a1b14]/10">
                {labels.map((label, labelIndex) => (
                  <div key={label} className="grid gap-3 py-5 sm:grid-cols-[8rem_1fr]">
                    <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#2a1b14]/35">{label}</p>
                    <p className="text-sm leading-6 text-[#2a1b14]/55">{values[labelIndex]}</p>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
