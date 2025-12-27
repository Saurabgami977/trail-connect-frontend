// app/regions/page.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Search,
  Filter,
  MapPin,
  Mountain,
  Calendar,
  Clock,
  Users,
  Star,
  ArrowRight,
  Shield,
  Thermometer,
  Compass,
  TrendingUp,
  Snowflake,
  Sun,
  Trees,
  X,
  Sparkles,
  BarChart3,
} from "lucide-react";
import type {
  DifficultyFilter,
  SeasonFilter,
  AltitudeFilter,
  SortOption,
} from "@/types/trekking-regions";
import heroImage from "@/assets/hero-mountains.jpg";
import { useQuery } from "@tanstack/react-query";
import { getTrekkingRegions } from "@/api/routes/trekking-regions";
import { Skeleton } from "@/components/ui/skeleton";

// Define API region type based on the response
interface ApiRegion {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  image: string;
  location: string;
  difficulty: "easy" | "moderate" | "challenging" | "hard";
  minAltitude: number;
  maxAltitude: number;
  avgDuration: number;
  bestSeasons: string[];
  popularity: number;
  statistics: {
    avgCostPerPerson: number;
    avgGroupSize: number;
    successRate: number;
    totalTreks: number;
  };
  featured: boolean;
  isActive: boolean;
}

// Convert API region to our UI region type
interface Region {
  _id: string;
  name: string;
  description: string;
  difficulty: "Easy" | "Moderate" | "Challenging" | "Hard";
  duration: string;
  location: string;
  guides: number;
  rating: number;
  startingPrice: number;
}

interface RegionDetails {
  description: string;
  seasonality: string[];
  altitudeRange: string;
  physicalDemand: number;
  scenicBeauty: number;
  culturalExperience: number;
}

// Helper function to map API difficulty to UI difficulty
const mapDifficulty = (
  apiDifficulty: string
): "Easy" | "Moderate" | "Challenging" | "Hard" => {
  switch (apiDifficulty) {
    case "easy":
      return "Easy";
    case "moderate":
      return "Moderate";
    case "challenging":
    case "hard":
      return "Challenging";
    default:
      return "Moderate";
  }
};

// Helper function to format duration
const formatDuration = (days: number): string => {
  if (days <= 7) return `${days} days`;
  const weeks = Math.floor(days / 7);
  const remainingDays = days % 7;
  if (remainingDays === 0) return `${weeks} week${weeks > 1 ? "s" : ""}`;
  return `${weeks} week${weeks > 1 ? "s" : ""} ${remainingDays} day${
    remainingDays > 1 ? "s" : ""
  }`;
};

// Helper function to format altitude range
const formatAltitudeRange = (min: number, max: number): string => {
  return `${min.toLocaleString()}m - ${max.toLocaleString()}m`;
};

// Helper function to map season API values to UI values
const mapSeasonToUI = (season: string): string => {
  const seasonMap: Record<string, string> = {
    spring: "Mar-May",
    summer: "Jun-Aug",
    autumn: "Sep-Nov",
    winter: "Dec-Feb",
  };
  return seasonMap[season] || season;
};

// Type guard for difficulty string
const isValidDifficulty = (
  difficulty: string
): difficulty is Region["difficulty"] => {
  return ["Easy", "Moderate", "Challenging", "Hard"].includes(difficulty);
};

export default function AllRegionsPage() {
  // State with proper typing
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [difficultyFilter, setDifficultyFilter] =
    useState<DifficultyFilter>("all");
  const [seasonFilter, setSeasonFilter] = useState<SeasonFilter>("all");
  const [altitudeFilter, setAltitudeFilter] = useState<AltitudeFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("popularity");

  // Fetch regions from API
  const {
    data: apiRegions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-regions"],
    queryFn: getTrekkingRegions,
  });

  // Transform API data to UI format
  const allRegions = useMemo((): Region[] => {
    if (!apiRegions) return [];

    return apiRegions.map(
      (region: ApiRegion) =>
        ({
          _id: region._id,
          name: region.name,
          description: region.shortDescription || region.description,
          difficulty: mapDifficulty(region.difficulty),
          duration: formatDuration(region.avgDuration),
          location: region.location,
          guides: region.statistics?.avgGroupSize || 8, // Using avgGroupSize as guide count proxy
          rating: Math.round((region.popularity || 80) / 10), // Convert popularity (0-100) to rating (1-10)
          startingPrice: region.statistics?.avgCostPerPerson || 0,
          // Store original API data for filtering
          _apiData: region,
        } as Region & { _apiData?: ApiRegion })
    );
  }, [apiRegions]);

  // Create region details from API data
  const regionDetails = useMemo((): Record<string, RegionDetails> => {
    if (!apiRegions) return {};

    const details: Record<string, RegionDetails> = {};

    apiRegions.forEach((region: ApiRegion) => {
      // Calculate physical demand based on difficulty and altitude
      let physicalDemand = 5;
      if (region.difficulty === "easy") physicalDemand = 3;
      if (region.difficulty === "moderate") physicalDemand = 6;
      if (region.difficulty === "challenging") physicalDemand = 8;
      if (region.difficulty === "hard") physicalDemand = 9;

      // Adjust based on altitude
      if (region.maxAltitude > 5000)
        physicalDemand = Math.min(10, physicalDemand + 2);
      if (region.maxAltitude > 4500)
        physicalDemand = Math.min(10, physicalDemand + 1);

      // Calculate scenic beauty based on popularity
      const scenicBeauty = Math.min(
        10,
        Math.round((region.popularity || 80) / 10)
      );

      // Calculate cultural experience (placeholder)
      const culturalExperience = 8; // Most regions have good cultural experience

      details[region.slug] = {
        description: region.description,
        seasonality: region.bestSeasons.map(mapSeasonToUI),
        altitudeRange: formatAltitudeRange(
          region.minAltitude,
          region.maxAltitude
        ),
        physicalDemand,
        scenicBeauty,
        culturalExperience,
      };
    });

    return details;
  }, [apiRegions]);

  // Helper to get region details safely
  const getRegionDetails = (regionId: string): RegionDetails | undefined => {
    return regionDetails[regionId];
  };

  // Helper to check if region matches season filter
  const matchesSeasonFilter = (
    regionId: string,
    filter: SeasonFilter
  ): boolean => {
    if (filter === "all") return true;

    const details = regionDetails[regionId];
    if (!details) return true;

    // Map season UI strings to filter values
    const seasonToFilterMap: Record<string, SeasonFilter[]> = {
      "Mar-May": ["spring"],
      "Apr-May": ["spring"],
      "Jun-Aug": ["summer"],
      "Sep-Nov": ["autumn"],
      "Oct-Nov": ["autumn"],
      "Dec-Feb": ["winter"],
    };

    // Check if any of the region's seasons match the filter
    return details.seasonality.some((season) => {
      const filters = seasonToFilterMap[season] || [];
      return filters.includes(filter);
    });
  };

  // Helper to check if region matches altitude filter
  const matchesAltitudeFilter = (
    region: Region & { _apiData?: ApiRegion },
    filter: AltitudeFilter
  ): boolean => {
    if (filter === "all") return true;

    const maxAltitude = region._apiData?.maxAltitude || 0;

    switch (filter) {
      case "low":
        return maxAltitude < 3000;
      case "medium":
        return maxAltitude >= 3000 && maxAltitude <= 4500;
      case "high":
        return maxAltitude > 4500;
      default:
        return true;
    }
  };

  // Filter regions with proper typing
  const filteredRegions = useMemo(() => {
    return allRegions.filter(
      (region): region is Region & { _apiData?: ApiRegion } => {
        // Type guard for region difficulty
        if (!isValidDifficulty(region.difficulty)) {
          console.warn(
            `Invalid difficulty for region ${region.name}: ${region.difficulty}`
          );
          return false;
        }

        // Search filter
        if (
          searchQuery &&
          !region.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !region.description.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }

        // Difficulty filter
        if (difficultyFilter !== "all") {
          const difficultyMap: Record<
            DifficultyFilter,
            Region["difficulty"][]
          > = {
            all: ["Easy", "Moderate", "Challenging", "Hard"],
            easy: ["Easy"],
            moderate: ["Moderate"],
            challenging: ["Challenging", "Hard"],
          };

          if (!difficultyMap[difficultyFilter].includes(region.difficulty)) {
            return false;
          }
        }

        // Season filter
        if (!matchesSeasonFilter(region._id, seasonFilter)) {
          return false;
        }

        // Altitude filter
        if (!matchesAltitudeFilter(region, altitudeFilter)) {
          return false;
        }

        return true;
      }
    );
  }, [allRegions, searchQuery, difficultyFilter, seasonFilter, altitudeFilter]);

  // Sort regions with proper typing
  const sortedRegions = useMemo(() => {
    const regions = [...filteredRegions];

    switch (sortBy) {
      case "name":
        return regions.sort((a, b) => a.name.localeCompare(b.name));
      case "difficulty": {
        const difficultyOrder: Record<Region["difficulty"], number> = {
          Easy: 1,
          Moderate: 2,
          Challenging: 3,
          Hard: 4,
        };
        return regions.sort(
          (a, b) =>
            difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
        );
      }
      case "guides":
        return regions.sort((a, b) => b.guides - a.guides);
      case "popularity":
      default:
        return regions.sort((a, b) => b.rating - a.rating); // Using rating as popularity proxy
    }
  }, [filteredRegions, sortBy]);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setDifficultyFilter("all");
    setSeasonFilter("all");
    setAltitudeFilter("all");
  };

  // Get difficulty color with proper typing
  const getDifficultyColor = (difficulty: Region["difficulty"]): string => {
    const colorMap: Record<Region["difficulty"], string> = {
      Easy: "bg-emerald-500",
      Moderate: "bg-amber-500",
      Challenging: "bg-orange-500",
      Hard: "bg-red-500",
    };
    return colorMap[difficulty];
  };

  // Get season icons with proper typing
  const getSeasonIcon = (season: string): React.ReactNode => {
    const iconMap: Record<string, React.ReactNode> = {
      "Mar-May": <Sun className="h-4 w-4" />,
      "Apr-May": <Sun className="h-4 w-4" />,
      "Jun-Aug": <Sparkles className="h-4 w-4" />,
      "Sep-Nov": <Trees className="h-4 w-4" />,
      "Oct-Nov": <Trees className="h-4 w-4" />,
      "Dec-Feb": <Snowflake className="h-4 w-4" />,
      "May-Oct": <Sun className="h-4 w-4" />,
    };

    return iconMap[season] || <Calendar className="h-4 w-4" />;
  };

  // Get badge variant based on difficulty
  const getDifficultyBadgeVariant = (difficulty: Region["difficulty"]) => {
    switch (difficulty) {
      case "Easy":
        return "success" as const;
      case "Moderate":
        return "warning" as const;
      case "Challenging":
        return "destructive" as const;
      case "Hard":
        return "destructive" as const;
    }
  };

  // Check if any filter is active
  const isFilterActive =
    searchQuery ||
    difficultyFilter !== "all" ||
    seasonFilter !== "all" ||
    altitudeFilter !== "all";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-[400px] w-full rounded-lg" />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Regions</h1>
          <p className="text-muted-foreground mb-6">
            Failed to load trekking regions. Please try again later.
          </p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pb-16 overflow-hidden pt-32">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-top bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage.src})` }}
        >
          <div className="absolute inset-0 bg-linear-to-b from-emerald-900/70 via-emerald-900/50 to-emerald-900/80" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="accent" className="mb-4">
              <Compass className="h-3 w-3 mr-1" />
              Explore All Regions
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-background">
              Discover Nepal&apos;s Trekking Regions
            </h1>

            <p className="text-xl text-background mb-8">
              From the legendary Everest to the remote Kanchenjunga, explore all
              trekking regions in one place. Compare, filter, and find your
              perfect Himalayan adventure.
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="max-w-4xl mx-auto bg-card/50 backdrop-blur-sm border rounded-2xl p-4 md:p-6 shadow-lg">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search regions by name or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select
                value={sortBy}
                onValueChange={(value: SortOption) => setSortBy(value)}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Most Popular
                    </div>
                  </SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="difficulty">Difficulty</SelectItem>
                  <SelectItem value="guides">Available Guides</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Filter className="h-4 w-4" />
                Filters:
              </div>

              <Select
                value={difficultyFilter}
                onValueChange={(value: DifficultyFilter) =>
                  setDifficultyFilter(value)
                }
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="challenging">Challenging</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={seasonFilter}
                onValueChange={(value: SeasonFilter) => setSeasonFilter(value)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Best Season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Seasons</SelectItem>
                  <SelectItem value="spring">Spring (Mar-May)</SelectItem>
                  <SelectItem value="summer">Summer (Jun-Aug)</SelectItem>
                  <SelectItem value="autumn">Autumn (Sep-Nov)</SelectItem>
                  <SelectItem value="winter">Winter (Dec-Feb)</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={altitudeFilter}
                onValueChange={(value: AltitudeFilter) =>
                  setAltitudeFilter(value)
                }
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Altitude" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Altitudes</SelectItem>
                  <SelectItem value="low">Low (&lt;3,000m)</SelectItem>
                  <SelectItem value="medium">Medium (3,000-4,500m)</SelectItem>
                  <SelectItem value="high">High (&gt;4,500m)</SelectItem>
                </SelectContent>
              </Select>

              {isFilterActive && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="ml-auto"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear All
                </Button>
              )}
            </div>

            <div className="mt-4 text-sm text-foreground">
              Showing {sortedRegions.length} of {allRegions.length} regions
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 pb-16 pt-20">
        {/* Regions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {sortedRegions.map((region) => {
            const details = getRegionDetails(region._id);

            return (
              <Card
                key={region._id}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <Link href={`/regions/${region._id}`}>
                  <CardContent className="p-0">
                    {/* Region Header */}
                    <div
                      className="h-48 relative overflow-hidden bg-gradient-to-br from-emerald-900/30 to-slate-900/30"
                      style={{
                        backgroundImage: `linear-gradient(135deg, var(--color-emerald-600)/20, var(--color-slate-900)/20)`,
                      }}
                    >
                      {/* Background Image */}
                      <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${heroImage.src})` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/70 via-emerald-900/50 to-emerald-900/80" />
                      </div>

                      {/* Badges */}
                      <div className="absolute top-4 left-4">
                        <Badge
                          className={`${getDifficultyColor(
                            region.difficulty
                          )} text-white border-0`}
                        >
                          {region.difficulty}
                        </Badge>
                      </div>

                      <div className="absolute top-4 right-4">
                        <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
                          <Users className="h-3 w-3" />
                          <span>{region.guides}+ guides</span>
                        </div>
                      </div>

                      <div className="absolute bottom-4 left-4">
                        <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
                          <MapPin className="h-3 w-3" />
                          <span>{region.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Region Content */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                          {region.name}
                        </h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span className="font-medium">
                            {region.rating}/10
                          </span>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {details?.description || region.description}
                      </p>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="text-xs text-muted-foreground">
                              Duration
                            </div>
                            <div className="font-medium">{region.duration}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Thermometer className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="text-xs text-muted-foreground">
                              Altitude
                            </div>
                            <div className="font-medium">
                              {details?.altitudeRange || "Varies"}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Seasons */}
                      {details?.seasonality && (
                        <div className="mb-4">
                          <div className="text-xs text-muted-foreground mb-2">
                            Best Seasons
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {details.seasonality.map((season, i) => (
                              <div
                                key={`${season}-${i}`}
                                className="flex items-center gap-1 px-2 py-1 bg-emerald-50 rounded text-sm"
                              >
                                {getSeasonIcon(season)}
                                <span>{season}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Rating Bars */}
                      {details && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-xs text-muted-foreground">
                              Physical Demand
                            </div>
                            <div className="text-xs font-medium">
                              {details.physicalDemand}/10
                            </div>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-red-500 rounded-full"
                              style={{
                                width: `${details.physicalDemand * 10}%`,
                              }}
                            />
                          </div>

                          <div className="flex items-center justify-between mb-1 mt-2">
                            <div className="text-xs text-muted-foreground">
                              Scenic Beauty
                            </div>
                            <div className="text-xs font-medium">
                              {details.scenicBeauty}/10
                            </div>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-500 rounded-full"
                              style={{ width: `${details.scenicBeauty * 10}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Action Button */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="text-sm text-muted-foreground">
                          From{" "}
                          <span className="font-bold text-primary">
                            ${region.startingPrice}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="group-hover:bg-primary group-hover:text-primary-foreground"
                        >
                          Explore Region
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>

        {/* Comparison Table */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Region Comparison</h2>
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              Compare Regions
            </Button>
          </div>

          <div className="bg-card border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-4 font-semibold">Region</th>
                    <th className="text-left p-4 font-semibold">Difficulty</th>
                    <th className="text-left p-4 font-semibold">Duration</th>
                    <th className="text-left p-4 font-semibold">Best Season</th>
                    <th className="text-left p-4 font-semibold">
                      Max Altitude
                    </th>
                    <th className="text-left p-4 font-semibold">Guides</th>
                    <th className="text-left p-4 font-semibold">Price From</th>
                    <th className="text-left p-4 font-semibold"></th>
                  </tr>
                </thead>
                <tbody>
                  {allRegions.slice(0, 10).map((region) => {
                    const details = getRegionDetails(region._id);
                    const maxAltitude = region._apiData?.maxAltitude || 0;

                    return (
                      <tr
                        key={region._id}
                        className="border-t hover:bg-muted/50"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-3 h-3 rounded-full ${getDifficultyColor(
                                region.difficulty
                              )}`}
                            />
                            <div>
                              <div className="font-medium">{region.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {region.location}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge
                            variant={getDifficultyBadgeVariant(
                              region.difficulty
                            )}
                          >
                            {region.difficulty}
                          </Badge>
                        </td>
                        <td className="p-4">{region.duration}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            {details?.seasonality?.[0] &&
                              getSeasonIcon(details.seasonality[0])}
                            <span>{details?.seasonality?.[0] || "Varies"}</span>
                          </div>
                        </td>
                        <td className="p-4">{maxAltitude.toLocaleString()}m</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span>{region.guides}</span>
                          </div>
                        </td>
                        <td className="p-4 font-bold text-primary">
                          ${region.startingPrice}
                        </td>
                        <td className="p-4">
                          <Button size="sm" variant="ghost" asChild>
                            <Link href={`/regions/${region._id}`}>
                              View
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Common Questions About Trekking Regions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="region-choice">
              <AccordionTrigger className="text-left">
                How do I choose the right trekking region?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Consider your fitness level, trekking experience, time
                available, budget, and what you want to experience (culture vs.
                scenery vs. challenge). Everest is iconic but crowded, Annapurna
                offers diversity, Langtang is accessible, while remote regions
                like Kanchenjunga offer pristine wilderness.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="permits-required">
              <AccordionTrigger className="text-left">
                Which regions require special permits?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Restricted areas like Upper Mustang, Manaslu, and Kanchenjunga
                require special permits that must be arranged through registered
                trekking agencies. Everest and Annapurna require TIMS and
                national park permits which are easier to obtain. Your guide
                will handle all permit arrangements.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="best-first-trek">
              <AccordionTrigger className="text-left">
                What&apos;s the best region for first-time trekkers?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                For beginners, we recommend the Annapurna region (especially
                Poon Hill or ABC), Langtang Valley, or lower Everest region
                treks. These offer good infrastructure, moderate difficulty, and
                gradual altitude gain. Avoid high-altitude treks like Everest
                Base Camp if you&apos;re new to trekking.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>
    </div>
  );
}
