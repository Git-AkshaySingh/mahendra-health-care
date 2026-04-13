import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroSlide1 from "@/assets/hero-slide-1.png";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.png";

const slides = [
  {
    image: heroSlide1,
    title: "Healthcare Excellence, Delivered.",
    description: "Trusted by Dehradun families since 1994. Genuine medicines, expert advice, and doorstep delivery.",
    buttonText: "Order Now",
    buttonLink: "/products",
  },
  {
    image: heroSlide2,
    title: "Flat 25% Off on Wellness Essentials",
    description: "Save on vitamins, supplements and daily health products. Quality you can trust.",
    buttonText: "Shop Now",
    buttonLink: "/products",
  },
  {
    image: heroSlide3,
    title: "Ayurveda & Natural Healing",
    description: "Discover the power of ancient remedies with our curated collection of herbal wellness products.",
    buttonText: "Explore",
    buttonLink: "/products?category=ayurveda",
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

  const goToPrev = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % slides.length);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[280px] md:h-[400px] lg:h-[480px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/30 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-lg">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                    {slide.title}
                  </h2>
                  <p className="text-white/80 text-sm md:text-base mt-4 leading-relaxed max-w-md">
                    {slide.description}
                  </p>
                  <div className="mt-6">
                    <Button asChild size="lg" className="rounded-xl gap-2 px-6 shadow-lg">
                      <Link to={slide.buttonLink}>
                        {slide.buttonText} <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-2.5 shadow-md transition-all z-10"
      >
        <ChevronLeft className="h-5 w-5 text-foreground" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-2.5 shadow-md transition-all z-10"
      >
        <ChevronRight className="h-5 w-5 text-foreground" />
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white w-8" : "bg-white/40 w-2 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
};
