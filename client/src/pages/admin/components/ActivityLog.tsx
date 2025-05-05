
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export const ActivityLog = () => {
  const { data: activityLogs, isLoading } = useQuery({
    queryKey: ["/api/activity-logs"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Activity Log</h2>
        <Badge variant="outline">Last 24 hours</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Track all system activities and changes</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : (
            <div className="space-y-4">
              {activityLogs?.logs.map((log) => (
                <div key={log.id} className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full p-2 bg-neutral-100">
                      <span className="material-icons text-neutral-600">{getActionIcon(log.action)}</span>
                    </div>
                    <div>
                      <p className="font-medium">{log.action}</p>
                      <p className="text-sm text-muted-foreground">{formatActivityDetails(log)}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(log.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

function getActionIcon(action: string): string {
  switch (action.toLowerCase()) {
    case 'create': return 'add_circle';
    case 'update': return 'edit';
    case 'delete': return 'delete';
    case 'verify': return 'verified';
    default: return 'info';
  }
}

function formatActivityDetails(log: any): string {
  return `${log.entityType} #${log.entityId} by ${log.userId}`;
}
