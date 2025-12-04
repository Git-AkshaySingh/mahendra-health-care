import { Truck, Shield, Clock, Percent } from "lucide-react";

const promoItems = [
  {
    icon: Percent,
    title: "Best Prices",
    description: "Up to 25% OFF",
    gradient: "from-orange-500 to-amber-500",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    description: "On orders ₹299+",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Shield,
    title: "100% Genuine",
    description: "Verified Products",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Expert Help",
    gradient: "from-purple-500 to-violet-500",
  },
];

export const PromoBanner = () => {
  return (
    <section className="py-6 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {promoItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
