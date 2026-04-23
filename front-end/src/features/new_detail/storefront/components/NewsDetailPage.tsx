import Image from 'next/image';

interface RelatedArticle {
  category: string;
  title: string;
  excerpt: string;
  image: string;
  alt: string;
}

const RELATED_ARTICLES: RelatedArticle[] = [
  {
    category: 'Sức khỏe',
    title: 'Cách dùng Hồng Sâm hiệu quả mỗi sáng',
    excerpt: 'Khởi đầu ngày mới với nguồn năng lượng tinh khiết từ tự nhiên.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCiKpSQaWQ1kFPlLZkCwA8UQelVA6Z1i4zNBLOL3oETOYGeG5VhcOjvXDBHyrkpX7ROThWH-H9vyOXKaH7M2dJXkAAvv9nCuBKFRyfWbsrt-X5VTMDy-ltmYoNJKb5OIScwHkVecmg-t9Q7uaNrLUwyyKN7aDRG9gVYLKyVtc2xWVugRCyeLyGXtvAaBYLtraXNliE-zSlPsn8OASjHdEcTdHXcXl0UBSUfiXUx8RDl0RwUvD3eoHME-CFDwAqi-tt4Osha9X7DNyY',
    alt: 'Cup of herbal tea with steam on wooden table',
  },
  {
    category: 'Sản phẩm',
    title: 'Phân biệt Hồng Sâm và Hắc Sâm',
    excerpt:
      'Hiểu rõ đặc tính và đối tượng sử dụng của từng loại sâm để tối ưu hiệu quả.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAK7XL0lSRKz8B9hLWlJNT7p0HMKdZ3zqwYbPshPgEGPWpHOEUdp9YgDcPeFjMUFAw5f3fZn1MCjUSByD2epS-ibEqi5kaDTnnimRoKHx9-FNJY7-EBcTA1SCpcZG0tK7XY5y4oA87Gm15gl3gmFmqttJTEAUc0ZukqkoBKCaAHpdO4q26B-HvpNasFEgP4zRZA9UqMMMJQUMAOwjLEjInVVpUa0IJUsrDlhVzMYsZ7SwWJJpew8gPQ3V_QtG3n9-m8H-AygOF3hSU',
    alt: 'Beautiful gift box of premium red ginseng',
  },
  {
    category: 'Nguồn gốc',
    title: 'Vùng đất Geumsan - Nơi huyền thoại bắt đầu',
    excerpt:
      'Khám phá thổ nhưỡng đặc biệt tạo nên những củ sâm chất lượng nhất thế giới.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDGfPnKZv39wXMGpNN3oVQTbvI2LQKQ7Rtgj-9T3wHU6tn8z4VewYKauXSKyo6v3eJYTlH1D3Mq7znfXclljn5C4tzQQ5w968AzSDVpKN82U-KL2pYk70wheJpt24ClpvEIz7TmDFtGfXqeFz-2Ft5_JYCJWZ0QbX6OaikT87UTKWrsqlic5Jl5JzzHqMCFhTGmSKu_9Rf-VJ1I8WnE8dBnF-Fxj87s8YntFW3bLyezufrWQSVbk90mfxkfn468sFVBS6bXuAnNY2U',
    alt: 'Lush green mountains covered in morning mist',
  },
];

export default function NewsDetailPage() {
  return (
    <div className="bg-[#fbf9f5] text-[#1b1c1a] antialiased selection:bg-[#7b1113] selection:text-white">
      <main className="pt-12 pb-24">
        {/* ── Article ────────────────────────────────────────────── */}
        <article className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Metadata */}
          <div className="mb-8 flex items-center gap-4 font-label text-sm">
            <span className="text-[#735b2b] font-semibold uppercase tracking-wider">
              Truyền thống
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#dfbfbc]"></span>
            <span className="text-[#58413f]">24/10/2023</span>
          </div>

          {/* Heading */}
          <h1 className="font-headline text-5xl md:text-6xl text-[#570005] font-bold tracking-tight leading-[1.1] mb-8">
            Nghệ thuật Chế biến Nhân sâm Cổ truyền
          </h1>

          {/* Lead paragraph */}
          <p className="font-body text-xl text-[#58413f] leading-relaxed mb-12 max-w-3xl">
            Một hành trình khám phá những bí ẩn qua nhiều thế hệ, nơi khoa học
            hiện đại gặp gỡ trí tuệ cổ xưa trong việc khai thác trọn vẹn tinh
            hoa của nấm linh chi và nhân sâm.
          </p>

          {/* Hero image */}
          <div className="w-full aspect-[16/9] bg-[#f5f3ef] rounded-xl overflow-hidden mb-16 relative group">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-R5anNopHh-eNq9tXLBIVQFRK9bj-bV66zMIFS4aIZdUTJrg26a4U5SMjXiXoSwLpnrruH-BbEiYIX-8TKp3Kv4C-sh_8Qof9AS7cpSh6LrJyi6Eoiwyc6dBV-oomUrTC5RQErD3CLB6tE5RdLfLCM99yk5fu3BxI1orIR4Kg5RK26Qg7iZVN4uNrxIKW_9nrX7oKwg8wXkKuQCDWhSXB10VedwHozShM68s6IWQErA7lmsva3DjZDkfluulcnOocpuctHCMnnO4"
              alt="Traditional ginseng roots on a rustic wooden table with natural soft morning light and ancient tools"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
          </div>

          {/* Content body */}
          <div className="max-w-3xl mx-auto">
            <h2 className="font-headline text-3xl text-[#570005] font-bold mb-6 mt-12">
              Nguồn gốc của sự tinh túy
            </h2>
            <p className="font-body text-[#1b1c1a] leading-relaxed mb-6">
              Trong suốt hàng ngàn năm, nhân sâm không chỉ đơn thuần là một
              loài thảo dược, mà còn là biểu tượng của sức sống mãnh liệt và sự
              trường thọ. Nghệ thuật chế biến nhân sâm cổ truyền bắt đầu từ
              việc lựa chọn những củ sâm đạt đủ 6 năm tuổi, được nuôi dưỡng
              bởi đất mẹ cằn cỗi nhưng giàu khoáng chất.
            </p>
            <p className="font-body text-[#1b1c1a] leading-relaxed mb-8">
              Quá trình thu hoạch phải diễn ra vào những ngày thu trong xanh,
              khi tinh chất tập trung cao nhất ở phần rễ. Người nghệ nhân sử
              dụng những công cụ bằng tre hoặc gỗ, tuyệt đối tránh kim loại để
              không làm tổn hại đến khí lực của sâm.
            </p>

            {/* Pull quote */}
            <blockquote className="border-l-4 border-[#735b2b]/30 pl-6 py-2 my-10 font-headline text-2xl italic text-[#735b2b] leading-snug">
              &ldquo;Mỗi củ sâm là một tuyệt tác của tự nhiên, nhưng chính đôi
              bàn tay và sự kiên nhẫn của con người mới đánh thức được sức mạnh
              thực sự ẩn giấu bên trong.&rdquo;
            </blockquote>

            <h2 className="font-headline text-3xl text-[#570005] font-bold mb-6 mt-12">
              Bí ẩn của Cửu Chưng Cửu Sái
            </h2>
            <p className="font-body text-[#1b1c1a] leading-relaxed mb-6">
              Phương pháp &ldquo;Cửu chưng cửu sái&rdquo; (Chín lần hấp, chín
              lần phơi) là đỉnh cao của nghệ thuật chế biến. Qua mỗi lần hấp
              với thảo mộc bí truyền và phơi dưới ánh nắng tự nhiên, củ sâm
              trắng dần chuyển sang màu đỏ sẫm (Hồng sâm) rồi đen nhánh (Hắc
              sâm).
            </p>

            {/* Inline image + text */}
            <div className="my-12 flex flex-col md:flex-row gap-8 items-center bg-[#f5f3ef] rounded-xl p-6">
              <div className="relative w-full md:w-1/2 h-64 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsxdyJDHaefWr0Aa2dEe_FkqYeuZbNWgCeruIkqvf3zIUDfXzoyCXfwvFh3UEpxFgangqL1LNOA9IEcznZIDDWlb7PlwG9FYqnStkNK1RnN2z0xCOMj96R4RZBaH2C8Hj2Is5Q8vNJYcQPgIH0Q4yNiJr-zadCtN43rOTxyWtEQZ6QHTCHlJhBrZf317QmohnOe4ZMa85Wr1HuzvwfH1vyDJTzNKGZzuZ9ns-Ao2j-e96Fy-JdrQUAsRgoTXQ2Pwkw31SU1v0_i6g"
                  alt="Steam rising from traditional ceramic pots preparing herbal medicine"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full md:w-1/2">
                <h4 className="font-headline text-xl text-[#570005] font-bold mb-3">
                  Sự chuyển hóa hóa học
                </h4>
                <p className="font-body text-sm text-[#58413f] leading-relaxed">
                  Khoa học hiện đại đã chứng minh quá trình nhiệt phân này
                  không làm mất đi dưỡng chất, mà ngược lại, sản sinh ra các
                  Ginsenoside mới như Rg3, Rh2, Rg5... những hoạt chất quý
                  hiếm có tác dụng mạnh mẽ lên hệ miễn dịch và tái tạo tế bào.
                </p>
              </div>
            </div>

            <p className="font-body text-[#1b1c1a] leading-relaxed mb-8">
              Sự kết hợp giữa yếu tố Hỏa (lửa, nhiệt độ) và Thủy (hơi nước,
              thảo dược) trong suốt 45 ngày đêm đòi hỏi sự giám sát nghiêm
              ngặt của những bậc thầy. Một sai sót nhỏ về nhiệt độ hay độ ẩm
              cũng có thể làm hỏng cả một mẻ sâm quý.
            </p>
          </div>

          {/* ── CTAs ─────────────────────────────────────────────── */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 pb-16 border-b border-[#e4e2de]">
            <button
              type="button"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-br from-[#570005] to-[#7b1113] text-white rounded-full font-label font-bold text-lg hover:shadow-xl hover:shadow-[#570005]/20 transition-all duration-300 transform hover:-translate-y-1"
            >
              Mua ngay
            </button>
            <button
              type="button"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-[#dfbfbc]/40 text-[#735b2b] rounded-full font-label font-bold text-lg hover:bg-[#f5f3ef] transition-colors duration-300"
            >
              Nhận tư vấn ngay
            </button>
          </div>
        </article>

        {/* ── Related articles ───────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mt-24">
          <h3 className="font-headline text-3xl text-[#570005] font-bold mb-10 text-center">
            Bài viết liên quan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {RELATED_ARTICLES.map((article) => (
              <a
                key={article.title}
                href="#"
                className="group block bg-[#ffffff] rounded-xl overflow-hidden hover:bg-[#f5f3ef] transition-colors duration-500"
              >
                <div className="aspect-[4/3] w-full overflow-hidden p-2">
                  <div className="relative w-full h-full rounded-lg overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs font-label font-semibold text-[#735b2b] uppercase tracking-widest mb-3 block">
                    {article.category}
                  </span>
                  <h4 className="font-headline text-xl text-[#1b1c1a] font-bold mb-3 group-hover:text-[#570005] transition-colors">
                    {article.title}
                  </h4>
                  <p className="font-body text-sm text-[#58413f] line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
