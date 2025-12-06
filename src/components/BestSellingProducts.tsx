import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import productVitaminC from "@/assets/product-vitamin-c.jpg";
import productMultivitamin from "@/assets/product-multivitamin.jpg";
import productOmega3 from "@/assets/product-omega3.jpg";
import productCalcium from "@/assets/product-calcium.jpg";
import productProtein from "@/assets/product-protein.jpg";

const fallbackImages = [productVitaminC, productMultivitamin, productOmega3, productCalcium, productProtein];

interface Product {
  id: string;
  name: string;
  image_url: string | null;
  discount_percent: number | null;
}

export const BestSellingProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("id, name, image_url, discount_percent")
        .limit(5);
      if (data) setProducts(data);
    };
    fetchProducts();
  }, []);

  const getProductImage = (imageUrl: string | null, index: number) => {
    if (imageUrl && imageUrl !== "/placeholder.svg") return imageUrl;
    return fallbackImages[index % fallbackImages.length];
  };

  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-8">
          {/* Title */}
          <div className="flex-shrink-0">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">MUST HAVE</span>
            <h2 className="text-xl font-bold text-foreground">
              Best Selling<br />Products
            </h2>
          </div>

          {/* Products */}
          <div className="flex items-center gap-4 overflow-x-auto pb-2 flex-1">
            {products.map((product, index) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="relative flex-shrink-0 group"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-muted/50 border border-border overflow-hidden p-2 transition-all group-hover:shadow-lg group-hover:border-primary/30">
                  <img
                    src={getProductImage(product.image_url, index)}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                {product.discount_percent && product.discount_percent > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs font-bold px-2 py-0.5 rounded">
                    -{product.discount_percent}%
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
