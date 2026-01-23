import { Shield, Truck, Clock, Award, Users } from "lucide-react";

export const TrustSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Verified Products",
      description: "100% authentic and thoroughly verified medicines",
    },
    {
      icon: Users,
      title: "Licensed Pharmacists",
      description: "Expert pharmacists available for consultations",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Medicines delivered within 24-48 hours",
    },
    {
      icon: Award,
      title: "Easy Returns",
      description: "Hassle-free returns within 7 days",
    },
  ];

  return (
    <section className="py-10 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground">
            Serving <span className="text-primary">Dehradun</span> with Trusted Pharmacy Care
          </h2>
          <p className="text-muted-foreground mt-2">
            Our expert pharmacists are here to assist you
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-background rounded-xl border border-border p-5 text-center hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-muted-foreground">
            Trusted by <span className="font-bold text-foreground">10,000+</span> Customers
          </p>
        </div>
      </div>
    </section>
  );
};
