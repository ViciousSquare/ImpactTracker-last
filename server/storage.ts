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
    // Health & Wellbeing Organizations  
    {
      id: 1001,
      name: "Canadian Mental Health Association",
      impactScore: 95,
      impactGrade: ImpactGrade.APlus,
      yearlyChange: 8,
      sector: "Education",
      region: "National",
      verificationStatus: VerificationType.Audited,
      socialROI: 4.9,
      rank: 1
    },
    {
      id: 2,
      name: "Pathways to Education",
      impactScore: 92,
      impactGrade: ImpactGrade.A,
      yearlyChange: 5,
      sector: "Education",
      region: "National",
      verificationStatus: VerificationType.Verified,
      socialROI: 4.5,
      rank: 2
    },
    // Health & Wellbeing Organizations
    {
      id: 3,
      name: "Jack.org",
      impactScore: 94,
      impactGrade: ImpactGrade.APlus,
      yearlyChange: 15,
      sector: "Health & Wellbeing",
      region: "National",
      verificationStatus: VerificationType.Audited,
      socialROI: 5.2,
      rank: 1
    },
    {
      id: 4,
      name: "Kids Help Phone",
      impactScore: 91,
      impactGrade: ImpactGrade.A,
      yearlyChange: 7,
      sector: "Health & Wellbeing",
      region: "National",
      verificationStatus: VerificationType.Verified,
      socialROI: 4.8,
      rank: 2
    },
    // Food Security Organizations
    {
      id: 5,
      name: "Daily Bread Food Bank",
      impactScore: 93,
      impactGrade: ImpactGrade.APlus,
      yearlyChange: 12,
      sector: "Food Security",
      region: "Ontario",
      verificationStatus: VerificationType.Audited,
      socialROI: 4.8,
      rank: 1
    },
    {
      id: 6,
      name: "Second Harvest",
      impactScore: 90,
      impactGrade: ImpactGrade.A,
      yearlyChange: 6,
      sector: "Food Security",
      region: "National",
      verificationStatus: VerificationType.Verified,
      socialROI: 4.5,
      rank: 2
    },
    // Housing Organizations
    {
      id: 7,
      name: "Habitat for Humanity Canada",
      impactScore: 91,
      impactGrade: ImpactGrade.A,
      yearlyChange: 9,
      sector: "Housing",
      region: "National",
      verificationStatus: VerificationType.Audited,
      socialROI: 4.7,
      rank: 1
    },
    {
      id: 8,
      name: "Covenant House Toronto",
      impactScore: 89,
      impactGrade: ImpactGrade.A,
      yearlyChange: 5,
      sector: "Housing",
      region: "Ontario",
      verificationStatus: VerificationType.Verified,
      socialROI: 4.3,
      rank: 2
    },
    // Environment Organizations
    {
      id: 9,
      name: "Environmental Defence Canada",
      impactScore: 95,
      impactGrade: ImpactGrade.APlus,
      yearlyChange: 8,
      sector: "Environment",
      region: "National",
      verificationStatus: VerificationType.Audited,
      socialROI: 4.9,
      rank: 1
    },
    {
      id: 10,
      name: "David Suzuki Foundation",
      impactScore: 93,
      impactGrade: ImpactGrade.A,
      yearlyChange: 6,
      sector: "Environment",
      region: "National",
      verificationStatus: VerificationType.Verified,
      socialROI: 4.7,
      rank: 2
    },
    // Health Organizations
    {
      id: 11,
      name: "Canadian Mental Health Association",
      impactScore: 94,
      impactGrade: ImpactGrade.APlus,
      yearlyChange: 7,
      sector: "Health & Wellbeing",
      region: "National",
      verificationStatus: VerificationType.Audited,
      socialROI: 4.8,
      rank: 1
    },
    {
      id: 12,
      name: "Calgary Food Bank",
      impactScore: 92,
      impactGrade: ImpactGrade.A,
      yearlyChange: 5,
      sector: "Food Security",
      region: "Alberta",
      verificationStatus: VerificationType.Verified,
      socialROI: 4.6,
      rank: 2
    },
    {
      id: 13,
      name: "Quest Food Exchange",
      impactScore: 90,
      impactGrade: ImpactGrade.A,
      yearlyChange: 10,
      sector: "Food Security",
      region: "British Columbia",
      verificationStatus: VerificationType.Verified,
      socialROI: 4.4,
      rank: 3
    },
    // Housing Organizations
    {
      id: 14,
      name: "Eva's Initiatives",
      impactScore: 88,
      impactGrade: ImpactGrade.A,
      yearlyChange: 4,
      sector: "Housing",
      region: "Ontario",
      verificationStatus: VerificationType.Verified,
      socialROI: 4.0,
      rank: 3
    },
    {
      id: 15,
      name: "Atira Women's Resource Society",
      impactScore: 87,
      impactGrade: ImpactGrade.B,
      yearlyChange: 3,
      sector: "Housing",
      region: "British Columbia",
      verificationStatus: VerificationType.Verified,
      socialROI: 3.9,
      rank: 4
    },
    // More Education Organizations
    {
      id: 16,
      name: "Right To Play",
      impactScore: 89,
      impactGrade: ImpactGrade.A,
      yearlyChange: 6,
      sector: "Education",
      region: "National",
      verificationStatus: VerificationType.Verified,
      socialROI: 4.3,
      rank: 3
    },
    {
      id: 17,
      name: "Let's Talk Science",
      impactScore: 87,
      impactGrade: ImpactGrade.B,
      yearlyChange: 4,
      sector: "Education",
      region: "National",
      verificationStatus: VerificationType.Verified,
      socialROI: 4.1,
      rank: 4
    },
    // More Environment Organizations
    {
      id: 18,
      name: "Nature Conservancy of Canada",
      impactScore: 92,
      impactGrade: ImpactGrade.A,
      yearlyChange: 5,
      sector: "Environment",
      region: "National",
      verificationStatus: VerificationType.Verified,
      socialROI: 4.5,
      rank: 3
    },
    {
      id: 19,
      name: "EcoJustice",
      impactScore: 90,
      impactGrade: ImpactGrade.A,
      yearlyChange: 3,
      sector: "Environment",
      region: "National",
      verificationStatus: VerificationType.Verified,
      socialROI: 4.2,
      rank: 4
    },
    {
      id: 20,
      name: "Learning for a Sustainable Future",
      impactScore: 88,
      impactGrade: ImpactGrade.A,
      yearlyChange: 4,
      sector: "Environment",
      region: "National",
      verificationStatus: VerificationType.Verified,
      socialROI: 4.0,
      rank: 5
    }
  ],
  total: 20
};

export const storage = {
  getLeaderboard: async (filters: any) => {
    return {
      items: [
        {
          id: 1,
          name: "United Way Centraide Canada",
          impactScore: 96,
          impactGrade: "A+",
          yearlyChange: 8,
          sector: "Social Services",
          region: "National",
          verificationStatus: "Audited",
          socialROI: 5.2,
          rank: 1
        },
        {
          id: 2,
          name: "Food Banks Canada",
          impactScore: 94,
          impactGrade: "A",
          yearlyChange: 7,
          sector: "Food Security",
          region: "National",
          verificationStatus: "Audited",
          socialROI: 4.8,
          rank: 1
        },
        {
          id: 3,
          name: "Canadian Red Cross",
          impactScore: 95,
          impactGrade: "A+",
          yearlyChange: 6,
          sector: "Health & Wellbeing",
          region: "National",
          verificationStatus: "Audited",
          socialROI: 4.9,
          rank: 1
        },
        {
          id: 4,
          name: "YMCA Canada",
          impactScore: 93,
          impactGrade: "A",
          yearlyChange: 5,
          sector: "Youth Development",
          region: "National",
          verificationStatus: "Audited",
          socialROI: 4.7,
          rank: 1
        }
      ],
      total: 4
    };
  },

  getTrendingOrganizations: async () => {
    return [
      { id: 1, name: "United Way Centraide Canada", change: 15 },
      { id: 2, name: "Food Banks Canada", change: 12 },
      { id: 3, name: "Canadian Red Cross", change: 10 },
      { id: 4, name: "YMCA Canada", change: 8 },
      { id: 5, name: "Habitat for Humanity Canada", change: 7 }
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
    return [
      {
        id: 1001,
        name: "United Way Centraide Canada",
        description: "Canada's largest non-governmental funder of community services",
        impactScore: 96,
        sector: "Social Services",
        sdgAlignment: ["No Poverty", "Good Health", "Quality Education", "Reduced Inequalities"],
        verificationStatus: "Audited",
        impactGrade: "A+",
        stats: {
          programs: 25,
          peopleReached: "2500000",
          socialROI: 5.2,
          metrics: {
            reportingQuality: 19,
            reach: 20,
            socialROI: 19,
            outcomeEffectiveness: 19,
            transparencyGovernance: 19
          }
        },
        description: "Canada's largest non-governmental funder of community services",
        impactScore: 96,
        sector: "Social Services",
        stats: {
          programs: 25,
          peopleReached: "2500000",
          socialROI: 5.2,
          metrics: {
            reportingQuality: 19,
            reach: 20,
            socialROI: 19,
            outcomeEffectiveness: 19,
            transparencyGovernance: 19
          }
        },
        mission: "Building stronger communities by improving lives today and creating lasting change",
        topPrograms: [
          {
            name: "Community Fund",
            peopleReached: 1200000,
            socialROI: 5.5,
            impactGrade: "A+"
          },
          {
            name: "Youth Success Strategy",
            peopleReached: 450000,
            socialROI: 4.8,
            impactGrade: "A"
          }
        ]
      },
      {
        id: 2,
        name: "Food Banks Canada",
        description: "National charitable organization dedicated to helping Canadians living with food insecurity",
        impactScore: 94,
        sector: "Food Security",
        stats: {
          programs: 20,
          peopleReached: "1800000",
          socialROI: 4.8,
          metrics: {
            reportingQuality: 18,
            reach: 19,
            socialROI: 18,
            outcomeEffectiveness: 19,
            transparencyGovernance: 18
          }
        }
      },
      {
        id: 3,
        name: "Canadian Red Cross",
        description: "Leading humanitarian organization providing emergency response and community support",
        impactScore: 95,
        sector: "Health & Wellbeing",
        stats: {
          programs: 30,
          peopleReached: "2000000",
          socialROI: 4.9,
          metrics: {
            reportingQuality: 19,
            reach: 19,
            socialROI: 19,
            outcomeEffectiveness: 19,
            transparencyGovernance: 19
          }
        }
      },
      {
        id: 4,
        name: "YMCA Canada",
        description: "Leading provider of community services focused on youth development and healthy living",
        impactScore: 93,
        sector: "Youth Development",
        stats: {
          programs: 28,
          peopleReached: "2200000",
          socialROI: 4.7,
          metrics: {
            reportingQuality: 18,
            reach: 19,
            socialROI: 18,
            outcomeEffectiveness: 18,
            transparencyGovernance: 18
          }
        }
      },
      {
        id: 5,
        name: "Habitat for Humanity Canada",
        description: "National organization building strength, stability and self-reliance through affordable housing",
        impactScore: 92,
        sector: "Housing",
        stats: {
          programs: 22,
          peopleReached: "150000",
          socialROI: 4.6,
          metrics: {
            reportingQuality: 18,
            reach: 18,
            socialROI: 18,
            outcomeEffectiveness: 18,
            transparencyGovernance: 18
          }
        }
      }
    ];
  },

  getSuccessStories: async () => {
    return [
      {
        id: 1001,
        name: "Canadian Mental Health Association",
        description: "Leading provider of mental health support and advocacy",
        impactScore: 96,
        impactGrade: "A+",
        sector: "Health & Wellbeing",
        region: "National",
        verificationType: "audited",
        stats: {
          programs: 35,
          peopleReached: 1500000,
          socialROI: 5.4
        },
        metrics: {
          reportingQuality: 19,
          reach: 20,
          socialROI: 19,
          outcomeEffectiveness: 19,
          transparencyGovernance: 19
        },
        sdgAlignment: ["Good Health", "Reduced Inequalities", "Sustainable Cities"],
        topPrograms: [
          {
            name: "BounceBack",
            peopleReached: 450000,
            socialROI: 5.2,
            impactGrade: "A+"
          },
          {
            name: "Living Life to the Full",
            peopleReached: 250000,
            socialROI: 4.9,
            impactGrade: "A"
          }
        ],
        mission: "Promoting mental health for all and supporting those with mental illness"
      },
        description: "National Impact Through Local Action",
        impactScore: 96,
        impactGrade: "A+",
        sector: "Social Services",
        region: "National",
        verificationType: "audited",
        stats: {
          programs: 25,
          peopleReached: 2500000,
          socialROI: 5.2
        },
        metrics: {
          reportingQuality: 19,
          reach: 20,
          socialROI: 19,
          outcomeEffectiveness: 19,
          transparencyGovernance: 19
        },
        sdgAlignment: ["No Poverty", "Good Health", "Quality Education", "Reduced Inequalities"],
        topPrograms: [
          {
            name: "Community Fund",
            peopleReached: 1200000,
            socialROI: 5.5,
            impactGrade: "A+"
          },
          {
            name: "Youth Success Strategy",
            peopleReached: 450000,
            socialROI: 4.8,
            impactGrade: "A"
          }
        ],
        mission: "Building stronger communities by improving lives today and creating lasting change"
      },
      {
        id: 2,
        name: "Food Banks Canada",
        description: "Leading the Fight Against Food Insecurity",
        impactScore: 94,
        impactGrade: "A",
        sector: "Food Security",
        region: "National",
        verificationType: "audited",
        stats: {
          programs: 20,
          peopleReached: 1800000,
          socialROI: 4.8
        },
        metrics: {
          reportingQuality: 18,
          reach: 19,
          socialROI: 18,
          outcomeEffectiveness: 19,
          transparencyGovernance: 18
        },
        sdgAlignment: ["Zero Hunger", "Good Health", "Sustainable Cities"],
        topPrograms: [
          {
            name: "National Food Sharing System",
            peopleReached: 900000,
            socialROI: 5.0,
            impactGrade: "A"
          },
          {
            name: "After the Bell Program",
            peopleReached: 400000,
            socialROI: 4.6,
            impactGrade: "A-"
          }
        ],
        mission: "Providing food banks with food and support to maximize their impact in communities"
      },
      {
        id: 3,
        name: "Canadian Red Cross",
        description: "Emergency Response and Community Support",
        impactScore: 95,
        impactGrade: "A+",
        sector: "Health & Wellbeing",
        region: "National",
        verificationType: "audited",
        stats: {
          programs: 30,
          peopleReached: 2000000,
          socialROI: 4.9
        },
        metrics: {
          reportingQuality: 19,
          reach: 19,
          socialROI: 19,
          outcomeEffectiveness: 19,
          transparencyGovernance: 19
        }
      }
    ];
  },

  getSdgData: async () => {
    return {
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
    };
  },

  getSolutions: async () => {
    return [
      {
        id: 1,
        name: "National Food Recovery Network",
        description: "Nationwide system for rescuing and redistributing surplus food",
        sector: "Food Security",
        impactScore: 92
      },
      {
        id: 2,
        name: "Youth Mental Health First Response",
        description: "24/7 crisis intervention and support services for youth",
        sector: "Health & Wellbeing",
        impactScore: 94
      },
      {
        id: 3,
        name: "Indigenous Education Pathways",
        description: "Culturally-responsive education support for Indigenous youth",
        sector: "Education",
        impactScore: 93
      },
      {
        id: 4,
        name: "Affordable Housing Innovation Fund",
        description: "Supporting creative solutions to housing affordability",
        sector: "Housing",
        impactScore: 91
      },
      {
        id: 5,
        name: "Digital Inclusion Initiative",
        description: "Bridging the digital divide for underserved communities",
        sector: "Education",
        impactScore: 90
      }
    ];
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