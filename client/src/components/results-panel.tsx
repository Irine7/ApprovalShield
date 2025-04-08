import { Approval } from "@shared/schema";
import ApprovalItem from "./approval-item";
import { Skeleton } from "@/components/ui/skeleton";

type ResultsPanelProps = {
  approvals: Approval[];
  isLoading: boolean;
  error: Error | null;
};

export default function ResultsPanel({ approvals, isLoading, error }: ResultsPanelProps) {
  // Display loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-neutral-200">
          <h2 className="text-lg font-semibold">Approval Results</h2>
          <p className="text-sm text-neutral-500">Loading approvals...</p>
        </div>
        <div className="p-4 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-6 w-[200px]" />
                <Skeleton className="h-6 w-[100px]" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-12 w-full" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-neutral-200">
          <h2 className="text-lg font-semibold">Approval Results</h2>
          <p className="text-sm text-neutral-500">Error loading approvals</p>
        </div>
        <div className="p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <h3 className="text-lg font-medium text-neutral-700 mb-1">Failed to load approvals</h3>
          <p className="text-neutral-500">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-neutral-200">
        <h2 className="text-lg font-semibold">Approval Results</h2>
        <p className="text-sm text-neutral-500">
          Showing {approvals.length} approval{approvals.length !== 1 ? 's' : ''}
        </p>
      </div>
      
      {/* Empty state */}
      {approvals.length === 0 && (
        <div className="p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12A10 10 0 0 0 12 2v10z"/><path d="M2 12A10 10 0 0 0 12 22V12Z"/><path d="M2 12a10 10 1 0 1 10-10"/><path d="M12 2v10"/><path d="M12 12h10"/></svg>
          </div>
          <h3 className="text-lg font-medium text-neutral-700 mb-1">No approvals found</h3>
          <p className="text-neutral-500 max-w-md mx-auto">
            Run a scan to check for potentially malicious approvals or try changing your filters.
          </p>
        </div>
      )}
      
      {/* Results list */}
      {approvals.length > 0 && (
        <div className="divide-y divide-neutral-200">
          {approvals.map((approval) => (
            <ApprovalItem key={approval.id} approval={approval} />
          ))}
        </div>
      )}
    </div>
  );
}
