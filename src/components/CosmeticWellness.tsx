import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import productSerum from "@/assets/product-serum.jpg";
import productSunscreen from "@/assets/product-sunscreen.jpg";
import productSupplement from "@/assets/product-supplement.jpg";
import productFacewash from "@/assets/product-facewash.jpg";

const products = [
  {
    id: "serum",
    category: "SKINCARE",
    name: "Vitamin C Radiance Serum",
    description: "Dermatologically Tested",
    price: 899,
    image: productSerum,
  },
  {
    id: "sunscreen",
    category: "SUN CARE",
    name: "Aqua-Gel Sunscreen SPF 50",
    description: "Non-greasy broad spectrum",
    price: 550,
    image: productSunscreen,
  },
  {
    id: "supplement",
    category: "SUPPLEMENTS",
    name: "Multivitamin for Daily Energy",
    description: "60 Vegetarian Capsules",
    price: 720,
    image: productSupplement,
  },
  {
    id: "facewash",
    category: "CLEANSING",
    name: "Deep Cleanse Face Wash",
    description: "Tea Tree & Salicylic Acid",
    price: 345,
    image: productFacewash,
  },
];

export const CosmeticWellness = () => {
  const { addToCart } = useCart();

  const handleAdd = (item: typeof products[0]) => {
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
            <h2 className="text-2xl font-bold text-primary">Cosmetic & Wellness</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Curated premium skincare and dietary supplements.
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
          {products.map((item) => (
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
