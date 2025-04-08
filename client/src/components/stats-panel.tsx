import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type StatsProps = {
  totalApprovals: number;
  riskyApprovals: number;
  riskScore: number;
};

export default function StatsPanel({ totalApprovals, riskyApprovals, riskScore }: StatsProps) {
  // Determine risk label based on score
  const getRiskLabel = () => {
    if (riskScore >= 60) return "High";
    if (riskScore >= 30) return "Medium";
    return "Low";
  };

  // Get risk color based on score
  const getRiskColor = () => {
    if (riskScore >= 60) return "text-red-500";
    if (riskScore >= 30) return "text-amber-500";
    return "text-green-500";
  };

  // Get progress bar color
  const getProgressColor = () => {
    if (riskScore >= 60) return "bg-red-500";
    if (riskScore >= 30) return "bg-amber-500";
    return "bg-green-500";
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m18 3-3 3-3-3-3 3-3-3v15l3-3 3 3 3-3 3 3"/></svg>
          Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-neutral-500 mb-1">Total Approvals</p>
            <p className="text-2xl font-semibold">{totalApprovals}</p>
          </div>
          <div>
            <p className="text-sm text-neutral-500 mb-1">Risky Approvals</p>
            <p className={`text-2xl font-semibold ${riskyApprovals > 0 ? "text-red-500" : ""}`}>
              {riskyApprovals}
            </p>
          </div>
          <div>
            <p className="text-sm text-neutral-500 mb-1">Risk Score</p>
            <Progress 
              value={riskScore} 
              className="h-2.5 bg-neutral-200" 
              indicatorClassName={getProgressColor()}
            />
            <p className={`text-right text-sm ${getRiskColor()} mt-1`}>
              {getRiskLabel()} ({riskScore}%)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
