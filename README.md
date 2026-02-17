# AI Interactive Resume

An AI-powered interactive resume that lets recruiters and hiring managers chat with an AI to learn about your professional background. Built with Next.js, Tailwind CSS, and OpenAI.

## Features

- **AI Chat Interface** — Recruiters can ask questions and get natural, first-person responses about your experience
- **Streaming Responses** — Real-time AI response streaming for a smooth chat experience
- **Suggested Questions** — Pre-built question chips guide recruiters to ask the right things
- **Visual Resume Sections** — Traditional resume layout with experience timeline, skills grid, education, and certifications
- **Dark/Light Mode** — Toggle between themes, dark mode by default
- **Fully Responsive** — Works beautifully on desktop, tablet, and mobile
- **Smooth Animations** — Framer Motion powered scroll animations and transitions
- **Single Data Source** — One TypeScript file powers both the AI chatbot and visual resume

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Add Your OpenAI API Key

Create a `.env.local` file (already generated) and add your API key:

```
OPENAI_API_KEY=sk-your-actual-api-key-here
```

Get a key at [platform.openai.com/api-keys](https://platform.openai.com/api-keys).

### 3. Customize Your Resume Data

Edit `lib/resume-data.ts` with your real information. This single file powers everything:

- **Personal Info** — Name, title, location, contact details, tagline
- **Experience** — Job history with achievements and technologies
- **Skills** — Categorized technical and soft skills
- **Education** — Degrees and academic achievements
- **Certifications** — Professional certifications
- **Projects** — Notable projects and open source work
- **Target Role** — What you're looking for and your elevator pitch
- **Suggested Questions** — Questions shown to recruiters in the chat

### 4. Update Metadata

In `app/layout.tsx`, update the `metadata` object with your name and description for SEO and social sharing.

### 5. Run the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your interactive resume.

## Project Structure

```
app/
  layout.tsx            — Root layout with fonts and theme provider
  page.tsx              — Main page composing all sections
  globals.css           — Tailwind + custom styles and design tokens
  api/chat/route.ts     — OpenAI streaming API endpoint

components/
  navbar.tsx            — Sticky navigation with theme toggle
  hero.tsx              — Hero section with stats and CTAs
  chat-section.tsx      — AI chat interface wrapper
  chat-messages.tsx     — Message list with markdown rendering
  chat-input.tsx        — Input bar with suggested questions
  experience.tsx        — Work experience timeline
  skills.tsx            — Skills grid by category
  education.tsx         — Education and certifications
  contact-footer.tsx    — Contact links and CTA
  theme-toggle.tsx      — Dark/light mode toggle
  providers.tsx         — Theme provider wrapper

lib/
  resume-data.ts        — YOUR resume content (edit this!)
  build-system-prompt.ts — Converts resume data to AI system prompt
  utils.ts              — Shared utilities
```

## Deployment to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add the `OPENAI_API_KEY` environment variable in Vercel project settings
4. Deploy — your site will be live at `your-project.vercel.app`
5. Optionally connect a custom domain

## Cost

This app uses OpenAI's `gpt-4o-mini` model which is extremely affordable:

- ~$0.15 per 1M input tokens, ~$0.60 per 1M output tokens
- A typical recruiter conversation (10 messages) costs less than $0.01
- Even with 100 recruiters/month, total AI cost is under $1

## Tech Stack

- [Next.js](https://nextjs.org) — React framework with App Router
- [Tailwind CSS](https://tailwindcss.com) — Utility-first CSS
- [Vercel AI SDK](https://ai-sdk.dev) — AI streaming and chat hooks
- [OpenAI](https://openai.com) — GPT-4o-mini language model
- [Framer Motion](https://www.framer.com/motion) — Animations
- [Lucide Icons](https://lucide.dev) — Icon library
- [next-themes](https://github.com/pacocoursey/next-themes) — Dark mode

## License

MIT
