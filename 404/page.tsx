import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Home,
  Search,
  AlertCircle,
  FileText
} from "lucide-react";
import { MemoryKeeperLogo } from "@/components/icons";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <MemoryKeeperLogo size={64} className="text-brand-blue mx-auto mb-4" strokeWidth={2} />
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page not found</h2>
          <p className="text-gray-600 mb-8">
            We couldn&apos;t find that page. It might have been moved or the link might be incorrect.
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-left">
                <Search className="h-5 w-5 text-gray-400" strokeWidth={2} />
                <div>
                  <h3 className="font-semibold mb-1">Try searching</h3>
                  <p className="text-sm text-gray-600">Use the search bar to find what you&apos;re looking for</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-left">
                <FileText className="h-5 w-5 text-gray-400" strokeWidth={2} />
                <div>
                  <h3 className="font-semibold mb-1">Check the URL</h3>
                  <p className="text-sm text-gray-600">Make sure the web address is spelled correctly</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-left">
                <AlertCircle className="h-5 w-5 text-gray-400" strokeWidth={2} />
                <div>
                  <h3 className="font-semibold mb-1">Report an issue</h3>
                  <p className="text-sm text-gray-600">If you think this is a mistake, <Link href="/contact" className="text-brand-blue hover:underline">contact support</Link></p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg">
              <Home className="h-4 w-4 mr-2" strokeWidth={2} />
              Go Home
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="lg">
              Go to Dashboard
            </Button>
          </Link>
          <Link href="/help">
            <Button variant="outline" size="lg">
              Help & FAQ
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

