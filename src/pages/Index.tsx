import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollingBanner } from "@/components/ScrollingBanner";
import { HeroSection } from "@/components/HeroSection";
import { CategorySection } from "@/components/CategorySection";
import { PromoBannersGrid } from "@/components/PromoBannersGrid";
import { MedicinesSection } from "@/components/MedicinesSection";
import { HealthBeautyProducts } from "@/components/HealthBeautyProducts";
import { TrustSection } from "@/components/TrustSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ScrollingBanner />
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Category Section */}
        <CategorySection />

        {/* Promotional Banners Grid */}
        <PromoBannersGrid />

        {/* Medicines Section (No Images - Text Based) */}
        <MedicinesSection />

        {/* Health & Beauty Products (With Images) */}
        <HealthBeautyProducts />

        {/* Trust Section */}
        <TrustSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
