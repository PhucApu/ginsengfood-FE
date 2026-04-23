'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';

type ViewMode = 'grid' | 'list';
type CategoryId = 'all' | 'fresh' | 'red' | 'extract' | 'tea' | 'gift';
type PriceFilterId = 'under-1m' | '1m-5m' | 'over-5m';
type MobileNavId = 'heritage' | 'collection' | 'alchemist' | 'account';

interface ProductData {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  imageUrl: string;
  imageAlt: string;
  badges: Array<{ label: string; variant: 'primary' | 'secondary' | 'tertiary' }>;
}

interface Category {
  id: CategoryId;
  label: string;
}

interface PriceFilter {
  id: PriceFilterId;
  label: string;
}

interface BenefitChip {
  id: string;
  label: string;
}

interface MobileNavItem {
  id: MobileNavId;
  icon: string;
  label: string;
  fillActive: boolean;
}

const categories: Category[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'fresh', label: 'Nhân sâm tươi' },
  { id: 'red', label: 'Hồng sâm' },
  { id: 'extract', label: 'Cao sâm' },
  { id: 'tea', label: 'Trà sâm' },
  { id: 'gift', label: 'Quà tặng' },
];

const priceFilters: PriceFilter[] = [
  { id: 'under-1m', label: 'Dưới 1.000.000đ' },
  { id: '1m-5m', label: '1.000.000đ – 5.000.000đ' },
  { id: 'over-5m', label: 'Trên 5.000.000đ' },
];

const benefitChips: BenefitChip[] = [
  { id: 'boi-bo', label: 'Bồi bổ' },
  { id: 'tang-de-khang', label: 'Tăng đề kháng' },
  { id: 'lam-dep', label: 'Làm đẹp' },
  { id: 'giam-stress', label: 'Giảm stress' },
];

const mobileNavItems: MobileNavItem[] = [
  { id: 'heritage', icon: 'history', label: 'Heritage', fillActive: false },
  { id: 'collection', icon: 'grid_view', label: 'Collection', fillActive: true },
  { id: 'alchemist', icon: 'auto_fix_high', label: 'Alchemist', fillActive: false },
  { id: 'account', icon: 'person', label: 'Account', fillActive: false },
];

// TODO: replace with real API contract when available
const mockProducts: ProductData[] = [
  {
    id: '1',
    name: 'Hồng Sâm Củ Khô 6 Năm Tuổi',
    description:
      'Tuyển chọn từ những củ sâm tươi chất lượng nhất, trải qua quy trình sấy khô truyền thống.',
    price: '2.500.000đ',
    originalPrice: '3.125.000đ',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAzoVObfOlcb01DD8yiJ1qyComLjpJ69zoRqWO9OBVWoICuu4UEbKQ1-2p29gAf2suDi7cyXH3gNKWPRnNbA0vff5OhHwdX5bVzeeSMQGY4Dyrhqd6n5AM3hZJAC2gi9oj2GpUMqln0j7gbdLNrZdwVodRqQzumTzJuFkR50ngJK3BGbU1a8VxNj10ZIyBhU295Qj1f5N3IWcnSbw6fF34ngjpLs2pKCHYF0vwS8RcgvJSFm3rcCJWbmOf6IKw7ZtrmcDaqIUjOxO4',
    imageAlt:
      'Premium dried red ginseng root presented on dark slate board with soft moody lighting',
    badges: [
      { label: 'Sale -20%', variant: 'primary' },
      { label: 'Golden Hour', variant: 'secondary' },
    ],
  },
  {
    id: '2',
    name: 'Cao Hồng Sâm Cô Đặc Thượng Hạng',
    description: 'Chiết xuất 100% từ hồng sâm nguyên chất, giữ trọn vẹn dược tính quý giá.',
    price: '4.200.000đ',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCNuwULJ9c5bfSlG_NoV7cKUgvG_uB90v4j7OpyZtWygoIlSsIG2A4qBIxyFKvb5k_Gx_0D2molKLip3S7FYs5izXqq5TpUF7UIXN5VukTWRzVsbpQcfb95WX2qEkUpukFMuh3Iv7fzHGX-AhNTjS3aTuyRZYQazyduW3mtsD4xfhdlpnacPxHwuYpdrkcVrhezHEWnuxoJ7tWkj4rCpt1-SL0KgKNXYKVf9ZLOo8mip7C_mBRXnrK3E2s4geaP_BBhi1Qh_6WwT4Q',
    imageAlt:
      'Elegant glass jar of premium ginseng extract on pale linen cloth with morning sunlight',
    badges: [{ label: 'Mới', variant: 'tertiary' }],
  },
  {
    id: '3',
    name: 'Hộp Quà Tặng Sâm Tươi Đế Vương',
    description: 'Món quà sức khỏe đẳng cấp, sang trọng dành tặng đối tác và người thân.',
    price: '8.500.000đ',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDY88p_vHjTmI8cljVCThX-BUmo0FiQnc7JgJlNYwz7MLQ7Ic12G5YOx7qjOkTKECPQEHhev_mYxb6c98VL_ZUDQKT3784qnRwWnEr6DHXVxh1seE2CGyUG1KLOTFWofzZxuXJzhfXtCUygpieJed4IVbjDGbLH_zOa_v8MwOdOnx1BBrQV7qEyH7PZfoq3ZBmVhOnPLu0DcdBlVKcm0RBEvBUCxtuX1I6quw90EzteXjljkkrsfW6RjmQYsNtvZAsalfBza_013nM',
    imageAlt:
      'Beautifully crafted wooden gift box containing whole dried ginseng roots on silk lining',
    badges: [],
  },
  {
    id: '4',
    name: 'Trà Hồng Sâm Mật Ong',
    description:
      'Sự kết hợp hoàn hảo giữa vị đắng nhẹ của sâm và ngọt thanh của mật ong rừng.',
    price: '850.000đ',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAVFAdRKtASdYHqad7J4gk_d_gMH6Eap-LqARW0nYS8FeA7KSOd2suF_hJq-7QE5Qi2kOgrdvZ3FNyMfxU6uhxAt87xpIzn02OD8QEScOgDOQjplRikYx6nNVp5DkeAMWgAlPLj2-IWUCLaHbxYsd2zTeo9Qx31hSW2945jJ7wuS5dbhgHiaBLiQ2lMwtalx1paPfsPFDSAOktmEN-qsPLCaPzY-xWfjw5HBx72VlYBRrmpxjRxehQB_LI9yO5WZXhxz83BUDG3Ajg',
    imageAlt:
      'Steaming cup of ginseng tea in ceramic mug on rustic wooden table with scattered herbs',
    badges: [],
  },
];

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [priceFilter, setPriceFilter] = useState<PriceFilterId>('1m-5m');
  const [activeBenefits, setActiveBenefits] = useState<Set<string>>(new Set(['boi-bo']));
  const [sortOption, setSortOption] = useState('best-seller');
  const [activeMobileNav, setActiveMobileNav] = useState<MobileNavId>('collection');
  const [currentPage, setCurrentPage] = useState(1);

  function toggleBenefit(id: string) {
    setActiveBenefits((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <>
      {/* Main content area */}
      <div className="pt-8 pb-28 md:pb-16 px-4 md:px-8 max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-12">
        {/* Filter Sidebar — desktop only */}
        <aside className="hidden md:block w-72 flex-shrink-0 space-y-10">
          <h2 className="font-headline text-2xl text-[#570005]">Lọc sản phẩm</h2>

          {/* Category Filter */}
          <div>
            <h3 className="font-label text-sm font-bold tracking-wider uppercase text-[#58413f] mb-4">
              Danh mục
            </h3>
            <ul className="space-y-4">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center w-full text-left transition-colors ${
                      cat.id === activeCategory
                        ? 'text-[#570005] font-bold hover:text-[#7b1113]'
                        : 'text-[#58413f] hover:text-[#570005]'
                    }`}
                  >
                    {cat.id === activeCategory && (
                      <span className="w-1.5 h-1.5 bg-[#735b2b] rounded-full mr-2 flex-shrink-0" />
                    )}
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Filter */}
          <div>
            <h3 className="font-label text-sm font-bold tracking-wider uppercase text-[#58413f] mb-4">
              Giá bán
            </h3>
            <div className="space-y-3">
              {priceFilters.map((pf) => (
                <label key={pf.id} className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="price"
                    value={pf.id}
                    checked={priceFilter === pf.id}
                    onChange={() => setPriceFilter(pf.id)}
                    className="w-5 h-5 accent-[#735b2b] cursor-pointer"
                  />
                  <span
                    className={`group-hover:text-[#1b1c1a] transition-colors ${
                      priceFilter === pf.id
                        ? 'text-[#1b1c1a] font-medium'
                        : 'text-[#58413f]'
                    }`}
                  >
                    {pf.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Benefits Filter */}
          <div>
            <h3 className="font-label text-sm font-bold tracking-wider uppercase text-[#58413f] mb-4">
              Công dụng
            </h3>
            <div className="flex flex-wrap gap-2">
              {benefitChips.map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => toggleBenefit(chip.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeBenefits.has(chip.id)
                      ? 'bg-[#fddba0] text-[#775f2f]'
                      : 'bg-[#eae8e4] text-[#58413f] hover:bg-[#e4e2de]'
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="flex-grow min-w-0">
          {/* Grid Header — title, sort, view toggle */}
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between border-b border-[#e4e2de] pb-6 gap-6">
            <div>
              <h1 className="font-headline text-4xl text-[#570005] mb-2">Danh mục sản phẩm</h1>
              <p className="text-[#58413f] text-sm">Hiển thị 1–12 trong số 24 kết quả</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Sort Select */}
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none bg-transparent border-b-2 border-[#dfbfbc]/40 focus:border-[#735b2b] py-2 pr-8 pl-2 text-sm text-[#1b1c1a] font-medium focus:outline-none cursor-pointer transition-colors"
                >
                  <option value="best-seller">Bán chạy nhất</option>
                  <option value="price-asc">Giá thấp đến cao</option>
                  <option value="price-desc">Giá cao đến thấp</option>
                </select>
                <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-[#58413f] pointer-events-none select-none">
                  expand_more
                </span>
              </div>
              {/* View Mode Toggle */}
              <div className="flex bg-[#eae8e4] rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  aria-label="Lưới"
                  className={`p-1.5 rounded transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white shadow-sm text-[#570005]'
                      : 'text-[#58413f] hover:text-[#570005]'
                  }`}
                >
                  <span className="material-symbols-outlined block">grid_view</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  aria-label="Danh sách"
                  className={`p-1.5 rounded transition-all ${
                    viewMode === 'list'
                      ? 'bg-white shadow-sm text-[#570005]'
                      : 'text-[#58413f] hover:text-[#570005]'
                  }`}
                >
                  <span className="material-symbols-outlined block">view_list</span>
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'flex flex-col gap-6'
            }
          >
            {mockProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-16 flex justify-center items-center space-x-2">
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-[#dfbfbc]/40 text-[#58413f] hover:bg-[#efeeea] hover:text-[#570005] transition-colors"
              aria-label="Trang trước"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            {[1, 2].map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                  currentPage === page
                    ? 'bg-[#735b2b] text-white font-bold'
                    : 'border border-[#dfbfbc]/40 text-[#58413f] hover:bg-[#efeeea] hover:text-[#570005]'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.min(2, prev + 1))}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-[#dfbfbc]/40 text-[#58413f] hover:bg-[#efeeea] hover:text-[#570005] transition-colors"
              aria-label="Trang sau"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav — fixed, mobile only */}
      {/* [PROMOTE LATER] — candidate for app-shell mobile nav once other surfaces need it */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 rounded-t-[2rem] bg-[#fbf9f5] border-t border-[#dfbfbc]/20 shadow-[0_-8px_40px_rgba(27,28,26,0.06)] md:hidden">
        <div className="flex justify-around items-center h-20">
          {mobileNavItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveMobileNav(item.id)}
              className={`flex flex-col items-center justify-center space-y-1 w-full transition-colors ${
                activeMobileNav === item.id
                  ? 'text-[#570005]'
                  : 'text-[#735b2b]/60 hover:text-[#570005]'
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={
                  item.fillActive && activeMobileNav === item.id
                    ? { fontVariationSettings: "'FILL' 1" }
                    : undefined
                }
              >
                {item.icon}
              </span>
              <span
                className={`text-[10px] font-body ${
                  activeMobileNav === item.id ? 'font-bold' : 'font-medium'
                }`}
              >
                {item.label}
              </span>
              {activeMobileNav === item.id && (
                <span className="w-1 h-1 bg-[#735b2b] rounded-full" />
              )}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
