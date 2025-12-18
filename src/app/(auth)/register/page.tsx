"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mountain,
  Mail,
  Lock,
  User,
  Phone,
  Upload,
  ArrowRight,
  Shield,
  Globe,
} from "lucide-react";
import { LANGUAGES } from "@/lib/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { signup } from "@/api/routes/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getTrekkingRegions } from "@/api/routes/trekking-regions";

const RegisterPage = () => {
  const [userType, setUserType] = useState<"tourist" | "guide">("tourist");
  const router = useRouter();

  const { mutate: registerFunction, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      toast.success("Registration successful! Please check your email.", {
        duration: 5000,
      });
      router.push("/user");
      console.log("Registration successful:", data);
    },
    onError: (error) => {
      toast.error(
        (error as any)?.response?.data?.message ||
          "Registration failed. Please try again.",
        {
          duration: 5000,
          style: {
            minWidth: "250px",
            color: "#fff",
            backgroundColor: "#ef4444",
          },
        }
      );
      console.error("Registration error:", error);
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 text-primary font-bold text-2xl mb-2">
                <Mountain className="h-8 w-8" />
                <span>Nepal Trek Guide</span>
              </div>
              <p className="text-muted-foreground">
                Create your account to get started.
              </p>
            </div>

            <Card>
              <CardHeader>
                <Tabs
                  value={userType}
                  onValueChange={(v) => setUserType(v as "tourist" | "guide")}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="tourist" className="gap-2">
                      <Globe className="h-4 w-4" />
                      Traveller
                    </TabsTrigger>
                    <TabsTrigger value="guide" className="gap-2">
                      <Shield className="h-4 w-4" />
                      Guide
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>

              <CardContent>
                {userType === "tourist" ? (
                  <TouristRegistrationForm
                    submitterFunction={registerFunction}
                  />
                ) : (
                  <GuideRegistrationForm submitterFunction={registerFunction} />
                )}

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-primary font-medium hover:underline"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const TouristRegistrationForm: React.FC<{
  submitterFunction: (data: any) => void;
}> = ({ submitterFunction }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    submitterFunction(data);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="firstName"
              placeholder="John"
              className="pl-10"
              required
              name="firstName"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" placeholder="Doe" required name="lastName" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            className="pl-10"
            required
            name="email"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className="pl-10"
            required
            name="password"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Must be at least 8 characters with a number and special character.
        </p>
      </div>

      <div className="flex items-start gap-2">
        <Checkbox id="terms" required />
        <label
          htmlFor="terms"
          className="text-sm text-muted-foreground cursor-pointer"
        >
          I agree to the{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </label>
      </div>

      <Button type="submit" className="w-full" size="lg">
        Create Account
        <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  );
};

const GuideRegistrationForm: React.FC<{
  submitterFunction: (data: any) => void;
}> = ({ submitterFunction }) => {
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    data: trekkingRegions,
    isSuccess,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["trekking-regions"],
    queryFn: getTrekkingRegions,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);

    // You can handle the file upload or validation here
    if (file) {
      console.log("File selected:", file.name, file.size, file.type);
      // Add your file validation logic here
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const jsonPayload = {
        firstName: (e.target as any).firstName.value,
        lastName: (e.target as any).lastName.value,
        email: (e.target as any).email.value,
        phone: (e.target as any).phone.value,
        password: (e.target as any).password.value,
        yearsOfExperience: (e.target as any).yearsOfExperience.value,
        dailyRate: (e.target as any).dailyRate.value,
        bio: (e.target as any).bio.value,
        regions: selectedRegions,
        languages: selectedLanguages,
        role: "guide",
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(jsonPayload));

      if (selectedFile) {
        formData.append("licenseFile", selectedFile);
      }

      const url = "http://localhost:4000/api/auth/register-guide";
      const response = await fetch(url, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to register guide. Please try again."
        );
      }

      toast.success("Registration successful! Please check your email.", {
        duration: 5000,
      });
    } catch (error) {
      console.error("Error preparing form data:", error);
      toast.error(
        (error as Error).message || "Registration failed. Please try again.",
        {
          duration: 5000,
          style: {
            minWidth: "250px",
            color: "#fff",
            backgroundColor: "#ef4444",
          },
        }
      );
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Personal Info */}
      <div>
        <h3 className="font-medium text-foreground mb-4">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="guideFirstName">First Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="guideFirstName"
                placeholder="Tenzing"
                className="pl-10"
                required
                name="firstName"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="guideLastName">Last Name</Label>
            <Input
              id="guideLastName"
              placeholder="Sherpa"
              required
              name="lastName"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="guideEmail">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="guideEmail"
                type="email"
                placeholder="your@email.com"
                className="pl-10"
                required
                name="email"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="guidePhone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="guidePhone"
                type="tel"
                placeholder="+977 98..."
                className="pl-10"
                required
                name="phone"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <Label htmlFor="guidePassword">Create a Strong Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="guidePassword"
              type="password"
              placeholder="••••••••"
              className="pl-10"
              required
              name="password"
            />
          </div>
        </div>
      </div>

      {/* Professional Info */}
      <div>
        <h3 className="font-medium text-foreground mb-4">
          Professional Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="experience">Years of Experience</Label>
            <Select name="yearsOfExperience">
              <SelectTrigger>
                <SelectValue placeholder="Select years" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(20)].map((_, i) => (
                  <SelectItem key={i + 1} value={String(i + 1)}>
                    {i + 1} {i === 0 ? "year" : "years"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dailyRate">Daily Rate (USD)</Label>
            <Input
              name="dailyRate"
              id="dailyRate"
              type="number"
              placeholder="45"
              min="10"
              required
            />
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <Label>Operating Regions</Label>
          {isSuccess ? (
            <div className="grid grid-cols-2 gap-2">
              {trekkingRegions?.map((region) => (
                <label
                  key={region.id}
                  className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedRegions.includes(region._id)
                      ? "border-primary bg-primary/5"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <Checkbox
                    checked={selectedRegions.includes(region._id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedRegions([...selectedRegions, region._id]);
                      } else {
                        setSelectedRegions(
                          selectedRegions.filter((r) => r !== region._id)
                        );
                      }
                    }}
                  />
                  <span className="text-sm">{region.name}</span>
                </label>
              ))}
            </div>
          ) : isPending ? (
            <p>Loading regions...</p>
          ) : isError ? (
            <p className="text-sm text-red-500">
              Failed to load regions. Please try again later.
            </p>
          ) : null}
        </div>

        <div className="space-y-2 mt-4">
          <Label>Languages Spoken</Label>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map((lang) => (
              <label
                key={lang}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-pointer text-sm transition-colors ${
                  selectedLanguages.includes(lang)
                    ? "border-primary bg-primary/5 text-primary"
                    : "hover:bg-muted/50"
                }`}
              >
                <Checkbox
                  checked={selectedLanguages.includes(lang)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedLanguages([...selectedLanguages, lang]);
                    } else {
                      setSelectedLanguages(
                        selectedLanguages.filter((l) => l !== lang)
                      );
                    }
                  }}
                  className="sr-only"
                />
                <span>{lang}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <Label htmlFor="bio">Bio / About You</Label>
          <Textarea
            id="bio"
            placeholder="Tell tourists about yourself, your experience, and what makes your treks special..."
            rows={4}
            name="bio"
          />
        </div>
      </div>

      {/* License Upload */}
      <div>
        <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          License Verification (Required)
        </h3>

        <div
          className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
          onClick={handleClick}
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <p className="font-medium text-foreground mb-1">
            Upload Your Trekking Guide License
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            JPG, PNG or PDF up to 10MB
          </p>

          {/* display selected photo in 150x300 */}
          {selectedFile && selectedFile.type.startsWith("image/") ? (
            <div className="mb-4">
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Selected License"
                className="mx-auto object-contain"
                style={{ width: 200, height: 200 }}
              />
            </div>
          ) : null}

          {selectedFile && (
            <p className="text-sm text-primary mb-2">
              Selected: {selectedFile.name}
            </p>
          )}

          <Button variant="outline" type="button" className="relative">
            Choose File
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
              name="licenseFile"
              id="licenseUploadInput"
              title="Choose File"
            />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Your license will be reviewed within 24-48 hours. You'll receive an
          email once verified.
        </p>
      </div>

      {/* Terms */}
      <div className="flex items-start gap-2">
        <Checkbox id="guideTerms" required />
        <label
          htmlFor="guideTerms"
          className="text-sm text-muted-foreground cursor-pointer"
        >
          I confirm that I hold a valid Nepal Trekking Guide License and agree
          to the{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </label>
      </div>

      <Button type="submit" className="w-full" size="lg">
        Submit Registration
        <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default RegisterPage;
