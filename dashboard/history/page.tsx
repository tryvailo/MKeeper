"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Clock } from "lucide-react";
import { ActivityLog } from "@/lib/supabase";
import { MemoryKeeperLogo } from "@/components/icons";

export default function HistoryPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const response = await fetch("/api/activity");
      if (response.ok) {
        const data = await response.json();
        setLogs(data.logs || []);
      }
    } catch (error) {
      console.error("Error loading history:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/dashboard" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" strokeWidth={2} />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <MemoryKeeperLogo size={28} className="text-brand-blue" strokeWidth={2} />
            <h1 className="text-3xl font-bold">History & Activity</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" strokeWidth={2} />
              Activity Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-gray-500">Getting everything ready...</p>
            ) : logs.length === 0 ? (
              <p className="text-gray-500">Your log is empty. Updates will show up here.</p>
            ) : (
              <div className="space-y-4">
                {logs.map((log) => (
                  <div key={log.id} className="flex items-start gap-4 border-b border-gray-200 pb-4 last:border-0">
                    <div className="h-2 w-2 rounded-full bg-brand-blue mt-2"></div>
                    <div className="flex-1">
                      <p className="font-medium">
                        {log.action === "created_preferences" && "Created preferences"}
                        {log.action === "updated_preferences" && "Updated preferences"}
                        {log.action === "generated_pdf" && "Generated PDF"}
                        {log.action === "shared_preferences" && "Shared preferences"}
                      </p>
                      {log.details && (
                        <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        {log.created_at && new Date(log.created_at).toLocaleString("en-GB")}
                      </p>
                    </div>
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

