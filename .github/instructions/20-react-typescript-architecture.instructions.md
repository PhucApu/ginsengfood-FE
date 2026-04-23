---
applyTo: "front-end/src/**/*.{ts,tsx}"
---

# 20 — React + TypeScript Architecture

## Purpose
Define how components, features, shared UI, and domain logic must be structured in this repository.

---

## When this rule applies
Any time you create or modify a `.ts` or `.tsx` file under `front-end/src/`.

---

## Component boundaries

### Feature components
- Live in `src/features/<module>/storefront/components/` or
  `src/features/<module>/admin/components/` when surface-specific.
- Live in `src/features/<module>/components/` only when shared by both surfaces within
  the same module.
- Route-level feature screens live in `src/features/<module>/<surface>/pages/`.
- Responsible for one module and one application surface's UI and interaction logic.
- May import from `src/shared/` but must not import from other features.

### Shared components
- Live in `src/shared/components/`.
- Stateless or minimally stateful UI building blocks (buttons, tables, badges, dialogs, inputs).
- Must not contain business logic or direct API calls.
- Must accept explicit TypeScript props — no implicit any, no untyped children.

### App shell
- Lives in `src/app/`.
- Contains: root layout, global providers, router bootstrap.
- Must not contain feature-specific code.

---

## Module structure (per feature)

```
src/features/<module>/
  types.ts          # TypeScript types and interfaces for this module's domain
  api.ts            # API calls for this module (imports from src/api/client.ts)
  hooks/            # Custom hooks shared by this module
  components/       # Components shared by storefront/admin in this module only
  storefront/
    pages/          # Customer-facing route components
    components/     # Customer-facing module components
    hooks/          # Customer-facing hooks, only when not shared by admin
  admin/
    pages/          # Admin route components
    components/     # Admin module components
    hooks/          # Admin hooks, only when not shared by storefront
```

Do not mix these concerns. A component file must not also contain API service functions.
Do not create top-level `src/user/` and `src/admin/` folders for business modules; organize
by module first, then split UI by surface.

---

## Typing requirements

- Every component must have an explicit `interface` or `type` for its props.
- No `React.FC` without typing the props interface.
- No `any`. No `as any` casts.
- Prefer `interface` for object shapes, `type` for unions and aliases.
- Export domain types from `types.ts`, not from component files.

```tsx
// CORRECT
interface ProductCardProps {
  id: string;
  name: string;
  price: number;
}

export function ProductCard({ id, name, price }: ProductCardProps) { ... }

// FORBIDDEN
export function ProductCard(props: any) { ... }
```

---

## Composition rules

- Prefer composition over prop drilling beyond two levels.
- If a component needs more than ~5 props, consider splitting it or using a context.
- Hooks belong in `hooks/` folders, not inline inside component files — except for trivial
  one-liner `useState` calls.
- Side effects belong in `useEffect` or custom hooks, not in event handlers or render logic.

---

## Forbidden patterns

- No class components.
- No business logic or API calls directly inside JSX return statements.
- No imports that cross feature boundaries (feature A must not import from feature B).
- No inline `style={{ }}` for new UI — use Tailwind utility classes instead.
- No scattered raw Axios calls in component files.

---

## Done criteria

- [ ] Component has explicit typed props interface
- [ ] No `any` types introduced
- [ ] Files placed in correct folder (feature, shared, app, api)
- [ ] No cross-feature imports
- [ ] API logic is in hooks or api files, not in JSX
