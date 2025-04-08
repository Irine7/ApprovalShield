import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Approval } from "@shared/schema";

export function useApprovals() {
  const queryClient = useQueryClient();

  // Fetch all approvals
  const approvalsQuery = useQuery<Approval[]>({
    queryKey: ["/api/approvals"],
  });

  // Fetch approval statistics
  const statsQuery = useQuery<{
    totalApprovals: number;
    riskyApprovals: number;
    riskScore: number;
  }>({
    queryKey: ["/api/stats"],
  });

  // Fetch latest scan
  const latestScanQuery = useQuery({
    queryKey: ["/api/scan-history/latest"],
    retry: false,
  });

  // Run a security scan
  const scanMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/scan", {});
    },
    onSuccess: () => {
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["/api/approvals"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      queryClient.invalidateQueries({ queryKey: ["/api/scan-history/latest"] });
    },
  });

  // Generate a mock malicious approval
  const mockMaliciousMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/generate-mock", {});
    },
    onSuccess: () => {
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["/api/approvals"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
    },
  });

  return {
    approvals: approvalsQuery.data || [],
    stats: statsQuery.data || { totalApprovals: 0, riskyApprovals: 0, riskScore: 0 },
    latestScan: latestScanQuery.data,
    isLoadingApprovals: approvalsQuery.isLoading,
    isLoadingStats: statsQuery.isLoading,
    isLoadingScan: latestScanQuery.isLoading,
    approvalsError: approvalsQuery.error,
    statsError: statsQuery.error,
    scanError: latestScanQuery.error,
    runScan: scanMutation.mutate,
    isScanRunning: scanMutation.isPending,
    generateMockMalicious: mockMaliciousMutation.mutate,
    isGeneratingMock: mockMaliciousMutation.isPending,
  };
}
