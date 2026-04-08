import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import productThermometer from "@/assets/product-thermometer.jpg";
import productMasks from "@/assets/product-masks.jpg";
import productSanitizer from "@/assets/product-sanitizer.jpg";
import productStethoscope from "@/assets/product-stethoscope.jpg";

const essentials = [
  {
    id: "thermometer",
    category: "ELECTRONICS",
    name: "Pro-Grade Digital Thermometer",
    description: "Precise 1-second reading",
    price: 249,
    image: productThermometer,
  },
  {
    id: "masks",
    category: "PROTECTION",
    name: "N95 Respiratory Masks (10pk)",
    description: "BFE > 99% Certification",
    price: 450,
    image: productMasks,
  },
  {
    id: "sanitizer",
    category: "HYGIENE",
    name: "Advanced Alcohol Sanitizer",
    description: "Aloe Vera Infused 500ml",
    price: 120,
    image: productSanitizer,
  },
  {
    id: "stethoscope",
    category: "DIAGNOSTICS",
    name: "Classic Dual-Head Stethoscope",
    description: "Sensitive Acoustic Sound",
    price: 1299,
    image: productStethoscope,
  },
];

export const ClinicalEssentials = () => {
  const { addToCart } = useCart();

  const handleAdd = (item: typeof essentials[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image_url: item.image,
    });
    toast.success(`${item.name} added to cart`);
  };

  return (
    <section className="py-10 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-primary">Clinical Essentials</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Top rated medical supplies for daily health maintenance.
            </p>
          </div>
          <Link
            to="/products"
            className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {essentials.map((item) => (
            <div key={item.id} className="bg-background rounded-xl border border-border p-4 hover:shadow-lg transition-shadow group">
              <div className="aspect-square bg-muted/20 rounded-xl overflow-hidden mb-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  width={512}
                  height={512}
                />
              </div>
              <span className="text-[10px] font-bold tracking-wider text-primary uppercase">
                {item.category}
              </span>
              <h3 className="text-sm font-semibold text-foreground mt-1 line-clamp-1">
                {item.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-primary font-bold">₹{item.price.toFixed(2)}</span>
                <button
                  onClick={() => handleAdd(item)}
                  className="text-xs font-bold text-primary border border-primary rounded px-3 py-1 hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  ADD
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
