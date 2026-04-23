---
applyTo: "front-end/src/**/*.{ts,tsx}"
---

# 55 - Vietnamese Content Localization

## Purpose
Define how to translate or rewrite user-visible website content into Vietnamese without
changing the page layout, component structure, or application behavior.

---

## When this rule applies
Any time a `.ts` or `.tsx` file changes displayed copy, including headings, body copy,
navigation labels, CTAs, form labels, placeholders, helper text, validation messages,
empty/error states, product descriptions, alt text, `title`, `aria-label`, and string
arrays that render in the UI.

---

## Core rule
For copy-localization tasks, Vietnamese content changes must be copy-only by default.
Preserve the current visual layout, component tree, data flow, routes, and interactions.

Allowed edits:

- Text nodes rendered in JSX.
- String values in local data arrays or constants when those strings render directly in UI.
- User-facing accessibility text such as `alt`, `title`, and `aria-label`.
- User-facing form copy such as labels, placeholders, helper text, and validation messages.

Forbidden edits unless explicitly requested:

- JSX hierarchy, component extraction, prop names, type names, imports, exports, hooks,
  state logic, event handlers, route paths, API calls, API field names, DTOs, adapters, or
  data-fetching logic.
- `className` values, Tailwind utilities, design tokens, CSS files, breakpoints, spacing,
  grid definitions, animation settings, and visual variants.
- Array item ordering, filtering, IDs, keys, analytics labels, test selectors, asset paths,
  filenames, and icon names such as Material Symbols ligatures.

---

## Vietnamese copy standards

- Use natural Vietnamese with proper diacritics.
- Keep storefront copy warm, concise, and credible.
- Keep admin copy direct, operational, and easy to scan.
- Preserve brand names, product names, ingredient names, SKUs, URLs, dates, units, prices,
  discount numbers, certifications, and regulatory terms unless a source contract provides
  an official Vietnamese form.
- Do not strengthen health, medical, origin, purity, certification, or discount claims.
- Do not invent backend data, stock status, prices, awards, product benefits, or endpoint
  meaning while translating.
- Keep terminology consistent across a screen. Common storefront terms:
  - "Add to cart" -> "Thêm vào giỏ"
  - "Cart" -> "Giỏ hàng"
  - "Checkout" -> "Thanh toán"
  - "Sale" or "Offer" -> "Ưu đãi"
  - "Learn more" -> "Tìm hiểu thêm"

---

## Layout preservation

- Prefer concise Vietnamese phrasing when the source UI has tight space.
- Do not change Tailwind classes or component structure just to fit translated text.
- If natural Vietnamese text cannot fit without overlap, overflow, or harmful truncation,
  document `[LOCALIZATION RISK]` and ask before changing layout or styling.
- Do not remove essential meaning just to shorten text.
- After localization, verify that buttons, cards, nav items, badges, and mobile layouts
  still fit their existing containers.

---

## Output expectations

When UI copy is localized, report:

```txt
### Localization notes
- Target language: Vietnamese
- Scope: copy-only
- Layout/function changes: none
- [LOCALIZATION RISK] ... or none
```

---

## Done criteria

- [ ] Only user-visible copy and user-facing accessibility text changed.
- [ ] No layout classes, component structure, routes, API logic, or state behavior changed.
- [ ] Vietnamese copy is natural, concise, and consistent.
- [ ] Product, health, origin, certification, price, and discount claims were not invented
      or strengthened.
- [ ] `npm run lint` passes with no new errors.
- [ ] `npm run build` passes without errors.
