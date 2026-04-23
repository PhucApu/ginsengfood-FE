import Image from 'next/image';

// ─── Types ───────────────────────────────────────────────────────────────────

interface TransactionDetail {
  label: string;
  value: string;
}

interface OrderItem {
  id: string;
  name: string;
  details: string;
  price: string;
  imageUrl: string;
  imageAlt: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────
// TODO: replace with real API contract when available

const transactionDetails: TransactionDetail[] = [
  { label: 'Mã giao dịch', value: 'GSG-98213' },
  { label: 'Phương thức', value: 'Thẻ tín dụng' },
  { label: 'Thời gian', value: '15/10/2023 14:30' },
];

const orderItems: OrderItem[] = [
  {
    id: '1',
    name: 'Hồng Sâm Củ Khô Cao Cấp',
    details: 'Số lượng: 1 • Hộp gỗ 500g',
    price: '2.100.000₫',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuATUdArOaR42n63nFL8rSSp4TcZI5i4MG3lljVBxmdl3zsT4_XHNSjXzToVEvWPMFiPBad79kZulK2t9Tk_gB9rysLLgPc83S8c3suSE5qcOM00AUncLdRIwHppzx9zBpK5RNCnyft67_PHx75j1-WWO09hVgWAP4FhEbMpI9of6I02cF4ohNuAHkQcRYdsvnTDZ8cDvQ5FZbmLTkfzgVguN64nVJgBqpa0uF-GTgH-yjEFbkoyuCu3hymAgcc2tEaFtbD9ITaw4ZU',
    imageAlt: 'Hồng Sâm Củ Khô',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function CheckoutSuccessPage() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">

        {/* ── Result Hero ── */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#22442b] text-[#8bb191] mb-4">
            <span
              className="material-symbols-outlined text-5xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
          </div>
          <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tight text-[#570005]">
            Thanh toán thành công!
          </h1>
          <p className="font-body text-[#58413f] text-lg">
            Cảm ơn bạn đã mua sắm tại Heritage Ginseng. Đơn hàng của bạn đang được chuẩn bị.
          </p>
        </div>

        {/* ── Content Area ── */}
        <div className="bg-[#f5f3ef] rounded-xl p-6 sm:p-10 space-y-8">

          {/* Transaction Summary Card */}
          <div className="bg-white rounded-xl p-6 relative shadow-[0_8px_40px_rgba(27,28,26,0.06)]">
            <h2 className="font-headline text-xl font-bold text-[#1b1c1a] mb-6">
              Chi tiết giao dịch
            </h2>
            <dl className="space-y-4 font-body text-sm">
              {transactionDetails.map((detail) => (
                <div key={detail.label} className="flex justify-between items-center">
                  <dt className="text-[#58413f]">{detail.label}</dt>
                  <dd className="font-medium text-[#1b1c1a]">{detail.value}</dd>
                </div>
              ))}
              {/* Total row with divider */}
              <div className="flex justify-between items-center pt-4 mt-4 relative">
                <div className="absolute top-0 left-0 right-0 h-px bg-[#dfbfbc] opacity-20" />
                <dt className="text-[#1b1c1a] font-bold text-base">Tổng số tiền</dt>
                <dd className="font-bold text-[#570005] text-xl">2.100.000₫</dd>
              </div>
            </dl>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <div className="flex justify-between items-end mb-4">
              <h2 className="font-headline text-xl font-bold text-[#1b1c1a]">
                Đơn hàng <span className="text-[#735b2b]">#HG-10293</span>
              </h2>
              <a
                href="#"
                className="font-body text-sm font-medium text-[#735b2b] hover:text-[#570005] transition-colors inline-flex items-center gap-1"
              >
                Xem chi tiết{' '}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>

            <ul className="space-y-4">
              {orderItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start gap-4 p-4 rounded-xl bg-[#e4e2de] transition-transform hover:-translate-y-1 duration-300"
                >
                  <div className="w-16 h-16 rounded-lg bg-[#e4e2de] overflow-hidden shrink-0 relative">
                    <Image
                      src={item.imageUrl}
                      alt={item.imageAlt}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-headline font-bold text-[#1b1c1a] text-base">
                      {item.name}
                    </h3>
                    <p className="font-body text-sm text-[#58413f] mt-1">{item.details}</p>
                  </div>
                  <div className="font-body font-bold text-[#1b1c1a] text-right">
                    {item.price}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Block */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              className="w-full sm:w-1/2 rounded-full py-4 px-6 font-body font-bold text-center transition-all bg-gradient-to-br from-[#570005] to-[#7b1113] text-white hover:shadow-[0_8px_40px_rgba(27,28,26,0.06)]"
            >
              Tiếp tục mua sắm
            </button>
            <button
              type="button"
              className="w-full sm:w-1/2 rounded-full py-4 px-6 font-body font-bold text-center transition-all bg-transparent text-[#735b2b] border border-[#dfbfbc]/20 hover:bg-[#e4e2de]"
            >
              Xem đơn hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
