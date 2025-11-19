import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Truck, Clock, Award, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-pharmacy.jpg";
import { CategoryIcons } from "@/components/CategoryIcons";
import { ProductCarousel } from "@/components/ProductCarousel";
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
      description: "All medicines are sourced from licensed manufacturers and verified for authenticity.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Get your medicines delivered to your doorstep within 24-48 hours.",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Our pharmacists are available round the clock to answer your questions.",
    },
    {
      icon: Award,
      title: "Best Quality",
      description: "We maintain strict quality standards for all our products.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Banner */}
        <section
          className="relative h-[400px] md:h-[500px] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/80" />
          <div className="container relative z-10 mx-auto px-4 text-center text-white">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              Your Health, Our Priority
            </h1>
            <p className="mb-6 text-lg md:text-xl">
              Quality medicines delivered to your doorstep
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="flex gap-2 bg-white rounded-lg p-2">
                <Input
                  type="text"
                  placeholder="Search for Medicines and Health Products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 border-0 focus-visible:ring-0"
                />
                <Button type="submit" size="lg">
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </form>
          </div>
        </section>

        {/* Category Icons */}
        <CategoryIcons />

        {/* Product Carousels */}
        <div className="container mx-auto px-4">
          <ProductCarousel title="Trending Today" />
          <ProductCarousel title="Winter Care Essentials" />
          <ProductCarousel title="Immunity Boosters" />
          <ProductCarousel title="Personal Care" />
        </div>

        {/* Why Choose Us */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">Why Choose Us?</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <Card key={index} className="border transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-3xl font-bold">Need Help?</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Our expert pharmacists are here to assist you
            </p>
            <Button asChild size="lg">
              <Link to="/auth">Get Started</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
