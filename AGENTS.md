# AGENTS.md — Canonical Project Guidance

> This is the single authoritative instruction file for all coding agents and AI assistants
> working in this repository. All other instruction files (`.github/`, `.agents/`) align to this document.

---

## 1. What this repository is

**ginsengfood-FE** is a frontend-only React application.

| Property | Value |
|---|---|
| Framework | React 19 + TypeScript + Vite |
| HTTP client | **Axios** (project standard — install if not yet present) |
| Styling system | **Tailwind CSS** (project standard — install and configure if not yet present) |
| Package manager | **npm** — always use `npm` commands, never yarn or pnpm |
| App root | `front-end/` inside the repository root |
| Git root | repository root (one level above `front-end/`) |

---

## 2. Repository maturity

**Near-initial scaffold.**

As of the initial audit:
- The Vite + React + TypeScript scaffold is present in `front-end/`.
- Axios is **not yet installed** but is the declared HTTP client standard.
- Tailwind CSS is **not yet installed** but is the declared styling standard.
- There is no router, no API layer, no shared UI, no state management, and no test setup.
- All architecture conventions below represent the first-defined baseline for this project.
- Existing CSS in `front-end/src/index.css` uses custom properties; preserve these during any Tailwind migration.

---

## 3. Inspect-first policy

Before editing any file, read:

1. `front-end/package.json` — confirm what is installed.
2. `front-end/vite.config.ts` — confirm current plugin configuration.
3. `front-end/src/` — understand what already exists.
4. The full content of any file you intend to modify.
5. Any existing feature or API code that your change will interact with.

If a convention is not yet established, define a lean project default, apply it, and note it
explicitly in your output as `[NEW CONVENTION]`.

---

## 4. Target folder structure

```
front-end/
  src/
    app/                  # App shell: providers, layouts, router, route guards
      providers/
      router/
      layouts/
      guards/
    assets/               # App-wide imported assets: brand logos, global imagery, app shell assets
    features/             # Feature modules (one folder per business domain)
      <module>/
        types.ts          # Domain types for this module
        api.ts            # Module API calls (uses shared API client)
        hooks/            # Shared hooks for this module
        components/       # Components shared by storefront/admin in this module only
        assets/           # Module assets shared by storefront/admin in this module only
        storefront/       # Customer-facing sales UI for this module
          pages/
          components/
          hooks/
          assets/         # Storefront-only images and static assets for this module
        admin/            # Admin management UI for this module
          pages/
          components/
          hooks/
          assets/         # Admin-only images and static assets for this module
    shared/
      components/         # Reusable UI components: buttons, tables, dialogs, badges
      hooks/              # Reusable custom hooks
      types/              # Shared TypeScript type and interface definitions
      utils/              # Shared pure helpers
      constants/          # Shared app-wide constants
      assets/             # Assets owned by shared components or reusable UI patterns
    api/
      client.ts           # Axios instance (base URL, interceptors, auth headers)
      dto/                # Raw API response type definitions (DTO = what the API returns)
      adapters/           # Mappers: transform raw DTO types into domain types
      <domain>.ts         # Domain-scoped API service functions
```

**Rules:**
- Organize by business module first, then split module UI into `storefront/` and `admin/`.
- Use `storefront` for the customer-facing sales interface; reserve `users` for the account/user domain.
- UI work must follow the Botanical Archive design system in `DESIGN.md`.
- Do not scatter Axios calls directly in component files.
- Do not put shared UI in a feature folder.
- Do not put feature-specific business logic in `shared/`.
- Do not create parallel top-level trees such as `src/user/` and `src/admin/` for business modules.
- Place images and static assets next to their closest owner:
  - `src/assets/` for app-wide imported assets.
  - `src/features/<module>/assets/` for module assets shared by storefront/admin.
  - `src/features/<module>/storefront/assets/` for storefront-only module assets.
  - `src/features/<module>/admin/assets/` for admin-only module assets.
  - `src/shared/assets/` for assets owned by shared components or shared UI patterns.
- Use `front-end/public/` only for files that need stable public URLs or root paths, such as favicon, robots.txt, manifests, Open Graph images, or files referenced outside the React bundle.
- Import React UI images through the module system; do not hardcode `/src/...` paths.
- Use descriptive kebab-case asset names such as `heritage-ginseng-hero.webp` or `empty-cart.svg`.
- Prefer `.webp` or `.avif` for photos, `.svg` for vector logos/icons, and `.png` only when transparency or source constraints require it.
- Do not keep scaffold assets such as Vite or React logos in production UI.
- Start by adding to the closest appropriate existing folder before creating new folders.

---

## 5. Technology standards

| Concern | Approved approach | Notes |
|---|---|---|
| HTTP client | Axios | No `fetch`, no other HTTP libs |
| Styling | Tailwind CSS utility classes | No new plain CSS files for new UI |
| Language | React functional components + TypeScript | No class components |
| State | `useState` / `useReducer` local first | Add shared state only when clearly needed |
| Data fetching | Custom hooks wrapping Axios calls | No raw Axios in JSX return |
| Routing | React Router v6+ when needed | Not yet installed; do not assume it exists |
| Forms | Controlled or uncontrolled React | No form library assumed yet |
| Types | Explicit interface / type declarations | No `any`, no implicit `unknown` |
| Tests | Not configured | Do not fabricate test scripts |

---

## 6. How to avoid guessing API contracts

- Never invent backend field names, endpoint paths, or response shapes.
- If an API contract is provided (schema, Swagger, sample response): define a DTO type in
  `src/api/dto/`, write an adapter in `src/api/adapters/`, then write the service function.
- If no contract is provided: create the DTO as a placeholder with a clear comment:
  ```ts
  // TODO: replace with real API contract when available
  export interface ProductDto { /* fields unknown */ }
  ```
- All base URLs go in environment variables (`.env`, `.env.local`).
- The Axios instance (`src/api/client.ts`) reads `import.meta.env.VITE_API_BASE_URL`.

---

## 7. How to keep changes small and reviewable

- Implement one concern per task.
- Do not edit unrelated files even if you notice issues in them — document them separately.
- Do not destructively rewrite working code.
- Do not delete `front-end/src/index.css` or its custom properties without an explicit instruction.
- When introducing Tailwind, add it alongside existing styles first.
- Introduce new dependencies only if they are part of the declared stack or are explicitly requested.

---

## 8. Verification before claiming done

Run from `front-end/` directory:

```bash
npm run lint      # ESLint check (flat config, catches TypeScript and React rules)
npm run build     # TypeScript compile (tsc -b) + Vite production build
```

> There is no separate `typecheck` script. TypeScript errors surface through `npm run build`.
> There is no test script. Do not invent one.

A task is **done** when:
- The described change is implemented correctly.
- `npm run lint` passes with no new errors or warnings.
- `npm run build` completes without errors.
- No unrelated files were modified.
- No undeclared dependencies were silently added.

---

## 9. Required output format after every task

After completing any implementation task, report:

```
## Task Summary

### Files created or modified
- path/to/file.tsx — what changed and why

### Verification
- npm run lint: [PASSED / output]
- npm run build: [PASSED / output]

### Assumptions made
- [ASSUMPTION] ...

### Deferred items
- [TODO] ...
```

---

## 10. Where deeper guidance lives

| Purpose | Location |
|---|---|
| Copilot repository guidance (adapter) | `.github/copilot-instructions.md` |
| Visual design system | `DESIGN.md` |
| Path-scoped reusable rules | `.github/instructions/*.instructions.md` |
| Reusable prompt assets | `.github/prompts/*.prompt.md` |
| Reusable agent skills | `.agents/skills/*/SKILL.md` |
| AI system documentation | `docs/ai/` |

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **ginsengfood-FE** (24 symbols, 24 relationships, 0 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/ginsengfood-FE/context` | Codebase overview, check index freshness |
| `gitnexus://repo/ginsengfood-FE/clusters` | All functional areas |
| `gitnexus://repo/ginsengfood-FE/processes` | All execution flows |
| `gitnexus://repo/ginsengfood-FE/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
