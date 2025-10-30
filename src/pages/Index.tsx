import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Truck, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-pharmacy.jpg";

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: "Verified Products",
      description: "All medicines are sourced from licensed manufacturers and verified for authenticity.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Get your medicines delivered to your doorstep within 24-48 hours.",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Our pharmacists are available round the clock to answer your questions.",
    },
    {
      icon: Award,
      title: "Best Quality",
      description: "We maintain strict quality standards for all our products.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section
          className="relative h-[600px] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
          <div className="container relative z-10 mx-auto px-4 text-center text-white">
            <h1 className="mb-6 text-5xl font-bold md:text-6xl">
              Your Health, Our Priority
            </h1>
            <p className="mb-8 text-xl md:text-2xl">
              Quality medicines delivered to your doorstep
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" variant="secondary" className="text-lg">
                <Link to="/products">Shop Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white bg-white/10 text-white hover:bg-white/20">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">Why Choose MediCare?</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <Card key={index} className="border-2 transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-3xl font-bold">Need Help?</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Our expert pharmacists are here to assist you
            </p>
            <Button asChild size="lg">
              <Link to="/auth">Get Started</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
