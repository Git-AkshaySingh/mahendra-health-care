import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success("Thanks for subscribing!");
      setEmail("");
    }
  };

  return (
    <section className="py-10 bg-background">
      <div className="container mx-auto px-4">
        <div className="bg-muted/30 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-primary leading-snug">
              Expert health advice,
              <br />
              delivered to your inbox
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
              Stay updated with curated wellness tips and exclusive offers.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-3 w-full md:w-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="min-w-[250px] bg-background"
              required
            />
            <Button type="submit" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground whitespace-nowrap">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
