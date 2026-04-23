# AI System — ginsengfood-FE

This document explains the AI instruction system for the ginsengfood-FE repository.

---

## Purpose

This system provides reusable, consistent guidance for all AI coding agents and assistants
(GitHub Copilot, Codex, Claude-backed workflows) working in this repository.

The goal is to:
- Eliminate repeated context-setting for every task
- Enforce project conventions automatically through rules and skills
- Enable fast, consistent delivery of screens, API integrations, and UI patterns

---

## Ownership model

```
AGENTS.md                          ← canonical engineering guidance (single source of truth)
DESIGN.md                          ← canonical visual design system
  │
  ├── .github/copilot-instructions.md   ← Copilot adapter (references AGENTS.md)
  │
  ├── .github/instructions/            ← path-scoped reusable rules
  │     10-working-mode
  │     20-react-typescript-architecture
  │     25-project-structure
  │     26-ui-component-boundaries
  │     30-api-integration
  │     40-ui-consistency
  │     45-design-system
  │     50-state-feedback
  │     55-vietnamese-content-localization
  │     60-safe-change-boundaries
  │
  ├── .github/prompts/                  ← reusable task prompts for VS Code Copilot
  │     create-screen.prompt.md
  │     connect-api.prompt.md
  │     review-ui-consistency.prompt.md
  │
  ├── .agents/skills/                   ← shared agent skills for repeatable workflows
  │     frontend-foundation/SKILL.md
  │     screen-delivery/SKILL.md
  │     api-client-and-contracts/SKILL.md
  │     shared-ui-patterns/SKILL.md
  │     ui-component-boundary-audit/SKILL.md
  │     vietnamese-content-localization/SKILL.md
  │     testing-and-verification/SKILL.md
  │
  └── docs/ai/                          ← this documentation
        README.md
        rule-index.md
        skill-index.md
```

**AGENTS.md is the single canonical source of truth for engineering workflow and project
architecture.** **DESIGN.md is the canonical source of truth for visual design.** Other
instruction files adapt these documents for specific tools and tasks; they must not define
competing conventions.

---

## Approved technology stack

| Concern | Tool |
|---|---|
| Framework | **Next.js 16** + React 19 + TypeScript (App Router) |
| Build | Next.js built-in bundler (Turbopack in dev) |
| HTTP client | **Axios** — no raw fetch, no other HTTP libs |
| Styling | **Tailwind CSS v4** via `@tailwindcss/postcss` — no new plain CSS files |
| Package manager | npm |

> Axios is the declared HTTP client standard but may not yet be installed. The instruction
> system treats it as the baseline and provides setup guidance in the `frontend-foundation` skill.

---

## How to use this system

### For implementation tasks
1. Read `AGENTS.md` first.
2. Load the relevant skill from `.agents/skills/`.
3. Follow the skill's file reading order and implementation checklist.
4. Verify with `npm run lint` and `npm run build` before reporting done.

### For UI tasks
1. Read `DESIGN.md` before creating or changing UI.
2. Follow `.github/instructions/26-ui-component-boundaries.instructions.md` before
   extracting or moving components into shared/module/surface folders.
3. Follow `.github/instructions/40-ui-consistency.instructions.md` for component patterns.
4. Follow `.github/instructions/45-design-system.instructions.md` for Botanical Archive
   tokens, typography, and storefront/admin visual differences.
5. Follow `.github/instructions/55-vietnamese-content-localization.instructions.md` when
   changing displayed website copy to Vietnamese without changing layout or behavior.

### For VS Code Copilot tasks
- Use prompts from `.github/prompts/` as starting points.
- Rules in `.github/instructions/` are automatically applied to matching file paths.

### For new conventions
- When establishing a project convention that did not previously exist, mark it `[NEW CONVENTION]` in the task output.
- Update `AGENTS.md` and the relevant rule file if the convention is permanent.

---

## Repository maturity note

This repository was near-scaffold when this instruction system was created. The folder
structure, Axios client, and Tailwind CSS configuration documented in these files are
the target state, not necessarily the current state. Each skill includes setup steps
for missing pieces.
