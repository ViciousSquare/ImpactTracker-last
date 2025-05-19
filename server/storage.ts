import { 
  users,
  organizations,
  programs,
  metrics,
  reports,
  statistics,
  invitations,
  verificationRequests,
  notifications,
  targetPartners,
  activityLogs,
  workflows,
  type User,
  type InsertUser,
  type Organization,
  type InsertOrganization,
  type Program,
  type InsertProgram,
  type Metric,
  type InsertMetric,
  type Report,
  type InsertReport,
  type Invitation,
  type InsertInvitation,
  type VerificationRequest,
  type InsertVerificationRequest,
  type Notification,
  type InsertNotification,
  type TargetPartner,
  type InsertTargetPartner,
  type ActivityLog,
  type InsertActivityLog,
  type Workflow,
  type InsertWorkflow,
  type Statistic
} from "../shared/schema";

import { 
  type LeaderboardItem,
  type TrendingItem,
  type OrganizationProfile,
  type SolutionItem,
  VerificationType,
  ImpactGrade,
  type Sector,
  type Region,
  type SDG
} from "../client/src/lib/types";

// Mock data for development
const mockLeaderboardData = {
  items: [
    // Food Security Organizations
    {
      id: 1,
      name: "Daily Bread Food Bank",
      impactScore: 92,
      impactGrade: ImpactGrade.APlus,
      yearlyChange: 12,
      sector: "Food Security",
      region: "Ontario",
      verificationStatus: VerificationType.Audited,
      socialROI: 4.8,
      rank: 1
    },
    {
      id: 2,
      name: "Food Security Organization 1",
      impactScore: 92,
      impactGrade: ImpactGrade.A,
      yearlyChange: 0,
      sector: "Food Security",
      region: "National",
      verificationStatus: VerificationType.Verified,
      socialROI: 4.2,
      rank: 2
    },
    {
      id: 3,
      name: "Food Security Organization 2",
      impactScore: 91,
      impactGrade: ImpactGrade.A,
      yearlyChange: 4,
      sector: "Food Security",
      region: "National",
      verificationStatus: VerificationType.Verified,
      socialROI: 4.0,
      rank: 3
    },
    {
      id: 4,
      name: "Quest Food Exchange",
      impactScore: 89,
      impactGrade: ImpactGrade.A,
      yearlyChange: 10,
      sector: "Food Security",
      region: "British Columbia",
      verificationStatus: VerificationType.Verified,
      socialROI: 4.1,
      rank: 4
    },
    {
      id: 5,
      name: "Food Security Organization 3",
      impactScore: 80,
      impactGrade: ImpactGrade.B,
      yearlyChange: -4,
      sector: "Food Security",
      region: "National",
      verificationStatus: VerificationType.Verified,
      socialROI: 3.5,
      rank: 5
    },
    // Housing Organizations
    {
      id: 6,
      name: "Housing Organization 4",
      impactScore: 99,
      impactGrade: ImpactGrade.APlus,
      yearlyChange: 1,
      sector: "Housing",
      region: "National",
      verificationStatus: VerificationType.Audited,
      socialROI: 5.0,
      rank: 1
    },
    {
      id: 7,
      name: "Eva's Initiatives",
      impactScore: 88,
      impactGrade: ImpactGrade.A,
      yearlyChange: 4,
      sector: "Housing",
      region: "Ontario",
      verificationStatus: VerificationType.Verified,
      socialROI: 4.0,
      rank: 2
    },
    {
      id: 8,
      name: "Housing Organization 2",
      impactScore: 83,
      impactGrade: ImpactGrade.B,
      yearlyChange: 14,
      sector: "Housing",
      region: "National",
      verificationStatus: VerificationType.Verified,
      socialROI: 3.8,
      rank: 3
    },
    {
      id: 9,
      name: "Housing Organization 3",
      impactScore: 83,
      impactGrade: ImpactGrade.B,
      yearlyChange: 0,
      sector: "Housing",
      region: "National",
      verificationStatus: VerificationType.Verified,
      socialROI: 3.7,
      rank: 4
    },
    {
      id: 10,
      name: "Housing Organization 1",
      impactScore: 78,
      impactGrade: ImpactGrade.B,
      yearlyChange: 14,
      sector: "Housing",
      region: "National",
      verificationStatus: VerificationType.SelfReported,
      socialROI: 3.5,
      rank: 5
    },
    // Education Organizations
    {
      id: 11,
      name: "Education Organization 3",
      impactScore: 98,
      impactGrade: ImpactGrade.APlus,
      yearlyChange: 10,
      sector: "Education",
      region: "National",
      verificationStatus: VerificationType.Audited,
      socialROI: 5.1,
      rank: 1
    },
    {
      id: 12,
      name: "Pathways to Education",
      impactScore: 90,
      impactGrade: ImpactGrade.A,
      yearlyChange: 8,
      sector: "Education",
      region: "National",
      verificationStatus: VerificationType.Verified,
      socialROI: 4.5,
      rank: 2
    },
    {
      id: 13,
      name: "Education Organization 1",
      impactScore: 88,
      impactGrade: ImpactGrade.A,
      yearlyChange: 7,
      sector: "Education",
      region: "National",
      verificationStatus: VerificationType.Verified,
      socialROI: 4.2,
      rank: 3
    },
    {
      id: 14,
      name: "Education Organization 4",
      impactScore: 85,
      impactGrade: ImpactGrade.B,
      yearlyChange: 1,
      sector: "Education",
      region: "National",
      verificationStatus: VerificationType.Verified,
      socialROI: 4.0,
      rank: 4
    },
    {
      id: 15,
      name: "Education Organization 2",
      impactScore: 78,
      impactGrade: ImpactGrade.B,
      yearlyChange: 10,
      sector: "Education",
      region: "National",
      verificationStatus: VerificationType.SelfReported,
      socialROI: 3.5,
      rank: 5
    },
    // Environment Organizations
    {
      id: 16,
      name: "Environment Organization 3",
      impactScore: 95,
      impactGrade: ImpactGrade.APlus,
      yearlyChange: 2,
      sector: "Environment",
      region: "National",
      verificationStatus: VerificationType.Audited,
      socialROI: 4.9,
      rank: 1
    },
    {
      id: 17,
      name: "Environment Organization 5",
      impactScore: 92,
      impactGrade: ImpactGrade.A,
      yearlyChange: 12,
      sector: "Environment",
      region: "National",
      verificationStatus: VerificationType.Verified,
      socialROI: 4.5,
      rank: 2
    },
    {
      id: 18,
      name: "Environment Organization 2",
      impactScore: 91,
      impactGrade: ImpactGrade.A,
      yearlyChange: 7,
      sector: "Environment",
      region: "National",
      verificationStatus: VerificationType.Verified,
      socialROI: 4.3,
      rank: 3
    },
    {
      id: 19,
      name: "Environment Organization 1",
      impactScore: 80,
      impactGrade: ImpactGrade.B,
      yearlyChange: 10,
      sector: "Environment",
      region: "National",
      verificationStatus: VerificationType.Verified,
      socialROI: 3.8,
      rank: 4
    },
    {
      id: 20,
      name: "Environment Organization 4",
      impactScore: 72,
      impactGrade: ImpactGrade.B,
      yearlyChange: 6,
      sector: "Environment",
      region: "National",
      verificationStatus: VerificationType.SelfReported,
      socialROI: 3.2,
      rank: 5
    }
  ],
  total: 20
  total: 5
};

export const storage = {
  getLeaderboard: async (filters: any) => {
    return mockLeaderboardData;
  },

  getTrendingOrganizations: async () => {
    return [
      { id: 1, name: "Jack.org", change: 15 },
      { id: 2, name: "Daily Bread Food Bank", change: 12 },
      { id: 3, name: "Quest Food Exchange", change: 10 },
      { id: 4, name: "Pathways to Education", change: 8 },
      { id: 5, name: "Eva's Initiatives", change: 7 }
    ];
  },

  getStatistics: async () => {
    return {
      organizationCount: 2418,
      programCount: 7142,
      impactValue: 4200000000,
    };
  },

  getFeaturedOrganization: async () => {
    return [{
      id: 1,
      name: "Jack.org",
      description: "Canada's only charity training and empowering young leaders to revolutionize mental health",
      impactScore: 94,
      sector: "Health & Wellbeing",
      stats: {
        programs: 15,
        peopleReached: "250000",
        socialROI: 5.2
      }
    }];
  },

  getSuccessStories: async () => {
    return [{
      id: 2,
      name: "Housing First Initiative",
      description: "Innovative approach to ending homelessness",
      impactScore: 89,
      impactGrade: "A",
      sector: "Housing",
      region: "National",
      verificationType: "verified",
      stats: {
        programs: 12,
        peopleReached: 5000,
        socialROI: 3.5
      },
      sdgAlignment: ["No Poverty", "Sustainable Cities"],
      topPrograms: [
        {
          name: "Rapid Housing",
          peopleReached: 2000,
          socialROI: 4.2,
          impactGrade: "A"
        }
      ],
      metrics: {
        reportingQuality: 18,
        reach: 16,
        socialROI: 17,
        outcomeEffectiveness: 19,
        transparencyGovernance: 19
      },
      mission: "Providing sustainable housing solutions"
    }];
  },

  getSolutions: async () => {
    return [{
      id: 1,
      name: "Rural Food Security Initiative",
      description: "Connecting rural communities with fresh food",
      sector: "Food Security"
    }];
  },
    getUser: async (id: number) => {
        return undefined;
    },
    getUserByUsername: async (username: string) => {
        return undefined;
    },
    createUser: async (user: InsertUser) => {
        return {} as User;
    },
    updateUser: async (id: number, userData: Partial<InsertUser>) => {
        return undefined;
    },
    listUsers: async (filters?: { role?: string; query?: string; page?: number; limit?: number; }) => {
        return { users: [], total: 0 };
    },
    updateStatistics: async (data: Partial<Statistic>) => {
        return {} as Statistic;
    },
    getOrganizationById: async (id: number) => {
        return undefined;
    },
    createOrganization: async (organization: InsertOrganization) => {
        return {} as Organization;
    },
    updateOrganization: async (id: number, data: Partial<InsertOrganization>) => {
        return undefined;
    },
    deleteOrganization: async (id: number) => {
        return false;
    },
    listOrganizations: async (filters?: { sector?: string; region?: string; verificationType?: string; query?: string; page?: number; limit?: number; }) => {
        return { organizations: [], total: 0 };
    },
    importOrganizations: async (organizations: InsertOrganization[]) => {
        return { successful: 0, failed: 0, errors: [] };
    },
    generateProfileLink: async (organizationId: number) => {
        return '';
    },
    getProgramsByOrganization: async (organizationId: number) => {
        return [];
    },
    createProgram: async (program: InsertProgram) => {
        return {} as Program;
    },
    updateProgram: async (id: number, data: Partial<InsertProgram>) => {
        return undefined;
    },
    deleteProgram: async (id: number) => {
        return false;
    },
    getMetric: async (id: number) => {
        return undefined;
    },
    getMetricsByOrganization: async (organizationId: number) => {
        return [];
    },
    createMetric: async (metric: InsertMetric) => {
        return {} as Metric;
    },
    updateMetric: async (id: number, data: Partial<InsertMetric>) => {
        return undefined;
    },
    getReportsByOrganization: async (organizationId: number) => {
        return [];
    },
    createReport: async (report: InsertReport) => {
        return {} as Report;
    },
    updateReport: async (id: number, data: Partial<InsertReport>) => {
        return undefined;
    },
    deleteReport: async (id: number) => {
        return false;
    },
    extractReportData: async (reportId: number) => {
        return undefined;
    },
    createInvitation: async (invitation: InsertInvitation) => {
        return {} as Invitation;
    },
    getInvitationByToken: async (token: string) => {
        return undefined;
    },
    getInvitationsByOrganization: async (organizationId: number) => {
        return [];
    },
    listInvitations: async (filters?: { status?: string; page?: number; limit?: number; }) => {
        return { invitations: [], total: 0 };
    },
    updateInvitation: async (id: number, data: Partial<InsertInvitation>) => {
        return undefined;
    },
    createVerificationRequest: async (request: InsertVerificationRequest) => {
        return {} as VerificationRequest;
    },
    getVerificationRequestsByOrganization: async (organizationId: number) => {
        return [];
    },
    listVerificationRequests: async (filters?: { status?: string; requestType?: string; page?: number; limit?: number; }) => {
        return { requests: [], total: 0 };
    },
    updateVerificationRequest: async (id: number, data: Partial<InsertVerificationRequest>) => {
        return undefined;
    },
    createNotification: async (notification: InsertNotification) => {
        return {} as Notification;
    },
    getNotificationsByUser: async (userId: number) => {
        return [];
    },
    markNotificationAsRead: async (id: number) => {
        return false;
    },
    deleteNotification: async (id: number) => {
        return false;
    },
    createTargetPartner: async (partner: InsertTargetPartner) => {
        return {} as TargetPartner;
    },
    getTargetPartnersByOrganization: async (organizationId: number) => {
        return [];
    },
    updateTargetPartner: async (id: number, data: Partial<InsertTargetPartner>) => {
        return undefined;
    },
    deleteTargetPartner: async (id: number) => {
        return false;
    },
    createActivityLog: async (log: InsertActivityLog) => {
        return {} as ActivityLog;
    },
    getActivityLogsByUser: async (userId: number) => {
        return [];
    },
    getActivityLogsByEntity: async (entityType: string, entityId: number) => {
        return [];
    },
    listActivityLogs: async (filters?: { userId?: number; action?: string; entityType?: string; page?: number; limit?: number; }) => {
        return { logs: [], total: 0 };
    },
    createWorkflow: async (workflow: InsertWorkflow) => {
        return {} as Workflow;
    },
    getWorkflowById: async (id: number) => {
        return undefined;
    },
    updateWorkflow: async (id: number, data: Partial<InsertWorkflow>) => {
        return undefined;
    },
    deleteWorkflow: async (id: number) => {
        return false;
    },
    listWorkflows: async (filters?: { isActive?: boolean; createdBy?: number; page?: number; limit?: number; }) => {
        return { workflows: [], total: 0 };
    },
    parseOrganizationJson: async (jsonData: string) => {
        return { parsed: false };
    },
    getRecommendedOrganizationsToAdd: async (limit?: number) => {
        return [];
    },
    getRecommendationsForOrganization: async (organizationId: number) => {
        return [];
    },
    getPotentialPartnersForOrganization: async (organizationId: number) => {
        return [];
    }
};