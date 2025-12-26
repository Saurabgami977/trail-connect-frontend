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
  Route,
  MapPin,
  Clock,
  Ruler,
  TrendingUp,
  DollarSign,
  Users,
  Upload,
  X,
  Plus,
  Calendar,
  Mountain,
  Compass,
  Hotel,
  Utensils,
  FileText,
  CheckCircle,
  AlertCircle,
  Briefcase,
  Shield,
  Video,
  ChevronDown,
  ChevronUp,
  GripVertical,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { getTrekkingRegions } from "@/api/routes/trekking-regions";

// DND Kit imports
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface RouteFormProps {
  route?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  altitude: number;
  distance: string;
  duration: string;
  overnight: string;
  accommodation: string;
  meals: string[];
  highlights: string[];
  notes?: string;
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

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Sortable Itinerary Day Component
function SortableItineraryDay({
  day,
  index,
  isExpanded,
  onToggle,
  onChange,
  onRemove,
  onDragHandle,
}: {
  day: ItineraryDay;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onChange: (field: string, value: any) => void;
  onRemove: () => void;
  onDragHandle: (listeners: any) => JSX.Element;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: day.day });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="rounded-lg border bg-card space-y-4"
    >
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          {onDragHandle(listeners)}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              {day.day}
            </div>
            <div>
              <h4 className="font-medium">{day.title || `Day ${day.day}`}</h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Ruler className="h-3 w-3" />
                  {day.distance || "0 km"}
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {day.altitude || "0"}m
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {day.duration || "0 hours"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-8 w-8 p-0"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={onRemove}
            className="h-8 w-8 p-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 pt-0 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input
                value={day.title}
                onChange={(e) => onChange("title", e.target.value)}
                placeholder="e.g., Lukla to Phakding"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Altitude (m)</Label>
              <Input
                type="number"
                value={day.altitude}
                onChange={(e) => onChange("altitude", e.target.value)}
                placeholder="e.g., 2860"
              />
            </div>

            <div className="space-y-2">
              <Label>Distance</Label>
              <Input
                value={day.distance}
                onChange={(e) => onChange("distance", e.target.value)}
                placeholder="e.g., 8 km"
              />
            </div>

            <div className="space-y-2">
              <Label>Duration</Label>
              <Input
                value={day.duration}
                onChange={(e) => onChange("duration", e.target.value)}
                placeholder="e.g., 3-4 hours"
              />
            </div>

            <div className="space-y-2">
              <Label>Overnight</Label>
              <Input
                value={day.overnight}
                onChange={(e) => onChange("overnight", e.target.value)}
                placeholder="e.g., Phakding"
              />
            </div>

            <div className="space-y-2">
              <Label>Accommodation</Label>
              <div className="flex items-center gap-2">
                <Hotel className="h-4 w-4 text-muted-foreground" />
                <Input
                  value={day.accommodation}
                  onChange={(e) => onChange("accommodation", e.target.value)}
                  placeholder="e.g., Teahouse"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Meals (comma separated)</Label>
              <div className="flex items-center gap-2">
                <Utensils className="h-4 w-4 text-muted-foreground" />
                <Input
                  value={day.meals.join(", ")}
                  onChange={(e) => onChange("meals", e.target.value)}
                  placeholder="e.g., Breakfast, Lunch, Dinner"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Highlights (comma separated)</Label>
              <Input
                value={day.highlights.join(", ")}
                onChange={(e) => onChange("highlights", e.target.value)}
                placeholder="e.g., Scenic flight to Lukla, Buddhist monasteries"
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label>Description</Label>
              <Textarea
                value={day.description}
                onChange={(e) => onChange("description", e.target.value)}
                placeholder="Detailed description of the day's trek..."
                rows={3}
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label>Notes (Optional)</Label>
              <Textarea
                value={day.notes || ""}
                onChange={(e) => onChange("notes", e.target.value)}
                placeholder="Additional notes..."
                rows={2}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RouteForm({
  route,
  onSuccess,
  onCancel,
}: RouteFormProps) {
  const [formData, setFormData] = useState({
    name: route?.name || "",
    slug: route?.slug || "",
    description: route?.description || "",
    region: route?.region?._id || "",
    duration: route?.duration || 0,
    distance: route?.distance || "0",
    difficulty: route?.difficulty || "moderate",
    startPoint: route?.startPoint || "",
    endPoint: route?.endPoint || "",
    itinerary: (route?.itinerary || [
      {
        day: 1,
        title: "",
        description: "",
        altitude: 0,
        distance: "0",
        duration: "",
        overnight: "",
        accommodation: "",
        meals: [],
        highlights: [],
        notes: "",
      },
    ]) as ItineraryDay[],
    costBreakdown: route?.costBreakdown || {
      guidePerDay: 0,
      permitsPerPerson: 0,
      accommodationPerDay: 0,
      mealsPerDay: 0,
      transportPerPerson: 0,
      guideTransportation: 0,
      otherCosts: [],
    },
    inclusions: route?.inclusions || [],
    exclusions: route?.exclusions || [],
    requirements: route?.requirements || {
      fitnessLevel: "",
      gearChecklist: [],
      vaccinations: [],
      permits: [],
    },
    bestTime: route?.bestTime || {
      months: [],
      weather: "",
      temperatureRange: "",
    },
    gallery: route?.gallery || {
      coverImage: "",
      images: [],
      videos: [],
      map: "",
    },
    extraServices: route?.extraServices || [],
    isActive: route?.isActive ?? true,
    isFeatured: route?.isFeatured || false,
    usageCount: route?.usageCount || 0,
  });

  const [newInclusion, setNewInclusion] = useState("");
  const [newExclusion, setNewExclusion] = useState("");
  const [newGear, setNewGear] = useState("");
  const [newVaccination, setNewVaccination] = useState("");
  const [newPermit, setNewPermit] = useState("");
  const [newOtherCost, setNewOtherCost] = useState({
    description: "",
    amount: 0,
  });

  const [newService, setNewService] = useState({
    name: "",
    description: "",
    costPerPerson: 0,
    isAvailable: true,
    isOptional: true,
  });

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState("");
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [expandedDays, setExpandedDays] = useState<number[]>([1]);
  const [loading, setLoading] = useState(false);

  const { data: regions } = useQuery({
    queryFn: getTrekkingRegions,
    queryKey: ["trekking-regions"],
  });

  // DND Sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Auto-generate slug
  useEffect(() => {
    if (!route && formData.name) {
      const slug = formData.name
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-");
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.name, route]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (name.startsWith("costBreakdown.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        costBreakdown: {
          ...prev.costBreakdown,
          [field]: type === "number" ? parseFloat(value) : value,
        },
      }));
    } else if (name.startsWith("bestTime.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        bestTime: {
          ...prev.bestTime,
          [field]: value,
        },
      }));
    } else if (name.startsWith("requirements.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        requirements: {
          ...prev.requirements,
          [field]: value,
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

  // Itinerary handlers
  const handleItineraryChange = (index: number, field: string, value: any) => {
    const updatedItinerary = [...formData.itinerary];

    if (field === "meals" || field === "highlights") {
      updatedItinerary[index] = {
        ...updatedItinerary[index],
        [field]:
          typeof value === "string"
            ? value
                .split(",")
                .map((item: string) => item.trim())
                .filter(Boolean)
            : value,
      };
    } else {
      updatedItinerary[index] = {
        ...updatedItinerary[index],
        [field]:
          typeof value === "string" &&
          !isNaN(Number(value)) &&
          field !== "distance"
            ? parseFloat(value)
            : value,
      };
    }

    setFormData((prev) => ({ ...prev, itinerary: updatedItinerary }));
  };

  const addItineraryDay = () => {
    const newDay = {
      day: formData.itinerary.length + 1,
      title: "",
      description: "",
      altitude: 0,
      distance: "0",
      duration: "",
      overnight: "",
      accommodation: "",
      meals: [],
      highlights: [],
      notes: "",
    };

    setFormData((prev) => ({
      ...prev,
      itinerary: [...prev.itinerary, newDay],
    }));
    setExpandedDays((prev) => [...prev, newDay.day]);
  };

  const removeItineraryDay = (index: number) => {
    if (formData.itinerary.length > 1) {
      const dayToRemove = formData.itinerary[index];
      const updatedItinerary = formData.itinerary.filter((_, i) => i !== index);

      // Reorder days
      const reorderedItinerary = updatedItinerary.map((day, idx) => ({
        ...day,
        day: idx + 1,
      }));

      setFormData((prev) => ({ ...prev, itinerary: reorderedItinerary }));
      setExpandedDays((prev) => prev.filter((day) => day !== dayToRemove.day));
    }
  };

  // Toggle day expansion
  const toggleDayExpansion = (dayNumber: number) => {
    setExpandedDays((prev) =>
      prev.includes(dayNumber)
        ? prev.filter((d) => d !== dayNumber)
        : [...prev, dayNumber]
    );
  };

  // Collapse/Expand all days
  const toggleAllDays = () => {
    if (expandedDays.length === formData.itinerary.length) {
      setExpandedDays([]);
    } else {
      setExpandedDays(formData.itinerary.map((day) => day.day));
    }
  };

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setFormData((prev) => {
        const oldIndex = prev.itinerary.findIndex(
          (item) => item.day === active.id
        );
        const newIndex = prev.itinerary.findIndex(
          (item) => item.day === over.id
        );

        const reorderedItinerary = arrayMove(
          prev.itinerary,
          oldIndex,
          newIndex
        );

        // Update day numbers
        const updatedItinerary = reorderedItinerary.map((day, index) => ({
          ...day,
          day: index + 1,
        }));

        return {
          ...prev,
          itinerary: updatedItinerary,
        };
      });
    }
  };

  // Handle other costs
  const handleAddOtherCost = () => {
    if (newOtherCost.description.trim()) {
      setFormData((prev) => ({
        ...prev,
        costBreakdown: {
          ...prev.costBreakdown,
          otherCosts: [...(prev.costBreakdown.otherCosts || []), newOtherCost],
        },
      }));
      setNewOtherCost({ description: "", amount: 0 });
    }
  };

  // Month selection for best time
  const handleMonthToggle = (month: string) => {
    setFormData((prev) => ({
      ...prev,
      bestTime: {
        ...prev.bestTime,
        months: prev.bestTime.months.includes(month)
          ? prev.bestTime.months.filter((m) => m !== month)
          : [...prev.bestTime.months, month],
      },
    }));
  };

  // Image upload handlers
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
      setCoverImage(file);
      const previewUrl = URL.createObjectURL(file);
      setCoverImagePreview(previewUrl);
    }
  };

  // Extra services handlers
  const handleAddService = () => {
    if (newService.name && newService.description) {
      setFormData((prev) => ({
        ...prev,
        extraServices: [...prev.extraServices, { ...newService }],
      }));
      setNewService({
        name: "",
        description: "",
        costPerPerson: 0,
        isAvailable: true,
        isOptional: true,
      });
    }
  };

  const removeUndefinedOrNullAndNested = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj

        .map((item) => removeUndefinedOrNullAndNested(item))
        .filter((item) => item !== undefined && item !== null);
    } else if (obj !== null && typeof obj === "object") {
      const cleanedObj: any = {};
      Object.keys(obj).forEach((key) => {
        const value = removeUndefinedOrNullAndNested(obj[key]);
        if (value !== undefined && value !== null) {
          cleanedObj[key] = value;
        }
      });
      return cleanedObj;
    } else {
      return obj;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const jsonPayload = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        region: formData.region,
        duration: Number(formData.duration),
        distance: formData.distance,
        difficulty: formData.difficulty,
        startPoint: formData.startPoint,
        endPoint: formData.endPoint,
        itinerary: formData.itinerary,
        costBreakdown: {
          guidePerDay: Number(formData.costBreakdown.guidePerDay),
          permitsPerPerson: Number(formData.costBreakdown.permitsPerPerson),
          accommodationPerDay: Number(
            formData.costBreakdown.accommodationPerDay
          ),
          mealsPerDay: Number(formData.costBreakdown.mealsPerDay),
          transportPerPerson: Number(formData.costBreakdown.transportPerPerson),
          guideTransportation: Number(
            formData.costBreakdown.guideTransportation
          ),
          otherCosts: formData.costBreakdown.otherCosts,
        },
        inclusions: formData.inclusions,
        exclusions: formData.exclusions,
        requirements: {
          fitnessLevel: formData.requirements.fitnessLevel,
          gearChecklist: formData.requirements.gearChecklist,
          vaccinations: formData.requirements.vaccinations,
          permits: formData.requirements.permits,
        },
        bestTime: {
          months: formData.bestTime.months,
          weather: formData.bestTime.weather,
          temperatureRange: formData.bestTime.temperatureRange,
        },
        gallery: {
          ...formData.gallery,
        },
        extraServices: formData.extraServices,
        isActive: formData.isActive,
        isFeatured: formData.isFeatured,
      };

      const formDataToSend = new FormData();
      formDataToSend.append("data", JSON.stringify(jsonPayload));

      if (coverImage) {
        formDataToSend.append("coverImage", coverImage);
      }

      galleryImages.forEach((img, index) => {
        formDataToSend.append("gallery", img);
      });

      console.log("Form Data to send:", formDataToSend);

      const url = route
        ? `http://localhost:4000/api/treks/templates/${route._id}`
        : "http://localhost:4000/api/treks/templates";

      const response = await fetch(url, {
        method: route ? "PATCH" : "POST",
        body: formDataToSend,
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to save route");
      }

      toast.success(
        route ? "Route updated successfully!" : "Route created successfully!"
      );
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error("Error saving route:", error);
      toast.error(error.message || "Failed to save route");
    } finally {
      setLoading(false);
    }
  };

  const handleExistingImageRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      gallery: {
        ...prev.gallery,
        images: prev.gallery.images.filter((_, i: number) => i !== index),
      },
    }));
  };

  return (
    <Card className="w-full max-w-6xl mx-auto mt-20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Route className="h-5 w-5" />
          {route ? "Edit Trekking Route" : "Create New Trekking Route"}
        </CardTitle>
        <CardDescription>
          {route
            ? "Update the trekking route details below."
            : "Fill in the details to add a new trekking route to the platform."}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-8">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Route Name *</Label>
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
                <Label htmlFor="region">Region *</Label>
                <Select
                  value={formData.region}
                  onValueChange={(value) => handleSelectChange("region", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions?.map((region: any) => (
                      <SelectItem key={region._id} value={region._id}>
                        {region.name}
                      </SelectItem>
                    ))}
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
          </div>

          {/* Route Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Route Details</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startPoint">Start Point *</Label>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="startPoint"
                    name="startPoint"
                    value={formData.startPoint}
                    onChange={handleInputChange}
                    placeholder="e.g., Lukla"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endPoint">End Point *</Label>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="endPoint"
                    name="endPoint"
                    value={formData.endPoint}
                    onChange={handleInputChange}
                    placeholder="e.g., Everest Base Camp"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration (days) *</Label>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="duration"
                    name="duration"
                    type="number"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="e.g., 14"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="distance">Distance *</Label>
                <div className="flex items-center gap-2">
                  <Ruler className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="distance"
                    name="distance"
                    value={formData.distance}
                    onChange={handleInputChange}
                    placeholder="e.g., 130 km"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Route Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Detailed description of the trekking route..."
                rows={4}
                required
              />
            </div>
          </div>

          {/* Cover Image */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Cover Image</h3>
            <div className="space-y-2">
              <div className="relative h-64 rounded-lg border-2 border-dashed border-muted">
                {formData.gallery.coverImage && !coverImagePreview ? (
                  <>
                    <Image
                      src={
                        formData.gallery.coverImage.startsWith("uploads/")
                          ? process.env.NEXT_PUBLIC_ClOUDFLARE_API +
                            formData.gallery.coverImage
                          : formData.gallery.coverImage
                      }
                      alt="Cover preview"
                      fill
                      className="rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          gallery: {
                            ...prev.gallery,
                            coverImage: "",
                          },
                        }));
                      }}
                      className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </>
                ) : null}
                {coverImagePreview ? (
                  <>
                    <Image
                      src={
                        coverImagePreview.startsWith("uploads/")
                          ? process.env.NEXT_PUBLIC_ClOUDFLARE_API +
                            coverImagePreview
                          : coverImagePreview
                      }
                      alt="Cover preview"
                      fill
                      className="rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setCoverImage(null);
                        setCoverImagePreview("");
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
                      Upload cover image
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
          </div>

          {/* Itinerary */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Itinerary</h3>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={toggleAllDays}
                >
                  {expandedDays.length === formData.itinerary.length
                    ? "Collapse All"
                    : "Expand All"}
                </Button>
                <Button
                  type="button"
                  onClick={addItineraryDay}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Day
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={formData.itinerary.map((day) => day.day)}
                  strategy={verticalListSortingStrategy}
                >
                  {formData.itinerary.map((day, index) => (
                    <SortableItineraryDay
                      key={day.day}
                      day={day}
                      index={index}
                      isExpanded={expandedDays.includes(day.day)}
                      onToggle={() => toggleDayExpansion(day.day)}
                      onChange={(field, value) =>
                        handleItineraryChange(index, field, value)
                      }
                      onRemove={() => removeItineraryDay(index)}
                      onDragHandle={(listeners) => (
                        <button
                          type="button"
                          className="cursor-grab active:cursor-grabbing"
                          // {...attributes}
                          {...listeners}
                        >
                          <GripVertical className="h-5 w-5 text-muted-foreground" />
                        </button>
                      )}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            </div>

            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <GripVertical className="h-4 w-4" />
              Drag days to reorder • Click day header to expand/collapse
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Cost Breakdown (USD)</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="costBreakdown.guidePerDay">Guide Per Day</Label>
                <Input
                  id="costBreakdown.guidePerDay"
                  name="costBreakdown.guidePerDay"
                  type="number"
                  value={formData.costBreakdown.guidePerDay}
                  onChange={handleInputChange}
                  placeholder="e.g., 30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="costBreakdown.permitsPerPerson">
                  Permits Per Person
                </Label>
                <Input
                  id="costBreakdown.permitsPerPerson"
                  name="costBreakdown.permitsPerPerson"
                  type="number"
                  value={formData.costBreakdown.permitsPerPerson}
                  onChange={handleInputChange}
                  placeholder="e.g., 50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="costBreakdown.accommodationPerDay">
                  Accommodation Per Day
                </Label>
                <Input
                  id="costBreakdown.accommodationPerDay"
                  name="costBreakdown.accommodationPerDay"
                  type="number"
                  value={formData.costBreakdown.accommodationPerDay}
                  onChange={handleInputChange}
                  placeholder="e.g., 20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="costBreakdown.mealsPerDay">Meals Per Day</Label>
                <Input
                  id="costBreakdown.mealsPerDay"
                  name="costBreakdown.mealsPerDay"
                  type="number"
                  value={formData.costBreakdown.mealsPerDay}
                  onChange={handleInputChange}
                  placeholder="e.g., 25"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="costBreakdown.transportPerPerson">
                  Transport Per Person
                </Label>
                <Input
                  id="costBreakdown.transportPerPerson"
                  name="costBreakdown.transportPerPerson"
                  type="number"
                  value={formData.costBreakdown.transportPerPerson}
                  onChange={handleInputChange}
                  placeholder="e.g., 150"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="costBreakdown.guideTransportation">
                  Guide Transportation
                </Label>
                <Input
                  id="costBreakdown.guideTransportation"
                  name="costBreakdown.guideTransportation"
                  type="number"
                  value={formData.costBreakdown.guideTransportation}
                  onChange={handleInputChange}
                  placeholder="e.g., 100"
                />
              </div>
            </div>

            {/* Other Costs */}
            <div className="space-y-4">
              <Label>Other Costs</Label>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Input
                    value={newOtherCost.description}
                    onChange={(e) =>
                      setNewOtherCost((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Description (e.g., Porter fee, Equipment rental)"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={newOtherCost.amount}
                      onChange={(e) =>
                        setNewOtherCost((prev) => ({
                          ...prev,
                          amount: parseFloat(e.target.value),
                        }))
                      }
                      placeholder="Amount"
                    />
                    <Button
                      type="button"
                      onClick={handleAddOtherCost}
                      disabled={!newOtherCost.description.trim()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {formData.costBreakdown.otherCosts &&
                formData.costBreakdown.otherCosts.length > 0 && (
                  <div className="space-y-2">
                    {formData.costBreakdown.otherCosts.map((cost, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <span>{cost.description}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">${cost.amount}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                costBreakdown: {
                                  ...prev.costBreakdown,
                                  otherCosts:
                                    prev.costBreakdown.otherCosts?.filter(
                                      (_, i) => i !== index
                                    ) || [],
                                },
                              }));
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Inclusions & Exclusions</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Inclusions</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={newInclusion}
                      onChange={(e) => setNewInclusion(e.target.value)}
                      placeholder="e.g., Professional guide, Accommodation"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (newInclusion.trim()) {
                            handleArrayField("inclusions", newInclusion);
                            setNewInclusion("");
                          }
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        if (newInclusion.trim()) {
                          handleArrayField("inclusions", newInclusion);
                          setNewInclusion("");
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.inclusions.map((inclusion, index) => (
                      <Badge key={index} variant="secondary" className="gap-1">
                        <CheckCircle className="h-3 w-3" />
                        {inclusion}
                        <button
                          type="button"
                          onClick={() =>
                            handleArrayField("inclusions", inclusion, "remove")
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
                <Label>Exclusions</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={newExclusion}
                      onChange={(e) => setNewExclusion(e.target.value)}
                      placeholder="e.g., International flights, Personal expenses"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (newExclusion.trim()) {
                            handleArrayField("exclusions", newExclusion);
                            setNewExclusion("");
                          }
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        if (newExclusion.trim()) {
                          handleArrayField("exclusions", newExclusion);
                          setNewExclusion("");
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.exclusions.map((exclusion, index) => (
                      <Badge key={index} variant="outline" className="gap-1">
                        <X className="h-3 w-3" />
                        {exclusion}
                        <button
                          type="button"
                          onClick={() =>
                            handleArrayField("exclusions", exclusion, "remove")
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
                <Label>Gear Checklist</Label>
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
                              "requirements.gearChecklist",
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
                            "requirements.gearChecklist",
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
                    {formData.requirements.gearChecklist?.map((gear, index) => (
                      <Badge key={index} variant="outline" className="gap-1">
                        <Briefcase className="h-3 w-3" />
                        {gear}
                        <button
                          type="button"
                          onClick={() =>
                            handleArrayField(
                              "requirements.gearChecklist",
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

              <div className="space-y-2">
                <Label>Vaccinations (Optional)</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={newVaccination}
                      onChange={(e) => setNewVaccination(e.target.value)}
                      placeholder="e.g., Hepatitis A, Typhoid"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (newVaccination.trim()) {
                            handleArrayField(
                              "requirements.vaccinations",
                              newVaccination
                            );
                            setNewVaccination("");
                          }
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        if (newVaccination.trim()) {
                          handleArrayField(
                            "requirements.vaccinations",
                            newVaccination
                          );
                          setNewVaccination("");
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.requirements.vaccinations?.map(
                      (vaccine, index) => (
                        <Badge key={index} variant="outline" className="gap-1">
                          <Shield className="h-3 w-3" />
                          {vaccine}
                          <button
                            type="button"
                            onClick={() =>
                              handleArrayField(
                                "requirements.vaccinations",
                                vaccine,
                                "remove"
                              )
                            }
                            className="ml-1 rounded-full hover:bg-muted"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Permits (Optional)</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={newPermit}
                      onChange={(e) => setNewPermit(e.target.value)}
                      placeholder="e.g., TIMS Card, National Park Permit"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (newPermit.trim()) {
                            handleArrayField("requirements.permits", newPermit);
                            setNewPermit("");
                          }
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        if (newPermit.trim()) {
                          handleArrayField("requirements.permits", newPermit);
                          setNewPermit("");
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.requirements.permits?.map((permit, index) => (
                      <Badge key={index} variant="outline" className="gap-1">
                        <FileText className="h-3 w-3" />
                        {permit}
                        <button
                          type="button"
                          onClick={() =>
                            handleArrayField(
                              "requirements.permits",
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
            </div>
          </div>

          {/* Best Time to Trek */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Best Time to Trek</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Recommended Months</Label>
                <div className="flex flex-wrap gap-2">
                  {months.map((month) => (
                    <button
                      key={month}
                      type="button"
                      onClick={() => handleMonthToggle(month)}
                      className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                        formData.bestTime.months.includes(month)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {month}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bestTime.weather">Typical Weather</Label>
                  <Input
                    id="bestTime.weather"
                    name="bestTime.weather"
                    value={formData.bestTime.weather}
                    onChange={handleInputChange}
                    placeholder="e.g., Clear skies, mild temperatures"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bestTime.temperatureRange">
                    Temperature Range
                  </Label>
                  <Input
                    id="bestTime.temperatureRange"
                    name="bestTime.temperatureRange"
                    value={formData.bestTime.temperatureRange}
                    onChange={handleInputChange}
                    placeholder="e.g., -10°C to 15°C"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Images */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Gallery Images</h3>
            <div className="grid grid-cols-4 gap-4">
              {formData.gallery.images.map((image, index) => (
                <div key={index} className="relative h-32 rounded-lg border">
                  <Image
                    src={
                      image.startsWith("uploads/")
                        ? process.env.NEXT_PUBLIC_ClOUDFLARE_API + image
                        : image
                    }
                    alt={`Gallery ${index + 1}`}
                    fill
                    className="rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        gallery: {
                          ...prev.gallery,
                          images: prev.gallery.images.filter(
                            (_, i) => i !== index
                          ),
                        },
                      }));
                      setGalleryPreviews((prev) =>
                        prev.filter((_, i) => i !== index)
                      );
                    }}
                    className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {galleryPreviews.map((preview, index) => (
                <div key={index} className="relative h-32 rounded-lg border">
                  <Image
                    src={
                      preview.startsWith("uploads/")
                        ? process.env.NEXT_PUBLIC_ClOUDFLARE_API + preview
                        : preview
                    }
                    alt={`Gallery ${index + 1}`}
                    fill
                    className="rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setGalleryImages((prev) =>
                        prev.filter((_, i) => i !== index)
                      );
                      setGalleryPreviews((prev) =>
                        prev.filter((_, i) => i !== index)
                      );
                    }}
                    className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <div className="relative h-32 rounded-lg border-2 border-dashed border-muted">
                <label className="flex h-full cursor-pointer flex-col items-center justify-center">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Add Image
                  </p>
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

          {/* Extra Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Extra Services</h3>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Service Name</Label>
                  <Input
                    value={newService.name}
                    onChange={(e) =>
                      setNewService((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="e.g., Porter Service"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Cost Per Person ($)</Label>
                  <Input
                    type="number"
                    value={newService.costPerPerson}
                    onChange={(e) =>
                      setNewService((prev) => ({
                        ...prev,
                        costPerPerson: parseFloat(e.target.value),
                      }))
                    }
                    placeholder="e.g., 25"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input
                    value={newService.description}
                    onChange={(e) =>
                      setNewService((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Description of service"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={newService.isAvailable}
                      onCheckedChange={(checked) =>
                        setNewService((prev) => ({
                          ...prev,
                          isAvailable: checked,
                        }))
                      }
                    />
                    <Label>Available</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={newService.isOptional}
                      onCheckedChange={(checked) =>
                        setNewService((prev) => ({
                          ...prev,
                          isOptional: checked,
                        }))
                      }
                    />
                    <Label>Optional</Label>
                  </div>
                </div>
              </div>

              <Button
                type="button"
                onClick={handleAddService}
                variant="outline"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Service
              </Button>

              {formData.extraServices.length > 0 && (
                <div className="space-y-2">
                  <Label>Added Services</Label>
                  <div className="space-y-2">
                    {formData.extraServices.map((service, index) => (
                      <div key={index} className="rounded-lg border p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{service.name}</h4>
                              <Badge
                                variant={
                                  service.isAvailable ? "default" : "secondary"
                                }
                              >
                                {service.isAvailable
                                  ? "Available"
                                  : "Unavailable"}
                              </Badge>
                              <Badge
                                variant={
                                  service.isOptional ? "outline" : "secondary"
                                }
                              >
                                {service.isOptional ? "Optional" : "Required"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              ${service.costPerPerson} per person
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                extraServices: prev.extraServices.filter(
                                  (_, i) => i !== index
                                ),
                              }));
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="mt-2 text-sm">{service.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                    {formData.isActive ? "Route is visible" : "Route is hidden"}
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
                  <Label className="text-base">Featured Route</Label>
                  <p className="text-sm text-muted-foreground">
                    {formData.isFeatured
                      ? "Featured on homepage"
                      : "Regular listing"}
                  </p>
                </div>
                <Switch
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) =>
                    handleSwitchChange("isFeatured", checked)
                  }
                />
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
            {loading ? "Saving..." : route ? "Update Route" : "Create Route"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
