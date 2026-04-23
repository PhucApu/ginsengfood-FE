'use client';

import { useState } from 'react';
import Image from 'next/image';

type TabId = 'description' | 'ingredients' | 'usage' | 'reviews';

interface ProductImage {
  thumbSrc: string;
  fullSrc: string;
  alt: string;
}

interface TabItem {
  id: TabId;
  label: string;
}

// TODO: replace with real API contract when available
const productImages: ProductImage[] = [
  {
    thumbSrc:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD4zdh9NuaLHqM1qfqpUZ-wDBy6ssFDX75ESCD4z-hYL2t1gQ7rdDMrWF2V1zy-mAeKzPx9xrlJJfxzwZJPx2roBvxHkvIGrN0iY6qhseSnw5waNYZf6O7bpbfLcYUqqYYjk_qhQF-7SBFleiAu2kwHRmxh7u80AdZskWEnatUCV_YhtMd0itE98wybDY_rgsm09U3Fn1E4m1Z4T-tCyIK2ZzxV0n6ke0vdtSNcQ3x6JZi4EbobH4TJQ6OybWOV5qOxYtuMAxK8srU',
    fullSrc:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBOzRnJuC0-aHsO8xihYzLULNo7aBWYRZDge-2u6bPgydkvusEcbHh5d1P8_BUvgtPCQAor-um1JKZR1shw5hkYwKAfW9HCIVGjoTfXXhRfr5vZ15NEeUVjkBMCBE_WHJV1iHfxCVD3SlKQsF0tFeWefhur96asOscsOTvit_vn1lsighJxiN_Y4uzXvwW1UgnlnOF28t3hR4cWe5yrqnJhLfxDd6Mt_aRP1D1AYQP3YBJtLT-z51n5LSe07_xxRJA79rfXnTTSoH4',
    alt: 'Close up of dried ginseng root on textured parchment paper with warm side lighting',
  },
  {
    thumbSrc:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAgKFzNATQlWFXP1hDJLnVggWnh229G_AVnz0flYSdETaQMkxznprVWh2s7BYaUYmJebAm1kL76T8mSw2p83eZPEoqED4D69iqI0aB7A8QzOkjXXBnjQBdiwnC39wcG2mqMGVEPuEXRDJcFNSqqdj0av_m9d4r4O4o4nu2i-i8uSwvC-lNg3d-SA5xj7ce5QQ8Zp8yizCRiv_Whbr_ncpdaSxBuB4YBf38Wqv7COHUpZvZB9kN0TM4BOEzB-AFlOIxu7e21FOK3s3Q',
    fullSrc:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAgKFzNATQlWFXP1hDJLnVggWnh229G_AVnz0flYSdETaQMkxznprVWh2s7BYaUYmJebAm1kL76T8mSw2p83eZPEoqED4D69iqI0aB7A8QzOkjXXBnjQBdiwnC39wcG2mqMGVEPuEXRDJcFNSqqdj0av_m9d4r4O4o4nu2i-i8uSwvC-lNg3d-SA5xj7ce5QQ8Zp8yizCRiv_Whbr_ncpdaSxBuB4YBf38Wqv7COHUpZvZB9kN0TM4BOEzB-AFlOIxu7e21FOK3s3Q',
    alt: 'Dried ginseng roots arranged neatly on dark wooden surface with soft shadows',
  },
  {
    thumbSrc:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBBV-U1T_w9B94dn_pT2N_nPOq_kBT4xqWZ-fAYuIQuB1Y6UBkIhCeJ5OzZIC5bVLOZYdjEJQjK94bFvAFAKzvnLfBuFYnOcNlCBfXoIUEKzZ93Fc_6u_CxyJF-VvbYwP6L3qPNxVyC2qv3qdKlljuqZIGfoqRhpkI0K_Xwupw_TlxyPTO5YavQIw8WToEF0fUxp2wf5hI_K2y3sjZiOGIKDE2Y9X5Id5wP3oJgKexzXF-LaFmyqwtwt4tSA7lI3qA_e_n0k_Qu-a4',
    fullSrc:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBBV-U1T_w9B94dn_pT2N_nPOq_kBT4xqWZ-fAYuIQuB1Y6UBkIhCeJ5OzZIC5bVLOZYdjEJQjK94bFvAFAKzvnLfBuFYnOcNlCBfXoIUEKzZ93Fc_6u_CxyJF-VvbYwP6L3qPNxVyC2qv3qdKlljuqZIGfoqRhpkI0K_Xwupw_TlxyPTO5YavQIw8WToEF0fUxp2wf5hI_K2y3sjZiOGIKDE2Y9X5Id5wP3oJgKexzXF-LaFmyqwtwt4tSA7lI3qA_e_n0k_Qu-a4',
    alt: 'Premium ginseng packaging box opened slightly showing roots inside',
  },
];

const tabs: TabItem[] = [
  { id: 'description', label: 'Mô tả' },
  { id: 'ingredients', label: 'Thành phần' },
  { id: 'usage', label: 'Cách dùng' },
  { id: 'reviews', label: 'Đánh giá (12)' },
];

export default function ProductDetailPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<TabId>('description');

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    }
  };

  const currentImage = productImages[selectedImageIndex];

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-8 py-8 md:py-16">
      {/* Product Hero Section (Asymmetric Layout) */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 mb-24">
        {/* Image Gallery (Cols 1-7) */}
        <div className="md:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible w-full md:w-24 shrink-0 pb-2 md:pb-0">
            {productImages.map((image, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Select image ${index + 1}`}
                onClick={() => setSelectedImageIndex(index)}
                className={`w-20 md:w-full aspect-square bg-[#f3f4ed] rounded-lg overflow-hidden relative cursor-pointer transition-opacity shrink-0 ${
                  selectedImageIndex === index
                    ? 'border border-[#72796e]/20 opacity-100'
                    : 'border border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <Image
                  src={image.thumbSrc}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-grow bg-[#f3f4ed] rounded-xl overflow-hidden relative aspect-[4/5] md:aspect-auto md:min-h-[600px]">
            <Image
              src={currentImage.fullSrc}
              alt="Hồng Sâm Củ Khô 6 Năm Tuổi"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1536px) 58vw, 800px"
              priority
            />
            {/* Apothecary Chip */}
            <div className="absolute top-6 left-6 bg-[#d0e6c6] text-[#54684e] rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase font-label">
              Thu hoạch thủ công
            </div>
          </div>
        </div>

        {/* Product Info (Cols 8-12) */}
        <div className="md:col-span-5 flex flex-col justify-start">
          <div className="mb-6">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex text-sm text-[#42493e] font-label mb-4">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <a href="#" className="hover:text-[#154212] transition-colors">
                    Sản phẩm
                  </a>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="material-symbols-outlined text-[16px] mx-1">
                      chevron_right
                    </span>
                    <a href="#" className="hover:text-[#154212] transition-colors">
                      Nhân Sâm
                    </a>
                  </div>
                </li>
              </ol>
            </nav>

            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-[#191c18] leading-tight mb-2">
              Hồng Sâm Củ Khô 6 Năm Tuổi
            </h1>
            <p className="font-body text-[#42493e] text-lg md:text-xl mb-4 italic">
              Báu vật bồi bổ sinh khí, 100% nguyên chất từ rễ sâm Hàn Quốc.
            </p>
          </div>

          {/* Price */}
          <div className="flex items-end gap-4 mb-8">
            <span className="font-headline text-3xl font-semibold text-[#154212]">
              2.500.000đ
            </span>
            <span className="font-body text-[#42493e] line-through text-lg mb-1">
              3.200.000đ
            </span>
          </div>

          {/* Flash Sale Banner */}
          <div className="bg-[#f3f4ed] rounded-xl p-4 mb-8 flex items-center justify-between border-l-4 border-[#750c10]">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#750c10]">timer</span>
              <div>
                <p className="font-headline font-bold text-[#750c10] text-sm md:text-base">
                  Flash Sale Sắp Diễn Ra
                </p>
                <p className="font-body text-xs text-[#42493e]">Bắt đầu sau 02:45:10</p>
              </div>
            </div>
            <button
              type="button"
              className="text-xs font-label font-semibold text-[#750c10] uppercase tracking-wider hover:underline"
            >
              Nhắc tôi
            </button>
          </div>

          <div className="w-full h-px bg-[#c2c9bb]/30 mb-8"></div>

          {/* Quantity & Actions */}
          <div className="mb-8">
            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-4">
              <span className="font-body font-medium text-[#191c18]">Số lượng:</span>
              <div className="flex items-center border border-[#c2c9bb] rounded-md overflow-hidden bg-[#f9faf2]">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={handleDecreaseQuantity}
                  className="px-3 py-1 hover:bg-[#edefe7] transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">remove</span>
                </button>
                <input
                  type="number"
                  aria-label="Quantity"
                  min={1}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-12 text-center border-none bg-transparent outline-none font-body text-[#191c18] p-1"
                />
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={handleIncreaseQuantity}
                  className="px-3 py-1 hover:bg-[#edefe7] transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                type="button"
                className="flex-1 bg-[#f9faf2] border border-[#72796e] text-[#191c18] font-label uppercase tracking-widest font-semibold py-4 px-6 rounded-lg hover:bg-[#edefe7] transition-colors flex justify-center items-center gap-2"
              >
                Thêm vào giỏ
              </button>
              <button
                type="button"
                className="flex-1 bg-[#154212] text-white font-label uppercase tracking-widest font-semibold py-4 px-6 rounded-lg hover:bg-[#2d5a27] hover:shadow-[inset_0_0_10px_rgba(255,255,255,0.1)] transition-all flex justify-center items-center gap-2 shadow-[0_20px_40px_rgba(25,28,24,0.06)]"
              >
                Mua ngay
              </button>
            </div>

            {/* AI Advisor */}
            <button
              type="button"
              className="w-full bg-[#d0e6c6]/50 hover:bg-[#d0e6c6] transition-colors rounded-lg p-4 flex items-center justify-between text-[#54684e] group"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined">clinical_notes</span>
                <span className="font-body font-medium">Hỏi AI tư vấn về sản phẩm này</span>
              </div>
              <span className="material-symbols-outlined transform group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>

          <div className="mt-auto">
            <p className="font-body text-sm text-[#42493e] flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
              Giao hàng hỏa tốc trong 2h tại nội thành
            </p>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="mb-24">
        {/* Tab Bar */}
        <div className="flex overflow-x-auto border-b border-[#c2c9bb]/30 mb-8 hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 font-headline text-lg whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'font-bold text-[#154212] border-b-2 border-[#154212]'
                  : 'text-[#42493e] hover:text-[#154212]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Description Tab Content */}
        {activeTab === 'description' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-8 font-body text-[#42493e] leading-relaxed space-y-6">
              <p>
                Hồng sâm củ khô 6 năm tuổi là tinh hoa của đất trời, được tuyển chọn từ những
                củ nhân sâm đạt độ tuổi hoàn hảo nhất, sinh trưởng trong môi trường tự nhiên
                khắc nghiệt để tích lũy dược tính tối đa. Quá trình hấp sấy truyền thống kéo
                dài hàng tháng trời giúp chuyển hóa các Saponin quý giá, mang lại màu đỏ rực rỡ
                và hương thơm nồng ấm đặc trưng.
              </p>
              <p>
                Sản phẩm được bảo quản trong hộp gỗ thông cao cấp, lót lụa tơ tằm, không chỉ là
                phương thuốc quý bồi bổ khí huyết, tăng cường sinh lực mà còn là món quà biếu
                tặng sang trọng, đậm chất văn hóa Á Đông.
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-4">
                <li>Hỗ trợ phục hồi thể lực nhanh chóng cho người mới ốm dậy.</li>
                <li>Tăng cường hệ miễn dịch, giảm căng thẳng mệt mỏi.</li>
                <li>Cải thiện chức năng tim mạch và tuần hoàn máu.</li>
              </ul>
            </div>
            <div className="lg:col-span-4">
              <div className="bg-[#f3f4ed] p-6 rounded-xl">
                <h3 className="font-headline font-bold text-xl mb-4 text-[#191c18]">
                  Thông số bảo quản
                </h3>
                <dl className="space-y-4 text-sm font-body">
                  <div className="flex justify-between border-b border-[#c2c9bb]/20 pb-2">
                    <dt className="text-[#42493e]">Xuất xứ</dt>
                    <dd className="font-medium text-[#191c18]">Hàn Quốc</dd>
                  </div>
                  <div className="flex justify-between border-b border-[#c2c9bb]/20 pb-2">
                    <dt className="text-[#42493e]">Hạn sử dụng</dt>
                    <dd className="font-medium text-[#191c18]">10 năm</dd>
                  </div>
                  <div className="flex justify-between pb-2">
                    <dt className="text-[#42493e]">Điều kiện</dt>
                    <dd className="font-medium text-[#191c18]">Nơi khô ráo, tránh ánh nắng</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
