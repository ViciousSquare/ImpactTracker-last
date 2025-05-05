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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const WorkflowBuilder = () => {
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<number | null>(null);
  const [workflowForm, setWorkflowForm] = useState({
    name: "",
    description: "",
    steps: "[]",
    isActive: true
  });

  // Get workflows
  const {
    data: workflowsData,
    isLoading: workflowsLoading,
  } = useQuery({
    queryKey: ["/api/workflows"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  // Create workflow mutation
  const createWorkflowMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("/api/workflows", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Workflow created",
        description: "The workflow has been created successfully.",
      });
      setIsCreateDialogOpen(false);
      setWorkflowForm({
        name: "",
        description: "",
        steps: "[]",
        isActive: true
      });
      queryClient.invalidateQueries({ queryKey: ["/api/workflows"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create workflow. Please check your input and try again.",
        variant: "destructive",
      });
    },
  });

  // Delete workflow mutation
  const deleteWorkflowMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest(`/api/workflows/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      toast({
        title: "Workflow deleted",
        description: "The workflow has been deleted successfully.",
      });
      setIsDeleteDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["/api/workflows"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete workflow.",
        variant: "destructive",
      });
    },
  });

  // Toggle workflow active state mutation
  const toggleWorkflowMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: number; isActive: boolean }) => {
      return apiRequest(`/api/workflows/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ isActive }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/workflows"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update workflow status.",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setWorkflowForm({
      ...workflowForm,
      [name]: value,
    });
  };

  const handleSwitchChange = (checked: boolean) => {
    setWorkflowForm({
      ...workflowForm,
      isActive: checked,
    });
  };

  const handleCreateWorkflow = () => {
    try {
      // Validate steps JSON
      const steps = JSON.parse(workflowForm.steps);
      
      createWorkflowMutation.mutate({
        name: workflowForm.name,
        description: workflowForm.description,
        steps,
        isActive: workflowForm.isActive,
      });
    } catch (error) {
      toast({
        title: "Invalid JSON",
        description: "The workflow steps must be valid JSON.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteWorkflow = (id: number) => {
    setSelectedWorkflowId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteWorkflow = () => {
    if (selectedWorkflowId !== null) {
      deleteWorkflowMutation.mutate(selectedWorkflowId);
    }
  };

  const handleToggleActive = (id: number, currentActive: boolean) => {
    toggleWorkflowMutation.mutate({
      id,
      isActive: !currentActive,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Workflow Builder</h2>
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="btn-gradient btn-gradient-primary"
        >
          <span className="material-icons text-sm mr-1">add</span>
          Create Workflow
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Automated Workflows</CardTitle>
          <CardDescription>
            Create and manage automated workflows for organization processes
          </CardDescription>
        </CardHeader>
        <CardContent>
          {workflowsLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Steps</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workflowsData?.workflows && workflowsData.workflows.length > 0 ? (
                    workflowsData.workflows.map((workflow: any) => (
                      <TableRow key={workflow.id}>
                        <TableCell className="font-medium">{workflow.name}</TableCell>
                        <TableCell>{workflow.description || 'N/A'}</TableCell>
                        <TableCell>
                          {workflow.steps && Array.isArray(workflow.steps) ? (
                            `${workflow.steps.length} steps`
                          ) : (
                            'No steps'
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={workflow.isActive ? "default" : "secondary"}
                            className="cursor-pointer"
                            onClick={() => handleToggleActive(workflow.id, workflow.isActive)}
                          >
                            {workflow.isActive ? "Active" : "Disabled"}
                          </Badge>
                        </TableCell>
                        <TableCell>{workflow.createdBy}</TableCell>
                        <TableCell>
                          {new Date(workflow.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteWorkflow(workflow.id)}
                          >
                            <span className="material-icons text-red-500">delete</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                        No workflows found. Create your first workflow to get started.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Workflow Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Workflow</DialogTitle>
            <DialogDescription>
              Design an automated workflow with custom steps and conditions
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={workflowForm.name}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                value={workflowForm.description}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="steps" className="text-right pt-2">
                Steps (JSON)
              </Label>
              <Textarea
                id="steps"
                name="steps"
                value={workflowForm.steps}
                onChange={handleInputChange}
                className="col-span-3 min-h-[200px] font-mono text-sm"
                placeholder={`[
  {
    "type": "condition",
    "field": "verificationType",
    "operator": "equals",
    "value": "self-reported",
    "trueStep": 1,
    "falseStep": 2
  },
  {
    "type": "action",
    "action": "sendNotification",
    "params": {
      "to": "admin",
      "message": "New verification request"
    }
  }
]`}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="isActive" className="text-right">
                Active
              </Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch
                  id="isActive"
                  checked={workflowForm.isActive}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="isActive" className="text-sm text-muted-foreground">
                  {workflowForm.isActive ? "Workflow is active" : "Workflow is disabled"}
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleCreateWorkflow}
              disabled={createWorkflowMutation.isPending || !workflowForm.name}
              className="btn-gradient btn-gradient-primary"
            >
              {createWorkflowMutation.isPending ? "Creating..." : "Create Workflow"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the workflow
              and all associated automation rules.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteWorkflow}
              disabled={deleteWorkflowMutation.isPending}
              className="bg-red-500 hover:bg-red-600"
            >
              {deleteWorkflowMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export { WorkflowBuilder };