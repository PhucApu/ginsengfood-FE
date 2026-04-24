'use client';

import { useState } from 'react';
import Image from 'next/image';
import AccountSidebar from '@/features/account/storefront/components/AccountSidebar';

// ─── Types ───────────────────────────────────────────────────────────────────

type OrderStatus = 'all' | 'pending-payment' | 'processing' | 'shipping' | 'completed' | 'cancelled';
type MobileNavId = 'home' | 'history' | 'discovery' | 'wellness' | 'account';

interface OrderItem {
  name: string;
  variant: string;
  qty: number;
  price: string;
  imageUrl: string;
  imageAlt: string;
}

interface OrderCard {
  id: string;
  code: string;
  date: string;
  status: OrderStatus;
  statusLabel: string;
  statusBadgeClass: string;
  statusIconName: string;
  paymentLabel?: string;
  items: OrderItem[];
  extraItemsCount?: number;
  total: string;
  actions: Array<{ label: string; variant: 'outline' | 'primary' }>;
}

// ─── Static Data ──────────────────────────────────────────────────────────────────────────────

const statusTabs: Array<{ id: OrderStatus; label: string }> = [
  { id: 'all', label: 'Tất cả' },
  { id: 'pending-payment', label: 'Chờ thanh toán' },
  { id: 'processing', label: 'Đang xử lý' },
  { id: 'shipping', label: 'Đang giao' },
  { id: 'completed', label: 'Hoàn thành' },
  { id: 'cancelled', label: 'Đã hủy' },
];

// TODO: replace with real API contract when available
const mockOrders: OrderCard[] = [
  {
    id: '1',
    code: 'GSG-89234',
    date: '20/05/2024',
    status: 'shipping',
    statusLabel: 'Đang giao',
    statusBadgeClass: 'bg-secondary-container text-on-secondary-container',
    statusIconName: 'local_shipping',
    paymentLabel: 'Đã thanh toán',
    items: [
      {
        name: 'Hồng Sâm Lát Tẩm Mật Ong Cao Cấp 200g',
        variant: 'Hộp gỗ',
        qty: 2,
        price: '1.200.000 đ',
        imageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCNnYAq9vS9K5W6GM4DhNXGYtk1CgTo_wxmue-SapjgpqDYxO0DnkKoRjNnJJZUNydIaplOaOrIwLaTIwGT4PqnjED1BbxzArb822yQg4X8rN_hBahO7gjP86Fu4Uzj68ttqhMlos16zGrDDQvE6hdVr8mK93Aw4psBqgLYJjRln9Qz0IQw3OrCMBt6l9z9-yrtw71wuEADaLAYya14GbMORK_-HHgDczFlsiibAKYszVgfRRVgYm-uler9ZwCMUf1VOjRp8MHkU_M',
        imageAlt: 'Premium red ginseng roots in traditional wooden box',
      },
    ],
    extraItemsCount: 1,
    total: '2.850.000 đ',
    actions: [
      { label: 'Xem chi tiết', variant: 'outline' },
      { label: 'Theo dõi đơn', variant: 'primary' },
    ],
  },
  {
    id: '2',
    code: 'GSG-88102',
    date: '05/04/2024',
    status: 'completed',
    statusLabel: 'Hoàn thành',
    statusBadgeClass: 'bg-tertiary-fixed text-on-tertiary-fixed',
    statusIconName: 'done_all',
    items: [
      {
        name: 'Tinh Chất Hồng Sâm Pha Sẵn Thượng Hạng',
        variant: 'Hộp 30 gói',
        qty: 1,
        price: '1.850.000 đ',
        imageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCmOJncG-HmuJjB14AYQMtR9FbdzyKLFqwbnrvhoI7ErqX_ZGq98PVLscfcVIoL1cYAQ09tW2bn7lROsY2-aFzjU1Me7vse3t9EhPcW942TdJdrIRdzrxp8z9AviiiRH7yWMJCDVqX7Dfw_F6TTI1N6lWIv_850WTQWLP1kStCf6prXec3wf2LpgengAImjtOjiRSC7eaFAJYqK6Q0j51Pr_5dmMvW2LX40fjQnAdLRb2wEB5b-HQF1rbVfVJefL9HcvJ0NPtCTGNc',
        imageAlt: 'Korean ginseng extract bottle',
      },
    ],
    total: '1.850.000 đ',
    actions: [
      { label: 'Đánh giá', variant: 'outline' },
      { label: 'Mua lại', variant: 'outline' },
    ],
  },
  {
    id: '3',
    code: 'GSG-89551',
    date: '22/05/2024',
    status: 'pending-payment',
    statusLabel: 'Chờ thanh toán',
    statusBadgeClass: 'bg-surface-variant text-on-surface-variant',
    statusIconName: 'pending_actions',
    items: [
      {
        name: 'Trà Nhân Sâm Thảo Mộc Kỷ Tử',
        variant: 'Hộp giấy 100g',
        qty: 3,
        price: '450.000 đ',
        imageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBXN3YGQAjPF0RSTIqJoV3zqp6Crot57E5ggDTt2Av8Q-L-Ej19yEGWTohPe2kBbf48wimxHIqzMf2jZBdl58t_Ck3860QoJcqUTXplxqj2YeECyS79oc95zIelQGvYEch1HZiL47WVfRVs9j5hO3FMm6V9VRncpgjn8HENkocRGQGRGZCSK5KGFIBQtnF49Z3tf245-XdMyoq-EZCzp7EFbrsb0mbWtF9SUbeYDq8biHUwXZ9uTEty2ciCc74QN3M9WJfm7zxCHnQ',
        imageAlt: 'Dried herbal tea ingredients',
      },
    ],
    total: '1.350.000 đ',
    actions: [
      { label: 'Hủy đơn', variant: 'outline' },
      { label: 'Thanh toán lại', variant: 'primary' },
    ],
  },
];

const mobileNavItems: Array<{ id: MobileNavId; icon: string; label: string; active?: boolean }> = [
  { id: 'home', icon: 'home_health', label: 'Home' },
  { id: 'history', icon: 'receipt_long', label: 'History', active: true },
  { id: 'discovery', icon: 'explore', label: 'Discovery' },
  { id: 'wellness', icon: 'spa', label: 'Wellness' },
  { id: 'account', icon: 'person', label: 'Account' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function MyOrdersPage() {
  const [activeTab, setActiveTab] = useState<OrderStatus>('all');
  const [searchValue, setSearchValue] = useState('');
  const [dateFilter, setDateFilter] = useState('30-days');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMobileNav, setActiveMobileNav] = useState<MobileNavId>('history');

  return (
    <>
      {/* ── Page body ─────────────────────────────────────────────────────── */}
      <div className="max-w-screen-2xl mx-auto w-full px-4 md:px-8 py-10 flex flex-col md:flex-row gap-12 flex-grow">

        {/* ── Sidebar Navigation (desktop) ──────────────────────────────── */}
        <AccountSidebar activeItem="orders" />

        {/* ── Main Content Area ──────────────────────────────────────────── */}
        <div className="flex-grow flex flex-col gap-8">

          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex text-sm text-secondary font-medium">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <a href="#" className="hover:text-primary transition-colors">
                  Trang chủ
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-sm mx-1">chevron_right</span>
                  <a href="#" className="hover:text-primary transition-colors">
                    Tài khoản
                  </a>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-sm mx-1">chevron_right</span>
                  <span className="text-primary">Đơn hàng của tôi</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Page heading */}
          <div>
            <h1 className="font-headline text-4xl text-primary tracking-tight mb-2">
              Đơn hàng của tôi
            </h1>
            <p className="text-on-surface-variant text-sm">
              Quản lý và theo dõi trạng thái các đơn đặt hàng của bạn.
            </p>
          </div>

          {/* Status Tabs */}
          <div className="flex overflow-x-auto pb-2 gap-4 border-b border-surface-variant hide-scrollbar">
            {statusTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-4 py-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-4 bg-surface-container-low p-4 rounded-xl">
            {/* Search input */}
            <div className="relative flex-grow">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary pointer-events-none">
                search
              </span>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Tìm kiếm theo mã đơn hàng, sản phẩm..."
                className="w-full bg-surface-container-lowest border-0 border-b border-outline-variant/40 focus:border-secondary focus:ring-0 focus:border-b-2 pl-12 pr-4 py-3 text-sm text-on-surface rounded-t-lg transition-all outline-none"
              />
            </div>

            {/* Date filter */}
            <div className="relative min-w-[200px]">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary pointer-events-none">
                calendar_today
              </span>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full bg-surface-container-lowest border-0 border-b border-outline-variant/40 focus:border-secondary focus:ring-0 focus:border-b-2 pl-12 pr-10 py-3 text-sm text-on-surface rounded-t-lg transition-all appearance-none outline-none cursor-pointer"
              >
                <option value="30-days">30 ngày gần đây</option>
                <option value="3-months">3 tháng gần đây</option>
                <option value="this-year">Năm nay</option>
                <option value="custom">Tùy chỉnh...</option>
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-secondary pointer-events-none select-none">
                expand_more
              </span>
            </div>
          </div>

          {/* Orders List */}
          <div className="flex flex-col gap-6">
            {mockOrders.map((order) => (
              <div
                key={order.id}
                className="bg-surface-container-lowest rounded-xl p-6 flex flex-col gap-4 shadow-[0_4px_20px_rgba(27,28,26,0.03)] border border-outline-variant/10"
              >
                {/* Order header row */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-surface-variant/50">
                  <div className="flex items-center gap-3">
                    <span className="font-headline text-lg text-primary font-bold">
                      {order.code}
                    </span>
                    <span className="text-xs text-on-surface-variant bg-surface-container px-2 py-1 rounded">
                      {order.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1 ${order.statusBadgeClass}`}
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {order.statusIconName}
                      </span>
                      {order.statusLabel}
                    </span>
                    {order.paymentLabel && (
                      <span className="text-xs text-tertiary flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-tertiary">
                          check_circle
                        </span>
                        {order.paymentLabel}
                      </span>
                    )}
                  </div>
                </div>

                {/* Order item */}
                {order.items.map((item) => (
                  <div key={item.name} className="flex gap-4 items-start">
                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-surface-container relative">
                      <Image
                        src={item.imageUrl}
                        alt={item.imageAlt}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow flex flex-col justify-between h-20">
                      <div>
                        <h3 className="text-sm font-medium text-on-surface line-clamp-1">
                          {item.name}
                        </h3>
                        <p className="text-xs text-secondary mt-1">Phân loại: {item.variant}</p>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <span className="text-sm text-on-surface-variant">x{item.qty}</span>
                        <span className="text-sm font-medium text-on-surface">{item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Extra items indicator */}
                {order.extraItemsCount !== undefined && order.extraItemsCount > 0 && (
                  <div className="text-xs text-secondary italic px-24">
                    + {order.extraItemsCount} sản phẩm khác
                  </div>
                )}

                {/* Order footer row — total + actions */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-surface-variant/50 mt-2">
                  <div className="flex items-center gap-2 text-lg">
                    <span className="text-sm text-on-surface-variant">Tổng tiền:</span>
                    <span className="font-headline font-bold text-primary">{order.total}</span>
                  </div>
                  <div className="flex gap-3 w-full sm:w-auto">
                    {order.actions.map((action) =>
                      action.variant === 'primary' ? (
                        <button
                          key={action.label}
                          type="button"
                          className="flex-1 sm:flex-none px-6 py-2 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary text-sm font-medium shadow-[0_8px_20px_rgba(87,0,5,0.15)] hover:shadow-[0_8px_20px_rgba(87,0,5,0.25)] transition-all"
                        >
                          {action.label}
                        </button>
                      ) : (
                        <button
                          key={action.label}
                          type="button"
                          className="flex-1 sm:flex-none px-6 py-2 rounded-full border border-outline-variant/40 text-secondary text-sm font-medium hover:bg-surface-container transition-colors"
                        >
                          {action.label}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-10 h-10 rounded-full flex items-center justify-center text-secondary hover:bg-surface-container transition-colors disabled:opacity-50"
              aria-label="Trang trước"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-colors ${
                  currentPage === page
                    ? 'bg-primary text-on-primary'
                    : 'text-secondary hover:bg-surface-container'
                }`}
              >
                {page}
              </button>
            ))}
            <span className="text-secondary">...</span>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, 3))}
              className="w-10 h-10 rounded-full flex items-center justify-center text-secondary hover:bg-surface-container transition-colors"
              aria-label="Trang sau"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Bottom NavBar ───────────────────────────────────────────── */}
      {/* [PROMOTE LATER] — candidate for app-shell mobile nav once other surfaces need it */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-[#fbf9f5]/90 backdrop-blur-2xl shadow-[0_-4px_30px_rgba(27,28,26,0.04)] z-50 rounded-t-[2rem] md:hidden">
        {mobileNavItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveMobileNav(item.id)}
            className={
              activeMobileNav === item.id
                ? 'flex flex-col items-center justify-center bg-secondary-container text-primary rounded-full px-6 py-2 active:scale-90 duration-200 ease-out'
                : 'flex flex-col items-center justify-center text-secondary opacity-70 hover:opacity-100 transition-opacity'
            }
          >
            <span
              className="material-symbols-outlined text-2xl mb-1"
              style={
                activeMobileNav === item.id
                  ? { fontVariationSettings: "'FILL' 1" }
                  : undefined
              }
            >
              {item.icon}
            </span>
            <span className="text-[10px] font-medium tracking-wide font-body uppercase">
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </>
  );
}
