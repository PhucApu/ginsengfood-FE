import ProminentBanner from './ProminentBanner';
import HeroSection from './HeroSection';
import FlashSaleSection from './FlashSaleSection';
import AlchemistBanner from './AlchemistBanner';
import TrustedWorldwide from './TrustedWorldwide';
import HeritageInsights from './HeritageInsights';
import FadeInSection from '@/shared/components/FadeInSection';

export default function HomePage() {
  return (
    <>
      {/* ProminentBanner sits at the very top — no fade-in delay */}
      <FadeInSection>
        <ProminentBanner />
      </FadeInSection>

      {/* HeroSection is above the fold; fade in immediately */}
      <FadeInSection delay={100}>
        <HeroSection />
      </FadeInSection>

      <FadeInSection delay={0}>
        <FlashSaleSection />
      </FadeInSection>

      <FadeInSection delay={0}>
        <AlchemistBanner />
      </FadeInSection>

      <FadeInSection delay={0}>
        <TrustedWorldwide />
      </FadeInSection>

      <FadeInSection delay={0}>
        <HeritageInsights />
      </FadeInSection>
    </>
  );
}
