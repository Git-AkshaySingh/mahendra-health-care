import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ProductCarousel } from "@/components/ProductCarousel";
import { Separator } from "@/components/ui/separator";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  const shipping = totalPrice > 500 ? 0 : 40;
  const discount = totalPrice * 0.05; // 5% discount
  const finalTotal = totalPrice - discount + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Add some medicines to get started!</p>
          <Button asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">{items.length} item{items.length > 1 ? 's' : ''} added</h1>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cart Items */}
              <Card className="p-4">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0">
                      <img
                        src={item.image_url || "/placeholder.svg"}
                        alt={item.name}
                        className="w-20 h-20 object-contain rounded"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">Bottle of 100 ml</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-bold">₹{(item.price * item.quantity).toFixed(2)}</span>
                            <span className="text-sm text-muted-foreground line-through">
                              ₹{((item.price * 1.2) * item.quantity).toFixed(2)}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Product Carousels */}
              <ProductCarousel title="Centrum top deals" limit={8} />
              <ProductCarousel title="Last minute buys" limit={8} />
            </div>

            {/* Right Column - Summary */}
            <div className="space-y-4">
              {/* Membership Offer */}
              <Card className="p-4 bg-accent/5 border-accent">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-sm mb-1">Care Plan</h3>
                    <p className="text-xs text-muted-foreground">
                      You can save extra ₹{discount.toFixed(2)} on this order
                    </p>
                  </div>
                </div>
                <Button variant="secondary" className="w-full" size="sm">
                  Add membership
                </Button>
              </Card>

              {/* Bill Summary */}
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Bill summary</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Item total (MRP)</span>
                    <span>₹{(totalPrice * 1.2).toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-accent">
                    <span>Total discount</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-semibold text-base">
                    <span>To be paid</span>
                    <span>₹{finalTotal.toFixed(2)}</span>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    {shipping === 0 ? "Free delivery" : `Shipping: ₹${shipping}`}
                  </p>
                </div>

                <Button 
                  className="w-full mt-6" 
                  size="lg"
                  onClick={() => navigate("/checkout")}
                >
                  Continue
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
