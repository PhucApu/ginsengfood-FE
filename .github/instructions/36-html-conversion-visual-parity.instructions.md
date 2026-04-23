---
applyTo: "{**/*.html,front-end/src/**/*.{ts,tsx,css}}"
---

# 36 - HTML Conversion Visual Parity

## Purpose
Require visual and interaction parity checks after converting HTML/CSS/Tailwind/JS into
React + TypeScript + Tailwind. A conversion is not complete until the converted screen has
been compared against the source interface and all unapproved visible differences are fixed.

This rule extends rule 35. Lint and build verify code health; this rule verifies that the UI
still looks and behaves like the source.

---

## When this rule applies

Use this rule whenever a task:

- Converts a static HTML/CSS/Tailwind/JS interface into React.
- Rebuilds a provided prototype in `front-end/src`.
- Claims a conversion should be `1:1`, visually identical, unchanged, or faithful.
- Replaces an existing React screen with converted HTML content.

---

## Required baseline

Before declaring the conversion done, establish a source baseline:

- Use the original HTML file or provided prototype URL as the primary baseline.
- If replacing an existing React screen, also compare against the pre-conversion React UI
  for app shell, layout chrome, typography, imagery, and behavior that should remain.
- Capture or inspect the same viewport sizes, zoom level, color scheme, and locale for the
  source and converted UI.
- If the original source cannot be rendered or recovered, report `[VISUAL BASELINE RISK]`
  and do not mark parity as passed.

Default viewport set:

- Desktop: `1440x900`
- Tablet: `768x1024`
- Mobile: `390x844`

---

## Comparison requirements

Check all visible source-owned UI:

- Section order, component hierarchy, alignment, and layout dimensions.
- Spacing, widths, heights, gaps, breakpoints, wrapping, and scroll behavior.
- Colors, opacity, gradients, shadows, borders, radii, and z-index layering.
- Typography: font family, size, weight, line height, text color, and text wrapping.
- Images, icons, logos, decorative assets, object-fit/cropping, and asset quality.
- User-visible text, labels, placeholders, alt/title/aria text, and CTA copy.
- Hover, focus, active, selected, disabled, expanded, collapsed, modal, dropdown, tab,
  carousel, validation, loading, empty, and responsive navigation states when present.

Use automated screenshot diffing when existing tooling is already available. If screenshot
tooling is not installed, manual side-by-side browser inspection is acceptable, but the
method and checked viewports/states must be documented.

Do not install Playwright, screenshot diff packages, or other dependencies silently.

---

## Failure definition

Treat the conversion as failed when there is any unapproved user-visible difference,
including:

- Missing, extra, reordered, resized, or misaligned sections/components.
- Different colors, typography, borders, shadows, radii, image crops, or icon treatment.
- Text overflow, clipping, unexpected wrapping, or overlap.
- Broken responsive layout at any required viewport.
- Missing or changed interaction behavior from the source.
- Existing app shell regression caused by the conversion.

Only these differences may be accepted without failing:

- Explicit user-approved intentional differences, reported as `[APPROVED DIFFERENCE]`.
- Non-user-visible browser rendering noise such as tiny anti-aliasing or sub-pixel
  rounding differences, documented in the visual parity report.

Do not mark a conversion as passed because it is "close enough".

---

## Required output

For every HTML conversion task, include:

```txt
### Visual parity report
- Source baseline: <file or URL>
- Converted target: <route/component>
- Method: automated screenshot diff | manual side-by-side | blocked
- Viewports checked: ...
- States/interactions checked: ...
- Result: PASSED | FAILED | BLOCKED
- Differences: none | [VISUAL PARITY FAILED] ...
- Approved differences: none | [APPROVED DIFFERENCE] ...
- Baseline risks: none | [VISUAL BASELINE RISK] ...
```

If the result is `FAILED` or `BLOCKED`, the conversion is not done.

---

## Done criteria

- [ ] Source baseline was available and checked.
- [ ] Converted React target was checked at desktop, tablet, and mobile viewports.
- [ ] Source interactions and responsive states were checked where applicable.
- [ ] No unapproved user-visible differences remain.
- [ ] Existing React app shell was not visually or behaviorally regressed.
- [ ] Visual parity report is included in the final task summary.
