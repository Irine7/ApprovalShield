import { 
  users, 
  User, 
  InsertUser, 
  approvals, 
  Approval, 
  InsertApproval, 
  scanHistory, 
  ScanHistory, 
  InsertScanHistory,
  RiskLevel
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc, and, or, count } from "drizzle-orm";

// Storage interface with CRUD methods for approvals
export interface IStorage {
  // User methods (kept from original)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Approval methods
  getApprovals(): Promise<Approval[]>;
  getApprovalById(id: number): Promise<Approval | undefined>;
  createApproval(approval: InsertApproval): Promise<Approval>;
  
  // Scan history methods
  getScanHistory(): Promise<ScanHistory[]>;
  getLatestScan(): Promise<ScanHistory | undefined>;
  createScanHistory(scan: InsertScanHistory): Promise<ScanHistory>;
  
  // Statistics methods
  getApprovalStats(): Promise<{
    totalApprovals: number;
    riskyApprovals: number;
    riskScore: number;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private approvalItems: Map<number, Approval>;
  private scanHistoryItems: Map<number, ScanHistory>;
  private userCurrentId: number;
  private approvalCurrentId: number;
  private scanHistoryCurrentId: number;

  constructor() {
    this.users = new Map();
    this.approvalItems = new Map();
    this.scanHistoryItems = new Map();
    this.userCurrentId = 1;
    this.approvalCurrentId = 1;
    this.scanHistoryCurrentId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Approval methods
  async getApprovals(): Promise<Approval[]> {
    return Array.from(this.approvalItems.values());
  }
  
  async getApprovalById(id: number): Promise<Approval | undefined> {
    return this.approvalItems.get(id);
  }
  
  async createApproval(insertApproval: InsertApproval): Promise<Approval> {
    const id = this.approvalCurrentId++;
    const approval: Approval = { 
      ...insertApproval, 
      id, 
      detectedAt: new Date(),
      details: insertApproval.details || null
    };
    this.approvalItems.set(id, approval);
    return approval;
  }
  
  // Scan history methods
  async getScanHistory(): Promise<ScanHistory[]> {
    return Array.from(this.scanHistoryItems.values());
  }
  
  async getLatestScan(): Promise<ScanHistory | undefined> {
    const scanHistory = Array.from(this.scanHistoryItems.values());
    if (scanHistory.length === 0) {
      return undefined;
    }
    return scanHistory.sort((a, b) => 
      new Date(b.scanDate).getTime() - new Date(a.scanDate).getTime()
    )[0];
  }
  
  async createScanHistory(insertScanHistory: InsertScanHistory): Promise<ScanHistory> {
    const id = this.scanHistoryCurrentId++;
    const scanHistory: ScanHistory = {
      ...insertScanHistory,
      id,
      scanDate: new Date()
    };
    this.scanHistoryItems.set(id, scanHistory);
    return scanHistory;
  }
  
  // Statistics methods
  async getApprovalStats(): Promise<{
    totalApprovals: number;
    riskyApprovals: number;
    riskScore: number;
  }> {
    const approvals = Array.from(this.approvalItems.values());
    const totalApprovals = approvals.length;
    
    // Count risky approvals (high and medium risk)
    const riskyApprovals = approvals.filter(
      approval => approval.riskLevel === 'high' || approval.riskLevel === 'medium'
    ).length;
    
    // Calculate risk score (0-100)
    let riskScore = 0;
    if (totalApprovals > 0) {
      const highRiskCount = approvals.filter(a => a.riskLevel === 'high').length;
      const mediumRiskCount = approvals.filter(a => a.riskLevel === 'medium').length;
      const lowRiskCount = approvals.filter(a => a.riskLevel === 'low').length;
      
      // Weight the risk score: high (100), medium (50), low (25)
      riskScore = Math.min(100, Math.round(
        ((highRiskCount * 100) + (mediumRiskCount * 50) + (lowRiskCount * 25)) / totalApprovals
      ));
    }
    
    return {
      totalApprovals,
      riskyApprovals,
      riskScore
    };
  }
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Approval methods
  async getApprovals(): Promise<Approval[]> {
    return await db.select().from(approvals).orderBy(desc(approvals.detectedAt));
  }
  
  async getApprovalById(id: number): Promise<Approval | undefined> {
    const [approval] = await db.select().from(approvals).where(eq(approvals.id, id));
    return approval;
  }
  
  async createApproval(insertApproval: InsertApproval): Promise<Approval> {
    const [approval] = await db.insert(approvals).values(insertApproval).returning();
    return approval;
  }
  
  // Scan history methods
  async getScanHistory(): Promise<ScanHistory[]> {
    return await db.select().from(scanHistory).orderBy(desc(scanHistory.scanDate));
  }
  
  async getLatestScan(): Promise<ScanHistory | undefined> {
    const [latestScan] = await db
      .select()
      .from(scanHistory)
      .orderBy(desc(scanHistory.scanDate))
      .limit(1);
    
    return latestScan;
  }
  
  async createScanHistory(insertScanHistory: InsertScanHistory): Promise<ScanHistory> {
    const [scan] = await db.insert(scanHistory).values(insertScanHistory).returning();
    return scan;
  }
  
  // Statistics methods
  async getApprovalStats(): Promise<{
    totalApprovals: number;
    riskyApprovals: number;
    riskScore: number;
  }> {
    // Get total count of approvals
    const [totalResult] = await db.select({ count: count() }).from(approvals);
    const totalApprovals = totalResult?.count || 0;
    
    // Count risky approvals (high and medium risk)
    const [riskyResult] = await db
      .select({ count: count() })
      .from(approvals)
      .where(or(
        eq(approvals.riskLevel, 'high'),
        eq(approvals.riskLevel, 'medium')
      ));
    const riskyApprovals = riskyResult?.count || 0;
    
    // Calculate risk score by counting different risk levels
    const [highRiskResult] = await db
      .select({ count: count() })
      .from(approvals)
      .where(eq(approvals.riskLevel, 'high'));
    const highRiskCount = highRiskResult?.count || 0;
    
    const [mediumRiskResult] = await db
      .select({ count: count() })
      .from(approvals)
      .where(eq(approvals.riskLevel, 'medium'));
    const mediumRiskCount = mediumRiskResult?.count || 0;
    
    const [lowRiskResult] = await db
      .select({ count: count() })
      .from(approvals)
      .where(eq(approvals.riskLevel, 'low'));
    const lowRiskCount = lowRiskResult?.count || 0;
    
    // Calculate risk score (0-100)
    let riskScore = 0;
    if (totalApprovals > 0) {
      // Weight the risk score: high (100), medium (50), low (25)
      riskScore = Math.min(100, Math.round(
        ((highRiskCount * 100) + (mediumRiskCount * 50) + (lowRiskCount * 25)) / totalApprovals
      ));
    }
    
    return {
      totalApprovals,
      riskyApprovals,
      riskScore
    };
  }
}

// Use DatabaseStorage instead of MemStorage
export const storage = new DatabaseStorage();
