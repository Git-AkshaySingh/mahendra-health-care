import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image_url?: string;
  stock_quantity: number;
  manufacturer?: string;
  discount_percent?: number;
}

export const ProductCard = ({ id, name, price, image_url, stock_quantity, manufacturer, discount_percent = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const originalPrice = discount_percent > 0 ? price / (1 - discount_percent / 100) : price * 1.15;
  const discount = discount_percent > 0 ? discount_percent : Math.round(((originalPrice - price) / originalPrice) * 100);

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
      <Card className="group relative overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 h-full flex flex-col bg-card rounded-xl">
        <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-muted/20 to-muted/5">
          {discount > 0 && (
            <div className="absolute top-2 left-2 z-10 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-md shadow-sm">
              {discount}% OFF
            </div>
          )}
          <img
            src={image_url || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        
        <div className="p-4 flex flex-col flex-1 gap-2">
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-0.5 bg-green-600 text-white text-xs font-medium px-1.5 py-0.5 rounded">
              <span>4.4</span>
              <Star className="h-2.5 w-2.5 fill-current" />
            </div>
            <span className="text-xs text-muted-foreground">(250)</span>
          </div>
          
          <h3 className="font-semibold text-sm line-clamp-2 min-h-[2.5rem] text-foreground leading-tight">{name}</h3>
          
          {manufacturer && (
            <p className="text-xs text-muted-foreground truncate">{manufacturer}</p>
          )}
          
          <div className="flex items-baseline gap-2 mt-auto">
            <span className="text-lg font-bold text-foreground">₹{price.toFixed(0)}</span>
            <span className="text-sm text-muted-foreground line-through">₹{originalPrice.toFixed(0)}</span>
          </div>
          
          <Button
            onClick={handleAddToCart}
            disabled={stock_quantity === 0}
            className="w-full mt-2 gap-2"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4" />
            {stock_quantity > 0 ? "Add" : "Out of stock"}
          </Button>
        </div>
      </Card>
    </Link>
  );
};
