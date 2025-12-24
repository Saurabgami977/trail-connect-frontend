"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Filter,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  MapPin,
  Star,
  Calendar,
  Download,
  UserPlus,
  RefreshCw,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getAll } from "@/api/routes/guide";

export default function GuidesPage() {
  const [guides, setGuides] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [verificationFilter, setVerificationFilter] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [guideToDelete, setGuideToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    blocked: 0,
    verified: 0,
    pending: 0,
  });

  const {
    data: allGuides,
    isPending,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["guides"],
    queryFn: getAll,
  });

  useEffect(() => {
    if (isSuccess) {
      setGuides(allGuides);
      calculateStats();
    }
    if (isError) {
      toast.error("Failed to fetch guides");
    }
  }, [guides, isSuccess]);

  const calculateStats = () => {
    if (guides) {
      const total = guides.length;
      const active = guides.filter((g) => g.user.status === "active").length;
      const inactive = guides.filter(
        (g) => g.user.status === "inactive"
      ).length;
      const blocked = guides.filter((g) => g.user.status === "blocked").length;
      const verified = guides.filter(
        (g) => g.verificationStatus === "verified"
      ).length;
      const pending = guides.filter(
        (g) => g.verificationStatus === "pending"
      ).length;

      setStats({ total, active, inactive, blocked, verified, pending });
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setLoading(true);
    try {
      // API call would go here
      setGuides((prev) =>
        prev.map((guide) =>
          guide._id === id ? { ...guide, status: newStatus } : guide
        )
      );
      toast.success(
        `Guide ${newStatus === "blocked" ? "blocked" : "activated"}`
      );
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!guideToDelete) return;

    setLoading(true);
    try {
      // API call would go here
      setGuides((prev) => prev.filter((guide) => guide._id !== guideToDelete));
      toast.success("Guide deleted successfully");
      setDeleteDialogOpen(false);
      setGuideToDelete(null);
    } catch (error) {
      toast.error("Failed to delete guide");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge variant="outline" className="text-muted-foreground">
            Inactive
          </Badge>
        );
      case "blocked":
        return <Badge variant="destructive">Blocked</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
            <CheckCircle className="h-3 w-3 mr-1" /> Verified
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-amber-100 text-amber-700 border-amber-200">
            <Clock className="h-3 w-3 mr-1" /> Pending
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" /> Rejected
          </Badge>
        );
      case "unverified":
        return (
          <Badge variant="outline" className="text-muted-foreground">
            Unverified
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Guides Management
          </h1>
          <p className="text-muted-foreground">
            Manage all registered guides on the platform
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => {
              /* Refresh */
            }}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Guide
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Guides</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span className="text-emerald-600">+12%</span> from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Guides</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <div className="text-xs text-muted-foreground">
              {Math.round((stats.active / stats.total) * 100)}% of total
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified</CardTitle>
            <Shield className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.verified}</div>
            <div className="text-xs text-muted-foreground">
              {stats.pending} pending verification
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blocked</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.blocked}</div>
            <div className="text-xs text-muted-foreground">
              {Math.round((stats.blocked / stats.total) * 100)}% of total
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Filters and Search */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search guides by name, email, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Status
                {statusFilter !== "all" && <Badge className="ml-2">1</Badge>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                All Status
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                Active Only
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>
                Inactive Only
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("blocked")}>
                Blocked Only
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Shield className="mr-2 h-4 w-4" />
                Verification
                {verificationFilter !== "all" && (
                  <Badge className="ml-2">1</Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setVerificationFilter("all")}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setVerificationFilter("verified")}
              >
                Verified
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setVerificationFilter("pending")}
              >
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setVerificationFilter("unverified")}
              >
                Unverified
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setVerificationFilter("rejected")}
              >
                Rejected
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Guides Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Guide</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Verification</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          {isSuccess && (
            <TableBody>
              {allGuides?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2">
                      <Users className="h-12 w-12 text-muted-foreground" />
                      <p className="text-muted-foreground">No guides found</p>
                      <p className="text-sm text-muted-foreground">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                allGuides?.map((guide) => (
                  <TableRow key={guide._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                          <Image
                            src={guide.avatar}
                            alt={guide.user.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">
                            {guide.user.firstName + " " + guide.user.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ID: {guide._id}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{guide.user.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{guide.user.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{guide.user.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{guide.totalTreksLed}</div>
                      <div className="text-xs text-muted-foreground">
                        {guide.totalBookings} bookings
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(guide.user.status)}</TableCell>
                    <TableCell>
                      {getVerificationBadge(guide.verificationStatus)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                        <span className="font-medium">{guide.avgRating}</span>
                        <span className="text-xs text-muted-foreground">
                          ({guide.totalTreksLed})
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              /* View profile */
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              /* Edit guide */
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {guide.status === "active" ? (
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(guide._id, "blocked")
                              }
                              className="text-amber-600"
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Block Guide
                            </DropdownMenuItem>
                          ) : guide.status === "blocked" ? (
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(guide._id, "active")
                              }
                              className="text-emerald-600"
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Unblock Guide
                            </DropdownMenuItem>
                          ) : null}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => {
                              setGuideToDelete(guide._id);
                              setDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          )}
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Guide</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this guide? This action cannot be
              undone. All associated bookings and reviews will be removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete Guide"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
