// app/create-trek/page.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Users,
  DollarSign,
  MapPin,
  Mountain,
  Clock,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  Eye,
  EyeOff,
  Lock,
  Globe,
  CalendarDays,
  ChefHat,
  Hotel,
  Bus,
  Shield,
  FileText,
  UserPlus,
  MessageSquare,
  Calculator,
  Share2,
  Settings,
  AccessibilityIcon,
} from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { TREKKING_REGIONS } from "@/lib/constants";
import type {
  Trek,
  Day,
  Service,
  Participant,
  GuideAssignment,
  GuideRequest,
  CostBreakdown,
} from "@/types/create-trek";
import { LoginModal } from "@/components/Login Modal/LoginModal";

// Mock data for services
const MANDATORY_SERVICES: Service[] = [
  {
    id: "guide-insurance",
    name: "Guide Insurance",
    description: "Mandatory insurance for all guides",
    category: "mandatory",
    price: 50,
    perPerson: false,
    selected: true,
  },
  {
    id: "permit-fees",
    name: "Trekking Permits",
    description: "Required permits for the region",
    category: "mandatory",
    price: 100,
    perPerson: true,
    selected: true,
  },
  {
    id: "platform-fee",
    name: "Platform Service Fee",
    description: "Service and support fee",
    category: "mandatory",
    price: 25,
    perPerson: true,
    selected: true,
  },
  {
    id: "guide-transport",
    name: "Guide Transport",
    description: "Transport for guide to/from trailhead",
    category: "mandatory",
    price: 75,
    perPerson: false,
    selected: true,
  },
];

const OPTIONAL_SERVICES: Service[] = [
  {
    id: "porter",
    name: "Porter Service",
    description: "Hire a porter to carry your gear",
    category: "optional",
    price: 25,
    perPerson: true,
    selected: false,
  },
  {
    id: "gear-rental",
    name: "Gear Rental Package",
    description: "Complete trekking gear set",
    category: "optional",
    price: 50,
    perPerson: true,
    selected: false,
  },
  {
    id: "satellite-phone",
    name: "Satellite Phone",
    description: "Emergency communication device",
    category: "optional",
    price: 15,
    perPerson: true,
    selected: false,
  },
  {
    id: "oxygen-cylinder",
    name: "Emergency Oxygen",
    description: "Portable oxygen cylinder",
    category: "optional",
    price: 100,
    perPerson: false,
    selected: false,
  },
];

const UPGRADE_SERVICES: Service[] = [
  {
    id: "private-room",
    name: "Private Room Upgrade",
    description: "Private accommodation upgrade",
    category: "upgrade",
    price: 30,
    perPerson: true,
    selected: false,
  },
  {
    id: "hotel-upgrade",
    name: "Hotel Upgrade",
    description: "Better accommodation before/after trek",
    category: "upgrade",
    price: 50,
    perPerson: true,
    selected: false,
  },
  {
    id: "private-transport",
    name: "Private Transport",
    description: "Private vehicle transfers",
    category: "upgrade",
    price: 200,
    perPerson: false,
    selected: false,
  },
];

// Mock participants
const MOCK_PARTICIPANTS: Participant[] = [
  {
    id: "1",
    userId: "user1",
    name: "You",
    email: "you@example.com",
    role: "creator",
    joinedAt: new Date(),
    paidAmount: 0,
    paymentStatus: "pending",
  },
  {
    id: "2",
    userId: "user2",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "participant",
    joinedAt: new Date(Date.now() - 86400000),
    paidAmount: 150,
    paymentStatus: "partial",
  },
];

// Mock guide requests
const MOCK_GUIDE_REQUESTS: GuideRequest[] = [
  {
    guideId: "guide1",
    name: "Mingma Sherpa",
    message: "I have 10 years experience in Everest region",
    proposedRate: 45,
    status: "pending",
    createdAt: new Date(Date.now() - 3600000),
  },
  {
    guideId: "guide2",
    name: "Raj Thapa",
    message: "Available on your dates, can speak 4 languages",
    proposedRate: 40,
    status: "pending",
    createdAt: new Date(Date.now() - 7200000),
  },
];

export default function CreateTrekPage() {
  const router = useRouter();

  // Basic trek info
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [regionId, setRegionId] = useState<string>("");
  const [difficulty, setDifficulty] = useState<Trek["difficulty"]>("Moderate");
  const [duration, setDuration] = useState<number>(10);
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date(Date.now() + 30 * 86400000)
  );
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [maxParticipants, setMaxParticipants] = useState<number>(8);
  const [isPublic, setIsPublic] = useState<boolean>(true);

  // Itinerary
  const [itinerary, setItinerary] = useState<Day[]>([
    {
      day: 1,
      title: "Arrival in Kathmandu",
      description: "Hotel check-in and trek briefing",
      altitude: 1400,
      distance: 0,
      duration: "Flexible",
      accommodation: "Hotel",
      meals: ["Dinner"],
      highlights: ["City tour", "Briefing"],
    },
    {
      day: 2,
      title: "Fly to Lukla, Trek to Phakding",
      description: "Scenic flight and easy trek start",
      altitude: 2610,
      distance: 8,
      duration: "4 hours",
      accommodation: "Teahouse",
      meals: ["Breakfast", "Lunch", "Dinner"],
      highlights: ["Mountain flight", "First trek day"],
    },
  ]);

  // Services
  const [selectedServices, setSelectedServices] = useState<Service[]>([
    ...MANDATORY_SERVICES,
    ...OPTIONAL_SERVICES.filter((s) => s.selected),
    ...UPGRADE_SERVICES.filter((s) => s.selected),
  ]);

  // Participants
  const [participants, setParticipants] =
    useState<Participant[]>(MOCK_PARTICIPANTS);

  // Guide requests
  const [guideRequests, setGuideRequests] =
    useState<GuideRequest[]>(MOCK_GUIDE_REQUESTS);

  // Guide assignments
  const [assignedGuides, setAssignedGuides] = useState<GuideAssignment[]>([
    {
      guideId: "guide3",
      name: "Tashi Lama",
      dailyRate: 50,
      assignedDays: duration,
      totalCost: 50 * duration,
      status: "confirmed",
    },
  ]);

  // Calculate dates
  useEffect(() => {
    if (startDate && duration) {
      const end = new Date(startDate);
      end.setDate(end.getDate() + duration - 1);
      setEndDate(end);
    }
  }, [startDate, duration]);

  // Calculate costs
  const costBreakdown = useMemo<CostBreakdown>(() => {
    const basePrice = 50 * duration; // $50 per day base cost

    // Guide fees
    const guideFees = assignedGuides.reduce(
      (sum, guide) => sum + guide.totalCost,
      0
    );

    // Permit costs (per person)
    const permits = selectedServices
      .filter((s) => s.id === "permit-fees" && s.selected)
      .reduce((sum, s) => sum + s.price, 0);

    // Insurance (per trek)
    const insurance = selectedServices
      .filter((s) => s.id === "guide-insurance" && s.selected)
      .reduce((sum, s) => sum + s.price, 0);

    // Transport (per trek)
    const transport = selectedServices
      .filter((s) => s.id === "guide-transport" && s.selected)
      .reduce((sum, s) => sum + s.price, 0);

    // Platform fee (per person)
    const platformFee = selectedServices
      .filter((s) => s.id === "platform-fee" && s.selected)
      .reduce((sum, s) => sum + s.price, 0);

    // Optional services (per person where applicable)
    const optionalServices = selectedServices
      .filter((s) => s.category === "optional" && s.selected)
      .reduce(
        (sum, s) => sum + (s.perPerson ? s.price : s.price / maxParticipants),
        0
      );

    // Accommodation & meals estimate ($30 per day per person)
    const accommodation = 30 * duration;
    const meals = 25 * duration;

    const total =
      basePrice +
      guideFees +
      permits +
      insurance +
      transport +
      platformFee +
      optionalServices +
      accommodation +
      meals;

    return {
      basePrice,
      guideFees,
      permits,
      insurance,
      transport,
      accommodation,
      meals,
      platformFee,
      optionalServices,
      total,
    };
  }, [duration, selectedServices, assignedGuides, maxParticipants]);

  const costPerPerson = useMemo(() => {
    const participantCount = Math.max(1, participants.length);
    return costBreakdown.total / participantCount;
  }, [costBreakdown.total, participants.length]);

  // Toggle service selection
  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.map((service) =>
        service.id === serviceId
          ? { ...service, selected: !service.selected }
          : service
      )
    );
  };

  // Add new itinerary day
  const addDay = () => {
    const newDay: Day = {
      day: itinerary.length + 1,
      title: `Day ${itinerary.length + 1}`,
      description: "Describe this day's activities",
      altitude: 0,
      distance: 0,
      duration: "0 hours",
      accommodation: "Teahouse",
      meals: ["Breakfast", "Lunch", "Dinner"],
      highlights: [],
    };
    setItinerary([...itinerary, newDay]);
  };

  // Update itinerary day
  const updateDay = (index: number, field: keyof Day, value: any) => {
    const newItinerary = [...itinerary];
    newItinerary[index] = { ...newItinerary[index], [field]: value };
    setItinerary(newItinerary);
  };

  // Remove itinerary day
  const removeDay = (index: number) => {
    setItinerary(itinerary.filter((_, i) => i !== index));
  };

  // Handle guide request response
  const handleGuideRequest = (
    guideId: string,
    status: "accepted" | "rejected"
  ) => {
    setGuideRequests((prev) =>
      prev.map((req) => (req.guideId === guideId ? { ...req, status } : req))
    );

    if (status === "accepted") {
      const request = guideRequests.find((r) => r.guideId === guideId);
      if (request) {
        const newGuide: GuideAssignment = {
          guideId: request.guideId,
          name: request.name,
          dailyRate: request.proposedRate,
          assignedDays: duration,
          totalCost: request.proposedRate * duration,
          status: "confirmed",
        };
        setAssignedGuides([...assignedGuides, newGuide]);
      }
    }
  };

  // Create trek
  const handleCreateTrek = () => {
    const trek: Trek = {
      id: `trek-${Date.now()}`,
      title: title || "My Trekking Adventure",
      description,
      regionId,
      difficulty,
      duration,
      startDate: startDate!,
      endDate: endDate!,
      maxParticipants,
      currentParticipants: participants.length,
      isPublic,
      status: "open",
      createdBy: "current-user-id",
      createdAt: new Date(),
      totalCost: costBreakdown.total,
      costPerPerson,
      itinerary,
      services: selectedServices.filter((s) => s.selected),
      participants,
      guides: assignedGuides,
      requests: guideRequests,
    };

    // In real app, save to database
    console.log("Created trek:", trek);

    // Navigate to trek page
    router.push(`/treks/${trek.id}`);
  };

  // Copy trek link
  const copyTrekLink = () => {
    navigator.clipboard.writeText(
      `https://mountainhub.com/join-trek/trek-${Date.now()}`
    );
    // Show success toast
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />
      <LoginModal />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Create Your Trekking Adventure
            </h1>
            <p className="text-muted-foreground">
              Plan your trek, customize the itinerary, add services, and invite
              others to join
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Basic Information
                  </CardTitle>
                  <CardDescription>
                    Set up the foundation of your trek
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Trek Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Everest Base Camp Adventure"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your trekking adventure..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="region">Region *</Label>
                      <Select value={regionId} onValueChange={setRegionId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          {TREKKING_REGIONS.map((region) => (
                            <SelectItem key={region.id} value={region.id}>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                {region.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Difficulty *</Label>
                      <Select
                        value={difficulty}
                        onValueChange={(value: Trek["difficulty"]) =>
                          setDifficulty(value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Easy">Easy</SelectItem>
                          <SelectItem value="Moderate">Moderate</SelectItem>
                          <SelectItem value="Challenging">
                            Challenging
                          </SelectItem>
                          <SelectItem value="Hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !startDate && "text-muted-foreground"
                            )}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {startDate
                              ? format(startDate, "PPP")
                              : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (days) *</Label>
                      <Input
                        id="duration"
                        type="number"
                        min="1"
                        max="30"
                        value={duration}
                        onChange={(e) =>
                          setDuration(parseInt(e.target.value) || 1)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <div className="w-full p-3 border rounded-md bg-muted/50">
                        {endDate
                          ? format(endDate, "PPP")
                          : "Select start date first"}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="maxParticipants">
                        Max Participants *
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="maxParticipants"
                          type="number"
                          min="1"
                          max="20"
                          value={maxParticipants}
                          onChange={(e) =>
                            setMaxParticipants(parseInt(e.target.value) || 1)
                          }
                        />
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="visibility">Trek Visibility</Label>
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center gap-2">
                          {isPublic ? (
                            <Globe className="h-4 w-4 text-emerald-600" />
                          ) : (
                            <Lock className="h-4 w-4 text-amber-600" />
                          )}
                          <span>
                            {isPublic
                              ? "Public - Others can join"
                              : "Private - Invite only"}
                          </span>
                        </div>
                        <Switch
                          checked={isPublic}
                          onCheckedChange={setIsPublic}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Itinerary Builder */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <AccessibilityIcon className="h-5 w-5" />
                        Itinerary Builder
                      </CardTitle>
                      <CardDescription>
                        Plan each day of your trek
                      </CardDescription>
                    </div>
                    <Button onClick={addDay} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Day
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="preview" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                      <TabsTrigger value="edit">Edit</TabsTrigger>
                    </TabsList>

                    <TabsContent value="preview" className="space-y-4">
                      {itinerary.map((day, index) => (
                        <div key={day.day} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold">
                                Day {day.day}: {day.title}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {day.description}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{day.altitude}m</Badge>
                              <Badge variant="outline">{day.distance}km</Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{day.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Hotel className="h-3 w-3" />
                              <span>{day.accommodation}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <ChefHat className="h-3 w-3" />
                              <span>{day.meals.length} meals</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Mountain className="h-3 w-3" />
                              <span>{day.highlights.length} highlights</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="edit" className="space-y-4">
                      {itinerary.map((day, index) => (
                        <Card key={day.day} className="relative">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-base">
                                Day {day.day}
                              </CardTitle>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeDay(index)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="space-y-2">
                              <Label>Title</Label>
                              <Input
                                value={day.title}
                                onChange={(e) =>
                                  updateDay(index, "title", e.target.value)
                                }
                                placeholder="Day title"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>Description</Label>
                              <Textarea
                                value={day.description}
                                onChange={(e) =>
                                  updateDay(
                                    index,
                                    "description",
                                    e.target.value
                                  )
                                }
                                placeholder="Describe this day's activities"
                                rows={2}
                              />
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              <div className="space-y-2">
                                <Label>Altitude (m)</Label>
                                <Input
                                  type="number"
                                  value={day.altitude}
                                  onChange={(e) =>
                                    updateDay(
                                      index,
                                      "altitude",
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Distance (km)</Label>
                                <Input
                                  type="number"
                                  value={day.distance}
                                  onChange={(e) =>
                                    updateDay(
                                      index,
                                      "distance",
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Duration</Label>
                                <Input
                                  value={day.duration}
                                  onChange={(e) =>
                                    updateDay(index, "duration", e.target.value)
                                  }
                                  placeholder="e.g., 4 hours"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Accommodation</Label>
                                <Input
                                  value={day.accommodation}
                                  onChange={(e) =>
                                    updateDay(
                                      index,
                                      "accommodation",
                                      e.target.value
                                    )
                                  }
                                  placeholder="e.g., Teahouse"
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Services & Extras */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Services & Extras
                  </CardTitle>
                  <CardDescription>
                    Add mandatory and optional services to your trek
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="mandatory" className="w-full">
                    <TabsList className="grid grid-cols-3">
                      <TabsTrigger value="mandatory">Mandatory</TabsTrigger>
                      <TabsTrigger value="optional">Optional</TabsTrigger>
                      <TabsTrigger value="upgrades">Upgrades</TabsTrigger>
                    </TabsList>

                    <TabsContent value="mandatory" className="space-y-3">
                      {MANDATORY_SERVICES.map((service) => (
                        <ServiceCard
                          key={service.id}
                          service={service}
                          isSelected={true}
                          onToggle={() => {}} // Can't toggle mandatory
                          participantCount={participants.length}
                        />
                      ))}
                    </TabsContent>

                    <TabsContent value="optional" className="space-y-3">
                      {OPTIONAL_SERVICES.map((service) => (
                        <ServiceCard
                          key={service.id}
                          service={service}
                          isSelected={
                            selectedServices.find((s) => s.id === service.id)
                              ?.selected || false
                          }
                          onToggle={() => toggleService(service.id)}
                          participantCount={participants.length}
                        />
                      ))}
                    </TabsContent>

                    <TabsContent value="upgrades" className="space-y-3">
                      {UPGRADE_SERVICES.map((service) => (
                        <ServiceCard
                          key={service.id}
                          service={service}
                          isSelected={
                            selectedServices.find((s) => s.id === service.id)
                              ?.selected || false
                          }
                          onToggle={() => toggleService(service.id)}
                          participantCount={participants.length}
                        />
                      ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Guide Requests */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    Guide Applications
                  </CardTitle>
                  <CardDescription>
                    Guides have applied to lead your trek
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {guideRequests.filter((r) => r.status === "pending").length >
                  0 ? (
                    guideRequests
                      .filter((r) => r.status === "pending")
                      .map((request) => (
                        <div
                          key={request.guideId}
                          className="border rounded-lg p-4"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold">{request.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {request.message}
                              </p>
                              <div className="flex items-center gap-4 mt-2">
                                <Badge variant="outline">
                                  ${request.proposedRate}/day
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  Applied{" "}
                                  {format(request.createdAt, "MMM d, h:mm a")}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                              onClick={() =>
                                handleGuideRequest(request.guideId, "rejected")
                              }
                            >
                              <X className="h-4 w-4 mr-2" />
                              Decline
                            </Button>
                            <Button
                              size="sm"
                              className="flex-1"
                              onClick={() =>
                                handleGuideRequest(request.guideId, "accepted")
                              }
                            >
                              <Check className="h-4 w-4 mr-2" />
                              Hire Guide
                            </Button>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <UserPlus className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>
                        No guide applications yet. Your trek will be visible to
                        guides once published.
                      </p>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Assigned Guides</h4>
                    {assignedGuides.length > 0 ? (
                      assignedGuides.map((guide) => (
                        <div
                          key={guide.guideId}
                          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg mb-2"
                        >
                          <div>
                            <span className="font-medium">{guide.name}</span>
                            <div className="text-sm text-muted-foreground">
                              ${guide.dailyRate}/day × {guide.assignedDays} days
                              = ${guide.totalCost}
                            </div>
                          </div>
                          <Badge
                            variant={
                              guide.status === "confirmed"
                                ? "accent"
                                : "destructive"
                            }
                          >
                            {guide.status}
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No guides assigned yet
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Summary & Actions */}
            <div className="space-y-6">
              {/* Cost Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Cost Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    {[
                      {
                        label: "Base Cost",
                        value: `$${costBreakdown.basePrice}`,
                      },
                      {
                        label: "Guide Fees",
                        value: `$${costBreakdown.guideFees}`,
                      },
                      {
                        label: "Permits",
                        value: `$${costBreakdown.permits} ${
                          costBreakdown.permits > 0 ? "/person" : ""
                        }`,
                      },
                      {
                        label: "Insurance",
                        value: `$${costBreakdown.insurance}`,
                      },
                      {
                        label: "Transport",
                        value: `$${costBreakdown.transport}`,
                      },
                      {
                        label: "Accommodation",
                        value: `$${costBreakdown.accommodation} ${
                          costBreakdown.accommodation > 0 ? "/person" : ""
                        }`,
                      },
                      {
                        label: "Meals",
                        value: `$${costBreakdown.meals} ${
                          costBreakdown.meals > 0 ? "/person" : ""
                        }`,
                      },
                      {
                        label: "Platform Fee",
                        value: `$${costBreakdown.platformFee} ${
                          costBreakdown.platformFee > 0 ? "/person" : ""
                        }`,
                      },
                      {
                        label: "Optional Services",
                        value: `$${costBreakdown.optionalServices.toFixed(2)}`,
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-muted-foreground">
                          {item.label}
                        </span>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}

                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total Cost</span>
                        <span>${costBreakdown.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-50  p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Cost per person
                        </div>
                        <div className="text-2xl font-bold text-emerald-700 ">
                          ${costPerPerson.toFixed(2)}
                        </div>
                      </div>
                      <Badge variant="outline">
                        {participants.length} / {maxParticipants} people
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Participants */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Participants ({participants.length}/{maxParticipants})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {participants.map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center justify-between p-2 rounded hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            participant.role === "creator"
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-foreground"
                          }`}
                        >
                          {participant.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-sm">
                            {participant.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {participant.role === "creator"
                              ? "Organizer"
                              : "Participant"}
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant={
                          participant.paymentStatus === "full"
                            ? "success"
                            : participant.paymentStatus === "partial"
                            ? "warning"
                            : "secondary"
                        }
                      >
                        {participant.paymentStatus}
                      </Badge>
                    </div>
                  ))}

                  {isPublic && participants.length < maxParticipants && (
                    <div className="border-t pt-4">
                      <p className="text-sm text-muted-foreground mb-2">
                        Other trekkers can join this public trek. Cost will be
                        divided among all participants.
                      </p>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={copyTrekLink}
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Copy Invite Link
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Ready to Publish?</h4>
                    <p className="text-sm text-muted-foreground">
                      Once published, your trek will be visible to guides and{" "}
                      {isPublic
                        ? "other trekkers"
                        : "invited participants only"}
                      .
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      size="lg"
                      className="w-full"
                      onClick={handleCreateTrek}
                      disabled={!title || !regionId || !startDate}
                    >
                      <Check className="h-5 w-5 mr-2" />
                      Publish Trek
                    </Button>

                    <Button variant="outline" size="lg" className="w-full">
                      <Eye className="h-5 w-5 mr-2" />
                      Preview
                    </Button>

                    <Button variant="ghost" size="lg" className="w-full">
                      Save as Draft
                    </Button>
                  </div>

                  <div className="text-xs text-muted-foreground space-y-1">
                    <p className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      Your payment details are secured
                    </p>
                    <p className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      Cancellation policy applies
                    </p>
                    <p className="flex items-center gap-1">
                      <Bus className="h-3 w-3" />
                      Transport arrangements included
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Service Card Component
interface ServiceCardProps {
  service: Service;
  isSelected: boolean;
  onToggle: () => void;
  participantCount: number;
}

function ServiceCard({
  service,
  isSelected,
  onToggle,
  participantCount,
}: ServiceCardProps) {
  const calculatedPrice = service.perPerson
    ? service.price * participantCount
    : service.price;

  return (
    <div
      className={cn(
        "border rounded-lg p-4 transition-all cursor-pointer hover:border-primary",
        isSelected ? "border-primary bg-primary/5" : ""
      )}
      onClick={onToggle}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold">{service.name}</h4>
            <Badge
              variant={
                service.category === "mandatory"
                  ? "destructive"
                  : service.category === "optional"
                  ? "outline"
                  : "secondary"
              }
            >
              {service.category}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            {service.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span className="font-bold">${service.price}</span>
              <span className="text-muted-foreground ml-1">
                {service.perPerson ? "/person" : "/trek"}
              </span>
            </div>
            <div
              className={cn(
                "w-6 h-6 rounded-full border flex items-center justify-center",
                isSelected
                  ? "bg-primary border-primary text-primary-foreground"
                  : "bg-background"
              )}
            >
              {isSelected && <Check className="h-3 w-3" />}
            </div>
          </div>
        </div>
      </div>
      {service.perPerson && participantCount > 1 && (
        <div className="mt-2 text-xs text-muted-foreground">
          Total for {participantCount} participants: ${calculatedPrice}
        </div>
      )}
    </div>
  );
}
