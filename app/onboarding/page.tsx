"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
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
  getAllQuestions,
  type InterviewQuestion,
} from "@/lib/interview";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/lib/hooks/useAuth";
import { ArrowLeft, Clock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const TOTAL_STEPS = 6; // 5 categories + Review

export default function OnboardingPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false); // For auto-save indicator
  const [lastSaved, setLastSaved] = useState<Date | null>(null); // Track last successful save
  const [version, setVersion] = useState<number | undefined>(undefined); // For optimistic locking
  const [step, setStep] = useState<InterviewStep>(1);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [reviewConfirmed, setReviewConfirmed] = useState(false);
  const [startTime] = useState(Date.now());
  const [stepStartTime, setStepStartTime] = useState(Date.now());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [hasExistingData, setHasExistingData] = useState(false);

  // Save to localStorage as fallback
  const saveToLocalStorage = useCallback((data: Record<string, string>) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('memories_draft', JSON.stringify({
          data,
          timestamp: Date.now(),
        }));
      }
    } catch (error) {
      console.warn("Failed to save to localStorage:", error);
    }
  }, []);

  // Load from localStorage
  const loadFromLocalStorage = useCallback((): Record<string, string> | null => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('memories_draft');
        if (stored) {
          const parsed = JSON.parse(stored);
          // Check that data is not older than 7 days
          if (Date.now() - parsed.timestamp < 7 * 24 * 60 * 60 * 1000) {
            return parsed.data;
          } else {
            // Remove expired data
            localStorage.removeItem('memories_draft');
          }
        }
      }
    } catch (error) {
      console.warn("Failed to load from localStorage:", error);
    }
    return null;
  }, []);

  const loadExistingData = useCallback(async () => {
    if (!user?.id) return;
    
    // First, try to load from localStorage (faster, works offline)
    const localData = loadFromLocalStorage();
    if (localData && Object.keys(localData).length > 0) {
      console.log("OnboardingPage: Loaded from localStorage:", Object.keys(localData).length, "fields");
      setFormData(localData);
      setHasExistingData(true);
    }
    
    // Then, try to load from server (most up-to-date)
    try {
      const response = await fetch("/api/preferences");
      if (response.ok) {
        const data = await response.json();
        console.log("OnboardingPage: Loaded existing preferences:", data.preferences);
        console.log("OnboardingPage: interview_data exists:", !!data.preferences?.interview_data);
        console.log("OnboardingPage: interview_data keys:", data.preferences?.interview_data ? Object.keys(data.preferences.interview_data) : "none");
        
        // Load existing answers from interview_data
        if (data.preferences?.interview_data) {
          console.log("OnboardingPage: Setting formData from existing interview_data");
          setFormData(data.preferences.interview_data);
          setHasExistingData(true);
          // Update localStorage with server data
          saveToLocalStorage(data.preferences.interview_data);
        } else {
          console.log("OnboardingPage: No existing interview_data found");
        }
        
        // Store version for optimistic locking
        if (data.preferences?.version !== undefined) {
          setVersion(data.preferences.version);
        }
      }
    } catch (error) {
      console.error("OnboardingPage: Error loading from server, using localStorage data if available:", error);
      // If server fails, we already have localStorage data loaded above
    }
  }, [user?.id, loadFromLocalStorage, saveToLocalStorage]);

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      router.push("/sign-in");
      return;
    }

    // Load existing interview data when user returns to onboarding
    loadExistingData();
  }, [user, authLoading, router, loadExistingData]);

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

  const autoSave = useCallback(async () => {
    try {
      // Only save if we have meaningful data
      const hasData = Object.values(formData).some((value) => 
        value && typeof value === 'string' && value.trim().length >= 10
      );
      
      if (!hasData) {
        return; // Skip auto-save if no meaningful data
      }
      
      // Always save to localStorage first (fast, works offline)
      saveToLocalStorage(formData);
      
      // Then try to save to server
      const response = await fetch("/api/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        // Successfully saved to server, can clear localStorage draft
        if (typeof window !== 'undefined') {
          localStorage.removeItem('memories_draft');
        }
      } else {
        console.warn("Auto-save failed (non-critical), data saved to localStorage:", response.status);
      }
    } catch (error) {
      // Auto-save errors are non-critical, data is saved to localStorage
      console.warn("Auto-save failed (non-critical), data saved to localStorage:", error);
    }
  }, [formData, saveToLocalStorage]);

  // Debounce function to prevent race conditions
  const debounce = useCallback(<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout | null = null;
    return function executedFunction(...args: Parameters<T>) {
      const later = () => {
        timeout = null;
        func(...args);
      };
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }, []);

  // Debounced version of autoSave to prevent race conditions
  const debouncedAutoSave = useMemo(
    () => debounce(autoSave, 2000), // 2 seconds delay
    [autoSave, debounce]
  );

  // Auto-save on step change (only if we have meaningful data)
  // Using debounced version to prevent race conditions
  useEffect(() => {
    if (step > 1 && step < 6) {
      // Only auto-save if we have at least one answer with 10+ characters
      const hasData = Object.values(formData).some((value) => 
        value && typeof value === 'string' && value.trim().length >= 10
      );
      
      if (hasData) {
        debouncedAutoSave();
      }
    }
  }, [step, formData, debouncedAutoSave]);

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

  // Validate all answers before submission
  const validateAllAnswers = (): { valid: boolean; errors: Record<string, string> } => {
    const allErrors: Record<string, string> = {};
    let isValid = true;
    const allQuestions = getAllQuestions();

    // Validate all provided answers
    allQuestions.forEach((question) => {
      const answer = formData[question.fieldName] || "";
      // Only validate if user provided an answer (all questions are optional)
      if (answer.trim().length > 0) {
        const validation = validateAnswer(answer, question);
        if (!validation.valid) {
          allErrors[question.fieldName] = validation.error || "";
          isValid = false;
        }
      }
    });

    return { valid: isValid, errors: allErrors };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewConfirmed) {
      alert("Please confirm that you've reviewed everything");
      return;
    }

    // Validate all answers on client before submission
    const validation = validateAllAnswers();
    if (!validation.valid) {
      setErrors(validation.errors);
      // Scroll to first error
      const firstErrorField = Object.keys(validation.errors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      alert("Please fix the errors before submitting. Some answers are too short.");
      return;
    }

    setLoading(true);

    // Save to localStorage before attempting server save
    saveToLocalStorage(formData);

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
        // Clear localStorage draft after successful save
        if (typeof window !== 'undefined') {
          localStorage.removeItem('memories_draft');
        }
        setLastSaved(new Date()); // Update last saved timestamp
        // Update version from server response
        if (result.preferences?.version !== undefined) {
          setVersion(result.preferences.version);
        }
        router.push("/onboarding/complete?from=onboarding");
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Error response:", errorData);
        console.error("Response status:", response.status);
        // Data is saved to localStorage, so user can retry later
        throw new Error(errorData.error || `Failed to save preferences (${response.status}). Your data is saved locally and will be saved when connection is restored.`);
      }
    } catch (error) {
      console.error("Error saving preferences:", error);
      const errorMessage = error instanceof Error ? error.message : "Something went wrong. Please try again, or contact support if it keeps happening.";
      // Data is already saved to localStorage, so user can retry
      alert(errorMessage + "\n\nYour data has been saved locally and will be automatically saved when connection is restored.");
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
              href={hasExistingData ? "/dashboard" : "/"}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back to {hasExistingData ? "Dashboard" : "Home"}</span>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Let&apos;s capture their story
          </h1>
          <p className="text-gray-600 mb-8">
            Take your time. There&apos;s no rush. All questions are optional - you can answer what you want now and fill in the rest later from your dashboard.
          </p>

          {/* Save status indicator */}
          {(saving || lastSaved) && (
            <div className="mb-4 flex items-center justify-end">
              {saving ? (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Saving...</span>
                </div>
              ) : lastSaved ? (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Saved {lastSaved.toLocaleTimeString()}</span>
                </div>
              ) : null}
            </div>
          )}

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
