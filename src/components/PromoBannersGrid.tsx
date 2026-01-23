import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import promoHealthcare from "@/assets/promo-healthcare.jpg";
import promoBeauty from "@/assets/promo-beauty.jpg";
import promoPet from "@/assets/promo-pet.jpg";
import promoAyurveda from "@/assets/promo-ayurveda.jpg";
import promoImmunity from "@/assets/promo-immunity.jpg";
import promoPersonal from "@/assets/promo-personal.jpg";

const topPromos = [
  {
    title: "Healthcare Essentials",
    discount: "Upto 30% OFF",
    image: promoHealthcare,
    link: "/products?category=healthcare",
    overlay: "from-teal-600/80",
  },
  {
    title: "Beauty Care",
    discount: "Save Upto 40%",
    image: promoBeauty,
    link: "/products?category=beauty",
    overlay: "from-pink-500/80",
  },
];

const middlePromos = [
  {
    title: "Best Deals",
    subtitle: "On Personal Care",
    discount: "25% OFF",
    image: promoPersonal,
    link: "/products?category=personal-care",
    overlay: "from-purple-500/80",
  },
  {
    title: "Shop Pet Medicines",
    subtitle: "",
    discount: "Extra 20% OFF",
    image: promoPet,
    link: "/products?category=pet-care",
    overlay: "from-sky-600/80",
  },
  {
    title: "Shop Pet Medicines",
    subtitle: "",
    discount: "Extra 20% OFF",
    image: promoPet,
    link: "/products?category=pet-care",
    overlay: "from-amber-600/80",
  },
];

const bottomPromos = [
  {
    title: "Ayurveda & Herbal",
    discount: "30% OFF",
    image: promoAyurveda,
    link: "/products?category=ayurveda",
    overlay: "from-green-600/80",
  },
  {
    title: "Immunity Boosters",
    subtitle: "Stay Healthy & Protected",
    image: promoImmunity,
    link: "/products?category=immunity",
    overlay: "from-orange-500/80",
  },
];

export const PromoBannersGrid = () => {
  return (
    <section className="py-6 bg-background">
      <div className="container mx-auto px-4 space-y-4">
        {/* Top Row - 2 banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topPromos.map((promo, index) => (
            <Link
              key={index}
              to={promo.link}
              className="relative rounded-2xl overflow-hidden h-[180px] md:h-[200px] group"
            >
              <img
                src={promo.image}
                alt={promo.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${promo.overlay} via-transparent to-transparent`} />
              <div className="absolute inset-0 p-6 flex flex-col justify-center">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                  {promo.discount}
                </h3>
                <p className="text-white/90 text-sm md:text-base mb-4">{promo.title}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-white bg-secondary px-4 py-2 rounded-lg w-fit hover:bg-secondary/90 transition-colors">
                  Shop Now <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Middle Row - 3 banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {middlePromos.map((promo, index) => (
            <Link
              key={index}
              to={promo.link}
              className="relative rounded-2xl overflow-hidden h-[180px] group"
            >
              <img
                src={promo.image}
                alt={promo.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${promo.overlay} via-transparent to-transparent`} />
              <div className="absolute inset-0 p-5 flex flex-col justify-center">
                <h3 className="text-lg font-bold text-white">{promo.title}</h3>
                <p className="text-xl font-bold text-white mb-1">{promo.discount}</p>
                {promo.subtitle && (
                  <p className="text-white/80 text-sm mb-3">{promo.subtitle}</p>
                )}
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-white bg-secondary px-3 py-1.5 rounded-lg w-fit hover:bg-secondary/90 transition-colors">
                  Shop Now
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Row - 2 banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bottomPromos.map((promo, index) => (
            <Link
              key={index}
              to={promo.link}
              className="relative rounded-2xl overflow-hidden h-[180px] md:h-[200px] group"
            >
              <img
                src={promo.image}
                alt={promo.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${promo.overlay} via-transparent to-transparent`} />
              <div className="absolute inset-0 p-6 flex flex-col justify-center">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                  {promo.title}
                </h3>
                <p className="text-lg font-semibold text-white/90 mb-1">{promo.discount}</p>
                {promo.subtitle && (
                  <p className="text-white/80 text-sm mb-3">{promo.subtitle}</p>
                )}
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-white bg-secondary px-4 py-2 rounded-lg w-fit hover:bg-secondary/90 transition-colors">
                  Shop Now <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
