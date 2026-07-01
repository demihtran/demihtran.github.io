import { HeroBubbles } from "@/components/hero-bubbles";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden px-6 pb-20 pt-0 sm:pb-24 lg:px-8">
      <HeroBubbles />
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center justify-center">
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <p data-intro className="text-sm font-medium uppercase tracking-[0.35em] text-[#2a1b14]/45">
            AI Engineer / Agent Systems
          </p>
          <h1 data-intro className="mt-8 text-balance text-6xl font-semibold tracking-[-0.06em] text-[#2a1b14] sm:text-7xl lg:text-8xl">
            AI that works.
          </h1>
          <p data-intro className="mx-auto mt-8 max-w-xl text-pretty text-lg leading-8 text-[#2a1b14]/58 sm:text-xl">
            Practical agents, reliable systems.
          </p>
        </div>
      </div>
    </section>
  );
}
