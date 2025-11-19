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
        .from("medicines")
        .select("*")
        .gt("stock_quantity", 0)
        .limit(limit);

      if (categoryId) {
        query = query.eq("category_id", categoryId);
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
      <section className="py-6">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) return null;

  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <div key={product.id} className="flex-none w-[180px]">
            <ProductCard
              id={product.id}
              name={product.name}
              price={product.price}
              image_url={product.image_url || undefined}
              stock_quantity={product.stock_quantity}
              manufacturer={product.manufacturer || undefined}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
