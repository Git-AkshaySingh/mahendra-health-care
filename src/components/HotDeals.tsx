import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  discount_percent: number | null;
}

const CountdownTimer = () => {
  const [time, setTime] = useState({ days: 139, hours: 0, mins: 43, secs: 53 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { days, hours, mins, secs } = prev;
        secs--;
        if (secs < 0) {
          secs = 59;
          mins--;
        }
        if (mins < 0) {
          mins = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        return { days, hours, mins, secs };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-1 text-xs mt-2">
      <div className="bg-secondary/10 text-secondary px-1.5 py-0.5 rounded">
        <span className="font-bold">{time.days}</span>
        <span className="text-[10px] ml-0.5">days</span>
      </div>
      <span className="text-muted-foreground">:</span>
      <div className="bg-muted px-1.5 py-0.5 rounded">
        <span className="font-bold">{time.hours}</span>
        <span className="text-[10px] ml-0.5">hrs</span>
      </div>
      <span className="text-muted-foreground">:</span>
      <div className="bg-muted px-1.5 py-0.5 rounded">
        <span className="font-bold">{time.mins}</span>
        <span className="text-[10px] ml-0.5">mins</span>
      </div>
      <span className="text-muted-foreground">:</span>
      <div className="bg-muted px-1.5 py-0.5 rounded">
        <span className="font-bold">{time.secs}</span>
        <span className="text-[10px] ml-0.5">secs</span>
      </div>
    </div>
  );
};

export const HotDeals = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("id, name, price, image_url, discount_percent")
        .gt("discount_percent", 0)
        .limit(5);
      if (data) setProducts(data);
    };
    fetchProducts();
  }, []);

  const getDiscountedPrice = (price: number, discount: number | null) => {
    if (!discount) return price;
    return price - (price * discount) / 100;
  };

  return (
    <section className="py-8 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-1 h-8 bg-secondary rounded-full" />
            <h2 className="text-2xl font-bold text-foreground">Today's Hot Deals</h2>
            <span className="text-sm text-secondary font-medium">Hot! Voucher Deal Up To 50%++</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product) => (
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
                      src={product.image_url || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                </div>
                <CountdownTimer />
                <h3 className="text-sm font-medium mt-2 line-clamp-2 min-h-[40px]">{product.name}</h3>
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