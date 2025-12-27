"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  MapPin,
  Mountain,
  Calendar,
  Clock,
  Users,
  Star,
  ArrowRight,
  Shield,
  AlertTriangle,
  CheckCircle,
  Thermometer,
  Compass,
} from "lucide-react";
import { TREKKING_REGIONS, MOCK_GUIDES } from "@/lib/constants";
import heroMountains from "@/assets/hero-mountains.jpg";

const regionDetails: Record<
  string,
  {
    heroDescription: string;
    highlights: string[];
    bestTime: string;
    difficulty: string;
    duration: string;
    maxAltitude: string;
    faqs: { q: string; a: string }[];
    safetyTips: string[];
  }
> = {
  everest: {
    heroDescription:
      "Trek to the base of the world's highest peak through legendary Sherpa villages and ancient monasteries.",
    highlights: [
      "Everest Base Camp at 5,364m",
      "Kala Patthar sunrise views",
      "Namche Bazaar market town",
      "Tengboche Monastery",
      "Sherpa culture immersion",
    ],
    bestTime: "March-May & September-November",
    difficulty: "Challenging",
    duration: "12-16 days",
    maxAltitude: "5,545m (Kala Patthar)",
    faqs: [
      {
        q: "Do I need previous trekking experience?",
        a: "While not mandatory, previous high-altitude trekking experience is highly recommended. Good physical fitness is essential.",
      },
      {
        q: "What permits do I need?",
        a: "You'll need a TIMS card and Sagarmatha National Park entry permit. Your guide will handle all paperwork.",
      },
      {
        q: "Is altitude sickness a concern?",
        a: "Yes, AMS is a real risk above 3,000m. Our guides monitor symptoms and the itinerary includes proper acclimatization days.",
      },
    ],
    safetyTips: [
      "Acclimatize properly - don't rush",
      "Stay hydrated (3-4 liters/day)",
      "Recognize AMS symptoms early",
      "Always trek with a licensed guide",
      "Carry proper gear for cold weather",
    ],
  },
  annapurna: {
    heroDescription:
      "Experience Nepal's most diverse trek through lush valleys, terraced farmland, and high mountain passes.",
    highlights: [
      "Thorong La Pass at 5,416m",
      "Muktinath Temple",
      "Hot springs at Tatopani",
      "Diverse landscapes",
      "Gurung and Thakali villages",
    ],
    bestTime: "March-May & October-November",
    difficulty: "Moderate to Challenging",
    duration: "14-21 days",
    maxAltitude: "5,416m (Thorong La)",
    faqs: [
      {
        q: "What makes Annapurna Circuit special?",
        a: "It's one of the world's most diverse treks, taking you through subtropical forests to alpine deserts in a single journey.",
      },
      {
        q: "Can beginners do this trek?",
        a: "The full circuit is challenging. Beginners might prefer shorter options like ABC or Poon Hill trek.",
      },
      {
        q: "Are teahouses available throughout?",
        a: "Yes, the route has well-established teahouses offering food and accommodation.",
      },
    ],
    safetyTips: [
      "Check weather for Thorong La crossing",
      "Start early for high passes",
      "Carry emergency supplies",
      "Stay on marked trails",
      "Register with TIMS and ACAP",
    ],
  },
  langtang: {
    heroDescription:
      "Explore the sacred Langtang Valley, known as the 'Valley of Glaciers', just north of Kathmandu.",
    highlights: [
      "Kyanjin Gompa monastery",
      "Tserko Ri viewpoint",
      "Langtang Glacier",
      "Local cheese factory",
      "Tamang heritage",
    ],
    bestTime: "March-May & October-November",
    difficulty: "Moderate",
    duration: "7-12 days",
    maxAltitude: "4,984m (Tserko Ri)",
    faqs: [
      {
        q: "How is Langtang different from Everest?",
        a: "Langtang is less crowded, closer to Kathmandu, and offers a more intimate experience with local Tamang communities.",
      },
      {
        q: "Is the area recovered from the 2015 earthquake?",
        a: "Yes, the trail and villages have been rebuilt. Trekking here directly supports the local economy.",
      },
      {
        q: "Can I combine it with Gosaikunda?",
        a: "Yes! Many trekkers combine Langtang Valley with the sacred Gosaikunda lakes.",
      },
    ],
    safetyTips: [
      "Be aware of avalanche-prone areas in winter",
      "Carry warm layers",
      "Respect local customs at monasteries",
      "Don't feed wildlife",
      "Carry cash - limited ATMs",
    ],
  },
};

const RegionPage = () => {
  const { id } = useParams();
  const region = TREKKING_REGIONS.find((r) => r.id === id)!;
  const details = regionDetails[region.id];
  const regionGuides = MOCK_GUIDES.filter((guide) =>
    guide.regions.includes(region.name)
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroMountains.src})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />

        <div className="container mx-auto px-4 relative z-10 pt-16">
          <Badge variant="accent" className="mb-4">
            <MapPin className="h-3 w-3 mr-1" />
            {region.name}
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-3xl">
            {region.name} Trekking
          </h1>

          <p className="text-xl text-white/80 max-w-2xl mb-8">
            {details.heroDescription}
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white">
              <Mountain className="h-4 w-4" />
              <span>{details.maxAltitude}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white">
              <Clock className="h-4 w-4" />
              <span>{details.duration}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white">
              <Compass className="h-4 w-4" />
              <span>{details.difficulty}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white">
              <Calendar className="h-4 w-4" />
              <span>{details.bestTime}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" variant="hero" asChild>
              <Link href={`/guides?region=${region.name}`}>
                Find a Guide
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="heroOutline">
              View Itineraries
            </Button>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 -mt-16 relative z-20 pb-16">
        {/* Highlights */}
        <Card className="mb-12">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Trek Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {details.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-lg bg-muted/50"
                >
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Available Guides */}
            <section>
              <h2 className="text-2xl font-bold mb-6">
                Expert Guides for {region.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {regionGuides.slice(0, 4).map((guide) => (
                  <Card
                    key={guide.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{guide.name}</h4>
                            {guide.verified && (
                              <Shield className="h-4 w-4 text-emerald-600" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            <span>{guide.rating}</span>
                            <span>•</span>
                            <span>{guide.experience} years exp.</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">
                            ${guide.dailyRate}
                          </p>
                          <p className="text-xs text-muted-foreground">/day</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full mt-4"
                        asChild
                      >
                        <Link href={`/guides/${guide.id}`}>View Profile</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href={`/guides?region=${region.name}`}>
                  View All {region.name} Guides
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </section>

            {/* FAQs */}
            <section>
              <h2 className="text-2xl font-bold mb-6">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {details.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Safety Guidelines */}
            <Card className="border-amber-200 bg-amber-50/50">
              <CardContent className="p-6">
                <h3 className="font-bold flex items-center gap-2 mb-4">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  Safety Guidelines
                </h3>
                <ul className="space-y-3">
                  {details.safetyTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Best Time to Visit */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold flex items-center gap-2 mb-4">
                  <Thermometer className="h-5 w-5 text-primary" />
                  Best Time to Visit
                </h3>
                <p className="text-muted-foreground mb-4">{details.bestTime}</p>

                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  {[
                    "J",
                    "F",
                    "M",
                    "A",
                    "M",
                    "J",
                    "J",
                    "A",
                    "S",
                    "O",
                    "N",
                    "D",
                  ].map((month, i) => {
                    const isPeak = [2, 3, 4, 9, 10].includes(i);
                    const isShoulder = [1, 5, 8, 11].includes(i);
                    return (
                      <div
                        key={month + i}
                        className={`py-2 rounded ${
                          isPeak
                            ? "bg-emerald-500 text-white"
                            : isShoulder
                            ? "bg-amber-200"
                            : "bg-muted"
                        }`}
                      >
                        {month}
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-emerald-500" />
                    Peak
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-amber-200" />
                    Shoulder
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-muted" />
                    Off-season
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Difficulty</span>
                  <Badge variant="region">{details.difficulty}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">{details.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Max Altitude</span>
                  <span className="font-medium">{details.maxAltitude}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Available Guides
                  </span>
                  <span className="font-medium">{regionGuides.length}+</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegionPage;
