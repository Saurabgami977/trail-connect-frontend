"use client";

import { useEffect, useState } from "react";
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
import { useQuery } from "@tanstack/react-query";
import { getTrekTemplates } from "@/api/routes/trek-template";

export default function TrekkingRoutesPage() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const router = useRouter();

  const { data: trekTemplates, isPending } = useQuery({
    queryKey: ["trek-templates"],
    queryFn: getTrekTemplates,
  });

  useEffect(() => {
    if (!isPending && trekTemplates) {
      console.log("Fetched Trek Templates:", trekTemplates);
      // You can integrate trekTemplates into your routes state if needed
      setRoutes(trekTemplates);
    }
  }, [isPending, trekTemplates]);

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
  const filteredRoutes = routes?.filter((route) => {
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
  const totalRoutes = routes?.length;
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
