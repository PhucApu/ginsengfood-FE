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

## html-to-react-tailwind-conversion

**File:** `.agents/skills/html-to-react-tailwind-conversion/SKILL.md`

**What it is for:**
Converting HTML/CSS/JS or Tailwind UI prototypes into React + TypeScript + Tailwind while
preserving the source layout, colors, images, fonts, responsive behavior, interactions, and
the existing React UI baseline already present under `front-end/src`.

**When to invoke:**
- A static `.html` file or copied prototype needs to become project React code
- Source UI must be preserved "as-is", "1:1", or with the same visual/interactive behavior
- Converted content must sit inside existing storefront/admin layouts without regressing
  current nav, footer, typography, image imports, or stateful interactions

**When NOT to invoke:**
- The task is only deciding component ownership (use `ui-component-boundary-audit`)
- The task is only translating visible copy (use `vietnamese-content-localization`)
- The task is creating a new screen from scratch with no source HTML to preserve

---

## html-conversion-visual-parity

**File:** `.agents/skills/html-conversion-visual-parity/SKILL.md`

**What it is for:**
Running the required post-conversion visual parity check after HTML/CSS/JS or Tailwind UI
has been converted into React + TypeScript + Tailwind. It compares source and converted UI
across desktop, tablet, and mobile viewports, plus relevant interaction states.

**When to invoke:**
- Immediately after `html-to-react-tailwind-conversion` implementation work
- A converted UI must prove it still matches the original source/prototype
- The user asks for before/after comparison, visual regression checking, or 1:1 conversion
  validation

**When NOT to invoke:**
- There is no source HTML/prototype/baseline to compare against
- The user explicitly approved a redesign instead of a faithful conversion
- The task is only running generic lint/build verification

---

## ui-component-boundary-audit

**File:** `.agents/skills/ui-component-boundary-audit/SKILL.md`

**What it is for:**
Auditing UI component ownership boundaries during screen builds, HTML/CSS/JS conversions,
refactors, or reviews. It classifies components as page-only, surface-specific,
module-shared, app-shell, or shared UI.

**When to invoke:**
- Deciding whether header, footer, navbar, hero, carousel, card, table, form, or widget
  components should be shared or private
- Converting source HTML/CSS/JS and choosing target React component placement
- Reviewing duplicated UI and deciding whether it should be promoted to `shared/`
- Before using `shared-ui-patterns` when ownership is unclear

**When NOT to invoke:**
- Only changing copy inside existing components
- Only styling a component whose ownership is already correct
- Building a shared component after ownership is already proven (use `shared-ui-patterns`)

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

---

## vietnamese-content-localization

**File:** `.agents/skills/vietnamese-content-localization/SKILL.md`

**What it is for:**
Translating or rewriting user-visible website content into natural Vietnamese while keeping
the existing React component structure, layout, styling, routes, API contracts, data flow,
and interactions unchanged.

**When to invoke:**
- A page, component, or local content array needs displayed copy localized to Vietnamese
- Labels, CTAs, navigation text, placeholders, validation messages, empty/error states,
  alt text, or aria labels need Vietnamese wording
- The user explicitly asks to translate website content without changing layout or behavior

**When NOT to invoke:**
- Adding a language switcher or runtime i18n framework
- Redesigning the page or changing responsive layout
- Translating backend field names, endpoint paths, route URLs, or stored API data
