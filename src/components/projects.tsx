import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { Card } from "@/components/ui/card";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div data-reveal className="mb-10">
        <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#2a1b14]/40">Project</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project, index) => (
          <a key={project.title} href={project.githubUrl} target="_blank" rel="noreferrer" className="group block">
            <Card data-reveal className="h-full overflow-hidden p-3 hover:-translate-y-1 hover:border-[#2a1b14]/30 hover:bg-[#2a1b14]/[0.035]">
              <div className="flex aspect-[4/3] items-center justify-center rounded-[1.45rem] border border-dashed border-[#2a1b14]/18 bg-[#2a1b14]/[0.035] text-sm font-medium text-[#2a1b14]/35 transition group-hover:border-[#2a1b14]/35 group-hover:bg-[#2a1b14]/[0.055]">
                {project.imageLabel}
              </div>
              <div className="flex items-center justify-between gap-4 px-2 py-5">
                <div>
                  <p className="font-mono text-xs text-[#2a1b14]/35">0{index + 1}</p>
                  <h3 className="mt-2 text-xl font-medium tracking-[-0.03em] text-[#2a1b14]">{project.title}</h3>
                </div>
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-[#2a1b14]/10 text-[#2a1b14]/45 transition group-hover:border-[#2a1b14]/40 group-hover:text-[#2a1b14]">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
}
