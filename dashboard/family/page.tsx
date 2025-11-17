"use client";

import { useState, useEffect } from "react";
// TEMPORARILY DISABLED: Clerk disabled for testing
// import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, ArrowLeft, User, Trash2, Edit, Mail, Shield } from "lucide-react";
import { FamilyMember } from "@/lib/supabase";
import { MemoryKeeperLogo } from "@/components/icons";

export default function FamilyPage() {
  // TEMPORARILY DISABLED: Clerk disabled for testing
  // const { user } = useUser();
  const user = { id: "temp-user", firstName: "Guest", fullName: "Guest User" };
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [newMember, setNewMember] = useState({
    email: "",
    name: "",
    relationship: "other" as const,
    accessLevel: "view" as "view" | "view_and_comment",
  });
  const [editingMember, setEditingMember] = useState<string | null>(null);

  useEffect(() => {
    loadPreferenceId();
  }, []);

  useEffect(() => {
    if (preferenceId) {
      loadFamilyMembers();
    }
  }, [preferenceId]);

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

  const loadFamilyMembers = async () => {
    if (!preferenceId) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/family/members/${preferenceId}`);
      if (response.ok) {
        const data = await response.json();
        setFamilyMembers(data.members || []);
      }
    } catch (error) {
      console.error("Error loading family members:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!preferenceId) return;

    try {
      const response = await fetch("/api/family/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          preferenceId,
          email: newMember.email,
          name: newMember.name,
          relationship: newMember.relationship,
          accessLevel: newMember.accessLevel,
        }),
      });

      if (response.ok) {
        await loadFamilyMembers();
        setShowAddForm(false);
        setNewMember({ email: "", name: "", relationship: "other", accessLevel: "view" });
        alert("Sent! They'll get an email shortly.");
      } else {
        const error = await response.json();
        alert(error.error || "We couldn't send that email. Check the address and try again.");
      }
    } catch (error) {
      console.error("Error adding member:", error);
      alert("We couldn't send that email. Check the address and try again.");
    }
  };

  const handleRevokeAccess = async (memberId: string) => {
    if (!confirm("Are you sure you want to revoke access for this member?")) {
      return;
    }

    try {
      const response = await fetch(`/api/family/revoke/${memberId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await loadFamilyMembers();
        alert("Done. Access revoked.");
      } else {
        alert("Failed to revoke access");
      }
    } catch (error) {
      console.error("Error revoking access:", error);
      alert("Failed to revoke access");
    }
  };

  const handleUpdateMember = async (memberId: string, accessLevel: string, relationship: string) => {
    try {
      const response = await fetch(`/api/family/members/${memberId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessLevel, relationship }),
      });

      if (response.ok) {
        await loadFamilyMembers();
        setEditingMember(null);
        alert("Done. Their access is updated.");
      } else {
        alert("Failed to update member");
      }
    } catch (error) {
      console.error("Error updating member:", error);
      alert("Failed to update member");
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
            <h1 className="text-3xl font-bold">Family Members</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Who Has Access?</CardTitle>
              <Button onClick={() => setShowAddForm(!showAddForm)}>
                <Users className="h-4 w-4 mr-2" strokeWidth={2} />
                Add Family Member
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {showAddForm && (
              <form onSubmit={handleAddMember} className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
                <div>
                  <Label htmlFor="member-email">Their email address *</Label>
                  <Input
                    id="member-email"
                    type="email"
                    required
                    className="mt-1"
                    placeholder="family@example.com"
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="member-name">Their name (optional)</Label>
                  <Input
                    id="member-name"
                    className="mt-1"
                    placeholder="John Smith"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="member-relationship">Relationship to you</Label>
                  <select
                    id="member-relationship"
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                    value={newMember.relationship}
                    onChange={(e) => setNewMember({ ...newMember, relationship: e.target.value as any })}
                  >
                    <option value="spouse">Spouse</option>
                    <option value="partner">Long-term partner</option>
                    <option value="child">Adult son or daughter</option>
                    <option value="friend">Trusted friend</option>
                    <option value="solicitor">Solicitor</option>
                    <option value="other">Other family member</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="member-access">What can they see?</Label>
                  <select
                    id="member-access"
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                    value={newMember.accessLevel}
                    onChange={(e) => setNewMember({ ...newMember, accessLevel: e.target.value as any })}
                  >
                    <option value="view">View only (they can read their story)</option>
                    <option value="view_and_comment">View & Comment (they can ask questions or add memories)</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <Button type="submit">
                    <Mail className="h-4 w-4 mr-2" strokeWidth={2} />
                    Send Invitation
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            )}

            {loading ? (
              <p className="text-gray-500">Getting everything ready...</p>
            ) : familyMembers.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" strokeWidth={2} />
                <p className="text-gray-600 mb-4">Looks like you haven&apos;t invited anyone yet. Add their names when you&apos;re ready.</p>
                <Button onClick={() => setShowAddForm(true)}>Add Family Member</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {familyMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="h-5 w-5 text-brand-blue" strokeWidth={2} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{member.name || member.email}</p>
                        <p className="text-sm text-gray-600">{member.email}</p>
                        <p className="text-xs text-gray-500 capitalize">{member.relationship}</p>
                        {member.accepted_at ? (
                          <Badge variant="secondary" className="mt-1">
                            Accepted
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="mt-1">
                            Pending
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge>
                        {member.access_level === "view_and_comment" && "View & Comment"}
                        {member.access_level === "view" && "View Only"}
                      </Badge>
                      {editingMember === member.id ? (
                        <div className="flex gap-2">
                          <select
                            className="px-2 py-1 border border-gray-300 rounded text-sm"
                            value={member.access_level}
                            onChange={(e) => {
                              handleUpdateMember(member.id!, e.target.value, member.relationship);
                            }}
                          >
                            <option value="view">View Only</option>
                            <option value="view_and_comment">View & Comment</option>
                          </select>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingMember(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingMember(member.id || null)}
                          >
                            <Edit className="h-4 w-4" strokeWidth={2} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRevokeAccess(member.id!)}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" strokeWidth={2} />
                          </Button>
                        </>
                      )}
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
