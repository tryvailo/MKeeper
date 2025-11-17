"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, ArrowLeft, Mail } from "lucide-react";
import { MemoryKeeperLogo } from "@/components/icons";

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const faqSections = [
    {
      title: "General",
      items: [
        {
          q: "What is Legacy Words?",
          a: "Legacy Words is a free online tool to help dementia families capture their loved one's story—who they are, what matters to them, their memories—before dementia takes those memories away. It helps preserve their voice, values, and personality for family to treasure forever.",
        },
        {
          q: "Is this a medical thing? Will it help with dementia?",
          a: "No. Legacy Words isn't treatment or therapy (though many families find it therapeutic). It's simply a way to capture their story—who they are, what matters to them—while they can still tell you clearly. Think of it like recording a video before a surgery: it's not the surgery, but it matters to have it just in case. If you're looking for medical support, talk to your GP or contact the Alzheimer's Society. We're here to help with the human side: preserving their voice, their values, their essence.",
        },
        {
          q: "Who should use Legacy Words?",
          a: "Dementia families who want to preserve their loved one's story while they can still share it. It's especially helpful in early stages, when they can still tell coherent stories. But even if you're further along, family members can use Legacy Words to document stories about them.",
        },
        {
          q: "How much does it cost?",
          a: "Legacy Words is completely free. Always will be. No payment ever. No hidden fees. No catches.",
        },
        {
          q: "Will this always be free?",
          a: "Yes. Legacy Words is completely free for dementia families. Always will be. No payment ever. No hidden fees. No catches. We believe preserving memories shouldn't cost anything—especially when families are already dealing with so much.",
        },
      ],
    },
    {
      title: "Privacy & Security",
      items: [
        {
          q: "How do I know my information is private?",
          a: "We take privacy seriously. Your data is encrypted, stored on secure UK servers, and complies fully with GDPR. You can download or delete all your data anytime. We don't sell your information. We don't share it with anyone. Full stop.",
        },
        {
          q: "Is Legacy Words GDPR compliant?",
          a: "Yes, we fully comply with GDPR regulations. You have the right to access, modify, or delete your data at any time.",
        },
        {
          q: "Who can see their story?",
          a: "Only people you invite. No one else can see their memories. We don't share your data with third parties.",
        },
        {
          q: "Can Legacy Words employees see my data?",
          a: "No, not without explicit permission for support issues. All data is encrypted and access is strictly controlled.",
        },
      ],
    },
    {
      title: "Using Legacy Words",
      items: [
        {
          q: "How do I capture their story?",
          a: "Sign up and start the guided interview. It takes about 35-40 minutes to complete all 32 questions across 5 categories. You can pause anytime and come back later. Once done, you can add more memories anytime from your dashboard.",
        },
        {
          q: "What are the 5 categories of questions?",
          a: "1) Life Moments (8 questions) - happy memories, proud moments, things that made you laugh. 2) Family & Relationships (6 questions) - meeting your partner, children, family stories. 3) Values & Wisdom (8 questions) - what matters most, life lessons, how you want to be remembered. 4) Interests & Personality (5 questions) - hobbies, favourite places, who you are. 5) Messages for Loved Ones (5 questions) - personal messages for family members.",
        },
        {
          q: "Do I have to answer all 32 questions?",
          a: "Yes, all questions are required to ensure a complete story. Each answer needs at least 10 characters—just a few sentences. Take your time. There's no rush.",
        },
        {
          q: "Can I skip questions or come back later?",
          a: "You can't skip questions, but you can pause anytime. Your progress is saved automatically after each step. Just come back and continue where you left off.",
        },
        {
          q: "How do I share with family?",
          a: "Go to Dashboard > Share with Family. Enter email addresses. They get an email link to view their story. You can also generate a shareable link that expires after 30 days.",
        },
        {
          q: "What if I remember something new?",
          a: "Add it anytime. Their story grows with you. Come back whenever you want to capture more memories. You can edit existing answers or add new ones.",
        },
        {
          q: "Can I change or delete memories?",
          a: "Yes. You can update, edit, or delete anytime. Permanently delete your account and all data in your settings.",
        },
        {
          q: "Can I download their story as a PDF?",
          a: "Yes! Once you've completed the interview, you can download a beautiful PDF from the 'View Story' page. It includes all their answers, formatted nicely with a cover page and table of contents.",
        },
      ],
    },
    {
      title: "Dementia-Specific",
      items: [
        {
          q: "My parent is in advanced dementia. Is it too late?",
          a: "It depends. If they can still have conversations—even brief ones—it's never too late. You can work with them at their pace. But honestly? The best time is early on, when they're most clear. If you're just diagnosed, we'd suggest starting soon while you can still hear their full stories. If you're further along, you can still use Legacy Words with family members telling stories *about* them. Not ideal, but something.",
        },
        {
          q: "How long does this take? I'm exhausted.",
          a: "The full interview takes about 35-40 minutes, but you don't have to do it all at once. The interview is broken into 5 categories, so you can complete one category at a time and take breaks between them. Some families finish in one afternoon. Others do it over weeks. Your pace. Their pace. No rush. The point isn't speed—it's preserving what matters.",
        },
        {
          q: "Will my family actually use this, or will it just sit there?",
          a: "We can't promise they'll read it daily. But when the time comes—and we know it will—they'll have something precious. Their voice. Their values. Who they were. That's not nothing. Many families tell us it's the most important thing they have.",
        },
      ],
    },
    {
      title: "What happens when you pass away",
      items: [
        {
          q: "What happens to their story if they pass away?",
          a: "Your family members can access their story if you've shared the link with them (which we recommend). Their story never disappears. It's there for your family, whenever they need it.",
        },
        {
          q: "Can I set up automatic access after their death?",
          a: "Not yet. We're working on this feature. For now, share the link or login info with trusted family members.",
        },
        {
          q: "How long are memories stored after death?",
          a: "We store indefinitely unless family requests deletion. Their story remains accessible to those you've shared with.",
        },
      ],
    },
    {
      title: "Technical",
      items: [
        {
          q: "What devices can I use?",
          a: "Any device with a browser: desktop, tablet, phone. The website is fully responsive and works on all modern browsers.",
        },
        {
          q: "Can I access offline?",
          a: "Online access requires internet connection. Their story is stored securely online and accessible anytime you're connected.",
        },
        {
          q: "Is there a mobile app?",
          a: "Not yet. The website works great on mobile though. We're considering a mobile app in the future.",
        },
      ],
    },
    {
      title: "Contact & Support",
      items: [
        {
          q: "I still have questions. Who do I talk to?",
          a: "Email support@memorykeeper.app. We typically reply within 24-48 hours. We're here to help dementia families preserve what matters most.",
        },
        {
          q: "Do I need to be worried or sad using Legacy Words?",
          a: "No. We designed this for families who want to preserve what matters while they can. Some use it together (a beautiful conversation). Some do it quietly on their own. Either way, it feels less like planning for loss and more like capturing love. You're preserving their essence. That's a gift.",
        },
      ],
    },
  ];

  const filteredSections = faqSections.map((section) => ({
    ...section,
    items: section.items.filter(
      (item) =>
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((section) => section.items.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" strokeWidth={2} />
            Back to Home
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <MemoryKeeperLogo size={28} className="text-brand-blue" strokeWidth={2} />
            <h1 className="text-3xl font-bold">Help & FAQ</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" strokeWidth={2} />
              <Input
                type="search"
                placeholder="Got a question? We probably covered it."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Can&apos;t find what you&apos;re looking for?{" "}
              <Link href="#contact" className="text-brand-blue hover:underline">
                Contact Support
              </Link>
            </p>
          </CardContent>
        </Card>

        {/* FAQ Sections */}
        <div className="space-y-6">
          {filteredSections.map((section, sectionIdx) => (
            <Card key={sectionIdx}>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {section.items.map((item, itemIdx) => (
                    <AccordionItem key={itemIdx} value={`item-${sectionIdx}-${itemIdx}`}>
                      <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                      <AccordionContent className="text-gray-700">{item.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Form */}
        <Card id="contact" className="mt-12">
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Mail className="h-5 w-5 text-gray-400 mb-2" strokeWidth={2} />
                <p className="font-medium">Email</p>
              <a href="mailto:support@memorykeeper.app" className="text-brand-blue hover:underline">
                support@memorykeeper.app
              </a>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  We provide email support only. We typically reply within 24-48 hours.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t">
              <h3 className="font-medium mb-4">Send us a message</h3>
              <form className="space-y-4">
                <Input type="email" placeholder="Your email" />
                <Input placeholder="Subject" />
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={4}
                  placeholder="Your message..."
                />
                <Button type="submit">Send Message</Button>
              </form>
              <p className="text-xs text-gray-500 mt-2">
                We&apos;ll reply within 24 hours
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

