import Image from 'next/image';
import Link from 'next/link';

// ─── Types ───────────────────────────────────────────────────────────────────

interface OrderProduct {
  name: string;
  variant: string;
  price: string;
  qty: number;
  imageUrl: string;
  imageAlt: string;
}

interface PaymentLineItem {
  label: string;
  amount: string;
  isDiscount?: boolean;
}

// ─── Static data ─────────────────────────────────────────────────────────────
// TODO: replace with real API contract when available

const ORDER_CODE = 'GSG-89234';
const ORDER_DATE = '24 Tháng 10, 2023';
const TRACKING_NUMBER = 'GHN-VN-1029384756';
const CARRIER_NAME = 'Giao Hàng Nhanh (GHN)';
const CARRIER_DESCRIPTION =
  'Đơn hàng đã đến trạm trung chuyển khu vực TP.HCM. Dự kiến giao trong 1-2 ngày tới.';

const PRODUCTS: OrderProduct[] = [
  {
    name: 'Hồng Sâm Củ Khô Thượng Hạng',
    variant: 'Hộp Thiếc Cổ Điển • 300g',
    price: '1,850,000 ₫',
    qty: 1,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDkRwm-giKVmLCFgO84XH2IlJvX0ru3y7SkKHKcL11bPWH2jo-3YD1E0Mrznf6MxCI8YaKlKjLn4et9BQ4ltz0vaOerOqYAhnTuO2vwiqIJfgMpzaSyKFV7C0Nv_LwCgxgWylP0jNTkFcm8l6MOdGqfJTik1Cw3A5Q8UX-YRv9cF4mb2wl_O7WHZL-0wZNzLUmmLJTIAsU7fSEdxSlCRI9TE2MXAive5uoNgIzPY7821zT8SwCJLvf7wmeBY4CSZ8pL3-xRvhW5EAg',
    imageAlt:
      'Premium red ginseng root displayed on a dark slate background with warm cinematic side lighting highlighting its intricate organic texture',
  },
  {
    name: 'Tinh Chất Nhân Sâm Đỏ',
    variant: 'Hộp 30 gói x 10ml',
    price: '1,200,000 ₫',
    qty: 1,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBFQ2Hs93_SAlSGzgBvLMC_MkvxJFClwqUuxWdK5Uk6jrhCi9vAh6nwK3r0QwBs5Ynu1eH_Uw0DxwGBDgSSE0EEKCuSjvH97rA7i7qudj7aOw_Xbs68jCbOAhhZFoDlJtO3fVyXzyZecYaHHkb6eEWJWRN8ZVq0VOaH_NIWOk6ypnGOB4ZCisBbblFiPrtpn6KZOcyZPuR26YC8RAunj3Ae_uYDmXFfVAw0EUrkvM9mU7r2Mgf6BTNkUtEUtLtK2Aj0mTgNq64Tb6I',
    imageAlt:
      'Elegant glass vial containing rich dark red ginseng extract liquid sitting on natural woven fabric with soft natural daylight',
  },
];

const PAYMENT_ITEMS: PaymentLineItem[] = [
  { label: 'Tạm tính', amount: '3,050,000 ₫' },
  { label: 'Vận chuyển', amount: '35,000 ₫' },
  { label: 'Ưu đãi thành viên', amount: '-100,000 ₫', isDiscount: true },
];

const ORDER_TOTAL = '2,985,000 ₫';

// ─── Component ───────────────────────────────────────────────────────────────

export default function MyOrderDetailPage() {
  return (
    <div className="pt-10 pb-24 px-6 max-w-6xl mx-auto">
      {/* Back link */}
      <Link
        href="/my_orders"
        className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors text-sm font-medium mb-8 uppercase tracking-wider"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        Trở về Danh sách Đơn hàng
      </Link>

      {/* Order header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="font-headline text-5xl md:text-6xl text-primary tracking-tight leading-none mb-2">
            {ORDER_CODE}
          </h1>
          <p className="text-on-surface-variant font-medium text-lg">
            Đặt ngày {ORDER_DATE}
          </p>
        </div>
        <div className="bg-secondary-container text-on-secondary-container px-6 py-3 rounded-full flex items-center gap-3">
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_shipping
          </span>
          <span className="font-semibold tracking-wide uppercase text-sm">
            Đang giao hàng
          </span>
        </div>
      </div>

      {/* Layout grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column */}
        <div className="lg:col-span-8 flex flex-col gap-8">

          {/* Status timeline */}
          <section className="bg-surface-container-lowest rounded-xl p-8 lg:p-10">
            <h2 className="font-headline text-2xl text-primary mb-8">
              Trạng thái Hành trình
            </h2>
            <div className="relative flex justify-between items-center w-full max-w-3xl mx-auto">
              {/* Background track: left-6 to right-6 = from first to last circle center */}
              <div className="absolute left-6 right-6 top-6 -translate-y-1/2 h-1 bg-surface-container-high rounded-full z-0" />
              {/* Active track: from first circle center, 2/3 of connector span → node 3 */}
              <div
                className="absolute left-6 top-6 -translate-y-1/2 h-1 bg-secondary rounded-full z-0"
                style={{ width: 'calc((100% - 3rem) * 0.6667)' }}
              />

              {/* Node 1: Đã nhận */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">receipt_long</span>
                </div>
                <span className="text-sm font-medium text-on-surface">Đã nhận</span>
              </div>

              {/* Node 2: Đóng gói */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">inventory_2</span>
                </div>
                <span className="text-sm font-medium text-on-surface">Đóng gói</span>
              </div>

              {/* Node 3: Đang giao (current, highlighted) */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-lg shadow-[rgba(115,91,43,0.2)] scale-110">
                  <span
                    className="material-symbols-outlined text-xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    local_shipping
                  </span>
                </div>
                <span className="text-sm font-bold text-secondary">Đang giao</span>
              </div>

              {/* Node 4: Thành công (inactive) */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">home</span>
                </div>
                <span className="text-sm font-medium text-on-surface-variant">Thành công</span>
              </div>
            </div>
          </section>

          {/* Shipment tracking */}
          <section className="bg-surface-container-low rounded-xl p-8 flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="w-16 h-16 rounded-full bg-surface-container-lowest flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-3xl text-primary">package_2</span>
            </div>
            <div className="flex-grow">
              <p className="text-sm text-on-surface-variant uppercase tracking-wider font-semibold mb-1">
                Đơn vị vận chuyển
              </p>
              <h3 className="font-headline text-xl text-primary mb-2">{CARRIER_NAME}</h3>
              <p className="text-on-surface">{CARRIER_DESCRIPTION}</p>
            </div>
            <div className="bg-surface-container-lowest px-5 py-3 rounded-xl border border-[rgba(223,191,188,0.2)] flex items-center gap-3 cursor-pointer hover:bg-surface transition-colors">
              <span className="font-mono text-secondary font-medium tracking-wide">
                {TRACKING_NUMBER}
              </span>
              <span className="material-symbols-outlined text-secondary text-sm">
                content_copy
              </span>
            </div>
          </section>

          {/* Products list */}
          <section className="mt-4">
            <h2 className="font-headline text-2xl text-primary mb-6">Sản phẩm</h2>
            <div className="flex flex-col gap-4">
              {PRODUCTS.map((product) => (
                <div
                  key={product.name}
                  className="bg-surface-container-lowest rounded-xl p-4 flex gap-6 items-center"
                >
                  <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-surface-container-low relative">
                    <Image
                      src={product.imageUrl}
                      alt={product.imageAlt}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-headline text-lg text-primary mb-1">{product.name}</h4>
                    <p className="text-sm text-on-surface-variant">{product.variant}</p>
                  </div>
                  <div className="text-right pl-4">
                    <p className="text-on-surface font-semibold text-lg whitespace-nowrap">
                      {product.price}
                    </p>
                    <p className="text-sm text-on-surface-variant mt-1">SL: {product.qty}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="lg:col-span-4 flex flex-col gap-8">

          {/* Customer info */}
          <section className="bg-surface-container-lowest rounded-xl p-8">
            <h3 className="font-headline text-xl text-primary mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">location_on</span>
              Nhận hàng
            </h3>
            <div className="space-y-2 text-on-surface">
              <p className="font-semibold text-lg">Nguyễn Văn A</p>
              <p className="text-on-surface-variant leading-relaxed">
                123 Đường Lê Lợi, Phường Bến Nghé
                <br />
                Quận 1, TP. Hồ Chí Minh
              </p>
              <p className="text-on-surface-variant pt-2">090 123 4567</p>
            </div>
          </section>

          {/* Payment summary */}
          <section className="bg-tertiary-container rounded-xl p-8 text-on-tertiary-container relative overflow-hidden">
            {/* Decorative blur */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
            <h3 className="font-headline text-xl text-on-tertiary mb-6">Thanh toán</h3>
            <div className="space-y-4 text-sm font-medium">
              {PAYMENT_ITEMS.map((item) => (
                <div key={item.label} className="flex justify-between items-center">
                  <span className="text-tertiary-fixed-dim">{item.label}</span>
                  <span className={item.isDiscount ? 'text-secondary-fixed' : 'text-on-tertiary'}>
                    {item.amount}
                  </span>
                </div>
              ))}
            </div>
            {/* Ghost divider */}
            <div className="w-full h-px bg-tertiary-fixed-dim/30 my-6" />
            <div className="flex justify-between items-end mb-6">
              <span className="font-headline text-lg text-on-tertiary">Tổng cộng</span>
              <span className="font-headline text-3xl text-secondary-fixed">{ORDER_TOTAL}</span>
            </div>
            <div className="bg-tertiary/50 p-4 rounded-lg border border-tertiary-fixed-dim/20 flex gap-3 items-start">
              <span className="material-symbols-outlined text-secondary-fixed text-lg">
                payments
              </span>
              <p className="text-sm text-tertiary-fixed-dim leading-snug">
                Thanh toán tiền mặt khi nhận hàng (COD)
              </p>
            </div>
          </section>

          {/* Support actions */}
          <section className="flex flex-col gap-4 mt-4">
            <button
              type="button"
              className="btn-primary w-full py-4 px-6 rounded-full font-semibold tracking-wide hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-[rgba(87,0,5,0.2)]"
            >
              <span className="material-symbols-outlined text-sm">support_agent</span>
              YÊU CẦU HỖ TRỢ
            </button>
            <button
              type="button"
              disabled
              className="w-full py-4 px-6 rounded-full border border-outline-variant/40 text-on-surface-variant font-medium tracking-wide flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
            >
              HỦY ĐƠN HÀNG
            </button>
            <p className="text-xs text-center text-on-surface-variant mt-2 px-4">
              Không thể hủy khi đơn hàng đang được giao. Vui lòng liên hệ hỗ trợ.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
