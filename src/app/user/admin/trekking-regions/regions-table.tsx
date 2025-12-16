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
  Users,
  CheckCircle,
  XCircle,
  Filter,
  Download,
  Upload,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface Region {
  id: string;
  name: string;
  slug: string;
  country: string;
  difficulty: string;
  duration: string;
  altitude: string;
  isActive: boolean;
  imageUrl: string;
  createdAt: string;
  guideCount: number;
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
  strenuous: "bg-red-100 text-red-700",
};

export default function RegionsTable({
  regions: initialRegions,
  onEdit,
  onDelete,
  onRefresh,
}: RegionsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [regionToDelete, setRegionToDelete] = useState<string | null>(null);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Filter regions
  const filteredRegions = initialRegions.filter((region) => {
    const matchesSearch =
      region.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      region.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      region.slug.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDifficulty =
      selectedDifficulty === "all" || region.difficulty === selectedDifficulty;

    const matchesCountry =
      selectedCountry === "all" || region.country === selectedCountry;

    return matchesSearch && matchesDifficulty && matchesCountry;
  });

  const countries = Array.from(new Set(initialRegions.map((r) => r.country)));
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

  const handleExport = async () => {
    try {
      const response = await fetch("/api/admin/trekking-regions/export");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `trekking-regions-${
        new Date().toISOString().split("T")[0]
      }.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast.success("Regions exported successfully");
      setExportDialogOpen(false);
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Export failed");
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const response = await fetch("/api/admin/trekking-regions/import", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      toast.success("Regions imported successfully");
      setImportDialogOpen(false);
      onRefresh();
    } catch (error) {
      console.error("Import failed:", error);
      toast.error("Import failed. Please check the file format.");
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    const labels: Record<string, string> = {
      easy: "Easy",
      moderate: "Moderate",
      challenging: "Challenging",
      strenuous: "Strenuous",
    };
    return labels[difficulty] || difficulty;
  };

  return (
    <>
      {/* Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search regions by name, country, or slug..."
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
                            : "bg-red-500"
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
                  <MapPin className="mr-2 h-4 w-4" />
                  Country
                  {selectedCountry !== "all" && (
                    <Badge className="ml-2">
                      {
                        initialRegions.filter(
                          (r) => r.country === selectedCountry
                        ).length
                      }
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Filter by Country</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSelectedCountry("all")}>
                  All Countries
                </DropdownMenuItem>
                {countries.map((country) => (
                  <DropdownMenuItem
                    key={country}
                    onClick={() => setSelectedCountry(country)}
                  >
                    {country}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setImportDialogOpen(true)}>
                  <Upload className="mr-2 h-4 w-4" />
                  Import CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setExportDialogOpen(true)}>
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="text-2xl font-bold">
                {initialRegions.reduce((sum, r) => sum + r.guideCount, 0)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Total Guides</p>
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
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Region Name</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Altitude</TableHead>
              <TableHead>Guides</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRegions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-8">
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
                <TableRow key={region.id}>
                  <TableCell>
                    <div className="relative h-12 w-16 overflow-hidden rounded">
                      <Image
                        src={region.imageUrl || "/placeholder.jpg"}
                        alt={region.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    <div>
                      <p>{region.name}</p>
                      <p className="text-sm text-muted-foreground">
                        /{region.slug}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {region.country}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={difficultyColors[region.difficulty]}>
                      {getDifficultyLabel(region.difficulty)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {region.duration}
                    </div>
                  </TableCell>
                  <TableCell>{region.altitude}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {region.guideCount}
                    </div>
                  </TableCell>
                  <TableCell>
                    {region.isActive ? (
                      <Badge
                        variant="outline"
                        className="border-emerald-200 bg-emerald-50 text-emerald-700"
                      >
                        Active
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="border-muted bg-muted text-muted-foreground"
                      >
                        Inactive
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(region.createdAt).toLocaleDateString()}
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
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            setRegionToDelete(region.id);
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

      {/* Pagination would go here */}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Region</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this region? This action cannot be
              undone. All associated guides and bookings will be affected.
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

      {/* Import Dialog */}
      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Regions</DialogTitle>
            <DialogDescription>
              Upload a CSV file with region data. The file should include
              columns: name, slug, country, difficulty, duration, altitude,
              description
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-lg border-2 border-dashed p-8 text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-sm text-muted-foreground">
                Drag and drop your CSV file here, or click to browse
              </p>
              <Input
                type="file"
                accept=".csv"
                onChange={handleImport}
                className="mt-4 cursor-pointer"
                disabled={loading}
              />
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm font-medium">CSV Format:</p>
              <pre className="mt-2 text-xs">
                {`name,slug,country,difficulty,duration,altitude,description
Everest Base Camp,everest-base-camp,Nepal,moderate,"12-14 days","5,545m","Trek to the base of the world's highest mountain"
Annapurna Circuit,annapurna-circuit,Nepal,challenging,"15-20 days","5,416m","Classic trek around the Annapurna massif"`}
              </pre>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setImportDialogOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Regions</DialogTitle>
            <DialogDescription>
              Export all regions to a CSV file. The file will include all region
              details.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm font-medium">Export Options</p>
              <div className="mt-2 space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Include all region details</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Include guide counts</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Format dates as YYYY-MM-DD</span>
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setExportDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
