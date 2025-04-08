import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Approval, RiskLevel } from "@shared/schema";
import { formatDate } from "@/lib/utils";

type ApprovalItemProps = {
  approval: Approval;
};

export default function ApprovalItem({ approval }: ApprovalItemProps) {
  const getRiskClass = () => {
    switch (approval.riskLevel) {
      case "high":
        return "border-l-4 border-red-500 bg-red-50";
      case "medium":
        return "border-l-4 border-amber-500 bg-amber-50";
      case "low":
        return "border-l-4 border-green-500 bg-green-50";
      default:
        return "";
    }
  };

  const getRiskIcon = () => {
    switch (approval.riskLevel) {
      case "high":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
        );
      case "medium":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
        );
      case "low":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        );
    }
  };

  const getRiskBadge = () => {
    switch (approval.riskLevel) {
      case "high":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            High Risk
          </Badge>
        );
      case "medium":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
            Medium Risk
          </Badge>
        );
      case "low":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            Low Risk
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            Standard
          </Badge>
        );
    }
  };

  return (
    <div className={`p-4 hover:bg-neutral-50 transition ${getRiskClass()}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
        <div className="flex items-start space-x-2">
          {getRiskIcon()}
          <div>
            <h3 className="font-medium">{approval.title}</h3>
            <p className="text-sm text-neutral-600">{approval.provider}</p>
          </div>
        </div>
        <div className="mt-2 sm:mt-0">
          {getRiskBadge()}
        </div>
      </div>
      <div className="ml-7 text-sm">
        <p className="mb-2 text-neutral-700">{approval.description}</p>
        <div className="bg-neutral-50 p-3 rounded-md font-mono text-xs overflow-x-auto mb-2">
          <code>{approval.codeSnippet}</code>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-neutral-500">
            Detected: {formatDate(new Date(approval.detectedAt))}
          </span>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-700 p-0 h-auto font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{approval.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div>
                  <h4 className="text-sm font-medium mb-1">Provider</h4>
                  <p>{approval.provider}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Risk Level</h4>
                  <div>{getRiskBadge()}</div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Description</h4>
                  <p>{approval.description}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Request Data</h4>
                  <div className="bg-neutral-50 p-3 rounded-md font-mono text-xs overflow-x-auto">
                    <code>{approval.codeSnippet}</code>
                  </div>
                </div>
                {approval.details && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Additional Details</h4>
                    <p>{approval.details}</p>
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-medium mb-1">Detection Time</h4>
                  <p>{formatDate(new Date(approval.detectedAt))}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
