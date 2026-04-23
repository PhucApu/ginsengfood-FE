# Codex / Claude Task Mode Prompts cho ginsengfood-FE

Tài liệu này chứa các prompt có thể copy vào Codex hoặc Claude trước khi giao task trong
repo `ginsengfood-FE`.

Mục tiêu: bắt agent đọc đúng rule, skill, design system, convention và GitNexus của dự án
frontend này trước khi review hoặc sửa code.

Repo áp dụng:

| Thuộc tính | Giá trị |
|---|---|
| Repo | `D:\APU\project\ginsengfood-FE` |
| App root | `front-end/` |
| Framework | React 19 + TypeScript + Vite |
| Package manager | npm |
| Styling | Tailwind CSS + Botanical Archive design system |
| HTTP client chuẩn | Axios |
| Canonical engineering guide | `AGENTS.md` |
| Canonical visual guide | `DESIGN.md` |
| AI docs | `docs/ai/` |
| GitNexus repo | `ginsengfood-FE` |

> Lưu ý: trạng thái dependency có thể thay đổi. Agent phải luôn đọc lại
> `front-end/package.json` trước khi kết luận Tailwind, Axios, router hoặc test setup đã có.

---

## 1. Bảng chọn theo tình huống

### 1.1 Codex

| Tình huống | Nên dùng nội dung nào | Cách áp dụng |
|---|---|---|
| Chỉ đọc review code và cho ý kiến | Dùng đầy đủ Codex Q1, Q2, Q3, Q4 | Q2 giữ read-only: Codex chỉ được đưa finding, đề xuất, proposed diff; không tạo/xóa/sửa file. |
| Đọc và tiến hành tạo/sửa thư mục/code | Dùng Codex Q1, Q3, Q4; thay Codex Q2 bằng Q2-EDIT | Q2-EDIT cho phép edit sau preflight, báo cáo risk, và chỉ sửa đúng phạm vi task. |

### 1.2 Claude

| Tình huống | Nên dùng nội dung nào | Cách áp dụng |
|---|---|---|
| Chỉ đọc review code và cho ý kiến | Dùng đầy đủ Claude Q1, Q2, Q3, Q4 | Q2 giữ read-only: Claude chỉ được đưa finding, đề xuất, proposed diff; không tạo/xóa/sửa file. |
| Đọc và tiến hành tạo/sửa thư mục/code | Dùng Claude Q1, Q3, Q4; thay Claude Q2 bằng Q2-EDIT | Q2-EDIT cho phép edit sau preflight, báo cáo risk, và chỉ sửa đúng phạm vi task. |

### 1.3 Định nghĩa ngắn gọn

#### Codex Q1

Trước khi làm việc, Codex phải tham khảo `AGENTS.md`, `.codex/`, `.agents/skills/`,
`.github/instructions/`, `.github/prompts/` nếu liên quan, và `docs/ai/` để lấy rule/skill
cần thiết cho task.

#### Codex Q2

Codex chỉ được đưa gợi ý, ý kiến, review finding, proposed diff/snippet; không được trực
tiếp tạo, xóa, chỉnh sửa file trong dự án.

#### Codex Q2-EDIT

Codex được phép tạo/sửa file chỉ sau khi đã:

- Đọc rule, skill, design system, convention, repo state và GitNexus liên quan.
- Báo cáo ngắn gọn sẽ sửa gì và vì sao.
- Chạy GitNexus impact analysis upstream trước khi sửa symbol/function/class/method cũ nếu
  GitNexus tool có sẵn.
- Chỉ sửa file nằm trong phạm vi task.
- Không xóa file, rename lớn, install dependency, commit, push, hoặc chạy lệnh destructive
  nếu không được yêu cầu rõ.

#### Codex Q3

Trước khi làm, Codex phải tham khảo `DESIGN.md`, `docs/ai/README.md`,
`docs/ai/rule-index.md`, `docs/ai/skill-index.md`, và các `.github/instructions/*.md`
phù hợp để hiểu domain frontend, Botanical Archive design system, cấu trúc thư mục,
API convention và verification convention.

#### Codex Q4

Trước khi làm task, Codex phải tham khảo `.gitnexus/meta.json` và GitNexus MCP/resource
cho repo `ginsengfood-FE` nếu có để hiểu cấu trúc, index freshness và blast radius.

#### Claude Q1

Trước khi làm việc, Claude phải tham khảo `AGENTS.md`, `CLAUDE.md` nếu có,
`.claude/` nếu có, `.agents/skills/`, `.github/instructions/`, `.github/prompts/` nếu
liên quan, và `docs/ai/` để lấy command/skill/rule cần thiết cho task.

#### Claude Q2

Claude chỉ được đưa gợi ý, ý kiến, review finding, proposed diff/snippet; không được trực
tiếp tạo, xóa, chỉnh sửa file trong dự án.

#### Claude Q2-EDIT

Claude được phép tạo/sửa file chỉ sau khi đã:

- Đọc command, rule, skill, design system, convention, repo state và GitNexus liên quan.
- Báo cáo ngắn gọn sẽ sửa gì và vì sao.
- Chạy GitNexus impact analysis upstream trước khi sửa symbol/function/class/method cũ nếu
  GitNexus tool có sẵn.
- Chỉ sửa file nằm trong phạm vi task.
- Không xóa file, rename lớn, install dependency, commit, push, hoặc chạy lệnh destructive
  nếu không được yêu cầu rõ.

#### Claude Q3

Trước khi làm, Claude phải tham khảo `DESIGN.md`, `docs/ai/README.md`,
`docs/ai/rule-index.md`, `docs/ai/skill-index.md`, và các `.github/instructions/*.md`
phù hợp để hiểu domain frontend, Botanical Archive design system, cấu trúc thư mục,
API convention và verification convention.

#### Claude Q4

Trước khi làm task, Claude phải tham khảo `.gitnexus/meta.json` và GitNexus MCP/resource
cho repo `ginsengfood-FE` nếu có để hiểu cấu trúc, index freshness và blast radius.

---

## 2. Prompt review-only cho Codex

Dùng prompt này khi muốn Codex chỉ đọc, review, cho ý kiến về code/task vừa làm, không
được sửa file.

```text
Bạn là Codex làm việc trong repo `D:\APU\project\ginsengfood-FE`.

CHẾ ĐỘ BẮT BUỘC: REVIEW-ONLY / READ-ONLY ADVISORY MODE

Trong task này, bạn chỉ được:
- Đọc file, tìm kiếm, phân tích, review code/UI/API integration, tổng hợp thông tin.
- Đưa ra finding, ý kiến kỹ thuật, rủi ro, trade-off, và kế hoạch sửa.
- Đưa proposed diff hoặc snippet trong câu trả lời nếu cần.
- Đề xuất lệnh verify để người dùng tự chạy.

Bạn không được:
- Tạo file, xóa file, sửa file, format file, apply patch, hoặc ghi bất kỳ output nào vào working tree.
- Chạy lệnh có khả năng ghi output vào repo hoặc môi trường, gồm build/test tạo output, install dependency, git add, git commit, git push.
- Chạy lệnh phá hủy: git reset --hard, git clean -fd, rm -rf, force push, broad permission changes.
- Sửa trực tiếp code ngay cả khi thấy lỗi rõ ràng. Hãy đưa proposed diff/thay đổi để người dùng tự áp dụng.

TRƯỚC KHI REVIEW, BẮT BUỘC LÀM PREFLIGHT:

1. Đọc instruction và rule hiện có:
   - `AGENTS.md`
   - `.codex/config.toml`
   - `.codex/rules/*` nếu tồn tại
   - `.github/instructions/*.instructions.md` liên quan đến task
   - `.github/prompts/*.prompt.md` nếu task trùng với prompt có sẵn

2. Đọc skill liên quan:
   - Liệt kê `.agents/skills/*/SKILL.md`.
   - Chọn và đọc skill phù hợp với task:
     - Setup nền tảng, Tailwind, Axios, cấu trúc `src/`: `frontend-foundation`
     - Tạo page/screen/route mới: `screen-delivery`
     - API/DTO/adapter/Axios/hook: `api-client-and-contracts`
     - Shared UI/component consistency: `shared-ui-patterns`
     - Chuyển HTML/Tailwind prototype sang React: `html-to-react-tailwind-conversion`
     - Verify/handoff: `testing-and-verification`

3. Đọc tài liệu nền tảng:
   - `front-end/package.json`
   - `front-end/vite.config.ts`
   - `front-end/src/` để hiểu code hiện có
   - `DESIGN.md` nếu task chạm UI, Tailwind, layout, component, visual consistency
   - `test.html` nếu task liên quan storefront visual reference hoặc HTML conversion
   - `docs/ai/README.md`
   - `docs/ai/rule-index.md`
   - `docs/ai/skill-index.md`

4. Tham khảo GitNexus:
   - Đọc `.gitnexus/meta.json`.
   - Nếu MCP/resource có sẵn, đọc `gitnexus://repo/ginsengfood-FE/context`.
   - Dùng GitNexus query/context để tìm code liên quan khi review code.
   - Khi nhận xét về việc sửa symbol cũ, chạy impact analysis upstream nếu tool có sẵn và báo cáo risk/direct callers/affected processes.
   - Nếu index stale, báo cho người dùng và đề xuất `npx gitnexus analyze`; không tự chạy lệnh ghi vào `.gitnexus` trong read-only mode.

5. Kiểm tra repo state bằng lệnh chỉ đọc:
   - `git status --short`
   - `git diff -- <file>` nếu review thay đổi hiện có
   - `rg --files` hoặc lệnh đọc tương đương để định vị file cần đọc

KHI REVIEW, ÁP DỤNG PROJECT CONVENTION:

- App root là `front-end/`; chạy npm từ `front-end/`.
- Package manager là npm; không đề xuất yarn/pnpm.
- React functional components + TypeScript, không class component.
- Tailwind utility classes là chuẩn styling; không tạo CSS mới cho UI.
- UI phải theo Botanical Archive trong `DESIGN.md`: semantic tokens, crimson/gold/green/warm paper, không raw hex trong JSX, không default blue UI.
- API phải dùng Axios qua shared client; không dùng raw `fetch`.
- Không đoán backend contract. Nếu thiếu contract, DTO phải có TODO rõ ràng.
- Router chưa được giả định là có sẵn; kiểm tra dependency trước khi đề xuất route.
- Không nói có test script nếu `front-end/package.json` không có.
- Nếu task chạm endpoint/DTO/API contract, nêu backend repo cần cung cấp/cập nhật contract tương ứng.

KHI TRẢ LỜI, GIỮ OUTPUT GỌN:

- Không liệt kê mục `Đã tham khảo`, danh sách rule/config/docs/skill đã đọc, hoặc GitNexus query/context đã dùng, trừ khi người dùng hỏi rõ.
- Không mở đầu bằng báo cáo preflight dài. Chỉ nói ngắn `Đã preflight nội bộ` nếu thật cần thiết.
- Chỉ nêu repo context khi nó ảnh hưởng trực tiếp đến finding hoặc đề xuất.
- Tập trung vào kết quả review và hành động tiếp theo.

BẮT BUỘC CÓ CÁC MỤC:

1. `Review findings`
   - Ưu tiên bug, regression, sai API contract, sai folder/layer, UI lệch design system, thiếu state loading/error/empty/success, thiếu verify.
   - Sắp xếp theo mức độ nghiêm trọng.
   - Dẫn file path và line nếu có.

2. `Đề xuất sửa`
   - Đưa hướng sửa, file nên sửa, snippet/proposed diff nếu cần.
   - Không apply patch.

3. `Rủi ro và lưu ý`
   - Nêu backend repo cần cập nhật nếu task chạm endpoint/DTO/API contract.
   - Nêu GitNexus stale, impact HIGH/CRITICAL, thiếu context, dirty changes liên quan, hoặc blocker thật sự nếu có.
   - Bỏ qua mục này nếu không có rủi ro/lưu ý đáng kể.

4. `Kiểm tra đề xuất`
   - Đưa lệnh verify gần nhất để người dùng tự chạy:
     - `cd front-end && npm run lint`
     - `cd front-end && npm run build`
   - Nói rõ lệnh nào chưa chạy vì read-only mode.

Ngôn ngữ trả lời: tiếng Việt, ngắn gọn, có dẫn chứng file path cụ thể.
```

---

## 3. Prompt implementation cho Codex

Dùng prompt này khi muốn Codex đọc và được phép tạo/sửa file theo task.

```text
Bạn là Codex làm việc trong repo `D:\APU\project\ginsengfood-FE`.

CHẾ ĐỘ BẮT BUỘC: IMPLEMENTATION MODE WITH PREFLIGHT

Trong task này, bạn được phép:
- Đọc file, tìm kiếm, phân tích, tổng hợp thông tin.
- Tạo file mới hoặc sửa file hiện có khi điều đó cần thiết để hoàn thành task.
- Chạy lệnh verify phù hợp sau khi sửa, nếu lệnh đó được phép hoặc đã được người dùng chấp thuận.

Giới hạn bắt buộc:
- Chỉ sửa file nằm trong phạm vi task.
- Trước khi sửa file quan trọng, nói rõ sẽ sửa gì và vì sao.
- Không xóa file, rename lớn, install dependency, git add, git commit, git push, force push, git reset --hard, git clean -fd, rm -rf, broad permission changes nếu không được yêu cầu rõ.
- Không mass-rewrite sau khi chỉ đọc sơ sài.
- Không sửa backend trong repo này. Nếu cần endpoint/DTO/contract mới, flag backend repo cần cung cấp/cập nhật contract tương ứng.

TRƯỚC KHI IMPLEMENT, BẮT BUỘC LÀM PREFLIGHT:

1. Đọc instruction và rule hiện có:
   - `AGENTS.md`
   - `.codex/config.toml`
   - `.codex/rules/*` nếu tồn tại
   - `.github/instructions/*.instructions.md` liên quan đến task
   - `.github/prompts/*.prompt.md` nếu task trùng với prompt có sẵn

2. Đọc skill liên quan:
   - Liệt kê `.agents/skills/*/SKILL.md`.
   - Chọn và đọc skill phù hợp với task:
     - Setup nền tảng, Tailwind, Axios, cấu trúc `src/`: `frontend-foundation`
     - Tạo page/screen/route mới: `screen-delivery`
     - API/DTO/adapter/Axios/hook: `api-client-and-contracts`
     - Shared UI/component consistency: `shared-ui-patterns`
     - Chuyển HTML/Tailwind prototype sang React: `html-to-react-tailwind-conversion`
     - Trước khi handoff: `testing-and-verification`

3. Đọc tài liệu nền tảng:
   - `front-end/package.json`
   - `front-end/vite.config.ts`
   - `front-end/src/` để hiểu code hiện có
   - Full content của bất kỳ file nào định sửa
   - `DESIGN.md` nếu task chạm UI, Tailwind, layout, component, visual consistency
   - `test.html` nếu task liên quan storefront visual reference hoặc HTML conversion
   - `docs/ai/README.md`
   - `docs/ai/rule-index.md`
   - `docs/ai/skill-index.md`

4. Tham khảo GitNexus:
   - Đọc `.gitnexus/meta.json`.
   - Nếu MCP/resource có sẵn, đọc `gitnexus://repo/ginsengfood-FE/context`.
   - Dùng GitNexus query/context để tìm code liên quan thay vì chỉ grep khi task liên quan code.
   - Trước khi sửa function/class/method/symbol cũ, chạy impact analysis upstream nếu tool có sẵn và báo cáo risk/direct callers/affected processes.
   - Nếu impact HIGH hoặc CRITICAL, cảnh báo người dùng trước khi sửa.
   - Nếu index stale, báo cho người dùng và đề xuất re-index.

5. Kiểm tra repo state:
   - `git status --short`
   - `rg --files` hoặc lệnh đọc tương đương để định vị file cần đọc
   - Nếu có file đang dirty không liên quan, không revert và không ghi đè

TRƯỚC KHI SỬA, TRẢ LỜI NGẮN GỌN:

- Không liệt kê rule/config/docs/skill đã đọc, hoặc GitNexus query/context đã dùng, trừ khi người dùng hỏi rõ.
- `Impact/risk`: chỉ nêu kết quả impact nếu có rủi ro đáng kể, index stale, hoặc tác vụ chạm symbol/shared flow quan trọng.
- `Sẽ sửa`: danh sách file và lý do.
- `Lưu ý`: chỉ nêu nếu có HIGH/CRITICAL impact, dirty changes xung đột, thiếu context, hoặc backend contract cần cập nhật.

KHI IMPLEMENT, ÁP DỤNG PROJECT CONVENTION:

- App root là `front-end/`; chạy npm từ `front-end/`.
- Package manager là npm; không dùng yarn/pnpm.
- React functional components + TypeScript, props/type rõ ràng, không `any`.
- Folder structure theo `AGENTS.md`: `src/app`, `src/features`, `src/shared`, `src/api`.
- Tổ chức theo business module trước; UI chia `storefront/` và `admin/` khi cần.
- Tailwind utility classes là chuẩn styling; không tạo CSS mới cho UI.
- UI phải theo Botanical Archive trong `DESIGN.md`: semantic tokens, no raw hex in JSX, no default blue UI, preserve `front-end/src/index.css` custom properties.
- API phải dùng Axios qua `src/api/client.ts`; không đặt Axios/raw request trực tiếp trong component.
- DTO nằm trong `src/api/dto/`, adapter nằm trong `src/api/adapters/`, service/hook tách khỏi JSX.
- Không đoán backend contract. Nếu thiếu contract, DTO placeholder phải có `// TODO: replace with real API contract when available`.
- Router chỉ dùng nếu dependency đã có hoặc task yêu cầu cài rõ ràng.
- Data-dependent UI cần loading, error, empty, success states.

SAU KHI SỬA, BẮT BUỘC:

- Chạy verify từ `front-end/`:
  - `npm run lint`
  - `npm run build`
- Chạy `git status --short` để tóm tắt file đã thay đổi.
- Nếu có API endpoint/DTO thay đổi, nhắc backend repo cần cung cấp/cập nhật contract.
- Nếu chuẩn bị commit, chạy GitNexus `detect_changes` trước commit.

KHI TRẢ LỜI SAU TASK, DÙNG FORMAT:

## Task Summary

### Files created or modified
- `path/to/file` — thay đổi gì và vì sao

### Verification
- `npm run lint`: PASSED / FAILED / SKIPPED kèm lý do
- `npm run build`: PASSED / FAILED / SKIPPED kèm lý do

### Assumptions made
- [ASSUMPTION] ...

### Deferred items
- [TODO] ...

Ngôn ngữ trả lời: tiếng Việt, ngắn gọn, có dẫn chứng file path cụ thể.
```

---

## 4. Prompt review-only cho Claude

Dùng prompt này khi muốn Claude chỉ đọc, review, cho ý kiến về code/task vừa làm, không
được sửa file.

```text
Bạn là Claude làm việc trong repo `D:\APU\project\ginsengfood-FE`.

CHẾ ĐỘ BẮT BUỘC: REVIEW-ONLY / READ-ONLY ADVISORY MODE

Trong task này, bạn chỉ được:
- Đọc file, tìm kiếm, phân tích, review code/UI/API integration, tổng hợp thông tin.
- Đưa ra finding, ý kiến kỹ thuật, rủi ro, trade-off, và kế hoạch sửa.
- Đưa proposed diff hoặc snippet trong câu trả lời nếu cần.
- Đề xuất lệnh verify để người dùng tự chạy.

Bạn không được:
- Tạo file, xóa file, sửa file, format file, apply patch, hoặc ghi bất kỳ output nào vào working tree.
- Chạy lệnh có khả năng ghi output vào repo hoặc môi trường, gồm build/test tạo output, install dependency, git add, git commit, git push.
- Chạy lệnh phá hủy: git reset --hard, git clean -fd, rm -rf, force push, broad permission changes.
- Sửa trực tiếp code ngay cả khi thấy lỗi rõ ràng. Hãy đưa proposed diff/thay đổi để người dùng tự áp dụng.

TRƯỚC KHI REVIEW, BẮT BUỘC LÀM PREFLIGHT:

1. Đọc instruction và governance hiện có:
   - `AGENTS.md`
   - `CLAUDE.md` nếu tồn tại
   - `.claude/settings.json` và `.claude/settings.local.json` nếu tồn tại
   - `.agents/` nếu có rule/skill chung cho agent
   - `.github/instructions/*.instructions.md` liên quan đến task
   - `.github/prompts/*.prompt.md` nếu task trùng với prompt có sẵn

2. Đọc command và skill liên quan:
   - Liệt kê `.claude/commands/*.md` nếu tồn tại.
   - Liệt kê `.claude/skills/**/SKILL.md` nếu tồn tại.
   - Liệt kê `.agents/skills/*/SKILL.md`.
   - Chọn và đọc skill phù hợp với task:
     - Setup nền tảng, Tailwind, Axios, cấu trúc `src/`: `frontend-foundation`
     - Tạo page/screen/route mới: `screen-delivery`
     - API/DTO/adapter/Axios/hook: `api-client-and-contracts`
     - Shared UI/component consistency: `shared-ui-patterns`
     - Chuyển HTML/Tailwind prototype sang React: `html-to-react-tailwind-conversion`
     - GitNexus exploring/impact/debugging/refactoring nếu có và task cần
     - Verify/handoff: `testing-and-verification`

3. Đọc tài liệu nền tảng:
   - `front-end/package.json`
   - `front-end/vite.config.ts`
   - `front-end/src/` để hiểu code hiện có
   - `DESIGN.md` nếu task chạm UI, Tailwind, layout, component, visual consistency
   - `test.html` nếu task liên quan storefront visual reference hoặc HTML conversion
   - `docs/ai/README.md`
   - `docs/ai/rule-index.md`
   - `docs/ai/skill-index.md`

4. Tham khảo GitNexus:
   - Đọc `.gitnexus/meta.json`.
   - Nếu MCP/resource có sẵn, đọc `gitnexus://repo/ginsengfood-FE/context`.
   - Dùng GitNexus query/context để tìm code liên quan khi review code.
   - Khi nhận xét về việc sửa symbol cũ, chạy impact analysis upstream nếu tool có sẵn và báo cáo risk/direct callers/affected processes.
   - Nếu index stale, báo cho người dùng và đề xuất `npx gitnexus analyze`; không tự chạy lệnh ghi vào `.gitnexus` trong read-only mode.

5. Kiểm tra repo state bằng lệnh chỉ đọc:
   - `git status --short`
   - `git diff -- <file>` nếu review thay đổi hiện có
   - `rg --files` hoặc lệnh đọc tương đương để định vị file cần đọc

KHI REVIEW, ÁP DỤNG PROJECT CONVENTION:

- App root là `front-end/`; chạy npm từ `front-end/`.
- Package manager là npm; không đề xuất yarn/pnpm.
- React functional components + TypeScript, không class component.
- Tailwind utility classes là chuẩn styling; không tạo CSS mới cho UI.
- UI phải theo Botanical Archive trong `DESIGN.md`: semantic tokens, crimson/gold/green/warm paper, không raw hex trong JSX, không default blue UI.
- API phải dùng Axios qua shared client; không dùng raw `fetch`.
- Không đoán backend contract. Nếu thiếu contract, DTO phải có TODO rõ ràng.
- Router chưa được giả định là có sẵn; kiểm tra dependency trước khi đề xuất route.
- Không nói có test script nếu `front-end/package.json` không có.
- Nếu task chạm endpoint/DTO/API contract, nêu backend repo cần cung cấp/cập nhật contract tương ứng.

KHI TRẢ LỜI, GIỮ OUTPUT GỌN:

- Không liệt kê mục `Đã tham khảo`, danh sách rule/config/docs/command/skill đã đọc, hoặc GitNexus query/context đã dùng, trừ khi người dùng hỏi rõ.
- Không mở đầu bằng báo cáo preflight dài. Chỉ nói ngắn `Đã preflight nội bộ` nếu thật cần thiết.
- Chỉ nêu repo context khi nó ảnh hưởng trực tiếp đến finding hoặc đề xuất.
- Tập trung vào kết quả review và hành động tiếp theo.

BẮT BUỘC CÓ CÁC MỤC:

1. `Review findings`
   - Ưu tiên bug, regression, sai API contract, sai folder/layer, UI lệch design system, thiếu state loading/error/empty/success, thiếu verify.
   - Sắp xếp theo mức độ nghiêm trọng.
   - Dẫn file path và line nếu có.

2. `Đề xuất sửa`
   - Đưa hướng sửa, file nên sửa, snippet/proposed diff nếu cần.
   - Không apply patch.

3. `Rủi ro và lưu ý`
   - Nêu backend repo cần cập nhật nếu task chạm endpoint/DTO/API contract.
   - Nêu GitNexus stale, impact HIGH/CRITICAL, thiếu context, dirty changes liên quan, hoặc blocker thật sự nếu có.
   - Bỏ qua mục này nếu không có rủi ro/lưu ý đáng kể.

4. `Kiểm tra đề xuất`
   - Đưa lệnh verify gần nhất để người dùng tự chạy:
     - `cd front-end && npm run lint`
     - `cd front-end && npm run build`
   - Nói rõ lệnh nào chưa chạy vì read-only mode.

Ngôn ngữ trả lời: tiếng Việt, ngắn gọn, có dẫn chứng file path cụ thể.
```

---

## 5. Prompt implementation cho Claude

Dùng prompt này khi muốn Claude đọc và được phép tạo/sửa file theo task.

```text
Bạn là Claude làm việc trong repo `D:\APU\project\ginsengfood-FE`.

CHẾ ĐỘ BẮT BUỘC: IMPLEMENTATION MODE WITH PREFLIGHT

Trong task này, bạn được phép:
- Đọc file, tìm kiếm, phân tích, tổng hợp thông tin.
- Tạo file mới hoặc sửa file hiện có khi điều đó cần thiết để hoàn thành task.
- Chạy lệnh verify phù hợp sau khi sửa, nếu lệnh đó được phép hoặc đã được người dùng chấp thuận.

Giới hạn bắt buộc:
- Chỉ sửa file nằm trong phạm vi task.
- Trước khi sửa file quan trọng, nói rõ sẽ sửa gì và vì sao.
- Không xóa file, rename lớn, install dependency, git add, git commit, git push, force push, git reset --hard, git clean -fd, rm -rf, broad permission changes nếu không được yêu cầu rõ.
- Không mass-rewrite sau khi chỉ đọc sơ sài.
- Không sửa backend trong repo này. Nếu cần endpoint/DTO/contract mới, flag backend repo cần cung cấp/cập nhật contract tương ứng.

TRƯỚC KHI IMPLEMENT, BẮT BUỘC LÀM PREFLIGHT:

1. Đọc instruction và governance hiện có:
   - `AGENTS.md`
   - `CLAUDE.md` nếu tồn tại
   - `.claude/settings.json` và `.claude/settings.local.json` nếu tồn tại
   - `.agents/` nếu có rule/skill chung cho agent
   - `.github/instructions/*.instructions.md` liên quan đến task
   - `.github/prompts/*.prompt.md` nếu task trùng với prompt có sẵn

2. Đọc command và skill liên quan:
   - Liệt kê `.claude/commands/*.md` nếu tồn tại.
   - Liệt kê `.claude/skills/**/SKILL.md` nếu tồn tại.
   - Liệt kê `.agents/skills/*/SKILL.md`.
   - Chọn và đọc skill phù hợp với task:
     - Setup nền tảng, Tailwind, Axios, cấu trúc `src/`: `frontend-foundation`
     - Tạo page/screen/route mới: `screen-delivery`
     - API/DTO/adapter/Axios/hook: `api-client-and-contracts`
     - Shared UI/component consistency: `shared-ui-patterns`
     - Chuyển HTML/Tailwind prototype sang React: `html-to-react-tailwind-conversion`
     - GitNexus exploring/impact/debugging/refactoring nếu có và task cần
     - Trước khi handoff: `testing-and-verification`

3. Đọc tài liệu nền tảng:
   - `front-end/package.json`
   - `front-end/vite.config.ts`
   - `front-end/src/` để hiểu code hiện có
   - Full content của bất kỳ file nào định sửa
   - `DESIGN.md` nếu task chạm UI, Tailwind, layout, component, visual consistency
   - `test.html` nếu task liên quan storefront visual reference hoặc HTML conversion
   - `docs/ai/README.md`
   - `docs/ai/rule-index.md`
   - `docs/ai/skill-index.md`

4. Tham khảo GitNexus:
   - Đọc `.gitnexus/meta.json`.
   - Nếu MCP/resource có sẵn, đọc `gitnexus://repo/ginsengfood-FE/context`.
   - Dùng GitNexus query/context để tìm code liên quan thay vì chỉ grep khi task liên quan code.
   - Trước khi sửa function/class/method/symbol cũ, chạy impact analysis upstream nếu tool có sẵn và báo cáo risk/direct callers/affected processes.
   - Nếu impact HIGH hoặc CRITICAL, cảnh báo người dùng trước khi sửa.
   - Nếu index stale, báo cho người dùng và đề xuất re-index.

5. Kiểm tra repo state:
   - `git status --short`
   - `rg --files` hoặc lệnh đọc tương đương để định vị file cần đọc
   - Nếu có file đang dirty không liên quan, không revert và không ghi đè

TRƯỚC KHI SỬA, TRẢ LỜI NGẮN GỌN:

- Không liệt kê rule/config/docs/command/skill đã đọc, hoặc GitNexus query/context đã dùng, trừ khi người dùng hỏi rõ.
- `Impact/risk`: chỉ nêu kết quả impact nếu có rủi ro đáng kể, index stale, hoặc tác vụ chạm symbol/shared flow quan trọng.
- `Sẽ sửa`: danh sách file và lý do.
- `Lưu ý`: chỉ nêu nếu có HIGH/CRITICAL impact, dirty changes xung đột, thiếu context, hoặc backend contract cần cập nhật.

KHI IMPLEMENT, ÁP DỤNG PROJECT CONVENTION:

- App root là `front-end/`; chạy npm từ `front-end/`.
- Package manager là npm; không dùng yarn/pnpm.
- React functional components + TypeScript, props/type rõ ràng, không `any`.
- Folder structure theo `AGENTS.md`: `src/app`, `src/features`, `src/shared`, `src/api`.
- Tổ chức theo business module trước; UI chia `storefront/` và `admin/` khi cần.
- Tailwind utility classes là chuẩn styling; không tạo CSS mới cho UI.
- UI phải theo Botanical Archive trong `DESIGN.md`: semantic tokens, no raw hex in JSX, no default blue UI, preserve `front-end/src/index.css` custom properties.
- API phải dùng Axios qua `src/api/client.ts`; không đặt Axios/raw request trực tiếp trong component.
- DTO nằm trong `src/api/dto/`, adapter nằm trong `src/api/adapters/`, service/hook tách khỏi JSX.
- Không đoán backend contract. Nếu thiếu contract, DTO placeholder phải có `// TODO: replace with real API contract when available`.
- Router chỉ dùng nếu dependency đã có hoặc task yêu cầu cài rõ ràng.
- Data-dependent UI cần loading, error, empty, success states.

SAU KHI SỬA, BẮT BUỘC:

- Chạy verify từ `front-end/`:
  - `npm run lint`
  - `npm run build`
- Chạy `git status --short` để tóm tắt file đã thay đổi.
- Nếu có API endpoint/DTO thay đổi, nhắc backend repo cần cung cấp/cập nhật contract.
- Nếu chuẩn bị commit, chạy GitNexus `detect_changes` trước commit.

KHI TRẢ LỜI SAU TASK, DÙNG FORMAT:

## Task Summary

### Files created or modified
- `path/to/file` — thay đổi gì và vì sao

### Verification
- `npm run lint`: PASSED / FAILED / SKIPPED kèm lý do
- `npm run build`: PASSED / FAILED / SKIPPED kèm lý do

### Assumptions made
- [ASSUMPTION] ...

### Deferred items
- [TODO] ...

Ngôn ngữ trả lời: tiếng Việt, ngắn gọn, có dẫn chứng file path cụ thể.
```

---

## 6. Ghi chú sử dụng

- Việc đọc rule/skill/docs/GitNexus là preflight nội bộ. Agent không cần liệt kê dài trong
  response, trừ khi người dùng hỏi rõ.
- Nếu chỉ muốn review, dùng prompt review-only. Đây là trường hợp duy nhất dùng Q2.
- Nếu muốn agent tạo/sửa code, dùng prompt implementation. Không dùng Q2 read-only; dùng
  Q2-EDIT để mở quyền edit có giới hạn.
- Với UI task, luôn yêu cầu đọc `DESIGN.md`; nếu task chuyển từ prototype, đọc thêm
  `test.html`.
- Với API/DTO/endpoint, luôn yêu cầu không đoán contract và nhắc backend repo cần cập nhật
  hoặc cung cấp contract tương ứng.
- Với task sửa symbol cũ, bắt buộc yêu cầu GitNexus impact analysis trước khi edit. Nếu
  HIGH/CRITICAL, agent phải cảnh báo trước khi tiếp tục.
- Với task hoàn tất implementation, verify chuẩn là `npm run lint` và `npm run build` từ
  thư mục `front-end/`; không tự tạo test script mới.
