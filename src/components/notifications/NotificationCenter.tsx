import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Bell,
  Calendar,
  Settings,
  Gift,
  Check,
  Trash2,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_NOTIFICATIONS_CENTER, NOTIFICATION_CATEGORIES } from "@/lib/constants";

const categoryIcons: Record<string, React.ElementType> = {
  booking: Calendar,
  system: Settings,
  promotion: Gift,
};

interface NotificationCenterProps {
  className?: string;
}

export function NotificationCenter({ className }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS_CENTER);
  const [isOpen, setIsOpen] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };
  
  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className={cn("relative", className)}>
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs h-7">
              Mark all as read
            </Button>
          )}
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b h-auto p-0 bg-transparent">
            <TabsTrigger
              value="all"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              All
            </TabsTrigger>
            {Object.entries(NOTIFICATION_CATEGORIES).map(([key, cat]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <ScrollArea className="h-[400px]">
            <TabsContent value="all" className="m-0">
              <NotificationList
                notifications={notifications}
                onMarkAsRead={markAsRead}
                onDelete={deleteNotification}
              />
            </TabsContent>
            
            {Object.keys(NOTIFICATION_CATEGORIES).map((category) => (
              <TabsContent key={category} value={category} className="m-0">
                <NotificationList
                  notifications={notifications.filter(n => n.category === category)}
                  onMarkAsRead={markAsRead}
                  onDelete={deleteNotification}
                />
              </TabsContent>
            ))}
          </ScrollArea>
        </Tabs>
        
        <div className="p-3 border-t">
          <Button variant="ghost" className="w-full justify-between text-sm" onClick={() => setIsOpen(false)}>
            View All Notifications
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

interface NotificationListProps {
  notifications: typeof MOCK_NOTIFICATIONS_CENTER;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

function NotificationList({ notifications, onMarkAsRead, onDelete }: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <Bell className="h-10 w-10 mx-auto mb-3 opacity-50" />
        <p className="text-sm">No notifications</p>
      </div>
    );
  }

  return (
    <div className="divide-y">
      {notifications.map((notification) => {
        const Icon = categoryIcons[notification.category] || Bell;
        const categoryInfo = NOTIFICATION_CATEGORIES[notification.category as keyof typeof NOTIFICATION_CATEGORIES];
        
        return (
          <div
            key={notification.id}
            className={cn(
              "p-4 hover:bg-muted/50 transition-colors cursor-pointer group",
              !notification.read && "bg-primary/5"
            )}
            onClick={() => onMarkAsRead(notification.id)}
          >
            <div className="flex gap-3">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                notification.category === "booking" && "bg-primary/10 text-primary",
                notification.category === "system" && "bg-muted text-muted-foreground",
                notification.category === "promotion" && "bg-amber-100 text-amber-600"
              )}>
                <Icon className="h-4 w-4" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className={cn(
                    "text-sm",
                    !notification.read && "font-semibold"
                  )}>
                    {notification.title}
                  </h4>
                  {!notification.read && (
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                  {notification.message}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {notification.time}
                </p>
              </div>
              
              <div className="flex items-start gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {!notification.read && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={(e) => {
                      e.stopPropagation();
                      onMarkAsRead(notification.id);
                    }}
                  >
                    <Check className="h-3.5 w-3.5" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-destructive hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(notification.id);
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface UrgencyBannerProps {
  guidesLeft: number;
  region?: string;
  className?: string;
}

export function UrgencyBanner({ guidesLeft, region, className }: UrgencyBannerProps) {
  if (guidesLeft > 5) return null;
  
  return (
    <div className={cn(
      "flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm",
      className
    )}>
      <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
      <span className="font-medium">
        Only {guidesLeft} guides available {region && `for ${region}`} on your selected dates!
      </span>
    </div>
  );
}
