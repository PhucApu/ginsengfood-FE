---
name: vietnamese-content-localization
description: >
  Translate or rewrite user-visible website copy into natural Vietnamese while preserving
  the existing React component structure, layout, styling, data flow, routes, and
  interactions. Use when Codex is asked to localize displayed text, labels, CTAs,
  navigation, form placeholders, validation messages, empty/error states, product copy,
  alt text, aria labels, or other UI content without redesigning or changing functionality.
---

# Skill: Vietnamese Content Localization

## Purpose
Localize displayed website content to Vietnamese as a copy-only change. The primary goal is
natural Vietnamese copy with no unintended change to layout, behavior, data contracts, or
component architecture.

Use this skill together with:

- `testing-and-verification` after implementation.
- `html-to-react-tailwind-conversion` only when the localization happens during a source
  HTML conversion task.

## When NOT to use this skill

- The user asks for an i18n framework, language switcher, translation files, or runtime
  locale management.
- The task is a redesign, layout cleanup, or feature change rather than copy localization.
- Backend API contracts, database values, or route paths need translation.

## Required reading

Before editing, read:

1. `front-end/package.json`, `front-end/next.config.ts`, and `front-end/src/`.
2. `.github/instructions/55-vietnamese-content-localization.instructions.md`.
3. Every target file that contains copy to localize.
4. Any imported component or data array that renders the copy being changed.
5. `DESIGN.md` only if copy length, hierarchy, or tone could affect the visual result.

## Localization workflow

1. Define the copy scope
   - Inventory text nodes, string constants, arrays, button labels, navigation labels,
     form placeholders, helper text, validation messages, empty/error states, alt text,
     `title`, `aria-label`, and product/marketing copy that render in the UI.
   - Separate displayed copy from identifiers, keys, API fields, route paths, asset names,
     CSS classes, icon names, and test selectors.

2. Preserve structure and behavior
   - Edit only rendered copy and text metadata intended for users.
   - Do not change JSX hierarchy, component names, prop names, hook usage, imports,
     state logic, event handlers, routes, API calls, array ordering, Tailwind classes, or
     design tokens unless the user explicitly asks.
   - Do not move copy into new abstractions or translation systems for a copy-only task.

3. Write Vietnamese copy
   - Use natural Vietnamese with proper diacritics.
   - Keep storefront copy warm, concise, and credible; keep admin copy direct and operational.
   - Preserve brand names, product names, ingredient names, regulatory terms, SKUs, URLs,
     dates, units, prices, discounts, and numeric values unless a source contract says
     otherwise.
   - Do not strengthen medical, health, origin, purity, discount, or certification claims.
   - Prefer concise Vietnamese phrasing when the source UI has tight space.

4. Check layout safety
   - Expect Vietnamese text to be longer than English in some controls.
   - First solve length risk with better copy, not layout changes.
   - If the current layout cannot safely fit natural Vietnamese without changing layout,
     report `[LOCALIZATION RISK]` and ask before changing structure or styling.
   - Never hide important meaning just to fit a button or card.

5. Verify
   - Run `npm run lint` and `npm run build` from `front-end/`.
   - When practical, inspect the page at desktop and mobile widths to confirm text does not
     overlap, overflow, or truncate important meaning.

## Output additions

In addition to the repository's required task summary, include:

```txt
### Localization notes
- Target language: Vietnamese
- Scope: copy-only
- Layout/function changes: none
- [LOCALIZATION RISK] ... or none
```

## Common mistakes to avoid

- Do not translate TypeScript identifiers, component names, API fields, route paths, CSS
  class names, Tailwind tokens, Material Symbols icon names, or asset filenames.
- Do not change card grids, spacing, breakpoints, button variants, or component structure
  to make translated copy fit unless the user explicitly approves.
- Do not invent product benefits, health claims, discounts, inventory status, awards, or
  origin details during translation.
- Do not leave mixed English/Vietnamese UI copy unless it is a brand term, technical term,
  or explicitly intentional.
