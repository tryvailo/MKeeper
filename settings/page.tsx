"use client";

import { useState, useEffect } from "react";
// TEMPORARILY DISABLED: Clerk disabled for testing
// import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  User, 
  Shield, 
  CreditCard, 
  Bell, 
  Trash2, 
  ArrowLeft,
  Download,
  AlertTriangle
} from "lucide-react";
import { MemoryKeeperLogo } from "@/components/icons";

export default function SettingsPage() {
  // TEMPORARILY DISABLED: Clerk disabled for testing
  // const { user } = useUser();
  const user = { 
    id: "temp-user", 
    firstName: "Guest", 
    fullName: "Guest User",
    primaryEmailAddress: { emailAddress: "guest@example.com" }
  };
  const [activeTab, setActiveTab] = useState("account");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
            <h1 className="text-3xl font-bold">Settings</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab("account")}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                  activeTab === "account" ? "bg-blue-50 text-brand-blue font-medium" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <User className="h-4 w-4 mr-2 flex-shrink-0" strokeWidth={2} />
                Account
              </button>
              <button
                onClick={() => setActiveTab("privacy")}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                  activeTab === "privacy" ? "bg-blue-50 text-brand-blue font-medium" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Shield className="h-4 w-4 mr-2 flex-shrink-0" strokeWidth={2} />
                Privacy & Security
              </button>
              <button
                onClick={() => setActiveTab("billing")}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                  activeTab === "billing" ? "bg-blue-50 text-brand-blue font-medium" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <CreditCard className="h-4 w-4 mr-2 flex-shrink-0" strokeWidth={2} />
                Billing
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                  activeTab === "notifications" ? "bg-blue-50 text-brand-blue font-medium" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Bell className="h-4 w-4 mr-2 flex-shrink-0" strokeWidth={2} />
                Notifications
              </button>
              <button
                onClick={() => setActiveTab("delete")}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                  activeTab === "delete" ? "bg-red-50 text-red-700 font-medium" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Trash2 className="h-4 w-4 mr-2 flex-shrink-0" strokeWidth={2} />
                Delete Account
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Account Section */}
            {activeTab === "account" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your account information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={user?.fullName || ""} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={user?.primaryEmailAddress?.emailAddress || ""} disabled />
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed here</p>
                    </div>
                    <Button>Save Changes</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>Change your password</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline">Change Password</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Login Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Last login: {new Date().toLocaleString("en-GB")}
                    </p>
                    <Button variant="outline" className="mt-4">View all login activity</Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Privacy & Security Section */}
            {activeTab === "privacy" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>Add extra security with SMS or authenticator</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Status: Off</p>
                        <p className="text-sm text-gray-600">2FA is not enabled</p>
                      </div>
                      <Button variant="outline">Turn On</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Session Timeout</CardTitle>
                    <CardDescription>Log out automatically after inactivity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option>30 minutes</option>
                      <option>1 hour</option>
                      <option>2 hours</option>
                    </select>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Data Export</CardTitle>
                    <CardDescription>Get all your data in GDPR-compliant format</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" strokeWidth={2} />
                        Download my data (GDPR download)
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>GDPR Rights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">Your privacy rights:</p>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        View Privacy Policy
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" strokeWidth={2} />
                        Download my data (GDPR download)
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-red-600">
                        Delete my account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Billing Section */}
            {activeTab === "billing" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Plan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-2xl font-bold">Free</p>
                        <p className="text-sm text-gray-600">Memory Keeper is completely free. Always will be.</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Memory Keeper is a free service for dementia families. There are no charges, no subscriptions, and no hidden fees.
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Notifications Section */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Email Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>Account updates</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>Annual reminders</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>Product updates</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" className="rounded" />
                      <span>Marketing emails</span>
                    </label>
                    <Button className="mt-4">Save preferences</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Notification Frequency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option>Immediately</option>
                      <option>Daily digest</option>
                      <option>Weekly digest</option>
                    </select>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Delete Account Section */}
            {activeTab === "delete" && (
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <AlertTriangle className="h-5 w-5" strokeWidth={2} />
                    Delete Account
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert variant="destructive">
                    <AlertDescription>
                      <strong>Deleting your account is permanent.</strong>
                      <br />
                      We will delete:
                      <ul className="list-disc list-inside mt-2">
                        <li>Your account</li>
                        <li>All preferences</li>
                        <li>All family sharing links</li>
                        <li>All data</li>
                      </ul>
                      <strong className="block mt-2">This cannot be undone.</strong>
                    </AlertDescription>
                  </Alert>
                  {!showDeleteConfirm ? (
                    <Button
                      variant="destructive"
                      onClick={() => setShowDeleteConfirm(true)}
                    >
                      I understand, delete my account
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <p className="font-medium">This really will delete everything. Are you sure? This is permanent and we can&apos;t undo it.</p>
                      <div className="flex gap-4">
                        <Button variant="destructive">Yes, delete</Button>
                        <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

