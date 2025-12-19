"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useSelector } from "react-redux";
import { getTrekkingRegions } from "@/api/routes/trekking-regions";
import { getByUserId } from "@/api/routes/guide";
import { toast } from "sonner";

// Import UI components to match the region form
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  MapPin,
  Calendar,
  Phone,
  Upload,
  X,
  Plus,
  Shield,
  Award,
  Languages,
  DollarSign,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Save,
} from "lucide-react";
import { CountryRegionData } from "react-country-region-selector";
import { updateUserProfile } from "@/api/routes/user";

// Zod schemas for validation
const userProfileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phone: z.string(),
  avatar: z.string(),
  country: z.string(),
  city: z.string().optional(),
  dateOfBirth: z.string(),
  gender: z.enum(["male", "female", "other", "prefer_not_to_say"]),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  languages: z.array(z.string()).optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  emergencyContactRelation: z.string().optional(),
  socialLinks: z
    .object({
      facebook: z.string().url("Invalid URL").optional().or(z.literal("")),
      instagram: z.string().url("Invalid URL").optional().or(z.literal("")),
      twitter: z.string().url("Invalid URL").optional().or(z.literal("")),
      linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
    })
    .optional(),
  settings: z
    .object({
      language: z.string().optional(),
      currency: z.string().optional(),
      timezone: z.string().optional(),
      notificationSettings: z
        .object({
          email: z.boolean().optional(),
          push: z.boolean().optional(),
          sms: z.boolean().optional(),
        })
        .optional(),
    })
    .optional(),
});

const guideProfileSchema = z.object({
  type: z.enum(["independent", "agency"]),
  companyName: z.string().optional(),
  licenseNumber: z.string().optional(),
  licenseExpiry: z.string().optional(),
  yearsOfExperience: z.number().min(0).max(50),
  languages: z.array(z.string()).min(1, "Select at least one language"),
  bio: z.string().max(1000, "Bio must be less than 1000 characters").optional(),
  specializations: z.array(z.string()).optional(),
  certifications: z.array(z.string()).optional(),
  training: z.array(z.string()).optional(),
  contactInfo: z
    .object({
      whatsapp: z.string().optional(),
      viber: z.string().optional(),
      wechat: z.string().optional(),
      phone2: z.string().optional(),
      emergencyContact: z.string().optional(),
    })
    .optional(),
  pricing: z
    .object({
      dailyRate: z.number().min(0),
      minGroupSize: z.number().min(1).optional(),
      maxGroupSize: z.number().min(1).optional(),
      soloPremium: z.number().min(0).optional(),
      peakSeasonSurcharge: z.number().min(0).max(100).optional(),
    })
    .optional(),
  expertiseRegions: z.array(z.string()).min(1, "Select at least one region"),
  gearProvided: z.array(z.string()).optional(),
  insurance: z
    .object({
      provider: z.string().optional(),
      policyNumber: z.string().optional(),
      expiry: z.string().optional(),
      coverageAmount: z.number().optional(),
    })
    .optional(),
  bankDetails: z
    .object({
      bankName: z.string().optional(),
      accountNumber: z.string().optional(),
      accountHolder: z.string().optional(),
      swiftCode: z.string().optional(),
      branch: z.string().optional(),
    })
    .optional(),
});

type UserProfileFormData = z.infer<typeof userProfileSchema>;
type GuideProfileFormData = z.infer<typeof guideProfileSchema>;

const EditProfilePage = () => {
  const queryClient = useQueryClient();
  const userProfile = useSelector((state: any) => state.auth.user);
  const [isGuide, setIsGuide] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [languagesInput, setLanguagesInput] = useState("");
  const [specializationsInput, setSpecializationsInput] = useState("");
  const [certificationsInput, setCertificationsInput] = useState("");
  const [gearInput, setGearInput] = useState("");
  const [regions, setRegions] = useState<Array<{ _id: string; name: string }>>(
    []
  );

  // Fetch guide profile if user is a guide
  const { data: guideProfile, isLoading: isLoadingGuide } = useQuery({
    queryKey: ["guideProfile", userProfile?._id],
    queryFn: () => getByUserId(userProfile?._id),
    enabled: isGuide,
  });

  // Fetch trekking regions
  const { data: trekkingRegions } = useQuery({
    queryKey: ["trekkingRegions"],
    queryFn: getTrekkingRegions,
  });

  // User profile form
  const {
    register: registerUser,
    handleSubmit: handleSubmitUser,
    setValue: setUserValue,
    formState: { errors: userErrors, isDirty: isUserDirty },
    reset: resetUser,
    watch: watchUser,
    getValues: getUserValues,
  } = useForm<UserProfileFormData>({
    resolver: zodResolver(userProfileSchema),
  });

  // Guide profile form
  const {
    register: registerGuide,
    handleSubmit: handleSubmitGuide,
    formState: { errors: guideErrors, isDirty: isGuideDirty },
    reset: resetGuide,
    setValue: setGuideValue,
    watch: watchGuide,
  } = useForm<GuideProfileFormData>({
    resolver: zodResolver(guideProfileSchema),
    defaultValues: {
      type: "independent",
      yearsOfExperience: 0,
      languages: [],
      pricing: {
        dailyRate: 0,
      },
      expertiseRegions: [],
    },
  });

  // Update forms when data loads
  useEffect(() => {
    if (userProfile) {
      console.log("API gender value:", userProfile.gender);

      resetUser({
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        phone: userProfile.phone || "",
        avatar: userProfile.avatar || "",
        city: userProfile.city || "",
        dateOfBirth: userProfile.dateOfBirth?.split("T")[0] || "",
        country: userProfile.country || "",
        gender: userProfile.gender || "prefer_not_to_say",
        bio: userProfile.bio || "",
        languages: userProfile.languages || [],
        emergencyContactName: userProfile.emergencyContactName || "",
        emergencyContactPhone: userProfile.emergencyContactPhone || "",
        emergencyContactRelation: userProfile.emergencyContactRelation || "",
        socialLinks: userProfile.socialLinks || {},
        settings: userProfile.settings || {},
      });
      setAvatarPreview(userProfile.avatar || "");
      setIsGuide(userProfile.role === "guide");
    }
  }, [userProfile, resetUser]);

  useEffect(() => {
    if (guideProfile) {
      resetGuide({
        type: guideProfile.type,
        companyName: guideProfile.companyName || "",
        licenseNumber: guideProfile.licenseNumber || "",
        licenseExpiry: guideProfile.licenseExpiry?.split("T")[0] || "",
        yearsOfExperience: guideProfile.yearsOfExperience,
        languages: guideProfile.languages || [],
        bio: guideProfile.bio || "",
        specializations: guideProfile.specializations || [],
        certifications: guideProfile.certifications || [],
        training: guideProfile.training || [],
        contactInfo: guideProfile.contactInfo || {},
        pricing: guideProfile.pricing || { dailyRate: 0 },
        expertiseRegions:
          guideProfile.expertiseRegions?.map((r) => r._id) || [],
        gearProvided: guideProfile.gearProvided || [],
        insurance: guideProfile.insurance || {},
        bankDetails: guideProfile.bankDetails || {},
      });
    }
  }, [guideProfile, resetGuide]);

  useEffect(() => {
    if (trekkingRegions) {
      setRegions(trekkingRegions);
    }
  }, [trekkingRegions]);

  // Update user profile mutation
  const updateUserMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      toast.success("Profile updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update profile");
    },
  });

  // Update guide profile mutation
  const updateGuideMutation = useMutation({
    mutationFn: async (data: GuideProfileFormData) => {
      const response = await axios.put("/api/guides/profile", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guideProfile"] });
      toast.success("Guide profile updated successfully!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to update guide profile"
      );
    },
  });

  // Handle avatar upload
  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    const url = "http://localhost:4000/api/users/profile-picture";

    toast.success(
      "Profile picture uploaded successfully. It may take a few moments to reflect."
    );

    try {
      const response: any = await fetch(url, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();
      setAvatarPreview(data.avatar);
      setUserValue("avatar", data.avatar);
    } catch (error) {
      toast.error("Failed to upload avatar");
    } finally {
      event.target.value = "";
      toast.success("Avatar uploaded successfully!");
    }
  };

  // Add language to array
  const addLanguage = (type: "user" | "guide") => {
    const input = languagesInput;
    if (input.trim()) {
      if (type === "user") {
        const current = watchUser("languages") || [];
        setUserValue("languages", [...current, input.trim()]);
      } else {
        const current = watchGuide("languages") || [];
        setGuideValue("languages", [...current, input.trim()]);
      }
      setLanguagesInput("");
    }
  };

  // Remove language from array
  const removeLanguage = (type: "user" | "guide", index: number) => {
    if (type === "user") {
      const current = watchUser("languages") || [];
      const updated = current.filter((_, i) => i !== index);
      setUserValue("languages", updated);
    } else {
      const current = watchGuide("languages") || [];
      const updated = current.filter((_, i) => i !== index);
      setGuideValue("languages", updated);
    }
  };

  const removeEmptyAndNestedEmpty = (obj: any): any => {
    const cleanedObj: any = {};
    Object.entries(obj).forEach(([key, value]) => {
      if (value && typeof value === "object" && !Array.isArray(value)) {
        const nestedCleaned = removeEmptyAndNestedEmpty(value);
        if (Object.keys(nestedCleaned).length > 0) {
          cleanedObj[key] = nestedCleaned;
        }
      } else if (
        (Array.isArray(value) && value.length > 0) ||
        (!Array.isArray(value) &&
          value !== null &&
          value !== undefined &&
          value !== "")
      ) {
        cleanedObj[key] = value;
      }
    });
    return cleanedObj;
  };

  if (!userProfile)
    return (
      <div className="flex items-center justify-center min-h-screen mt-20">
        <div className="text-center">Loading user profile...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Edit Profile
            </CardTitle>
            <CardDescription>
              Update your personal and professional information
            </CardDescription>
          </CardHeader>

          <Tabs defaultValue="user" className="w-full">
            <CardContent>
              <TabsList className="grid w-full md:w-auto grid-cols-2 md:inline-flex">
                <TabsTrigger value="user" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  User Profile
                </TabsTrigger>
                {isGuide && (
                  <TabsTrigger
                    value="guide"
                    className="flex items-center gap-2"
                  >
                    <Shield className="h-4 w-4" />
                    Guide Profile
                  </TabsTrigger>
                )}
              </TabsList>
            </CardContent>

            {/* User Profile Tab */}
            <TabsContent value="user">
              <form
                onSubmit={handleSubmitUser((data) =>
                  updateUserMutation.mutate(
                    removeEmptyAndNestedEmpty({ ...data, _id: userProfile._id })
                  )
                )}
              >
                <CardContent className="space-y-8">
                  {/* Profile Image */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Profile Image</h3>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                      <div className="relative h-32 w-32 rounded-full border-2 border-dashed border-muted overflow-hidden">
                        {avatarPreview ? (
                          <>
                            <Image
                              src={
                                process.env.NEXT_PUBLIC_ClOUDFLARE_API +
                                avatarPreview
                              }
                              alt="Avatar"
                              fill
                              className="object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setAvatarPreview("");
                                setUserValue("avatar", "");
                              }}
                              className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </>
                        ) : (
                          <div className="flex h-full flex-col items-center justify-center">
                            <Upload className="h-8 w-8 text-muted-foreground" />
                            <p className="mt-2 text-sm text-muted-foreground">
                              Upload avatar
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarUpload}
                          className="cursor-pointer"
                        />
                        <p className="text-sm text-muted-foreground">
                          JPG, PNG or GIF. Max size of 2MB
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Basic Information</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          {...registerUser("firstName")}
                          placeholder="e.g., John"
                        />
                        {userErrors.firstName && (
                          <p className="text-sm text-red-600">
                            {userErrors.firstName.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          {...registerUser("lastName")}
                          placeholder="e.g., Doe"
                        />
                        {userErrors.lastName && (
                          <p className="text-sm text-red-600">
                            {userErrors.lastName.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            type="tel"
                            {...registerUser("phone")}
                            placeholder="e.g., +1 (123) 456-7890"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">
                          Date of Birth
                          <small> (we will just show birth year)</small>
                        </Label>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <Input
                            id="dateOfBirth"
                            type="date"
                            {...registerUser("dateOfBirth")}
                          />
                        </div>
                      </div>

                      <div
                        className="space-y-2"
                        key={`gender-${watchUser("gender")}`}
                      >
                        <Label htmlFor="gender">Gender</Label>
                        <Select
                          defaultValue={watchUser("gender")}
                          value={watchUser("gender")}
                          {...registerUser("gender")}
                          onValueChange={(value) =>
                            setUserValue(
                              "gender",
                              value as
                                | "male"
                                | "female"
                                | "other"
                                | "prefer_not_to_say"
                            )
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="prefer_not_to_say">
                              Prefer not to say
                            </SelectItem>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div
                        className="space-y-2"
                        key={`country-${watchUser("country")}`}
                      >
                        <Label htmlFor="city">Country</Label>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <Select
                            defaultValue={watchUser("country")}
                            value={watchUser("country")}
                            {...registerUser("country")}
                            onValueChange={(value) =>
                              setUserValue("country", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              {CountryRegionData.default.map((country) => (
                                <SelectItem key={country[0]} value={country[0]}>
                                  {country[0]}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <Input
                            id="city"
                            {...registerUser("city")}
                            placeholder="e.g., Kathmandu"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Bio</h3>
                    <div className="space-y-2">
                      <Textarea
                        {...registerUser("bio")}
                        placeholder="Tell us about yourself..."
                        rows={4}
                      />
                      <p className="text-sm text-muted-foreground">
                        {watchUser("bio")?.length || 0}/500 characters
                      </p>
                      {userErrors.bio && (
                        <p className="text-sm text-red-600">
                          {userErrors.bio.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Languages</h3>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          value={languagesInput}
                          onChange={(e) => setLanguagesInput(e.target.value)}
                          placeholder="e.g., English, Nepali, Spanish"
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addLanguage("user");
                            }
                          }}
                        />
                        <Button
                          type="button"
                          onClick={() => addLanguage("user")}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {watchUser("languages")?.map((lang, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="gap-1"
                          >
                            <Languages className="h-3 w-3" />
                            {lang}
                            <button
                              type="button"
                              onClick={() => removeLanguage("user", index)}
                              className="ml-1 rounded-full hover:bg-muted"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Social Links</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="facebook">Facebook</Label>
                        <div className="flex items-center gap-2">
                          <Facebook className="h-4 w-4 text-muted-foreground" />
                          <Input
                            id="facebook"
                            {...registerUser("socialLinks.facebook")}
                            placeholder="https://facebook.com/username"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="instagram">Instagram</Label>
                        <div className="flex items-center gap-2">
                          <Instagram className="h-4 w-4 text-muted-foreground" />
                          <Input
                            id="instagram"
                            {...registerUser("socialLinks.instagram")}
                            placeholder="https://instagram.com/username"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="twitter">Twitter</Label>
                        <div className="flex items-center gap-2">
                          <Twitter className="h-4 w-4 text-muted-foreground" />
                          <Input
                            id="twitter"
                            {...registerUser("socialLinks.twitter")}
                            placeholder="https://twitter.com/username"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <div className="flex items-center gap-2">
                          <Linkedin className="h-4 w-4 text-muted-foreground" />
                          <Input
                            id="linkedin"
                            {...registerUser("socialLinks.linkedin")}
                            placeholder="https://linkedin.com/in/username"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Emergency Contact</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContactName">Name</Label>
                        <Input
                          id="emergencyContactName"
                          {...registerUser("emergencyContactName")}
                          placeholder="Emergency contact name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="emergencyContactPhone">Phone</Label>
                        <Input
                          id="emergencyContactPhone"
                          {...registerUser("emergencyContactPhone")}
                          placeholder="Emergency contact phone"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="emergencyContactRelation">
                          Relation
                        </Label>
                        <Input
                          id="emergencyContactRelation"
                          {...registerUser("emergencyContactRelation")}
                          placeholder="e.g., Spouse, Parent, Sibling"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between border-t pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => resetUser()}
                    disabled={updateUserMutation.isPending}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={updateUserMutation.isPending}
                    className="gap-2"
                  >
                    <Save className="h-4 w-4" />
                    {updateUserMutation.isPending
                      ? "Saving..."
                      : "Save Profile"}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>

            {/* Guide Profile Tab */}
            {isGuide && (
              <TabsContent value="guide">
                <form
                  onSubmit={handleSubmitGuide((data) =>
                    updateGuideMutation.mutate(data)
                  )}
                >
                  <CardContent className="space-y-8">
                    {/* Guide Type */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Guide Type</h3>
                      <div className="flex gap-4">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            {...registerGuide("type")}
                            value="independent"
                            className="h-4 w-4 text-primary"
                          />
                          <span className="text-sm font-medium">
                            Independent Guide
                          </span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            {...registerGuide("type")}
                            value="agency"
                            className="h-4 w-4 text-primary"
                          />
                          <span className="text-sm font-medium">
                            Agency Guide
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Company Name (conditional) */}
                    {watchGuide("type") === "agency" && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Company Info</h3>
                        <div className="space-y-2">
                          <Label htmlFor="companyName">Company Name</Label>
                          <Input
                            id="companyName"
                            {...registerGuide("companyName")}
                            placeholder="Enter your company name"
                          />
                        </div>
                      </div>
                    )}

                    {/* License Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">
                        License Information
                      </h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="licenseNumber">License Number</Label>
                          <Input
                            id="licenseNumber"
                            {...registerGuide("licenseNumber")}
                            placeholder="Enter license number"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="licenseExpiry">License Expiry</Label>
                          <Input
                            id="licenseExpiry"
                            type="date"
                            {...registerGuide("licenseExpiry")}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Experience & Pricing */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">
                        Experience & Pricing
                      </h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="yearsOfExperience">
                            Years of Experience *
                          </Label>
                          <Input
                            id="yearsOfExperience"
                            type="number"
                            {...registerGuide("yearsOfExperience", {
                              valueAsNumber: true,
                            })}
                            min="0"
                            max="50"
                          />
                          {guideErrors.yearsOfExperience && (
                            <p className="text-sm text-red-600">
                              {guideErrors.yearsOfExperience.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="dailyRate">Daily Rate ($) *</Label>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <Input
                              id="dailyRate"
                              type="number"
                              {...registerGuide("pricing.dailyRate", {
                                valueAsNumber: true,
                              })}
                              min="0"
                              step="1"
                              placeholder="e.g., 100"
                            />
                          </div>
                          {guideErrors.pricing?.dailyRate && (
                            <p className="text-sm text-red-600">
                              {guideErrors.pricing.dailyRate.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expertise Regions */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">
                        Trekking Regions *
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {regions.map((region) => (
                          <label
                            key={region._id}
                            className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg border hover:bg-muted/50"
                          >
                            <input
                              type="checkbox"
                              value={region._id}
                              {...registerGuide("expertiseRegions")}
                              className="h-4 w-4 text-primary"
                            />
                            <span className="text-sm">{region.name}</span>
                          </label>
                        ))}
                      </div>
                      {guideErrors.expertiseRegions && (
                        <p className="text-sm text-red-600">
                          {guideErrors.expertiseRegions.message}
                        </p>
                      )}
                    </div>

                    {/* Specializations */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Specializations</h3>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Input
                            value={specializationsInput}
                            onChange={(e) =>
                              setSpecializationsInput(e.target.value)
                            }
                            placeholder="e.g., Mountain Climbing, Wildlife Photography"
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                const current =
                                  watchGuide("specializations") || [];
                                setGuideValue("specializations", [
                                  ...current,
                                  specializationsInput.trim(),
                                ]);
                                setSpecializationsInput("");
                              }
                            }}
                          />
                          <Button
                            type="button"
                            onClick={() => {
                              const current =
                                watchGuide("specializations") || [];
                              setGuideValue("specializations", [
                                ...current,
                                specializationsInput.trim(),
                              ]);
                              setSpecializationsInput("");
                            }}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {watchGuide("specializations")?.map((spec, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="gap-1"
                            >
                              <Award className="h-3 w-3" />
                              {spec}
                              <button
                                type="button"
                                onClick={() => {
                                  const current =
                                    watchGuide("specializations") || [];
                                  const updated = current.filter(
                                    (_, i) => i !== index
                                  );
                                  setGuideValue("specializations", updated);
                                }}
                                className="ml-1 rounded-full hover:bg-muted"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Guide Desc */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">
                        Guide Description
                      </h3>
                      <div className="space-y-2">
                        <Textarea
                          {...registerGuide("bio")}
                          placeholder="Describe your experience, guiding style, and what makes you unique..."
                          rows={6}
                        />
                        <p className="text-sm text-muted-foreground">
                          {watchGuide("bio")?.length || 0}/1000 characters
                        </p>
                        {guideErrors.bio && (
                          <p className="text-sm text-red-600">
                            {guideErrors.bio.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-between border-t pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => resetGuide()}
                      disabled={!isGuideDirty || updateGuideMutation.isPending}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={!isGuideDirty || updateGuideMutation.isPending}
                      className="gap-2"
                    >
                      <Save className="h-4 w-4" />
                      {updateGuideMutation.isPending
                        ? "Saving..."
                        : "Save Guide Profile"}
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>
            )}
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default EditProfilePage;
