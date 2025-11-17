import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MemoryKeeperLogo } from "@/components/icons";

const stories = [
  {
    id: 1,
    title: "How DearAfter helped our family",
    content:
      "When my mum documented her preferences in DearAfter, we all breathed a sigh of relief. We didn't have to guess what she would have wanted, and there were no conflicts between relatives. Everything was clearly recorded and accessible.",
    author: "Anonymous",
  },
  {
    id: 2,
    title: "Peace of mind for the whole family",
    content:
      "My father always talked about his wishes, but we never wrote them down. DearAfter helped us save all his thoughts in one place. Now we know exactly what to do, and it gives us peace.",
    author: "Anonymous",
  },
  {
    id: 3,
    title: "Simplicity and convenience",
    content:
      "Filling out the questionnaire took just 15 minutes, and the result was a ready PDF document that we can show to the funeral home. Very convenient and professional.",
    author: "Anonymous",
  },
];

export default function StoriesPage() {
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">User Stories</h1>
          <p className="text-gray-600 mb-12">
            Real stories from people who DearAfter helped avoid stress and conflict when organising funerals.
          </p>

        <div className="space-y-8">
          {stories.map((story) => (
            <div key={story.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-4">{story.title}</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">{story.content}</p>
              <p className="text-sm text-gray-500">— {story.author}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 border border-brand-blue rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold mb-4">Share your story</h3>
          <p className="text-gray-700 mb-6">
            Your story can help other families. We only publish anonymous reviews.
          </p>
          <Button>Add your review</Button>
        </div>
      </main>
    </div>
  );
}

