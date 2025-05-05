import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const WorkflowBuilder = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Workflow Builder</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Create New Workflow</h3>
            <Button variant="outline" className="w-full">
              <span className="material-icons text-sm mr-2">add</span>
              Add Workflow Step
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};