
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

export const DataParser = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const parseDataMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return apiRequest("/api/data/parse", {
        method: "POST",
        body: formData,
      });
    },
    onSuccess: (data) => {
      toast({
        title: "Data parsed successfully",
        description: "The file has been processed and data extracted.",
      });
      setPreview(JSON.stringify(data, null, 2));
    },
    onError: (error) => {
      toast({
        title: "Error parsing data",
        description: "Failed to parse the uploaded file. Please check the format and try again.",
        variant: "destructive",
      });
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      setPreview("");
    }
  };

  const handleParse = () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    parseDataMutation.mutate(formData);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Data Parser</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Upload Data File</CardTitle>
          <CardDescription>
            Upload CSV, Excel, or PDF files to extract structured data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="file">File</Label>
              <input
                id="file"
                type="file"
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                accept=".csv,.xlsx,.pdf"
                onChange={handleFileUpload}
              />
            </div>

            <Button
              onClick={handleParse}
              disabled={!file || parseDataMutation.isPending}
              className="btn-gradient btn-gradient-primary"
            >
              {parseDataMutation.isPending ? "Processing..." : "Parse Data"}
            </Button>

            {preview && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Parsed Data Preview</h3>
                <pre className="bg-neutral-50 p-4 rounded-lg overflow-auto max-h-96">
                  {preview}
                </pre>
              </div>
            )}

            {parseDataMutation.isPending && (
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
