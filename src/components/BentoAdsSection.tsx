import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroLakme from "@/assets/hero-lakme.webp";
import brandCatfood from "@/assets/brand-catfood.jpg";
import brandSupplementsBanner from "@/assets/brand-supplements-banner.jpg";
import brandDroolsProducts from "@/assets/brand-drools-products.jpg";
import brandNiveaGlow from "@/assets/brand-nivea-glow.jpg";

export const BentoAdsSection = () => {
  return (
    <section className="py-14">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground mb-8">Deals & Highlights</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[160px] md:auto-rows-[190px]">
          {/* Large card - premium brand lifestyle */}
          <Link
            to="/products"
            className="col-span-2 row-span-2 rounded-2xl overflow-hidden relative group shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow"
          >
            <img
              src={heroLakme}
              alt="Premium beauty collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <span className="text-[10px] font-bold tracking-wider text-white/70 uppercase">Premium Collection</span>
              <h3 className="text-xl md:text-2xl font-bold text-white mt-1 leading-snug">
                Beauty & Skincare Essentials
              </h3>
              <p className="text-white/70 text-sm mt-2 max-w-xs hidden md:block">
                Discover premium cosmetics from trusted brands.
              </p>
              <span className="mt-3 inline-flex items-center text-white text-sm font-medium gap-1 hover:gap-2 transition-all">
                Shop Now <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>

          {/* Medium card - supplements */}
          <Link
            to="/products"
            className="col-span-1 rounded-2xl overflow-hidden relative group shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow"
          >
            <img
              src={brandSupplementsBanner}
              alt="Supplements and protein"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4">
              <h4 className="font-bold text-white text-sm">Supplements</h4>
              <p className="text-white/70 text-xs mt-0.5">Up to 40% Off</p>
            </div>
          </Link>

          {/* Medium card - cat food */}
          <Link
            to="/products?category=pets"
            className="col-span-1 rounded-2xl overflow-hidden relative group shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow"
          >
            <img
              src={brandCatfood}
              alt="Cat food and pet nutrition"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4">
              <h4 className="font-bold text-white text-sm">Pet Nutrition</h4>
              <p className="text-white/70 text-xs mt-0.5">20% Cashback</p>
            </div>
          </Link>

          {/* Small card - pet products */}
          <Link
            to="/products?category=pets"
            className="col-span-1 rounded-2xl overflow-hidden relative group shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow"
          >
            <img
              src={brandDroolsProducts}
              alt="Dog food and treats"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4">
              <h4 className="font-bold text-white text-sm">Dog Care</h4>
              <p className="text-white/70 text-xs mt-0.5">Top Brands</p>
            </div>
          </Link>

          {/* Small card - skincare */}
          <Link
            to="/products"
            className="col-span-1 rounded-2xl overflow-hidden relative group shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow"
          >
            <img
              src={brandNiveaGlow}
              alt="Skincare and glow products"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4">
              <h4 className="font-bold text-white text-sm">Glow Essentials</h4>
              <p className="text-white/70 text-xs mt-0.5">New Arrivals</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
