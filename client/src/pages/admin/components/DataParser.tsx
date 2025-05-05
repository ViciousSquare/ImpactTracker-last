import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SECTOR_OPTIONS, REGION_OPTIONS, SDG_OPTIONS } from "@/lib/types";

const DataParser = () => {
  const { toast } = useToast();
  const [jsonData, setJsonData] = useState("");
  const [activeTab, setActiveTab] = useState("json-input");
  const [parsedData, setParsedData] = useState<any>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvMappings, setCsvMappings] = useState<Record<string, string>>({});
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);

  // JSON parsing mutation
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
        description: "The JSON has been successfully parsed. Review the data before saving.",
      });
      setParsedData(data);
      setPreviewMode(true);
    },
    onError: (error) => {
      toast({
        title: "Parsing error",
        description: error?.toString() || "Failed to parse JSON. Check the format and try again.",
        variant: "destructive",
      });
    },
  });

  // CSV parsing mutation
  const parseCsvMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return apiRequest("/api/organizations/import-csv", {
        method: "POST",
        // Not sending Content-Type header so it's set automatically with boundary
        body: formData,
      });
    },
    onSuccess: (data) => {
      if (data.headers && Array.isArray(data.headers)) {
        setCsvHeaders(data.headers);
        
        // Create initial mapping suggestion
        const initialMappings: Record<string, string> = {};
        data.headers.forEach((header: string) => {
          // Try to match CSV headers to expected fields
          const lowerHeader = header.toLowerCase();
          if (lowerHeader.includes("name")) initialMappings[header] = "name";
          else if (lowerHeader.includes("sector")) initialMappings[header] = "sector";
          else if (lowerHeader.includes("region")) initialMappings[header] = "region";
          else if (lowerHeader.includes("mission")) initialMappings[header] = "mission";
          else if (lowerHeader.includes("impact") && lowerHeader.includes("score")) 
            initialMappings[header] = "impactScore";
          else if (lowerHeader.includes("grade")) initialMappings[header] = "impactGrade";
          // ... other mappings
        });
        
        setCsvMappings(initialMappings);
        toast({
          title: "CSV uploaded",
          description: "CSV file has been uploaded. Please map the columns to fields.",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Upload error",
        description: error?.toString() || "Failed to upload CSV. Check the file format and try again.",
        variant: "destructive",
      });
    },
  });

  // Create organization mutation
  const createOrgMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("/api/organizations", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Organization created",
        description: "The organization has been successfully created.",
      });
      setParsedData(null);
      setPreviewMode(false);
      setJsonData("");
      queryClient.invalidateQueries({ queryKey: ["/api/organizations"] });
      queryClient.invalidateQueries({ queryKey: ["/api/statistics"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error?.toString() || "Failed to create organization. Please check the data and try again.",
        variant: "destructive",
      });
    },
  });

  // Import from CSV mutation
  const importCsvMutation = useMutation({
    mutationFn: async (mappings: Record<string, string>) => {
      return apiRequest("/api/organizations/import-csv-mapped", {
        method: "POST",
        body: JSON.stringify({ mappings }),
      });
    },
    onSuccess: (data) => {
      toast({
        title: "Import successful",
        description: `Successfully imported ${data.successful} organizations. ${data.failed} failed.`,
      });
      setCsvFile(null);
      setCsvHeaders([]);
      setCsvMappings({});
      queryClient.invalidateQueries({ queryKey: ["/api/organizations"] });
      queryClient.invalidateQueries({ queryKey: ["/api/statistics"] });
    },
    onError: (error) => {
      toast({
        title: "Import error",
        description: error?.toString() || "Failed to import organizations from CSV.",
        variant: "destructive",
      });
    },
  });

  const handleParseJson = () => {
    if (!jsonData.trim()) {
      toast({
        title: "Error",
        description: "Please enter valid JSON data.",
        variant: "destructive",
      });
      return;
    }
    
    parseJsonMutation.mutate(jsonData);
  };

  const handleSaveOrganization = () => {
    if (!parsedData) return;
    
    createOrgMutation.mutate(parsedData);
  };

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setCsvFile(file);
    
    const formData = new FormData();
    formData.append('file', file);
    
    parseCsvMutation.mutate(formData);
  };

  const handleImportCsvMapped = () => {
    if (Object.keys(csvMappings).length === 0) {
      toast({
        title: "Error",
        description: "Please map at least one column before importing.",
        variant: "destructive",
      });
      return;
    }
    
    importCsvMutation.mutate(csvMappings);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Data Input</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="json-input">JSON Input</TabsTrigger>
          <TabsTrigger value="csv-import">CSV Import</TabsTrigger>
        </TabsList>
        
        <TabsContent value="json-input" className="mt-6">
          {!previewMode ? (
            <Card>
              <CardHeader>
                <CardTitle>Parse JSON Data</CardTitle>
                <CardDescription>
                  Paste AI-generated JSON to automatically create an organization profile.
                  The system will parse and extract relevant data.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Label htmlFor="json-input">JSON Data</Label>
                  <textarea
                    id="json-input"
                    className="min-h-[300px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    placeholder={
                      `Paste JSON here, e.g.,
{
  "Organization Name": "Community Builders Alliance",
  "Sector": "Housing",
  "SDG Alignment": ["SDG 11", "SDG 1"],
  "Region": "Ontario",
  "Year Established": 2010,
  "Impact IQ Score": 84,
  "Grade": "B+",
  ...
}`
                    }
                    value={jsonData}
                    onChange={(e) => setJsonData(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setJsonData("")}
                >
                  Clear
                </Button>
                <Button
                  onClick={handleParseJson}
                  disabled={parseJsonMutation.isPending}
                  className="btn-gradient btn-gradient-primary"
                >
                  {parseJsonMutation.isPending ? "Processing..." : "Parse JSON"}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Review Organization Data</CardTitle>
                <CardDescription>
                  Review the parsed data before saving the organization.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Organization Details</h3>
                      <div className="space-y-4">
                        <div>
                          <Label>Name</Label>
                          <div className="text-base mt-1 font-medium">{parsedData?.name || "N/A"}</div>
                        </div>
                        <div>
                          <Label>Sector</Label>
                          <div className="text-base mt-1">{parsedData?.sector || "N/A"}</div>
                        </div>
                        <div>
                          <Label>Region</Label>
                          <div className="text-base mt-1">{parsedData?.region || "N/A"}</div>
                        </div>
                        <div>
                          <Label>Established</Label>
                          <div className="text-base mt-1">{parsedData?.established || "N/A"}</div>
                        </div>
                        <div>
                          <Label>Mission</Label>
                          <div className="text-sm mt-1">{parsedData?.mission || "N/A"}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Impact IQ & Methodology</h3>
                      <div className="space-y-4">
                        <div>
                          <Label>Impact IQ Score</Label>
                          <div className="text-lg mt-1 font-bold">{parsedData?.impactScore || "N/A"}</div>
                        </div>
                        <div>
                          <Label>Grade</Label>
                          <div className="text-lg mt-1 font-bold">{parsedData?.impactGrade || "N/A"}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label>Reporting Quality</Label>
                            <div className="text-base mt-1">{parsedData?.metrics?.reportingQuality || "N/A"}/20</div>
                          </div>
                          <div>
                            <Label>Reach</Label>
                            <div className="text-base mt-1">{parsedData?.metrics?.reach || "N/A"}/20</div>
                          </div>
                          <div>
                            <Label>Social ROI</Label>
                            <div className="text-base mt-1">{parsedData?.metrics?.socialROI || "N/A"}/20</div>
                          </div>
                          <div>
                            <Label>Outcome Effectiveness</Label>
                            <div className="text-base mt-1">{parsedData?.metrics?.outcomeEffectiveness || "N/A"}/20</div>
                          </div>
                          <div>
                            <Label>Transparency</Label>
                            <div className="text-base mt-1">{parsedData?.metrics?.transparencyGovernance || "N/A"}/20</div>
                          </div>
                          <div>
                            <Label>Verification</Label>
                            <div className="text-base mt-1 capitalize">{parsedData?.verificationType || "self-reported"}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Insights & Metrics</h3>
                      <div className="space-y-4">
                        <div>
                          <Label>Key Insights</Label>
                          <div className="text-sm mt-1">{parsedData?.metrics?.keyInsights || "N/A"}</div>
                        </div>
                        <div>
                          <Label>Key Recommendations</Label>
                          <div className="text-sm mt-1">{parsedData?.metrics?.keyRecommendations || "N/A"}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Programs & Partners</h3>
                      <div className="space-y-4">
                        <div>
                          <Label>Programs ({parsedData?.programs?.length || 0})</Label>
                          <div className="text-sm mt-1">
                            {parsedData?.programs?.length > 0 ? (
                              <ul className="list-disc list-inside">
                                {parsedData.programs.slice(0, 3).map((program: any, idx: number) => (
                                  <li key={idx}>{program.name}</li>
                                ))}
                                {parsedData.programs.length > 3 && (
                                  <li>+ {parsedData.programs.length - 3} more</li>
                                )}
                              </ul>
                            ) : (
                              "No programs found"
                            )}
                          </div>
                        </div>
                        <div>
                          <Label>Target Partners ({parsedData?.targetPartners?.length || 0})</Label>
                          <div className="text-sm mt-1">
                            {parsedData?.targetPartners?.length > 0 ? (
                              <ul className="list-disc list-inside">
                                {parsedData.targetPartners.slice(0, 3).map((partner: any, idx: number) => (
                                  <li key={idx}>{partner.name} ({partner.type})</li>
                                ))}
                                {parsedData.targetPartners.length > 3 && (
                                  <li>+ {parsedData.targetPartners.length - 3} more</li>
                                )}
                              </ul>
                            ) : (
                              "No target partners found"
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setPreviewMode(false);
                      setParsedData(null);
                    }}
                  >
                    Back to Editor
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setJsonData(JSON.stringify(parsedData, null, 2))}
                  >
                    Edit as JSON
                  </Button>
                </div>
                <Button
                  onClick={handleSaveOrganization}
                  disabled={createOrgMutation.isPending}
                  className="btn-gradient btn-gradient-primary"
                >
                  {createOrgMutation.isPending ? "Saving..." : "Save Organization"}
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="csv-import" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>CSV Import</CardTitle>
              <CardDescription>
                Import multiple organizations from a CSV file.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!csvFile ? (
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="csv-upload"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-muted/50"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <span className="material-icons text-4xl mb-2 text-muted-foreground">cloud_upload</span>
                      <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        CSV file with organization data
                      </p>
                    </div>
                    <input
                      id="csv-upload"
                      type="file"
                      accept=".csv"
                      className="hidden"
                      onChange={handleCsvUpload}
                    />
                  </label>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Uploaded File</h3>
                      <p className="text-sm text-muted-foreground">{csvFile.name}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCsvFile(null);
                        setCsvHeaders([]);
                        setCsvMappings({});
                      }}
                    >
                      Change File
                    </Button>
                  </div>
                  
                  {csvHeaders.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-4">Map CSV Columns to Fields</h3>
                      <div className="space-y-3">
                        {csvHeaders.map((header) => (
                          <div key={header} className="grid grid-cols-2 gap-2 items-center">
                            <div className="text-sm">{header}</div>
                            <Select
                              value={csvMappings[header] || ""}
                              onValueChange={(value) => {
                                setCsvMappings({
                                  ...csvMappings,
                                  [header]: value
                                });
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select field" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="">Ignore this column</SelectItem>
                                <SelectItem value="name">Organization Name</SelectItem>
                                <SelectItem value="sector">Sector</SelectItem>
                                <SelectItem value="region">Region</SelectItem>
                                <SelectItem value="established">Year Established</SelectItem>
                                <SelectItem value="mission">Mission</SelectItem>
                                <SelectItem value="website">Website</SelectItem>
                                <SelectItem value="contactInfo">Contact Info</SelectItem>
                                <SelectItem value="contactEmail">Contact Email</SelectItem>
                                <SelectItem value="impactScore">Impact Score</SelectItem>
                                <SelectItem value="impactGrade">Impact Grade</SelectItem>
                                <SelectItem value="verificationType">Verification Type</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            {csvFile && csvHeaders.length > 0 && (
              <CardFooter className="flex justify-between">
                <Alert className="border-amber-200 bg-amber-50 text-amber-800">
                  <span className="material-icons">info</span>
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription>
                    Make sure to map at least the required fields: Name, Sector, and Region.
                  </AlertDescription>
                </Alert>
                <Button
                  onClick={handleImportCsvMapped}
                  disabled={importCsvMutation.isPending}
                  className="btn-gradient btn-gradient-primary ml-4"
                >
                  {importCsvMutation.isPending ? "Importing..." : "Import Organizations"}
                </Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { DataParser };