'use client';

import { useState } from 'react';
import Image from 'next/image';

// ─── Types ───────────────────────────────────────────────────────────────────

type AddressOption = 'home' | 'office';
type PaymentOption = 'cod' | 'bank' | 'card';

interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
}

interface OrderItem {
  id: string;
  name: string;
  variant: string;
  price: string;
  qty: number;
  imageUrl: string;
  imageAlt: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────
// TODO: replace with real API contract when available

const orderItems: OrderItem[] = [
  {
    id: '1',
    name: 'Hồng Sâm Củ Khô Hàn Quốc Cao Cấp (Hộp Gỗ)',
    variant: '300g',
    price: '4,500,000₫',
    qty: 1,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAOjDOUKOeJz1pStjmheCSHxFcEEUUWYbD0VmN-QCrv2oIg2_6Vn-LIS_zjz4tRgDoKqnRvkUFwgr3zzxPrV65x6YF__tXI6893yNvRQKu00_4I4SRd8s6l1QDFe8tyupVmpcFZFRkVvlgg_nn3vEbWGeHDYN-y-a9W-BB5BUAIgdw4YSk_Pg5JqUF0W8yWhH1GsN0U08zJwfRVngyNcAzxq2r7dVWu1H26Qog89XbPouXLCAHSLjD9rV8tet73HhYESvRybWKPPyI',
    imageAlt: 'close-up of premium red ginseng extract bottle on dark moody background with soft lighting',
  },
  {
    id: '2',
    name: 'Trà Nhân Sâm Hoàng Gia Thái Lát',
    variant: 'Hộp 50 gói',
    price: '1,200,000₫',
    qty: 2,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA8WBg5ZTiXljBcsJrXGgnkQAlp58lMyTqdwmbankXj_VXV7SonArtSF8IY2UKI5tD-VtFzx0d5kiMciarUkqBi0Z355hP4awkKV5CS38lPSCYMUOvc8xdaZdAG1xsAc7O93hmi9M4psZbDPzyYKqV6u302L5jJg5294x2mUIASjtPBIE5nvQL7s7gjkyEFg8IB3JkzsO-dpEkkuGc-iwCjuAk6pf58q0IUDf6InrDUonoHcmQ6sPR4ITIdUTt_rDPWk0--ZjL2F7c',
    imageAlt: 'elegant box of ginseng tea bags on a wooden surface with soft natural light',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const [selectedAddress, setSelectedAddress] = useState<AddressOption>('home');
  const [selectedPayment, setSelectedPayment] = useState<PaymentOption>('cod');
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: '',
    email: '',
    phone: '',
  });

  const handleCustomerInfoChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="pt-8 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen flex flex-col lg:flex-row gap-16">
      {/* ── Left Column: Forms ── */}
      <div className="flex-1 flex flex-col gap-12">

        {/* Progress Stepper */}
        <nav aria-label="Progress">
          <ol className="flex items-center" role="list">
            {/* Step 1: Completed */}
            <li className="relative pr-8 sm:pr-20">
              <div aria-hidden="true" className="absolute inset-0 flex items-center">
                <div className="h-0.5 w-full bg-[#7b1113]" />
              </div>
              <a
                href="#"
                className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#7b1113] hover:bg-[#570005] transition-colors"
              >
                <span className="material-symbols-outlined text-white text-sm">check</span>
              </a>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-label font-semibold text-[#7b1113] whitespace-nowrap">
                Thông tin
              </span>
            </li>

            {/* Step 2: Current */}
            <li className="relative pr-8 sm:pr-20">
              <div aria-hidden="true" className="absolute inset-0 flex items-center">
                <div className="h-0.5 w-full bg-[#eae8e4]" />
              </div>
              <a
                href="#"
                aria-current="step"
                className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#fbf9f5] border-2 border-[#7b1113]"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-[#7b1113]" />
              </a>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-label font-bold text-[#1b1c1a] whitespace-nowrap">
                Giao hàng
              </span>
            </li>

            {/* Step 3: Upcoming */}
            <li className="relative">
              <div aria-hidden="true" className="absolute inset-0 flex items-center">
                <div className="h-0.5 w-full bg-[#eae8e4]" />
              </div>
              <a
                href="#"
                className="group relative flex h-8 w-8 items-center justify-center rounded-full bg-[#fbf9f5] border-2 border-[#dfbfbc] hover:border-[#8b716e] transition-colors"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-[#dfbfbc] transition-colors" />
              </a>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-label text-[#58413f] whitespace-nowrap">
                Thanh toán
              </span>
            </li>
          </ol>
        </nav>

        <div className="flex flex-col gap-10 mt-8">

          {/* Section: Thông tin khách hàng */}
          <section className="bg-white rounded-xl p-8 lg:p-10">
            <h2 className="font-headline text-2xl text-[#1b1c1a] mb-8">Thông tin khách hàng</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="sr-only" htmlFor="fullName">Họ và tên</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={customerInfo.fullName}
                  onChange={(e) => handleCustomerInfoChange('fullName', e.target.value)}
                  placeholder="Họ và tên"
                  className="w-full bg-transparent border-0 border-b border-[#dfbfbc]/40 focus:border-[#735b2b] focus:border-b-2 focus:ring-0 px-0 py-3 text-[#1b1c1a] placeholder:text-[#58413f] transition-all outline-none"
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                  placeholder="Email"
                  className="w-full bg-transparent border-0 border-b border-[#dfbfbc]/40 focus:border-[#735b2b] focus:border-b-2 focus:ring-0 px-0 py-3 text-[#1b1c1a] placeholder:text-[#58413f] transition-all outline-none"
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="phone">Số điện thoại</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
                  placeholder="Số điện thoại"
                  className="w-full bg-transparent border-0 border-b border-[#dfbfbc]/40 focus:border-[#735b2b] focus:border-b-2 focus:ring-0 px-0 py-3 text-[#1b1c1a] placeholder:text-[#58413f] transition-all outline-none"
                />
              </div>
            </div>
          </section>

          {/* Section: Địa chỉ giao hàng */}
          <section className="bg-white rounded-xl p-8 lg:p-10">
            <div className="flex justify-between items-end mb-8">
              <h2 className="font-headline text-2xl text-[#1b1c1a]">Địa chỉ giao hàng</h2>
              <button
                type="button"
                className="text-[#735b2b] font-label text-sm uppercase tracking-wide hover:text-[#570005] transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-lg">add</span>
                Thêm địa chỉ
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {/* Address 1: Home */}
              <label
                className={`relative flex cursor-pointer rounded-xl p-5 transition-colors ${
                  selectedAddress === 'home'
                    ? 'bg-[#f5f3ef]'
                    : 'bg-white border border-[#dfbfbc]/40 hover:bg-[#f5f3ef]/50'
                }`}
              >
                <input
                  className="peer sr-only"
                  name="address"
                  type="radio"
                  value="home"
                  checked={selectedAddress === 'home'}
                  onChange={() => setSelectedAddress('home')}
                />
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <span className="block text-sm font-medium text-[#1b1c1a]">Nhà riêng</span>
                    <span className="mt-1 flex items-center text-sm text-[#58413f]">
                      123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh
                    </span>
                  </span>
                </span>
                <span
                  className="material-symbols-outlined text-[#735b2b] transition-opacity"
                  style={{
                    fontVariationSettings: "'FILL' 1",
                    opacity: selectedAddress === 'home' ? 1 : 0,
                  }}
                >
                  radio_button_checked
                </span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-px rounded-xl border-2 transition-colors"
                  style={{ borderColor: selectedAddress === 'home' ? '#735b2b' : 'transparent' }}
                />
              </label>

              {/* Address 2: Office */}
              <label
                className={`relative flex cursor-pointer rounded-xl p-5 transition-colors ${
                  selectedAddress === 'office'
                    ? 'bg-[#f5f3ef]'
                    : 'bg-white border border-[#dfbfbc]/40 hover:bg-[#f5f3ef]/50'
                }`}
              >
                <input
                  className="peer sr-only"
                  name="address"
                  type="radio"
                  value="office"
                  checked={selectedAddress === 'office'}
                  onChange={() => setSelectedAddress('office')}
                />
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <span className="block text-sm font-medium text-[#1b1c1a]">Văn phòng</span>
                    <span className="mt-1 flex items-center text-sm text-[#58413f]">
                      Tòa nhà Bitexco, Số 2 Hải Triều, Quận 1, TP. Hồ Chí Minh
                    </span>
                  </span>
                </span>
                <span
                  className="material-symbols-outlined text-[#58413f] transition-opacity"
                  style={{ opacity: selectedAddress === 'office' ? 0 : 1 }}
                >
                  radio_button_unchecked
                </span>
                <span
                  className="material-symbols-outlined text-[#735b2b] absolute right-5 transition-opacity"
                  style={{
                    fontVariationSettings: "'FILL' 1",
                    opacity: selectedAddress === 'office' ? 1 : 0,
                  }}
                >
                  radio_button_checked
                </span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-px rounded-xl border-2 transition-colors"
                  style={{ borderColor: selectedAddress === 'office' ? '#735b2b' : 'transparent' }}
                />
              </label>
            </div>
          </section>

          {/* Section: Phương thức thanh toán */}
          <section className="bg-white rounded-xl p-8 lg:p-10">
            <h2 className="font-headline text-2xl text-[#1b1c1a] mb-8">Phương thức thanh toán</h2>
            <div className="flex flex-col gap-4">
              {/* COD */}
              <label
                className={`relative flex cursor-pointer rounded-xl p-5 transition-colors ${
                  selectedPayment === 'cod'
                    ? 'bg-[#f5f3ef]'
                    : 'bg-white border border-[#dfbfbc]/40 hover:bg-[#f5f3ef]/50'
                }`}
              >
                <input
                  className="peer sr-only"
                  name="payment"
                  type="radio"
                  value="cod"
                  checked={selectedPayment === 'cod'}
                  onChange={() => setSelectedPayment('cod')}
                />
                <span className="flex items-center flex-1 gap-4">
                  <span className="material-symbols-outlined text-[#0b2d17] text-2xl">local_shipping</span>
                  <span className="flex flex-col">
                    <span className="block text-sm font-medium text-[#1b1c1a]">
                      Thanh toán khi nhận hàng (COD)
                    </span>
                  </span>
                </span>
                <span
                  className="material-symbols-outlined text-[#735b2b] transition-opacity"
                  style={{
                    fontVariationSettings: "'FILL' 1",
                    opacity: selectedPayment === 'cod' ? 1 : 0,
                  }}
                >
                  radio_button_checked
                </span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-px rounded-xl border-2 transition-colors"
                  style={{ borderColor: selectedPayment === 'cod' ? '#735b2b' : 'transparent' }}
                />
              </label>

              {/* Bank Transfer */}
              <label
                className={`relative flex cursor-pointer rounded-xl p-5 transition-colors ${
                  selectedPayment === 'bank'
                    ? 'bg-[#f5f3ef]'
                    : 'bg-white border border-[#dfbfbc]/40 hover:bg-[#f5f3ef]/50'
                }`}
              >
                <input
                  className="peer sr-only"
                  name="payment"
                  type="radio"
                  value="bank"
                  checked={selectedPayment === 'bank'}
                  onChange={() => setSelectedPayment('bank')}
                />
                <span className="flex items-center flex-1 gap-4">
                  <span className="material-symbols-outlined text-[#0b2d17] text-2xl">account_balance</span>
                  <span className="flex flex-col">
                    <span className="block text-sm font-medium text-[#1b1c1a]">
                      Chuyển khoản ngân hàng
                    </span>
                  </span>
                </span>
                <span
                  className="material-symbols-outlined text-[#58413f] transition-opacity"
                  style={{ opacity: selectedPayment === 'bank' ? 0 : 1 }}
                >
                  radio_button_unchecked
                </span>
                <span
                  className="material-symbols-outlined text-[#735b2b] absolute right-5 transition-opacity"
                  style={{
                    fontVariationSettings: "'FILL' 1",
                    opacity: selectedPayment === 'bank' ? 1 : 0,
                  }}
                >
                  radio_button_checked
                </span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-px rounded-xl border-2 transition-colors"
                  style={{ borderColor: selectedPayment === 'bank' ? '#735b2b' : 'transparent' }}
                />
              </label>

              {/* Credit Card */}
              <label
                className={`relative flex cursor-pointer rounded-xl p-5 transition-colors ${
                  selectedPayment === 'card'
                    ? 'bg-[#f5f3ef]'
                    : 'bg-white border border-[#dfbfbc]/40 hover:bg-[#f5f3ef]/50'
                }`}
              >
                <input
                  className="peer sr-only"
                  name="payment"
                  type="radio"
                  value="card"
                  checked={selectedPayment === 'card'}
                  onChange={() => setSelectedPayment('card')}
                />
                <span className="flex items-center flex-1 gap-4">
                  <span className="material-symbols-outlined text-[#0b2d17] text-2xl">credit_card</span>
                  <span className="flex flex-col">
                    <span className="block text-sm font-medium text-[#1b1c1a]">
                      Thẻ tín dụng / Ghi nợ
                    </span>
                  </span>
                </span>
                <span
                  className="material-symbols-outlined text-[#58413f] transition-opacity"
                  style={{ opacity: selectedPayment === 'card' ? 0 : 1 }}
                >
                  radio_button_unchecked
                </span>
                <span
                  className="material-symbols-outlined text-[#735b2b] absolute right-5 transition-opacity"
                  style={{
                    fontVariationSettings: "'FILL' 1",
                    opacity: selectedPayment === 'card' ? 1 : 0,
                  }}
                >
                  radio_button_checked
                </span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-px rounded-xl border-2 transition-colors"
                  style={{ borderColor: selectedPayment === 'card' ? '#735b2b' : 'transparent' }}
                />
              </label>
            </div>
          </section>
        </div>
      </div>

      {/* ── Right Column: Sticky Summary ── */}
      <aside className="w-full lg:w-[400px] xl:w-[480px]">
        <div className="sticky top-32 bg-white rounded-xl p-8 lg:p-10 shadow-[0_8px_40px_rgba(27,28,26,0.06)]">
          <h2 className="font-headline text-2xl text-[#1b1c1a] mb-8">Tóm tắt đơn hàng</h2>

          {/* Items */}
          <div className="flex flex-col gap-6 mb-8">
            {orderItems.map((item) => (
              <div key={item.id} className="flex gap-4 items-center">
                <div className="w-20 h-20 rounded-lg bg-[#f5f3ef] overflow-hidden relative flex-shrink-0">
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                  <span className="absolute -top-2 -right-2 bg-[#735b2b] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center z-10 border-2 border-white">
                    {item.qty}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-[#1b1c1a] line-clamp-2">{item.name}</h3>
                  <p className="text-sm text-[#58413f] mt-1">{item.variant}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#1b1c1a]">{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Breakdown */}
          <div className="pt-6 border-t border-[#dfbfbc]/20 flex flex-col gap-3">
            <div className="flex justify-between text-sm text-[#58413f]">
              <span>Tạm tính</span>
              <span className="font-medium text-[#1b1c1a]">5,700,000₫</span>
            </div>
            <div className="flex justify-between text-sm text-[#735b2b]">
              <span>Giảm giá (Mã: HERITAGE10)</span>
              <span className="font-medium">-570,000₫</span>
            </div>
            <div className="flex justify-between text-sm text-[#58413f]">
              <span>Phí vận chuyển</span>
              <span className="font-medium text-[#1b1c1a]">Miễn phí</span>
            </div>
          </div>

          {/* Total */}
          <div className="pt-6 mt-6 border-t border-[#dfbfbc]/20 flex justify-between items-end">
            <span className="font-headline text-lg text-[#1b1c1a]">Tổng cộng</span>
            <div className="text-right">
              <span className="text-xs text-[#58413f] block mb-1">Đã bao gồm VAT</span>
              <span className="font-headline text-3xl font-bold text-[#7b1113]">5,130,000₫</span>
            </div>
          </div>

          {/* Consent */}
          <div className="mt-8">
            <div className="flex items-start gap-3">
              <div className="flex h-6 items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="h-4 w-4 rounded border-[#dfbfbc]/40 accent-[#735b2b] cursor-pointer"
                />
              </div>
              <div className="text-sm leading-6">
                <label htmlFor="terms" className="text-[#58413f] cursor-pointer">
                  Tôi đồng ý với{' '}
                  <a
                    href="#"
                    className="font-medium text-[#735b2b] hover:text-[#570005] underline underline-offset-4"
                  >
                    Điều khoản &amp; Dịch vụ
                  </a>{' '}
                  và{' '}
                  <a
                    href="#"
                    className="font-medium text-[#735b2b] hover:text-[#570005] underline underline-offset-4"
                  >
                    Chính sách bảo mật
                  </a>{' '}
                  của Heritage.
                </label>
              </div>
            </div>
          </div>

          {/* CTA */}
          <button
            type="submit"
            className="mt-8 w-full bg-gradient-to-br from-[#570005] to-[#7b1113] text-white rounded-full py-4 px-8 font-label text-sm uppercase tracking-widest font-bold hover:shadow-[0_8px_40px_rgba(87,0,5,0.2)] transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            Đặt hàng
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>
      </aside>
    </div>
  );
}
