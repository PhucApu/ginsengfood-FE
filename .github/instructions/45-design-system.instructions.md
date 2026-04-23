---
applyTo: "front-end/src/**/*.{tsx,css}"
---

# 45 - Botanical Archive Design System

## Purpose
Ensure UI work follows `DESIGN.md`, the canonical visual design system for ginsengfood-FE.
This rule governs visual tokens, typography, surface treatment, storefront/admin visual
differences, and Tailwind implementation expectations.

---

## When this rule applies
Use this rule whenever you create, modify, or review UI styling in `.tsx` or `.css` files.
It applies to pages, layouts, shared components, forms, cards, tables, dialogs, and any
Tailwind token setup.

---

## Required reading before UI work

Before changing UI, read:

1. `DESIGN.md` - canonical visual system and tokens.
2. `.github/instructions/40-ui-consistency.instructions.md` - component-level patterns.
3. `.github/instructions/25-project-structure.instructions.md` - storefront/admin placement.
4. Existing UI files in the target module or shared component folder.

Do not infer missing design tokens from memory. If a token is missing, define it explicitly
in `DESIGN.md` or mark the gap as `[TODO]`.

---

## Core visual rules

- Use Botanical Archive tokens from `DESIGN.md`.
- Use Tailwind CSS utility classes for implementation.
- Use semantic classes (`bg-surface`, `text-on-surface`, `bg-primary`, `ring-primary`)
  instead of raw hex colors in JSX.
- Use `Noto Serif`/`font-headline` for editorial storytelling and product authority.
- Use `Manrope`/`font-body` for controls, prices, dense data, and admin UI.
- Use tonal surface changes and spacing instead of harsh layout borders.
- Use primary crimson for main brand CTAs and active states. Use tertiary green for
  botanical trust/source sections.

---

## Storefront rules

The storefront is customer-facing and sales-oriented.

Expected treatment:

- Large product imagery.
- Editorial, calm typography.
- Generous section spacing (`py-20` or larger for major sections).
- Wide desktop margins (`lg:px-20`, `xl:px-28` where appropriate).
- Intentional asymmetry only when responsive readability is preserved.
- Apothecary chips for product claims such as `Organic`, `High Saponin`, `Limited Harvest`.

Forbidden in storefront:

- Dense admin tables for normal product browsing.
- Excessive sale/error urgency elements.
- Generic e-commerce blue CTAs.
- Text/image overlap that breaks on mobile.

---

## Admin rules

The admin interface is operational and data-dense.

Expected treatment:

- `font-body` by default.
- Tighter spacing (`p-6`, `gap-4`, `gap-6`).
- Surface tiers for dashboard panels, filters, tables, and toolbars.
- Predictable grids and aligned numeric data.
- Clear loading, empty, error, and success states.

Forbidden in admin:

- Decorative editorial overlap.
- Image bleed as a structural layout device.
- Glassmorphism inside dense tables or forms.
- Low-contrast controls over busy imagery.

---

## Token implementation expectations

When implementing or updating Tailwind tokens:

- Map `DESIGN.md` snake_case tokens to Tailwind kebab-case classes.
- Example: `surface_container_low` becomes `bg-surface-container-low`.
- Keep color tokens semantic. Do not name tokens after one component.
- Do not remove existing `front-end/src/index.css` custom properties unless a dedicated
  migration task explicitly replaces them.
- If Tailwind is not configured yet, document token usage as target behavior and keep the
  implementation minimal.

Recommended token groups:

```txt
colors:
  primary, on-primary, primary-container, on-primary-container
  secondary, secondary-container, on-secondary-container
  tertiary, on-tertiary, tertiary-container, on-tertiary-container
  surface, surface-bright, surface-dim
  surface-container-lowest, surface-container-low, surface-container
  surface-container-high, surface-container-highest
  on-surface, on-surface-variant
  outline, outline-variant
  error, on-error, error-container, on-error-container

fonts:
  display -> Noto Serif
  body -> Manrope

text:
  display-lg, display-md, headline-lg, headline-md, headline-sm
  body-lg, body-md, body-sm, label-md, label-sm
```

---

## Accessibility checks

Every UI change must preserve:

- Visible focus states for interactive elements.
- Readable contrast for text on image, glass, and surface backgrounds.
- Text labels for error states, not color alone.
- Usable mobile layout without unsafe overlap.
- `on_primary` text on crimson-filled actions.
- `on_tertiary` text on green botanical sections.

---

## Forbidden shortcuts

- Do not use pure black (`#000000`) for text.
- Do not hardcode hex values in JSX.
- Do not use default Tailwind blue/gray examples as final UI.
- Do not use 1px solid borders for sectioning or card/list separation.
- Do not introduce new fonts without updating `DESIGN.md`.
- Do not create a new visual convention in a component without documenting it.

---

## Output expectations

When completing UI work, include:

```txt
### Design system notes
- Surface: storefront | admin | shared
- Tokens used: ...
- Typography used: ...
- Deviations from DESIGN.md: none | [explain]
```

---

## Done criteria

- [ ] `DESIGN.md` was followed for tokens, typography, spacing, and visual tone.
- [ ] Storefront/admin styling matches the correct surface.
- [ ] JSX contains no raw hex colors or default sample UI colors.
- [ ] Focus, error, disabled, loading, and empty states remain accessible.
- [ ] Any new visual convention is documented before reuse.
