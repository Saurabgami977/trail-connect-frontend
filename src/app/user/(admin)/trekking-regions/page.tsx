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

export default function TrekkingRegionsPage() {
  const [regions, setRegions] = useState();
  const [activeTab, setActiveTab] = useState("list");
  const [selectedRegion, setSelectedRegion] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const {
    data: trekkingRegions,
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
