---
applyTo: "front-end/src/**/*.{ts,tsx}"
---

# 25 - Project Structure and File Placement

## Purpose
Define where files belong as the frontend grows into two separate application surfaces:
the customer sales interface and the admin management interface.

This rule extends `AGENTS.md` and rule 20. `AGENTS.md` remains the canonical guide.

---

## When this rule applies
Use this rule whenever you create, move, or review files under `front-end/src/`, especially
when adding pages, modules, routes, API services, hooks, or shared UI components.

---

## Application surfaces

This project has two UI surfaces:

- `storefront` - customer-facing sales interface.
- `admin` - administration and system management interface.

Use `storefront` instead of `user` for the customer-facing app. The name `user` is reserved
for the user/account domain module when needed.

---

## Required source structure

```txt
front-end/
  src/
    app/
      App.tsx
      providers/
        AppProviders.tsx
      router/
        index.tsx
        storefront.routes.tsx
        admin.routes.tsx
      layouts/
        StorefrontLayout.tsx
        AdminLayout.tsx
      guards/
        RequireAdmin.tsx

    api/
      client.ts
      dto/
      adapters/

    assets/

    features/
      <module>/
        types.ts
        api.ts
        hooks/
        components/
        assets/

        storefront/
          pages/
          components/
          hooks/
          assets/

        admin/
          pages/
          components/
          hooks/
          assets/

    shared/
      components/
      hooks/
      types/
      utils/
      constants/
      assets/
```

Create folders only when they are actually needed by the task. Do not add empty business
modules just to match this example.

---

## Placement rules

### App shell

Put app-wide wiring in `src/app/`:

- Global providers in `src/app/providers/`.
- Route definitions in `src/app/router/`.
- Layouts in `src/app/layouts/`.
- Route guards in `src/app/guards/`.

`src/app/` must not contain feature-specific UI, API calls, DTOs, or business rules.

### Feature modules

Put business modules in `src/features/<module>/`.

Examples:

- `src/features/products/`
- `src/features/orders/`
- `src/features/auth/`
- `src/features/users/`
- `src/features/categories/`

Each module owns its domain types, module API functions, module hooks, and module-specific UI.
Use `src/features/<module>/components/` only for components shared by both `storefront`
and `admin` within the same module.

### Surface-specific UI

When a module appears in both interfaces, keep shared domain code at the module root and put
surface-specific UI below `storefront/` or `admin/`.

```txt
src/features/products/
  types.ts
  api.ts
  hooks/
    useProducts.ts

  storefront/
    pages/
      ProductListPage.tsx
      ProductDetailPage.tsx
    components/
      ProductCard.tsx

  admin/
    pages/
      ProductManagementPage.tsx
      ProductEditPage.tsx
    components/
      ProductTable.tsx
      ProductForm.tsx
```

Use `pages/` for route-level components. Use `components/` for smaller UI pieces that belong
only to that module and surface.

### Shared code

Put cross-module reusable code in `src/shared/`.

- `shared/components/` - reusable UI such as buttons, tables, badges, dialogs, inputs.
- `shared/hooks/` - reusable hooks that do not belong to one business module.
- `shared/types/` - app-wide shared TypeScript types.
- `shared/utils/` - pure helpers with no React or API side effects.
- `shared/constants/` - app-wide constants.

Do not put feature-specific product, order, user, or admin logic in `shared/`.

### API layer

Put the shared Axios client, DTOs, and adapters in `src/api/`.

- `src/api/client.ts` owns the Axios instance.
- `src/api/dto/` contains raw backend response/request shapes.
- `src/api/adapters/` maps DTOs to frontend domain types.
- `src/features/<module>/api.ts` contains module service functions using `apiClient`.

Do not call Axios directly from pages or components.

### Image and static assets

Place images and other static assets next to their ownership boundary.

- `src/assets/` - app-wide imported assets, such as brand logos, global decorative images,
  or assets used by the app shell.
- `src/features/<module>/assets/` - module-specific assets shared by both `storefront`
  and `admin` within the same business module.
- `src/features/<module>/storefront/assets/` - customer-facing images that belong only to
  that module's storefront UI, such as hero images, product storytelling images, campaign
  art, or storefront-only placeholders.
- `src/features/<module>/admin/assets/` - admin-only images, icons, empty-state
  illustrations, or operational placeholders for that module.
- `src/shared/assets/` - reusable assets owned by shared components or shared UI patterns.
- `public/` - files that must be served from a stable public URL or root path, such as
  `favicon.ico`, `robots.txt`, web manifests, Open Graph images, or files referenced outside
  the React bundle.

Import UI images through the module system when they are used by React components:

```ts
import productHero from '../assets/product-hero.webp';
```

Do not reference source images with hardcoded `/src/...` paths. Do not put every image in
`src/assets/` by default. Use the closest owner folder first.

Use descriptive kebab-case filenames:

```txt
heritage-ginseng-hero.webp
product-empty-state.svg
admin-inventory-upload.png
```

Prefer optimized image formats:

- Use `.webp` or `.avif` for photos and rich imagery.
- Use `.svg` for logos, icons, and simple vector illustrations.
- Use `.png` only when transparency or source constraints require it.

Large raw design exports, temporary screenshots, and one-off reference images should not be
committed into `front-end/src/` unless the task explicitly requires them as product assets.

---

## Import direction rules

Allowed import direction:

```txt
app -> features -> shared
app -> shared
features -> api
features -> shared
api -> shared/types or feature domain types when needed
```

Forbidden import direction:

- `shared` importing from `features`.
- One feature importing another feature's internal components.
- `api/client.ts` importing from features.
- `storefront` UI importing from `admin` UI.
- `admin` UI importing from `storefront` UI.
- `shared` importing assets from a feature folder.
- `admin` UI importing storefront-only assets, or `storefront` UI importing admin-only assets.

If both surfaces need the same component, move it to `shared/components/` or to the module
root `components/` folder when it is still module-specific.
If both surfaces need the same asset, move it to the module root `assets/` folder or to
`shared/assets/` when it is reusable across modules.

---

## Naming rules

- Route-level components end with `Page`: `ProductListPage.tsx`, `AdminDashboardPage.tsx`.
- Layout components end with `Layout`: `AdminLayout.tsx`.
- Guard components start with `Require`: `RequireAdmin.tsx`.
- Hooks start with `use`: `useProducts.ts`.
- DTO files use `.dto.ts`: `product.dto.ts`.
- Adapter files use `.adapter.ts`: `product.adapter.ts`.
- Asset files use descriptive kebab-case names: `product-hero.webp`, `empty-cart.svg`.
- Domain module folders use plural nouns when they represent collections: `products`, `orders`, `users`.

---

## Forbidden shortcuts

- Do not create parallel top-level trees like `src/user/` and `src/admin/` for business modules.
- Do not duplicate API service functions separately for storefront and admin if they use the same contract.
- Do not put route pages directly in `src/`.
- Do not put reusable UI inside one feature just because it was first used there.
- Do not dump feature-specific images into `src/assets/` by default.
- Do not put React-imported UI images in `public/` unless a stable public URL is required.
- Do not keep scaffold assets such as Vite or React logos in production UI.
- Do not create fake modules for domains that do not exist yet.
- Do not move existing files during an unrelated task.

---

## Implementation expectations

Before adding a file:

1. Identify the business module.
2. Identify whether the file is app shell, shared, API, or feature code.
3. Identify whether feature UI belongs to `storefront`, `admin`, or both.
4. For images/assets, identify whether the owner is app-wide, shared, module-level,
   storefront-only, admin-only, or public-root.
5. Reuse existing folders and naming patterns first.
6. Create the smallest folder set needed for the task.

When establishing a new module, prefer this minimum structure:

```txt
src/features/<module>/
  types.ts
```

Add `api.ts`, `hooks/`, `storefront/`, or `admin/` only when the task requires them.

---

## Output expectations

When creating or moving files, report:

```txt
### Structure decisions
- Module: <module-name>
- Surface: storefront | admin | shared across both | app shell
- Files placed under: <path>
- Asset owner: app | shared | module | storefront | admin | public, when assets are created
- [NEW CONVENTION] ... only if a new permanent convention was introduced
```

---

## Done criteria

- [ ] New files are placed in the correct app, feature, API, or shared folder.
- [ ] Storefront and admin UI are separated under the relevant module.
- [ ] Shared code is not polluted with module-specific logic.
- [ ] Image/static assets are placed under the closest correct owner folder.
- [ ] API calls still go through the Axios API layer.
- [ ] No duplicate business modules were created.
- [ ] No unrelated files were moved or renamed.
