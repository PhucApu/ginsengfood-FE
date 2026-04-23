---
applyTo: "{**/*.html,front-end/src/**/*.{ts,tsx,css}}"
---

# 35 - HTML to React Tailwind Conversion

## Purpose
Define the rules for converting existing HTML/CSS/Tailwind interfaces into React +
TypeScript + Tailwind while preserving the original layout, colors, components, assets,
responsive behavior, and interactions.

This rule extends `AGENTS.md`. For conversion tasks, source fidelity is the priority unless
the user explicitly asks for a redesign.

---

## When this rule applies

Use this rule whenever a task asks to:

- Convert an `.html` file into React.
- Rebuild an HTML/CSS/Tailwind prototype in `front-end/src/`.
- Move inline HTML, copied markup, or static UI into `.tsx`.
- Preserve an existing UI "as-is", "1:1", "same layout", "same colors", or "same behavior".

---

## Required source inventory

Before implementation, identify and preserve:

- Page sections and component hierarchy.
- Text content, labels, icons, images, logos, and decorative assets.
- Exact colors, typography, spacing, widths, heights, borders, shadows, opacity, and z-index.
- Breakpoints and responsive layout changes.
- Hover, focus, active, selected, disabled, loading, expanded, collapsed, modal, dropdown,
  carousel, tab, form, and validation states.
- Inline scripts and DOM behavior that must become React state, effects, refs, or handlers.

Do not begin conversion from a partial reading of the source HTML.

---

## Fidelity priority

- Preserve the source UI first; do not redesign it to fit Botanical Archive unless requested.
- If the source conflicts with `DESIGN.md` or rule 45, keep source fidelity and report it as
  `[CONVERSION DEVIATION]`.
- Do not replace exact source colors with approximate Tailwind palette colors.
- Do not normalize spacing, radius, shadows, or typography unless the source itself is
  inconsistent and the user asks for cleanup.
- Do not remove visible UI elements or interactions that exist in the source.

---

## React + TypeScript conversion rules

- Use React function components with explicit TypeScript interfaces or types.
- Replace HTML attributes correctly: `className`, `htmlFor`, camelCase SVG/DOM props, and
  typed event handlers.
- Keep semantic tags and accessibility attributes when present.
- Preserve label/input relationships, button types, ARIA attributes, keyboard behavior, and
  focus states.
- Convert repeated static blocks into arrays only when it does not obscure intentionally
  different markup or styling.
- Convert inline JavaScript into `useState`, `useReducer`, `useEffect`, refs, and typed
  handlers.
- Do not introduce `any`, `as any`, class components, or direct DOM mutation when React can
  own the state.

---

## Tailwind conversion rules

- Use Tailwind utility classes for converted UI.
- Preserve existing Tailwind classes from the source where possible.
- Use Tailwind arbitrary values for exact CSS fidelity, such as `w-[312px]`,
  `bg-[#f7efe2]`, `shadow-[0_24px_60px_rgba(0,0,0,0.14)]`, or
  `grid-cols-[280px_1fr]`.
- Raw hex values are allowed inside Tailwind arbitrary value classes only when they come
  from the source HTML/CSS and are needed for fidelity.
- Do not create new component-scoped `.css` or `.module.css` files.
- If Tailwind cannot accurately represent required keyframes, pseudo-elements, or complex
  selectors, add the smallest scoped support block to `front-end/src/index.css` and report
  it as `[CONVERSION EXCEPTION]`.
- Preserve existing `front-end/src/index.css` custom properties.

---

## File placement

- Route-level converted pages belong under
  `front-end/src/features/<module>/<surface>/pages/`.
- Source-specific components belong under the same feature/surface `components/` folder.
- Components shared by storefront and admin within one module belong under
  `front-end/src/features/<module>/components/`.
- Cross-module reusable UI belongs under `front-end/src/shared/components/` only after reuse
  is real, not just anticipated.
- Do not create parallel top-level UI trees outside the established project structure.

---

## Verification

Run from `front-end/` after implementation:

```bash
npm run lint
npm run build
```

When practical, also inspect the converted screen in a browser at desktop and mobile widths.
Compare it against the source HTML for layout, color, assets, text, and interactions.

---

## Output expectations

For conversion work, include:

```txt
### Conversion fidelity notes
- Source file: ...
- Target screen/component: ...
- Preserved interactions: ...
- [CONVERSION DEVIATION] ... or none
- [CONVERSION EXCEPTION] ... or none
```

Also include any required UI/design notes from rules 40 and 45 when `.tsx` or `.css` files
are changed.

---

## Done criteria

- [ ] All source sections, components, assets, text, and interactions are represented.
- [ ] React components are typed and follow the project structure.
- [ ] Tailwind classes preserve source styling with exact values where needed.
- [ ] No source-specific one-off UI was moved into `shared/` prematurely.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] Deviations and exceptions are documented.
