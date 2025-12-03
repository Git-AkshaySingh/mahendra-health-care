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
        {/* Hero Carousel */}
        <HeroCarousel />

        {/* Search Bar Section */}
        <section className="bg-muted/50 py-4">
          <div className="container mx-auto px-4">
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="flex gap-2 bg-background rounded-lg p-1.5 shadow-sm border">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search for Medicines and Health Products"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-0 focus-visible:ring-0 bg-transparent"
                  />
                </div>
                <Button type="submit">
                  Search
                </Button>
              </div>
            </form>
          </div>
        </section>

        {/* Promotional Banner */}
        <PromotionalBanner />

        {/* Promo Banner */}
        <PromoBanner />

        {/* Health Concerns */}
        <HealthConcerns />

        {/* Product Carousels */}
        <div className="space-y-2">
          <section className="py-4 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Trending Today</h2>
                <Button variant="link" asChild className="text-primary gap-1">
                  <Link to="/products">
                    See All <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <ProductCarousel title="" />
            </div>
          </section>

          <section className="py-4">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Winter Care Essentials</h2>
                <Button variant="link" asChild className="text-primary gap-1">
                  <Link to="/products">
                    See All <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <ProductCarousel title="" />
            </div>
          </section>

          <section className="py-4 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Immunity Boosters</h2>
                <Button variant="link" asChild className="text-primary gap-1">
                  <Link to="/products">
                    See All <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <ProductCarousel title="" />
            </div>
          </section>

          <section className="py-4">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Personal Care</h2>
                <Button variant="link" asChild className="text-primary gap-1">
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
