---
mode: agent
description: Scan the frontend for UI inconsistencies and propose targeted fixes aligned to the Botanical Archive design system.
---

# Review UI Consistency

## What this prompt does
Audits the frontend source for UI inconsistencies across components and screens, then
proposes minimal, targeted changes to align everything with `DESIGN.md`, the project's
Botanical Archive design system, Tailwind token conventions, and shared component patterns.

---

## Before reviewing - inspect first

1. Read `DESIGN.md`.
2. Read `.github/instructions/40-ui-consistency.instructions.md`.
3. Read `.github/instructions/45-design-system.instructions.md`.
4. List all files in `front-end/src/features/` and `front-end/src/shared/components/`.
5. Read every `.tsx` file that renders a table, button, form input, chip, badge, or dialog.
6. Note: the existing `front-end/src/index.css` uses CSS custom properties; preserve them unless a dedicated token migration is in scope.
7. Do not propose changes to the original Vite scaffold styles unless they conflict with new screens.

---

## What to check

### Buttons
- [ ] Uses Botanical Archive token classes (`bg-primary`, `text-on-primary`, `bg-surface`, etc.)
- [ ] Consistent primary crimson / secondary gold / tertiary green usage
- [ ] Disabled state consistently applied (`disabled:opacity-50 disabled:cursor-not-allowed`)
- [ ] No inline `style={{ }}` on buttons

### Tables
- [ ] Admin headers use `bg-surface-container-highest` and `text-on-surface-variant`
- [ ] Dense rows use surface tiers instead of harsh dividers
- [ ] Consistent cell padding across all tables
- [ ] Numeric values align consistently

### Inputs and forms
- [ ] Uses ghost border pattern (`border-outline-variant/20`) only where clarity requires it
- [ ] No missing focus styles (`focus-visible:ring-2 focus-visible:ring-primary` or error equivalent)
- [ ] Error states include readable helper text, not color alone

### Apothecary chips and badges
- [ ] Apothecary Chips use `secondary-container` for product tags
- [ ] Sale/error badges use `error`; botanical trust/source treatment uses `tertiary`; membership uses gold secondary tokens
- [ ] Status meaning is readable from text, not color alone

### Page layout
- [ ] Storefront uses editorial spacing, image-led layout, and `font-headline` headlines
- [ ] Admin uses tighter spacing, `font-body`, surface tiers, and predictable grids
- [ ] No unsafe image/text overlap on mobile

### Feedback states
- [ ] Every data-loading section has a loading indicator
- [ ] Every error case shows a user-readable message
- [ ] No blank areas when lists are empty

### Spacing and visual tokens
- [ ] Spacing uses Tailwind scale, not arbitrary pixel values
- [ ] No mixed use of Tailwind spacing and inline style pixel values
- [ ] No raw hex colors, pure black text, default blue/gray sample styling, or harsh section borders

---

## Output format

```txt
## UI Consistency Review

### Summary
- Screens reviewed: [list]
- Issues found: [count]

### Issues and proposed fixes

#### [Component or file]
- Issue: [describe inconsistency]
- Proposed fix: [describe minimal change]
- Change type: [button | table | input | chip | badge | layout | spacing | feedback | token]
- Risk: [low | medium]

### Shared components to create
- [If the same pattern appears in 3+ places and no shared component exists yet, recommend extraction]

### Verification
- npm run lint: [run after applying fixes]
- npm run build: [run after applying fixes]

### Deferred items
- [TODO] anything out of scope for this review pass
```

---

## Scope constraints

- Only propose changes that fix actual inconsistencies; do not refactor working components for style alone.
- Do not propose rewriting components from scratch.
- Do not propose new libraries (for example shadcn or Radix) without explicit user approval.
- Mark low-confidence findings as `[SUGGESTION]` rather than prescribing them as required.
