import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScanHistory as ScanHistoryType } from "@shared/schema";

export default function ScanHistory() {
  // Fetch scan history
  const scanHistoryQuery = useQuery<ScanHistoryType[]>({
    queryKey: ["/api/scan-history"],
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <span className="text-primary-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </span>
            <h1 className="text-xl font-semibold text-neutral-800">Scan History</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Scan History</CardTitle>
          </CardHeader>
          <CardContent>
            {scanHistoryQuery.isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-6 w-[200px]" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            ) : scanHistoryQuery.error ? (
              <div className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                </div>
                <h3 className="text-lg font-medium text-neutral-700 mb-1">Failed to load scan history</h3>
                <p className="text-neutral-500">{(scanHistoryQuery.error as Error).message}</p>
              </div>
            ) : !scanHistoryQuery.data || scanHistoryQuery.data.length === 0 ? (
              <div className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <h3 className="text-lg font-medium text-neutral-700 mb-1">No scan history</h3>
                <p className="text-neutral-500 max-w-md mx-auto">
                  You haven't run any scans yet. Go to the dashboard to scan for potentially malicious approvals.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-neutral-200">
                {scanHistoryQuery.data && scanHistoryQuery.data.map((scan: ScanHistoryType) => (
                  <div key={scan.id} className="py-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Scan #{scan.id}</h3>
                      <Badge 
                        variant="outline" 
                        className={`${scan.riskyApprovals > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}
                      >
                        {scan.riskyApprovals > 0 ? 'Issues Detected' : 'No Issues'}
                      </Badge>
                    </div>
                    <p className="text-sm text-neutral-600 mb-1">
                      <span className="font-medium">Time:</span> {formatDate(new Date(scan.scanDate))}
                    </p>
                    <p className="text-sm text-neutral-600 mb-1">
                      <span className="font-medium">Total Approvals:</span> {scan.totalApprovals}
                    </p>
                    <p className="text-sm text-neutral-600 mb-1">
                      <span className="font-medium">Risky Approvals:</span> {scan.riskyApprovals}
                    </p>
                    <p className="text-sm text-neutral-600">
                      <span className="font-medium">Risk Score:</span> {scan.riskScore}%
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}