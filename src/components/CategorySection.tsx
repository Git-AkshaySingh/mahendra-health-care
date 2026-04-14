import { Link } from "react-router-dom";
import { Heart, Activity, Leaf, Baby, Apple, Sparkles, PawPrint } from "lucide-react";

const categories = [
  { icon: Activity, label: "Diabetes", slug: "diabetes", color: "bg-primary/10 text-primary hover:bg-primary/20" },
  { icon: Heart, label: "Heart Care", slug: "heart-care", color: "bg-destructive/10 text-destructive hover:bg-destructive/20" },
  { icon: Leaf, label: "Ayurveda", slug: "ayurveda", color: "bg-accent/10 text-accent hover:bg-accent/20" },
  { icon: Baby, label: "Baby Care", slug: "baby-care", color: "bg-secondary/10 text-secondary hover:bg-secondary/20" },
  { icon: Apple, label: "Nutrition", slug: "nutrition", color: "bg-accent/10 text-accent hover:bg-accent/20" },
  { icon: Sparkles, label: "Personal Care", slug: "personal-care", color: "bg-primary/10 text-primary hover:bg-primary/20" },
  { icon: PawPrint, label: "Pets", slug: "pets", color: "bg-secondary/10 text-secondary hover:bg-secondary/20" },
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
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-medium whitespace-nowrap ${cat.color}`}
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
