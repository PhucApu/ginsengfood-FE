---
mode: agent
description: Connect a UI component or screen to a backend API endpoint through the project's Axios-based API layer.
---

# Connect API

## What this prompt does
Guides the safe connection of a UI screen or component to a real backend API contract
using this project's Axios client, DTO typing, adapter pattern, and hook convention.

---

## Before writing any code — inspect first

1. Read `front-end/package.json` — confirm Axios is installed.
2. Check if `front-end/src/api/client.ts` exists — if not, it must be created first.
3. Read the existing feature's `api.ts` and `hooks/` folder — understand current patterns.
4. Read the target component to understand what data it currently expects.
5. Confirm the `.env` or `.env.local` file has `VITE_API_BASE_URL` set.

---

## Inputs required

Provide the following:

- **API endpoint** — full URL path, e.g., `GET /api/products`
- **Request contract** — query params, request body shape (if POST/PUT)
- **Response contract** — exact JSON field names and types from the API
- **Target component or screen** — which component will consume this data
- **Domain type expected by the UI** — what TypeScript type the component currently uses
  (or what it should use)

If the response contract is not available, state that — the agent will create a
`// TODO: replace with real contract` placeholder DTO.

---

## Implementation checklist

- [ ] If `src/api/client.ts` does not exist: create it with `VITE_API_BASE_URL` base URL
- [ ] Define or update the DTO in `src/api/dto/<domain>.dto.ts`
- [ ] Write or update the adapter in `src/api/adapters/<domain>.adapter.ts`
- [ ] Write or update the service function in `src/api/<domain>.ts`
- [ ] Write or update the hook in `src/features/<feature>/hooks/use<Data>.ts`
- [ ] Update the component to use the hook (remove any hardcoded/mock data)
- [ ] Add `VITE_API_BASE_URL=<placeholder>` to `.env.example` if that file exists
- [ ] Handle loading, error, and empty states in the component (see rule 50)
- [ ] Ensure all types are explicit — no `any` in DTO, adapter, or hook

---

## Verification checklist

- [ ] `npm run lint` passes with no new errors
- [ ] `npm run build` passes without errors
- [ ] Component correctly shows loading state while fetching
- [ ] Component correctly shows error state on failure
- [ ] Component correctly shows empty state when response is empty array
- [ ] Component correctly renders data on success

---

## Output expectations

```
## API Connected: <domain> → <ComponentName>

### Files created or modified
- front-end/src/api/client.ts — [created|already existed]
- front-end/src/api/dto/<domain>.dto.ts — DTO definition
- front-end/src/api/adapters/<domain>.adapter.ts — adapter function
- front-end/src/api/<domain>.ts — service function
- front-end/src/features/<feature>/hooks/use<Data>.ts — data hook
- front-end/src/features/<feature>/components/<Screen>.tsx — updated to use hook

### Verification
- npm run lint: [result]
- npm run build: [result]

### Assumptions made
- [ASSUMPTION] ...

### Deferred items
- [TODO] ...
```
