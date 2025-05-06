import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const DataParser = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Data Parser</h2>

      <Card>
        <CardHeader>
          <CardTitle>Upload Data File</CardTitle>
          <CardDescription>Upload CSV or Excel files to parse data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="file">File</Label>
              <input
                id="file"
                type="file"
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                accept=".csv,.xlsx"
                onChange={handleFileUpload}
              />
            </div>

            <Button
              disabled={!file}
              className="btn-gradient btn-gradient-primary"
            >
              Parse Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};