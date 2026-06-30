import { About } from "@/components/about";
import { AgentFocus } from "@/components/agent-focus";
import { CaseStudies } from "@/components/case-studies";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { PageAnimations } from "@/components/page-animations";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f1ea] text-[#2a1b14]">
      <PageAnimations />
      <Navbar />
      <Hero />
      <AgentFocus />
      <Projects />
      <Skills />
      <CaseStudies />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
