---
name: shared-ui-patterns
description: >
  Build or audit the shared UI component library: Botanical Archive / Tailwind-based
  buttons, tables, filter bars, forms, dialogs, chips, badges, and detail views. Use when
  establishing reusable components or fixing visual consistency across screens.
---

# Skill: Shared UI Patterns

## What this skill is for
Creating and maintaining the shared, reusable Tailwind CSS-based UI components that are
used across multiple screens in ginsengfood-FE. Components must follow the Botanical
Archive design system in `DESIGN.md`.

---

## When to use this skill

- A UI pattern appears in more than one screen (table, button, chip, badge, dialog)
- A new shared component needs to be created in `src/shared/components/`
- A UI consistency review reveals duplicated or inconsistent patterns
- Tailwind-based design conventions need to be established for the first time

---

## When NOT to use this skill

- A complete new page is being built (use `screen-delivery`)
- API integration is the main concern (use `api-client-and-contracts`)
- The build/lint pipeline is being verified (use `testing-and-verification`)

---

## Required inputs

- Which shared component to create or fix (button, table, chip, badge, input, dialog, etc.)
- Where it will be used (which screens or features)
- Whether the component is for storefront, admin, or both
- Any existing inconsistency to resolve (optional, from a UI review)

---

## File reading order

1. `DESIGN.md` - Botanical Archive tokens and visual rules
2. `.github/instructions/40-ui-consistency.instructions.md` - component patterns
3. `.github/instructions/45-design-system.instructions.md` - design-system enforcement
4. `front-end/src/shared/components/` - existing shared components
5. Every `.tsx` file that already uses the pattern being standardized
6. `front-end/src/index.css` - existing custom properties (preserve them)
7. `front-end/package.json` - confirm `clsx` or similar is installed if conditional classes are needed

---

## Component implementation checklist

### All shared components
- [ ] Located in `src/shared/components/<ComponentName>.tsx`
- [ ] Explicit TypeScript props interface - no implicit `any`
- [ ] Tailwind CSS utility classes only - no inline styles, no new CSS files
- [ ] Botanical Archive tokens from `DESIGN.md` - no raw hex colors or default blue/gray sample styling
- [ ] Exported as named export (not default export)
- [ ] Accepts `className` prop for extension where needed
- [ ] Has visible focus, disabled, loading, and error states where relevant

### Button component
- [ ] Variants: `primary`, `secondary`, `tertiary` (add only variants actually used)
- [ ] Disabled state: `disabled:opacity-50 disabled:cursor-not-allowed`
- [ ] Loading state: replace label with loading text or spinner when `isLoading` prop
- [ ] Primary crimson is the main CTA color; tertiary green is for botanical/source/trust actions
- [ ] Error styling is used for sale badges, destructive actions, or urgent discount emphasis

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  isLoading?: boolean;
}

export function Button({ variant = 'primary', isLoading, children, ...rest }: ButtonProps) {
  const base = 'rounded-md px-4 py-2 text-body-sm font-body font-medium disabled:opacity-50 disabled:cursor-not-allowed';
  const styles = {
    primary: 'bg-primary text-on-primary hover:shadow-[inset_0_0_0_999px_rgba(255,255,255,0.06)]',
    secondary: 'border border-outline/30 bg-transparent text-primary hover:bg-surface-container-low',
    tertiary: 'bg-tertiary text-on-tertiary',
  };

  return (
    <button className={`${base} ${styles[variant]}`} disabled={isLoading || rest.disabled} {...rest}>
      {isLoading ? 'Loading...' : children}
    </button>
  );
}
```

### Table component (or pattern)
- [ ] Admin header: `bg-surface-container-highest text-on-surface-variant`
- [ ] Rows: `bg-surface-container-low` or `bg-surface-container-lowest`
- [ ] Cells: `py-3 px-4 text-body-sm text-on-surface`
- [ ] Harsh dividers avoided; use `border-outline-variant/20` only when density requires it
- [ ] Empty state row renders if `data.length === 0`

### Apothecary chip / status badge pattern
- [ ] Product tags use Apothecary Chip pattern with `secondary_container`
- [ ] Status meaning is readable from text, not color alone
- [ ] Small pill shape: `inline-flex items-center rounded-full px-3 py-1 text-label-sm font-body`

```tsx
const statusStyles: Record<string, string> = {
  active: 'bg-secondary-container text-on-secondary-container',
  inactive: 'bg-surface-container text-on-surface-variant',
  pending: 'bg-secondary-container text-on-secondary-container',
  error: 'bg-error-container text-on-error-container',
};
```

### Form input pattern
- [ ] Base: `block w-full rounded-lg border border-outline-variant/20 bg-surface-container-lowest px-3 py-2 text-body-sm text-on-surface`
- [ ] Focus ring: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`
- [ ] Error state: `border-error/40 bg-error-container/30` + error message below field in `text-error text-label-sm`

### Dialog / modal pattern
- [ ] Overlay: `fixed inset-0 bg-on-surface/40 flex items-center justify-center z-50`
- [ ] Container: `bg-surface rounded-lg shadow-[0_20px_40px_rgba(25,28,24,0.06)] p-6 w-full max-w-md`
- [ ] Close on overlay click or Escape key
- [ ] Focus trap when open if accessibility is required

---

## Verification checklist

- [ ] `npm run lint` passes with no new errors
- [ ] `npm run build` passes
- [ ] Component renders correctly in affected screens
- [ ] No inline styles introduced
- [ ] No new CSS files created
- [ ] TypeScript props are fully typed
- [ ] No raw hex colors, pure black text, or default blue/gray sample styling introduced

---

## Common mistakes to avoid

- Do not build shared components with hardcoded feature-specific logic.
- Do not use raw hex colors, pure black text, or default blue/gray sample styling.
- Do not use string concatenation for conditional Tailwind classes without `clsx` or `cn`; it creates unmaintainable code.
- Do not skip the `disabled` state on buttons.
- Do not create a shared component for a pattern used only once; wait until it appears in two or more places.
- Do not remove the existing `index.css` custom properties when adding Tailwind components.

---

## Expected deliverables

```txt
front-end/src/shared/components/
  Button.tsx          # if button pattern is being standardized
  ApothecaryChip.tsx  # if product/status chip pattern is being standardized
  StatusBadge.tsx     # if status pattern is being standardized
  # additional shared components as needed
```
