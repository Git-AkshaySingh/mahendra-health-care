import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Menu, X, Search, ShoppingCart } from "lucide-react";
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
      toast({ title: "Error", description: "Failed to logout", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Logged out successfully" });
      navigate("/");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-sm">
      <div className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <img src="/src/assets/logo-mhc.png" alt="Mahendra Health Care" className="h-10 w-auto" />
              <span className="text-lg font-bold text-primary hidden lg:inline-block">Mahendra Health Care</span>
            </Link>

            {/* Center Nav Links */}
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/products" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Prescriptions
              </Link>
              <Link to="/products?category=lab-tests" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Lab Tests
              </Link>
              <Link to="/products?category=wellness" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Wellness
              </Link>
              <Link to="/contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Consultations
              </Link>
            </nav>

            {/* Search + Actions */}
            <div className="flex items-center gap-3">
              <form onSubmit={handleSearch} className="hidden md:flex">
                <div className="flex border border-border rounded-lg overflow-hidden bg-muted/30">
                  <div className="flex items-center px-3">
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search medicines..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-0 focus-visible:ring-0 h-9 w-[180px] bg-transparent text-sm"
                  />
                </div>
              </form>

              <CartSheet />

              {/* Account */}
              <div className="hidden md:flex items-center">
                {user ? (
                  <div className="flex items-center gap-1">
                    <Link to="/dashboard" className="p-2 rounded-full hover:bg-muted transition-colors">
                      <User className="h-5 w-5 text-foreground" />
                    </Link>
                    <button onClick={handleLogout} className="text-xs text-muted-foreground hover:text-foreground">
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link to="/auth" className="p-2 rounded-full hover:bg-muted transition-colors">
                    <User className="h-5 w-5 text-foreground" />
                  </Link>
                )}
              </div>

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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t bg-background md:hidden">
          <div className="container mx-auto space-y-3 px-4 py-4">
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
            <Link to="/" className="block text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/products" className="block text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>Products</Link>
            <Link to="/blog" className="block text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>Blog</Link>
            <Link to="/about" className="block text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/contact" className="block text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="block text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>My Account</Link>
                <Button variant="outline" size="sm" onClick={handleLogout} className="w-full">Logout</Button>
              </>
            ) : (
              <Button variant="default" size="sm" onClick={() => { navigate("/auth"); setIsMenuOpen(false); }} className="w-full">Login</Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
