"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, ArrowLeft, CheckCircle2 } from "lucide-react";
import { MemoryKeeperLogo } from "@/components/icons";

export default function RemindersPage() {
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
            <h1 className="text-3xl font-bold">Reminders</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" strokeWidth={2} />
              Annual Review Reminder
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Next reminder</p>
                  <p className="text-sm text-gray-600">
                    {new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <CheckCircle2 className="h-5 w-5 text-brand-green" strokeWidth={2} />
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600 mb-4">
                  We&apos;ll send you an email reminder to add more memories periodically. This helps ensure their story stays complete and up to date.
                </p>
                <Button variant="outline">Update Reminder Settings</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

