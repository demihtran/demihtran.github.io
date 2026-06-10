import { ArrowRight, Sparkles } from "lucide-react";
import { profile } from "@/data/profile";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="absolute left-1/2 top-0 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="mx-auto max-w-5xl text-center">
        <Badge className="mb-6 gap-2 border-violet-300/20 bg-violet-300/10 text-violet-100">
          <Sparkles className="size-3.5" />
          AI Agent Harness Portfolio
        </Badge>
        <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
          {profile.headline}
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-pretty text-lg leading-8 text-slate-300 sm:text-xl">
          {profile.summary}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ButtonLink href="#projects">
            View agent projects <ArrowRight className="ml-2 size-4" />
          </ButtonLink>
          <ButtonLink href={profile.resume} variant="secondary">
            Download CV
          </ButtonLink>
        </div>
        <div className="mt-8 flex items-center justify-center gap-5 text-sm font-medium text-slate-400">
          <a href={profile.github} className="transition hover:text-cyan-200">
            GitHub
          </a>
          <a href={profile.linkedin} className="transition hover:text-cyan-200">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
