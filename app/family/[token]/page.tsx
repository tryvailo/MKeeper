"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { UserPreferences } from "@/lib/supabase";
import { MemoryKeeperLogo } from "@/components/icons";

export default function FamilyDashboardPage() {
  const params = useParams();
  const accessToken = params?.token as string;
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);

  useEffect(() => {
    if (accessToken) {
      loadSharedPreferences();
    }
  }, [accessToken]);

  const loadSharedPreferences = async () => {
    try {
      // Get shared preferences via API
      const response = await fetch(`/api/family/${accessToken}`);
      
      if (!response.ok) {
        setError("This link isn't working. It might have expired.");
        setLoading(false);
        return;
      }

      const data = await response.json();
      setPreferences(data.preferences);
    } catch (err) {
      console.error("Error loading preferences:", err);
      setError("This link isn't working. It might have expired.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Getting everything ready...</div>;
  }

  if (error || !preferences) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">We couldn&apos;t find that link</h2>
          <p className="text-gray-600 mb-6">
            This link might have expired or been revoked. If you think this is a mistake, please contact the person who shared it with you.
          </p>
          <Link href="/" className="text-brand-blue hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-2xl font-bold text-gray-900">
            <MemoryKeeperLogo size={28} className="text-brand-blue" strokeWidth={2} />
            Legacy Words
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Their Story</h1>
          <p className="text-gray-600">
            You&apos;ve been invited to view their story. Read their memories, add your own, feel connected.
          </p>
        </div>

        {/* Preferences Display */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Their Story</h2>

          <div className="space-y-6">
            {preferences.age && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Age</h3>
                <p className="text-gray-900">{preferences.age}</p>
              </div>
            )}

            {preferences.location && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Location</h3>
                <p className="text-gray-900">{preferences.location}</p>
              </div>
            )}

            {preferences.funeral_type && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Funeral Type</h3>
                <p className="text-gray-900">
                  {preferences.funeral_type === "cremation_service" && "Cremation + Celebration"}
                  {preferences.funeral_type === "traditional" && "Traditional Service"}
                  {preferences.funeral_type === "direct_cremation" && "Direct Cremation"}
                  {preferences.funeral_type === "eco" && "Eco Funeral"}
                  {preferences.funeral_type === "unsure" && "I haven't decided yet"}
                </p>
              </div>
            )}

            {(preferences as any).preferred_location && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Preferred Location</h3>
                <p className="text-gray-900">{(preferences as any).preferred_location}</p>
              </div>
            )}

            {(preferences as any).memorial_service_type && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Type of Memorial Service</h3>
                <p className="text-gray-900">{(preferences as any).memorial_service_type}</p>
              </div>
            )}

            {(preferences as any).wishes && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">General Wishes</h3>
                <p className="text-gray-900 whitespace-pre-wrap">{(preferences as any).wishes}</p>
              </div>
            )}

            {preferences.music_preferences && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Music Preferences</h3>
                <p className="text-gray-900 whitespace-pre-wrap">{preferences.music_preferences}</p>
              </div>
            )}

            {preferences.flower_preferences && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Flower Preferences</h3>
                <p className="text-gray-900 whitespace-pre-wrap">{preferences.flower_preferences}</p>
              </div>
            )}

            {(preferences as any).guest_preferences && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Guest Preferences</h3>
                <p className="text-gray-900 whitespace-pre-wrap">{(preferences as any).guest_preferences}</p>
              </div>
            )}

            {(preferences as any).text_preferences && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Readings & Speeches</h3>
                <p className="text-gray-900 whitespace-pre-wrap">{(preferences as any).text_preferences}</p>
              </div>
            )}
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold mb-6">Memories & Questions</h2>

          <div className="mb-6">
            <textarea
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
              placeholder="Add a memory or ask a question..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
              <button
                onClick={handleAddComment}
                className="mt-3 bg-brand-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-brand-blue-dark transition-colors"
              >
                Add Memory
              </button>
          </div>

          {comments.length > 0 && (
            <div className="space-y-4">
              {comments.map((c, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-900">{c}</p>
                  <span className="text-sm text-gray-500">
                    {new Date().toLocaleDateString("en-GB")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

