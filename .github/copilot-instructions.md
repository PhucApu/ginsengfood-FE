# GitHub Copilot — Repository Instructions

> Canonical guidance lives in `AGENTS.md` at the repository root. This file is a concise
> adapter for GitHub Copilot. Read `AGENTS.md` first for full context.

---

## Repository

**ginsengfood-FE** — React 19 + TypeScript + Vite frontend.
App source lives in `front-end/src/`. All paths below are relative to `front-end/`.

---

## Stack

| Layer | Tool |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| HTTP client | **Axios** (project standard; install if absent) |
| Styling | **Tailwind CSS** (project standard; install if absent) |
| Package manager | npm |
| Lint | ESLint 9 flat config |

---

## Commands (run from `front-end/`)

```bash
npm run dev       # dev server
npm run lint      # ESLint
npm run build     # tsc -b + vite build (also typechecks)
npm run preview   # preview production build
```

> No separate typecheck script. No test script. Do not invent either.

---

## Core rules

- **Axios only** for HTTP calls. No raw `fetch`. No other HTTP libs.
- **Tailwind CSS** for all new UI styling. No new plain CSS files.
- **Botanical Archive design system** lives in `DESIGN.md`. Read it before UI work.
- API calls belong in `src/api/<domain>.ts` and feature `api.ts` files — never inline in JSX.
- All DTO types go in `src/api/dto/`. All response mappers go in `src/api/adapters/`.
- Do not guess API contracts. Use `// TODO: replace with real contract` for unknowns.
- Base URL in `VITE_API_BASE_URL` environment variable; read via `import.meta.env`.
- No `any` types. No implicit unknowns. All props must be explicitly typed.
- No raw hex colors, pure black text, or default blue/gray sample styling in final UI.
- Read existing files before modifying them.
- Only modify files directly relevant to the task.

---

## Folder conventions

```
src/
  app/           App shell (providers, layout, router)
  features/      Business modules; split UI into storefront/ and admin/ per module
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
