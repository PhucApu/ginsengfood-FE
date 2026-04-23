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
- Access to `front-end/vite.config.ts` (to confirm plugin configuration)
- Access to `front-end/src/` (to understand current structure)
- Explicit statement of whether this is: install Tailwind, install Axios, create folders, or all three

---

## File reading order

1. `front-end/package.json` — confirm what is installed
2. `front-end/vite.config.ts` — current plugin setup
3. `front-end/tsconfig.app.json` — TypeScript target and paths
4. `front-end/src/main.tsx` — app entry point, provider setup
5. `front-end/src/App.tsx` — root component
6. `front-end/src/index.css` — existing styles (do not delete)
7. `.env` / `.env.local` if present — environment variable state

---

## Implementation checklist

### Folder structure
- [ ] `src/app/` exists (app shell: providers, router bootstrap, root layout)
- [ ] `src/features/` exists (feature module root)
- [ ] `src/shared/` exists with `components/`, `hooks/`, `types/` subfolders
- [ ] `src/api/` exists with `client.ts`, `dto/`, `adapters/` subfolders

### Axios setup
- [ ] `axios` is listed in `package.json` dependencies (install: `npm install axios`)
- [ ] `src/api/client.ts` exists and exports an Axios instance using `VITE_API_BASE_URL`
- [ ] No raw `axios.get/post` calls exist outside `src/api/`

```ts
// src/api/client.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
```

### Tailwind CSS setup
- [ ] `tailwindcss` is installed (install: `npm install -D tailwindcss @tailwindcss/vite`)
- [ ] `vite.config.ts` includes the Tailwind Vite plugin
- [ ] `src/index.css` includes the Tailwind import directive (`@import "tailwindcss"`)
- [ ] Existing CSS custom properties in `src/index.css` are preserved

```ts
// vite.config.ts — with Tailwind
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

```css
/* src/index.css — top of file */
@import "tailwindcss";
/* preserve existing custom properties below */
```

### Environment variables
- [ ] `.env.example` exists documenting `VITE_API_BASE_URL=`
- [ ] `.env.local` is git-ignored
- [ ] `.gitignore` (in `front-end/`) includes `.env.local`

---

## Verification checklist

- [ ] `npm run lint` passes with no errors after changes
- [ ] `npm run build` passes without errors
- [ ] `import.meta.env.VITE_API_BASE_URL` is used in `client.ts` (not a hardcoded URL)
- [ ] Tailwind utility classes render correctly in the dev server

---

## Common mistakes to avoid

- Do not delete `src/index.css` or its custom properties when adding Tailwind — add the import at the top.
- Do not configure `tailwind.config.js` separately — use the Vite plugin approach (`@tailwindcss/vite`) which is the Tailwind v4 standard.
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
  .env.example        # documents VITE_API_BASE_URL
```

Plus: Tailwind installed and configured in `vite.config.ts` + `index.css`.
