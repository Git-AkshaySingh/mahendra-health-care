import { Link } from "react-router-dom";
import { ArrowRight, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import cp1 from "@/assets/care-product-1.jpg";
import cp2 from "@/assets/care-product-2.jpg";
import cp3 from "@/assets/care-product-3.jpg";
import cp4 from "@/assets/care-product-4.jpg";
import cp5 from "@/assets/care-product-5.jpg";

const products = [
  { id: "cp1", name: "Digital Thermometer", category: "Diagnostics", price: 249, image: cp1 },
  { id: "cp2", name: "N95 Masks (10pk)", category: "Protection", price: 450, image: cp2 },
  { id: "cp3", name: "Hand Sanitizer 500ml", category: "Hygiene", price: 120, image: cp3 },
  { id: "cp4", name: "BP Monitor", category: "Devices", price: 1899, image: cp4 },
  { id: "cp5", name: "First Aid Kit", category: "Essentials", price: 599, image: cp5 },
];

export const EssentialCarePicks = () => {
  const { addToCart } = useCart();

  const handleAdd = (item: typeof products[0]) => {
    addToCart({ id: item.id, name: item.name, price: item.price, image_url: item.image });
    toast.success(`${item.name} added to cart`);
  };

  return (
    <section className="py-14 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Essential Care Picks</h2>
            <p className="text-muted-foreground text-sm mt-1">Medical devices and daily care must-haves.</p>
          </div>
          <Link to="/products" className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {products.map((item) => (
            <div key={item.id} className="bg-card rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow group">
              <div className="aspect-square bg-muted/20 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">{item.category}</span>
                <h3 className="text-sm font-semibold text-foreground mt-1 line-clamp-1">{item.name}</h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-base font-bold text-foreground">₹{item.price}</span>
                  <button
                    onClick={() => handleAdd(item)}
                    className="h-8 w-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
