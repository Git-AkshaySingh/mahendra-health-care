import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroBanner1 from "@/assets/hero-banner-1.jpg";
import heroBanner2 from "@/assets/hero-banner-2.jpg";
import heroBanner3 from "@/assets/hero-banner-3.jpg";

const slides = [
  {
    image: heroBanner1,
    title: "Quality Healthcare",
    subtitle: "Your trusted partner for all your health needs",
    description: "Get medicines delivered to your doorstep with ease",
    buttonText: "Shop Now",
    buttonLink: "/products",
  },
  {
    image: heroBanner2,
    title: "Up to 25% Off",
    subtitle: "Limited Time Offer",
    description: "Save big on medicines and healthcare products",
    buttonText: "Explore Offers",
    buttonLink: "/products",
  },
  {
    image: heroBanner3,
    title: "Natural Wellness",
    subtitle: "Ayurveda & Herbal Care",
    description: "Discover the power of natural healing",
    buttonText: "Explore Ayurveda",
    buttonLink: "/products?category=ayurveda",
  },
];

export const HeroCarousel = () => {
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
    <section className="relative w-full overflow-hidden bg-muted/30">
      <div className="container mx-auto px-4 py-4">
        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <div className="relative h-[220px] md:h-[350px] lg:h-[420px]">
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
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-lg">
                      <p className="text-xs md:text-sm font-semibold mb-2 text-primary-foreground/90 uppercase tracking-wider">
                        {slide.subtitle}
                      </p>
                      <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 text-white drop-shadow-lg">
                        {slide.title}
                      </h2>
                      <p className="text-sm md:text-base mb-6 text-white/90 max-w-md">
                        {slide.description}
                      </p>
                      <Button asChild size="lg" className="shadow-lg font-semibold">
                        <Link to={slide.buttonLink}>{slide.buttonText}</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full p-3 shadow-lg transition-all"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full p-3 shadow-lg transition-all"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-white"
                    : "w-2 bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
