---
applyTo: "front-end/src/**/*.{ts,tsx}"
---

# 25 - Cấu trúc dự án và vị trí đặt file

> Bản tiếng Việt tham khảo của `.github/instructions/25-project-structure.instructions.md`.
> Rule active cho tooling vẫn nằm trong `.github/instructions/`.

## Mục đích

Định nghĩa nơi các file nên được đặt khi frontend phát triển thành hai bề mặt ứng dụng
riêng biệt: giao diện bán hàng cho khách hàng và giao diện quản trị.

Rule này mở rộng `AGENTS.md` và rule 20. `AGENTS.md` vẫn là tài liệu hướng dẫn canonical.

---

## Khi nào rule này áp dụng

Dùng rule này mỗi khi tạo, di chuyển, hoặc review file trong `front-end/src/`, đặc biệt
khi thêm page, module, route, API service, hook, hoặc shared UI component.

---

## Các bề mặt ứng dụng

Dự án này có hai bề mặt UI:

- `storefront` - giao diện bán hàng hướng tới khách hàng.
- `admin` - giao diện quản trị và quản lý hệ thống.

Dùng `storefront` thay vì `user` cho customer-facing app. Tên `user` được giữ lại cho
domain module tài khoản/người dùng khi cần.

---

## Cấu trúc source bắt buộc

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

Chỉ tạo folder khi task thật sự cần. Không thêm business module rỗng chỉ để khớp ví dụ.

---

## Quy tắc đặt file

### App shell

Đặt phần wiring cấp ứng dụng trong `src/app/`:

- Global providers trong `src/app/providers/`.
- Route definitions trong `src/app/router/`.
- Layouts trong `src/app/layouts/`.
- Route guards trong `src/app/guards/`.

`src/app/` không được chứa UI riêng của feature, API calls, DTOs, hoặc business rules.

### Feature modules

Đặt business modules trong `src/features/<module>/`.

Ví dụ:

- `src/features/products/`
- `src/features/orders/`
- `src/features/auth/`
- `src/features/users/`
- `src/features/categories/`

Mỗi module sở hữu domain types, module API functions, module hooks, và UI riêng của module.
Dùng `src/features/<module>/components/` chỉ cho component được chia sẻ bởi cả `storefront`
và `admin` trong cùng module đó.

### UI theo từng bề mặt

Khi một module xuất hiện trong cả hai interface, giữ shared domain code ở root của module
và đặt UI riêng từng bề mặt dưới `storefront/` hoặc `admin/`.

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

Dùng `pages/` cho route-level components. Dùng `components/` cho các UI nhỏ hơn chỉ thuộc
module và bề mặt đó.

### Shared code

Đặt code tái sử dụng xuyên module trong `src/shared/`.

- `shared/components/` - UI tái sử dụng như buttons, tables, badges, dialogs, inputs.
- `shared/hooks/` - hooks tái sử dụng không thuộc riêng một business module.
- `shared/types/` - TypeScript types dùng chung toàn app.
- `shared/utils/` - pure helpers không có React side effect hoặc API side effect.
- `shared/constants/` - constants dùng chung toàn app.

Không đặt logic riêng của product, order, user, hoặc admin vào `shared/`.

### API layer

Đặt shared Axios client, DTOs, và adapters trong `src/api/`.

- `src/api/client.ts` sở hữu Axios instance.
- `src/api/dto/` chứa raw backend response/request shapes.
- `src/api/adapters/` map DTOs sang frontend domain types.
- `src/features/<module>/api.ts` chứa module service functions sử dụng `apiClient`.

Không gọi Axios trực tiếp từ pages hoặc components.

### Ảnh và static assets

Đặt ảnh và static assets theo ranh giới sở hữu gần nhất.

- `src/assets/` - assets được import dùng toàn app, ví dụ brand logos, ảnh trang trí toàn
  cục, hoặc assets dùng bởi app shell.
- `src/features/<module>/assets/` - assets riêng của module nhưng được chia sẻ bởi cả
  `storefront` và `admin` trong cùng business module.
- `src/features/<module>/storefront/assets/` - ảnh chỉ thuộc UI storefront của module đó,
  ví dụ hero images, ảnh kể chuyện sản phẩm, campaign art, hoặc placeholder chỉ dùng cho
  storefront.
- `src/features/<module>/admin/assets/` - ảnh, icon, empty-state illustration, hoặc
  operational placeholder chỉ dùng cho admin của module đó.
- `src/shared/assets/` - assets tái sử dụng thuộc shared components hoặc shared UI patterns.
- `public/` - file cần được serve bằng public URL ổn định hoặc root path, ví dụ
  `favicon.ico`, `robots.txt`, web manifest, Open Graph image, hoặc file được tham chiếu
  bên ngoài React bundle.

Import ảnh UI qua module system khi ảnh được dùng bởi React components:

```ts
import productHero from '../assets/product-hero.webp';
```

Không tham chiếu source images bằng hardcoded path kiểu `/src/...`. Không đưa mọi ảnh vào
`src/assets/` theo mặc định. Ưu tiên folder owner gần nhất.

Dùng tên file mô tả bằng kebab-case:

```txt
heritage-ginseng-hero.webp
product-empty-state.svg
admin-inventory-upload.png
```

Ưu tiên định dạng ảnh đã tối ưu:

- Dùng `.webp` hoặc `.avif` cho ảnh chụp và hình ảnh giàu chi tiết.
- Dùng `.svg` cho logo, icon, và vector illustration đơn giản.
- Dùng `.png` chỉ khi cần transparency hoặc bị ràng buộc bởi source.

Không commit raw design exports dung lượng lớn, temporary screenshots, hoặc ảnh reference
một lần vào `front-end/src/` trừ khi task yêu cầu rõ chúng là product assets.

---

## Quy tắc hướng import

Hướng import được phép:

```txt
app -> features -> shared
app -> shared
features -> api
features -> shared
api -> shared/types hoặc feature domain types khi cần
```

Hướng import bị cấm:

- `shared` import từ `features`.
- Một feature import internal components của feature khác.
- `api/client.ts` import từ features.
- UI `storefront` import từ UI `admin`.
- UI `admin` import từ UI `storefront`.
- `shared` import assets từ feature folder.
- UI `admin` import storefront-only assets, hoặc UI `storefront` import admin-only assets.

Nếu cả hai bề mặt cần cùng một component, chuyển component đó vào `shared/components/`
hoặc vào folder `components/` ở root của module nếu component vẫn chỉ thuộc riêng module đó.
Nếu cả hai bề mặt cần cùng một asset, chuyển asset đó vào folder `assets/` ở root của
module hoặc vào `shared/assets/` khi asset có thể tái sử dụng xuyên module.

---

## Quy tắc đặt tên

- Route-level components kết thúc bằng `Page`: `ProductListPage.tsx`, `AdminDashboardPage.tsx`.
- Layout components kết thúc bằng `Layout`: `AdminLayout.tsx`.
- Guard components bắt đầu bằng `Require`: `RequireAdmin.tsx`.
- Hooks bắt đầu bằng `use`: `useProducts.ts`.
- DTO files dùng `.dto.ts`: `product.dto.ts`.
- Adapter files dùng `.adapter.ts`: `product.adapter.ts`.
- Asset files dùng tên mô tả bằng kebab-case: `product-hero.webp`, `empty-cart.svg`.
- Domain module folders dùng danh từ số nhiều khi đại diện cho collection: `products`, `orders`, `users`.

---

## Các lối tắt bị cấm

- Không tạo parallel top-level trees như `src/user/` và `src/admin/` cho business modules.
- Không duplicate API service functions riêng cho storefront và admin nếu chúng dùng cùng contract.
- Không đặt route pages trực tiếp trong `src/`.
- Không đặt reusable UI vào một feature chỉ vì nó được dùng ở đó đầu tiên.
- Không dồn ảnh riêng của feature vào `src/assets/` theo mặc định.
- Không đặt ảnh UI được React import vào `public/` trừ khi cần public URL ổn định.
- Không giữ scaffold assets như logo Vite hoặc React trong production UI.
- Không tạo fake modules cho domains chưa tồn tại.
- Không di chuyển file hiện có trong một task không liên quan.

---

## Kỳ vọng khi implement

Trước khi thêm file:

1. Xác định business module.
2. Xác định file là app shell, shared, API, hay feature code.
3. Xác định UI của feature thuộc `storefront`, `admin`, hay cả hai.
4. Với ảnh/assets, xác định owner là app-wide, shared, module-level, storefront-only,
   admin-only, hay public-root.
5. Ưu tiên tái sử dụng folder và naming pattern hiện có.
6. Tạo bộ folder nhỏ nhất cần thiết cho task.

Khi thiết lập module mới, ưu tiên cấu trúc tối thiểu:

```txt
src/features/<module>/
  types.ts
```

Chỉ thêm `api.ts`, `hooks/`, `storefront/`, hoặc `admin/` khi task yêu cầu.

---

## Kỳ vọng output

Khi tạo hoặc di chuyển file, báo cáo:

```txt
### Structure decisions
- Module: <module-name>
- Surface: storefront | admin | shared across both | app shell
- Files placed under: <path>
- Asset owner: app | shared | module | storefront | admin | public, khi có tạo assets
- [NEW CONVENTION] ... chỉ khi có convention lâu dài mới được giới thiệu
```

---

## Done criteria

- [ ] File mới được đặt đúng folder app, feature, API, hoặc shared.
- [ ] UI storefront và admin được tách dưới module phù hợp.
- [ ] Shared code không bị lẫn logic riêng của module.
- [ ] Ảnh/static assets được đặt dưới folder owner gần nhất và đúng nhất.
- [ ] API calls vẫn đi qua Axios API layer.
- [ ] Không tạo duplicate business modules.
- [ ] Không di chuyển hoặc rename file không liên quan.
