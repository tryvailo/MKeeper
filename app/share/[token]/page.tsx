"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { MemoryInterviewData } from "@/lib/memory-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Clock, CheckCircle2 } from "lucide-react";
import { MemoryKeeperLogo } from "@/components/icons";
import { INTERVIEW_CATEGORIES } from "@/lib/interview";
import { calculateInterviewStats } from "@/lib/memory-data";

export default function ShareableLinkPage() {
  const params = useParams();
  const token = params?.token as string;
  const [interviewData, setInterviewData] = useState<MemoryInterviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [linkExpired, setLinkExpired] = useState(false);

  useEffect(() => {
    if (token) {
      loadStory(token);
    }
  }, [token]);

  const loadStory = async (linkToken: string) => {
    try {
      const response = await fetch(`/api/share/${linkToken}`);
      
      if (response.status === 404) {
        setError("This link doesn't exist or has been removed.");
        setLoading(false);
        return;
      }

      if (response.status === 410) {
        setLinkExpired(true);
        setError("This link has expired. Please ask the person who shared it to generate a new link.");
        setLoading(false);
        return;
      }

      if (!response.ok) {
        setError("Something went wrong loading their story.");
        setLoading(false);
        return;
      }

      const data = await response.json();
      setInterviewData(data.interviewData);
    } catch (err) {
      console.error("Error loading story:", err);
      setError("Something went wrong loading their story.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading their story...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-2">
              <MemoryKeeperLogo size={28} className="text-brand-blue" strokeWidth={2} />
              <h1 className="text-xl font-bold">Legacy Words</h1>
            </div>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          {linkExpired && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Shareable links expire after 30 days for privacy protection.
              </p>
            </div>
          )}
        </main>
      </div>
    );
  }

  if (!interviewData) {
    return null;
  }

  const stats = calculateInterviewStats(interviewData);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <MemoryKeeperLogo size={28} className="text-brand-blue" strokeWidth={2} />
            <h1 className="text-xl font-bold">Legacy Words</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Their Story</h1>
          <p className="text-gray-600">
            A shared story from Legacy Words
          </p>
        </div>

        {/* Statistics */}
        {stats.answeredQuestions > 0 && (
          <Card className="mb-8 bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Questions answered</p>
                  <p className="text-2xl font-bold">{stats.answeredQuestions} / {stats.totalQuestions}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Words written</p>
                  <p className="text-2xl font-bold">{stats.totalWords.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Categories</p>
                  <p className="text-2xl font-bold">
                    {Object.keys(stats.categories).filter((k) => stats.categories[parseInt(k)].answered > 0).length} / 5
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Content by Category */}
        <div className="space-y-8">
          {INTERVIEW_CATEGORIES.map((category) => {
            const categoryAnswers = category.questions
              .map((q) => ({
                question: q,
                answer: interviewData[q.fieldName as keyof MemoryInterviewData],
              }))
              .filter((item) => item.answer && item.answer.trim().length >= 10);

            if (categoryAnswers.length === 0) return null;

            return (
              <Card key={category.step}>
                <CardHeader>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <p className="text-sm text-gray-600 italic">{category.englishTitle}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {categoryAnswers.map(({ question, answer }) => (
                    <div key={question.id} className="border-l-4 border-brand-blue pl-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{question.text}</h4>
                      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{answer}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Generated via Legacy Words</p>
          <p className="mt-1">
            <a href="https://legacywords.co.uk" className="text-brand-blue hover:underline">
              legacywords.co.uk
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}

