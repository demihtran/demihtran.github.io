const aboutText =
  "I’m Tran Thi Hong Diem, an AI Engineer passionate about building intelligent systems powered by LLMs, agentic AI, and RAG architectures. My background began in front-end and back-end development, where I built strong full-stack engineering fundamentals before focusing deeply on AI engineering and creating practical AI products that solve real-world problems.";

export function Intro() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
      <p
        data-about-text
        aria-label={aboutText}
        className="max-w-5xl text-justify text-2xl font-medium leading-snug tracking-[-0.035em] text-[#2a1b14] sm:text-3xl lg:text-4xl"
      >
        {aboutText.split(" ").map((word, index) => (
          <span key={`${word}-${index}`} data-about-word aria-hidden="true" className="inline-block will-change-opacity">
            {word}
            {index < aboutText.split(" ").length - 1 ? " " : ""}
          </span>
        ))}
      </p>
    </section>
  );
}
