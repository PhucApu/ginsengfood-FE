# Design System: Heritage Ginseng Botanical Archive

> Canonical visual guidance for ginsengfood-FE.
> This document is aligned to `test.html`, which is the current storefront visual reference.
> Engineering guidance remains in `AGENTS.md`; this file owns brand, visual tokens, UI tone,
> and Tailwind mapping for customer and admin interfaces.

---

## 1. Creative North Star

**The Heritage Apothecary**

The interface should feel like a premium herbal archive for ginseng: ceremonial, warm,
medicinal, and editorial. The visual center is not a generic green wellness UI. The actual
reference design uses deep heritage crimson as the primary brand signal, warm paper surfaces,
aged gold accents, and dark botanical green for provenance and trust sections.

The visual language balances:

- Heritage crimson: premium, rare, medicinal, ceremonial.
- Botanical green: source, purity, cultivation, trust.
- Aged gold: membership, privilege, value, provenance.
- Paper surfaces: calm, archival, high-end commerce.

The customer experience should feel curated and premium, while admin screens should remain
clear, compact, and operational.

---

## 2. Reference Source

`test.html` is the current visual reference for storefront color and tone.

Design decisions confirmed by `test.html`:

- Primary brand color is deep crimson: `primary = #570005`.
- Primary container / hover crimson is `#7b1113`.
- Botanical green is `tertiary = #0b2d17` and `tertiary_container = #22442b`.
- Supporting gold is `secondary = #735b2b`, with warm gold containers.
- Surface system is warm stone/paper: `surface = #fbf9f5`.
- Headline font is `Noto Serif`.
- Body, label, and operational font is `Manrope`.
- Floating nav uses glass: `surface` at 80% opacity plus strong blur.
- Buttons are often rounded-full, especially storefront CTAs.
- Ghost borders are allowed at very low opacity for cards, overlays, inputs, and image frames.

---

## 3. Design Principles

### Premium Heritage, Not Generic Wellness

Do not make the brand read as a generic green organic shop. Crimson is the primary brand
anchor. Green supports botanical credibility and source storytelling.

### Tonal Paper Layers

Use warm surface tiers to create depth. Prefer `surface`, `surface_container_low`,
`surface_container`, and `surface_container_lowest` before adding heavy borders or shadows.

### Editorial Storefront

Customer-facing pages may use large imagery, carousel hero imagery, soft overlays,
asymmetric layout, and spacious sections.

### Operational Admin

Admin pages should use the same token system but avoid storefront decoration. Use compact
spacing, predictable grids, surface tiers, and Manrope for high-density work.

---

## 4. Color Tokens

Use design tokens instead of hardcoded colors in JSX. Token names below use design-system
snake_case names and Tailwind kebab-case class names.

### Primary Crimson

| Token | Hex | Tailwind class examples | Use |
|---|---:|---|---|
| `primary` | `#570005` | `bg-primary`, `text-primary`, `ring-primary` | Primary CTAs, active nav, brand text, floating chat actions |
| `on_primary` | `#ffffff` | `text-on-primary` | Text/icons on primary crimson |
| `primary_container` | `#7b1113` | `bg-primary-container`, `text-primary-container` | Hover crimson, gradient end, active emphasis |
| `on_primary_container` | `#ff837a` | `text-on-primary-container` | Accent text on primary-container; use sparingly after contrast check |
| `primary_fixed` | `#ffdad6` | `bg-primary-fixed` | Soft crimson container |
| `primary_fixed_dim` | `#ffb3ac` | `bg-primary-fixed-dim` | Soft crimson dim state |
| `on_primary_fixed` | `#410003` | `text-on-primary-fixed` | Text on soft crimson |
| `on_primary_fixed_variant` | `#891c1b` | `text-on-primary-fixed-variant` | Secondary text on soft crimson |
| `surface_tint` | `#aa3530` | `bg-surface-tint`, `text-surface-tint` | Rare tonal tint or surface overlay |

### Secondary Gold

| Token | Hex | Tailwind class examples | Use |
|---|---:|---|---|
| `secondary` | `#735b2b` | `bg-secondary`, `text-secondary` | Gold/brown accent, benefit icons, premium metadata |
| `on_secondary` | `#ffffff` | `text-on-secondary` | Text/icons on secondary |
| `secondary_container` | `#fddba0` | `bg-secondary-container` | Warm labels, product chips, soft membership blocks |
| `on_secondary_container` | `#775f2f` | `text-on-secondary-container` | Text on gold container |
| `secondary_fixed` | `#ffdea5` | `bg-secondary-fixed` | Stronger gold highlight |
| `secondary_fixed_dim` | `#e2c289` | `bg-secondary-fixed-dim` | Icon circles, membership emphasis |
| `on_secondary_fixed` | `#261900` | `text-on-secondary-fixed` | Text on gold fixed |
| `on_secondary_fixed_variant` | `#594316` | `text-on-secondary-fixed-variant` | Secondary text on gold fixed |

### Botanical Green

| Token | Hex | Tailwind class examples | Use |
|---|---:|---|---|
| `tertiary` | `#0b2d17` | `bg-tertiary`, `text-tertiary` | Botanical source accent, trust indicators |
| `on_tertiary` | `#ffffff` | `text-on-tertiary` | Text/icons on green |
| `tertiary_container` | `#22442b` | `bg-tertiary-container` | Dark botanical story sections |
| `on_tertiary_container` | `#8bb191` | `text-on-tertiary-container` | Supporting text on green container |
| `tertiary_fixed` | `#c5ecc9` | `bg-tertiary-fixed` | Soft botanical highlight |
| `tertiary_fixed_dim` | `#a9d0ae` | `bg-tertiary-fixed-dim` | Secondary botanical text/icons |
| `on_tertiary_fixed` | `#00210c` | `text-on-tertiary-fixed` | Text on soft green |
| `on_tertiary_fixed_variant` | `#2c4e34` | `text-on-tertiary-fixed-variant` | Secondary text on soft green |

### Warm Paper Surfaces

| Token | Hex | Tailwind class examples | Use |
|---|---:|---|---|
| `background` | `#fbf9f5` | `bg-background` | App background when separate from surface |
| `on_background` | `#1b1c1a` | `text-on-background` | Text on background |
| `surface` | `#fbf9f5` | `bg-surface` | Main page background |
| `surface_bright` | `#fbf9f5` | `bg-surface-bright` | Bright surface, glass nav fallback |
| `surface_dim` | `#dbdad6` | `bg-surface-dim` | Muted regions |
| `surface_container_lowest` | `#ffffff` | `bg-surface-container-lowest` | Cards, popovers, chat panels |
| `surface_container_low` | `#f5f3ef` | `bg-surface-container-low` | Hero surface, hover rows, section bands |
| `surface_container` | `#efeeea` | `bg-surface-container` | Toolbars, nested panels, filter backgrounds |
| `surface_container_high` | `#eae8e4` | `bg-surface-container-high` | Admin grouping surfaces |
| `surface_container_highest` | `#e4e2de` | `bg-surface-container-highest` | Admin table headers, strong neutral panels |
| `surface_variant` | `#e4e2de` | `bg-surface-variant` | Neutral variant surface |

### Text, Outline, Feedback, Inverse

| Token | Hex | Tailwind class examples | Use |
|---|---:|---|---|
| `on_surface` | `#1b1c1a` | `text-on-surface` | Primary text. Never use pure black |
| `on_surface_variant` | `#58413f` | `text-on-surface-variant` | Secondary text, muted copy, helper labels |
| `outline` | `#8b716e` | `border-outline`, `text-outline` | Low-emphasis text and ghost borders |
| `outline_variant` | `#dfbfbc` | `border-outline-variant` | Ghost borders at 20-30% opacity |
| `error` | `#ba1a1a` | `bg-error`, `text-error`, `ring-error` | Sale badges, error text, destructive feedback |
| `on_error` | `#ffffff` | `text-on-error` | Text/icons on error |
| `error_container` | `#ffdad6` | `bg-error-container` | Soft error background |
| `on_error_container` | `#93000a` | `text-on-error-container` | Text on error container |
| `inverse_surface` | `#30312e` | `bg-inverse-surface` | Tooltips, dark overlays |
| `inverse_on_surface` | `#f2f0ed` | `text-inverse-on-surface` | Text on inverse surface |
| `inverse_primary` | `#ffb3ac` | `text-inverse-primary` | Accent on dark/inverse surfaces |

---

## 5. Tailwind Token Mapping

When Tailwind is configured, map the tokens through the project theme so JSX can use
semantic classes instead of raw hex values.

Confirmed mapping from `test.html`:

```txt
bg-primary                  -> primary (#570005)
bg-primary-container        -> primary_container (#7b1113)
bg-secondary                -> secondary (#735b2b)
bg-secondary-container      -> secondary_container (#fddba0)
bg-tertiary                 -> tertiary (#0b2d17)
bg-tertiary-container       -> tertiary_container (#22442b)

bg-surface                  -> surface (#fbf9f5)
bg-surface-container-lowest -> surface_container_lowest (#ffffff)
bg-surface-container-low    -> surface_container_low (#f5f3ef)
bg-surface-container        -> surface_container (#efeeea)
bg-surface-container-high   -> surface_container_high (#eae8e4)
bg-surface-container-highest -> surface_container_highest (#e4e2de)

text-on-surface             -> on_surface (#1b1c1a)
text-on-surface-variant     -> on_surface_variant (#58413f)
text-on-primary             -> on_primary (#ffffff)
text-on-tertiary            -> on_tertiary (#ffffff)

border-outline              -> outline (#8b716e)
border-outline-variant      -> outline_variant (#dfbfbc)
ring-primary                -> primary (#570005)
ring-error                  -> error (#ba1a1a)
```

Implementation rules:

- Do not hardcode raw hex colors in React components.
- Replace generated raw classes like `bg-[#7B1113]` with `bg-primary-container`.
- Replace `bg-stone-*`, `text-stone-*`, and `text-red-*` with semantic tokens unless the
  class is temporary while migrating generated HTML.
- If a semantic token class is missing, add it to the Tailwind theme or CSS token layer first.

---

## 6. Typography

### Font Families

| Token | Font | Tailwind target | Use |
|---|---|---|---|
| `font-headline` | Noto Serif | `font-headline` | Editorial headlines, product stories, heritage sections |
| `font-body` | Manrope | `font-body` | Body copy, controls, prices, admin data |
| `font-label` | Manrope | `font-label` | Uppercase labels, metadata, small actions |

Do not use Public Sans in this project unless the design direction changes again.
`test.html` establishes Manrope as the body and label font.

### Type Scale

| Token | Font | Size | Line height | Weight | Tailwind target |
|---|---|---:|---:|---:|---|
| `display-lg` | Noto Serif | 72px | 80px | 700 | `text-display-lg font-headline` |
| `display-md` | Noto Serif | 56px | 64px | 700 | `text-display-md font-headline` |
| `headline-lg` | Noto Serif | 40px | 48px | 700 | `text-headline-lg font-headline` |
| `headline-md` | Noto Serif | 32px | 40px | 700 | `text-headline-md font-headline` |
| `headline-sm` | Noto Serif | 24px | 32px | 700 | `text-headline-sm font-headline` |
| `body-lg` | Manrope | 18px | 28px | 400-600 | `text-body-lg font-body` |
| `body-md` | Manrope | 16px | 24px | 400-600 | `text-body-md font-body` |
| `body-sm` | Manrope | 14px | 20px | 400-600 | `text-body-sm font-body` |
| `label-md` | Manrope | 12px | 16px | 700 | `text-label-md font-label uppercase tracking-widest` |
| `label-sm` | Manrope | 10-11px | 14px | 700 | `text-label-sm font-label uppercase tracking-widest` |

Use `font-headline` for storefront headlines, card titles, and premium brand text.
Use `font-body` for everything operational, including admin views.

---

## 7. Spacing, Radius, Elevation

### Spacing

| Purpose | Value | Tailwind target |
|---|---:|---|
| Tight inline gap | 8px | `gap-2` |
| Component gap | 16px | `gap-4` |
| Card/list gap | 24px | `gap-6` |
| Editorial grid gap | 32px | `gap-8` |
| Storefront section gap | 80px+ | `mb-20`, `py-20`, `py-24`, `mb-32` |
| Admin page padding | 24px | `p-6` |
| Wide storefront content | 32-48px side padding | `px-8`, `px-12` |
| Max storefront shell | 1536px | `max-w-screen-2xl` |

### Radius

| Token | Value | Tailwind target | Use |
|---|---:|---|---|
| `radius-default` | 4px | `rounded` | Small utility controls |
| `radius-lg` | 8px | `rounded-lg` | Image frames, compact panels |
| `radius-xl` | 12px | `rounded-xl` | Product cards, article cards |
| `radius-2xl` | 16px | `rounded-2xl` | Promo panels, chat panel, dropdown overlays |
| `radius-full` | 9999px | `rounded-full` | CTAs, icon buttons, chips |

### Elevation

Use soft ambient depth. Shadows should be diffused and derived from `on_surface`.

Reference shadows from `test.html`:

```css
/* Floating nav and standard ambient card depth */
box-shadow: 0 8px 40px rgba(27, 28, 26, 0.06);

/* Popover/dropdown depth; prefer on_surface equivalent instead of pure black */
box-shadow: 0 20px 60px -15px rgba(27, 28, 26, 0.24);
```

Use stronger popover depth only for dropdowns, chat, floating buttons, and overlays.

---

## 8. Border and Separation Rule

The previous "No-Line Rule" is refined to match `test.html`.

Do not use harsh borders to divide large page sections. Major separation should come from
surface shifts, whitespace, imagery, and layout.

Allowed ghost borders:

- Cards: `border border-outline-variant/30`
- Popovers and dropdowns: `border border-outline-variant/20`
- Image frames and flags: `border border-outline-variant/30`
- Inputs and chat panels: low-opacity outline tokens
- Active nav underline: `border-b-2 border-primary`

Avoid:

- `border-gray-*`, `border-stone-*`, and `border-red-*` in final React code.
- Section-wide divider lines unless they are part of a compact footer or admin grid.
- High-contrast 1px black/gray borders.

---

## 9. Core Storefront Components

### Glass Navigation

Reference:

```txt
sticky top-0 z-50 bg-surface/80 backdrop-blur-xl
shadow-[0_8px_40px_rgba(27,28,26,0.06)]
```

Rules:

- Use `surface` at 80% opacity.
- Use `backdrop-blur-xl` or an equivalent 24px blur.
- Active nav uses crimson primary text and a primary underline.
- Avoid raw `stone`/`red` classes once migrated to tokens.

### Primary CTA

Storefront primary CTAs are rounded-full and may use a crimson gradient.

```txt
rounded-full bg-gradient-to-br from-primary to-primary-container
px-8 py-4 font-body font-semibold text-on-primary
hover:opacity-90
```

Compact buy buttons may use:

```txt
rounded-full bg-primary px-4 py-2 text-sm font-semibold text-on-primary
hover:bg-primary-container
```

### Secondary CTA

```txt
rounded-full border border-outline/30 bg-transparent px-4 py-2
text-primary hover:bg-surface-container-low
```

### Gold Membership / Benefit Accent

Use gold fixed tokens for membership, countdown, privilege, and VIP benefit surfaces:

```txt
bg-secondary-fixed-dim/20 text-secondary-fixed
```

### Sale Badge

Use `error`, not primary crimson, for discount badges and sale price emphasis:

```txt
rounded-full bg-error px-3 py-1 text-xs font-bold tracking-wider text-on-error
```

### Apothecary Chip

Use for product claims such as `Organic`, `High Saponin`, `Premium Root`.

```txt
inline-flex items-center rounded-full bg-secondary-container
px-3 py-1 text-label-sm font-label text-on-secondary-container
```

---

## 10. Cards, Product Blocks, Articles

Reference card pattern:

```txt
bg-surface-container-lowest rounded-xl overflow-hidden ambient-shadow
border border-outline-variant/30
```

Rules:

- Cards may use ghost borders; this is part of the current reference.
- Use `ambient-shadow` softly, not high-contrast shadows.
- Product and article cards should keep image-forward layouts.
- Card hover may scale imagery with `transition-transform duration-700 group-hover:scale-105`.
- Use `font-headline` for card titles and `font-body` for body copy.

---

## 11. Hero and Editorial Imagery

Hero sections may use:

```txt
relative min-h-[819px] bg-surface-container-low overflow-hidden
```

Image treatment:

- Full-cover carousel imagery.
- `object-cover object-center`.
- Soft fade transitions.
- Optional `mix-blend-multiply`.
- Active image opacity around `0.8`.
- Readability overlay: `bg-gradient-to-r from-surface via-surface/80 to-transparent`.

Text treatment:

- Eyebrow: `text-secondary font-body font-semibold tracking-widest uppercase text-sm`.
- Headline: `font-headline text-5xl md:text-7xl leading-tight text-on-surface`.
- Body: `font-body text-lg text-on-surface-variant leading-relaxed`.

---

## 12. Dark Botanical Sections

Use `tertiary_container` for trust, source, craft, purity, and terroir sections.

```txt
bg-tertiary-container text-on-tertiary
```

Support text/icons:

```txt
text-tertiary-fixed
text-tertiary-fixed-dim
```

Do not use green as the primary CTA color. Green is for botanical grounding and trust.

---

## 13. Floating Chat and Utility Buttons

The storefront may include floating circular actions.

Primary chat button:

```txt
h-14 w-14 rounded-full bg-primary-container text-on-primary
shadow-xl hover:bg-primary
```

Scroll-to-top button:

```txt
h-14 w-14 rounded-full bg-surface-container-lowest text-primary-container
border border-primary-container/20
```

Chat panel:

```txt
rounded-2xl bg-surface-container-lowest shadow-2xl
border border-outline-variant/20
```

Replace generated raw classes like `bg-[#7B1113]` and `text-[#7B1113]` with semantic
primary-container token classes during implementation.

---

## 14. Forms and Inputs

Input pattern:

```txt
rounded-lg bg-surface-container-lowest px-3 py-2 text-body-sm text-on-surface
border border-outline-variant/20
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
```

Error state:

```txt
bg-error-container/30 text-on-error-container
border-error/40 focus-visible:ring-error
```

Chat input may be visually quieter, but production inputs still need visible focus states.

---

## 15. Storefront vs Admin

### Storefront

Use the customer-facing storefront for emotion and trust.

- Crimson is the primary brand signal.
- Large imagery, editorial hero sections, and product storytelling are encouraged.
- Use `Noto Serif` via `font-headline` for major narrative moments.
- Use rounded-full CTAs for premium purchase actions.
- Use warm paper surfaces and ghost-bordered cards.
- Use green sections for source, purity, and craft narratives.

### Admin

Use the admin interface for clarity and throughput.

- Use `Manrope` via `font-body` by default.
- Keep page padding tighter: `p-6`.
- Use `surface_container` tiers for dashboards, tables, filters, and toolbars.
- Use `surface_container_highest` for admin table headers.
- Avoid hero imagery, glass decoration, carousel layouts, and editorial overlap.
- Use primary crimson for active states and critical commands, but keep data-dense areas calm.

---

## 16. Accessibility Rules

- Never use pure black (`#000000`) for text; use `on_surface`.
- Interactive elements require visible focus states.
- Text on crimson must use `on_primary` or an accessible soft-container text token.
- Text on green must use `on_tertiary` or the fixed green text tokens.
- Error states need text, not color alone.
- Glass overlays require contrast checks over real imagery.
- Mobile layouts must remove unsafe text/image overlap.

---

## 17. Implementation Rules

- Tailwind CSS is the implementation target.
- Do not create new component-scoped CSS files for UI styling.
- Do not hardcode raw hex colors in JSX.
- Do not keep generated `bg-stone-*`, `text-stone-*`, `text-red-*`, or `bg-[#...]` classes in final React code when a semantic token exists.
- Do not use default blue UI.
- Do not use high-opacity hard shadows.
- Preserve existing `front-end/src/index.css` custom properties until a dedicated Tailwind
  token setup replaces or maps them safely.
- `test.html` can be used as visual reference, but production React components should use
  semantic tokens and shared components.

---

## 18. Done Criteria for UI Work

A UI change follows this design system when:

- It uses semantic design tokens or their Tailwind mappings.
- Primary crimson, gold secondary, green tertiary, and warm paper surfaces match `test.html`.
- Storefront and admin visual treatment are intentionally different.
- No raw hex values, default blue UI, pure black text, or unmapped generated color classes were introduced.
- Loading, error, empty, and success states remain visually consistent.
- Responsive layouts keep text readable and avoid unsafe overlap.
- Any new token or component pattern is documented before reuse.
