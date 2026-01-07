import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Search, ChevronDown, ChevronUp, ShoppingCart, Zap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [expandedProducts, setExpandedProducts] = useState<Set<string>>(new Set());
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*");
      if (error) throw error;
      return data;
    },
  });

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", selectedCategories, searchTerm, priceRange],
    queryFn: async () => {
      let query = supabase.from("products").select("*");

      if (selectedCategories.length > 0) {
        query = query.in("category", selectedCategories);
      }

      if (searchTerm) {
        query = query.ilike("name", `%${searchTerm}%`);
      }

      query = query.gte("price", priceRange[0]).lte("price", priceRange[1]);

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const toggleCategory = (categoryName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const toggleProductExpand = (productId: string) => {
    setExpandedProducts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const handleAddToCart = (product: any) => {
    if (product.stock_quantity > 0) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
      });
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    }
  };

  const handleBuyNow = (product: any) => {
    if (product.stock_quantity > 0) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
      });
      navigate("/checkout");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Products</h1>
            <p className="text-muted-foreground">Browse and search our complete medicine catalog</p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6 flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for medicines, health products..."
                className="pl-12 h-12 text-base border-2 border-border bg-muted/30 focus:border-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button type="submit" size="lg" className="h-12 px-8">
              Search
            </Button>
          </form>

          <div className="flex gap-6">
            {/* Sidebar Filters */}
            <aside className="w-64 flex-shrink-0 hidden lg:block">
              <div className="sticky top-24 space-y-6 p-4 border border-border rounded-xl bg-card">
                <div>
                  <h3 className="font-semibold text-lg mb-4 text-foreground">Filters</h3>
                </div>

                {/* Category Filter */}
                <div>
                  <h4 className="font-medium mb-3 text-foreground">Categories</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {categories?.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={category.id}
                          checked={selectedCategories.includes(category.name)}
                          onCheckedChange={() => toggleCategory(category.name)}
                        />
                        <Label
                          htmlFor={category.id}
                          className="text-sm text-muted-foreground cursor-pointer hover:text-foreground"
                        >
                          {category.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h4 className="font-medium mb-3 text-foreground">Price Range</h4>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                      max={5000}
                      min={0}
                      step={50}
                      className="mb-3"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange([0, 5000]);
                    setSearchTerm("");
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            </aside>

            {/* Main Product Listing */}
            <div className="flex-1">
              {/* Results Count */}
              <div className="mb-4 text-sm text-muted-foreground">
                {products?.length || 0} products found
              </div>

              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-32 bg-muted animate-pulse rounded-xl" />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {products?.map((product) => {
                    const isExpanded = expandedProducts.has(product.id);
                    const discountedPrice = product.discount_percent
                      ? product.price * (1 - product.discount_percent / 100)
                      : product.price;

                    return (
                      <div
                        key={product.id}
                        className="border border-border rounded-xl bg-card p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row md:items-start gap-4">
                          {/* Product Info */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-lg text-foreground">
                                  {product.name}
                                </h3>
                                {product.manufacturer && (
                                  <p className="text-sm text-muted-foreground">
                                    by {product.manufacturer}
                                  </p>
                                )}
                              </div>
                              <div className="text-right">
                                <div className="flex items-center gap-2">
                                  {product.discount_percent > 0 && (
                                    <span className="text-sm text-muted-foreground line-through">
                                      ₹{product.price.toFixed(0)}
                                    </span>
                                  )}
                                  <span className="text-xl font-bold text-primary">
                                    ₹{discountedPrice.toFixed(0)}
                                  </span>
                                </div>
                                {product.discount_percent > 0 && (
                                  <span className="text-xs text-green-600 font-medium">
                                    {product.discount_percent}% OFF
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Brief Description */}
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {product.description || "Quality healthcare product for your needs."}
                            </p>

                            {/* Know More Collapsible */}
                            <Collapsible
                              open={isExpanded}
                              onOpenChange={() => toggleProductExpand(product.id)}
                            >
                              <CollapsibleTrigger className="flex items-center gap-1 text-sm text-primary hover:underline font-medium">
                                Know More
                                {isExpanded ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </CollapsibleTrigger>
                              <CollapsibleContent className="mt-3 pt-3 border-t border-border">
                                <div className="grid gap-2 text-sm">
                                  {product.description && (
                                    <div>
                                      <span className="font-medium text-foreground">Description: </span>
                                      <span className="text-muted-foreground">{product.description}</span>
                                    </div>
                                  )}
                                  {product.dosage && (
                                    <div>
                                      <span className="font-medium text-foreground">Dosage: </span>
                                      <span className="text-muted-foreground">{product.dosage}</span>
                                    </div>
                                  )}
                                  {product.usage_instructions && (
                                    <div>
                                      <span className="font-medium text-foreground">Usage Instructions: </span>
                                      <span className="text-muted-foreground">{product.usage_instructions}</span>
                                    </div>
                                  )}
                                  {product.side_effects && (
                                    <div>
                                      <span className="font-medium text-foreground">Side Effects: </span>
                                      <span className="text-muted-foreground">{product.side_effects}</span>
                                    </div>
                                  )}
                                  <div>
                                    <span className="font-medium text-foreground">Category: </span>
                                    <span className="text-muted-foreground">{product.category}</span>
                                  </div>
                                  <div>
                                    <span className="font-medium text-foreground">Stock: </span>
                                    <span className={product.stock_quantity > 0 ? "text-green-600" : "text-red-600"}>
                                      {product.stock_quantity > 0 ? `${product.stock_quantity} available` : "Out of stock"}
                                    </span>
                                  </div>
                                </div>
                              </CollapsibleContent>
                            </Collapsible>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex md:flex-col gap-2 md:w-32">
                            <Button
                              variant="outline"
                              className="flex-1 gap-2"
                              onClick={() => handleAddToCart(product)}
                              disabled={product.stock_quantity === 0}
                            >
                              <ShoppingCart className="h-4 w-4" />
                              Add to Cart
                            </Button>
                            <Button
                              className="flex-1 gap-2"
                              onClick={() => handleBuyNow(product)}
                              disabled={product.stock_quantity === 0}
                            >
                              <Zap className="h-4 w-4" />
                              Buy
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {!isLoading && products?.length === 0 && (
                <div className="py-12 text-center border border-border rounded-xl bg-card">
                  <p className="text-muted-foreground text-lg">No products found</p>
                  <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
