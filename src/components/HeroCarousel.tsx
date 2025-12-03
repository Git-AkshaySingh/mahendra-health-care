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
    textColor: "text-white",
    overlayColor: "from-primary/80 to-transparent",
  },
  {
    image: heroBanner2,
    title: "Up to 50% Off",
    subtitle: "Limited Time Offer",
    description: "Save big on medicines and healthcare products",
    buttonText: "Explore Offers",
    buttonLink: "/products",
    textColor: "text-white",
    overlayColor: "from-orange-600/80 to-transparent",
  },
  {
    image: heroBanner3,
    title: "Natural Wellness",
    subtitle: "Ayurveda & Herbal Care",
    description: "Discover the power of natural healing",
    buttonText: "Explore Ayurveda",
    buttonLink: "/products?category=ayurveda",
    textColor: "text-white",
    overlayColor: "from-green-700/80 to-transparent",
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
    <section className="relative w-full h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlayColor}`} />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-lg">
                <p className={`text-sm md:text-base font-medium mb-2 ${slide.textColor} opacity-90`}>
                  {slide.subtitle}
                </p>
                <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-3 ${slide.textColor}`}>
                  {slide.title}
                </h2>
                <p className={`text-sm md:text-base mb-6 ${slide.textColor} opacity-90`}>
                  {slide.description}
                </p>
                <Button asChild size="lg" className="bg-white text-foreground hover:bg-white/90">
                  <Link to={slide.buttonLink}>{slide.buttonText}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
      >
        <ChevronLeft className="h-5 w-5 text-foreground" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
      >
        <ChevronRight className="h-5 w-5 text-foreground" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2.5 rounded-full transition-all ${
              index === currentIndex
                ? "w-8 bg-white"
                : "w-2.5 bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
};
