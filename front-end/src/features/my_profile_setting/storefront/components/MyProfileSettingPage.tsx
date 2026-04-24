'use client';

import { useState } from 'react';
import AccountSidebar from '@/features/account/storefront/components/AccountSidebar';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProfileFormData {
  fullName: string;
  phone: string;
  dob: string;
}

interface Address {
  id: string;
  label: string;
  isDefault: boolean;
  name: string;
  phone: string;
  line1: string;
  line2: string;
  canDelete: boolean;
  canSetDefault: boolean;
}

interface ConsentItem {
  id: string;
  title: string;
  description: string;
}

// ─── Static Data ─────────────────────────────────────────────────────────────

const INITIAL_FORM: ProfileFormData = {
  fullName: 'Nguyễn Văn A',
  phone: '0901234567',
  dob: '1990-01-01',
};

const EMAIL_READONLY = 'nguyenvana@example.com';

const ADDRESSES: Address[] = [
  {
    id: 'home',
    label: 'Nhà riêng',
    isDefault: true,
    name: 'Nguyễn Văn A',
    phone: '0901234567',
    line1: '123 Đường Lê Lợi, Phường Bến Nghé',
    line2: 'Quận 1, TP. Hồ Chí Minh',
    canDelete: false,
    canSetDefault: false,
  },
  {
    id: 'office',
    label: 'Công ty',
    isDefault: false,
    name: 'Nguyễn Văn A',
    phone: '0901234567',
    line1: 'Tòa nhà Bitexco, 2 Hải Triều, Phường Bến Nghé',
    line2: 'Quận 1, TP. Hồ Chí Minh',
    canDelete: true,
    canSetDefault: true,
  },
];

const CONSENT_ITEMS: ConsentItem[] = [
  {
    id: 'email',
    title: 'Email Newsletter',
    description: 'Weekly insights, new arrivals, and editorial content.',
  },
  {
    id: 'sms',
    title: 'SMS Notifications',
    description: 'Order tracking and urgent account updates.',
  },
  {
    id: 'zalo',
    title: 'Zalo Updates',
    description: 'Receive promotions and support via Zalo.',
  },
];

// ─── Shared Styles ────────────────────────────────────────────────────────────

// Matches source `.input-minimal`: transparent bg, bottom-border only, focus upgrades to 2px secondary
const INPUT_BASE =
  'border-b border-[#dfbfbc] rounded-none bg-transparent px-0 py-2 w-full text-lg focus:outline-none focus:border-b-2 focus:border-[#735b2b] placeholder:text-[#8b716e]';

// ─── Component ────────────────────────────────────────────────────────────────

export default function MyProfileSettingPage() {
  const [formData, setFormData] = useState<ProfileFormData>(INITIAL_FORM);
  const [consent, setConsent] = useState<Record<string, boolean>>({
    email: true,
    sms: true,
    zalo: false,
  });

  function handleFieldChange(field: keyof ProfileFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleConsentChange(id: string) {
    setConsent((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full px-4 md:px-8 py-10 flex flex-col md:flex-row gap-12 flex-grow">
      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <AccountSidebar activeItem="profile" />

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <div className="flex-grow max-w-4xl flex flex-col gap-16">

        {/* Page Header */}
        <header>
          <h1 className="font-headline text-5xl md:text-6xl text-primary tracking-tight mb-4">
            Account Profile
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl">
            Manage your personal details, shipping destinations, and communication preferences
            to tailor your Heritage experience.
          </p>
        </header>

        {/* ── 1. Thông tin cá nhân ────────────────────────────────────────── */}
        <section className="bg-surface-container-lowest rounded-xl p-8 md:p-10 shadow-[0_8px_40px_-12px_rgba(27,28,26,0.06)] relative overflow-hidden">
          {/* Decorative blob */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-container rounded-bl-full opacity-20 pointer-events-none" />

          <h2 className="font-headline text-3xl text-primary mb-8 relative z-10">
            Thông tin cá nhân
          </h2>

          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 relative z-10"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Họ và Tên */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Họ và Tên
              </label>
              <input
                type="text"
                className={`${INPUT_BASE} text-on-surface`}
                placeholder="Nhập họ và tên"
                value={formData.fullName}
                onChange={(e) => handleFieldChange('fullName', e.target.value)}
              />
            </div>

            {/* Email (readonly) */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                className={`${INPUT_BASE} text-on-surface-variant cursor-default`}
                value={EMAIL_READONLY}
                readOnly
              />
              <p className="text-xs text-[#8b716e] mt-1">Email không thể thay đổi</p>
            </div>

            {/* Số điện thoại */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Số điện thoại
              </label>
              <input
                type="tel"
                className={`${INPUT_BASE} text-on-surface`}
                placeholder="Nhập số điện thoại"
                value={formData.phone}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
              />
            </div>

            {/* Ngày sinh */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Ngày sinh
              </label>
              <input
                type="date"
                className={`${INPUT_BASE} text-on-surface-variant`}
                value={formData.dob}
                onChange={(e) => handleFieldChange('dob', e.target.value)}
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2 pt-6">
              <button
                type="button"
                className="btn-primary px-8 py-3 font-medium hover:opacity-90 transition-opacity"
              >
                Lưu Thay Đổi
              </button>
            </div>
          </form>
        </section>

        {/* ── 2. Địa chỉ nhận hàng ────────────────────────────────────────── */}
        <section className="bg-surface-container-low rounded-xl p-8 md:p-10">
          <div className="flex justify-between items-end mb-8 border-b border-[#dfbfbc]/20 pb-4">
            <h2 className="font-headline text-3xl text-primary">Địa chỉ nhận hàng</h2>
            <button
              type="button"
              className="text-secondary font-semibold hover:text-primary transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              Thêm địa chỉ
            </button>
          </div>

          <div className="space-y-6">
            {ADDRESSES.map((addr) => (
              <div
                key={addr.id}
                className={`bg-surface-container-lowest p-6 rounded-xl relative${
                  !addr.isDefault
                    ? ' border border-transparent hover:border-[#dfbfbc]/30 transition-colors'
                    : ''
                }`}
              >
                {/* Action buttons */}
                <div className="absolute top-6 right-6 flex gap-4">
                  <button
                    type="button"
                    aria-label="Edit"
                    className="text-on-surface-variant hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                  </button>
                  {addr.canDelete && (
                    <button
                      type="button"
                      aria-label="Delete"
                      className="text-[#8b716e] hover:text-[#ba1a1a] transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  )}
                </div>

                <div className={addr.canDelete ? 'pr-20' : 'pr-16'}>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-on-surface">{addr.label}</h3>
                    {addr.isDefault && (
                      <span className="bg-secondary-container text-on-secondary-container text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider">
                        Mặc định
                      </span>
                    )}
                  </div>
                  <p className="text-on-surface-variant leading-relaxed">
                    {addr.name} - {addr.phone}
                  </p>
                  <p className="text-on-surface-variant leading-relaxed mt-1">
                    {addr.line1}
                    <br />
                    {addr.line2}
                  </p>
                  {addr.canSetDefault && (
                    <button
                      type="button"
                      className="mt-4 text-sm text-secondary hover:text-primary transition-colors underline decoration-[#735b2b]/30 underline-offset-4"
                    >
                      Đặt làm mặc định
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. Kênh liên lạc & Quyền riêng tư ─────────────────────────── */}
        <section className="bg-surface-container-lowest rounded-xl p-8 md:p-10 shadow-[0_8px_40px_-12px_rgba(27,28,26,0.06)]">
          <div className="mb-8 max-w-xl">
            <h2 className="font-headline text-3xl text-primary mb-3">
              Kênh liên lạc &amp; Quyền riêng tư
            </h2>
            <p className="text-on-surface-variant">
              Manage how we communicate with you regarding exclusive offers, rituals, and order
              updates.
            </p>
          </div>

          <div className="space-y-6">
            {CONSENT_ITEMS.map((item, idx) => (
              <div
                key={item.id}
                className={`flex items-center justify-between py-4${
                  idx < CONSENT_ITEMS.length - 1 ? ' border-b border-[#eae8e4]/50' : ''
                }`}
              >
                <div>
                  <h4 className="text-lg font-medium text-on-surface">{item.title}</h4>
                  <p className="text-sm text-on-surface-variant mt-1">{item.description}</p>
                </div>

                {/* Toggle switch — mirrors source .toggle-checkbox/.toggle-circle behavior */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={consent[item.id]}
                  onClick={() => handleConsentChange(item.id)}
                  className={`relative inline-block w-12 h-6 rounded-full transition-colors duration-300 cursor-pointer select-none shrink-0 ml-8${
                    consent[item.id] ? ' bg-[#570005]' : ' bg-[#e4e2de]'
                  }`}
                >
                  <span
                    className={`absolute w-5 h-5 bg-white rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-all duration-300 top-1/2 -translate-y-1/2${
                      consent[item.id] ? ' left-[26px]' : ' left-[2px]'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. Thông tin ngân hàng (Diamond Tier) ──────────────────────── */}
        <section className="bg-tertiary-container text-on-tertiary rounded-xl p-8 md:p-12 relative overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-tertiary-fixed-dim opacity-10 blur-3xl pointer-events-none" />
          <div className="absolute left-10 bottom-0 w-40 h-40 rounded-full bg-primary-container opacity-20 blur-2xl pointer-events-none" />

          {/* Section header */}
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-surface/10 rounded-full">
                <span className="material-symbols-outlined text-[16px] text-secondary-fixed">
                  diamond
                </span>
                <span className="text-xs uppercase tracking-widest text-secondary-fixed font-bold">
                  Diamond Tier Exclusive
                </span>
              </div>
              <h2 className="font-headline text-3xl text-white">Thông tin ngân hàng</h2>
              <p className="text-tertiary-fixed mt-2">
                Manage your saved payment methods for seamless checkout.
              </p>
            </div>
            <span className="material-symbols-outlined text-6xl text-white/20">
              account_balance
            </span>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {/* Existing bank card */}
            <div className="bg-surface/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-8 bg-white/20 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-white">VCB</span>
                </div>
                <button
                  type="button"
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">more_vert</span>
                </button>
              </div>
              <p className="font-mono text-lg text-white/90 tracking-widest mb-2">
                **** **** **** 4589
              </p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] uppercase text-white/50 tracking-wider">
                    Cardholder Name
                  </p>
                  <p className="text-sm text-white font-medium">NGUYEN VAN A</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase text-white/50 tracking-wider">Expires</p>
                  <p className="text-sm text-white font-medium">12/28</p>
                </div>
              </div>
            </div>

            {/* Add new card */}
            <button
              type="button"
              className="bg-transparent border-2 border-dashed border-white/20 rounded-xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-white/5 hover:border-white/40 transition-all group h-full min-h-[160px]"
            >
              <span className="material-symbols-outlined text-3xl text-white/50 group-hover:text-white transition-colors">
                add_circle
              </span>
              <span className="text-white/70 font-medium group-hover:text-white transition-colors">
                Thêm tài khoản / thẻ
              </span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
