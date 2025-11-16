import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MemoryKeeperLogo } from "@/components/icons";
import { ChevronRight } from "lucide-react";

const partners = [
  {
    name: "Smith & Associates Solicitors",
    type: "Solicitors",
    description: "Specialises in probate law and will preparation",
    website: "#",
  },
  {
    name: "Dignified Farewells Funeral Home",
    type: "Funeral Home",
    description: "Full range of funeral services with a personal approach",
    website: "#",
  },
  {
    name: "Green Memory Eco Funerals",
    type: "Funeral Home",
    description: "Eco-friendly funeral and cremation options",
    website: "#",
  },
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-gray-900">
              <MemoryKeeperLogo size={28} className="text-brand-blue" strokeWidth={2} />
              DearAfter
            </Link>
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Partners</h1>
          <p className="text-gray-600 mb-12">
            Recommended solicitors and funeral homes that work with DearAfter and can help you
            with document preparation and funeral organisation.
          </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {partners.map((partner, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-4">
                <Badge variant="secondary">{partner.type}</Badge>
              </div>
              <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>
              <p className="text-gray-600 mb-4">{partner.description}</p>
                <a
                  href={partner.website}
                  className="inline-flex items-center gap-1 text-brand-blue hover:text-brand-blue-dark font-semibold"
                >
                  Visit website <ChevronRight className="h-4 w-4" strokeWidth={2} />
                </a>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold mb-4">Become a Partner</h2>
            <p className="text-gray-700 mb-6">
              If you represent a law firm or funeral home and want to become a DearAfter partner,
              contact us.
            </p>
          <Button>Contact Us</Button>
        </div>
      </main>
    </div>
  );
}

