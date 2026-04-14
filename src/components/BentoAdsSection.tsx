import { Link } from "react-router-dom";
import { Stethoscope, FlaskConical, Tag, Crown } from "lucide-react";

export const BentoAdsSection = () => {
  return (
    <section className="py-14">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground mb-8">Health & Wellness Offers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 auto-rows-[160px] md:auto-rows-[180px]">
          {/* Large card - solid accent/green bg */}
          <Link
            to="/products"
            className="col-span-2 row-span-2 bg-accent rounded-2xl p-8 flex flex-col justify-end hover:shadow-[var(--shadow-elevated)] transition-shadow relative overflow-hidden group shadow-[var(--shadow-card)]"
          >
            <Stethoscope className="absolute top-6 right-6 h-20 w-20 text-accent-foreground/15 group-hover:text-accent-foreground/25 transition-colors" />
            <span className="text-[10px] font-bold tracking-wider text-accent-foreground/80 uppercase">HEALTH CHECKUPS</span>
            <h3 className="text-2xl font-bold text-accent-foreground mt-2 leading-snug">
              Complete Health<br />Packages from ₹999
            </h3>
            <p className="text-accent-foreground/70 text-sm mt-2 max-w-xs">
              60+ parameters tested. Reports in 24 hours. Home sample collection available.
            </p>
            <span className="mt-4 inline-flex items-center bg-accent-foreground text-accent text-sm font-medium px-5 py-2 rounded-xl w-fit hover:bg-accent-foreground/90 transition-colors">
              Book Now
            </span>
          </Link>

          {/* Medium card - solid primary/blue bg */}
          <Link
            to="/products"
            className="col-span-1 bg-primary rounded-2xl p-5 flex flex-col justify-between hover:shadow-[var(--shadow-elevated)] transition-shadow shadow-[var(--shadow-card)]"
          >
            <FlaskConical className="h-8 w-8 text-primary-foreground/40" />
            <div>
              <h4 className="font-bold text-primary-foreground text-sm">Lab Tests</h4>
              <p className="text-primary-foreground/70 text-xs mt-1">Starting ₹149</p>
            </div>
          </Link>

          {/* Medium card - solid secondary/orange bg */}
          <Link
            to="/products"
            className="col-span-1 bg-secondary rounded-2xl p-5 flex flex-col justify-between hover:shadow-[var(--shadow-elevated)] transition-shadow shadow-[var(--shadow-card)]"
          >
            <Tag className="h-8 w-8 text-secondary-foreground/40" />
            <div>
              <h4 className="font-bold text-secondary-foreground text-sm">Flat 30% Off</h4>
              <p className="text-secondary-foreground/70 text-xs mt-1">On first order</p>
            </div>
          </Link>

          {/* Small card - white card */}
          <Link
            to="/products"
            className="col-span-1 bg-card border border-border rounded-2xl p-5 flex flex-col justify-between hover:shadow-[var(--shadow-elevated)] transition-shadow shadow-[var(--shadow-card)]"
          >
            <Crown className="h-8 w-8 text-primary/40" />
            <div>
              <h4 className="font-bold text-foreground text-sm">MHC Premium</h4>
              <p className="text-muted-foreground text-xs mt-1">Free delivery forever</p>
            </div>
          </Link>

          {/* Small card - white card */}
          <div className="col-span-1 bg-card border border-border rounded-2xl p-5 flex flex-col justify-between shadow-[var(--shadow-card)]">
            <div className="text-3xl font-black text-secondary">15%</div>
            <div>
              <h4 className="font-bold text-foreground text-sm">Senior Citizen</h4>
              <p className="text-muted-foreground text-xs mt-1">Extra discount always</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
