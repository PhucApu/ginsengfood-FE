---
mode: agent
description: Create a new page or screen using existing repository conventions.
---

# Create Screen

## What this prompt does
Guides the creation of a new page/screen in the ginsengfood-FE frontend following the
project's established folder structure, component patterns, TypeScript conventions, and
Tailwind CSS styling rules.

---

## Before writing any code — inspect first

1. Read `front-end/package.json` to confirm installed libraries (router, state libs, etc.).
2. List `front-end/src/features/` to see existing feature modules and their naming patterns.
3. List `front-end/src/shared/components/` to find reusable components you should use.
4. List `front-end/src/app/` to understand the current router setup.
5. Read the relevant existing feature (if extending one) before adding to it.

---

## Inputs required

Provide the following before this prompt runs:

- **Screen name** — e.g., "Product List", "Order Detail"
- **Route path** — e.g., `/products`, `/orders/:id`
- **API endpoint(s)** — provide the full contract (URL, method, request body, response shape).
  If the contract is not available, state that explicitly and the agent will create placeholders.
- **UI requirements** — describe what should be displayed (table, form, detail view, etc.)

---

## Implementation checklist

- [ ] Create `src/features/<feature>/` folder if it does not exist
- [ ] Create `src/features/<feature>/components/<ScreenName>.tsx` as the page component
- [ ] Create `src/features/<feature>/types.ts` with domain type definitions
- [ ] Create `src/features/<feature>/api.ts` with API service functions (imports from `src/api/client.ts`)
- [ ] Create `src/features/<feature>/hooks/use<Data>.ts` to wrap API calls
- [ ] If Axios client does not exist, create `src/api/client.ts` first
- [ ] If DTO is known, add it to `src/api/dto/`; if unknown, use `// TODO: replace with real contract`
- [ ] If adapter is needed, add it to `src/api/adapters/`
- [ ] Register the route in `src/app/` (router file) if routing is configured
- [ ] Handle all four UI states: loading, error, empty, success (see rule 50)
- [ ] Style with Tailwind CSS utility classes only (see rule 40)
- [ ] All props and types must be explicitly typed (see rule 20)

---

## Output expectations

After completing the screen, report:

```
## Screen Created: <ScreenName>

### Files created or modified
- front-end/src/features/<feature>/components/<ScreenName>.tsx — new page component
- front-end/src/features/<feature>/types.ts — domain types
- front-end/src/features/<feature>/api.ts — API service functions
- front-end/src/features/<feature>/hooks/use<Data>.ts — data hook
- front-end/src/api/dto/<domain>.dto.ts — DTO type (or PLACEHOLDER if contract unknown)
- front-end/src/api/adapters/<domain>.adapter.ts — response adapter
- front-end/src/app/router.tsx — route registered (if routing exists)

### Verification
- npm run lint: [result]
- npm run build: [result]

### Assumptions made
- [ASSUMPTION] ...

### Deferred items
- [TODO] ...
```

---

## Done criteria

- [ ] Screen renders correctly in the dev server
- [ ] All four state cases handled (loading, error, empty, data)
- [ ] All TypeScript types explicit — no `any`
- [ ] Tailwind classes used for all new styling
- [ ] API calls go through the shared Axios client
- [ ] `npm run lint` and `npm run build` pass
