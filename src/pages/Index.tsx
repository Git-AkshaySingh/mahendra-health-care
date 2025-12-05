import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Truck, Clock, Award, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { HeroCarousel } from "@/components/HeroCarousel";
import { BestSellingProducts } from "@/components/BestSellingProducts";
import { PromoBannerCards } from "@/components/PromoBannerCards";
import { HotDeals } from "@/components/HotDeals";
import { PopularProducts } from "@/components/PopularProducts";
import { ScrollingBanner } from "@/components/ScrollingBanner";

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: "Verified Products",
      description: "All medicines sourced from licensed manufacturers.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Delivered to your doorstep within 24-48 hours.",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Pharmacists available round the clock.",
    },
    {
      icon: Award,
      title: "Best Quality",
      description: "Strict quality standards for all products.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ScrollingBanner />
      <Navbar />

      <main className="flex-1">
        {/* Hero Carousel with Side Banners */}
        <HeroCarousel />

        {/* Best Selling Products */}
        <BestSellingProducts />

        {/* Promotional Banner Cards */}
        <PromoBannerCards />

        {/* Hot Deals */}
        <HotDeals />

        {/* Popular Products */}
        <PopularProducts />

        {/* Why Choose Us */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-bold">Why Choose MHC?</h2>
            <div className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <Card key={index} className="border transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-base">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-2xl font-bold">Need Help?</h2>
            <p className="mb-6 text-muted-foreground">
              Our expert pharmacists are here to assist you
            </p>
            <Button asChild size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;