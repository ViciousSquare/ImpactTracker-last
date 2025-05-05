import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getQueryFn, apiRequest, queryClient } from "@/lib/queryClient";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const VerificationManager = () => {
  const { toast } = useToast();
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [reviewNotes, setReviewNotes] = useState("");
  const [reviewDecision, setReviewDecision] = useState<"approve" | "reject">("approve");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("requests");

  // Get verification requests
  const {
    data: requestsData,
    isLoading,
  } = useQuery({
    queryKey: [
      "/api/verification-requests", 
      { 
        status: statusFilter, 
        requestType: typeFilter, 
        page 
      }
    ],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  // Process verification request mutation
  const processRequestMutation = useMutation({
    mutationFn: async ({ 
      id, 
      status, 
      notes 
    }: { 
      id: number; 
      status: string; 
      notes: string; 
    }) => {
      return apiRequest(`/api/verification-requests/${id}/process`, {
        method: "POST",
        body: JSON.stringify({ status, notes }),
      });
    },
    onSuccess: () => {
      toast({
        title: "Request processed",
        description: `The verification request has been ${reviewDecision === "approve" ? "approved" : "rejected"}.`,
      });
      setIsReviewDialogOpen(false);
      setSelectedRequest(null);
      setReviewNotes("");
      queryClient.invalidateQueries({ queryKey: ["/api/verification-requests"] });
      queryClient.invalidateQueries({ queryKey: ["/api/statistics"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to process verification request.",
        variant: "destructive",
      });
    },
  });

  // Assign verification request mutation
  const assignRequestMutation = useMutation({
    mutationFn: async ({ 
      id, 
      assignedTo 
    }: { 
      id: number; 
      assignedTo: number | null; 
    }) => {
      return apiRequest(`/api/verification-requests/${id}/assign`, {
        method: "POST",
        body: JSON.stringify({ assignedTo }),
      });
    },
    onSuccess: () => {
      toast({
        title: "Request assigned",
        description: "The verification request has been assigned.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/verification-requests"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to assign verification request.",
        variant: "destructive",
      });
    },
  });

  const handleReviewRequest = (request: any) => {
    setSelectedRequest(request);
    setReviewNotes("");
    setReviewDecision("approve");
    setIsReviewDialogOpen(true);
  };

  const handleProcessRequest = () => {
    if (!selectedRequest) return;
    
    processRequestMutation.mutate({
      id: selectedRequest.id,
      status: reviewDecision === "approve" ? "approved" : "rejected",
      notes: reviewNotes,
    });
  };

  const handleAssignToMe = (id: number) => {
    // In a real app, this would use the current user's ID
    assignRequestMutation.mutate({
      id,
      assignedTo: 1, // Admin user ID
    });
  };

  const handleUnassign = (id: number) => {
    assignRequestMutation.mutate({
      id,
      assignedTo: null,
    });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'pending':
        return 'secondary';
      case 'approved':
        return 'default';
      case 'rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'self-reported':
        return 'outline';
      case 'verified':
        return 'secondary';
      case 'audited':
        return 'default';
      default:
        return 'outline';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Verification Management</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="requests">Verification Requests</TabsTrigger>
          <TabsTrigger value="guidelines">Verification Guidelines</TabsTrigger>
        </TabsList>
        
        <TabsContent value="requests" className="mt-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Verification Requests</CardTitle>
              <CardDescription>
                Review and process organization verification requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select
                  value={typeFilter}
                  onValueChange={setTypeFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    <SelectItem value="self-reported">Self-Reported</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="audited">Audited</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {isLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Organization</TableHead>
                        <TableHead>Request Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Requested By</TableHead>
                        <TableHead>Assigned To</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {requestsData?.requests && requestsData.requests.length > 0 ? (
                        requestsData.requests.map((request: any) => (
                          <TableRow key={request.id}>
                            <TableCell className="font-medium">
                              {request.organization?.name || `Organization #${request.organizationId}`}
                            </TableCell>
                            <TableCell>
                              <Badge variant={getTypeBadgeVariant(request.requestType)}>
                                {request.requestType}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={getStatusBadgeVariant(request.status)}>
                                {request.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {request.requestedByUser?.username || request.requestedBy}
                            </TableCell>
                            <TableCell>
                              {request.assignedToUser?.username || 
                                (request.assignedTo ? `User #${request.assignedTo}` : 'Unassigned')}
                            </TableCell>
                            <TableCell>{formatDate(request.createdAt)}</TableCell>
                            <TableCell>
                              {request.status === 'pending' && (
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      Actions <span className="material-icons text-sm ml-1">expand_more</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleReviewRequest(request)}>
                                      <span className="material-icons text-sm mr-2">rate_review</span> Review
                                    </DropdownMenuItem>
                                    {request.assignedTo ? (
                                      <DropdownMenuItem onClick={() => handleUnassign(request.id)}>
                                        <span className="material-icons text-sm mr-2">person_remove</span> Unassign
                                      </DropdownMenuItem>
                                    ) : (
                                      <DropdownMenuItem onClick={() => handleAssignToMe(request.id)}>
                                        <span className="material-icons text-sm mr-2">person_add</span> Assign to me
                                      </DropdownMenuItem>
                                    )}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              )}
                              
                              {request.status !== 'pending' && (
                                <Button variant="ghost" size="sm" disabled>
                                  Completed
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                            No verification requests found matching your filters.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}

              {requestsData?.total && requestsData.total > 0 && (
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-muted-foreground">
                    Showing {Math.min((page - 1) * 10 + 1, requestsData.total)} to{" "}
                    {Math.min(page * 10, requestsData.total)} of {requestsData.total} requests
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(page + 1)}
                      disabled={page * 10 >= (requestsData.total || 0)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="guidelines" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Verification Guidelines</CardTitle>
              <CardDescription>
                Standards and procedures for verifying organization data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Self-Reported</h3>
                <p className="text-muted-foreground">
                  Organizations provide their own data without external validation. Review the submitted information for 
                  completeness and appropriateness. Ensure the organization exists and the data seems reasonable.
                </p>
                <div className="mt-2 bg-amber-50 p-3 rounded-md border border-amber-100">
                  <span className="font-medium text-amber-700">Review Guidelines:</span>
                  <ul className="list-disc list-inside mt-1 text-amber-700">
                    <li>Verify the organization exists (website, public records)</li>
                    <li>Check that impact claims are reasonable for the organization size</li>
                    <li>Ensure data is formatted consistently and completely</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Verified</h3>
                <p className="text-muted-foreground">
                  Basic Impacts has reviewed and confirmed the organization's data. This involves checking 
                  supporting documents, contacting the organization, and validating key metrics.
                </p>
                <div className="mt-2 bg-orange-50 p-3 rounded-md border border-orange-100">
                  <span className="font-medium text-orange-700">Verification Process:</span>
                  <ul className="list-disc list-inside mt-1 text-orange-700">
                    <li>Review at least 2 years of impact reports or annual reports</li>
                    <li>Validate metrics through email or call with organization leader</li>
                    <li>Cross-reference with public data or industry benchmarks</li>
                    <li>Ensure all score components are calculated and validated</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Audited</h3>
                <p className="text-muted-foreground">
                  The highest level of verification, performed by independent auditors or experts. This includes 
                  on-site visits, detailed document review, and comprehensive validation of all claims.
                </p>
                <div className="mt-2 bg-teal-50 p-3 rounded-md border border-teal-100">
                  <span className="font-medium text-teal-700">Audit Requirements:</span>
                  <ul className="list-disc list-inside mt-1 text-teal-700">
                    <li>Independent third-party verification</li>
                    <li>Comprehensive document review including financial statements</li>
                    <li>On-site visit with direct assessment of programs</li>
                    <li>Interviews with leadership, staff, and beneficiaries</li>
                    <li>Data trail validation from collection to reporting</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Review Dialog */}
      {selectedRequest && (
        <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Review Verification Request</DialogTitle>
              <DialogDescription>
                {selectedRequest.organization?.name || `Organization #${selectedRequest.organizationId}`} has requested 
                {' '}{selectedRequest.requestType} verification status.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Request Type</h3>
                  <Badge variant={getTypeBadgeVariant(selectedRequest.requestType)} className="mt-1">
                    {selectedRequest.requestType}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Requested On</h3>
                  <p className="text-sm">{formatDate(selectedRequest.createdAt)}</p>
                </div>
              </div>
              
              <div className="mt-2">
                <h3 className="text-sm font-medium mb-1">Organization Impact Score</h3>
                <p className="text-lg font-bold">
                  {selectedRequest.organization?.impactScore || 'N/A'} 
                  {selectedRequest.organization?.impactGrade && ` (${selectedRequest.organization.impactGrade})`}
                </p>
              </div>
              
              {selectedRequest.notes && (
                <div className="mt-1">
                  <h3 className="text-sm font-medium mb-1">Request Notes</h3>
                  <p className="text-sm bg-muted p-3 rounded-md">{selectedRequest.notes}</p>
                </div>
              )}
              
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Decision</h3>
                <div className="flex gap-4">
                  <Button 
                    variant={reviewDecision === "approve" ? "default" : "outline"}
                    onClick={() => setReviewDecision("approve")}
                    className={reviewDecision === "approve" ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    <span className="material-icons text-sm mr-1">check_circle</span> Approve
                  </Button>
                  <Button 
                    variant={reviewDecision === "reject" ? "default" : "outline"}
                    onClick={() => setReviewDecision("reject")}
                    className={reviewDecision === "reject" ? "bg-red-600 hover:bg-red-700" : ""}
                  >
                    <span className="material-icons text-sm mr-1">cancel</span> Reject
                  </Button>
                </div>
              </div>
              
              <div className="mt-2">
                <h3 className="text-sm font-medium mb-1">Review Notes</h3>
                <Textarea 
                  placeholder="Add notes about your decision..."
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleProcessRequest}
                disabled={processRequestMutation.isPending}
                className={`btn-gradient ${
                  reviewDecision === "approve" 
                    ? "btn-gradient-primary" 
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {processRequestMutation.isPending ? "Processing..." : "Submit Decision"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default VerificationManager;