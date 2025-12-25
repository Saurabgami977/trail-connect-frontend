"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Users,
  Calendar,
  MapPin,
  Clock,
  Shield,
  User,
  Mail,
  Phone,
  CreditCard,
  Building,
  Lock,
  AlertCircle,
  TrendingDown,
  Calculator,
  Eye,
  MessageCircle,
  Star,
  ThumbsUp,
  Sparkles,
  Mountain,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { LoginModal } from "@/components/Login Modal/LoginModal";

// Mock trek data
const MOCK_TREK = {
  id: "trek-1",
  title: "Everest Base Camp - April Departure",
  regionId: "everest",
  difficulty: "Challenging",
  duration: 14,
  startDate: new Date("2026-04-15"),
  endDate: new Date("2026-04-28"),
  maxParticipants: 12,
  currentParticipants: 4,
  costPerPerson: 1050,
  createdBy: "Alex Johnson",
};

export default function JoinTrekPage() {
  const { id } = useParams();
  const router = useRouter();

  // Form steps
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // User info
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    nationality: "",
    emergencyContact: "",
    dietaryRestrictions: "",
    medicalConditions: "",
    experienceLevel: "beginner",
  });

  // Group preferences
  const [selectedGroupSize, setSelectedGroupSize] = useState(3);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);

  // Calculate costs
  const calculateCostBreakdown = useMemo(() => {
    // Base prices
    const guideDailyRate = 40;
    const insurancePerPerson = 10;
    const transportPerPerson = 56.67;
    const vatTaxPerPerson = 14.08;
    const permitsPerPerson = 65;
    const accommodationPerDay = 30;
    const mealsPerDay = 25;
    const platformFee = 25;

    // Calculate for selected group size
    const guideTotal = guideDailyRate * MOCK_TREK.duration;
    const accommodationTotal =
      accommodationPerDay * MOCK_TREK.duration * selectedGroupSize;
    const mealsTotal = mealsPerDay * MOCK_TREK.duration * selectedGroupSize;

    // Per person breakdown
    const guidePerPerson = guideTotal / selectedGroupSize;
    const guidePerDayPerPerson = guidePerPerson / MOCK_TREK.duration;
    const accommodationPerPerson = accommodationTotal / selectedGroupSize;
    const mealsPerPerson = mealsTotal / selectedGroupSize;

    const totalPerPerson =
      guidePerPerson +
      insurancePerPerson +
      transportPerPerson +
      vatTaxPerPerson +
      permitsPerPerson +
      accommodationPerPerson +
      mealsPerPerson +
      platformFee;

    const savings = MOCK_TREK.costPerPerson - totalPerPerson;

    return {
      totalPerPerson,
      guidePerDayPerPerson,
      insurancePerPerson,
      transportPerPerson,
      vatTaxPerPerson,
      permitsPerPerson,
      accommodationPerPerson,
      mealsPerPerson,
      platformFee,
      savings: savings > 0 ? savings : 0,
    };
  }, [selectedGroupSize]);

  // Calculate deposit (20%)
  const depositAmount = calculateCostBreakdown.totalPerPerson * 0.2;
  const remainingAmount = calculateCostBreakdown.totalPerPerson - depositAmount;

  // Handle form updates
  const handleUserInfoChange = (field: string, value: string) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

  // Handle next step
  const handleNextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Handle previous step
  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Handle submit
  const handleSubmit = () => {
    // In real app, send data to backend
    console.log({
      trekId: id,
      userInfo,
      selectedGroupSize,
      paymentMethod,
      totalCost: calculateCostBreakdown.totalPerPerson,
      depositAmount,
    });

    // Show success and redirect
    router.push(`/treks/${id}/join/success`);
  };

  // Get region name
  const getRegionName = (regionId: string) => {
    const regions: Record<string, string> = {
      everest: "Everest Region",
      annapurna: "Annapurna Region",
      langtang: "Langtang Region",
      manaslu: "Manaslu Region",
      upperMustang: "Upper Mustang",
    };
    return regions[regionId] || regionId;
  };

  // Progress percentage
  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-background">
      <LoginModal redirectUrl={`/treks/${id}/join`} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">
                Step {step} of {totalSteps}
              </span>
              <span className="text-muted-foreground">
                {step === 1 && "Your Information"}
                {step === 2 && "Group Preferences"}
                {step === 3 && "Review & Confirm"}
                {step === 4 && "Payment"}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Back Navigation */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Trek Details
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Form */}
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Join {MOCK_TREK.title}</CardTitle>
                  <CardDescription>
                    Complete the following steps to secure your spot
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  {/* Step 1: Personal Information */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                          <User className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                          Tell us about yourself
                        </h3>
                        <p className="text-muted-foreground">
                          We need this information for permits, emergency
                          contacts, and to ensure your safety.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name *</Label>
                            <Input
                              id="fullName"
                              value={userInfo.fullName}
                              onChange={(e) =>
                                handleUserInfoChange("fullName", e.target.value)
                              }
                              placeholder="As shown on passport"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={userInfo.email}
                              onChange={(e) =>
                                handleUserInfoChange("email", e.target.value)
                              }
                              placeholder="your@email.com"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input
                              id="phone"
                              value={userInfo.phone}
                              onChange={(e) =>
                                handleUserInfoChange("phone", e.target.value)
                              }
                              placeholder="+1 (555) 123-4567"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="nationality">Nationality *</Label>
                            <Input
                              id="nationality"
                              value={userInfo.nationality}
                              onChange={(e) =>
                                handleUserInfoChange(
                                  "nationality",
                                  e.target.value
                                )
                              }
                              placeholder="e.g., United States"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="emergencyContact">
                            Emergency Contact *
                          </Label>
                          <Input
                            id="emergencyContact"
                            value={userInfo.emergencyContact}
                            onChange={(e) =>
                              handleUserInfoChange(
                                "emergencyContact",
                                e.target.value
                              )
                            }
                            placeholder="Name and phone number"
                            required
                          />
                          <p className="text-xs text-muted-foreground">
                            Someone we can contact in case of emergency
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="dietaryRestrictions">
                            Dietary Restrictions
                          </Label>
                          <Textarea
                            id="dietaryRestrictions"
                            value={userInfo.dietaryRestrictions}
                            onChange={(e) =>
                              handleUserInfoChange(
                                "dietaryRestrictions",
                                e.target.value
                              )
                            }
                            placeholder="Vegetarian, allergies, etc."
                            rows={2}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="medicalConditions">
                            Medical Conditions
                          </Label>
                          <Textarea
                            id="medicalConditions"
                            value={userInfo.medicalConditions}
                            onChange={(e) =>
                              handleUserInfoChange(
                                "medicalConditions",
                                e.target.value
                              )
                            }
                            placeholder="Any medical conditions we should know about"
                            rows={2}
                          />
                          <p className="text-xs text-muted-foreground">
                            This information is confidential and only shared
                            with your guide
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label>Trekking Experience Level *</Label>
                          <RadioGroup
                            value={userInfo.experienceLevel}
                            onValueChange={(value) =>
                              handleUserInfoChange("experienceLevel", value)
                            }
                            className="grid grid-cols-1 md:grid-cols-3 gap-3"
                          >
                            <div>
                              <RadioGroupItem
                                value="beginner"
                                id="beginner"
                                className="sr-only"
                              />
                              <Label
                                htmlFor="beginner"
                                className={cn(
                                  "flex flex-col items-center justify-center rounded-lg border-2 p-4 cursor-pointer hover:bg-muted/50",
                                  userInfo.experienceLevel === "beginner"
                                    ? "border-primary bg-primary/5"
                                    : "border-muted"
                                )}
                              >
                                <span className="font-medium">Beginner</span>
                                <span className="text-xs text-muted-foreground mt-1">
                                  First multi-day trek
                                </span>
                              </Label>
                            </div>

                            <div>
                              <RadioGroupItem
                                value="intermediate"
                                id="intermediate"
                                className="sr-only"
                              />
                              <Label
                                htmlFor="intermediate"
                                className={cn(
                                  "flex flex-col items-center justify-center rounded-lg border-2 p-4 cursor-pointer hover:bg-muted/50",
                                  userInfo.experienceLevel === "intermediate"
                                    ? "border-primary bg-primary/5"
                                    : "border-muted"
                                )}
                              >
                                <span className="font-medium">
                                  Intermediate
                                </span>
                                <span className="text-xs text-muted-foreground mt-1">
                                  1-2 previous treks
                                </span>
                              </Label>
                            </div>

                            <div>
                              <RadioGroupItem
                                value="experienced"
                                id="experienced"
                                className="sr-only"
                              />
                              <Label
                                htmlFor="experienced"
                                className={cn(
                                  "flex flex-col items-center justify-center rounded-lg border-2 p-4 cursor-pointer hover:bg-muted/50",
                                  userInfo.experienceLevel === "experienced"
                                    ? "border-primary bg-primary/5"
                                    : "border-muted"
                                )}
                              >
                                <span className="font-medium">Experienced</span>
                                <span className="text-xs text-muted-foreground mt-1">
                                  3+ high-altitude treks
                                </span>
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Group & Payment Preferences */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-emerald-100  flex items-center justify-center mx-auto mb-4">
                          <Calculator className="h-8 w-8 text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                          Optimize Your Cost
                        </h3>
                        <p className="text-muted-foreground">
                          Choose your preferred group size and see how much you
                          can save
                        </p>
                      </div>

                      {/* Group Size Selection */}
                      <div className="space-y-4">
                        <div>
                          <Label className="text-lg font-semibold mb-3 block">
                            Select Group Size
                          </Label>
                          <p className="text-sm text-muted-foreground mb-4">
                            The more people join, the lower your cost. Choose
                            your preferred group size:
                          </p>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[2, 3, 4, 6].map((size) => {
                              const calcForSize = (() => {
                                const guideTotal = 40 * MOCK_TREK.duration;
                                const accommodationTotal =
                                  30 * MOCK_TREK.duration * size;
                                const mealsTotal =
                                  25 * MOCK_TREK.duration * size;
                                const guidePerPerson = guideTotal / size;
                                const accommodationPerPerson =
                                  accommodationTotal / size;
                                const mealsPerPerson = mealsTotal / size;

                                return (
                                  guidePerPerson +
                                  10 +
                                  56.67 +
                                  14.08 +
                                  65 +
                                  accommodationPerPerson +
                                  mealsPerPerson +
                                  25
                                );
                              })();

                              const savings =
                                MOCK_TREK.costPerPerson - calcForSize;

                              return (
                                <button
                                  key={size}
                                  type="button"
                                  onClick={() => setSelectedGroupSize(size)}
                                  className={cn(
                                    "border-2 rounded-xl p-4 text-center transition-all hover:scale-105",
                                    selectedGroupSize === size
                                      ? "border-emerald-500 bg-emerald-50 "
                                      : "border-muted hover:border-emerald-300"
                                  )}
                                >
                                  <div className="text-2xl font-bold mb-1">
                                    {size}
                                  </div>
                                  <div className="text-sm text-muted-foreground mb-2">
                                    people
                                  </div>
                                  <div className="font-bold text-emerald-700 ">
                                    ${calcForSize.toFixed(0)}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    per person
                                  </div>
                                  {savings > 0 && (
                                    <div className="mt-2 text-xs font-medium text-emerald-600">
                                      Save ${savings.toFixed(0)}
                                    </div>
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          <div className="mt-4 text-center">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100  rounded-full">
                              <TrendingDown className="h-4 w-4 text-emerald-600" />
                              <span className="text-sm font-medium">
                                Best value: Group of 3 (Save $
                                {calculateCostBreakdown.savings.toFixed(0)})
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Cost Breakdown */}
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold">Cost Breakdown</h4>
                            <Badge variant="outline" className="gap-1">
                              For {selectedGroupSize} people
                            </Badge>
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Guide fee:
                              </span>
                              <span>
                                $
                                {calculateCostBreakdown.guidePerDayPerPerson.toFixed(
                                  2
                                )}
                                /day per person
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Guide's insurance:
                              </span>
                              <span>
                                ${calculateCostBreakdown.insurancePerPerson} per
                                person
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Guide's transport:
                              </span>
                              <span>
                                ${calculateCostBreakdown.transportPerPerson} per
                                person
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                VAT tax:
                              </span>
                              <span>
                                ${calculateCostBreakdown.vatTaxPerPerson} per
                                person
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Permits & entry fees:
                              </span>
                              <span>
                                ${calculateCostBreakdown.permitsPerPerson} per
                                person
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Accommodation:
                              </span>
                              <span>
                                $
                                {calculateCostBreakdown.accommodationPerPerson.toFixed(
                                  2
                                )}{" "}
                                per person
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Meals:
                              </span>
                              <span>
                                $
                                {calculateCostBreakdown.mealsPerPerson.toFixed(
                                  2
                                )}{" "}
                                per person
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Platform fee:
                              </span>
                              <span>
                                ${calculateCostBreakdown.platformFee} per person
                              </span>
                            </div>

                            <Separator className="my-2" />

                            <div className="flex justify-between font-bold">
                              <span>Total per person:</span>
                              <span className="text-lg text-emerald-700 ">
                                $
                                {calculateCostBreakdown.totalPerPerson.toFixed(
                                  0
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Payment Options */}
                        <div className="space-y-3">
                          <Label className="text-lg font-semibold">
                            Payment Method
                          </Label>

                          <Tabs
                            defaultValue="card"
                            value={paymentMethod}
                            onValueChange={setPaymentMethod}
                          >
                            <TabsList className="grid grid-cols-3">
                              <TabsTrigger value="card" className="gap-2">
                                <CreditCard className="h-4 w-4" />
                                Card
                              </TabsTrigger>
                              <TabsTrigger value="bank" className="gap-2">
                                <Building className="h-4 w-4" />
                                Bank Transfer
                              </TabsTrigger>
                              <TabsTrigger value="paypal" className="gap-2">
                                <DollarSign className="h-4 w-4" />
                                PayPal
                              </TabsTrigger>
                            </TabsList>

                            <TabsContent
                              value="card"
                              className="space-y-4 pt-4"
                            >
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Card Number</Label>
                                  <Input placeholder="1234 5678 9012 3456" />
                                </div>
                                <div className="space-y-2">
                                  <Label>Expiry Date</Label>
                                  <Input placeholder="MM/YY" />
                                </div>
                                <div className="space-y-2">
                                  <Label>CVC</Label>
                                  <Input placeholder="123" />
                                </div>
                                <div className="space-y-2">
                                  <Label>ZIP Code</Label>
                                  <Input placeholder="12345" />
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Lock className="h-4 w-4 text-emerald-600" />
                                <span className="text-muted-foreground">
                                  Your payment is secured with 256-bit SSL
                                  encryption
                                </span>
                              </div>
                            </TabsContent>

                            <TabsContent value="bank" className="pt-4">
                              <div className="space-y-3">
                                <p className="text-sm text-muted-foreground">
                                  Make a transfer to our bank account. Your
                                  booking will be confirmed once payment is
                                  received.
                                </p>
                                <div className="bg-muted/50 rounded-lg p-4">
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span>Bank Name:</span>
                                      <span className="font-medium">
                                        Himalayan Bank Ltd.
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Account Number:</span>
                                      <span className="font-medium">
                                        123456789012
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>SWIFT Code:</span>
                                      <span className="font-medium">
                                        HIMANPKA
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Amount:</span>
                                      <span className="font-bold">
                                        $
                                        {calculateCostBreakdown.totalPerPerson.toFixed(
                                          2
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </TabsContent>

                            <TabsContent value="paypal" className="pt-4">
                              <div className="text-center py-8">
                                <Button
                                  className="gap-2"
                                  onClick={() => setShowPaymentDetails(true)}
                                >
                                  <DollarSign className="h-5 w-5" />
                                  Pay with PayPal
                                </Button>
                                <p className="text-sm text-muted-foreground mt-4">
                                  You'll be redirected to PayPal to complete
                                  your payment
                                </p>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </div>

                        {/* Payment Plan */}
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Calendar className="h-5 w-5 text-blue-600" />
                            <h4 className="font-semibold">
                              Flexible Payment Plan
                            </h4>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">
                                  Pay Deposit Now
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Secure your spot
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-xl font-bold">
                                  ${depositAmount.toFixed(0)}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  20% of total
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">
                                  Pay Remaining Balance
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Due 30 days before trek
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-xl font-bold">
                                  ${remainingAmount.toFixed(0)}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  80% of total
                                </div>
                              </div>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between font-bold">
                              <div>Total Cost</div>
                              <div className="text-2xl text-emerald-700 ">
                                $
                                {calculateCostBreakdown.totalPerPerson.toFixed(
                                  0
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Review & Confirm */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-blue-100  flex items-center justify-center mx-auto mb-4">
                          <Eye className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                          Review Your Booking
                        </h3>
                        <p className="text-muted-foreground">
                          Please review all details before confirming your
                          booking
                        </p>
                      </div>

                      <div className="space-y-6">
                        {/* Trek Summary */}
                        <div className="border rounded-lg p-4">
                          <h4 className="font-semibold mb-3">Trek Summary</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="text-muted-foreground">Trek</div>
                              <div className="font-medium">
                                {MOCK_TREK.title}
                              </div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">
                                Region
                              </div>
                              <div className="font-medium">
                                {getRegionName(MOCK_TREK.regionId)}
                              </div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Dates</div>
                              <div className="font-medium">
                                {format(MOCK_TREK.startDate, "MMM d")} -{" "}
                                {format(MOCK_TREK.endDate, "MMM d, yyyy")}
                              </div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">
                                Duration
                              </div>
                              <div className="font-medium">
                                {MOCK_TREK.duration} days
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Personal Information */}
                        <div className="border rounded-lg p-4">
                          <h4 className="font-semibold mb-3">
                            Personal Information
                          </h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="text-muted-foreground">
                                Full Name
                              </div>
                              <div className="font-medium">
                                {userInfo.fullName || "Not provided"}
                              </div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Email</div>
                              <div className="font-medium">
                                {userInfo.email || "Not provided"}
                              </div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Phone</div>
                              <div className="font-medium">
                                {userInfo.phone || "Not provided"}
                              </div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">
                                Nationality
                              </div>
                              <div className="font-medium">
                                {userInfo.nationality || "Not provided"}
                              </div>
                            </div>
                            <div className="col-span-2">
                              <div className="text-muted-foreground">
                                Emergency Contact
                              </div>
                              <div className="font-medium">
                                {userInfo.emergencyContact || "Not provided"}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Cost Summary */}
                        <div className="border rounded-lg p-4">
                          <h4 className="font-semibold mb-3">Cost Summary</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Group Size
                              </span>
                              <span className="font-medium">
                                {selectedGroupSize} people
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Cost per person
                              </span>
                              <span className="font-bold">
                                $
                                {calculateCostBreakdown.totalPerPerson.toFixed(
                                  0
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Payment Method
                              </span>
                              <span className="font-medium capitalize">
                                {paymentMethod}
                              </span>
                            </div>
                            {calculateCostBreakdown.savings > 0 && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  You save
                                </span>
                                <span className="font-bold text-emerald-600">
                                  ${calculateCostBreakdown.savings.toFixed(0)}
                                </span>
                              </div>
                            )}

                            <Separator className="my-2" />

                            <div className="flex justify-between font-bold text-lg">
                              <span>Total to Pay Now</span>
                              <span className="text-emerald-700 ">
                                ${depositAmount.toFixed(0)}
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ${remainingAmount.toFixed(0)} due 30 days before
                              departure
                            </div>
                          </div>
                        </div>

                        {/* Terms and Conditions */}
                        <div className="space-y-4">
                          <div className="flex items-start gap-2">
                            <Checkbox
                              id="terms"
                              checked={acceptTerms}
                              onCheckedChange={(checked) =>
                                setAcceptTerms(checked as boolean)
                              }
                            />
                            <Label
                              htmlFor="terms"
                              className="text-sm cursor-pointer"
                            >
                              I agree to the{" "}
                              <Link
                                href="/terms"
                                className="text-primary hover:underline"
                              >
                                Terms and Conditions
                              </Link>
                              ,{" "}
                              <Link
                                href="/privacy"
                                className="text-primary hover:underline"
                              >
                                Privacy Policy
                              </Link>
                              , and{" "}
                              <Link
                                href="/cancellation"
                                className="text-primary hover:underline"
                              >
                                Cancellation Policy
                              </Link>
                              . I understand that travel insurance is mandatory
                              for this trek.
                            </Label>
                          </div>

                          <div className="flex items-start gap-2">
                            <Checkbox
                              id="newsletter"
                              checked={subscribeNewsletter}
                              onCheckedChange={(checked) =>
                                setSubscribeNewsletter(checked as boolean)
                              }
                            />
                            <Label
                              htmlFor="newsletter"
                              className="text-sm cursor-pointer"
                            >
                              Subscribe to our newsletter for trekking tips,
                              special offers, and community updates
                            </Label>
                          </div>

                          <div className="bg-amber-50  border border-amber-200  rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                              <div>
                                <h5 className="font-semibold mb-1">
                                  Important Reminders
                                </h5>
                                <ul className="text-sm space-y-1 text-muted-foreground">
                                  <li>
                                    • Travel insurance with emergency evacuation
                                    is mandatory
                                  </li>
                                  <li>
                                    • Passport must be valid for 6 months after
                                    return date
                                  </li>
                                  <li>
                                    • You'll receive a detailed packing list
                                    after booking
                                  </li>
                                  <li>
                                    • A pre-trek briefing will be held 2 weeks
                                    before departure
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Payment */}
                  {step === 4 && (
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-emerald-100  flex items-center justify-center mx-auto mb-4">
                          <Lock className="h-8 w-8 text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                          Secure Payment
                        </h3>
                        <p className="text-muted-foreground">
                          Your payment is encrypted and secure
                        </p>
                      </div>

                      <div className="space-y-6">
                        {/* Payment Summary */}
                        <div className="bg-muted/50 rounded-lg p-6">
                          <div className="text-center mb-6">
                            <div className="text-4xl font-bold text-emerald-700  mb-2">
                              ${depositAmount.toFixed(0)}
                            </div>
                            <div className="text-muted-foreground">
                              Deposit due today
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span>Total trek cost:</span>
                              <span className="font-medium">
                                $
                                {calculateCostBreakdown.totalPerPerson.toFixed(
                                  0
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Today's deposit (20%):</span>
                              <span className="font-bold">
                                ${depositAmount.toFixed(0)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Remaining balance:</span>
                              <span>${remainingAmount.toFixed(0)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-muted-foreground">
                              <span>Due date:</span>
                              <span>
                                {format(
                                  new Date(
                                    MOCK_TREK.startDate.getTime() -
                                      30 * 86400000
                                  ),
                                  "MMM d, yyyy"
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Payment Security */}
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <Shield className="h-5 w-5 text-emerald-600" />
                              <span className="font-semibold">
                                Payment Security
                              </span>
                            </div>
                            <Badge variant="accent">Secure</Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-emerald-500" />
                              <span>256-bit SSL encryption</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-emerald-500" />
                              <span>PCI DSS compliant</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-emerald-500" />
                              <span>No card data stored</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-emerald-500" />
                              <span>Money-back guarantee</span>
                            </div>
                          </div>
                        </div>

                        {/* Confirmation Message */}
                        <div className="text-center py-4">
                          <p className="text-muted-foreground mb-4">
                            By clicking "Complete Booking", you'll secure your
                            spot on this trek and receive a confirmation email
                            with all details.
                          </p>

                          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                            <Sparkles className="h-4 w-4" />
                            <span>Welcome to the adventure!</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="flex justify-between border-t pt-6">
                  <div>
                    {step > 1 && (
                      <Button variant="outline" onClick={handlePrevStep}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Previous
                      </Button>
                    )}
                  </div>

                  <div>
                    {step < totalSteps ? (
                      <Button
                        onClick={handleNextStep}
                        disabled={
                          step === 1 && (!userInfo.fullName || !userInfo.email)
                        }
                      >
                        Next
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        disabled={!acceptTerms}
                        className="gap-2"
                      >
                        <Lock className="h-4 w-4" />
                        Complete Booking
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>

              {/* Support Info */}
              <div className="text-center text-sm text-muted-foreground">
                <p className="mb-2">Need help? Contact our support team:</p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <a
                    href="mailto:support@mountainhub.com"
                    className="flex items-center gap-1 hover:text-primary"
                  >
                    <Mail className="h-4 w-4" />
                    support@mountainhub.com
                  </a>
                  <a
                    href="tel:+9779801234567"
                    className="flex items-center gap-1 hover:text-primary"
                  >
                    <Phone className="h-4 w-4" />
                    +977 980 123 4567
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Summary & Help */}
            <div className="space-y-6">
              {/* Trek Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Trek Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mountain className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold">{MOCK_TREK.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {getRegionName(MOCK_TREK.regionId)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Dates</span>
                      </div>
                      <span className="font-medium">
                        {format(MOCK_TREK.startDate, "MMM d")} -{" "}
                        {format(MOCK_TREK.endDate, "MMM d")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Duration</span>
                      </div>
                      <span className="font-medium">
                        {MOCK_TREK.duration} days
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Group Size</span>
                      </div>
                      <span className="font-medium">
                        {MOCK_TREK.currentParticipants}/
                        {MOCK_TREK.maxParticipants} joined
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Difficulty</span>
                      </div>
                      <Badge variant="outline">{MOCK_TREK.difficulty}</Badge>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <div className="text-sm font-medium mb-2">Organized by</div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-100  flex items-center justify-center">
                        <User className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div>
                        <div className="font-medium">{MOCK_TREK.createdBy}</div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span>4.8/5 (24 reviews)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cost Savings Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-emerald-600" />
                    Your Savings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Original price:
                      </span>
                      <span className="line-through">
                        ${MOCK_TREK.costPerPerson.toFixed(0)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Your price:</span>
                      <span className="text-2xl font-bold text-emerald-700 ">
                        ${calculateCostBreakdown.totalPerPerson.toFixed(0)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">You save:</span>
                      <span className="font-bold text-emerald-600">
                        ${calculateCostBreakdown.savings.toFixed(0)}
                      </span>
                    </div>

                    <div className="bg-emerald-50  rounded-lg p-3 mt-4">
                      <div className="flex items-center gap-2 mb-1">
                        <ThumbsUp className="h-4 w-4 text-emerald-600" />
                        <span className="font-medium">Great choice!</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        By joining this group trek, you're saving $
                        {calculateCostBreakdown.savings.toFixed(0)} compared to
                        organizing it yourself.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* What's Included */}
              <Card>
                <CardHeader>
                  <CardTitle>What's Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>Professional licensed guide</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>All required permits & entry fees</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>Accommodation during trek</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>All meals on trek (B/L/D)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>Transport to/from trailhead</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>Guide's insurance & equipment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>24/7 emergency support</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Need Help? */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Need Help?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Chat with Support
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Phone className="h-4 w-4" />
                    Call Us Now
                  </Button>
                  <div className="text-xs text-muted-foreground text-center">
                    Available 24/7 for trek-related inquiries
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
