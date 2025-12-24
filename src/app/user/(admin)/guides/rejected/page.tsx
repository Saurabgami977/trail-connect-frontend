"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Shield,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Calendar,
  AlertTriangle,
  RefreshCw,
  Download,
  Ban,
  CheckCircle,
  Clock,
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import Image from "next/image";

// Mock blocked users data
const mockBlockedUsers = [
  {
    _id: "1",
    userId: "U001",
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    phone: "+977-9841122334",
    avatar: "/api/placeholder/40/40",
    userType: "customer",
    blockedDate: "2024-01-10",
    blockedBy: "Admin User",
    blockReason: "Multiple fraudulent booking attempts",
    blockDuration: "permanent",
    status: "active",
    totalBookings: 5,
    reports: 3,
    lastActive: "2024-01-09",
    notes: "User tried to book with stolen credit cards multiple times",
  },
  {
    _id: "2",
    userId: "G002",
    name: "Pemba Lama",
    email: "pemba@example.com",
    phone: "+977-9801234567",
    avatar: "/api/placeholder/40/40",
    userType: "guide",
    blockedDate: "2023-12-20",
    blockedBy: "System",
    blockReason: "License expired, failed verification",
    blockDuration: "temporary",
    status: "blocked",
    totalBookings: 67,
    reports: 1,
    lastActive: "2023-12-19",
    notes: "Guide license expired, needs to renew and reapply",
    unblockDate: "2024-02-20",
  },
  {
    _id: "3",
    userId: "U003",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1-555-0123",
    avatar: "/api/placeholder/40/40",
    userType: "customer",
    blockedDate: "2023-11-15",
    blockedBy: "Admin User",
    blockReason: "Harassment of guides",
    blockDuration: "30 days",
    status: "expired",
    totalBookings: 12,
    reports: 5,
    lastActive: "2023-11-14",
    notes: "User was harassing guides via messages. Blocked for 30 days.",
    unblockDate: "2023-12-15",
  },
  {
    _id: "4",
    userId: "G004",
    name: "Karma Sherpa",
    email: "karma@example.com",
    phone: "+977-9811223344",
    avatar: "/api/placeholder/40/40",
    userType: "guide",
    blockedDate: "2024-01-05",
    blockedBy: "Admin User",
    blockReason: "No-show for multiple bookings",
    blockDuration: "60 days",
    status: "active",
    totalBookings: 23,
    reports: 8,
    lastActive: "2024-01-04",
    notes: "Guide failed to show up for 3 consecutive bookings without notice",
    unblockDate: "2024-03-05",
  },
  {
    _id: "5",
    userId: "U005",
    name: "Michael Chen",
    email: "michael@example.com",
    phone: "+86-13800138000",
    avatar: "/api/placeholder/40/40",
    userType: "customer",
    blockedDate: "2023-10-01",
    blockedBy: "System",
    blockReason: "Chargeback fraud",
    blockDuration: "permanent",
    status: "active",
    totalBookings: 3,
    reports: 2,
    lastActive: "2023-09-30",
    notes: "User filed fraudulent chargebacks after completing trips",
    unblockDate: "permanent",
  },
];

export default function BlockedUsersPage() {
  const [blockedUsers, setBlockedUsers] = useState(mockBlockedUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [userTypeFilter, setUserTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("active");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [unblockDialogOpen, setUnblockDialogOpen] = useState(false);
  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [newBlockReason, setNewBlockReason] = useState("");
  const [newBlockDuration, setNewBlockDuration] = useState("30");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    customers: 0,
    guides: 0,
    active: 0,
    expired: 0,
    permanent: 0,
  });

  useEffect(() => {
    calculateStats();
  }, [blockedUsers]);

  const calculateStats = () => {
    const total = blockedUsers.length;
    const customers = blockedUsers.filter(
      (u) => u.userType === "customer"
    ).length;
    const guides = blockedUsers.filter((u) => u.userType === "guide").length;
    const active = blockedUsers.filter((u) => u.status === "active").length;
    const expired = blockedUsers.filter((u) => u.status === "expired").length;
    const permanent = blockedUsers.filter(
      (u) => u.blockDuration === "permanent"
    ).length;

    setStats({ total, customers, guides, active, expired, permanent });
  };

  const filteredUsers = blockedUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      userTypeFilter === "all" || user.userType === userTypeFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="destructive">Blocked</Badge>;
      case "expired":
        return (
          <Badge variant="outline" className="text-muted-foreground">
            Expired
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getUserTypeBadge = (userType: string) => {
    switch (userType) {
      case "customer":
        return (
          <Badge className="bg-blue-100 text-blue-700 border-blue-200">
            Customer
          </Badge>
        );
      case "guide":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
            Guide
          </Badge>
        );
      default:
        return <Badge variant="outline">{userType}</Badge>;
    }
  };

  const getDurationBadge = (duration: string) => {
    switch (duration) {
      case "permanent":
        return <Badge variant="destructive">Permanent</Badge>;
      case "temporary":
        return (
          <Badge className="bg-amber-100 text-amber-700 border-amber-200">
            Temporary
          </Badge>
        );
      default:
        return (
          <Badge className="bg-amber-100 text-amber-700 border-amber-200">
            {duration} days
          </Badge>
        );
    }
  };

  const handleUnblock = async (userId: string) => {
    setLoading(true);
    try {
      // API call would go here
      setBlockedUsers((prev) => prev.filter((user) => user._id !== userId));
      toast.success("User unblocked successfully");
      setUnblockDialogOpen(false);
      setSelectedUser(null);
    } catch (error) {
      toast.error("Failed to unblock user");
    } finally {
      setLoading(false);
    }
  };

  const handleBlockUser = async () => {
    if (!newBlockReason.trim()) {
      toast.error("Please provide a block reason");
      return;
    }

    setLoading(true);
    try {
      // API call would go here
      // This would typically come from a form
      const newBlockedUser = {
        _id: Date.now().toString(),
        userId: "U" + Date.now().toString().slice(-6),
        name: "New User",
        email: "new@example.com",
        phone: "+977-9800000000",
        avatar: "/api/placeholder/40/40",
        userType: "customer",
        blockedDate: new Date().toISOString().split("T")[0],
        blockedBy: "Admin User",
        blockReason: newBlockReason,
        blockDuration:
          newBlockDuration === "permanent"
            ? "permanent"
            : `${newBlockDuration} days`,
        status: "active",
        totalBookings: 0,
        reports: 1,
        lastActive: new Date().toISOString().split("T")[0],
        notes: "",
      };

      setBlockedUsers((prev) => [...prev, newBlockedUser]);
      toast.success("User blocked successfully");
      setBlockDialogOpen(false);
      setNewBlockReason("");
      setNewBlockDuration("30");
    } catch (error) {
      toast.error("Failed to block user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blocked Users</h1>
          <p className="text-muted-foreground">
            Manage blocked users and guides on the platform
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
          <Button
            variant="destructive"
            onClick={() => setBlockDialogOpen(true)}
          >
            <Ban className="mr-2 h-4 w-4" />
            Block User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blocked</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-xs text-muted-foreground">
              {stats.customers} customers, {stats.guides} guides
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Blocks</CardTitle>
            <Ban className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <div className="text-xs text-muted-foreground">
              Currently blocked users
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Expired Blocks
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.expired}</div>
            <div className="text-xs text-muted-foreground">
              Auto-unblocked users
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Permanent Blocks
            </CardTitle>
            <Shield className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.permanent}</div>
            <div className="text-xs text-muted-foreground">
              Permanent suspensions
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
            placeholder="Search blocked users by name, email, or user ID..."
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
                User Type
                {userTypeFilter !== "all" && <Badge className="ml-2">1</Badge>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setUserTypeFilter("all")}>
                All Types
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setUserTypeFilter("customer")}>
                Customers Only
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setUserTypeFilter("guide")}>
                Guides Only
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Ban className="mr-2 h-4 w-4" />
                Status
                {statusFilter !== "all" && <Badge className="ml-2">1</Badge>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                All Status
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                Active Blocks
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("expired")}>
                Expired Blocks
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Blocked Users Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Block Details</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reports</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="flex flex-col items-center gap-2">
                    <Shield className="h-12 w-12 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      No blocked users found
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your search or filters
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          <span>{user.email}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getUserTypeBadge(user.userType)}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">
                        <span className="font-medium">Reason:</span>{" "}
                        {user.blockReason}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Blocked by {user.blockedBy} on {user.blockedDate}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getDurationBadge(user.blockDuration)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <span>{user.reports}</span>
                      <span className="text-xs text-muted-foreground">
                        reports
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
                        <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        {user.status === "active" && (
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedUser(user);
                              setUnblockDialogOpen(true);
                            }}
                            className="text-emerald-600"
                          >
                            <UserCheck className="mr-2 h-4 w-4" />
                            Unblock User
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-destructive">
                          <UserX className="mr-2 h-4 w-4" />
                          Extend Block
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* User Details Dialog */}
      {selectedUser && (
        <Dialog
          open={!!selectedUser}
          onOpenChange={() => setSelectedUser(null)}
        >
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Blocked User Details</DialogTitle>
              <DialogDescription>
                Complete information about the blocked user
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* User Info */}
              <div className="flex items-start gap-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-full">
                  <Image
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold">{selectedUser.name}</h3>
                    {getUserTypeBadge(selectedUser.userType)}
                    {getStatusBadge(selectedUser.status)}
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">User ID:</span>
                      <p className="font-medium">{selectedUser.userId}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Email:</span>
                      <p className="font-medium">{selectedUser.email}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Phone:</span>
                      <p className="font-medium">{selectedUser.phone}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Last Active:
                      </span>
                      <p className="font-medium">{selectedUser.lastActive}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Block Details */}
              <div>
                <h4 className="font-semibold">Block Information</h4>
                <div className="mt-3 grid grid-cols-2 gap-4 rounded-lg border p-4">
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Blocked Date:
                    </span>
                    <p className="font-medium">{selectedUser.blockedDate}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Blocked By:
                    </span>
                    <p className="font-medium">{selectedUser.blockedBy}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Block Duration:
                    </span>
                    <div className="mt-1">
                      {getDurationBadge(selectedUser.blockDuration)}
                    </div>
                  </div>
                  {selectedUser.unblockDate && (
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Unblock Date:
                      </span>
                      <p className="font-medium">{selectedUser.unblockDate}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Reason and Notes */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Block Reason</h4>
                  <p className="mt-2 text-muted-foreground">
                    {selectedUser.blockReason}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">Admin Notes</h4>
                  <p className="mt-2 text-muted-foreground">
                    {selectedUser.notes || "No additional notes provided"}
                  </p>
                </div>
              </div>

              {/* User Stats */}
              <div>
                <h4 className="font-semibold">User Statistics</h4>
                <div className="mt-3 grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {selectedUser.totalBookings}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Total Bookings
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {selectedUser.reports}
                        </div>
                        <p className="text-sm text-muted-foreground">Reports</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {selectedUser.userType === "guide"
                            ? "Guide"
                            : "Customer"}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          User Type
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2">
              {selectedUser.status === "active" && (
                <Button
                  variant="outline"
                  className="text-emerald-600"
                  onClick={() => {
                    setUnblockDialogOpen(true);
                  }}
                >
                  <UserCheck className="mr-2 h-4 w-4" />
                  Unblock User
                </Button>
              )}
              <Button variant="outline" onClick={() => setSelectedUser(null)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Unblock Confirmation Dialog */}
      <Dialog open={unblockDialogOpen} onOpenChange={setUnblockDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unblock User</DialogTitle>
            <DialogDescription>
              Are you sure you want to unblock {selectedUser?.name}? This will
              restore all their platform access.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setUnblockDialogOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={() => selectedUser && handleUnblock(selectedUser._id)}
              disabled={loading}
            >
              {loading ? "Processing..." : "Unblock User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Block User Dialog */}
      <Dialog open={blockDialogOpen} onOpenChange={setBlockDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Block New User</DialogTitle>
            <DialogDescription>
              Enter details to block a user from the platform
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="user-search">Search User</Label>
              <Input
                id="user-search"
                placeholder="Search by email or user ID..."
              />
              <p className="text-xs text-muted-foreground">
                Note: You'll need to select a user from search results
              </p>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="block-reason">Block Reason *</Label>
                <Textarea
                  id="block-reason"
                  value={newBlockReason}
                  onChange={(e) => setNewBlockReason(e.target.value)}
                  placeholder="Provide clear reason for blocking..."
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="block-duration">Block Duration</Label>
                <select
                  id="block-duration"
                  value={newBlockDuration}
                  onChange={(e) => setNewBlockDuration(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="7">7 days</option>
                  <option value="30">30 days</option>
                  <option value="60">60 days</option>
                  <option value="90">90 days</option>
                  <option value="permanent">Permanent</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-notes">Admin Notes (Optional)</Label>
                <Textarea
                  id="admin-notes"
                  placeholder="Additional notes for internal reference..."
                  rows={2}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setBlockDialogOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleBlockUser}
              disabled={loading || !newBlockReason.trim()}
            >
              {loading ? "Processing..." : "Block User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
