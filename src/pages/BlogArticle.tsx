import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User } from "lucide-react";

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: article, isLoading, error } = useQuery({
    queryKey: ["blog-article", slug],
    enabled: !!slug,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_articles")
        .select("*, profiles(full_name)")
        .eq("slug", slug as string)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <Button asChild variant="ghost" className="mb-6 -ml-3">
            <Link to="/blog"><ArrowLeft className="h-4 w-4 mr-2" />Back to Blog</Link>
          </Button>

          {isLoading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-72 bg-muted rounded-lg" />
              <div className="h-8 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
            </div>
          ) : !article ? (
            <div className="py-24 text-center">
              <h1 className="text-2xl font-bold mb-2">Article not found</h1>
              <p className="text-muted-foreground">It may have been removed or unpublished.</p>
            </div>
          ) : (
            <article className="space-y-6">
              {article.featured_image_url && (
                <img
                  src={article.featured_image_url}
                  alt={article.title}
                  className="w-full h-80 object-cover rounded-lg"
                />
              )}
              <header className="space-y-3">
                <h1 className="text-3xl md:text-4xl font-bold leading-tight">{article.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><User className="h-4 w-4"/>{(article as any).profiles?.full_name || "Admin"}</span>
                  {article.published_at && (
                    <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4"/>{new Date(article.published_at).toLocaleDateString()}</span>
                  )}
                </div>
                {article.excerpt && (
                  <p className="text-lg text-muted-foreground">{article.excerpt}</p>
                )}
              </header>
              <div className="prose prose-neutral max-w-none whitespace-pre-wrap leading-relaxed">
                {article.content}
              </div>
            </article>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogArticle;