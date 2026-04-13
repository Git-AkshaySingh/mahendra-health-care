import { Link } from "react-router-dom";
import { Stethoscope, FlaskConical, Tag, Crown } from "lucide-react";

export const BentoAdsSection = () => {
  return (
    <section className="py-14">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[160px] md:auto-rows-[180px]">
          {/* Large card - spans 2 cols and 2 rows */}
          <Link
            to="/products"
            className="col-span-2 row-span-2 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 rounded-2xl p-8 flex flex-col justify-end hover:shadow-[var(--shadow-elevated)] transition-shadow relative overflow-hidden group"
          >
            <Stethoscope className="absolute top-6 right-6 h-16 w-16 text-primary/10 group-hover:text-primary/20 transition-colors" />
            <span className="text-[10px] font-bold tracking-wider text-primary uppercase">HEALTH CHECKUPS</span>
            <h3 className="text-2xl font-bold text-foreground mt-2 leading-snug">
              Complete Health<br />Packages from ₹999
            </h3>
            <p className="text-muted-foreground text-sm mt-2 max-w-xs">
              60+ parameters tested. Reports in 24 hours. Home sample collection available.
            </p>
          </Link>

          {/* Medium card */}
          <Link
            to="/products"
            className="col-span-1 bg-accent/5 border border-accent/10 rounded-2xl p-5 flex flex-col justify-between hover:shadow-[var(--shadow-elevated)] transition-shadow"
          >
            <FlaskConical className="h-8 w-8 text-accent/50" />
            <div>
              <h4 className="font-bold text-foreground text-sm">Lab Tests</h4>
              <p className="text-muted-foreground text-xs mt-1">Starting ₹149</p>
            </div>
          </Link>

          {/* Medium card */}
          <Link
            to="/products"
            className="col-span-1 bg-secondary/5 border border-secondary/10 rounded-2xl p-5 flex flex-col justify-between hover:shadow-[var(--shadow-elevated)] transition-shadow"
          >
            <Tag className="h-8 w-8 text-secondary/50" />
            <div>
              <h4 className="font-bold text-foreground text-sm">Flat 30% Off</h4>
              <p className="text-muted-foreground text-xs mt-1">On first order</p>
            </div>
          </Link>

          {/* Small card */}
          <Link
            to="/products"
            className="col-span-1 bg-primary/5 border border-primary/10 rounded-2xl p-5 flex flex-col justify-between hover:shadow-[var(--shadow-elevated)] transition-shadow"
          >
            <Crown className="h-8 w-8 text-primary/50" />
            <div>
              <h4 className="font-bold text-foreground text-sm">MHC Premium</h4>
              <p className="text-muted-foreground text-xs mt-1">Free delivery forever</p>
            </div>
          </Link>

          {/* Small card */}
          <div className="col-span-1 bg-muted/60 border border-border rounded-2xl p-5 flex flex-col justify-between">
            <div className="text-3xl font-black text-accent">15%</div>
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
