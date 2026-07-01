const aboutText =
  "I’m Tran Thi Hong Diem, an AI Engineer passionate about building intelligent systems powered by LLMs, agentic AI, and RAG architectures. My background began in front-end and back-end development, where I built strong full-stack engineering fundamentals before focusing deeply on AI engineering and creating practical AI products that solve real-world problems.";

export function Intro() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
      <p data-reveal className="text-sm font-medium uppercase tracking-[0.35em] text-[#2a1b14]/40">
        About
      </p>
      <p
        data-about-text
        className="mt-8 max-w-5xl text-balance text-3xl font-medium leading-tight tracking-[-0.04em] text-[#2a1b14] sm:text-5xl sm:leading-tight lg:text-6xl"
      >
        {aboutText.split(" ").map((word, index) => (
          <span key={`${word}-${index}`} data-about-word className="inline-block will-change-transform">
            {word}&nbsp;
          </span>
        ))}
      </p>
    </section>
  );
}
