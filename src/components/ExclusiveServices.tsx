import { Link } from "react-router-dom";
import { Video, Shield, Leaf, Wallet } from "lucide-react";

export const ExclusiveServices = () => {
  return (
    <section className="py-14">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground mb-8">Exclusive Services</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          <div className="bg-primary/5 border border-primary/15 rounded-2xl p-7 flex flex-col justify-center min-h-[200px]">
            <span className="inline-flex items-center bg-primary/10 text-primary text-[10px] font-bold px-3 py-1 rounded-full w-fit mb-3">
              FAST RESULTS
            </span>
            <h3 className="text-xl font-bold text-foreground leading-snug">
              Book Full Body<br />Checkup at Home
            </h3>
            <p className="text-muted-foreground text-sm mt-2">60+ Vital parameters included.</p>
            <Link
              to="/products"
              className="mt-4 inline-flex items-center bg-primary text-primary-foreground text-sm font-medium px-5 py-2.5 rounded-xl w-fit hover:bg-primary/90 transition-colors"
            >
              Book Now
            </Link>
          </div>

          <div className="bg-card border border-border rounded-2xl p-7 flex flex-col justify-center min-h-[200px]">
            <div className="flex items-center gap-1.5 mb-3">
              <Video className="h-4 w-4 text-destructive" />
              <span className="text-[10px] font-bold text-destructive uppercase">LIVE NOW</span>
            </div>
            <h3 className="text-xl font-bold text-foreground leading-snug">
              Consult Online<br />in 10 Minutes
            </h3>
            <p className="text-muted-foreground text-sm mt-2">
              Verified specialists across 22+ categories.
            </p>
            <p className="text-muted-foreground text-xs mt-4 font-medium">400+ Doctors Available</p>
          </div>

          <div className="bg-accent/5 border border-accent/15 rounded-2xl p-7 flex flex-col justify-center items-center text-center min-h-[200px]">
            <span className="text-5xl font-black text-accent">30%</span>
            <span className="text-xs font-bold tracking-wider uppercase text-accent mt-1">OFF VITAMINS</span>
            <p className="text-muted-foreground text-sm mt-3">Limited time curated bundle offers.</p>
            <Link
              to="/products"
              className="mt-4 inline-flex items-center bg-accent text-accent-foreground text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-accent/90 transition-colors"
            >
              Shop Deal
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-foreground">AyuCare™ Herbal Range</h4>
              <p className="text-muted-foreground text-xs mt-1">100% Organic Purity</p>
            </div>
            <Leaf className="h-8 w-8 text-accent/40" />
          </div>
          <div className="bg-card border border-border rounded-2xl p-5 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-foreground">MHC Wallet</h4>
              <p className="text-muted-foreground text-xs mt-1">Earn 10% cashback daily</p>
            </div>
            <Wallet className="h-8 w-8 text-primary/40" />
          </div>
          <div className="bg-muted/50 border border-border rounded-2xl p-5 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-accent">Care Pass</h4>
              <p className="text-muted-foreground text-xs mt-1">Free Delivery on all orders</p>
            </div>
            <Shield className="h-8 w-8 text-accent/40" />
          </div>
        </div>
      </div>
    </section>
  );
};
