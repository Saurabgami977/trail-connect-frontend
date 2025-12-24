"use client";

import { useState, useEffect } from "react";
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
  Clock,
  Ruler,
  TrendingUp,
  DollarSign,
  Users,
  Upload,
  X,
  Plus,
  AlertCircle,
  BarChart3,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { createTrekkingRegion } from "@/api/routes/trekking-regions";

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
  { value: "difficult", label: "Difficult", color: "bg-red-100 text-red-700" },
  {
    value: "extreme",
    label: "Extreme",
    color: "bg-purple-100 text-purple-700",
  },
];

const seasons = [
  { value: "spring", label: "Spring" },
  { value: "summer", label: "Summer" },
  { value: "autumn", label: "Autumn" },
  { value: "winter", label: "Winter" },
];

export default function RegionForm({
  region,
  onSuccess,
  onCancel,
}: RegionFormProps) {
  const [formData, setFormData] = useState({
    name: region?.name || "",
    slug: region?.slug || "",
    description: region?.description || "",
    shortDescription: region?.shortDescription || "",
    location: region?.location || "",
    coordinates: region?.coordinates || { lat: 0, lng: 0 },
    difficulty: region?.difficulty || "moderate",
    minAltitude: region?.minAltitude || 0,
    maxAltitude: region?.maxAltitude || 0,
    avgDuration: region?.avgDuration || 0,
    avgDistance: region?.avgDistance || 0,
    bestSeasons: region?.bestSeasons || [],
    permitsRequired: region?.permitsRequired || [],
    permitCost: region?.permitCost || 0,
    highlights: region?.highlights || [],
    statistics: region?.statistics || {
      totalTreks: 0,
      successRate: 0,
      avgGroupSize: 0,
      avgCostPerPerson: 0,
    },
    requirements: region?.requirements || {
      fitnessLevel: "",
      experience: "",
      gearRequired: [],
    },
    tags: region?.tags || [],
    faqs: region?.faqs || [],
    isActive: region?.isActive ?? true,
    featured: region?.featured || false,
    popularity: region?.popularity || 0,
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(region?.image || "");
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>(
    region?.gallery || []
  );
  const [newHighlight, setNewHighlight] = useState("");
  const [newPermit, setNewPermit] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });
  const [newGear, setNewGear] = useState("");
  const [loading, setLoading] = useState(false);

  const { mutate: createRegion, isPending } = useMutation({
    mutationFn: createTrekkingRegion,
    onSuccess: (data) => {
      toast.success("Trekking region created successfully!");
      console.log(data);
    },
  });

  // Auto-generate slug from name
  useEffect(() => {
    if (!region && formData.name) {
      const slug = formData.name
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-");
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.name, region]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (name.startsWith("coordinates.")) {
      const coordType = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        coordinates: {
          ...prev.coordinates,
          [coordType]: type === "number" ? parseFloat(value) : value,
        },
      }));
    } else if (name.startsWith("statistics.")) {
      const statType = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        statistics: {
          ...prev.statistics,
          [statType]: type === "number" ? parseFloat(value) : value,
        },
      }));
    } else if (name.startsWith("requirements.")) {
      const reqType = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        requirements: {
          ...prev.requirements,
          [reqType]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "number" ? parseFloat(value) : value,
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  // Array field handlers
  const handleArrayField = (
    field: string,
    value: string,
    action: "add" | "remove" = "add"
  ) => {
    if (action === "add" && value.trim()) {
      // Handle nested fields (requirements.gearRequired)
      if (field.includes(".")) {
        const [parent, child] = field.split(".");
        setFormData((prev) => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: [...(prev[parent]?.[child] || []), value.trim()],
          },
        }));
      } else {
        // Handle regular array fields
        setFormData((prev) => ({
          ...prev,
          [field]: [...(prev[field] || []), value.trim()],
        }));
      }
    } else if (action === "remove") {
      if (field.includes(".")) {
        const [parent, child] = field.split(".");
        setFormData((prev) => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: (prev[parent]?.[child] || []).filter(
              (item: string) => item !== value
            ),
          },
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [field]: (prev[field] || []).filter((item: string) => item !== value),
        }));
      }
    }
  };

  const handleSeasonToggle = (season: string) => {
    setFormData((prev) => ({
      ...prev,
      bestSeasons: prev.bestSeasons.includes(season)
        ? prev.bestSeasons.filter((s) => s !== season)
        : [...prev.bestSeasons, season],
    }));
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    isGallery = false
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (isGallery) {
      setGalleryImages((prev) => [...prev, file]);
      const previewUrl = URL.createObjectURL(file);
      setGalleryPreviews((prev) => [...prev, previewUrl]);
    } else {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const jsonPayload = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        shortDescription: formData.shortDescription,
        location: formData.location,
        coordinates: {
          lat: Number(formData.coordinates.lat) || 0,
          lng: Number(formData.coordinates.lng) || 0,
        },
        difficulty: formData.difficulty,
        minAltitude: Number(formData.minAltitude) || 0,
        maxAltitude: Number(formData.maxAltitude) || 0,
        avgDuration: Number(formData.avgDuration) || 0,
        avgDistance: Number(formData.avgDistance) || 0,
        bestSeasons: formData.bestSeasons || [],
        permitsRequired: formData.permitsRequired || [],
        permitCost: Number(formData.permitCost) || 0,
        highlights: formData.highlights || [],
        statistics: {
          totalTreks: Number(formData.statistics.totalTreks) || 0,
          successRate: Number(formData.statistics.successRate) || 0,
          avgGroupSize: Number(formData.statistics.avgGroupSize) || 0,
          avgCostPerPerson: Number(formData.statistics.avgCostPerPerson) || 0,
        },
        requirements: {
          fitnessLevel: formData.requirements?.fitnessLevel || "",
          experience: formData.requirements?.experience || "",
          gearRequired: formData.requirements?.gearRequired || [],
        },
        tags: formData.tags || [],
        faqs: formData.faqs || [],
        isActive: Boolean(formData.isActive),
        popularity: Number(formData.popularity) || 0,
        featured: Boolean(formData.featured),
      };

      const formDataToSend = new FormData();
      formDataToSend.append("data", JSON.stringify(jsonPayload));

      if (image) {
        formDataToSend.append("image", image);
      }

      galleryImages.forEach((img, index) => {
        formDataToSend.append("gallery", img);
      });

      const url = "http://localhost:4000/api/treks/regions";

      const response = await fetch(url, {
        method: "POST",
        body: formDataToSend,
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to save region");
      }

      toast.success(
        region ? "Region updated successfully!" : "Region created successfully!"
      );

      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error("Error saving region:", error);
      toast.error(error.message || "Failed to save region");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
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
        <CardContent className="space-y-8">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Region Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Everest Base Camp Trek"
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
                  placeholder="e.g., everest-base-camp-trek"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Khumbu Region, Nepal"
                    required
                  />
                </div>
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
          </div>

          {/* Descriptions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Descriptions</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description *</Label>
                <Textarea
                  id="shortDescription"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                  placeholder="Brief overview (max 150 characters)"
                  maxLength={150}
                  rows={2}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  {formData.shortDescription.length}/150 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Detailed information about the trek..."
                  rows={6}
                  required
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Images</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Main Image */}
              <div className="space-y-2">
                <Label>Main Image *</Label>
                <div className="relative h-48 rounded-lg border-2 border-dashed border-muted">
                  {imagePreview ? (
                    <>
                      <Image
                        src={imagePreview}
                        alt="Main preview"
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
                        Upload main image
                      </p>
                    </div>
                  )}
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, false)}
                  className="cursor-pointer"
                />
              </div>

              {/* Gallery Images */}
              <div className="space-y-2">
                <Label>Gallery Images</Label>
                <div className="grid grid-cols-3 gap-2">
                  {galleryPreviews.map((preview, index) => (
                    <div
                      key={index}
                      className="relative h-24 rounded-lg border"
                    >
                      <Image
                        src={preview}
                        alt={`Gallery ${index + 1}`}
                        fill
                        className="rounded-lg object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  <div className="relative h-24 rounded-lg border-2 border-dashed border-muted">
                    <label className="flex h-full cursor-pointer flex-col items-center justify-center">
                      <Plus className="h-6 w-6 text-muted-foreground" />
                      <p className="mt-1 text-xs text-muted-foreground">Add</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, true)}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trek Specifications */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Trek Specifications</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="minAltitude">Min Altitude (m) *</Label>
                <div className="flex items-center gap-2">
                  <Mountain className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="minAltitude"
                    name="minAltitude"
                    type="number"
                    value={formData.minAltitude}
                    onChange={handleInputChange}
                    placeholder="e.g., 2860"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxAltitude">Max Altitude (m) *</Label>
                <div className="flex items-center gap-2">
                  <Mountain className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="maxAltitude"
                    name="maxAltitude"
                    type="number"
                    value={formData.maxAltitude}
                    onChange={handleInputChange}
                    placeholder="e.g., 5545"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="avgDuration">Avg Duration (days) *</Label>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="avgDuration"
                    name="avgDuration"
                    type="number"
                    value={formData.avgDuration}
                    onChange={handleInputChange}
                    placeholder="e.g., 14"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="avgDistance">Avg Distance (km) *</Label>
                <div className="flex items-center gap-2">
                  <Ruler className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="avgDistance"
                    name="avgDistance"
                    type="number"
                    value={formData.avgDistance}
                    onChange={handleInputChange}
                    placeholder="e.g., 130"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Coordinates */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Coordinates (Optional)</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="coordinates.lat">Latitude</Label>
                <Input
                  id="coordinates.lat"
                  name="coordinates.lat"
                  type="number"
                  step="any"
                  value={formData.coordinates.lat}
                  onChange={handleInputChange}
                  placeholder="e.g., 27.9881"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="coordinates.lng">Longitude</Label>
                <Input
                  id="coordinates.lng"
                  name="coordinates.lng"
                  type="number"
                  step="any"
                  value={formData.coordinates.lng}
                  onChange={handleInputChange}
                  placeholder="e.g., 86.9250"
                />
              </div>
            </div>
          </div>

          {/* Best Seasons */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Best Seasons *</h3>
            <div className="flex flex-wrap gap-2">
              {seasons.map((season) => (
                <button
                  key={season.value}
                  type="button"
                  onClick={() => handleSeasonToggle(season.value)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    formData.bestSeasons.includes(season.value)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {season.label}
                </button>
              ))}
            </div>
            {formData.bestSeasons.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Select at least one best season for trekking
              </p>
            )}
          </div>

          {/* Highlights */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Highlights</h3>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={newHighlight}
                  onChange={(e) => setNewHighlight(e.target.value)}
                  placeholder="e.g., Sunrise view from Kala Patthar"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (newHighlight.trim()) {
                        handleArrayField("highlights", newHighlight);
                        setNewHighlight("");
                      }
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (newHighlight.trim()) {
                      handleArrayField("highlights", newHighlight);
                      setNewHighlight("");
                    }
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.highlights.map((highlight, index) => (
                  <Badge key={index} variant="secondary" className="gap-1">
                    {highlight}
                    <button
                      type="button"
                      onClick={() =>
                        handleArrayField("highlights", highlight, "remove")
                      }
                      className="ml-1 rounded-full hover:bg-muted"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Permits */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Permits & Costs</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Permits Required</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={newPermit}
                      onChange={(e) => setNewPermit(e.target.value)}
                      placeholder="e.g., TIMS Card, Sagarmatha NP Permit"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (newPermit.trim()) {
                            handleArrayField("permitsRequired", newPermit);
                            setNewPermit("");
                          }
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        if (newPermit.trim()) {
                          handleArrayField("permitsRequired", newPermit);
                          setNewPermit("");
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.permitsRequired.map((permit, index) => (
                      <Badge key={index} variant="outline" className="gap-1">
                        {permit}
                        <button
                          type="button"
                          onClick={() =>
                            handleArrayField(
                              "permitsRequired",
                              permit,
                              "remove"
                            )
                          }
                          className="ml-1 rounded-full hover:bg-muted"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="permitCost">Permit Cost (USD)</Label>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="permitCost"
                    name="permitCost"
                    type="number"
                    value={formData.permitCost}
                    onChange={handleInputChange}
                    placeholder="e.g., 50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Statistics</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="statistics.totalTreks">Total Treks</Label>
                <Input
                  id="statistics.totalTreks"
                  name="statistics.totalTreks"
                  type="number"
                  value={formData.statistics.totalTreks}
                  onChange={handleInputChange}
                  placeholder="e.g., 1000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="statistics.successRate">Success Rate (%)</Label>
                <Input
                  id="statistics.successRate"
                  name="statistics.successRate"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.statistics.successRate}
                  onChange={handleInputChange}
                  placeholder="e.g., 95"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="statistics.avgGroupSize">Avg Group Size</Label>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="statistics.avgGroupSize"
                    name="statistics.avgGroupSize"
                    type="number"
                    value={formData.statistics.avgGroupSize}
                    onChange={handleInputChange}
                    placeholder="e.g., 8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="statistics.avgCostPerPerson">
                  Avg Cost Per Person ($)
                </Label>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="statistics.avgCostPerPerson"
                    name="statistics.avgCostPerPerson"
                    type="number"
                    value={formData.statistics.avgCostPerPerson}
                    onChange={handleInputChange}
                    placeholder="e.g., 1500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Requirements</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="requirements.fitnessLevel">Fitness Level</Label>
                <Input
                  id="requirements.fitnessLevel"
                  name="requirements.fitnessLevel"
                  value={formData.requirements.fitnessLevel}
                  onChange={handleInputChange}
                  placeholder="e.g., Good physical fitness required"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements.experience">
                  Experience Required
                </Label>
                <Input
                  id="requirements.experience"
                  name="requirements.experience"
                  value={formData.requirements.experience}
                  onChange={handleInputChange}
                  placeholder="e.g., Previous high-altitude trekking experience"
                />
              </div>

              <div className="col-span-2 space-y-2">
                <Label>Gear Required</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={newGear}
                      onChange={(e) => setNewGear(e.target.value)}
                      placeholder="e.g., -20°C Sleeping bag, trekking poles"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (newGear.trim()) {
                            handleArrayField(
                              "requirements.gearRequired",
                              newGear
                            );
                            setNewGear("");
                          }
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        if (newGear.trim()) {
                          handleArrayField(
                            "requirements.gearRequired",
                            newGear
                          );
                          setNewGear("");
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.requirements.gearRequired?.map((gear, index) => (
                      <Badge key={index} variant="outline" className="gap-1">
                        {gear}
                        <button
                          type="button"
                          onClick={() =>
                            handleArrayField(
                              "requirements.gearRequired",
                              gear,
                              "remove"
                            )
                          }
                          className="ml-1 rounded-full hover:bg-muted"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tags</h3>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="e.g., high-altitude, popular, beginner-friendly"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (newTag.trim()) {
                        handleArrayField("tags", newTag);
                        setNewTag("");
                      }
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (newTag.trim()) {
                      handleArrayField("tags", newTag);
                      setNewTag("");
                    }
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleArrayField("tags", tag, "remove")}
                      className="ml-1 rounded-full hover:bg-muted"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Status & Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Status & Settings</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Active Status</Label>
                  <p className="text-sm text-muted-foreground">
                    {formData.isActive
                      ? "Region is visible to users"
                      : "Region is hidden from users"}
                  </p>
                </div>
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    handleSwitchChange("isActive", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Featured Region</Label>
                  <p className="text-sm text-muted-foreground">
                    {formData.featured
                      ? "Featured on homepage"
                      : "Regular listing"}
                  </p>
                </div>
                <Switch
                  checked={formData.featured}
                  onCheckedChange={(checked) =>
                    handleSwitchChange("featured", checked)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="popularity">Popularity Score</Label>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="popularity"
                    name="popularity"
                    type="number"
                    value={formData.popularity}
                    onChange={handleInputChange}
                    placeholder="0-100"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </div>
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
