import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Calendar as CalendarIcon,
  User,
  Package,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Users,
  HelpCircle,
  Plane,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EXTRA_SERVICES, SERVICE_BUNDLES } from "@/lib/constants";

interface BookingFlowProps {
  guide: {
    id: string;
    name: string;
    dailyRate: number;
    peakRate?: number;
    rating: number;
  };
  onComplete?: (booking: BookingDetails) => void;
}

interface BookingDetails {
  dates: Date[];
  groupSize: number;
  services: string[];
  bundle?: string;
}

const steps = [
  { id: "dates", label: "Select Dates", icon: CalendarIcon },
  { id: "group", label: "Group Size", icon: Users },
  { id: "extras", label: "Extras", icon: Package },
  { id: "confirm", label: "Confirm", icon: CheckCircle },
];

const serviceIcons: Record<string, React.ElementType> = {
  "domestic-flight": Plane,
  "return-flight": Plane,
  "porter": Users,
  "tims": FileText,
};

export function BookingFlow({ guide, onComplete }: BookingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [groupSize, setGroupSize] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null);

  const totalDays = selectedDates.length;
  const isPeakSeason = selectedDates.some(date => {
    const month = date.getMonth();
    return month === 9 || month === 10 || month === 2 || month === 3 || month === 4;
  });
  const dailyRate = isPeakSeason && guide.peakRate ? guide.peakRate : guide.dailyRate;
  
  const calculateServicePrice = () => {
    if (selectedBundle) {
      const bundle = SERVICE_BUNDLES.find(b => b.id === selectedBundle);
      if (bundle) {
        const basePrice = bundle.services.reduce((sum, sId) => {
          const service = EXTRA_SERVICES.find(s => s.id === sId);
          return sum + (service?.price || 0);
        }, 0);
        return basePrice * (1 - bundle.discount / 100) * groupSize;
      }
    }
    return selectedServices.reduce((sum, sId) => {
      const service = EXTRA_SERVICES.find(s => s.id === sId);
      return sum + (service?.price || 0);
    }, 0) * groupSize;
  };

  const basePrice = totalDays * dailyRate * groupSize;
  const servicePrice = calculateServicePrice();
  const totalPrice = basePrice + servicePrice;

  const toggleService = (serviceId: string) => {
    setSelectedBundle(null);
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(s => s !== serviceId)
        : [...prev, serviceId]
    );
  };

  const selectBundle = (bundleId: string) => {
    const bundle = SERVICE_BUNDLES.find(b => b.id === bundleId);
    if (bundle) {
      setSelectedBundle(bundleId);
      setSelectedServices(bundle.services);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return selectedDates.length >= 2;
      case 1: return groupSize > 0;
      case 2: return true;
      case 3: return true;
      default: return false;
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete?.({ dates: selectedDates, groupSize, services: selectedServices, bundle: selectedBundle || undefined });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Check if a date is booked (mock data)
  const isDateBooked = (date: Date) => {
    const bookedDates = [
      new Date(2025, 0, 15), new Date(2025, 0, 16), new Date(2025, 0, 17),
      new Date(2025, 1, 5), new Date(2025, 1, 6), new Date(2025, 1, 7),
    ];
    return bookedDates.some(d => d.toDateString() === date.toDateString());
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Step Indicator */}
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                      isCompleted && "bg-primary text-primary-foreground",
                      isActive && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                      !isActive && !isCompleted && "bg-muted text-muted-foreground"
                    )}
                  >
                    {isCompleted ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <span className={cn(
                    "text-xs mt-2 font-medium text-center hidden sm:block",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {step.label}
                  </span>
                </div>
                
                {index < steps.length - 1 && (
                  <div className={cn(
                    "flex-1 h-1 mx-2 rounded-full",
                    index < currentStep ? "bg-primary" : "bg-muted"
                  )} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <Card>
          <CardContent className="pt-6">
            {currentStep === 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Select Your Trek Dates</h3>
                  {isPeakSeason && (
                    <Badge variant="accent" className="gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Peak Season Rates
                    </Badge>
                  )}
                </div>
                
                <div className="flex flex-col lg:flex-row gap-4">
                  <Calendar
                    mode="multiple"
                    selected={selectedDates}
                    onSelect={(dates) => setSelectedDates(dates || [])}
                    className="rounded-lg border pointer-events-auto"
                    disabled={(date) => date < new Date() || isDateBooked(date)}
                    modifiers={{
                      booked: (date) => isDateBooked(date),
                    }}
                    modifiersStyles={{
                      booked: { backgroundColor: "hsl(var(--destructive) / 0.1)", color: "hsl(var(--destructive))" }
                    }}
                  />
                  
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-4 h-4 rounded bg-primary" />
                        <span>Selected</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-4 h-4 rounded bg-destructive/20" />
                        <span>Booked</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-4 h-4 rounded bg-muted" />
                        <span>Available</span>
                      </div>
                    </div>
                    
                    {selectedDates.length > 0 && (
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Selected Duration</p>
                        <p className="text-2xl font-bold text-primary">{selectedDates.length} days</p>
                        {selectedDates.length < 2 && (
                          <p className="text-xs text-amber-600 mt-2">Select at least 2 days to continue</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="font-semibold">Group Size & Difficulty</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Number of Trekkers</label>
                    <Select value={String(groupSize)} onValueChange={(v) => setGroupSize(Number(v))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                          <SelectItem key={n} value={String(n)}>{n} {n === 1 ? "person" : "people"}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Rate applies per group, not per person
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Trek Difficulty</label>
                    <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-orange-500" />
                        <span className="font-medium text-orange-600">Challenging</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Good fitness required. Previous trekking experience recommended.
                      </p>
                    </div>
                  </div>
                </div>
                
                {groupSize > 4 && (
                  <div className="flex items-start gap-2 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800">
                    <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium">Large Group</p>
                      <p>Groups larger than 4 may need additional porters. We recommend adding porter service.</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="font-semibold">Optional Services</h3>
                
                {/* Service Bundles */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-muted-foreground">Service Bundles (Save More)</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {SERVICE_BUNDLES.map((bundle) => (
                      <div
                        key={bundle.id}
                        onClick={() => selectBundle(bundle.id)}
                        className={cn(
                          "p-4 rounded-lg border-2 cursor-pointer transition-all",
                          selectedBundle === bundle.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-sm">{bundle.name}</h4>
                          <Badge variant="accent" className="text-xs">-{bundle.discount}%</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{bundle.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or select individually</span>
                  </div>
                </div>
                
                {/* Individual Services */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {EXTRA_SERVICES.map((service) => {
                    const Icon = serviceIcons[service.id] || Package;
                    const isSelected = selectedServices.includes(service.id);
                    
                    return (
                      <div
                        key={service.id}
                        onClick={() => toggleService(service.id)}
                        className={cn(
                          "flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all",
                          isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        )}
                      >
                        <Checkbox checked={isSelected} className="mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium text-sm">{service.name}</span>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p>{service.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{service.description}</p>
                        </div>
                        <span className="font-medium text-primary text-sm">+${service.price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="font-semibold">Booking Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{guide.name}</p>
                        <p className="text-sm text-muted-foreground">Licensed Guide</p>
                      </div>
                    </div>
                    <Badge variant="verified">Verified</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="text-xl font-bold">{totalDays} days</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground">Group Size</p>
                      <p className="text-xl font-bold">{groupSize} {groupSize === 1 ? "person" : "people"}</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        ${dailyRate}/day × {totalDays} days × {groupSize} {groupSize === 1 ? "person" : "people"}
                      </span>
                      <span>${basePrice}</span>
                    </div>
                    {selectedServices.length > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Services ({selectedServices.length})
                          {selectedBundle && " (Bundle discount applied)"}
                        </span>
                        <span>${servicePrice.toFixed(0)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total</span>
                      <span className="text-primary">${totalPrice.toFixed(0)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
          
          <Button
            onClick={nextStep}
            disabled={!canProceed()}
            className="gap-2"
          >
            {currentStep === steps.length - 1 ? "Request Booking" : "Continue"}
            {currentStep < steps.length - 1 && <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
}

interface BookingSummarySidebarProps {
  guide: {
    name: string;
    dailyRate: number;
    peakRate?: number;
  };
  selectedDates: Date[];
  groupSize: number;
  selectedServices: string[];
  urgencyMessage?: string;
}

export function BookingSummarySidebar({
  guide,
  selectedDates,
  groupSize,
  selectedServices,
  urgencyMessage,
}: BookingSummarySidebarProps) {
  const totalDays = selectedDates.length;
  const isPeakSeason = selectedDates.some(date => {
    const month = date.getMonth();
    return month === 9 || month === 10 || month === 2 || month === 3 || month === 4;
  });
  const dailyRate = isPeakSeason && guide.peakRate ? guide.peakRate : guide.dailyRate;
  
  const servicePrice = selectedServices.reduce((sum, sId) => {
    const service = EXTRA_SERVICES.find(s => s.id === sId);
    return sum + (service?.price || 0);
  }, 0) * groupSize;
  
  const basePrice = totalDays * dailyRate * groupSize;
  const totalPrice = basePrice + servicePrice;

  return (
    <Card className="sticky top-24">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Booking Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 pb-4 border-b">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium">{guide.name}</p>
            <p className="text-sm text-muted-foreground">${dailyRate}/day {isPeakSeason && "(Peak)"}</p>
          </div>
        </div>
        
        {totalDays > 0 ? (
          <>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span>{totalDays} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Group size</span>
                <span>{groupSize} {groupSize === 1 ? "person" : "people"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Base rate</span>
                <span>${basePrice}</span>
              </div>
              {servicePrice > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Services</span>
                  <span>+${servicePrice}</span>
                </div>
              )}
            </div>
            
            <div className="flex justify-between font-bold text-lg pt-4 border-t">
              <span>Total</span>
              <span className="text-primary">${totalPrice}</span>
            </div>
          </>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            Select dates to see pricing
          </p>
        )}
        
        {urgencyMessage && (
          <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            <span>{urgencyMessage}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
