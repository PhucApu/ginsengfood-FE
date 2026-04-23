---
applyTo: "**"
---

# 10 — Working Mode

## Purpose
Define the required approach for any task in this repository. These rules apply before writing
a single line of code or making any file change.

---

## When this rule applies
Always. Every task — from a single-line fix to a multi-file feature — must follow this mode.

---

## Required checks before acting

1. **Read before editing.** Open and read the full content of every file you intend to change.
2. **Confirm what is installed.** Read `front-end/package.json` before assuming any library exists.
3. **Understand the current state.** List `front-end/src/` to see what folders and files already exist.
4. **Identify scope.** Determine exactly which files need to change for this task and only those files.
5. **Check for existing conventions.** If a pattern already exists in the codebase, follow it instead of inventing a new one.

---

## Forbidden shortcuts

- Do not guess what a file contains. Read it first.
- Do not assume a library is installed without checking `package.json`.
- Do not invent backend field names, API endpoints, or response shapes.
- Do not apply changes to files outside the stated scope of the task.
- Do not run destructive commands (`rm -rf`, hard resets, branch force-pushes) without
  explicit user confirmation.
- Do not invent scripts that do not exist (e.g., do not reference a `test` script when none exists).

---

## Implementation expectations

- Make the smallest change that satisfies the requirement.
- If you notice an unrelated issue, document it as a `[TODO]` item instead of fixing it now.
- Add `[NEW CONVENTION]` label whenever you establish a project default that did not previously exist.
- Use TypeScript types explicitly — no `any`, no implicit `unknown`.

---

## Output expectations

After every task, report in this format:

```
## Task Summary

### Files created or modified
- relative/path/to/file.tsx — reason for change

### Verification
- npm run lint: [PASSED | output]
- npm run build: [PASSED | output]

### Assumptions made
- [ASSUMPTION] ...

### Deferred items
- [TODO] ...
```

---

## Done criteria

A task is done when:
- [ ] The described change is implemented
- [ ] `npm run lint` passes with no new errors
- [ ] `npm run build` passes without errors
- [ ] No unrelated files were modified
- [ ] No undeclared dependencies were added silently
- [ ] The task summary report is complete
