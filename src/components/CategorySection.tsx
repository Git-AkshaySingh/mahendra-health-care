import { Link } from "react-router-dom";
import { Heart, Activity, Leaf, Baby, Apple, Sparkles, PawPrint } from "lucide-react";

const categories = [
  { icon: Activity, label: "Diabetes", slug: "diabetes", iconColor: "text-primary" },
  { icon: Heart, label: "Heart Care", slug: "heart-care", iconColor: "text-destructive" },
  { icon: Leaf, label: "Ayurveda", slug: "ayurveda", iconColor: "text-accent" },
  { icon: Baby, label: "Baby Care", slug: "baby-care", iconColor: "text-secondary" },
  { icon: Apple, label: "Nutrition", slug: "nutrition", iconColor: "text-accent" },
  { icon: Sparkles, label: "Personal Care", slug: "personal-care", iconColor: "text-primary" },
  { icon: PawPrint, label: "Pets", slug: "pets", iconColor: "text-secondary" },
];

export const CategorySection = () => {
  return (
    <div className="bg-card border-b border-border/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-6 md:gap-8 py-3 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/products?category=${cat.slug}`}
              className="flex items-center gap-2 py-2 transition-all text-sm font-medium text-foreground hover:text-primary whitespace-nowrap"
            >
              <cat.icon className={`h-4 w-4 ${cat.iconColor}`} />
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
