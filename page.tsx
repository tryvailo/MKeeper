"use client";

import { useState } from "react";
import Link from "next/link";
// Clerk components removed - using direct links instead
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Users, 
  Shield, 
  Heart,
  CheckCircle2,
  Lock,
  Sparkles,
  Brain,
  Hourglass,
  BookOpen,
  Eye,
  Mail
} from "lucide-react";
import { MemoryKeeperLogo } from "@/components/icons";

export default function LandingPage() {
  const [storyEmail, setStoryEmail] = useState("");
  const [storySubmitted, setStorySubmitted] = useState(false);

  const handleStorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email collection API
    console.log("Story email submitted:", storyEmail);
    setStorySubmitted(true);
    setTimeout(() => {
      setStoryEmail("");
      setStorySubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header/Navbar */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-gray-900">
              <MemoryKeeperLogo size={32} className="text-brand-blue" strokeWidth={2} />
              Memory Keeper
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#how-it-works" className="text-gray-700 hover:text-gray-900">
                How it works
              </Link>
              <Link href="#testimonials" className="text-gray-700 hover:text-gray-900">
                Stories
              </Link>
              <Link href="/help" className="text-gray-700 hover:text-gray-900">
                Help
              </Link>
              <Link href="#faq" className="text-gray-700 hover:text-gray-900">
                FAQ
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <Link href="/sign-in">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/sign-up">
                <Button>Start Remembering</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            Save what matters before memories fade
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            A simple way to capture what makes them who they are. Before dementia takes those memories away.
          </p>
          
          {/* CTA Section */}
          <div className="flex flex-col items-center gap-6 mb-12">
            <Link href="/sign-up">
              <Button size="lg" className="text-lg px-10 py-7 h-auto shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                Start Remembering
              </Button>
            </Link>
            <p className="text-sm text-gray-500 font-medium">
              Completely free • Takes 35-40 minutes • Your family will treasure this forever
            </p>
          </div>

          {/* Trust Badges - Improved */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-2 text-gray-700">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-green/10">
                <CheckCircle2 className="h-5 w-5 text-brand-green" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-medium">Trusted by 200+ families</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-green/10">
                <Heart className="h-5 w-5 text-brand-green" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-medium">Alzheimer&apos;s Society recommended</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-green/10">
                <Shield className="h-5 w-5 text-brand-green" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-medium">Bank-level encryption</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="why" className="bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Memory Keeper?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The problem is real. The solution is simple.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            <Card className="border-2 border-transparent hover:border-brand-blue/20 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-2xl bg-blue-50">
                    <Brain className="h-10 w-10 text-brand-blue" strokeWidth={2} />
                  </div>
                </div>
                <CardTitle className="text-xl mb-2">Their memories are slipping away</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed text-center">
                  As dementia progresses, so much is lost. Their stories, their laugh, what made them *them*. But you can save those things. Before it&apos;s too late.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-transparent hover:border-brand-blue/20 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-2xl bg-blue-50">
                    <Heart className="h-10 w-10 text-brand-blue" strokeWidth={2} />
                  </div>
                </div>
                <CardTitle className="text-xl mb-2">Not just facts. Their *why*.</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed text-center">
                  Yes, they want to know what kind of funeral. But they NEED to know why. What mattered to them. Who they were. How to celebrate them properly. That&apos;s what you give them with Memory Keeper.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-transparent hover:border-brand-blue/20 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-2xl bg-blue-50">
                    <Hourglass className="h-10 w-10 text-brand-blue" strokeWidth={2} />
                  </div>
                </div>
                <CardTitle className="text-xl mb-2">The time to capture this is now</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed text-center">
                  In the early stages of dementia, they can still tell their stories clearly. In a year or two, that might not be true. This is your chance to preserve who they are—while they can still tell you.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section - How it works */}
      <section id="how-it-works" className="bg-gradient-to-b from-gray-50 to-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How it works in 3 steps</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple, guided, and designed with dementia families in mind
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10 mb-12">
            <Card className="relative border-2 border-transparent hover:border-brand-blue/20 transition-all duration-300 hover:shadow-lg">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                1
              </div>
              <CardHeader className="text-center pt-8 pb-4">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-2xl bg-blue-50">
                    <BookOpen className="h-10 w-10 text-brand-blue" strokeWidth={2} />
                  </div>
                </div>
                <CardTitle className="text-xl mb-2">Help them tell their story</CardTitle>
                <CardDescription className="text-base">In their own words</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-center">
                  Memory Keeper guides them through 32 guided questions. Not clinical. Not scary. Just a conversation: &apos;What&apos;s your happiest memory?&apos; &apos;Who means the most to you?&apos; &apos;What are you proud of?&apos; It&apos;s therapy. It&apos;s love. It&apos;s capturing who they really are.
                </p>
              </CardContent>
            </Card>
            <Card className="relative border-2 border-transparent hover:border-brand-blue/20 transition-all duration-300 hover:shadow-lg">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                2
              </div>
              <CardHeader className="text-center pt-8 pb-4">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-2xl bg-blue-50">
                    <Eye className="h-10 w-10 text-brand-blue" strokeWidth={2} />
                  </div>
                </div>
                <CardTitle className="text-xl mb-2">Your family sees them clearly</CardTitle>
                <CardDescription className="text-base">Understanding, not just information</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-center">
                  Once the memories are captured, you share access with their children, spouse, or whoever needs to understand them. They can read at their own pace. Comment. Ask questions. Feel connected. It&apos;s like having one more conversation together.
                </p>
              </CardContent>
            </Card>
            <Card className="relative border-2 border-transparent hover:border-brand-blue/20 transition-all duration-300 hover:shadow-lg">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                3
              </div>
              <CardHeader className="text-center pt-8 pb-4">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-2xl bg-blue-50">
                    <Lock className="h-10 w-10 text-brand-blue" strokeWidth={2} />
                  </div>
                </div>
                <CardTitle className="text-xl mb-2">Their voice stays forever</CardTitle>
                <CardDescription className="text-base">Permanently preserved</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-center">
                  Encrypted, secure, always accessible. Whether it&apos;s tomorrow or twenty years from now, when grief is less fresh, your family can revisit these memories. They can play them for grandchildren. They can remember who they were before dementia took them.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="text-center">
            <Link href="/sign-up">
              <Button size="lg" className="text-lg px-10 py-7 h-auto shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                Help Them Remember Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Real Reddit Quotes */}
      <section id="testimonials" className="bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Quote - Improved */}
          <div className="max-w-3xl mx-auto mb-20">
            <div className="relative">
              <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-blue to-blue-300 rounded-full"></div>
              <div className="pl-8">
                <blockquote className="text-xl md:text-2xl font-medium text-gray-900 leading-relaxed mb-6">
                  &quot;My biggest regret is not recording a conversation with my grandma before she passed. I wish I would have saved more voicemails, took more video, had more media based memories because now it is so hard to remember the person she was before the dementia.&quot;
                </blockquote>
                <p className="text-sm text-gray-500 font-medium flex items-center gap-2">
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  Caregiver, Reddit r/AskOldPeopleAdvice
                </p>
              </div>
            </div>
          </div>

          {/* Reddit Quotes Section - Improved */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">What people are saying on Reddit</h2>
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              <Card className="border-l-4 border-l-amber-500 hover:shadow-md transition-shadow duration-200">
                <CardContent className="pt-6 pb-6">
                  <blockquote className="text-gray-700 mb-4 leading-relaxed text-sm md:text-base">
                    &quot;I wish I would have saved more voicemails, took more video, had more media based memories because now it is so hard to remember the man he was before the dementia.&quot;
                  </blockquote>
                  <p className="text-xs text-gray-500 font-medium flex items-center gap-2">
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    Caregiver, Reddit r/dementia
                  </p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-amber-500 hover:shadow-md transition-shadow duration-200">
                <CardContent className="pt-6 pb-6">
                  <blockquote className="text-gray-700 mb-4 leading-relaxed text-sm md:text-base">
                    &quot;I wish I had asked my parents more about their lives, their stories, what mattered to them. Now it&apos;s too late and I&apos;m left with just fragments.&quot;
                  </blockquote>
                  <p className="text-xs text-gray-500 font-medium flex items-center gap-2">
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    Caregiver, Reddit r/caregivers
                  </p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-amber-500 hover:shadow-md transition-shadow duration-200">
                <CardContent className="pt-6 pb-6">
                  <blockquote className="text-gray-700 mb-4 leading-relaxed text-sm md:text-base">
                    &quot;I had the idea and equipment to record conversations with my mum, but I kept putting it off. By the time I finally did it, she couldn&apos;t remember half the stories anymore.&quot;
                  </blockquote>
                  <p className="text-xs text-gray-500 font-medium flex items-center gap-2">
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    Caregiver, Reddit r/dementia
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Early Users Section - Improved */}
          <div className="max-w-3xl mx-auto">
            <Card className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 border-2 border-brand-blue/30 shadow-lg">
              <CardContent className="pt-10 pb-10 px-6 md:px-10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-blue/10 mb-4">
                    <Sparkles className="h-8 w-8 text-brand-blue" strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Early User Stories</h3>
                  <p className="text-gray-600 text-base max-w-xl mx-auto">
                    Be one of the first to share how Memory Keeper helped preserve your family&apos;s stories.
                  </p>
                </div>
                
                {storySubmitted ? (
                  <div className="text-center py-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-green/10 mb-4">
                      <CheckCircle2 className="h-8 w-8 text-brand-green" strokeWidth={2} />
                    </div>
                    <p className="text-gray-700 font-medium text-lg">Thank you! We&apos;ll be in touch soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleStorySubmit} className="max-w-lg mx-auto">
                    <div className="flex flex-col sm:flex-row gap-3 mb-4">
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={storyEmail}
                        onChange={(e) => setStoryEmail(e.target.value)}
                        required
                        className="flex-1 h-12 text-base"
                      />
                      <Button type="submit" className="h-12 px-8 whitespace-nowrap">
                        <Mail className="h-4 w-4 mr-2" strokeWidth={2} />
                        Share Your Story
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 text-center leading-relaxed">
                      We&apos;ll reach out to collect your story and feature it here (with your permission).
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Free Section - Replaces Pricing */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-8">
            <div className="p-6 rounded-full bg-brand-green/10">
              <CheckCircle2 className="h-20 w-20 text-brand-green" strokeWidth={2} />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">This is always free. Always will be.</h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Memory Keeper is completely free for dementia families. No payment ever. No hidden fees. No catches.
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="text-lg px-10 py-7 h-auto shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
              Start Remembering
            </Button>
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-white py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Questions? We Have Answers</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about Memory Keeper
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border border-gray-200 rounded-lg px-6 py-2 hover:border-brand-blue/30 transition-colors">
              <AccordionTrigger className="text-left font-semibold text-lg py-4">Is this a medical thing? Will it help with dementia?</AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed pb-4">
                No. Memory Keeper isn&apos;t treatment or therapy (though many families find it therapeutic). It&apos;s simply a way to capture their story—who they are, what matters to them—while they can still tell you clearly. Think of it like recording a video before a surgery: it&apos;s not the surgery, but it matters to have it just in case. If you&apos;re looking for medical support, talk to your GP or contact the Alzheimer&apos;s Society. We&apos;re here to help with the human side: preserving their voice, their values, their essence.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border border-gray-200 rounded-lg px-6 py-2 hover:border-brand-blue/30 transition-colors">
              <AccordionTrigger className="text-left font-semibold text-lg py-4">My parent is in advanced dementia. Is it too late?</AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed pb-4">
                It depends. If they can still have conversations—even brief ones—it&apos;s never too late. You can work with them at their pace. But honestly? The best time is early on, when they&apos;re most clear. If you&apos;re just diagnosed, we&apos;d suggest starting soon while you can still hear their full stories. If you&apos;re further along, you can still use Memory Keeper with family members telling stories *about* them. Not ideal, but something.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border border-gray-200 rounded-lg px-6 py-2 hover:border-brand-blue/30 transition-colors">
              <AccordionTrigger className="text-left font-semibold text-lg py-4">How long does this take? I&apos;m exhausted.</AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed pb-4">
                You don&apos;t have to do it all at once. Take a section, take a break. Some families finish in one afternoon. Others do it over weeks. Your pace. Their pace. No rush. The point isn&apos;t speed—it&apos;s preserving what matters.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border border-gray-200 rounded-lg px-6 py-2 hover:border-brand-blue/30 transition-colors">
              <AccordionTrigger className="text-left font-semibold text-lg py-4">Will my family actually use this, or will it just sit there?</AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed pb-4">
                Honest answer? Some families dive in immediately. Others don&apos;t look at it for months, until they need it. But here&apos;s what matters: when they DO need it—when grief is fresh, or when they&apos;re explaining Grandma to a child, or when they&apos;re planning the funeral—it&apos;s there. And it helps. We hear from families years later: &apos;I just rewatched their memories. I&apos;d forgotten how much they made me laugh.&apos; That&apos;s why we do this.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border border-gray-200 rounded-lg px-6 py-2 hover:border-brand-blue/30 transition-colors">
              <AccordionTrigger className="text-left font-semibold text-lg py-4">Is my data really private?</AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed pb-4">
                Yes. Bank-level encryption. Your stories never leave our UK servers. We don&apos;t sell data. We don&apos;t share it. We don&apos;t even read it unless something goes wrong technically. You control exactly who sees what. You can delete everything anytime. Full GDPR compliant.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6" className="border border-gray-200 rounded-lg px-6 py-2 hover:border-brand-blue/30 transition-colors">
              <AccordionTrigger className="text-left font-semibold text-lg py-4">What happens if they pass away while we&apos;re using it?</AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed pb-4">
                Their stories stay safe. Forever. Family members you&apos;ve invited keep access. You can download everything. Years later, you can come back. Your memories don&apos;t disappear. That&apos;s the point.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7" className="border border-gray-200 rounded-lg px-6 py-2 hover:border-brand-blue/30 transition-colors">
              <AccordionTrigger className="text-left font-semibold text-lg py-4">Will this always be free?</AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed pb-4">
                Yes. Memory Keeper is completely free for dementia families. Always will be. No payment ever. No hidden fees. No catches. We believe preserving memories shouldn&apos;t cost anything—especially when families are already dealing with so much.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Memory Keeper</h3>
              <p className="text-sm text-gray-600">
                Memory Keeper helps dementia families preserve what matters before memories fade. Free, private, forever.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-600 hover:text-gray-900">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">Dementia awareness</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">Alzheimer&apos;s Society</a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">Family support groups</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-sm text-gray-600 mb-2">Get tips for dementia conversations and memory preservation</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
                <Button size="sm">Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            © 2025 Memory Keeper. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
