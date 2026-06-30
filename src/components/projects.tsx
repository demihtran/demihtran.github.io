import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div data-reveal className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#2a1b14]/40">Work</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-[#2a1b14] sm:text-5xl">
            Selected AI systems.
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-[#2a1b14]/50">
          These frames are ready for real demos, metrics and links as each project is completed.
        </p>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((project, index) => (
          <Card data-reveal key={project.title} className="group relative overflow-hidden p-7 hover:-translate-y-1 hover:border-[#2a1b14]/30 hover:bg-[#2a1b14]/[0.035] sm:p-8">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="font-mono text-sm text-[#2a1b14]/35">0{index + 1}</p>
                <Badge className="mt-5">{project.status}</Badge>
                <h3 className="mt-5 text-2xl font-medium tracking-[-0.02em] text-[#2a1b14]">{project.title}</h3>
              </div>
              <span className="grid size-11 place-items-center rounded-full border border-[#2a1b14]/10 text-[#2a1b14]/45 transition group-hover:border-[#2a1b14]/40 group-hover:text-[#2a1b14]">
                <ArrowUpRight className="size-5" />
              </span>
            </div>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#2a1b14]/55">{project.description}</p>
            <div className="mt-8 grid gap-6 border-t border-[#2a1b14]/10 pt-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#2a1b14]/35">Tools</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <Badge key={tool}>{tool}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#2a1b14]/35">Stack</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-8 border-t border-[#2a1b14]/10 pt-5 text-sm leading-6 text-[#2a1b14]/70">{project.result}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
