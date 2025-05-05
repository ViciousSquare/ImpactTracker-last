import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ActivityLog = () => {
  const [page, setPage] = useState(1);
  const [userId, setUserId] = useState<string>("");
  const [action, setAction] = useState<string>("");
  const [entityType, setEntityType] = useState<string>("");

  // Fetch activity logs with filters
  const {
    data: activityLogsData,
    isLoading,
  } = useQuery({
    queryKey: [
      "/api/activity-logs", 
      { 
        userId, 
        action, 
        entityType, 
        page 
      }
    ],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getActionBadgeVariant = (action: string) => {
    switch (action.toLowerCase()) {
      case 'create':
        return 'default';
      case 'update':
        return 'secondary';
      case 'delete':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getEntityBadgeVariant = (entityType: string) => {
    switch (entityType.toLowerCase()) {
      case 'organization':
        return 'default';
      case 'program':
        return 'secondary';
      case 'report':
        return 'outline';
      case 'user':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Activity Log</h2>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>System Activity</CardTitle>
          <CardDescription>
            Monitor user actions and system events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Filter by user ID..."
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select
                value={action}
                onValueChange={setAction}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Actions</SelectItem>
                  <SelectItem value="create">Create</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                  <SelectItem value="delete">Delete</SelectItem>
                  <SelectItem value="login">Login</SelectItem>
                  <SelectItem value="logout">Logout</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={entityType}
                onValueChange={setEntityType}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Entity Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  <SelectItem value="organization">Organization</SelectItem>
                  <SelectItem value="program">Program</SelectItem>
                  <SelectItem value="report">Report</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="invitation">Invitation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Entity Type</TableHead>
                    <TableHead>Entity ID</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activityLogsData?.logs && activityLogsData.logs.length > 0 ? (
                    activityLogsData.logs.map((log: any) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">
                          {formatTimestamp(log.createdAt)}
                        </TableCell>
                        <TableCell>
                          {log.user?.username || log.userId}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getActionBadgeVariant(log.action)}>
                            {log.action}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getEntityBadgeVariant(log.entityType)}>
                            {log.entityType}
                          </Badge>
                        </TableCell>
                        <TableCell>{log.entityId || 'N/A'}</TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {log.details ? (
                            <span title={JSON.stringify(log.details)}>
                              {JSON.stringify(log.details).slice(0, 30)}...
                            </span>
                          ) : (
                            'N/A'
                          )}
                        </TableCell>
                        <TableCell>{log.ipAddress || 'Unknown'}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                        No activity logs found. Try adjusting your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}

          {activityLogsData?.total && activityLogsData.total > 0 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-muted-foreground">
                Showing {Math.min((page - 1) * 10 + 1, activityLogsData.total)} to{" "}
                {Math.min(page * 10, activityLogsData.total)} of {activityLogsData.total} logs
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
                  disabled={page * 10 >= (activityLogsData.total || 0)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export { ActivityLog };