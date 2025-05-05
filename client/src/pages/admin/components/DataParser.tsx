import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export const DataParser = () => {
  const { toast } = useToast();
  const [jsonData, setJsonData] = useState("");

  const parseJsonMutation = useMutation({
    mutationFn: async (data: string) => {
      return apiRequest("/api/organizations/parse", {
        method: "POST",
        body: JSON.stringify({ data }),
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Data parsed successfully",
      });
      setJsonData("");
      queryClient.invalidateQueries({ queryKey: ["/api/organizations"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to parse data",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Data Parser</h2>
      <Card>
        <CardHeader>
          <CardTitle>Data Parser</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              value={jsonData}
              onChange={(e) => setJsonData(e.target.value)}
              placeholder="Paste data here to parse..."
              className="min-h-[200px]"
            />
            <Button className="w-full" onClick={() => parseJsonMutation.mutate(jsonData)} disabled={!jsonData.trim() || parseJsonMutation.isPending}>
              {parseJsonMutation.isPending ? "Processing..." : "Parse Data"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};