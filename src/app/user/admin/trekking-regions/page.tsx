"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegionForm from "./region-form";
import RegionsTable from "./regions-table";
import { Mountain, Plus, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { getTrekkingRegions } from "@/api/routes/trekking-regions";

// Mock data - replace with actual API calls
const mockRegions = [
  {
    _id: "1",
    name: "Everest Base Camp Trek",
    slug: "everest-base-camp-trek",
    description:
      "A classic trek to the base of the world's highest mountain, Mount Everest (8,848m). Experience Sherpa culture, Buddhist monasteries, and breathtaking Himalayan scenery.",
    shortDescription:
      "Trek to the base of Mount Everest through the iconic Khumbu region.",
    image: "/api/placeholder/400/300",
    gallery: [
      "/api/placeholder/400/300",
      "/api/placeholder/400/300",
      "/api/placeholder/400/300",
    ],
    location: "Khumbu Region, Nepal",
    coordinates: {
      lat: 27.9881,
      lng: 86.925,
    },
    difficulty: "moderate",
    minAltitude: 2860,
    maxAltitude: 5545,
    avgDuration: 14,
    avgDistance: 130,
    bestSeasons: ["spring", "autumn"],
    permitsRequired: ["TIMS Card", "Sagarmatha National Park Permit"],
    permitCost: 50,
    highlights: [
      "Sunrise view from Kala Patthar (5,545m)",
      "Visit Tengboche Monastery",
      "Explore Namche Bazaar",
      "Close-up views of Mount Everest",
    ],
    statistics: {
      totalTreks: 1250,
      successRate: 95,
      avgGroupSize: 8,
      avgCostPerPerson: 1500,
    },
    requirements: {
      fitnessLevel: "Good physical fitness required",
      experience: "Previous high-altitude trekking experience recommended",
      gearRequired: [
        "-20°C Sleeping bag",
        "Trekking poles",
        "Down jacket",
        "Waterproof boots",
      ],
    },
    tags: ["high-altitude", "popular", "cultural", "challenging"],
    faqs: [
      {
        question: "What is the best time to do Everest Base Camp trek?",
        answer:
          "The best seasons are Spring (March to May) and Autumn (September to November).",
      },
      {
        question: "Do I need a guide for this trek?",
        answer:
          "While not mandatory, hiring a guide is highly recommended for safety and cultural insights.",
      },
    ],
    isActive: true,
    popularity: 92,
    featured: true,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T14:45:00Z",
  },
  {
    _id: "2",
    name: "Annapurna Circuit Trek",
    slug: "annapurna-circuit-trek",
    description:
      "One of the world's classic treks circling the Annapurna Massif. Experience diverse landscapes from subtropical forests to the high-altitude Thorong La Pass.",
    shortDescription:
      "Circle the Annapurna Massif through diverse landscapes and cultures.",
    image: "/api/placeholder/400/300",
    gallery: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
    location: "Annapurna Region, Nepal",
    coordinates: {
      lat: 28.3949,
      lng: 83.8304,
    },
    difficulty: "challenging",
    minAltitude: 820,
    maxAltitude: 5416,
    avgDuration: 18,
    avgDistance: 230,
    bestSeasons: ["spring", "autumn"],
    permitsRequired: ["Annapurna Conservation Area Permit (ACAP)", "TIMS Card"],
    permitCost: 35,
    highlights: [
      "Cross Thorong La Pass (5,416m)",
      "Visit Muktinath Temple",
      "Natural hot springs at Tatopani",
      "Views of Annapurna I, II, III, and IV",
    ],
    statistics: {
      totalTreks: 890,
      successRate: 88,
      avgGroupSize: 6,
      avgCostPerPerson: 1200,
    },
    requirements: {
      fitnessLevel: "Very good physical fitness required",
      experience: "Previous trekking experience required",
      gearRequired: [
        "-15°C Sleeping bag",
        "Trekking poles",
        "Gaiters",
        "Sun protection",
      ],
    },
    tags: ["classic", "diverse-landscapes", "cultural", "long-trek"],
    faqs: [
      {
        question: "How difficult is Thorong La Pass?",
        answer:
          "Thorong La Pass is challenging due to altitude and length. Proper acclimatization is crucial.",
      },
    ],
    isActive: true,
    popularity: 85,
    featured: true,
    createdAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-18T11:20:00Z",
  },
  {
    _id: "3",
    name: "Langtang Valley Trek",
    slug: "langtang-valley-trek",
    description:
      "A beautiful trek close to Kathmandu, offering stunning valley views, Tibetan culture, and the chance to see the rare red panda.",
    shortDescription: "Explore the beautiful Langtang Valley near Kathmandu.",
    image: "/api/placeholder/400/300",
    gallery: ["/api/placeholder/400/300"],
    location: "Langtang Region, Nepal",
    coordinates: {
      lat: 28.2279,
      lng: 85.5578,
    },
    difficulty: "moderate",
    minAltitude: 1500,
    maxAltitude: 4984,
    avgDuration: 10,
    avgDistance: 85,
    bestSeasons: ["spring", "autumn", "winter"],
    permitsRequired: ["Langtang National Park Permit", "TIMS Card"],
    permitCost: 30,
    highlights: [
      "Visit Kyanjin Gompa",
      "See glaciers and glacial lakes",
      "Tibetan-influenced culture",
      "Views of Langtang Lirung",
    ],
    statistics: {
      totalTreks: 450,
      successRate: 92,
      avgGroupSize: 5,
      avgCostPerPerson: 800,
    },
    requirements: {
      fitnessLevel: "Moderate fitness required",
      experience: "Suitable for beginners with good fitness",
      gearRequired: ["-10°C Sleeping bag", "Day pack", "Warm layers"],
    },
    tags: ["accessible", "cultural", "wildlife", "moderate"],
    faqs: [],
    isActive: true,
    popularity: 78,
    featured: false,
    createdAt: "2024-01-05T14:20:00Z",
    updatedAt: "2024-01-12T16:30:00Z",
  },
  {
    _id: "4",
    name: "Manaslu Circuit Trek",
    slug: "manaslu-circuit-trek",
    description:
      "A remote and restricted trek around the world's eighth highest mountain. Experience pristine wilderness and authentic Nepalese culture.",
    shortDescription: "Restricted area trek around Mount Manaslu.",
    image: "/api/placeholder/400/300",
    gallery: [],
    location: "Manaslu Region, Nepal",
    coordinates: {
      lat: 28.55,
      lng: 84.56,
    },
    difficulty: "difficult",
    minAltitude: 700,
    maxAltitude: 5106,
    avgDuration: 16,
    avgDistance: 177,
    bestSeasons: ["spring", "autumn"],
    permitsRequired: [
      "Manaslu Restricted Area Permit",
      "Manaslu Conservation Area Permit",
      "Annapurna Conservation Area Permit",
    ],
    permitCost: 100,
    highlights: [
      "Larkya La Pass (5,106m)",
      "Tsum Valley side trip",
      "Authentic Tibetan villages",
      "Views of Manaslu (8,163m)",
    ],
    statistics: {
      totalTreks: 120,
      successRate: 82,
      avgGroupSize: 4,
      avgCostPerPerson: 1800,
    },
    requirements: {
      fitnessLevel: "Excellent physical fitness required",
      experience: "Previous high-altitude trekking experience essential",
      gearRequired: [
        "-20°C Sleeping bag",
        "4-season tent",
        "High-altitude gear",
        "Satellite phone",
      ],
    },
    tags: ["restricted", "remote", "challenging", "wilderness"],
    faqs: [],
    isActive: false,
    popularity: 65,
    featured: false,
    createdAt: "2024-01-01T08:45:00Z",
    updatedAt: "2024-01-10T10:15:00Z",
  },
  {
    _id: "5",
    name: "Markha Valley Trek",
    slug: "markha-valley-trek",
    description:
      "The most popular trek in Ladakh, India, offering stunning landscapes, Buddhist monasteries, and the chance to experience nomadic culture.",
    shortDescription:
      "Classic trek through the beautiful Markha Valley in Ladakh.",
    image: "/api/placeholder/400/300",
    gallery: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
    location: "Ladakh, India",
    coordinates: {
      lat: 33.7782,
      lng: 77.5762,
    },
    difficulty: "moderate",
    minAltitude: 3200,
    maxAltitude: 5200,
    avgDuration: 9,
    avgDistance: 75,
    bestSeasons: ["summer"],
    permitsRequired: ["Inner Line Permit"],
    permitCost: 25,
    highlights: [
      "Cross Kongmaru La Pass (5,200m)",
      "Visit ancient monasteries",
      "Stay in traditional homestays",
      "Views of Kang Yatse and Stok Kangri",
    ],
    statistics: {
      totalTreks: 320,
      successRate: 90,
      avgGroupSize: 6,
      avgCostPerPerson: 900,
    },
    requirements: {
      fitnessLevel: "Good physical fitness required",
      experience: "Previous trekking experience recommended",
      gearRequired: [
        "-10°C Sleeping bag",
        "Sun protection",
        "Layered clothing",
      ],
    },
    tags: ["india", "buddhist", "homestay", "summer-trek"],
    faqs: [
      {
        question: "When is Markha Valley trek accessible?",
        answer:
          "The trek is only accessible during summer months (June to September) when the passes are snow-free.",
      },
    ],
    isActive: true,
    popularity: 72,
    featured: false,
    createdAt: "2023-12-20T11:30:00Z",
    updatedAt: "2024-01-05T09:45:00Z",
  },
  {
    _id: "6",
    name: "Upper Mustang Trek",
    slug: "upper-mustang-trek",
    description:
      "A journey to the forbidden kingdom of Mustang, a high-altitude desert with Tibetan culture, ancient cave dwellings, and unique landscapes.",
    shortDescription:
      "Explore the restricted kingdom of Mustang with its Tibetan culture.",
    image: "/api/placeholder/400/300",
    gallery: [
      "/api/placeholder/400/300",
      "/api/placeholder/400/300",
      "/api/placeholder/400/300",
    ],
    location: "Mustang Region, Nepal",
    coordinates: {
      lat: 29.1833,
      lng: 83.9333,
    },
    difficulty: "moderate",
    minAltitude: 2800,
    maxAltitude: 4200,
    avgDuration: 14,
    avgDistance: 160,
    bestSeasons: ["spring", "autumn"],
    permitsRequired: ["Upper Mustang Restricted Area Permit"],
    permitCost: 500,
    highlights: [
      "Visit Lo Manthang, the walled capital",
      "Ancient cave dwellings",
      "Tibetan Buddhist monasteries",
      "Unique desert landscape",
    ],
    statistics: {
      totalTreks: 180,
      successRate: 95,
      avgGroupSize: 5,
      avgCostPerPerson: 2500,
    },
    requirements: {
      fitnessLevel: "Good physical fitness required",
      experience: "Previous trekking experience recommended",
      gearRequired: [
        "-10°C Sleeping bag",
        "Dust mask",
        "Warm clothing",
        "Camera",
      ],
    },
    tags: ["restricted", "cultural", "desert", "expensive"],
    faqs: [],
    isActive: true,
    popularity: 68,
    featured: true,
    createdAt: "2023-12-15T13:20:00Z",
    updatedAt: "2023-12-28T15:40:00Z",
  },
  {
    _id: "7",
    name: "Gokyo Lakes Trek",
    slug: "gokyo-lakes-trek",
    description:
      "An alternative to Everest Base Camp, featuring stunning turquoise lakes, the Ngozumpa Glacier, and breathtaking views from Gokyo Ri.",
    shortDescription:
      "Trek to the beautiful Gokyo Lakes in the Everest region.",
    image: "/api/placeholder/400/300",
    gallery: ["/api/placeholder/400/300"],
    location: "Khumbu Region, Nepal",
    coordinates: {
      lat: 27.95,
      lng: 86.6833,
    },
    difficulty: "moderate",
    minAltitude: 2860,
    maxAltitude: 5357,
    avgDuration: 12,
    avgDistance: 110,
    bestSeasons: ["spring", "autumn"],
    permitsRequired: ["Sagarmatha National Park Permit", "TIMS Card"],
    permitCost: 50,
    highlights: [
      "Gokyo Lakes (world's highest freshwater lake system)",
      "View from Gokyo Ri (5,357m)",
      "Ngozumpa Glacier (longest in Nepal)",
      "Views of four 8,000m peaks",
    ],
    statistics: {
      totalTreks: 280,
      successRate: 92,
      avgGroupSize: 6,
      avgCostPerPerson: 1400,
    },
    requirements: {
      fitnessLevel: "Good physical fitness required",
      experience: "Previous trekking experience recommended",
      gearRequired: [
        "-15°C Sleeping bag",
        "Trekking poles",
        "Warm layers",
        "Sunglasses",
      ],
    },
    tags: ["everest-region", "lakes", "alternative", "glacier"],
    faqs: [],
    isActive: true,
    popularity: 75,
    featured: false,
    createdAt: "2023-12-10T10:15:00Z",
    updatedAt: "2023-12-22T14:30:00Z",
  },
];

export default function TrekkingRegionsPage() {
  const [regions, setRegions] = useState();
  const [activeTab, setActiveTab] = useState("list");
  const [selectedRegion, setSelectedRegion] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const {
    data: trekkingRegions,
    isPending,
    isError,
    isSuccess,
    refetch: fetchRegions,
  } = useQuery({
    queryFn: getTrekkingRegions,
    queryKey: ["trekking-regions"],
  });

  useEffect(() => {
    if (isSuccess && trekkingRegions) {
      console.log(trekkingRegions);
      setRegions(trekkingRegions);
    }
  }, [isSuccess, trekkingRegions]);

  const handleCreate = () => {
    setSelectedRegion(null);
    setActiveTab("create");
  };

  const handleEdit = (region: any) => {
    setSelectedRegion(region);
    setActiveTab("edit");
  };

  const handleDelete = (id: string) => {
    setRegions((prev) => prev.filter((region) => region._id !== id));
  };

  const handleFormSuccess = () => {
    fetchRegions();
    setActiveTab("list");
    toast.success("Operation completed successfully");
  };

  const handleFormCancel = () => {
    setActiveTab("list");
    setSelectedRegion(null);
  };

  return (
    <div className="space-y-6 mt-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Trekking Regions
          </h1>
          <p className="text-muted-foreground">
            Manage all trekking regions available on the platform
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => fetchRegions()}
            disabled={loading}
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            New Region
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList>
          <TabsTrigger value="list" className="flex items-center gap-2">
            <Mountain className="h-4 w-4" />
            All Regions ({regions?.length})
          </TabsTrigger>
          <TabsTrigger value="create" disabled={activeTab === "edit"}>
            Create New
          </TabsTrigger>
          <TabsTrigger value="edit" disabled={!selectedRegion}>
            Edit Region
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          {isSuccess && regions && (
            <RegionsTable
              regions={regions}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onRefresh={fetchRegions}
            />
          )}
        </TabsContent>

        <TabsContent value="create">
          <RegionForm
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        </TabsContent>

        <TabsContent value="edit">
          {selectedRegion && (
            <RegionForm
              region={selectedRegion}
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
