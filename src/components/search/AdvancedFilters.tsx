import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import {
  SlidersHorizontal,
  ArrowUpDown,
  ChevronDown,
  X,
  Mountain,
  Star,
  DollarSign,
  Clock,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TREKKING_REGIONS, LANGUAGES, DIFFICULTY_LEVELS } from "@/lib/constants";

interface FiltersState {
  experienceRange: [number, number];
  priceRange: [number, number];
  difficulty: string[];
  altitudeExperience: string[];
  languages: string[];
  regions: string[];
}

interface AdvancedFiltersProps {
  onFiltersChange?: (filters: FiltersState) => void;
  onSortChange?: (sort: string) => void;
  activeFiltersCount?: number;
}

const sortOptions = [
  { value: "rating-desc", label: "Highest Rated", icon: Star },
  { value: "price-asc", label: "Price: Low to High", icon: DollarSign },
  { value: "price-desc", label: "Price: High to Low", icon: DollarSign },
  { value: "experience-desc", label: "Most Experienced", icon: Clock },
  { value: "bookings-desc", label: "Most Booked", icon: Star },
];

const altitudeOptions = [
  { value: "5000m", label: "Up to 5,000m" },
  { value: "6000m", label: "Up to 6,000m" },
  { value: "7000m", label: "Up to 7,000m" },
  { value: "8000m+", label: "8,000m+ (Expedition)" },
];

export function AdvancedFilters({ onFiltersChange, onSortChange, activeFiltersCount = 0 }: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [sort, setSort] = useState("rating-desc");
  const [filters, setFilters] = useState<FiltersState>({
    experienceRange: [0, 20],
    priceRange: [20, 100],
    difficulty: [],
    altitudeExperience: [],
    languages: [],
    regions: [],
  });

  const updateFilter = <K extends keyof FiltersState>(key: K, value: FiltersState[K]) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const toggleArrayFilter = (key: "difficulty" | "altitudeExperience" | "languages" | "regions", value: string) => {
    const current = filters[key];
    const newValue = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    updateFilter(key, newValue);
  };

  const clearFilters = () => {
    const defaultFilters: FiltersState = {
      experienceRange: [0, 20],
      priceRange: [20, 100],
      difficulty: [],
      altitudeExperience: [],
      languages: [],
      regions: [],
    };
    setFilters(defaultFilters);
    onFiltersChange?.(defaultFilters);
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    onSortChange?.(value);
  };

  const countActiveFilters = () => {
    let count = 0;
    if (filters.experienceRange[0] > 0 || filters.experienceRange[1] < 20) count++;
    if (filters.priceRange[0] > 20 || filters.priceRange[1] < 100) count++;
    count += filters.difficulty.length;
    count += filters.altitudeExperience.length;
    count += filters.languages.length;
    count += filters.regions.length;
    return count;
  };

  const activeCount = countActiveFilters();

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Sort Dropdown */}
      <Select value={sort} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[180px]">
          <ArrowUpDown className="h-4 w-4 mr-2" />
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <span className="flex items-center gap-2">
                <option.icon className="h-4 w-4" />
                {option.label}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Filter Sheet Trigger */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeCount > 0 && (
              <Badge variant="default" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                {activeCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <div className="flex items-center justify-between">
              <SheetTitle>Filters</SheetTitle>
              {activeCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
                  Clear all
                </Button>
              )}
            </div>
          </SheetHeader>
          
          <div className="space-y-6 py-6">
            {/* Experience Range */}
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
                <span className="font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Experience (years)
                </span>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4">
                <div className="space-y-4">
                  <Slider
                    value={filters.experienceRange}
                    onValueChange={(value) => updateFilter("experienceRange", value as [number, number])}
                    min={0}
                    max={20}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{filters.experienceRange[0]} years</span>
                    <span>{filters.experienceRange[1]}+ years</span>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Price Range */}
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
                <span className="font-medium flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Daily Rate (USD)
                </span>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4">
                <div className="space-y-4">
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value) => updateFilter("priceRange", value as [number, number])}
                    min={20}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}+</span>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Trek Difficulty */}
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
                <span className="font-medium flex items-center gap-2">
                  <Mountain className="h-4 w-4" />
                  Trek Difficulty
                </span>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4">
                <div className="space-y-2">
                  {DIFFICULTY_LEVELS.map((level) => (
                    <div
                      key={level.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                      onClick={() => toggleArrayFilter("difficulty", level.id)}
                    >
                      <Checkbox checked={filters.difficulty.includes(level.id)} />
                      <div className="flex-1">
                        <span className={cn("font-medium text-sm", level.color)}>{level.name}</span>
                        <p className="text-xs text-muted-foreground">{level.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Altitude Experience */}
            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
                <span className="font-medium flex items-center gap-2">
                  <Mountain className="h-4 w-4" />
                  Altitude Experience
                </span>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4">
                <div className="space-y-2">
                  {altitudeOptions.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                      onClick={() => toggleArrayFilter("altitudeExperience", option.value)}
                    >
                      <Checkbox checked={filters.altitudeExperience.includes(option.value)} />
                      <span className="text-sm">{option.label}</span>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Regions */}
            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
                <span className="font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Regions
                </span>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4">
                <div className="space-y-2">
                  {TREKKING_REGIONS.map((region) => (
                    <div
                      key={region.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                      onClick={() => toggleArrayFilter("regions", region.name)}
                    >
                      <Checkbox checked={filters.regions.includes(region.name)} />
                      <span className="text-sm">{region.name}</span>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Languages */}
            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
                <span className="font-medium">Languages</span>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4">
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map((lang) => (
                    <Badge
                      key={lang}
                      variant={filters.languages.includes(lang) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleArrayFilter("languages", lang)}
                    >
                      {lang}
                    </Badge>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div className="sticky bottom-0 bg-background border-t pt-4">
            <Button className="w-full" onClick={() => setIsOpen(false)}>
              Show Results
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Active Filter Tags */}
      {filters.difficulty.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {filters.difficulty.map((d) => (
            <Badge key={d} variant="secondary" className="gap-1">
              {DIFFICULTY_LEVELS.find(l => l.id === d)?.name}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => toggleArrayFilter("difficulty", d)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

interface MapDiscoveryProps {
  className?: string;
}

export function MapDiscovery({ className }: MapDiscoveryProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const regionPositions: Record<string, { x: number; y: number }> = {
    everest: { x: 75, y: 35 },
    annapurna: { x: 35, y: 45 },
    langtang: { x: 55, y: 25 },
    manaslu: { x: 45, y: 35 },
    mustang: { x: 30, y: 30 },
    kanchenjunga: { x: 90, y: 40 },
  };

  return (
    <div className={cn("relative bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl overflow-hidden", className)}>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-10" />
      
      <div className="relative p-6">
        <h3 className="font-semibold mb-4">Explore by Region</h3>
        
        <div className="relative aspect-[16/9] bg-gradient-to-b from-blue-50 to-emerald-50 rounded-xl overflow-hidden border">
          {/* Simple Nepal outline representation */}
          <svg viewBox="0 0 100 60" className="w-full h-full">
            <path
              d="M10,30 L20,20 L40,15 L60,20 L80,25 L95,35 L85,45 L70,50 L50,48 L30,50 L15,45 L10,30 Z"
              fill="hsl(var(--primary) / 0.1)"
              stroke="hsl(var(--primary) / 0.3)"
              strokeWidth="0.5"
            />
            
            {/* Mountain range indication */}
            <path
              d="M25,25 L30,18 L35,25 L40,15 L45,25 L50,20 L55,25 L60,18 L65,25 L70,22 L75,28"
              fill="none"
              stroke="hsl(var(--primary) / 0.5)"
              strokeWidth="0.3"
            />
          </svg>
          
          {/* Region markers */}
          {TREKKING_REGIONS.map((region) => {
            const pos = regionPositions[region.id];
            const isSelected = selectedRegion === region.id;
            
            return (
              <div
                key={region.id}
                className={cn(
                  "absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all z-10",
                  isSelected && "z-20"
                )}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                onClick={() => setSelectedRegion(isSelected ? null : region.id)}
              >
                <div
                  className={cn(
                    "w-4 h-4 rounded-full bg-primary shadow-lg transition-all",
                    isSelected && "w-6 h-6 ring-4 ring-primary/30"
                  )}
                />
                {isSelected && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-40 bg-background border rounded-lg shadow-xl p-3 text-center">
                    <p className="font-medium text-sm">{region.name}</p>
                    <p className="text-xs text-muted-foreground">{region.difficulty}</p>
                    <Button size="sm" className="mt-2 w-full text-xs h-7">
                      View Guides
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <p className="text-xs text-muted-foreground text-center mt-4">
          Click on a region to explore available guides
        </p>
      </div>
    </div>
  );
}
