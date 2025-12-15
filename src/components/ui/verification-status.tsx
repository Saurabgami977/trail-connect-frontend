import { CheckCircle, Clock, XCircle, Upload, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { VERIFICATION_STATUSES } from "@/lib/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type VerificationStep = "uploaded" | "under_review" | "verified" | "expired";

interface VerificationStatusProps {
  status: VerificationStep;
  showSteps?: boolean;
  className?: string;
}

const stepIcons = {
  uploaded: Upload,
  under_review: Clock,
  verified: CheckCircle,
  expired: XCircle,
};

const stepOrder: VerificationStep[] = ["uploaded", "under_review", "verified"];

export function VerificationStatus({ status, showSteps = true, className }: VerificationStatusProps) {
  const StatusIcon = stepIcons[status];
  const currentStatus = VERIFICATION_STATUSES[status];
  
  const getStepState = (step: VerificationStep) => {
    if (status === "expired") return step === "expired" ? "current" : "inactive";
    const currentIndex = stepOrder.indexOf(status);
    const stepIndex = stepOrder.indexOf(step);
    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "inactive";
  };

  if (!showSteps) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className={cn("w-2 h-2 rounded-full", currentStatus.color)} />
        <span className="text-sm font-medium">{currentStatus.label}</span>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className={cn("space-y-3", className)}>
        <div className="flex items-center justify-between">
          {stepOrder.map((step, index) => {
            const Icon = stepIcons[step];
            const state = getStepState(step);
            const stepInfo = VERIFICATION_STATUSES[step];
            
            return (
              <div key={step} className="flex items-center flex-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                          state === "completed" && "bg-emerald-500 text-white",
                          state === "current" && step === "verified" && "bg-emerald-500 text-white ring-4 ring-emerald-100",
                          state === "current" && step === "under_review" && "bg-amber-500 text-white ring-4 ring-amber-100",
                          state === "current" && step === "uploaded" && "bg-blue-500 text-white ring-4 ring-blue-100",
                          state === "inactive" && "bg-muted text-muted-foreground"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className={cn(
                        "text-xs mt-2 font-medium",
                        state === "current" ? "text-foreground" : "text-muted-foreground"
                      )}>
                        {stepInfo.label}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{stepInfo.description}</p>
                  </TooltipContent>
                </Tooltip>
                
                {index < stepOrder.length - 1 && (
                  <div className={cn(
                    "flex-1 h-1 mx-2 rounded-full",
                    getStepState(stepOrder[index + 1]) !== "inactive" ? "bg-emerald-500" : "bg-muted"
                  )} />
                )}
              </div>
            );
          })}
        </div>
        
        {status === "expired" && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            <XCircle className="h-4 w-4 flex-shrink-0" />
            <span>Your license has expired. Please renew to maintain verified status.</span>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}

interface LicenseMetadataProps {
  licenseNumber: string;
  issuedDate: string;
  expiryDate: string;
  className?: string;
}

export function LicenseMetadata({ licenseNumber, issuedDate, expiryDate, className }: LicenseMetadataProps) {
  const isExpiringSoon = new Date(expiryDate) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
  const isExpired = new Date(expiryDate) < new Date();
  
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg", className)}>
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide">License Number</p>
        <p className="font-mono font-medium text-foreground">{licenseNumber}</p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide">Issued Date</p>
        <p className="font-medium text-foreground">{new Date(issuedDate).toLocaleDateString()}</p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide">Expiry Date</p>
        <p className={cn(
          "font-medium",
          isExpired ? "text-red-600" : isExpiringSoon ? "text-amber-600" : "text-foreground"
        )}>
          {new Date(expiryDate).toLocaleDateString()}
          {isExpired && " (Expired)"}
          {!isExpired && isExpiringSoon && " (Expiring Soon)"}
        </p>
      </div>
    </div>
  );
}

interface TrustTierBadgeProps {
  tier: string;
  completedTreks: number;
  className?: string;
}

export function TrustTierBadge({ tier, completedTreks, className }: TrustTierBadgeProps) {
  const tiers: Record<string, { name: string; color: string; textColor: string }> = {
    bronze: { name: "Bronze Guide", color: "bg-amber-700", textColor: "text-white" },
    silver: { name: "Silver Guide", color: "bg-slate-400", textColor: "text-slate-900" },
    gold: { name: "Gold Guide", color: "bg-gradient-to-r from-amber-400 to-amber-500", textColor: "text-amber-900" },
    platinum: { name: "Platinum Guide", color: "bg-gradient-to-r from-slate-200 to-slate-300", textColor: "text-slate-800" },
  };
  
  const tierInfo = tiers[tier] || tiers.bronze;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold",
            tierInfo.color,
            tierInfo.textColor,
            className
          )}>
            <Shield className="h-3.5 w-3.5" />
            {tierInfo.name}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{completedTreks} completed treks</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
