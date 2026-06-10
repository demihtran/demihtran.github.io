export const projects = [
  {
    title: "Portfolio Agent",
    status: "Planned demo",
    description:
      "An agent that answers recruiter questions about my CV, projects and skills using structured profile data and optional retrieval.",
    tools: ["Profile Reader", "Project Retriever", "JD Matcher", "Answer Composer"],
    stack: ["Next.js", "Vercel AI SDK", "Claude API", "Structured Data"],
    result: "Turns a static portfolio into an interactive recruiter assistant.",
  },
  {
    title: "Task Planning Agent",
    status: "Concept project",
    description:
      "A workflow agent that breaks complex user requests into executable steps, asks clarifying questions and tracks progress.",
    tools: ["Planner", "Task Store", "Tool Registry", "Progress Tracker"],
    stack: ["LangGraph", "TypeScript", "LLM Tool Use", "State Machine"],
    result: "Demonstrates plan-act-observe loops and reliable multi-step execution.",
  },
  {
    title: "Research Assistant Agent",
    status: "Case study",
    description:
      "An agent harness for reading sources, summarizing findings and producing structured research briefs with traceable context.",
    tools: ["Document Search", "Summarizer", "Citation Collector", "Report Writer"],
    stack: ["LlamaIndex", "Vector DB", "Claude API", "RAG"],
    result: "Shows retrieval, context management and structured output design.",
  },
  {
    title: "Code Review Agent",
    status: "Future build",
    description:
      "A developer-focused agent that explores repositories, reads relevant files and produces focused review notes.",
    tools: ["File Search", "Code Reader", "Diff Analyzer", "Review Generator"],
    stack: ["Claude API", "Tool Calling", "GitHub API", "Node.js"],
    result: "Highlights practical coding-agent harness design and observability needs.",
  },
];

export const caseStudies = [
  {
    title: "Designing a reliable agent loop",
    problem: "LLM demos often fail when a task requires multiple steps, tool choices or recovery from bad intermediate results.",
    approach:
      "Model the agent as a controlled loop: plan, choose a tool, execute, observe, update state and only then produce the final answer.",
    outcome:
      "The portfolio will present agent projects as systems with explicit tools, state, evaluation and user control rather than simple prompts.",
  },
  {
    title: "Making agent behavior observable",
    problem: "When an agent fails, users need to know which tool call, context decision or output step caused the issue.",
    approach:
      "Expose execution traces, tool calls, latency, cost and final confidence signals in the project case studies and future demos.",
    outcome:
      "Recruiters can see that the focus is production-quality agent harnesses, not just API wrappers.",
  },
];
