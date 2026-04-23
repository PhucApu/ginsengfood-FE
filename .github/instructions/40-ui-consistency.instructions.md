---
applyTo: "front-end/src/**/*.tsx"
---

# 40 - UI Consistency

## Purpose
Define reusable UI consistency rules for React components and pages. Visual tokens and
brand direction come from `DESIGN.md`; this rule turns those decisions into component
placement, Tailwind class, and interaction expectations.

---

## When this rule applies
Any time a `.tsx` file renders JSX, especially pages, forms, product cards, admin tables,
toolbars, filters, dialogs, and shared components.

---

## Styling system

- Tailwind CSS is the project styling standard for all new UI.
- Follow `DESIGN.md` and rule 45 for Botanical Archive tokens.
- Use semantic token classes such as `bg-surface`, `text-on-surface`, `bg-primary`,
  `bg-surface-container-low`, and `ring-primary` once Tailwind tokens are configured.
- Do not hardcode raw hex colors in JSX.
- Do not use default sample colors like `bg-blue-600`, `text-gray-900`, or `border-gray-300`
  for final UI.
- Do not create new component-scoped `.css` or `.module.css` files.
- Do not use inline `style={{ }}` objects for new UI elements.
- Preserve existing `front-end/src/app/globals.css` custom properties until a dedicated Tailwind
  token setup maps or replaces them safely.

---

## Surface and section rules

Use tonal layering instead of hard section borders.

Preferred structure:

```tsx
<section className="bg-surface py-20">
  <div className="mx-auto max-w-7xl px-6 lg:px-20 xl:px-28">
    ...
  </div>
</section>

<section className="bg-surface-container-low py-20">
  ...
</section>
```

Rules:

- Do not use 1px borders to separate sections.
- Separate major storefront sections with `py-20` or larger.
- Use `bg-surface-container-low`, `bg-surface-container`, or related surface tokens for
  nested areas.
- Use `bg-surface/80 backdrop-blur-[20px]` only for floating overlays where contrast is safe.

---

## Buttons

Define a shared `Button` component in `src/shared/components/Button.tsx` once buttons appear
in more than one place.

Primary action:

```tsx
<button className="rounded-md bg-primary px-4 py-2 text-body-sm font-body font-medium text-on-primary hover:shadow-[inset_0_0_0_999px_rgba(255,255,255,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50">
  Save
</button>
```

Secondary action:

```tsx
<button className="rounded-md border border-outline/30 bg-transparent px-4 py-2 text-body-sm font-body font-medium text-primary hover:bg-surface-container-low focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50">
  Cancel
</button>
```

Botanical tertiary action:

```tsx
<button className="rounded-md bg-tertiary px-4 py-2 text-body-sm font-body font-medium text-on-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary disabled:cursor-not-allowed disabled:opacity-50">
  Source Story
</button>
```

Primary crimson is the main storefront CTA color. Use `tertiary` green for botanical,
source, purity, or trust actions. Use `error` for sale badges, destructive actions, or
urgent discount emphasis.

---

## Apothecary chips and badges

Use Apothecary Chips for product tags and soft status indicators.

```tsx
<span className="inline-flex items-center rounded-full bg-secondary-container px-3 py-1 text-label-sm font-body text-on-secondary-container">
  Organic
</span>
```

Rules:

- Product tags use `secondary_container`.
- Product and membership tags may use `secondary_container` or `secondary_fixed` tokens.
- Error, sale, or urgent tags use `error` or `error_container`.
- Do not overuse sale/error badges in storefront views.
- Status labels in admin must use clear text, not color alone.

---

## Cards, lists, and product blocks

Rules:

- Use tonal surfaces, not divider lines.
- Default lifted card: `bg-surface-container-lowest`.
- Nested card: `bg-surface-container-low`.
- Separate repeated items with `gap-6` or `gap-8`.
- Storefront product cards may use image bleed and editorial asymmetry.
- Admin cards must keep predictable alignment and compact density.
- Do not create decorative nested cards inside other cards unless the nesting represents a
  real functional grouping.

---

## Tables and dense admin data

Storefront should avoid dense tables unless comparing product specifications.

Admin table pattern:

```tsx
<table className="w-full text-body-sm font-body text-on-surface">
  <thead className="bg-surface-container-highest text-on-surface-variant">
    <tr>
      <th className="px-4 py-3 text-left font-medium">Name</th>
    </tr>
  </thead>
  <tbody>
    <tr className="bg-surface-container-low">
      <td className="px-4 py-3">...</td>
    </tr>
  </tbody>
</table>
```

Rules:

- Use `Manrope`/`font-body` for admin data.
- Avoid harsh row dividers. If structure is required, use `border-outline-variant/20`.
- Align numeric values consistently.
- Keep filters and toolbars on `bg-surface-container` or `bg-surface-container-low`.

---

## Forms and inputs

Input pattern:

```tsx
<input
  className="block w-full rounded-lg border border-outline-variant/20 bg-surface-container-lowest px-3 py-2 text-body-sm text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
  type="text"
/>
```

Error pattern:

```tsx
<input
  className="block w-full rounded-lg border border-error/40 bg-error-container/30 px-3 py-2 text-body-sm text-on-error-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error"
  aria-invalid="true"
/>
```

Rules:

- Inputs may use ghost borders for clarity.
- Focus must be visible and use `ring-primary` or `ring-error`.
- Error states must include readable helper text with `text-error`.
- Submit buttons must show disabled/loading state during async work.

---

## Page layout

Storefront page pattern:

```tsx
<main className="bg-surface text-on-surface">
  <section className="py-20 md:py-24">
    <div className="mx-auto max-w-7xl px-6 lg:px-20 xl:px-28">
      <p className="text-label-md font-body uppercase tracking-[0.05em] text-on-surface-variant">
        Botanical Archive
      </p>
      <h1 className="mt-3 text-headline-lg font-headline text-on-surface">
        Premium Vietnamese Ginseng
      </h1>
    </div>
  </section>
</main>
```

Admin page pattern:

```tsx
<main className="min-h-screen bg-surface p-6 text-on-surface">
  <div className="rounded-lg bg-surface-container-low p-6">
    <h1 className="text-headline-sm font-headline text-on-surface">Products</h1>
  </div>
</main>
```

Rules:

- Storefront uses larger spacing, imagery, and editorial typography.
- Admin uses tighter spacing, dense controls, and clear data hierarchy.
- Do not use storefront image overlap or decorative asymmetry in admin pages.

---

## Forbidden patterns

- No pure black text (`#000000`) in UI.
- No hardcoded raw hex values in JSX.
- No default blue/gray Tailwind example styling in final UI.
- No harsh 1px borders for sections, cards, or list dividers.
- No high-opacity drop shadows.
- No inline `style={{ }}` for new UI.
- No component-scoped CSS files for new UI.
- No runtime Tailwind string concatenation without a small class helper once conditional
  styling becomes complex.

---

## Output expectations

When UI files are changed, report:

```txt
### UI decisions
- Surface: storefront | admin | shared component
- Design tokens used: ...
- Any new visual convention: [NEW CONVENTION] ...
```

---

## Done criteria

- [ ] JSX uses Tailwind classes and design-system tokens.
- [ ] Storefront/admin UI treatment matches the relevant surface.
- [ ] Buttons, inputs, chips, cards, and tables follow Botanical Archive patterns.
- [ ] No raw hex values, pure black text, or default blue/gray examples introduced.
- [ ] No harsh layout borders or high-opacity shadows introduced.
- [ ] Responsive behavior keeps text readable and avoids unsafe image/text overlap.
