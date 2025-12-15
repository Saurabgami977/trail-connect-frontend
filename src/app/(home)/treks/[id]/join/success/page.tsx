// app/treks/[id]/join/success/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  Calendar,
  Mountain,
  Share2,
  Download,
  Mail,
  MessageCircle,
  Bell,
  Heart,
  Sparkles,
  TrendingUp,
  Gift,
  Clock,
  ThumbsUp,
  Trophy,
  PartyPopper,
  Facebook,
  Twitter,
  MessageCircleCode,
  Instagram,
  Copy,
  UsersRound,
  CreditCard,
  FileText,
  Smartphone,
  ShoppingBag,
  UserPlus,
  Eye,
  User,
  Phone,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function JoinSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState(50);
  const [copied, setCopied] = useState(false);

  // Mock data - in real app, fetch from API with booking ID
  const bookingData = {
    bookingId: "TRK-2026-00123",
    trekName: "Everest Base Camp - April Departure",
    region: "Everest Region",
    startDate: new Date("2026-04-15"),
    endDate: new Date("2026-04-28"),
    duration: 14,
    groupSize: 3,
    totalCost: 849,
    depositPaid: 169.8,
    remainingBalance: 679.2,
    paymentDueDate: new Date("2026-03-15"),
    organizerName: "Alex Johnson",
    organizerEmail: "alex@example.com",
    participants: [
      { name: "You", role: "Participant" },
      { name: "Sarah Miller", role: "Participant" },
      { name: "Raj Patel", role: "Participant" },
    ],
    nextSteps: [
      {
        title: "Check Email",
        description: "Booking confirmation sent",
        completed: true,
      },
      {
        title: "Join Group Chat",
        description: "Connect with fellow trekkers",
        completed: false,
      },
      {
        title: "Travel Insurance",
        description: "Upload proof within 7 days",
        completed: false,
      },
      {
        title: "Pre-trek Briefing",
        description: "Virtual meeting 2 weeks before",
        completed: false,
      },
    ],
  };

  // Countdown for auto-redirect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Auto-redirect to trek page
      router.push(`/treks/${searchParams.get("trekId") || "trek-1"}`);
    }
  }, [countdown, router, searchParams]);

  // Share booking
  const shareBooking = () => {
    const text = `I just booked the ${bookingData.trekName} trek! Join me on this adventure!`;
    const url =
      window.location.origin +
      `/treks/${searchParams.get("trekId") || "trek-1"}`;

    if (navigator.share) {
      navigator.share({
        title: "I booked a trek!",
        text: text,
        url: url,
      });
    } else {
      navigator.clipboard.writeText(`${text} ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Calculate days until trek
  const daysUntilTrek = Math.ceil(
    (bookingData.startDate.getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-emerald-50/20 to-background dark:from-background dark:via-emerald-950/10 dark:to-background mt-20">
      {/* Confetti Animation Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-6 opacity-20 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 2}s`,
              backgroundColor: ["#10b981", "#f59e0b", "#3b82f6", "#8b5cf6"][
                Math.floor(Math.random() * 4)
              ],
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>

      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Success Celebration */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
            </div>

            <Badge className="mb-4 gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0">
              <PartyPopper className="h-3 w-3" />
              Booking Confirmed!
            </Badge>

            <h1 className="text-4xl font-bold mb-4">
              Welcome to the Adventure!
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
              Your spot on{" "}
              <span className="font-bold text-emerald-700 dark:text-emerald-400">
                {bookingData.trekName}
              </span>{" "}
              is officially reserved!
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-emerald-600">
                <Trophy className="h-5 w-5" />
                <span className="font-semibold">You're all set!</span>
              </div>
              <div className="flex items-center gap-2 text-amber-600">
                <Sparkles className="h-5 w-5" />
                <span className="font-semibold">Get ready for epic views</span>
              </div>
              <div className="flex items-center gap-2 text-blue-600">
                <UsersRound className="h-5 w-5" />
                <span className="font-semibold">Meet fellow adventurers</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-900/20 rounded-full">
              <Clock className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-medium">
                Redirecting to trek page in {countdown} seconds...
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Left Column - Booking Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Booking Summary */}
              <Card className="border-emerald-200 dark:border-emerald-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Booking Summary
                  </CardTitle>
                  <CardDescription>
                    Your booking details and confirmation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Booking ID
                      </div>
                      <div className="font-mono font-bold text-lg">
                        {bookingData.bookingId}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Status
                      </div>
                      <Badge variant="accent" className="gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Confirmed
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Mountain className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-bold">
                            {bookingData.trekName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {bookingData.region}
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {bookingData.duration} days
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Start Date</div>
                        <div className="font-medium">
                          {format(bookingData.startDate, "MMM d, yyyy")}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">End Date</div>
                        <div className="font-medium">
                          {format(bookingData.endDate, "MMM d, yyyy")}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Group Size</div>
                        <div className="font-medium">
                          {bookingData.groupSize} people
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">
                          Days Until Trek
                        </div>
                        <div className="font-bold text-emerald-600">
                          {daysUntilTrek} days
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Payment Summary */}
                  <div>
                    <h4 className="font-semibold mb-3">Payment Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Total Cost
                        </span>
                        <span className="font-medium">
                          ${bookingData.totalCost}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Deposit Paid
                        </span>
                        <span className="font-medium text-emerald-600">
                          ${bookingData.depositPaid}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Remaining Balance
                        </span>
                        <span>${bookingData.remainingBalance}</span>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Due Date</span>
                        <span>
                          {format(bookingData.paymentDueDate, "MMM d, yyyy")}
                        </span>
                      </div>

                      <div className="mt-3 pt-3 border-t">
                        <div className="flex justify-between font-bold">
                          <span>Next Payment Due</span>
                          <span className="text-emerald-700 dark:text-emerald-400">
                            ${bookingData.remainingBalance}
                          </span>
                        </div>
                        <Progress value={20} className="h-2 mt-2" />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>20% paid</span>
                          <span>80% remaining</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t">
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">
                        Confirmation email sent to
                      </span>
                      <span className="font-medium">your@email.com</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download Booking Confirmation (PDF)
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              {/* Your Trekking Group */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UsersRound className="h-5 w-5" />
                    Your Trekking Group
                  </CardTitle>
                  <CardDescription>
                    Meet your fellow adventurers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {bookingData.participants.map((participant, index) => (
                      <div key={index} className="text-center">
                        <div
                          className={cn(
                            "w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-lg",
                            participant.role === "Participant"
                              ? "bg-gradient-to-br from-emerald-500 to-emerald-600"
                              : "bg-gradient-to-br from-primary to-primary/80"
                          )}
                        >
                          {participant.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{participant.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {participant.role}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Empty spots */}
                    {Array.from({
                      length:
                        bookingData.groupSize - bookingData.participants.length,
                    }).map((_, index) => (
                      <div key={`empty-${index}`} className="text-center">
                        <div className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                          <UserPlus className="h-6 w-6 text-muted-foreground/50" />
                        </div>
                        <div>
                          <div className="font-medium text-muted-foreground">
                            Spot Available
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Waiting to be filled
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h5 className="font-semibold mb-2 flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Group Chat Access
                    </h5>
                    <p className="text-sm text-muted-foreground mb-3">
                      Connect with your trekking group, share tips, and
                      coordinate gear.
                    </p>
                    <Button className="w-full gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Join Group Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Next Steps
                  </CardTitle>
                  <CardDescription>
                    Complete these steps to prepare for your adventure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bookingData.nextSteps.map((step, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                            step.completed
                              ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {step.completed ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : (
                            <div className="font-bold">{index + 1}</div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{step.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {step.description}
                          </div>
                        </div>
                        <div>
                          {step.completed ? (
                            <Badge variant="accent" className="gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Done
                            </Badge>
                          ) : (
                            <Button size="sm" variant="outline">
                              Start
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Action Cards */}
            <div className="space-y-6">
              {/* Share Celebration */}
              <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/20 dark:to-emerald-900/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="h-5 w-5" />
                    Share the Excitement!
                  </CardTitle>
                  <CardDescription>
                    Tell your friends about your adventure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                      onClick={shareBooking}
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-emerald-600" />
                          Link Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy Booking Link
                        </>
                      )}
                    </Button>

                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Facebook className="h-4 w-4" />
                        Facebook
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Twitter className="h-4 w-4" />
                        Twitter
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <MessageCircleCode className="h-4 w-4" />
                        WhatsApp
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Instagram className="h-4 w-4" />
                        Instagram
                      </Button>
                    </div>

                    <div className="text-center mt-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-emerald-900/30 rounded-full">
                        <Gift className="h-4 w-4 text-amber-600" />
                        <span className="text-sm font-medium">
                          Refer friends & earn $50 credit!
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    Email Confirmation
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <CreditCard className="h-4 w-4" />
                    Update Payment Method
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <Bell className="h-4 w-4" />
                    Set Reminders
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    View Gear List
                  </Button>
                </CardContent>
              </Card>

              {/* Trek Countdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Trek Countdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-emerald-700 dark:text-emerald-400 mb-2">
                      {daysUntilTrek}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      days until adventure begins
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="text-sm">
                        <span className="text-muted-foreground">
                          Departure:
                        </span>
                        <span className="font-medium ml-2">
                          {format(bookingData.startDate, "MMM d, yyyy")}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">
                          Meeting Point:
                        </span>
                        <span className="font-medium ml-2">
                          Kathmandu, Nepal
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full gap-2">
                    <Calendar className="h-4 w-4" />
                    Add to Calendar
                  </Button>
                </CardFooter>
              </Card>

              {/* Get Prepared */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Get Prepared
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <Smartphone className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">Download Our App</div>
                        <div className="text-xs text-muted-foreground">
                          For updates & offline maps
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="font-medium">
                          Read Preparation Guide
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Packing, training, & more
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <Heart className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium">Join Community</div>
                        <div className="text-xs text-muted-foreground">
                          Connect with experienced trekkers
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full mb-6">
              <ThumbsUp className="h-5 w-5" />
              <span className="font-bold">
                You're officially part of the MountainHub community!
              </span>
            </div>

            <h2 className="text-3xl font-bold mb-4">What's Next?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Your adventure awaits! Check your email for detailed instructions
              and start preparing for an unforgettable journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2" asChild>
                <Link href={`/treks/${searchParams.get("trekId") || "trek-1"}`}>
                  <Eye className="h-5 w-5" />
                  View Trek Details
                </Link>
              </Button>

              <Button size="lg" variant="outline" className="gap-2" asChild>
                <Link href="/my-treks">
                  <User className="h-5 w-5" />
                  Go to My Treks
                </Link>
              </Button>

              <Button size="lg" variant="outline" className="gap-2" asChild>
                <Link href="/explore">
                  <Mountain className="h-5 w-5" />
                  Browse More Treks
                </Link>
              </Button>
            </div>

            <div className="mt-12 pt-8 border-t">
              <h3 className="font-semibold mb-4">Need immediate assistance?</h3>
              <div className="flex flex-wrap items-center justify-center gap-6">
                <a
                  href="mailto:support@mountainhub.com"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  support@mountainhub.com
                </a>
                <a
                  href="tel:+9779801234567"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Phone className="h-4 w-4" />
                  +977 980 123 4567 (24/7)
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
