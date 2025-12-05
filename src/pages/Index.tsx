import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Truck, Clock, Award, Search, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { HealthConcerns } from "@/components/HealthConcerns";
import { PromoBanner } from "@/components/PromoBanner";
import { ProductCarousel } from "@/components/ProductCarousel";
import { ScrollingBanner } from "@/components/ScrollingBanner";
import { HeroCarousel } from "@/components/HeroCarousel";
import { PromotionalBanner } from "@/components/PromotionalBanner";
import { LongAdBanner, DualAdBanners, HealthOfferBanner } from "@/components/AdBanners";
import { useState } from "react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

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
        {/* Search Bar Section */}
        <section className="bg-primary/10 py-4">
          <div className="container mx-auto px-4">
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="flex items-center gap-2 bg-background rounded-full p-1.5 shadow-lg border border-border">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search for Medicines and Health Products"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 border-0 focus-visible:ring-0 bg-transparent h-10 text-base"
                  />
                </div>
                <Button type="submit" className="rounded-full px-6 h-10">
                  Search
                </Button>
              </div>
            </form>
          </div>
        </section>

        {/* Hero Carousel */}
        <HeroCarousel />

        {/* Promo Banner */}
        <PromoBanner />

        {/* Health Concerns */}
        <HealthConcerns />

        {/* Promotional Banner */}
        <PromotionalBanner />

        {/* Long Ad Banner */}
        <LongAdBanner />

        {/* Product Carousels */}
        <div className="space-y-0">
          <section className="py-8 bg-gradient-to-b from-muted/50 to-background">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Trending Today</h2>
                <Button variant="link" asChild className="text-primary gap-1 font-medium">
                  <Link to="/products">
                    See All <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <ProductCarousel title="" />
            </div>
          </section>

          <section className="py-8 bg-background">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Winter Care Essentials</h2>
                <Button variant="link" asChild className="text-primary gap-1 font-medium">
                  <Link to="/products">
                    See All <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <ProductCarousel title="" />
            </div>
          </section>

          {/* Dual Ad Banners */}
          <DualAdBanners />

          <section className="py-8 bg-gradient-to-b from-muted/50 to-background">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Immunity Boosters</h2>
                <Button variant="link" asChild className="text-primary gap-1 font-medium">
                  <Link to="/products">
                    See All <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <ProductCarousel title="" />
            </div>
          </section>

          {/* Health Offer Banner */}
          <HealthOfferBanner />

          <section className="py-8 bg-background">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Personal Care</h2>
                <Button variant="link" asChild className="text-primary gap-1 font-medium">
                  <Link to="/products">
                    See All <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <ProductCarousel title="" />
            </div>
          </section>
        </div>

        {/* Why Choose Us */}
        <section className="py-12 bg-background">
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
