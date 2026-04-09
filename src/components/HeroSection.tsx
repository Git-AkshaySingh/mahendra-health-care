import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroBanner from "@/assets/hero-banner-main.jpg";
import heroPharmacy from "@/assets/hero-pharmacy-pro.jpg";
import heroAyurveda from "@/assets/hero-ayurveda.jpg";

const slides = [
  {
    image: heroBanner,
    subtitle: "ESTABLISHED 1994 • TRUSTED BY MILLIONS",
    title: "Your Health, Curated by Experts.",
    description: "Experience clinical precision in pharmaceutical care. From verified prescriptions to expert wellness consultations.",
    buttonText: "Order Prescription",
    buttonLink: "/products",
  },
  {
    image: heroPharmacy,
    subtitle: "UP TO 25% OFF ON ALL MEDICINES",
    title: "Quality Healthcare Products",
    description: "Save big on medicines and healthcare products. Genuine products with fast delivery across Dehradun.",
    buttonText: "Shop Now",
    buttonLink: "/products",
  },
  {
    image: heroAyurveda,
    subtitle: "AYURVEDA & HERBAL WELLNESS",
    title: "Natural Healing Solutions",
    description: "Discover the power of ancient Ayurvedic remedies and herbal products for holistic well-being.",
    buttonText: "Explore Ayurveda",
    buttonLink: "/products",
  },
];

export const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden my-4">
          <div className="relative h-[240px] md:h-[320px] lg:h-[380px]">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-out ${
                  index === currentIndex
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary))]/80 via-[hsl(var(--primary))]/40 to-transparent" />
                <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-center max-w-xl">
                  <span className="inline-flex items-center bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full w-fit mb-3">
                    {slide.subtitle}
                  </span>
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-white/80 text-sm md:text-base mt-3 max-w-md">
                    {slide.description}
                  </p>
                  <div className="flex gap-3 mt-5">
                    <Button asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2">
                      <Link to={slide.buttonLink}>
                        {slide.buttonText} <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10"
          >
            <ChevronRight className="h-5 w-5 text-foreground" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-white w-6"
                    : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
