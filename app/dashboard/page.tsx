"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Preferences, ActivityLog } from "@/lib/supabase";
import { MemoryPreferences, calculateInterviewStats, getInterviewDataFromPreferences } from "@/lib/memory-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/lib/hooks/useAuth";
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
  Printer,
  X
} from "lucide-react";
import { MemoryKeeperLogo } from "@/components/icons";
import { UserButton } from "@/components/auth/UserButton";

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [preferences, setPreferences] = useState<MemoryPreferences | null>(null);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [sharingEmail, setSharingEmail] = useState("");
  const [sharingLoading, setSharingLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      router.push("/sign-in");
      return;
    }

    loadData();
  }, [user, authLoading, router]);

  const loadData = async () => {
    if (!user?.id) return;

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

  if (authLoading || loading) {
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
              Legacy Words
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/help">
                <Button variant="ghost" size="sm">Help</Button>
              </Link>
              <UserButton />
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
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 relative">
                <button
                  onClick={() => setShowWelcome(false)}
                  className="absolute top-4 right-4 text-blue-400 hover:text-blue-600 transition-colors"
                  aria-label="Close welcome banner"
                >
                  <X className="h-5 w-5" strokeWidth={2} />
                </button>
                <h2 className="text-2xl font-bold text-brand-dark mb-2">Welcome. Their story is safe.</h2>
                <p className="text-gray-700 mb-6 max-w-2xl leading-relaxed">
                  You&apos;ve taken the first step. Now, let&apos;s capture what makes them who they are.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/dashboard/family">
                    <Button 
                      variant="outline" 
                      className="bg-white text-brand-blue border-blue-200 hover:bg-blue-50 transition-colors"
                    >
                      <Users className="h-4 w-4 mr-2" strokeWidth={2} />
                      Share with Family
                    </Button>
                  </Link>
                  <Link href="/onboarding">
                    <Button className="bg-brand-blue text-white hover:bg-blue-800 transition-colors shadow-sm">
                      <Plus className="h-4 w-4 mr-2" strokeWidth={2} />
                      Add More Stories
                    </Button>
                  </Link>
                  <Link href="/dashboard/sharing">
                    <Button variant="ghost" className="text-brand-blue hover:underline font-medium">
                      Invite Others to Remember
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Status Card */}
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Their Story Lives Here</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">Securely stored in the UK</p>
                  </div>
                  {(() => {
                    const interviewData = preferences ? getInterviewDataFromPreferences(preferences) : null;
                    const stats = interviewData ? calculateInterviewStats(interviewData) : null;
                    const hasContent = stats && stats.answeredQuestions > 0;
                    return (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {hasContent ? "Active & Saving" : "Ready to Start"}
                      </span>
                    );
                  })()}
                </div>
              </CardHeader>
              <CardContent>
                {(() => {
                  const interviewData = preferences ? getInterviewDataFromPreferences(preferences) : null;
                  const stats = interviewData ? calculateInterviewStats(interviewData) : null;
                  const hasContent = stats && stats.answeredQuestions > 0;
                  
                  return (
                    <>
                      <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="p-4 bg-gray-50 rounded-lg text-center">
                          <span className="block text-2xl font-bold text-brand-blue">
                            {hasContent ? stats!.answeredQuestions : "0"}
                          </span>
                          <span className="text-xs text-gray-500 uppercase tracking-wide">Questions</span>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg text-center">
                          <span className="block text-2xl font-bold text-brand-blue">
                            {hasContent ? stats!.totalWords.toLocaleString() : "0"}
                          </span>
                          <span className="text-xs text-gray-500 uppercase tracking-wide">Words</span>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg text-center">
                          <span className="block text-2xl font-bold text-brand-blue">
                            {lastUpdated === "Never" ? "-" : lastUpdated.split("/")[0] + "d"}
                          </span>
                          <span className="text-xs text-gray-500 uppercase tracking-wide">Ago</span>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <Link href="/onboarding" className="flex-1">
                          <Button className="w-full bg-brand-blue text-white hover:bg-blue-800 transition-colors flex items-center justify-center gap-2">
                            <Plus size={18} strokeWidth={2} />
                            Add More Memories
                          </Button>
                        </Link>
                        <Link href="/dashboard/sharing" className="flex-1">
                          <Button variant="outline" className="w-full bg-white border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                            <Share2 size={18} strokeWidth={2} />
                            Share with Someone
                          </Button>
                        </Link>
                      </div>
                    </>
                  );
                })()}
              </CardContent>
            </Card>

            {/* Primary Actions */}
            <div className="grid sm:grid-cols-3 gap-4">
              <Card className="border-2 border-gray-200 hover:border-brand-blue/30 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardHeader className="text-center pb-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-3 mx-auto group-hover:bg-blue-100 transition-colors">
                    <Share2 className="text-brand-blue" size={20} strokeWidth={2} />
                  </div>
                  <CardTitle className="text-lg mb-1">Share It</CardTitle>
                  <CardDescription className="text-xs">
                    Invite family to read & contribute
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Recipient email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none"
                      value={sharingEmail}
                      onChange={(e) => setSharingEmail(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare();
                      }} 
                      disabled={sharingLoading || !sharingEmail} 
                      className="w-full bg-brand-blue text-white hover:bg-blue-800 transition-colors"
                    >
                      <Share2 className="h-4 w-4 mr-2" strokeWidth={2} />
                      {sharingLoading ? "Sending..." : "Share Now"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="border-2 border-gray-200 hover:border-brand-blue/30 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => router.push("/onboarding")}
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-3 mx-auto group-hover:bg-blue-100 transition-colors">
                    <FileText className="text-brand-blue" size={20} strokeWidth={2} />
                  </div>
                  <CardTitle className="text-lg mb-1">Add Memories</CardTitle>
                  <CardDescription className="text-xs">
                    Answer a new question
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/onboarding">
                    <Button className="w-full bg-brand-blue text-white hover:bg-blue-800 transition-colors">
                      <Plus className="h-4 w-4 mr-2" strokeWidth={2} />
                      Add Memory
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 border-2 border-gray-200 opacity-75 cursor-not-allowed">
                <CardHeader className="text-center pb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-3 mx-auto">
                    <BookOpen className="text-gray-400" size={20} strokeWidth={2} />
                  </div>
                  <CardTitle className="text-lg mb-1">Print a Copy</CardTitle>
                  <CardDescription className="text-xs">
                    Hardcover books coming soon
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" disabled>
                    <Printer className="h-4 w-4 mr-2" strokeWidth={2} />
                    Create Keepsake
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick View: Their Beautiful Story */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-brand-dark mb-4">Their Beautiful Story</h3>
              {(() => {
                const interviewData = preferences ? getInterviewDataFromPreferences(preferences) : null;
                const stats = interviewData ? calculateInterviewStats(interviewData) : null;
                const hasContent = stats && stats.answeredQuestions > 0;
                
                // Найти самый длинный или последний ответ для превью
                let previewText = null;
                if (interviewData) {
                  const allAnswers = Object.entries(interviewData)
                    .filter(([key, value]) => value && typeof value === 'string' && value.trim().length > 50)
                    .map(([key, value]) => value as string);
                  
                  if (allAnswers.length > 0) {
                    // Берем самый длинный ответ
                    previewText = allAnswers.sort((a, b) => b.length - a.length)[0];
                  }
                }
                
                return (
                  <>
                    {previewText ? (
                      <div className="bg-[#FDFBF7] p-4 rounded-lg border border-orange-100 mb-4 italic text-gray-600 text-sm relative">
                        <span className="text-4xl text-orange-200 absolute -top-2 -left-2">&quot;</span>
                        <p className="relative z-10 pl-2">
                          {previewText.length > 150 
                            ? `${previewText.substring(0, 150)}...` 
                            : previewText}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-[#FDFBF7] p-4 rounded-lg border border-orange-100 mb-4 italic text-gray-600 text-sm relative">
                        <span className="text-4xl text-orange-200 absolute -top-2 -left-2">&quot;</span>
                        <p className="relative z-10 pl-2">Their story is being written...</p>
                      </div>
                    )}
                    <Link href="/dashboard/preferences">
                      <button className="w-full text-brand-blue font-medium text-sm hover:underline flex items-center justify-center gap-2">
                        View Full Story <ChevronRight size={16} strokeWidth={2} />
                      </button>
                    </Link>
                  </>
                );
              })()}
            </div>


            {/* Activity Log */}
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Activity</CardTitle>
                  <Link href="/dashboard/history">
                    <Button variant="ghost" size="sm" className="text-brand-blue text-xs font-bold uppercase hover:underline">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {activityLogs.length === 0 ? (
                  <p className="text-gray-500 text-sm">Your log is empty. Updates will show up here.</p>
                ) : (
                  <div className="space-y-4">
                    {activityLogs.slice(0, 5).map((log) => {
                      let Icon = FileText;
                      let actionText = "";
                      
                      if (log.action === "created_preferences") {
                        Icon = FileText;
                        actionText = "Created preferences";
                      } else if (log.action === "updated_preferences") {
                        Icon = Edit;
                        actionText = "Updated preferences";
                      } else if (log.action === "generated_pdf") {
                        Icon = Printer;
                        actionText = "Generated PDF";
                      } else if (log.action === "shared_preferences") {
                        Icon = Share2;
                        actionText = "Shared preferences";
                      }
                      
                      const timeAgo = log.created_at 
                        ? (() => {
                            const now = new Date();
                            const logDate = new Date(log.created_at);
                            const diffHours = Math.floor((now.getTime() - logDate.getTime()) / (1000 * 60 * 60));
                            const diffDays = Math.floor(diffHours / 24);
                            
                            if (diffHours < 1) return "Just now";
                            if (diffHours < 24) return `${diffHours}h ago`;
                            if (diffDays < 7) return `${diffDays}d ago`;
                            return logDate.toLocaleDateString("en-GB");
                          })()
                        : "";
                      
                      return (
                        <div key={log.id} className="flex items-start space-x-3">
                          <div className="mt-0.5">
                            <Icon size={16} className="text-gray-400" strokeWidth={2} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-700 font-medium">{actionText}</p>
                            {log.details && (
                              <p className="text-xs text-gray-500 mt-1">{log.details}</p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">{timeAgo}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
