"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import RoutesTable from "./routes-table";
import { Route, Plus, RefreshCw, Filter, Download, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mock data for trekking routes
const mockRoutes = [
  {
    _id: "1",
    name: "Everest Base Camp Trek",
    slug: "everest-base-camp-trek",
    region: {
      _id: "region1",
      name: "Khumbu Region",
    },
    description: "The classic trek to the base of the world's highest mountain",
    duration: 14,
    distance: 130,
    difficulty: "challenging",
    startPoint: "Lukla",
    endPoint: "Everest Base Camp",
    itinerary: [
      { day: 1, title: "Kathmandu to Lukla to Phakding" },
      { day: 2, title: "Phakding to Namche Bazaar" },
      { day: 3, title: "Acclimatization Day at Namche" },
    ],
    costBreakdown: {
      guidePerDay: 25,
      permitsPerPerson: 50,
      accommodationPerDay: 20,
      mealsPerDay: 25,
      transportPerPerson: 150,
      insurancePerPerson: 100,
    },
    inclusions: ["Professional guide", "Permits", "Accommodation", "Meals"],
    exclusions: ["International flights", "Personal expenses"],
    requirements: {
      fitnessLevel: "Good",
      gearChecklist: ["Sleeping bag", "Trekking poles", "Down jacket"],
      vaccinations: ["Hepatitis A", "Typhoid"],
      permits: ["TIMS Card", "Sagarmatha NP Permit"],
    },
    bestTime: {
      months: ["March", "April", "May", "September", "October", "November"],
      weather: "Clear skies",
      temperatureRange: "-10°C to 15°C",
    },
    gallery: {
      coverImage:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba",
      images: [],
      videos: [],
    },
    variations: [],
    extraServices: [],
    isActive: true,
    isFeatured: true,
    usageCount: 245,
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    _id: "2",
    name: "Annapurna Circuit Trek",
    slug: "annapurna-circuit-trek",
    region: {
      _id: "region2",
      name: "Annapurna Region",
    },
    description: "One of the world's classic treks around the Annapurna massif",
    duration: 18,
    distance: 230,
    difficulty: "difficult",
    startPoint: "Besisahar",
    endPoint: "Nayapul",
    itinerary: [
      { day: 1, title: "Kathmandu to Besisahar" },
      { day: 2, title: "Besisahar to Bahundanda" },
      { day: 3, title: "Bahundanda to Jagat" },
    ],
    costBreakdown: {
      guidePerDay: 22,
      permitsPerPerson: 40,
      accommodationPerDay: 18,
      mealsPerDay: 22,
      transportPerPerson: 120,
      insurancePerPerson: 90,
    },
    inclusions: ["Guide", "Permits", "Accommodation", "Transport"],
    exclusions: ["Personal gear", "Travel insurance"],
    requirements: {
      fitnessLevel: "Excellent",
      gearChecklist: ["Warm clothing", "Good boots", "First aid kit"],
      vaccinations: ["Hepatitis A", "Typhoid", "Tetanus"],
      permits: ["ACAP Permit", "TIMS Card"],
    },
    bestTime: {
      months: ["March", "April", "October", "November"],
      weather: "Stable weather",
      temperatureRange: "-5°C to 20°C",
    },
    gallery: {
      coverImage:
        "https://images.unsplash.com/photo-1464278533981-50106e6176b1",
      images: [],
      videos: [],
    },
    variations: [],
    extraServices: [],
    isActive: true,
    isFeatured: true,
    usageCount: 189,
    createdAt: "2024-02-10T14:20:00Z",
  },
  {
    _id: "3",
    name: "Langtang Valley Trek",
    slug: "langtang-valley-trek",
    region: {
      _id: "region3",
      name: "Langtang Region",
    },
    description: "Scenic trek through beautiful valleys close to Kathmandu",
    duration: 10,
    distance: 80,
    difficulty: "moderate",
    startPoint: "Syabrubesi",
    endPoint: "Kyanjin Gompa",
    itinerary: [
      { day: 1, title: "Kathmandu to Syabrubesi" },
      { day: 2, title: "Syabrubesi to Lama Hotel" },
      { day: 3, title: "Lama Hotel to Langtang Village" },
    ],
    costBreakdown: {
      guidePerDay: 20,
      permitsPerPerson: 30,
      accommodationPerDay: 15,
      mealsPerDay: 20,
      transportPerPerson: 100,
      insurancePerPerson: 80,
    },
    inclusions: ["Guide", "Permits", "Meals", "Accommodation"],
    exclusions: ["Personal expenses", "Tips"],
    requirements: {
      fitnessLevel: "Moderate",
      gearChecklist: ["Trekking shoes", "Rain gear", "Backpack"],
      vaccinations: ["Hepatitis A"],
      permits: ["Langtang National Park Permit"],
    },
    bestTime: {
      months: ["March", "April", "May", "September", "October"],
      weather: "Pleasant",
      temperatureRange: "0°C to 20°C",
    },
    gallery: {
      coverImage:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      images: [],
      videos: [],
    },
    variations: [],
    extraServices: [],
    isActive: true,
    isFeatured: false,
    usageCount: 112,
    createdAt: "2024-03-05T09:15:00Z",
  },
  {
    _id: "4",
    name: "Manaslu Circuit Trek",
    slug: "manaslu-circuit-trek",
    region: {
      _id: "region4",
      name: "Manaslu Region",
    },
    description: "Restricted area trek around the eighth highest mountain",
    duration: 16,
    distance: 177,
    difficulty: "difficult",
    startPoint: "Soti Khola",
    endPoint: "Besisahar",
    itinerary: [
      { day: 1, title: "Kathmandu to Soti Khola" },
      { day: 2, title: "Soti Khola to Machha Khola" },
      { day: 3, title: "Machha Khola to Jagat" },
    ],
    costBreakdown: {
      guidePerDay: 28,
      permitsPerPerson: 70,
      accommodationPerDay: 22,
      mealsPerDay: 25,
      transportPerPerson: 140,
      insurancePerPerson: 110,
    },
    inclusions: ["Special permit", "Guide", "Porters", "Accommodation"],
    exclusions: ["Personal gear", "Alcoholic drinks"],
    requirements: {
      fitnessLevel: "Excellent",
      gearChecklist: ["4-season sleeping bag", "Thermal layers", "Headlamp"],
      vaccinations: ["Hepatitis A", "Typhoid", "Malaria"],
      permits: ["Manaslu Restricted Area Permit", "MCAP Permit"],
    },
    bestTime: {
      months: ["March", "April", "October", "November"],
      weather: "Clear mountain views",
      temperatureRange: "-10°C to 15°C",
    },
    gallery: {
      coverImage:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
      images: [],
      videos: [],
    },
    variations: [],
    extraServices: [],
    isActive: true,
    isFeatured: true,
    usageCount: 87,
    createdAt: "2024-01-30T11:45:00Z",
  },
  {
    _id: "5",
    name: "Upper Mustang Trek",
    slug: "upper-mustang-trek",
    region: {
      _id: "region5",
      name: "Mustang Region",
    },
    description: "Journey to the ancient kingdom of Lo in the Tibetan plateau",
    duration: 14,
    distance: 150,
    difficulty: "moderate",
    startPoint: "Pokhara",
    endPoint: "Lo Manthang",
    itinerary: [
      { day: 1, title: "Pokhara to Jomsom" },
      { day: 2, title: "Jomsom to Kagbeni" },
      { day: 3, title: "Kagbeni to Chele" },
    ],
    costBreakdown: {
      guidePerDay: 30,
      permitsPerPerson: 500,
      accommodationPerDay: 25,
      mealsPerDay: 30,
      transportPerPerson: 200,
      insurancePerPerson: 120,
    },
    inclusions: ["Special permit", "Guide", "Transport", "Accommodation"],
    exclusions: ["Personal expenses", "Tips", "Extra nights"],
    requirements: {
      fitnessLevel: "Good",
      gearChecklist: ["Sun protection", "Lip balm", "Moisturizer"],
      vaccinations: ["Hepatitis A", "Typhoid"],
      permits: ["Upper Mustang Restricted Area Permit"],
    },
    bestTime: {
      months: ["April", "May", "September", "October"],
      weather: "Dry and windy",
      temperatureRange: "5°C to 25°C",
    },
    gallery: {
      coverImage:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
      images: [],
      videos: [],
    },
    variations: [],
    extraServices: [],
    isActive: true,
    isFeatured: false,
    usageCount: 56,
    createdAt: "2024-02-25T16:30:00Z",
  },
  {
    _id: "6",
    name: "Kanchenjunga Base Camp Trek",
    slug: "kanchenjunga-base-camp-trek",
    region: {
      _id: "region6",
      name: "Kanchenjunga Region",
    },
    description: "Remote trek to the base of the world's third highest peak",
    duration: 22,
    distance: 220,
    difficulty: "extreme",
    startPoint: "Taplejung",
    endPoint: "Kanchenjunga Base Camp",
    itinerary: [
      { day: 1, title: "Kathmandu to Taplejung" },
      { day: 2, title: "Taplejung to Mitlung" },
      { day: 3, title: "Mitlung to Chirwa" },
    ],
    costBreakdown: {
      guidePerDay: 35,
      permitsPerPerson: 90,
      accommodationPerDay: 30,
      mealsPerDay: 35,
      transportPerPerson: 250,
      insurancePerPerson: 150,
    },
    inclusions: ["Special permits", "Guide", "Cook", "Camping equipment"],
    exclusions: ["Personal gear", "Sleeping bag", "Insurance"],
    requirements: {
      fitnessLevel: "Excellent",
      gearChecklist: ["Expedition gear", "High-altitude clothing", "GPS"],
      vaccinations: ["Hepatitis A", "Typhoid", "Tetanus", "Malaria"],
      permits: ["Kanchenjunga Restricted Area Permit"],
    },
    bestTime: {
      months: ["March", "April", "October", "November"],
      weather: "Unpredictable",
      temperatureRange: "-15°C to 10°C",
    },
    gallery: {
      coverImage:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      images: [],
      videos: [],
    },
    variations: [],
    extraServices: [],
    isActive: false,
    isFeatured: false,
    usageCount: 23,
    createdAt: "2024-03-15T13:10:00Z",
  },
  {
    _id: "7",
    name: "Ghorepani Poon Hill Trek",
    slug: "ghorepani-poon-hill-trek",
    region: {
      _id: "region7",
      name: "Annapurna Region",
    },
    description: "Short and sweet trek with spectacular sunrise views",
    duration: 7,
    distance: 50,
    difficulty: "easy",
    startPoint: "Nayapul",
    endPoint: "Ghorepani",
    itinerary: [
      { day: 1, title: "Pokhara to Nayapul to Tikhedhunga" },
      { day: 2, title: "Tikhedhunga to Ghorepani" },
      { day: 3, title: "Ghorepani to Poon Hill to Tadapani" },
    ],
    costBreakdown: {
      guidePerDay: 18,
      permitsPerPerson: 30,
      accommodationPerDay: 12,
      mealsPerDay: 18,
      transportPerPerson: 80,
      insurancePerPerson: 70,
    },
    inclusions: ["Guide", "Permits", "Accommodation", "Transport"],
    exclusions: ["Personal expenses", "Tips", "Extra meals"],
    requirements: {
      fitnessLevel: "Beginner",
      gearChecklist: ["Daypack", "Comfortable shoes", "Camera"],
      vaccinations: ["Hepatitis A"],
      permits: ["ACAP Permit", "TIMS Card"],
    },
    bestTime: {
      months: ["March", "April", "May", "September", "October", "November"],
      weather: "Clear mountain views",
      temperatureRange: "5°C to 20°C",
    },
    gallery: {
      coverImage:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba",
      images: [],
      videos: [],
    },
    variations: [],
    extraServices: [],
    isActive: true,
    isFeatured: true,
    usageCount: 312,
    createdAt: "2024-01-10T08:20:00Z",
  },
  {
    _id: "8",
    name: "Dolpo Circuit Trek",
    slug: "dolpo-circuit-trek",
    region: {
      _id: "region8",
      name: "Dolpo Region",
    },
    description: "One of the most remote and challenging treks in Nepal",
    duration: 21,
    distance: 200,
    difficulty: "extreme",
    startPoint: "Juphal",
    endPoint: "Shey Gompa",
    itinerary: [
      { day: 1, title: "Kathmandu to Nepalgunj" },
      { day: 2, title: "Nepalgunj to Juphal" },
      { day: 3, title: "Juphal to Dunai" },
    ],
    costBreakdown: {
      guidePerDay: 40,
      permitsPerPerson: 500,
      accommodationPerDay: 35,
      mealsPerDay: 40,
      transportPerPerson: 300,
      insurancePerPerson: 180,
    },
    inclusions: ["Special permits", "Guide", "Cook", "Camping gear", "Food"],
    exclusions: ["Personal expenses", "Sleeping bag", "Travel insurance"],
    requirements: {
      fitnessLevel: "Excellent",
      gearChecklist: ["Expedition gear", "Satellite phone", "Water filter"],
      vaccinations: ["Hepatitis A", "Typhoid", "Tetanus", "Rabies"],
      permits: ["Dolpo Restricted Area Permit", "Shey Phoksundo NP Permit"],
    },
    bestTime: {
      months: ["May", "June", "September", "October"],
      weather: "Dry and cold",
      temperatureRange: "-5°C to 20°C",
    },
    gallery: {
      coverImage:
        "https://images.unsplash.com/photo-1464278533981-50106e6176b1",
      images: [],
      videos: [],
    },
    variations: [],
    extraServices: [],
    isActive: true,
    isFeatured: false,
    usageCount: 34,
    createdAt: "2024-02-20T10:45:00Z",
  },
  {
    _id: "9",
    name: "Mardi Himal Trek",
    slug: "mardi-himal-trek",
    region: {
      _id: "region9",
      name: "Annapurna Region",
    },
    description: "Off-the-beaten-path trek with amazing Annapurna views",
    duration: 8,
    distance: 65,
    difficulty: "moderate",
    startPoint: "Kande",
    endPoint: "Mardi Himal Base Camp",
    itinerary: [
      { day: 1, title: "Pokhara to Kande to Deurali" },
      { day: 2, title: "Deurali to Forest Camp" },
      { day: 3, title: "Forest Camp to High Camp" },
    ],
    costBreakdown: {
      guidePerDay: 20,
      permitsPerPerson: 30,
      accommodationPerDay: 15,
      mealsPerDay: 20,
      transportPerPerson: 90,
      insurancePerPerson: 75,
    },
    inclusions: ["Guide", "Permits", "Accommodation", "Meals"],
    exclusions: ["Personal gear", "Travel insurance", "Tips"],
    requirements: {
      fitnessLevel: "Moderate",
      gearChecklist: ["Warm clothing", "Trekking poles", "Headlamp"],
      vaccinations: ["Hepatitis A"],
      permits: ["ACAP Permit", "TIMS Card"],
    },
    bestTime: {
      months: ["March", "April", "September", "October", "November"],
      weather: "Clear skies",
      temperatureRange: "0°C to 15°C",
    },
    gallery: {
      coverImage:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      images: [],
      videos: [],
    },
    variations: [],
    extraServices: [],
    isActive: true,
    isFeatured: false,
    usageCount: 78,
    createdAt: "2024-03-01T14:15:00Z",
  },
  {
    _id: "10",
    name: "Rara Lake Trek",
    slug: "rara-lake-trek",
    region: {
      _id: "region10",
      name: "Rara Region",
    },
    description: "Trek to Nepal's largest lake in a remote national park",
    duration: 12,
    distance: 100,
    difficulty: "moderate",
    startPoint: "Talcha Airport",
    endPoint: "Rara Lake",
    itinerary: [
      { day: 1, title: "Kathmandu to Nepalgunj" },
      { day: 2, title: "Nepalgunj to Talcha to Rara Lake" },
      { day: 3, title: "Explore Rara Lake" },
    ],
    costBreakdown: {
      guidePerDay: 25,
      permitsPerPerson: 35,
      accommodationPerDay: 20,
      mealsPerDay: 25,
      transportPerPerson: 180,
      insurancePerPerson: 95,
    },
    inclusions: ["Guide", "Permits", "Accommodation", "Transport"],
    exclusions: ["Personal expenses", "Extra nights", "Tips"],
    requirements: {
      fitnessLevel: "Good",
      gearChecklist: ["Trekking gear", "Warm clothes", "Camera"],
      vaccinations: ["Hepatitis A", "Typhoid"],
      permits: ["Rara National Park Permit"],
    },
    bestTime: {
      months: ["March", "April", "May", "September", "October"],
      weather: "Pleasant",
      temperatureRange: "5°C to 20°C",
    },
    gallery: {
      coverImage:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
      images: [],
      videos: [],
    },
    variations: [],
    extraServices: [],
    isActive: true,
    isFeatured: false,
    usageCount: 41,
    createdAt: "2024-02-15T11:30:00Z",
  },
];

export default function TrekkingRoutesPage() {
  const [routes, setRoutes] = useState(mockRoutes);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const router = useRouter();

  const handleCreate = () => {
    router.push("/user/trekking-routes/create");
  };

  const handleEdit = (route: any) => {
    router.push(`/user/trekking-routes/edit/${route._id}`);
  };

  const handleDelete = (id: string) => {
    setRoutes((prev) => prev.filter((route) => route._id !== id));
    toast.success("Route deleted successfully");
  };

  const handleRefresh = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Routes refreshed successfully");
    }, 1000);
  };

  const handleExport = () => {
    toast.success("Routes exported successfully");
  };

  const handleImport = () => {
    toast.info("Import functionality coming soon");
  };

  // Filter routes based on search and filters
  const filteredRoutes = routes.filter((route) => {
    const matchesSearch =
      route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.region.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.startPoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.endPoint.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDifficulty =
      selectedDifficulty === "all" || route.difficulty === selectedDifficulty;

    const matchesStatus =
      selectedStatus === "all"
        ? true
        : selectedStatus === "active"
        ? route.isActive
        : selectedStatus === "inactive"
        ? !route.isActive
        : selectedStatus === "featured"
        ? route.isFeatured
        : true;

    return matchesSearch && matchesDifficulty && matchesStatus;
  });

  // Calculate statistics
  const totalRoutes = routes.length;
  const activeRoutes = routes.filter((r) => r.isActive).length;
  const featuredRoutes = routes.filter((r) => r.isFeatured).length;
  const totalUses = routes.reduce((sum, r) => sum + r.usageCount, 0);
  const avgDuration = Math.round(
    routes.reduce((sum, r) => sum + r.duration, 0) / routes.length
  );
  const avgDistance = Math.round(
    routes.reduce((sum, r) => sum + r.distance, 0) / routes.length
  );

  // Difficulty counts
  const difficultyCounts = routes.reduce((acc, route) => {
    acc[route.difficulty] = (acc[route.difficulty] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6 my-20">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Route className="h-8 w-8 text-primary" />
            Trekking Routes
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage all trekking routes and itineraries ({totalRoutes} routes)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={loading}>
            <RefreshCw
              className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
                {(selectedDifficulty !== "all" || selectedStatus !== "all") && (
                  <Badge className="ml-2">2</Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter by Difficulty</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSelectedDifficulty("all")}>
                All Difficulties
                <Badge variant="outline" className="ml-auto">
                  {totalRoutes}
                </Badge>
              </DropdownMenuItem>
              {Object.entries(difficultyCounts).map(([diff, count]) => (
                <DropdownMenuItem
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        diff === "easy"
                          ? "bg-emerald-500"
                          : diff === "moderate"
                          ? "bg-amber-500"
                          : diff === "challenging"
                          ? "bg-orange-500"
                          : diff === "difficult"
                          ? "bg-red-500"
                          : "bg-purple-500"
                      }`}
                    />
                    {diff.charAt(0).toUpperCase() + diff.slice(1)}
                  </div>
                  <Badge variant="outline" className="ml-auto">
                    {count}
                  </Badge>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setSelectedStatus("all")}>
                All Status
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus("active")}>
                Active Only
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus("inactive")}>
                Inactive Only
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus("featured")}>
                Featured Only
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleExport}>
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExport}>
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExport}>
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            New Route
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Route className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input
          placeholder="Search routes by name, region, start/end point..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <span className="text-muted-foreground hover:text-foreground">
              Clear
            </span>
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Routes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRoutes}</div>
            <p className="text-xs text-muted-foreground">
              {filteredRoutes.length} filtered
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Routes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {activeRoutes}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((activeRoutes / totalRoutes) * 100)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Featured Routes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {featuredRoutes}
            </div>
            <p className="text-xs text-muted-foreground">
              Highlighted on homepage
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Uses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUses}</div>
            <p className="text-xs text-muted-foreground">
              Bookings & inquiries
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Duration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgDuration} days</div>
            <p className="text-xs text-muted-foreground">Average trek length</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Distance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgDistance} km</div>
            <p className="text-xs text-muted-foreground">
              Average trek distance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Difficulty Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Difficulty Distribution</CardTitle>
          <CardDescription>
            Breakdown of routes by difficulty level
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {Object.entries(difficultyCounts).map(([difficulty, count]) => {
              const percentage = Math.round((count / totalRoutes) * 100);
              const color =
                difficulty === "easy"
                  ? "bg-emerald-500"
                  : difficulty === "moderate"
                  ? "bg-amber-500"
                  : difficulty === "challenging"
                  ? "bg-orange-500"
                  : difficulty === "difficult"
                  ? "bg-red-500"
                  : "bg-purple-500";

              return (
                <div key={difficulty} className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${color}`} />
                  <span className="font-medium">
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </span>
                  <span className="text-muted-foreground">
                    {count} ({percentage}%)
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Routes Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Trekking Routes ({filteredRoutes.length})</span>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-normal">
                Showing {filteredRoutes.length} of {totalRoutes} routes
              </Badge>
            </div>
          </CardTitle>
          <CardDescription>
            {selectedDifficulty !== "all" && (
              <span className="inline-flex items-center gap-1 mr-2">
                Difficulty: <Badge>{selectedDifficulty}</Badge>
              </span>
            )}
            {selectedStatus !== "all" && (
              <span className="inline-flex items-center gap-1">
                Status: <Badge>{selectedStatus}</Badge>
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RoutesTable
            routes={filteredRoutes}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onRefresh={handleRefresh}
          />
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>
          Need help?{" "}
          <button
            onClick={() => toast.info("Help documentation coming soon")}
            className="text-primary hover:underline"
          >
            View documentation
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleImport}
            className="flex items-center gap-1 hover:text-foreground"
          >
            <Upload className="h-4 w-4" />
            Import routes
          </button>
          <button
            onClick={() => router.push("/user/trekking-regions")}
            className="flex items-center gap-1 hover:text-foreground"
          >
            <Route className="h-4 w-4" />
            Manage regions
          </button>
        </div>
      </div>
    </div>
  );
}
