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
    subtitle: "GET THE COMPLETE",
    title: "Quality Healthcare Products",
    description: "Up to 25% off on all medicines",
    buttonText: "Shop Now",
    buttonLink: "/products",
  },
  {
    image: heroBanner2,
    subtitle: "LIMITED TIME OFFER",
    title: "Up to 25% Off",
    description: "Save big on medicines and healthcare products",
    buttonText: "Explore Offers",
    buttonLink: "/products",
  },
  {
    image: heroBanner3,
    subtitle: "AYURVEDA & HERBAL",
    title: "Natural Wellness",
    description: "Discover the power of natural healing",
    buttonText: "Explore Ayurveda",
    buttonLink: "/products?category=ayurveda",
  },
];

const sidePromos = [
  {
    image: heroBanner2,
    label: "EXCLUSIVE",
    title: "100% Pure Essential Oil",
    bgColor: "bg-cyan-400",
  },
  {
    image: heroBanner3,
    label: "EXCLUSIVE",
    title: "Natural Herbal Products",
    bgColor: "bg-teal-400",
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
    <section className="bg-background py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Banner */}
          <div className="lg:col-span-2 relative rounded-xl overflow-hidden">
            <div className="relative h-[250px] md:h-[320px] lg:h-[380px]">
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
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-400/90 via-sky-400/70 to-transparent" />
                  <div className="absolute inset-0 flex items-center">
                    <div className="px-8 md:px-12 max-w-md">
                      <p className="text-xs md:text-sm font-medium mb-2 text-white/90 uppercase tracking-wider">
                        {slide.subtitle}
                      </p>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-white leading-tight">
                        {slide.title}
                      </h2>
                      <p className="text-sm md:text-base mb-6 text-white/90">
                        {slide.description}
                      </p>
                      <Button asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold shadow-lg">
                        <Link to={slide.buttonLink}>{slide.buttonText}</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-white"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Side Promos */}
          <div className="hidden lg:flex flex-col gap-4">
            {sidePromos.map((promo, index) => (
              <Link
                key={index}
                to="/products"
                className={`relative rounded-xl overflow-hidden h-[182px] ${promo.bgColor} group`}
              >
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="absolute right-0 top-0 h-full w-2/3 object-cover object-left"
                />
                <div className="absolute inset-0 p-5 flex flex-col justify-center">
                  <span className="text-xs font-semibold text-white/90 uppercase tracking-wider mb-1">
                    {promo.label}
                  </span>
                  <h3 className="text-lg font-bold text-white leading-tight max-w-[140px]">
                    {promo.title}
                  </h3>
                  <span className="mt-3 text-sm font-medium text-white underline underline-offset-2 group-hover:no-underline">
                    Shop Now
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};