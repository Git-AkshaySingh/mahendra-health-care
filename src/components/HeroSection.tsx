import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, ShieldCheck, FileText, Clock } from "lucide-react";
import heroPharmacyMain from "@/assets/hero-pharmacy-main.jpg";

export const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const features = [
    { icon: ShieldCheck, text: "Verified Products", subtext: "100% Authentic" },
    { icon: FileText, text: "Easy Prescription Upload", subtext: "Quick & Simple" },
    { icon: Clock, text: "Delivery in", subtext: "24-48 hrs" },
  ];

  return (
    <section className="relative bg-gradient-to-r from-primary/5 via-background to-background overflow-hidden">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Your Trusted Online
                <span className="text-primary"> Pharmacy</span>
              </h1>
              <p className="mt-3 text-muted-foreground text-lg">
                Get all your healthcare, beauty & wellness needs at best prices
              </p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative max-w-xl">
              <div className="flex items-center bg-background border-2 border-border rounded-xl overflow-hidden focus-within:border-primary transition-colors">
                <Search className="h-5 w-5 text-muted-foreground ml-4" />
                <input
                  type="text"
                  placeholder="Search by products, categories, or brands"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-3.5 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <Button type="submit" className="m-1.5 rounded-lg">
                  Search
                </Button>
              </div>
            </form>

            {/* CTA Button */}
            <Button asChild size="lg" className="px-8">
              <Link to="/products">
                Shop Health Products →
              </Link>
            </Button>

            {/* Feature Badges */}
            <div className="flex flex-wrap gap-4 pt-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-background border border-border rounded-full px-4 py-2"
                >
                  <feature.icon className="h-5 w-5 text-primary" />
                  <div className="text-sm">
                    <span className="font-medium text-foreground">{feature.text}</span>
                    {feature.subtext && (
                      <span className="text-muted-foreground ml-1 text-xs">({feature.subtext})</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden lg:block relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroPharmacyMain}
                alt="Trusted Online Pharmacy"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background/30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
