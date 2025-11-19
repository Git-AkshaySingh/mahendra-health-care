import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image_url?: string;
  stock_quantity: number;
  manufacturer?: string;
}

export const ProductCard = ({ id, name, price, image_url, stock_quantity, manufacturer }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const originalPrice = price * 1.2;
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (stock_quantity > 0) {
      addToCart({ id, name, price, image_url });
      toast({
        title: "Added to cart",
        description: `${name} has been added to your cart.`,
      });
    }
  };

  return (
    <Link to={`/products/${id}`}>
      <Card className="group relative overflow-hidden border border-border hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        <div className="relative aspect-square overflow-hidden bg-muted/30">
          {discount > 0 && (
            <div className="absolute top-2 left-2 z-10 bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded">
              {discount}% OFF
            </div>
          )}
          <img
            src={image_url || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="p-3 flex flex-col flex-1">
          <h3 className="font-medium text-sm line-clamp-2 mb-1 min-h-[2.5rem]">{name}</h3>
          
          {manufacturer && (
            <p className="text-xs text-muted-foreground mb-2">{manufacturer}</p>
          )}
          
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">4.4</span>
            <span className="text-xs text-muted-foreground">(250)</span>
          </div>
          
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-foreground">₹{price.toFixed(2)}</span>
            <span className="text-sm text-muted-foreground line-through">₹{originalPrice.toFixed(2)}</span>
          </div>
          
          <Button
            onClick={handleAddToCart}
            disabled={stock_quantity === 0}
            className="w-full mt-auto"
            size="sm"
          >
            {stock_quantity > 0 ? "Add to cart" : "Out of stock"}
          </Button>
        </div>
      </Card>
    </Link>
  );
};
