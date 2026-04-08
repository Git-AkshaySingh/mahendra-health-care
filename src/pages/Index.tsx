import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CategorySection } from "@/components/CategorySection";
import { HeroSection } from "@/components/HeroSection";
import { ClinicalEssentials } from "@/components/ClinicalEssentials";
import { ExclusiveServices } from "@/components/ExclusiveServices";
import { CosmeticWellness } from "@/components/CosmeticWellness";
import { NewsletterSection } from "@/components/NewsletterSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <CategorySection />

      <main className="flex-1">
        <HeroSection />
        <ClinicalEssentials />
        <ExclusiveServices />
        <CosmeticWellness />
        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
