import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Menu, X, UserCircle, Phone, ChevronDown, Search, Heart, ShoppingCart } from "lucide-react";
import { CartSheet } from "@/components/CartSheet";
import { PrescriptionUploadDialog } from "@/components/PrescriptionUploadDialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items } = useCart();

  useState(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  });

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
      navigate("/");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-sm">
      {/* Top Bar */}
      <div className="bg-muted/50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-8 text-xs">
            <span className="text-muted-foreground">Welcome to Mahendra Health Care!</span>
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <>
                  <Link to="/dashboard" className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                    <User className="h-3 w-3" />
                    My Account
                  </Link>
                  <button onClick={handleLogout} className="text-muted-foreground hover:text-primary transition-colors">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/auth" className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                    <User className="h-3 w-3" />
                    Login
                  </Link>
                  <Link to="/auth" className="text-muted-foreground hover:text-primary transition-colors">
                    My Account
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <img src="/src/assets/logo-mhc.png" alt="Mahendra Health Care" className="h-10 w-auto" />
              <span className="text-xl font-bold text-primary hidden lg:inline-block">MHC</span>
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
              <div className="flex w-full border border-border rounded-md overflow-hidden">
                <div className="relative">
                  <select className="h-10 px-3 pr-8 bg-muted/50 border-r border-border text-sm appearance-none cursor-pointer focus:outline-none">
                    <option>All Categories</option>
                    <option>Medicines</option>
                    <option>Ayurveda</option>
                    <option>Healthcare</option>
                    <option>Personal Care</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
                <Input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 border-0 focus-visible:ring-0 h-10 rounded-none"
                />
                <Button type="submit" className="rounded-none h-10 px-6">
                  Search
                </Button>
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <PrescriptionUploadDialog 
                user={user} 
                onLoginRequired={() => {
                  toast({
                    title: "Login Required",
                    description: "Please login to upload prescriptions",
                  });
                  navigate("/auth");
                }}
              />

              <Button variant="ghost" size="icon" className="hidden md:flex relative">
                <Heart className="h-5 w-5" />
              </Button>

              <CartSheet />

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-background border-b hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            {/* All Categories Button */}
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 rounded-md h-9">
              <Menu className="h-4 w-4" />
              All Categories
              <ChevronDown className="h-4 w-4" />
            </Button>

            {/* Navigation Links */}
            <nav className="flex items-center gap-6">
              <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/products" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
                Shop <ChevronDown className="h-3 w-3" />
              </Link>
              <Link to="/blog" className="text-sm font-medium hover:text-primary transition-colors">
                Blog
              </Link>
              <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>

            {/* Phone Number */}
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-primary" />
              <span className="font-medium">+91 98765-43210</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t bg-background md:hidden">
          <div className="container mx-auto space-y-4 px-4 py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </form>

            <Link
              to="/"
              className="block text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/blog"
              className="block text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="block text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="block text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Account
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout} className="w-full">
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={() => {
                  navigate("/auth");
                  setIsMenuOpen(false);
                }}
                className="w-full"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};