"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Share2, ArrowLeft, Copy, Mail, Trash2, Link as LinkIcon, Clock, RefreshCw, FileText } from "lucide-react";
import { MemoryKeeperLogo } from "@/components/icons";

interface ShareableLink {
  id: string;
  link_token: string;
  shareUrl: string;
  isValid: boolean;
  daysRemaining: string;
  created_at: string;
  expires_at: string;
  access_count?: number;
}

interface FamilyMember {
  id: string;
  email: string;
  name: string;
  relationship: string;
  access_level: string;
  created_at: string;
}

export default function SharingPage() {
  // const { user } = useUser();
  const user = { id: "temp-user", firstName: "Guest", fullName: "Guest User" };
  const [shareableLinks, setShareableLinks] = useState<ShareableLink[]>([]);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"shareable" | "email">("shareable");

  // Shareable Link state
  const [creatingLink, setCreatingLink] = useState(false);
  const [extendingLinkId, setExtendingLinkId] = useState<string | null>(null);

  // Email invite state
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviteRelationship, setInviteRelationship] = useState("other");
  const [inviteAccessLevel, setInviteAccessLevel] = useState<"view" | "view_and_comment">("view");

  // Email sharing state
  const [emailSharing, setEmailSharing] = useState(false);
  const [emailRecipients, setEmailRecipients] = useState("");
  const [emailGenerating, setEmailGenerating] = useState(false);

  useEffect(() => {
    loadPreferenceId();
  }, []);

  const loadShareableLinks = useCallback(async () => {
    try {
      const response = await fetch("/api/shareable-link");
      if (response.ok) {
        const data = await response.json();
        setShareableLinks(data.links || []);
      }
    } catch (error) {
      console.error("Error loading shareable links:", error);
    }
  }, []);

  const loadFamilyMembers = useCallback(async () => {
    if (!preferenceId) return;
    try {
      const response = await fetch(`/api/family/members/${preferenceId}`);
      if (response.ok) {
        const data = await response.json();
        setFamilyMembers(data.members || []);
      }
    } catch (error) {
      console.error("Error loading family members:", error);
    }
  }, [preferenceId]);

  useEffect(() => {
    if (preferenceId) {
      loadShareableLinks();
      loadFamilyMembers();
    }
  }, [preferenceId, loadShareableLinks, loadFamilyMembers]);

  const loadPreferenceId = async () => {
    try {
      const response = await fetch("/api/preferences");
      if (response.ok) {
        const data = await response.json();
        if (data.preferences?.id) {
          setPreferenceId(data.preferences.id);
        }
      }
    } catch (error) {
      console.error("Error loading preferences:", error);
    }
  };

  // loadShareableLinks and loadFamilyMembers moved above to useCallback

  const createShareableLink = async () => {
    if (!preferenceId) {
      alert("Please create their story first");
      return;
    }

    setCreatingLink(true);
    try {
      const response = await fetch("/api/shareable-link", {
        method: "POST",
      });

      if (response.ok) {
        await loadShareableLinks();
        alert("Shareable link created! Copy and share it with anyone.");
      } else {
        const error = await response.json();
        alert(error.error || "Failed to create shareable link");
      }
    } catch (error) {
      console.error("Error creating shareable link:", error);
      alert("Failed to create shareable link");
    } finally {
      setCreatingLink(false);
    }
  };

  const extendShareableLink = async (linkId: string) => {
    setExtendingLinkId(linkId);
    try {
      const response = await fetch("/api/shareable-link", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ linkId, action: "extend" }),
      });

      if (response.ok) {
        await loadShareableLinks();
        alert("Link extended by 30 days");
      } else {
        alert("Failed to extend link");
      }
    } catch (error) {
      console.error("Error extending link:", error);
      alert("Failed to extend link");
    } finally {
      setExtendingLinkId(null);
    }
  };

  const deactivateShareableLink = async (linkId: string) => {
    if (!confirm("Are you sure you want to deactivate this link? It will no longer work.")) {
      return;
    }

    try {
      const response = await fetch("/api/shareable-link", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ linkId, action: "deactivate" }),
      });

      if (response.ok) {
        await loadShareableLinks();
        alert("Link deactivated");
      } else {
        alert("Failed to deactivate link");
      }
    } catch (error) {
      console.error("Error deactivating link:", error);
      alert("Failed to deactivate link");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const sendEmailInvite = async () => {
    if (!preferenceId || !inviteEmail) {
      alert("Please enter an email address");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/family/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          preferenceId,
          email: inviteEmail,
          name: inviteName,
          relationship: inviteRelationship,
          accessLevel: inviteAccessLevel,
        }),
      });

      if (response.ok) {
        await loadFamilyMembers();
        setInviteEmail("");
        setInviteName("");
        alert("Invitation sent! They'll receive an email with a secure link.");
      } else {
        const error = await response.json();
        alert(error.error || "Failed to send invitation");
      }
    } catch (error) {
      console.error("Error sending invite:", error);
      alert("Failed to send invitation");
    } finally {
      setLoading(false);
    }
  };

  const generateEmailStory = async () => {
    if (!preferenceId) {
      alert("Please create their story first");
      return;
    }

    setEmailGenerating(true);
    try {
      // Get interview data
      const prefsResponse = await fetch("/api/preferences");
      if (!prefsResponse.ok) {
        throw new Error("Failed to load story");
      }
      const prefsData = await prefsResponse.json();
      const interviewData = prefsData.preferences;

      // Generate email version
      const emailResponse = await fetch("/api/email-share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          interviewData,
          sendEmails: emailRecipients.trim().length > 0,
          recipientEmails: emailRecipients.split(",").map((e) => e.trim()).filter(Boolean),
          senderName: user?.fullName || user?.firstName || "Someone",
        }),
      });

      if (emailResponse.ok) {
        const emailData = await emailResponse.json();
        
        if (emailData.emailsSent > 0) {
          alert(`Email story sent to ${emailData.emailsSent} recipient(s)!`);
          setEmailRecipients("");
        } else {
          // Copy to clipboard
          copyToClipboard(emailData.emailText);
          alert("Email story generated! Plain-text version copied to clipboard. You can paste it into your email client.");
        }
      } else {
        throw new Error("Failed to generate email");
      }
    } catch (error) {
      console.error("Error generating email story:", error);
      alert("Failed to generate email story");
    } finally {
      setEmailGenerating(false);
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
            <h1 className="text-3xl font-bold">Share Their Story</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("shareable")}
            className={`px-4 py-2 font-medium ${
              activeTab === "shareable"
                ? "text-brand-blue border-b-2 border-brand-blue"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <LinkIcon className="h-4 w-4 inline mr-2" />
            Shareable Links
          </button>
          <button
            onClick={() => setActiveTab("email")}
            className={`px-4 py-2 font-medium ${
              activeTab === "email"
                ? "text-brand-blue border-b-2 border-brand-blue"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Mail className="h-4 w-4 inline mr-2" />
            Email Invites
          </button>
        </div>

        {/* Shareable Links Tab */}
        {activeTab === "shareable" && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Create Shareable Link</CardTitle>
                <CardDescription>
                  Generate a link that anyone can use to view their story. Links expire after 30 days for privacy protection.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={createShareableLink}
                  disabled={creatingLink || !preferenceId}
                  className="w-full"
                >
                  <LinkIcon className="h-4 w-4 mr-2" />
                  {creatingLink ? "Creating..." : "Generate Shareable Link"}
                </Button>
                {!preferenceId && (
                  <p className="text-sm text-gray-500 mt-2">Please create their story first.</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Shareable Links</CardTitle>
                <CardDescription>
                  Share these links with family members. They can view the story without logging in.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {shareableLinks.length === 0 ? (
                  <p className="text-gray-500 text-sm">No shareable links yet. Create one above.</p>
                ) : (
                  <div className="space-y-4">
                    {shareableLinks.map((link) => (
                      <div
                        key={link.id}
                        className="flex items-start justify-between p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={link.isValid ? "default" : "destructive"}>
                              {link.isValid ? "Active" : "Expired"}
                            </Badge>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {link.daysRemaining}
                            </span>
                            {link.access_count !== undefined && (
                              <span className="text-xs text-gray-500">
                                {link.access_count} view{link.access_count !== 1 ? "s" : ""}
                              </span>
                            )}
                          </div>
                          <p className="text-sm font-mono break-all text-gray-700 mb-2">{link.shareUrl}</p>
                          <p className="text-xs text-gray-400">
                            Created: {new Date(link.created_at).toLocaleDateString("en-GB")}
                          </p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(link.shareUrl)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          {link.isValid && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => extendShareableLink(link.id)}
                              disabled={extendingLinkId === link.id}
                            >
                              <RefreshCw className={`h-4 w-4 ${extendingLinkId === link.id ? "animate-spin" : ""}`} />
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deactivateShareableLink(link.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Email Story Sharing */}
            <Card>
              <CardHeader>
                <CardTitle>Email Story</CardTitle>
                <CardDescription>
                  Generate a plain-text or HTML version of their story to send via email.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email-recipients">Recipients (optional, comma-separated)</Label>
                  <Input
                    id="email-recipients"
                    type="text"
                    className="mt-1"
                    placeholder="family1@example.com, family2@example.com"
                    value={emailRecipients}
                    onChange={(e) => setEmailRecipients(e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty to just generate the email content (copied to clipboard)
                  </p>
                </div>
                <Button
                  onClick={generateEmailStory}
                  disabled={emailGenerating || !preferenceId}
                  className="w-full"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  {emailGenerating
                    ? "Generating..."
                    : emailRecipients.trim()
                    ? "Generate & Send Email"
                    : "Generate Email Story"}
                </Button>
              </CardContent>
            </Card>
          </>
        )}

        {/* Email Invites Tab */}
        {activeTab === "email" && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Invite via Email</CardTitle>
                <CardDescription>
                  Send a secure invitation email. They&apos;ll receive a private link to view their story.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="invite-email">Email Address *</Label>
                    <Input
                      id="invite-email"
                      type="email"
                      required
                      className="mt-1"
                      placeholder="family@example.com"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="invite-name">Name (optional)</Label>
                    <Input
                      id="invite-name"
                      className="mt-1"
                      placeholder="John Smith"
                      value={inviteName}
                      onChange={(e) => setInviteName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="invite-relationship">Relationship</Label>
                    <select
                      id="invite-relationship"
                      className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                      value={inviteRelationship}
                      onChange={(e) => setInviteRelationship(e.target.value)}
                    >
                      <option value="spouse">Spouse</option>
                      <option value="partner">Partner</option>
                      <option value="child">Adult Child</option>
                      <option value="friend">Friend</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="invite-access">Access Level</Label>
                    <select
                      id="invite-access"
                      className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                      value={inviteAccessLevel}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "view" || value === "view_and_comment") {
                          setInviteAccessLevel(value);
                        }
                      }}
                    >
                      <option value="view">View Only</option>
                      <option value="view_and_comment">View & Comment</option>
                    </select>
                  </div>
                  <Button
                    onClick={sendEmailInvite}
                    disabled={loading || !inviteEmail || !preferenceId}
                    className="w-full"
                  >
                    <Mail className="h-4 w-4 mr-2" strokeWidth={2} />
                    {loading ? "Sending..." : "Send Invitation"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Family Members with Access</CardTitle>
              </CardHeader>
              <CardContent>
                {familyMembers.length === 0 ? (
                  <p className="text-gray-500 text-sm">No family members invited yet.</p>
                ) : (
                  <div className="space-y-3">
                    {familyMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-sm">{member.name || member.email}</p>
                          <p className="text-xs text-gray-500">{member.email}</p>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {member.relationship}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {member.access_level === "view_and_comment" ? "View & Comment" : "View Only"}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400">
                          {new Date(member.created_at).toLocaleDateString("en-GB")}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}

