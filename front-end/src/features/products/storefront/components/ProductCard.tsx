'use client';

import Image from 'next/image';

interface Badge {
  label: string;
  variant: 'primary' | 'secondary' | 'tertiary';
}

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  imageUrl: string;
  imageAlt: string;
  badges: Badge[];
}

const badgeClasses: Record<Badge['variant'], string> = {
  primary: 'bg-[#570005] text-white',
  secondary: 'bg-[#735b2b] text-white',
  tertiary: 'bg-[#0b2d17] text-white',
};

export default function ProductCard({
  name,
  description,
  price,
  originalPrice,
  imageUrl,
  imageAlt,
  badges,
}: ProductCardProps) {
  return (
    <article className="group bg-white rounded-xl flex flex-col overflow-hidden transition-transform duration-500 hover:-translate-y-2 relative">
      {badges.length > 0 && (
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {badges.map((badge) => (
            <span
              key={badge.label}
              className={`${badgeClasses[badge.variant]} text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider`}
            >
              {badge.label}
            </span>
          ))}
        </div>
      )}

      <div className="relative aspect-[4/5] p-2 bg-[#f5f3ef] rounded-t-xl overflow-hidden">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-700"
        />
        {/* Quick action overlay */}
        <div className="absolute inset-0 bg-[#fbf9f5]/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Thêm vào giỏ"
            className="w-12 h-12 bg-white rounded-full shadow-[0_8px_40px_rgba(27,28,26,0.12)] flex items-center justify-center text-[#570005] hover:bg-[#570005] hover:text-white transition-colors"
            onClick={() => {
              // TODO: connect to cart API
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              shopping_cart
            </span>
          </button>
          <button
            type="button"
            aria-label="Xem nhanh"
            className="w-12 h-12 bg-white rounded-full shadow-[0_8px_40px_rgba(27,28,26,0.12)] flex items-center justify-center text-[#735b2b] hover:bg-[#735b2b] hover:text-white transition-colors"
            onClick={() => {
              // TODO: open quick view modal
            }}
          >
            <span className="material-symbols-outlined">visibility</span>
          </button>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-headline text-lg text-[#570005] mb-2 leading-snug group-hover:text-[#7b1113] transition-colors">
          {name}
        </h3>
        <p className="text-[#58413f] text-sm mb-4 font-body line-clamp-2">{description}</p>
        <div className="mt-auto">
          <div className="flex flex-col">
            {originalPrice && (
              <span className="text-[#8b716e] line-through text-sm">{originalPrice}</span>
            )}
            <span className="font-bold text-xl text-[#735b2b]">{price}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
