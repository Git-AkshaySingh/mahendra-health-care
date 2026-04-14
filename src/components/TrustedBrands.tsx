import brandNiveaBanner from "@/assets/brand-nivea-banner.jpg";
import brandNiveaCare from "@/assets/brand-nivea-care.jpg";
import brandLakmeRetinol from "@/assets/brand-lakme-retinol.jpg";
import brandMbFishoil from "@/assets/brand-mb-fishoil.jpg";
import brandDrools from "@/assets/brand-drools.jpg";
import brandEnergiePro from "@/assets/brand-energie-pro.jpg";
import brandMusclepharm from "@/assets/brand-musclepharm.jpg";
import brandNiveaGlow from "@/assets/brand-nivea-glow.jpg";

const brands = [
  { name: "Nivea", image: brandNiveaBanner },
  { name: "Lakme", image: brandLakmeRetinol },
  { name: "MuscleBlaze", image: brandMbFishoil },
  { name: "Drools", image: brandDrools },
  { name: "Nivea Care", image: brandNiveaCare },
  { name: "Energie Pro", image: brandEnergiePro },
  { name: "MusclePharm", image: brandMusclepharm },
  { name: "Nivea Glow", image: brandNiveaGlow },
];

export const TrustedBrands = () => {
  return (
    <section className="py-14">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground">Trusted by Leading Brands</h2>
          <p className="text-muted-foreground text-sm mt-1">Shop from the brands millions trust for health, beauty & pet care.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="bg-card border border-border/50 rounded-2xl overflow-hidden h-24 md:h-28 flex items-center justify-center hover:shadow-[var(--shadow-elevated)] transition-all group cursor-pointer"
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
