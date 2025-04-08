import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertApprovalSchema, 
  insertScanHistorySchema,
  RiskLevelEnum,
  ApprovalTypeEnum
} from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API prefix for all routes
  const API_PREFIX = "/api";

  // Get all approvals
  app.get(`${API_PREFIX}/approvals`, async (req: Request, res: Response) => {
    const approvals = await storage.getApprovals();
    return res.json(approvals);
  });

  // Get a single approval by ID
  app.get(`${API_PREFIX}/approvals/:id`, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid approval ID" });
    }

    const approval = await storage.getApprovalById(id);
    if (!approval) {
      return res.status(404).json({ message: "Approval not found" });
    }

    return res.json(approval);
  });

  // Create a new approval
  app.post(`${API_PREFIX}/approvals`, async (req: Request, res: Response) => {
    try {
      const validatedData = insertApprovalSchema.parse(req.body);
      const newApproval = await storage.createApproval(validatedData);
      return res.status(201).json(newApproval);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: fromZodError(error).message });
      }
      return res.status(400).json({ message: "Invalid approval data" });
    }
  });

  // Get approval statistics
  app.get(`${API_PREFIX}/stats`, async (_req: Request, res: Response) => {
    const stats = await storage.getApprovalStats();
    return res.json(stats);
  });

  // Get scan history
  app.get(`${API_PREFIX}/scan-history`, async (_req: Request, res: Response) => {
    const scanHistory = await storage.getScanHistory();
    return res.json(scanHistory);
  });

  // Get the latest scan
  app.get(`${API_PREFIX}/scan-history/latest`, async (_req: Request, res: Response) => {
    const latestScan = await storage.getLatestScan();
    if (!latestScan) {
      return res.status(404).json({ message: "No scan history found" });
    }
    return res.json(latestScan);
  });

  // Create a new scan history entry
  app.post(`${API_PREFIX}/scan-history`, async (req: Request, res: Response) => {
    try {
      const validatedData = insertScanHistorySchema.parse(req.body);
      const newScanHistory = await storage.createScanHistory(validatedData);
      return res.status(201).json(newScanHistory);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: fromZodError(error).message });
      }
      return res.status(400).json({ message: "Invalid scan history data" });
    }
  });

  // Perform a scan
  app.post(`${API_PREFIX}/scan`, async (_req: Request, res: Response) => {
    // In a real application, this would perform actual scanning
    // For now, we'll just return the current approvals and update the scan history
    
    const approvals = await storage.getApprovals();
    const stats = await storage.getApprovalStats();
    
    // Create a new scan history entry
    await storage.createScanHistory({
      totalApprovals: stats.totalApprovals,
      riskyApprovals: stats.riskyApprovals,
      riskScore: stats.riskScore
    });
    
    return res.json({
      message: "Scan completed successfully",
      stats,
      approvals
    });
  });

  // Generate mock malicious approval for testing
  app.post(`${API_PREFIX}/generate-mock`, async (_req: Request, res: Response) => {
    // Create a mock malicious approval
    const mockApproval = await storage.createApproval({
      title: "Deceptive Domain Connection",
      provider: "metamask.phishing-site.com",
      description: "Connection request from a site with typosquatting patterns attempting to mimic a legitimate service.",
      codeSnippet: "Site metamask.phishing-site.com requesting connection to wallet using deceptive visual elements",
      riskLevel: "medium",
      type: "wallet",
      details: "This is a mock malicious approval for testing purposes."
    });
    
    // Update statistics
    const stats = await storage.getApprovalStats();
    
    return res.json({
      message: "Mock malicious approval generated",
      approval: mockApproval,
      stats
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
