---
name: frontend-foundation
description: >
  Bootstrap or audit the repository's foundational architecture: folder structure,
  app shell, Axios client setup, Tailwind CSS configuration, environment variables,
  and TypeScript baseline. Use when starting from near-scaffold or setting up a new
  project layer.
---

# Skill: Frontend Foundation

## What this skill is for
Setting up or verifying the foundational architecture of the ginsengfood-FE frontend.
This covers: folder structure, app shell, Axios client, Tailwind CSS, environment variable
conventions, and TypeScript configuration — the baseline everything else builds on.

---

## When to use this skill

- The repository is near-scaffold and needs its target architecture established
- Axios or Tailwind CSS are declared as project standards but not yet installed/configured
- A new `src/` subfolder structure needs to be created
- The API base URL convention is being established
- The app shell (`src/app/`) needs to be created

---

## When NOT to use this skill

- A specific product feature is being built (use `screen-delivery` instead)
- An API endpoint is being connected to an existing screen (use `api-client-and-contracts`)
- UI components are being standardized (use `shared-ui-patterns`)
- You are only running lint or build checks (use `testing-and-verification`)

---

## Required inputs

- Access to `front-end/package.json` (to audit current installations)
- Access to `front-end/next.config.ts` (to confirm Next.js configuration)
- Access to `front-end/postcss.config.mjs` (to confirm Tailwind PostCSS plugin setup)
- Access to `front-end/src/` (to understand current structure)
- Explicit statement of whether this is: install Axios, create folders, or configure environment variables

---

## File reading order

1. `front-end/package.json` — confirm what is installed
2. `front-end/next.config.ts` — current Next.js configuration
3. `front-end/postcss.config.mjs` — Tailwind PostCSS plugin setup
4. `front-end/tsconfig.json` — TypeScript target and paths
5. `front-end/src/app/layout.tsx` — root layout, global fonts, providers
6. `front-end/src/app/globals.css` — existing styles (do not delete)
7. `.env` / `.env.local` if present — environment variable state

---

## Implementation checklist

### Folder structure
- [ ] `src/app/` exists (Next.js App Router: root layout, route groups, providers)
- [ ] `src/features/` exists (feature module root)
- [ ] `src/shared/` exists with `components/`, `hooks/`, `types/` subfolders
- [ ] `src/api/` exists with `client.ts`, `dto/`, `adapters/` subfolders

### Axios setup
- [ ] `axios` is listed in `package.json` dependencies (install: `npm install axios`)
- [ ] `src/api/client.ts` exists and exports an Axios instance using `NEXT_PUBLIC_API_BASE_URL`
- [ ] No raw `axios.get/post` calls exist outside `src/api/`

```ts
// src/api/client.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});
```

### Tailwind CSS setup
- [ ] `tailwindcss` and `@tailwindcss/postcss` are installed (already in `devDependencies`)
- [ ] `postcss.config.mjs` includes the `@tailwindcss/postcss` plugin
- [ ] `src/app/globals.css` includes the Tailwind import directive (`@import "tailwindcss"`)
- [ ] Existing CSS custom properties in `src/app/globals.css` are preserved
- [ ] Do not add a separate `tailwind.config.js` — Tailwind v4 uses PostCSS only

```mjs
// postcss.config.mjs — already configured
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

```css
/* src/app/globals.css — top of file */
@import "tailwindcss";
/* preserve existing custom properties below */
```

### Environment variables
- [ ] `.env.example` exists documenting `NEXT_PUBLIC_API_BASE_URL=`
- [ ] `.env.local` is git-ignored
- [ ] `.gitignore` (in `front-end/`) includes `.env.local`

---

## Verification checklist

- [ ] `npm run lint` passes with no errors after changes
- [ ] `npm run build` passes without errors
- [ ] `process.env.NEXT_PUBLIC_API_BASE_URL` is used in `client.ts` (not a hardcoded URL)
- [ ] Tailwind utility classes render correctly in the dev server

---

## Common mistakes to avoid

- Do not delete `src/app/globals.css` or its custom properties when working with Tailwind — the file already has `@import "tailwindcss"`.
- Do not configure `tailwind.config.js` separately — use the PostCSS plugin approach (`@tailwindcss/postcss`) which is the Tailwind v4 standard for Next.js.
- Do not use `@tailwind base/components/utilities` directives — use `@import "tailwindcss"` for Tailwind v4.
- Do not create a `src/styles/` folder for new global CSS — use Tailwind utilities in JSX.
- Do not hardcode `http://localhost:3000` or any URL in `client.ts`.

---

## Expected deliverables

```
front-end/
  src/
    app/              # created (empty or with router bootstrap)
    features/         # created (empty)
    shared/
      components/     # created
      hooks/          # created
      types/          # created
    api/
      client.ts       # Axios instance
      dto/            # created
      adapters/       # created
  .env.example        # documents NEXT_PUBLIC_API_BASE_URL
```

Plus: Tailwind installed and configured in `next.config.ts` + `front-end/src/app/globals.css`.
