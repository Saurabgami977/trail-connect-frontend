// app/treks/[id]/page.tsx
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  Users,
  DollarSign,
  MapPin,
  Mountain,
  Clock,
  UserPlus,
  Star,
  CheckCircle,
  AlertCircle,
  Share2,
  Calculator,
  UsersRound,
  TrendingDown,
  Eye,
  Lock,
  Globe,
  MessageCircle,
  Heart,
  Map,
  Hotel,
  Bus,
  Shield,
  FileText,
  ArrowLeft,
  MoreVertical,
  Copy,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircleCode,
  Instagram,
  Bell,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { Trek } from "@/types/create-trek";

// Mock detailed trek data
const MOCK_TREK_DETAILS: Trek = {
  id: "trek-1",
  title: "Everest Base Camp - April Departure",
  description:
    "Classic EBC trek with experienced Sherpa guide. Perfect for first-time high-altitude trekkers who want to experience the majesty of the world's highest peak. This trek includes acclimatization days, cultural visits to Sherpa villages, and sunrise views from Kala Patthar.",
  regionId: "everest",
  difficulty: "Challenging",
  duration: 14,
  startDate: new Date("2026-04-15"),
  endDate: new Date("2026-04-28"),
  maxParticipants: 12,
  currentParticipants: 4,
  isPublic: true,
  status: "open",
  createdBy: "Alex Johnson",
  createdAt: new Date("2026-01-10"),
  totalCost: 4200,
  costPerPerson: 1050,
  itinerary: [
    {
      day: 1,
      title: "Arrival in Kathmandu",
      description:
        "Arrive at Tribhuvan International Airport, transfer to hotel, trek briefing, welcome dinner.",
      altitude: 1400,
      distance: 0,
      duration: "Flexible",
      accommodation: "Hotel Yak & Yeti",
      meals: ["Dinner"],
      highlights: ["Hotel check-in", "Trek briefing", "Welcome dinner"],
    },
    {
      day: 2,
      title: "Fly to Lukla, Trek to Phakding",
      description:
        "Early morning scenic flight to Lukla, start trek to Phakding village along Dudh Koshi River.",
      altitude: 2610,
      distance: 8,
      duration: "3-4 hours",
      accommodation: "Teahouse",
      meals: ["Breakfast", "Lunch", "Dinner"],
      highlights: [
        "Mountain flight",
        "First day of trekking",
        "Dudh Koshi River",
      ],
    },
    {
      day: 3,
      title: "Phakding to Namche Bazaar",
      description:
        "Cross suspension bridges, enter Sagarmatha National Park, steep climb to Namche Bazaar.",
      altitude: 3440,
      distance: 11,
      duration: "5-6 hours",
      accommodation: "Teahouse",
      meals: ["Breakfast", "Lunch", "Dinner"],
      highlights: [
        "Sagarmatha National Park",
        "First view of Everest",
        "Namche Bazaar market",
      ],
    },
  ],
  services: [],
  participants: [
    {
      id: "1",
      userId: "user1",
      name: "Alex Johnson",
      email: "alex@example.com",
      role: "creator",
      joinedAt: new Date("2026-01-10"),
      paidAmount: 1050,
      paymentStatus: "full",
    },
    {
      id: "2",
      userId: "user2",
      name: "Sarah Miller",
      email: "sarah@example.com",
      role: "participant",
      joinedAt: new Date("2026-01-12"),
      paidAmount: 525,
      paymentStatus: "partial",
    },
    {
      id: "3",
      userId: "user3",
      name: "Raj Patel",
      email: "raj@example.com",
      role: "participant",
      joinedAt: new Date("2026-01-15"),
      paidAmount: 1050,
      paymentStatus: "full",
    },
    {
      id: "4",
      userId: "user4",
      name: "Maria Garcia",
      email: "maria@example.com",
      role: "participant",
      joinedAt: new Date("2026-01-18"),
      paidAmount: 0,
      paymentStatus: "pending",
    },
  ],
  guides: [
    {
      guideId: "guide1",
      name: "Mingma Sherpa",
      dailyRate: 50,
      assignedDays: 14,
      totalCost: 700,
      status: "confirmed",
    },
    {
      guideId: "guide2",
      name: "Pasang Lama",
      dailyRate: 40,
      assignedDays: 14,
      totalCost: 560,
      status: "confirmed",
    },
  ],
  requests: [],
};

// Cost breakdown structure
interface CostBreakdownItem {
  label: string;
  value: number;
  perPerson: boolean;
  description: string;
  isFixed?: boolean;
}

export default function TrekDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [selectedGroupSize, setSelectedGroupSize] = useState(3);
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [liked, setLiked] = useState(false);

  const trek = MOCK_TREK_DETAILS; // In real app, fetch by id

  // Calculate detailed cost breakdown
  const calculateDetailedCostBreakdown = (groupSize: number) => {
    // Base prices
    const guideDailyRate = 40; // $40 per day for guide
    const insurancePerPerson = 10;
    const transportPerPerson = 56.67;
    const vatTaxPerPerson = 14.08;
    const permitsPerPerson = 65;
    const accommodationPerDay = 30;
    const mealsPerDay = 25;
    const platformFee = 25;

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
      mealsPerPerson +
      platformFee;

    const breakdown: CostBreakdownItem[] = [
      {
        label: "Guide fee",
        value: guidePerDayPerPerson,
        perPerson: true,
        description: `$${guideDailyRate}/day shared among ${groupSize} people`,
        isFixed: true,
      },
      {
        label: "Guide's insurance",
        value: insurancePerPerson,
        perPerson: true,
        description: "Mandatory insurance coverage for guide",
        isFixed: true,
      },
      {
        label: "Guide's transport",
        value: transportPerPerson,
        perPerson: true,
        description: "Transport for guide to/from trailhead",
        isFixed: true,
      },
      {
        label: "VAT tax (13%)",
        value: vatTaxPerPerson,
        perPerson: true,
        description: "Government value added tax",
        isFixed: true,
      },
      {
        label: "Permits & entry fees",
        value: permitsPerPerson,
        perPerson: true,
        description: "Sagarmatha National Park & TIMS permit",
        isFixed: true,
      },
      {
        label: "Accommodation",
        value: accommodationPerPerson,
        perPerson: true,
        description: `$${accommodationPerDay}/night × ${trek.duration} nights`,
        isFixed: false,
      },
      {
        label: "Meals",
        value: mealsPerPerson,
        perPerson: true,
        description: `$${mealsPerDay}/day × ${trek.duration} days (breakfast, lunch, dinner)`,
        isFixed: false,
      },
      {
        label: "Platform service fee",
        value: platformFee,
        perPerson: true,
        description: "Booking, support & emergency services",
        isFixed: true,
      },
    ];

    // Calculate savings compared to current price
    const currentPrice = trek.costPerPerson;
    const savings = currentPrice - totalPerPerson;

    return {
      totalPerPerson,
      breakdown,
      savings: savings > 0 ? savings : 0,
      fixedCosts: breakdown
        .filter((item) => item.isFixed)
        .reduce((sum, item) => sum + item.value, 0),
      variableCosts: breakdown
        .filter((item) => !item.isFixed)
        .reduce((sum, item) => sum + item.value, 0),
    };
  };

  const breakdown = calculateDetailedCostBreakdown(selectedGroupSize);
  const breakdownCurrent = calculateDetailedCostBreakdown(
    trek.currentParticipants
  );

  // Get region name
  const getRegionName = (regionId: string) => {
    const regions: Record<string, string> = {
      everest: "Everest Region",
      annapurna: "Annapurna Region",
      langtang: "Langtang Region",
      manaslu: "Manaslu Region",
      upperMustang: "Upper Mustang",
    };
    return regions[regionId] || regionId;
  };

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

  // Format date
  const formatDateRange = (start: Date, end: Date) => {
    return `${format(start, "MMM d")} - ${format(end, "MMM d, yyyy")}`;
  };

  // Share trek
  const shareTrek = () => {
    const url = window.location.href;
    const text = `Join me on this ${trek.title} trek!`;

    if (navigator.share) {
      navigator.share({
        title: trek.title,
        text: text,
        url: url,
      });
    } else {
      navigator.clipboard.writeText(`${text} ${url}`);
      // Show toast notification
    }
  };

  // Copy link
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    // Show toast notification
  };

  // Calculate progress
  const progressPercentage =
    (trek.currentParticipants / trek.maxParticipants) * 100;

  return (
    <div className="min-h-screen bg-background mt-20">
      <Header />

      {/* Back Navigation */}
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" onClick={() => router.back()} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Treks
        </Button>
      </div>

      <main className="container mx-auto px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Trek Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    variant={trek.isPublic ? "default" : "outline"}
                    className="gap-1"
                  >
                    {trek.isPublic ? (
                      <Globe className="h-3 w-3" />
                    ) : (
                      <Lock className="h-3 w-3" />
                    )}
                    {trek.isPublic ? "Public Trek" : "Private Trek"}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={getDifficultyColor(trek.difficulty)}
                  >
                    {trek.difficulty}
                  </Badge>
                  <Badge variant="accent" className="gap-1">
                    <UserPlus className="h-3 w-3" />
                    {trek.maxParticipants - trek.currentParticipants} spots left
                  </Badge>
                </div>

                <h1 className="text-4xl font-bold mb-2">{trek.title}</h1>

                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {getRegionName(trek.regionId)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDateRange(trek.startDate, trek.endDate)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {trek.duration} days
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {trek.currentParticipants} / {trek.maxParticipants} joined
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLiked(!liked)}
                >
                  <Heart
                    className={cn(
                      "h-4 w-4",
                      liked && "fill-red-500 text-red-500"
                    )}
                  />
                </Button>
                <Button variant="outline" size="sm" onClick={shareTrek}>
                  <Share2 className="h-4 w-4" />
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-80">
                    <DialogHeader>
                      <DialogTitle>Share Options</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyLink}
                        className="gap-1"
                      >
                        <Copy className="h-4 w-4" />
                        Copy Link
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Facebook className="h-4 w-4" />
                        Facebook
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Twitter className="h-4 w-4" />
                        Twitter
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <MessageCircleCode className="h-4 w-4" />
                        WhatsApp
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Instagram className="h-4 w-4" />
                        Instagram
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <p className="text-lg text-muted-foreground mb-6 max-w-4xl">
              {trek.description}
            </p>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Group filling fast!</span>
                <span>
                  {trek.maxParticipants - trek.currentParticipants} spots
                  remaining
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Join now to lock your spot</span>
                <span>Group closes {format(trek.startDate, "MMM d")}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Cost Breakdown - Featured Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Cost Breakdown & Savings
                  </CardTitle>
                  <CardDescription>
                    See exactly what you pay for and how costs decrease with
                    more participants
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Current vs Projected */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-4">
                      <div className="text-sm text-muted-foreground mb-2">
                        Current cost
                      </div>
                      <div className="text-3xl font-bold mb-1">
                        ${trek.costPerPerson.toFixed(0)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        For {trek.currentParticipants} people
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">
                          {trek.maxParticipants - trek.currentParticipants} more
                          spots available
                        </span>
                      </div>
                    </div>

                    <div className="border-2 border-emerald-500 rounded-lg p-4 bg-emerald-50 ">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="text-sm font-semibold text-emerald-700 ">
                          Starting at
                        </div>
                        <Badge variant="accent" className="gap-1">
                          <TrendingDown className="h-3 w-3" />
                          Best Value
                        </Badge>
                      </div>
                      <div className="text-3xl font-bold text-emerald-700  mb-1">
                        ${breakdown.totalPerPerson.toFixed(0)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        For {selectedGroupSize} people
                      </div>
                      <div className="mt-3">
                        <div className="text-sm mb-1">Select group size:</div>
                        <div className="flex gap-2">
                          {[2, 3, 4, 6].map((size) => (
                            <Button
                              key={size}
                              variant={
                                selectedGroupSize === size
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() => setSelectedGroupSize(size)}
                              className="min-w-12"
                            >
                              {size}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Breakdown */}
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground mb-1">
                        For 1 person if {selectedGroupSize - 1} more people join
                        (group of {selectedGroupSize})
                      </div>
                      <div className="font-medium">
                        Includes guide and all required permits & entry fees
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      {breakdown.breakdown.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <div className="font-medium">{item.label}</div>
                            <div className="text-sm text-muted-foreground">
                              {item.description}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">
                              ${item.value.toFixed(2)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {item.perPerson ? "per person" : "total"}
                            </div>
                          </div>
                        </div>
                      ))}

                      <Separator />

                      <div className="flex items-center justify-between font-bold text-lg">
                        <div>Total per person</div>
                        <div className="text-2xl text-emerald-700 ">
                          ${breakdown.totalPerPerson.toFixed(0)}
                        </div>
                      </div>
                    </div>

                    {/* Savings Display */}
                    {breakdown.savings > 0 && (
                      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-bold text-lg">
                              You save ${breakdown.savings.toFixed(0)}!
                            </div>
                            <div className="text-sm opacity-90">
                              Compared to current group of{" "}
                              {trek.currentParticipants}
                            </div>
                          </div>
                          <TrendingDown className="h-8 w-8" />
                        </div>
                      </div>
                    )}

                    {/* Cost Explanation */}
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">
                        Why costs decrease with more people:
                      </h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>
                          • <span className="font-medium">Guide fees</span>{" "}
                          ($40/day) are divided among all participants
                        </li>
                        <li>
                          •{" "}
                          <span className="font-medium">
                            Transportation costs
                          </span>{" "}
                          are shared
                        </li>
                        <li>
                          •{" "}
                          <span className="font-medium">Fixed permit fees</span>{" "}
                          ($65/person) remain the same
                        </li>
                        <li>
                          •{" "}
                          <span className="font-medium">
                            Accommodation & meals
                          </span>{" "}
                          have group discounts
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Itinerary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Map className="h-5 w-5" />
                    Detailed Itinerary
                  </CardTitle>
                  <CardDescription>
                    Day-by-day breakdown of your {trek.duration}-day adventure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="detailed">Detailed</TabsTrigger>
                      <TabsTrigger value="map">Elevation Map</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                      {trek.itinerary.map((day) => (
                        <div key={day.day} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="font-bold text-lg">
                                Day {day.day}: {day.title}
                              </div>
                              <p className="text-muted-foreground">
                                {day.description}
                              </p>
                            </div>
                            <Badge variant="outline">{day.altitude}m</Badge>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                            <div className="flex items-center gap-2">
                              <Mountain className="h-4 w-4" />
                              <div>
                                <div className="text-muted-foreground">
                                  Altitude
                                </div>
                                <div className="font-medium">
                                  {day.altitude}m
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Map className="h-4 w-4" />
                              <div>
                                <div className="text-muted-foreground">
                                  Distance
                                </div>
                                <div className="font-medium">
                                  {day.distance}km
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <div>
                                <div className="text-muted-foreground">
                                  Duration
                                </div>
                                <div className="font-medium">
                                  {day.duration}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Hotel className="h-4 w-4" />
                              <div>
                                <div className="text-muted-foreground">
                                  Stay
                                </div>
                                <div className="font-medium">
                                  {day.accommodation}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-3">
                            <div className="text-sm font-medium mb-1">
                              Meals included:
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {day.meals.map((meal, index) => (
                                <Badge key={index} variant="secondary">
                                  {meal}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="detailed">
                      <div className="space-y-6">
                        {trek.itinerary.map((day) => (
                          <div
                            key={day.day}
                            className="border-l-4 border-primary pl-4 py-2"
                          >
                            <div className="font-bold text-xl mb-2">
                              Day {day.day}: {day.title}
                            </div>
                            <p className="mb-3">{day.description}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h5 className="font-semibold mb-2">
                                  Highlights
                                </h5>
                                <ul className="space-y-1">
                                  {day.highlights.map((highlight, index) => (
                                    <li
                                      key={index}
                                      className="flex items-center gap-2"
                                    >
                                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                                      {highlight}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h5 className="font-semibold mb-2">Details</h5>
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                      Trekking time:
                                    </span>
                                    <span className="font-medium">
                                      {day.duration}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                      Max altitude:
                                    </span>
                                    <span className="font-medium">
                                      {day.altitude}m
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                      Distance:
                                    </span>
                                    <span className="font-medium">
                                      {day.distance}km
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                      Accommodation:
                                    </span>
                                    <span className="font-medium">
                                      {day.accommodation}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="map">
                      <div className="text-center py-12">
                        <Map className="h-24 w-24 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          Elevation map coming soon
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Guides */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Your Guides
                  </CardTitle>
                  <CardDescription>
                    Experienced guides who will lead your trek
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {trek.guides.map((guide) => (
                      <div
                        key={guide.guideId}
                        className="border rounded-lg p-4"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="h-8 w-8 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-lg">
                                {guide.name}
                              </h4>
                              <Badge variant="accent">Confirmed</Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                              <span>4.9/5 rating</span>
                              <span>•</span>
                              <span>10+ years experience</span>
                            </div>
                            <p className="text-sm mb-3">
                              Specializes in {getRegionName(trek.regionId)}{" "}
                              treks. Fluent in English, Nepali, and Sherpa.
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="text-sm">
                                <span className="text-muted-foreground">
                                  Daily rate:
                                </span>
                                <span className="font-bold ml-2">
                                  ${guide.dailyRate}/day
                                </span>
                              </div>
                              <Button variant="outline" size="sm">
                                <MessageCircle className="h-4 w-4 mr-2" />
                                Message
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Participants */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UsersRound className="h-5 w-5" />
                    Trek Participants
                  </CardTitle>
                  <CardDescription>
                    Meet the people joining this adventure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {trek.participants.map((participant) => (
                      <div key={participant.id} className="text-center">
                        <div
                          className={cn(
                            "w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-lg",
                            participant.role === "creator"
                              ? "bg-gradient-to-br from-primary to-primary/80"
                              : "bg-gradient-to-br from-emerald-600 to-emerald-500"
                          )}
                        >
                          {participant.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{participant.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {participant.role === "creator"
                              ? "Organizer"
                              : "Participant"}
                          </div>
                          <Badge
                            variant={
                              participant.paymentStatus === "full"
                                ? "accent"
                                : participant.paymentStatus === "partial"
                                ? "pending"
                                : "secondary"
                            }
                            className="mt-1 text-xs"
                          >
                            {participant.paymentStatus}
                          </Badge>
                        </div>
                      </div>
                    ))}

                    {/* Empty spots */}
                    {Array.from({
                      length: trek.maxParticipants - trek.currentParticipants,
                    }).map((_, index) => (
                      <div key={`empty-${index}`} className="text-center">
                        <div className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                          <UserPlus className="h-6 w-6 text-muted-foreground/50" />
                        </div>
                        <div>
                          <div className="font-medium text-muted-foreground">
                            Spot Available
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Join now!
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {trek.isPublic && (
                    <div className="border-t pt-4">
                      <p className="text-sm text-muted-foreground mb-3">
                        This is a public trek. Anyone can join until all spots
                        are filled. You'll be able to chat with other
                        participants after joining.
                      </p>
                      <Button variant="outline" className="w-full">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Open Group Chat
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Join Now Card */}
              <Card className="">
                <CardHeader>
                  <CardTitle>Ready to Join?</CardTitle>
                  <CardDescription>
                    Secure your spot on this adventure
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Current price:
                      </span>
                      <span className="text-2xl font-bold line-through text-muted-foreground">
                        ${trek.costPerPerson.toFixed(0)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Your price:</span>
                      <span className="text-3xl font-bold text-emerald-700 ">
                        ${breakdown.totalPerPerson.toFixed(0)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        If {selectedGroupSize} people join
                      </span>
                      <span className="font-medium text-emerald-600">
                        Save ${breakdown.savings.toFixed(0)}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Departure</span>
                      <span className="font-medium">
                        {format(trek.startDate, "MMM d, yyyy")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium">{trek.duration} days</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Difficulty</span>
                      <span className="font-medium">{trek.difficulty}</span>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-3">
                    <h4 className="font-semibold text-sm mb-2">
                      What's included:
                    </h4>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-emerald-500" />
                        Professional licensed guide
                      </li>
                      <li className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-emerald-500" />
                        All permits & entry fees
                      </li>
                      <li className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-emerald-500" />
                        Accommodation & meals
                      </li>
                      <li className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-emerald-500" />
                        Transportation to trailhead
                      </li>
                      <li className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-emerald-500" />
                        24/7 support
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={() => setShowJoinDialog(true)}
                    disabled={trek.currentParticipants >= trek.maxParticipants}
                  >
                    <UserPlus className="h-5 w-5 mr-2" />
                    {trek.currentParticipants >= trek.maxParticipants
                      ? "Trek Full"
                      : "Join This Trek"}
                  </Button>

                  <Button variant="outline" size="lg" className="w-full">
                    <Bell className="h-5 w-5 mr-2" />
                    Notify When Price Drops
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Free cancellation up to 30 days before departure
                  </p>
                </CardFooter>
              </Card>

              {/* Organizer Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Organized by
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-bold text-primary">
                        {trek.createdBy.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-bold">{trek.createdBy}</div>
                      <div className="text-sm text-muted-foreground">
                        Trek Organizer
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm mb-3">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span>4.8/5 from 24 reviews</span>
                  </div>

                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Message Organizer
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      View Other Treks
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Important Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Important Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-emerald-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">
                        Travel Insurance
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Required for all treks above 3,000m
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-amber-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">
                        Cancellation Policy
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Free cancellation 30+ days before. 50% refund 15-29
                        days.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Bus className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">
                        Transport Included
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Kathmandu to Lukla flight and all ground transport
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Hotel className="h-4 w-4 text-purple-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">Accommodation</div>
                      <div className="text-xs text-muted-foreground">
                        Teahouses during trek, hotel in Kathmandu
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Join Dialog */}
      <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Join This Trek</DialogTitle>
            <DialogDescription>
              Confirm your participation in {trek.title}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span>Cost per person:</span>
                <span className="font-bold text-lg">
                  ${breakdown.totalPerPerson.toFixed(0)}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                Based on group of {selectedGroupSize} people
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-sm font-medium mb-1">
                  Group Size Preference
                </div>
                <div className="flex gap-2">
                  {[2, 3, 4, 6].map((size) => (
                    <Button
                      key={size}
                      variant={
                        selectedGroupSize === size ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedGroupSize(size)}
                      className="flex-1"
                    >
                      {size} people
                    </Button>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-50  rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">You save:</span>
                  <span className="font-bold text-emerald-700 ">
                    ${breakdown.savings.toFixed(0)}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Compared to current price of ${trek.costPerPerson.toFixed(0)}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Button className="w-full" size="lg">
                <DollarSign className="h-5 w-5 mr-2" />
                Pay ${breakdown.totalPerPerson.toFixed(0)} Now
              </Button>

              <Button variant="outline" className="w-full" size="lg">
                <Calendar className="h-5 w-5 mr-2" />
                Reserve Now, Pay Later
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By joining, you agree to our terms and cancellation policy
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
