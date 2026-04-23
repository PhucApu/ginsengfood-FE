---
name: testing-and-verification
description: >
  Verify the frontend is clean: run lint, typecheck via build, and confirm the dev server
  and production build are healthy. Use after any implementation task as the final
  verification gate before declaring done.
---

# Skill: Testing and Verification

## What this skill is for
Running the available verification tools for ginsengfood-FE and interpreting their output
to confirm a task is complete and the codebase is healthy.

---

## When to use this skill

- After completing any implementation task before declaring done
- When verifying that a change does not break the existing codebase
- When reviewing the output of lint or build and diagnosing issues

---

## When NOT to use this skill in isolation

This skill is a verification step, not a task on its own. Use it as the final gate inside
`screen-delivery`, `api-client-and-contracts`, `shared-ui-patterns`, or `frontend-foundation`.

---

## Required inputs

- Access to the `front-end/` directory
- A completed implementation task to verify (or a state-of-health check)

---

## Available verification commands

Run all of these from the `front-end/` directory:

```bash
npm run lint      # ESLint 9 flat config — catches TypeScript and React rule violations
npm run build     # tsc -b + vite build — TypeScript compile + production bundle
npm run dev       # dev server — manual smoke test for runtime behavior
```

> **No separate typecheck script exists.** TypeScript errors surface through `npm run build`.
> **No test script exists.** Do not invent or reference a `npm test` or `npm run test` command.

---

## Verification checklist

### Lint
- [ ] Run: `npm run lint`
- [ ] Zero new errors introduced by the task
- [ ] Zero new warnings introduced by the task
- [ ] If existing errors were present before the task, note them as `[PRE-EXISTING]` — do not fix them unless the task scope includes it

### Build (includes TypeScript check)
- [ ] Run: `npm run build`
- [ ] No TypeScript compilation errors
- [ ] Vite production bundle completes successfully
- [ ] Output in `dist/` directory is generated (if build succeeds)

### Dev server smoke test (when runtime behavior needs confirmation)
- [ ] Run: `npm run dev`
- [ ] Target page renders without console errors
- [ ] Loading, error, and empty states are reachable and render correctly
- [ ] Data renders correctly when API is available (or mocked)

---

## Diagnosing common errors

### TypeScript errors (`npm run build`)

| Error pattern | Likely cause |
|---|---|
| `Property X does not exist on type Y` | DTO or domain type is missing a field; update the type |
| `Argument of type X is not assignable to Y` | Adapter output type mismatch; fix the adapter |
| `Object is possibly undefined` | Missing null check before accessing nested property |
| `Parameter X implicitly has an 'any' type` | Missing explicit type annotation; add the type |
| `noUnusedLocals` / `noUnusedParameters` | Remove unused imports or variables |

### ESLint errors (`npm run lint`)

| Error pattern | Likely cause |
|---|---|
| `react-hooks/exhaustive-deps` | `useEffect` dependency array is incomplete; add missing deps |
| `react-refresh/only-export-components` | Non-component export in a component file; move to a separate file |
| `@typescript-eslint/no-explicit-any` | Explicit `any` used; replace with the correct type |

---

## Rollback note

If verification fails and the failure is caused by the current task's changes:

1. Identify which files were changed.
2. Revert only those files to their prior state.
3. Re-run `npm run lint` and `npm run build` to confirm the codebase is clean again.
4. Re-implement the task with the issue fixed.

If `npm install` was run as part of the task and needs to be undone:
```bash
npm uninstall <package-name>
```

---

## Expected output format

```
## Verification Report

### npm run lint
- Result: PASSED | FAILED
- New errors: none | [list errors]
- Pre-existing errors: none | [list]

### npm run build
- Result: PASSED | FAILED
- TypeScript errors: none | [list]
- Vite build errors: none | [list]

### Dev server smoke test (if performed)
- Result: PASSED | SKIPPED | FAILED
- Notes: [what was checked manually]
```
