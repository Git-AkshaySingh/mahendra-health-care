import { Link } from "react-router-dom";
import { ArrowRight, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import fp1 from "@/assets/featured-product-1.jpg";
import fp2 from "@/assets/featured-product-2.jpg";
import fp3 from "@/assets/featured-product-3.jpg";
import fp4 from "@/assets/featured-product-4.jpg";
import fp5 from "@/assets/featured-product-5.jpg";

const products = [
  { id: "fp1", name: "Vitamin C Serum", category: "Skincare", price: 549, image: fp1 },
  { id: "fp2", name: "Omega-3 Capsules", category: "Supplements", price: 720, image: fp2 },
  { id: "fp3", name: "Aloe Vera Gel", category: "Wellness", price: 199, image: fp3 },
  { id: "fp4", name: "SPF 50 Sunscreen", category: "Sun Care", price: 450, image: fp4 },
  { id: "fp5", name: "Multivitamin Tabs", category: "Daily Health", price: 380, image: fp5 },
];

export const FeaturedProducts = () => {
  const { addToCart } = useCart();

  const handleAdd = (item: typeof products[0]) => {
    addToCart({ id: item.id, name: item.name, price: item.price, image_url: item.image });
    toast.success(`${item.name} added to cart`);
  };

  return (
    <section className="py-14">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Featured Wellness Products</h2>
            <p className="text-muted-foreground text-sm mt-1">Handpicked essentials for your daily care routine.</p>
          </div>
          <Link to="/products" className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {products.map((item) => (
            <div key={item.id} className="bg-card rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow group">
              <div className="aspect-square bg-muted/30 overflow-hidden">
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
