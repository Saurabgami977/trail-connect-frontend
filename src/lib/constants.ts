export const TREKKING_REGIONS = [
  {
    id: "everest",
    name: "Everest Region",
    description: "Home to the world's highest peak",
    image: "/regions/everest.jpg",
    difficulty: "Challenging",
    maxAltitude: "5,545m",
    popularTreks: ["Everest Base Camp", "Three Passes", "Gokyo Lakes"],
  },
  {
    id: "annapurna",
    name: "Annapurna Region",
    description: "Diverse landscapes and rich culture",
    image: "/regions/annapurna.jpg",
    difficulty: "Moderate to Challenging",
    maxAltitude: "5,416m",
    popularTreks: ["Annapurna Circuit", "ABC Trek", "Poon Hill"],
  },
  {
    id: "langtang",
    name: "Langtang Region",
    description: "Sacred lakes and stunning glaciers",
    image: "/regions/langtang.jpg",
    difficulty: "Moderate",
    maxAltitude: "4,984m",
    popularTreks: ["Langtang Valley", "Gosaikunda", "Helambu"],
  },
];

export const LANGUAGES = [
  "English",
  "Nepali",
  "Hindi",
  "Chinese",
  "Japanese",
  "Korean",
  "German",
  "French",
  "Spanish",
  "Italian",
  "Russian",
  "Dutch",
  "Arabic",
];

export const EXTRA_SERVICES = [
  {
    id: "domestic-flight",
    name: "Domestic Flight Tickets",
    description:
      "Booking and arrangement of domestic flights to Lukla, Pokhara, etc.",
    price: 150,
    tooltip: "Includes airport transfers and flight booking assistance",
  },
  {
    id: "return-flight",
    name: "Return Flight Tickets",
    description: "International return flight assistance",
    price: 50,
    tooltip:
      "We help coordinate your international travel dates with trek schedule",
  },
  {
    id: "porter",
    name: "Porter Service",
    description: "Experienced porters for luggage carrying (up to 20kg)",
    price: 25,
    tooltip:
      "One porter carries up to 20kg. Additional porters available for larger groups",
  },
  {
    id: "tims",
    name: "TIMS Card Handling",
    description: "Trekkers' Information Management System permit",
    price: 20,
    tooltip:
      "Required permit for all trekkers in Nepal. We handle all paperwork",
  },
];

export const SERVICE_BUNDLES = [
  {
    id: "standard",
    name: "Standard Trek Pack",
    description: "Porter + TIMS card included",
    services: ["porter", "tims"],
    discount: 10,
  },
  {
    id: "premium",
    name: "Premium Trek Pack",
    description: "All services with domestic flight",
    services: ["domestic-flight", "porter", "tims"],
    discount: 15,
  },
  {
    id: "complete",
    name: "Complete Adventure",
    description: "Everything included for worry-free trek",
    services: ["domestic-flight", "return-flight", "porter", "tims"],
    discount: 20,
  },
];

export const FAKE_NOTIFICATIONS = [
  {
    name: "Emma S.",
    region: "Everest Base Camp",
    days: 14,
    country: "Germany",
  },
  { name: "Marco L.", region: "Annapurna Circuit", days: 12, country: "Italy" },
  { name: "Yuki T.", region: "Langtang Valley", days: 7, country: "Japan" },
  {
    name: "David W.",
    region: "Manaslu Circuit",
    days: 16,
    country: "Australia",
  },
  { name: "Sophie M.", region: "Upper Mustang", days: 10, country: "France" },
  {
    name: "Hans G.",
    region: "Everest Three Passes",
    days: 18,
    country: "Switzerland",
  },
  { name: "Chen L.", region: "Annapurna Base Camp", days: 8, country: "China" },
  { name: "Maria R.", region: "Gokyo Lakes", days: 11, country: "Spain" },
  { name: "John D.", region: "Poon Hill", days: 5, country: "USA" },
  { name: "Akiko N.", region: "Everest Base Camp", days: 14, country: "Japan" },
];

export const VERIFICATION_STATUSES = {
  uploaded: {
    label: "Uploaded",
    color: "bg-blue-500",
    description: "License document received",
  },
  under_review: {
    label: "Under Review",
    color: "bg-amber-500",
    description: "Being verified by our team",
  },
  verified: {
    label: "Verified",
    color: "bg-emerald-500",
    description: "License approved",
  },
  expired: {
    label: "Expired",
    color: "bg-red-500",
    description: "License needs renewal",
  },
};

export const TRUST_TIERS = [
  {
    id: "bronze",
    name: "Bronze Guide",
    minTreks: 0,
    color: "bg-amber-700",
    benefits: ["Basic listing", "Standard support"],
  },
  {
    id: "silver",
    name: "Silver Guide",
    minTreks: 25,
    color: "bg-slate-400",
    benefits: ["Featured in region", "Priority support", "Badge display"],
  },
  {
    id: "gold",
    name: "Gold Guide",
    minTreks: 50,
    color: "bg-amber-400",
    benefits: ["Homepage feature", "Premium badge", "Priority bookings"],
  },
  {
    id: "platinum",
    name: "Platinum Guide",
    minTreks: 100,
    color: "bg-slate-200",
    benefits: ["Elite status", "Dedicated support", "Max visibility"],
  },
];

export const DIFFICULTY_LEVELS = [
  {
    id: "easy",
    name: "Easy",
    color: "text-emerald-600",
    description: "Suitable for beginners",
  },
  {
    id: "moderate",
    name: "Moderate",
    color: "text-amber-600",
    description: "Some trekking experience helpful",
  },
  {
    id: "challenging",
    name: "Challenging",
    color: "text-orange-600",
    description: "Good fitness required",
  },
  {
    id: "extreme",
    name: "Extreme",
    color: "text-red-600",
    description: "Expert level only",
  },
];

export const MOCK_GUIDES = [
  {
    id: "1",
    name: "Tenzing Sherpa",
    photo: "/guides/guide1.jpg",
    regions: ["Everest Region", "Langtang Region"],
    experience: 12,
    languages: ["English", "Nepali", "Chinese"],
    dailyRate: 45,
    peakRate: 55,
    rating: 4.9,
    reviewCount: 87,
    verified: true,
    verificationStatus: "verified",
    licenseNumber: "NTG-2012-0847",
    licenseIssued: "2012-03-15",
    licenseExpiry: "2025-03-14",
    trustTier: "gold",
    completedTreks: 87,
    altitudeExperience: "8000m+",
    bio: "Born and raised in the shadows of Everest, I've been guiding treks for over 12 years. My passion is sharing the beauty and culture of the Himalayas with travelers from around the world.",
  },
  {
    id: "2",
    name: "Pemba Dorje",
    photo: "/guides/guide2.jpg",
    regions: ["Annapurna Region", "Upper Mustang"],
    experience: 8,
    languages: ["English", "Nepali", "German"],
    dailyRate: 40,
    peakRate: 50,
    rating: 4.8,
    reviewCount: 56,
    verified: true,
    verificationStatus: "verified",
    licenseNumber: "NTG-2016-1234",
    licenseIssued: "2016-05-20",
    licenseExpiry: "2026-05-19",
    trustTier: "silver",
    completedTreks: 56,
    altitudeExperience: "6000m+",
    bio: "The Annapurna region is my home, and I know every trail like the back of my hand. I specialize in cultural immersion and photography treks.",
  },
  {
    id: "3",
    name: "Karma Lama",
    photo: "/guides/guide3.jpg",
    regions: ["Manaslu Region", "Langtang Region"],
    experience: 15,
    languages: ["English", "Nepali", "Japanese", "Korean"],
    dailyRate: 55,
    peakRate: 70,
    rating: 5.0,
    reviewCount: 124,
    verified: true,
    verificationStatus: "verified",
    licenseNumber: "NTG-2009-0312",
    licenseIssued: "2009-07-01",
    licenseExpiry: "2024-06-30",
    trustTier: "platinum",
    completedTreks: 124,
    altitudeExperience: "8000m+",
    bio: "With 15 years of trekking experience, I've led hundreds of successful expeditions. Safety and cultural exchange are my top priorities.",
  },
  {
    id: "4",
    name: "Mingma Tamang",
    photo: "/guides/guide4.jpg",
    regions: ["Everest Region", "Kanchenjunga Region"],
    experience: 6,
    languages: ["English", "Nepali"],
    dailyRate: 35,
    peakRate: 45,
    rating: 4.7,
    reviewCount: 32,
    verified: false,
    verificationStatus: "under_review",
    licenseNumber: "NTG-2018-2567",
    licenseIssued: "2018-09-10",
    licenseExpiry: "2028-09-09",
    trustTier: "bronze",
    completedTreks: 32,
    altitudeExperience: "5500m+",
    bio: "Young but experienced, I bring energy and enthusiasm to every trek. Certified wilderness first responder and Leave No Trace trainer.",
  },
];

export const MOCK_REVIEWS = [
  {
    id: "1",
    guideId: "1",
    touristName: "Emma Schmidt",
    touristCountry: "Germany",
    rating: 5,
    trek: "Everest Base Camp",
    date: "2024-01-15",
    verifiedTrek: true,
    comment:
      "Tenzing was absolutely fantastic! His knowledge of the region and culture made our trek unforgettable. Highly recommend!",
    photos: ["/reviews/review1-1.jpg", "/reviews/review1-2.jpg"],
  },
  {
    id: "2",
    guideId: "1",
    touristName: "Marco Rossi",
    touristCountry: "Italy",
    rating: 5,
    trek: "Langtang Valley",
    date: "2024-02-20",
    verifiedTrek: true,
    comment:
      "Best guide I've ever had. Very professional and caring. Made sure everyone in our group was safe and happy.",
    photos: [],
  },
  {
    id: "3",
    guideId: "2",
    touristName: "Hans Mueller",
    touristCountry: "Switzerland",
    rating: 4,
    trek: "Annapurna Circuit",
    date: "2024-01-05",
    verifiedTrek: true,
    comment:
      "Great experience overall. Pemba knows the trails very well and speaks excellent German.",
    photos: ["/reviews/review3-1.jpg"],
  },
];

export const MOCK_BOOKINGS = [
  {
    id: "1",
    guideId: "1",
    guideName: "Tenzing Sherpa",
    touristName: "Emma Schmidt",
    region: "Everest Base Camp",
    startDate: "2024-03-15",
    endDate: "2024-03-28",
    days: 14,
    status: "confirmed",
    totalAmount: 630,
    groupSize: 2,
    services: ["porter", "tims"],
  },
  {
    id: "2",
    guideId: "1",
    guideName: "Tenzing Sherpa",
    touristName: "Marco Rossi",
    region: "Annapurna Circuit",
    startDate: "2024-04-02",
    endDate: "2024-04-14",
    days: 12,
    status: "pending",
    totalAmount: 540,
    groupSize: 1,
    services: ["tims"],
  },
  {
    id: "3",
    guideId: "2",
    guideName: "Pemba Dorje",
    touristName: "Yuki Tanaka",
    region: "Langtang Valley",
    startDate: "2024-04-20",
    endDate: "2024-04-27",
    days: 7,
    status: "completed",
    totalAmount: 315,
    groupSize: 3,
    services: ["porter", "tims", "domestic-flight"],
  },
];

export const MOCK_EARNINGS = [
  { month: "Jan", earnings: 1200, bookings: 3 },
  { month: "Feb", earnings: 890, bookings: 2 },
  { month: "Mar", earnings: 2340, bookings: 5 },
  { month: "Apr", earnings: 1800, bookings: 4 },
  { month: "May", earnings: 2100, bookings: 5 },
  { month: "Jun", earnings: 450, bookings: 1 },
  { month: "Jul", earnings: 0, bookings: 0 },
  { month: "Aug", earnings: 320, bookings: 1 },
  { month: "Sep", earnings: 1600, bookings: 4 },
  { month: "Oct", earnings: 2800, bookings: 6 },
  { month: "Nov", earnings: 3200, bookings: 7 },
  { month: "Dec", earnings: 1500, bookings: 3 },
];

export const NOTIFICATION_CATEGORIES = {
  booking: { label: "Bookings", icon: "Calendar", color: "text-primary" },
  system: { label: "System", icon: "Settings", color: "text-muted-foreground" },
  promotion: { label: "Promotions", icon: "Gift", color: "text-amber-500" },
};

export const MOCK_NOTIFICATIONS_CENTER = [
  {
    id: "1",
    category: "booking",
    title: "New booking request",
    message: "Emma Schmidt requested a 14-day trek to Everest Base Camp",
    time: "5 minutes ago",
    read: false,
  },
  {
    id: "2",
    category: "booking",
    title: "Booking confirmed",
    message: "Your booking with Marco Rossi has been confirmed",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "3",
    category: "system",
    title: "License expiring soon",
    message:
      "Your trekking license expires in 30 days. Please renew to maintain verified status.",
    time: "1 day ago",
    read: true,
  },
  {
    id: "4",
    category: "promotion",
    title: "Peak season approaching",
    message:
      "Update your availability for the upcoming peak trekking season (Oct-Nov)",
    time: "3 days ago",
    read: true,
  },
];
