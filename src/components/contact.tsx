import { Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <Card data-reveal className="overflow-hidden border-[#2a1b14]/15 bg-[#2a1b14] p-8 text-[#f6f1ea] shadow-[0_30px_100px_rgba(42,27,20,0.18)] sm:p-10 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#f6f1ea]/50">Contact</p>
            <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-[#f6f1ea] sm:text-6xl">
              Have an AI system to design, evaluate or ship?
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#f6f1ea]/65">
              This portfolio is prepared for AI Engineer opportunities, with direct links for email, work, LinkedIn and a future CV download.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <ButtonLink href={`mailto:${profile.email}`} className="bg-[#f6f1ea] text-[#2a1b14] hover:bg-white">
              <Mail className="mr-2 size-4" /> Email me
            </ButtonLink>
            <ButtonLink href={profile.github} variant="secondary" className="border-[#f6f1ea]/25 text-[#f6f1ea] hover:border-[#f6f1ea]/70 hover:bg-[#f6f1ea]/10">
              GitHub
            </ButtonLink>
            <ButtonLink href={profile.linkedin} variant="secondary" className="border-[#f6f1ea]/25 text-[#f6f1ea] hover:border-[#f6f1ea]/70 hover:bg-[#f6f1ea]/10">
              LinkedIn
            </ButtonLink>
          </div>
        </div>
      </Card>
    </section>
  );
}
