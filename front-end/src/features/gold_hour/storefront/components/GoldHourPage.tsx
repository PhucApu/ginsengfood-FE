'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import FadeInSection from '@/shared/components/FadeInSection';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice: string;
  imageUrl: string;
  imageAlt: string;
  remaining: number;
  total: number;
  progressBg: string;
  exhausted: boolean;
  lowStock?: boolean;
  discount?: string;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface ProductCardProps {
  product: Product;
}

// ─── Static data ─────────────────────────────────────────────────────────────
// TODO: replace with real API contract when available

const INITIAL_SECONDS = 45 * 60 + 12; // 00:45:12

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Hồng Sâm Củ Khô Thượng Hạng',
    description: 'Thiên sâm 10 năm tuổi, sấy khô tự nhiên.',
    price: '8.500.000 ₫',
    originalPrice: '12.150.000 ₫',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDPkDdzk_pobo6GZpab6Ri9Aba6kk8ZX8WlDwlxKPa-yXCwH-f6p1aqfNY_EeqDHK4u8DA6D9bh8DcyIYnGD00AcmMjtKH9_qWHzMZ9hUHgb9F2cosFVwfLrw-W2K60EzA6k729EU2z6wiRacE2xiAkbnuXdphLz4CoPzH6ZTGBGdZE-waJ71riGAFZYzxPKBDJUQiz9zjywPdh0ytU8CoW_DvOmJpIkW1muZ8E7b3RZTGJpSSnISXL9k1sM26sL4uIpu1YLEhfMqQ',
    imageAlt:
      'premium dried red ginseng roots arranged elegantly on dark wooden surface with moody spotlighting',
    remaining: 12,
    total: 50,
    progressBg: '#7B1113',
    exhausted: false,
    lowStock: true,
    discount: '-30%',
  },
  {
    id: '2',
    name: 'Tinh Chất Sâm Đậm Đặc',
    description: 'Chiết xuất nguyên chất, bồi bổ nguyên khí.',
    price: '4.200.000 ₫',
    originalPrice: '5.500.000 ₫',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB9-E3fUR5YIiMQv2Y0ZHrtfAS383Xxluud9ISo2x6ss0dyuvqUfiKi-5N9_IZdqtqG12kM8wXgz55GG0cl02TVD97s64ObQZluKFJ1Kn730jc7dG-XV3A9Bg2Ych4JLNjojZJkdbwtzlUKWD4FSaob6-yBll_9u6yQohdFNsuDPsYObOkl9289PuKl5yiNc1SBirm8bJvMlYv7jy0g9BiE1yPzEkxWwoj3h-BkkXd0_cENPdZzSlPYmJIwqDNAL_u1gBeQzMLXpb0',
    imageAlt:
      'sleek glass vial containing dark viscous ginseng extract reflecting warm light on a textured stone background',
    remaining: 38,
    total: 100,
    progressBg: '#735b2b',
    exhausted: false,
  },
  {
    id: '3',
    name: 'Trà Sâm Hoàng Gia',
    description: 'Tuyển chọn từ những đọt sâm non tinh khiết.',
    price: '1.800.000 ₫',
    originalPrice: '2.200.000 ₫',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBQcXAzsvgawbRDfVeU8z9xsHL83WRbZbAn2TN2HtnOD2WijJKlzYPlJdl6kk50AtGXNwjtrElaBds5aK6RBFTKzQQCOyvo-fKP2Ag7pGFRrlx4Ba4jdW5smBu4R08kvH5pXfuPJJQEpb6_L7m58NY6XKrvLP9oVKuHlEnT-mffsMSxLaOxgUY19QZlpimlOa3Uyy5xUkSOMrsLGX8rtUpa2iPVNVKo9Dn6lGxW8gaIW3UIeAfebiQ2mWTGUKzgAY8rBdhKLiTKQoo',
    imageAlt:
      'elegant wooden box of premium ginseng tea bags sitting softly in natural light',
    remaining: 0,
    total: 200,
    progressBg: '',
    exhausted: true,
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    id: '1',
    question: 'Điều kiện tham gia Phiên Giờ Vàng',
    answer:
      'Chương trình áp dụng cho tất cả khách hàng có tài khoản tại Heritage Reserve. Tuy nhiên, số lượng sản phẩm mỗi khách hàng được mua có thể bị giới hạn tùy thuộc vào hạng thành viên hiện tại để đảm bảo tính công bằng.',
  },
  {
    id: '2',
    question: 'Chính sách giữ chỗ và thanh toán',
    answer:
      'Khi chọn "Đặt giữ chỗ", sản phẩm sẽ được tạm khóa trong kho trong vòng 5 phút. Nếu không hoàn tất thanh toán trong thời gian này, sản phẩm sẽ tự động được nhả ra cho các khách hàng khác.',
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatCountdown(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(h)} : ${pad(m)} : ${pad(s)}`;
}

// ─── Product Card Sub-component (page-only) ───────────────────────────────────

function ProductCard({ product }: ProductCardProps) {
  const progressPercent =
    product.total > 0 ? Math.round((product.remaining / product.total) * 100) : 0;

  return (
    <div
      className={`bg-surface-container-lowest rounded-xl overflow-hidden ambient-shadow flex flex-col group${
        product.exhausted ? ' opacity-75' : ''
      }`}
    >
      {/* Image area */}
      <div className="relative h-80 bg-surface-container-low p-4">
        <div className="relative w-full h-full">
          <Image
            src={product.imageUrl}
            alt={product.imageAlt}
            fill
            className={`object-cover rounded-lg group-hover:scale-105 transition-transform duration-700${
              product.exhausted ? ' grayscale' : ''
            }`}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
        </div>
        {/* Discount badge */}
        {product.discount && (
          <div
            className="absolute top-6 left-6 text-on-primary text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full z-10"
            style={{ backgroundColor: '#7B1113' }}
          >
            {product.discount}
          </div>
        )}
        {/* Exhausted overlay */}
        {product.exhausted && (
          <div className="absolute inset-0 bg-surface/40 flex items-center justify-center z-10">
            <span className="bg-surface px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase text-outline">
              Đã Hết Suất
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-8 flex-grow flex flex-col">
        <h3 className="text-xl font-headline text-on-surface mb-2">{product.name}</h3>
        <p className="text-sm text-on-surface-variant font-body mb-6">{product.description}</p>

        <div className="mt-auto space-y-6">
          {/* Price */}
          <div className={`flex items-end gap-3${product.exhausted ? ' opacity-50' : ''}`}>
            <span
              className={`text-2xl font-bold ${
                product.exhausted ? 'text-on-surface-variant' : 'text-primary'
              }`}
            >
              {product.price}
            </span>
            <span className="text-sm line-through text-outline mb-1">{product.originalPrice}</span>
          </div>

          {/* Stock indicator */}
          <div className={`space-y-2${product.exhausted ? ' opacity-50' : ''}`}>
            <div className="flex justify-between text-xs font-label text-on-surface-variant">
              <span>
                Còn lại: {product.remaining}/{product.total} suất
              </span>
              {product.lowStock && <span className="text-primary font-bold">Sắp hết</span>}
            </div>
            <div className="h-1 bg-surface-container-high rounded-full overflow-hidden">
              {!product.exhausted && product.progressBg && (
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${progressPercent}%`,
                    backgroundColor: product.progressBg,
                  }}
                />
              )}
            </div>
          </div>

          {/* Actions */}
          {product.exhausted ? (
            <button
              type="button"
              disabled
              className="w-full bg-surface-container-high text-outline py-3 rounded-full font-label tracking-widest text-xs uppercase cursor-not-allowed"
            >
              Đăng ký nhận thông báo
            </button>
          ) : (
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                className="text-on-primary py-3 rounded-full font-label tracking-widest text-xs uppercase hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#7B1113' }}
              >
                Đặt giữ chỗ
              </button>
              <button
                type="button"
                className="bg-transparent border border-outline-variant/40 text-on-surface hover:border-secondary hover:bg-surface-container-low transition-all py-3 rounded-full font-label tracking-widest text-xs uppercase"
              >
                Mua ngay
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function GoldHourPage() {
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_SECONDS);
  const [alertVisible, setAlertVisible] = useState(true);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  return (
    <>
      <div className="flex-grow pt-10 pb-24">
        {/* Section 1: Session Status Banner & Countdown */}
        <FadeInSection>
        <section className="max-w-7xl mx-auto px-8 mb-20">
          <div
            className="rounded-xl p-12 text-center text-on-tertiary relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]"
            style={{ backgroundColor: '#7B1113' }}
          >
            {/* Background overlay image */}
            <div
              className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1596484552993-9d41d91456bf?auto=format&fit=crop&q=80')",
              }}
            />
            <div className="relative z-10 space-y-6">
              {/* Live badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
                <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
                <span className="text-sm font-bold tracking-widest text-white uppercase">
                  PHIÊN GIỜ VÀNG ĐANG DIỄN RA
                </span>
              </div>
              {/* Countdown */}
              <h1
                className="text-5xl md:text-7xl font-headline tracking-tight"
                style={{ color: '#D4AF37' }}
              >
                {formatCountdown(secondsLeft)}
              </h1>
              {/* Time labels */}
              <div
                className="flex justify-center gap-12 text-sm font-label tracking-widest uppercase"
                style={{ color: '#D4AF37' }}
              >
                <span>Giờ</span>
                <span>Phút</span>
                <span>Giây</span>
              </div>
            </div>
          </div>
        </section>
        </FadeInSection>

        {/* Section 2: Context & Tier Info Grid */}
        <FadeInSection delay={100}>
        <section className="max-w-7xl mx-auto px-8 mb-24 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Session context */}
          <div className="lg:col-span-8 bg-surface-container-low rounded-xl p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-headline text-primary mb-6">
              Đặc quyền Giờ Vàng - 15/10/2023
            </h2>
            <div className="space-y-4 text-on-surface-variant font-body">
              <p className="text-lg">
                Trải nghiệm những chế tác tinh hoa nhất từ nhân sâm di sản với mức giá ưu đãi đặc
                biệt trong thời gian giới hạn. Số lượng cực kỳ khan hiếm.
              </p>
              <ul className="space-y-2 mt-4 text-sm flex flex-col gap-2">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-lg">
                    check_circle
                  </span>
                  <span>Sản phẩm chính hãng 100% từ vùng trồng di sản</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-lg">
                    check_circle
                  </span>
                  <span>Mỗi khách hàng được giữ chỗ tối đa 2 sản phẩm/phiên</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-lg">
                    check_circle
                  </span>
                  <span>Thanh toán trong vòng 5 phút để hoàn tất đơn hàng</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Tier card */}
          <div className="lg:col-span-4 bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/20 ambient-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="material-symbols-outlined text-secondary text-3xl">diamond</span>
                <span className="text-xs font-bold tracking-widest text-secondary uppercase bg-secondary-container/30 px-3 py-1 rounded-full">
                  Đặc Quyền Riêng
                </span>
              </div>
              <h3 className="text-xl font-headline text-on-surface mb-3">
                Thành viên KIM CƯƠNG
              </h3>
              <p className="text-sm text-on-surface-variant font-body mb-6">
                Bạn đang được ưu tiên truy cập sớm 30 phút trước khi mở bán công khai.
              </p>
            </div>
            <div className="relative group/upgrade">
              <button
                type="button"
                className="w-full bg-transparent border border-outline-variant/40 text-secondary hover:border-secondary hover:bg-surface-container-low transition-all py-3 rounded-full font-label tracking-widest text-xs uppercase flex justify-center items-center gap-2"
              >
                Nâng hạng thành viên{' '}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
              {/* Tooltip */}
              <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-on-surface text-inverse-on-surface text-xs font-body leading-relaxed px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover/upgrade:opacity-100 transition-opacity duration-200 text-center z-50">
                Hãy mua thêm sản phẩm để nâng cấp hạng thành viên của bạn
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-on-surface" />
              </div>
            </div>
          </div>
        </section>
        </FadeInSection>

        {/* Section 3: Product Grid */}
        <FadeInSection delay={200}>
        <section className="max-w-7xl mx-auto px-8 mb-24">
          <h2 className="text-3xl font-headline text-primary mb-12">Chế Tác Tinh Hoa</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
        </FadeInSection>

        {/* Section 4: Rules & FAQ Accordion */}
        <FadeInSection delay={300}>
        <section className="max-w-4xl mx-auto px-8 mb-24">
          <h2 className="text-2xl font-headline text-primary mb-8 text-center">
            Thông tin cần biết
          </h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.id}
                className="group bg-surface-container-low rounded-lg [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer text-on-surface font-medium">
                  {item.question}
                  <span className="material-symbols-outlined transition duration-300 group-open:-rotate-180 text-secondary">
                    expand_more
                  </span>
                </summary>
                <div className="px-6 pb-6 text-sm text-on-surface-variant font-body leading-relaxed">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </section>
        </FadeInSection>
      </div>

      {/* Floating Reservation Timer Alert */}
      {alertVisible && (
        <div className="fixed bottom-8 right-8 bg-surface-container-lowest ambient-shadow rounded-xl p-4 pr-12 border border-outline-variant/30 flex items-center gap-4 z-40 max-w-sm">
          <div className="w-10 h-10 rounded-full bg-secondary-container/30 flex items-center justify-center flex-shrink-0 text-secondary">
            <span className="material-symbols-outlined">timer</span>
          </div>
          <div>
            <p className="text-sm font-medium text-on-surface">Thanh toán chờ xử lý</p>
            <p className="text-xs text-on-surface-variant mt-1">
              Bạn có <span className="font-bold text-primary">04:59</span> để hoàn tất thanh toán
              cho sản phẩm đã giữ.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setAlertVisible(false)}
            className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}
    </>
  );
}
