'use client';

import { useState } from 'react';
import Image from 'next/image';

// ─── Types ───────────────────────────────────────────────────────────────────

interface CartItem {
  id: string;
  name: string;
  subtitle: string;
  unitPrice: number;
  quantity: number;
  imageUrl: string;
  imageAlt: string;
}

interface RecommendedProduct {
  id: string;
  category: string;
  name: string;
  price: string;
  imageUrl: string;
  imageAlt: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────
// TODO: replace with real API contract when available

const initialCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Hồng Sâm Củ Khô',
    subtitle: 'Premium Selection',
    unitPrice: 2500000,
    quantity: 1,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAnDhDfopl-x8wf_lZ5bVp55-X9IEJzpi2rER3L3oUWBevANVo5nHEYSviz8trQImpj-hTW2C3h61FZM9H1sblkFKcJ8K86JS1_aYxOAdrRbf6FdUjJkGAvv9z2B5DE577AezxTwrm_f-OYU3NL_W44KjGWMvBVs5364HgPZjb0znEVPp6COCoscXv80v7Avh6PD1hWW_LlMVGbAltWzLF8I1-nNOztNwIOE8i9EplWwfTYthDnoSkoEag8UolN5mLeRZpxkp2p8SA',
    imageAlt: 'high quality studio shot of dried premium ginseng root on dark organic stone background warm lighting',
  },
  {
    id: '2',
    name: 'Tinh Chất Sâm Đậm Đặc',
    subtitle: 'Heritage Edition',
    unitPrice: 1800000,
    quantity: 2,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDFa40ghW7s69aI4sChMEEIYdbaMURurk4NgUQOJzd97yUoTv3VFvgZ6TeLxzdaf0F3ibT0xEwpKEo6KK6zYPEkdqmDj37-RWIFOd3baMu73jy3VzwNlDQCSezHm0jJWy-Vrd0LP9UwQAFAJVCW0CXmzb7G8L2l1XbShP3XB84E-RJcRvSFhD14holKWCBetavdQf8XUFeN-H1aKAX8n8FG-5RwGSIV2WdVB_43mSTSpRQvpmEj7NlCAVfPrF8iC7mIXXd-sc2SOkI',
    imageAlt: 'elegant dark glass bottle of ginseng extract liquid on smooth neutral marble surface soft reflections',
  },
];

const recommendedProducts: RecommendedProduct[] = [
  {
    id: 'rec-1',
    category: 'Trà Thảo Mộc',
    name: 'Trà Sâm Hoàng Gia',
    price: '850.000 ₫',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBdQkZqEpDNWeVWV5pMbQbDeK8w-aFXHajQEktHBSzfKzV6GjND5x92gkdkP2SgnKbF-m9wgecj1d_5ajEEYFzcBgTN1OmTske36jZFnQoYXIjk_TvSYyr-7VINsn7D2wP6BWXiPWfnzlRxjwbX7Kuhg5Cd2j95tVvczDoCkPo2MsosNPAnK41m3sWsMYdmyyhA8iXd27aUU6df2DAHOmr8s4NFootyh3mTsSjfSnZ370hXXRfnoPY0yaADMHfIXaqGhTlb98r5edQ',
    imageAlt: 'elegant packaging of loose leaf ginseng tea next to a traditional ceramic cup soft natural lighting top down view',
  },
  {
    id: 'rec-2',
    category: 'Dược Liệu',
    name: 'Mật Ong Nhân Sâm',
    price: '1.200.000 ₫',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDQZ0_OIXIlp1BgwJKHKGCP_akLsBJsJLe9mQMrtxqB-nbtcZNgCff5w93JBO5m1OICeDNuqbtIaisbzyE_hv3lsSWt0LGVTzmQvs9LIxnzk3tmFnm2cYYTV2yjHODE3d_pmES6fJj3JbunLG7NS2VUrqNnzBZv8xvkxcm2urtGZreVH11c_MqcrYWV0iZjns-41UU-y9_HJkQeA8-t8R14ykRXMBGz33-46MEiFnX5Qf5Bd_uuImPsRsCRubXgFmsi6cCNysusAQg',
    imageAlt: 'glass jar filled with golden honey containing sliced ginseng roots sunlight passing through amber tones',
  },
];

const APPLIED_DISCOUNT = 250000;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(amount: number): string {
  return amount.toLocaleString('vi-VN') + ' ₫';
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState<string>('');

  const handleIncrease = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const handleDecrease = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      )
    );
  };

  const handleRemove = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = subtotal - APPLIED_DISCOUNT;

  return (
    <div className="max-w-screen-2xl mx-auto w-full px-4 md:px-8 py-12 pb-20 md:pb-0">
      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* ── Left Column ── */}
        <div className="w-full lg:w-2/3 flex flex-col gap-10">

          {/* Golden Hour Warning */}
          <div className="bg-[#22442b] rounded-xl p-6 flex items-start gap-4 text-white">
            <span className="material-symbols-outlined text-[#fddba0] text-3xl">schedule</span>
            <div>
              <h3 className="font-headline text-xl mb-2 text-[#fddba0]">
                Golden Hour Reservation
              </h3>
              <p className="text-sm opacity-90">
                Sản phẩm trong giỏ hàng của bạn đang được giữ trong thời gian flash sale. Vui
                lòng hoàn tất thanh toán trong{' '}
                <span className="font-bold text-[#ffdea5]">14:59</span> để giữ ưu đãi.
              </p>
            </div>
          </div>

          {/* Cart Items */}
          <section>
            <h2 className="font-headline text-3xl mb-8 text-[#570005]">Sản Phẩm</h2>
            <div className="flex flex-col gap-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center gap-6 bg-white p-4 rounded-xl shadow-[0_8px_40px_rgba(27,28,26,0.06)] group relative"
                >
                  {/* Remove button */}
                  <button
                    type="button"
                    aria-label="Remove item"
                    onClick={() => handleRemove(item.id)}
                    className="absolute top-4 right-4 text-[#8b716e] hover:text-[#ba1a1a] transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">close</span>
                  </button>

                  {/* Product image */}
                  <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0 bg-[#f5f3ef]">
                    <Image
                      src={item.imageUrl}
                      alt={item.imageAlt}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover p-2"
                    />
                  </div>

                  {/* Product info */}
                  <div className="flex-grow flex flex-col w-full">
                    <div className="flex justify-between items-start mb-2 pr-8">
                      <h3 className="font-headline text-xl text-[#1b1c1a]">{item.name}</h3>
                    </div>
                    <p className="text-sm text-[#8b716e] mb-4 font-label uppercase tracking-wider">
                      {item.subtitle}
                    </p>
                    <div className="flex flex-wrap justify-between items-center gap-4 mt-auto">
                      {/* Unit price */}
                      <div className="text-lg text-[#735b2b] font-medium">
                        {formatPrice(item.unitPrice)}
                      </div>
                      <div className="flex items-center gap-4">
                        {/* Quantity control */}
                        <div className="flex items-center border border-[#dfbfbc] opacity-[0.8] rounded-full p-1 bg-[#fbf9f5]">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => handleDecrease(item.id)}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-[#8b716e] hover:bg-[#eae8e4] transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">remove</span>
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => handleIncrease(item.id)}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-[#8b716e] hover:bg-[#eae8e4] transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">add</span>
                          </button>
                        </div>
                        {/* Line total */}
                        <div className="text-lg font-bold text-[#1b1c1a] w-32 text-right">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Promotion Summary */}
          <section className="bg-[#f5f3ef] rounded-xl p-8">
            <h3 className="font-headline text-2xl mb-4 text-[#1b1c1a] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#735b2b]">local_offer</span>
              Ưu đãi đã áp dụng
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="bg-[#22442b] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    HERITAGE10
                  </span>
                  <span className="text-sm text-[#58413f]">
                    Giảm 10% cho đơn hàng Sâm Củ Khô
                  </span>
                </div>
                <span className="text-[#735b2b] font-medium">-250.000 ₫</span>
              </li>
            </ul>
            {/* Promo code input */}
            <div className="mt-6 flex gap-4 border-t border-[#dfbfbc]/30 pt-6">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Nhập mã ưu đãi..."
                className="flex-grow bg-transparent border-b border-[#dfbfbc] focus:border-[#735b2b] focus:border-b-2 outline-none py-2 text-[#1b1c1a] transition-all"
              />
              <button
                type="button"
                className="text-[#735b2b] font-bold uppercase tracking-wider text-sm hover:text-[#570005] transition-colors"
              >
                Áp dụng
              </button>
            </div>
          </section>
        </div>

        {/* ── Right Column (Sticky Summary) ── */}
        <div className="w-full lg:w-1/3 relative">
          <div className="sticky top-32 bg-white rounded-xl p-8 shadow-[0_8px_40px_rgba(27,28,26,0.06)]">
            <h2 className="font-headline text-2xl mb-6 text-[#570005] border-b border-[#dfbfbc]/30 pb-4">
              Thành Tiền
            </h2>
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between text-[#58413f]">
                <span>Tạm tính ({totalQty} sản phẩm)</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#58413f]">
                <span>Ưu đãi</span>
                <span className="text-[#735b2b]">-{formatPrice(APPLIED_DISCOUNT)}</span>
              </div>
              <div className="flex justify-between text-[#58413f]">
                <span>Phí vận chuyển dự kiến</span>
                <span>Miễn phí</span>
              </div>
            </div>
            <div className="flex justify-between items-end border-t border-[#dfbfbc]/30 pt-6 mb-8">
              <span className="font-headline text-lg text-[#1b1c1a]">Tổng cộng</span>
              <div className="text-right">
                <span className="block text-3xl font-headline text-[#570005] mb-1">
                  {formatPrice(total)}
                </span>
                <span className="text-xs text-[#8b716e]">(Đã bao gồm VAT)</span>
              </div>
            </div>
            <button
              type="button"
              className="w-full btn-primary py-4 font-bold uppercase tracking-widest text-sm hover:shadow-lg transition-shadow duration-300"
            >
              Thanh toán ngay
            </button>
          </div>
        </div>
      </div>

      {/* ── Recommended Products ── */}
      <section className="mt-24 mb-12">
        <h2 className="font-headline text-3xl mb-12 text-center text-[#1b1c1a]">
          Thường Mua Cùng
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {recommendedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden group cursor-pointer shadow-[0_8px_40px_rgba(27,28,26,0.06)] hover:shadow-[0_12px_50px_rgba(27,28,26,0.1)] transition-shadow"
            >
              <div className="aspect-square bg-[#f5f3ef] overflow-hidden relative">
                <Image
                  src={product.imageUrl}
                  alt={product.imageAlt}
                  fill
                  className="object-cover p-6 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <button
                  type="button"
                  aria-label={`Add ${product.name} to cart`}
                  className="absolute bottom-4 right-4 bg-[#fbf9f5]/90 backdrop-blur-md w-10 h-10 rounded-full flex items-center justify-center text-[#570005] shadow-sm hover:bg-[#570005] hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                </button>
              </div>
              <div className="p-6">
                <p className="text-xs text-[#8b716e] mb-1 font-label uppercase tracking-wider">
                  {product.category}
                </p>
                <h4 className="font-headline text-lg text-[#1b1c1a] mb-2">{product.name}</h4>
                <p className="text-[#735b2b] font-medium">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mobile Bottom NavBar (md:hidden, fixed) ── */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-[rgba(250,249,245,0.9)] backdrop-blur-2xl shadow-[0_-8px_40px_rgba(27,28,26,0.06)] rounded-t-3xl z-50">
        <a
          href="#"
          className="flex flex-col items-center justify-center text-stone-500 hover:opacity-80 transition-opacity active:scale-90 font-label text-[10px] uppercase tracking-widest"
        >
          <span className="material-symbols-outlined mb-1">home</span>
          Trang Chủ
        </a>
        <a
          href="#"
          className="flex flex-col items-center justify-center text-stone-500 hover:opacity-80 transition-opacity active:scale-90 font-label text-[10px] uppercase tracking-widest"
        >
          <span className="material-symbols-outlined mb-1">reorder</span>
          Cửa Hàng
        </a>
        <a
          href="#"
          className="flex flex-col items-center justify-center bg-[#fddba0] text-[#735b2b] rounded-full px-6 py-2 hover:opacity-80 transition-opacity active:scale-90 font-label text-[10px] uppercase tracking-widest"
        >
          <span
            className="material-symbols-outlined mb-1"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            shopping_cart
          </span>
          Giỏ Hàng
        </a>
        <a
          href="#"
          className="flex flex-col items-center justify-center text-stone-500 hover:opacity-80 transition-opacity active:scale-90 font-label text-[10px] uppercase tracking-widest"
        >
          <span className="material-symbols-outlined mb-1">person</span>
          Tài Khoản
        </a>
      </nav>
    </div>
  );
}
