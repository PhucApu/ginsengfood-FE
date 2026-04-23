interface Article {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
}

const ARTICLES: Article[] = [
  {
    id: '1',
    category: 'Nghiên cứu',
    title: 'Nghiên Cứu Lâm Sàng về Hiệu Quả của Panax Ginseng',
    excerpt:
      'Một nghiên cứu mù đôi gần đây cho thấy cải thiện đáng kể về chức năng nhận thức và các chỉ số sức sống ở người lớn sử dụng chiết xuất rễ lâu năm của chúng tôi.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC6yhnCIKI4Uy2KdgSBLbd1OynST5D7pXiLMbsarvphuCek_iAqoQvDVdHtbjRHx2Zc6m6SIIg1iohtYZTcq86vey38ChNjlNKbto2EDzYQudj8R9YDT4OwuVOvuShKtqlMsJK1Qz9gzpk4FN8kGFKKS6rBSIB-DY5Y64Jk4ngwbKKrEraQer8Txv0wxRKiyUsb9G2lLK2x-itZoWKwvMjsuad9FIA91OrAFWIutOIlfXrVPGo4KVjKFdtl3hWqpspDOe72mvL0xuw',
  },
  {
    id: '2',
    category: 'Tin tức',
    title: 'Heritage Ginseng Được Giới Thiệu trên Tạp Chí Wellness',
    excerpt:
      'Được ghi nhận vì thực hành thu hoạch bền vững và cam kết kiên định về độ tinh khiết trong số mới nhất của tạp chí sống lành mạnh toàn diện.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAd5OEWKs5OGXVqGYXhJ17UBk7-7FL7X9w2SG8Zjh5G6HmRgWaGGdrndTnaHMNJiIQegzVI5aj73nsM4gBM2t1JiaN1je0uTee-EYcgDxkylBEdDyo6jJJpbbK-IjX2qBu3d95x77fDAjzUseYO0Zoc_RbT-PGFGHgDEkPQhzI-XMCOuTKgDq_7UUTLrOPKt2nHsIAWQy5uxCDDlaEC_GuIv3UAR0RHzZhjepwkoKCEK78NfvsKV3W9a8-M1Z',
  },
  {
    id: '3',
    category: 'Hướng dẫn',
    title: 'Chế Biến Nhân Sâm Truyền Thống vs. Hiện Đại',
    excerpt:
      'Khám phá sự tinh tế giữa phương pháp ngâm chậm cổ truyền so với kỹ thuật chiết xuất áp suất cao hiện đại để tối đa khả dụng sinh học.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDcTPiVY3DIMAFVJQMitI8XnVHpck6u10MRFp31BWdiotXn18v_IJSIvYe6WfvPkmTxzwNrcuxYEBPFbSAfFzZx7poBJ8Uvkv-3q7rK3r5gNJVqrYymLeZX4Au0T14sM4HOyb4muZRSCkfY3wtluNT3MYggelGL0KDJMp0IDZJ1qWZn3ptgLYvxIsOJAO36-HMdRRWMYf73LtuWfl9BYs1x9_mCvp2LSbLzMFLQdlLE37xSAN9BKmYhST_wt0apQCjYoJjmRrdREwA',
  },
  {
    id: '4',
    category: 'Lối sống',
    title: 'Tích Hợp Nhân Sâm vào Thói Quen Hằng Ngày',
    excerpt:
      'Khám phá những cách đơn giản, toàn diện để kết hợp sức mạnh thích nghi của nhân sâm vào thói quen buổi sáng để duy trì năng lượng bền vững.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBsXh-MxEkuGVmxdbI_kkv24RobsHKmshyZ3Y1zFWDwsnlcpd4ez_UUZ-55rSMGI4jnvKEUtBVkUPsUosroTz8EB3r47H5p9Wp9HbWp0gQg4hakYmQ1WP5-Lg3rXi1VppZwLudG7j-_iDDtmN4FbHdCMXMixtiM6J9_Od6lXPbILY7XIb35bp_ESlHLs3kBpfrGyQr3cT09SXaA5MAuRVP_60uw6ejH4qlERhlKcghEEma64XAsGG7T7i5giV-Csvt1pT8cNqpt4',
  },
];

export function InsightsSection() {
  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-20 xl:px-28">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <p className="text-label-md font-body uppercase tracking-[0.12em] text-secondary mb-3">
              Kiến thức chuyên sâu
            </p>
            <h2 className="text-headline-md font-headline font-medium text-on-surface mb-2">
              Heritage Insights
            </h2>
            <p className="text-body-md font-body text-on-surface-variant">
              Khám phá bộ sưu tập nghiên cứu khoa học, đề cập báo chí và hướng dẫn chế biến truyền
              thống của chúng tôi.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ARTICLES.map((article) => (
            <article
              key={article.id}
              className="group bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/30 shadow-[0_8px_40px_rgba(27,28,26,0.06)] transition-shadow duration-200"
            >
              <div className="aspect-[16/10] overflow-hidden bg-surface-container-low">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <span className="inline-block rounded-full bg-secondary-container px-2.5 py-0.5 text-label-sm font-body text-on-secondary-container mb-3">
                  {article.category}
                </span>
                <h3 className="text-body-lg font-body font-medium text-on-surface mb-2 leading-snug line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-body-sm font-body text-on-surface-variant leading-relaxed line-clamp-3 mb-4">
                  {article.excerpt}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-body-sm font-body text-primary hover:underline"
                >
                  Đọc thêm
                  <span className="material-icons text-base">arrow_forward</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
