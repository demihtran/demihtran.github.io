export const projects = [
  {
    title: "Portfolio Agent",
    status: "Skeleton",
    description:
      "A recruiter-facing assistant that answers questions about my CV, projects and skills from structured portfolio data.",
    tools: ["Profile Reader", "Project Retriever", "JD Matcher", "Answer Composer"],
    stack: ["Next.js", "Claude API", "Structured Data", "Evaluation Set"],
    result: "Turns a static portfolio into an interactive AI Engineer profile.",
  },
  {
    title: "Task Planning Agent",
    status: "Concept",
    description:
      "A workflow agent that breaks complex requests into steps, asks clarifying questions and tracks execution state.",
    tools: ["Planner", "Task Store", "Tool Registry", "Progress Tracker"],
    stack: ["LangGraph", "TypeScript", "Tool Calling", "State Machine"],
    result: "Demonstrates controlled plan-act-observe execution instead of one-shot prompting.",
  },
  {
    title: "Research Assistant Agent",
    status: "Case study",
    description:
      "A research harness for reading sources, summarizing findings and producing traceable briefs with citations.",
    tools: ["Document Search", "Summarizer", "Citation Collector", "Report Writer"],
    stack: ["LlamaIndex", "Vector DB", "Claude API", "RAG"],
    result: "Shows retrieval design, context selection and structured output quality.",
  },
  {
    title: "Code Review Agent",
    status: "Future build",
    description:
      "A developer agent that explores repositories, reads diffs and produces focused review notes with evidence.",
    tools: ["File Search", "Code Reader", "Diff Analyzer", "Review Generator"],
    stack: ["Claude API", "GitHub API", "Node.js", "Observability"],
    result: "Highlights coding-agent harness design, review boundaries and debugging traces.",
  },
];

export const caseStudies = [
  {
    title: "Designing a reliable agent loop",
    problem: "LLM demos often fail when a task requires multiple steps, tool choices or recovery from bad intermediate results.",
    approach:
      "Model the agent as a controlled loop: plan, choose a tool, execute, observe, update state and only then produce the final answer.",
    outcome:
      "Future project pages will present agents as systems with explicit tools, state, evaluation and user control.",
  },
  {
    title: "Making AI behavior observable",
    problem: "When an AI workflow fails, users need to know which context decision, tool call or output step caused the issue.",
    approach:
      "Expose execution traces, tool calls, latency, cost, retries and confidence signals in each future demo or case study.",
    outcome:
      "The portfolio communicates production-quality AI engineering rather than simple API wrappers.",
  },
];
