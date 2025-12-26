"use client";

import React, { useState } from "react";
import {
  Mountain,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  XCircle,
  Info,
  Plane,
  Backpack,
  Shield,
  Thermometer,
  TrendingUp,
  Search,
  Filter,
  ChevronDown,
  Heart,
  Share2,
  Download,
  AlertTriangle,
  Coffee,
  Bed,
  Utensils,
  Camera,
  Map,
  Navigation,
  Activity,
  Award,
  Compass,
} from "lucide-react";

// Mock data based on the Everest Base Camp Trek
const MOCK_TREKS = [
  {
    _id: "694d5a4d9eb632901b271611",
    name: "Everest Base Camp Trek",
    slug: "everest-base-camp-trek",
    region: {
      name: "Everest",
      slug: "everest",
      location: "Khumbu, Sagarmatha, Nepal",
    },
    description:
      "The classic Everest Base Camp trek is one of the world's most iconic mountain journeys. This 12-day adventure takes you through the heart of the Khumbu region, offering breathtaking views of the world's highest peaks including Everest, Lhotse, Nuptse, and Ama Dablam.",
    duration: 12,
    distance: "130",
    difficulty: "challenging",
    startPoint: "Kathmandu",
    endPoint: "Kathmandu",
    isFeatured: true,
    gallery: {
      coverImage:
        "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800",
      images: [
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      ],
    },
    costBreakdown: {
      guidePerDay: 35,
      permitsPerPerson: 65,
      accommodationPerDay: 10,
      mealsPerDay: 25,
      transportPerPerson: 360,
      guideTransportation: 200,
      otherCosts: [
        { description: "Porter service (15kg limit) - Optional", amount: 25 },
      ],
    },
    inclusions: [
      "Professional Trekking Guide",
      "All necessary permits and entry fees",
      "Domestic flight: Kathmandu-Lukla-Kathmandu",
      "Guide and porter insurance",
    ],
    exclusions: [
      "International airfare",
      "All meals during trek",
      "Teahouse accommodation during trek",
      "Travel insurance (mandatory)",
      "Personal expenses",
    ],
    requirements: {
      fitnessLevel: "Good physical fitness required",
      gearChecklist: [
        "-20°C sleeping bag",
        "Down jacket",
        "Waterproof trekking boots",
        "Trekking poles",
      ],
      permits: [
        "TIMS Card",
        "Sagarmatha National Park Entry Permit",
        "Khumbu Rural Municipality Entrance Permit",
      ],
    },
    bestTime: {
      months: ["March", "April", "May", "September", "October", "November"],
      weather: "Clear skies, stable weather conditions",
      temperatureRange: "-10°C to 15°C",
    },
    extraServices: [
      {
        name: "Porter Service",
        description: "20kg per porter",
        costPerPerson: 25,
        isOptional: true,
      },
      {
        name: "Flight to Lukla",
        description: "From Ramechhap Airport",
        costPerPerson: 200,
        isOptional: false,
      },
      {
        name: "Helicopter Evacuation Insurance",
        description: "Emergency coverage",
        costPerPerson: 150,
        isOptional: true,
      },
    ],
    itinerary: [
      {
        day: 4,
        title: "Lukla to Namche",
        description: "Trek through beautiful Sherpa villages",
        altitude: 3440,
        distance: "11km",
        duration: "6-7 hours",
        overnight: "Namche Bazaar",
        accommodation: "Tea house",
        meals: ["Breakfast", "Lunch", "Dinner"],
        highlights: ["Sherpa villages", "Mountain views"],
      },
    ],
    successRate: 95,
    rating: 4.8,
    reviewCount: 342,
  },
  {
    _id: "2",
    name: "Annapurna Circuit Trek",
    slug: "annapurna-circuit-trek",
    region: { name: "Annapurna", location: "Annapurna, Nepal" },
    description:
      "Experience Nepal's most diverse trek through varying landscapes and cultures.",
    duration: 16,
    distance: "160",
    difficulty: "challenging",
    isFeatured: true,
    gallery: {
      coverImage:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    },
    successRate: 92,
    rating: 4.9,
    reviewCount: 428,
  },
  {
    _id: "3",
    name: "Langtang Valley Trek",
    slug: "langtang-valley-trek",
    region: { name: "Langtang", location: "Langtang, Nepal" },
    description:
      "Explore the beautiful Langtang Valley, known as the Valley of Glaciers.",
    duration: 8,
    distance: "70",
    difficulty: "moderate",
    isFeatured: false,
    gallery: {
      coverImage:
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    },
    successRate: 97,
    rating: 4.7,
    reviewCount: 215,
  },
];

// All Routes Page Component
const AllTreksPage = ({ onSelectTrek }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const filteredTreks = MOCK_TREKS.filter((trek) => {
    const matchesSearch =
      trek.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trek.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === "all" || trek.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: "bg-emerald-500",
      moderate: "bg-amber-500",
      challenging: "bg-orange-500",
      hard: "bg-red-500",
    };
    return colors[difficulty] || "bg-gray-500";
  };

  const calculateTotalCost = (trek) => {
    if (!trek.costBreakdown) return 1200;
    const {
      guidePerDay,
      permitsPerPerson,
      accommodationPerDay,
      mealsPerDay,
      transportPerPerson,
    } = trek.costBreakdown;
    return Math.round(
      (guidePerDay + accommodationPerDay + mealsPerDay) * trek.duration +
        permitsPerPerson +
        transportPerPerson
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white mt-20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-emerald-600 to-emerald-800 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <Mountain className="h-6 w-6" />
            <span className="text-emerald-200">Trek Routes</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Discover Your Next Adventure
          </h1>
          <p className="text-xl text-emerald-100 max-w-2xl">
            Explore our collection of carefully curated trekking routes across
            Nepal's most stunning regions.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search treks by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              <Filter className="h-5 w-5" />
              Filters
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t flex flex-wrap gap-3">
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="moderate">Moderate</option>
                <option value="challenging">Challenging</option>
                <option value="hard">Hard</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="featured">Featured</option>
                <option value="duration">Duration</option>
                <option value="difficulty">Difficulty</option>
                <option value="price">Price</option>
              </select>
            </div>
          )}

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredTreks.length} trek
            {filteredTreks.length !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {/* Treks Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTreks.map((trek) => (
            <div
              key={trek._id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 cursor-pointer"
              onClick={() => onSelectTrek(trek)}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={trek.gallery.coverImage}
                  alt={trek.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span
                    className={`${getDifficultyColor(
                      trek.difficulty
                    )} text-white px-3 py-1 rounded-full text-sm font-medium capitalize`}
                  >
                    {trek.difficulty}
                  </span>
                  {trek.isFeatured && (
                    <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                    <Heart className="h-4 w-4 text-gray-700" />
                  </button>
                  <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                    <Share2 className="h-4 w-4 text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1 hover:text-emerald-600 transition-colors">
                      {trek.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      {trek.region.name}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-gray-900">
                      {trek.rating}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {trek.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b">
                  <div className="text-center">
                    <Clock className="h-4 w-4 text-gray-400 mx-auto mb-1" />
                    <div className="text-xs text-gray-600">Duration</div>
                    <div className="font-semibold text-gray-900">
                      {trek.duration} days
                    </div>
                  </div>
                  <div className="text-center">
                    <Activity className="h-4 w-4 text-gray-400 mx-auto mb-1" />
                    <div className="text-xs text-gray-600">Distance</div>
                    <div className="font-semibold text-gray-900">
                      {trek.distance} km
                    </div>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="h-4 w-4 text-gray-400 mx-auto mb-1" />
                    <div className="text-xs text-gray-600">Success</div>
                    <div className="font-semibold text-gray-900">
                      {trek.successRate}%
                    </div>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-600">Starting from</div>
                    <div className="text-2xl font-bold text-emerald-600">
                      ${calculateTotalCost(trek)}
                    </div>
                  </div>
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors">
                    View Details
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Individual Trek Page Component
const TrekDetailPage = ({ trek, onBack }) => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedServices, setSelectedServices] = useState([]);

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: "bg-emerald-500",
      moderate: "bg-amber-500",
      challenging: "bg-orange-500",
      hard: "bg-red-500",
    };
    return colors[difficulty] || "bg-gray-500";
  };

  const calculateTotalCost = () => {
    if (!trek.costBreakdown) return 1200;
    const {
      guidePerDay,
      permitsPerPerson,
      accommodationPerDay,
      mealsPerDay,
      transportPerPerson,
    } = trek.costBreakdown;
    let baseCost = Math.round(
      (guidePerDay + accommodationPerDay + mealsPerDay) * trek.duration +
        permitsPerPerson +
        transportPerPerson
    );

    const servicesCost = selectedServices.reduce((sum, serviceId) => {
      const service = trek.extraServices?.find((s) => s.name === serviceId);
      return sum + (service?.costPerPerson || 0);
    }, 0);

    return baseCost + servicesCost;
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: Info },
    { id: "itinerary", label: "Itinerary", icon: Map },
    { id: "costs", label: "Costs & Services", icon: DollarSign },
    { id: "requirements", label: "Requirements", icon: Backpack },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[500px]">
        <img
          src={trek.gallery.coverImage}
          alt={trek.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 pb-12 w-full">
            <button
              onClick={onBack}
              className="mb-6 flex items-center gap-2 text-white hover:text-emerald-400 transition-colors"
            >
              <ArrowRight className="h-5 w-5 rotate-180" />
              Back to all treks
            </button>

            <div className="flex flex-wrap gap-3 mb-4">
              <span
                className={`${getDifficultyColor(
                  trek.difficulty
                )} text-white px-4 py-2 rounded-full font-medium capitalize`}
              >
                {trek.difficulty}
              </span>
              <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {trek.region.name} Region
              </span>
              <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full font-medium flex items-center gap-2">
                <Star className="h-4 w-4 fill-current" />
                {trek.rating} ({trek.reviewCount} reviews)
              </span>
            </div>

            <h1 className="text-5xl font-bold text-white mb-4">{trek.name}</h1>
            <p className="text-xl text-gray-200 max-w-3xl">
              {trek.description}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 py-6">
            <div className="text-center">
              <Clock className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Duration</div>
              <div className="font-bold text-gray-900">
                {trek.duration} days
              </div>
            </div>
            <div className="text-center">
              <Activity className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Distance</div>
              <div className="font-bold text-gray-900">{trek.distance} km</div>
            </div>
            <div className="text-center">
              <Mountain className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Difficulty</div>
              <div className="font-bold text-gray-900 capitalize">
                {trek.difficulty}
              </div>
            </div>
            <div className="text-center">
              <TrendingUp className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Success Rate</div>
              <div className="font-bold text-gray-900">{trek.successRate}%</div>
            </div>
            <div className="text-center">
              <DollarSign className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Starting from</div>
              <div className="font-bold text-emerald-600 text-xl">
                ${calculateTotalCost()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center gap-2 py-4 border-b-2 transition-colors whitespace-nowrap ${
                    selectedTab === tab.id
                      ? "border-emerald-600 text-emerald-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {selectedTab === "overview" && (
              <div className="space-y-8">
                {/* Description */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Info className="h-6 w-6 text-emerald-600" />
                    About This Trek
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {trek.description}
                  </p>

                  {/* Best Time */}
                  {trek.bestTime && (
                    <div className="bg-emerald-50 rounded-xl p-6 mb-6">
                      <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-emerald-600" />
                        Best Time to Trek
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {trek.bestTime.months.map((month) => (
                          <span
                            key={month}
                            className="bg-white px-4 py-2 rounded-lg font-medium text-gray-900"
                          >
                            {month}
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-700 mb-2">
                        <strong>Weather:</strong> {trek.bestTime.weather}
                      </p>
                      <p className="text-gray-700">
                        <strong>Temperature:</strong>{" "}
                        {trek.bestTime.temperatureRange}
                      </p>
                    </div>
                  )}
                </div>

                {/* Inclusions/Exclusions */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-emerald-600">
                      <CheckCircle className="h-5 w-5" />
                      What's Included
                    </h3>
                    <ul className="space-y-2">
                      {trek.inclusions?.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <CheckCircle className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-red-600">
                      <XCircle className="h-5 w-5" />
                      What's Not Included
                    </h3>
                    <ul className="space-y-2">
                      {trek.exclusions?.slice(0, 6).map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <XCircle className="h-4 w-4 text-red-600 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === "itinerary" && (
              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Map className="h-6 w-6 text-emerald-600" />
                  Trek Itinerary
                </h2>

                {trek.itinerary?.length > 0 ? (
                  <div className="space-y-6">
                    {trek.itinerary.map((day, idx) => (
                      <div
                        key={idx}
                        className="border-l-4 border-emerald-600 pl-6 pb-6"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="text-sm text-emerald-600 font-semibold mb-1">
                              Day {day.day}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">
                              {day.title}
                            </h3>
                          </div>
                          <span className="bg-emerald-50 px-3 py-1 rounded-full text-sm font-medium text-emerald-700">
                            {day.duration}
                          </span>
                        </div>

                        <p className="text-gray-700 mb-4">{day.description}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Mountain className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-700">
                              {day.altitude}m
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Activity className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-700">
                              {day.distance}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Bed className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-700 capitalize">
                              {day.accommodation}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Utensils className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-700">
                              {day.meals.join(", ")}
                            </span>
                          </div>
                        </div>

                        {day.highlights?.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {day.highlights.map((highlight, i) => (
                              <span
                                key={i}
                                className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Map className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p>Detailed itinerary will be provided upon booking.</p>
                  </div>
                )}
              </div>
            )}

            {selectedTab === "costs" && (
              <div className="space-y-6">
                {/* Cost Breakdown */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <DollarSign className="h-6 w-6 text-emerald-600" />
                    Cost Breakdown
                  </h2>

                  {trek.costBreakdown && (
                    <div className="space-y-4">
                      <div className="flex justify-between py-3 border-b">
                        <span className="text-gray-700">
                          Guide (per day × {trek.duration} days)
                        </span>
                        <span className="font-semibold">
                          ${trek.costBreakdown.guidePerDay * trek.duration}
                        </span>
                      </div>
                      <div className="flex justify-between py-3 border-b">
                        <span className="text-gray-700">Permits</span>
                        <span className="font-semibold">
                          ${trek.costBreakdown.permitsPerPerson}
                        </span>
                      </div>
                      <div className="flex justify-between py-3 border-b">
                        <span className="text-gray-700">
                          Accommodation (per day × {trek.duration} days)
                        </span>
                        <span className="font-semibold">
                          $
                          {trek.costBreakdown.accommodationPerDay *
                            trek.duration}
                        </span>
                      </div>
                      <div className="flex justify-between py-3 border-b">
                        <span className="text-gray-700">
                          Meals (per day × {trek.duration} days)
                        </span>
                        <span className="font-semibold">
                          ${trek.costBreakdown.mealsPerDay * trek.duration}
                        </span>
                      </div>
                      <div className="flex justify-between py-3 border-b">
                        <span className="text-gray-700">Transportation</span>
                        <span className="font-semibold">
                          ${trek.costBreakdown.transportPerPerson}
                        </span>
                      </div>
                      <div className="flex justify-between pt-4 text-lg font-bold">
                        <span>Base Total</span>
                        <span className="text-emerald-600">
                          $
                          {calculateTotalCost() -
                            selectedServices.reduce((sum, serviceId) => {
                              const service = trek.extraServices?.find(
                                (s) => s.name === serviceId
                              );
                              return sum + (service?.costPerPerson || 0);
                            }, 0)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Extra Services */}
                {trek.extraServices && (
                  <div className="bg-white rounded-2xl p-8 shadow-lg border">
                    <h3 className="text-xl font-bold mb-6">
                      Additional Services
                    </h3>
                    <div className="space-y-4">
                      {trek.extraServices.map((service, idx) => (
                        <div
                          key={idx}
                          className="border rounded-xl p-4 hover:border-emerald-600 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <input
                                  type="checkbox"
                                  checked={selectedServices.includes(
                                    service.name
                                  )}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedServices([
                                        ...selectedServices,
                                        service.name,
                                      ]);
                                    } else {
                                      setSelectedServices(
                                        selectedServices.filter(
                                          (s) => s !== service.name
                                        )
                                      );
                                    }
                                  }}
                                  className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                                />
                                <div>
                                  <h4 className="font-semibold text-gray-900">
                                    {service.name}
                                  </h4>
                                  {!service.isOptional && (
                                    <span className="text-xs text-red-600 font-medium">
                                      Required
                                    </span>
                                  )}
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 ml-8">
                                {service.description}
                              </p>
                            </div>
                            <div className="text-right ml-4">
                              <div className="text-lg font-bold text-emerald-600">
                                ${service.costPerPerson}
                              </div>
                              <div className="text-xs text-gray-500">
                                per person
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {selectedTab === "requirements" && (
              <div className="space-y-6">
                {/* Fitness Level */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Activity className="h-6 w-6 text-emerald-600" />
                    Fitness Requirements
                  </h2>
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                    <p className="text-gray-700">
                      {trek.requirements?.fitnessLevel}
                    </p>
                  </div>
                </div>

                {/* Gear Checklist */}
                {trek.requirements?.gearChecklist && (
                  <div className="bg-white rounded-2xl p-8 shadow-lg border">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <Backpack className="h-6 w-6 text-emerald-600" />
                      Essential Gear Checklist
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {trek.requirements.gearChecklist.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="w-5 h-5 border-2 border-emerald-600 rounded flex-shrink-0"></div>
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Permits */}
                {trek.requirements?.permits && (
                  <div className="bg-white rounded-2xl p-8 shadow-lg border">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <Shield className="h-6 w-6 text-emerald-600" />
                      Required Permits
                    </h3>
                    <ul className="space-y-3">
                      {trek.requirements.permits.map((permit, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 p-4 bg-emerald-50 rounded-lg"
                        >
                          <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 font-medium">
                            {permit}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-900">
                        <Info className="inline h-4 w-4 mr-1" />
                        All permits will be arranged by your guide as part of
                        the trek package.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Booking Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border">
                <div className="mb-6">
                  <div className="text-sm text-gray-600 mb-1">Total Cost</div>
                  <div className="text-4xl font-bold text-emerald-600">
                    ${calculateTotalCost()}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">per person</div>
                </div>

                <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold text-lg mb-3 transition-colors">
                  Book Now
                </button>

                <button className="w-full border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 py-3 rounded-xl font-semibold mb-3 transition-colors">
                  Request Custom Quote
                </button>

                <div className="flex gap-2">
                  <button className="flex-1 border border-gray-300 hover:bg-gray-50 py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Heart className="h-4 w-4" />
                    Save
                  </button>
                  <button className="flex-1 border border-gray-300 hover:bg-gray-50 py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                  <button className="flex-1 border border-gray-300 hover:bg-gray-50 py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" />
                    PDF
                  </button>
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border border-emerald-200">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Info className="h-5 w-5 text-emerald-600" />
                  Quick Info
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Success Rate</span>
                    <span className="font-semibold">{trek.successRate}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Group Size</span>
                    <span className="font-semibold">2-12 people</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Start Point</span>
                    <span className="font-semibold">{trek.startPoint}</span>
                  </div>
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border">
                <h3 className="font-bold mb-4">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Our trek specialists are available 24/7 to answer your
                  questions.
                </p>
                <button className="w-full border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 py-3 rounded-xl font-semibold transition-colors">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const TrekRoutesApp = () => {
  const [selectedTrek, setSelectedTrek] = useState(null);

  return (
    <div>
      {selectedTrek ? (
        <TrekDetailPage
          trek={selectedTrek}
          onBack={() => setSelectedTrek(null)}
        />
      ) : (
        <AllTreksPage onSelectTrek={setSelectedTrek} />
      )}
    </div>
  );
};

export default TrekRoutesApp;
