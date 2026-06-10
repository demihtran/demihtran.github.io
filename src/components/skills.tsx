import { skillGroups } from "@/data/skills";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">Skills</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Skills for building agentic AI systems.
        </h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <Card key={group.title}>
            <h3 className="text-lg font-semibold text-white">{group.title}</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
