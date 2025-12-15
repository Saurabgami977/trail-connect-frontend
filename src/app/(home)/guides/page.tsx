"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Star,
  MapPin,
  Languages,
  ShieldCheck,
  Search,
  Filter,
  Calendar,
} from "lucide-react";
import { MOCK_GUIDES, TREKKING_REGIONS, LANGUAGES } from "@/lib/constants";

const guideImages = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
];

const GuidesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  const filteredGuides = MOCK_GUIDES.filter((guide) => {
    const matchesSearch =
      guide.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.regions.some((r) =>
        r.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesRegion =
      !selectedRegion ||
      selectedRegion === "all" ||
      guide.regions.some((r) =>
        r.toLowerCase().includes(selectedRegion.toLowerCase())
      );
    const matchesLanguage =
      !selectedLanguage ||
      selectedLanguage === "all" ||
      guide.languages.includes(selectedLanguage);
    return matchesSearch && matchesRegion && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Find Your Trekking Guide
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our verified guides and find the perfect match for your
              Himalayan adventure.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-card rounded-2xl border p-4 md:p-6 mb-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative md:col-span-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {TREKKING_REGIONS.map((region) => (
                    <SelectItem key={region.id} value={region.name}>
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedLanguage}
                onValueChange={setSelectedLanguage}
              >
                <SelectTrigger>
                  <Languages className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                Check Availability
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {filteredGuides.length}
              </span>{" "}
              verified guides
            </p>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Sort by: Recommended
              </span>
            </div>
          </div>

          {/* Guides Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGuides.map((guide, index) => (
              <Card
                key={guide.id}
                className="group overflow-hidden hover:-translate-y-1"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={guideImages[index % guideImages.length]}
                    alt={guide.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {guide.verified && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="verified" className="gap-1">
                        <ShieldCheck className="h-3 w-3" />
                        Verified
                      </Badge>
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="region">
                      {guide.experience} years exp.
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-foreground">{guide.name}</h3>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-medium">{guide.rating}</span>
                      <span className="text-muted-foreground">
                        ({guide.reviewCount})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="truncate">{guide.regions.join(", ")}</span>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                    <Languages className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="truncate">
                      {guide.languages.join(", ")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-primary">
                        ${guide.dailyRate}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        /day
                      </span>
                    </div>
                    <Button size="sm" asChild>
                      <Link href={`/guides/${guide.id}`}>View Profile</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredGuides.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">
                No guides found matching your criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedRegion("all");
                  setSelectedLanguage("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default GuidesPage;
