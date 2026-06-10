import { caseStudies } from "@/data/projects";
import { Card } from "@/components/ui/card";

export function CaseStudies() {
  return (
    <section id="case-studies" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">Case Studies</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          How I think about reliable agent systems.
        </h2>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {caseStudies.map((study) => (
          <Card key={study.title}>
            <h3 className="text-2xl font-semibold text-white">{study.title}</h3>
            <div className="mt-6 space-y-5">
              <div>
                <p className="text-sm font-semibold text-cyan-100">Problem</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{study.problem}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-violet-100">Approach</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{study.approach}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-100">Outcome</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{study.outcome}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
