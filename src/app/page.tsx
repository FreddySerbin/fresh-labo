import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { BeforeAfterSection } from '@/components/landing/BeforeAfterSection';
import { ServicesSection } from '@/components/landing/ServicesSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { ZoneSection } from '@/components/landing/ZoneSection';
import { FinalCTASection } from '@/components/landing/FinalCTASection';
import { FloatingCTA } from '@/components/landing/FloatingCTA';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-dark-navy">
        <HeroSection />
        <BeforeAfterSection />
        <ServicesSection />
        <HowItWorksSection />
        <ZoneSection />
        <FinalCTASection />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
