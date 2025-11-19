import { Link } from "react-router-dom";
import { Pill, Heart, Activity, Leaf, Stethoscope, Package } from "lucide-react";

const categories = [
  { icon: Pill, label: "Medicines", color: "text-primary" },
  { icon: Heart, label: "Diabetes", color: "text-destructive" },
  { icon: Activity, label: "Pain Relief", color: "text-secondary" },
  { icon: Leaf, label: "Ayurveda", color: "text-accent" },
  { icon: Stethoscope, label: "Health Devices", color: "text-primary" },
  { icon: Package, label: "Personal Care", color: "text-secondary" },
];

export const CategoryIcons = () => {
  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between overflow-x-auto gap-6 pb-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              to="/products"
              className="flex flex-col items-center gap-2 min-w-[80px] group"
            >
              <div className={`w-16 h-16 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors ${category.color}`}>
                <category.icon className="h-8 w-8" />
              </div>
              <span className="text-xs text-center font-medium">{category.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
