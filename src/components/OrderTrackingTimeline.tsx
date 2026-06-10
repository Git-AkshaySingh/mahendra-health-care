import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { format } from "date-fns";

const STEPS = ["pending", "confirmed", "processing", "out_for_delivery", "delivered"] as const;
const LABELS: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  processing: "Processing",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const OrderTrackingTimeline = ({ orderId, currentStatus }: { orderId: string; currentStatus: string }) => {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("order_status_history")
        .select("*")
        .eq("order_id", orderId)
        .order("created_at", { ascending: true });
      setHistory(data || []);
    })();
  }, [orderId]);

  const currentIdx = STEPS.indexOf(currentStatus as any);
  const cancelled = currentStatus === "cancelled";

  return (
    <div className="mt-4 border-t pt-4">
      <p className="text-sm font-medium mb-3">Order Tracking</p>
      {cancelled ? (
        <p className="text-sm text-destructive">This order was cancelled.</p>
      ) : (
        <div className="flex items-center justify-between gap-2">
          {STEPS.map((s, i) => {
            const done = i <= currentIdx;
            const active = i === currentIdx;
            return (
              <div key={s} className="flex-1 flex flex-col items-center text-center">
                {done ? <CheckCircle2 className={`h-5 w-5 ${active ? "text-primary" : "text-green-600"}`} /> : <Circle className="h-5 w-5 text-muted-foreground" />}
                <span className={`text-[10px] mt-1 ${done ? "font-medium" : "text-muted-foreground"}`}>{LABELS[s]}</span>
              </div>
            );
          })}
        </div>
      )}
      {history.length > 0 && (
        <div className="mt-4 space-y-2">
          {history.map(h => (
            <div key={h.id} className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span className="capitalize">{LABELS[h.status] || h.status}</span>
              <span>· {format(new Date(h.created_at), "MMM dd, yyyy HH:mm")}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};