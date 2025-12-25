"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import RouteForm from "../../create/page";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

// Mock data for editing - in real app, fetch from API
const mockRouteData = {
  _id: "1",
  name: "Everest Base Camp Trek",
  slug: "everest-base-camp-trek",
  region: {
    _id: "region1",
    name: "Khumbu Region",
  },
  description:
    "The classic Everest Base Camp trek is one of the most popular trekking adventures in the world. This incredible journey takes you through the heart of the Khumbu region, offering breathtaking views of the world's highest peaks.",
  duration: 14,
  distance: 130,
  difficulty: "challenging",
  startPoint: "Lukla",
  endPoint: "Everest Base Camp",
  itinerary: [
    {
      day: 1,
      title: "Kathmandu to Lukla to Phakding",
      description: "Scenic flight to Lukla and trek to Phakding village",
      altitude: 2652,
      distance: 8,
      duration: "3-4 hours",
      accommodation: "Teahouse",
      meals: ["Breakfast", "Lunch", "Dinner"],
      highlights: ["Scenic mountain flight", "First views of the Himalayas"],
      notes: "Flight depends on weather conditions",
    },
    {
      day: 2,
      title: "Phakding to Namche Bazaar",
      description: "Trek along the Dudh Koshi river to the Sherpa capital",
      altitude: 3440,
      distance: 12,
      duration: "5-6 hours",
      accommodation: "Teahouse",
      meals: ["Breakfast", "Lunch", "Dinner"],
      highlights: ["Suspension bridges", "First view of Everest"],
      notes: "Steep climb to Namche",
    },
  ],
  costBreakdown: {
    guidePerDay: 25,
    permitsPerPerson: 50,
    accommodationPerDay: 20,
    mealsPerDay: 25,
    transportPerPerson: 150,
    insurancePerPerson: 100,
  },
  inclusions: [
    "Professional trekking guide",
    "ACAP and TIMS permits",
    "Teahouse accommodation",
    "Three meals per day",
    "Airport transfers",
    "Basic medical kit",
  ],
  exclusions: [
    "International flights",
    "Nepal visa fee",
    "Personal expenses",
    "Travel insurance",
    "Tips for staff",
    "Alcoholic beverages",
  ],
  requirements: {
    fitnessLevel: "Good physical fitness required",
    gearChecklist: [
      "Trekking boots",
      "Sleeping bag (-20°C)",
      "Down jacket",
      "Thermal layers",
      "Trekking poles",
    ],
    vaccinations: ["Hepatitis A", "Typhoid", "Tetanus"],
    permits: ["TIMS Card", "Sagarmatha National Park Permit"],
  },
  bestTime: {
    months: ["March", "April", "May", "September", "October", "November"],
    weather: "Clear skies with mild daytime temperatures",
    temperatureRange: "-10°C to 15°C",
  },
  gallery: {
    coverImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    images: [
      "https://images.unsplash.com/photo-1464278533981-50106e6176b1",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    ],
    videos: [],
  },
  variations: [
    {
      name: "Short Version",
      duration: 10,
      difficulty: "moderate",
      description: "Condensed version for time-limited travelers",
    },
  ],
  extraServices: [
    {
      name: "Porter Service",
      description: "Carry up to 15kg of personal luggage",
      costPerPerson: 25,
      isAvailable: true,
      isOptional: true,
    },
  ],
  isActive: true,
  isFeatured: true,
  usageCount: 245,
};

export default function EditRoutePage() {
  const router = useRouter();
  const params = useParams();
  const [route, setRoute] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch route data
    const fetchRoute = async () => {
      setLoading(true);
      try {
        // In real app: const response = await fetch(`/api/routes/${params.id}`);
        // const data = await response.json();

        // For demo, use mock data
        setTimeout(() => {
          setRoute(mockRouteData);
          setLoading(false);
        }, 500);
      } catch (error) {
        toast.error("Failed to load route data");
        setLoading(false);
      }
    };

    fetchRoute();
  }, [params.id]);

  const handleSuccess = () => {
    router.push("/user/trekking-routes");
    router.refresh();
  };

  const handleCancel = () => {
    router.push("/user/trekking-routes");
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 mt-20 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading route data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 mt-20">
      <div className="mb-6">
        <Button variant="outline" onClick={handleCancel} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Routes
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Edit Trekking Route</CardTitle>
            <CardDescription>
              Update the details for {route?.name || "this trekking route"}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {route && (
              <RouteForm
                route={route}
                onSuccess={handleSuccess}
                onCancel={handleCancel}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
