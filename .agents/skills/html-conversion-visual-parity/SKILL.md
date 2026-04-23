---
name: html-conversion-visual-parity
description: >
  Run post-conversion visual parity checks after migrating HTML/CSS/Tailwind/JS
  interfaces into React + TypeScript + Tailwind. Use with
  html-to-react-tailwind-conversion when comparing source HTML/prototype output and
  converted React routes or components across desktop/mobile viewports, visual
  states, interactions, assets, colors, spacing, typography, and responsive behavior;
  any unapproved visible difference means the conversion is not complete.
---

# Skill: HTML Conversion Visual Parity

## Purpose
Verify that a converted React + TypeScript + Tailwind screen visually and behaviorally
matches the source HTML/CSS/Tailwind/JS interface. This is a hard post-conversion gate:
lint and build passing are not enough if the converted UI no longer matches the source.

Use this skill together with:

- `html-to-react-tailwind-conversion` during HTML/CSS/JS migration work.
- `testing-and-verification` after visual parity passes.

## Required inputs

- Source HTML file path or source baseline URL.
- Converted React route, page, or component path.
- Any user-approved intentional differences.
- Viewports and UI states to compare. If not provided, use:
  - Desktop: `1440x900`
  - Tablet: `768x1024`
  - Mobile: `390x844`

## Required reading

Before checking parity, read:

1. Source HTML plus referenced CSS, JS, images, fonts, and icons.
2. Converted React files and any imported components/assets they rely on.
3. `front-end/package.json` and `front-end/next.config.ts`.
4. `.github/instructions/35-html-to-react-tailwind-conversion.instructions.md`.
5. `.github/instructions/36-html-conversion-visual-parity.instructions.md`.

## Hard gate

- The conversion is failed if there is any unapproved user-visible difference in layout,
  spacing, colors, typography, text, imagery, icons, shadows, borders, radius, z-index,
  responsive behavior, or interaction state.
- Minor browser rendering noise such as font anti-aliasing, scrollbar rendering, or
  sub-pixel rounding may be tolerated only when it is not user-visible and is documented.
- Dynamic content, timestamps, random images, and animations must be stabilized, paused,
  mocked, or documented before comparison.
- Do not change the source baseline to make the converted UI pass.
- Do not mark visual parity as passed with "close enough".

## Workflow

1. Establish the baseline
   - Run or open the source HTML exactly as provided.
   - If baseline screenshots were not captured before conversion, capture them from the
     original source file now.
   - If the source was overwritten or cannot be rendered, recover it from git or report
     `[VISUAL BASELINE RISK]`.

2. Run the converted UI
   - Start the React dev server from `front-end/` with `npm run dev`.
   - Open the converted route or screen in the same browser engine used for the baseline.
   - Use the same viewport sizes, zoom level, color scheme, and locale for both outputs.

3. Capture comparison evidence
   - Prefer automated screenshots with Playwright if Playwright is already available.
   - If no screenshot tooling is installed, use manual browser screenshots or visual
     inspection. Do not install Playwright or any visual diff package silently.
   - Capture each required viewport.
   - Capture relevant states: hover, focus, active, open menu, modal, dropdown, carousel
     slide, validation, loading, empty, and responsive nav states when present.

4. Compare the UI
   - Compare source and converted output side by side.
   - Check section order, dimensions, alignment, wrapping, image cropping, text overflow,
     colors, fonts, shadows, borders, icons, and responsive changes.
   - Check that source interactions behave the same after conversion.
   - Check that converted React did not regress the existing app shell when the page sits
     inside existing layout chrome.

5. Handle failures
   - If differences exist, report `[VISUAL PARITY FAILED]` and list each difference by
     viewport/state.
   - Fix the converted React/Tailwind implementation, then rerun the same comparisons.
   - Only record `[APPROVED DIFFERENCE]` when the user explicitly approved that difference.

## Expected output

Add this report to the task summary for HTML conversion work:

```txt
### Visual parity report
- Source baseline: <file or URL>
- Converted target: <route/component>
- Method: automated screenshot diff | manual side-by-side | blocked
- Viewports checked: 1440x900, 768x1024, 390x844
- States/interactions checked: ...
- Result: PASSED | FAILED | BLOCKED
- Differences: none | [VISUAL PARITY FAILED] ...
- Approved differences: none | [APPROVED DIFFERENCE] ...
- Baseline risks: none | [VISUAL BASELINE RISK] ...
```
