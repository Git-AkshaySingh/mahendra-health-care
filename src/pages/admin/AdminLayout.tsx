import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { NotificationsBell } from "@/components/admin/NotificationsBell";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export type DashboardRole = "admin" | "staff";
export const RoleContext = createContext<DashboardRole>("staff");
export const useDashboardRole = () => useContext(RoleContext);

const AdminLayout = () => {
  const [role, setRole] = useState<DashboardRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAdminRole();
  }, []);

  const checkAdminRole = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) { setRole(null); setIsLoading(false); return; }
      const { data } = await supabase
        .from("user_roles").select("role").eq("user_id", session.user.id);
      const roles = (data || []).map(r => r.role);
      if (roles.includes("admin")) setRole("admin");
      else if (roles.includes("staff")) setRole("staff");
      else setRole(null);
    } catch {
      setRole(null);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!role) return <Navigate to="/auth" replace />;

  return (
    <RoleContext.Provider value={role}>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AdminSidebar role={role} />
          <main className="flex-1 overflow-y-auto bg-muted/50">
            <div className="flex items-center justify-end gap-2 px-8 py-3 border-b bg-background sticky top-0 z-10">
              <NotificationsBell />
            </div>
            <div className="p-8"><Outlet /></div>
          </main>
        </div>
      </SidebarProvider>
    </RoleContext.Provider>
  );
};

export default AdminLayout;
