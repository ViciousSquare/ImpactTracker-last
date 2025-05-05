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
} from "@shared/schema";
import { 
  LeaderboardItem, 
  TrendingItem, 
  OrganizationProfile,
  SolutionItem,
  VerificationType,
  ImpactGrade,
  Sector,
  Region,
  SDG,
  Demographic
} from "@/lib/types";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined>;
  listUsers(filters?: { role?: string, query?: string, page?: number, limit?: number }): Promise<{ users: User[], total: number }>;
  
  // Statistics
  getStatistics(): Promise<{
    organizationCount: number;
    programCount: number;
    impactValue: number;
    pendingInvites?: number;
    pendingVerifications?: number;
    activeUsers?: number;
  }>;
  updateStatistics(data: Partial<Statistic>): Promise<Statistic>;
  
  // Trending
  getTrendingOrganizations(): Promise<TrendingItem[]>;
  
  // Leaderboard
  getLeaderboard(filters: {
    sector: string;
    region: string;
    sdg: string;
    query: string;
    page: number;
    sortBy: string;
    sortOrder: string;
  }): Promise<{
    items: LeaderboardItem[];
    total: number;
  }>;
  
  // Organizations
  getFeaturedOrganization(): Promise<OrganizationProfile[]>;
  getOrganizationById(id: number): Promise<OrganizationProfile | undefined>;
  createOrganization(organization: InsertOrganization): Promise<Organization>;
  updateOrganization(id: number, data: Partial<InsertOrganization>): Promise<Organization | undefined>;
  deleteOrganization(id: number): Promise<boolean>;
  listOrganizations(filters?: { 
    sector?: string, 
    region?: string, 
    verificationType?: string, 
    query?: string, 
    page?: number, 
    limit?: number 
  }): Promise<{ organizations: Organization[], total: number }>;
  importOrganizations(organizations: InsertOrganization[]): Promise<{ 
    successful: number, 
    failed: number, 
    errors: Array<{ index: number, error: string }> 
  }>;
  generateProfileLink(organizationId: number): Promise<string>;
  getSuccessStories(): Promise<OrganizationProfile[]>;
  
  // Solutions
  getSolutions(filters: {
    query: string;
    sector: string;
    region: string;
    businessType: string;
    sdg: string;
    demographic: string;
    page: number;
  }): Promise<SolutionItem[]>;
  
  // Programs
  getProgramsByOrganization(organizationId: number): Promise<Program[]>;
  createProgram(program: InsertProgram): Promise<Program>;
  updateProgram(id: number, data: Partial<InsertProgram>): Promise<Program | undefined>;
  deleteProgram(id: number): Promise<boolean>;
  
  // Metrics
  getMetric(id: number): Promise<Metric | undefined>;
  getMetricsByOrganization(organizationId: number): Promise<Metric[]>;
  createMetric(metric: InsertMetric): Promise<Metric>;
  updateMetric(id: number, data: Partial<InsertMetric>): Promise<Metric | undefined>;
  
  // Reports
  getReportsByOrganization(organizationId: number): Promise<Report[]>;
  createReport(report: InsertReport): Promise<Report>;
  updateReport(id: number, data: Partial<InsertReport>): Promise<Report | undefined>;
  deleteReport(id: number): Promise<boolean>;
  extractReportData(reportId: number): Promise<any>;
  
  // Invitations
  createInvitation(invitation: InsertInvitation): Promise<Invitation>;
  getInvitationByToken(token: string): Promise<Invitation | undefined>;
  getInvitationsByOrganization(organizationId: number): Promise<Invitation[]>;
  listInvitations(filters?: { 
    status?: string, 
    page?: number, 
    limit?: number 
  }): Promise<{ invitations: Invitation[], total: number }>;
  updateInvitation(id: number, data: Partial<InsertInvitation>): Promise<Invitation | undefined>;
  
  // Verification Requests
  createVerificationRequest(request: InsertVerificationRequest): Promise<VerificationRequest>;
  getVerificationRequestsByOrganization(organizationId: number): Promise<VerificationRequest[]>;
  listVerificationRequests(filters?: { 
    status?: string, 
    requestType?: string, 
    page?: number, 
    limit?: number 
  }): Promise<{ requests: VerificationRequest[], total: number }>;
  updateVerificationRequest(id: number, data: Partial<InsertVerificationRequest>): Promise<VerificationRequest | undefined>;
  
  // Notifications
  createNotification(notification: InsertNotification): Promise<Notification>;
  getNotificationsByUser(userId: number): Promise<Notification[]>;
  markNotificationAsRead(id: number): Promise<boolean>;
  deleteNotification(id: number): Promise<boolean>;
  
  // Target Partners
  createTargetPartner(partner: InsertTargetPartner): Promise<TargetPartner>;
  getTargetPartnersByOrganization(organizationId: number): Promise<TargetPartner[]>;
  updateTargetPartner(id: number, data: Partial<InsertTargetPartner>): Promise<TargetPartner | undefined>;
  deleteTargetPartner(id: number): Promise<boolean>;
  
  // Activity Logs
  createActivityLog(log: InsertActivityLog): Promise<ActivityLog>;
  getActivityLogsByUser(userId: number): Promise<ActivityLog[]>;
  getActivityLogsByEntity(entityType: string, entityId: number): Promise<ActivityLog[]>;
  listActivityLogs(filters?: { 
    userId?: number, 
    action?: string, 
    entityType?: string, 
    page?: number, 
    limit?: number 
  }): Promise<{ logs: ActivityLog[], total: number }>;
  
  // Workflows
  createWorkflow(workflow: InsertWorkflow): Promise<Workflow>;
  getWorkflowById(id: number): Promise<Workflow | undefined>;
  updateWorkflow(id: number, data: Partial<InsertWorkflow>): Promise<Workflow | undefined>;
  deleteWorkflow(id: number): Promise<boolean>;
  listWorkflows(filters?: { 
    isActive?: boolean, 
    createdBy?: number, 
    page?: number, 
    limit?: number 
  }): Promise<{ workflows: Workflow[], total: number }>;
  
  // AI and Data Processing
  parseOrganizationJson(jsonData: string): Promise<{ 
    parsed: boolean, 
    data?: Partial<InsertOrganization>, 
    metrics?: Partial<InsertMetric>,
    programs?: Partial<InsertProgram>[],
    targetPartners?: Partial<InsertTargetPartner>[],
    error?: string 
  }>;
  getRecommendedOrganizationsToAdd(limit?: number): Promise<{ 
    name: string, 
    sector: string, 
    region: string, 
    potentialImpact: string 
  }[]>;
  getRecommendationsForOrganization(organizationId: number): Promise<{ 
    title: string, 
    description: string, 
    impactPotential: string,
    difficulty: string 
  }[]>;
  getPotentialPartnersForOrganization(organizationId: number): Promise<{ 
    organizationId: number, 
    name: string, 
    sector: string, 
    compatibilityScore: number 
  }[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private organizations: Map<number, Organization>;
  private programs: Map<number, Program>;
  private metrics: Map<number, Metric>;
  private reports: Map<number, Report>;
  private invitations: Map<number, Invitation>;
  private verificationRequests: Map<number, VerificationRequest>;
  private notifications: Map<number, Notification>;
  private targetPartners: Map<number, TargetPartner>;
  private activityLogs: Map<number, ActivityLog>;
  private workflows: Map<number, Workflow>;
  private stats: Statistic;
  
  currentId: number;

  constructor() {
    this.users = new Map();
    this.organizations = new Map();
    this.programs = new Map();
    this.metrics = new Map();
    this.reports = new Map();
    this.invitations = new Map();
    this.verificationRequests = new Map();
    this.notifications = new Map();
    this.targetPartners = new Map();
    this.activityLogs = new Map();
    this.workflows = new Map();
    this.currentId = 1;
    
    // Initialize with sample data for demo
    this.initSampleData();
    
    // Set initial statistics
    this.stats = {
      id: 1,
      organizationCount: 2418,
      programCount: 7142,
      impactValue: 4200000000, // $4.2B
      pendingInvites: 32,
      pendingVerifications: 18,
      activeUsers: 1243,
      updatedAt: new Date()
    };
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: now,
      updatedAt: now,
      lastLogin: null
    };
    this.users.set(id, user);
    return user;
  }
  
  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser: User = {
      ...user,
      ...userData,
      updatedAt: new Date()
    };
    
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  async listUsers(filters: { 
    role?: string; 
    query?: string; 
    page?: number; 
    limit?: number; 
  } = {}): Promise<{ users: User[]; total: number; }> {
    let users = Array.from(this.users.values());
    
    // Apply filters
    if (filters.role) {
      users = users.filter(user => user.role === filters.role);
    }
    
    if (filters.query) {
      const query = filters.query.toLowerCase();
      users = users.filter(user => 
        user.username.toLowerCase().includes(query) || 
        (user.email && user.email.toLowerCase().includes(query)) ||
        (user.name && user.name.toLowerCase().includes(query))
      );
    }
    
    // Sort by latest created
    users.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    // Pagination
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const startIndex = (page - 1) * limit;
    
    return {
      users: users.slice(startIndex, startIndex + limit),
      total: users.length
    };
  }
  
  // Statistics operations
  async getStatistics(): Promise<{
    organizationCount: number;
    programCount: number;
    impactValue: number;
    pendingInvites?: number;
    pendingVerifications?: number;
    activeUsers?: number;
  }> {
    return {
      organizationCount: this.stats.organizationCount || 0,
      programCount: this.stats.programCount || 0,
      impactValue: this.stats.impactValue || 0,
      pendingInvites: this.stats.pendingInvites || 0,
      pendingVerifications: this.stats.pendingVerifications || 0,
      activeUsers: this.stats.activeUsers || 0
    };
  }
  
  async updateStatistics(data: Partial<Statistic>): Promise<Statistic> {
    this.stats = {
      ...this.stats,
      ...data,
      updatedAt: new Date()
    };
    
    return this.stats;
  }
  
  // Trending operations
  async getTrendingOrganizations(): Promise<TrendingItem[]> {
    return [
      { id: 1, name: 'FoodShare Toronto', change: 12 },
      { id: 2, name: 'Green Energy Solutions', change: -4 },
      { id: 3, name: 'Homeless Connect', change: 8 },
      { id: 4, name: 'Literacy Alliance', change: 5 }
    ];
  }
  
  // Leaderboard operations
  async getLeaderboard(filters: {
    sector: string;
    region: string;
    sdg: string;
    query: string;
    page: number;
    sortBy: string;
    sortOrder: string;
  }): Promise<{
    items: LeaderboardItem[];
    total: number;
  }> {
    // Mock leaderboard data
    const mockLeaderboard: LeaderboardItem[] = [
      {
        id: 1,
        rank: 1,
        name: 'Canadian Food Bank Network',
        sector: 'Food Security',
        impactScore: 95,
        yearlyChange: 3.2,
        socialROI: 9.35,
        region: 'National',
        impactGrade: ImpactGrade.APlus,
        verificationType: VerificationType.Audited
      },
      {
        id: 2,
        rank: 2,
        name: 'Housing First Initiative',
        sector: 'Housing',
        impactScore: 92,
        yearlyChange: 5.7,
        socialROI: 7.26,
        region: 'Ontario',
        impactGrade: ImpactGrade.A,
        verificationType: VerificationType.Audited
      },
      {
        id: 3,
        rank: 3,
        name: 'Youth STEM Foundation',
        sector: 'Education',
        impactScore: 88,
        yearlyChange: -1.2,
        socialROI: 5.93,
        region: 'Quebec',
        impactGrade: ImpactGrade.AMinus,
        verificationType: VerificationType.Verified
      },
      {
        id: 4,
        rank: 4,
        name: 'Climate Action Coalition',
        sector: 'Environment',
        impactScore: 86,
        yearlyChange: 2.4,
        socialROI: 4.82,
        region: 'British Columbia',
        impactGrade: ImpactGrade.BPlus,
        verificationType: VerificationType.Verified
      },
      {
        id: 5,
        rank: 5,
        name: 'Mental Health Alliance',
        sector: 'Health & Wellbeing',
        impactScore: 84,
        yearlyChange: 3.8,
        socialROI: 6.15,
        region: 'Alberta',
        impactGrade: ImpactGrade.BPlus,
        verificationType: VerificationType.Verified
      }
    ];
    
    // Apply filters (simple implementation for demo)
    let filtered = [...mockLeaderboard];
    
    if (filters.sector) {
      filtered = filtered.filter(item => item.sector === filters.sector);
    }
    
    if (filters.region) {
      filtered = filtered.filter(item => item.region === filters.region);
    }
    
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.sector.toLowerCase().includes(query)
      );
    }
    
    // Sort data
    filtered.sort((a, b) => {
      const aValue = a[filters.sortBy as keyof LeaderboardItem];
      const bValue = b[filters.sortBy as keyof LeaderboardItem];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return filters.sortOrder === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return filters.sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });
    
    // Pagination
    const page = filters.page || 1;
    const pageSize = 5;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedItems = filtered.slice(startIndex, endIndex);
    
    // Update ranks based on sorting
    paginatedItems.forEach((item, index) => {
      item.rank = startIndex + index + 1;
    });
    
    return {
      items: paginatedItems,
      total: 243 // Mock total for pagination
    };
  }
  
  // Organization operations
  async getFeaturedOrganization(): Promise<OrganizationProfile[]> {
    return [
      {
        id: 1,
        name: 'Canadian Food Bank Network',
        logo: undefined,
        mission: 'The Canadian Food Bank Network is dedicated to providing food security to vulnerable communities across Canada through an integrated network of local food banks, community programs, and partnerships with food producers.',
        sector: 'Food Security',
        region: 'National',
        established: 2002,
        impactScore: 95,
        impactGrade: ImpactGrade.APlus,
        verificationType: VerificationType.Audited,
        yearlyChange: 3.2,
        sdgAlignment: [
          'SDG 2: Zero Hunger',
          'SDG 3: Good Health',
          'SDG 12: Responsible Consumption'
        ],
        metrics: {
          reportingQuality: 19,
          reach: 18,
          socialROI: 20,
          outcomeEffectiveness: 19,
          transparencyGovernance: 19
        },
        stats: {
          peopleReached: '1.2M annually',
          socialROI: 9.35,
          programs: 14,
          funding: '$24.5M',
          programAllocation: 87
        },
        yearlyTrend: [82, 85, 89, 92, 95],
        topPrograms: [
          {
            name: 'Emergency Food Relief',
            peopleReached: 425000,
            socialROI: 12.45,
            impactGrade: ImpactGrade.APlus
          },
          {
            name: 'Community Kitchen Network',
            peopleReached: 312000,
            socialROI: 8.76,
            impactGrade: ImpactGrade.A
          },
          {
            name: 'Food Waste Reduction',
            peopleReached: 275000,
            socialROI: 7.92,
            impactGrade: ImpactGrade.AMinus
          }
        ]
      },
      {
        id: 7,
        name: 'Clean Energy Coalition',
        logo: undefined,
        mission: 'The Clean Energy Coalition advances sustainable energy solutions through innovative projects, policy advocacy, and community engagement to accelerate Canada\'s transition to a low-carbon future.',
        sector: 'Environment',
        region: 'British Columbia',
        established: 2008,
        impactScore: 93,
        impactGrade: ImpactGrade.APlus,
        verificationType: VerificationType.Audited,
        yearlyChange: 4.5,
        sdgAlignment: [
          'SDG 7: Affordable and Clean Energy',
          'SDG 13: Climate Action',
          'SDG 11: Sustainable Cities and Communities'
        ],
        metrics: {
          reportingQuality: 19,
          reach: 18,
          socialROI: 19,
          outcomeEffectiveness: 19,
          transparencyGovernance: 18
        },
        stats: {
          peopleReached: '850,000 annually',
          socialROI: 10.25,
          programs: 11,
          funding: '$22.8M',
          programAllocation: 86
        },
        yearlyTrend: [80, 84, 88, 91, 93],
        topPrograms: [
          {
            name: 'Community Solar Initiative',
            peopleReached: 325000,
            socialROI: 11.85,
            impactGrade: ImpactGrade.APlus
          },
          {
            name: 'Building Retrofit Program',
            peopleReached: 285000,
            socialROI: 9.45,
            impactGrade: ImpactGrade.A
          },
          {
            name: 'Clean Transport Network',
            peopleReached: 215000,
            socialROI: 8.95,
            impactGrade: ImpactGrade.A
          }
        ]
      },
      {
        id: 8,
        name: 'National Education Access',
        logo: undefined,
        mission: 'National Education Access works to eliminate barriers to education through scholarships, mentoring programs, and digital learning tools that create pathways to success for underserved students.',
        sector: 'Education',
        region: 'National',
        established: 2005,
        impactScore: 90,
        impactGrade: ImpactGrade.A,
        verificationType: VerificationType.Verified,
        yearlyChange: 3.8,
        sdgAlignment: [
          'SDG 4: Quality Education',
          'SDG 10: Reduced Inequalities',
          'SDG 8: Decent Work and Economic Growth'
        ],
        metrics: {
          reportingQuality: 18,
          reach: 18,
          socialROI: 18,
          outcomeEffectiveness: 19,
          transparencyGovernance: 17
        },
        stats: {
          peopleReached: '625,000 annually',
          socialROI: 8.75,
          programs: 9,
          funding: '$19.5M',
          programAllocation: 85
        },
        yearlyTrend: [78, 82, 85, 88, 90],
        topPrograms: [
          {
            name: 'First Generation Scholarship',
            peopleReached: 245000,
            socialROI: 9.85,
            impactGrade: ImpactGrade.APlus
          },
          {
            name: 'Digital Learning Initiative',
            peopleReached: 215000,
            socialROI: 8.45,
            impactGrade: ImpactGrade.A
          },
          {
            name: 'Career Pathways Mentoring',
            peopleReached: 165000,
            socialROI: 7.95,
            impactGrade: ImpactGrade.A
          }
        ]
      },
      {
        id: 9,
        name: 'Urban Housing Solutions',
        logo: undefined,
        mission: 'Urban Housing Solutions creates affordable, sustainable housing in urban centers through innovative development models, tenant support services, and advocacy for inclusive housing policies.',
        sector: 'Housing',
        region: 'Ontario',
        established: 2003,
        impactScore: 88,
        impactGrade: ImpactGrade.AMinus,
        verificationType: VerificationType.Verified,
        yearlyChange: 5.2,
        sdgAlignment: [
          'SDG 11: Sustainable Cities and Communities',
          'SDG 1: No Poverty',
          'SDG 10: Reduced Inequalities'
        ],
        metrics: {
          reportingQuality: 17,
          reach: 17,
          socialROI: 18,
          outcomeEffectiveness: 18,
          transparencyGovernance: 18
        },
        stats: {
          peopleReached: '58,000 annually',
          socialROI: 8.15,
          programs: 7,
          funding: '$16.2M',
          programAllocation: 83
        },
        yearlyTrend: [76, 79, 83, 86, 88],
        topPrograms: [
          {
            name: 'Affordable Housing Development',
            peopleReached: 28000,
            socialROI: 9.25,
            impactGrade: ImpactGrade.A
          },
          {
            name: 'Community Integration Services',
            peopleReached: 18000,
            socialROI: 7.85,
            impactGrade: ImpactGrade.A
          },
          {
            name: 'Housing Stability Program',
            peopleReached: 12000,
            socialROI: 7.25,
            impactGrade: ImpactGrade.AMinus
          }
        ]
      },
      {
        id: 10,
        name: 'Health Access Network',
        logo: undefined,
        mission: 'Health Access Network improves healthcare accessibility for underserved communities through mobile clinics, telemedicine services, and preventive health education programs.',
        sector: 'Health',
        region: 'Quebec',
        established: 2007,
        impactScore: 87,
        impactGrade: ImpactGrade.A,
        verificationType: VerificationType.Verified,
        yearlyChange: 2.8,
        sdgAlignment: [
          'SDG 3: Good Health',
          'SDG 10: Reduced Inequalities'
        ],
        metrics: {
          reportingQuality: 17,
          reach: 18,
          socialROI: 18,
          outcomeEffectiveness: 17,
          transparencyGovernance: 17
        },
        stats: {
          peopleReached: '165,000 annually',
          socialROI: 7.85,
          programs: 8,
          funding: '$14.5M',
          programAllocation: 84
        },
        yearlyTrend: [77, 80, 83, 85, 87],
        topPrograms: [
          {
            name: 'Mobile Health Clinics',
            peopleReached: 75000,
            socialROI: 8.65,
            impactGrade: ImpactGrade.A
          },
          {
            name: 'Preventive Health Education',
            peopleReached: 52000,
            socialROI: 7.45,
            impactGrade: ImpactGrade.AMinus
          },
          {
            name: 'Telemedicine for Rural Areas',
            peopleReached: 38000,
            socialROI: 7.25,
            impactGrade: ImpactGrade.AMinus
          }
        ]
      },
      {
        id: 11,
        name: 'Regional Economic Development',
        logo: undefined,
        mission: 'Regional Economic Development fosters sustainable economic growth in rural and underserved regions through small business development, skills training, and infrastructure investment.',
        sector: 'Economic Development',
        region: 'Atlantic',
        established: 2009,
        impactScore: 85,
        impactGrade: ImpactGrade.AMinus,
        verificationType: VerificationType.Verified,
        yearlyChange: 4.8,
        sdgAlignment: [
          'SDG 8: Decent Work and Economic Growth',
          'SDG 9: Industry, Innovation and Infrastructure',
          'SDG 10: Reduced Inequalities'
        ],
        metrics: {
          reportingQuality: 17,
          reach: 16,
          socialROI: 17,
          outcomeEffectiveness: 17,
          transparencyGovernance: 18
        },
        stats: {
          peopleReached: '72,000 annually',
          socialROI: 7.45,
          programs: 6,
          funding: '$12.8M',
          programAllocation: 82
        },
        yearlyTrend: [74, 77, 80, 83, 85],
        topPrograms: [
          {
            name: 'Small Business Development',
            peopleReached: 32000,
            socialROI: 8.15,
            impactGrade: ImpactGrade.A
          },
          {
            name: 'Skills Training Initiative',
            peopleReached: 25000,
            socialROI: 7.35,
            impactGrade: ImpactGrade.AMinus
          },
          {
            name: 'Infrastructure Investment',
            peopleReached: 15000,
            socialROI: 6.85,
            impactGrade: ImpactGrade.BMinus
          }
        ]
      },
      {
        id: 12,
        name: 'Arts & Heritage Foundation',
        logo: undefined,
        mission: 'Arts & Heritage Foundation preserves and promotes Canada\'s cultural heritage through community arts programming, cultural preservation initiatives, and inclusive artistic education.',
        sector: 'Arts & Culture',
        region: 'Quebec',
        established: 2004,
        impactScore: 83,
        impactGrade: ImpactGrade.A,
        verificationType: VerificationType.Verified,
        yearlyChange: 2.5,
        sdgAlignment: [
          'SDG 4: Quality Education',
          'SDG 10: Reduced Inequalities',
          'SDG 11: Sustainable Cities and Communities'
        ],
        metrics: {
          reportingQuality: 16,
          reach: 17,
          socialROI: 17,
          outcomeEffectiveness: 16,
          transparencyGovernance: 17
        },
        stats: {
          peopleReached: '190,000 annually',
          socialROI: 6.85,
          programs: 9,
          funding: '$13.5M',
          programAllocation: 81
        },
        yearlyTrend: [75, 78, 80, 82, 83],
        topPrograms: [
          {
            name: 'Community Arts Access',
            peopleReached: 85000,
            socialROI: 7.25,
            impactGrade: ImpactGrade.A
          },
          {
            name: 'Cultural Heritage Preservation',
            peopleReached: 65000,
            socialROI: 6.75,
            impactGrade: ImpactGrade.AMinus
          },
          {
            name: 'Arts Education for Youth',
            peopleReached: 40000,
            socialROI: 6.45,
            impactGrade: ImpactGrade.B
          }
        ]
      },
      {
        id: 13,
        name: 'Indigenous Community Alliance',
        logo: undefined,
        mission: 'Indigenous Community Alliance strengthens Indigenous communities through cultural revitalization, economic sovereignty initiatives, and land-based education programs.',
        sector: 'Social Services',
        region: 'British Columbia',
        established: 2006,
        impactScore: 89,
        impactGrade: ImpactGrade.A,
        verificationType: VerificationType.Audited,
        yearlyChange: 5.6,
        sdgAlignment: [
          'SDG 4: Quality Education',
          'SDG 10: Reduced Inequalities',
          'SDG 15: Life on Land',
          'SDG 16: Peace, Justice and Strong Institutions'
        ],
        metrics: {
          reportingQuality: 18,
          reach: 18,
          socialROI: 17,
          outcomeEffectiveness: 18,
          transparencyGovernance: 18
        },
        stats: {
          peopleReached: '35,000 annually',
          socialROI: 8.65,
          programs: 8,
          funding: '$15.2M',
          programAllocation: 86
        },
        yearlyTrend: [76, 80, 84, 87, 89],
        topPrograms: [
          {
            name: 'Cultural Revitalization',
            peopleReached: 16000,
            socialROI: 9.15,
            impactGrade: ImpactGrade.A
          },
          {
            name: 'Economic Sovereignty',
            peopleReached: 12000,
            socialROI: 8.45,
            impactGrade: ImpactGrade.A
          },
          {
            name: 'Land-Based Education',
            peopleReached: 7000,
            socialROI: 8.25,
            impactGrade: ImpactGrade.AMinus
          }
        ]
      },
      {
        id: 14,
        name: 'Youth Mental Health Collective',
        logo: undefined,
        mission: 'Youth Mental Health Collective promotes mental wellness among young Canadians through peer support networks, digital wellness resources, and mental health education in schools.',
        sector: 'Health & Wellbeing',
        region: 'Ontario',
        established: 2010,
        impactScore: 86,
        impactGrade: ImpactGrade.A,
        verificationType: VerificationType.Verified,
        yearlyChange: 6.2,
        sdgAlignment: [
          'SDG 3: Good Health',
          'SDG 4: Quality Education',
          'SDG 10: Reduced Inequalities'
        ],
        metrics: {
          reportingQuality: 17,
          reach: 18,
          socialROI: 17,
          outcomeEffectiveness: 17,
          transparencyGovernance: 17
        },
        stats: {
          peopleReached: '225,000 annually',
          socialROI: 7.95,
          programs: 7,
          funding: '$16.8M',
          programAllocation: 83
        },
        yearlyTrend: [72, 76, 79, 82, 86],
        topPrograms: [
          {
            name: 'Peer Support Networks',
            peopleReached: 95000,
            socialROI: 8.35,
            impactGrade: ImpactGrade.A
          },
          {
            name: 'Digital Wellness Platform',
            peopleReached: 75000,
            socialROI: 7.85,
            impactGrade: ImpactGrade.AMinus
          },
          {
            name: 'School Mental Health Program',
            peopleReached: 55000,
            socialROI: 7.65,
            impactGrade: ImpactGrade.B
          }
        ]
      },
      {
        id: 15,
        name: 'Rural Food Security Initiative',
        logo: undefined,
        mission: 'Rural Food Security Initiative improves access to nutritious food in rural and remote communities through local food systems development, nutrition education, and food distribution networks.',
        sector: 'Food Security',
        region: 'Prairies',
        established: 2008,
        impactScore: 84,
        impactGrade: ImpactGrade.AMinus,
        verificationType: VerificationType.Verified,
        yearlyChange: 3.7,
        sdgAlignment: [
          'SDG 2: Zero Hunger',
          'SDG 3: Good Health',
          'SDG 12: Responsible Consumption'
        ],
        metrics: {
          reportingQuality: 16,
          reach: 17,
          socialROI: 17,
          outcomeEffectiveness: 17,
          transparencyGovernance: 17
        },
        stats: {
          peopleReached: '85,000 annually',
          socialROI: 7.35,
          programs: 6,
          funding: '$11.2M',
          programAllocation: 84
        },
        yearlyTrend: [74, 77, 80, 82, 84],
        topPrograms: [
          {
            name: 'Local Food Systems Development',
            peopleReached: 38000,
            socialROI: 8.05,
            impactGrade: ImpactGrade.A
          },
          {
            name: 'Nutrition Education',
            peopleReached: 26000,
            socialROI: 7.15,
            impactGrade: ImpactGrade.AMinus
          },
          {
            name: 'Rural Food Distribution Network',
            peopleReached: 21000,
            socialROI: 6.85,
            impactGrade: ImpactGrade.B
          }
        ]
      },
      {
        id: 16,
        name: 'Northern Conservation Network',
        logo: undefined,
        mission: 'Northern Conservation Network protects Canada\'s northern ecosystems through community-based conservation, climate adaptation strategies, and sustainable resource management.',
        sector: 'Environment',
        region: 'Northern',
        established: 2007,
        impactScore: 82,
        impactGrade: ImpactGrade.A,
        verificationType: VerificationType.Verified,
        yearlyChange: 4.2,
        sdgAlignment: [
          'SDG 13: Climate Action',
          'SDG 14: Life Below Water',
          'SDG 15: Life on Land'
        ],
        metrics: {
          reportingQuality: 16,
          reach: 16,
          socialROI: 17,
          outcomeEffectiveness: 16,
          transparencyGovernance: 17
        },
        stats: {
          peopleReached: '28,000 annually',
          socialROI: 8.15,
          programs: 5,
          funding: '$10.5M',
          programAllocation: 85
        },
        yearlyTrend: [71, 74, 77, 80, 82],
        topPrograms: [
          {
            name: 'Community-Based Conservation',
            peopleReached: 12000,
            socialROI: 8.45,
            impactGrade: ImpactGrade.A
          },
          {
            name: 'Climate Adaptation Strategies',
            peopleReached: 9000,
            socialROI: 8.15,
            impactGrade: ImpactGrade.AMinus
          },
          {
            name: 'Sustainable Resource Management',
            peopleReached: 7000,
            socialROI: 7.85,
            impactGrade: ImpactGrade.B
          }
        ]
      }
    ];
  }
  
  async getOrganizationById(id: number): Promise<OrganizationProfile | undefined> {
    // Return the specific organization by ID
    const organizations = await this.getFeaturedOrganization();
    return organizations.find(org => org.id === id);
  }
  
  async getSuccessStories(): Promise<OrganizationProfile[]> {
    // Return showcase organizations as success stories
    return [
      {
        id: 2,
        name: 'Housing First Initiative',
        logo: undefined,
        mission: 'Housing First Initiative aims to end homelessness by providing immediate access to permanent housing with supportive services, following the principle that stable housing is the foundation for recovery and wellbeing.',
        sector: 'Housing',
        region: 'Ontario',
        established: 2008,
        impactScore: 92,
        impactGrade: ImpactGrade.A,
        verificationType: VerificationType.Audited,
        yearlyChange: 5.7,
        sdgAlignment: [
          'SDG 1: No Poverty',
          'SDG 11: Sustainable Cities and Communities',
          'SDG 3: Good Health'
        ],
        metrics: {
          reportingQuality: 18,
          reach: 17,
          socialROI: 19,
          outcomeEffectiveness: 18,
          transparencyGovernance: 20
        },
        stats: {
          peopleReached: '45,000 annually',
          socialROI: 7.26,
          programs: 8,
          funding: '$18.3M',
          programAllocation: 84
        },
        yearlyTrend: [78, 81, 85, 89, 92],
        topPrograms: [
          {
            name: 'Permanent Supportive Housing',
            peopleReached: 22000,
            socialROI: 9.52,
            impactGrade: ImpactGrade.APlus
          },
          {
            name: 'Rapid Rehousing',
            peopleReached: 14000,
            socialROI: 6.81,
            impactGrade: ImpactGrade.A
          },
          {
            name: 'Homelessness Prevention',
            peopleReached: 9000,
            socialROI: 5.44,
            impactGrade: ImpactGrade.AMinus
          }
        ]
      },
      {
        id: 3,
        name: 'Youth STEM Foundation',
        logo: undefined,
        mission: 'Youth STEM Foundation is dedicated to inspiring and preparing the next generation of Canadian innovators through accessible, engaging, and inclusive STEM education programs for underrepresented youth.',
        sector: 'Education',
        region: 'Quebec',
        established: 2011,
        impactScore: 88,
        impactGrade: ImpactGrade.AMinus,
        verificationType: VerificationType.Verified,
        yearlyChange: -1.2,
        sdgAlignment: [
          'SDG 4: Quality Education',
          'SDG 5: Gender Equality',
          'SDG 10: Reduced Inequalities'
        ],
        metrics: {
          reportingQuality: 16,
          reach: 18,
          socialROI: 17,
          outcomeEffectiveness: 19,
          transparencyGovernance: 18
        },
        stats: {
          peopleReached: '78,000 annually',
          socialROI: 5.93,
          programs: 12,
          funding: '$12.8M',
          programAllocation: 82
        },
        yearlyTrend: [82, 86, 90, 89, 88],
        topPrograms: [
          {
            name: 'Girls in STEM',
            peopleReached: 32000,
            socialROI: 7.25,
            impactGrade: ImpactGrade.A
          },
          {
            name: 'Coding Bootcamps',
            peopleReached: 28000,
            socialROI: 5.12,
            impactGrade: ImpactGrade.AMinus
          },
          {
            name: 'Science Center Outreach',
            peopleReached: 18000,
            socialROI: 4.56,
            impactGrade: ImpactGrade.BPlus
          }
        ]
      },
      {
        id: 4,
        name: 'Clean Energy Alliance',
        logo: undefined,
        mission: 'Clean Energy Alliance works to accelerate Canada\'s transition to renewable energy through community-driven projects, policy advocacy, and public education initiatives.',
        sector: 'Environment',
        region: 'British Columbia',
        established: 2010,
        impactScore: 91,
        impactGrade: ImpactGrade.A,
        verificationType: VerificationType.Audited,
        yearlyChange: 4.3,
        sdgAlignment: [
          'SDG 7: Affordable and Clean Energy',
          'SDG 13: Climate Action',
          'SDG 11: Sustainable Cities and Communities'
        ],
        metrics: {
          reportingQuality: 19,
          reach: 18,
          socialROI: 18,
          outcomeEffectiveness: 19,
          transparencyGovernance: 17
        },
        stats: {
          peopleReached: '120,000 annually',
          socialROI: 8.47,
          programs: 9,
          funding: '$21.5M',
          programAllocation: 86
        },
        yearlyTrend: [80, 84, 87, 89, 91],
        topPrograms: [
          {
            name: 'Community Solar Projects',
            peopleReached: 45000,
            socialROI: 9.85,
            impactGrade: ImpactGrade.APlus
          },
          {
            name: 'Clean Energy Education',
            peopleReached: 38000,
            socialROI: 7.92,
            impactGrade: ImpactGrade.A
          },
          {
            name: 'Green Building Transformation',
            peopleReached: 23000,
            socialROI: 7.65,
            impactGrade: ImpactGrade.A
          }
        ]
      },
      {
        id: 5,
        name: 'Indigenous Health Network',
        logo: undefined,
        mission: 'Indigenous Health Network is committed to improving health outcomes in Indigenous communities through culturally-responsive care, traditional healing practices, and community-based health programs.',
        sector: 'Health',
        region: 'Northern',
        established: 2005,
        impactScore: 85,
        impactGrade: ImpactGrade.A,
        verificationType: VerificationType.Verified,
        yearlyChange: 3.2,
        sdgAlignment: [
          'SDG 3: Good Health',
          'SDG 10: Reduced Inequalities'
        ],
        metrics: {
          reportingQuality: 17,
          reach: 16,
          socialROI: 17,
          outcomeEffectiveness: 18,
          transparencyGovernance: 17
        },
        stats: {
          peopleReached: '42,000 annually',
          socialROI: 7.65,
          programs: 12,
          funding: '$15.8M',
          programAllocation: 85
        },
        yearlyTrend: [76, 79, 82, 84, 85],
        topPrograms: [
          {
            name: 'Community Health Representatives',
            peopleReached: 18000,
            socialROI: 8.35,
            impactGrade: ImpactGrade.A
          },
          {
            name: 'Traditional Healing Integration',
            peopleReached: 14000,
            socialROI: 7.82,
            impactGrade: ImpactGrade.A
          },
          {
            name: 'Maternal & Child Health',
            peopleReached: 8500,
            socialROI: 6.75,
            impactGrade: ImpactGrade.AMinus
          }
        ]
      },
      {
        id: 6,
        name: 'Rural Economic Innovation',
        logo: undefined,
        mission: 'Rural Economic Innovation supports economic resilience in rural communities through entrepreneurship development, digital inclusion, and sustainable local economies.',
        sector: 'Economic Development',
        region: 'Prairies',
        established: 2012,
        impactScore: 81,
        impactGrade: ImpactGrade.AMinus,
        verificationType: VerificationType.Verified,
        yearlyChange: 6.5,
        sdgAlignment: [
          'SDG 8: Decent Work and Economic Growth',
          'SDG 9: Industry, Innovation and Infrastructure',
          'SDG 11: Sustainable Cities and Communities'
        ],
        metrics: {
          reportingQuality: 16,
          reach: 16,
          socialROI: 17,
          outcomeEffectiveness: 16,
          transparencyGovernance: 16
        },
        stats: {
          peopleReached: '32,000 annually',
          socialROI: 6.92,
          programs: 8,
          funding: '$12.3M',
          programAllocation: 83
        },
        yearlyTrend: [68, 72, 75, 78, 81],
        topPrograms: [
          {
            name: 'Rural Business Accelerator',
            peopleReached: 15000,
            socialROI: 7.65,
            impactGrade: ImpactGrade.A
          },
          {
            name: 'Digital Skills Initiative',
            peopleReached: 11000,
            socialROI: 6.45,
            impactGrade: ImpactGrade.AMinus
          },
          {
            name: 'Local Value Chain Development',
            peopleReached: 6000,
            socialROI: 6.15,
            impactGrade: ImpactGrade.AMinus
          }
        ]
      }
    ];
  }
  
  // Solution operations
  async getSolutions(filters: {
    query: string;
    sector: string;
    region: string;
    businessType: string;
    sdg: string;
    demographic: string;
    page: number;
  }): Promise<SolutionItem[]> {
    // Mock solutions data
    const mockSolutions: SolutionItem[] = [
      {
        id: 1,
        name: 'Rural Food Security Initiative',
        organizationName: 'Canadian Food Bank Network',
        icon: 'volunteer_activism',
        sector: 'Food Security',
        businessType: 'Non-Profit',
        region: 'National',
        description: 'Distributes nutritious food to rural and remote communities through innovative mobile pantries and community partnerships.',
        peopleReached: 185000,
        socialROI: 11.32,
        impactGrade: ImpactGrade.APlus,
        verificationType: VerificationType.Audited,
        effectiveness: 92,
        tags: ['Food Security', 'Rural', 'SDG 2']
      },
      {
        id: 2,
        name: 'Sustainable Food Waste Reduction',
        organizationName: 'Climate Action Coalition',
        icon: 'eco',
        sector: 'Environment',
        businessType: 'Social Enterprise',
        region: 'British Columbia',
        description: 'Rescues surplus food from restaurants and grocers to reduce waste while addressing food insecurity in urban centers.',
        peopleReached: 92000,
        socialROI: 8.65,
        impactGrade: ImpactGrade.A,
        verificationType: VerificationType.Verified,
        effectiveness: 87,
        tags: ['Food Security', 'Environment', 'SDG 12']
      },
      {
        id: 3,
        name: 'Indigenous Food Sovereignty',
        organizationName: 'Community Harvest Network',
        icon: 'school',
        sector: 'Food Security',
        businessType: 'Non-Profit',
        region: 'Ontario',
        description: 'Partners with First Nations communities to revitalize traditional food systems and build food sovereignty through education and infrastructure.',
        peopleReached: 43000,
        socialROI: 7.29,
        impactGrade: ImpactGrade.AMinus,
        verificationType: VerificationType.Verified,
        effectiveness: 85,
        tags: ['Food Security', 'Indigenous', 'SDG 2']
      },
      {
        id: 4,
        name: 'Affordable Housing Network',
        organizationName: 'Housing First Initiative',
        icon: 'house',
        sector: 'Housing',
        businessType: 'Non-Profit',
        region: 'Ontario',
        description: 'Develops and manages affordable housing units along with supportive services for vulnerable populations, focusing on the Housing First model.',
        peopleReached: 65000,
        socialROI: 9.45,
        impactGrade: ImpactGrade.A,
        verificationType: VerificationType.Audited,
        effectiveness: 89,
        tags: ['Housing', 'Urban', 'SDG 11']
      },
      {
        id: 5,
        name: 'Digital Literacy for Seniors',
        organizationName: 'Youth STEM Foundation',
        icon: 'computer',
        sector: 'Education',
        businessType: 'Non-Profit',
        region: 'Quebec',
        description: 'Pairs seniors with youth volunteers for technology training, helping older adults gain digital skills while fostering intergenerational connections.',
        peopleReached: 42000,
        socialROI: 7.85,
        impactGrade: ImpactGrade.AMinus,
        verificationType: VerificationType.Verified,
        effectiveness: 84,
        tags: ['Education', 'Seniors', 'SDG 4', 'Technology']
      },
      {
        id: 6,
        name: 'Clean Energy Community Co-op',
        organizationName: 'Clean Energy Alliance',
        icon: 'wb_sunny',
        sector: 'Environment',
        businessType: 'Social Enterprise',
        region: 'British Columbia',
        description: 'Establishes community-owned renewable energy projects, allowing local residents to invest in and benefit from clean energy generation in their neighborhoods.',
        peopleReached: 58000,
        socialROI: 10.25,
        impactGrade: ImpactGrade.APlus,
        verificationType: VerificationType.Audited,
        effectiveness: 91,
        tags: ['Environment', 'Energy', 'SDG 7', 'SDG 13']
      },
      {
        id: 7,
        name: 'Remote Indigenous Healthcare',
        organizationName: 'Indigenous Health Network',
        icon: 'healing',
        sector: 'Health',
        businessType: 'Non-Profit',
        region: 'Northern',
        description: 'Provides healthcare access to remote Indigenous communities through telemedicine, mobile clinics, and traditional healing integration.',
        peopleReached: 32000,
        socialROI: 8.75,
        impactGrade: ImpactGrade.A,
        verificationType: VerificationType.Verified,
        effectiveness: 86,
        tags: ['Health', 'Indigenous', 'SDG 3', 'Rural']
      },
      {
        id: 8,
        name: 'Rural Business Incubator',
        organizationName: 'Rural Economic Innovation',
        icon: 'trending_up',
        sector: 'Economic Development',
        businessType: 'Social Enterprise',
        region: 'Prairies',
        description: 'Supports rural entrepreneurs with business development resources, mentorship, and capital access to create sustainable local economies.',
        peopleReached: 25000,
        socialROI: 7.65,
        impactGrade: ImpactGrade.A,
        verificationType: VerificationType.Verified,
        effectiveness: 83,
        tags: ['Economic Development', 'Rural', 'SDG 8', 'Entrepreneurship']
      }
    ];
    
    // Apply filters (simple implementation for demo)
    let filtered = [...mockSolutions];
    
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query) ||
        item.organizationName.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    if (filters.sector && filters.sector !== 'All Sectors') {
      filtered = filtered.filter(item => item.sector === filters.sector);
    }
    
    if (filters.businessType && filters.businessType !== 'All Business Types') {
      filtered = filtered.filter(item => item.businessType === filters.businessType);
    }
    
    if (filters.region && filters.region !== 'All Regions') {
      filtered = filtered.filter(item => item.region === filters.region);
    }
    
    if (filters.sdg && filters.sdg !== 'All SDGs') {
      filtered = filtered.filter(item => 
        item.tags.some(tag => tag.includes(filters.sdg))
      );
    }
    
    if (filters.demographic && filters.demographic !== 'All Demographics') {
      filtered = filtered.filter(item => 
        item.tags.some(tag => tag.includes(filters.demographic))
      );
    }
    
    return filtered;
  }
  
  // Programs operations
  async getProgramsByOrganization(organizationId: number): Promise<Program[]> {
    return [];
  }
  
  // Reports operations
  async getReportsByOrganization(organizationId: number): Promise<Report[]> {
    return [];
  }
  
  // Helper method to initialize sample data
  private initSampleData(): void {
    // This would be replaced with actual data in a real implementation
  }
}

export const storage = new MemStorage();
