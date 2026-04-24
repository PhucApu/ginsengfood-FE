import Image from 'next/image';
import Link from 'next/link';

export default function StorefrontHeader() {
  return (
    <header className="sticky top-0 z-50 bg-stone-50/80 backdrop-blur-xl shadow-[0_8px_40px_rgba(27,28,26,0.06)]">
      <div className="flex justify-between items-center w-full px-8 py-6 max-w-screen-2xl mx-auto">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/sasamgroup.gif"
            alt="Sasam Group logo"
            width={140}
            height={44}
            unoptimized
            priority
            className="h-11 w-auto object-contain"
          />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          <Link
            className="text-stone-600 font-medium hover:text-red-800 transition-colors duration-300 scale-95 active:opacity-80 transition-all font-headline tracking-tight"
            href="/"
          >
            Trang chủ
          </Link>
          <Link
            className="text-stone-600 font-medium hover:text-red-800 transition-colors duration-300 scale-95 active:opacity-80 transition-all font-headline tracking-tight"
            href="#"
          >
            Về chúng tôi
          </Link>
          <Link
            className="text-stone-600 font-medium hover:text-red-800 transition-colors duration-300 scale-95 active:opacity-80 transition-all font-headline tracking-tight"
            href="/products"
          >
            Sản phẩm
          </Link>
          <Link
            className="text-stone-600 font-medium hover:text-red-800 transition-colors duration-300 scale-95 active:opacity-80 transition-all font-headline tracking-tight"
            href="/gold_hour"
          >
            Giờ Vàng
          </Link>
          <Link
            className="text-stone-600 font-medium hover:text-red-800 transition-colors duration-300 scale-95 active:opacity-80 transition-all font-headline tracking-tight"
            href="/memberships"
          >
            Thành viên
          </Link>
          <Link
            className="text-stone-600 font-medium hover:text-red-800 transition-colors duration-300 scale-95 active:opacity-80 transition-all font-headline tracking-tight"
            href="/news"
          >
            Bài viết / Kiến thức
          </Link>
        </nav>

        {/* Trailing Icons */}
        <div className="flex items-center space-x-4 text-red-900">
          <button className="hover:text-red-800 transition-colors duration-300 scale-95 active:opacity-80 transition-all">
            <span className="material-symbols-outlined">shopping_bag</span>
          </button>

          {/* User Menu */}
          <div className="relative group">
            <button className="hover:text-red-800 transition-colors duration-300 scale-95 active:opacity-80 transition-all">
              <span className="material-symbols-outlined">person</span>
            </button>
            <div className="absolute right-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[60]">
              <div className="bg-white rounded-lg shadow-xl border border-stone-100 overflow-hidden">
                <div className="px-4 py-3 border-b border-stone-100">
                  <p className="text-sm font-bold text-red-950 truncate">Kim Cương Member</p>
                  <p className="text-xs text-stone-500 truncate">member@heritage.com</p>
                </div>
                <div className="py-1">
                  <a
                    className="flex items-center gap-2 px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
                    href="#"
                  >
                    <span className="material-symbols-outlined text-lg">settings</span>
                    Account Settings
                  </a>
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors">
                    <span className="material-symbols-outlined text-lg">logout</span>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
