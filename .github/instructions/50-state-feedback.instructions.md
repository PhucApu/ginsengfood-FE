---
applyTo: "front-end/src/**/*.tsx"
---

# 50 - State and User Feedback

## Purpose
Define how every data-dependent UI must handle loading, error, empty, and success states
so users always receive clear, consistent feedback that also follows `DESIGN.md`.

---

## When this rule applies
Any time a component fetches data, submits a form, or performs an async operation.

---

## Required states

Every data-driven UI section must handle all four of these states.

### 1. Loading state

Show a loading indicator while data is being fetched or an action is in progress.
Use a spinner or skeleton placeholder; never leave a blank area while loading.

```tsx
if (loading) {
  return (
    <div className="flex justify-center py-8">
      <span className="text-body-sm font-body text-on-surface-variant">Loading...</span>
    </div>
  );
}
```

For tables or lists, a skeleton row pattern is preferred over a spinner when the layout is
known:

```tsx
// Skeleton row example
<div className="mb-2 h-4 w-3/4 animate-pulse rounded-md bg-surface-container-high" />
```

### 2. Error state

Show a clear, user-readable error message. Include a retry action where applicable.
Do not expose raw error messages or stack traces in the UI.

```tsx
if (error) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg bg-error-container/30 py-8">
      <p className="text-body-sm font-body text-error">{error}</p>
      <button
        className="rounded-md border border-outline/30 px-4 py-2 text-body-sm font-body font-medium text-primary hover:bg-surface-container-low focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        onClick={retry}
      >
        Try again
      </button>
    </div>
  );
}
```

### 3. Empty state

Show a meaningful message when a list or dataset returns zero results.
Do not render an empty table or blank space.

```tsx
if (items.length === 0) {
  return (
    <div className="flex justify-center rounded-lg bg-surface-container-low py-8">
      <p className="text-body-sm font-body text-on-surface-variant">No items found.</p>
    </div>
  );
}
```

### 4. Success / data state

The normal populated UI. Render only after loading is false and no error occurred.

---

## Form submission feedback

- Disable submit buttons while a submission is in progress.
- Show inline validation errors next to fields, not in a global banner.
- After a successful mutation (create, update, delete), confirm success with a brief message
  or redirect; do not leave the user without feedback.

```tsx
<button
  type="submit"
  disabled={isSubmitting}
  className="rounded-md bg-primary px-4 py-2 text-body-sm font-body font-medium text-on-primary hover:shadow-[inset_0_0_0_999px_rgba(255,255,255,0.06)] disabled:cursor-not-allowed disabled:opacity-50"
>
  {isSubmitting ? 'Saving...' : 'Save'}
</button>
```

---

## State variable naming

Use consistent naming across the codebase:

```ts
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [data, setData] = useState<T[]>([]);
const [isSubmitting, setIsSubmitting] = useState(false);
```

---

## Design-system expectations

- Use Botanical Archive semantic tokens from `DESIGN.md`.
- Do not use raw red/gray/blue Tailwind examples for final UI states.
- Error states use `text-error` and `bg-error-container/30`.
- Empty and loading states use surface tokens and `text-on-surface-variant`.
- Storefront feedback states may have more whitespace; admin feedback states may be denser.

---

## Forbidden patterns

- No blank UI sections while loading.
- No silent errors; every caught error must surface to the user or be logged.
- No submit buttons that remain active while an async action is running.
- No empty tables or lists rendered without an empty-state message.
- No raw `console.error` as the only error handling; also update the `error` state.
- No raw hex colors, pure black text, or default blue/gray sample styling in feedback UI.

---

## Done criteria

- [ ] Loading state renders a visible indicator.
- [ ] Error state renders a user-readable message.
- [ ] Error state includes a retry mechanism where appropriate.
- [ ] Empty state renders a descriptive message, not a blank area.
- [ ] Submit actions disable the button while in progress and show status text.
- [ ] State variables follow the consistent naming convention.
- [ ] Feedback UI uses Botanical Archive tokens.
