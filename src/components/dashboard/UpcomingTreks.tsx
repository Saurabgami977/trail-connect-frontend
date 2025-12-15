import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, MapPin, Users, ChevronRight, Clock, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface Trek {
  id: string;
  touristName: string;
  touristPhoto?: string;
  region: string;
  startDate: string;
  endDate: string;
  daysUntil: number;
  groupSize: number;
  status: "upcoming" | "in_progress" | "completed";
}

const mockUpcomingTreks: Trek[] = [
  {
    id: "1",
    touristName: "Emma Schmidt",
    region: "Everest Base Camp",
    startDate: "2024-03-15",
    endDate: "2024-03-28",
    daysUntil: 5,
    groupSize: 2,
    status: "upcoming",
  },
  {
    id: "2",
    touristName: "Marco Rossi",
    region: "Annapurna Circuit",
    startDate: "2024-03-20",
    endDate: "2024-04-01",
    daysUntil: 10,
    groupSize: 1,
    status: "upcoming",
  },
  {
    id: "3",
    touristName: "Yuki Tanaka",
    region: "Langtang Valley",
    startDate: "2024-03-10",
    endDate: "2024-03-17",
    daysUntil: 0,
    groupSize: 3,
    status: "in_progress",
  },
];

interface UpcomingTreksProps {
  className?: string;
}

export function UpcomingTreks({ className }: UpcomingTreksProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Upcoming Treks</CardTitle>
          <Button variant="ghost" size="sm" className="gap-1">
            View All
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
          
          <div className="space-y-6">
            {mockUpcomingTreks.map((trek, index) => (
              <div key={trek.id} className="relative pl-10">
                {/* Timeline dot */}
                <div
                  className={cn(
                    "absolute left-2.5 w-3 h-3 rounded-full border-2 border-background",
                    trek.status === "in_progress" && "bg-emerald-500 ring-4 ring-emerald-100",
                    trek.status === "upcoming" && trek.daysUntil <= 3 && "bg-amber-500",
                    trek.status === "upcoming" && trek.daysUntil > 3 && "bg-primary"
                  )}
                />
                
                <div className="flex items-start gap-4 p-4 rounded-xl border bg-card hover:shadow-md transition-shadow">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={trek.touristPhoto} />
                    <AvatarFallback>{trek.touristName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-medium text-foreground">{trek.touristName}</h4>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          {trek.region}
                        </div>
                      </div>
                      <Badge
                        variant={
                          trek.status === "in_progress"
                            ? "verified"
                            : trek.daysUntil <= 3
                            ? "pending"
                            : "secondary"
                        }
                      >
                        {trek.status === "in_progress"
                          ? "In Progress"
                          : trek.daysUntil === 0
                          ? "Today"
                          : `In ${trek.daysUntil} days`}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(trek.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} - {new Date(trek.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {trek.groupSize} {trek.groupSize === 1 ? "person" : "people"}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-3">
                      <Button size="sm" variant="outline" className="h-8 gap-1">
                        <MessageSquare className="h-3.5 w-3.5" />
                        Message
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ServiceUpsellProps {
  className?: string;
}

export function ServiceUpsell({ className }: ServiceUpsellProps) {
  const suggestions = [
    {
      title: "Add Porter Service",
      description: "70% of your bookings include porter service. Consider promoting it!",
      action: "Enable Suggestion",
      icon: Users,
    },
    {
      title: "Peak Season Pricing",
      description: "Update your rates for October-November peak season",
      action: "Update Rates",
      icon: Calendar,
    },
    {
      title: "Quick Response",
      description: "Respond within 1 hour to increase booking rate by 40%",
      action: "View Messages",
      icon: Clock,
    },
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-base">Suggestions to Grow</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <suggestion.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm">{suggestion.title}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">{suggestion.description}</p>
              <Button variant="link" size="sm" className="h-auto p-0 mt-1 text-xs">
                {suggestion.action}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
