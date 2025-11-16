"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Home,
  RefreshCw,
  AlertCircle,
  Mail
} from "lucide-react";
import { MemoryKeeperLogo } from "@/components/icons";

export default function Error500Page() {
  const [retrying, setRetrying] = useState(false);

  const handleRetry = () => {
    setRetrying(true);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <MemoryKeeperLogo size={64} className="text-brand-blue mx-auto mb-4" strokeWidth={2} />
          <h1 className="text-6xl font-bold text-gray-900 mb-4">500</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-8">
            Something unexpected happened on our end. We&apos;ve been notified and are working to fix it. Please try again in a moment.
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-left">
                <RefreshCw className="h-5 w-5 text-gray-400" strokeWidth={2} />
                <div>
                  <h3 className="font-semibold mb-1">Try again</h3>
                  <p className="text-sm text-gray-600">The issue might be temporary. Give it another go.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-left">
                <Home className="h-5 w-5 text-gray-400" strokeWidth={2} />
                <div>
                  <h3 className="font-semibold mb-1">Go back home</h3>
                  <p className="text-sm text-gray-600">Return to the homepage and try again later</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-left">
                <Mail className="h-5 w-5 text-gray-400" strokeWidth={2} />
                <div>
                  <h3 className="font-semibold mb-1">Report the issue</h3>
                  <p className="text-sm text-gray-600">If the problem persists, <Link href="/contact" className="text-brand-blue hover:underline">contact our support team</Link></p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={handleRetry} disabled={retrying}>
            <RefreshCw className={`h-4 w-4 mr-2 ${retrying ? "animate-spin" : ""}`} strokeWidth={2} />
            {retrying ? "Retrying..." : "Try Again"}
          </Button>
          <Link href="/">
            <Button variant="outline" size="lg">
              <Home className="h-4 w-4 mr-2" strokeWidth={2} />
              Go Home
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg">
              Contact Support
            </Button>
          </Link>
        </div>

        <p className="text-sm text-gray-500 mt-8">
          Error ID: {Date.now().toString(36)}
        </p>
      </div>
    </div>
  );
}

