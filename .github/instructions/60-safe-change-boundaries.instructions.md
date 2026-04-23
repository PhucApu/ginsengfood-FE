---
applyTo: "**"
---

# 60 — Safe Change Boundaries

## Purpose
Define the rules for what may and may not be changed during any task, to prevent unintended
regressions, scope creep, and data loss.

---

## When this rule applies
Always. Every task must stay within its defined safe change boundary.

---

## Required boundary check before starting

Before making any change, identify:
1. **Which files must change** — minimum set to fulfill the requirement.
2. **Which files must not change** — everything outside the task scope.
3. **Which existing conventions apply** — read them and follow them.

---

## Change boundary rules

### Only change what is explicitly in scope
- If the task is "add a product list page", do not also refactor `App.tsx` or reorganize `index.css`.
- If you notice a separate issue during work, document it as `[TODO]` — do not fix it now.

### Preserve working code
- Do not rewrite a working module just to improve its style or structure.
- Do not change component APIs (prop names, function signatures) unless the task requires it.
- Do not rename or move files unless the task explicitly asks for it.

### Preserve existing styling conventions
- Do not delete `front-end/src/index.css` or its CSS custom properties.
- Do not remove existing class names from components you are not replacing.
- When adding Tailwind, add alongside existing classes; do not remove old CSS on first introduction.

### No silent dependency additions
- Do not add `npm install ...` entries without stating the addition explicitly in your output.
- Only install packages that are part of the declared stack (Axios, Tailwind CSS) or explicitly requested.

### No git destructive actions without confirmation
The following actions require explicit user confirmation before execution:
- `git push --force`
- `git reset --hard`
- `git clean -fd`
- `git branch -D`
- Amending published commits

---

## When you find an unrelated issue

Do **not** fix it inline. Instead, document it:

```
### Deferred items
- [TODO] front-end/src/App.tsx line 12 — unused import `useState` — can be removed in a cleanup task.
```

---

## Rollback awareness

Before applying a non-trivial change, note the current state so rollback is possible:
- If modifying a file, note what the original logic was in your task summary.
- If adding a dependency, note how to remove it (`npm uninstall <package>`).
- If adding a new folder/file structure, note that deletion is sufficient to roll back.

---

## Verification gate

Before declaring a task done:
- [ ] Only task-scoped files were modified
- [ ] No working code was broken or restructured without explicit instruction
- [ ] No new dependencies were added without disclosure
- [ ] `npm run lint` passes with no new errors
- [ ] `npm run build` passes without new errors
- [ ] Rollback path is documented in the task summary if changes are non-trivial

---

## Done criteria

- [ ] Change set matches the described task scope exactly
- [ ] No unrelated files modified
- [ ] No undisclosed packages installed
- [ ] Build and lint pass
- [ ] Rollback path documented if applicable
