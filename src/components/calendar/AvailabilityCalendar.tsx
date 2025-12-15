import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface AvailabilityCalendarProps {
  blockedDates?: Date[];
  bookedDates?: Date[];
  onBlockedDatesChange?: (dates: Date[]) => void;
  isEditable?: boolean;
  className?: string;
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const seasons = {
  peak: { label: "Peak Season", months: [2, 3, 4, 9, 10], color: "bg-emerald-500" },
  shoulder: { label: "Shoulder Season", months: [1, 5, 8, 11], color: "bg-amber-500" },
  offSeason: { label: "Off Season", months: [0, 6, 7], color: "bg-muted" },
};

export function AvailabilityCalendar({
  blockedDates = [],
  bookedDates = [],
  onBlockedDatesChange,
  isEditable = false,
  className,
}: AvailabilityCalendarProps) {
  const [view, setView] = useState<"month" | "season">("month");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const isBlocked = (date: Date) =>
    blockedDates.some(d => d.toDateString() === date.toDateString());
  
  const isBooked = (date: Date) =>
    bookedDates.some(d => d.toDateString() === date.toDateString());

  const getDateStatus = (date: Date) => {
    if (isBooked(date)) return "booked";
    if (isBlocked(date)) return "blocked";
    if (date < new Date()) return "past";
    return "available";
  };

  const handleDateSelect = (dates: Date[] | undefined) => {
    if (!isEditable || !onBlockedDatesChange) return;
    onBlockedDatesChange(dates || []);
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const getSeason = (month: number) => {
    if (seasons.peak.months.includes(month)) return seasons.peak;
    if (seasons.shoulder.months.includes(month)) return seasons.shoulder;
    return seasons.offSeason;
  };

  return (
    <TooltipProvider>
      <div className={cn("space-y-4", className)}>
        <Tabs value={view} onValueChange={(v) => setView(v as "month" | "season")}>
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="month" className="gap-2">
                <CalendarIcon className="h-4 w-4" />
                Monthly
              </TabsTrigger>
              <TabsTrigger value="season" className="gap-2">
                Seasonal View
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-medium min-w-[140px] text-center">
                {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </span>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="month" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Calendar
                mode="multiple"
                selected={blockedDates}
                onSelect={(dates) => handleDateSelect(dates || [])}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                className="rounded-lg border pointer-events-auto"
                disabled={(date) => date < new Date() || isBooked(date)}
              />
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    Calendar Legend
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>Guides can block dates when unavailable. Booked dates are automatically marked.</p>
                      </TooltipContent>
                    </Tooltip>
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-primary-foreground text-xs">15</div>
                      <span>Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-destructive/20 flex items-center justify-center text-destructive text-xs line-through">15</div>
                      <span>Booked (confirmed booking)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-amber-500/20 flex items-center justify-center text-amber-700 text-xs">15</div>
                      <span>Blocked by guide</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-muted flex items-center justify-center text-muted-foreground text-xs">15</div>
                      <span>Past date</span>
                    </div>
                  </div>
                </div>
                
                {isEditable && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Blocked Dates</h4>
                    {blockedDates.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {blockedDates.slice(0, 10).map((date, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </Badge>
                        ))}
                        {blockedDates.length > 10 && (
                          <Badge variant="outline" className="text-xs">
                            +{blockedDates.length - 10} more
                          </Badge>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        Click on dates to block them from bookings.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="season" className="mt-0">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4 mb-4">
                {Object.values(seasons).map((season) => (
                  <div key={season.label} className="flex items-center gap-2 text-sm">
                    <div className={cn("w-4 h-4 rounded", season.color)} />
                    <span>{season.label}</span>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {months.map((month, index) => {
                  const season = getSeason(index);
                  const date = new Date(currentMonth.getFullYear(), index, 1);
                  const isCurrentMonth = new Date().getMonth() === index && new Date().getFullYear() === currentMonth.getFullYear();
                  
                  return (
                    <Tooltip key={month}>
                      <TooltipTrigger asChild>
                        <div
                          className={cn(
                            "p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md",
                            isCurrentMonth && "ring-2 ring-primary"
                          )}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">{month.slice(0, 3)}</span>
                            <div className={cn("w-3 h-3 rounded-full", season.color)} />
                          </div>
                          <p className="text-xs text-muted-foreground">{season.label}</p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-medium">{month}</p>
                        <p className="text-xs">
                          {season.label === "Peak Season" && "Best trekking weather. Book early!"}
                          {season.label === "Shoulder Season" && "Good conditions, fewer crowds."}
                          {season.label === "Off Season" && "Monsoon/winter. Limited availability."}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
              
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <h4 className="font-medium text-sm mb-2">Peak Season Info</h4>
                <p className="text-xs text-muted-foreground">
                  Peak trekking seasons in Nepal are March-May (spring) and September-November (autumn). 
                  These months offer the best weather and clearest mountain views. Booking 2-3 months in advance is recommended.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </TooltipProvider>
  );
}
