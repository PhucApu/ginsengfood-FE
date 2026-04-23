---
name: screen-delivery
description: >
  Add a new page or screen to the frontend using the project's established conventions:
  feature folder structure, TypeScript types, Axios API hook, Tailwind CSS styling, and
  all four UI states (loading, error, empty, success).
---

# Skill: Screen Delivery

## What this skill is for
Adding a complete, working page or screen to the ginsengfood-FE frontend from scratch,
following the feature folder convention, using the Axios API layer, and rendering all
required UI states with Tailwind CSS.

---

## When to use this skill

- A new page/route needs to be created
- A new feature module needs its initial screen
- An existing placeholder page needs to be completed with real data and styling

---

## When NOT to use this skill

- You only need to connect an existing screen to a new API (use `api-client-and-contracts`)
- You only need to fix or create shared UI components (use `shared-ui-patterns`)
- You are setting up the initial project structure (use `frontend-foundation`)

---

## Required inputs

Before starting, the following must be provided or discovered:

- Screen name and route path
- API endpoint(s) and response contract (or explicit statement that it is unknown)
- UI requirements: table, form, detail view, list, etc.

If the API contract is unknown: create placeholder DTOs with `// TODO: replace with real contract`.

---

## File reading order

1. `front-end/package.json` — confirm router and Axios are installed
2. `front-end/src/app/` — find the router file and understand route registration
3. `front-end/src/features/` — understand existing feature naming conventions
4. `front-end/src/shared/components/` — find reusable components to use
5. `front-end/src/api/client.ts` — confirm the Axios client exists
6. Any existing feature folder that is most similar to the one being built

---

## Implementation checklist

### Feature folder setup
- [ ] `src/features/<feature>/` created
- [ ] `src/features/<feature>/types.ts` — domain type definitions
- [ ] `src/features/<feature>/api.ts` — API service function(s) using `apiClient`
- [ ] `src/features/<feature>/hooks/use<Data>.ts` — data hook wrapping the service
- [ ] `src/features/<feature>/components/<ScreenName>.tsx` — page component

### API layer (if not yet set up for this domain)
- [ ] DTO added to `src/api/dto/<domain>.dto.ts`
- [ ] Adapter added to `src/api/adapters/<domain>.adapter.ts`
- [ ] Service function in `src/features/<feature>/api.ts` calls through `apiClient`

### Route registration
- [ ] Route registered in `src/app/` router file (if routing is configured)
- [ ] If no router is installed, document that the route is not yet wired

### UI requirements
- [ ] Loading state: spinner or skeleton while data fetches
- [ ] Error state: user-readable message + retry button where applicable
- [ ] Empty state: descriptive message when list is empty (not blank area)
- [ ] Success state: full data render
- [ ] All styling uses Tailwind CSS utility classes
- [ ] No inline `style={{ }}` objects
- [ ] All props explicitly typed with TypeScript interface

---

## Verification checklist

- [ ] `npm run lint` passes with no new errors
- [ ] `npm run build` passes without errors
- [ ] Page renders in dev server on the correct route
- [ ] All four UI states are reachable and render correctly
- [ ] No `any` types in new code

---

## Common mistakes to avoid

- Do not call `apiClient` directly inside component JSX — use a hook.
- Do not skip the empty state; it is always required for list/table screens.
- Do not invent API field names — use placeholders if the contract is unknown.
- Do not use inline style objects for layout — use Tailwind utility classes.
- Do not import from other feature folders; use `src/shared/` for cross-feature components.

---

## Expected deliverables

```
front-end/src/
  features/
    <feature>/
      components/
        <ScreenName>.tsx    # page component
      hooks/
        use<Data>.ts        # data hook
      api.ts                # service function
      types.ts              # domain types

  api/
    dto/
      <domain>.dto.ts       # raw API types
    adapters/
      <domain>.adapter.ts   # DTO → domain mapper
```
