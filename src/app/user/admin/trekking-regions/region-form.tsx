"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Mountain,
  MapPin,
  Users,
  Clock,
  DollarSign,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface RegionFormProps {
  region?: any; // For edit mode
  onSuccess?: () => void;
  onCancel?: () => void;
}

const difficultyLevels = [
  { value: "easy", label: "Easy", color: "bg-emerald-100 text-emerald-700" },
  {
    value: "moderate",
    label: "Moderate",
    color: "bg-amber-100 text-amber-700",
  },
  {
    value: "challenging",
    label: "Challenging",
    color: "bg-orange-100 text-orange-700",
  },
  { value: "strenuous", label: "Strenuous", color: "bg-red-100 text-red-700" },
];

const seasons = [
  "Spring (Mar-May)",
  "Summer (Jun-Aug)",
  "Autumn (Sep-Nov)",
  "Winter (Dec-Feb)",
];

export default function RegionForm({
  region,
  onSuccess,
  onCancel,
}: RegionFormProps) {
  const [formData, setFormData] = useState({
    name: region?.name || "",
    slug: region?.slug || "",
    country: region?.country || "Nepal",
    description: region?.description || "",
    overview: region?.overview || "",
    difficulty: region?.difficulty || "moderate",
    duration: region?.duration || "",
    bestSeason: region?.bestSeason || [],
    altitude: region?.altitude || "",
    startingPoint: region?.startingPoint || "",
    endingPoint: region?.endingPoint || "",
    permitRequired: region?.permitRequired || false,
    permitCost: region?.permitCost || "",
    isActive: region?.isActive ?? true,
  });

  const [selectedSeason, setSelectedSeason] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(region?.imageUrl || "");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto-generate slug from name
    if (name === "name") {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-");
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSeasonAdd = () => {
    if (selectedSeason && !formData.bestSeason.includes(selectedSeason)) {
      setFormData((prev) => ({
        ...prev,
        bestSeason: [...prev.bestSeason, selectedSeason],
      }));
      setSelectedSeason("");
    }
  };

  const handleSeasonRemove = (season: string) => {
    setFormData((prev) => ({
      ...prev,
      bestSeason: prev.bestSeason.filter((s) => s !== season),
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error("Image size should be less than 5MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }

      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare form data
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "bestSeason") {
          submitData.append(key, JSON.stringify(value));
        } else if (value !== null && value !== undefined) {
          submitData.append(key, String(value));
        }
      });

      if (image) {
        submitData.append("image", image);
      }

      const url = region
        ? `/api/admin/trekking-regions/${region.id}`
        : "/api/admin/trekking-regions";

      const method = region ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: submitData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      toast.success(
        region ? "Region updated successfully!" : "Region created successfully!"
      );

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error saving region:", error);
      toast.error("Failed to save region. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mountain className="h-5 w-5" />
          {region ? "Edit Trekking Region" : "Create New Trekking Region"}
        </CardTitle>
        <CardDescription>
          {region
            ? "Update the trekking region details below."
            : "Fill in the details to add a new trekking region to the platform."}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-4">
            <Label>Region Image</Label>
            <div className="flex items-center gap-4">
              <div className="relative h-40 w-64 rounded-lg border-2 border-dashed border-muted">
                {imagePreview ? (
                  <>
                    <Image
                      src={imagePreview}
                      alt="Region preview"
                      fill
                      className="rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImage(null);
                        setImagePreview("");
                      }}
                      className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Upload region image
                    </p>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="cursor-pointer"
                />
                <p className="mt-2 text-sm text-muted-foreground">
                  Recommended: 16:9 ratio, max 5MB
                </p>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Region Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Everest Base Camp"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug *</Label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                placeholder="e.g., everest-base-camp"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Select
                value={formData.country}
                onValueChange={(value) => handleSelectChange("country", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nepal">Nepal</SelectItem>
                  <SelectItem value="India">India</SelectItem>
                  <SelectItem value="Bhutan">Bhutan</SelectItem>
                  <SelectItem value="Tibet">Tibet</SelectItem>
                  <SelectItem value="Pakistan">Pakistan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty Level *</Label>
              <Select
                value={formData.difficulty}
                onValueChange={(value) =>
                  handleSelectChange("difficulty", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficultyLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      <span
                        className={`px-2 py-1 rounded text-xs ${level.color}`}
                      >
                        {level.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Trek Details */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration *</Label>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="e.g., 12-14 days"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="altitude">Max Altitude *</Label>
              <div className="flex items-center gap-2">
                <Mountain className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="altitude"
                  name="altitude"
                  value={formData.altitude}
                  onChange={handleInputChange}
                  placeholder="e.g., 5,545m"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="startingPoint">Starting Point *</Label>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="startingPoint"
                  name="startingPoint"
                  value={formData.startingPoint}
                  onChange={handleInputChange}
                  placeholder="e.g., Lukla"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endingPoint">Ending Point *</Label>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="endingPoint"
                  name="endingPoint"
                  value={formData.endingPoint}
                  onChange={handleInputChange}
                  placeholder="e.g., Kathmandu"
                  required
                />
              </div>
            </div>
          </div>

          {/* Best Seasons */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Best Seasons *</Label>
              <div className="flex gap-2">
                <Select
                  value={selectedSeason}
                  onValueChange={setSelectedSeason}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    {seasons.map((season) => (
                      <SelectItem key={season} value={season}>
                        {season}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  onClick={handleSeasonAdd}
                  variant="outline"
                  disabled={!selectedSeason}
                >
                  Add
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.bestSeason.map((season) => (
                <Badge
                  key={season}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {season}
                  <button
                    type="button"
                    onClick={() => handleSeasonRemove(season)}
                    className="ml-1 rounded-full hover:bg-muted"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {formData.bestSeason.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No seasons selected. Click "Add" to add best seasons.
                </p>
              )}
            </div>
          </div>

          {/* Permit Information */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Permit Required</Label>
                <p className="text-sm text-muted-foreground">
                  Does this trek require special permits?
                </p>
              </div>
              <Switch
                checked={formData.permitRequired}
                onCheckedChange={(checked) =>
                  handleSwitchChange("permitRequired", checked)
                }
              />
            </div>

            {formData.permitRequired && (
              <div className="space-y-2">
                <Label htmlFor="permitCost">Permit Cost (USD)</Label>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="permitCost"
                    name="permitCost"
                    value={formData.permitCost}
                    onChange={handleInputChange}
                    placeholder="e.g., 50"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Descriptions */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Short Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Brief description (max 200 characters)"
                maxLength={200}
                rows={3}
                required
              />
              <p className="text-sm text-muted-foreground">
                {formData.description.length}/200 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="overview">Detailed Overview</Label>
              <Textarea
                id="overview"
                name="overview"
                value={formData.overview}
                onChange={handleInputChange}
                placeholder="Detailed information about the trek..."
                rows={6}
              />
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">Region Status</Label>
              <p className="text-sm text-muted-foreground">
                {formData.isActive
                  ? "This region is visible to users"
                  : "This region is hidden from users"}
              </p>
            </div>
            <Switch
              checked={formData.isActive}
              onCheckedChange={(checked) =>
                handleSwitchChange("isActive", checked)
              }
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : region ? "Update Region" : "Create Region"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
