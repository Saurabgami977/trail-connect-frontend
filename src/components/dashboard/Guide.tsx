"use client";

import { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import {
  User,
  Calendar as CalendarIcon,
  DollarSign,
  Settings,
  Bell,
  ShieldCheck,
  MapPin,
  Star,
  TrendingUp,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  Edit,
  Save,
} from "lucide-react";
import { EXTRA_SERVICES } from "@/lib/constants";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { updateAvailability } from "@/api/routes/guide";
import { store } from "@/store/store";
import { toast } from "sonner";

const mockBookings = [
  {
    id: "1",
    touristName: "Emma Schmidt",
    region: "Everest Base Camp",
    startDate: "2024-03-15",
    endDate: "2024-03-28",
    days: 14,
    status: "confirmed",
    totalAmount: 630,
  },
  {
    id: "2",
    touristName: "Marco Rossi",
    region: "Annapurna Circuit",
    startDate: "2024-04-02",
    endDate: "2024-04-14",
    days: 12,
    status: "pending",
    totalAmount: 540,
  },
  {
    id: "3",
    touristName: "Yuki Tanaka",
    region: "Langtang Valley",
    startDate: "2024-04-20",
    endDate: "2024-04-27",
    days: 7,
    status: "completed",
    totalAmount: 315,
  },
];

const GuideDashboard = () => {
  const { user, guide } = useSelector((state: any) => state.auth);
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);
  const [dailyRate, setDailyRate] = useState("45");
  const [activeServices, setActiveServices] = useState<string[]>([
    "porter",
    "tims",
  ]);

  useEffect(() => {
    if (guide && guide.availability) {
      const unavailableDates = guide.availability
        .filter((slot: any) => slot.status === "unavailable")
        .flatMap((slot: any) => {
          const dates = [];
          const currentDate = new Date(slot.startDate);
          const endDate = new Date(slot.endDate);
          while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
          }
          return dates;
        });
      setBlockedDates(unavailableDates);
    }
  }, [guide]);

  const toggleService = (serviceId: string) => {
    setActiveServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((s) => s !== serviceId)
        : [...prev, serviceId]
    );
  };

  const stats = {
    totalBookings: 87,
    monthlyEarnings: 2340,
    rating: 4.9,
    completedTreks: 82,
  };

  const { mutate: mutateAvailability, isPending: isAvailabilityUpdating } =
    useMutation({
      mutationFn: (
        availability: {
          startDate: Date;
          endDate: Date;
          status: string;
        }[]
      ) => updateAvailability(guide._id, availability),
      onSuccess: (data) => {
        store.dispatch({
          type: "guide/updateAvailability",
          payload: data.availability,
        });
        toast.success("Availability updated successfully!");
      },
    });

  const handleUnavailableDatesSave = () => {
    // Logic to save blocked dates to the backend or state management
    console.log("Blocked Dates Saved:", blockedDates);

    // convert in the form of from - to objects
    const blockedDateRanges = blockedDates.map((date) => {
      return {
        startDate: date,
        endDate: date,
        status: "unavailable",
      };
    });

    mutateAvailability(blockedDateRanges);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Welcome Banner */}
          <div className="bg-gradient-hero rounded-2xl p-6 md:p-8 mb-8 text-primary-foreground">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    variant="verified"
                    className="bg-primary-foreground/20 text-primary-foreground border-0"
                  >
                    <ShieldCheck className="h-3 w-3 mr-1" />
                    Verified Guide
                  </Badge>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-1">
                  Welcome back, {user?.firstName}!
                </h1>
                <p className="text-primary-foreground/70">
                  Manage your profile, calendar, and bookings all in one place.
                </p>
              </div>
              <Button variant="heroOutline" asChild>
                <Link href={`/guides/${guide?._id}`}>View Public Profile</Link>
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {stats.totalBookings}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Total Bookings
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      ${stats.monthlyEarnings}
                    </p>
                    <p className="text-sm text-muted-foreground">This Month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                    <Star className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {stats.rating}
                    </p>
                    <p className="text-sm text-muted-foreground">Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {stats.completedTreks}
                    </p>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Tabs */}
          <Tabs defaultValue="bookings" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto p-1">
              <TabsTrigger value="bookings" className="gap-2 py-2">
                <CalendarIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Bookings</span>
              </TabsTrigger>
              <TabsTrigger value="calendar" className="gap-2 py-2">
                <Clock className="h-4 w-4" />
                <span className="hidden sm:inline">Availability</span>
              </TabsTrigger>
              <TabsTrigger value="pricing" className="gap-2 py-2">
                <DollarSign className="h-4 w-4" />
                <span className="hidden sm:inline">Pricing</span>
              </TabsTrigger>
              <TabsTrigger value="services" className="gap-2 py-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Services</span>
              </TabsTrigger>
            </TabsList>

            {/* Bookings Tab */}
            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>Your Bookings</CardTitle>
                  <CardDescription>
                    Manage incoming and ongoing trek bookings.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border bg-card"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">
                              {booking.touristName}
                            </h4>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <MapPin className="h-3.5 w-3.5" />
                              {booking.region}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                              <CalendarIcon className="h-3.5 w-3.5" />
                              {booking.startDate} - {booking.endDate} (
                              {booking.days} days)
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-bold text-primary">
                              ${booking.totalAmount}
                            </p>
                            <Badge
                              variant={
                                booking.status === "confirmed"
                                  ? "verified"
                                  : booking.status === "pending"
                                  ? "pending"
                                  : "secondary"
                              }
                            >
                              {booking.status}
                            </Badge>
                          </div>
                          {booking.status === "pending" && (
                            <div className="flex gap-2">
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-9 w-9"
                              >
                                <CheckCircle className="h-4 w-4 text-emerald-600" />
                              </Button>
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-9 w-9"
                              >
                                <XCircle className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Calendar Tab */}
            <TabsContent value="calendar">
              <Card>
                <CardHeader>
                  <CardTitle>Availability Calendar</CardTitle>
                  <CardDescription>
                    Click on dates to block them. Blocked dates will show as
                    unavailable to tourists.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6">
                    <Calendar
                      mode="multiple"
                      selected={blockedDates}
                      onSelect={(dates) => setBlockedDates(dates || [])}
                      className="rounded-lg border"
                      disabled={(date) => date < new Date()}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground mb-3">
                        Blocked Dates
                      </h4>
                      {blockedDates.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {blockedDates.map((date, i) => (
                            <Badge key={i} variant="secondary">
                              {date.toLocaleDateString()}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No dates blocked. Click on the calendar to mark dates
                          as unavailable.
                        </p>
                      )}
                      <Button
                        className="mt-4 cursor-pointer"
                        disabled={isAvailabilityUpdating}
                        onClick={handleUnavailableDatesSave}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pricing Tab */}
            <TabsContent value="pricing">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing Settings</CardTitle>
                  <CardDescription>Set your daily rate.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="dailyRate">
                        Standard Daily Rate (USD)
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="dailyRate"
                          type="number"
                          value={dailyRate}
                          onChange={(e) => setDailyRate(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Pricing
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Services Tab */}
            <TabsContent value="services">
              <Card>
                <CardHeader>
                  <CardTitle>Extra Services</CardTitle>
                  <CardDescription>
                    Enable additional services you offer to tourists.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {EXTRA_SERVICES.map((service) => (
                      <div
                        key={service.id}
                        className="flex items-center justify-between p-4 rounded-xl border"
                      >
                        <div>
                          <h4 className="font-medium text-foreground">
                            {service.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {service.description}
                          </p>
                        </div>
                        <Switch
                          checked={activeServices.includes(service.id)}
                          onCheckedChange={() => toggleService(service.id)}
                        />
                      </div>
                    ))}
                  </div>
                  <Button className="mt-6">
                    <Save className="h-4 w-4 mr-2" />
                    Save Services
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default GuideDashboard;
