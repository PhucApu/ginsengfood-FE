import Image from 'next/image';

const features = [
  {
    icon: 'verified',
    title: 'Uncompromising Purity',
    desc: 'Every root undergoes rigorous botanical testing to ensure absolute organic integrity and peak ginsenoside levels.',
  },
  {
    icon: 'landscape',
    title: 'Sacred Terroir',
    desc: 'Cultivated in nutrient-dense, high-altitude soils where the climate fosters resilience and unparalleled potency.',
  },
];

export default function AlchemistBanner() {
  return (
    <section className="w-full bg-tertiary-container py-24 mb-32 relative overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="relative z-10">
          <h2 className="font-headline text-5xl text-on-tertiary mb-8 leading-tight">
            Sourced with reverence. Crafted with precision.
          </h2>
          <div className="space-y-8">
            {features.map((feature) => (
              <div key={feature.icon} className="flex items-start">
                <div className="mt-1 mr-4 text-tertiary-fixed">
                  <span className="material-symbols-outlined">{feature.icon}</span>
                </div>
                <div>
                  <h4 className="font-headline text-xl text-on-tertiary mb-2">{feature.title}</h4>
                  <p className="font-body text-tertiary-fixed-dim">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="btn-primary px-8 py-4 mt-10 font-body font-semibold text-lg hover:opacity-90 transition-opacity">
            Nhận ưu đãi ngay
          </button>
        </div>

        <div className="relative h-[500px] md:h-[600px] w-full z-0">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIMk6mzXfFgT9R9jLLYoBsf_fXhmTzvK08g9iNuMR8LX6Vm2eyO3WCl-dRz0MGt6NNX5BHE53u373WcBNHvuOTlZKcCRXV6fnoiVH8tX5oBrsKljv6nV0yK7ks5cZACFZBkkDRTMXhiN2UETTwHFQOPBQqypkdE3D77Ut9jqiLJ_aDv87q32NAMwMIoUtVPPKAtL1uIFxvceOtwUD549wxH7ez3_aHnH9xqzM844X909ka0_kLz8o0koamp-Ksgjju4Le13kOR3oQ"
            alt="Mist over ancient mountains where ginseng grows"
            fill
            className="object-cover object-center rounded-3xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
