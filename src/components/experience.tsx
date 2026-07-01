import { Card } from "@/components/ui/card";

const experiences = [
  {
    role: "AI Engineer",
    company: "Company / Project name",
    period: "2025 — Present",
    description:
      "Describe your responsibilities, AI systems you built, model workflows, automation, evaluation, deployment work and business impact here.",
  },
  {
    role: "Previous role",
    company: "Company / Project name",
    period: "2024 — 2025",
    description:
      "Add another work experience entry here. This can be full-time work, freelance projects, internships or production AI projects.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div data-reveal className="mb-12 max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#2a1b14]/40">Experience</p>
        <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-[#2a1b14] sm:text-5xl">
          Work experience and practical AI projects.
        </h2>
      </div>
      <div className="space-y-5">
        {experiences.map((experience) => (
          <Card data-reveal key={`${experience.role}-${experience.company}`} className="p-7 sm:p-8">
            <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-start">
              <div>
                <h3 className="text-2xl font-medium tracking-[-0.02em] text-[#2a1b14]">{experience.role}</h3>
                <p className="mt-2 text-base text-[#2a1b14]/50">{experience.company}</p>
              </div>
              <p className="font-mono text-sm text-[#2a1b14]/40">{experience.period}</p>
            </div>
            <p className="mt-6 max-w-3xl text-base leading-7 text-[#2a1b14]/55">{experience.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
