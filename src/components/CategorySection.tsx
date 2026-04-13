import { Link } from "react-router-dom";
import { Heart, Activity, Leaf, Baby, Apple, Sparkles, PawPrint } from "lucide-react";

const categories = [
  { icon: Activity, label: "Diabetes", slug: "diabetes" },
  { icon: Heart, label: "Heart Care", slug: "heart-care" },
  { icon: Leaf, label: "Ayurveda", slug: "ayurveda" },
  { icon: Baby, label: "Baby Care", slug: "baby-care" },
  { icon: Apple, label: "Nutrition", slug: "nutrition" },
  { icon: Sparkles, label: "Personal Care", slug: "personal-care" },
  { icon: PawPrint, label: "Pets", slug: "pets" },
];

export const CategorySection = () => {
  return (
    <div className="bg-card border-b border-border/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 md:gap-4 py-3 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/products?category=${cat.slug}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all text-sm font-medium text-foreground whitespace-nowrap"
            >
              <cat.icon className="h-4 w-4" />
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
