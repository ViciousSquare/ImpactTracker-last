import { useEffect, useState } from "react";
import { Link } from "wouter";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getQueryFn, queryClient } from "@/lib/queryClient";
import { useQuery } from "@tanstack/react-query";

// Admin dashboard components
import OrganizationManager from "./components/OrganizationManager";
import DashboardStats from "./components/DashboardStats";
import ActivityLog from "./components/ActivityLog";
import WorkflowBuilder from "./components/WorkflowBuilder";
import DataParser from "./components/DataParser";
import VerificationManager from "./components/VerificationManager";
import InvitationManager from "./components/InvitationManager";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  // Get admin dashboard statistics
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['/api/statistics'],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-heading gradient-heading-primary">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage organizations, users, and platform settings
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline">
              <Link href="/">
                <span className="material-icons text-sm mr-1">home</span>
                View Site
              </Link>
            </Button>
            <Button className="btn-gradient btn-gradient-accent">
              <span className="material-icons text-sm mr-1">help_outline</span>
              Help
            </Button>
          </div>
        </div>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-7 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="organizations">Organizations</TabsTrigger>
          <TabsTrigger value="invitations">Invitations</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="data-input">Data Input</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="overview">
            <DashboardStats stats={stats} isLoading={statsLoading} />
          </TabsContent>

          <TabsContent value="organizations">
            <OrganizationManager />
          </TabsContent>

          <TabsContent value="invitations">
            <InvitationManager />
          </TabsContent>

          <TabsContent value="verification">
            <VerificationManager />
          </TabsContent>

          <TabsContent value="data-input">
            <DataParser />
          </TabsContent>

          <TabsContent value="workflows">
            <WorkflowBuilder />
          </TabsContent>

          <TabsContent value="activity">
            <ActivityLog />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;