// app/treks/[slug]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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
  ChevronRight,
  Phone,
  Mail,
  MessageCircle,
  ArrowLeft,
  Play,
  Maximize2,
  Sun,
  Cloud,
  CloudRain,
  Wind,
  Snowflake,
  CircleDot,
  TrendingDown,
  Droplets,
  Eye,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

// Extended mock data with full details
const getTrekData = (slug: string) => {
  return {
    _id: "694d5a4d9eb632901b271611",
    name: "Everest Base Camp Trek",
    slug: "everest-base-camp-trek",
    region: {
      _id: "694271a3d45894fb880db42d",
      name: "Everest",
      slug: "everest",
      location: "Khumbu, Sagarmatha, Nepal",
      description: "Home to Mount Everest and legendary Sherpa culture",
    },
    description:
      "The classic Everest Base Camp trek is one of the world's most iconic mountain journeys. This 12-day adventure takes you through the heart of the Khumbu region, offering breathtaking views of the world's highest peaks including Everest, Lhotse, Nuptse, and Ama Dablam. Experience Sherpa culture, visit ancient monasteries, and stand at the base of Mount Everest itself.",
    longDescription:
      "Embark on the trek of a lifetime to Everest Base Camp, where you'll walk in the footsteps of legendary mountaineers. This carefully crafted 12-day journey takes you through pristine Sherpa villages, ancient Buddhist monasteries, and dramatic mountain landscapes. Along the way, you'll experience the warm hospitality of the Sherpa people, witness their rich cultural heritage, and be surrounded by some of the most spectacular mountain scenery on Earth. The trek offers perfect acclimatization, stunning viewpoints including Kala Patthar, and the unforgettable experience of standing at the base of the world's highest peak.",
    highlights: [
      "Stand at Everest Base Camp (5,364m)",
      "Sunrise from Kala Patthar (5,545m)",
      "Visit Tengboche Monastery",
      "Experience authentic Sherpa culture in Namche Bazaar",
      "Panoramic views of Everest, Lhotse, Nuptse, and Ama Dablam",
      "Trek through Sagarmatha National Park",
      "Cross thrilling suspension bridges",
      "Witness Khumbu Glacier and Icefall",
    ],
    duration: 12,
    distance: "130",
    difficulty: "challenging",
    maxAltitude: 5545,
    minAltitude: 2800,
    startPoint: "Kathmandu",
    endPoint: "Kathmandu",
    isFeatured: true,
    rating: 4.8,
    reviewCount: 342,
    successRate: 95,
    gallery: {
      coverImage:
        "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200",
      images: [
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
      ],
      videos: ["https://www.youtube.com/embed/sample"],
    },
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kathmandu",
        description:
          "Welcome to Nepal! Upon arrival at Tribhuvan International Airport, you'll be greeted by our representative and transferred to your hotel. Spend the rest of the day relaxing and preparing for your adventure. In the evening, attend a welcome dinner and trek briefing.",
        altitude: 1400,
        distance: "0",
        duration: "N/A",
        overnight: "Kathmandu",
        accommodation: "Hotel",
        meals: ["Dinner"],
        highlights: ["Welcome dinner", "Trek briefing", "Gear check"],
        notes: "Rest and jet lag recovery. Final gear preparation.",
      },
      {
        day: 2,
        title: "Fly to Lukla & Trek to Phakding",
        description:
          "Early morning scenic flight to Lukla (2,840m), one of the world's most thrilling airports. Meet your porter team and begin trekking through beautiful pine forests alongside the Dudh Koshi River. Pass through several small Sherpa villages before reaching Phakding.",
        altitude: 2610,
        distance: "8km",
        duration: "3-4 hours",
        overnight: "Phakding",
        accommodation: "Tea house",
        meals: ["Breakfast", "Lunch", "Dinner"],
        highlights: [
          "Scenic mountain flight",
          "First day trekking",
          "Dudh Koshi River",
        ],
        notes: "Gradual descent helps with acclimatization. Easy first day.",
      },
      {
        day: 3,
        title: "Phakding to Namche Bazaar",
        description:
          "Cross several suspension bridges decorated with prayer flags. The trail follows the Dudh Koshi River valley with magnificent views of Thamserku (6,608m). After entering Sagarmatha National Park, make a steep ascent to Namche Bazaar, the gateway to Everest and bustling Sherpa capital.",
        altitude: 3440,
        distance: "11km",
        duration: "6-7 hours",
        overnight: "Namche Bazaar",
        accommodation: "Tea house",
        meals: ["Breakfast", "Lunch", "Dinner"],
        highlights: [
          "Hillary Bridge",
          "First Everest glimpse",
          "Namche Bazaar arrival",
        ],
        notes:
          "Challenging day with significant altitude gain. Take it slow and steady.",
      },
      {
        day: 4,
        title: "Acclimatization Day in Namche Bazaar",
        description:
          "Crucial acclimatization day. Hike to Everest View Hotel (3,880m) for spectacular panoramic views of Everest, Lhotse, Ama Dablam, and other peaks. Visit Khumjung village and the monastery that houses a supposed Yeti scalp. Explore Namche's vibrant market and Sherpa museum.",
        altitude: 3440,
        distance: "5km",
        duration: "4-5 hours",
        overnight: "Namche Bazaar",
        accommodation: "Tea house",
        meals: ["Breakfast", "Lunch", "Dinner"],
        highlights: [
          "Everest View Hotel",
          "Sherpa Museum",
          "Mountain panorama",
        ],
        notes: "Hike high, sleep low principle. Essential for acclimatization.",
      },
      {
        day: 5,
        title: "Namche Bazaar to Tengboche",
        description:
          "Trek through rhododendron and juniper forests with stunning views of Everest, Nuptse, Lhotse, Ama Dablam, and Thamserku. Descend to Dudh Koshi River, then climb steadily to Tengboche, home to the largest monastery in the Khumbu region. Attend evening prayers if you arrive in time.",
        altitude: 3860,
        distance: "10km",
        duration: "5-6 hours",
        overnight: "Tengboche",
        accommodation: "Tea house",
        meals: ["Breakfast", "Lunch", "Dinner"],
        highlights: [
          "Tengboche Monastery",
          "Ama Dablam views",
          "Evening prayers",
        ],
        notes:
          "Beautiful monastery with incredible mountain backdrop. Dress modestly for monastery visit.",
      },
      {
        day: 6,
        title: "Tengboche to Dingboche",
        description:
          "Descend through lush forests to Debuche, cross the Imja River, and trek through alpine meadows. Pass through Pangboche, one of the highest permanent settlements in the valley. Continue to Dingboche with stunning views of Island Peak and the Lhotse-Nuptse wall.",
        altitude: 4410,
        distance: "12km",
        duration: "5-6 hours",
        overnight: "Dingboche",
        accommodation: "Tea house",
        meals: ["Breakfast", "Lunch", "Dinner"],
        highlights: [
          "Alpine landscapes",
          "Island Peak views",
          "Stone-walled fields",
        ],
        notes:
          "Vegetation becomes scarcer. Temperature drops significantly at night.",
      },
      {
        day: 7,
        title: "Acclimatization Day in Dingboche",
        description:
          "Another important acclimatization day. Hike up to Nagarjun Hill (5,100m) for incredible 360-degree views of Makalu, Lhotse, Chalotse, Tawache, and Ama Dablam. Alternatively, hike to Chhukung village. Return to Dingboche for overnight.",
        altitude: 4410,
        distance: "6km",
        duration: "4-5 hours",
        overnight: "Dingboche",
        accommodation: "Tea house",
        meals: ["Breakfast", "Lunch", "Dinner"],
        highlights: [
          "Nagarjun Hill",
          "360-degree mountain views",
          "Acclimatization hike",
        ],
        notes:
          "Critical acclimatization day before going higher. Listen to your body.",
      },
      {
        day: 8,
        title: "Dingboche to Lobuche",
        description:
          "Trek alongside the lateral moraine of the Khumbu Glacier with views of Tawache and Ama Dablam. Pass memorials for climbers who died on Everest. Continue to Lobuche, where you'll have close views of Nuptse and the Khumbu Glacier.",
        altitude: 4940,
        distance: "8km",
        duration: "5-6 hours",
        overnight: "Lobuche",
        accommodation: "Tea house",
        meals: ["Breakfast", "Lunch", "Dinner"],
        highlights: [
          "Khumbu Glacier",
          "Memorial stupas",
          "High altitude experience",
        ],
        notes:
          "Thin air and cold temperatures. Stay hydrated and warm. Early dinner and rest.",
      },
      {
        day: 9,
        title: "Lobuche to Gorak Shep, Visit Everest Base Camp",
        description:
          "Trek to Gorak Shep, the last settlement before base camp. Drop your gear and continue to Everest Base Camp (5,364m) across the Khumbu Glacier. Stand at the foot of the world's highest mountain and soak in the achievement. Return to Gorak Shep for the night.",
        altitude: 5364,
        distance: "13km",
        duration: "7-8 hours",
        overnight: "Gorak Shep",
        accommodation: "Tea house",
        meals: ["Breakfast", "Lunch", "Dinner"],
        highlights: [
          "Everest Base Camp arrival",
          "Khumbu Icefall views",
          "Glacier crossing",
        ],
        notes:
          "Long and challenging day. The highlight of the trek! Celebrate your achievement.",
      },
      {
        day: 10,
        title: "Hike Kala Patthar, Descend to Pheriche",
        description:
          "Pre-dawn hike to Kala Patthar (5,545m) for the best panoramic views of Everest, Nuptse, Changtse, and surrounding peaks. Watch the sunrise paint the mountains gold. Descend to Gorak Shep for breakfast, then continue down to Pheriche for overnight.",
        altitude: 4371,
        distance: "16km",
        duration: "8-9 hours",
        overnight: "Pheriche",
        accommodation: "Tea house",
        meals: ["Breakfast", "Lunch", "Dinner"],
        highlights: [
          "Sunrise from Kala Patthar",
          "Best Everest views",
          "Descent begins",
        ],
        notes:
          "Early start for sunrise. Long day but descending feels easier with more oxygen.",
      },
      {
        day: 11,
        title: "Pheriche to Namche Bazaar",
        description:
          "Long descent back to Namche Bazaar. Retrace your steps through Pangboche and Tengboche. Notice how much easier breathing becomes as you descend. Enjoy the lush vegetation and warmer temperatures. Celebrate your success in Namche.",
        altitude: 3440,
        distance: "15km",
        duration: "6-7 hours",
        overnight: "Namche Bazaar",
        accommodation: "Tea house",
        meals: ["Breakfast", "Lunch", "Dinner"],
        highlights: [
          "Return to civilization",
          "Celebration dinner",
          "Warm showers available",
        ],
        notes:
          "Long but pleasant descent. Enjoy the relative luxury of Namche Bazaar.",
      },
      {
        day: 12,
        title: "Namche to Lukla",
        description:
          "Final day of trekking. Descend through forests and cross suspension bridges back to Lukla. Reflect on your incredible journey. Celebrate with your guide and porter team in the evening with a farewell party.",
        altitude: 2840,
        distance: "19km",
        duration: "6-7 hours",
        overnight: "Lukla",
        accommodation: "Tea house",
        meals: ["Breakfast", "Lunch", "Dinner"],
        highlights: ["Trek completion", "Farewell party", "Team celebration"],
        notes:
          "Last trekking day. Tip your porters and guides. Celebrate your achievement!",
      },
    ],
    costBreakdown: {
      guidePerDay: 35,
      permitsPerPerson: 65,
      accommodationPerDay: 10,
      mealsPerDay: 25,
      transportPerPerson: 360,
      guideTransportation: 200,
      otherCosts: [
        {
          description: "Porter service (15kg limit) - Optional",
          amount: 25,
        },
      ],
    },
    inclusions: [
      "Professional English-speaking trekking guide",
      "All necessary permits and entry fees",
      "Domestic flight: Kathmandu-Lukla-Kathmandu",
      "Guide and porter insurance",
      "All government taxes and official expenses",
      "Pre-trek briefing and gear check",
      "Sagarmatha National Park permit",
      "TIMS card",
      "Khumbu Rural Municipality permit",
      "First aid kit",
      "Trekking route map",
    ],
    exclusions: [
      "International airfare to/from Nepal",
      "Nepal entry visa fee ($50 for 30 days)",
      "Travel and rescue insurance (mandatory)",
      "Accommodation and meals in Kathmandu",
      "All meals during the trek (approx. $25-30/day)",
      "Teahouse accommodation during trek",
      "Hot showers and battery charging on trek",
      "WiFi and phone calls",
      "Personal trekking equipment",
      "Tips for guide, porter, and driver",
      "Personal expenses (alcohol, bottled water, snacks)",
      "Emergency evacuation costs",
      "Any costs arising from unforeseen situations",
    ],
    requirements: {
      fitnessLevel:
        "Good physical fitness required. You should be able to walk 5-7 hours per day with a daypack. Previous trekking experience at altitude recommended. Begin cardiovascular training 2-3 months before departure.",
      gearChecklist: [
        "4-season sleeping bag (-20°C rated)",
        "Down jacket (800+ fill)",
        "Waterproof and breathable shell jacket",
        "Waterproof trekking pants",
        "Insulated trekking boots (broken in)",
        "Trekking poles (essential for descents)",
        "Headlamp with extra batteries",
        "Water purification tablets/filter",
        "Comprehensive first aid kit",
        "Sun protection: hat, sunglasses (UV400), sunscreen (SPF 50+)",
        "Thermal base layers (merino wool)",
        "Fleece mid-layers",
        "Warm gloves and liner gloves",
        "Wool socks (4-5 pairs)",
        "Gaiters (for snow/mud)",
        "Backpack (40-50L) with rain cover",
        "Toiletries and medications",
        "Quick-dry towel",
        "Camera and extra batteries",
        "Portable charger/solar charger",
      ],
      vaccinations: [
        "Hepatitis A and B",
        "Typhoid",
        "Tetanus",
        "Rabies (if trekking remotely)",
      ],
      permits: [
        "TIMS Card (Trekkers' Information Management System) - NPR 2,000",
        "Sagarmatha National Park Entry Permit - NPR 3,000",
        "Khumbu Rural Municipality Entrance Permit - NPR 2,000",
      ],
    },
    bestTime: {
      months: ["March", "April", "May", "September", "October", "November"],
      weather:
        "Clear skies, stable weather conditions, excellent visibility. Spring brings rhododendron blooms. Autumn offers clearest skies.",
      temperatureRange:
        "Day: 5°C to 15°C, Night: -10°C to -20°C (at higher altitudes)",
    },
    extraServices: [
      {
        name: "Porter Service",
        description:
          "Personal porter carrying up to 20kg of your gear. Highly recommended for comfort.",
        costPerPerson: 25,
        isAvailable: true,
        isOptional: true,
      },
      {
        name: "Flight to Lukla",
        description:
          "Scenic mountain flight from Kathmandu/Ramechhap to Lukla (35 minutes)",
        costPerPerson: 200,
        isAvailable: true,
        isOptional: false,
      },
      {
        name: "Return Flight from Lukla",
        description: "Mountain flight back to Kathmandu/Ramechhap",
        costPerPerson: 200,
        isAvailable: true,
        isOptional: false,
      },
      {
        name: "Helicopter Evacuation Insurance",
        description:
          "Comprehensive emergency helicopter rescue coverage up to $100,000",
        costPerPerson: 150,
        isAvailable: true,
        isOptional: true,
      },
      {
        name: "Oxygen Cylinder",
        description:
          "Personal oxygen cylinder with mask for altitude emergencies",
        costPerPerson: 75,
        isAvailable: true,
        isOptional: true,
      },
      {
        name: "Satellite Phone",
        description: "Rental satellite phone for emergency communication",
        costPerPerson: 50,
        isAvailable: true,
        isOptional: true,
      },
    ],
  };
};

// Chart data
const altitudeChartData = [
  { day: "Day 1", altitude: 1400, location: "Kathmandu" },
  { day: "Day 2", altitude: 2610, location: "Phakding" },
  { day: "Day 3", altitude: 3440, location: "Namche" },
  { day: "Day 4", altitude: 3440, location: "Namche (Rest)" },
  { day: "Day 5", altitude: 3860, location: "Tengboche" },
  { day: "Day 6", altitude: 4410, location: "Dingboche" },
  { day: "Day 7", altitude: 4410, location: "Dingboche (Rest)" },
  { day: "Day 8", altitude: 4940, location: "Lobuche" },
  { day: "Day 9", altitude: 5364, location: "EBC" },
  { day: "Day 10", altitude: 5545, location: "Kala Patthar" },
  { day: "Day 11", altitude: 3440, location: "Namche" },
  { day: "Day 12", altitude: 2840, location: "Lukla" },
];

const temperatureData = [
  { month: "Jan", high: 5, low: -15, condition: "Cold" },
  { month: "Feb", high: 7, low: -12, condition: "Cold" },
  { month: "Mar", high: 10, low: -8, condition: "Cool" },
  { month: "Apr", high: 15, low: -5, condition: "Pleasant" },
  { month: "May", high: 18, low: -2, condition: "Warm" },
  { month: "Jun", high: 20, low: 2, condition: "Warm" },
  { month: "Jul", high: 20, low: 5, condition: "Monsoon" },
  { month: "Aug", high: 19, low: 5, condition: "Monsoon" },
  { month: "Sep", high: 17, low: 2, condition: "Pleasant" },
  { month: "Oct", high: 15, low: -3, condition: "Cool" },
  { month: "Nov", high: 10, low: -8, condition: "Cold" },
  { month: "Dec", high: 6, low: -12, condition: "Cold" },
];

const difficultyRadarData = [
  { aspect: "Physical Demand", value: 85 },
  { aspect: "Technical Skills", value: 45 },
  { aspect: "Altitude", value: 95 },
  { aspect: "Duration", value: 70 },
  { aspect: "Weather", value: 60 },
  { aspect: "Remoteness", value: 75 },
];

// app/treks/[slug]/page.tsx (continued from where you left off)

// ... (keep all the imports and data from above)

export default function TrekDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const trek = getTrekData(slug);

  const getDifficultyColor = (difficulty: string) => {
    const colors: Record<string, string> = {
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

  const handleBookNow = () => {
    setIsLoading(true);
    // Simulate booking process
    setTimeout(() => {
      alert(
        `Booking initiated for ${trek.name}! You will be redirected to the booking form.`
      );
      setIsLoading(false);
    }, 1000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: trek.name,
          text: trek.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: Info },
    { id: "itinerary", label: "Detailed Itinerary", icon: Map },
    { id: "costs", label: "Costs & Services", icon: DollarSign },
    { id: "requirements", label: "Requirements & Gear", icon: Backpack },
    { id: "gallery", label: "Photos & Videos", icon: Camera },
    { id: "reviews", label: "Reviews", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-700 hover:scale-110"
          style={{ backgroundImage: `url(${trek.gallery.coverImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        {/* Navigation */}
        <div className="absolute top-8 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <Link
                  href="/"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link
                  href="/treks"
                  className="hover:text-white transition-colors"
                >
                  Treks
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white">{trek.name}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleShare}
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-2.5 rounded-full transition-all"
                >
                  <Share2 className="h-5 w-5" />
                </button>
                <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-2.5 rounded-full transition-all">
                  <Heart className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 pb-16 w-full">
            <div className="flex flex-wrap gap-3 mb-6">
              <span
                className={`${getDifficultyColor(
                  trek.difficulty
                )} text-white px-5 py-2 rounded-full font-semibold capitalize shadow-lg backdrop-blur-sm transform hover:scale-105 transition-transform`}
              >
                {trek.difficulty}
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white px-5 py-2 rounded-full font-semibold flex items-center gap-2 shadow-lg hover:bg-white/30 transition-colors">
                <MapPin className="h-4 w-4" />
                {trek.region.name} Region
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white px-5 py-2 rounded-full font-semibold flex items-center gap-2 shadow-lg hover:bg-white/30 transition-colors">
                <Star className="h-4 w-4 fill-current" />
                {trek.rating}/5 ({trek.reviewCount} reviews)
              </span>
              <span className="bg-emerald-500/90 backdrop-blur-md text-white px-5 py-2 rounded-full font-semibold flex items-center gap-2 shadow-lg hover:bg-emerald-500 transition-colors">
                <TrendingUp className="h-4 w-4" />
                {trek.successRate}% Success Rate
              </span>
            </div>

            <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-2xl leading-tight">
              {trek.name}
            </h1>
            <p className="text-2xl text-gray-200 max-w-4xl drop-shadow-lg mb-8">
              {trek.description}
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleBookNow}
                disabled={isLoading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    Book This Trek
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
              <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-8 py-4 rounded-xl font-semibold shadow-xl transition-all border border-white/30 hover:border-white/50">
                Request Custom Quote
              </button>
              <button
                onClick={() => setShowImageGallery(true)}
                className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-6 py-4 rounded-xl font-semibold shadow-xl transition-all border border-white/30 hover:border-white/50 flex items-center gap-2"
              >
                <Camera className="h-5 w-5" />
                View Gallery
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Stats Bar */}
      <div className="bg-white border-b sticky top-0 z-40 shadow-md backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 py-4">
            <div className="text-center group cursor-pointer">
              <Clock className="h-6 w-6 text-emerald-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <div className="text-xs text-gray-600">Duration</div>
              <div className="font-bold text-gray-900">
                {trek.duration} days
              </div>
            </div>
            <div className="text-center group cursor-pointer">
              <Activity className="h-6 w-6 text-emerald-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <div className="text-xs text-gray-600">Distance</div>
              <div className="font-bold text-gray-900">{trek.distance} km</div>
            </div>
            <div className="text-center group cursor-pointer">
              <Mountain className="h-6 w-6 text-emerald-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <div className="text-xs text-gray-600">Max Altitude</div>
              <div className="font-bold text-gray-900">
                {trek.maxAltitude.toLocaleString()} m
              </div>
            </div>
            <div className="text-center group cursor-pointer">
              <DollarSign className="h-6 w-6 text-emerald-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <div className="text-xs text-gray-600">From</div>
              <div className="font-bold text-gray-900">
                ${calculateTotalCost().toLocaleString()}
              </div>
            </div>
            <div className="text-center group cursor-pointer">
              <Users className="h-6 w-6 text-emerald-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <div className="text-xs text-gray-600">Group Size</div>
              <div className="font-bold text-gray-900">1-12 People</div>
            </div>
            <div className="text-center group cursor-pointer">
              <Calendar className="h-6 w-6 text-emerald-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <div className="text-xs text-gray-600">Best Time</div>
              <div className="font-bold text-gray-900">
                {trek.bestTime.months.slice(0, 3).join(", ")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="lg:w-2/3">
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg border overflow-hidden mb-8">
              <div className="border-b">
                <nav className="flex overflow-x-auto">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                          selectedTab === tab.id
                            ? "border-emerald-600 text-emerald-600 bg-emerald-50/50"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {selectedTab === "overview" && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-3xl font-bold mb-6 text-gray-900">
                        Trek Overview
                      </h2>
                      <p className="text-gray-700 leading-relaxed text-lg mb-6">
                        {trek.longDescription}
                      </p>

                      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-6 mb-8 border border-emerald-100">
                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                          <Mountain className="h-6 w-6 text-emerald-600" />
                          Key Highlights
                        </h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          {trek.highlights.map((highlight, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-300 transition-colors"
                            >
                              <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Charts Section */}
                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-white rounded-xl p-6 border shadow-sm">
                          <h4 className="font-bold mb-4 flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-emerald-600" />
                            Altitude Profile
                          </h4>
                          <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={altitudeChartData}>
                                <CartesianGrid
                                  strokeDasharray="3 3"
                                  stroke="#e5e7eb"
                                />
                                <XAxis dataKey="location" />
                                <YAxis
                                  label={{
                                    value: "Meters",
                                    angle: -90,
                                    position: "insideLeft",
                                  }}
                                />
                                <Tooltip />
                                <Area
                                  type="monotone"
                                  dataKey="altitude"
                                  stroke="#059669"
                                  fill="#10b981"
                                  fillOpacity={0.3}
                                />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 border shadow-sm">
                          <h4 className="font-bold mb-4 flex items-center gap-2">
                            <Thermometer className="h-5 w-5 text-emerald-600" />
                            Monthly Temperatures
                          </h4>
                          <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={temperatureData}>
                                <CartesianGrid
                                  strokeDasharray="3 3"
                                  stroke="#e5e7eb"
                                />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                  type="monotone"
                                  dataKey="high"
                                  stroke="#059669"
                                  name="High Temp (°C)"
                                />
                                <Line
                                  type="monotone"
                                  dataKey="low"
                                  stroke="#3b82f6"
                                  name="Low Temp (°C)"
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>

                      {/* Difficulty Radar Chart */}
                      <div className="bg-white rounded-xl p-6 border shadow-sm">
                        <h4 className="font-bold mb-4 flex items-center gap-2">
                          <Activity className="h-5 w-5 text-emerald-600" />
                          Difficulty Analysis
                        </h4>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={difficultyRadarData}>
                              <PolarGrid />
                              <PolarAngleAxis dataKey="aspect" />
                              <PolarRadiusAxis />
                              <Radar
                                name="Difficulty"
                                dataKey="value"
                                stroke="#059669"
                                fill="#10b981"
                                fillOpacity={0.6}
                              />
                            </RadarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === "itinerary" && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900">
                      Detailed Itinerary
                    </h2>
                    <div className="relative">
                      {/* Vertical Timeline Line */}
                      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 to-blue-500"></div>

                      {trek.itinerary.map((day, index) => (
                        <div key={day.day} className="relative mb-8 last:mb-0">
                          {/* Timeline Dot */}
                          <div className="absolute left-4 w-4 h-4 rounded-full bg-emerald-600 border-4 border-white shadow-lg"></div>

                          <div className="ml-12 bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                            <div className="p-6">
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <div className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold mb-2">
                                    Day {day.day}
                                  </div>
                                  <h3 className="text-xl font-bold text-gray-900">
                                    {day.title}
                                  </h3>
                                </div>
                                <div className="text-right">
                                  <div className="text-sm text-gray-600">
                                    Altitude
                                  </div>
                                  <div className="text-lg font-bold text-gray-900">
                                    {day.altitude.toLocaleString()} m
                                  </div>
                                </div>
                              </div>

                              <p className="text-gray-700 mb-4">
                                {day.description}
                              </p>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                <div className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded-lg">
                                  <Clock className="h-4 w-4 text-gray-600" />
                                  <span className="font-medium">
                                    {day.duration}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded-lg">
                                  <Navigation className="h-4 w-4 text-gray-600" />
                                  <span className="font-medium">
                                    {day.distance}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded-lg">
                                  <Bed className="h-4 w-4 text-gray-600" />
                                  <span className="font-medium">
                                    {day.overnight}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded-lg">
                                  <Utensils className="h-4 w-4 text-gray-600" />
                                  <span className="font-medium">
                                    {day.meals.length} meals
                                  </span>
                                </div>
                              </div>

                              {day.highlights && day.highlights.length > 0 && (
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                    <Award className="h-4 w-4 text-emerald-600" />
                                    Highlights
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {day.highlights.map((highlight, i) => (
                                      <span
                                        key={i}
                                        className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium"
                                      >
                                        {highlight}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedTab === "costs" && (
                  <div className="space-y-8">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900">
                      Cost Breakdown & Services
                    </h2>

                    {/* Cost Breakdown */}
                    <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-6 border border-emerald-100">
                      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900">
                        <DollarSign className="h-6 w-6 text-emerald-600" />
                        Base Cost Breakdown
                      </h3>

                      <div className="space-y-4">
                        {Object.entries({
                          "Guide Services":
                            trek.costBreakdown.guidePerDay * trek.duration,
                          Accommodation:
                            trek.costBreakdown.accommodationPerDay *
                            trek.duration,
                          Meals: trek.costBreakdown.mealsPerDay * trek.duration,
                          "Permits & Fees": trek.costBreakdown.permitsPerPerson,
                          Transportation: trek.costBreakdown.transportPerPerson,
                        }).map(([item, cost], index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                                <DollarSign className="h-4 w-4 text-emerald-600" />
                              </div>
                              <span className="font-medium text-gray-700">
                                {item}
                              </span>
                            </div>
                            <span className="font-bold text-gray-900">
                              ${cost}
                            </span>
                          </div>
                        ))}

                        <div className="pt-4 mt-4 border-t border-gray-300">
                          <div className="flex justify-between text-lg font-bold">
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
                      </div>
                    </div>

                    {/* Extra Services */}
                    <div className="bg-white rounded-2xl p-6 border shadow-sm">
                      <h3 className="text-2xl font-bold mb-6 text-gray-900">
                        Additional Services
                      </h3>

                      <div className="space-y-4">
                        {trek.extraServices.map((service, index) => (
                          <div
                            key={index}
                            className={`border rounded-xl p-5 transition-all hover:shadow-md ${
                              selectedServices.includes(service.name)
                                ? "border-emerald-500 bg-emerald-50"
                                : "border-gray-200 hover:border-emerald-300"
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-start gap-3">
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
                                    className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 mt-1"
                                  />
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-bold text-gray-900">
                                        {service.name}
                                      </h4>
                                      {service.isOptional ? (
                                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                          Optional
                                        </span>
                                      ) : (
                                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                                          Required
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-gray-600 mt-1">
                                      {service.description}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right ml-4">
                                <div className="text-xl font-bold text-emerald-600">
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

                      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-start gap-3">
                          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-blue-900">
                            <strong>Note:</strong> All prices are in USD and
                            subject to change. Prices include all government
                            taxes and service charges.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === "requirements" && (
                  <div className="space-y-8">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900">
                      Requirements & Essential Gear
                    </h2>

                    {/* Fitness Requirements */}
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                        <Activity className="h-6 w-6 text-amber-600" />
                        Fitness Requirements
                      </h3>
                      <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed">
                          {trek.requirements.fitnessLevel}
                        </p>
                      </div>
                    </div>

                    {/* Gear Checklist */}
                    <div className="bg-white rounded-2xl p-6 border shadow-sm">
                      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900">
                        <Backpack className="h-6 w-6 text-emerald-600" />
                        Essential Gear Checklist
                      </h3>

                      <div className="grid md:grid-cols-2 gap-4">
                        {trek.requirements.gearChecklist.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                          >
                            <div className="w-6 h-6 border-2 border-emerald-600 rounded flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 transition-colors">
                              <CheckCircle className="h-4 w-4 text-emerald-600 group-hover:text-white transition-colors" />
                            </div>
                            <span className="text-gray-700 font-medium">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Permits & Vaccinations */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white rounded-2xl p-6 border shadow-sm">
                        <h4 className="font-bold text-xl mb-4 flex items-center gap-2 text-gray-900">
                          <Shield className="h-5 w-5 text-emerald-600" />
                          Required Permits
                        </h4>
                        <ul className="space-y-3">
                          {trek.requirements.permits.map((permit, index) => (
                            <li
                              key={index}
                              className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg"
                            >
                              <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                              <span className="text-gray-700">{permit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-white rounded-2xl p-6 border shadow-sm">
                        <h4 className="font-bold text-xl mb-4 flex items-center gap-2 text-gray-900">
                          <Shield className="h-5 w-5 text-blue-600" />
                          Recommended Vaccinations
                        </h4>
                        <ul className="space-y-3">
                          {trek.requirements.vaccinations.map(
                            (vaccine, index) => (
                              <li
                                key={index}
                                className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg"
                              >
                                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                                <span className="text-gray-700">{vaccine}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === "gallery" && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900">
                      Photos & Videos
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {trek.gallery.images.map((image, index) => (
                        <div
                          key={index}
                          className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                          onClick={() => {
                            setSelectedImageIndex(index);
                            setShowImageGallery(true);
                          }}
                        >
                          <Image
                            src={image}
                            alt={`Gallery ${index + 1}`}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                            <Maximize2 className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Video Section */}
                    <div className="mt-8">
                      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Play className="h-6 w-6 text-emerald-600" />
                        Trek Videos
                      </h3>
                      <div className="bg-black rounded-2xl overflow-hidden">
                        <iframe
                          width="100%"
                          height="500"
                          src="https://www.youtube.com/embed/sample"
                          title="Everest Base Camp Trek Video"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="rounded-2xl"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === "reviews" && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900">
                      Traveler Reviews
                    </h2>

                    <div className="bg-gradient-to-r from-emerald-50 to-white rounded-2xl p-8 border border-emerald-100">
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <div className="text-5xl font-bold text-gray-900 mb-2">
                            {trek.rating}/5
                          </div>
                          <div className="flex items-center gap-1 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-6 w-6 ${
                                  i < Math.floor(trek.rating)
                                    ? "fill-amber-400 text-amber-400"
                                    : "fill-gray-300 text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-600">
                            {trek.reviewCount} verified reviews
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600 mb-2">
                            Success Rate
                          </div>
                          <div className="text-3xl font-bold text-emerald-600">
                            {trek.successRate}%
                          </div>
                        </div>
                      </div>

                      {/* Review Stats */}
                      <div className="space-y-2 mb-8">
                        {[5, 4, 3, 2, 1].map((stars) => (
                          <div key={stars} className="flex items-center gap-3">
                            <div className="w-12 text-sm text-gray-600">
                              {stars} stars
                            </div>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-amber-400"
                                style={{ width: `${(stars / 5) * 80}%` }}
                              ></div>
                            </div>
                            <div className="w-12 text-sm text-gray-600 text-right">
                              {Math.round((stars / 5) * trek.reviewCount)}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Featured Review */}
                      <div className="bg-white rounded-xl p-6 border shadow-sm">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                            JS
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">
                              John Smith
                            </h4>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-4 w-4 fill-amber-400 text-amber-400"
                                />
                              ))}
                              <span className="text-sm text-gray-600 ml-2">
                                2 weeks ago
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 italic">
                          "An absolutely life-changing experience! The guides
                          were incredible, the scenery was breathtaking, and the
                          organization was flawless. Highly recommend to anyone
                          looking for adventure!"
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-6">
              {/* Booking Card */}
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-6 shadow-xl text-white">
                <div className="mb-6">
                  <div className="text-sm text-emerald-200 mb-1">
                    Total Cost
                  </div>
                  <div className="text-4xl font-bold mb-1">
                    ${calculateTotalCost().toLocaleString()}
                  </div>
                  <div className="text-emerald-200">per person</div>
                </div>

                <button
                  onClick={handleBookNow}
                  disabled={isLoading}
                  className="w-full bg-white hover:bg-gray-100 text-emerald-700 py-4 rounded-xl font-bold text-lg mb-3 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-emerald-700"></div>
                      Processing...
                    </span>
                  ) : (
                    "Book Now"
                  )}
                </button>

                <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-white py-3 rounded-xl font-semibold mb-3 transition-colors">
                  Request Custom Quote
                </button>

                <div className="flex gap-2 pt-4 border-t border-emerald-500">
                  <button
                    onClick={handleShare}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-400 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                  <button className="flex-1 bg-emerald-500 hover:bg-emerald-400 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Heart className="h-4 w-4" />
                    Save
                  </button>
                  <button className="flex-1 bg-emerald-500 hover:bg-emerald-400 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" />
                    PDF
                  </button>
                </div>
              </div>

              {/* Inclusions/Exclusions Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-900">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  What's Included
                </h3>
                <ul className="space-y-2 mb-6">
                  {trek.inclusions.slice(0, 5).map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="#"
                  className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-1"
                >
                  View all inclusions
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              {/* Quick Info Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border">
                <h3 className="font-bold text-lg mb-4 text-gray-900">
                  Quick Facts
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Best Time</span>
                    <span className="font-semibold text-gray-900">
                      {trek.bestTime.months.slice(0, 3).join(", ")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Start Point</span>
                    <span className="font-semibold text-gray-900">
                      {trek.startPoint}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">End Point</span>
                    <span className="font-semibold text-gray-900">
                      {trek.endPoint}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600">Min Altitude</span>
                    <span className="font-semibold text-gray-900">
                      {trek.minAltitude.toLocaleString()} m
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                <h3 className="font-bold text-lg mb-3 text-gray-900">
                  Need Assistance?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Our trek specialists are available 24/7 to answer your
                  questions.
                </p>
                <div className="space-y-2">
                  <button className="w-full bg-white hover:bg-gray-50 border border-blue-300 text-blue-700 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                    <Phone className="h-4 w-4" />
                    Call Us
                  </button>
                  <button className="w-full bg-white hover:bg-gray-50 border border-blue-300 text-blue-700 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Live Chat
                  </button>
                  <button className="w-full bg-white hover:bg-gray-50 border border-blue-300 text-blue-700 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery Modal */}
      {showImageGallery && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-7xl bg-black rounded-lg overflow-hidden">
            <button
              onClick={() => setShowImageGallery(false)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-10 transition-colors"
            >
              <XCircle className="h-6 w-6" />
            </button>

            <div className="flex flex-col lg:flex-row h-[90vh]">
              {/* Main Image */}
              <div className="lg:w-3/4 p-4 flex items-center justify-center">
                <Image
                  src={trek.gallery.images[selectedImageIndex]}
                  alt={`Gallery Image ${selectedImageIndex + 1}`}
                  width={1200}
                  height={800}
                  className="w-auto h-auto max-h-full rounded-lg"
                />
              </div>

              {/* Thumbnails Sidebar */}
              <div className="lg:w-1/4 p-4 bg-black/50 border-l border-gray-800 overflow-y-auto">
                <h3 className="text-xl font-bold mb-4 text-white sticky top-0 bg-black/80 backdrop-blur-sm p-2 rounded-lg">
                  Image Gallery ({trek.gallery.images.length})
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {trek.gallery.images.map((imgUrl, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index
                          ? "border-emerald-500 scale-105"
                          : "border-transparent hover:border-gray-600"
                      }`}
                    >
                      <Image
                        src={imgUrl}
                        alt={`Thumbnail ${index + 1}`}
                        width={150}
                        height={150}
                        className="w-full h-full object-cover"
                      />
                      <div
                        className={`absolute inset-0 bg-emerald-600/20 transition-opacity ${
                          selectedImageIndex === index
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      ></div>
                    </button>
                  ))}
                </div>

                {/* Video Thumbnail */}
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <h4 className="font-semibold mb-3 text-white">Video</h4>
                  <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-transparent hover:border-emerald-500 transition-colors">
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                    <Image
                      src={trek.gallery.coverImage}
                      alt="Video thumbnail"
                      width={300}
                      height={169}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Footer */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready for Your Adventure?</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join thousands of trekkers who have experienced this unforgettable
            journey.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={handleBookNow}
              disabled={isLoading}
              className="bg-white hover:bg-gray-100 text-emerald-700 px-10 py-4 rounded-xl font-bold text-lg shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : "Book Now"}
            </button>
            <button className="bg-emerald-500 hover:bg-emerald-400 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-xl transition-all hover:scale-105 border border-emerald-400">
              Download Detailed Itinerary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
