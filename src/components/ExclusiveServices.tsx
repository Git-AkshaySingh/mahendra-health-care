import { Link } from "react-router-dom";
import { Video, Shield, Leaf, Wallet } from "lucide-react";

export const ExclusiveServices = () => {
  return (
    <section className="py-14">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground mb-8">Exclusive Services</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {/* Blue solid card */}
          <div className="bg-primary rounded-2xl p-7 flex flex-col justify-center min-h-[200px] shadow-[var(--shadow-card)]">
            <span className="inline-flex items-center bg-primary-foreground/20 text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full w-fit mb-3">
              FAST RESULTS
            </span>
            <h3 className="text-xl font-bold text-primary-foreground leading-snug">
              Book Full Body<br />Checkup at Home
            </h3>
            <p className="text-primary-foreground/80 text-sm mt-2">60+ Vital parameters included.</p>
            <Link
              to="/products"
              className="mt-4 inline-flex items-center bg-primary-foreground text-primary text-sm font-medium px-5 py-2.5 rounded-xl w-fit hover:bg-primary-foreground/90 transition-colors"
            >
              Book Now
            </Link>
          </div>

          {/* White card */}
          <div className="bg-card border border-border rounded-2xl p-7 flex flex-col justify-center min-h-[200px] shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-1.5 mb-3">
              <Video className="h-4 w-4 text-destructive" />
              <span className="text-[10px] font-bold text-destructive uppercase">LIVE NOW</span>
            </div>
            <h3 className="text-xl font-bold text-foreground leading-snug">
              Consult Online<br />in 10 Minutes
            </h3>
            <p className="text-muted-foreground text-sm mt-2">
              Verified specialists across 22+ categories ready to help.
            </p>
            <p className="text-muted-foreground text-xs mt-4 font-medium">400+ Doctors Available</p>
          </div>

          {/* Orange solid card */}
          <div className="bg-secondary rounded-2xl p-7 flex flex-col justify-center items-center text-center min-h-[200px] shadow-[var(--shadow-card)]">
            <span className="text-5xl font-black text-secondary-foreground">30%</span>
            <span className="text-xs font-bold tracking-wider uppercase text-secondary-foreground mt-1">OFF VITAMINS</span>
            <p className="text-secondary-foreground/80 text-sm mt-3">Limited time curated bundle offers.</p>
            <Link
              to="/products"
              className="mt-4 inline-flex items-center bg-secondary-foreground text-secondary text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-secondary-foreground/90 transition-colors"
            >
              Shop Deal
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-primary rounded-2xl p-5 flex items-center justify-between shadow-[var(--shadow-card)]">
            <div>
              <h4 className="font-bold text-primary-foreground">AyuCare™ Herbal Range</h4>
              <p className="text-primary-foreground/70 text-xs mt-1">100% Organic Purity</p>
            </div>
            <Leaf className="h-8 w-8 text-primary-foreground/30" />
          </div>
          <div className="bg-card border border-border rounded-2xl p-5 flex items-center justify-between shadow-[var(--shadow-card)]">
            <div>
              <h4 className="font-bold text-foreground">MHC Wallet</h4>
              <p className="text-muted-foreground text-xs mt-1">Earn 10% cashback daily</p>
            </div>
            <Wallet className="h-8 w-8 text-primary/40" />
          </div>
          <div className="bg-card border border-border rounded-2xl p-5 flex items-center justify-between shadow-[var(--shadow-card)]">
            <div>
              <h4 className="font-bold text-secondary">Care Pass</h4>
              <p className="text-muted-foreground text-xs mt-1">Free Delivery on all orders</p>
            </div>
            <Shield className="h-8 w-8 text-secondary/40" />
          </div>
        </div>
      </div>
    </section>
  );
};
