// types/trekking.ts
export interface Region {
  id: string;
  name: string;
  description: string;
  location: string;
  difficulty: "Easy" | "Moderate" | "Challenging" | "Hard";
  duration: string;
  rating: number;
  guides: number;
  startingPrice: number;
}

export interface RegionDetails {
  description: string;
  seasonality: string[];
  altitudeRange: string;
  trekkingStyle: "Teahouse" | "Camping" | "Teahouse/Camping";
  crowdLevel:
    | "Very Low"
    | "Low"
    | "Low-Medium"
    | "Medium"
    | "Medium-High"
    | "High";
  culturalHighlights: string[];
  physicalDemand: number;
  scenicBeauty: number;
  culturalExperience: number;
}

export interface Guide {
  _id: string;
  user: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  dailyRate: number;
  verified: boolean;
  regions: string[];
  availability: string[];
  avgRating: number;
  certifications: string[];
  createdAt: string;
}

export type DifficultyFilter = "all" | "easy" | "moderate" | "challenging";
export type SeasonFilter = "all" | "spring" | "summer" | "autumn" | "winter";
export type AltitudeFilter = "all" | "low" | "medium" | "high";
export type SortOption = "popularity" | "name" | "difficulty" | "guides";

export interface RegionFilters {
  searchQuery: string;
  difficulty: DifficultyFilter;
  season: SeasonFilter;
  altitude: AltitudeFilter;
  sortBy: SortOption;
}
