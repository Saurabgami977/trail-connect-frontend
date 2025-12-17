"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Mountain,
  MapPin,
  Clock,
  Ruler,
  Users,
  TrendingUp,
  CheckCircle,
  XCircle,
  Filter,
  Star,
  Download,
  Upload,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface Region {
  _id: string;
  name: string;
  slug: string;
  location: string;
  difficulty: string;
  minAltitude: number;
  maxAltitude: number;
  avgDuration: number;
  avgDistance: number;
  isActive: boolean;
  featured: boolean;
  popularity: number;
  image?: string;
  createdAt: string;
  bestSeasons: string[];
  statistics?: {
    totalTreks?: number;
    successRate?: number;
    avgGroupSize?: number;
  };
}

interface RegionsTableProps {
  regions: Region[];
  onEdit: (region: Region) => void;
  onDelete: (id: string) => void;
  onRefresh: () => void;
}

const difficultyColors: Record<string, string> = {
  easy: "bg-emerald-100 text-emerald-700",
  moderate: "bg-amber-100 text-amber-700",
  challenging: "bg-orange-100 text-orange-700",
  difficult: "bg-red-100 text-red-700",
  extreme: "bg-purple-100 text-purple-700",
};

const getDifficultyLabel = (difficulty: string) => {
  const labels: Record<string, string> = {
    easy: "Easy",
    moderate: "Moderate",
    challenging: "Challenging",
    difficult: "Difficult",
    extreme: "Extreme",
  };
  return labels[difficulty] || difficulty;
};

export default function RegionsTable({
  regions: initialRegions,
  onEdit,
  onDelete,
  onRefresh,
}: RegionsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [regionToDelete, setRegionToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Filter regions
  const filteredRegions = initialRegions.filter((region) => {
    const matchesSearch =
      region.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      region.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      region.slug.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDifficulty =
      selectedDifficulty === "all" || region.difficulty === selectedDifficulty;

    const matchesStatus =
      selectedStatus === "all"
        ? true
        : selectedStatus === "active"
        ? region.isActive
        : selectedStatus === "inactive"
        ? !region.isActive
        : selectedStatus === "featured"
        ? region.featured
        : true;

    return matchesSearch && matchesDifficulty && matchesStatus;
  });

  const difficultyCounts = initialRegions.reduce((acc, region) => {
    acc[region.difficulty] = (acc[region.difficulty] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleDelete = async () => {
    if (!regionToDelete) return;

    setLoading(true);
    try {
      const response = await fetch(
        `/api/admin/trekking-regions/${regionToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete region");
      }

      toast.success("Region deleted successfully");
      onDelete(regionToDelete);
      setDeleteDialogOpen(false);
      setRegionToDelete(null);
    } catch (error) {
      console.error("Error deleting region:", error);
      toast.error("Failed to delete region");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/trekking-regions/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      toast.success(`Region ${!currentStatus ? "activated" : "deactivated"}`);
      onRefresh();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleFeaturedToggle = async (id: string, currentFeatured: boolean) => {
    try {
      const response = await fetch(
        `/api/admin/trekking-regions/${id}/featured`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ featured: !currentFeatured }),
        }
      );

      if (!response.ok) throw new Error("Failed to update featured status");

      toast.success(`Region ${!currentFeatured ? "featured" : "unfeatured"}`);
      onRefresh();
    } catch (error) {
      console.error("Error updating featured status:", error);
      toast.error("Failed to update featured status");
    }
  };

  return (
    <>
      {/* Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search regions by name, location, or slug..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Difficulty
                  {selectedDifficulty !== "all" && (
                    <Badge className="ml-2">
                      {difficultyCounts[selectedDifficulty] || 0}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Filter by Difficulty</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSelectedDifficulty("all")}>
                  All Difficulties
                  <Badge variant="outline" className="ml-auto">
                    {initialRegions.length}
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
                      {getDifficultyLabel(diff)}
                    </div>
                    <Badge variant="outline" className="ml-auto">
                      {count}
                    </Badge>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
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

            <Button variant="outline" onClick={onRefresh}>
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <Mountain className="h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold">
                {initialRegions.length}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Total Regions</p>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-500" />
              <span className="text-2xl font-bold">
                {initialRegions.filter((r) => r.isActive).length}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Active</p>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold">
                {initialRegions.filter((r) => !r.isActive).length}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Inactive</p>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-500" />
              <span className="text-2xl font-bold">
                {initialRegions.filter((r) => r.featured).length}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Featured</p>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold">
                {initialRegions.reduce(
                  (sum, r) => sum + (r.statistics?.totalTreks || 0),
                  0
                )}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Total Treks</p>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold">
                {Math.round(
                  initialRegions.reduce(
                    (sum, r) => sum + (r.popularity || 0),
                    0
                  ) / initialRegions.length
                ) || 0}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Avg Popularity</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Image</TableHead>
              <TableHead>Region Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Altitude</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Distance</TableHead>
              <TableHead>Seasons</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Popularity</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRegions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} className="text-center py-8">
                  <div className="flex flex-col items-center gap-2">
                    <Mountain className="h-12 w-12 text-muted-foreground" />
                    <p className="text-muted-foreground">No regions found</p>
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your search or filters
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredRegions.map((region) => (
                <TableRow key={region._id}>
                  <TableCell>
                    <div className="relative h-10 w-10 overflow-hidden rounded">
                      {region.image ? (
                        <Image
                          src={region.image}
                          alt={region.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-muted">
                          <Mountain className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    <div>
                      <p>{region.name}</p>
                      <p className="text-xs text-muted-foreground">
                        /{region.slug}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{region.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={difficultyColors[region.difficulty]}>
                      {getDifficultyLabel(region.difficulty)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {region.minAltitude}-{region.maxAltitude}m
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{region.avgDuration}d</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Ruler className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{region.avgDistance}km</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {region.bestSeasons.slice(0, 2).map((season) => (
                        <Badge
                          key={season}
                          variant="outline"
                          className="text-xs"
                        >
                          {season}
                        </Badge>
                      ))}
                      {region.bestSeasons.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{region.bestSeasons.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {region.isActive ? (
                        <Badge
                          variant="outline"
                          className="border-emerald-200 bg-emerald-50 text-emerald-700 text-xs"
                        >
                          Active
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="border-muted bg-muted text-muted-foreground text-xs"
                        >
                          Inactive
                        </Badge>
                      )}
                      {region.featured && (
                        <Badge
                          variant="outline"
                          className="border-amber-200 bg-amber-50 text-amber-700 text-xs"
                        >
                          Featured
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{region.popularity}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            window.open(`/trekking/${region.slug}`, "_blank")
                          }
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Public Page
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(region)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusToggle(region._id, region.isActive)
                          }
                        >
                          {region.isActive ? (
                            <>
                              <XCircle className="mr-2 h-4 w-4" />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Activate
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleFeaturedToggle(region._id, region.featured)
                          }
                        >
                          {region.featured ? (
                            <>
                              <Star className="mr-2 h-4 w-4" />
                              Unfeature
                            </>
                          ) : (
                            <>
                              <Star className="mr-2 h-4 w-4" />
                              Feature
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            setRegionToDelete(region._id);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Region</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this trekking region? This action
              cannot be undone. All associated data will be permanently removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete Region"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
