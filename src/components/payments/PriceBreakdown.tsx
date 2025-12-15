import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Info, Shield, CreditCard, Lock, DollarSign, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface PriceBreakdownProps {
  dailyRate: number;
  days: number;
  groupSize: number;
  services: { name: string; price: number }[];
  isPeakSeason?: boolean;
  className?: string;
}

const currencies = [
  { code: "USD", symbol: "$", rate: 1, name: "US Dollar" },
  { code: "EUR", symbol: "€", rate: 0.92, name: "Euro" },
  { code: "GBP", symbol: "£", rate: 0.79, name: "British Pound" },
  { code: "AUD", symbol: "A$", rate: 1.53, name: "Australian Dollar" },
  { code: "NPR", symbol: "रू", rate: 133.5, name: "Nepalese Rupee" },
];

export function PriceBreakdownModal({
  dailyRate,
  days,
  groupSize,
  services,
  isPeakSeason = false,
  className,
}: PriceBreakdownProps) {
  const [currency, setCurrency] = useState("USD");
  const selectedCurrency = currencies.find(c => c.code === currency) || currencies[0];
  
  const convert = (amount: number) => {
    const converted = amount * selectedCurrency.rate;
    return `${selectedCurrency.symbol}${converted.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };

  const guideTotal = dailyRate * days * groupSize;
  const serviceTotal = services.reduce((sum, s) => sum + s.price, 0) * groupSize;
  const platformFee = Math.round(guideTotal * 0.05);
  const grandTotal = guideTotal + serviceTotal + platformFee;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className={cn("gap-1", className)}>
          <Info className="h-4 w-4" />
          View Price Breakdown
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Price Breakdown
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="w-32">
                <Globe className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((c) => (
                  <SelectItem key={c.code} value={c.code}>
                    {c.code} - {c.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Guide Rate */}
          <div className="p-4 bg-muted/50 rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Guide Rate</span>
              {isPeakSeason && (
                <Badge variant="accent" className="text-xs">Peak Season</Badge>
              )}
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{convert(dailyRate)}/day × {days} days × {groupSize} {groupSize === 1 ? "person" : "people"}</span>
              <span className="font-medium text-foreground">{convert(guideTotal)}</span>
            </div>
          </div>
          
          {/* Services */}
          {services.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Additional Services</h4>
              {services.map((service, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{service.name} × {groupSize}</span>
                  <span>{convert(service.price * groupSize)}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm pt-2 border-t">
                <span className="text-muted-foreground">Services Subtotal</span>
                <span className="font-medium">{convert(serviceTotal)}</span>
              </div>
            </div>
          )}
          
          {/* Platform Fee */}
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              Platform Fee (5%)
              <Info className="h-3 w-3" />
            </span>
            <span>{convert(platformFee)}</span>
          </div>
          
          {/* Total */}
          <div className="flex justify-between items-center pt-4 border-t">
            <span className="font-bold text-lg">Total</span>
            <span className="font-bold text-2xl text-primary">{convert(grandTotal)}</span>
          </div>
          
          {currency !== "USD" && (
            <p className="text-xs text-muted-foreground text-center">
              Approximate conversion. Final charge will be in USD.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function EscrowExplanation({ className }: { className?: string }) {
  return (
    <div className={cn("p-4 bg-emerald-50 border border-emerald-200 rounded-lg", className)}>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
          <Shield className="h-5 w-5 text-emerald-600" />
        </div>
        <div>
          <h4 className="font-semibold text-emerald-800">Secure Escrow Payment</h4>
          <p className="text-sm text-emerald-700 mt-1">
            Your payment is held securely until your trek begins. If your guide cancels, 
            you'll receive a full refund automatically.
          </p>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-emerald-700">
              <Lock className="h-4 w-4" />
              <span>256-bit SSL encryption</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-emerald-700">
              <CreditCard className="h-4 w-4" />
              <span>Major credit cards & PayPal accepted</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-emerald-700">
              <DollarSign className="h-4 w-4" />
              <span>Full refund if guide cancels</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CurrencySelector({ className }: { className?: string }) {
  const [currency, setCurrency] = useState("USD");

  return (
    <Select value={currency} onValueChange={setCurrency}>
      <SelectTrigger className={cn("w-[120px]", className)}>
        <Globe className="h-4 w-4 mr-2" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((c) => (
          <SelectItem key={c.code} value={c.code}>
            <span className="flex items-center gap-2">
              <span className="font-medium">{c.code}</span>
              <span className="text-muted-foreground">{c.symbol}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
