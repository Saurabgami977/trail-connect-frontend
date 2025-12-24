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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  User,
  MapPin,
  Calendar,
  AlertCircle,
  Download,
  Filter,
  Search,
  Eye,
  Mail,
  Phone,
  ExternalLink,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getUnverified } from "@/api/routes/guide";
import { Guide } from "@/types/trekking-regions";

export default function VerificationPage() {
  const [verifications, setVerifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [selectedVerification, setSelectedVerification] = useState<any>(null);
  const [reviewNotes, setReviewNotes] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    pending: 0,
    underReview: 0,
    approved: 0,
    rejected: 0,
    total: 0,
  });

  const {
    data: allGuides,
    isPending,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["unverifiedguides"],
    queryFn: getUnverified,
  });

  useEffect(() => {
    if (isSuccess && allGuides) {
      setVerifications(allGuides);
    }
  }, [verifications, isSuccess, allGuides]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-amber-100 text-amber-700 border-amber-200">
            <Clock className="h-3 w-3 mr-1" /> Pending
          </Badge>
        );
      case "under_review":
        return (
          <Badge className="bg-blue-100 text-blue-700 border-blue-200">
            <Eye className="h-3 w-3 mr-1" /> Under Review
          </Badge>
        );
      case "approved":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
            <CheckCircle className="h-3 w-3 mr-1" /> Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" /> Rejected
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleStartReview = (verification: any) => {
    setSelectedVerification(verification);
    setReviewNotes(verification.notes || "");
  };

  const handleApprove = async () => {
    if (!selectedVerification) return;

    setLoading(true);
    try {
      // API call would go here
      toast.success("Guide verification approved");
      setSelectedVerification(null);
    } catch (error) {
      toast.error("Failed to approve verification");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!selectedVerification || !rejectionReason.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }

    setLoading(true);
    try {
      // API call would go here
      toast.success("Guide verification rejected");
      setSelectedVerification(null);
      setRejectionReason("");
    } catch (error) {
      toast.error("Failed to reject verification");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestMoreInfo = async () => {
    if (!selectedVerification) return;

    setLoading(true);
    try {
      // API call would go here
      toast.success("More information requested");
      setSelectedVerification(null);
    } catch (error) {
      toast.error("Failed to send request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Guide Verification
          </h1>
          <p className="text-muted-foreground">
            Review and verify guide license submissions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Submissions
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-xs text-muted-foreground">
              All time submissions
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <div className="text-xs text-muted-foreground">Awaiting review</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <Eye className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.underReview}</div>
            <div className="text-xs text-muted-foreground">Being reviewed</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approved}</div>
            <div className="text-xs text-muted-foreground">Verified guides</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rejected}</div>
            <div className="text-xs text-muted-foreground">
              Failed verification
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Verification List */}
        <div className="lg:col-span-2">
          <div className="mb-6 space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by guide name, license number, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>

              <div className="flex gap-2">
                <Tabs
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                  className="w-[400px]"
                >
                  <TabsList>
                    <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
                    <TabsTrigger value="pending">
                      Pending ({stats.pending})
                    </TabsTrigger>
                    <TabsTrigger value="under_review">
                      Review ({stats.underReview})
                    </TabsTrigger>
                    <TabsTrigger value="approved">
                      Approved ({stats.approved})
                    </TabsTrigger>
                    <TabsTrigger value="rejected">
                      Rejected ({stats.rejected})
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>

          {/* Verification Cards */}
          <div>
            {!isPending && (
              <div className="space-y-4">
                {verifications.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Shield className="h-12 w-12 text-muted-foreground" />
                      <p className="mt-4 text-muted-foreground">
                        No verification requests found
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Try adjusting your search or filters
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  verifications.map((verification: Guide) => (
                    <Card
                      key={verification._id}
                      className="cursor-pointer hover:border-primary/50"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className="relative h-14 w-14 overflow-hidden rounded-full">
                              <Image
                                src={verification?.guideAvatar}
                                alt={verification?.guideName}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">
                                  {verification?.user?.name}
                                </h3>
                                {getStatusBadge(verification?.user?.status)}
                              </div>
                              <div className="mt-2 space-y-1 text-sm">
                                <div className="flex items-center gap-2">
                                  <Mail className="h-3 w-3 text-muted-foreground" />
                                  <span>{verification.user.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="h-3 w-3 text-muted-foreground" />
                                  <span>{verification.user.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-3 w-3 text-muted-foreground" />
                                  <span>{verification.guideLocation}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">
                              Submitted:{" "}
                              {new Date(verification.createdAt).getDate()}
                            </div>
                            <div className="mt-2">
                              <Button
                                size="sm"
                                onClick={() => handleStartReview(verification)}
                                disabled={
                                  verification.verificationStatus ===
                                    "approved" ||
                                  verification.verificationStatus === "rejected"
                                }
                              >
                                {verification.verificationStatus === "pending"
                                  ? "Start Review"
                                  : "View Details"}
                              </Button>
                            </div>
                          </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="grid gap-4 md:grid-cols-3">
                          <div>
                            <h4 className="font-medium">License Details</h4>
                            <div className="mt-2 space-y-1 text-sm">
                              <div>Number: {verification.licenseNumber}</div>
                              <div>Expiry: {verification.licenseExpiry}</div>
                              <div>Experience: {verification.experience}</div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium">Documents</h4>
                            <div className="mt-2 space-y-1">
                              {verification.documents.licenseScan ? (
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-muted-foreground" />
                                  <a
                                    href={
                                      process.env.NEXT_PUBLIC_ClOUDFLARE_API +
                                      verification.documents.licenseScan
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm underline"
                                  >
                                    View License Scan
                                  </a>
                                </div>
                              ) : (
                                <p className="text-sm text-muted-foreground">
                                  No documents submitted
                                </p>
                              )}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium">Notes</h4>
                            <p className="mt-2 text-sm text-muted-foreground">
                              {verification.notes || "No notes available"}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Review Panel */}
        <div className="lg:col-span-1 mt-16">
          {selectedVerification ? (
            <Card className="">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Review Verification
                </CardTitle>
                <CardDescription>
                  Review documents and make a decision
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Guide Info */}
                <div>
                  <h3 className="font-medium">Guide Information</h3>
                  <div className="mt-3 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded-full">
                        <Image
                          src={selectedVerification.guideAvatar}
                          alt={selectedVerification.guideName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">
                          {selectedVerification.user.firstName +
                            " " +
                            selectedVerification.user.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {selectedVerification.user.email}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Phone:</span>
                        <p>{selectedVerification.user.phone}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Location:</span>
                        <p>{selectedVerification.guideLocation}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* License Details */}
                <div>
                  <h3 className="font-medium">License Details</h3>
                  <div className="mt-3 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        License Number:
                      </span>
                      <span className="font-medium">
                        {selectedVerification.licenseNumber}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Expiry Date:
                      </span>
                      <span
                        className={
                          new Date(selectedVerification.licenseExpiry) >
                          new Date()
                            ? "text-emerald-600"
                            : "text-red-600"
                        }
                      >
                        {selectedVerification.licenseExpiry}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Experience:</span>
                      <span>{selectedVerification.experience}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Documents */}
                <div>
                  <h3 className="font-medium">Submitted Documents</h3>
                  <div className="mt-3 space-y-2">
                    {selectedVerification.documents.licenseScan ? (
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <a
                          href={
                            process.env.NEXT_PUBLIC_ClOUDFLARE_API +
                            selectedVerification.documents.licenseScan
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          View License Scan
                        </a>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No documents submitted
                      </p>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Review Notes */}
                <div>
                  <Label htmlFor="review-notes">Review Notes</Label>
                  <Textarea
                    id="review-notes"
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    placeholder="Add notes about this verification..."
                    className="mt-2"
                    rows={4}
                  />
                </div>

                {selectedVerification.verificationStatus === "pending" && (
                  <>
                    {/* Rejection Reason */}
                    <div>
                      <Label htmlFor="rejection-reason">
                        Rejection Reason (if rejecting)
                      </Label>
                      <Textarea
                        id="rejection-reason"
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder="Provide clear reason for rejection..."
                        className="mt-2"
                        rows={3}
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <Button
                        className="w-full"
                        onClick={handleApprove}
                        disabled={loading}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Approve Verification
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleRequestMoreInfo}
                        disabled={loading}
                      >
                        <AlertCircle className="mr-2 h-4 w-4" />
                        Request More Information
                      </Button>

                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={handleReject}
                        disabled={loading || !rejectionReason.trim()}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject Verification
                      </Button>
                    </div>
                  </>
                )}

                {/* View Only for approved/rejected */}
                {(selectedVerification.verificationStatus === "approved" ||
                  selectedVerification.verificationStatus === "rejected") && (
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2 font-medium">
                      {selectedVerification.verificationStatus ===
                      "approved" ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                          Approved on {selectedVerification.approvedDate}
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 text-red-500" />
                          Rejected on {selectedVerification.rejectedDate}
                        </>
                      )}
                    </div>
                    {selectedVerification.verificationStatus === "rejected" && (
                      <div className="mt-2 text-sm">
                        <span className="font-medium">Reason:</span>
                        <p className="mt-1 text-muted-foreground">
                          {selectedVerification.rejectionReason}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
              <div className="border-t p-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setSelectedVerification(null)}
                >
                  Close Review
                </Button>
              </div>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Shield className="h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-center text-muted-foreground">
                  Select a verification request to review
                </p>
                <p className="text-center text-sm text-muted-foreground">
                  Click "Start Review" on any pending verification
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
