// types/trek.ts
export interface Trek {
  id: string;
  title: string;
  description: string;
  regionId: string;
  difficulty: "Easy" | "Moderate" | "Challenging" | "Hard";
  duration: number; // days
  startDate: Date;
  endDate: Date;
  maxParticipants: number;
  currentParticipants: number;
  isPublic: boolean;
  status: "draft" | "open" | "full" | "confirmed" | "completed" | "cancelled";
  createdBy: string;
  createdAt: Date;
  totalCost: number;
  costPerPerson: number;
  itinerary: Day[];
  services: Service[];
  participants: Participant[];
  guides: GuideAssignment[];
  requests: GuideRequest[];
}

export interface Day {
  day: number;
  title: string;
  description: string;
  altitude: number;
  distance: number;
  duration: string;
  accommodation: string;
  meals: string[];
  highlights: string[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: "mandatory" | "optional" | "upgrade";
  price: number;
  perPerson: boolean;
  selected: boolean;
}

export interface Participant {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: "creator" | "participant";
  joinedAt: Date;
  paidAmount: number;
  paymentStatus: "pending" | "partial" | "full" | "refunded";
}

export interface GuideAssignment {
  guideId: string;
  name: string;
  dailyRate: number;
  assignedDays: number;
  totalCost: number;
  status: "pending" | "confirmed" | "rejected";
}

export interface GuideRequest {
  guideId: string;
  name: string;
  message: string;
  proposedRate: number;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
}

export interface CostBreakdown {
  basePrice: number;
  guideFees: number;
  permits: number;
  insurance: number;
  transport: number;
  accommodation: number;
  meals: number;
  platformFee: number;
  optionalServices: number;
  total: number;
}
