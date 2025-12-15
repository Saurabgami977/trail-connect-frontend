"use client";

import { useState, useEffect } from "react";
import { FAKE_NOTIFICATIONS } from "@/lib/constants";
import { MapPin, CheckCircle } from "lucide-react";

const LiveNotificationBanner = () => {
  const [currentNotification, setCurrentNotification] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentNotification(
          (prev) => (prev + 1) % FAKE_NOTIFICATIONS.length
        );
        setIsVisible(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const notification = FAKE_NOTIFICATIONS[currentNotification];

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-sm">
      <div
        className={`bg-card border border-border shadow-xl rounded-xl p-4 transition-all duration-500 ${
          isVisible
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-full"
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-5 w-5 text-emerald-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">
              <span className="font-bold">{notification.name}</span> just booked
              a trip!
            </p>
            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>
                {notification.region} • {notification.days} days
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              with a licensed guide
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveNotificationBanner;
