import { Link } from "react-router-dom";
import { Heart, Brain, Bone, Stethoscope, Eye, Pill, Leaf, Activity } from "lucide-react";

const healthConcerns = [
  { icon: Heart, label: "Diabetes Care", color: "bg-red-100 text-red-600", slug: "diabetes" },
  { icon: Activity, label: "Heart Care", color: "bg-pink-100 text-pink-600", slug: "heart" },
  { icon: Stethoscope, label: "Stomach Care", color: "bg-orange-100 text-orange-600", slug: "stomach" },
  { icon: Bone, label: "Bone & Joint", color: "bg-amber-100 text-amber-600", slug: "bone" },
  { icon: Brain, label: "Brain Health", color: "bg-purple-100 text-purple-600", slug: "brain" },
  { icon: Eye, label: "Eye Care", color: "bg-blue-100 text-blue-600", slug: "eye" },
  { icon: Leaf, label: "Ayurveda", color: "bg-green-100 text-green-600", slug: "ayurveda" },
  { icon: Pill, label: "Pain Relief", color: "bg-teal-100 text-teal-600", slug: "pain" },
];

export const HealthConcerns = () => {
  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-semibold mb-6">Shop by Health Concerns</h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {healthConcerns.map((concern, index) => (
            <Link
              key={index}
              to={`/products?category=${concern.slug}`}
              className="flex flex-col items-center gap-2 group"
            >
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${concern.color} flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm`}>
                <concern.icon className="h-7 w-7 md:h-8 md:w-8" />
              </div>
              <span className="text-xs text-center font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {concern.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
