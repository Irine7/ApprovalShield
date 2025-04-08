import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type FiltersProps = {
  filters: {
    search: string;
    riskLevel: string;
    type: string;
  };
  onFilterChange: (filters: Partial<{ search: string; riskLevel: string; type: string }>) => void;
};

export default function Filters({ filters, onFilterChange }: FiltersProps) {
  // Debounce the search input to avoid excessive filtering
  const [searchValue, setSearchValue] = useState(filters.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ search: searchValue });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue, onFilterChange]);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
        <div className="flex-1">
          <Label htmlFor="filterSearch" className="block text-sm font-medium text-neutral-700 mb-1">Search</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-neutral-400" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
            <Input
              id="filterSearch"
              className="pl-10"
              placeholder="Search approvals..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="filterRiskLevel" className="block text-sm font-medium text-neutral-700 mb-1">Risk Level</Label>
          <Select
            value={filters.riskLevel}
            onValueChange={(value) => onFilterChange({ riskLevel: value })}
          >
            <SelectTrigger id="filterRiskLevel" className="w-full">
              <SelectValue placeholder="All Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="high">High Risk</SelectItem>
              <SelectItem value="medium">Medium Risk</SelectItem>
              <SelectItem value="low">Low Risk</SelectItem>
              <SelectItem value="none">Standard</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="filterType" className="block text-sm font-medium text-neutral-700 mb-1">Approval Type</Label>
          <Select
            value={filters.type}
            onValueChange={(value) => onFilterChange({ type: value })}
          >
            <SelectTrigger id="filterType" className="w-full">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="wallet">Wallet Connection</SelectItem>
              <SelectItem value="transaction">Transaction</SelectItem>
              <SelectItem value="token">Token Approval</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
