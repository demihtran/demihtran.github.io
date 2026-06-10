# Roadmap xây dựng Portfolio AI Engineer chuyên về AI Agent Harness bằng Next.js

## Mục tiêu

Xây dựng một portfolio cá nhân chuyên nghiệp để hỗ trợ quá trình xin việc vị trí:

- **AI Engineer**
- **AI Agent Engineer**
- **LLM Engineer**
- **Agentic AI Engineer**
- **AI Platform / Agent Harness Engineer**

Portfolio này **không tập trung vào Machine Learning truyền thống** như training model, computer vision, prediction model hay data science pipeline.

Portfolio cần thể hiện rõ rằng bạn có khả năng:

- Xây dựng AI Agent có khả năng dùng tool.
- Thiết kế agent workflow / agent harness.
- Tích hợp LLM vào ứng dụng thực tế.
- Làm việc với prompt, tool calling, function calling, memory, planning, orchestration.
- Xây dựng hệ thống giúp agent chạy ổn định, có logging, evaluation, guardrails và observability.
- Kết nối agent với API, database, file system, browser, automation tools hoặc business workflow.

---

## Định vị cá nhân

### Định vị chính

```txt
AI Engineer focused on building agentic systems, LLM applications and AI agent harnesses.
```

### Tagline đề xuất

```txt
I build AI agents that can reason, use tools and automate real-world workflows.
```

Hoặc:

```txt
AI Engineer building reliable agent harnesses for LLM-powered automation.
```

Hoặc:

```txt
I design and build agentic AI systems with tool use, memory, evaluation and workflow automation.
```

### Không nên định vị là

```txt
Machine Learning Engineer focused on model training.
Computer Vision Engineer.
Data Scientist.
ML Researcher.
```

Vì hiện tại định hướng của bạn là **AI Agent Harness**, không phải mảng ML truyền thống.

---

## Phong cách thiết kế đề xuất

### Phong cách chính

**Modern Dark Agentic AI Portfolio**

Đây là phong cách kết hợp giữa:

- Developer portfolio hiện đại.
- AI product builder portfolio.
- Technical system builder portfolio.
- Agent workflow / automation showcase.

### Cảm giác thiết kế cần đạt được

- Hiện đại.
- Kỹ thuật.
- Tập trung vào hệ thống agent.
- Có cảm giác automation / workflow / orchestration.
- Sạch sẽ, chuyên nghiệp.
- Không quá học thuật theo kiểu ML research.
- Không quá màu mè như portfolio designer.

### Visual direction

Nên dùng các yếu tố trực quan liên quan đến agent:

- Workflow graph.
- Tool-calling diagram.
- Agent loop.
- Memory / context blocks.
- Execution trace.
- Terminal-style cards.
- API / tool cards.
- Evaluation dashboard.

### Màu sắc đề xuất

```txt
Background: #020617 hoặc #0f172a
Primary: cyan / sky blue
Secondary: violet
Accent: emerald
Text: white / slate
Code accent: green / cyan
```

### Font đề xuất

```txt
Main font: Geist Sans hoặc Inter
Code font: JetBrains Mono
```

### Hiệu ứng nên dùng

- Card hover nhẹ.
- Scroll reveal nhẹ.
- Gradient background.
- Animated grid background nhẹ.
- Workflow line animation nhẹ.
- Terminal typing effect rất nhẹ nếu phù hợp.

### Hiệu ứng không nên lạm dụng

- 3D quá nặng.
- Video background.
- Animation làm trang chậm.
- Cursor effect gây khó đọc.
- Agent animation phức tạp nhưng không có ý nghĩa.

---

## Tech stack đề xuất cho portfolio

```txt
Next.js 15+
React 19+
TypeScript
Tailwind CSS
shadcn/ui
Motion
Lucide React
MDX hoặc Markdown
Vercel
GitHub Pages nếu cần static export
```

### Vai trò từng công nghệ

| Công nghệ | Vai trò |
|---|---|
| Next.js | Framework chính để xây portfolio hiện đại |
| React | Xây component UI |
| TypeScript | Thể hiện tư duy software engineering chuyên nghiệp |
| Tailwind CSS | Thiết kế nhanh, responsive, dark mode |
| shadcn/ui | Component UI hiện đại, dễ tùy biến |
| Motion | Animation nhẹ cho portfolio |
| Lucide React | Icon cho agent, workflow, tool, API, database |
| MDX / Markdown | Viết case study, blog kỹ thuật, agent notes |
| Vercel | Deploy Next.js nhanh và ổn định |

---

## Tech stack nên thể hiện trong portfolio Agent Harness

### LLM / AI APIs

- Claude API
- OpenAI API
- Gemini API nếu có
- Local LLM nếu có
- Prompt caching nếu có
- Structured output
- Tool use / function calling

### Agent Frameworks

- LangGraph
- LangChain
- LlamaIndex
- CrewAI nếu có
- AutoGen nếu có
- Vercel AI SDK nếu có
- Mastra nếu có

### Agent Harness Concepts

- Agent loop
- Planner / executor pattern
- Tool registry
- Tool calling
- Function calling
- Memory management
- Context management
- State machine
- Multi-step reasoning
- Human-in-the-loop
- Guardrails
- Evaluation
- Observability
- Tracing
- Retry / error recovery

### Backend / Integration

- Next.js API Routes
- FastAPI nếu cần backend Python
- REST API
- Webhook
- PostgreSQL
- Redis nếu có
- Vector database nếu làm RAG
- File processing
- Browser automation nếu có

### DevOps / Deployment

- Docker
- GitHub Actions
- Vercel
- Railway / Render / Fly.io nếu có
- Environment variables
- Secret management
- Logging

---

## Câu hỏi: Có cần API tạo ảnh/video không?

### Câu trả lời ngắn

**Không cần.**

Vì bạn đang hướng tới **AI Agent Harness**, portfolio không cần tập trung vào image generation hoặc video generation.

### Nên ưu tiên API dạng nào?

Thay vì API tạo ảnh/video, bạn nên ưu tiên các demo liên quan trực tiếp đến agent:

- API để agent gọi tool.
- API để chatbot hỏi đáp về CV/project.
- API để agent chạy workflow.
- API để agent đọc tài liệu và trả lời.
- API để agent phân tích task và tạo plan.
- API để agent gọi external service.
- API để log execution trace.

### Tính năng AI tương tác phù hợp hơn

- Portfolio chatbot hỏi đáp về bạn.
- Agent demo phân tích yêu cầu và tạo plan.
- Agent demo đọc CV và trả lời câu hỏi tuyển dụng.
- Agent demo gọi tool giả lập như search docs, read file, create task.
- Workflow demo cho thấy agent plan → call tool → observe → respond.

---

## Cấu trúc website đề xuất

```txt
Home
├── Hero
├── About
├── Agent Focus
├── Featured Agent Projects
├── Agent Harness Case Studies
├── Skills
├── Experience / Education
├── Technical Notes
├── Contact
└── Footer
```

---

## 1. Hero Section

### Mục tiêu

Tạo ấn tượng đầu tiên rằng bạn là AI Engineer chuyên xây **AI Agent và Agent Harness**.

### Nội dung cần có

- Tên của bạn.
- Chức danh: AI Engineer / AI Agent Engineer.
- Tagline rõ ràng về agent.
- Mô tả 2–3 dòng.
- Nút xem agent projects.
- Nút tải CV.
- Nút liên hệ.

### Ví dụ nội dung

```txt
Hi, I'm [Your Name]
AI Engineer building reliable AI agents and agent harnesses.

I design LLM-powered systems that can reason, use tools, manage context and automate real-world workflows.
```

### CTA đề xuất

- View Agent Projects
- Download CV
- Contact Me
- GitHub
- LinkedIn

---

## 2. About Section

### Mục tiêu

Giới thiệu ngắn gọn bạn là ai và vì sao bạn tập trung vào agent.

### Nội dung cần có

- Bạn là AI Engineer.
- Bạn tập trung vào AI Agent Harness.
- Bạn thích xây hệ thống LLM có tool use, memory, workflow và evaluation.
- Bạn muốn làm các sản phẩm AI thực tế, không chỉ demo prompt.

### Ví dụ nội dung

```txt
I am an AI Engineer focused on building agentic AI systems and LLM-powered automation.
My work centers around agent harness design: tool calling, workflow orchestration, memory, context management, evaluation and reliable execution.
I enjoy turning LLM capabilities into practical systems that can interact with tools, APIs and real-world business workflows.
```

---

## 3. Agent Focus Section

### Mục tiêu

Đây là section rất quan trọng để phân biệt bạn với ML Engineer truyền thống.

### Nội dung nên có

```txt
My focus is not only using LLMs, but building the harness around them:

- How agents plan tasks.
- How agents choose and call tools.
- How context is managed.
- How memory is stored and retrieved.
- How failures are handled.
- How outputs are evaluated.
- How users stay in control.
```

### Các block nên hiển thị

- Tool Use
- Agent Workflow
- Memory
- Context Engineering
- Evaluation
- Observability
- Guardrails
- Human-in-the-loop

---

## 4. Skills Section

### Nhóm kỹ năng nên có

#### Programming

- Python
- TypeScript
- JavaScript
- SQL

#### LLM Application Development

- Prompt engineering
- Structured outputs
- Tool calling
- Function calling
- Prompt caching
- Streaming responses
- Context management

#### Agent Engineering

- Agent loop
- Planner-executor workflow
- Tool registry
- Multi-step task execution
- Human-in-the-loop
- Agent memory
- Agent evaluation
- Error recovery

#### Frameworks / Libraries

- LangGraph
- LangChain
- LlamaIndex
- Vercel AI SDK
- Claude API
- OpenAI API
- shadcn/ui
- Next.js

#### Backend / Integration

- Next.js API Routes
- FastAPI
- REST API
- Webhooks
- PostgreSQL
- Redis
- Vector database nếu có RAG

#### Observability / Quality

- Logging
- Tracing
- Evaluation datasets
- Regression tests for prompts
- Cost tracking
- Latency tracking
- Safety checks

#### Deployment

- Vercel
- Docker
- GitHub Actions
- Environment variables
- Secret management

---

## 5. Featured Agent Projects Section

### Mục tiêu

Đây là phần quan trọng nhất của portfolio.

Nên chọn 3–5 dự án liên quan đến agent, không đưa các project ML truyền thống nếu chúng không hỗ trợ định vị hiện tại.

### Mỗi project card nên có

- Tên project.
- Agent giải quyết workflow gì.
- Agent dùng tools nào.
- Tech stack.
- Execution flow.
- Demo hoặc screenshot.
- Link GitHub.
- Link case study nếu có.

---

## Project nên có cho AI Agent Harness Portfolio

### Project 1: Personal Portfolio Agent

```txt
Mục tiêu:
Agent hỏi đáp về CV, project, kỹ năng và kinh nghiệm của bạn.

Agent capabilities:
- Read profile data.
- Retrieve project context.
- Answer recruiter questions.
- Suggest relevant projects based on job description.

Tech stack:
Next.js, Vercel AI SDK, Claude/OpenAI API, vector database hoặc local structured data.

Điểm mạnh:
Cho nhà tuyển dụng tương tác trực tiếp với portfolio của bạn.
```

### Project 2: Research Assistant Agent

```txt
Mục tiêu:
Agent hỗ trợ đọc tài liệu, tóm tắt, trích xuất insight và tạo research brief.

Agent capabilities:
- Search documents.
- Summarize sources.
- Extract key points.
- Generate structured report.
- Keep citation/source links nếu có.

Tech stack:
LangGraph, LlamaIndex/LangChain, LLM API, vector database.

Điểm mạnh:
Thể hiện RAG, tool use, context management và output structure.
```

### Project 3: Task Planning Agent

```txt
Mục tiêu:
Agent nhận một yêu cầu phức tạp và chia thành plan nhiều bước.

Agent capabilities:
- Understand user goal.
- Break task into subtasks.
- Choose tools.
- Track progress.
- Ask clarification questions.
- Produce final summary.

Tech stack:
LangGraph, TypeScript/Python, tool registry, state machine.

Điểm mạnh:
Thể hiện agent loop, planning và workflow orchestration.
```

### Project 4: Code Review / Repo Assistant Agent

```txt
Mục tiêu:
Agent hỗ trợ đọc repo, tìm file, phân tích code và tạo review.

Agent capabilities:
- Search files.
- Read code context.
- Detect potential issues.
- Summarize architecture.
- Suggest changes.

Tech stack:
Claude API, tool calling, file-system tools, GitHub API nếu có.

Điểm mạnh:
Rất gần với nhu cầu thực tế của AI coding agent / developer agent.
```

### Project 5: Business Workflow Automation Agent

```txt
Mục tiêu:
Agent tự động hóa một workflow thực tế như phân loại email, tạo task, tóm tắt meeting hoặc xử lý ticket.

Agent capabilities:
- Parse input.
- Classify intent.
- Call tools.
- Create structured output.
- Log actions.
- Escalate to human nếu cần.

Tech stack:
Next.js, API routes, LLM API, database, webhook integration.

Điểm mạnh:
Thể hiện khả năng biến agent thành sản phẩm thực tế.
```

---

## 6. Agent Harness Case Study

### Mục tiêu

Cho nhà tuyển dụng thấy bạn hiểu cách xây agent đáng tin cậy, không chỉ gọi LLM API đơn giản.

### Công thức viết case study

```txt
Problem
→ Agent Goal
→ Tools Available
→ Workflow / State Machine
→ Context & Memory
→ Guardrails
→ Evaluation
→ Observability
→ Deployment
→ Result
→ What I learned
```

### Template case study

```txt
Project Name

Problem:
Workflow nào cần được tự động hóa? Vì sao LLM/agent phù hợp?

Agent Goal:
Agent cần hoàn thành nhiệm vụ gì?

Tools Available:
Agent có thể gọi những tools nào? API, database, search, file reader, browser, task manager?

Workflow / State Machine:
Agent chạy theo các bước nào? Plan → Act → Observe → Reflect → Final?

Context & Memory:
Thông tin nào được đưa vào context? Có memory không? Memory lưu ở đâu?

Guardrails:
Bạn giới hạn agent như thế nào để tránh hành vi sai? Khi nào cần hỏi người dùng?

Evaluation:
Bạn đánh giá chất lượng agent bằng gì? Test cases, expected outputs, human review, success rate?

Observability:
Bạn log gì? Tool calls, latency, cost, errors, reasoning summary, final output?

Deployment:
Agent chạy ở đâu? Next.js API Route, FastAPI, serverless, Docker, Vercel?

Result:
Agent giúp tiết kiệm thời gian, giảm thao tác thủ công hoặc cải thiện workflow như thế nào?

What I learned:
Bạn học được gì về context, tools, planning, failure handling hoặc UX cho agent?
```

---

## 7. Experience / Education Section

### Nội dung nên có

- Công việc hiện tại hoặc trước đây.
- Thực tập.
- Freelance.
- Dự án agent cá nhân.
- Dự án LLM application.
- Học vấn.
- Chứng chỉ liên quan.

### Nếu chưa có nhiều kinh nghiệm

Tập trung vào:

- Agent projects đã deploy.
- GitHub repository có README tốt.
- Case study kỹ thuật.
- Blog về agent.
- Demo tương tác.
- Open-source contribution nếu có.

Không cần nhấn mạnh Kaggle, ML benchmark hoặc model training nếu chúng không liên quan đến định hướng agent harness.

---

## 8. Technical Notes / Blog

### Mục tiêu

Tăng độ tin cậy chuyên môn trong mảng AI Agent.

### Chủ đề nên viết

- AI Agent Harness là gì?
- Tool calling vs function calling.
- Cách thiết kế tool registry cho agent.
- Agent loop: plan → act → observe → final.
- LangGraph cho workflow/state machine.
- Context engineering cho LLM application.
- Memory trong AI Agent: khi nào cần và khi nào không.
- Evaluation cho AI Agent.
- Guardrails và human-in-the-loop.
- Logging, tracing và cost tracking cho agent.
- Cách build chatbot portfolio hỏi đáp CV.

### Có bắt buộc không?

Không bắt buộc ở version đầu tiên.

Nhưng nếu có 2–3 bài viết kỹ thuật tốt về AI Agent, portfolio sẽ khác biệt hơn nhiều so với ứng viên chỉ ghi “biết LLM”.

---

## 9. Contact Section

### Nội dung cần có

- Email.
- GitHub.
- LinkedIn.
- CV PDF.
- Location nếu muốn.

### Không nên đưa

- Thông tin quá riêng tư.
- Số điện thoại cá nhân nếu không cần.
- Địa chỉ nhà cụ thể.

---

# Roadmap thực hiện theo giai đoạn

---

## Giai đoạn 1: Chuẩn bị nội dung

### Trạng thái hiện tại

- CV: Đã chuẩn bị xong.
- Định hướng nghề nghiệp: AI Engineer chuyên xây AI Agent Harness.
- Không tập trung vào ML truyền thống.
- Phong cách thiết kế: Modern Dark Agentic AI Portfolio.
- Tech stack portfolio: Next.js + TypeScript + Tailwind CSS + shadcn/ui + Motion.

### Việc cần làm

- Viết đoạn giới thiệu cá nhân theo hướng agent.
- Chọn 3–5 project agent/LLM tốt nhất.
- Chuẩn bị link GitHub cho từng project.
- Chuẩn bị ảnh/video demo nếu có.
- Chuẩn bị screenshot workflow, trace hoặc UI demo.
- Chuẩn bị avatar hoặc ảnh profile.
- Chuẩn bị LinkedIn URL.
- Chuẩn bị email chuyên nghiệp.

### Output cần có

```txt
content/
├── profile.md
├── agent-projects.md
├── skills.md
├── experience.md
└── contact.md
```

---

## Giai đoạn 2: Khởi tạo project Next.js

### Việc cần làm

Tạo project Next.js với TypeScript và Tailwind CSS.

```bash
npx create-next-app@latest ai-agent-portfolio
```

Khi được hỏi, chọn:

```txt
TypeScript: Yes
ESLint: Yes
Tailwind CSS: Yes
src directory: Yes
App Router: Yes
Turbopack: Yes
Import alias: Yes
```

### Cài thêm thư viện

```bash
npm install motion lucide-react clsx tailwind-merge
```

Cài shadcn/ui:

```bash
npx shadcn@latest init
```

Component shadcn/ui nên thêm:

```bash
npx shadcn@latest add button card badge tabs separator accordion dialog
```

---

## Giai đoạn 3: Xây layout cơ bản

### File / folder đề xuất

```txt
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── navbar.tsx
│   ├── hero.tsx
│   ├── about.tsx
│   ├── agent-focus.tsx
│   ├── skills.tsx
│   ├── agent-projects.tsx
│   ├── case-studies.tsx
│   ├── experience.tsx
│   ├── contact.tsx
│   └── footer.tsx
├── data/
│   ├── projects.ts
│   ├── skills.ts
│   └── profile.ts
└── lib/
    └── utils.ts
```

### Component cần làm trước

1. Navbar
2. Hero
3. About
4. Agent Focus
5. Skills
6. Agent Projects
7. Contact
8. Footer

---

## Giai đoạn 4: Thiết kế UI

### Việc cần làm

- Cấu hình theme màu trong Tailwind.
- Thiết kế dark background.
- Tạo gradient background.
- Tạo agent workflow visual.
- Tạo tool cards.
- Tạo project card.
- Tạo skill badge.
- Tạo CTA button.
- Tạo section spacing thống nhất.
- Đảm bảo responsive trên mobile.

### Nguyên tắc UI

- Mỗi section cần có khoảng trắng đủ rộng.
- Không dùng quá nhiều màu.
- Button chính phải nổi bật.
- Project card phải dễ scan.
- Agent workflow phải dễ hiểu.
- Text không nên quá dài.
- Mobile layout phải đẹp.

---

## Giai đoạn 5: Thêm nội dung thật

### Việc cần làm

- Thay tên thật của bạn.
- Thêm tagline cá nhân về AI Agent Harness.
- Thêm mô tả About.
- Thêm kỹ năng thật.
- Thêm project agent thật.
- Thêm link GitHub.
- Thêm link LinkedIn.
- Thêm CV PDF vào thư mục public.

### Thư mục public đề xuất

```txt
public/
├── avatar.jpg
├── resume.pdf
└── projects/
    ├── portfolio-agent.png
    ├── research-agent.png
    ├── task-planning-agent.png
    └── code-review-agent.png
```

---

## Giai đoạn 6: Thêm animation nhẹ

### Dùng Motion cho

- Hero text xuất hiện mượt.
- Agent workflow reveal.
- Project cards fade-in khi scroll.
- Tool cards hover.
- Section reveal.

### Không nên làm

- Animation quá nhiều.
- Animation ảnh hưởng readability.
- Animation khiến trang lag trên mobile.
- Animation agent graph quá phức tạp.

---

## Giai đoạn 7: Tối ưu portfolio

### Checklist tối ưu

- Trang load nhanh.
- Responsive tốt trên mobile.
- Không có link hỏng.
- CV tải được.
- GitHub link đúng.
- LinkedIn link đúng.
- Không lỗi chính tả.
- Project mô tả rõ agent goal, tools, workflow, result.
- Có metadata SEO.
- Có title và description tốt.

### SEO metadata đề xuất

```txt
Title: [Your Name] – AI Agent Engineer Portfolio
Description: AI Engineer portfolio focused on AI agents, LLM applications, tool calling, workflow automation and agent harness design.
```

---

## Giai đoạn 8: Deploy

## Option A: Deploy bằng Vercel

### Khuyến nghị

Với Next.js, nên deploy bằng Vercel trước vì đơn giản và tối ưu nhất.

### Các bước

1. Push code lên GitHub.
2. Vào Vercel.
3. Import repository.
4. Chọn framework Next.js.
5. Deploy.
6. Lấy link portfolio.
7. Gắn link vào CV và LinkedIn.

---

## Option B: Deploy bằng GitHub Pages

### Lưu ý

GitHub Pages phù hợp hơn với static site.

Nếu dùng Next.js, cần cấu hình static export.

### Cấu hình tham khảo trong `next.config.ts`

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

### Quy trình chung

1. Build static site.
2. Export ra thư mục `out`.
3. Push lên GitHub.
4. Bật GitHub Pages.
5. Chọn branch và folder deploy phù hợp.

### Khuyến nghị thực tế

Nếu bạn chưa quen deploy Next.js lên GitHub Pages, hãy dùng Vercel trước.

Sau đó nếu muốn có link `username.github.io`, có thể cấu hình GitHub Pages hoặc custom domain sau.

---

## Giai đoạn 9: Thêm demo AI Agent tương tác sau khi portfolio ổn định

### Không bắt buộc cho version đầu tiên

Chỉ làm khi:

- Website portfolio đã hoàn thiện.
- Nội dung project đã tốt.
- Bạn muốn tạo điểm nhấn khác biệt.

### Tính năng nên thêm trước

#### Option 1: Portfolio Agent hỏi đáp CV

```txt
User hỏi: Bạn có kinh nghiệm gì với agent harness?
Agent trả lời dựa trên CV, project và profile của bạn.
```

Tech stack:

```txt
Next.js API Route
Vercel AI SDK
Claude/OpenAI API
Structured profile data
Optional vector database
```

#### Option 2: Agent Workflow Demo

```txt
User nhập một task.
Agent tạo plan.
Agent chọn tool giả lập.
Agent hiển thị execution trace.
Agent trả kết quả cuối cùng.
```

Tech stack:

```txt
Next.js
LangGraph hoặc custom state machine
Tool registry
LLM API
Execution trace UI
```

#### Option 3: Recruiter Assistant Agent

```txt
User dán job description.
Agent phân tích JD.
Agent match với kỹ năng/project của bạn.
Agent đề xuất vì sao bạn phù hợp.
```

Tech stack:

```txt
Next.js API Route
LLM API
Structured resume data
Prompt templates
```

### Không nên thêm ngay

- Video generation realtime.
- Image generation nếu không phục vụ định vị agent harness.
- Fine-tuning trực tiếp trên website.
- Multi-agent phức tạp khi chưa có single-agent demo tốt.
- Upload file lớn nếu chưa có backend ổn định.

---

# Timeline đề xuất 14 ngày

## Ngày 1: Hoàn thiện định hướng

- CV đã xong.
- Chọn phong cách Modern Dark Agentic AI Portfolio.
- Chọn tech stack.
- Xác định các section chính.
- Loại bỏ trọng tâm ML truyền thống khỏi portfolio.

## Ngày 2: Chuẩn bị nội dung

- Viết About theo hướng AI Agent Harness.
- Liệt kê skills liên quan đến LLM, tool calling, agent workflow.
- Chọn 3–5 agent projects.
- Chuẩn bị GitHub links.
- Chuẩn bị avatar, CV, screenshots.

## Ngày 3: Khởi tạo Next.js project

- Tạo project.
- Cài Tailwind, shadcn/ui, Motion.
- Dọn cấu trúc thư mục.

## Ngày 4: Xây Hero + Navbar

- Tạo navbar.
- Tạo hero section.
- Thêm CTA buttons.
- Thêm dark gradient background.
- Viết tagline agent-focused.

## Ngày 5: Xây About + Agent Focus

- Tạo About section.
- Tạo Agent Focus section.
- Thể hiện tool calling, memory, workflow, evaluation.

## Ngày 6: Xây Skills section

- Chia kỹ năng theo nhóm agent engineering.
- Tạo skill badges.
- Bỏ các kỹ năng ML không liên quan nếu không muốn nhấn mạnh.

## Ngày 7: Xây Agent Projects section

- Tạo project cards.
- Thêm agent goal, tools, workflow.
- Thêm GitHub/demo links.

## Ngày 8: Xây Experience + Contact

- Thêm education/experience.
- Thêm contact section.
- Thêm CV download.

## Ngày 9: Polish UI

- Căn spacing.
- Tối ưu màu sắc.
- Làm responsive mobile.
- Thêm hover state.

## Ngày 10: Thêm animation

- Thêm Motion cho hero.
- Thêm workflow reveal.
- Thêm card animation nhẹ.

## Ngày 11: Thêm case study agent

- Viết chi tiết 1–2 project quan trọng nhất.
- Thêm problem, agent goal, tools, workflow, evaluation, result.

## Ngày 12: SEO + performance

- Thêm metadata.
- Tối ưu ảnh.
- Kiểm tra Lighthouse.
- Kiểm tra mobile.

## Ngày 13: Deploy bản đầu tiên

- Push code lên GitHub.
- Deploy bằng Vercel.
- Kiểm tra link public.

## Ngày 14: Review và gắn vào hồ sơ xin việc

- Nhờ người khác xem thử.
- Sửa lỗi chính tả.
- Sửa project description.
- Sửa link hỏng.
- Gắn portfolio vào CV, LinkedIn và GitHub profile.

---

# Checklist trước khi public

## Nội dung

- [ ] Có tên và chức danh rõ ràng.
- [ ] Có tagline thể hiện AI Agent Harness.
- [ ] Có đoạn giới thiệu ngắn gọn.
- [ ] Có CV download.
- [ ] Có GitHub link.
- [ ] Có LinkedIn link.
- [ ] Có email liên hệ.
- [ ] Có ít nhất 3 project liên quan đến AI Agent / LLM application.
- [ ] Project có agent goal, tools, workflow, result.
- [ ] Project có tech stack.
- [ ] Project có link code hoặc demo.
- [ ] Không làm portfolio bị lệch sang ML truyền thống nếu đó không phải định hướng chính.

## Giao diện

- [ ] Dark theme đẹp.
- [ ] Responsive trên mobile.
- [ ] Card layout rõ ràng.
- [ ] Button dễ thấy.
- [ ] Font dễ đọc.
- [ ] Có visual liên quan agent/workflow.
- [ ] Không quá nhiều animation.
- [ ] Không bị lỗi layout trên màn hình nhỏ.

## Kỹ thuật

- [ ] Không có lỗi build.
- [ ] Không có lỗi TypeScript.
- [ ] Không có link hỏng.
- [ ] Ảnh được tối ưu.
- [ ] Metadata SEO đầy đủ.
- [ ] CV PDF mở được.
- [ ] Website deploy public thành công.

---

# Thứ tự ưu tiên

## Cần làm trước

1. Portfolio đẹp và rõ ràng.
2. Định vị đúng là AI Agent / Agent Harness Engineer.
3. Nội dung project agent chất lượng.
4. CV download được.
5. GitHub/LinkedIn/contact đúng.
6. Deploy public.

## Làm sau

1. Blog kỹ thuật về agent.
2. Case study chi tiết.
3. Portfolio chatbot hỏi đáp CV.
4. Agent workflow demo.
5. Recruiter assistant agent.

## Không ưu tiên hiện tại

1. ML prediction demo.
2. Computer vision demo.
3. Image classification.
4. Kaggle-style project.
5. Image/video generation nếu không phục vụ câu chuyện agent harness.

---

# Kết luận

Version đầu tiên của portfolio nên tập trung vào việc chứng minh bạn là người có thể xây **AI Agent Harness** thực tế.

Mục tiêu quan trọng nhất là:

- Đẹp.
- Rõ ràng.
- Chuyên nghiệp.
- Định vị đúng mảng AI Agent.
- Có project agent thật.
- Có case study thể hiện tool calling, workflow, memory, evaluation.
- Có link GitHub và CV.
- Deploy được để gửi cho nhà tuyển dụng.

Sau khi version đầu tiên ổn định, bạn có thể nâng cấp thêm Portfolio Agent, Agent Workflow Demo hoặc Recruiter Assistant Agent để tạo điểm nhấn khác biệt.
