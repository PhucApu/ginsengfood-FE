import Image from 'next/image';
import AccountSidebar from '@/features/account/storefront/components/AccountSidebar';

interface QuickLink {
  icon: string;
  label: string;
}

type OrderStatus = 'shipping' | 'completed';

interface OrderItem {
  code: string;
  name: string;
  price: string;
  status: OrderStatus;
  imageUrl: string;
  imageAlt: string;
  action: string;
}

const QUICK_LINKS: QuickLink[] = [
  { icon: 'edit', label: 'Sửa hồ sơ' },
  { icon: 'location_on', label: 'Quản lý địa chỉ' },
  { icon: 'history', label: 'Lịch sử mua hàng' },
];

// TODO: replace with real API contract when available
const ORDERS: OrderItem[] = [
  {
    code: 'GSG-12345',
    name: 'Hồng Sâm Lát Tẩm Mật Ong',
    price: '2.450.000 ₫',
    status: 'shipping',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDj30ZkJ1aJ69CHlIRIkNYnouWxNS5mPrGnY-lNl6X5vZJDG4gyw-No2N19EsAJe93vJR8-wbFEvlvkwvSfopGfhrz0wi0VA9ZGSGxNuX3mqFuV7LVAcZgpRZ77MWHyTrHFXuxM1acYQvwZJ-0vupCwziWHvAU_B2XV6d6N7I6HPy3mVi3vyNtjdkdmAdR6a5QrhE36GkIiWO4E7miPB8kiQjK_6VvMQcSLLTK53dePtXSQy_L1JaG14dc-ZmvV7tTcDk3bhinPXH0',
    imageAlt:
      'Close up of a premium glass jar containing red ginseng extract on dark slate background',
    action: 'Chi tiết',
  },
  {
    code: 'GSG-11098',
    name: 'Nhân Sâm Tươi Hàn Quốc (Loại 1)',
    price: '4.200.000 ₫',
    status: 'completed',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDx94MZWGAhDtCflnpKGaoSAuq9GTrVvz518g7__wFJDj4DY5_vzMIqALxLeiDvyf2td_yQskIJKOHiz_GaGautol-VqrgVB48dmwZgHPkowRpWl6AM5qn2HP47VLkrlJQoDmr_MGRRFQa0EufiAz-cN2OnktzoLHPks-aCtFkbY-6KgiF6nPePM6Z0HSO5stE5HacUbzU0NFVk6yPisC6R8XZFddVUmHmUWEmA6H8LvO-zorclWgGI83EGG35wnLwvRxUyU2wTXYg',
    imageAlt:
      'Elegant presentation of whole ginseng roots in a wooden display box with soft warm lighting',
    action: 'Mua lại',
  },
];

const WELCOME_AVATAR_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDO5MCnZUITQZBfwPMnOU7PSvv5z3DC3VQDL9iL2JTIXSNd2oiq9pZZIgfz5Ty5cRrXz8ph0zOKykYYssKe9J637F9RLk5v1WXT_46C7-yArcKI2JH3TgX9-tG5Vz6IxwqstMcdyqvnuhqG9rgGAGArjuUEHPcxbm3JbFpoPoyr_N1uu_iSU9EA7MTVjscxB3U6yL3P8sD7TSI4FjIbtxbX95IdpJLshCLwMl67VsbPe9pyoKR5Gu8dANNAZU6Nxu23Q68zauK3XgY';

const AI_BANNER_IMAGE_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBHbFRH4tydwKKwMvNR2g8IEitcqeym8kM03tB4BiBH3d4Q6BRotJWA48-gkr5uj_S_TPeAGAyZCk3n_YnV0DkDUROyOhaBKf9tYPJwBL6A01RKMfj-TdVhA_fWFaXlfUtyhh35bex78EoeY1Hq0ZPWO9IDs-P62J1O4e4C9uuVxEd92m0g183tzhjWffPDRRIcCyvZLGWaLd2eYmrcSzSlUARe4NaY8UNFyopV8VquAy8LsavtxWi5aOvEFAWCagGyJ0BaK8DTIRU';

export default function MyAccountPage() {
  return (
    <div className="max-w-screen-2xl mx-auto w-full px-4 md:px-8 py-10 flex flex-col md:flex-row gap-12 flex-grow">
      {/* ── Left Sidebar Nav ───────────────────────────────── */}
      <AccountSidebar activeItem="profile" />

      {/* ── Main Content Canvas ────────────────────────────── */}
      <main className="flex-1 pb-24">
        <div className="pb-8 space-y-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex text-sm text-[#735b2b] font-medium">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <a href="#" className="hover:text-[#570005] transition-colors">
                  Trang chủ
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-sm mx-1">chevron_right</span>
                  <a href="#" className="hover:text-[#570005] transition-colors">
                    Tài khoản
                  </a>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-sm mx-1">chevron_right</span>
                  <span className="text-[#570005]">Hồ sơ cá nhân</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Page heading */}
          <div>
            <h1 className="font-headline text-4xl text-primary tracking-tight mb-2">
              Tổng quan tài khoản
            </h1>
            <p className="text-on-surface-variant text-sm">
              Quản lý hành trình sức khỏe và ưu đãi của bạn.
            </p>
          </div>

          {/* Top Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Welcome Card */}
            <div className="md:col-span-2 bg-[#f5f3ef] rounded-2xl p-8 relative overflow-hidden flex flex-col justify-center min-h-[200px]">
              <div className="absolute -right-10 -top-10 w-64 h-64 bg-[#fbf9f5] rounded-full opacity-50 blur-3xl pointer-events-none" />
              <div className="relative z-10 flex items-center gap-6">
                <Image
                  src={WELCOME_AVATAR_URL}
                  alt="Avatar"
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full object-cover shadow-[0_8px_40px_rgba(27,28,26,0.06)] border-4 border-white flex-shrink-0"
                />
                <div>
                  <h2 className="font-headline text-3xl text-[#570005]">Nguyễn Văn A</h2>
                  <p className="text-[#735b2b] mt-1 font-medium">Thành viên từ 2023</p>
                </div>
              </div>
            </div>

            {/* Tier Summary Card */}
            <div className="bg-white rounded-2xl p-8 shadow-[0_8px_40px_rgba(27,28,26,0.04)] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#fddba0]/20 to-transparent pointer-events-none" />
              <div className="relative z-10 flex justify-between items-start mb-6">
                <div>
                  <p className="text-xs font-bold text-[#735b2b] uppercase tracking-widest mb-1">
                    Hiện tại
                  </p>
                  <h3 className="font-headline text-2xl text-[#1b1c1a]">Hạng Bạch Kim</h3>
                </div>
                <span
                  className="material-symbols-outlined text-[#fddba0] text-4xl"
                  style={{
                    fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                  }}
                >
                  workspace_premium
                </span>
              </div>
              <div className="relative z-10">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#58413f] font-medium">2,450 Điểm</span>
                  <span className="text-[#735b2b] font-medium">
                    1,550 Điểm nữa để thăng hạng
                  </span>
                </div>
                <div className="h-1.5 w-full bg-[#e4e2de] rounded-full overflow-hidden">
                  <div className="h-full bg-[#735b2b] w-[60%] rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {QUICK_LINKS.map((link) => (
              <a
                key={link.label}
                className="bg-white rounded-xl p-6 flex items-center gap-4 hover:bg-[#f5f3ef] transition-colors group"
                href="#"
              >
                <div className="w-12 h-12 rounded-full bg-[#efeeea] flex items-center justify-center text-[#570005] group-hover:bg-[#570005] group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">{link.icon}</span>
                </div>
                <span className="font-medium text-[#1b1c1a]">{link.label}</span>
              </a>
            ))}
          </div>

          {/* Recent Orders Section */}
          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-headline text-2xl text-[#1b1c1a]">Đơn hàng gần đây</h2>
              <a
                className="text-sm font-bold text-[#735b2b] hover:text-[#570005] transition-colors"
                href="#"
              >
                Xem tất cả
              </a>
            </div>
            <div className="bg-[#f5f3ef] rounded-2xl overflow-hidden">
              <div className="flex flex-col gap-4 p-4">
                {ORDERS.map((order) => (
                  <div
                    key={order.code}
                    className="bg-white p-6 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-lg bg-[#fbf9f5] flex items-center justify-center overflow-hidden flex-shrink-0">
                        <Image
                          src={order.imageUrl}
                          alt={order.imageAlt}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover opacity-90"
                        />
                      </div>
                      <div>
                        <p className="text-xs text-[#58413f] mb-1">
                          Mã đơn:{' '}
                          <span className="font-bold text-[#1b1c1a]">{order.code}</span>
                        </p>
                        <h4 className="font-headline font-bold text-[#1b1c1a]">{order.name}</h4>
                        <p className="text-sm text-[#735b2b] mt-1">{order.price}</p>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                      {order.status === 'shipping' ? (
                        <span className="px-3 py-1 rounded-full bg-[#fddba0]/50 text-[#735b2b] text-xs font-bold uppercase tracking-wide">
                          Đang giao
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-[#c5ecc9] text-[#8bb191] text-xs font-bold uppercase tracking-wide">
                          Hoàn thành
                        </span>
                      )}
                      <button className="text-sm text-[#570005] font-medium hover:underline">
                        {order.action}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Alchemist Banner: AI Advisor */}
          <section className="bg-[#22442b] rounded-[2rem] overflow-hidden flex flex-col md:flex-row items-center relative shadow-[0_8px_40px_rgba(27,28,26,0.06)]">
            <div className="p-10 md:p-16 md:w-1/2 relative z-10">
              <h2 className="font-headline text-3xl md:text-4xl text-[#8bb191] mb-4">
                Hành trình cá nhân hóa
              </h2>
              <p className="text-[#a9d0ae] text-sm mb-8 leading-relaxed max-w-md">
                Khai mở bí quyết dưỡng sinh phù hợp với thể trạng của riêng bạn thông qua trí
                tuệ nhân tạo được đào tạo từ y lý cổ truyền.
              </p>
              <button className="btn-primary px-8 py-3 font-medium text-sm inline-flex items-center gap-2 hover:opacity-90 transition-opacity">
                Hỏi Cố vấn AI
                <span className="material-symbols-outlined text-[18px]">psychology</span>
              </button>
            </div>
            <div className="md:w-1/2 h-64 w-full relative self-stretch">
              <Image
                src={AI_BANNER_IMAGE_URL}
                alt="AI Concept"
                fill
                className="object-cover opacity-80 mix-blend-luminosity"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Mobile: gradient overlay from left */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#22442b] to-transparent md:hidden" />
              {/* Desktop: gradient overlay from right edge to left */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#22442b] hidden md:block" />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
