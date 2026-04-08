import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroBanner from "@/assets/hero-banner-main.jpg";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden my-4">
          <img
            src={heroBanner}
            alt="Healthcare Excellence"
            className="w-full h-[240px] md:h-[320px] lg:h-[380px] object-cover"
            width={1920}
            height={600}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary))]/80 to-transparent" />
          <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-center max-w-xl">
            <span className="inline-flex items-center bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full w-fit mb-3">
              ESTABLISHED 1994 • TRUSTED BY MILLIONS
            </span>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Your Health,
              <br />
              <span className="text-secondary">Curated by</span>
              <br />
              Experts.
            </h1>
            <p className="text-white/80 text-sm md:text-base mt-3 max-w-md">
              Experience clinical precision in pharmaceutical care.
              From verified prescriptions to expert wellness
              consultations, we curate your journey.
            </p>
            <div className="flex gap-3 mt-5">
              <Button asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2">
                <Link to="/products">
                  Order Prescription <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/products">View Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
