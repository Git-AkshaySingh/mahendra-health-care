import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Truck, Zap, FileText } from "lucide-react";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [prescriptionId, setPrescriptionId] = useState<string>("none");
  const [deliveryType, setDeliveryType] = useState<"regular" | "express">("regular");
  const [paymentMethod, setPaymentMethod] = useState<string>("cod");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", zip: "" });
  const [orderNote, setOrderNote] = useState("");

  const deliveryFee = deliveryType === "express" ? 99 : totalPrice >= 500 ? 0 : 50;
  const grandTotal = totalPrice + deliveryFee;

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/auth"); return; }
      setUser(session.user);
      setForm(f => ({ ...f, email: session.user.email || "" }));
      const { data: prof } = await supabase.from("customers").select("*").eq("id", session.user.id).maybeSingle();
      if (prof) setForm(f => ({ ...f,
        name: prof.full_name || f.name,
        phone: prof.phone || f.phone,
        address: prof.address || f.address,
      }));
      const { data: rx } = await supabase.from("prescriptions").select("*").eq("customer_id", session.user.id).order("uploaded_at", { ascending: false });
      setPrescriptions(rx || []);
    })();
  }, [navigate]);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { navigate("/auth"); return; }
    if (!user.email_confirmed_at) {
      toast({ title: "Verify your email", description: "Please verify your email before placing an order.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      // ensure a customer row exists
      await supabase.from("customers").upsert({
        id: user.id, full_name: form.name, email: form.email, phone: form.phone, address: `${form.address}, ${form.city} ${form.zip}`,
      }, { onConflict: "id" });

      const { data: order, error: orderErr } = await supabase.from("orders").insert({
        user_id: user.id,
        customer_id: user.id,
        total_amount: grandTotal,
        status: "pending",
        payment_method: paymentMethod,
        payment_status: paymentMethod === "cod" ? "pending" : "pending",
        delivery_type: deliveryType,
        delivery_fee: deliveryFee,
        customer_name: form.name,
        customer_phone: form.phone,
        customer_email: form.email,
        shipping_address: form.address,
        shipping_city: form.city,
        shipping_zip: form.zip,
        prescription_id: prescriptionId !== "none" ? prescriptionId : null,
        notes: orderNote || null,
      }).select().single();
      if (orderErr) throw orderErr;

      const itemRows = items.map(i => ({
        order_id: order.id, product_id: i.id, quantity: i.quantity, price_at_purchase: i.price,
      }));
      const { error: itemsErr } = await supabase.from("order_items").insert(itemRows);
      if (itemsErr) throw itemsErr;

      toast({ title: "Order placed", description: `Order #${order.id.slice(0,8)} created successfully.` });
      clearCart();
      navigate("/dashboard");
    } catch (err: any) {
      toast({ title: "Order failed", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Your cart is empty</h2>
            <Button onClick={() => navigate("/products")}>Continue Shopping</Button>
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
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-4xl font-bold mb-8">Checkout</h1>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <Card>
                <CardHeader><CardTitle>Billing & Shipping</CardTitle></CardHeader>
                <CardContent>
                  <form onSubmit={handleCheckout} className="space-y-4" id="checkout-form">
                    <div className="space-y-2"><Label>Full Name</Label><Input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
                    <div className="space-y-2"><Label>Email</Label><Input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div>
                    <div className="space-y-2"><Label>Phone</Label><Input type="tel" required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></div>
                    <div className="space-y-2"><Label>Address</Label><Input required value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2"><Label>City</Label><Input required value={form.city} onChange={e=>setForm({...form,city:e.target.value})}/></div>
                      <div className="space-y-2"><Label>PIN Code</Label><Input required value={form.zip} onChange={e=>setForm({...form,zip:e.target.value})}/></div>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Delivery Method</CardTitle></CardHeader>
                <CardContent>
                  <RadioGroup value={deliveryType} onValueChange={(v:any)=>setDeliveryType(v)} className="space-y-3">
                    <label className="flex items-start gap-3 border rounded-xl p-4 cursor-pointer hover:bg-muted/40">
                      <RadioGroupItem value="regular" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 font-medium"><Truck className="h-4 w-4"/> Regular Delivery</div>
                        <p className="text-sm text-muted-foreground">Arrives in 3–5 business days. {totalPrice>=500?"Free":"₹50 fee."}</p>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 border rounded-xl p-4 cursor-pointer hover:bg-muted/40">
                      <RadioGroupItem value="express" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 font-medium"><Zap className="h-4 w-4"/> Express Delivery</div>
                        <p className="text-sm text-muted-foreground">Same / next-day in select cities. ₹99 fee.</p>
                      </div>
                    </label>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="h-4 w-4"/> Attach Prescription (optional)</CardTitle></CardHeader>
                <CardContent>
                  <Select value={prescriptionId} onValueChange={setPrescriptionId}>
                    <SelectTrigger><SelectValue/></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No prescription</SelectItem>
                      {prescriptions.map(p => (
                        <SelectItem key={p.id} value={p.id}>Uploaded {new Date(p.uploaded_at).toLocaleDateString()}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-2">Upload prescriptions from the navbar or your dashboard.</p>
                  <div className="mt-4 space-y-2">
                    <Label>Note for pharmacist (optional)</Label>
                    <textarea
                      value={orderNote}
                      onChange={(e) => setOrderNote(e.target.value)}
                      rows={3}
                      placeholder="Allergies, dosage preferences, special instructions…"
                      className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Payment Method</CardTitle></CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-2">
                    <label className="flex items-center gap-3 border rounded-xl p-3 cursor-pointer"><RadioGroupItem value="cod"/> Cash on Delivery</label>
                    <label className="flex items-center gap-3 border rounded-xl p-3 cursor-pointer"><RadioGroupItem value="card"/> Card</label>
                    <label className="flex items-center gap-3 border rounded-xl p-3 cursor-pointer"><RadioGroupItem value="upi"/> UPI</label>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            <Card className="h-fit sticky top-24">
              <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between border-b pb-3">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                <div className="space-y-2">
                  <div className="flex justify-between"><span>Subtotal</span><span>₹{totalPrice.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>{deliveryType === "express" ? "Express delivery" : "Delivery"}</span><span>{deliveryFee===0?"Free":`₹${deliveryFee.toFixed(2)}`}</span></div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2"><span>Total</span><span>₹{grandTotal.toFixed(2)}</span></div>
                </div>
                <Button type="submit" form="checkout-form" className="w-full" disabled={submitting}>
                  {submitting ? "Placing order..." : `Place Order — ₹${grandTotal.toFixed(2)}`}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;