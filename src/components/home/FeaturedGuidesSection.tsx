import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Languages, ShieldCheck, ArrowRight } from "lucide-react";
import { MOCK_GUIDES } from "@/lib/constants";

const guideImages = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
];

const FeaturedGuidesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Guides
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Meet some of our top-rated, verified trekking guides ready to lead
            your next Himalayan adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_GUIDES.map((guide, index) => (
            <Card
              key={guide.id}
              className="group overflow-hidden hover:-translate-y-1 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={guideImages[index]}
                  alt={guide.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {guide.verified && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="verified" className="gap-1">
                      <ShieldCheck className="h-3 w-3" />
                      Verified
                    </Badge>
                  </div>
                )}
              </div>

              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-foreground">{guide.name}</h3>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{guide.rating}</span>
                    <span className="text-muted-foreground">
                      ({guide.reviewCount})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="truncate">{guide.regions.join(", ")}</span>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                  <Languages className="h-3.5 w-3.5" />
                  <span className="truncate">
                    {guide.languages.slice(0, 2).join(", ")}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-primary">
                      ${guide.dailyRate}
                    </span>
                    <span className="text-sm text-muted-foreground">/day</span>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/guides/${guide.id}`}>View Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button size="lg" asChild>
            <Link href="/guides">
              Browse All Guides
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGuidesSection;
