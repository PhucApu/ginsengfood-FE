import StorefrontHeader from '@/app/(storefront)/components/StorefrontHeader';
import StorefrontFooter from '@/app/(storefront)/components/StorefrontFooter';
import HomePage from '@/features/home/storefront/components/HomePage';
import ConsultationWidget from '@/features/home/storefront/components/ConsultationWidget';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fbf9f5]">
      <StorefrontHeader />
      <main className="flex-grow">
        <HomePage />
      </main>
      <StorefrontFooter />
      <ConsultationWidget />
    </div>
  );
}
