# Sayaro — Architecture & Construction Website

## Tech Stack
- **Framework:** Next.js 16 (App Router, React 19, TypeScript strict)
- **UI:** Tailwind CSS v4, shadcn/ui, Framer Motion
- **Fonts:** Switzer (headings), Inter (body), Fragment Mono (labels)
- **Smooth Scroll:** Lenis

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint check
- `npm run typecheck` — TypeScript check

## Code Style
- TypeScript strict mode, no `any`
- Named exports, PascalCase components
- Tailwind utilities, mobile-first responsive
- 2-space indentation

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
