import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">Projects</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Featured AI Agent Harness projects.
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-slate-400">
          These are portfolio-ready project directions focused on agents, tools, workflow and reliability.
        </p>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.title} className="group transition hover:-translate-y-1 hover:border-violet-300/30">
            <div className="flex items-start justify-between gap-5">
              <div>
                <Badge className="border-emerald-300/20 bg-emerald-300/10 text-emerald-100">{project.status}</Badge>
                <h3 className="mt-4 text-2xl font-semibold text-white">{project.title}</h3>
              </div>
              <ArrowUpRight className="size-5 text-slate-500 transition group-hover:text-cyan-200" />
            </div>
            <p className="mt-4 text-slate-400">{project.description}</p>
            <div className="mt-6">
              <p className="text-sm font-semibold text-slate-200">Agent tools</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <Badge key={tool} className="bg-white/5 text-slate-200">{tool}</Badge>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm font-semibold text-slate-200">Stack</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <Badge key={item} className="border-violet-300/20 bg-violet-300/10 text-violet-100">{item}</Badge>
                ))}
              </div>
            </div>
            <p className="mt-6 border-t border-white/10 pt-5 text-sm text-cyan-100">{project.result}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
