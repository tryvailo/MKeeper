"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";
import {
  INTERVIEW_CATEGORIES,
  InterviewStep,
  getCategoryByStep,
  getTotalQuestions,
  calculateWordCount,
  validateAnswer,
  type InterviewQuestion,
} from "@/lib/interview";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Clock, CheckCircle2, AlertCircle, BookOpen } from "lucide-react";

export default function MemoriesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<InterviewStep>(1);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [savedPreferences, setSavedPreferences] = useState<any>(null);

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      router.push("/sign-in");
      return;
    }

    loadPreferences();
  }, [user, authLoading, router]);

  const loadPreferences = async () => {
    try {
      const response = await fetch("/api/preferences");
      if (response.ok) {
        const data = await response.json();
        setSavedPreferences(data.preferences);
        
        // Load existing answers from interview_data
        if (data.preferences?.interview_data) {
          setFormData(data.preferences.interview_data);
        }
      }
    } catch (error) {
      console.error("Error loading preferences:", error);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const getCategoryProgress = (): { answered: number; total: number; unanswered: InterviewQuestion[] } => {
    const category = getCategoryByStep(step);
    if (!category) return { answered: 0, total: 0, unanswered: [] };
    
    const answered = category.questions.filter((q) => {
      const answer = formData[q.fieldName];
      return answer && answer.trim().length >= 10;
    }).length;
    
    const unanswered = category.questions.filter((q) => {
      const answer = formData[q.fieldName];
      return !answer || answer.trim().length < 10;
    });
    
    return { answered, total: category.questionCount, unanswered };
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await loadPreferences();
        alert("Your memories have been saved!");
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      console.error("Error saving:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderQuestion = (question: InterviewQuestion) => {
    const hasError = !!errors[question.fieldName];
    const answer = formData[question.fieldName] || "";
    const wordCount = calculateWordCount(answer);
    const isAnswered = answer && answer.trim().length >= 10;

    return (
      <div key={question.id} className={!isAnswered ? "border-l-4 border-amber-200 pl-4 py-2" : ""}>
        <Label htmlFor={question.id} className="text-base font-medium">
          {question.text}
          {!isAnswered && <span className="text-xs text-amber-600 ml-2">(Not answered yet)</span>}
        </Label>
        <textarea
          id={question.id}
          rows={question.rows || 4}
          className={`w-full mt-2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent ${
            hasError ? "border-red-300 bg-red-50" : "border-gray-300"
          }`}
          placeholder={`${question.placeholder} (Optional)`}
          value={answer}
          onChange={(e) => updateFormData(question.fieldName, e.target.value)}
        />
        {hasError && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {errors[question.fieldName]}
          </p>
        )}
        {answer && !hasError && (
          <p className="mt-1 text-xs text-gray-500">{wordCount} words</p>
        )}
      </div>
    );
  };

  const renderCategoryStep = () => {
    const category = getCategoryByStep(step);
    if (!category) return null;

    const { answered, total, unanswered } = getCategoryProgress();

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">{category.title}</h2>
          <p className="text-sm text-gray-600 mb-4">{category.englishTitle}</p>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>
              {answered} of {total} questions answered
            </span>
            {unanswered.length > 0 && (
              <span className="text-amber-600">
                {unanswered.length} not answered yet
              </span>
            )}
          </div>
        </div>

        <Alert>
          <BookOpen className="h-4 w-4" />
          <AlertDescription>
            You can answer any questions you want. Leave blank ones you&apos;re not ready to answer yet - you can always come back later.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">{category.questions.map(renderQuestion)}</div>

        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep((step - 1) as InterviewStep)}
            className="flex-1"
            disabled={step === 1}
          >
            Previous
          </Button>
          <Button
            type="button"
            onClick={() => setStep((step + 1) as InterviewStep)}
            className="flex-1"
            disabled={step === 5}
          >
            Next Category
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="flex-1"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    );
  };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  const totalQuestions = getTotalQuestions();
  const totalAnswered = Object.keys(formData).filter((key) => {
    const answer = formData[key];
    return answer && answer.trim().length >= 10;
  }).length;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-8">
          <div className="mb-6">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back to Dashboard</span>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Your Story
          </h1>
          <p className="text-gray-600 mb-8">
            Fill in any questions you haven&apos;t answered yet. All questions are optional - answer what you want, when you want.
          </p>

          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">
                Category {step} of 5
              </span>
              <span className="text-sm text-gray-600">
                {totalAnswered} of {totalQuestions} questions answered total
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-brand-blue h-2 rounded-full transition-all"
                style={{ width: `${(totalAnswered / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {renderCategoryStep()}
        </div>
      </div>
    </div>
  );
}

