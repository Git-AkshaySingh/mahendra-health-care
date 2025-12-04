import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Menu, X, UserCircle } from "lucide-react";
import { CartSheet } from "@/components/CartSheet";
import { PrescriptionUploadDialog } from "@/components/PrescriptionUploadDialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

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

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
      <div className="container mx-auto flex h-16 items-center px-4">
        {/* Logo - Left */}
        <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
          <img src="/src/assets/logo-mhc.png" alt="Mahendra Health Care" className="h-10 w-auto" />
          <span className="text-lg font-bold text-primary hidden sm:inline-block">Mahendra Health Care</span>
        </Link>

        {/* Navigation Links - Centered */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <div className="flex items-center space-x-8">
            <Link to="/products" className="text-sm font-medium transition-colors hover:text-primary">
              Products
            </Link>
            <Link to="/blog" className="text-sm font-medium transition-colors hover:text-primary">
              Blog
            </Link>
            <Link to="/about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
          </div>
        </div>

        {/* Actions - Right */}

        <div className="flex items-center space-x-3">
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

          <div className="hidden md:flex">
            <CartSheet />
          </div>

          {user ? (
            <>
              <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")} title="My Account">
                <UserCircle className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout} className="hidden md:flex">
                Logout
              </Button>
            </>
          ) : (
            <Button variant="default" size="sm" onClick={() => navigate("/auth")} className="hidden md:flex">
              Login
            </Button>
          )}

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

      {isMenuOpen && (
        <div className="border-t bg-background md:hidden">
          <div className="container mx-auto space-y-4 px-4 py-4">
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
    </nav>
  );
};
