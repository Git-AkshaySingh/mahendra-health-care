import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Pill, Users, FileText, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [medicines, users, articles] = await Promise.all([
        supabase.from("medicines").select("id", { count: "exact", head: true }),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("blog_articles").select("id", { count: "exact", head: true }),
      ]);

      return {
        medicines: medicines.count || 0,
        users: users.count || 0,
        articles: articles.count || 0,
      };
    },
  });

  const statCards = [
    {
      title: "Total Medicines",
      value: stats?.medicines || 0,
      icon: Pill,
      description: "Active products in inventory",
    },
    {
      title: "Total Users",
      value: stats?.users || 0,
      icon: Users,
      description: "Registered customers",
    },
    {
      title: "Blog Articles",
      value: stats?.articles || 0,
      icon: FileText,
      description: "Published and draft articles",
    },
    {
      title: "Growth",
      value: "+12%",
      icon: TrendingUp,
      description: "From last month",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your pharmacy management system</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <a
              href="/admin/medicines"
              className="flex items-center space-x-4 rounded-lg border p-4 transition-colors hover:bg-muted"
            >
              <Pill className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">Manage Medicines</p>
                <p className="text-sm text-muted-foreground">Add or edit products</p>
              </div>
            </a>
            <a
              href="/admin/users"
              className="flex items-center space-x-4 rounded-lg border p-4 transition-colors hover:bg-muted"
            >
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">Manage Users</p>
                <p className="text-sm text-muted-foreground">View and manage customers</p>
              </div>
            </a>
            <a
              href="/admin/articles"
              className="flex items-center space-x-4 rounded-lg border p-4 transition-colors hover:bg-muted"
            >
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">Blog Articles</p>
                <p className="text-sm text-muted-foreground">Create and publish posts</p>
              </div>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
