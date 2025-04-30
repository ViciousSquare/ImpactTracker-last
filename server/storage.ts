import { 
  users, 
  organizations, 
  programs, 
  metrics, 
  reports, 
  statistics,
  type User, 
  type InsertUser, 
  type Organization,
  type Program,
  type Metric,
  type Report,
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
  
  // Statistics
  getStatistics(): Promise<{
    organizationCount: number;
    programCount: number;
    impactValue: number;
  }>;
  
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
  getFeaturedOrganization(): Promise<OrganizationProfile | undefined>;
  getOrganizationById(id: number): Promise<OrganizationProfile | undefined>;
  
  // Solutions
  getSolutions(filters: {
    query: string;
    region: string;
    sdg: string;
    demographic: string;
    page: number;
  }): Promise<SolutionItem[]>;
  
  // Programs
  getProgramsByOrganization(organizationId: number): Promise<Program[]>;
  
  // Reports
  getReportsByOrganization(organizationId: number): Promise<Report[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private organizations: Map<number, Organization>;
  private programs: Map<number, Program>;
  private metrics: Map<number, Metric>;
  private reports: Map<number, Report>;
  private stats: Statistic;
  
  currentId: number;

  constructor() {
    this.users = new Map();
    this.organizations = new Map();
    this.programs = new Map();
    this.metrics = new Map();
    this.reports = new Map();
    this.currentId = 1;
    
    // Initialize with sample data for demo
    this.initSampleData();
    
    // Set initial statistics
    this.stats = {
      id: 1,
      organizationCount: 2418,
      programCount: 7142,
      impactValue: 4200000000, // $4.2B
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
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }
  
  // Statistics operations
  async getStatistics(): Promise<{
    organizationCount: number;
    programCount: number;
    impactValue: number;
  }> {
    return {
      organizationCount: this.stats.organizationCount,
      programCount: this.stats.programCount,
      impactValue: this.stats.impactValue
    };
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
  async getFeaturedOrganization(): Promise<OrganizationProfile | undefined> {
    return {
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
    };
  }
  
  async getOrganizationById(id: number): Promise<OrganizationProfile | undefined> {
    // For demo, return the featured organization for any ID
    return this.getFeaturedOrganization();
  }
  
  // Solution operations
  async getSolutions(filters: {
    query: string;
    region: string;
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
        description: 'Partners with First Nations communities to revitalize traditional food systems and build food sovereignty through education and infrastructure.',
        peopleReached: 43000,
        socialROI: 7.29,
        impactGrade: ImpactGrade.AMinus,
        verificationType: VerificationType.Verified,
        effectiveness: 85,
        tags: ['Food Security', 'Indigenous', 'SDG 2']
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
    
    if (filters.region) {
      // In a real implementation, we would filter by region
      // For this demo we're keeping all items
    }
    
    if (filters.sdg) {
      filtered = filtered.filter(item => 
        item.tags.some(tag => tag.includes(filters.sdg))
      );
    }
    
    if (filters.demographic) {
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
