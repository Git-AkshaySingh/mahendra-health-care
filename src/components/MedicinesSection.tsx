import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, ShoppingCart, ArrowRight, Pill } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface Medicine {
  id: string;
  name: string;
  price: number;
  description: string | null;
  manufacturer: string | null;
  dosage: string | null;
  usage_instructions: string | null;
  side_effects: string | null;
  category: string;
  discount_percent: number | null;
}

export const MedicinesSection = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchMedicines = async () => {
      const { data } = await supabase
        .from("products")
        .select("id, name, price, description, manufacturer, dosage, usage_instructions, side_effects, category, discount_percent")
        .ilike("category", "medicines")
        .limit(6);
      if (data) setMedicines(data);
    };
    fetchMedicines();
  }, []);

  const getDiscountedPrice = (price: number, discount: number | null) => {
    if (!discount) return price;
    return price - (price * discount) / 100;
  };

  const handleAddToCart = (medicine: Medicine) => {
    addToCart({
      id: medicine.id,
      name: medicine.name,
      price: getDiscountedPrice(medicine.price, medicine.discount_percent),
      image_url: undefined,
    });
    toast.success(`${medicine.name} added to cart`);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (medicines.length === 0) return null;

  return (
    <section className="py-8 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Pill className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Browse Medicines</h2>
          </div>
          <Link
            to="/products?category=medicines"
            className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {medicines.map((medicine) => (
            <div
              key={medicine.id}
              className="bg-background rounded-xl border border-border p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground line-clamp-2">
                    {medicine.name}
                  </h3>
                  {medicine.manufacturer && (
                    <p className="text-xs text-muted-foreground mt-1">
                      by {medicine.manufacturer}
                    </p>
                  )}
                </div>
                {medicine.discount_percent && medicine.discount_percent > 0 && (
                  <span className="bg-secondary text-secondary-foreground text-xs font-bold px-2 py-0.5 rounded ml-2">
                    -{medicine.discount_percent}%
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-primary">
                  ₹{getDiscountedPrice(medicine.price, medicine.discount_percent).toFixed(0)}
                </span>
                {medicine.discount_percent && medicine.discount_percent > 0 && (
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{medicine.price.toFixed(0)}
                  </span>
                )}
              </div>

              {/* Know More Button */}
              <button
                onClick={() => toggleExpand(medicine.id)}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-3 transition-colors"
              >
                {expandedId === medicine.id ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    <span>Show Less</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    <span>Know More</span>
                  </>
                )}
              </button>

              {/* Expanded Details */}
              {expandedId === medicine.id && (
                <div className="mb-4 p-3 bg-muted/50 rounded-lg text-sm space-y-2">
                  {medicine.description && (
                    <p className="text-muted-foreground">{medicine.description}</p>
                  )}
                  {medicine.dosage && (
                    <p>
                      <span className="font-medium text-foreground">Dosage:</span>{" "}
                      <span className="text-muted-foreground">{medicine.dosage}</span>
                    </p>
                  )}
                  {medicine.usage_instructions && (
                    <p>
                      <span className="font-medium text-foreground">Usage:</span>{" "}
                      <span className="text-muted-foreground">{medicine.usage_instructions}</span>
                    </p>
                  )}
                  {medicine.side_effects && (
                    <p>
                      <span className="font-medium text-foreground">Side Effects:</span>{" "}
                      <span className="text-muted-foreground">{medicine.side_effects}</span>
                    </p>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleAddToCart(medicine)}
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Add to Cart
                </Button>
                <Button size="sm" className="flex-1" asChild>
                  <Link to="/checkout">Buy Now</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
