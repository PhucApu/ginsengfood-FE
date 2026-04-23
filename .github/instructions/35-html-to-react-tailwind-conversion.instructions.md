---
applyTo: "{**/*.html,front-end/src/**/*.{ts,tsx,css}}"
---

# 35 - HTML to React Tailwind Conversion

## Purpose
Define the rules for converting existing HTML/CSS/Tailwind interfaces into React +
TypeScript + Tailwind while preserving the original layout, colors, components, assets,
responsive behavior, and interactions. The conversion must also protect existing React UI
already present under `front-end/src`, including layout chrome, colors, imagery, typography,
stateful behavior, and responsive structure.

This rule extends `AGENTS.md`. For conversion tasks, source fidelity is the priority unless
the user explicitly asks for a redesign. Use rule 26 before extracting source sections into
shared components, and use rule 36 as the required visual parity gate after conversion.

---

## When this rule applies

Use this rule whenever a task asks to:

- Convert an `.html` file into React.
- Rebuild an HTML/CSS/Tailwind prototype in `front-end/src/`.
- Move inline HTML, copied markup, or static UI into `.tsx`.
- Preserve an existing UI "as-is", "1:1", "same layout", "same colors", or "same behavior".
- Convert source HTML/CSS/JS into the current project structure without regressing the UI
  that already exists in `front-end/src`.

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

## Existing React UI baseline

Before editing `front-end/src`, inspect the React UI that the converted work will touch or
sit inside:

- App shell files under `front-end/src/app/`, especially layouts, providers, route shells,
  navigation, footer, and surface-level wrappers.
- Target feature/surface pages and components under
  `front-end/src/features/<module>/<surface>/`.
- Shared components and assets imported by the target UI.
- `front-end/src/app/globals.css` custom properties, font setup, token layer, and global behavior.

Preserve the existing UI baseline unless the user explicitly asks to replace it:

- Keep current layout chrome, page wrappers, container widths, breakpoints, and section
  rhythm.
- Keep current semantic color tokens, font classes, image imports, asset ownership, and
  public-vs-imported asset decisions.
- Keep existing interactions and stateful behavior such as nav menus, dropdowns, carousels,
  form states, chat widgets, scroll buttons, and responsive toggles.
- When replacing an existing screen, make a preservation checklist for layout, colors,
  images, fonts, functionality, and responsive behavior before implementation.
- If the source HTML and existing React shell disagree, treat the source as owning the page
  content and the existing React app as owning the shell. Report unresolved conflicts as
  `[EXISTING UI RISK]`.

Do not overwrite app-wide or surface-wide UI with a copied HTML header/footer/navbar unless
component boundary rule 26 proves that replacement is in scope.

---

## Fidelity priority

- Preserve the source UI first; do not redesign it to fit Botanical Archive unless requested.
- If the source conflicts with `DESIGN.md` or rule 45, keep source fidelity and report it as
  `[CONVERSION DEVIATION]`.
- Preserve the existing React app shell and nearby UI contracts while converting source
  page content into it.
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
  selectors, add the smallest scoped support block to `front-end/src/app/globals.css` and report
  it as `[CONVERSION EXCEPTION]`.
- Preserve existing `front-end/src/app/globals.css` custom properties.

---

## File placement

- Route-level converted pages belong as `page.tsx` files under
  `front-end/src/app/(storefront)/<module>/` or `front-end/src/app/(admin)/<module>/`.
- Feature UI components belong under the same feature/surface `components/` folder:
  `front-end/src/features/<module>/<surface>/components/`.
- Components shared by storefront and admin within one module belong under
  `front-end/src/features/<module>/components/`.
- Cross-module reusable UI belongs under `front-end/src/shared/components/` only after reuse
  is real, not just anticipated.
- Header, footer, navbar, hero, carousel, campaign, and promo sections from source HTML are
  private to the target page or feature/surface unless rule 26 proves app-shell or shared
  ownership.
- Document reusable candidates as `[PROMOTE LATER]` instead of moving one-off converted
  sections into `shared/` prematurely.
- Do not create parallel top-level UI trees outside the established project structure.

---

## Verification

Run from `front-end/` after implementation:

```bash
npm run lint
npm run build
```

Use rule 36 to compare the converted screen against the source HTML/prototype at desktop,
tablet, and mobile widths before declaring the conversion complete. Any unapproved
user-visible difference is `[VISUAL PARITY FAILED]` and must be fixed before the task can
pass. Lint/build success does not override a failed visual parity check.

---

## Output expectations

For conversion work, include:

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

Also include any required component boundary notes from rule 26 and UI/design notes from
rules 40 and 45 when `.tsx` or `.css` files are changed.

---

## Done criteria

- [ ] All source sections, components, assets, text, and interactions are represented.
- [ ] React components are typed and follow the project structure.
- [ ] Tailwind classes preserve source styling with exact values where needed.
- [ ] Existing app shell, fonts, imagery, layout, and stateful behavior were not regressed.
- [ ] No source-specific one-off UI was moved into `shared/` prematurely.
- [ ] Component ownership follows rule 26.
- [ ] Visual parity follows rule 36 and has no unapproved visible differences.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] Deviations and exceptions are documented.
