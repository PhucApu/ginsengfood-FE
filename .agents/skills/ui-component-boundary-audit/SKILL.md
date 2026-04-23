---
name: ui-component-boundary-audit
description: >
  Audit and decide UI component ownership boundaries during React screen builds, HTML/CSS/JS
  conversions, refactors, or reviews. Use when Codex must determine which components should
  be page-only, storefront/admin surface-specific, shared within a feature module, app-shell
  layout/navigation, or truly reusable under src/shared/components, including cases like
  header, footer, navbar, hero, product card, carousel, table, form, and widget components.
---

# Skill: UI Component Boundary Audit

## Purpose
Classify components before or after building a UI so the codebase grows without premature
sharing, duplicated layout code, or cross-feature imports.

Use this skill together with:

- `screen-delivery` when creating a new page or screen.
- `html-to-react-tailwind-conversion` when converting source HTML/CSS/JS into React.
- `shared-ui-patterns` only after this audit proves a component should live in
  `src/shared/components/`.
- `testing-and-verification` after implementation.

## When NOT to use this skill

- Only changing copy, colors, spacing, or a small bug inside a component whose ownership is
  already correct.
- Building a shared component after ownership is already proven; use `shared-ui-patterns`.
- Moving files for a non-UI concern such as API services, DTOs, adapters, or pure utilities.

## Required reading

Before deciding or moving component boundaries, read:

1. `front-end/package.json`, `front-end/next.config.ts`, and `front-end/src/`.
2. `AGENTS.md`.
3. `.github/instructions/20-react-typescript-architecture.instructions.md`.
4. `.github/instructions/25-project-structure.instructions.md`.
5. `.github/instructions/26-ui-component-boundaries.instructions.md`.
6. `.github/instructions/35-html-to-react-tailwind-conversion.instructions.md` for
   conversion tasks.
7. Every page/component that currently uses, imports, or duplicates the pattern.

## Classification workflow

1. Inventory candidates
   - List route pages, large sections, repeated blocks, layout chrome, controls, forms,
     data displays, widgets, and source-HTML sections.
   - Note usage count, feature module, surface (`storefront` or `admin`), props needed,
     state ownership, assets, API/domain assumptions, and styling variants.

2. Classify each component
   - **Page-only**: used once by one route page. Keep inside that page or the same
     feature/surface `components/` folder.
   - **Surface-specific feature component**: reused within one module and one surface.
     Place in `src/features/<module>/<surface>/components/`.
   - **Module-shared component**: reused by storefront and admin within the same business
     module and still depends on that module's domain. Place in
     `src/features/<module>/components/`.
   - **Shared UI component**: reused across modules or app surfaces, has a generic prop API,
     and contains no feature-specific business logic. Place in `src/shared/components/`.
   - **App-shell component**: navigation, layout, providers, route guards, or surface-wide
     chrome used by the whole app/surface. Place in `src/app/` once app shell exists.

3. Apply common component decisions
   - Header/navbar/footer are not automatically shared. Treat them as app-shell only when
     they are used by the whole app or entire surface. Treat them as feature/surface
     components when they are campaign, landing-page, or module-specific.
   - Hero, banner, storytelling, carousel, campaign, and promo components usually stay
     feature/surface-specific unless reused by multiple modules with generic props.
   - Buttons, inputs, badges, chips, dialogs, tables, pagination, tabs, and empty/error
     states are good shared candidates only after real reuse or a clear design-system need.
   - Product cards, order rows, user forms, and inventory tables usually stay in their
     feature module because they carry domain assumptions.

4. Preserve conversion fidelity
   - During HTML conversion, keep source-specific sections under the target
     feature/surface first.
   - Extract shared components only after identifying real reuse in the React app or an
     explicit user request to create a shared component library.
   - Do not move one-off converted sections into `shared/` just because they look reusable.

5. Report the audit
   - Provide the classification table before or alongside implementation.
   - Mark any uncertain placement as `[BOUNDARY RISK]` and explain what evidence is missing.
   - If a component should be promoted to shared later, document it as `[PROMOTE LATER]`
     instead of prematurely moving it.

## Output additions

When this skill is used, include:

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

## Common mistakes to avoid

- Do not place a component in `src/shared/components/` because it has a generic name like
  `Header`, `Footer`, `Card`, or `Section`.
- Do not make a shared component depend on feature DTOs, API hooks, route paths, product
  copy, storefront-only assets, or admin-only assets.
- Do not make one shared component handle unrelated storefront and admin needs through many
  boolean props.
- Do not import from one feature into another feature. Move truly reusable code to
  `shared/` or keep copies separate until the reuse is real.
- Do not refactor working components into shared abstractions during unrelated copy, style,
  or bug-fix tasks.
