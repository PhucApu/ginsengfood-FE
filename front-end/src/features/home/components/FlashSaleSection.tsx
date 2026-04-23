import { useState, useEffect } from 'react';

interface FlashProduct {
  id: string;
  name: string;
  originalPrice: string;
  salePrice: string;
  discount: string;
  image: string;
  tag: string;
}

const FLASH_PRODUCTS: FlashProduct[] = [
  {
    id: '1',
    name: 'Tinh Chất Hồng Sâm',
    originalPrice: '2.000.000đ',
    salePrice: '1.500.000đ',
    discount: '-25%',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDAmOZMhssdpqcr668KYiWCFe6JqgRW7_amf4O5vkbDh9bSAzWIKRDNZ5qe4dSTy3sGjJX-hz6b-xXb9gvW9EGZMDdDhNAoVzkC1xeSQ4YKpaJHQxVr3YsRUO7duzkUH-gu1a2mT_CxHRO-qJX12fe1FzRj0gWgqel4mJSMH6wXOmZoPX4MnMm_jDYExyQc4xpB24E_zpCtuRInboMxspKxiCjSKL55te7PpibR8cTdKtggRvtwVsL_22lgOfrCmU18yzn7rB',
    tag: 'Flash Sale',
  },
  {
    id: '2',
    name: 'Hồng Sâm Cắt Lát Khô',
    originalPrice: '3.500.000đ',
    salePrice: '2.800.000đ',
    discount: '-20%',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDr2k2GYXnoK_lZkZ6-Xi290ze8pA0ebRK4VtS2wWMWeSMBxs0NKvvsZT3Ze8rp-wvAHY6LA_XK7xfGNCfBTLh6Rd9Vrv8v0pQz64SOD47dQC3qpwujW_d9TIIoM7XSyPm-8i6-WWRnSdoiVUuAii-IKWFFEhRi4_m2w4tSibgTTlAQ4jNGktYs-GMvWT0PhzhLZ2o7AyV44yQOlKyysJIJ0gSVGbojw0XLs9-dpwUnVOq_yPJKZ3W6kSLHL7ms',
    tag: 'Organic',
  },
  {
    id: '3',
    name: 'Trà Nhân Sâm Thượng Hạng',
    originalPrice: '1.200.000đ',
    salePrice: '840.000đ',
    discount: '-30%',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDcTPiVY3DIMAFVJQMitI8XnVHpck6u10MRFp31BWdiotXn18v_IJSIvYe6WfvPkmTxzwNrcuxYEBPFbSAfFzZx7poBJ8Uvkv-3q7rK3r5gNJVqrYymLeZX4Au0T14sM4HOyb4muZRSCkfY3wtluNT3MYggelGL0KDJMp0IDZJ1qWZn3ptgLYvxIsOJAO36-HMdRRWMYf73LtuWfl9BYs1x9_mCvp2LSbLzMFLQdlLE37xSAN9BKmYhST_wt0apQCjYoJjmRrdREwA',
    tag: 'High Saponin',
  },
  {
    id: '4',
    name: 'Viên Nhân Sâm Cô Đặc',
    originalPrice: '4.500.000đ',
    salePrice: '3.825.000đ',
    discount: '-15%',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAd5OEWKs5OGXVqGYXhJ17UBk7-7FL7X9w2SG8Zjh5G6HmRgWaGGdrndTnaHMNJiIQegzVI5aj73nsM4gBM2t1JiaN1je0uTee-EYcgDxkylBEdDyo6jJJpbbK-IjX2qBu3d95x77fDAjzUseYO0Zoc_RbT-PGFGHgDEkPQhzI-XMCOuTKgDq_7UUTLrOPKt2nHsIAWQy5uxCDDlaEC_GuIv3UAR0RHzZhjepwkoKCEK78NfvsKV3W9a8-M1Z',
    tag: 'Limited Harvest',
  },
];

function useCountdown(targetSeconds: number) {
  const [seconds, setSeconds] = useState(targetSeconds);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export function FlashSaleSection() {
  const countdown = useCountdown(2 * 3600 + 15 * 60 + 30);

  return (
    <section id="shop" className="bg-surface py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-20 xl:px-28">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-label-md font-body uppercase tracking-[0.12em] text-secondary mb-2">
              Ưu đãi giới hạn
            </p>
            <h2 className="text-headline-md font-headline font-medium text-on-surface">Flash Sale</h2>
            <p className="text-body-md font-body text-on-surface-variant mt-1">
              Ưu đãi thời hạn trên những chế phẩm đặc trưng của chúng tôi.
            </p>
          </div>
          {/* Countdown */}
          <div className="flex items-center gap-2 bg-primary-container rounded-lg px-4 py-2 shrink-0">
            <span className="material-icons text-on-primary text-lg">hourglass_top</span>
            <span className="text-body-sm font-body text-on-primary/70">Kết thúc sau:</span>
            <span className="text-headline-sm font-headline font-medium text-on-primary tabular-nums">
              {countdown}
            </span>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FLASH_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="group relative bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/30 shadow-[0_8px_40px_rgba(27,28,26,0.06)] transition-shadow duration-200"
            >
              {/* Discount badge */}
              <span className="absolute top-3 left-3 z-10 rounded-full bg-error px-3 py-1 text-label-sm font-body text-on-error">
                {product.discount}
              </span>

              {/* Tag */}
              {product.tag === 'Limited Harvest' ? (
                <span className="absolute top-3 right-3 z-10 rounded-full bg-primary-fixed px-3 py-1 text-label-sm font-body text-on-primary-fixed-variant">
                  {product.tag}
                </span>
              ) : (
                <span className="absolute top-3 right-3 z-10 rounded-full bg-secondary-container px-3 py-1 text-label-sm font-body text-on-secondary-container">
                  {product.tag}
                </span>
              )}

              {/* Image */}
              <div className="aspect-square overflow-hidden bg-surface-container-low">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-body-md font-body font-medium text-on-surface mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-headline-sm font-headline font-medium text-primary">
                    {product.salePrice}
                  </span>
                  <span className="text-body-sm font-body text-on-surface-variant line-through">
                    {product.originalPrice}
                  </span>
                </div>
                <button className="w-full rounded-full bg-gradient-to-br from-primary to-primary-container px-4 py-3 text-body-sm font-body font-semibold text-on-primary hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-opacity">
                  Mua ngay
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="mt-8 text-center">
          <a
            href="#shop"
            className="inline-flex items-center gap-1 text-body-sm font-body text-primary hover:underline"
          >
            Xem tất cả deal
            <span className="material-icons text-base">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}
