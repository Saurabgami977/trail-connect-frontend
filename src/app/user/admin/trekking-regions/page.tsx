"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegionForm from "./region-form";
import RegionsTable from "./regions-table";
import { Mountain, Plus, RefreshCw } from "lucide-react";
import { toast } from "sonner";

// Mock data - replace with actual API calls
const mockRegions = [
  {
    id: "1",
    name: "Everest Base Camp",
    slug: "everest-base-camp",
    country: "Nepal",
    difficulty: "moderate",
    duration: "12-14 days",
    altitude: "5,545m",
    isActive: true,
    imageUrl: "/api/placeholder/80/60",
    createdAt: "2024-01-15",
    guideCount: 24,
  },
  {
    id: "2",
    name: "Annapurna Circuit",
    slug: "annapurna-circuit",
    country: "Nepal",
    difficulty: "challenging",
    duration: "15-20 days",
    altitude: "5,416m",
    isActive: true,
    imageUrl: "/api/placeholder/80/60",
    createdAt: "2024-01-10",
    guideCount: 18,
  },
  {
    id: "3",
    name: "Langtang Valley",
    slug: "langtang-valley",
    country: "Nepal",
    difficulty: "moderate",
    duration: "7-10 days",
    altitude: "4,984m",
    isActive: true,
    imageUrl: "/api/placeholder/80/60",
    createdAt: "2024-01-05",
    guideCount: 12,
  },
  {
    id: "4",
    name: "Manaslu Circuit",
    slug: "manaslu-circuit",
    country: "Nepal",
    difficulty: "strenuous",
    duration: "14-18 days",
    altitude: "5,106m",
    isActive: false,
    imageUrl: "/api/placeholder/80/60",
    createdAt: "2024-01-01",
    guideCount: 8,
  },
  {
    id: "5",
    name: "Markha Valley",
    slug: "markha-valley",
    country: "India",
    difficulty: "moderate",
    duration: "8-10 days",
    altitude: "5,200m",
    isActive: true,
    imageUrl: "/api/placeholder/80/60",
    createdAt: "2023-12-20",
    guideCount: 6,
  },
];

export default function TrekkingRegionsPage() {
  const [regions, setRegions] = useState(mockRegions);
  const [activeTab, setActiveTab] = useState("list");
  const [selectedRegion, setSelectedRegion] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Fetch regions from API
  const fetchRegions = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/trekking-regions");
      if (response.ok) {
        const data = await response.json();
        setRegions(data);
      }
    } catch (error) {
      console.error("Failed to fetch regions:", error);
      toast.error("Failed to load regions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegions();
  }, []);

  const handleCreate = () => {
    setSelectedRegion(null);
    setActiveTab("create");
  };

  const handleEdit = (region: any) => {
    setSelectedRegion(region);
    setActiveTab("edit");
  };

  const handleDelete = (id: string) => {
    setRegions((prev) => prev.filter((region) => region.id !== id));
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
    <div className="space-y-6">
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
          <Button variant="outline" onClick={fetchRegions} disabled={loading}>
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
            All Regions ({regions.length})
          </TabsTrigger>
          <TabsTrigger value="create" disabled={activeTab === "edit"}>
            Create New
          </TabsTrigger>
          <TabsTrigger value="edit" disabled={!selectedRegion}>
            Edit Region
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <RegionsTable
            regions={regions}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onRefresh={fetchRegions}
          />
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
