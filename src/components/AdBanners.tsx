import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Percent, Truck, Shield, Heart } from "lucide-react";

export const LongAdBanner = () => {
  return (
    <section className="py-4 bg-background">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 md:p-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1/3 h-full opacity-10">
            <div className="absolute right-10 top-5 w-32 h-32 bg-white rounded-full" />
            <div className="absolute right-40 bottom-10 w-20 h-20 bg-white rounded-full" />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 rounded-full p-3">
                <Percent className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  Flat 20% OFF on First Order
                </h3>
                <p className="text-white/90 text-sm">
                  Use code: FIRST20 • Valid on orders above ₹500
                </p>
              </div>
            </div>
            <Button asChild className="bg-white text-emerald-600 hover:bg-white/90">
              <Link to="/products">Shop Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export const DualAdBanners = () => {
  return (
    <section className="py-4 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Free Delivery Banner */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-5 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
              <div className="absolute right-5 top-3 w-16 h-16 bg-white rounded-full" />
            </div>
            <div className="relative z-10 flex items-center gap-4">
              <div className="bg-white/20 rounded-full p-3">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Free Delivery</h3>
                <p className="text-white/90 text-xs">On orders above ₹299</p>
              </div>
            </div>
          </div>

          {/* Genuine Medicines Banner */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-5 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
              <div className="absolute right-5 top-3 w-16 h-16 bg-white rounded-full" />
            </div>
            <div className="relative z-10 flex items-center gap-4">
              <div className="bg-white/20 rounded-full p-3">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">100% Genuine</h3>
                <p className="text-white/90 text-xs">All medicines verified</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const HealthOfferBanner = () => {
  return (
    <section className="py-4 bg-background">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-rose-400 to-pink-500 rounded-2xl p-6 md:p-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1/3 h-full opacity-10">
            <div className="absolute right-20 top-8 w-24 h-24 bg-white rounded-full" />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 rounded-full p-3">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  Winter Health Essentials
                </h3>
                <p className="text-white/90 text-sm">
                  Up to 30% OFF on immunity boosters & vitamins
                </p>
              </div>
            </div>
            <Button asChild className="bg-white text-rose-600 hover:bg-white/90">
              <Link to="/products">Explore</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
