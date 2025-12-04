import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard } from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useRef } from "react";

interface ProductCarouselProps {
  title: string;
  categoryId?: string;
  limit?: number;
}

export const ProductCarousel = ({ title, categoryId, limit = 12 }: ProductCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: products, isLoading } = useQuery({
    queryKey: ["carousel-products", categoryId, limit],
    queryFn: async () => {
      let query = supabase
        .from("products")
        .select("*")
        .gt("stock_quantity", 0)
        .limit(limit);

      if (categoryId) {
        query = query.eq("category", categoryId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-72 bg-muted animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) return null;

  return (
    <div className="relative group">
      <Button
        variant="outline"
        size="icon"
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background/95 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1/2 hover:bg-background"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <div key={product.id} className="flex-none w-[200px]">
            <ProductCard
              id={product.id}
              name={product.name}
              price={product.price}
              image_url={product.image_url || undefined}
              stock_quantity={product.stock_quantity}
              manufacturer={product.manufacturer || undefined}
              discount_percent={product.discount_percent || 0}
            />
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background/95 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity translate-x-1/2 hover:bg-background"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
};
