import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { FlashSaleSection } from './FlashSaleSection';
import { QualitySection } from './QualitySection';
import { PartnersSection } from './PartnersSection';
import { InsightsSection } from './InsightsSection';
import { Footer } from './Footer';
import { ChatWidget } from './ChatWidget';

export function HomePage() {
  return (
    <div className="min-h-svh bg-surface">
      <Navbar />
      <main>
        <HeroSection />
        <FlashSaleSection />
        <QualitySection />
        <PartnersSection />
        <InsightsSection />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
