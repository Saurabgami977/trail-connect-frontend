"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  MapPin,
  Heart,
  FileText,
  Download,
  Star,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Plane,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mockTrips = [
  {
    id: "1",
    guideName: "Tenzing Sherpa",
    guidePhoto: "",
    region: "Everest Base Camp",
    startDate: "2024-03-15",
    endDate: "2024-03-28",
    status: "upcoming",
    totalAmount: 630,
    groupSize: 2,
  },
  {
    id: "2",
    guideName: "Pemba Dorje",
    guidePhoto: "",
    region: "Annapurna Circuit",
    startDate: "2024-01-10",
    endDate: "2024-01-22",
    status: "completed",
    totalAmount: 480,
    groupSize: 1,
  },
  {
    id: "3",
    guideName: "Karma Lama",
    guidePhoto: "",
    region: "Langtang Valley",
    startDate: "2023-10-05",
    endDate: "2023-10-12",
    status: "completed",
    totalAmount: 385,
    groupSize: 3,
  },
];

const mockSavedGuides = [
  {
    id: "1",
    name: "Tenzing Sherpa",
    rating: 4.9,
    regions: ["Everest", "Langtang"],
    dailyRate: 45,
  },
  {
    id: "2",
    name: "Karma Lama",
    rating: 5.0,
    regions: ["Manaslu", "Langtang"],
    dailyRate: 55,
  },
  {
    id: "3",
    name: "Dawa Gyalje",
    rating: 4.8,
    regions: ["Annapurna"],
    dailyRate: 42,
  },
];

const statusConfig = {
  upcoming: { label: "Upcoming", color: "bg-blue-500", icon: Clock },
  in_progress: { label: "In Progress", color: "bg-emerald-500", icon: Plane },
  completed: { label: "Completed", color: "bg-muted", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "bg-destructive", icon: XCircle },
};

const TouristDashboard = () => {
  const [activeTab, setActiveTab] = useState("trips");

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Welcome Banner */}
          <div className="bg-gradient-hero rounded-2xl p-6 md:p-8 mb-8 text-primary-foreground">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-1">
                  Welcome back, Emma!
                </h1>
                <p className="text-primary-foreground/70">
                  Manage your treks, saved guides, and travel documents.
                </p>
              </div>
              <Button variant="heroOutline" asChild>
                <Link href="/guides">Find a Guide</Link>
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-sm text-muted-foreground">
                      Treks Completed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">1</p>
                    <p className="text-sm text-muted-foreground">
                      Upcoming Trek
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center">
                    <Heart className="h-5 w-5 text-rose-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {mockSavedGuides.length}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Saved Guides
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <Star className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">2</p>
                    <p className="text-sm text-muted-foreground">
                      Reviews Given
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-3 h-auto p-1">
              <TabsTrigger value="trips" className="gap-2 py-2">
                <Calendar className="h-4 w-4" />
                <span>My Trips</span>
              </TabsTrigger>
              <TabsTrigger value="saved" className="gap-2 py-2">
                <Heart className="h-4 w-4" />
                <span>Saved Guides</span>
              </TabsTrigger>
              <TabsTrigger value="documents" className="gap-2 py-2">
                <FileText className="h-4 w-4" />
                <span>Documents</span>
              </TabsTrigger>
            </TabsList>

            {/* Trips Tab */}
            <TabsContent value="trips">
              <Card>
                <CardHeader>
                  <CardTitle>My Trips</CardTitle>
                  <CardDescription>
                    Track your upcoming and past treks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTrips.map((trip) => {
                      const status =
                        statusConfig[trip.status as keyof typeof statusConfig];
                      const StatusIcon = status.icon;

                      return (
                        <div
                          key={trip.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border bg-card hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start gap-4">
                            {/* Timeline indicator */}
                            <div className="flex flex-col items-center">
                              <div
                                className={cn(
                                  "w-3 h-3 rounded-full",
                                  status.color
                                )}
                              />
                              <div className="w-0.5 h-full bg-border mt-1" />
                            </div>

                            <Avatar className="h-12 w-12">
                              <AvatarImage src={trip.guidePhoto} />
                              <AvatarFallback>
                                {trip.guideName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>

                            <div>
                              <h4 className="font-semibold">{trip.region}</h4>
                              <p className="text-sm text-muted-foreground">
                                with {trip.guideName}
                              </p>
                              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3.5 w-3.5" />
                                  {new Date(trip.startDate).toLocaleDateString(
                                    "en-US",
                                    { month: "short", day: "numeric" }
                                  )}{" "}
                                  -{" "}
                                  {new Date(trip.endDate).toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    }
                                  )}
                                </div>
                                <div className="flex items-center gap-1">
                                  <User className="h-3.5 w-3.5" />
                                  {trip.groupSize}{" "}
                                  {trip.groupSize === 1 ? "person" : "people"}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 ml-7 sm:ml-0">
                            <div className="text-right">
                              <p className="font-bold text-primary">
                                ${trip.totalAmount}
                              </p>
                              <Badge
                                variant={
                                  trip.status === "upcoming"
                                    ? "pending"
                                    : trip.status === "completed"
                                    ? "secondary"
                                    : "destructive"
                                }
                                className="mt-1"
                              >
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {status.label}
                              </Badge>
                            </div>
                            <Button variant="ghost" size="icon">
                              <ChevronRight className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Saved Guides Tab */}
            <TabsContent value="saved">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Guides</CardTitle>
                  <CardDescription>
                    Guides you've bookmarked for future treks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockSavedGuides.map((guide) => (
                      <div
                        key={guide.id}
                        className="p-4 rounded-xl border hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback>
                              {guide.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-medium">{guide.name}</h4>
                            <div className="flex items-center gap-1 text-sm">
                              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                              <span>{guide.rating}</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-rose-500"
                          >
                            <Heart className="h-5 w-5 fill-current" />
                          </Button>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {guide.regions.map((region) => (
                            <Badge
                              key={region}
                              variant="region"
                              className="text-xs"
                            >
                              {region}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-primary font-bold">
                            ${guide.dailyRate}/day
                          </span>
                          <Button size="sm" asChild>
                            <Link href={`/guides/${guide.id}`}>
                              View Profile
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Invoices & Receipts</CardTitle>
                  <CardDescription>
                    Download your booking documents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockTrips
                      .filter((t) => t.status === "completed")
                      .map((trip) => (
                        <div
                          key={trip.id}
                          className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">
                                Invoice #{trip.id.padStart(5, "0")}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {trip.region} •{" "}
                                {new Date(trip.startDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-medium">
                              ${trip.totalAmount}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1"
                            >
                              <Download className="h-4 w-4" />
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default TouristDashboard;
