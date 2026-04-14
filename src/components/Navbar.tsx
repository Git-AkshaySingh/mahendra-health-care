import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Menu, X, Search, ShoppingCart, LogIn, LogOut, LayoutDashboard, Phone, Heart, Package } from "lucide-react";
import { CartSheet } from "@/components/CartSheet";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

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

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products?category=medicines", label: "Medicines" },
    { to: "/products", label: "Lab Tests" },
    { to: "/blog", label: "Blog" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-sm">
      <div className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">M</span>
              </div>
              <span className="text-lg font-bold text-primary hidden lg:inline-block">Mahendra Health Care</span>
            </Link>

            {/* Center Nav Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to + link.label}
                  to={link.to}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-muted"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Search + Actions */}
            <div className="flex items-center gap-2">
              <form onSubmit={handleSearch} className="hidden md:flex">
                <div className="flex border-2 border-border rounded-lg overflow-hidden bg-muted/40 focus-within:border-primary transition-colors">
                  <div className="flex items-center px-3">
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-0 focus-visible:ring-0 h-9 w-[160px] lg:w-[200px] bg-transparent text-sm"
                  />
                </div>
              </form>

              <CartSheet />

              {/* Auth Buttons */}
              <div className="hidden md:flex items-center gap-1">
                {user ? (
                  <>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/dashboard" className="gap-1.5">
                        <User className="h-4 w-4" />
                        <span className="hidden xl:inline">Account</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-1.5 text-muted-foreground">
                      <LogOut className="h-4 w-4" />
                      <span className="hidden xl:inline">Logout</span>
                    </Button>
                  </>
                ) : (
                  <Button variant="default" size="sm" asChild>
                    <Link to="/auth" className="gap-1.5">
                      <LogIn className="h-4 w-4" />
                      Login
                    </Link>
                  </Button>
                )}
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
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
        <div className="border-t bg-background lg:hidden">
          <div className="container mx-auto space-y-2 px-4 py-4">
            <form onSubmit={handleSearch} className="flex gap-2 mb-3">
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
            {navLinks.map((link) => (
              <Link
                key={link.to + link.label}
                to={link.to}
                className="block text-sm font-medium py-2 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t pt-3 mt-3">
              {user ? (
                <>
                  <Link to="/dashboard" className="block text-sm font-medium py-2 hover:text-primary" onClick={() => setIsMenuOpen(false)}>My Account</Link>
                  <Button variant="outline" size="sm" onClick={handleLogout} className="w-full mt-2">Logout</Button>
                </>
              ) : (
                <Button variant="default" size="sm" onClick={() => { navigate("/auth"); setIsMenuOpen(false); }} className="w-full">Login / Register</Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
