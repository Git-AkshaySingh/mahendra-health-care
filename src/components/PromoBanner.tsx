import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const PromoBanner = () => {
  return (
    <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-card rounded-xl p-4 md:p-6 shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 text-primary font-semibold text-xs px-3 py-1 rounded-full">
              Member Benefits
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Get extra 5% savings</span> on your orders. Free shipping, same-day delivery and more.
              </p>
              <p className="text-xs text-muted-foreground">Become a member today!</p>
            </div>
          </div>
          <Button asChild variant="default" size="sm">
            <Link to="/auth">Know More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
