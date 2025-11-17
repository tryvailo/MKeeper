"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MemoryPreferences, calculateInterviewStats } from "@/lib/memory-data";
import { INTERVIEW_CATEGORIES, getCategoryByStep } from "@/lib/interview";
import { generateMemoryPDF } from "@/lib/pdf-generator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Share2, FileText, Heart, BookOpen, Sparkles, MessageSquare } from "lucide-react";
import { MemoryKeeperLogo } from "@/components/icons";

export default function PreferencesPage() {
  // const { user, isLoaded } = useUser();
  const user = { id: "temp-user", firstName: "Guest", fullName: "Guest User" };
  const isLoaded = true;
  const router = useRouter();
  const [preferences, setPreferences] = useState<MemoryPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [pdfGenerating, setPdfGenerating] = useState(false);

  useEffect(() => {
    // TEMPORARILY DISABLED: No auth check
    // if (isLoaded && !user) {
    //   router.push("/sign-in");
    //   return;
    // }

    // Always load preferences
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const response = await fetch("/api/preferences");
      if (response.ok) {
        const data = await response.json();
        setPreferences(data.preferences);
      }
    } catch (error) {
      console.error("Error loading preferences:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!preferences) return;
    
    setPdfGenerating(true);
    try {
      await generateMemoryPDF(preferences, {
        userName: user?.fullName || "Their Story",
        includeCoverPage: true,
        includeTableOfContents: true,
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Something went wrong generating the PDF. Please try again.");
    } finally {
      setPdfGenerating(false);
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
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center gap-2">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Link>
              <MemoryKeeperLogo size={28} className="text-brand-blue" strokeWidth={2} />
              <h1 className="text-xl font-bold">Legacy Words</h1>
            </div>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-gray-600 mb-4">You haven&apos;t started capturing their story yet.</p>
              <Link href="/onboarding">
                <Button>Start Capturing Their Story</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const stats = calculateInterviewStats(preferences);
  const hasContent = stats.answeredQuestions > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center gap-2">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Link>
              <MemoryKeeperLogo size={28} className="text-brand-blue" strokeWidth={2} />
              <h1 className="text-xl font-bold">Their Story</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleDownloadPDF} disabled={pdfGenerating || !hasContent}>
                <FileText className="h-4 w-4 mr-2" />
                {pdfGenerating ? "Generating PDF..." : "Download PDF"}
              </Button>
              <Link href="/dashboard/sharing">
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Statistics Card */}
        {hasContent && (
          <Card className="mb-8 bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Questions answered</p>
                  <p className="text-3xl font-bold">{stats.answeredQuestions} / {stats.totalQuestions}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Words written</p>
                  <p className="text-3xl font-bold">{stats.totalWords.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Last updated</p>
                  <p className="text-lg font-semibold">
                    {preferences.updated_at
                      ? new Date(preferences.updated_at).toLocaleDateString("en-GB")
                      : "Recently"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Content by Category */}
        {hasContent ? (
          <div className="space-y-8">
            {INTERVIEW_CATEGORIES.map((category) => {
              const categoryAnswers = category.questions
                .map((q) => ({
                  question: q,
                  answer: preferences[q.fieldName as keyof MemoryPreferences],
                }))
                .filter((item) => {
                  const answer = item.answer;
                  return answer && typeof answer === "string" && answer.trim().length >= 10;
                });

              if (categoryAnswers.length === 0) return null;

              return (
                <Card key={category.step}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">{category.title}</CardTitle>
                        <CardDescription>{category.englishTitle}</CardDescription>
                      </div>
                      <Badge variant="outline">
                        {categoryAnswers.length} / {category.questionCount}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {categoryAnswers.map(({ question, answer }) => (
                      <div key={question.id} className="border-l-4 border-brand-blue pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-start gap-2">
                          <Sparkles className="h-4 w-4 text-brand-blue mt-1 flex-shrink-0" />
                          {question.text}
                        </h4>
                        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{answer}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Start capturing their story</h3>
              <p className="text-gray-600 mb-6">
                Begin the guided interview to preserve their memories, values, and messages for your family.
              </p>
              <Link href="/onboarding">
                <Button>Start Interview</Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        {hasContent && (
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/onboarding" className="flex-1">
              <Button variant="outline" className="w-full">
                <BookOpen className="h-4 w-4 mr-2" />
                Add More Memories
              </Button>
            </Link>
            <Link href="/dashboard/sharing" className="flex-1">
              <Button variant="outline" className="w-full">
                <Share2 className="h-4 w-4 mr-2" />
                Share with Family
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

