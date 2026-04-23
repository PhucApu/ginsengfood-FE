import Image from 'next/image';

const flashSaleProducts = [
  {
    id: 1,
    name: 'Hồng Sâm Cắt Lát Khô',
    salePrice: '1.500.000đ',
    originalPrice: '2.000.000đ',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6yhnCIKI4Uy2KdgSBLbd1OynST5D7pXiLMbsarvphuCek_iAqoQvDVdHtbjRHx2Zc6m6SIIg1iohtYZTcq86vey38ChNjlNKbto2EDzYQudj8R9YDT4OwuVOvuShKtqlMsJK1Qz9gzpk4FN8kGFKKS6rBSIB-DY5Y64Jk4ngwbKKrEraQer8Txv0wxRKiyUsb9G2lLK2x-itZoWKwvMjsuad9FIA91OrAFWIutOIlfXrVPGo4KVjKFdtl3hWqpspDOe72mvL0xuw',
    alt: 'Hồng Sâm Cắt Lát Khô',
  },
  {
    id: 2,
    name: 'Tinh Chất Nhân Sâm Đỏ',
    salePrice: '2.800.000đ',
    originalPrice: '3.500.000đ',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAd5OEWKs5OGXVqGYXhJ17UBk7-7FL7X9w2SG8Zjh5G6HmRgWaGGdrndTnaHMNJiIQegzVI5aj73nsM4gBM2t1JiaN1je0uTee-EYcgDxkylBEdDyo6jJJpbbK-IjX2qBu3d95x77fDAjzUseYO0Zoc_RbT-PGFGHgDEkPQhzI-XMCOuTKgDq_7UUTLrOPKt2nHsIAWQy5uxCDDlaEC_GuIv3UAR0RHzZhjepwkoKCEK78NfvsKV3W9a8-M1Zbe2kUTc481EavFTjY',
    alt: 'Tinh Chất Nhân Sâm Đỏ',
  },
  {
    id: 3,
    name: 'Trà Nhân Sâm Thượng Hạng',
    salePrice: '850.000đ',
    originalPrice: '1.200.000đ',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcTPiVY3DIMAFVJQMitI8XnVHpck6u10MRFp31BWdiotXn18v_IJSIvYe6WfvPkmTxzwNrcuxYEBPFbSAfFzZx7poBJ8Uvkv-3q7rK3r5gNJVqrYymLeZX4Au0T14sM4HOyb4muZRSCkfY3wtluNT3MYggelGL0KDJMp0IDZJ1qWZn3ptgLYvxIsOJAO36-HMdRRWMYf73LtuWfl9BYs1x9_mCvp2LSbLzMFLQdlLE37xSAN9BKmYhST_wt0apQCjYoJjmRrdREwA',
    alt: 'Trà Nhân Sâm Thượng Hạng',
  },
];

const memberBenefits = [
  {
    icon: 'local_offer',
    title: 'Giảm thêm 10%',
    desc: 'Áp dụng cho mọi đơn hàng không giới hạn.',
  },
  {
    icon: 'support_agent',
    title: 'Hỗ trợ ưu tiên 24/7',
    desc: 'Chuyên viên tư vấn sức khỏe riêng.',
  },
  {
    icon: 'redeem',
    title: 'Quà tặng sinh nhật VIP',
    desc: 'Set dùng thử sản phẩm cao cấp.',
  },
  {
    icon: 'local_shipping',
    title: 'Miễn phí giao hàng hỏa tốc',
    desc: 'Nhận hàng trong 2h tại nội thành.',
  },
];

export default function ProminentBanner() {
  return (
    <section className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary py-10 px-8 relative shadow-lg border-b border-outline-variant/30 z-20">
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==\")",
        }}
      />

      <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center relative z-10 gap-8">
        {/* Flash Sale Countdown */}
        <div className="relative group flex items-center gap-6 bg-surface/5 backdrop-blur-md rounded-2xl p-6 border border-surface/10 w-full lg:w-auto flex-1 max-w-xl hover:bg-surface/10 transition-colors cursor-pointer">
          <div className="p-4 bg-secondary-fixed-dim/20 rounded-full text-secondary-fixed">
            <span className="material-symbols-outlined text-4xl">hourglass_top</span>
          </div>
          <div>
            <h3 className="font-headline text-2xl md:text-3xl text-secondary-fixed mb-2 drop-shadow-sm">
              Khung Giờ Vàng Giảm Giá
            </h3>
            <div className="flex items-center gap-3 font-body">
              <span className="text-surface/90 uppercase tracking-widest text-sm font-semibold">Kết thúc sau:</span>
              <span className="tabular-nums font-bold text-2xl bg-surface/15 px-4 py-1.5 rounded-lg shadow-inner text-surface-bright border border-surface/10">
                02:15:30
              </span>
            </div>
          </div>

          {/* Flash Sale Dropdown */}
          <div className="absolute top-[calc(100%+1rem)] left-0 w-full min-w-[350px] md:w-[450px] bg-surface-container-lowest rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-outline-variant/20 p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 z-50 text-on-surface text-left cursor-default">
            <h4 className="font-headline text-xl text-primary mb-4 border-b border-outline-variant/30 pb-2">
              Deal Đang Diễn Ra
            </h4>
            <div className="space-y-4">
              {flashSaleProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-2 hover:bg-surface-container-low rounded-xl transition-colors cursor-pointer"
                >
                  <Image
                    src={product.src}
                    alt={product.alt}
                    width={64}
                    height={64}
                    className="object-cover rounded-lg shadow-sm"
                  />
                  <div className="flex-1">
                    <p className="font-body font-semibold text-on-surface line-clamp-1">{product.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-error font-bold text-lg">{product.salePrice}</span>
                      <span className="text-outline text-sm line-through">{product.originalPrice}</span>
                    </div>
                  </div>
                  <button className="bg-primary text-on-primary px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm">
                    Mua
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <a
                className="text-sm font-semibold text-secondary hover:text-primary transition-colors flex items-center justify-center gap-1"
                href="#"
              >
                Xem tất cả deal
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>

        {/* Membership Status */}
        <div className="relative group flex items-center gap-6 bg-surface/5 backdrop-blur-md rounded-2xl p-6 border border-surface/10 w-full lg:w-auto flex-1 max-w-xl text-left lg:text-right lg:justify-end hover:bg-surface/10 transition-colors cursor-pointer">
          <div className="order-2 lg:order-1">
            <p className="font-body text-surface/90 text-sm uppercase tracking-widest font-semibold mb-2">
              Chào mừng trở lại, Quý khách
            </p>
            <h3 className="font-headline text-2xl md:text-3xl text-secondary-fixed flex items-center lg:justify-end gap-2 drop-shadow-sm">
              Hạng thành viên: KIM CƯƠNG
            </h3>
          </div>
          <div className="p-4 bg-secondary-fixed-dim/20 rounded-full text-secondary-fixed order-1 lg:order-2">
            <span className="material-symbols-outlined text-4xl">workspace_premium</span>
          </div>

          {/* Member Benefits Dropdown */}
          <div className="absolute top-[calc(100%+1rem)] right-0 w-full min-w-[320px] md:w-[380px] bg-surface-container-lowest rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-outline-variant/20 p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 z-50 text-on-surface text-left cursor-default">
            <div className="flex items-center gap-3 mb-4 border-b border-outline-variant/30 pb-4">
              <div className="p-2 bg-secondary-fixed-dim/20 rounded-full text-secondary">
                <span className="material-symbols-outlined text-2xl">diamond</span>
              </div>
              <div>
                <h4 className="font-headline text-xl text-on-surface">Đặc Quyền Kim Cương</h4>
                <p className="text-sm text-on-surface-variant font-body">Dành riêng cho bạn</p>
              </div>
            </div>
            <ul className="space-y-4">
              {memberBenefits.map((benefit) => (
                <li key={benefit.icon} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary mt-0.5 text-xl">
                    {benefit.icon}
                  </span>
                  <div>
                    <p className="font-semibold text-on-surface">{benefit.title}</p>
                    <p className="text-sm text-on-surface-variant">{benefit.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
