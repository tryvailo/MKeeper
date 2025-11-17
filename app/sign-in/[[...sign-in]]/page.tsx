"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// TEMPORARILY DISABLED: Clerk disabled for testing
// import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  const router = useRouter();

  useEffect(() => {
    // TEMPORARILY DISABLED: No auth required - redirect to dashboard
    router.push("/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <p className="text-gray-600">Redirecting to dashboard...</p>
      </div>
    </div>
  );
}

