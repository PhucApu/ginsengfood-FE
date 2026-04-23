---
name: html-to-react-tailwind-conversion
description: >
  Convert existing HTML/CSS/Tailwind interfaces into React + TypeScript + Tailwind
  while preserving source layout, colors, components, responsive behavior, assets, and
  interactive behavior, and while protecting any existing UI shell, typography, imagery,
  component behavior, and visual conventions already present under `front-end/src`. Use
  when migrating a static HTML file, copied prototype, inline script UI, or Tailwind markup
  into the ginsengfood-FE React app with high visual fidelity.
---

# Skill: HTML to React Tailwind Conversion

## Purpose
Convert a source HTML interface into React + TypeScript without redesigning it. Fidelity to
the provided HTML is the primary requirement unless the user explicitly asks for a redesign.

Use this skill together with:

- `screen-delivery` when the conversion creates a route-level page or screen.
- `ui-component-boundary-audit` before deciding whether converted sections are page-only,
  feature/surface components, module-shared components, app-shell chrome, or shared UI.
- `html-conversion-visual-parity` after implementation and before declaring conversion
  fidelity complete.
- `shared-ui-patterns` only when the converted UI contains reusable patterns that already
  appear in more than one place.
- `testing-and-verification` after implementation.

## Required reading

Before editing, read:

1. The full source HTML file and any referenced CSS, JS, fonts, images, and icons.
2. `front-end/package.json`, `front-end/next.config.ts`, `front-end/postcss.config.mjs`, and `front-end/src/`.
3. `DESIGN.md`, `.github/instructions/40-ui-consistency.instructions.md`, and
   `.github/instructions/45-design-system.instructions.md`.
4. `.github/instructions/35-html-to-react-tailwind-conversion.instructions.md`.
5. `.github/instructions/36-html-conversion-visual-parity.instructions.md`.
6. The target React file and any component it imports or replaces.
7. Existing `front-end/src/app/` layout chrome and nearby feature/surface UI that the
   converted screen will sit inside.

If the source HTML conflicts with `DESIGN.md`, preserve the source HTML for conversion
fidelity and report the difference as `[CONVERSION DEVIATION]`.

## Conversion workflow

1. Inventory the source
   - List every section, component, asset, breakpoint, animation, state, and interaction.
   - Identify inline scripts, external scripts, form behavior, modal/dropdown toggles,
     carousel behavior, and any DOM mutation.
   - Capture exact colors, spacing, typography, shadows, borders, z-index, and responsive
     rules from the source.

2. Baseline the existing React UI
   - Identify the current layout shell, navbar, footer, shared wrappers, typography classes,
     color tokens, image import patterns, and interaction patterns already used in
     `front-end/src`.
   - When replacing an existing screen, create a preservation checklist for layout regions,
     colors, images, fonts, copy, interactions, responsive breakpoints, and state behavior
     that must remain unchanged.
   - Treat app-wide or surface-wide chrome as owned by the existing React app unless the
     user explicitly asks to replace it.
   - Preserve existing imported assets and module-owned image placement. Do not hardcode
     `/src/...` asset paths.
   - If source fidelity conflicts with existing app-shell fidelity, preserve the app shell,
     convert the page content inside it, and report `[EXISTING UI RISK]`.

3. Choose the target structure
   - Use `ui-component-boundary-audit` for header, footer, navbar, hero, carousel, card,
     form, table, and widget decisions.
   - Put route-level converted pages under the relevant
     `src/app/(storefront)/<module>/page.tsx` or `src/app/(admin)/<module>/page.tsx` route.
   - Put source-specific subcomponents under the same feature/surface `components/` folder.
   - Use `src/shared/components/` only for components reused across modules or surfaces.
   - Document likely reusable converted sections as `[PROMOTE LATER]` when reuse is not
     proven yet.
   - Keep business logic, API calls, and conversion-only UI concerns separate.

4. Translate markup to React + TypeScript
   - Use function components with explicit props interfaces.
   - Replace `class` with `className`, `for` with `htmlFor`, and inline event attributes
     with typed React handlers.
   - Convert repeated markup into typed data arrays only when it preserves readability and
     does not hide important layout differences.
   - Preserve semantic tags, ARIA attributes, form names, IDs needed by labels, and keyboard
     behavior.
   - Do not introduce `any`, `as any`, class components, or raw DOM manipulation when React
     state/effects can model the behavior.

5. Translate styling to Tailwind
   - Preserve existing Tailwind classes where possible.
   - Map CSS declarations to Tailwind utilities or arbitrary values when exact fidelity is
     required, for example `mt-[18px]`, `shadow-[0_18px_40px_rgba(...)]`, or
     `grid-cols-[280px_1fr]`.
   - Use existing CSS custom properties from `front-end/src/app/globals.css` when they are already
     part of the app baseline.
   - Preserve existing `font-headline`, `font-body`, semantic color tokens, container widths,
     and app-shell spacing unless the conversion target explicitly owns that region.
   - Do not create new `.css` files. If Tailwind cannot represent required keyframes,
     pseudo-elements, or complex selectors, add the smallest scoped support block to
     `front-end/src/app/globals.css` and mark it `[CONVERSION EXCEPTION]` in the output.
   - Do not normalize colors or spacing to Botanical Archive tokens when the user asked for
     a faithful conversion from source HTML.

6. Preserve behavior
   - Convert inline JavaScript into `useState`, `useReducer`, `useEffect`, refs, and typed
     event handlers as appropriate.
   - Keep loading, open/closed, active, selected, disabled, validation, hover, focus, and
     responsive states that exist in the source.
   - Keep existing React interactions from the target UI unless the source conversion
     explicitly replaces them. Do not drop current nav, menu, chat, carousel, form, or
     layout behavior by overwriting a surrounding component.
   - Avoid adding new features that are not present in the source unless the user asks.

7. Verify fidelity
   - Use `html-conversion-visual-parity` to compare the source HTML/prototype and converted
     React screen at desktop, tablet, and mobile widths.
   - Treat any unapproved user-visible difference as `[VISUAL PARITY FAILED]`; fix the
     converted UI and rerun the comparison before declaring the conversion done.
   - Run `npm run lint` and `npm run build` from `front-end/`.
   - When practical, run the dev server with `npm run dev` and inspect the converted screen at desktop and
     mobile widths.
   - Compare against both the source HTML and the pre-existing React UI for layout, color,
     component presence, text, assets, typography, and interaction behavior.

## Output additions

In addition to the repository's required task summary, include:

```txt
### Conversion fidelity notes
- Source file: ...
- Target screen/component: ...
- Existing UI files checked: ...
- Visual parity result: PASSED | FAILED | BLOCKED
- Existing layout/color/image/font/functionality preserved: ...
- Preserved interactions: ...
- [VISUAL PARITY FAILED] ... or none
- [VISUAL BASELINE RISK] ... or none
- [EXISTING UI RISK] ... or none
- [CONVERSION DEVIATION] ... or none
- [CONVERSION EXCEPTION] ... or none
- [PROMOTE LATER] ... or none
```

## Common mistakes to avoid

- Do not redesign the source UI to match the design system unless explicitly requested.
- Do not drop hover/focus/mobile/menu/modal behavior just because the HTML source is static.
- Do not scatter converted page fragments across unrelated features.
- Do not move one-off source-specific components into `shared/`.
- Do not replace exact source colors with approximate Tailwind palette colors.
- Do not overwrite existing `front-end/src` layout chrome, fonts, image imports, or
  interactions while converting only page content.
- Do not delete or overwrite `front-end/src/app/globals.css` custom properties.
