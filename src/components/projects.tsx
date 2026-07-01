import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div data-reveal className="mb-10">
        <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#2a1b14]/40">Project</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            data-reveal
            className="group block [perspective:1200px]"
            aria-label={`Open ${project.title} on GitHub`}
          >
            <div className="relative aspect-[4/3] rounded-[2rem] transition duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-[#2a1b14]/12 bg-[#fffaf3]/65 p-3 shadow-[0_24px_80px_rgba(42,27,20,0.06)] [backface-visibility:hidden]">
                <div className="flex size-full items-center justify-center rounded-[1.45rem] border border-dashed border-[#2a1b14]/18 bg-[#2a1b14]/[0.035] text-sm font-medium text-[#2a1b14]/35">
                  {project.coverLabel}
                </div>
              </div>
              <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-[#2a1b14]/16 bg-[#fffaf3]/80 p-3 shadow-[0_24px_80px_rgba(42,27,20,0.08)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <div className="relative flex size-full items-center justify-center overflow-hidden rounded-[1.45rem] border border-[#2a1b14]/10 bg-[#2a1b14]/[0.045] text-sm font-medium text-[#2a1b14]/35">
                  {project.previewLabel}
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-[#2a1b14]/75 via-[#2a1b14]/30 to-transparent p-5 text-[#fffaf3]">
                    <h3 className="text-2xl font-medium tracking-[-0.03em]">{project.title}</h3>
                    <span className="grid size-10 shrink-0 place-items-center rounded-full border border-[#fffaf3]/25 bg-[#fffaf3]/10 text-[#fffaf3] backdrop-blur">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
