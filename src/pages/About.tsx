import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Award, TrendingUp } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Patient Care",
      description: "We put our patients first, ensuring they receive the best care and attention.",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Our team of licensed pharmacists brings decades of combined experience.",
    },
    {
      icon: Award,
      title: "Quality Assured",
      description: "All products meet strict quality standards and regulatory requirements.",
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "We continuously improve our services to better serve our community.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="bg-gradient-to-r from-primary to-primary-glow py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-6 text-5xl font-bold">About MediCare Pharmacy</h1>
            <p className="mx-auto max-w-2xl text-xl">
              Committed to providing quality healthcare and medicines to our community since 2010
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 text-3xl font-bold">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  MediCare Pharmacy was founded with a simple mission: to make quality healthcare
                  accessible to everyone. What started as a small community pharmacy has grown into
                  a trusted online platform serving thousands of customers.
                </p>
                <p>
                  We understand that health is wealth, and that's why we're committed to providing
                  authentic medicines, expert consultation, and reliable service. Our team of licensed
                  pharmacists ensures that every product meets the highest standards of quality and
                  safety.
                </p>
                <p>
                  Today, we continue to innovate and expand our services, always keeping our customers'
                  health and wellbeing at the heart of everything we do.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted/50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">Our Core Values</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
