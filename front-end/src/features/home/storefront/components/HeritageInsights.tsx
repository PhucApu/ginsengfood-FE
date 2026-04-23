import Image from 'next/image';

interface Article {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  src: string;
  alt: string;
}

const featuredArticle: Article = {
  id: 1,
  category: 'Research',
  title: 'Clinical Study on Panax Ginseng Efficacy',
  excerpt:
    'A recent double-blind study reveals significant improvements in cognitive function and vitality markers among adults using our aged root extract.',
  src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6yhnCIKI4Uy2KdgSBLbd1OynST5D7pXiLMbsarvphuCek_iAqoQvDVdHtbjRHx2Zc6m6SIIg1iohtYZTcq86vey38ChNjlNKbto2EDzYQudj8R9YDT4OwuVOvuShKtqlMsJK1Qz9gzpk4FN8kGFKKS6rBSIB-DY5Y64Jk4ngwbKKrEraQer8Txv0wxRKiyUsb9G2lLK2x-itZoWKwvMjsuad9FIA91OrAFWIutOIlfXrVPGo4KVjKFdtl3hWqpspDOe72mvL0xuw',
  alt: 'Research',
};

const sideArticles: Article[] = [
  {
    id: 2,
    category: 'News',
    title: 'Heritage Ginseng Featured in Wellness Magazine',
    excerpt:
      'Recognized for our sustainable harvesting practices and uncompromising commitment to purity in the latest issue of holistic wellness living.',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAd5OEWKs5OGXVqGYXhJ17UBk7-7FL7X9w2SG8Zjh5G6HmRgWaGGdrndTnaHMNJiIQegzVI5aj73nsM4gBM2t1JiaN1je0uTee-EYcgDxkylBEdDyo6jJJpbbK-IjX2qBu3d95x77fDAjzUseYO0Zoc_RbT-PGFGHgDEkPQhzI-XMCOuTKgDq_7UUTLrOPKt2nHsIAWQy5uxCDDlaEC_GuIv3UAR0RHzZhjepwkoKCEK78NfvsKV3W9a8-M1Zbe2kUTc481EavFTjY',
    alt: 'News',
  },
  {
    id: 3,
    category: 'Guide',
    title: 'Traditional vs. Modern Ginseng Preparation',
    excerpt:
      'Explore the nuances of ancient slow-steeping methods compared to contemporary high-pressure extraction techniques for maximum bioavailability.',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcTPiVY3DIMAFVJQMitI8XnVHpck6u10MRFp31BWdiotXn18v_IJSIvYe6WfvPkmTxzwNrcuxYEBPFbSAfFzZx7poBJ8Uvkv-3q7rK3r5gNJVqrYymLeZX4Au0T14sM4HOyb4muZRSCkfY3wtluNT3MYggelGL0KDJMp0IDZJ1qWZn3ptgLYvxIsOJAO36-HMdRRWMYf73LtuWfl9BYs1x9_mCvp2LSbLzMFLQdlLE37xSAN9BKmYhST_wt0apQCjYoJjmRrdREwA',
    alt: 'Guide',
  },
  {
    id: 4,
    category: 'Lifestyle',
    title: 'Integrating Ginseng into Daily Rituals',
    excerpt:
      'Discover simple, holistic ways to incorporate the adaptogenic power of ginseng into your morning routines for sustained energy.',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsXh-MxEkuGVmxdbI_kkv24RobsHKmshyZ3Y1zFWDwsnlcpd4ez_UUZ-55rSMGI4jnvKEUtBVkUPsUosroTz8EB3r47H5p9Wp9HbWp0gQg4hakYmQ1WP5-Lg3rXi1VppZwLudG7j-_iDDtmN4FbHdCMXMixtiM6J9_Od6lXPbILY7XIb35bp_ESlHLs3kBpfrGyQr3cT09SXaA5MAuRVP_60uw6ejH4qlERhlKcghEEma64XAsGG7T7i5giV-Csvt1pT8cNqpt4ag',
    alt: 'Lifestyle',
  },
];

export default function HeritageInsights() {
  return (
    <section className="max-w-screen-2xl mx-auto px-8 mb-32">
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="font-headline text-4xl text-primary mb-4">Heritage Insights</h2>
        <p className="font-body text-on-surface-variant max-w-2xl">
          Delve into our curated collection of scientific research, press mentions, and traditional preparation guides.
          Our commitment to continuous education and rigorous study.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Featured article */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl overflow-hidden ambient-shadow flex flex-col group border border-outline-variant/30">
          <div className="h-72 md:h-96 overflow-hidden relative">
            <Image
              src={featuredArticle.src}
              alt={featuredArticle.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="p-8 flex-grow flex flex-col justify-between">
            <div>
              <span className="text-sm font-bold text-primary tracking-widest uppercase mb-3 block">
                {featuredArticle.category}
              </span>
              <h3 className="font-headline text-3xl text-on-surface mb-4">{featuredArticle.title}</h3>
              <p className="font-body text-base text-on-surface-variant mb-8 line-clamp-3">{featuredArticle.excerpt}</p>
            </div>
            <a
              className="inline-flex items-center text-base font-bold text-primary hover:text-primary-container transition-colors uppercase tracking-wider"
              href="#"
            >
              Read More
              <span className="material-symbols-outlined text-base ml-2">arrow_forward</span>
            </a>
          </div>
        </div>

        {/* Side articles */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {sideArticles.map((article) => (
            <div
              key={article.id}
              className="bg-surface-container-lowest rounded-xl overflow-hidden ambient-shadow flex flex-row group border border-outline-variant/30 flex-1"
            >
              <div className="w-1/3 overflow-hidden relative shrink-0">
                <Image
                  src={article.src}
                  alt={article.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-4 flex-grow flex flex-col justify-center">
                <div>
                  <span className="text-[10px] font-bold text-primary tracking-widest uppercase mb-1 block">
                    {article.category}
                  </span>
                  <h3 className="font-headline text-base text-on-surface mb-1 line-clamp-2">{article.title}</h3>
                  <p className="font-body text-xs text-on-surface-variant mb-2 line-clamp-2">{article.excerpt}</p>
                </div>
                <a
                  className="inline-flex items-center text-xs font-bold text-primary hover:text-primary-container transition-colors uppercase tracking-wider mt-auto"
                  href="#"
                >
                  Read More
                  <span className="material-symbols-outlined text-xs ml-1">arrow_forward</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
