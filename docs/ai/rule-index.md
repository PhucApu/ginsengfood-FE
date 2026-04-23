# Rule Index

> Rules live in `.github/instructions/`. Each rule is a focused, reusable instruction file
> with `applyTo` frontmatter that tells Copilot when to apply it automatically.

---

## 10 — Working Mode

**File:** `.github/instructions/10-working-mode.instructions.md`
**Applies to:** `**` (all files, all tasks)

**What it does:**
Defines the mandatory inspect-first policy, scoping requirements, output format, and
done criteria that apply to every task in this repository.

**When it applies:**
Always. This rule is the baseline operating mode for every AI task.

**Key rules:**
- Read files before editing them
- Check `package.json` before assuming any library exists
- Scope changes to only what is necessary
- Report what changed, what was assumed, and what was deferred

---

## 20 — React + TypeScript Architecture

**File:** `.github/instructions/20-react-typescript-architecture.instructions.md`
**Applies to:** `front-end/src/**/*.{ts,tsx}`

**What it does:**
Defines component boundaries, feature vs shared separation, typed props requirements,
composition rules, and forbidden patterns for React + TypeScript code.

**When it applies:**
Any time a `.ts` or `.tsx` file is created or modified.

**Key rules:**
- Feature UI is organized by module, then split into `storefront/` and `admin/`
- Shared components in `src/shared/components/`
- Every component has an explicit typed props interface
- No `any`, no cross-feature imports, no API calls in JSX

---

## 25 - Project Structure and File Placement

**File:** `.github/instructions/25-project-structure.instructions.md`
**Applies to:** `front-end/src/**/*.{ts,tsx}`

**What it does:**
Defines where files belong as the frontend grows into two separate application surfaces:
`storefront` for the customer sales interface and `admin` for system management.

**When it applies:**
Any time a file is created, moved, or reviewed under `front-end/src/`, especially for
pages, modules, routes, API services, hooks, and shared UI components.

**Key rules:**
- Organize by business module first, then split UI into `storefront/` and `admin/`
- Keep shared domain code at the module root (`types.ts`, `api.ts`, `hooks/`)
- Put app-wide routing, layouts, providers, and guards in `src/app/`
- Do not create parallel top-level trees like `src/user/` and `src/admin/`
- Do not duplicate API/type/hook logic between storefront and admin

---

## 30 — API Integration

**File:** `.github/instructions/30-api-integration.instructions.md`
**Applies to:** `front-end/src/**/*.{ts,tsx}`

**What it does:**
Defines how all HTTP calls must be made through the shared Axios client, with DTOs,
adapters, service functions, and hooks as the required pattern.

**When it applies:**
Any time code makes, modifies, or handles HTTP requests.

**Key rules:**
- Axios only — no raw `fetch`
- `src/api/client.ts` is the only Axios instance
- DTOs typed in `src/api/dto/`, adapters in `src/api/adapters/`
- Never guess API response shapes — use `// TODO: replace with real contract`
- Base URL from `VITE_API_BASE_URL` environment variable

---

## 40 — UI Consistency

**File:** `.github/instructions/40-ui-consistency.instructions.md`
**Applies to:** `front-end/src/**/*.tsx`

**What it does:**
Defines component-level UI consistency using the Botanical Archive visual language from
`DESIGN.md`: surfaces, buttons, inputs, chips, cards, admin tables, page layout, and
forbidden visual shortcuts.

**When it applies:**
Any time a `.tsx` file that renders JSX is created or modified.

**Key rules:**
- Tailwind utility classes only for new UI, using design-system tokens
- No raw hex colors, pure black text, or default blue/gray sample styling
- Buttons, admin tables, chips, inputs, cards, and layouts follow Botanical Archive patterns
- Existing `index.css` custom properties must be preserved

---

## 45 - Botanical Archive Design System

**File:** `.github/instructions/45-design-system.instructions.md`
**Applies to:** `front-end/src/**/*.{tsx,css}`

**What it does:**
Requires UI styling to follow `DESIGN.md`, the canonical visual design system for
ginsengfood-FE. Covers color tokens, Tailwind token mapping, typography, storefront/admin
visual differences, accessibility, and visual shortcuts to avoid.

**When it applies:**
Any time UI styling is created, modified, reviewed, or mapped into Tailwind tokens.

**Key rules:**
- Read `DESIGN.md` before UI work
- Use semantic token classes such as `bg-surface`, `text-on-surface`, and `bg-primary`
- Use `font-headline` for storefront storytelling and `font-body` for admin/data work
- Keep storefront editorial and admin operational
- Do not invent missing tokens inside components

---

## 50 — State and User Feedback

**File:** `.github/instructions/50-state-feedback.instructions.md`
**Applies to:** `front-end/src/**/*.tsx`

**What it does:**
Requires all data-dependent UI to handle loading, error, empty, and success states
with consistent Botanical Archive visual patterns and variable naming.

**When it applies:**
Any time a component fetches data, submits a form, or performs an async operation.

**Key rules:**
- Loading state: visible indicator (spinner or skeleton)
- Error state: user-readable message + retry where applicable
- Empty state: descriptive message (not a blank area)
- Submit buttons disabled while in progress
- Standard state variables: `loading`, `error`, `data`, `isSubmitting`
- Feedback UI uses `DESIGN.md` semantic tokens

---

## 60 — Safe Change Boundaries

**File:** `.github/instructions/60-safe-change-boundaries.instructions.md`
**Applies to:** `**` (all files, all tasks)

**What it does:**
Restricts each task to its minimum necessary change set, protects working code, and
requires rollback awareness for non-trivial changes.

**When it applies:**
Always. Applies to every task alongside rule 10.

**Key rules:**
- Only change files explicitly in scope
- Do not refactor working code outside task scope
- Do not add dependencies without disclosing them
- Destructive git operations require explicit user confirmation
- Document unrelated issues as `[TODO]` instead of fixing them inline
