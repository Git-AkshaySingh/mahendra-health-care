import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye, FileText, Package } from "lucide-react";
import { PrescriptionCard } from "@/components/PrescriptionCard";
import { format } from "date-fns";

const Customers = () => {
  const [selected, setSelected] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const { data: customers } = useQuery({
    queryKey: ["admin-customers"],
    queryFn: async () => {
      // Pull all profiles whose role is "user" (or has no admin/staff entry).
      const { data: profiles } = await supabase
        .from("profiles")
        .select("*, user_roles(role)")
        .order("created_at", { ascending: false });
      return (profiles || []).filter(
        (p: any) => !(p.user_roles || []).some((r: any) => r.role === "admin" || r.role === "staff")
      );
    },
  });

  const { data: detail } = useQuery({
    queryKey: ["admin-customer-detail", selected?.id],
    enabled: !!selected?.id,
    queryFn: async () => {
      const [orders, prescriptions, customer] = await Promise.all([
        supabase.from("orders").select("*, order_items(*, products(name, image_url))").eq("user_id", selected.id).order("created_at", { ascending: false }),
        supabase.from("prescriptions").select("*").eq("customer_id", selected.id).order("uploaded_at", { ascending: false }),
        supabase.from("customers").select("*").eq("id", selected.id).maybeSingle(),
      ]);
      return {
        orders: orders.data || [],
        prescriptions: prescriptions.data || [],
        customer: customer.data,
      };
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Customers</h1>
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers?.map((c: any) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.full_name || "—"}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>{c.phone || "—"}</TableCell>
                <TableCell>{format(new Date(c.created_at), "MMM dd, yyyy")}</TableCell>
                <TableCell>
                  {c.deletion_requested_at ? (
                    <Badge variant="destructive">Deletion requested</Badge>
                  ) : (
                    <Badge variant="outline">Active</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => { setSelected(c); setOpen(true); }}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selected?.full_name || selected?.email}</DialogTitle>
            <DialogDescription>Profile, orders and prescriptions</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-6">
              <section className="grid sm:grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">Email:</span> {selected.email}</div>
                <div><span className="text-muted-foreground">Phone:</span> {selected.phone || "—"}</div>
                <div><span className="text-muted-foreground">Address:</span> {detail?.customer?.address || "—"}</div>
                <div><span className="text-muted-foreground">Age:</span> {detail?.customer?.age || "—"}</div>
                {selected.deletion_requested_at && (
                  <div className="sm:col-span-2 text-destructive">
                    Account deletion requested on {format(new Date(selected.deletion_requested_at), "MMM dd, yyyy")}.
                    Will be permanently removed after 14 days.
                  </div>
                )}
              </section>

              <section>
                <h3 className="font-semibold mb-2 flex items-center gap-2"><Package className="h-4 w-4"/>Order History ({detail?.orders.length || 0})</h3>
                {detail?.orders.length ? (
                  <div className="space-y-2">
                    {detail.orders.map((o: any) => (
                      <div key={o.id} className="border rounded-md p-3 text-sm">
                        <div className="flex justify-between">
                          <span className="font-mono">{o.id.slice(0, 8)}…</span>
                          <span>{format(new Date(o.created_at), "MMM dd, yyyy")}</span>
                          <Badge>{o.status}</Badge>
                          <span className="font-semibold">₹{Number(o.total_amount || 0).toFixed(2)}</span>
                        </div>
                        <div className="mt-2 text-muted-foreground text-xs">
                          {o.order_items?.length || 0} item(s)
                          {o.notes ? <> · Note: <span className="italic">{o.notes}</span></> : null}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : <p className="text-sm text-muted-foreground">No orders yet.</p>}
              </section>

              <section>
                <h3 className="font-semibold mb-2 flex items-center gap-2"><FileText className="h-4 w-4"/>Prescriptions ({detail?.prescriptions.length || 0})</h3>
                {detail?.prescriptions.length ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {detail.prescriptions.map((p: any) => (
                      <PrescriptionCard key={p.id} prescription={p} />
                    ))}
                  </div>
                ) : <p className="text-sm text-muted-foreground">No prescriptions uploaded.</p>}
              </section>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Customers;