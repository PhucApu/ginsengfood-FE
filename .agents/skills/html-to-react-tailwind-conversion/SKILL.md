---
name: html-to-react-tailwind-conversion
description: >
  Convert existing HTML/CSS/Tailwind interfaces into React + TypeScript + Tailwind
  while preserving source layout, colors, components, responsive behavior, assets, and
  interactive behavior. Use when migrating a static HTML file, copied prototype, inline
  script UI, or Tailwind markup into the ginsengfood-FE React app with high visual fidelity.
---

# Skill: HTML to React Tailwind Conversion

## Purpose
Convert a source HTML interface into React + TypeScript without redesigning it. Fidelity to
the provided HTML is the primary requirement unless the user explicitly asks for a redesign.

Use this skill together with:

- `screen-delivery` when the conversion creates a route-level page or screen.
- `shared-ui-patterns` only when the converted UI contains reusable patterns that already
  appear in more than one place.
- `testing-and-verification` after implementation.

## Required reading

Before editing, read:

1. The full source HTML file and any referenced CSS, JS, fonts, images, and icons.
2. `front-end/package.json`, `front-end/vite.config.ts`, and `front-end/src/`.
3. `DESIGN.md`, `.github/instructions/40-ui-consistency.instructions.md`, and
   `.github/instructions/45-design-system.instructions.md`.
4. The target React file and any component it imports or replaces.

If the source HTML conflicts with `DESIGN.md`, preserve the source HTML for conversion
fidelity and report the difference as `[CONVERSION DEVIATION]`.

## Conversion workflow

1. Inventory the source
   - List every section, component, asset, breakpoint, animation, state, and interaction.
   - Identify inline scripts, external scripts, form behavior, modal/dropdown toggles,
     carousel behavior, and any DOM mutation.
   - Capture exact colors, spacing, typography, shadows, borders, z-index, and responsive
     rules from the source.

2. Choose the target structure
   - Put route-level converted pages under the relevant
     `src/features/<module>/<surface>/pages/` folder.
   - Put source-specific subcomponents under the same feature/surface `components/` folder.
   - Use `src/shared/components/` only for components reused across modules or surfaces.
   - Keep business logic, API calls, and conversion-only UI concerns separate.

3. Translate markup to React + TypeScript
   - Use function components with explicit props interfaces.
   - Replace `class` with `className`, `for` with `htmlFor`, and inline event attributes
     with typed React handlers.
   - Convert repeated markup into typed data arrays only when it preserves readability and
     does not hide important layout differences.
   - Preserve semantic tags, ARIA attributes, form names, IDs needed by labels, and keyboard
     behavior.
   - Do not introduce `any`, `as any`, class components, or raw DOM manipulation when React
     state/effects can model the behavior.

4. Translate styling to Tailwind
   - Preserve existing Tailwind classes where possible.
   - Map CSS declarations to Tailwind utilities or arbitrary values when exact fidelity is
     required, for example `mt-[18px]`, `shadow-[0_18px_40px_rgba(...)]`, or
     `grid-cols-[280px_1fr]`.
   - Use existing CSS custom properties from `front-end/src/index.css` when they are already
     part of the app baseline.
   - Do not create new `.css` files. If Tailwind cannot represent required keyframes,
     pseudo-elements, or complex selectors, add the smallest scoped support block to
     `front-end/src/index.css` and mark it `[CONVERSION EXCEPTION]` in the output.
   - Do not normalize colors or spacing to Botanical Archive tokens when the user asked for
     a faithful conversion from source HTML.

5. Preserve behavior
   - Convert inline JavaScript into `useState`, `useReducer`, `useEffect`, refs, and typed
     event handlers as appropriate.
   - Keep loading, open/closed, active, selected, disabled, validation, hover, focus, and
     responsive states that exist in the source.
   - Avoid adding new features that are not present in the source unless the user asks.

6. Verify fidelity
   - Run `npm run lint` and `npm run build` from `front-end/`.
   - When practical, run the dev server and inspect the converted screen at desktop and
     mobile widths.
   - Compare against the source HTML for layout, color, component presence, text, assets,
     and interaction behavior.

## Output additions

In addition to the repository's required task summary, include:

```txt
### Conversion fidelity notes
- Source file: ...
- Target screen/component: ...
- Preserved interactions: ...
- [CONVERSION DEVIATION] ... or none
- [CONVERSION EXCEPTION] ... or none
```

## Common mistakes to avoid

- Do not redesign the source UI to match the design system unless explicitly requested.
- Do not drop hover/focus/mobile/menu/modal behavior just because the HTML source is static.
- Do not scatter converted page fragments across unrelated features.
- Do not move one-off source-specific components into `shared/`.
- Do not replace exact source colors with approximate Tailwind palette colors.
- Do not delete or overwrite `front-end/src/index.css` custom properties.
