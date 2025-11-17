"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const dynamic = 'force-dynamic';
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2,
  Users,
  Edit,
  FileText
} from "lucide-react";
import { MemoryKeeperLogo } from "@/components/icons";

function OnboardingCompleteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromOnboarding = searchParams.get("from") === "onboarding";

  useEffect(() => {
    // If not coming from onboarding, redirect to dashboard
    if (!fromOnboarding) {
      router.push("/dashboard");
    }
  }, [fromOnboarding, router]);

  if (!fromOnboarding) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-brand-green flex items-center justify-center">
              <CheckCircle2 className="h-12 w-12 text-white" strokeWidth={2} />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your story, captured
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Well done. You&apos;ve captured something precious.
          </p>
          <p className="text-gray-500">
            You&apos;ve answered 32 questions across 5 categories. Their voice, their values, who they are—it&apos;s all safe now. Here&apos;s what you can do next:
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <Card className="border-2 border-brand-blue">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-brand-blue" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Share with family</h3>
                  <p className="text-gray-600 mb-4">
                    Let the people who love them read their stories. They can comment, add their own memories, feel connected.
                  </p>
                  <Link href="/dashboard/family">
                    <Button className="w-full">
                      <Users className="h-4 w-4 mr-2" strokeWidth={2} />
                      Share with Family
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Edit className="h-8 w-8 text-brand-blue" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Add more memories</h3>
                  <p className="text-gray-600 mb-4">
                    Remember something new? Want to capture more stories? Come back anytime. Their story grows with you.
                  </p>
                  <Link href="/onboarding">
                    <Button variant="outline" className="w-full">
                      <Edit className="h-4 w-4 mr-2" strokeWidth={2} />
                      Add More Memories
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>


        <div className="text-center mt-8">
          <Link href="/dashboard">
            <Button size="lg">
              Go to Dashboard
            </Button>
          </Link>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Nothing here is set in stone. You can update anytime. Their story grows with you.
        </p>
      </div>
    </div>
  );
}

export default function OnboardingCompletePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <OnboardingCompleteContent />
    </Suspense>
  );
}

