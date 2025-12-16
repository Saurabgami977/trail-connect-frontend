// app/treks/page.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Calendar,
  Users,
  DollarSign,
  MapPin,
  Mountain,
  Clock,
  Eye,
  UserPlus,
  ChevronRight,
  Search,
  Filter,
  TrendingDown,
  TrendingUp,
  CalendarDays,
  Lock,
  Globe,
  Star,
  CheckCircle,
  AlertCircle,
  Share2,
  Calculator,
  UsersRound,
  Sparkles,
  Heart,
  BarChart3,
  X,
  Plus,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { Trek } from "@/types/create-trek";

// Mock data for created treks
const MOCK_TREKS: Trek[] = [
  {
    id: "trek-1",
    title: "Everest Base Camp - April Departure",
    description:
      "Classic EBC trek with experienced Sherpa guide. Perfect for first-time high-altitude trekkers.",
    regionId: "everest",
    difficulty: "Challenging",
    duration: 14,
    startDate: new Date("2026-04-15"),
    endDate: new Date("2026-04-28"),
    maxParticipants: 12,
    currentParticipants: 4,
    isPublic: true,
    status: "open",
    createdBy: "user123",
    createdAt: new Date("2026-01-10"),
    totalCost: 4200,
    costPerPerson: 1050,
    itinerary: [],
    services: [],
    participants: [],
    guides: [],
    requests: [],
  },
  {
    id: "trek-2",
    title: "Annapurna Circuit - Small Group",
    description:
      "Small group trek around Annapurna. Focus on culture and sustainable tourism.",
    regionId: "annapurna",
    difficulty: "Moderate",
    duration: 18,
    startDate: new Date("2026-05-01"),
    endDate: new Date("2026-05-18"),
    maxParticipants: 8,
    currentParticipants: 6,
    isPublic: true,
    status: "open",
    createdBy: "user456",
    createdAt: new Date("2026-01-05"),
    totalCost: 3600,
    costPerPerson: 600,
    itinerary: [],
    services: [],
    participants: [],
    guides: [],
    requests: [],
  },
  {
    id: "trek-3",
    title: "Langtang Valley Photography Trek",
    description:
      "Photography-focused trek with professional photographer guide. Limited to 6 people.",
    regionId: "langtang",
    difficulty: "Moderate",
    duration: 10,
    startDate: new Date("2026-03-20"),
    endDate: new Date("2026-03-29"),
    maxParticipants: 6,
    currentParticipants: 3,
    isPublic: false,
    status: "open",
    createdBy: "user789",
    createdAt: new Date("2026-01-15"),
    totalCost: 3000,
    costPerPerson: 1000,
    itinerary: [],
    services: [],
    participants: [],
    guides: [],
    requests: [],
  },
  {
    id: "trek-4",
    title: "Upper Mustang Cultural Expedition",
    description:
      "Explore the forbidden kingdom with cultural expert. Includes monastery visits and local homestays.",
    regionId: "upperMustang",
    difficulty: "Moderate",
    duration: 15,
    startDate: new Date("2026-06-10"),
    endDate: new Date("2026-06-24"),
    maxParticipants: 10,
    currentParticipants: 2,
    isPublic: true,
    status: "open",
    createdBy: "user101",
    createdAt: new Date("2026-01-20"),
    totalCost: 5000,
    costPerPerson: 2500,
    itinerary: [],
    services: [],
    participants: [],
    guides: [],
    requests: [],
  },
  {
    id: "trek-5",
    title: "Manaslu Circuit - Early Spring",
    description:
      "Less crowded alternative to Annapurna. Remote and pristine trekking experience.",
    regionId: "manaslu",
    difficulty: "Hard",
    duration: 21,
    startDate: new Date("2026-03-01"),
    endDate: new Date("2026-03-21"),
    maxParticipants: 8,
    currentParticipants: 5,
    isPublic: true,
    status: "open",
    createdBy: "user202",
    createdAt: new Date("2026-01-08"),
    totalCost: 6300,
    costPerPerson: 1260,
    itinerary: [],
    services: [],
    participants: [],
    guides: [],
    requests: [],
  },
  {
    id: "trek-6",
    title: "Family-Friendly Poon Hill Trek",
    description:
      "Perfect for families with children. Shorter days, comfortable accommodation.",
    regionId: "annapurna",
    difficulty: "Easy",
    duration: 7,
    startDate: new Date("2026-04-05"),
    endDate: new Date("2026-04-11"),
    maxParticipants: 12,
    currentParticipants: 8,
    isPublic: true,
    status: "open",
    createdBy: "user303",
    createdAt: new Date("2026-01-12"),
    totalCost: 2100,
    costPerPerson: 262.5,
    itinerary: [],
    services: [],
    participants: [],
    guides: [],
    requests: [],
  },
];

// Fixed cost breakdown structure
interface CostBreakdownItem {
  label: string;
  value: number;
  perPerson: boolean;
  description?: string;
}

interface DetailedCostBreakdown {
  startingPrice: number;
  perPerson: number;
  breakdown: CostBreakdownItem[];
  savings?: number;
}

export default function TreksListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("open");
  const [dateFilter, setDateFilter] = useState("upcoming");
  const [sortBy, setSortBy] = useState("costPerPerson");
  const [expandedTrekId, setExpandedTrekId] = useState<string | null>(null);

  // Get region name from ID
  const getRegionName = (regionId: string) => {
    const regions: Record<string, string> = {
      everest: "Everest Region",
      annapurna: "Annapurna Region",
      langtang: "Langtang Region",
      manaslu: "Manaslu Region",
      upperMustang: "Upper Mustang",
      kanchenjunga: "Kanchenjunga",
      dhaulagiri: "Dhaulagiri",
      makalu: "Makalu",
    };
    return regions[regionId] || regionId;
  };

  // Calculate detailed cost breakdown for different group sizes
  const calculateDetailedCostBreakdown = (
    trek: Trek,
    groupSize: number
  ): DetailedCostBreakdown => {
    // Base prices
    const guideDailyRate = 40; // $40 per day for guide
    const insurancePerPerson = 10;
    const transportPerPerson = 56.67;
    const vatTaxPerPerson = 14.08;
    const permitsPerPerson = 65;
    const accommodationPerDay = 30;
    const mealsPerDay = 25;

    // Calculate for group size
    const guideTotal = guideDailyRate * trek.duration;
    const accommodationTotal = accommodationPerDay * trek.duration * groupSize;
    const mealsTotal = mealsPerDay * trek.duration * groupSize;

    // Per person breakdown
    const guidePerPerson = guideTotal / groupSize;
    const guidePerDayPerPerson = guidePerPerson / trek.duration;

    const accommodationPerPerson = accommodationTotal / groupSize;
    const mealsPerPerson = mealsTotal / groupSize;

    const totalPerPerson =
      guidePerPerson +
      insurancePerPerson +
      transportPerPerson +
      vatTaxPerPerson +
      permitsPerPerson +
      accommodationPerPerson +
      mealsPerPerson;

    const breakdown: CostBreakdownItem[] = [
      {
        label: "Guide fee",
        value: guidePerDayPerPerson,
        perPerson: true,
        description: `$${guideDailyRate}/day shared among ${groupSize} people`,
      },
      {
        label: "Guide's insurance",
        value: insurancePerPerson,
        perPerson: true,
        description: "Mandatory insurance coverage",
      },
      {
        label: "Guide's transport",
        value: transportPerPerson,
        perPerson: true,
        description: "To/from trailhead",
      },
      {
        label: "VAT tax",
        value: vatTaxPerPerson,
        perPerson: true,
        description: "Government taxes",
      },
      {
        label: "Permits & entry fees",
        value: permitsPerPerson,
        perPerson: true,
        description: "Required trekking permits",
      },
      {
        label: "Accommodation",
        value: accommodationPerPerson,
        perPerson: true,
        description: `$${accommodationPerDay}/night × ${trek.duration} nights`,
      },
      {
        label: "Meals",
        value: mealsPerPerson,
        perPerson: true,
        description: `$${mealsPerDay}/day × ${trek.duration} days`,
      },
    ];

    // Calculate savings compared to current price
    const currentPrice = trek.costPerPerson;
    const savings = currentPrice - totalPerPerson;

    return {
      startingPrice: totalPerPerson,
      perPerson: totalPerPerson,
      breakdown,
      savings: savings > 0 ? savings : 0,
    };
  };

  // Filter treks
  const filteredTreks = useMemo(() => {
    return MOCK_TREKS.filter((trek) => {
      // Search filter
      if (
        searchQuery &&
        !trek.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !trek.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Region filter
      if (regionFilter !== "all" && trek.regionId !== regionFilter) {
        return false;
      }

      // Difficulty filter
      if (difficultyFilter !== "all" && trek.difficulty !== difficultyFilter) {
        return false;
      }

      // Status filter
      if (statusFilter !== "all" && trek.status !== statusFilter) {
        return false;
      }

      // Date filter
      if (dateFilter !== "all") {
        const now = new Date();
        const monthFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

        if (dateFilter === "upcoming" && trek.startDate < now) return false;
        if (dateFilter === "thisMonth" && trek.startDate > monthFromNow)
          return false;
        if (
          dateFilter === "nextMonth" &&
          (trek.startDate < monthFromNow ||
            trek.startDate >
              new Date(monthFromNow.getTime() + 30 * 24 * 60 * 60 * 1000))
        )
          return false;
      }

      return true;
    });
  }, [searchQuery, regionFilter, difficultyFilter, statusFilter, dateFilter]);

  // Sort treks
  const sortedTreks = useMemo(() => {
    const treks = [...filteredTreks];

    switch (sortBy) {
      case "date":
        return treks.sort(
          (a, b) => a.startDate.getTime() - b.startDate.getTime()
        );
      case "duration":
        return treks.sort((a, b) => a.duration - b.duration);
      case "participants":
        return treks.sort(
          (a, b) => b.currentParticipants - a.currentParticipants
        );
      case "costTotal":
        return treks.sort((a, b) => a.costPerPerson - b.costPerPerson);
      case "costPerPerson":
      default:
        return treks.sort((a, b) => a.costPerPerson - b.costPerPerson);
    }
  }, [filteredTreks, sortBy]);

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-emerald-500";
      case "Moderate":
        return "bg-amber-500";
      case "Challenging":
        return "bg-orange-500";
      case "Hard":
        return "bg-red-500";
      default:
        return "bg-slate-500";
    }
  };

  // Get status badge
  const getStatusBadge = (status: string, current: number, max: number) => {
    if (current >= max) {
      return (
        <Badge variant="destructive" className="gap-1">
          <UsersRound className="h-3 w-3" /> Full
        </Badge>
      );
    }

    switch (status) {
      case "open":
        return (
          <Badge variant="accent" className="gap-1">
            <UserPlus className="h-3 w-3" /> Open
          </Badge>
        );
      case "confirmed":
        return (
          <Badge variant="default" className="gap-1">
            <CheckCircle className="h-3 w-3" /> Confirmed
          </Badge>
        );
      case "draft":
        return (
          <Badge variant="outline" className="gap-1">
            <AlertCircle className="h-3 w-3" /> Draft
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Clear filters
  const clearFilters = () => {
    setSearchQuery("");
    setRegionFilter("all");
    setDifficultyFilter("all");
    setStatusFilter("open");
    setDateFilter("upcoming");
  };

  // Toggle trek expansion
  const toggleTrekExpansion = (trekId: string) => {
    setExpandedTrekId(expandedTrekId === trekId ? null : trekId);
  };

  return (
    <div className="min-h-screen bg-background mt-20">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4">
              Join a Trekking Adventure
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Save up to 60% by joining group treks. Costs are shared among
              participants!
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-emerald-600">
                <DollarSign className="h-5 w-5" />
                <span className="font-semibold">Transparent pricing</span>
              </div>
              <div className="flex items-center gap-2 text-amber-600">
                <TrendingDown className="h-5 w-5" />
                <span className="font-semibold">
                  Cost drops with more people
                </span>
              </div>
              <div className="flex items-center gap-2 text-blue-600">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold">All fees included</span>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search treks by title, description, or region..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="costPerPerson">
                    Lowest Cost First
                  </SelectItem>
                  <SelectItem value="date">Soonest Departure</SelectItem>
                  <SelectItem value="duration">Shortest Duration</SelectItem>
                  <SelectItem value="participants">Most Popular</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={clearFilters}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Clear
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="h-4 w-4" />
                Filters:
              </div>

              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="everest">Everest</SelectItem>
                  <SelectItem value="annapurna">Annapurna</SelectItem>
                  <SelectItem value="langtang">Langtang</SelectItem>
                  <SelectItem value="manaslu">Manaslu</SelectItem>
                  <SelectItem value="upperMustang">Upper Mustang</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={difficultyFilter}
                onValueChange={setDifficultyFilter}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="Challenging">Challenging</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open for Joining</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="all">All Status</SelectItem>
                </SelectContent>
              </Select>

              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Departure" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="thisMonth">This Month</SelectItem>
                  <SelectItem value="nextMonth">Next Month</SelectItem>
                  <SelectItem value="all">Any Date</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              Showing {sortedTreks.length} of {MOCK_TREKS.length} treks
            </div>
          </div>

          {/* Treks Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
            {sortedTreks.map((trek) => {
              const breakdownForThree = calculateDetailedCostBreakdown(trek, 3);
              const breakdownForFour = calculateDetailedCostBreakdown(trek, 4);
              const isExpanded = expandedTrekId === trek.id;

              return (
                <Card
                  key={trek.id}
                  className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getStatusBadge(
                            trek.status,
                            trek.currentParticipants,
                            trek.maxParticipants
                          )}
                          {!trek.isPublic && (
                            <Badge variant="outline" className="gap-1">
                              <Lock className="h-3 w-3" />
                              Private
                            </Badge>
                          )}
                          <Badge
                            variant="outline"
                            className={getDifficultyColor(trek.difficulty)}
                          >
                            {trek.difficulty}
                          </Badge>
                        </div>

                        <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {trek.title}
                        </CardTitle>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {getRegionName(trek.regionId)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {format(trek.startDate, "MMM d")}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {trek.duration} days
                          </div>
                        </div>
                      </div>

                      {trek.currentParticipants >=
                        trek.maxParticipants * 0.8 && (
                        <Badge
                          variant="destructive"
                          className="gap-1 animate-pulse"
                        >
                          <TrendingUp className="h-3 w-3" />
                          Almost Full!
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground line-clamp-2">
                      {trek.description}
                    </p>

                    {/* Current Group Info */}
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span className="font-medium">Currently:</span>
                          <span className="font-bold">
                            {trek.currentParticipants} people joined
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">
                            Cost per person
                          </div>
                          <div className="text-xl font-bold">
                            ${trek.costPerPerson.toFixed(0)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cost Breakdown - Your Exact Format */}
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">
                          Starting at
                        </div>
                        <div className="text-3xl font-bold text-emerald-700 ">
                          ${breakdownForThree.startingPrice.toFixed(0)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          For 1 person if 2 more people join your trek (group of
                          3)
                        </div>
                        <div className="text-sm font-medium mt-1">
                          Includes guide and all required permits & entry fees
                        </div>
                      </div>

                      <div className="space-y-2">
                        {breakdownForThree.breakdown
                          .slice(0, 5)
                          .map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between text-sm"
                            >
                              <span className="text-muted-foreground">
                                {item.label}
                              </span>
                              <span className="font-medium">
                                ${item.value.toFixed(2)}
                                {item.label.includes("/day")
                                  ? ""
                                  : " per person"}
                              </span>
                            </div>
                          ))}

                        {!isExpanded && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full text-xs gap-1"
                            onClick={() => toggleTrekExpansion(trek.id)}
                          >
                            <ChevronDown className="h-3 w-3" />
                            Show complete breakdown (accommodation, meals, etc.)
                          </Button>
                        )}

                        {isExpanded && (
                          <div className="space-y-2 pt-2 border-t">
                            {breakdownForThree.breakdown
                              .slice(5)
                              .map((item, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between text-sm"
                                >
                                  <span className="text-muted-foreground">
                                    {item.label}
                                  </span>
                                  <span className="font-medium">
                                    ${item.value.toFixed(2)}
                                    {item.label.includes("/day")
                                      ? ""
                                      : " per person"}
                                  </span>
                                </div>
                              ))}

                            <div className="flex items-center justify-between font-bold border-t pt-2">
                              <span>Total per person</span>
                              <span className="text-lg">
                                ${breakdownForThree.perPerson.toFixed(0)}
                              </span>
                            </div>

                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full text-xs gap-1"
                              onClick={() => toggleTrekExpansion(trek.id)}
                            >
                              <ChevronUp className="h-3 w-3" />
                              Show less
                            </Button>
                          </div>
                        )}
                      </div>

                      {/* Group Size Comparison */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full gap-2"
                          >
                            <Calculator className="h-4 w-4" />
                            Compare Group Sizes
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>
                              Cost Breakdown by Group Size
                            </DialogTitle>
                            <DialogDescription>
                              See how costs decrease when more people join
                            </DialogDescription>
                          </DialogHeader>

                          <div className="space-y-4">
                            {[2, 3, 4, 6].map((groupSize) => {
                              const breakdown = calculateDetailedCostBreakdown(
                                trek,
                                groupSize
                              );
                              const savingsFromCurrent =
                                trek.costPerPerson - breakdown.perPerson;

                              return (
                                <div
                                  key={groupSize}
                                  className="border rounded-lg p-4"
                                >
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                      <div className="w-8 h-8 rounded-full bg-emerald-100  flex items-center justify-center font-bold">
                                        {groupSize}
                                      </div>
                                      <div>
                                        <div className="font-semibold">
                                          Group of {groupSize}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                          {groupSize - trek.currentParticipants}{" "}
                                          more needed
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-2xl font-bold text-emerald-700 ">
                                        ${breakdown.perPerson.toFixed(0)}
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        per person
                                      </div>
                                    </div>
                                  </div>

                                  <div className="space-y-1 text-sm">
                                    <div className="flex items-center justify-between">
                                      <span className="text-muted-foreground">
                                        Guide fee
                                      </span>
                                      <span>
                                        $
                                        {(
                                          breakdown.breakdown[0].value *
                                          trek.duration
                                        ).toFixed(2)}
                                      </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-muted-foreground">
                                        Permits & insurance
                                      </span>
                                      <span>
                                        $
                                        {(
                                          breakdown.breakdown[1].value +
                                          breakdown.breakdown[4].value
                                        ).toFixed(2)}
                                      </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-muted-foreground">
                                        Accommodation & meals
                                      </span>
                                      <span>
                                        $
                                        {(
                                          breakdown.breakdown[5].value +
                                          breakdown.breakdown[6].value
                                        ).toFixed(2)}
                                      </span>
                                    </div>
                                  </div>

                                  {savingsFromCurrent > 0 && (
                                    <div className="mt-3 pt-3 border-t">
                                      <div className="flex items-center justify-between text-sm">
                                        <span>Savings vs current price:</span>
                                        <span className="font-bold text-emerald-600">
                                          ${savingsFromCurrent.toFixed(0)}
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}

                            <div className="bg-muted/50 rounded-lg p-3">
                              <h4 className="font-semibold text-sm mb-2">
                                Why costs decrease:
                              </h4>
                              <ul className="text-xs space-y-1 text-muted-foreground">
                                <li>
                                  • Guide fee is shared among all participants
                                </li>
                                <li>• Transportation costs are divided</li>
                                <li>• Group discounts on accommodation</li>
                                <li>• Fixed permit costs are split</li>
                              </ul>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {/* Savings Banner */}
                      {breakdownForThree.savings &&
                        breakdownForThree.savings > 0 && (
                          <div className="bg-emerald-50  border border-emerald-200 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <TrendingDown className="h-4 w-4 text-emerald-600" />
                                <span className="font-medium">You save</span>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-emerald-700 ">
                                  ${breakdownForThree.savings.toFixed(0)}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  vs. current group of{" "}
                                  {trek.currentParticipants}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                    </div>
                  </CardContent>

                  <CardFooter className="border-t pt-4">
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <div className="text-xs text-muted-foreground">
                          {trek.maxParticipants - trek.currentParticipants}{" "}
                          spots left
                        </div>
                        <div className="text-sm font-medium">
                          Join before {format(trek.startDate, "MMM d")}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/treks/${trek.id}`}>
                            <Eye className="h-4 w-4 mr-1" />
                            Details
                          </Link>
                        </Button>

                        <Button
                          size="sm"
                          disabled={
                            trek.currentParticipants >= trek.maxParticipants
                          }
                          asChild
                        >
                          <Link href={`/treks/${trek.id}/join`}>
                            <UserPlus className="h-4 w-4 mr-1" />
                            Join Now
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          {/* Cost Explanation Section */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                How Group Trek Costs Work
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100  flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
                <h4 className="font-semibold">Shared Fixed Costs</h4>
                <p className="text-sm text-muted-foreground">
                  Guide fees, transportation, and permits are fixed costs that
                  get divided among all participants. More people = lower cost
                  per person.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-amber-100  flex items-center justify-center mb-2">
                  <DollarSign className="h-6 w-6 text-amber-600" />
                </div>
                <h4 className="font-semibold">Transparent Pricing</h4>
                <p className="text-sm text-muted-foreground">
                  Every cost is broken down clearly. No hidden fees. You see
                  exactly what you're paying for and why.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-blue-100  flex items-center justify-center mb-2">
                  <TrendingDown className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold">Maximum Savings</h4>
                <p className="text-sm text-muted-foreground">
                  Join treks that need more people for biggest savings. The
                  closer to full, the cheaper it gets!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">
              Join Today & Start Saving
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Don't pay solo trekker prices. Join a group and save up to 60% on
              your adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2" asChild>
                <Link href="/user/create-trek">
                  <Plus className="h-5 w-5" />
                  Create Your Own Trek
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Share2 className="h-5 w-5" />
                Share with Friends
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
