# GitHub Copilot — Repository Instructions

> Canonical guidance lives in `AGENTS.md` at the repository root. This file is a concise
> adapter for GitHub Copilot. Read `AGENTS.md` first for full context.

---

## Repository

**ginsengfood-FE** — Next.js 16 + React 19 + TypeScript frontend (App Router).
App source lives in `front-end/src/`. All paths below are relative to `front-end/`.

---

## Stack

| Layer | Tool |
|---|---|
| Framework | **Next.js 16** + React 19 + TypeScript (App Router) |
| Build | Next.js built-in bundler (Turbopack in dev) |
| HTTP client | **Axios** (project standard; install if absent) |
| Styling | **Tailwind CSS v4** via `@tailwindcss/postcss` |
| Package manager | npm |
| Lint | ESLint 9 flat config (`eslint-config-next`) |

---

## Commands (run from `front-end/`)

```bash
npm run dev       # dev server (Turbopack)
npm run lint      # ESLint
npm run build     # next build — TypeScript check + production bundle
npm run start     # start production server after build
```

> No separate typecheck script. No `preview` script. No test script. Do not invent any.

---

## Core rules

- **Axios only** for HTTP calls. No raw `fetch`. No other HTTP libs.
- **Tailwind CSS** for all new UI styling. No new plain CSS files.
- **Botanical Archive design system** lives in `DESIGN.md`. Read it before UI work.
- API calls belong in `src/api/<domain>.ts` and feature `api.ts` files — never inline in JSX.
- All DTO types go in `src/api/dto/`. All response mappers go in `src/api/adapters/`.
- Do not guess API contracts. Use `// TODO: replace with real contract` for unknowns.
- Base URL in `NEXT_PUBLIC_API_BASE_URL` environment variable; read via `process.env.NEXT_PUBLIC_API_BASE_URL`.
- No `any` types. No implicit unknowns. All props must be explicitly typed.
- No raw hex colors, pure black text, or default blue/gray sample styling in final UI.
- Routing is file-system based (Next.js App Router). No React Router. Route pages live in `src/app/(storefront)/` and `src/app/(admin)/` using route groups.
- Page components in `src/app/` should be thin — they import and render feature components from `src/features/`.
- Mark Server Components vs Client Components explicitly: add `'use client'` only when hooks, events, or browser APIs are needed.
- When localizing UI copy to Vietnamese, change rendered copy only and preserve layout,
  component structure, routes, state logic, API contracts, and existing interactions.
- Do not translate identifiers, API fields, route paths, Tailwind classes, asset filenames,
  test selectors, or icon names.
- Before extracting UI components, classify them as page-only, surface-specific,
  module-shared, app-shell, or shared UI. Header/footer/nav are shared only when actually
  reused at app or surface scope.
- Put components in `src/shared/components/` only after real cross-module or cross-surface
  reuse with generic props and no feature-specific logic.
- Read existing files before modifying them.
- Only modify files directly relevant to the task.

---

## Folder conventions

```
src/
  app/           Next.js App Router (routing, root layout, providers)
                   (storefront)/ — storefront route group
                   (admin)/      — admin route group
  features/      Business modules; UI split into storefront/ and admin/ per module
  shared/        Reusable components, hooks, and types
  api/           Axios client, DTOs, adapters, service functions
```

Organize by business module first. Do not create parallel top-level `src/user/` and
`src/admin/` trees. Use `storefront` for customer-facing sales UI and `admin` for
management UI inside each module.

---

## Deeper rules and skills

- Path-specific rules: `.github/instructions/*.instructions.md`
- Visual design system: `DESIGN.md`
- Reusable prompt assets: `.github/prompts/*.prompt.md`
- Agent skills: `.agents/skills/*/SKILL.md`
- Full AI system docs: `docs/ai/`
