import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

interface OrganizationPreview {
  id?: number;
  name: string;
  sector: string;
  sdgAlignment: string[];
  region: string;
  website: string;
  contactEmail: string;
  contactPhone: string;
  bestContact: string;
  mission: string;
  description: string;
  impactScore: number;
  impactGrade: string;
  impactComponents: {
    innovation: number;
    quality: number;
    scalability: number;
    sustainability: number;
  };
  verificationType: string;
  yearFounded: number;
  employeeCount: number;
  programCount: number;
  beneficiariesReached: number;
  plainTextSummary: string; // Part of the JSON structure now
  programs: {
    name: string;
    description: string;
    metrics: string;
    beneficiaries: string;
    startYear: number;
    status: string;
  }[];
  metrics: {
    name: string;
    value: string;
    unit: string;
    year: number;
    category: string;
  }[];
  partners: {
    name: string;
    role: string;
  }[];
}

const DataParser = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("json-parser");
  const [jsonInput, setJsonInput] = useState("");
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [isDataParsing, setIsDataParsing] = useState(false);
  const [parsingError, setParsingError] = useState<string | null>(null);
  const [previewOrganization, setPreviewOrganization] = useState<OrganizationPreview | null>(null);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Define parse response type
  type ParseJsonResponse = {
    parsed: boolean;
    data?: {
      organization_name?: string;
      sector?: string;
      sdg_alignment?: string[];
      region?: string;
      website?: string;
      best_contact?: {
        name?: string;
        email?: string;
        role?: string;
      };
      contact_info?: string;
      methodology_summary?: string;
      impact_analysis?: {
        executive_summary?: string;
      };
      impact_iq_score?: number;
      grade?: string;
      reporting_quality?: number;
      outcome_effectiveness?: number;
      reach?: number;
      transparency_governance?: number;
      verification_level?: string;
      year_established?: number;
      financials?: {
        program_expenses_pct?: number;
      };
      programs?: Array<{
        name: string;
        effectiveness: string;
        people_reached?: number;
        social_roi?: string;
        score: string;
      }>;
      key_statistics_kpis?: string[];
      key_target_members_partners?: Array<{
        name: string;
        type: string;
        role: string;
      }>;
    };
    error?: string;
  };

  // Parse JSON mutation
  const parseJsonMutation = useMutation({
    mutationFn: async (jsonData: string) => {
      return apiRequest<ParseJsonResponse>("POST", "/api/organizations/parse", { jsonData });
    },
    onSuccess: (data) => {
      if (data.parsed && data.data) {
        // Create a complete preview model with all the data
        const preview: OrganizationPreview = {
          name: data.data.organization_name || "",
          sector: data.data.sector || "",
          sdgAlignment: data.data.sdg_alignment || [],
          region: data.data.region || "",
          website: data.data.website || "",
          contactEmail: data.data.best_contact?.email || "",
          contactPhone: data.data.contact_info?.split(",")?.[1]?.trim() || "",
          bestContact: `${data.data.best_contact?.name} (${data.data.best_contact?.role})` || "",
          mission: data.data.methodology_summary || "",
          description: data.data.impact_analysis?.executive_summary || "",
          impactScore: data.data.impact_iq_score || 0,
          impactGrade: data.data.grade || "N/A",
          impactComponents: {
            innovation: data.data.reporting_quality || 0,
            quality: data.data.outcome_effectiveness || 0,
            scalability: data.data.reach || 0,
            sustainability: data.data.transparency_governance || 0
          },
          verificationType: data.data.verification_level?.toLowerCase() || "self-reported",
          yearFounded: data.data.year_established || new Date().getFullYear(),
          employeeCount: data.data.financials?.program_expenses_pct || 0,
          programCount: (data.data.programs || []).length,
          beneficiariesReached: data.data.programs?.reduce((sum: number, p: any) => sum + (p.people_reached || 0), 0) || 0,
          plainTextSummary: data.data.impact_analysis?.executive_summary || "",
          programs: data.data.programs?.map((p: any) => ({
            name: p.name,
            description: p.effectiveness,
            metrics: `People reached: ${p.people_reached || 'N/A'}, Social ROI: ${p.social_roi || 'N/A'}`,
            beneficiaries: "Program beneficiaries",
            startYear: p.year || new Date().getFullYear(),
            status: p.score
          })) || [],
          metrics: data.data.key_statistics_kpis?.map((stat: string) => ({
            name: stat,
            value: "N/A",
            unit: "count",
            year: new Date().getFullYear(),
            category: "impact"
          })) || [],
          partners: data.data.key_target_members_partners?.map((p: any) => ({
            name: p.name,
            role: `${p.type} - ${p.role}`
          })) || [],
        };
        
        setPreviewOrganization(preview);
        setShowPreviewDialog(true);
        
        toast({
          title: "JSON parsed successfully",
          description: "Organization data has been extracted and is ready for preview.",
        });
      } else {
        toast({
          title: "JSON parsing failed",
          description: data.error || "Invalid JSON format. Please check the input and try again.",
          variant: "destructive",
        });
      }
      setIsDataParsing(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to parse JSON. Please check the format and try again.",
        variant: "destructive",
      });
      setIsDataParsing(false);
    },
  });

  // Define file upload response type
  type FileUploadResponse = {
    parsed: boolean;
    jsonData?: string;
    error?: string;
  };

  // File upload mutation
  const uploadFileMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return apiRequest<FileUploadResponse>("POST", "/api/organizations/upload", formData);
    },
    onSuccess: (data) => {
      if (data.parsed) {
        setJsonInput(data.jsonData || "");
        toast({
          title: "File uploaded",
          description: "File content has been loaded and is ready for parsing.",
        });
      } else {
        toast({
          title: "Upload failed",
          description: data.error || "Could not process the file. Please check the format.",
          variant: "destructive",
        });
      }
      setIsFileUploading(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to upload file. Please try again.",
        variant: "destructive",
      });
      setIsFileUploading(false);
    },
  });

  // Define import response type
  type ImportResponse = {
    id?: number;
    name: string;
  };

  // Define batch import response type
  type BatchImportResponse = {
    successful: number;
    failed: number;
    errors?: Array<{ index: number; error: string }>;
  };

  // Import data mutation
  const importDataMutation = useMutation({
    mutationFn: async (orgData: OrganizationPreview) => {
      return apiRequest<ImportResponse>("POST", "/api/organizations", orgData);
    },
    onSuccess: (data) => {
      toast({
        title: "Organization imported",
        description: `${data.name} has been successfully added to the platform.`,
      });
      
      // Reset the form
      setJsonInput("");
      setShowPreviewDialog(false);
      setPreviewOrganization(null);
      
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["/api/organizations"] });
      queryClient.invalidateQueries({ queryKey: ["/api/statistics"] });
    },
    onError: (error) => {
      toast({
        title: "Import failed",
        description: "Could not import the organization data. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Batch import mutation
  const batchImportMutation = useMutation({
    mutationFn: async (jsonData: string) => {
      const organizations = JSON.parse(jsonData);
      return apiRequest<BatchImportResponse>("POST", "/api/organizations/batch", { organizations });
    },
    onSuccess: (response) => {
      toast({
        title: "Batch import completed",
        description: `Successfully imported ${response.successful} organizations. Failed: ${response.failed}.`,
      });
      
      // Reset the form
      setJsonInput("");
      
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["/api/organizations"] });
      queryClient.invalidateQueries({ queryKey: ["/api/statistics"] });
    },
    onError: (error) => {
      toast({
        title: "Batch import failed",
        description: "Could not process the batch import. Please check the JSON format.",
        variant: "destructive",
      });
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File too large",
        description: "The selected file exceeds the 5MB limit.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setIsFileUploading(true);
    uploadFileMutation.mutate(formData);
  };

  const handleParseJson = () => {
    if (!jsonInput.trim()) {
      toast({
        title: "Empty input",
        description: "Please enter JSON data to parse.",
        variant: "destructive",
      });
      return;
    }

    // Validate JSON format before attempting to parse
    try {
      JSON.parse(jsonInput);
      setParsingError(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Invalid JSON format";
      setParsingError(`JSON syntax error: ${errorMessage}`);
      toast({
        title: "Invalid JSON",
        description: "Please check your JSON syntax and fix any formatting errors.",
        variant: "destructive",
      });
      return;
    }

    setIsDataParsing(true);
    parseJsonMutation.mutate(jsonInput);
  };

  const handleBatchImport = () => {
    if (!jsonInput.trim()) {
      toast({
        title: "Empty input",
        description: "Please enter JSON data to import.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Validate that the input is a valid JSON array
      const parsed = JSON.parse(jsonInput);
      setParsingError(null);
      
      if (!Array.isArray(parsed)) {
        const errorMessage = "Batch import requires a JSON array of organizations.";
        setParsingError(errorMessage);
        toast({
          title: "Invalid input format",
          description: errorMessage,
          variant: "destructive",
        });
        return;
      }
      
      // Validate each organization in the array has required fields
      const invalidItems = parsed.filter((org: any, index: number) => {
        if (!org.name || !org.sector || !org.region) {
          return true;
        }
        return false;
      });
      
      if (invalidItems.length > 0) {
        const errorMessage = `${invalidItems.length} organization(s) in the array are missing required fields (name, sector, region). Please check and fix the data.`;
        setParsingError(errorMessage);
        toast({
          title: "Invalid organization data",
          description: errorMessage,
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Starting batch import",
        description: `Processing ${parsed.length} organizations for import...`,
      });
      
      batchImportMutation.mutate(jsonInput);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Invalid JSON format";
      setParsingError(`JSON syntax error: ${errorMessage}`);
      toast({
        title: "Invalid JSON",
        description: "The input is not valid JSON. Please check and try again.",
        variant: "destructive",
      });
    }
  };

  const handleApproveImport = () => {
    if (previewOrganization) {
      importDataMutation.mutate(previewOrganization);
    }
  };

  const handleCancelImport = () => {
    setShowPreviewDialog(false);
  };

  // Form schema for the organization preview edit form
  const orgFormSchema = z.object({
    name: z.string().min(1, "Organization name is required"),
    sector: z.string().min(1, "Sector is required"),
    sdgAlignment: z.array(z.string()),
    region: z.string().min(1, "Region is required"),
    website: z.string().url("Must be a valid URL").or(z.literal("")),
    contactEmail: z.string().email("Must be a valid email").or(z.literal("")),
    contactPhone: z.string(),
    bestContact: z.string(),
    mission: z.string(),
    description: z.string(),
    impactScore: z.number().min(0).max(100),
    impactGrade: z.string(),
    verificationType: z.string(),
    yearFounded: z.number(),
    employeeCount: z.number(),
    programCount: z.number(),
    beneficiariesReached: z.number(),
    plainTextSummary: z.string(),
  });

  type OrgFormValues = z.infer<typeof orgFormSchema>;

  // Initialize the form with preview organization data
  const form = useForm<OrgFormValues>({
    resolver: zodResolver(orgFormSchema),
    defaultValues: previewOrganization ? {
      name: previewOrganization.name,
      sector: previewOrganization.sector,
      sdgAlignment: previewOrganization.sdgAlignment,
      region: previewOrganization.region,
      website: previewOrganization.website,
      contactEmail: previewOrganization.contactEmail,
      contactPhone: previewOrganization.contactPhone,
      bestContact: previewOrganization.bestContact,
      mission: previewOrganization.mission,
      description: previewOrganization.description,
      impactScore: previewOrganization.impactScore,
      impactGrade: previewOrganization.impactGrade,
      verificationType: previewOrganization.verificationType,
      yearFounded: previewOrganization.yearFounded,
      employeeCount: previewOrganization.employeeCount,
      programCount: previewOrganization.programCount,
      beneficiariesReached: previewOrganization.beneficiariesReached,
      plainTextSummary: previewOrganization.plainTextSummary,
    } : {
      name: "",
      sector: "",
      sdgAlignment: [],
      region: "",
      website: "",
      contactEmail: "",
      contactPhone: "",
      bestContact: "",
      mission: "",
      description: "",
      impactScore: 0,
      impactGrade: "",
      verificationType: "self-reported",
      yearFounded: new Date().getFullYear(),
      employeeCount: 0,
      programCount: 0,
      beneficiariesReached: 0,
      plainTextSummary: "",
    }
  });

  const onSubmit = (values: OrgFormValues) => {
    // Update the preview organization with the edited values
    if (previewOrganization) {
      const updatedPreview = {
        ...previewOrganization,
        ...values,
      };
      setPreviewOrganization(updatedPreview);
      setIsEditing(false);
      
      toast({
        title: "Changes saved",
        description: "Organization preview has been updated with your changes.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Data Input System</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="json-parser">JSON Parser</TabsTrigger>
          <TabsTrigger value="batch-import">Batch Import</TabsTrigger>
          <TabsTrigger value="help">Help & Examples</TabsTrigger>
        </TabsList>
        
        <TabsContent value="json-parser" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Organization JSON Parser</CardTitle>
              <CardDescription>
                Parse organization JSON data to create or update organization profiles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="json-input">Enter Organization JSON Data</Label>
                <Textarea 
                  id="json-input"
                  placeholder="Paste JSON data here..." 
                  className="font-mono min-h-[200px] mt-2"
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                />
              </div>
              
              {parsingError && (
                <div className="bg-red-50 border border-red-200 p-4 rounded-md">
                  <h3 className="text-red-700 font-medium mb-2">JSON Parsing Error</h3>
                  <pre className="text-sm text-red-800 whitespace-pre-wrap">{parsingError}</pre>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div>
                  <Label htmlFor="file-upload">Or upload a JSON file</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Input
                      id="file-upload"
                      type="file"
                      ref={fileInputRef}
                      accept=".json,application/json"
                      onChange={handleFileUpload}
                      className="max-w-sm"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => {
                  setJsonInput("");
                  setParsingError(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
              >
                Clear
              </Button>
              <Button 
                onClick={handleParseJson}
                disabled={isDataParsing || !jsonInput.trim()}
                className="btn-gradient btn-gradient-primary"
              >
                {isDataParsing ? (
                  <>Parsing...</>
                ) : (
                  <>
                    <span className="material-icons text-sm mr-2">code</span>
                    Parse JSON
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="batch-import" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Batch Import Organizations</CardTitle>
              <CardDescription>
                Import multiple organizations at once using an array of organization objects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="batch-json-input">Enter JSON Array of Organizations</Label>
                <Textarea 
                  id="batch-json-input"
                  placeholder="Paste JSON array here..." 
                  className="font-mono min-h-[300px] mt-2"
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Format: [&#123; organization1 &#125;, &#123; organization2 &#125;, ...]
                </p>
              </div>
              
              {parsingError && (
                <div className="bg-red-50 border border-red-200 p-4 rounded-md">
                  <h3 className="text-red-700 font-medium mb-2">Validation Error</h3>
                  <pre className="text-sm text-red-800 whitespace-pre-wrap">{parsingError}</pre>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setJsonInput("")}
              >
                Clear
              </Button>
              <Button 
                onClick={handleBatchImport}
                disabled={batchImportMutation.isPending || !jsonInput.trim()}
                className="btn-gradient btn-gradient-accent"
              >
                {batchImportMutation.isPending ? (
                  <>Importing...</>
                ) : (
                  <>
                    <span className="material-icons text-sm mr-2">upload_file</span>
                    Batch Import
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="help" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Help & Examples</CardTitle>
              <CardDescription>
                Learn how to use the data parser and see example JSON formats
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">JSON Parser Guidelines</h3>
                <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                  <li>Paste valid JSON representing a single organization</li>
                  <li>Include a separate plain text summary for additional context</li>
                  <li>Preview and edit fields before final approval</li>
                  <li>Required fields: name, sector, region</li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium">Example JSON Format</h3>
                <pre className="bg-muted p-4 rounded-md mt-2 overflow-x-auto text-sm">
{`{
  "name": "Example Nonprofit",
  "sector": "Environment",
  "sdgAlignment": "SDG 13,SDG 15",
  "region": "BC",
  "website": "https://example.org",
  "contactEmail": "contact@example.org",
  "contactPhone": "555-123-4567",
  "mission": "Protect forest ecosystems",
  "description": "Detailed description of organization's work",
  "impactScore": 78,
  "impactGrade": "B+",
  "impactComponents": {
    "innovation": 75,
    "quality": 80,
    "scalability": 70,
    "sustainability": 85
  },
  "verificationType": "verified",
  "yearFounded": 2010,
  "employeeCount": 25,
  "programCount": 3,
  "beneficiariesReached": 5000,
  "programs": [
    {
      "name": "Forest Conservation Initiative",
      "description": "Program details here",
      "metrics": "Area protected, species preserved",
      "beneficiaries": "Local communities, wildlife",
      "startYear": 2015,
      "status": "active"
    }
  ],
  "metrics": [
    {
      "name": "Forest Area Protected",
      "value": "5000",
      "unit": "hectares",
      "year": 2022,
      "category": "environment"
    }
  ],
  "partners": [
    {
      "name": "Environmental Agency",
      "role": "Funding Partner"
    }
  ]
}`}
                </pre>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium">Batch Import Format</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  For batch imports, use a JSON array containing multiple organization objects
                </p>
                <pre className="bg-muted p-4 rounded-md mt-2 overflow-x-auto text-sm">
{`[
  {
    "name": "Organization 1",
    "sector": "Education",
    ...
  },
  {
    "name": "Organization 2",
    "sector": "Healthcare",
    ...
  }
]`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Organization Preview & Edit Dialog */}
      {previewOrganization && (
        <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">
                {isEditing ? "Edit Organization Data" : "Organization Preview"}
              </DialogTitle>
              <DialogDescription>
                {isEditing 
                  ? "Edit the organization information before final approval" 
                  : "Review the parsed organization data and approve or edit as needed"}
              </DialogDescription>
            </DialogHeader>
            
            {isEditing ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organization Name *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="sector"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sector *</FormLabel>
                          <FormControl>
                            <Select 
                              value={field.value} 
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select sector" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Education">Education</SelectItem>
                                <SelectItem value="Healthcare">Healthcare</SelectItem>
                                <SelectItem value="Environment">Environment</SelectItem>
                                <SelectItem value="Poverty Reduction">Poverty Reduction</SelectItem>
                                <SelectItem value="Human Rights">Human Rights</SelectItem>
                                <SelectItem value="Arts & Culture">Arts & Culture</SelectItem>
                                <SelectItem value="Youth Development">Youth Development</SelectItem>
                                <SelectItem value="Social Services">Social Services</SelectItem>
                                <SelectItem value="Community Development">Community Development</SelectItem>
                                <SelectItem value="International Development">International Development</SelectItem>
                                <SelectItem value="Animal Welfare">Animal Welfare</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="region"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Region *</FormLabel>
                          <FormControl>
                            <Select 
                              value={field.value} 
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select region" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="BC">British Columbia</SelectItem>
                                <SelectItem value="AB">Alberta</SelectItem>
                                <SelectItem value="SK">Saskatchewan</SelectItem>
                                <SelectItem value="MB">Manitoba</SelectItem>
                                <SelectItem value="ON">Ontario</SelectItem>
                                <SelectItem value="QC">Quebec</SelectItem>
                                <SelectItem value="NB">New Brunswick</SelectItem>
                                <SelectItem value="NS">Nova Scotia</SelectItem>
                                <SelectItem value="PE">Prince Edward Island</SelectItem>
                                <SelectItem value="NL">Newfoundland and Labrador</SelectItem>
                                <SelectItem value="YT">Yukon</SelectItem>
                                <SelectItem value="NT">Northwest Territories</SelectItem>
                                <SelectItem value="NU">Nunavut</SelectItem>
                                <SelectItem value="National">National (Canada-wide)</SelectItem>
                                <SelectItem value="International">International</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input {...field} type="url" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Phone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="yearFounded"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year Founded</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value) || field.value)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="employeeCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Employee Count</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value) || field.value)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="verificationType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Verification Type</FormLabel>
                          <FormControl>
                            <Select 
                              value={field.value} 
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select verification type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="self-reported">Self-Reported</SelectItem>
                                <SelectItem value="verified">Verified</SelectItem>
                                <SelectItem value="audited">Audited</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="impactScore"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Impact Score (0-100)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="0"
                              max="100"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value) || field.value)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="impactGrade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Impact Grade</FormLabel>
                          <FormControl>
                            <Select 
                              value={field.value} 
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select impact grade" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="A+">A+</SelectItem>
                                <SelectItem value="A">A</SelectItem>
                                <SelectItem value="A-">A-</SelectItem>
                                <SelectItem value="B+">B+</SelectItem>
                                <SelectItem value="B">B</SelectItem>
                                <SelectItem value="B-">B-</SelectItem>
                                <SelectItem value="C+">C+</SelectItem>
                                <SelectItem value="C">C</SelectItem>
                                <SelectItem value="C-">C-</SelectItem>
                                <SelectItem value="D+">D+</SelectItem>
                                <SelectItem value="D">D</SelectItem>
                                <SelectItem value="D-">D-</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Separator />
                  
                  <FormField
                    control={form.control}
                    name="mission"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mission Statement</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={2} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={4} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="plainTextSummary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plain Text Summary</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={6} />
                        </FormControl>
                        <FormDescription>
                          This plain text summary provides additional context about the organization
                          and will be stored separately from the structured data.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="btn-gradient btn-gradient-primary"
                    >
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Form>
            ) : (
              // Preview mode
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Organization Details</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium text-sm">Name:</span> 
                        <span className="ml-1">{previewOrganization.name}</span>
                      </div>
                      <div>
                        <span className="font-medium text-sm">Sector:</span> 
                        <span className="ml-1">{previewOrganization.sector}</span>
                      </div>
                      <div>
                        <span className="font-medium text-sm">Region:</span> 
                        <span className="ml-1">{previewOrganization.region}</span>
                      </div>
                      <div>
                        <span className="font-medium text-sm">Website:</span> 
                        <span className="ml-1">{previewOrganization.website || "N/A"}</span>
                      </div>
                      <div>
                        <span className="font-medium text-sm">Year Founded:</span> 
                        <span className="ml-1">{previewOrganization.yearFounded}</span>
                      </div>
                      <div>
                        <span className="font-medium text-sm">Employees:</span> 
                        <span className="ml-1">{previewOrganization.employeeCount}</span>
                      </div>
                      <div>
                        <span className="font-medium text-sm">Contact:</span> 
                        <div className="ml-4 text-sm">
                          <div>Email: {previewOrganization.contactEmail || "N/A"}</div>
                          <div>Phone: {previewOrganization.contactPhone || "N/A"}</div>
                          <div>Best Contact: {previewOrganization.bestContact || "N/A"}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Impact Assessment</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium text-sm">Impact Score:</span> 
                        <span className="ml-1">{previewOrganization.impactScore}</span>
                      </div>
                      <div>
                        <span className="font-medium text-sm">Impact Grade:</span> 
                        <span className="ml-1">{previewOrganization.impactGrade}</span>
                      </div>
                      <div>
                        <span className="font-medium text-sm">Verification Status:</span> 
                        <span className="ml-1 capitalize">{previewOrganization.verificationType}</span>
                      </div>
                      <div>
                        <span className="font-medium text-sm">Impact Components:</span>
                        <div className="ml-4 text-sm">
                          <div>Innovation: {previewOrganization.impactComponents.innovation}</div>
                          <div>Quality: {previewOrganization.impactComponents.quality}</div>
                          <div>Scalability: {previewOrganization.impactComponents.scalability}</div>
                          <div>Sustainability: {previewOrganization.impactComponents.sustainability}</div>
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-sm">Programs:</span>
                        <span className="ml-1">{previewOrganization.programCount}</span>
                      </div>
                      <div>
                        <span className="font-medium text-sm">Beneficiaries Reached:</span>
                        <span className="ml-1">{previewOrganization.beneficiariesReached.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="font-medium text-sm">SDG Alignment:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {previewOrganization.sdgAlignment.map((sdg, index) => (
                            <span 
                              key={index}
                              className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full"
                            >
                              {sdg}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Mission & Description</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-sm">Mission:</span> 
                      <p className="mt-1 text-sm">{previewOrganization.mission || "N/A"}</p>
                    </div>
                    <div>
                      <span className="font-medium text-sm">Description:</span> 
                      <p className="mt-1 text-sm">{previewOrganization.description || "N/A"}</p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Plain Text Summary</h3>
                  <div className="bg-amber-50 border border-amber-100 p-4 rounded-md">
                    <p className="text-sm whitespace-pre-wrap">{previewOrganization.plainTextSummary || "No plain text summary provided."}</p>
                  </div>
                </div>
                
                {previewOrganization.programs && previewOrganization.programs.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="text-lg font-medium mb-2">Programs ({previewOrganization.programs.length})</h3>
                      <div className="space-y-4">
                        {previewOrganization.programs.map((program, index) => (
                          <div key={index} className="bg-gray-50 p-3 rounded-md">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium">{program.name}</h4>
                              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full capitalize">
                                {program.status}
                              </span>
                            </div>
                            <p className="text-sm mt-1">{program.description}</p>
                            <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                              <div>
                                <span className="font-medium text-xs">Metrics:</span>
                                <p className="text-muted-foreground">{program.metrics || "N/A"}</p>
                              </div>
                              <div>
                                <span className="font-medium text-xs">Beneficiaries:</span>
                                <p className="text-muted-foreground">{program.beneficiaries || "N/A"}</p>
                              </div>
                              <div>
                                <span className="font-medium text-xs">Started:</span>
                                <p className="text-muted-foreground">{program.startYear || "N/A"}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                
                {previewOrganization.metrics && previewOrganization.metrics.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="text-lg font-medium mb-2">Impact Metrics ({previewOrganization.metrics.length})</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {previewOrganization.metrics.map((metric, index) => (
                          <div key={index} className="bg-gray-50 p-3 rounded-md">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium">{metric.name}</h4>
                              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full capitalize">
                                {metric.category}
                              </span>
                            </div>
                            <div className="flex items-baseline gap-1 mt-1">
                              <span className="text-lg font-bold">{metric.value}</span>
                              <span className="text-sm text-muted-foreground">{metric.unit}</span>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Year: {metric.year}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                
                {previewOrganization.partners && previewOrganization.partners.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="text-lg font-medium mb-2">Partners ({previewOrganization.partners.length})</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {previewOrganization.partners.map((partner, index) => (
                          <div key={index} className="bg-gray-50 p-3 rounded-md">
                            <h4 className="font-medium">{partner.name}</h4>
                            <div className="text-sm text-muted-foreground mt-1">
                              {partner.role}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
            
            <DialogFooter>
              {isEditing ? (
                <div className="w-full flex justify-end">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel Editing
                  </Button>
                </div>
              ) : (
                <>
                  <Button variant="outline" onClick={handleCancelImport}>
                    Cancel
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                    className="mr-2"
                  >
                    <span className="material-icons text-sm mr-1">edit</span>
                    Edit
                  </Button>
                  <Button
                    onClick={handleApproveImport}
                    disabled={importDataMutation.isPending}
                    className="btn-gradient btn-gradient-primary"
                  >
                    {importDataMutation.isPending ? "Importing..." : (
                      <>
                        <span className="material-icons text-sm mr-1">check_circle</span>
                        Approve & Save
                      </>
                    )}
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default DataParser;