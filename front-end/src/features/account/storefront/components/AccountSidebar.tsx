import Image from 'next/image';

// ─── Types ───────────────────────────────────────────────────────────────────

export type AccountNavId = 'profile' | 'address' | 'orders' | 'membership';

interface AccountSidebarProps {
  activeItem: AccountNavId;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SIDEBAR_AVATAR_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA1y4g7GxsoRM9iHqUHGJ5sTYIspvDIW-6NPYNqt0MiO8BmXeY1klEgGS1At8bJcsOQGW1xu2cUrh_u79BbZZRgtKGrNIiVLcXPzOxUU_Ifg-eAY3LMhXvUoE8emW6fw8pLq5E1VMGL2oaRywPqXLOwGpFGAiqeU3OHO09h8mIBwxy6q7mad2-BgEXvpLEnSkWfEUe5rM0RvMSYaP2jQsohhvBCe7ECNqhzb8xjz6gSErQqto7ta2SOQA6jwjD4Dwk7j_jWrencNac';

const NAV_ITEMS: Array<{ id: AccountNavId; icon: string; label: string }> = [
  { id: 'profile', icon: 'account_circle', label: 'Hồ sơ của tôi' },
  { id: 'address', icon: 'location_on', label: 'Địa chỉ giao hàng' },
  { id: 'orders', icon: 'history_edu', label: 'Đơn hàng của tôi' },
  { id: 'membership', icon: 'military_tech', label: 'Hạng thành viên' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function AccountSidebar({ activeItem }: AccountSidebarProps) {
  return (
    <aside className="hidden md:flex flex-col w-72 shrink-0 sticky top-[100px] self-start max-h-[calc(100vh-120px)] overflow-y-auto bg-white rounded-xl shadow-[0_4px_20px_rgba(27,28,26,0.04)] border border-[#dfbfbc]/15 py-8">
      {/* Header Profile */}
      <div className="px-8 mb-10 flex items-center gap-4">
        <Image
          src={SIDEBAR_AVATAR_URL}
          alt="Ảnh đại diện"
          width={56}
          height={56}
          className="w-14 h-14 rounded-full object-cover shadow-[0_8px_40px_rgba(27,28,26,0.06)] border-2 border-white flex-shrink-0"
        />
        <div>
          <h2 className="font-headline text-lg text-[#570005] font-bold leading-tight">
            Chào mừng, Quý khách
          </h2>
          <p className="font-label text-xs text-[#735b2b] mt-1 font-medium tracking-wide">
            Thành viên Bạch Kim
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 flex flex-col gap-2">
        {NAV_ITEMS.map((item) =>
          item.id === activeItem ? (
            <a
              key={item.id}
              href="#"
              className="flex items-center gap-3 text-[#570005] font-bold bg-[#f5f3ef] rounded-l-full ml-4 pl-4 py-3 relative"
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
              >
                {item.icon}
              </span>
              <span className="font-label text-sm">{item.label}</span>
              <div className="absolute right-0 top-0 h-full w-1 bg-[#570005] rounded-l-full" />
            </a>
          ) : (
            <a
              key={item.id}
              href="#"
              className="flex items-center gap-3 text-[#1b1c1a]/70 pl-8 py-3 hover:text-[#570005] hover:pl-10 transition-all duration-[400ms]"
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span className="font-label text-sm font-medium">{item.label}</span>
            </a>
          )
        )}
      </div>

      {/* Logout */}
      <div className="px-8 mt-8">
        <button
          type="button"
          className="w-full py-3 rounded-full border border-[#dfbfbc]/40 text-[#735b2b] font-medium text-sm hover:bg-[#f5f3ef] transition-colors flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[16px]">logout</span>
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
