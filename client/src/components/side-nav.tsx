import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsPanel from "./stats-panel";
import { Link, useLocation } from "wouter";

type SideNavProps = {
  stats: {
    totalApprovals: number;
    riskyApprovals: number;
    riskScore: number;
  };
};

export default function SideNav({ stats }: SideNavProps) {
  const [location] = useLocation();

  return (
    <div className="md:col-span-1">
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4"/><path d="M12 11v6"/><path d="m15 13-3-2-3 2"/></svg>
            Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <nav>
            <ul className="space-y-2">
              <li>
                <Link href="/" className={`block px-3 py-2 rounded-md ${
                  location === "/" 
                    ? "bg-primary-50 text-primary-700 font-medium" 
                    : "text-neutral-600 hover:bg-neutral-100"
                } flex items-center transition`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"/><path d="M2 12h10"/><path d="M2 16h5"/><path d="M2 20h5"/></svg>
                  Approvals Scan
                </Link>
              </li>
              <li>
                <Link href="/history" className={`block px-3 py-2 rounded-md ${
                  location === "/history" 
                    ? "bg-primary-50 text-primary-700 font-medium" 
                    : "text-neutral-600 hover:bg-neutral-100"
                } flex items-center transition`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  Scan History
                </Link>
              </li>
              <li>
                <Link href="/settings" className={`block px-3 py-2 rounded-md ${
                  location === "/settings" 
                    ? "bg-primary-50 text-primary-700 font-medium" 
                    : "text-neutral-600 hover:bg-neutral-100"
                } flex items-center transition`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </CardContent>
      </Card>
      
      <StatsPanel
        totalApprovals={stats.totalApprovals}
        riskyApprovals={stats.riskyApprovals}
        riskScore={stats.riskScore}
      />
    </div>
  );
}
