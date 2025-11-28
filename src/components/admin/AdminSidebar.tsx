import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Home, Pill, Users, FileText, FolderTree, Package, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const menuItems = [
  { title: "Dashboard", url: "/admin", icon: Home },
  { title: "Products", url: "/admin/products", icon: Pill },
  { title: "Categories", url: "/admin/categories", icon: FolderTree },
  { title: "Orders", url: "/admin/orders", icon: Package },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Blog Articles", url: "/admin/articles", icon: FileText },
];

export const AdminSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      });
    } else {
      navigate("/");
    }
  };

  return (
    <Sidebar className={state === "collapsed" ? "w-14" : "w-60"}>
      <div className="flex items-center justify-between border-b p-4">
        {state !== "collapsed" && (
          <div className="flex items-center space-x-2">
            <img src="/src/assets/logo-mhc.png" alt="MHC" className="h-6 w-auto" />
            <span className="text-lg font-bold">Admin</span>
          </div>
        )}
        {state === "collapsed" && (
          <img src="/src/assets/logo-mhc.png" alt="MHC" className="h-6 w-auto mx-auto" />
        )}
        <SidebarTrigger />
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.url}
                        className={active ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}
                      >
                        <item.icon className="h-4 w-4" />
                        {state !== "collapsed" && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto border-t p-4">
          <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            {state !== "collapsed" && "Logout"}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};
