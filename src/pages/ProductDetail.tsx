import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Upload, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const { data: medicine, isLoading } = useQuery({
    queryKey: ["medicine", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("medicines")
        .select("*, categories(name)")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
  });

  const handleAddToCart = () => {
    if (!medicine) return;
    
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: medicine.id,
        name: medicine.name,
        price: Number(medicine.price),
        image_url: medicine.image_url,
      });
    }

    toast({
      title: "Added to Cart",
      description: `${quantity} x ${medicine.name} added to cart`,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  const handlePrescriptionUpload = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to upload prescription",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (!prescriptionFile) {
      toast({
        title: "No File Selected",
        description: "Please select a prescription file",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const fileExt = prescriptionFile.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('medicine-images')
        .upload(fileName, prescriptionFile);

      if (uploadError) throw uploadError;

      toast({
        title: "Success",
        description: "Prescription uploaded successfully",
      });
      
      setUploadDialogOpen(false);
      setPrescriptionFile(null);
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!medicine) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <Button onClick={() => navigate("/products")}>Back to Products</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate("/products")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                {medicine.image_url ? (
                  <img
                    src={medicine.image_url}
                    alt={medicine.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                    No image available
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-4xl font-bold">{medicine.name}</h1>
                  {medicine.requires_prescription && (
                    <Badge variant="destructive">Prescription Required</Badge>
                  )}
                </div>
                <p className="text-muted-foreground">
                  {medicine.categories?.name || "Uncategorized"}
                </p>
              </div>

              <div className="text-3xl font-bold text-primary">
                ${Number(medicine.price).toFixed(2)}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {medicine.description && (
                    <div>
                      <h3 className="font-semibold mb-1">Description</h3>
                      <p className="text-muted-foreground">{medicine.description}</p>
                    </div>
                  )}

                  {medicine.manufacturer && (
                    <div>
                      <h3 className="font-semibold mb-1">Manufacturer</h3>
                      <p className="text-muted-foreground">{medicine.manufacturer}</p>
                    </div>
                  )}

                  {medicine.active_ingredients && (
                    <div>
                      <h3 className="font-semibold mb-1">Active Ingredients</h3>
                      <p className="text-muted-foreground">{medicine.active_ingredients}</p>
                    </div>
                  )}

                  {medicine.dosage_form && (
                    <div>
                      <h3 className="font-semibold mb-1">Dosage Form</h3>
                      <p className="text-muted-foreground">{medicine.dosage_form}</p>
                    </div>
                  )}

                  {medicine.strength && (
                    <div>
                      <h3 className="font-semibold mb-1">Strength</h3>
                      <p className="text-muted-foreground">{medicine.strength}</p>
                    </div>
                  )}

                  <div>
                    <h3 className="font-semibold mb-1">Stock</h3>
                    <p className="text-muted-foreground">
                      {medicine.stock_quantity > 0
                        ? `${medicine.stock_quantity} units available`
                        : "Out of stock"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Label htmlFor="quantity">Quantity:</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max={medicine.stock_quantity}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-24"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleAddToCart}
                    disabled={medicine.stock_quantity === 0}
                    className="flex-1"
                    variant="outline"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button
                    onClick={handleBuyNow}
                    disabled={medicine.stock_quantity === 0}
                    className="flex-1"
                  >
                    Buy Now
                  </Button>
                </div>

                {medicine.requires_prescription && (
                  <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="secondary" className="w-full">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Prescription
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Upload Prescription</DialogTitle>
                        <DialogDescription>
                          {isAuthenticated
                            ? "Please upload a valid prescription for this medicine."
                            : "You need to login to upload a prescription."}
                        </DialogDescription>
                      </DialogHeader>

                      {isAuthenticated ? (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="prescription">Prescription File</Label>
                            <Input
                              id="prescription"
                              type="file"
                              accept="image/*,.pdf"
                              onChange={(e) => setPrescriptionFile(e.target.files?.[0] || null)}
                            />
                          </div>
                          <Button onClick={handlePrescriptionUpload} className="w-full">
                            Upload
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <p className="text-center text-muted-foreground">
                            Please login to upload your prescription
                          </p>
                          <Button onClick={() => navigate("/auth")} className="w-full">
                            Login
                          </Button>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
