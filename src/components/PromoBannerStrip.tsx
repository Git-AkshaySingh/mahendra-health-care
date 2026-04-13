import { Link } from "react-router-dom";
import adBanner from "@/assets/ad-banner-horizontal.jpg";

export const PromoBannerStrip = () => {
  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <Link to="/products" className="block rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow">
          <div className="relative h-[100px] md:h-[140px] overflow-hidden">
            <img src={adBanner} alt="Special offers on vitamins and supplements" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex items-center">
              <div className="px-8 md:px-12">
                <p className="text-white/80 text-xs font-semibold tracking-wider uppercase">Limited Time</p>
                <h3 className="text-xl md:text-2xl font-bold text-white mt-1">Flat 20% Off on Vitamins & Supplements</h3>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};
