import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Mail } from "lucide-react";

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
    <section className="py-14">
      <div className="container mx-auto px-4">
        <div className="bg-muted/40 rounded-3xl p-10 md:p-14 flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-5">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
            Expert health advice,<br />delivered to your inbox
          </h2>
          <p className="text-muted-foreground text-sm mt-3 max-w-md">
            Stay updated with curated wellness tips and exclusive offers from Mahendra Health Care.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-3 mt-8 w-full max-w-md">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 rounded-xl bg-card border-border/60 text-sm"
              required
            />
            <Button type="submit" className="h-12 px-6 rounded-xl">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
