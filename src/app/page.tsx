import { About } from "@/components/about";
import { AgentFocus } from "@/components/agent-focus";
import { CaseStudies } from "@/components/case-studies";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <Hero />
      <About />
      <AgentFocus />
      <Projects />
      <Skills />
      <CaseStudies />
      <Contact />
      <Footer />
    </main>
  );
}
