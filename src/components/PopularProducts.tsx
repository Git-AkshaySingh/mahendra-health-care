import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import productVitaminC from "@/assets/product-vitamin-c.jpg";
import productMultivitamin from "@/assets/product-multivitamin.jpg";
import productOmega3 from "@/assets/product-omega3.jpg";
import productCalcium from "@/assets/product-calcium.jpg";
import productProtein from "@/assets/product-protein.jpg";

const fallbackImages = [productVitaminC, productMultivitamin, productOmega3, productCalcium, productProtein];

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  discount_percent: number | null;
}

export const PopularProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState("best");

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("id, name, price, image_url, discount_percent")
        .limit(5);
      if (data) setProducts(data);
    };
    fetchProducts();
  }, []);

  const getDiscountedPrice = (price: number, discount: number | null) => {
    if (!discount) return price;
    return price - (price * discount) / 100;
  };

  const getProductImage = (imageUrl: string | null, index: number) => {
    if (imageUrl && imageUrl !== "/placeholder.svg") return imageUrl;
    return fallbackImages[index % fallbackImages.length];
  };

  const tabs = [
    { id: "best", label: "Best Sellers" },
    { id: "new", label: "New Arrivals" },
    { id: "rating", label: "Most Rating" },
  ];

  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold text-foreground">Popular Healthcare Products</h2>
          <div className="flex items-center gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product, index) => (
            <div key={product.id} className="bg-background rounded-xl p-4 border border-border hover:shadow-lg transition-shadow">
              <Link to={`/products/${product.id}`} className="block">
                <div className="relative mb-3">
                  {product.discount_percent && product.discount_percent > 0 && (
                    <span className="absolute top-0 left-0 bg-secondary text-secondary-foreground text-xs font-bold px-2 py-0.5 rounded">
                      -{product.discount_percent}%
                    </span>
                  )}
                  <div className="aspect-square bg-muted/50 rounded-lg overflow-hidden">
                    <img
                      src={getProductImage(product.image_url, index)}
                      alt={product.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                </div>
                <h3 className="text-sm font-medium line-clamp-2 min-h-[40px]">{product.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-secondary font-bold">
                    ₹{getDiscountedPrice(product.price, product.discount_percent).toFixed(0)}
                  </span>
                  {product.discount_percent && product.discount_percent > 0 && (
                    <span className="text-muted-foreground text-sm line-through">
                      ₹{product.price.toFixed(0)}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
