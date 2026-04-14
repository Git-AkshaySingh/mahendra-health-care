import { Link } from "react-router-dom";
import { ArrowRight, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import prodBodylotion from "@/assets/prod-bodylotion.jpg";
import prodHairoil from "@/assets/prod-hairoil.jpg";
import prodPetshampoo from "@/assets/prod-petshampoo.jpg";
import brandDroolsProducts from "@/assets/brand-drools-products.jpg";
import brandMbFishoil from "@/assets/brand-mb-fishoil.jpg";

const products = [
  { id: "cp1", name: "Body Lotion", category: "Beauty", price: 349, image: prodBodylotion },
  { id: "cp2", name: "Hair Oil Serum", category: "Hair Care", price: 450, image: prodHairoil },
  { id: "cp3", name: "Pet Shampoo", category: "Pet Care", price: 299, image: prodPetshampoo },
  { id: "cp4", name: "Pet Food Pack", category: "Pet Nutrition", price: 899, image: brandDroolsProducts },
  { id: "cp5", name: "Fish Oil 1000mg", category: "Supplements", price: 599, image: brandMbFishoil },
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
            <h2 className="text-2xl font-bold text-foreground">Beauty, Personal & Pet Care</h2>
            <p className="text-muted-foreground text-sm mt-1">Premium products for you and your furry friends.</p>
          </div>
          <Link to="/products" className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {products.map((item) => (
            <div key={item.id} className="bg-card rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow group">
              <div className="aspect-square bg-muted/10 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width={512}
                  height={512}
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
