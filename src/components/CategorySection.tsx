import { Link } from "react-router-dom";
import { Pill, Heart, Activity, Leaf, Sparkles, Baby, Dog } from "lucide-react";

const categories = [
  {
    icon: Pill,
    label: "Medicines",
    slug: "medicines",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: Heart,
    label: "Diabetes",
    slug: "diabetes",
    bgColor: "bg-rose-50",
    iconColor: "text-rose-600",
  },
  {
    icon: Activity,
    label: "Pain Relief",
    slug: "pain-relief",
    bgColor: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    icon: Leaf,
    label: "Ayurveda",
    slug: "ayurveda",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    icon: Sparkles,
    label: "Personal Care",
    slug: "personal-care",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    icon: Baby,
    label: "Baby Care",
    slug: "baby-care",
    bgColor: "bg-pink-50",
    iconColor: "text-pink-600",
  },
  {
    icon: Dog,
    label: "Pet Care",
    slug: "pet-care",
    bgColor: "bg-cyan-50",
    iconColor: "text-cyan-600",
  },
];

export const CategorySection = () => {
  return (
    <section className="py-6 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-3 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/products?category=${category.slug}`}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl ${category.bgColor} border border-border/50 hover:shadow-md transition-all hover:scale-105 min-w-[140px]`}
            >
              <div className={`p-2 rounded-lg bg-white shadow-sm`}>
                <category.icon className={`h-5 w-5 ${category.iconColor}`} />
              </div>
              <span className="font-medium text-foreground text-sm">{category.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
