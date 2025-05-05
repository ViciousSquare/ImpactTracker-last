import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export const WorkflowBuilder = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState("");

  const createWorkflowMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("/api/workflows", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Workflow created successfully",
      });
      setName("");
      setDescription("");
      setSteps("");
      queryClient.invalidateQueries({ queryKey: ["/api/workflows"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create workflow",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Workflow Builder</h2>
      <Card>
        <CardHeader>
          <CardTitle>Create Workflow</CardTitle>
          <CardDescription>
            Define automated workflows for your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter workflow name"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter workflow description"
              />
            </div>
            <div>
              <Label>Steps</Label>
              <Textarea
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                placeholder="Enter workflow steps (JSON format)"
                className="font-mono"
              />
            </div>
            <Button
              onClick={() => createWorkflowMutation.mutate({ name, description, steps: JSON.parse(steps) })}
              disabled={!name || !steps || createWorkflowMutation.isPending}
            >
              {createWorkflowMutation.isPending ? "Creating..." : "Create Workflow"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};