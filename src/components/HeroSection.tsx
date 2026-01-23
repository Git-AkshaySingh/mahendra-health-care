import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShieldCheck, FileText, Clock } from "lucide-react";
import heroPharmacyMain from "@/assets/hero-pharmacy-main.jpg";

export const HeroSection = () => {
  const features = [
    { icon: ShieldCheck, text: "Verified Products" },
    { icon: FileText, text: "Easy Prescription Upload" },
    { icon: Clock, text: "Delivery in 24-48 hrs" },
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

            {/* CTA Button */}
            <Button asChild size="lg" className="px-8">
              <Link to="/products">
                Shop Health Products →
              </Link>
            </Button>

            {/* Feature Badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-background border border-border rounded-full px-4 py-2"
                >
                  <feature.icon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{feature.text}</span>
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
                className="w-full h-[380px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
