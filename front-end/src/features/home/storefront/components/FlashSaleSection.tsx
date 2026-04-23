import Image from 'next/image';

interface FlashProduct {
  id: number;
  name: string;
  discount: string;
  salePrice: string;
  originalPrice: string;
  src: string;
  alt: string;
}

const flashProducts: FlashProduct[] = [
  {
    id: 1,
    name: 'Red Ginseng Extract',
    discount: '-25%',
    salePrice: '1.500.000đ',
    originalPrice: '2.000.000đ',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAmOZMhssdpqcr668KYiWCFe6JqgRW7_amf4O5vkbDh9bSAzWIKRDNZ5qe4dSTy3sGjJX-hz6b-xXb9gvW9EGZMDdDhNAoVzkC1xeSQ4YKpaJHQxVr3YsRUO7duzkUH-gu1a2mT_CxHRO-qJX12fe1FzRj0gWgqel4mJSMH6wXOmZoPX4MnMm_jDYExyQc4xpB24E_zpCtuRInboMxspKxiCjSKL55te7PpibR8cTdKtggRvtwVsL_22lgOfrCmU18yzn7rB1xawg',
    alt: 'Red Ginseng Extract',
  },
  {
    id: 2,
    name: 'Whole Dried Roots',
    discount: '-20%',
    salePrice: '2.800.000đ',
    originalPrice: '3.500.000đ',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDr2k2GYXnoK_lZkZ6-Xi290ze8pA0ebRK4VtS2wWMWeSMBxs0NKvvsZT3Ze8rp-wvAHY6LA_XK7xfGNCfBTLh6Rd9Vrv8v0pQz64SOD47dQC3qpwujW_d9TIIoM7XSyPm-8i6-WWRnSdoiVUuAii-IKWFFEhRi4_m2w4tSibgTLlAQ4jNGktYs-GMvWT0PhzhLZ2o7AyV44yQOlKyysJIJ0gSVGbojw0XLs9-dpwUnVOq_yPJKZ3W6kSLHL7msC5SPQOfusjH-a6s',
    alt: 'Whole Dried Roots',
  },
  {
    id: 3,
    name: 'Premium Tea Blend',
    discount: '-30%',
    salePrice: '840.000đ',
    originalPrice: '1.200.000đ',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcTPiVY3DIMAFVJQMitI8XnVHpck6u10MRFp31BWdiotXn18v_IJSIvYe6WfvPkmTxzwNrcuxYEBPFbSAfFzZx7poBJ8Uvkv-3q7rK3r5gNJVqrYymLeZX4Au0T14sM4HOyb4muZRSCkfY3wtluNT3MYggelGL0KDJMp0IDZJ1qWZn3ptgLYvxIsOJAO36-HMdRRWMYf73LtuWfl9BYs1x9_mCvp2LSbLzMFLQdlLE37xSAN9BKmYhST_wt0apQCjYoJjmRrdREwA',
    alt: 'Premium Tea Blend',
  },
  {
    id: 4,
    name: 'Concentrated Pills',
    discount: '-15%',
    salePrice: '3.825.000đ',
    originalPrice: '4.500.000đ',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAd5OEWKs5OGXVqGYXhJ17UBk7-7FL7X9w2SG8Zjh5G6HmRgWaGGdrndTnaHMNJiIQegzVI5aj73nsM4gBM2t1JiaN1je0uTee-EYcgDxkylBEdDyo6jJJpbbK-IjX2qBu3d95x77fDAjzUseYO0Zoc_RbT-PGFGHgDEkPQhzI-XMCOuTKgDq_7UUTLrOPKt2nHsIAWQy5uxCDDlaEC_GuIv3UAR0RHzZhjepwkoKCEK78NfvsKV3W9a8-M1Zbe2kUTc481EavFTjY',
    alt: 'Concentrated Pills',
  },
];

export default function FlashSaleSection() {
  return (
    <section className="max-w-screen-2xl mx-auto px-8 mb-32 relative">
      <div className="flex flex-col items-center mb-12">
        <h2 className="font-headline text-4xl text-on-surface mb-4">Flash Sale</h2>
        <p className="font-body text-on-surface-variant max-w-md text-center">
          Limited time offers on our signature preparations.
        </p>
      </div>

      <div className="relative group">
        {/* Left navigation arrow */}
        <button className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 w-12 h-12 rounded-full bg-surface-container-lowest shadow-md hidden md:flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors border border-outline-variant/30">
          <span className="material-symbols-outlined">chevron_left</span>
        </button>

        {/* Right navigation arrow */}
        <button className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 w-12 h-12 rounded-full bg-surface-container-lowest shadow-md hidden md:flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors border border-outline-variant/30">
          <span className="material-symbols-outlined">chevron_right</span>
        </button>

        {/* Carousel track */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar">
          {flashProducts.map((product) => (
            <div
              key={product.id}
              className="min-w-[280px] md:min-w-[320px] snap-start bg-surface-container-lowest rounded-xl overflow-hidden ambient-shadow flex flex-col group border border-outline-variant/30"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.src}
                  alt={product.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-error text-on-error px-3 py-1 rounded-full text-xs font-bold tracking-wider">
                  {product.discount}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-headline text-xl text-on-surface mb-2">{product.name}</h3>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-error font-bold text-xl">{product.salePrice}</span>
                  <span className="text-outline text-sm line-through">{product.originalPrice}</span>
                </div>
                <button className="mt-auto w-full btn-primary py-3 font-body font-semibold text-sm hover:opacity-90 transition-opacity">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-4">
          <button className="w-3 h-3 rounded-full bg-primary" aria-label="Page 1" />
          <button
            className="w-3 h-3 rounded-full bg-outline-variant hover:bg-primary transition-colors"
            aria-label="Page 2"
          />
          <button
            className="w-3 h-3 rounded-full bg-outline-variant hover:bg-primary transition-colors"
            aria-label="Page 3"
          />
        </div>
      </div>
    </section>
  );
}
