import { Link } from "react-router-dom";
import { Heart, Activity, Leaf, Baby, Apple, Sparkles } from "lucide-react";

const categories = [
  { icon: Activity, label: "Diabetes", slug: "diabetes", color: "text-primary" },
  { icon: Heart, label: "Heart Care", slug: "heart-care", color: "text-rose-600" },
  { icon: Leaf, label: "Ayurveda", slug: "ayurveda", color: "text-green-600" },
  { icon: Baby, label: "Baby Care", slug: "baby-care", color: "text-pink-500" },
  { icon: Apple, label: "Nutrition", slug: "nutrition", color: "text-orange-500" },
  { icon: Sparkles, label: "Personal Care", slug: "personal-care", color: "text-purple-500" },
];

export const CategorySection = () => {
  return (
    <div className="bg-muted/30 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 md:gap-6 py-3 overflow-x-auto">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/products?category=${cat.slug}`}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-background hover:shadow-sm transition-all text-sm font-medium text-foreground whitespace-nowrap"
            >
              <cat.icon className={`h-4 w-4 ${cat.color}`} />
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
