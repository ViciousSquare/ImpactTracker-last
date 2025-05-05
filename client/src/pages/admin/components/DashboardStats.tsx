import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardStatsProps {
  stats?: {
    organizationCount: number;
    programCount: number;
    impactValue: number;
    pendingInvites?: number;
    pendingVerifications?: number;
    activeUsers?: number;
  };
  isLoading: boolean;
}

const DashboardStats = ({ stats, isLoading }: DashboardStatsProps) => {
  // Function to format the impact value (in billions/millions)
  const formatImpactValue = (value: number) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(1)}B`;
    } else if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${value.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Platform Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-amber-700">Organizations</CardTitle>
            <CardDescription>Total registered organizations</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-12 w-24" />
            ) : (
              <div className="text-3xl font-bold text-amber-700">
                {stats?.organizationCount?.toLocaleString() || 0}
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-white border-orange-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-orange-700">Programs</CardTitle>
            <CardDescription>Active impact programs</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-12 w-24" />
            ) : (
              <div className="text-3xl font-bold text-orange-700">
                {stats?.programCount?.toLocaleString() || 0}
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-teal-50 to-white border-teal-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-teal-700">Impact Value</CardTitle>
            <CardDescription>Total measured impact</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-12 w-24" />
            ) : (
              <div className="text-3xl font-bold text-teal-700">
                {stats?.impactValue ? formatImpactValue(stats.impactValue) : '$0'}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-2xl font-bold mt-8">Admin Tasks</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pending Invitations</CardTitle>
            <CardDescription>Invitations awaiting response</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              {isLoading ? (
                <Skeleton className="h-10 w-16" />
              ) : (
                <div className="text-2xl font-bold">{stats?.pendingInvites || 0}</div>
              )}
              <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Manage
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Verification Requests</CardTitle>
            <CardDescription>Organizations awaiting verification</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              {isLoading ? (
                <Skeleton className="h-10 w-16" />
              ) : (
                <div className="text-2xl font-bold">{stats?.pendingVerifications || 0}</div>
              )}
              <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Review
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Users</CardTitle>
            <CardDescription>Users active in the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              {isLoading ? (
                <Skeleton className="h-10 w-16" />
              ) : (
                <div className="text-2xl font-bold">{stats?.activeUsers || 0}</div>
              )}
              <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                View
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardStats;