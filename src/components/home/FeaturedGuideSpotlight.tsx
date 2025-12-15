import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Shield, MapPin, Award, ArrowRight, Sparkles } from "lucide-react";
import { MOCK_GUIDES } from "@/lib/constants";
import { TrustTierBadge } from "@/components/ui/verification-status";

export function FeaturedGuideSpotlight() {
  const featuredGuide = MOCK_GUIDES.find(g => g.trustTier === "platinum") || MOCK_GUIDES[0];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 justify-center mb-8">
          <Sparkles className="h-5 w-5 text-amber-500" />
          <h2 className="text-2xl md:text-3xl font-bold text-center">Featured Guide</h2>
          <Sparkles className="h-5 w-5 text-amber-500" />
        </div>
        
        <Card className="max-w-4xl mx-auto overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Side */}
              <div className="relative bg-gradient-to-br from-primary/20 to-primary/5 p-8 flex items-center justify-center min-h-[300px]">
                <div className="relative">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-6xl font-bold text-primary-foreground">
                    {featuredGuide.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                    <Award className="h-8 w-8 text-amber-500" />
                  </div>
                </div>
                
                {/* Floating badges */}
                <Badge variant="verified" className="absolute top-4 right-4 gap-1">
                  <Shield className="h-3 w-3" />
                  Licensed Guide
                </Badge>
              </div>
              
              {/* Content Side */}
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold">{featuredGuide.name}</h3>
                  <TrustTierBadge tier={featuredGuide.trustTier || "gold"} completedTreks={featuredGuide.completedTreks || 87} />
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                    <span className="font-bold">{featuredGuide.rating}</span>
                    <span className="text-muted-foreground">({featuredGuide.reviewCount} reviews)</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4">
                  {featuredGuide.bio}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredGuide.regions.map((region) => (
                    <Badge key={region} variant="region" className="gap-1">
                      <MapPin className="h-3 w-3" />
                      {region}
                    </Badge>
                  ))}
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-background/50 rounded-lg">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{featuredGuide.experience}</p>
                    <p className="text-xs text-muted-foreground">Years Exp.</p>
                  </div>
                  <div className="text-center border-x border-border">
                    <p className="text-2xl font-bold text-primary">{featuredGuide.completedTreks}</p>
                    <p className="text-xs text-muted-foreground">Treks Led</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">${featuredGuide.dailyRate}</p>
                    <p className="text-xs text-muted-foreground">Per Day</p>
                  </div>
                </div>
                
                <Button size="lg" asChild>
                  <Link to={`/guides/${featuredGuide.id}`}>
                    View Full Profile
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export function SubscriptionComparison() {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      description: "Get started with basic listing",
      features: ["Basic profile listing", "Up to 5 bookings/month", "Standard support"],
      highlighted: false,
    },
    {
      name: "Professional",
      price: "$29/mo",
      description: "For active guides",
      features: ["Priority listing", "Unlimited bookings", "Featured in searches", "Analytics dashboard", "Priority support"],
      highlighted: true,
    },
    {
      name: "Elite",
      price: "$79/mo",
      description: "Maximum visibility",
      features: ["Homepage spotlight", "Top search position", "Verified elite badge", "Dedicated account manager", "Marketing tools"],
      highlighted: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <Card
          key={plan.name}
          className={plan.highlighted ? "border-primary ring-2 ring-primary/20" : ""}
        >
          <CardContent className="p-6">
            {plan.highlighted && (
              <Badge className="mb-4">Most Popular</Badge>
            )}
            <h3 className="text-xl font-bold">{plan.name}</h3>
            <p className="text-3xl font-bold text-primary mt-2">{plan.price}</p>
            <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
            
            <ul className="mt-6 space-y-3">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
            
            <Button className="w-full mt-6" variant={plan.highlighted ? "default" : "outline"}>
              {plan.price === "Free" ? "Current Plan" : "Upgrade"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function ReferralProgram() {
  return (
    <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-10 w-10 text-primary" />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">Refer a Guide, Earn Rewards</h3>
            <p className="text-muted-foreground">
              Know a licensed guide? Refer them to our platform and earn $50 when they complete 
              their first booking. They get $25 too!
            </p>
          </div>
          
          <Button size="lg" className="flex-shrink-0">
            Get Referral Link
          </Button>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-primary/20">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">$50</p>
            <p className="text-xs text-muted-foreground">Your reward</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">$25</p>
            <p className="text-xs text-muted-foreground">Their bonus</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">∞</p>
            <p className="text-xs text-muted-foreground">No limits</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
