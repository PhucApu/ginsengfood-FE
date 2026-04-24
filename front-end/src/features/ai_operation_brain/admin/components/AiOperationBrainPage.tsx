'use client';

import { useState } from 'react';

type TabId = 'intent' | 'sku' | 'content' | 'logs';

interface IntentRow {
  code: string;
  name: string;
  status: 'Active' | 'Draft';
  confidence: number;
  highlighted?: boolean;
}

const INTENT_ROWS: IntentRow[] = [
  { code: 'INQ_RED_GINSENG_INFO', name: 'Hỏi về Sâm đỏ', status: 'Active', confidence: 0.95 },
  { code: 'CNS_GOLDEN_HOUR', name: 'Tư vấn giờ vàng', status: 'Active', confidence: 0.88, highlighted: true },
  { code: 'CMP_SHIPPING_DELAY', name: 'Phàn nàn giao hàng chậm', status: 'Draft', confidence: 0.65 },
  { code: 'REQ_DOSAGE_GUIDE', name: 'Hỏi cách dùng/liều lượng', status: 'Active', confidence: 0.92 },
];

const TABS: { id: TabId; label: string; hasAlert?: boolean }[] = [
  { id: 'intent', label: 'Intent Registry' },
  { id: 'sku', label: 'SKU Rules' },
  { id: 'content', label: 'Content Blocks' },
  { id: 'logs', label: 'Decision Logs', hasAlert: true },
];

function ConfidenceBar({ value, status }: { value: number; status: 'Active' | 'Draft' }) {
  const barColor = status === 'Active' ? 'bg-tertiary' : 'bg-secondary';
  return (
    <div className="w-24 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full ${barColor}`}
        style={{ width: `${value * 100}%` }}
      />
    </div>
  );
}

function StatusBadge({ status }: { status: 'Active' | 'Draft' }) {
  if (status === 'Active') {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-tertiary-fixed text-on-tertiary-fixed">
        Active
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-surface-variant text-on-surface-variant">
      Draft
    </span>
  );
}

export default function AiOperationBrainPage() {
  const [activeTab, setActiveTab] = useState<TabId>('intent');

  return (
    <div className="p-8 lg:p-12">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-on-surface-variant font-body mb-6">
        <span>Admin</span>
        <span className="material-symbols-outlined text-base leading-none">chevron_right</span>
        <span className="text-on-surface font-medium">Bộ não vận hành AI</span>
      </nav>

      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-10">
        <div className="max-w-2xl">
          <h1 className="font-headline text-4xl lg:text-5xl font-bold text-primary tracking-tighter mb-3">
            Bộ não vận hành AI
            <span className="block text-lg lg:text-xl font-normal text-on-surface-variant mt-1 tracking-normal">
              AI Operating Brain
            </span>
          </h1>
          <p className="text-on-surface-variant font-body">
            Quản lý toàn bộ logic, intent, quy tắc SKU và khối nội dung điều phối hệ thống AI vận hành — mọi quyết định đều có thể trace và override.
          </p>
        </div>

        {/* Action bar */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-outline-variant text-on-surface font-body text-sm font-medium hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-base leading-none">add_circle</span>
            Tạo intent
          </button>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-outline-variant text-on-surface font-body text-sm font-medium hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-base leading-none">rule_settings</span>
            Tạo rule
          </button>
          <button
            type="button"
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-br from-primary to-primary-container text-on-primary font-body text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
          >
            <span className="material-symbols-outlined text-base leading-none">publish</span>
            Publish
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Card 1 */}
        <div className="bg-surface-container-lowest rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2 rounded-xl bg-tertiary-fixed/30">
              <span className="material-symbols-outlined text-2xl text-on-tertiary-fixed">neurology</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-on-surface font-headline tracking-tight mb-1">128</div>
          <div className="text-sm text-on-surface-variant font-body mb-3">Tổng số Intent</div>
          <div className="flex items-center gap-1 text-xs text-tertiary font-medium">
            <span className="material-symbols-outlined text-base leading-none">trending_up</span>
            +12 tuần này
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-surface-container-lowest rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2 rounded-xl bg-primary-fixed/30">
              <span className="material-symbols-outlined text-2xl text-on-primary-fixed">rule</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-on-surface font-headline tracking-tight mb-1">45/52</div>
          <div className="text-sm text-on-surface-variant font-body mb-3">Quy tắc SKU hoạt động</div>
          <div className="flex items-center gap-1 text-xs text-primary font-medium">
            <span className="material-symbols-outlined text-base leading-none">speed</span>
            86.5% coverage
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-surface-container-lowest rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2 rounded-xl bg-secondary-container/30">
              <span className="material-symbols-outlined text-2xl text-on-secondary-container">article</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-on-surface font-headline tracking-tight mb-1">312</div>
          <div className="text-sm text-on-surface-variant font-body mb-3">Khối nội dung</div>
          <div className="flex items-center gap-1 text-xs text-tertiary font-medium">
            <span className="material-symbols-outlined text-base leading-none">update</span>
            Đã đồng bộ
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-surface-container-lowest rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2 rounded-xl bg-tertiary-fixed/30">
              <span className="material-symbols-outlined text-2xl text-on-tertiary-fixed">verified</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-on-surface font-headline tracking-tight mb-1">94.2%</div>
          <div className="text-sm text-on-surface-variant font-body mb-3">Độ chính xác quyết định</div>
          <div className="flex items-center gap-1 text-xs text-primary font-medium">
            <span className="material-symbols-outlined text-base leading-none">warning</span>
            Cần review 12 ca
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex gap-8">
        {/* Tabs + Table panel */}
        <div className="flex-1 bg-surface-container-low rounded-2xl overflow-hidden min-w-0">
          {/* Tab bar */}
          <div className="bg-surface border-b border-outline-variant/20 px-2">
            <div className="flex space-x-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-1.5 px-4 py-3.5 text-sm font-medium font-body transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {tab.label}
                  {tab.hasAlert && (
                    <span className="w-1.5 h-1.5 rounded-full bg-error inline-block" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="overflow-x-auto">
            {activeTab === 'intent' && (
              <table className="w-full text-left font-body text-sm whitespace-nowrap">
                <thead>
                  <tr className="border-b border-outline-variant/20">
                    <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                      Mã Intent
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                      Tên Intent
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                      Độ tin cậy
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {INTENT_ROWS.map((row) => (
                    <tr
                      key={row.code}
                      className={`border-b border-outline-variant/10 hover:bg-surface-container-low/50 cursor-pointer transition-colors ${
                        row.highlighted ? 'bg-surface-container/30' : ''
                      }`}
                    >
                      <td className="px-6 py-4 font-mono text-xs text-primary">{row.code}</td>
                      <td className="px-6 py-4 text-on-surface">{row.name}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={row.status} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <ConfidenceBar value={row.confidence} status={row.status} />
                          <span className="text-xs text-on-surface-variant font-mono">
                            {row.confidence.toFixed(2)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          className="p-1.5 rounded-lg hover:bg-surface-container transition-colors text-on-surface-variant hover:text-on-surface"
                          aria-label={`Edit ${row.code}`}
                        >
                          <span className="material-symbols-outlined text-base leading-none">edit</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'sku' && (
              <div className="p-8 text-center text-on-surface-variant font-body text-sm">
                <span className="material-symbols-outlined text-3xl mb-2 block">rule</span>
                SKU Rules — nội dung đang được tải.
              </div>
            )}

            {activeTab === 'content' && (
              <div className="p-8 text-center text-on-surface-variant font-body text-sm">
                <span className="material-symbols-outlined text-3xl mb-2 block">article</span>
                Content Blocks — nội dung đang được tải.
              </div>
            )}

            {activeTab === 'logs' && (
              <div className="p-8 text-center text-on-surface-variant font-body text-sm">
                <span className="material-symbols-outlined text-3xl mb-2 block">history</span>
                Decision Logs — nội dung đang được tải.
              </div>
            )}
          </div>
        </div>

        {/* Explainability Drawer */}
        <div className="w-96 bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20 shadow-lg shrink-0">
          {/* Drawer header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-xl text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                psychology
              </span>
              <h3 className="font-headline font-semibold text-on-surface text-base">Logic Trace</h3>
            </div>
            <button
              type="button"
              className="p-1.5 rounded-lg hover:bg-surface-container transition-colors text-on-surface-variant"
              aria-label="Close logic trace"
            >
              <span className="material-symbols-outlined text-base leading-none">close</span>
            </button>
          </div>

          {/* Input context */}
          <div className="bg-surface-container rounded-xl p-4 mb-6 border-l-4 border-primary/40">
            <p className="text-xs text-on-surface-variant font-body mb-1.5">
              Session #A81B · Input context
            </p>
            <p className="text-sm text-on-surface font-body italic leading-relaxed">
              &quot;Tôi muốn mua sâm vào giờ vàng hôm nay, có ưu đãi gì không?&quot;
            </p>
          </div>

          {/* Logic steps */}
          <div className="space-y-0">
            {/* Step 1: Intent Extraction */}
            <div className="relative pl-6 before:content-[''] before:absolute before:left-2 before:top-4 before:bottom-[-20px] before:w-0.5 before:bg-outline-variant/40">
              <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-tertiary-container flex items-center justify-center z-10">
                <div className="w-2 h-2 rounded-full bg-tertiary" />
              </div>
              <div className="pb-6">
                <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-3">
                  Bước 1 — Intent Extraction
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-surface-container rounded-lg px-3 py-2">
                    <span className="font-mono text-xs text-primary">CNS_GOLDEN_HOUR</span>
                    <span className="text-xs font-medium text-tertiary">0.88</span>
                  </div>
                  <div className="flex items-center justify-between bg-surface-container rounded-lg px-3 py-2">
                    <span className="font-mono text-xs text-on-surface-variant">INQ_RED_GINSENG_INFO</span>
                    <span className="text-xs font-medium text-on-surface-variant">0.72</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Entity Recognition */}
            <div className="relative pl-6 before:content-[''] before:absolute before:left-2 before:top-4 before:bottom-[-20px] before:w-0.5 before:bg-outline-variant/40">
              <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-tertiary-container flex items-center justify-center z-10">
                <div className="w-2 h-2 rounded-full bg-tertiary" />
              </div>
              <div className="pb-6">
                <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-3">
                  Bước 2 — Entity Recognition
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-fixed/30 text-on-primary-fixed text-xs font-medium">
                    <span className="font-semibold">Target:</span> Sâm đỏ Ngọc Linh
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container text-xs font-medium">
                    <span className="font-semibold">Symptom:</span> mua / giờ vàng
                  </span>
                </div>
              </div>
            </div>

            {/* Step 3: Rule Activation (active — no before connector) */}
            <div className="relative pl-6">
              <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center z-10 shadow-[0_0_0_4px_rgba(255,218,214,0.5)]">
                <div className="w-2 h-2 rounded-full bg-on-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                  Bước 3 — Rule Activation &amp; Payload
                </p>
                <div className="bg-surface-container rounded-xl p-4 border border-outline-variant/20">
                  <p className="font-mono text-xs text-tertiary mb-2">RULE: GH_DISCOUNT_STACKING</p>
                  <div className="space-y-1 font-mono text-xs text-on-surface-variant">
                    <p>
                      <span className="text-primary">condition:</span>{' '}
                      <span className="text-secondary">is_golden_hour</span> == true
                    </p>
                    <p>
                      <span className="text-primary">action:</span> apply_tier_discount
                    </p>
                    <p>
                      <span className="text-primary">payload:</span> {'{'} discount: <span className="text-tertiary">15%</span>, sku: <span className="text-tertiary">&quot;SAM-NG-001&quot;</span> {'}'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Drawer footer */}
          <div className="flex gap-3 mt-6 pt-5 border-t border-outline-variant/20">
            <button
              type="button"
              className="flex-1 py-2 rounded-xl border border-outline-variant text-on-surface font-body text-sm font-medium hover:bg-surface-container transition-colors"
            >
              View Full JSON
            </button>
            <button
              type="button"
              className="flex-1 py-2 rounded-xl bg-secondary text-on-secondary font-body text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Force Override
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
