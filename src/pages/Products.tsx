import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ChevronDown, ChevronUp, ShoppingCart, Zap, Plus, Minus, Filter, X } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useMemo, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

const PAGE_SIZE = 20;

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [selectedForms, setSelectedForms] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [expandedProducts, setExpandedProducts] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("name_asc");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter section open states
  const [openFilters, setOpenFilters] = useState<Record<string, boolean>>({
    categories: true,
    brands: false,
    form: false,
    price: true,
  });

  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Debounce search
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
    clearTimeout((window as any).__searchTimeout);
    (window as any).__searchTimeout = setTimeout(() => {
      setDebouncedSearch(value);
    }, 400);
  };

  // Fetch filter options
  const { data: categories } = useQuery({
    queryKey: ["filter-categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("category").order("category");
      if (error) throw error;
      const unique = [...new Set(data.map((d) => d.category))].filter(Boolean);
      return unique;
    },
  });

  const { data: manufacturers } = useQuery({
    queryKey: ["filter-manufacturers"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("manufacturer").not("manufacturer", "is", null).order("manufacturer");
      if (error) throw error;
      const unique = [...new Set(data.map((d) => d.manufacturer))].filter((m) => m && m !== "-BLANK-" && m !== ".DO NOT SELECT");
      return unique as string[];
    },
  });

  const { data: forms } = useQuery({
    queryKey: ["filter-forms"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("form").not("form", "is", null).order("form");
      if (error) throw error;
      const unique = [...new Set(data.map((d) => d.form))].filter(Boolean);
      return unique as string[];
    },
  });

  // Fetch products with server-side pagination
  const { data: productsData, isLoading } = useQuery({
    queryKey: ["products-paginated", debouncedSearch, selectedCategories, selectedManufacturers, selectedForms, priceRange, currentPage, sortBy],
    queryFn: async () => {
      const from = (currentPage - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let query = supabase.from("products").select("*", { count: "exact" });

      if (selectedCategories.length > 0) {
        query = query.in("category", selectedCategories);
      }
      if (selectedManufacturers.length > 0) {
        query = query.in("manufacturer", selectedManufacturers);
      }
      if (selectedForms.length > 0) {
        query = query.in("form", selectedForms);
      }
      if (debouncedSearch) {
        // Search primarily by product name for most relevant results
        query = query.ilike("name", `%${debouncedSearch}%`);
      }
      query = query.gte("price", priceRange[0]).lte("price", priceRange[1]);

      // Sort - default A-Z by name
      if (sortBy === "price_low") query = query.order("price", { ascending: true });
      else if (sortBy === "price_high") query = query.order("price", { ascending: false });
      else if (sortBy === "discount") query = query.order("discount_percent", { ascending: false });
      else query = query.order("name", { ascending: true });

      query = query.range(from, to);

      const { data, error, count } = await query;
      if (error) throw error;
      return { products: data, totalCount: count || 0 };
    },
  });

  const totalPages = Math.ceil((productsData?.totalCount || 0) / PAGE_SIZE);
  const products = productsData?.products || [];

  const toggleFilter = (section: string) => {
    setOpenFilters((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) => prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]);
    setCurrentPage(1);
  };

  const toggleManufacturer = (m: string) => {
    setSelectedManufacturers((prev) => prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]);
    setCurrentPage(1);
  };

  const toggleForm = (f: string) => {
    setSelectedForms((prev) => prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]);
    setCurrentPage(1);
  };

  const toggleProductExpand = (productId: string) => {
    setExpandedProducts((prev) => {
      const newSet = new Set(prev);
      newSet.has(productId) ? newSet.delete(productId) : newSet.add(productId);
      return newSet;
    });
  };

  const handleAddToCart = (product: any) => {
    if (product.stock_quantity > 0) {
      addToCart({ id: product.id, name: product.name, price: product.price, image_url: product.image_url });
      toast({ title: "Added to cart", description: `${product.name} added.` });
    }
  };

  const handleBuyNow = (product: any) => {
    if (product.stock_quantity > 0) {
      addToCart({ id: product.id, name: product.name, price: product.price, image_url: product.image_url });
      navigate("/checkout");
    }
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedManufacturers([]);
    setSelectedForms([]);
    setPriceRange([0, 5000]);
    setSearchTerm("");
    setDebouncedSearch("");
    setCurrentPage(1);
  };

  const activeFilterCount = selectedCategories.length + selectedManufacturers.length + selectedForms.length + (priceRange[0] > 0 || priceRange[1] < 5000 ? 1 : 0);

  // Manufacturer search within filter
  const [brandSearch, setBrandSearch] = useState("");
  const filteredManufacturers = useMemo(() => {
    if (!manufacturers) return [];
    if (!brandSearch) return manufacturers.slice(0, 20);
    return manufacturers.filter((m) => m.toLowerCase().includes(brandSearch.toLowerCase())).slice(0, 20);
  }, [manufacturers, brandSearch]);

  // Pagination range
  const paginationRange = useMemo(() => {
    const range: (number | "ellipsis")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) range.push(i);
    } else {
      range.push(1);
      if (currentPage > 3) range.push("ellipsis");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) range.push(i);
      if (currentPage < totalPages - 2) range.push("ellipsis");
      range.push(totalPages);
    }
    return range;
  }, [currentPage, totalPages]);

  const FilterSidebar = () => (
    <div className="space-y-1">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-base text-foreground">Filter By</h3>
        {activeFilterCount > 0 && (
          <button onClick={clearAllFilters} className="text-xs text-primary hover:underline">
            Clear All
          </button>
        )}
      </div>

      {/* Categories */}
      <FilterSection title="Categories" isOpen={openFilters.categories} onToggle={() => toggleFilter("categories")}>
        <div className="space-y-1.5 max-h-48 overflow-y-auto">
          {categories?.map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground">
              <Checkbox checked={selectedCategories.includes(cat)} onCheckedChange={() => toggleCategory(cat)} className="h-3.5 w-3.5" />
              {cat}
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Brands / Manufacturer */}
      <FilterSection title="Brands" isOpen={openFilters.brands} onToggle={() => toggleFilter("brands")}>
        <Input
          placeholder="Search brand..."
          value={brandSearch}
          onChange={(e) => setBrandSearch(e.target.value)}
          className="h-8 text-xs mb-2"
        />
        <div className="space-y-1.5 max-h-48 overflow-y-auto">
          {filteredManufacturers.map((m) => (
            <label key={m} className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground">
              <Checkbox checked={selectedManufacturers.includes(m)} onCheckedChange={() => toggleManufacturer(m)} className="h-3.5 w-3.5" />
              <span className="truncate">{m}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Product Form */}
      <FilterSection title="Product Form" isOpen={openFilters.form} onToggle={() => toggleFilter("form")}>
        <div className="space-y-1.5">
          {forms?.map((f) => (
            <label key={f} className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground">
              <Checkbox checked={selectedForms.includes(f)} onCheckedChange={() => toggleForm(f)} className="h-3.5 w-3.5" />
              {f}
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range" isOpen={openFilters.price} onToggle={() => toggleFilter("price")}>
        <div className="px-1">
          <Slider
            value={priceRange}
            onValueChange={(v) => { setPriceRange(v as [number, number]); setCurrentPage(1); }}
            max={5000}
            min={0}
            step={50}
            className="mb-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>
      </FilterSection>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-4">
        <div className="container mx-auto px-4">
          {/* Breadcrumb + Header */}
          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-1">Home &gt; Products</p>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  All Products
                  <span className="text-sm font-normal text-muted-foreground ml-2">
                    Total Items ({productsData?.totalCount || 0})
                  </span>
                </h1>
              </div>
              <div className="flex items-center gap-3">
                {/* Mobile filter toggle */}
                <Button variant="outline" size="sm" className="lg:hidden gap-1" onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}>
                  <Filter className="h-4 w-4" />
                  Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                </Button>
                <Select value={sortBy} onValueChange={(v) => { setSortBy(v); setCurrentPage(1); }}>
                  <SelectTrigger className="w-[160px] h-9 text-sm">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price_low">Price: Low to High</SelectItem>
                    <SelectItem value="price_high">Price: High to Low</SelectItem>
                    <SelectItem value="discount">Discount</SelectItem>
                    <SelectItem value="name_asc">Name: A to Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search medicines, products, brands..."
                className="pl-10 h-10 text-sm border border-border"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </div>

          {/* Active filters chips */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCategories.map((c) => (
                <span key={c} className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  {c} <X className="h-3 w-3 cursor-pointer" onClick={() => toggleCategory(c)} />
                </span>
              ))}
              {selectedManufacturers.map((m) => (
                <span key={m} className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  {m} <X className="h-3 w-3 cursor-pointer" onClick={() => toggleManufacturer(m)} />
                </span>
              ))}
              {selectedForms.map((f) => (
                <span key={f} className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  {f} <X className="h-3 w-3 cursor-pointer" onClick={() => toggleForm(f)} />
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-6">
            {/* Desktop Sidebar */}
            <aside className="w-56 flex-shrink-0 hidden lg:block">
              <div className="sticky top-20 border border-border rounded-lg bg-card p-4">
                <FilterSidebar />
              </div>
            </aside>

            {/* Mobile Filters */}
            {mobileFiltersOpen && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
                <div className="absolute left-0 top-0 bottom-0 w-72 bg-card p-4 overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold">Filters</h3>
                    <Button variant="ghost" size="icon" onClick={() => setMobileFiltersOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <FilterSidebar />
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="flex-1 min-w-0">
              {isLoading ? (
                <div className="space-y-3">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-28 bg-muted animate-pulse rounded-xl" />
                  ))}
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {products.map((product) => {
                      const isExpanded = expandedProducts.has(product.id);
                      const discountedPrice = product.discount_percent
                        ? product.price * (1 - product.discount_percent / 100)
                        : product.price;

                      return (
                        <div key={product.id} className="border border-border rounded-xl bg-card p-4 hover:shadow-md transition-shadow">
                          <div className="flex flex-col md:flex-row md:items-start gap-4">
                            {/* Product Info */}
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="font-semibold text-base text-foreground">{product.name}</h3>
                                  {product.manufacturer && (
                                    <p className="text-xs text-muted-foreground">by {product.manufacturer}</p>
                                  )}
                                  {product.salt && (
                                    <p className="text-xs text-muted-foreground mt-0.5">Salt: {product.salt}</p>
                                  )}
                                </div>
                                <div className="text-right flex-shrink-0 ml-4">
                                  <div className="flex items-center gap-2">
                                    {product.discount_percent > 0 && (
                                      <span className="text-sm text-muted-foreground line-through">₹{product.price.toFixed(0)}</span>
                                    )}
                                    <span className="text-xl font-bold text-primary">₹{discountedPrice.toFixed(0)}</span>
                                  </div>
                                  {product.discount_percent > 0 && (
                                    <span className="text-xs font-medium text-green-600">{product.discount_percent}% OFF</span>
                                  )}
                                </div>
                              </div>

                              <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                                {product.description || (product.form ? `${product.form}${product.pack_size ? ` · Pack of ${product.pack_size}` : ""}` : "Quality healthcare product")}
                              </p>

                              {/* Know More Collapsible */}
                              <Collapsible open={isExpanded} onOpenChange={() => toggleProductExpand(product.id)}>
                                <CollapsibleTrigger className="flex items-center gap-1 text-sm text-primary hover:underline font-medium">
                                  Know More {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                </CollapsibleTrigger>
                                <CollapsibleContent className="mt-3 pt-3 border-t border-border">
                                  <div className="grid gap-1.5 text-sm">
                                    {product.salt && <div><span className="font-medium text-foreground">Salt/Composition:</span> <span className="text-muted-foreground">{product.salt}</span></div>}
                                    {product.form && <div><span className="font-medium text-foreground">Form:</span> <span className="text-muted-foreground">{product.form}</span></div>}
                                    {product.pack_size && <div><span className="font-medium text-foreground">Pack Size:</span> <span className="text-muted-foreground">{product.pack_size} {product.pack_type || "units"}</span></div>}
                                    {product.description && <div><span className="font-medium text-foreground">Description:</span> <span className="text-muted-foreground">{product.description}</span></div>}
                                    {product.dosage && <div><span className="font-medium text-foreground">Dosage:</span> <span className="text-muted-foreground">{product.dosage}</span></div>}
                                    {product.usage_instructions && <div><span className="font-medium text-foreground">Usage:</span> <span className="text-muted-foreground">{product.usage_instructions}</span></div>}
                                    {product.side_effects && <div><span className="font-medium text-foreground">Side Effects:</span> <span className="text-muted-foreground">{product.side_effects}</span></div>}
                                    <div><span className="font-medium text-foreground">Category:</span> <span className="text-muted-foreground">{product.category}</span></div>
                                    <div>
                                      <span className="font-medium text-foreground">Stock:</span>{" "}
                                      <span className={product.stock_quantity > 0 ? "text-green-600" : "text-destructive"}>
                                        {product.stock_quantity > 0 ? `${product.stock_quantity} available` : "Out of Stock"}
                                      </span>
                                    </div>
                                  </div>
                                </CollapsibleContent>
                              </Collapsible>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex md:flex-col gap-2 md:w-32 flex-shrink-0">
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

                  {products.length === 0 && (
                    <div className="py-16 text-center">
                      <p className="text-muted-foreground text-lg">No products found</p>
                      <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters</p>
                    </div>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-8 flex justify-center">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                          </PaginationItem>
                          {paginationRange.map((item, idx) =>
                            item === "ellipsis" ? (
                              <PaginationItem key={`e-${idx}`}>
                                <PaginationEllipsis />
                              </PaginationItem>
                            ) : (
                              <PaginationItem key={item}>
                                <PaginationLink
                                  isActive={currentPage === item}
                                  onClick={() => setCurrentPage(item as number)}
                                  className="cursor-pointer"
                                >
                                  {item}
                                </PaginationLink>
                              </PaginationItem>
                            )
                          )}
                          <PaginationItem>
                            <PaginationNext
                              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Reusable collapsible filter section
const FilterSection = ({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) => (
  <div className="border-b border-border py-2.5">
    <button onClick={onToggle} className="flex items-center justify-between w-full text-sm font-medium text-foreground hover:text-primary">
      {title}
      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
    </button>
    {isOpen && <div className="mt-2">{children}</div>}
  </div>
);

export default Products;
