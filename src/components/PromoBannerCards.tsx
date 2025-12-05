import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const promos = [
  {
    title: "Healthcare Essentials",
    subtitle: "Weekend Sale",
    discount: "25% Off",
    bgColor: "bg-rose-400",
    link: "/products",
  },
  {
    title: "Baby Care Products",
    subtitle: "Up To 75% OFF",
    discount: "The Great Baby Deals",
    bgColor: "bg-amber-400",
    link: "/products?category=baby-care",
  },
  {
    title: "Personal Care",
    subtitle: "Weekend Sale",
    discount: "25% OFF",
    bgColor: "bg-cyan-500",
    link: "/products?category=personal-care",
  },
];

export const PromoBannerCards = () => {
  return (
    <section className="py-6 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {promos.map((promo, index) => (
            <Link
              key={index}
              to={promo.link}
              className={`relative rounded-xl overflow-hidden h-[180px] ${promo.bgColor} group transition-transform hover:scale-[1.02]`}
            >
              <div className="absolute inset-0 p-6 flex flex-col justify-center">
                <span className="text-xs font-medium text-white/90 uppercase tracking-wider mb-1">
                  {promo.subtitle}
                </span>
                <h3 className="text-xl font-bold text-white mb-1">
                  {promo.title}
                </h3>
                <p className="text-2xl font-bold text-white mb-4">
                  {promo.discount}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-white group-hover:gap-2 transition-all">
                  Shop Now <ArrowRight className="h-4 w-4" />
                </span>
              </div>
              <div className="absolute right-0 top-0 w-1/2 h-full opacity-20">
                <div className="absolute right-4 top-4 w-20 h-20 bg-white rounded-full" />
                <div className="absolute right-16 bottom-8 w-12 h-12 bg-white rounded-full" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};