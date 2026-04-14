import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CategorySection } from "@/components/CategorySection";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { PromoBannerStrip } from "@/components/PromoBannerStrip";
import { TrustedBrands } from "@/components/TrustedBrands";
import { ExclusiveServices } from "@/components/ExclusiveServices";
import { EssentialCarePicks } from "@/components/EssentialCarePicks";
import { BentoAdsSection } from "@/components/BentoAdsSection";
import { NewsletterSection } from "@/components/NewsletterSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <CategorySection />

      <main className="flex-1">
        <HeroSection />
        <FeaturedProducts />
        <PromoBannerStrip />
        <TrustedBrands />
        <ExclusiveServices />
        <EssentialCarePicks />
        <BentoAdsSection />
        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
