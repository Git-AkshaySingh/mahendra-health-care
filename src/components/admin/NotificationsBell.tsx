import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

export const NotificationsBell = () => {
  const [items, setItems] = useState<any[]>([]);
  const navigate = useNavigate();

  const load = async () => {
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("audience", "staff")
      .order("created_at", { ascending: false })
      .limit(15);
    setItems(data || []);
  };

  useEffect(() => {
    load();
    const ch = supabase
      .channel("staff-notifs")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "notifications", filter: "audience=eq.staff" }, load)
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, []);

  const unread = items.filter(i => !i.read).length;

  const open = async (n: any) => {
    await supabase.from("notifications").update({ read: true }).eq("id", n.id);
    load();
    if (n.link) navigate(n.link);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-destructive text-destructive-foreground text-[10px] font-semibold flex items-center justify-center">
              {unread}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="p-3 border-b font-semibold">Notifications</div>
        <div className="max-h-96 overflow-y-auto">
          {items.length === 0 && <p className="p-4 text-sm text-muted-foreground">No notifications yet.</p>}
          {items.map(n => (
            <button key={n.id} onClick={() => open(n)} className={`w-full text-left p-3 border-b hover:bg-muted/50 ${!n.read ? "bg-muted/30" : ""}`}>
              <div className="text-sm font-medium">{n.title}</div>
              {n.body && <div className="text-xs text-muted-foreground">{n.body}</div>}
              <div className="text-[10px] text-muted-foreground mt-1">{formatDistanceToNow(new Date(n.created_at), { addSuffix: true })}</div>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};