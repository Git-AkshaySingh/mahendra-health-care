import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, ArrowRight, Sparkles } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
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
  category: string;
  manufacturer: string | null;
}

export const HealthBeautyProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState("best");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("id, name, price, image_url, discount_percent, category, manufacturer")
        .not("category", "ilike", "medicines")
        .limit(8);
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

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: getDiscountedPrice(product.price, product.discount_percent),
      image_url: getProductImage(product.image_url, 0),
    });
    toast.success(`${product.name} added to cart`);
  };

  const tabs = [
    { id: "best", label: "Best Sellers" },
    { id: "new", label: "New Arrivals" },
  ];

  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-secondary" />
            <h2 className="text-2xl font-bold text-foreground">Shop Health & Beauty Products</h2>
          </div>
          <div className="flex items-center gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-sm font-medium px-4 py-1.5 rounded-full transition-colors ${
                  activeTab === tab.id
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="bg-background rounded-xl p-4 border border-border hover:shadow-lg transition-shadow group"
            >
              <Link to={`/products/${product.id}`} className="block">
                <div className="relative mb-3">
                  {product.discount_percent && product.discount_percent > 0 && (
                    <span className="absolute top-2 left-2 bg-secondary text-secondary-foreground text-xs font-bold px-2 py-0.5 rounded z-10">
                      {product.discount_percent}% OFF
                    </span>
                  )}
                  <div className="aspect-square bg-muted/30 rounded-xl overflow-hidden">
                    <img
                      src={getProductImage(product.image_url, index)}
                      alt={product.name}
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <h3 className="text-sm font-medium line-clamp-2 min-h-[40px] text-foreground">
                  {product.name}
                </h3>
                {product.manufacturer && (
                  <p className="text-xs text-muted-foreground mt-0.5">{product.manufacturer}</p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-primary font-bold">
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
                  <span className="text-xs text-muted-foreground ml-1">(74)</span>
                </div>
              </Link>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-3"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link
            to="/products"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View All Products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
