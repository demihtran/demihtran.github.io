import { profile } from "@/data/profile";
import { Card } from "@/components/ui/card";

export function Intro() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div data-reveal className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#2a1b14]/40">About</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-[#2a1b14] sm:text-5xl">
            A short introduction about me.
          </h2>
        </div>
        <Card className="p-7 sm:p-8">
          <p className="text-lg leading-8 text-[#2a1b14]/60">
            I am {profile.name}, an {profile.role} based in {profile.location}. I build practical AI products and workflows that connect LLMs with real user needs, reliable systems and clear product outcomes.
          </p>
          <p className="mt-6 text-base leading-7 text-[#2a1b14]/55">
            This section is ready for a more personal introduction, background story and career direction once the final portfolio UI is selected.
          </p>
        </Card>
      </div>
    </section>
  );
}
