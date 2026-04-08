import { Link } from "react-router-dom";
import { Video, Shield, Leaf, Wallet, Tag } from "lucide-react";

export const ExclusiveServices = () => {
  return (
    <section className="py-10 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground mb-6">Exclusive Services</h2>

        {/* Top row: 3 banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Health Checkup */}
          <div className="bg-primary rounded-2xl p-6 text-primary-foreground relative overflow-hidden min-h-[180px] flex flex-col justify-center">
            <span className="inline-flex items-center bg-secondary text-secondary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full w-fit mb-2">
              FAST RESULTS
            </span>
            <h3 className="text-xl font-bold leading-snug">
              Book Full Body<br />Checkup at Home
            </h3>
            <p className="text-primary-foreground/70 text-xs mt-1">60+ Vital parameters included.</p>
            <Link
              to="/products"
              className="mt-3 inline-flex items-center bg-background text-foreground text-sm font-medium px-4 py-2 rounded-lg w-fit hover:bg-muted transition-colors"
            >
              Book Now
            </Link>
          </div>

          {/* Online Consultation */}
          <div className="bg-background border border-border rounded-2xl p-6 relative overflow-hidden min-h-[180px] flex flex-col justify-center">
            <div className="flex items-center gap-1 mb-2">
              <Video className="h-4 w-4 text-destructive" />
              <span className="text-[10px] font-bold text-destructive uppercase">LIVE NOW</span>
            </div>
            <h3 className="text-xl font-bold text-foreground leading-snug">
              Consult Online<br />in 10 Minutes
            </h3>
            <p className="text-muted-foreground text-xs mt-1">
              Verified specialists across 22+ categories ready to help.
            </p>
            <p className="text-muted-foreground text-xs mt-3">400+ Doctors Available</p>
          </div>

          {/* Vitamins Offer */}
          <div className="bg-secondary rounded-2xl p-6 text-secondary-foreground relative overflow-hidden min-h-[180px] flex flex-col justify-center items-center text-center">
            <span className="text-4xl font-black">30%</span>
            <span className="text-xs font-bold tracking-wider uppercase mt-1">OFF VITAMINS</span>
            <p className="text-secondary-foreground/70 text-xs mt-2">
              Limited time curated bundle offers.
            </p>
            <Link
              to="/products"
              className="mt-3 inline-flex items-center bg-background text-foreground text-sm font-medium px-4 py-2 rounded-lg hover:bg-muted transition-colors"
            >
              Shop Deal
            </Link>
          </div>
        </div>

        {/* Bottom row: 3 smaller banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary rounded-2xl p-5 text-primary-foreground flex items-center justify-between">
            <div>
              <h4 className="font-bold">AyuCare™ Herbal Range</h4>
              <p className="text-primary-foreground/70 text-xs mt-0.5">100% Organic Purity</p>
            </div>
            <Leaf className="h-8 w-8 text-primary-foreground/40" />
          </div>

          <div className="bg-background border border-border rounded-2xl p-5 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-foreground">MHC Wallet</h4>
              <p className="text-muted-foreground text-xs mt-0.5">Earn 10% cashback daily</p>
            </div>
            <Wallet className="h-8 w-8 text-primary" />
          </div>

          <div className="bg-muted/50 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-secondary">Care Pass</h4>
              <p className="text-muted-foreground text-xs mt-0.5">Free Delivery on all orders</p>
            </div>
            <Shield className="h-8 w-8 text-secondary" />
          </div>
        </div>
      </div>
    </section>
  );
};
