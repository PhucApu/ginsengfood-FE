---
applyTo: "front-end/src/**/*.{ts,tsx}"
---

# 26 - UI Component Boundaries

## Purpose
Define how to decide whether a UI component is private to a page, private to one
storefront/admin surface, shared inside a feature module, part of the app shell, or reusable
under `src/shared/components/`.

This rule extends `AGENTS.md`, rule 20, and rule 25. It applies before component extraction
and during HTML/CSS/JS conversion into React.

---

## When this rule applies
Use this rule any time you create, extract, move, review, or convert React UI components,
especially headers, footers, navbars, heroes, banners, cards, carousels, forms, tables,
widgets, and repeated sections.

---

## Component ownership levels

### Page-only component
Use when a component is used by one route/page only.

Placement:

```txt
src/app/(storefront)/<module>/page.tsx
src/app/(admin)/<module>/page.tsx
src/features/<module>/storefront/components/<ComponentName>.tsx
src/features/<module>/admin/components/<ComponentName>.tsx
```

Rules:

- Keep very small one-off sections inline inside the page.
- Extract to the same surface `components/` folder only when it improves readability.
- Do not move page-only UI to `shared/`.

### Surface-specific feature component
Use when a component is reused within one module and one surface only.

Placement:

```txt
src/features/<module>/storefront/components/
src/features/<module>/admin/components/
```

Examples:

- Storefront campaign hero for products.
- Admin product filter toolbar.
- Storefront-only floating cart widget.

### Module-shared component
Use when storefront and admin both need the component inside the same business module, and
the component still depends on that module's domain language or types.

Placement:

```txt
src/features/<module>/components/
```

Examples:

- Product status chip that uses product-domain statuses.
- Order summary block reused by admin detail and storefront order history.

### App-shell component
Use when a component belongs to global app wiring, surface-wide layouts, route structure,
providers, or middleware.

Placement:

```txt
src/app/layout.tsx
src/app/providers.tsx
src/app/(storefront)/layout.tsx
src/app/(admin)/layout.tsx
src/middleware.ts
```

Examples:

- Root layout, `StorefrontLayout`, `AdminLayout` (as `layout.tsx` files in route groups).
- `providers.tsx` for global React context.
- `middleware.ts` for route protection (Next.js edge middleware).
- Header/footer/navigation only when they are used by the whole app or the whole surface.

### Shared UI component
Use when a component is reused across modules or surfaces and has no feature-specific
business logic.

Placement:

```txt
src/shared/components/
```

Examples:

- Button, input, dialog, tabs, badge, chip, pagination, table shell, empty state.

Rules:

- Props must be generic and explicitly typed.
- Must not import from `src/features/`.
- Must not know route paths, backend DTOs, product copy, storefront-only assets, or
  admin-only assets.
- Use composition over many boolean props for unrelated variants.

---

## Decision checklist
Before placing or extracting a component, answer:

1. How many places use it today?
2. Are those places in one page, one surface, one module, multiple modules, or the app shell?
3. Does it import feature domain types, feature hooks, API services, route paths, or assets?
4. Does it contain business copy or behavior specific to products, orders, users, campaigns,
   storefront, or admin?
5. Can it be typed with generic props without weakening clarity?
6. Would sharing it reduce real duplication, or only anticipate future reuse?

Default to the closest owner. Promote later when reuse becomes real.

---

## Common examples

- `Header`, `Navbar`, `Footer`: app-shell only when used by the whole app or whole surface;
  otherwise keep in the relevant feature/surface.
- `HeroSection`, `ProminentBanner`, `CampaignCarousel`: usually feature/surface-specific.
- `ProductCard`, `ProductGrid`, `OrderRow`, `InventoryTable`: usually feature-owned because
  they encode domain assumptions.
- `Button`, `Input`, `Dialog`, `Badge`, `Chip`, `Tabs`, `Pagination`, `EmptyState`: good
  shared candidates after real reuse or explicit design-system work.
- `MaterialSymbol` or icon wrapper: shared only if multiple modules/surfaces use it; keep
  feature/surface-specific when created for a one-off converted page.

---

## HTML conversion rule
When converting HTML/CSS/JS:

- First map source sections to page-only or feature/surface components.
- Keep source-specific converted sections near the target page.
- Extract shared UI only when the converted pattern already appears elsewhere in the React
  app or the task explicitly asks for a shared component.
- Preserve source fidelity before abstraction.
- Document reusable candidates as `[PROMOTE LATER]` instead of moving them prematurely.

---

## Forbidden patterns

- Do not create `src/shared/components/Header.tsx` or `Footer.tsx` just because the name is
  common.
- Do not put feature-specific API calls, hooks, DTOs, route paths, or assets in `shared/`.
- Do not import a component from one feature into another feature.
- Do not create one over-generic shared component with many unrelated boolean props.
- Do not refactor working private components into shared abstractions during unrelated
  tasks.

---

## Output expectations
When creating, extracting, moving, converting, or reviewing UI components, report:

```txt
### Component boundary audit
- Page-only: ...
- Surface-specific: ...
- Module-shared: ...
- App-shell: ...
- Shared UI: ...
- [BOUNDARY RISK] ... or none
- [PROMOTE LATER] ... or none
```

---

## Done criteria

- [ ] Components are placed at the closest correct owner.
- [ ] Shared UI contains no feature-specific imports, assets, copy, API calls, or route paths.
- [ ] Feature components do not import another feature's internal components.
- [ ] HTML conversion does not move one-off source sections into `shared/` prematurely.
- [ ] Reusable candidates that are not yet shared are documented as `[PROMOTE LATER]`.
