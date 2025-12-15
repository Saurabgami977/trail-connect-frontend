import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function GuideCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border bg-card overflow-hidden", className)}>
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}

export function BookingCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4 p-4 rounded-xl border", className)}>
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-48" />
        <Skeleton className="h-3 w-24" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </div>
  );
}

export function ReviewSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("p-4 rounded-xl border space-y-3", className)}>
      <div className="flex items-start gap-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-28" />
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-4" />
              ))}
            </div>
          </div>
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      <Skeleton className="h-20 w-full" />
    </div>
  );
}

export function DashboardStatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="p-4 rounded-xl border">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

interface EmptyStateProps {
  icon: React.ElementType;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-sm mb-4">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="text-primary font-medium hover:underline"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

export function OfflineWarning() {
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 p-4 bg-amber-50 border border-amber-200 rounded-lg shadow-lg z-50">
      <div className="flex items-start gap-3">
        <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 animate-pulse" />
        <div>
          <h4 className="font-medium text-amber-800">You're offline</h4>
          <p className="text-sm text-amber-700 mt-1">
            Some features may be unavailable. Check your connection and try again.
          </p>
        </div>
      </div>
    </div>
  );
}
