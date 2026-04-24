import Image from 'next/image';
import FadeInSection from '@/shared/components/FadeInSection';

interface BenefitRow {
  label: string;
  silver: string;
  gold: string;
  platinum: string;
  diamond: string;
  type: 'text' | 'icon';
}

const benefitRows: BenefitRow[] = [
  {
    label: 'Chiết khấu mua hàng',
    silver: '5%',
    gold: '10%',
    platinum: '15%',
    diamond: '20%',
    type: 'text',
  },
  {
    label: 'Early Access (Golden Hour)',
    silver: '5 phút',
    gold: '10 phút',
    platinum: '15 phút',
    diamond: '30 phút',
    type: 'text',
  },
  {
    label: 'CSKH Ưu Tiên (IVR)',
    silver: 'check_circle',
    gold: 'check_circle',
    platinum: 'check_circle',
    diamond: 'check_circle',
    type: 'icon',
  },
  {
    label: 'Giới hạn sản phẩm/đơn',
    silver: '1',
    gold: '2',
    platinum: '4',
    diamond: '6',
    type: 'text',
  },
];

export default function MembershipsPage() {
  return (
    <div className="flex-grow pb-24 space-y-32">
      {/* Hero Section */}
      <FadeInSection>
      <section className="max-w-screen-2xl mx-auto px-12 pt-12">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left: Copy */}
          <div className="w-full lg:w-1/2 space-y-8">
            <h1 className="text-6xl font-headline tracking-tighter leading-tight text-primary">
              Đặc quyền hạng thành viên GINSENGFOOD
            </h1>
            <p className="text-lg text-on-surface-variant max-w-xl">
              Trải nghiệm những ưu đãi độc quyền dành riêng cho khách hàng thân thiết. Khám phá
              các mức chiết khấu, quyền lợi mua sớm và hỗ trợ ưu tiên trên hành trình chăm sóc
              sức khỏe cùng nhân sâm thượng hạng.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 bg-secondary-container text-on-secondary-container px-4 py-2 rounded-full text-sm font-semibold">
                <span className="material-symbols-outlined text-sm">local_offer</span>
                Chiết khấu 5-20%
              </div>
              <div className="flex items-center gap-2 bg-secondary-container text-on-secondary-container px-4 py-2 rounded-full text-sm font-semibold">
                <span className="material-symbols-outlined text-sm">schedule</span>
                Golden Hour 5-30 phút
              </div>
            </div>
          </div>

          {/* Right: Hero image */}
          <div className="w-full lg:w-1/2 relative h-[500px]">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl8DVvdc5kPs2jte2MKEX1fHAC4k7sP4kXlVwt4-kbWCMS1NB682LqZ1DbQcyEPr-sqmbMeD5GDPqeJcZiDtMR9gdCkAKb_sW9Tkk3we1joNWFBIymz3adxpqzFXc-jEYpxvYNeO8MnS7JmjtCj8TPkuTdORccZBat3r2jTddB5fZYSTlVqUM0ZmVkwCwk-zhbhNwnA4wuK12t3Cyx-PcqZI2MUS04830pFlwLdnleD5PVPBUxG1uethOMoAymdlm8hDO6aPfY7Cs"
              alt="Premium ginseng root on dark elegant background with gold accents"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover rounded-xl shadow-[0_20px_60px_rgba(27,28,26,0.1)]"
            />
          </div>
        </div>
      </section>
      </FadeInSection>

      {/* Member Progress Section */}
      <FadeInSection delay={100}>
      <section className="max-w-screen-xl mx-auto px-12">
        <div className="bg-surface-container-lowest p-8 rounded-xl ambient-shadow flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Rank avatar + label */}
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-secondary text-on-secondary flex items-center justify-center border-4 border-secondary-container flex-shrink-0">
              <span
                className="material-symbols-outlined text-4xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                workspace_premium
              </span>
            </div>
            <div>
              <p className="text-sm text-on-surface-variant font-semibold uppercase tracking-widest mb-1">
                Hạng hiện tại của bạn
              </p>
              <h3 className="text-3xl font-headline text-secondary">GOLD MEMBER</h3>
            </div>
          </div>

          {/* Progress bar */}
          <div className="flex-grow max-w-xl w-full">
            <div className="flex justify-between text-sm mb-2 font-semibold">
              <span className="text-on-surface">5.200.000 ₫</span>
              <span className="text-secondary">Mục tiêu: PLATINUM</span>
            </div>
            <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full bg-secondary rounded-full" style={{ width: '74%' }} />
            </div>
            <p className="text-right text-xs mt-2 text-on-surface-variant">
              Chỉ cần chi tiêu thêm 1.800.000 ₫ để thăng hạng
            </p>
          </div>

          {/* CTA */}
          <div>
            <button
              type="button"
              className="btn-primary px-8 py-3 font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Mua sắm ngay
            </button>
          </div>
        </div>
      </section>
      </FadeInSection>

      {/* Tier Ladder & Matrix */}
      <FadeInSection delay={150}>
      <section className="max-w-screen-2xl mx-auto px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-headline text-primary mb-4">So Sánh Đặc Quyền</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">
            Chi tiết quyền lợi cho từng phân hạng thành viên. Tích lũy chi tiêu để mở khóa
            những ưu đãi cao cấp nhất.
          </p>
        </div>

        <div className="overflow-x-auto pb-8">
          <table className="w-full min-w-[900px] text-left border-collapse">
            <thead>
              <tr>
                {/* Benefit label column */}
                <th className="p-6 font-headline text-lg text-on-surface border-b-2 border-outline-variant/30 w-1/4">
                  Quyền lợi
                </th>

                {/* SILVER */}
                <th className="p-6 border-b-2 border-outline-variant/30 w-[18%]">
                  <div className="text-center">
                    <span className="inline-block px-3 py-1 bg-surface-container text-on-surface rounded-full text-xs font-bold mb-2">
                      SILVER
                    </span>
                    <div className="text-sm font-normal text-on-surface-variant">0 - 2tr VND</div>
                  </div>
                </th>

                {/* GOLD — highlighted column */}
                <th className="p-6 border-b-2 border-secondary/50 w-[18%] bg-secondary-container/10">
                  <div className="text-center">
                    <span className="inline-block px-3 py-1 bg-secondary text-on-secondary rounded-full text-xs font-bold mb-2">
                      GOLD
                    </span>
                    <div className="text-sm font-normal text-on-surface-variant">2tr - 7tr VND</div>
                  </div>
                </th>

                {/* PLATINUM */}
                <th className="p-6 border-b-2 border-outline-variant/30 w-[18%]">
                  <div className="text-center">
                    <span className="inline-block px-3 py-1 bg-[#8fa492] text-on-tertiary rounded-full text-xs font-bold mb-2">
                      PLATINUM
                    </span>
                    <div className="text-sm font-normal text-on-surface-variant">7tr - 20tr VND</div>
                  </div>
                </th>

                {/* DIAMOND — highlighted column */}
                <th className="p-6 border-b-2 border-primary/50 w-[18%] bg-primary/5">
                  <div className="text-center">
                    <span className="inline-block px-3 py-1 bg-primary text-on-primary rounded-full text-xs font-bold mb-2">
                      DIAMOND
                    </span>
                    <div className="text-sm font-normal text-on-surface-variant">&gt; 20tr VND</div>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {benefitRows.map((row) => (
                <tr key={row.label} className="group hover:bg-surface-container-low transition-colors">
                  {/* Label */}
                  <td className="p-6 font-semibold text-on-surface border-b border-outline-variant/20">
                    {row.label}
                  </td>

                  {/* SILVER */}
                  <td className="p-6 text-center border-b border-outline-variant/20 text-on-surface-variant">
                    {row.type === 'icon' ? (
                      <span className="material-symbols-outlined text-tertiary">{row.silver}</span>
                    ) : (
                      row.silver
                    )}
                  </td>

                  {/* GOLD */}
                  <td
                    className={`p-6 text-center border-b border-outline-variant/20 bg-secondary-container/10 ${
                      row.type === 'text' ? 'font-bold text-secondary' : ''
                    }`}
                  >
                    {row.type === 'icon' ? (
                      <span className="material-symbols-outlined text-tertiary">{row.gold}</span>
                    ) : (
                      row.gold
                    )}
                  </td>

                  {/* PLATINUM */}
                  <td className="p-6 text-center border-b border-outline-variant/20 text-on-surface-variant">
                    {row.type === 'icon' ? (
                      <span className="material-symbols-outlined text-tertiary">
                        {row.platinum}
                      </span>
                    ) : (
                      row.platinum
                    )}
                  </td>

                  {/* DIAMOND */}
                  <td
                    className={`p-6 text-center border-b border-outline-variant/20 bg-primary/5 ${
                      row.type === 'text' ? 'font-bold text-primary' : ''
                    }`}
                  >
                    {row.type === 'icon' ? (
                      <span className="material-symbols-outlined text-tertiary">
                        {row.diamond}
                      </span>
                    ) : (
                      row.diamond
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      </FadeInSection>
    </div>
  );
}
