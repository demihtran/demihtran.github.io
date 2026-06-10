import { Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <Card className="overflow-hidden bg-gradient-to-br from-cyan-400/10 via-slate-950 to-violet-500/10 p-8 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">Contact</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Let&apos;s build practical AI agents.
            </h2>
            <p className="mt-4 max-w-2xl text-slate-300">
              I am preparing this portfolio for AI Agent Engineer opportunities. Replace the placeholder links
              with your real email, GitHub, LinkedIn and CV before publishing.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <ButtonLink href={`mailto:${profile.email}`}>
              <Mail className="mr-2 size-4" /> Email me
            </ButtonLink>
            <ButtonLink href={profile.github} variant="secondary">GitHub</ButtonLink>
            <ButtonLink href={profile.linkedin} variant="secondary">LinkedIn</ButtonLink>
          </div>
        </div>
      </Card>
    </section>
  );
}
