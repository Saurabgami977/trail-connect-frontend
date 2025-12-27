// app/regions/[slug]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  Users,
  Star,
  MapPin,
  Mountain,
  Thermometer,
  Shield,
  TrendingUp,
  ChevronRight,
  Compass,
  CheckCircle,
  AlertCircle,
  Snowflake,
  Sun,
  Trees,
  Cloud,
  User,
  Award,
  DollarSign,
  Heart,
  BarChart3,
  Route,
  BookOpen,
  Phone,
  Mail,
  Globe,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Eye,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getTrekkingRegionById } from "@/api/routes/trekking-regions";
import { Skeleton } from "@/components/ui/skeleton";
import { getTrekTemplates } from "@/api/routes/trek-template";
import { getVerifiedGuides } from "@/api/routes/guide";
import Image from "next/image";
// Types based on the API schemas
interface ApiRegion {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  image: string;
  gallery: string[];
  location: string;
  difficulty: "easy" | "moderate" | "challenging" | "hard";
  minAltitude: number;
  maxAltitude: number;
  avgDuration: number;
  avgDistance: number;
  bestSeasons: string[];
  permitsRequired: string[];
  permitCost: number;
  highlights: string[];
  statistics: {
    totalTreks: number;
    successRate: number;
    avgGroupSize: number;
    avgCostPerPerson: number;
  };
  requirements: {
    fitnessLevel: string;
    experience: string;
    gearRequired: string[];
  };
  popularity: number;
  featured: boolean;
  isActive: boolean;
}

interface TrekRoute {
  _id: string;
  name: string;
  slug: string;
  description: string;
  duration: number;
  distance: string;
  difficulty: "easy" | "moderate" | "challenging" | "hard";
  startPoint: string;
  endPoint: string;
  inclusions: string[];
  exclusions: string[];
  costBreakdown: {
    guidePerDay: number;
    permitsPerPerson: number;
    accommodationPerDay: number;
    mealsPerDay: number;
    transportPerPerson: number;
    guideTransportation: number;
    otherCosts: Array<{
      description: string;
      amount: number;
    }>;
  };
  bestTime: {
    months: string[];
    weather: string;
    temperatureRange: string;
  };
  isFeatured: boolean;
  extraServices: Array<{
    name: string;
    description: string;
    costPerPerson: number;
    isAvailable: boolean;
    isOptional: boolean;
  }>;
}

interface Guide {
  _id: string;
  user: {
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
  };
  type: "independent" | "company";
  totalTreksLed: number;
  totalParticipants: number;
  avgRating: number;
  responseRate: number;
  responseTime: number;
  specializations: string[];
  certifications: string[];
  yearsOfExperience: number;
  companyName?: string;
  bio: string;
  verificationStatus: "verified" | "pending" | "rejected";
  isFeatured: boolean;
  pricing: {
    dailyRate: number;
    minGroupSize?: number;
    maxGroupSize?: number;
  };
}

// Helper functions
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const getDifficultyLabel = (difficulty: string): string => {
  const map: Record<string, string> = {
    easy: "Easy",
    moderate: "Moderate",
    challenging: "Challenging",
    hard: "Hard",
  };
  return map[difficulty] || difficulty;
};

const getDifficultyColor = (difficulty: string): string => {
  const colorMap: Record<string, string> = {
    easy: "bg-emerald-500",
    moderate: "bg-amber-500",
    challenging: "bg-orange-500",
    hard: "bg-red-500",
  };
  return colorMap[difficulty] || "bg-gray-500";
};

const getDifficultyBadgeVariant = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return "success" as const;
    case "moderate":
      return "warning" as const;
    case "challenging":
    case "hard":
      return "destructive" as const;
    default:
      return "default" as const;
  }
};

const getSeasonIcon = (season: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    spring: <Sun className="h-4 w-4" />,
    summer: <Sun className="h-4 w-4" />,
    autumn: <Trees className="h-4 w-4" />,
    winter: <Snowflake className="h-4 w-4" />,
  };
  return iconMap[season] || <Calendar className="h-4 w-4" />;
};

const getSeasonLabel = (season: string): string => {
  const seasonMap: Record<string, string> = {
    spring: "Spring (Mar-May)",
    summer: "Summer (Jun-Aug)",
    autumn: "Autumn (Sep-Nov)",
    winter: "Winter (Dec-Feb)",
  };
  return seasonMap[season] || season;
};

export default function RegionDetailPage() {
  const { id: regionId } = useParams();
  const router = useRouter();

  // State for booking modal
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<TrekRoute | null>(null);

  // Fetch region data
  const {
    data: region,
    isLoading: isLoadingRegion,
    isError: isErrorRegion,
  } = useQuery({
    queryKey: ["region", regionId],
    queryFn: () => getTrekkingRegionById(regionId as string),
  });

  // Fetch trek routes for this region
  const { data: trekRoutes, isLoading: isLoadingRoutes } = useQuery({
    queryKey: ["region-trek-routes", regionId],
    queryFn: () => getTrekTemplates({ regionId: regionId as string }),
    enabled: !!region,
  });

  // Fetch guides for this region
  const { data: guides, isLoading: isLoadingGuides } = useQuery({
    queryKey: ["region-guides", regionId],
    queryFn: () => getVerifiedGuides({ regionId: regionId as string }),
    enabled: !!region,
  });

  // Calculate savings percentage (compared to average)
  const calculateSavings = () => {
    if (!region) return 25; // Default 25% savings
    const basePrice = region.statistics.avgCostPerPerson;
    const industryAverage = basePrice * 1.33; // Industry average is 33% higher
    const savings = ((industryAverage - basePrice) / industryAverage) * 100;
    return Math.round(savings);
  };

  // Get safety guidelines based on difficulty
  const getSafetyGuidelines = () => {
    if (!region) return [];

    const baseGuidelines = [
      "Always trek with a certified guide",
      "Carry adequate travel insurance covering high-altitude trekking",
      "Stay hydrated and maintain proper nutrition",
      "Follow altitude acclimatization schedules",
      "Carry emergency communication devices",
    ];

    if (region.difficulty === "challenging" || region.difficulty === "hard") {
      return [
        ...baseGuidelines,
        "Mandatory medical checkup before trek",
        "Carry portable oxygen for emergencies",
        "Daily health monitoring required",
        "Emergency evacuation plan in place",
        "Weather monitoring and contingency days",
      ];
    }

    return baseGuidelines;
  };

  // Get best time to visit data
  const getBestTimeData = () => {
    if (!region) return [];

    const seasonData = [
      {
        season: "Peak",
        months: region.bestSeasons.includes("spring")
          ? "Mar-May"
          : region.bestSeasons.includes("autumn")
          ? "Sep-Nov"
          : "Varies",
        description: "Perfect weather, clear skies, optimal conditions",
        color: "bg-emerald-100 border-emerald-300",
        icon: <Sun className="h-5 w-5 text-emerald-600" />,
      },
      {
        season: "Shoulder",
        months: region.bestSeasons.includes("spring")
          ? "Feb, Jun"
          : region.bestSeasons.includes("autumn")
          ? "Aug, Dec"
          : "Varies",
        description: "Good conditions, fewer crowds, better prices",
        color: "bg-amber-100 border-amber-300",
        icon: <Trees className="h-5 w-5 text-amber-600" />,
      },
      {
        season: "Off-season",
        months: region.bestSeasons.includes("summer")
          ? "Jul-Aug"
          : region.bestSeasons.includes("winter")
          ? "Dec-Feb"
          : "Monsoon/Winter",
        description: "Challenging weather, only for experienced trekkers",
        color: "bg-slate-100 border-slate-300",
        icon: <Cloud className="h-5 w-5 text-slate-600" />,
      },
    ];

    return seasonData;
  };

  // Handle booking
  const handleBookNow = (route: TrekRoute) => {
    setSelectedRoute(route);
    setShowBookingModal(true);
  };

  if (isLoadingRegion) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <Skeleton className="h-96 w-full rounded-xl mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isErrorRegion || !region) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Region Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The trekking region you're looking for doesn't exist or is currently
            unavailable.
          </p>
          <Button asChild>
            <Link href="/regions">Browse All Regions</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const savingsPercentage = calculateSavings();
  const safetyGuidelines = getSafetyGuidelines();
  const seasonData = getBestTimeData();
  const totalEstimatedCost = region.statistics.avgCostPerPerson;
  const totalTreks = region.statistics.totalTreks;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pb-16 overflow-hidden pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/90 to-slate-900/80" />

        {/* Background Image */}
        {region.image && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-xs brightness-50 scale-105"
            style={{
              backgroundImage: `url(${
                process.env.NEXT_PUBLIC_ClOUDFLARE_API + region.image
              })`,
            }}
          />
        )}

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-background/80 mb-6">
              <Link
                href="/regions"
                className="hover:text-white transition-colors"
              >
                All Regions
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="font-medium">{region.name}</span>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Badge
                    variant="accent"
                    className="text-white border-white/30"
                  >
                    <Compass className="h-3 w-3 mr-1" />
                    {region.location}
                  </Badge>
                  <Badge
                    className={`${getDifficultyColor(
                      region.difficulty
                    )} text-white border-0`}
                  >
                    {getDifficultyLabel(region.difficulty)}
                  </Badge>
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
                    <Star className="h-3 w-3 fill-white" />
                    <span>{Math.round(region.popularity / 10)}/10 Rating</span>
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-background">
                  {region.name} Region
                </h1>

                <p className="text-xl text-background mb-8 max-w-3xl">
                  {region.shortDescription}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-background/80">Duration</div>
                      <div className="font-bold text-white">
                        {region.avgDuration} days
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                      <Mountain className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-background/80">
                        Max Altitude
                      </div>
                      <div className="font-bold text-white">
                        {region.maxAltitude.toLocaleString()}m
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-background/80">
                        Success Rate
                      </div>
                      <div className="font-bold text-white">
                        {region.statistics.successRate}%
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-background/80">
                        Treks Completed
                      </div>
                      <div className="font-bold text-white">{totalTreks}+</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="bg-white text-emerald-700 hover:bg-white/90"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Save Region
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    <Route className="h-4 w-4 mr-2" />
                    View Routes
                  </Button>
                  <Button
                    size="lg"
                    variant="ghost"
                    className="text-white hover:bg-white/10"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Expert
                  </Button>
                </div>
              </div>

              {/* Pricing Card */}
              <Card className="w-full lg:w-96 bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-emerald-500 text-white border-0">
                      Save {savingsPercentage}%
                    </Badge>
                    <span className="text-sm text-white/80">
                      vs other agencies
                    </span>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm text-white/60 mb-1">
                      Starting from
                    </div>
                    <div className="text-4xl font-bold text-white">
                      {formatCurrency(totalEstimatedCost)}
                    </div>
                    <div className="text-sm text-white/60">per person</div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/80">
                        All permits included
                      </span>
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/80">Certified guide</span>
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/80">Accommodation</span>
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/80">Meals included</span>
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full bg-white text-emerald-700 hover:bg-white/90"
                  >
                    <DollarSign className="h-4 w-4 mr-2" />
                    Book Your Trek
                  </Button>

                  <div className="text-center text-sm text-white/60 mt-4">
                    Free cancellation up to 30 days before trek
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Tabs Navigation */}
          <Tabs defaultValue="overview" className="mb-12">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="routes">Trek Routes</TabsTrigger>
              <TabsTrigger value="guides">Available Guides</TabsTrigger>
              <TabsTrigger value="planning">Trip Planning</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Region Description */}
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-4">
                        About {region.name} Region
                      </h2>
                      <div className="prose prose-emerald max-w-none">
                        <p className="text-muted-foreground mb-4">
                          {region.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Highlights */}
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-4">
                        Region Highlights
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {region.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="p-1 bg-emerald-100 rounded mt-0.5">
                              <Star className="h-4 w-4 text-emerald-600" />
                            </div>
                            <span className="text-muted-foreground">
                              {highlight}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Statistics */}
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-4">
                        Region Statistics
                      </h2>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-emerald-600">
                            {region.statistics.totalTreks}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Total Treks
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-emerald-600">
                            {region.statistics.successRate}%
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Success Rate
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-emerald-600">
                            {region.statistics.avgGroupSize}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Avg Group Size
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-emerald-600">
                            {Math.round(region.popularity / 10)}/10
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Popularity Score
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Best Time to Visit */}
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-emerald-600" />
                        Best Time to Visit
                      </h2>
                      <div className="space-y-4">
                        {seasonData.map((season, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-lg border ${season.color}`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                {season.icon}
                                <span className="font-semibold">
                                  {season.season}
                                </span>
                              </div>
                              <span className="text-sm font-medium">
                                {season.months}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {season.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Safety Guidelines */}
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Shield className="h-5 w-5 text-emerald-600" />
                        Safety Guidelines
                      </h2>
                      <div className="space-y-3">
                        {safetyGuidelines.map((guideline, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5" />
                            <span className="text-sm text-muted-foreground">
                              {guideline}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Permits Required */}
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold mb-4">
                        Required Permits
                      </h2>
                      <div className="space-y-3">
                        {region.permitsRequired.map((permit, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <span className="text-sm">{permit}</span>
                            <Badge variant="outline">
                              ${region.permitCost}
                            </Badge>
                          </div>
                        ))}
                        <div className="pt-3 border-t">
                          <div className="flex items-center justify-between font-medium">
                            <span>Total Permit Cost</span>
                            <span>
                              $
                              {region.permitsRequired.length *
                                region.permitCost}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Trek Routes Tab */}
            <TabsContent value="routes" className="mt-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">
                  Available Trekking Routes
                </h2>
                <p className="text-muted-foreground">
                  Choose from our carefully curated trekking routes in the{" "}
                  {region.name} region
                </p>
              </div>

              {isLoadingRoutes ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2].map((i) => (
                    <Skeleton key={i} className="h-64 w-full rounded-lg" />
                  ))}
                </div>
              ) : trekRoutes && trekRoutes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {trekRoutes.map((route) => (
                    <Card
                      key={route._id}
                      className="group hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-0">
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold group-hover:text-emerald-600 transition-colors">
                                {route.name}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge
                                  variant={getDifficultyBadgeVariant(
                                    route.difficulty
                                  )}
                                >
                                  {getDifficultyLabel(route.difficulty)}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  {route.duration} days • {route.distance} km
                                </span>
                              </div>
                            </div>
                            {route.isFeatured && (
                              <Badge variant="accent">Featured</Badge>
                            )}
                          </div>

                          <p className="text-muted-foreground mb-4 line-clamp-2">
                            {route.description}
                          </p>

                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">
                                Start/End
                              </div>
                              <div className="font-medium">
                                {route.startPoint} → {route.endPoint}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">
                                Best Time
                              </div>
                              <div className="font-medium">
                                {route.bestTime.months.slice(0, 3).join(", ")}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t">
                            <div>
                              <div className="text-sm text-muted-foreground">
                                Starting from
                              </div>
                              <div className="text-xl font-bold text-emerald-600">
                                {formatCurrency(
                                  route.costBreakdown.guidePerDay *
                                    route.duration +
                                    route.costBreakdown.permitsPerPerson +
                                    route.costBreakdown.transportPerPerson
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/routes/${route._id}`}>
                                  Details
                                </Link>
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleBookNow(route)}
                              >
                                Book Now
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Route className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">
                      No Trek Routes Available
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Trek routes for this region are being updated. Please
                      check back soon.
                    </p>
                    <Button variant="outline" asChild>
                      <Link href="/treks">Browse All Treks</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Guides Tab */}
            <TabsContent value="guides" className="mt-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">
                  Certified Trekking Guides
                </h2>
                <p className="text-muted-foreground">
                  Connect with experienced guides specializing in the{" "}
                  {region.name} region
                </p>
              </div>

              {isLoadingGuides ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-80 w-full rounded-lg" />
                  ))}
                </div>
              ) : guides && guides.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {guides.map((guide) => (
                    <Card
                      key={guide._id}
                      className="group hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-6">
                        {/* Guide Header */}
                        <div className="flex items-start gap-4 mb-4">
                          <div className="relative">
                            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                              {guide.user.avatar ? (
                                <Image
                                  src={
                                    process.env.NEXT_PUBLIC_ClOUDFLARE_API +
                                    guide.user.avatar
                                  }
                                  alt={guide.user.name}
                                  width={64}
                                  height={64}
                                  className="w-16 h-16 rounded-full object-cover"
                                />
                              ) : (
                                <User className="h-8 w-8 text-emerald-600" />
                              )}
                            </div>
                            {guide.verificationStatus === "verified" && (
                              <div className="absolute -bottom-1 -right-1">
                                <Badge className="bg-emerald-500 text-white text-xs px-0.5 py-0.5 ">
                                  ✓ Verified
                                </Badge>
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg">
                              {guide.user.firstName} {guide.user.lastName}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {guide.type === "company"
                                ? guide.companyName
                                : "Independent Guide"}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < Math.floor(guide.avgRating)
                                      ? "fill-amber-400 text-amber-400"
                                      : "fill-muted text-muted-foreground"
                                  }`}
                                />
                              ))}
                              <span className="text-sm ml-1">
                                ({guide.totalTreksLed})
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Guide Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center p-2 bg-slate-50 rounded">
                            <div className="text-lg font-bold text-emerald-600">
                              {guide.yearsOfExperience}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Years
                            </div>
                          </div>
                          <div className="text-center p-2 bg-slate-50 rounded">
                            <div className="text-lg font-bold text-emerald-600">
                              {guide.totalTreksLed}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Treks Led
                            </div>
                          </div>
                        </div>

                        {/* Specializations */}
                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-2">
                            Specializations
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {guide.specializations
                              .slice(0, 3)
                              .map((spec, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {spec}
                                </Badge>
                              ))}
                            {guide.specializations.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{guide.specializations.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Languages */}
                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-2">
                            Languages Spoken
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {guide?.user?.languages
                              .slice(0, 3)
                              .map((spec, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {spec}
                                </Badge>
                              ))}
                            {guide?.user?.languages.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{guide?.user?.languages.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Pricing */}
                        <div className="mb-6">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              Daily Rate
                            </span>
                            <span className="font-bold text-emerald-600">
                              {formatCurrency(guide.pricing.dailyRate)}/day
                            </span>
                          </div>
                          {guide.pricing.minGroupSize && (
                            <div className="text-xs text-muted-foreground mt-1">
                              Min. {guide.pricing.minGroupSize} people
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 cursor-pointer"
                            onClick={() => router.push(`/guides/${guide._id}`)}
                          >
                            <Eye className="h-3 w-3 mr-2" />
                            View Profile
                          </Button>
                          <Button size="sm" className="flex-1">
                            <Mail className="h-3 w-3 mr-2" />
                            Hire
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">
                      No Guides Available
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Guides for this region will be available soon. Contact us
                      for recommendations.
                    </p>
                    <Button variant="outline" asChild>
                      <Link href="/contact">Contact Support</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Planning Tab */}
            <TabsContent value="planning" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Requirements */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">
                      Trek Requirements
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">
                          Fitness Level
                        </h3>
                        <div className="p-4 bg-emerald-50 rounded-lg">
                          <p className="text-muted-foreground">
                            {region.requirements.fitnessLevel}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3">
                          Required Experience
                        </h3>
                        <div className="p-4 bg-amber-50 rounded-lg">
                          <p className="text-muted-foreground">
                            {region.requirements.experience}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3">
                          Essential Gear
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          {region.requirements.gearRequired.map(
                            (item, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 p-2 bg-slate-50 rounded"
                              >
                                <CheckCircle className="h-4 w-4 text-emerald-500" />
                                <span className="text-sm">{item}</span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Cost Breakdown */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Cost Breakdown</h2>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Guide (per day)</span>
                        <span className="font-medium">
                          {formatCurrency(150)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Permits & Fees</span>
                        <span className="font-medium">
                          {formatCurrency(
                            region.permitCost * region.permitsRequired.length
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Accommodation (teahouse)</span>
                        <span className="font-medium">
                          {formatCurrency(25)}/day
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Meals</span>
                        <span className="font-medium">
                          {formatCurrency(35)}/day
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Transportation</span>
                        <span className="font-medium">
                          {formatCurrency(350)}
                        </span>
                      </div>
                      <div className="border-t pt-4 mt-2">
                        <div className="flex justify-between items-center font-bold text-lg">
                          <span>Estimated Total</span>
                          <span className="text-emerald-600">
                            {formatCurrency(totalEstimatedCost)}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Save {savingsPercentage}% compared to other agencies
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 p-4 bg-emerald-50 rounded-lg">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Award className="h-5 w-5 text-emerald-600" />
                        What&apos;s Included
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                          Certified trekking guide
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                          All necessary permits
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                          Accommodation during trek
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                          Three meals daily
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                          Emergency evacuation insurance
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-emerald-600 to-emerald-800 border-0">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Trek {region.name}?
              </h2>
              <p className="text-white/80 text-lg mb-6 max-w-2xl mx-auto">
                Join {totalTreks}+ satisfied trekkers who have experienced the
                magic of {region.name} with us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-emerald-700 hover:bg-white/90"
                >
                  <DollarSign className="h-5 w-5 mr-2" />
                  Book Your Adventure
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Speak to an Expert
                </Button>
              </div>
              <div className="mt-6 text-white/60 text-sm">
                Free consultation • Best price guarantee • 24/7 support during
                trek
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <div className="border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="font-bold text-lg">Need Help Planning?</h3>
              <p className="text-muted-foreground">
                Our trekking experts are here to help
              </p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Email Us
              </Button>
              <Button>
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
