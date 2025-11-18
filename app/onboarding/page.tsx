"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPreferences } from "@/lib/supabase";
import {
  INTERVIEW_CATEGORIES,
  InterviewStep,
  getCategoryByStep,
  getTotalQuestions,
  getTotalDuration,
  calculateWordCount,
  validateAnswer,
  type InterviewQuestion,
} from "@/lib/interview";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/lib/hooks/useAuth";
import { ArrowLeft, Clock, CheckCircle2, AlertCircle } from "lucide-react";

const TOTAL_STEPS = 6; // 5 categories + Review

export default function OnboardingPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<InterviewStep>(1);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [reviewConfirmed, setReviewConfirmed] = useState(false);
  const [startTime] = useState(Date.now());
  const [stepStartTime, setStepStartTime] = useState(Date.now());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      router.push("/sign-in");
      return;
    }
  }, [user, authLoading, router]);

  // Timer effect
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startTime]);

  // Reset step timer when step changes
  useEffect(() => {
    setStepStartTime(Date.now());
  }, [step]);

  // Auto-save on step change (only if we have meaningful data)
  useEffect(() => {
    if (step > 1 && step < 6) {
      // Only auto-save if we have at least one answer with 10+ characters
      const hasData = Object.values(formData).some((value) => 
        value && typeof value === 'string' && value.trim().length >= 10
      );
      
      if (hasData) {
        autoSave();
      }
    }
  }, [step]); // Remove formData from dependencies to avoid too many calls

  const autoSave = async () => {
    try {
      // Only save if we have meaningful data
      const hasData = Object.values(formData).some((value) => 
        value && typeof value === 'string' && value.trim().length >= 10
      );
      
      if (!hasData) {
        return; // Skip auto-save if no meaningful data
      }
      
      const response = await fetch("/api/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        console.warn("Auto-save failed (non-critical):", response.status);
      }
    } catch (error) {
      // Auto-save errors are non-critical, just log them
      console.warn("Auto-save failed (non-critical):", error);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getStepProgress = (): { current: number; total: number; percentage: number } => {
    const current = step;
    const total = TOTAL_STEPS;
    const percentage = Math.round((current / total) * 100);
    return { current, total, percentage };
  };

  const getCategoryProgress = (): { answered: number; total: number } => {
    if (step === 6) {
      // Review step
      const total = getTotalQuestions();
      const answered = Object.keys(formData).filter((key) => formData[key]?.trim().length >= 10).length;
      return { answered, total };
    }
    const category = getCategoryByStep(step);
    if (!category) return { answered: 0, total: 0 };
    const answered = category.questions.filter((q) => {
      const answer = formData[q.fieldName];
      return answer && answer.trim().length >= q.minLength;
    }).length;
    return { answered, total: category.questionCount };
  };

  const validateStep = (): boolean => {
    if (step === 6) return true; // Review step doesn't need validation

    const category = getCategoryByStep(step);
    if (!category) return true; // Allow navigation even if category not found

    const stepErrors: Record<string, string> = {};
    let isValid = true;

    // Only validate answers that were provided (all questions are optional)
    category.questions.forEach((question) => {
      const answer = formData[question.fieldName] || "";
      // Only validate if user provided an answer
      if (answer.trim().length > 0) {
        const validation = validateAnswer(answer, question);
        if (!validation.valid) {
          stepErrors[question.fieldName] = validation.error || "";
          isValid = false;
        }
      }
    });

    setErrors(stepErrors);
    return isValid; // Always allow navigation (questions are optional)
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const nextStep = () => {
    if (step < TOTAL_STEPS) {
      if (validateStep()) {
        setStep((step + 1) as InterviewStep);
      }
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((step - 1) as InterviewStep);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewConfirmed) {
      alert("Please confirm that you've reviewed everything");
      return;
    }
    setLoading(true);

    try {
      console.log("Submitting form data:", Object.keys(formData).length, "fields");
      console.log("Sample data:", Object.keys(formData).slice(0, 3).map(k => ({ key: k, length: formData[k]?.length || 0 })));
      
      const response = await fetch("/api/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (response.ok) {
        const result = await response.json();
        console.log("Successfully saved:", result);
        router.push("/onboarding/complete?from=onboarding");
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Error response:", errorData);
        console.error("Response status:", response.status);
        throw new Error(errorData.error || `Failed to save preferences (${response.status})`);
      }
    } catch (error) {
      console.error("Error saving preferences:", error);
      const errorMessage = error instanceof Error ? error.message : "Something went wrong. Please try again, or contact support if it keeps happening.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const renderQuestion = (question: InterviewQuestion) => {
    const hasError = !!errors[question.fieldName];
    const answer = formData[question.fieldName] || "";
    const wordCount = calculateWordCount(answer);

    return (
      <div key={question.id}>
        <Label htmlFor={question.id} className="text-base font-medium">
          {question.text}
        </Label>
        <textarea
          id={question.id}
          rows={question.rows || 4}
          className={`w-full mt-2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent ${
            hasError ? "border-red-300 bg-red-50" : "border-gray-300"
          }`}
          placeholder={`${question.placeholder} (Optional - you can fill this later)`}
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

    const { answered, total } = getCategoryProgress();
    const stepTime = Math.floor((Date.now() - stepStartTime) / 1000);

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">{category.title}</h2>
          <p className="text-sm text-gray-600 mb-4">{category.englishTitle}</p>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {formatTime(stepTime)} / ~{category.duration} min
            </span>
            <span>
              {answered} of {total} questions answered
            </span>
          </div>
        </div>

        <div className="space-y-6">{category.questions.map(renderQuestion)}</div>

        <div className="flex gap-4 pt-4">
          <Button type="button" variant="outline" onClick={prevStep} className="flex-1" disabled={step === 1}>
            Back
          </Button>
          <Button
            type="button"
            onClick={nextStep}
            className="flex-1"
          >
            {answered > 0 ? `Next (${answered}/${total} answered)` : "Skip for now"}
          </Button>
        </div>
      </div>
    );
  };

  const renderReviewStep = () => {
    const totalWords = Object.values(formData).reduce((sum, answer) => sum + calculateWordCount(answer), 0);
    const totalQuestions = getTotalQuestions();
    const answeredQuestions = Object.keys(formData).filter((key) => formData[key]?.trim().length >= 10).length;
    const totalDuration = getTotalDuration();
    const timeSpent = Math.floor(elapsedTime / 60);

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Your story, captured</h2>
          <p className="text-sm text-gray-600 mb-6">
            Nothing here is set in stone. You can update anytime.
          </p>
        </div>

        {/* Statistics */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Questions answered</p>
                <p className="text-2xl font-bold">{answeredQuestions} / {totalQuestions}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Words written</p>
                <p className="text-2xl font-bold">{totalWords.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Time spent</p>
                <p className="text-2xl font-bold">{timeSpent} min</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary by category */}
        <div className="space-y-4">
          {INTERVIEW_CATEGORIES.map((category) => {
            const categoryAnswers = category.questions
              .map((q) => formData[q.fieldName])
              .filter((a) => a && a.trim().length >= 10);
            
            if (categoryAnswers.length === 0) return null;

            return (
              <Card key={category.step}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                  <CardDescription>{category.englishTitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    {categoryAnswers.length} of {category.questionCount} questions answered
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Alert>
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>
            Your memories are safe. You can always come back to add more or edit what you&apos;ve written.
          </AlertDescription>
        </Alert>

        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
          <input
            type="checkbox"
            id="review-confirm"
            checked={reviewConfirmed}
            onChange={(e) => setReviewConfirmed(e.target.checked)}
            className="mt-1"
          />
          <label htmlFor="review-confirm" className="text-sm text-gray-700">
            I&apos;ve reviewed everything and it&apos;s correct
          </label>
        </div>

        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
            Back
          </Button>
          <Button
            type="submit"
            disabled={loading || !reviewConfirmed}
            className="flex-1"
          >
            {loading ? "Saving your memories..." : "Save My Memories"}
          </Button>
        </div>
      </div>
    );
  };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Getting everything ready...</div>;
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  const { current, total, percentage } = getStepProgress();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-8">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back to Home</span>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Let&apos;s capture their story
          </h1>
          <p className="text-gray-600 mb-8">
            Take your time. There&apos;s no rush. All questions are optional - you can answer what you want now and fill in the rest later from your dashboard.
          </p>

          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">
                Step {current} of {total}
              </span>
              <span className="text-sm text-gray-600 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {formatTime(elapsedTime)} / ~{getTotalDuration()} min
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-brand-blue h-2 rounded-full transition-all"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step < 6 ? renderCategoryStep() : renderReviewStep()}
          </form>
        </div>
      </div>
    </div>
  );
}
