import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MemoryKeeperLogo } from "@/components/icons";

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-gray-900">
              <MemoryKeeperLogo size={28} className="text-brand-blue" strokeWidth={2} />
              Memory Keeper
            </Link>
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Legal Information</h1>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">What is Memory Keeper?</h3>
                <p className="text-gray-700">
                  Memory Keeper is a free tool for dementia families to preserve their loved one's story—who they are, what matters to them—before memories fade.
                  You can save their memories and share them with family members.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">How is my data protected?</h3>
                <p className="text-gray-700">
                  All data is encrypted and accessible only to you and people you've granted access to.
                  We comply with GDPR and use industry-standard security practices.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Can I update my preferences?</h3>
                <p className="text-gray-700">
                  Yes, you can edit your preferences at any time through your dashboard.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Official Document Templates</h2>
            <p className="text-gray-700 mb-4">
              Recommendations for legal protection of instructions. Advice on document preparation.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 italic">
                Document templates will be added soon. For consultation, please contact our partner solicitors.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Useful Links</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-brand-blue hover:underline">
                  Government resources for funeral planning
                </a>
              </li>
              <li>
                <a href="#" className="text-brand-blue hover:underline">
                  Recommendations for will writing
                </a>
              </li>
              <li>
                <a href="#" className="text-brand-blue hover:underline">
                  Consumer rights information
                </a>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}

