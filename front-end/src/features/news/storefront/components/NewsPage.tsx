'use client';

import Image from 'next/image';
import { useState } from 'react';
import FadeInSection from '@/shared/components/FadeInSection';

// ─── Types ────────────────────────────────────────────────────────────────────

interface FeaturedArticle {
  category: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  imageAlt: string;
}

interface Article {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  imageAlt: string;
}

// ─── Mock data ─────────────────────────────────────────────────────────────────
// TODO: replace with real API contract when available

const featuredArticle: FeaturedArticle = {
  category: 'Di sản',
  title: 'Bí quyết trường thọ từ Nhân sâm núi 100 năm tuổi',
  excerpt:
    'Khám phá những ghi chép cổ xưa về loài thảo dược huyền thoại, nơi hội tụ tinh hoa của trời đất, mang lại nguồn sinh lực vô tận cho bậc đế vương.',
  imageUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBaOInG2awo7VKEgXk6qEnu4u3V_08RSFRXZ0oY79O0mztnjSArEojvgU9IidNAhxhHoVIim3VQEdkyKmFXX1EQv51pRLlGbyoYazN7AaazfPizAqgVzX3eX5iTIwKary3uMRuPdtAx-60VUmgplV_TxJnItqrqoAiZqy1xxzCt9z1PU00oQuOJzplv5uy5TnHxAcj_-jLMI4-sPNkz5RwDfdj-C7KKp2u21LoZTDiwcQphP8MKmJMemnjruCaYff0Gcxum2Jmmils',
  imageAlt: 'Hình ảnh thực vật',
};

const articles: Article[] = [
  {
    id: 1,
    category: 'Nghiên cứu',
    title: 'Công dụng của Hồng sâm Hàn Quốc',
    excerpt:
      'Nghiên cứu lâm sàng mới nhất về tác động của Hồng sâm đối với hệ miễn dịch và khả năng phục hồi năng lượng ở người cao tuổi.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDVyxUPitL9shKlCyJLztXR-yTM3W_HHz8bIsI4-30qpwXJk821MLZAftsa78Mcuwe9yWomIEnNZ1mUR2NeOkce8iSNAAPr8Idfyg00DWjNDh9T2t2AwYYdJm0PqUWumRU0UBrTlnTTks-a9l00NoRlBoz45pHwDE47m-B-_0c0d-YmbqaLTVC1Gz4A3kf98JCWJRQu0CT74OafOIoUKiPUHRypjcqk7GeVTvPGzy2m6plpUk_Gkcovy-PAvdKRbGqVRhm3SRp-cT4',
    imageAlt: 'Ảnh bài viết',
  },
  {
    id: 2,
    category: 'Kiến thức',
    title: 'Cách phân biệt sâm thật và giả',
    excerpt:
      'Những dấu hiệu nhận biết quan trọng từ chuyên gia để đảm bảo bạn lựa chọn đúng sản phẩm sâm chất lượng cao.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDn-DWdHGpX-4oOFmaNV7QPk-Jt9DOP_-cHqudRLlRcSQcNhcG1oYAU0DBIKFHNUG1GwzPb_-vD6dbzY78PWIh0zt_rj8xxXDBy77mPjg4UDldb3Woksu326s4c9Wm33F0ewzPb970nlg7kkwQRd4K008LwgzbCrNvTzSwGTGYuhtIUMzfbRM2Lv3wqzGTGtkX6bbI-E__pgNOdu83wwkAJTPwtSDUjSywOujtetgOqhKmMY3GolwvlnDfSNsnLW4wuAiQ76puoy0Q',
    imageAlt: 'Ảnh bài viết',
  },
  {
    id: 3,
    category: 'Nghiên cứu',
    title: 'Nghiên cứu khoa học về Saponin',
    excerpt:
      'Tìm hiểu cơ chế hoạt động của các hợp chất ginsenosides và lý do chúng được coi là linh hồn của nhân sâm.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCG1fTpuDyj_-XcCETnFLbELqurYtW7en_aT-EhQ4k2enRGIuZzoaQdvuib7-TxdwwSKi4ymWvrP4gP04fJMuvRVSwEeN3g-6MFf-EUHLE9SAS6mkAZAqOzgxipK6WwJEfvyyBJ37EQaXZFX8hjOKRILAX3VBzxKFbsDpyT56gwhNdlCROf9W2pqH05qadOkSeYr3kLhm-1QMQdI_oxYVptmGt3gaqhM8itTvzSbthZykx6SjFvoeXzU5HDQyCfaFgH7DEtRlIJRsI',
    imageAlt: 'Ảnh bài viết',
  },
  {
    id: 4,
    category: 'Thực dưỡng',
    title: 'Nghệ thuật thưởng trà sâm',
    excerpt:
      'Quy trình pha chế tinh tế để giữ trọn vẹn hương vị và dược tính của những củ sâm thượng hạng.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDksic6F7SkL72zQKc45BCJ-u0kyYpoVp8mmxXUYkgQ3bESfQnlV4qHsgv_LXPncVUmm8SwOrORTvUic2WL7-Lk5R9Fe5I5ozWPNDIfcK93-QbmE4lFmw_QJPrlSf1djJzRqvpHUCX2DLue7i0YSXz3TZT0_0CF7PbgL9VU7xG_J54jaH6IgMSPrdvscpD8AVj4hHyiRClVEGPHkr8-luIFWkRhwsBIMJ7pE6uvT88EaoK77hSzNe6DffV1idErIp4Ty_nwuo_V_pg',
    imageAlt: 'Ảnh bài viết',
  },
  {
    id: 5,
    category: 'Di sản',
    title: 'Huyền thoại vùng núi Geumsan',
    excerpt:
      'Hành trình về cội nguồn của những củ nhân sâm được mệnh danh là quốc bảo của đất nước củ sâm.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBZt6np3Bv2szfSa8dzE0i2sjrSSYg20dzyym0fwBh7Ok2pBxtQ12ZVEmvTd8xYTgZh9AdJgN77C0wjLTq-0-L7IrvTZhud6TGCKp7IkvkEYvsEBWSSvBy6KvstcaxBu61QsHLpKmL-3hZCAwjprGSmypp3zl2w4wWBPno5lzSKJz67uramiUhtgCN_kUAhA4ra_05EZgez9M26TDscprwurYyGr5QRYV7UYN8weP-mXEaMALan9jDG_U2klKKMHFTcKtJdRqDWtyQ',
    imageAlt: 'Ảnh bài viết',
  },
  {
    id: 6,
    category: 'Thực dưỡng',
    title: 'Kết hợp Sâm trong ẩm thực hiện đại',
    excerpt:
      'Những công thức sáng tạo mang hương vị truyền thống vào các bữa ăn cân bằng dinh dưỡng mỗi ngày.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuChxTkVERC8lnRB2XdGVo2lMJXV3zU6ANOBltKPHEimOKpp8Y1Zs5QD7YY1ccmKPt3F134stcKsFMk7LTYZL_Bd5nYwgXUYtweitWTZO9XggimS_FOwJ2mIkOyeLS3w7obhDPErP7DrQtRWwZ6jOby2jK2PcW0_FvJHqxvkR6_K88kBLAx_XaWQBL_rJG49E8G9NAfUgDGimmCjpptzig71VQM9_VB4ek2PsNKyknuGJFCZw_VAnz_G5kvo4j_WknpsuqSCpMhoHIw',
    imageAlt: 'Ảnh bài viết',
  },
];

const CATEGORIES = ['Tất cả', 'Kiến thức', 'Thực dưỡng', 'Di sản', 'Nghiên cứu'];
const TOTAL_PAGES = 3;

// ─── Component ────────────────────────────────────────────────────────────────

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="pt-12 pb-24 px-6 md:px-12 max-w-screen-2xl mx-auto w-full">
      {/* Hero/Featured Section */}
      <FadeInSection>
      <section className="mb-20">
        <div className="relative bg-[#ffffff] rounded-xl overflow-hidden group cursor-pointer flex flex-col md:flex-row">
          {/* Hero image */}
          <div className="w-full md:w-2/3 h-[400px] md:h-[600px] relative overflow-hidden p-2">
            <div className="relative w-full h-full overflow-hidden rounded-lg">
              <Image
                src={featuredArticle.imageUrl}
                alt={featuredArticle.imageAlt}
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
            </div>
          </div>
          {/* Hero content */}
          <div className="w-full md:w-1/3 p-8 md:p-12 flex flex-col justify-center bg-[#f5f3ef]">
            <span className="text-[#735b2b] font-label text-sm uppercase tracking-widest mb-4">
              {featuredArticle.category}
            </span>
            <h1 className="font-headline text-[36px] md:text-[45px] text-[#1b1c1a] mb-6 leading-tight">
              {featuredArticle.title}
            </h1>
            <p className="text-[#58413f] font-body mb-8 line-clamp-3">{featuredArticle.excerpt}</p>
            <div className="mt-auto">
              <button className="text-[#0b2d17] hover:text-[#570005] transition-colors flex items-center gap-2 font-label uppercase tracking-widest text-sm pb-1 border-b border-transparent hover:border-[#570005]">
                Đọc tiếp{' '}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      </FadeInSection>

      {/* Search & Filter Bar */}
      <FadeInSection delay={100}>
      <section className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-[#fbf9f5] p-4 rounded-xl">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-label text-sm transition-colors ${
                activeCategory === cat
                  ? 'bg-[#fddba0] text-[#775f2f]'
                  : 'bg-[#eae8e4] text-[#1b1c1a] hover:bg-[#e4e2de]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64 bg-transparent border-b border-[#dfbfbc] focus:border-[#735b2b] focus:border-b-2 px-0 py-2 font-body text-[#1b1c1a] placeholder:text-[#58413f] transition-colors outline-none"
          />
          <span className="material-symbols-outlined absolute right-0 top-2 text-[#58413f]">
            search
          </span>
        </div>
      </section>
      </FadeInSection>

      {/* Article Grid */}
      <FadeInSection delay={200}>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
        {articles.map((article) => (
          <article
            key={article.id}
            className="flex flex-col bg-[#ffffff] rounded-xl overflow-hidden group cursor-pointer p-2"
          >
            <div className="relative h-64 overflow-hidden rounded-lg mb-6">
              <Image
                src={article.imageUrl}
                alt={article.imageAlt}
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute top-4 left-4 bg-[#fbf9f5]/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-label text-[#735b2b] uppercase tracking-wider">
                {article.category}
              </div>
            </div>
            <div className="flex-grow px-2 pb-4">
              <h2 className="font-headline text-2xl text-[#1b1c1a] mb-3 group-hover:text-[#570005] transition-colors">
                {article.title}
              </h2>
              <p className="text-[#58413f] font-body text-sm line-clamp-3">{article.excerpt}</p>
            </div>
          </article>
        ))}
      </section>
      </FadeInSection>

      {/* Pagination */}
      <FadeInSection delay={300}>
      <div className="flex justify-center items-center gap-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          className="text-[#0b2d17] hover:text-[#570005] font-label text-sm flex items-center gap-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span> Trang trước
        </button>
        <div className="flex gap-2">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-full flex items-center justify-center font-label text-sm transition-colors ${
                currentPage === page
                  ? 'bg-[#fddba0] text-[#775f2f]'
                  : 'hover:bg-[#eae8e4] text-[#1b1c1a]'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          disabled={currentPage === TOTAL_PAGES}
          onClick={() => setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1))}
          className="text-[#0b2d17] hover:text-[#570005] font-label text-sm flex items-center gap-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Trang sau <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
      </FadeInSection>
    </div>
  );
}
