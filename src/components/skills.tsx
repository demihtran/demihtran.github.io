import { skillGroups } from "@/data/skills";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="mb-12 max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.35em] text-white/40">Stack</p>
        <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
          Capabilities for practical AI products.
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {skillGroups.map((group) => (
          <Card key={group.title} className="p-5 hover:border-white/25 hover:bg-white/[0.04]">
            <h3 className="text-base font-medium text-white">{group.title}</h3>
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
