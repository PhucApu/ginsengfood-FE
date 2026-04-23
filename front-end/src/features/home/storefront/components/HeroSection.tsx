'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface HeroImage {
  src: string;
  alt: string;
}

const heroImages: HeroImage[] = [
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQs9m4zAJ7m0iXRG80vbbDS47is7H8pR5gFhdgluwxGHIK1ySV87Eatc_EC0VsyowCqfxLmxHB7m9fP2oNbcIBkorijFYzjzNH3mGMivAWtWfFnWHvNq9k2O-gUKh4fuXZPFichGQG55kkLUdcyhpH8S3cyEvjpBS5a4mQUAv9ncO0qUhYlAsozE77w1Jte_nWBTbnSrwid5O6EPFYYRQkLUvrt6W2-WiPOfNMOSbIwf3JUHN3_9BiihMB-G_8stCOPS4RCOE9G0c',
    alt: 'High-quality aged ginseng root resting on dark textured stone',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2xVSET1Rzq8qyvoW3kxX2aX3w36_u_NTJOzvb67v4oPemD7N1nEd19L9rhzw6ue1FvEy8r0ZZ-_8YlR4X8o2POW-0QxhsYMEFzVPit-3nSCI5gj41qjqcBMlFhkkcc5-OUS2-pTk2YR3PC_cXmErzstqXoGeNdU45gMLWKK5lwmtD0xuGD8ouDWmmTNxCdIlcI4ZbeP3QpEC23xMX3g4L38XPrlQmGiL8_p42KAhpO4hWG9-SmSsS2--xKFEST3HqNTA1gI8riaE',
    alt: 'Misty mountains where traditional ginseng is cultivated',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCNH8w157k0osVW3ofIm-ijPkkT_5Q57sB7434kgJ1Q5yg-4_8q7horF7v22YwRsqoSIYEu_QjQK0itsItIbplcO3wOhiuhbvoZmthxjBSy_gVlQ3qAXSl9E5Vy2AgUtIgWZWsQ2Jv_eu3BqFw7WDqL5JbJLVd8yeWVsE5Ko15Fztt_jCbk6YQCL1Y5dzfcIP_AvVEOYAdgaAHxqJVwxHBGeP_vGiRYfbDYULogcTXQpQHwHPwX3gKxGKjDabxs2CwzFzY_BbsTsU',
    alt: 'Traditional apothecary herbs and preparation tools',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsXh-MxEkuGVmxdbI_kkv24RobsHKmshyZ3Y1zFWDwsnlcpd4ez_UUZ-55rSMGI4jnvKEUtBVkUPsUosroTz8EB3r47H5p9Wp9HbWp0gQg4hakYmQ1WP5-Lg3rXi1VppZwLudG7j-_iDDtmN4FbHdCMXMixtiM6J9_Od6lXPbILY7XIb35bp_ESlHLs3kBpfrGyQr3cT09SXaA5MAuRVP_60uw6ejH4qlERhlKcghEEma64XAsGG7T7i5giV-Csvt1pT8cNqpt4ag',
    alt: 'Fresh natural ingredients from heritage landscapes',
  },
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[819px] flex items-center bg-surface-container-low mb-20 overflow-hidden">
      {/* Background carousel */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((img, i) => (
          <Image
            key={img.src}
            src={img.src}
            alt={img.alt}
            fill
            className={`object-cover object-center mix-blend-multiply transition-opacity duration-[1500ms] ease-in-out ${
              i === activeIndex ? 'opacity-80 z-[1]' : 'opacity-0 z-0'
            }`}
            priority={i === 0}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-8 w-full">
        <div className="max-w-2xl">
          <span className="text-secondary font-body font-semibold tracking-widest uppercase text-sm mb-4 block">
            The Roots of Vitality
          </span>
          <h1 className="font-headline text-5xl md:text-7xl leading-tight text-on-surface mb-6 tracking-tight">
            Alchemizing tradition for modern vitality.
          </h1>
          <p className="font-body text-lg text-on-surface-variant mb-10 max-w-lg leading-relaxed">
            Experience the profound restorative power of our ethically wild-harvested, aged mountain ginseng. Curated
            for the discerning purveyor of holistic wellness.
          </p>
          <button className="btn-primary px-8 py-4 font-body font-semibold text-lg hover:opacity-90 transition-opacity">
            Shop the Collection
          </button>
        </div>
      </div>
    </section>
  );
}
