"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Preferences, ActivityLog } from "@/lib/supabase";
import { MemoryPreferences, calculateInterviewStats } from "@/lib/memory-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  FileText, 
  Users, 
  Share2, 
  Bell, 
  Clock, 
  Settings, 
  Edit, 
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Folder,
  BookOpen,
  Heart,
  Plus,
  Printer
} from "lucide-react";
import { MemoryKeeperLogo } from "@/components/icons";

export default function DashboardPage() {
  // const { user, isLoaded } = useUser();
  const user = { id: "temp-user", firstName: "Guest", fullName: "Guest User" }; // Temporary mock user
  const isLoaded = true; // Temporary: always loaded
  const router = useRouter();
  const [preferences, setPreferences] = useState<MemoryPreferences | null>(null);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [sharingEmail, setSharingEmail] = useState("");
  const [sharingLoading, setSharingLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // TEMPORARILY DISABLED: No auth check
    // if (isLoaded && !user) {
    //   router.push("/sign-in");
    //   return;
    // }

    // Always load data (no auth required)
    loadData();
  }, []);

  const loadData = async () => {
    // TEMPORARILY DISABLED: No auth check
    // if (!user?.id) return;

    setLoading(true);
    try {
      const prefsResponse = await fetch("/api/preferences");
      if (prefsResponse.ok) {
        const prefsData = await prefsResponse.json();
        setPreferences(prefsData.preferences);
      }

      const logsResponse = await fetch("/api/activity");
      if (logsResponse.ok) {
        const logsData = await logsResponse.json();
        setActivityLogs(logsData.logs);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!sharingEmail || !preferences?.id) return;

    setSharingLoading(true);
    try {
      const response = await fetch("/api/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          preferenceId: preferences.id,
          email: sharingEmail,
        }),
      });

      if (response.ok) {
        await fetch("/api/activity/log", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "shared_preferences",
            details: `Shared with ${sharingEmail}`,
          }),
        });
        
        alert("Sent! They'll get an email shortly.");
        setSharingEmail("");
        loadData();
      } else {
        throw new Error("Failed to share");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      alert("We couldn&apos;t send that email. Check the address and try again.");
    } finally {
      setSharingLoading(false);
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Getting everything ready...</p>
        </div>
      </div>
    );
  }

  if (!preferences) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Welcome!</CardTitle>
              <CardDescription>
                Looks like you haven&apos;t invited anyone yet. Add their names when you&apos;re ready.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/onboarding">
                <Button className="w-full">Fill Out Questionnaire</Button>
              </Link>
            </CardContent>
          </Card>
      </div>
    );
  }

  const lastUpdated = preferences.updated_at 
    ? new Date(preferences.updated_at).toLocaleDateString("en-GB")
    : "Never";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-gray-900">
              <MemoryKeeperLogo size={28} className="text-brand-blue" strokeWidth={2} />
              Memory Keeper
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/help">
                <Button variant="ghost" size="sm">Help</Button>
              </Link>
              <Link href="/settings">
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4 mr-2" strokeWidth={2} />
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <nav className="space-y-2">
              <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-brand-blue rounded-lg font-medium">
                <FileText className="h-5 w-5 flex-shrink-0" strokeWidth={2} />
                Their Story
              </Link>
              <Link href="/dashboard/family" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                <Users className="h-5 w-5 flex-shrink-0" strokeWidth={2} />
                Family Members
              </Link>
              <Link href="/dashboard/sharing" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                <Share2 className="h-5 w-5 flex-shrink-0" strokeWidth={2} />
                Sharing & Permissions
              </Link>
              <Link href="/dashboard/reminders" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                <Bell className="h-5 w-5 flex-shrink-0" strokeWidth={2} />
                Reminders
              </Link>
              <Link href="/dashboard/history" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                <Clock className="h-5 w-5 flex-shrink-0" strokeWidth={2} />
                History & Activity
              </Link>
              <Link href="/dashboard/preferences" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                <FileText className="h-5 w-5 flex-shrink-0" strokeWidth={2} />
                View Story
              </Link>
              <Link href="/dashboard/notifications" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                <Bell className="h-5 w-5 flex-shrink-0" strokeWidth={2} />
                Notifications
              </Link>
              <Link href="/dashboard/files" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                <Folder className="h-5 w-5 flex-shrink-0" strokeWidth={2} />
                Files
              </Link>
              <Link href="/dashboard/comments" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                <MessageSquare className="h-5 w-5 flex-shrink-0" strokeWidth={2} />
                Comments
              </Link>
              <Link href="/settings" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                <Settings className="h-5 w-5 flex-shrink-0" strokeWidth={2} />
                Settings
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-6">
            {/* Welcome Banner */}
            {showWelcome && (
              <Alert className="bg-blue-50 border-brand-blue">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold mb-2">Welcome. Their story is safe.</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      You&apos;ve captured something precious. Your loved one&apos;s voice. Their values. Who they are. This will mean everything to your family.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Link href="/dashboard/family">
                        <Button size="sm" variant="outline">
                          <Users className="h-4 w-4 mr-2" strokeWidth={2} />
                          Share with Family
                        </Button>
                      </Link>
                      <Link href="/onboarding">
                        <Button size="sm" variant="outline">
                          <Plus className="h-4 w-4 mr-2" strokeWidth={2} />
                          Add More Stories
                        </Button>
                      </Link>
                      <Link href="/dashboard/sharing">
                        <Button size="sm" variant="outline">
                          <Share2 className="h-4 w-4 mr-2" strokeWidth={2} />
                          Invite Others to Remember
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowWelcome(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
              </Alert>
            )}

            {/* Status Card */}
            <Card>
              <CardHeader>
                <CardTitle>Their Story Lives Here</CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const stats = preferences ? calculateInterviewStats(preferences) : null;
                  const hasContent = stats && stats.answeredQuestions > 0;
                  
                  return (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Questions answered</p>
                        <p className="font-semibold">
                          {hasContent ? `${stats!.answeredQuestions} / ${stats!.totalQuestions}` : "Not started"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Words written</p>
                        <p className="font-semibold">
                          {hasContent ? `${stats!.totalWords.toLocaleString()}` : "0"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Last updated</p>
                        <p className="font-semibold">
                          {lastUpdated}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Status</p>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className={`h-5 w-5 flex-shrink-0 ${hasContent ? "text-brand-green" : "text-gray-400"}`} strokeWidth={2} />
                          <span className="font-semibold">
                            {hasContent ? "Their voice is preserved. Your family has access." : "Start capturing their story to begin."}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
                <div className="mt-6 flex gap-3">
                  <Link href="/onboarding" className="flex-1">
                    <Button variant="outline" className="w-full">
                      <Plus className="h-4 w-4 mr-2" strokeWidth={2} />
                      Add More Memories
                    </Button>
                  </Link>
                  <Link href="/dashboard/sharing" className="flex-1">
                    <Button variant="outline" className="w-full">
                      <Share2 className="h-4 w-4 mr-2" strokeWidth={2} />
                      Share with Someone Else
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Primary Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-2">
                    <Users className="h-8 w-8 text-brand-blue" strokeWidth={2} />
                    <Heart className="h-6 w-6 text-brand-blue -ml-3 -mt-1" strokeWidth={2} />
                  </div>
                  <CardTitle>Share It With Family</CardTitle>
                  <CardDescription>
                    Let the people who love them read their stories. They can comment, add their own memories, feel connected.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Recipient email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      value={sharingEmail}
                      onChange={(e) => setSharingEmail(e.target.value)}
                    />
                    <Button onClick={handleShare} disabled={sharingLoading || !sharingEmail} className="w-full">
                      <Share2 className="h-4 w-4 mr-2" strokeWidth={2} />
                      {sharingLoading ? "Sending that email..." : "Share Now"}
                    </Button>
                    <p className="text-xs text-gray-500 text-center">I&apos;m sharing their story with you</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-2">
                    <BookOpen className="h-8 w-8 text-brand-green" strokeWidth={2} />
                    <Plus className="h-6 w-6 text-brand-green -ml-3 -mt-1" strokeWidth={2} />
                  </div>
                  <CardTitle>Add More Memories</CardTitle>
                  <CardDescription>
                    Remember something new? Want to capture more stories? Come back anytime. Their story grows with you.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/onboarding">
                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-2" strokeWidth={2} />
                      Add Memory
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-2">
                    <Printer className="h-8 w-8 text-purple-600" strokeWidth={2} />
                  </div>
                  <CardTitle>Print a Copy</CardTitle>
                  <CardDescription>
                    Love their story in print? Create a beautiful keepsake version to share or keep close.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" disabled>
                    <Printer className="h-4 w-4 mr-2" strokeWidth={2} />
                    Create Keepsake
                  </Button>
                  <p className="text-xs text-gray-500 text-center mt-2">Coming soon</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick View: Their Beautiful Story */}
            <Card>
              <CardHeader>
                <CardTitle>Their Beautiful Story</CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const stats = preferences ? calculateInterviewStats(preferences) : null;
                  const hasContent = stats && stats.answeredQuestions > 0;
                  const meaningfulQuote = preferences?.how_remembered || preferences?.matters_most || preferences?.life_lessons || null;
                  
                  return (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Questions answered</p>
                        <p className="font-semibold">
                          {hasContent ? `${stats!.answeredQuestions} of ${stats!.totalQuestions}` : "Not started"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Words written</p>
                        <p className="font-semibold">
                          {hasContent ? `${stats!.totalWords.toLocaleString()}` : "0"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{lastUpdated}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Who has access</p>
                        <p className="font-semibold">0 family members</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">A meaningful quote</p>
                        <p className="font-semibold italic text-sm">
                          {meaningfulQuote 
                            ? `"${meaningfulQuote.substring(0, 60)}${meaningfulQuote.length > 60 ? '...' : ''}"` 
                            : "Their story is being written..."}
                        </p>
                      </div>
                    </div>
                  );
                })()}
                <div className="mt-6">
                  <Link href="/dashboard/preferences">
                    <Button variant="outline" className="w-full">
                      View Full Story <ChevronRight className="h-4 w-4 ml-2" strokeWidth={2} />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>


            {/* Activity Log */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {activityLogs.length === 0 ? (
                  <p className="text-gray-500 text-sm">Your log is empty. Updates will show up here.</p>
                ) : (
                  <div className="space-y-4">
                    {activityLogs.slice(0, 5).map((log) => (
                      <div key={log.id} className="flex items-start justify-between border-b border-gray-200 pb-3 last:border-0">
                        <div>
                          <p className="font-medium text-sm">
                            {log.action === "created_preferences" && "Created preferences"}
                            {log.action === "updated_preferences" && "Updated preferences"}
                            {log.action === "generated_pdf" && "Generated PDF"}
                            {log.action === "shared_preferences" && "Shared preferences"}
                          </p>
                          {log.details && (
                            <p className="text-xs text-gray-500 mt-1">{log.details}</p>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">
                          {log.created_at && new Date(log.created_at).toLocaleDateString("en-GB")}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-4">
                  <Link href="/dashboard/history">
                    <Button variant="ghost" size="sm" className="w-full">
                      View Full History <ChevronRight className="h-4 w-4 ml-2" strokeWidth={2} />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
