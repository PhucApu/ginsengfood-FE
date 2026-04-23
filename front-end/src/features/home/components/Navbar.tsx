import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Trang chủ', href: '#' },
  { label: 'Cửa hàng', href: '#shop' },
  { label: 'Về chúng tôi', href: '#about' },
  { label: 'Liên hệ', href: '#contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl shadow-[0_8px_40px_rgba(27,28,26,0.06)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-20 xl:px-28">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 shrink-0">
            <span className="text-headline-sm font-headline font-medium text-primary tracking-tight">
              Heritage Ginseng
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-body-sm font-body text-on-surface-variant hover:text-primary transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              aria-label="Giỏ hàng"
              className="relative p-2 rounded-md text-on-surface-variant hover:bg-surface-container transition-colors"
            >
              <span className="material-icons text-xl">shopping_bag</span>
            </button>
            <button
              aria-label="Tài khoản"
              className="p-2 rounded-md text-on-surface-variant hover:bg-surface-container transition-colors"
            >
              <span className="material-icons text-xl">person</span>
            </button>
            {/* Mobile toggle */}
            <button
              aria-label="Mở menu"
              className="md:hidden p-2 rounded-md text-on-surface-variant hover:bg-surface-container transition-colors"
              onClick={() => setMobileOpen((o) => !o)}
            >
              <span className="material-icons text-xl">{mobileOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-outline-variant/20 bg-surface-container-low px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-body-md font-body text-on-surface hover:text-primary transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
