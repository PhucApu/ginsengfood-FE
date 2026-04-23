const FOOTER_LINKS = [
  { label: 'Trang chủ', href: '#' },
  { label: 'Cửa hàng', href: '#shop' },
  { label: 'Về chúng tôi', href: '#about' },
  { label: 'Liên hệ', href: '#contact' },
  { label: 'Chính sách bảo mật', href: '#' },
  { label: 'Điều khoản dịch vụ', href: '#' },
  { label: 'Chứng nhận chất lượng', href: '#' },
  { label: 'Vận chuyển & Đổi trả', href: '#' },
];

export function Footer() {
  return (
    <footer className="bg-surface-container-highest text-on-surface">
      <div className="mx-auto max-w-7xl px-6 lg:px-20 xl:px-28 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h2 className="text-headline-sm font-headline font-medium text-primary mb-3">
              Heritage Ginseng
            </h2>
            <p className="text-body-md font-body text-on-surface-variant leading-relaxed">
              Alchemizing tradition for modern vitality.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-body-sm font-body text-on-surface-variant hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-outline-variant/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-body-sm font-body text-on-surface-variant">
            © 2024 Heritage Ginseng. Alchemizing tradition for modern vitality.
          </p>
          <div className="flex items-center gap-4">
            {['facebook', 'instagram', 'youtube'].map((social) => (
              <a
                key={social}
                href="#"
                aria-label={social}
                className="text-on-surface-variant hover:text-primary transition-colors capitalize text-body-sm font-body"
              >
                {social.charAt(0).toUpperCase() + social.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
