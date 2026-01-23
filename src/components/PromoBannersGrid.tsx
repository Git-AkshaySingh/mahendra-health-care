import { Link } from "react-router-dom";
import promoHealthcare from "@/assets/promo-healthcare.jpg";
import promoBeauty from "@/assets/promo-beauty.jpg";
import promoPet from "@/assets/promo-pet.jpg";
import promoAyurveda from "@/assets/promo-ayurveda.jpg";
import promoImmunity from "@/assets/promo-immunity.jpg";
import promoPersonal from "@/assets/promo-personal.jpg";

const banners = [
  {
    title: "Upto 30% OFF",
    subtitle: "Healthcare Essentials",
    image: promoHealthcare,
    link: "/products?category=healthcare",
    bgGradient: "from-teal-600/90 to-teal-600/40",
  },
  {
    title: "Save Upto 40%",
    subtitle: "Beauty Care",
    image: promoBeauty,
    link: "/products?category=beauty",
    bgGradient: "from-pink-500/90 to-pink-500/40",
  },
  {
    title: "25% OFF",
    subtitle: "Best Deals on Personal Care",
    image: promoPersonal,
    link: "/products?category=personal-care",
    bgGradient: "from-purple-600/90 to-purple-600/40",
  },
  {
    title: "Extra 20% OFF",
    subtitle: "Shop Pet Medicines",
    image: promoPet,
    link: "/products?category=pet-care",
    bgGradient: "from-sky-600/90 to-sky-600/40",
  },
  {
    title: "30% OFF",
    subtitle: "Ayurveda & Herbal",
    image: promoAyurveda,
    link: "/products?category=ayurveda",
    bgGradient: "from-green-700/90 to-green-700/40",
  },
  {
    title: "Stay Protected",
    subtitle: "Immunity Boosters",
    image: promoImmunity,
    link: "/products?category=immunity",
    bgGradient: "from-orange-500/90 to-orange-500/40",
  },
];

export const PromoBannersGrid = () => {
  return (
    <section className="py-6 bg-background">
      <div className="container mx-auto px-4">
        {/* Row 1: 2 large banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {banners.slice(0, 2).map((banner, index) => (
            <Link
              key={index}
              to={banner.link}
              className="relative rounded-2xl overflow-hidden h-[180px] md:h-[200px] group"
            >
              <img
                src={banner.image}
                alt={banner.subtitle}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${banner.bgGradient}`} />
              <div className="absolute inset-0 p-6 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white">{banner.title}</h3>
                <p className="text-white/90 text-sm md:text-base mt-1">{banner.subtitle}</p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-secondary-foreground bg-secondary px-4 py-2 rounded-lg w-fit">
                  Shop Now →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Row 2: 4 smaller banners */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {banners.slice(2).map((banner, index) => (
            <Link
              key={index}
              to={banner.link}
              className="relative rounded-xl overflow-hidden h-[160px] md:h-[180px] group"
            >
              <img
                src={banner.image}
                alt={banner.subtitle}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${banner.bgGradient}`} />
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <h3 className="text-lg md:text-xl font-bold text-white leading-tight">{banner.title}</h3>
                <p className="text-white/80 text-xs md:text-sm mt-0.5 line-clamp-1">{banner.subtitle}</p>
                <span className="mt-2 text-xs font-semibold text-white underline underline-offset-2 group-hover:no-underline">
                  Shop Now
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
