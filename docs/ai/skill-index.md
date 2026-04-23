# Skill Index

> Skills live in `.agents/skills/`. Each skill is a reusable, task-oriented instruction
> set that an AI agent loads before beginning a specific type of work.
>
> Every skill has a `SKILL.md` with YAML frontmatter, a when-to-use/when-not-to-use section,
> a file reading order, an implementation checklist, a verification checklist, and expected deliverables.

---

## frontend-foundation

**File:** `.agents/skills/frontend-foundation/SKILL.md`

**What it is for:**
Setting up or verifying the foundational architecture of the repository: folder structure
(`app/`, `features/`, `shared/`, `api/`), the Axios client instance, Tailwind CSS
configuration, and environment variable conventions.

**When to invoke:**
- The repo is near-scaffold and needs its target structure established
- Axios is not yet installed but is required
- Tailwind CSS is not yet configured
- The `src/api/client.ts` file does not exist
- Environment variable conventions are being established for the first time

**When NOT to invoke:**
- Building a specific product feature (use `screen-delivery`)
- Connecting a screen to an API (use `api-client-and-contracts`)

---

## screen-delivery

**File:** `.agents/skills/screen-delivery/SKILL.md`

**What it is for:**
Adding a complete new page or screen to the frontend: feature folder setup, domain types,
API service function, data-fetching hook, page component with all four UI states, Tailwind
styling, and route registration.

**When to invoke:**
- A new route/page needs to be created
- A feature module needs its initial screen
- A placeholder page needs to be completed with real data and styling

**When NOT to invoke:**
- Only connecting a new API to an existing screen (use `api-client-and-contracts`)
- Only fixing shared UI components (use `shared-ui-patterns`)
- Setting up the initial project structure (use `frontend-foundation`)

---

## api-client-and-contracts

**File:** `.agents/skills/api-client-and-contracts/SKILL.md`

**What it is for:**
Building or extending the Axios API layer: creating or updating the shared client instance,
defining DTO types, writing adapter/mapper functions, implementing service functions, and
writing the data-fetching hooks that components consume.

**When to invoke:**
- Setting up `src/api/client.ts` for the first time
- Adding or updating an API endpoint integration
- Backend contract changed and DTO/adapter need updating
- Auth headers or interceptors need to be added to the Axios instance

**When NOT to invoke:**
- Building UI components that already have working hooks (use `screen-delivery`)
- Fixing visual patterns only (use `shared-ui-patterns`)
- Running verification only (use `testing-and-verification`)

---

## shared-ui-patterns

**File:** `.agents/skills/shared-ui-patterns/SKILL.md`

**What it is for:**
Creating and maintaining the shared Botanical Archive / Tailwind CSS-based UI component
library: buttons, tables, Apothecary Chips, status badges, form inputs, dialogs, and any
other pattern used across multiple screens. Ensures visual consistency without duplication.

**When to invoke:**
- A UI pattern appears in two or more places and no shared component exists
- A new `src/shared/components/` component needs to be created
- A UI consistency review reveals duplicated or inconsistent visual patterns
- Tailwind design conventions need to be established for a new element type

**When NOT to invoke:**
- Building a complete new page (use `screen-delivery`)
- The main concern is API integration (use `api-client-and-contracts`)
- Running build/lint only (use `testing-and-verification`)

---

## testing-and-verification

**File:** `.agents/skills/testing-and-verification/SKILL.md`

**What it is for:**
Running the available verification tools — `npm run lint` and `npm run build` — and
interpreting their output. Includes a diagnostic reference for common TypeScript and ESLint
errors, and a rollback process for failed verifications.

**When to invoke:**
- As the final verification gate after completing any implementation task
- When checking if existing code is clean before starting a new task
- When diagnosing lint or build failures

**Important note:**
There is no test script in this repository. Do not reference `npm test` or `npm run test`.
TypeScript checking is performed through `npm run build` (runs `tsc -b`).
