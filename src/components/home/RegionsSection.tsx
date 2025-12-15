import Link from 'next/link';
import { TREKKING_REGIONS } from "@/lib/constants";
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const regionImages: Record<string, string> = {
  everest: "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=600&q=80",
  annapurna: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=600&q=80",
  langtang: "https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=600&q=80",
  manaslu: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80",
  mustang: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=600&q=80",
  kanchenjunga: "https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=600&q=80",
};

const RegionsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore Trekking Regions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From the world's highest peaks to hidden valleys, discover Nepal's most breathtaking trekking destinations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TREKKING_REGIONS.map((region, index) => (
            <Link
              key={region.id}
              href={`/guides?region=${region.id}`}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={regionImages[region.id]}
                alt={region.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-900/40 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 text-amber-400 text-sm mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>Nepal</span>
                </div>
                <h3 className="text-xl font-bold text-primary-foreground mb-1">
                  {region.name}
                </h3>
                <p className="text-primary-foreground/70 text-sm mb-3">
                  {region.description}
                </p>
                <div className="flex items-center gap-2 text-amber-400 text-sm font-medium group-hover:gap-3 transition-all">
                  <span>View Guides</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" size="lg" asChild>
            <Link href="/regions">
              View All Regions
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RegionsSection;
