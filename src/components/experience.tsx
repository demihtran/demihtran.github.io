const experiences = [
  {
    company: "Lava Digital Group",
    role: "Fullstack Developer",
    period: "Feb 2025 — Mar 2026",
  },
  {
    company: "Alien Entertainment Technology LLC",
    role: "Front End Developer",
    period: "Mar 2024 — Dec 2025",
  },
  {
    company: "University NTTU",
    role: "Student",
    period: "2020 — 2024",
  },
];

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div data-reveal>
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#2a1b14]/40">Experience</p>
          <h2 className="mt-5 max-w-sm text-4xl font-semibold leading-none tracking-[-0.05em] text-[#2a1b14] sm:text-5xl lg:text-6xl">
            Where I&apos;ve Worked
          </h2>
        </div>
        <div className="relative space-y-0 border-l border-[#2a1b14]/15 pl-7 sm:pl-10">
          {experiences.map((experience) => (
            <div data-reveal key={`${experience.company}-${experience.role}`} className="relative border-b border-[#2a1b14]/10 py-8 first:pt-0 last:border-b-0 last:pb-0">
              <span className="absolute -left-[2.05rem] top-9 size-3 rounded-full border border-[#2a1b14]/25 bg-[#f6f1ea] sm:-left-[2.8rem]" />
              <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
                <div>
                  <h3 className="text-2xl font-medium tracking-[-0.03em] text-[#2a1b14] sm:text-3xl">
                    {experience.company}
                  </h3>
                  <p className="mt-2 text-base font-medium text-[#2a1b14]/55 sm:text-lg">{experience.role}</p>
                </div>
                <p className="font-mono text-sm text-[#2a1b14]/40 sm:pt-2">{experience.period}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
