import { ArrowRight } from "lucide-react";
import { profile } from "@/data/profile";
import { ButtonLink } from "@/components/ui/button";

const systemNotes = [
  ["01", "Tool use", "APIs, functions and workflows wired into controlled agent loops."],
  ["02", "Context", "Retrieval, memory and prompts shaped around the task boundary."],
  ["03", "Evaluation", "Scenarios, traces and review loops for reliable releases."],
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-16 lg:min-h-[calc(100vh-5rem)] lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p data-intro className="text-sm font-medium uppercase tracking-[0.35em] text-[#2a1b14]/45">
            AI Engineer / Agent Systems
          </p>
          <h1 data-intro className="mt-8 max-w-5xl text-balance text-6xl font-semibold tracking-[-0.06em] text-[#2a1b14] sm:text-7xl lg:text-8xl">
            {profile.headline}
          </h1>
          <p data-intro className="mt-8 max-w-2xl text-pretty text-lg leading-8 text-[#2a1b14]/60 sm:text-xl">
            {profile.summary}
          </p>
          <div data-intro className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#projects">
              View work <ArrowRight className="ml-2 size-4" />
            </ButtonLink>
            <ButtonLink href={profile.resume} variant="secondary">
              Download CV
            </ButtonLink>
          </div>
          <div className="mt-10 flex items-center gap-5 text-sm text-[#2a1b14]/45">
            <span>{profile.location}</span>
            <span className="h-px w-8 bg-[#2a1b14]/20" />
            <a href={profile.github} className="transition hover:text-[#2a1b14]">
              GitHub
            </a>
            <a href={profile.linkedin} className="transition hover:text-[#2a1b14]">
              LinkedIn
            </a>
          </div>
        </div>

        <div data-intro className="rounded-[2rem] border border-[#2a1b14]/12 bg-[#fffaf3]/75 p-4 shadow-2xl shadow-[#2a1b14]/10">
          <div className="rounded-[1.5rem] border border-[#2a1b14]/10 bg-[#f6f1ea]/80 p-6">
            <div className="flex items-center justify-between border-b border-[#2a1b14]/10 pb-5 text-xs uppercase tracking-[0.25em] text-[#2a1b14]/40">
              <span>Portfolio frame</span>
              <span>Ready for content</span>
            </div>
            <div className="py-8 font-mono text-sm text-[#2a1b14]/60">
              <p className="text-[#2a1b14]">system.role = &quot;AI Engineer&quot;</p>
              <p className="mt-3">focus = [&quot;agents&quot;, &quot;tools&quot;, &quot;evals&quot;]</p>
              <p className="mt-3">status = &quot;building public case studies&quot;</p>
            </div>
            <div className="space-y-3">
              {systemNotes.map(([index, title, text]) => (
                <div key={title} className="grid gap-4 border-t border-[#2a1b14]/10 pt-4 sm:grid-cols-[3rem_1fr]">
                  <span className="font-mono text-sm text-[#2a1b14]/35">{index}</span>
                  <div>
                    <h2 className="text-base font-medium text-[#2a1b14]">{title}</h2>
                    <p className="mt-1 text-sm leading-6 text-[#2a1b14]/50">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
