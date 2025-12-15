import { Star, CheckCircle, ImageIcon, ThumbsUp, Flag } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  touristName: string;
  touristPhoto?: string;
  touristCountry: string;
  rating: number;
  trek: string;
  date: string;
  verifiedTrek: boolean;
  comment: string;
  photos?: string[];
  helpful?: number;
}

interface ReviewCardProps {
  review: Review;
  className?: string;
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={review.touristPhoto} />
            <AvatarFallback>
              {review.touristName.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{review.touristName}</h4>
                  {review.verifiedTrek && (
                    <Badge variant="verified" className="text-xs gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Verified Trek
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {review.touristCountry} • {new Date(review.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </p>
              </div>
              
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < review.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted"
                    )}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="region" className="text-xs">
                {review.trek}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground leading-relaxed">
              {review.comment}
            </p>
            
            {review.photos && review.photos.length > 0 && (
              <div className="flex gap-2 mt-3">
                {review.photos.slice(0, 3).map((photo, index) => (
                  <div
                    key={index}
                    className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden"
                  >
                    <ImageIcon className="h-6 w-6 text-muted-foreground" />
                  </div>
                ))}
                {review.photos.length > 3 && (
                  <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">
                      +{review.photos.length - 3}
                    </span>
                  </div>
                )}
              </div>
            )}
            
            <div className="flex items-center gap-4 mt-4 pt-4 border-t">
              <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground h-8">
                <ThumbsUp className="h-3.5 w-3.5" />
                Helpful ({review.helpful || 0})
              </Button>
              <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground h-8">
                <Flag className="h-3.5 w-3.5" />
                Report
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface RatingSummaryProps {
  rating: number;
  reviewCount: number;
  breakdown?: { stars: number; count: number }[];
  className?: string;
}

export function RatingSummary({ rating, reviewCount, breakdown, className }: RatingSummaryProps) {
  const defaultBreakdown = breakdown || [
    { stars: 5, count: Math.floor(reviewCount * 0.7) },
    { stars: 4, count: Math.floor(reviewCount * 0.2) },
    { stars: 3, count: Math.floor(reviewCount * 0.07) },
    { stars: 2, count: Math.floor(reviewCount * 0.02) },
    { stars: 1, count: Math.floor(reviewCount * 0.01) },
  ];
  
  return (
    <div className={cn("flex gap-8", className)}>
      <div className="text-center">
        <div className="text-5xl font-bold text-foreground">{rating}</div>
        <div className="flex items-center justify-center gap-0.5 my-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-5 w-5",
                i < Math.round(rating)
                  ? "fill-amber-400 text-amber-400"
                  : "text-muted"
              )}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">{reviewCount} reviews</p>
      </div>
      
      <div className="flex-1 space-y-2">
        {defaultBreakdown.map(({ stars, count }) => {
          const percentage = reviewCount > 0 ? (count / reviewCount) * 100 : 0;
          return (
            <div key={stars} className="flex items-center gap-2 text-sm">
              <span className="w-3">{stars}</span>
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-8 text-muted-foreground text-right">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface GuideLeaderboardProps {
  region?: string;
  className?: string;
}

export function GuideLeaderboard({ region, className }: GuideLeaderboardProps) {
  const leaders = [
    { rank: 1, name: "Karma Lama", rating: 5.0, treks: 124, avatar: "" },
    { rank: 2, name: "Tenzing Sherpa", rating: 4.9, treks: 87, avatar: "" },
    { rank: 3, name: "Pemba Dorje", rating: 4.8, treks: 56, avatar: "" },
    { rank: 4, name: "Dawa Gyalje", rating: 4.8, treks: 45, avatar: "" },
    { rank: 5, name: "Mingma Tamang", rating: 4.7, treks: 32, avatar: "" },
  ];
  
  const rankColors: Record<number, string> = {
    1: "bg-amber-400 text-amber-900",
    2: "bg-slate-300 text-slate-800",
    3: "bg-amber-700 text-white",
  };

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-4">
          Top Guides {region && `in ${region}`}
        </h3>
        <div className="space-y-3">
          {leaders.map((leader) => (
            <div
              key={leader.rank}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                  rankColors[leader.rank] || "bg-muted text-muted-foreground"
                )}
              >
                {leader.rank}
              </div>
              <Avatar className="h-8 w-8">
                <AvatarImage src={leader.avatar} />
                <AvatarFallback className="text-xs">
                  {leader.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{leader.name}</p>
                <p className="text-xs text-muted-foreground">{leader.treks} treks</p>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="text-sm font-medium">{leader.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
