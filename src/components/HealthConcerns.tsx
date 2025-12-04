import { Link } from "react-router-dom";
import { Heart, Brain, Bone, Stethoscope, Eye, Pill, Leaf, Activity } from "lucide-react";

const healthConcerns = [
  { icon: Heart, label: "Diabetes Care", color: "from-red-500 to-rose-400", bgColor: "bg-red-50 dark:bg-red-950/30", slug: "diabetes" },
  { icon: Activity, label: "Heart Care", color: "from-pink-500 to-rose-400", bgColor: "bg-pink-50 dark:bg-pink-950/30", slug: "heart" },
  { icon: Stethoscope, label: "Stomach Care", color: "from-orange-500 to-amber-400", bgColor: "bg-orange-50 dark:bg-orange-950/30", slug: "stomach" },
  { icon: Bone, label: "Bone & Joint", color: "from-amber-500 to-yellow-400", bgColor: "bg-amber-50 dark:bg-amber-950/30", slug: "bone" },
  { icon: Brain, label: "Brain Health", color: "from-purple-500 to-violet-400", bgColor: "bg-purple-50 dark:bg-purple-950/30", slug: "brain" },
  { icon: Eye, label: "Eye Care", color: "from-blue-500 to-cyan-400", bgColor: "bg-blue-50 dark:bg-blue-950/30", slug: "eye" },
  { icon: Leaf, label: "Ayurveda", color: "from-green-500 to-emerald-400", bgColor: "bg-green-50 dark:bg-green-950/30", slug: "ayurveda" },
  { icon: Pill, label: "Pain Relief", color: "from-teal-500 to-cyan-400", bgColor: "bg-teal-50 dark:bg-teal-950/30", slug: "pain" },
];

export const HealthConcerns = () => {
  return (
    <section className="py-10 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">Shop by Health Concerns</h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4 md:gap-6">
          {healthConcerns.map((concern, index) => (
            <Link
              key={index}
              to={`/products?category=${concern.slug}`}
              className="flex flex-col items-center gap-3 group"
            >
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl ${concern.bgColor} flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-lg`}>
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${concern.color} flex items-center justify-center`}>
                  <concern.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
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
