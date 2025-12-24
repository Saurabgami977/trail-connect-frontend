"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ShieldCheck,
  Users,
  MapPin,
  Bell,
  Settings,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  FileText,
  AlertTriangle,
  TrendingUp,
  Calendar,
  DollarSign,
  Search,
  Plus,
  Trash2,
  Edit,
  Ban,
  Flag,
} from "lucide-react";
import {
  MOCK_GUIDES,
  TREKKING_REGIONS,
  FAKE_NOTIFICATIONS,
} from "@/lib/constants";
import {
  VerificationStatus,
  LicenseMetadata,
} from "@/components/ui/verification-status";

const pendingVerifications = [
  {
    id: "4",
    name: "Mingma Tamang",
    submittedDate: "2024-01-10",
    licenseNumber: "NTG-2018-2567",
    status: "pending",
  },
  {
    id: "5",
    name: "Dawa Gyalje",
    submittedDate: "2024-01-08",
    licenseNumber: "NTG-2020-1892",
    status: "pending",
  },
  {
    id: "6",
    name: "Lakpa Nuru",
    submittedDate: "2024-01-05",
    licenseNumber: "NTG-2019-0456",
    status: "pending",
  },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("verification");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(FAKE_NOTIFICATIONS);
  const [newNotification, setNewNotification] = useState({
    name: "",
    region: "",
    days: "",
  });

  const stats = {
    totalGuides: 124,
    verifiedGuides: 98,
    pendingVerification: pendingVerifications.length,
    totalBookings: 456,
    monthlyRevenue: 12450,
    activeRegions: TREKKING_REGIONS.length,
  };

  const addNotification = () => {
    if (
      newNotification.name &&
      newNotification.region &&
      newNotification.days
    ) {
      setNotifications([
        ...notifications,
        {
          name: newNotification.name,
          region: newNotification.region,
          days: parseInt(newNotification.days),
          country: "User",
        },
      ]);
      setNewNotification({ name: "", region: "", days: "" });
    }
  };

  const removeNotification = (index: number) => {
    setNotifications(notifications.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="pb-16">
        <div className="container mx-auto px-4">
          {/* Admin Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage guides, verifications, and platform settings
              </p>
            </div>
            <Badge variant="destructive" className="w-fit">
              <AlertTriangle className="h-3 w-3 mr-1" />
              {stats.pendingVerification} Pending Verifications
            </Badge>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Users className="h-4 w-4" />
                  <span className="text-xs">Total Guides</span>
                </div>
                <p className="text-2xl font-bold">{stats.totalGuides}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="text-xs">Verified</span>
                </div>
                <p className="text-2xl font-bold text-emerald-600">
                  {stats.verifiedGuides}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs">Pending</span>
                </div>
                <p className="text-2xl font-bold text-amber-600">
                  {stats.pendingVerification}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Calendar className="h-4 w-4" />
                  <span className="text-xs">Bookings</span>
                </div>
                <p className="text-2xl font-bold">{stats.totalBookings}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-xs">Revenue</span>
                </div>
                <p className="text-2xl font-bold">
                  ${stats.monthlyRevenue.toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <MapPin className="h-4 w-4" />
                  <span className="text-xs">Regions</span>
                </div>
                <p className="text-2xl font-bold">{stats.activeRegions}</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto p-1">
              <TabsTrigger value="verification" className="gap-2 py-2">
                <ShieldCheck className="h-4 w-4" />
                <span className="hidden sm:inline">Verification</span>
              </TabsTrigger>
              <TabsTrigger value="guides" className="gap-2 py-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Guides</span>
              </TabsTrigger>
              <TabsTrigger value="regions" className="gap-2 py-2">
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Regions</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2 py-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="moderation" className="gap-2 py-2">
                <Flag className="h-4 w-4" />
                <span className="hidden sm:inline">Moderation</span>
              </TabsTrigger>
            </TabsList>

            {/* Verification Queue Tab */}
            <TabsContent value="verification">
              <Card>
                <CardHeader>
                  <CardTitle>License Verification Queue</CardTitle>
                  <CardDescription>
                    Review and verify guide license submissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingVerifications.map((guide) => (
                      <div
                        key={guide.id}
                        className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl border"
                      >
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback>
                              {guide.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{guide.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              License: {guide.licenseNumber}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Submitted:{" "}
                              {new Date(
                                guide.submittedDate
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                          <VerificationStatus
                            status="under_review"
                            showSteps={false}
                          />
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-1"
                            >
                              <Eye className="h-4 w-4" />
                              View License
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-1 text-emerald-600 hover:text-emerald-700"
                            >
                              <CheckCircle className="h-4 w-4" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-1 text-destructive hover:text-destructive"
                            >
                              <XCircle className="h-4 w-4" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {pendingVerifications.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <ShieldCheck className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p>No pending verifications</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Guides Management Tab */}
            <TabsContent value="guides">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Guide Management</CardTitle>
                      <CardDescription>
                        View and manage all registered guides
                      </CardDescription>
                    </div>
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search guides..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {MOCK_GUIDES.filter((g) =>
                      g.name.toLowerCase().includes(searchQuery.toLowerCase())
                    ).map((guide) => (
                      <div
                        key={guide.id}
                        className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarFallback>
                              {guide.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{guide.name}</h4>
                              {guide.verified ? (
                                <Badge variant="verified" className="text-xs">
                                  Verified
                                </Badge>
                              ) : (
                                <Badge variant="pending" className="text-xs">
                                  Pending
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {guide.regions.join(", ")} •{" "}
                              {guide.completedTreks} treks
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
                          >
                            <Ban className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Regions Tab */}
            <TabsContent value="regions">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Region Management</CardTitle>
                      <CardDescription>
                        Configure trekking regions and their properties
                      </CardDescription>
                    </div>
                    <Button className="gap-1">
                      <Plus className="h-4 w-4" />
                      Add Region
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {TREKKING_REGIONS.map((region) => (
                      <div
                        key={region.id}
                        className="p-4 rounded-xl border hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{region.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {region.description}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <Badge variant="region">{region.difficulty}</Badge>
                          <span>Max: {region.maxAltitude}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Fake Notification Manager</CardTitle>
                  <CardDescription>
                    Manage the rotating booking notifications shown to visitors
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Add New Notification */}
                  <div className="p-4 bg-muted/50 rounded-lg space-y-4">
                    <h4 className="font-medium">Add New Notification</h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <Input
                        placeholder="Name (e.g., John D.)"
                        value={newNotification.name}
                        onChange={(e) =>
                          setNewNotification({
                            ...newNotification,
                            name: e.target.value,
                          })
                        }
                      />
                      <Select
                        value={newNotification.region}
                        onValueChange={(v) =>
                          setNewNotification({ ...newNotification, region: v })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          {TREKKING_REGIONS.map((r) => (
                            <SelectItem key={r.id} value={r.name}>
                              {r.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Days (e.g., 14)"
                        type="number"
                        value={newNotification.days}
                        onChange={(e) =>
                          setNewNotification({
                            ...newNotification,
                            days: e.target.value,
                          })
                        }
                      />
                      <Button onClick={addNotification}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>

                  {/* Notification List */}
                  <div className="space-y-2">
                    {notifications.map((notif, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border"
                      >
                        <p className="text-sm">
                          <span className="font-medium">{notif.name}</span>{" "}
                          booked a {notif.days}-day trek to{" "}
                          <span className="font-medium">{notif.region}</span>
                        </p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => removeNotification(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Moderation Tab */}
            <TabsContent value="moderation">
              <Card>
                <CardHeader>
                  <CardTitle>Content Moderation</CardTitle>
                  <CardDescription>
                    Review flagged content and manage guide status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border border-amber-200 bg-amber-50">
                      <div className="flex items-start gap-3">
                        <Flag className="h-5 w-5 text-amber-600 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">
                              Review flagged for inappropriate content
                            </h4>
                            <Badge variant="pending">Pending Review</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            A review on Pemba Dorje's profile was flagged by 2
                            users.
                          </p>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" variant="outline">
                              View Content
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-emerald-600"
                            >
                              Dismiss
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-destructive"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">
                              Guide inactive for 90+ days
                            </h4>
                            <Badge variant="secondary">Info</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Dawa Gyalje has not updated their availability in 94
                            days.
                          </p>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" variant="outline">
                              Send Reminder
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-destructive"
                            >
                              Disable Listing
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
