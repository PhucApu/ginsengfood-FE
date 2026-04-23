# Prompt: Chuyển đổi HTML/CSS/Tailwind/JS sang Next.js

> **Hướng dẫn sử dụng:** Copy toàn bộ prompt này và dán vào đầu yêu cầu của bạn, sau đó
> điền vào các phần `[ĐIỀN VÀO ĐÂY]` trước khi gửi.

---

## Yêu cầu chuyển đổi

Tôi muốn chuyển đổi giao diện HTML/CSS/Tailwind/JS sau sang cấu trúc Next.js của dự án
**ginsengfood-FE** với độ trung thực cao nhất có thể.

**File HTML nguồn:**
```
[ĐIỀN VÀO ĐÂY — ví dụ: test.html | tên file HTML | đường dẫn đến file HTML]
```

**Vị trí đặt trong dự án (chọn một):**
```
[ ] Storefront — trang mới:   src/app/(storefront)/[module]/page.tsx
[ ] Admin — trang mới:        src/app/(admin)/[module]/page.tsx
[ ] Thay thế component hiện có: [ĐIỀN ĐƯỜNG DẪN COMPONENT]
[ ] Thêm vào trang hiện có:   [ĐIỀN ĐƯỜNG DẪN TRANG]
```

**Tên module/chức năng:**
```
[ĐIỀN VÀO ĐÂY — ví dụ: products, orders, home, about]
```

**Surface (chọn một):**
```
[ ] storefront   [ ] admin   [ ] cả hai
```

---

## Yêu cầu bắt buộc

### 1. Đọc trước khi thực hiện

Trước khi viết bất kỳ dòng code nào, bạn PHẢI:

1. Đọc toàn bộ file HTML nguồn bao gồm mọi thẻ, class, inline script, và asset.
2. Đọc `front-end/package.json` để xác nhận thư viện đã cài.
3. Đọc `front-end/src/app/globals.css` để hiểu các CSS custom properties và Tailwind tokens.
4. Đọc `DESIGN.md` để nắm Botanical Archive design system.
5. List `front-end/src/` để thấy cấu trúc hiện tại.
6. Đọc layout shell hiện có: `front-end/src/app/(storefront)/layout.tsx` và/hoặc
   `front-end/src/app/(admin)/layout.tsx`.
7. Đọc toàn bộ file/component hiện có ở vị trí đích nếu đã tồn tại.

### 2. Load skills bắt buộc

Load và tuân theo các skill sau theo thứ tự:

1. `.agents/skills/html-to-react-tailwind-conversion/SKILL.md`
2. `.agents/skills/html-conversion-visual-parity/SKILL.md`
3. `.agents/skills/ui-component-boundary-audit/SKILL.md`
4. `.agents/skills/testing-and-verification/SKILL.md`

### 3. Kiểm kê nguồn (trước khi code)

Từ file HTML nguồn, liệt kê đầy đủ:

- [ ] Tất cả section và thứ tự xuất hiện
- [ ] Màu sắc chính xác (hex, rgba, custom property)
- [ ] Font chữ và kích cỡ chữ
- [ ] Khoảng cách, padding, margin đáng chú ý
- [ ] Hình ảnh, icon, asset (đường dẫn và kích thước)
- [ ] Breakpoint responsive
- [ ] Trạng thái tương tác: hover, focus, active, open/close dropdown, modal, carousel
- [ ] Behavior của inline JavaScript (nếu có)

### 4. Quy tắc chuyển đổi

**Bắt buộc giữ nguyên:**
- Toàn bộ màu sắc từ file nguồn — không được normalize sang Tailwind palette
- Mọi hình ảnh, icon, URL ảnh
- Thứ tự và bố cục các section
- Typography: font family, font size, font weight, letter spacing
- Khoảng cách: padding, margin, gap — dùng arbitrary values `mt-[18px]` nếu cần
- Shadows, borders, border-radius
- Tất cả animation và transition
- Tất cả trạng thái hover/focus/active
- Responsive behavior ở mọi breakpoint

**Quy tắc kỹ thuật:**
- Dùng Next.js `Image` cho ảnh khi đường dẫn là URL ngoài hoặc file local
- Dùng `'use client'` chỉ khi component cần hooks, event handlers, hoặc browser API
- Không dùng `any`, không dùng class component
- Mọi props phải có TypeScript interface rõ ràng
- Inline JavaScript → `useState` / `useEffect` / typed event handlers
- Không tạo file `.css` mới — thêm vào `globals.css` nếu Tailwind không đủ
- Không gọi API trực tiếp trong JSX; nếu có dữ liệu mock thì đặt vào array/constant
- Không import từ feature này sang feature khác

**Vị trí đặt file:**
- Route page (`page.tsx`) → `src/app/(storefront|admin)/[module]/page.tsx`
- Feature component → `src/features/[module]/storefront/components/` hoặc `admin/components/`
- Component dùng chung cả 2 surface trong cùng module → `src/features/[module]/components/`
- Component dùng nhiều module → `src/shared/components/`
- Ảnh của storefront → `src/features/[module]/storefront/assets/`

---

## Yêu cầu so sánh UI trước và sau (Visual Parity)

Đây là bước **bắt buộc** — conversion chưa xong nếu chưa so sánh.

### Bước so sánh

**1. Chuẩn bị baseline (UI nguồn):**
```bash
# Mở file HTML nguồn trực tiếp trong browser
# Chụp screenshot ở 3 viewport: 1440x900, 768x1024, 390x844
# Ghi nhận tất cả trạng thái: hover dropdown, mobile menu, v.v.
```

**2. Chạy React app:**
```bash
cd front-end
npm run dev
# Mở http://localhost:3000/[route-đích] trong cùng browser
# Dùng cùng viewport, zoom, color scheme
```

**3. So sánh side-by-side:**
- Đặt browser HTML nguồn và browser Next.js cạnh nhau
- Kiểm tra từng section theo checklist dưới đây

### Checklist so sánh visual

**Layout & Spacing:**
- [ ] Thứ tự section giống nhau
- [ ] Chiều rộng, max-width, padding container giống nhau
- [ ] Khoảng cách giữa các element giống nhau
- [ ] Alignment (text-left, center, right, flex justify) giống nhau

**Màu sắc:**
- [ ] Background color các section
- [ ] Text color
- [ ] Border color
- [ ] Button color (bình thường, hover, active)
- [ ] Icon color
- [ ] Gradient (nếu có)

**Typography:**
- [ ] Font family (headline vs body)
- [ ] Font size các heading, paragraph, label
- [ ] Font weight
- [ ] Letter spacing, line height

**Assets:**
- [ ] Tất cả hình ảnh hiển thị đúng, không bị broken
- [ ] Icon hiển thị đúng
- [ ] Kích cỡ ảnh giữ nguyên

**Responsive:**
- [ ] Desktop 1440px: layout giống nhau
- [ ] Tablet 768px: layout giống nhau
- [ ] Mobile 390px: layout giống nhau
- [ ] Không có overflow, text truncation không mong muốn

**Tương tác:**
- [ ] Hover state buttons/links
- [ ] Dropdown/menu mở đóng
- [ ] Modal (nếu có)
- [ ] Carousel/slider (nếu có)
- [ ] Form validation (nếu có)

### Kết quả so sánh

Nếu phát hiện sai khác:
- Báo cáo `[VISUAL PARITY FAILED]` kèm mô tả sai khác
- Sửa code React/Tailwind cho đến khi match
- Chạy lại so sánh

---

## Verification sau khi hoàn thành

```bash
cd front-end

# 1. Lint
npm run lint

# 2. Build (bao gồm TypeScript check)
npm run build

# 3. Kiểm tra UI trên dev server
npm run dev
```

---

## Format báo cáo kết quả

Sau khi hoàn thành, báo cáo theo format sau:

```
## Task Summary

### Files created or modified
- path/to/file.tsx — lý do thay đổi

### Structure decisions
- Module: [tên module]
- Surface: storefront | admin | shared
- Files placed under: [đường dẫn]

### Component boundary audit
- Page-only: ...
- Surface-specific: ...
- Module-shared: ...
- App-shell: ...
- Shared UI: ...
- [PROMOTE LATER] ... hoặc none

### Conversion fidelity notes
- Source file: ...
- Target screen/component: ...
- Existing UI files checked: ...
- Visual parity result: PASSED | FAILED | BLOCKED
- Màu sắc giữ nguyên: yes | [danh sách sai khác]
- Hình ảnh giữ nguyên: yes | [danh sách sai khác]
- Bố cục giữ nguyên: yes | [danh sách sai khác]
- Font chữ giữ nguyên: yes | [danh sách sai khác]
- Tương tác giữ nguyên: yes | [danh sách sai khác]
- [VISUAL PARITY FAILED] ... hoặc none
- [VISUAL BASELINE RISK] ... hoặc none
- [EXISTING UI RISK] ... hoặc none
- [CONVERSION DEVIATION] ... hoặc none
- [CONVERSION EXCEPTION] ... hoặc none

### Visual parity report
- Source baseline: [file/URL]
- Converted target: [route/component]
- Method: manual side-by-side | browser screenshot
- Viewports checked: 1440x900 | 768x1024 | 390x844
- States checked: [liệt kê]
- Result: PASSED | FAILED | BLOCKED
- Differences: none | [VISUAL PARITY FAILED] ...

### Verification
- npm run lint: [PASSED | output]
- npm run build: [PASSED | output]

### Assumptions made
- [ASSUMPTION] ...

### Deferred items
- [TODO] ...
```

---

## Lưu ý quan trọng

> **KHÔNG được:**
> - Redesign lại giao diện theo ý muốn (kể cả theo DESIGN.md) trừ khi được yêu cầu rõ ràng
> - Thay màu gốc bằng màu Tailwind palette gần nhất
> - Bỏ qua bất kỳ hover/focus/mobile state nào từ file nguồn
> - Đặt component vào `src/shared/components/` khi chưa có reuse thực sự
> - Ghi đè layout shell hiện có (`StorefrontHeader`, `StorefrontFooter`, layout.tsx)
> - Xóa custom properties trong `globals.css`
> - Chạy `rm -rf`, `git reset --hard`, hoặc destructive commands mà không hỏi

> **PHẢI:**
> - So sánh UI nguồn và UI đã convert trước khi báo cáo xong
> - Dùng arbitrary Tailwind values khi cần giữ đúng pixel gốc
> - Báo cáo mọi sai khác tìm thấy, dù nhỏ
