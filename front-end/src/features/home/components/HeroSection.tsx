const HERO_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAQs9m4zAJ7m0iXRG80vbbDS47is7H8pR5gFhdgluwxGHIK1ySV87Eatc_EC0VsyowCqfxLmxHB7m9fP2oNbcIBkorijFYzjzNH3mGMivAWtWFnWHvNq9k2O-gUKh4fuXZPFichGQG55kkLUdcyhpH8S3cyEvjpBS5a4mQUAv9ncO0qUhYlAsozE77w1Jte_nWBTbnSrwid5O6EPFYYRQkLUvrt6W2-WiPOfNMOSbIwf3JUHN3_9BiihMB-G_8st';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-surface-container-low min-h-[calc(100svh-4rem)]">
      {/* Background image */}
      <img
        src={HERO_IMG}
        alt="High-quality aged ginseng root resting on dark textured stone"
        className="absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-multiply select-none pointer-events-none"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-20 xl:px-28 flex flex-col justify-center min-h-[calc(100svh-4rem)] py-24">
        <div className="max-w-2xl">
          {/* Overline */}
          <p className="text-label-md font-body uppercase tracking-[0.12em] text-secondary mb-6">
            Heritage Ginseng &mdash; Dược liệu thượng hạng
          </p>

          {/* Headline */}
          <h1 className="text-display-md font-headline font-medium text-on-surface leading-[1.1] mb-6">
            Alchemizing tradition for modern vitality.
          </h1>

          {/* Subline */}
          <p className="text-body-lg font-body text-on-surface-variant mb-10 leading-relaxed max-w-xl">
            Trải nghiệm sức mạnh phục hồi sâu sắc từ nhân sâm núi cao được thu hoạch bền vững,
            lưu hóa theo thời gian — được tuyển chọn cho những ai tìm kiếm sức khỏe toàn diện.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#shop"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-primary to-primary-container px-8 py-4 text-body-sm font-body font-semibold text-on-primary hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Khám phá bộ sưu tập
              <span className="material-icons text-base">arrow_forward</span>
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-full border border-outline/30 bg-transparent px-8 py-4 text-body-sm font-body font-semibold text-primary hover:bg-surface-container-low transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Tìm hiểu thêm
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-14 flex flex-wrap gap-6">
            {[
              { icon: 'verified', label: 'Chứng nhận hữu cơ' },
              { icon: 'landscape', label: 'Cao nguyên nguyên sinh' },
              { icon: 'science', label: 'Kiểm định khoa học' },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-on-surface-variant">
                <span className="material-icons text-sm">{badge.icon}</span>
                <span className="text-label-md font-body uppercase tracking-[0.08em]">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
