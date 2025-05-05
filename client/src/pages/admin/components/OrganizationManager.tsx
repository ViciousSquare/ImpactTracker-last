import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getQueryFn, apiRequest, queryClient } from "@/lib/queryClient";
import {
  Card,
  CardContent,
  CardDescription,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { SECTOR_OPTIONS, REGION_OPTIONS } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const OrganizationManager = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedVerificationType, setSelectedVerificationType] = useState("");
  const [page, setPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isJsonInputDialogOpen, setIsJsonInputDialogOpen] = useState(false);
  const [jsonData, setJsonData] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);

  // Fetch organizations with filters
  const {
    data: organizationsData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      "/api/organizations",
      {
        query: searchQuery,
        sector: selectedSector,
        region: selectedRegion,
        verificationType: selectedVerificationType,
        page,
      },
    ],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  // Delete organization mutation
  const deleteOrganizationMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest(`/api/organizations/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      toast({
        title: "Organization deleted",
        description: "The organization has been successfully deleted.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/organizations"] });
      queryClient.invalidateQueries({ queryKey: ["/api/statistics"] });
      setIsDeleteDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete organization. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Parse JSON data mutation
  const parseJsonMutation = useMutation({
    mutationFn: async (jsonData: string) => {
      return apiRequest("/api/organizations/parse-json", {
        method: "POST",
        body: JSON.stringify({ jsonData }),
      });
    },
    onSuccess: (data) => {
      toast({
        title: "Data parsed successfully",
        description: "The JSON data has been successfully parsed.",
      });
      setIsJsonInputDialogOpen(false);
      // Show preview dialog or directly create org
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to parse JSON data. Please check the format and try again.",
        variant: "destructive",
      });
    },
  });

  const handleDeleteOrganization = (id: number) => {
    setSelectedOrgId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteOrganization = () => {
    if (selectedOrgId) {
      deleteOrganizationMutation.mutate(selectedOrgId);
    }
  };

  const handleParseJson = () => {
    if (jsonData.trim()) {
      parseJsonMutation.mutate(jsonData);
    } else {
      toast({
        title: "Error",
        description: "Please enter valid JSON data.",
        variant: "destructive",
      });
    }
  };

  const handleGenerateLink = (id: number) => {
    // Implement the link generation logic
    toast({
      title: "Profile link generated",
      description: "The shareable profile link has been copied to clipboard.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Organization Management</h2>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="btn-gradient btn-gradient-primary"
          >
            <span className="material-icons text-sm mr-1">add</span>
            Add Organization
          </Button>
          <Button
            onClick={() => setIsImportDialogOpen(true)}
            variant="outline"
          >
            <span className="material-icons text-sm mr-1">upload_file</span>
            Import
          </Button>
          <Button
            onClick={() => setIsJsonInputDialogOpen(true)}
            variant="outline"
          >
            <span className="material-icons text-sm mr-1">code</span>
            JSON Input
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Organizations</CardTitle>
          <CardDescription>
            Manage all organizations in the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search organizations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select
                value={selectedSector}
                onValueChange={setSelectedSector}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Sectors</SelectItem>
                  {SECTOR_OPTIONS.map((sector) => (
                    <SelectItem key={sector} value={sector}>
                      {sector}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedRegion}
                onValueChange={setSelectedRegion}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Regions</SelectItem>
                  {REGION_OPTIONS.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedVerificationType}
                onValueChange={setSelectedVerificationType}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Verification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="self-reported">Self-Reported</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="audited">Audited</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Sector</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Verification</TableHead>
                    <TableHead>Impact Score</TableHead>
                    <TableHead>Published</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {organizationsData?.organizations?.map((org) => (
                    <TableRow key={org.id}>
                      <TableCell className="font-medium">{org.name}</TableCell>
                      <TableCell>{org.sector}</TableCell>
                      <TableCell>{org.region}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            org.verificationType === "audited"
                              ? "default"
                              : org.verificationType === "verified"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {org.verificationType}
                        </Badge>
                      </TableCell>
                      <TableCell>{org.impactScore || "N/A"}</TableCell>
                      <TableCell>
                        {org.isPublished ? (
                          <span className="text-green-600">✓</span>
                        ) : (
                          <span className="text-amber-500">⊘</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <span className="material-icons">more_vert</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => window.location.href = `/admin/organizations/${org.id}`}
                            >
                              <span className="material-icons text-sm mr-2">visibility</span>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => window.location.href = `/admin/organizations/${org.id}/edit`}
                            >
                              <span className="material-icons text-sm mr-2">edit</span>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleGenerateLink(org.id)}
                            >
                              <span className="material-icons text-sm mr-2">link</span>
                              Generate Link
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteOrganization(org.id)}
                              className="text-red-600"
                            >
                              <span className="material-icons text-sm mr-2">delete</span>
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}

                  {(!organizationsData?.organizations || organizationsData.organizations.length === 0) && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                        No organizations found. Try adjusting your filters or add a new organization.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Pagination */}
          {organizationsData?.total && organizationsData.total > 0 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-muted-foreground">
                Showing {Math.min((page - 1) * 10 + 1, organizationsData.total)} to{" "}
                {Math.min(page * 10, organizationsData.total)} of {organizationsData.total} organizations
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
                  disabled={page * 10 >= organizationsData.total}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* JSON Input Dialog */}
      <Dialog open={isJsonInputDialogOpen} onOpenChange={setIsJsonInputDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Parse Organization JSON Data</DialogTitle>
            <DialogDescription>
              Paste AI-generated JSON to automatically create an organization profile. The system will parse and validate the data.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="json-input">JSON Data</Label>
            <textarea
              id="json-input"
              className="min-h-[300px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              placeholder='Paste JSON here, e.g., {"name": "Organization Name", "sector": "Education", ...}'
              value={jsonData}
              onChange={(e) => setJsonData(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsJsonInputDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleParseJson}
              disabled={parseJsonMutation.isPending}
              className="btn-gradient btn-gradient-accent"
            >
              {parseJsonMutation.isPending ? "Processing..." : "Parse JSON"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Organization</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this organization? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDeleteOrganization}
              disabled={deleteOrganizationMutation.isPending}
            >
              {deleteOrganizationMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export { OrganizationManager };