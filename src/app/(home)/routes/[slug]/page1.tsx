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
  Hotel,
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

export default function TrekDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showImageGallery, setShowImageGallery] = useState(false);

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

  const tabs = [
    { id: "overview", label: "Overview", icon: Info },
    { id: "itinerary", label: "Detailed Itinerary", icon: Map },
    { id: "costs", label: "Costs & Services", icon: DollarSign },
    { id: "requirements", label: "Requirements & Gear", icon: Backpack },
    { id: "gallery", label: "Photos & Videos", icon: Camera },
    { id: "reviews", label: "Reviews", icon: Star },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const handleBookNow = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/booking?trek=" + trek.slug);
    }, 1500);
  };
  const handleShare = () => {
    const shareData = {
      title: trek.name,
      text: `Check out this trek: ${trek.name}`,
      url: window.location.href,
    };
    if (navigator.share) {
      navigator
        .share(shareData)
        .catch((error) => console.log("Error sharing", error));
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert("Link copied to clipboard!");
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white mt-20">
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8 sm:pb-12 lg:pb-16 w-full">
            {/* Badges - Stack on mobile, row on larger screens */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
              <span
                className={`${getDifficultyColor(
                  trek.difficulty
                )} text-white px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 rounded-full font-semibold capitalize shadow-lg backdrop-blur-sm transform hover:scale-105 transition-transform text-xs sm:text-sm lg:text-base`}
              >
                {trek.difficulty}
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 rounded-full font-semibold flex items-center gap-1.5 sm:gap-2 shadow-lg hover:bg-white/30 transition-colors text-xs sm:text-sm lg:text-base">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="whitespace-nowrap">
                  {trek.region.name} Region
                </span>
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 rounded-full font-semibold flex items-center gap-1.5 sm:gap-2 shadow-lg hover:bg-white/30 transition-colors text-xs sm:text-sm lg:text-base">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
                <span className="whitespace-nowrap">
                  {trek.rating}/5 ({trek.reviewCount})
                </span>
              </span>
              <span className="bg-emerald-500/90 backdrop-blur-md text-white px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 rounded-full font-semibold flex items-center gap-1.5 sm:gap-2 shadow-lg hover:bg-emerald-500 transition-colors text-xs sm:text-sm lg:text-base">
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="whitespace-nowrap">
                  {trek.successRate}% Success
                </span>
              </span>
            </div>

            {/* Title - Responsive font sizes */}
            <h1 className="font-bold text-white mb-3 sm:mb-4 drop-shadow-2xl leading-tight text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              {trek.name}
            </h1>

            {/* Description - Hide on very small screens, show on sm+ */}
            <p className="text-gray-200 max-w-4xl drop-shadow-lg mb-6 sm:mb-8 hidden xs:block text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
              {trek.description}
            </p>

            {/* Quick Action Buttons - Stack on mobile, row on larger screens */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <button
                onClick={handleBookNow}
                disabled={isLoading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    Book This Trek
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </>
                )}
              </button>
              <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold shadow-xl transition-all border border-white/30 hover:border-white/50 w-full sm:w-auto text-center">
                Request Custom Quote
              </button>
              <button
                onClick={() => setShowImageGallery(true)}
                className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold shadow-xl transition-all border border-white/30 hover:border-white/50 flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Camera className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>View Gallery</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Stats Bar */}
      <div className="bg-white border-b">
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

      {/* Tabs Navigation */}
      <div className="bg-white border-b shadow-sm sticky top-15 z-30 border-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8 overflow-x-auto py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center gap-2 py-4 border-b-3 transition-all whitespace-nowrap font-medium ${
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

      {/* Main Content */}
      <div className="px-4 py-12 max-w-7xl mx-auto flex flex-col lg:flex-row gap-2 lg:gap-8">
        <div className="gap-8 flex-2">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Tab */}
            {selectedTab === "overview" && (
              <>
                {/* Trek Description */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <Info className="h-8 w-8 text-emerald-600" />
                    Trek Overview
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg mb-6">
                    {trek.longDescription}
                  </p>

                  {/* Highlights Grid */}
                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Star className="h-6 w-6 text-amber-500" />
                      Trek Highlights
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {trek.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100 hover:shadow-md transition-shadow"
                        >
                          <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-900 font-medium">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Altitude Profile Chart */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <TrendingUp className="h-7 w-7 text-emerald-600" />
                    Altitude Profile
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={altitudeChartData}>
                      <defs>
                        <linearGradient
                          id="altitudeGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#10b981"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#10b981"
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        dataKey="day"
                        stroke="#6b7280"
                        style={{ fontSize: "12px" }}
                      />
                      <YAxis
                        stroke="#6b7280"
                        style={{ fontSize: "12px" }}
                        label={{
                          value: "Altitude (meters)",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        }}
                        formatter={(value: number) => [`${value}m`, "Altitude"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="altitude"
                        stroke="#10b981"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#altitudeGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                  <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-amber-900">
                          Acclimatization Important
                        </p>
                        <p className="text-sm text-amber-800 mt-1">
                          Notice the rest days at Namche (Day 4) and Dingboche
                          (Day 7) for proper acclimatization. This is crucial
                          for preventing altitude sickness.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Temperature Chart */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Thermometer className="h-7 w-7 text-emerald-600" />
                    Monthly Temperature Range
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={temperatureData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis
                        stroke="#6b7280"
                        label={{
                          value: "Temperature (°C)",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="high" fill="#f59e0b" name="High Temp" />
                      <Bar dataKey="low" fill="#3b82f6" name="Low Temp" />
                    </BarChart>
                  </ResponsiveContainer>

                  {/* Best Time Indicator */}
                  <div className="mt-6 grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Sun className="h-5 w-5 text-emerald-600" />
                        <span className="font-semibold text-emerald-900">
                          Spring (Mar-May)
                        </span>
                      </div>
                      <p className="text-sm text-emerald-800">
                        Clear skies, blooming rhododendrons, moderate
                        temperatures
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <CloudRain className="h-5 w-5 text-blue-600" />
                        <span className="font-semibold text-blue-900">
                          Monsoon (Jun-Aug)
                        </span>
                      </div>
                      <p className="text-sm text-blue-800">
                        Heavy rain, leeches, cloudy views - not recommended
                      </p>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Eye className="h-5 w-5 text-amber-600" />
                        <span className="font-semibold text-amber-900">
                          Autumn (Sep-Nov)
                        </span>
                      </div>
                      <p className="text-sm text-amber-800">
                        Perfect weather, crystal clear views, peak season
                      </p>
                    </div>
                  </div>
                </div>

                {/* Difficulty Radar Chart */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Compass className="h-7 w-7 text-emerald-600" />
                    Trek Difficulty Analysis
                  </h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={difficultyRadarData}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis dataKey="aspect" stroke="#6b7280" />
                      <PolarRadiusAxis
                        angle={90}
                        domain={[0, 100]}
                        stroke="#6b7280"
                      />
                      <Radar
                        name="Difficulty Level"
                        dataKey="value"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.6}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                    {difficultyRadarData.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="text-gray-700">{item.aspect}</span>
                        <span className="font-bold text-emerald-600">
                          {item.value}/100
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inclusions/Exclusions */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border">
                    <h3 className="font-bold text-xl mb-4 flex items-center gap-2 text-emerald-600">
                      <CheckCircle className="h-6 w-6" />
                      What's Included
                    </h3>
                    <ul className="space-y-2">
                      {trek.inclusions?.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <CheckCircle className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border">
                    <h3 className="font-bold text-xl mb-4 flex items-center gap-2 text-red-600">
                      <XCircle className="h-6 w-6" />
                      What's Not Included
                    </h3>
                    <ul className="space-y-2">
                      {trek.exclusions?.slice(0, 11).map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <XCircle className="h-4 w-4 text-red-600 mt-1 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}

            {/* Itinerary Tab */}
            {selectedTab === "itinerary" && (
              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                  <Map className="h-8 w-8 text-emerald-600" />
                  Detailed Day-by-Day Itinerary
                </h2>

                <div className="space-y-6">
                  {trek.itinerary?.map((day, idx) => (
                    <div
                      key={idx}
                      className="border-l-4 border-emerald-600 pl-8 pb-8 relative hover:border-emerald-700 transition-colors"
                    >
                      {/* Day Number Circle */}
                      <div className="absolute -left-4 top-0 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        {day.day}
                      </div>

                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <div className="flex-1">
                          <div className="text-sm text-emerald-600 font-semibold mb-2">
                            Day {day.day}
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {day.title}
                          </h3>
                        </div>
                        <div className="flex gap-2 mt-2 md:mt-0">
                          <span className="bg-emerald-50 px-4 py-2 rounded-lg text-sm font-medium text-emerald-700 whitespace-nowrap">
                            {day.duration}
                          </span>
                          <span className="bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium text-blue-700 whitespace-nowrap">
                            {day.altitude}m
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-700 leading-relaxed mb-6">
                        {day.description}
                      </p>

                      {/* Day Stats Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 bg-gray-50 p-4 rounded-xl">
                        <div className="flex items-center gap-2">
                          <Mountain className="h-5 w-5 text-gray-500" />
                          <div>
                            <div className="text-xs text-gray-600">
                              Altitude
                            </div>
                            <div className="font-semibold text-gray-900">
                              {day.altitude}m
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Activity className="h-5 w-5 text-gray-500" />
                          <div>
                            <div className="text-xs text-gray-600">
                              Distance
                            </div>
                            <div className="font-semibold text-gray-900">
                              {day.distance}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bed className="h-5 w-5 text-gray-500" />
                          <div>
                            <div className="text-xs text-gray-600">Stay</div>
                            <div className="font-semibold text-gray-900 capitalize">
                              {day.accommodation}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Utensils className="h-5 w-5 text-gray-500" />
                          <div>
                            <div className="text-xs text-gray-600">Meals</div>
                            <div className="font-semibold text-gray-900">
                              {day.meals.length}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Highlights */}
                      {day.highlights && day.highlights.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {day.highlights.map((highlight, i) => (
                            <span
                              key={i}
                              className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm font-medium border border-amber-200"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Notes */}
                      {day.notes && (
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                          <div className="flex items-start gap-2">
                            <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-blue-900">{day.notes}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Costs Tab */}
            {selectedTab === "costs" && (
              <div className="space-y-6 ">
                {/* Cost Breakdown */}
                <div className=" rounded-2xl p-8 shadow-lg border bg-linear-to-br from-emerald-50 to-white border-emerald-100">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <DollarSign className="h-8 w-8 text-emerald-600" />
                    Detailed Cost Breakdown
                  </h2>

                  {trek.costBreakdown && (
                    <div className="space-y-4">
                      <div className="flex justify-between py-4 border-b hover:bg-gray-50 px-4 rounded-lg transition-colors">
                        <div>
                          <span className="text-gray-900 font-medium">
                            Professional Guide
                          </span>
                          <p className="text-sm text-gray-600">
                            ${trek.costBreakdown.guidePerDay}/day ×{" "}
                            {trek.duration} days
                          </p>
                        </div>
                        <span className="font-bold text-lg">
                          ${trek.costBreakdown.guidePerDay * trek.duration}
                        </span>
                      </div>

                      <div className="flex justify-between py-4 border-b hover:bg-gray-50 px-4 rounded-lg transition-colors">
                        <div>
                          <span className="text-gray-900 font-medium">
                            Trekking Permits
                          </span>
                          <p className="text-sm text-gray-600">
                            TIMS, National Park, Municipality
                          </p>
                        </div>
                        <span className="font-bold text-lg">
                          ${trek.costBreakdown.permitsPerPerson}
                        </span>
                      </div>

                      <div className="flex justify-between py-4 border-b hover:bg-gray-50 px-4 rounded-lg transition-colors">
                        <div>
                          <span className="text-gray-900 font-medium">
                            Accommodation
                          </span>
                          <p className="text-sm text-gray-600">
                            ${trek.costBreakdown.accommodationPerDay}/day ×{" "}
                            {trek.duration} days
                          </p>
                        </div>
                        <span className="font-bold text-lg">
                          $
                          {trek.costBreakdown.accommodationPerDay *
                            trek.duration}
                        </span>
                      </div>

                      <div className="flex justify-between py-4 border-b hover:bg-gray-50 px-4 rounded-lg transition-colors">
                        <div>
                          <span className="text-gray-900 font-medium">
                            Meals (3 per day)
                          </span>
                          <p className="text-sm text-gray-600">
                            ${trek.costBreakdown.mealsPerDay}/day ×{" "}
                            {trek.duration} days
                          </p>
                        </div>
                        <span className="font-bold text-lg">
                          ${trek.costBreakdown.mealsPerDay * trek.duration}
                        </span>
                      </div>

                      <div className="flex justify-between py-4 border-b hover:bg-gray-50 px-4 rounded-lg transition-colors">
                        <div>
                          <span className="text-gray-900 font-medium">
                            Transportation
                          </span>
                          <p className="text-sm text-gray-600">
                            Kathmandu - Lukla - Kathmandu flights
                          </p>
                        </div>
                        <span className="font-bold text-lg">
                          ${trek.costBreakdown.transportPerPerson}
                        </span>
                      </div>

                      <div className="flex justify-between pt-6 text-xl font-bold bg-emerald-50 p-6 rounded-xl">
                        <span className="text-gray-900">
                          Base Package Total
                        </span>
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
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <Backpack className="h-7 w-7 text-emerald-600" />
                      Additional Services & Add-ons
                    </h3>
                    <div className="space-y-4">
                      {trek.extraServices.map((service, idx) => (
                        <div
                          key={idx}
                          className={`border-2 rounded-xl p-5 transition-all cursor-pointer ${
                            selectedServices.includes(service.name)
                              ? "border-emerald-600 bg-emerald-50"
                              : "border-gray-200 hover:border-emerald-300 hover:bg-gray-50"
                          }`}
                          onClick={() => {
                            if (service.isOptional) {
                              if (selectedServices.includes(service.name)) {
                                setSelectedServices(
                                  selectedServices.filter(
                                    (s) => s !== service.name
                                  )
                                );
                              } else {
                                setSelectedServices([
                                  ...selectedServices,
                                  service.name,
                                ]);
                              }
                            }
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 flex items-start gap-4">
                              {service.isOptional && (
                                <input
                                  type="checkbox"
                                  checked={selectedServices.includes(
                                    service.name
                                  )}
                                  onChange={() => {}}
                                  className="w-6 h-6 text-emerald-600 rounded focus:ring-emerald-500 mt-1 cursor-pointer"
                                />
                              )}
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h4 className="font-bold text-gray-900 text-lg">
                                    {service.name}
                                  </h4>
                                  {!service.isOptional && (
                                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                                      Required
                                    </span>
                                  )}
                                  {service.isOptional && (
                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                                      Optional
                                    </span>
                                  )}
                                </div>
                                <p className="text-gray-600">
                                  {service.description}
                                </p>
                              </div>
                            </div>
                            <div className="text-right ml-6">
                              <div className="text-2xl font-bold text-emerald-600">
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

                    {/* Selected Services Summary */}
                    {selectedServices.length > 0 && (
                      <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                        <h4 className="font-bold text-blue-900 mb-3">
                          Selected Additional Services
                        </h4>
                        <div className="space-y-2">
                          {selectedServices.map((serviceName, idx) => {
                            const service = trek.extraServices?.find(
                              (s) => s.name === serviceName
                            );
                            return (
                              <div
                                key={idx}
                                className="flex justify-between text-blue-900"
                              >
                                <span>{serviceName}</span>
                                <span className="font-semibold">
                                  +${service?.costPerPerson}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Grand Total */}
                    <div className="mt-6 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-6 rounded-xl shadow-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-emerald-100 text-sm mb-1">
                            Total Package Cost
                          </div>
                          <div className="text-4xl font-bold">
                            ${calculateTotalCost()}
                          </div>
                          <div className="text-emerald-100 text-sm mt-1">
                            per person
                          </div>
                        </div>
                        <button className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-colors">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Requirements Tab Continued */}
            {selectedTab === "requirements" && (
              <div className="space-y-6">
                {/* Fitness Requirements */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <Activity className="h-8 w-8 text-emerald-600" />
                    Fitness & Experience Requirements
                  </h2>
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 p-6 rounded-r-xl">
                    <p className="text-gray-800 leading-relaxed text-lg">
                      {trek.requirements?.fitnessLevel}
                    </p>
                  </div>

                  {/* Fitness Level Indicators */}
                  <div className="mt-8 grid md:grid-cols-3 gap-6">
                    <div className="bg-white border rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <Activity className="h-6 w-6 text-emerald-600" />
                        <span className="font-bold text-gray-900">
                          Cardiovascular
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                        <div
                          className="bg-red-600 h-3 rounded-full"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600">
                        High intensity required
                      </p>
                    </div>
                    <div className="bg-white border rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <TrendingUp className="h-6 w-6 text-emerald-600" />
                        <span className="font-bold text-gray-900">
                          Altitude
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                        <div
                          className="bg-orange-500 h-3 rounded-full"
                          style={{ width: "95%" }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600">
                        Extreme altitude challenge
                      </p>
                    </div>
                    <div className="bg-white border rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <Compass className="h-6 w-6 text-emerald-600" />
                        <span className="font-bold text-gray-900">
                          Endurance
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                        <div
                          className="bg-amber-500 h-3 rounded-full"
                          style={{ width: "80%" }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600">
                        Multiple long days
                      </p>
                    </div>
                  </div>
                </div>

                {/* Gear Checklist */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Backpack className="h-7 w-7 text-emerald-600" />
                    Essential Gear Checklist
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {trek.requirements?.gearChecklist?.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-800">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="flex items-start gap-2">
                      <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-blue-900">
                        All gear can be rented in Kathmandu. Quality gear is
                        essential for safety and comfort.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Permits & Vaccinations */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border">
                    <h3 className="font-bold text-xl mb-4 flex items-center gap-2 text-emerald-600">
                      <Shield className="h-6 w-6" />
                      Required Permits
                    </h3>
                    <div className="space-y-3">
                      {trek.requirements?.permits?.map((permit, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <span className="text-gray-700">{permit}</span>
                          <span className="font-bold text-emerald-600">
                            NPR{" "}
                            {parseInt(
                              permit.split(" - NPR ")[1]?.replace(",", "") ||
                                "0"
                            ).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border">
                    <h3 className="font-bold text-xl mb-4 flex items-center gap-2 text-emerald-600">
                      <Shield className="h-6 w-6" />
                      Recommended Vaccinations
                    </h3>
                    <div className="space-y-3">
                      {trek.requirements?.vaccinations?.map((vaccine, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                          <span className="text-gray-700">{vaccine}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Insurance Requirements */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Shield className="h-7 w-7 text-emerald-600" />
                    Insurance Requirements
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                        <span className="font-bold text-red-900">
                          Mandatory Coverage
                        </span>
                      </div>
                      <p className="text-sm text-red-800">
                        Emergency helicopter evacuation up to 6,000m altitude
                      </p>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <DollarSign className="h-6 w-6 text-amber-600" />
                        <span className="font-bold text-amber-900">
                          Minimum Coverage
                        </span>
                      </div>
                      <p className="text-sm text-amber-800">
                        At least $100,000 medical coverage including altitude
                        sickness
                      </p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <Compass className="h-6 w-6 text-blue-600" />
                        <span className="font-bold text-blue-900">
                          Recommended Providers
                        </span>
                      </div>
                      <p className="text-sm text-blue-800">
                        World Nomads, Global Rescue, IMG, Battleface
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Gallery Tab */}
            {selectedTab === "gallery" && (
              <div className="space-y-6">
                {/* Gallery Header */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <Camera className="h-8 w-8 text-emerald-600" />
                    Photo & Video Gallery
                  </h2>
                  <p className="text-gray-700 mb-8">
                    Explore stunning visuals from the Everest Base Camp trek
                    captured by our trekkers and guides.
                  </p>

                  {/* Featured Images Grid */}
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    {trek.gallery.images.map((image, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                        onClick={() => {
                          setSelectedImageIndex(idx);
                          setShowImageGallery(true);
                        }}
                      >
                        <Image
                          src={image}
                          alt={`Trek image ${idx + 1}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      </div>
                    ))}
                  </div>

                  {/* Video Section */}
                  {trek.gallery.videos && trek.gallery.videos.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Play className="h-5 w-5 text-emerald-600" />
                        Trek Experience Video
                      </h3>
                      <div className="relative aspect-video bg-black rounded-2xl overflow-hidden">
                        <iframe
                          src={trek.gallery.videos[0].replace(
                            "watch?v=",
                            "embed/"
                          )}
                          className="absolute inset-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}

                  {/* Download Section */}
                  <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl border">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-xl mb-2">
                          Download Trek Resources
                        </h3>
                        <p className="text-gray-700">
                          Get detailed maps, packing lists, and preparation
                          guides
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <button className="bg-white border border-emerald-600 text-emerald-600 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          Packing List (PDF)
                        </button>
                        <button className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-2">
                          <Map className="h-4 w-4" />
                          Route Map
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
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
                        <h4 className="font-bold text-gray-900">John Smith</h4>
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
                      "An absolutely life-changing experience! The guides were
                      incredible, the scenery was breathtaking, and the
                      organization was flawless. Highly recommend to anyone
                      looking for adventure!"
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6 flex-1">
          {/* Booking Card */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-emerald-100 ">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-emerald-600 mb-1">
                ${calculateTotalCost()}
              </div>
              <div className="text-gray-600">per person</div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Duration</span>
                <span className="font-bold">{trek.duration} days</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Difficulty</span>
                <span className="font-bold capitalize">{trek.difficulty}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Max Altitude</span>
                <span className="font-bold">{trek.maxAltitude}m</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Group Size</span>
                <span className="font-bold">2-12 people</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Best Season</span>
                <span className="font-bold">Mar-May, Sep-Nov</span>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 rounded-xl font-bold text-lg hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg">
                Book Now
              </button>
              <button className="w-full border-2 border-emerald-600 text-emerald-600 py-4 rounded-xl font-semibold hover:bg-emerald-50 transition-colors">
                Request Custom Dates
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Heart className="h-5 w-5" />
                Save to Wishlist
              </button>
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="text-sm text-gray-600 mb-2">Need help?</div>
              <div className="flex items-center gap-3">
                <button className="flex-1 bg-blue-50 text-blue-700 py-3 rounded-lg font-medium hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4" />
                  Call Now
                </button>
                <button className="flex-1 bg-green-50 text-green-700 py-3 rounded-lg font-medium hover:bg-green-100 transition-colors flex items-center justify-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </button>
              </div>
            </div>
          </div>

          {/* Quick Facts */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <Info className="h-5 w-5 text-emerald-600" />
              Quick Facts
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">
                  Region: {trek.region.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">
                  Best Time: {trek.bestTime.months.slice(0, 3).join(", ")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">
                  Walking Hours: 5-7 hours/day
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">
                  Guide Ratio: 1 guide per 4 trekkers
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Plane className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">
                  Start/End: {trek.startPoint}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Hotel className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">
                  Accommodation: Teahouses & Lodges
                </span>
              </div>

              {/* min/max altitude */}
              <div className="flex items-center gap-3">
                <TrendingUp className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">
                  Altitude: {trek.minAltitude}m - {trek.maxAltitude}m
                </span>
              </div>
            </div>
          </div>

          {/* Safety Information */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-emerald-600" />
              Safety First
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <Activity className="h-4 w-4 text-emerald-700" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    Acclimatization Days
                  </p>
                  <p className="text-sm text-gray-600">2 scheduled rest days</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Thermometer className="h-4 w-4 text-blue-700" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Oxygen Available</p>
                  <p className="text-sm text-gray-600">
                    Emergency cylinders carried
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-red-100 p-2 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-red-700" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">First Aid Trained</p>
                  <p className="text-sm text-gray-600">All guides certified</p>
                </div>
              </div>
            </div>
          </div>

          {/* Share Section */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border">
            <h3 className="font-bold text-xl mb-4">Share this trek</h3>
            <div className="flex gap-3">
              <button className="flex-1 bg-blue-50 text-blue-700 py-3 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </button>
              <button className="flex-1 bg-gray-50 text-gray-700 py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
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

          {/* Contact Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
            <h3 className="font-bold text-lg mb-3 text-gray-900">
              Need Assistance?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Our trek specialists are available 24/7 to answer your questions.
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
      {/* Image Gallery Modal */}
      {showImageGallery && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl">
            {/* Close button */}
            <button
              onClick={() => setShowImageGallery(false)}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
            >
              <XCircle className="h-8 w-8" />
            </button>

            {/* Main image */}
            <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
              <Image
                src={trek.gallery.images[selectedImageIndex]}
                alt="Gallery image"
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto py-2">
              {trek.gallery.images.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 ${
                    selectedImageIndex === idx ? "ring-2 ring-emerald-500" : ""
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 bg-emerald-600 text-white p-3 rounded-full shadow-lg hover:bg-emerald-700 transition-colors z-20"
      >
        <ArrowRight className="h-5 w-5 rotate-90" />
      </button>

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
