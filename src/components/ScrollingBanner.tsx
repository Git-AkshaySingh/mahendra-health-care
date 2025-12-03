import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const bannerItems = [
  {
    text: "Limited Period Offer: Get up to 10% off + extra 15% off on medicines & more offers.",
    highlight: "Explore",
    bgColor: "bg-orange-500",
  },
  {
    text: "Free Delivery on orders above ₹499. Use code: FREEDEL",
    highlight: "Shop Now",
    bgColor: "bg-orange-500",
  },
  {
    text: "Upload your prescription and get medicines delivered to your doorstep.",
    highlight: "Upload Now",
    bgColor: "bg-orange-500",
  },
  {
    text: "New User? Get flat 20% off on your first order. Use code: WELCOME20",
    highlight: "Register Now",
    bgColor: "bg-orange-500",
  },
];

export const ScrollingBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerItems.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + bannerItems.length) % bannerItems.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % bannerItems.length);
  };

  if (!isVisible) return null;

  const currentBanner = bannerItems[currentIndex];

  return (
    <div className={`${currentBanner.bgColor} text-white py-2 relative`}>
      <div className="container mx-auto px-4 flex items-center justify-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-white/80 hover:text-white hover:bg-white/10 hidden sm:flex"
          onClick={goToPrev}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex-1 text-center">
          <p className="text-xs sm:text-sm font-medium">
            {currentBanner.text}{" "}
            <span className="underline cursor-pointer font-semibold hover:no-underline">
              {currentBanner.highlight}
            </span>
          </p>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-white/80 hover:text-white hover:bg-white/10 hidden sm:flex"
          onClick={goToNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-white/80 hover:text-white hover:bg-white/10 absolute right-2"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-1 mt-1">
        {bannerItems.map((_, index) => (
          <button
            key={index}
            className={`h-1.5 rounded-full transition-all ${
              index === currentIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
