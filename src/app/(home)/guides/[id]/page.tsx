"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Star,
  MapPin,
  Languages,
  ShieldCheck,
  Clock,
  Phone,
  Mail,
  CheckCircle,
  ArrowLeft,
  Calendar as CalendarIcon,
  Plane,
  Users,
  FileText,
} from "lucide-react";
import { MOCK_GUIDES, EXTRA_SERVICES } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { getById } from "@/api/routes/guide";

const GuideProfile = () => {
  const { id } = useParams();

  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const { data: guideData } = useQuery({
    queryKey: ["guideDetails", id],
    queryFn: () => getById(id),
  });

  const serviceIcons: Record<string, React.ElementType> = {
    "domestic-flight": Plane,
    "return-flight": Plane,
    porter: Users,
    tims: FileText,
  };

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((s) => s !== serviceId)
        : [...prev, serviceId]
    );
  };

  const totalDays = selectedDates.length;
  const basePrice = totalDays * guideData?.pricing?.dailyRate;
  const servicePrice = selectedServices.length * 25; // Placeholder pricing
  const totalPrice = basePrice + servicePrice;

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Guides
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Header */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="relative flex-shrink-0">
                      <img
                        src={
                          process.env.NEXT_PUBLIC_ClOUDFLARE_API +
                          guideData?.user?.avatar
                        }
                        alt={guideData?.user?.firstName}
                        className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover"
                      />
                      {guideData?.verified && (
                        <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-primary-foreground p-2 rounded-full shadow-lg">
                          <ShieldCheck className="h-5 w-5" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                        <div>
                          <h1 className="text-2xl font-bold text-foreground mb-1">
                            {guideData?.user?.firstName}{" "}
                            {guideData?.user?.lastName}
                          </h1>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="verified">Licensed Guide</Badge>
                            <div className="flex items-center gap-1 text-sm">
                              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                              <span className="font-medium">
                                {guideData?.avgRating}
                              </span>
                              <span className="text-muted-foreground">
                                ({guideData?.reviewCount} reviews)
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            ${guideData?.pricing?.dailyRate}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            per day
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>
                            {guideData?.yearsOfExperience} years experience
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>
                            {guideData?.expertiseRegions?.length} regions
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Languages className="h-4 w-4" />
                          <span>
                            {guideData?.user?.languages?.length} languages
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* About */}
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {guideData?.user?.bio} <br />
                    <div className="mb-10"></div>
                    {guideData?.bio}
                  </p>
                </CardContent>
              </Card>

              {/* Regions */}
              <Card>
                <CardHeader>
                  <CardTitle>Operating Regions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {guideData?.expertiseRegions?.map((region) => (
                      <Badge
                        key={region._id}
                        variant="region"
                        className="text-sm py-1.5 px-3"
                      >
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        {region.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Languages */}
              <Card>
                <CardHeader>
                  <CardTitle>Languages Spoken</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {guideData?.user?.languages.map((lang) => (
                      <Badge
                        key={lang}
                        variant="secondary"
                        className="text-sm py-1.5 px-3"
                      >
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Verification */}
              <Card className="border-emerald-500/30 bg-emerald-50/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">
                        License Verified
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        This guide's official Nepal Trekking Guide License has
                        been verified by our team.
                      </p>
                      <div className="flex items-center gap-2 text-sm text-emerald-700">
                        <CheckCircle className="h-4 w-4" />
                        <span>Government-issued license verified</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Booking */}
            <div className="space-y-6">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Book This Guide
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Calendar */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Select Trek Dates
                    </label>
                    <Calendar
                      mode="multiple"
                      selected={selectedDates}
                      onSelect={(dates) => setSelectedDates(dates || [])}
                      className="rounded-lg border"
                      disabled={(date) => date < new Date()}
                    />
                    {selectedDates.length > 0 && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {selectedDates.length} days selected
                      </p>
                    )}
                  </div>

                  {/* Extra Services */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 block">
                      Optional Services
                    </label>
                    <div className="space-y-3">
                      {EXTRA_SERVICES.map((service) => {
                        const Icon = serviceIcons[service.id] || CheckCircle;
                        return (
                          <div
                            key={service.id}
                            className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                            onClick={() => toggleService(service.id)}
                          >
                            <Checkbox
                              checked={selectedServices.includes(service.id)}
                              onCheckedChange={() => toggleService(service.id)}
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium text-sm">
                                  {service.name}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {service.description}
                              </p>
                            </div>
                            <span className="text-sm font-medium text-primary">
                              +$25
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Pricing Summary */}
                  {totalDays > 0 && (
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          ${guideData?.pricing.dailyRate} × {totalDays} days
                        </span>
                        <span>${basePrice}</span>
                      </div>
                      {selectedServices.length > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Services ({selectedServices.length})
                          </span>
                          <span>${servicePrice}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-lg pt-2 border-t">
                        <span>Total</span>
                        <span className="text-primary">${totalPrice}</span>
                      </div>
                    </div>
                  )}

                  <Button
                    size="lg"
                    className="w-full"
                    disabled={totalDays === 0}
                  >
                    {totalDays > 0 ? "Request Booking" : "Select Dates to Book"}
                  </Button>

                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      <span>Contact</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      <span>Message</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GuideProfile;
