import { useState } from "react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import SideNav from "@/components/side-nav";
import ActionPanel from "@/components/action-panel";
import Filters from "@/components/filters";
import ResultsPanel from "@/components/results-panel";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { formatDate } from "@/lib/utils";
import { Approval, RiskLevel, ApprovalType } from "@shared/schema";

type FilterState = {
  search: string;
  riskLevel: string;
  type: string;
};

export default function Dashboard() {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    riskLevel: "all",
    type: "all",
  });

  // Fetch approvals
  const approvalsQuery = useQuery<Approval[]>({
    queryKey: ["/api/approvals"],
  });

  // Fetch stats
  const statsQuery = useQuery<{
    totalApprovals: number;
    riskyApprovals: number;
    riskScore: number;
  }>({
    queryKey: ["/api/stats"],
  });

  // Fetch latest scan
  const latestScanQuery = useQuery<{
    id: number;
    scanDate: string;
    totalApprovals: number;
    riskyApprovals: number;
    riskScore: number;
  }>({
    queryKey: ["/api/scan-history/latest"],
    retry: false,
  });

  // Scan mutation
  const scanMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/scan", {});
    },
    onMutate: () => {
      setIsScanning(true);
    },
    onSuccess: () => {
      toast({
        title: "Scan completed",
        description: "Successfully scanned for malicious approvals",
      });
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["/api/approvals"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      queryClient.invalidateQueries({ queryKey: ["/api/scan-history/latest"] });
    },
    onError: (error) => {
      toast({
        title: "Scan failed",
        description: error.message,
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsScanning(false);
    },
  });

  // Generate mock malicious approval mutation
  const mockMaliciousMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/generate-mock", {});
    },
    onSuccess: (data) => {
      toast({
        title: "Mock malicious approval created",
        description: "A mock malicious approval has been added for testing",
        variant: "default",
      });
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["/api/approvals"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
    },
    onError: (error) => {
      toast({
        title: "Failed to create mock approval",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Handle scan button click
  const handleScan = () => {
    scanMutation.mutate();
  };

  // Handle mock malicious button click
  const handleMockMalicious = () => {
    mockMaliciousMutation.mutate();
  };

  // Filter approvals
  const filteredApprovals = approvalsQuery.data
    ? approvalsQuery.data.filter((approval: Approval) => {
        // Filter by search term
        if (
          filters.search &&
          !JSON.stringify(approval).toLowerCase().includes(filters.search.toLowerCase())
        ) {
          return false;
        }
        
        // Filter by risk level
        if (filters.riskLevel !== "all" && approval.riskLevel !== filters.riskLevel) {
          return false;
        }
        
        // Filter by type
        if (filters.type !== "all" && approval.type !== filters.type) {
          return false;
        }
        
        return true;
      })
    : [];

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-primary-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z"/><path d="M12 12h-1"/><path d="M12 6h.01"/></svg>
            </span>
            <h1 className="text-xl font-semibold text-neutral-800">Approvals Security Scanner</h1>
          </div>
          <div>
            <span className="text-sm text-neutral-500">Last scan: {
              latestScanQuery.data 
                ? formatDate(new Date(latestScanQuery.data.scanDate)) 
                : "Never"
            }</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Side Panel */}
          <SideNav stats={statsQuery.data ?? { totalApprovals: 0, riskyApprovals: 0, riskScore: 0 }} />
          
          {/* Main Content */}
          <div className="md:col-span-3 space-y-6">
            {/* Action Panel */}
            <ActionPanel 
              isScanning={isScanning}
              onScan={handleScan}
              onMockMalicious={handleMockMalicious}
            />
            
            {/* Filter Panel */}
            <Filters 
              filters={filters}
              onFilterChange={handleFilterChange}
            />
            
            {/* Results Panel */}
            <ResultsPanel 
              approvals={filteredApprovals}
              isLoading={approvalsQuery.isLoading}
              error={approvalsQuery.error as Error | null}
            />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 py-4 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-neutral-500">&copy; {new Date().getFullYear()} Approvals Security Scanner</p>
            <div className="mt-2 md:mt-0">
              <ul className="flex space-x-4">
                <li><Link href="/settings" className="text-sm text-neutral-500 hover:text-primary-600 transition">Settings</Link></li>
                <li><Link href="/history" className="text-sm text-neutral-500 hover:text-primary-600 transition">Scan History</Link></li>
                <li><Link href="#" className="text-sm text-neutral-500 hover:text-primary-600 transition">Help Center</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
