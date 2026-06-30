import { Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <Card className="overflow-hidden border-white/15 bg-white text-black p-8 sm:p-10 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-black/45">Contact</p>
            <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-black sm:text-6xl">
              Have an AI system to design, evaluate or ship?
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-black/60">
              This portfolio is prepared for AI Engineer opportunities. Replace the placeholder email, GitHub, LinkedIn and CV with your real links before publishing.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <ButtonLink href={`mailto:${profile.email}`} className="bg-black text-white hover:bg-black/80">
              <Mail className="mr-2 size-4" /> Email me
            </ButtonLink>
            <ButtonLink href={profile.github} variant="secondary" className="border-black/20 bg-white text-black hover:border-black/60 hover:bg-black/5">
              GitHub
            </ButtonLink>
            <ButtonLink href={profile.linkedin} variant="secondary" className="border-black/20 bg-white text-black hover:border-black/60 hover:bg-black/5">
              LinkedIn
            </ButtonLink>
          </div>
        </div>
      </Card>
    </section>
  );
}
