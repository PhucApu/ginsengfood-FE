const NEWSLETTER_BG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDIMk6mzXfFgT9R9jLLYoBsf_fXhmTzvK08g9iNuMR8LX6Vm2eyO3WCl-dRz0MGt6NNX5BHE53u373WcBNHvuOTlZKcCRXV6fnoiVH8tX5oBrsKljv6nV0yK7ks5cZACFZBkkDRTMXhiN2UETTwHFQOPBQqypkdE3D77Ut9jqiLJ_aDv87q32NAMwMIoUtVPPKAtL1uIFxvceOtwUD549wxH7ez3_aHnH9xqzM844X909ka0';

const PILLARS = [
  {
    icon: 'verified',
    title: 'Tinh Khiết Tuyệt Đối',
    description:
      'Mỗi rễ sâm đều trải qua kiểm định thực vật nghiêm ngặt để đảm bảo tính toàn vẹn hữu cơ tuyệt đối và hàm lượng ginsenoside đỉnh cao.',
  },
  {
    icon: 'landscape',
    title: 'Thổ Nhưỡng Thiêng Liêng',
    description:
      'Được trồng trong đất giàu dinh dưỡng ở độ cao lớn — nơi khí hậu hun đúc sức bền và tạo nên hiệu lực vô song.',
  },
];

export function QualitySection() {
  return (
    <>
      {/* Pillars */}
      <section className="bg-surface-container-low py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-20 xl:px-28">
          <div className="max-w-2xl mb-12">
            <p className="text-label-md font-body uppercase tracking-[0.12em] text-secondary mb-3">
              Cam kết chất lượng
            </p>
            <h2 className="text-headline-lg font-headline font-medium text-on-surface">
              Sourced with reverence. Crafted with precision.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/30 shadow-[0_8px_40px_rgba(27,28,26,0.06)]"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary-container mb-5">
                  <span className="material-icons text-on-secondary-container">{pillar.icon}</span>
                </div>
                <h3 className="text-headline-sm font-headline font-medium text-on-surface mb-3">
                  {pillar.title}
                </h3>
                <p className="text-body-md font-body text-on-surface-variant leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA banner */}
      <section className="relative overflow-hidden py-24">
        <img
          src={NEWSLETTER_BG}
          alt="Mist over ancient mountains where ginseng grows"
          className="absolute inset-0 h-full w-full object-cover opacity-25 select-none pointer-events-none"
        />
        <div className="absolute inset-0 bg-tertiary-container/90" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-20 xl:px-28">
          <div className="max-w-xl">
            <p className="text-label-md font-body uppercase tracking-[0.12em] text-tertiary-fixed-dim mb-4">
              Nhận ưu đãi ngay
            </p>
            <h2 className="text-headline-md font-headline font-medium text-on-tertiary mb-4">
              Đăng ký để nhận thông tin sản phẩm & ưu đãi độc quyền
            </h2>
            <p className="text-body-md font-body text-tertiary-fixed-dim mb-8">
              Nhận ngay 10% giảm giá cho đơn hàng đầu tiên và cập nhật mùa thu hoạch mới nhất.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Địa chỉ email của bạn"
                className="flex-1 rounded-lg border border-tertiary-fixed-dim/30 bg-surface/10 px-4 py-3 text-body-md font-body text-on-tertiary placeholder:text-tertiary-fixed-dim focus:outline-none focus:ring-2 focus:ring-tertiary-fixed"
              />
              <button
                type="submit"
                className="rounded-full bg-gradient-to-br from-primary to-primary-container px-6 py-3 text-body-sm font-body font-semibold text-on-primary hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0"
              >
                Nhận ưu đãi ngay
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
