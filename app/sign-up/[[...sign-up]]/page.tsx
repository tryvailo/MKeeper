"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function SignUpPage() {
  const router = useRouter();

  useEffect(() => {
    // TEMPORARILY DISABLED: No auth required - redirect to onboarding
    router.push("/onboarding");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <p className="text-gray-600">Redirecting to onboarding...</p>
      </div>
    </div>
  );
}

