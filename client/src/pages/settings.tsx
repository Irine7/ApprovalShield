import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Settings() {
  const { toast } = useToast();
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  
  // Scan settings
  const [scanFrequency, setScanFrequency] = useState("daily");
  const [autoScan, setAutoScan] = useState(false);
  const [detectionLevel, setDetectionLevel] = useState("medium");
  
  // Account settings
  const [darkMode, setDarkMode] = useState(false);
  
  // Handle save settings
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <span className="text-primary-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
            </span>
            <h1 className="text-xl font-semibold text-neutral-800">Settings</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="scan">
          <TabsList className="mb-4">
            <TabsTrigger value="scan">Scan Settings</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="scan">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Scan Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="autoScan" className="block font-medium">Auto-Scan</Label>
                      <p className="text-sm text-neutral-500">Automatically scan for approvals periodically</p>
                    </div>
                    <Switch
                      id="autoScan"
                      checked={autoScan}
                      onCheckedChange={setAutoScan}
                    />
                  </div>
                  
                  {autoScan && (
                    <div>
                      <Label htmlFor="scanFrequency" className="block font-medium mb-1">Scan Frequency</Label>
                      <Select value={scanFrequency} onValueChange={setScanFrequency}>
                        <SelectTrigger id="scanFrequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  <div>
                    <Label htmlFor="detectionLevel" className="block font-medium mb-1">Detection Level</Label>
                    <Select value={detectionLevel} onValueChange={setDetectionLevel}>
                      <SelectTrigger id="detectionLevel">
                        <SelectValue placeholder="Select detection level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (Fewer alerts, major issues only)</SelectItem>
                        <SelectItem value="medium">Medium (Balanced detection)</SelectItem>
                        <SelectItem value="high">High (More alerts, includes minor issues)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-neutral-500 mt-1">
                      Controls how sensitive the scanner is when detecting suspicious approvals
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Notification Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifications" className="block font-medium">Email Notifications</Label>
                      <p className="text-sm text-neutral-500">Receive scan results and alerts via email</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="pushNotifications" className="block font-medium">Push Notifications</Label>
                      <p className="text-sm text-neutral-500">Receive alerts via browser notifications</p>
                    </div>
                    <Switch
                      id="pushNotifications"
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="darkMode" className="block font-medium">Dark Mode</Label>
                      <p className="text-sm text-neutral-500">Switch between light and dark theme</p>
                    </div>
                    <Switch
                      id="darkMode"
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSaveSettings}>
            Save Settings
          </Button>
        </div>
      </main>
    </div>
  );
}