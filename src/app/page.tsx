import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Intro } from "@/components/intro";
import { Navbar } from "@/components/navbar";
import { PageAnimations } from "@/components/page-animations";
import { Projects } from "@/components/projects";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f1ea] text-[#2a1b14]">
      <PageAnimations />
      <Navbar />
      <Hero />
      <Intro />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
