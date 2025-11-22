"use client";

import { useState } from "react";
import Link from "next/link";
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
  Mail,
  FileText,
  ChevronRight,
  Quote,
  MessageCircleHeart,
  ArrowRight
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
              Legacy Words
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#how-it-works" className="text-base text-gray-800 hover:text-gray-900 font-medium">
                How it works
              </Link>
              <Link href="#testimonials" className="text-base text-gray-800 hover:text-gray-900 font-medium">
                Stories
              </Link>
              <Link href="/help" className="text-base text-gray-800 hover:text-gray-900 font-medium">
                Help
              </Link>
              <Link href="#faq" className="text-base text-gray-800 hover:text-gray-900 font-medium">
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

      {/* Hero Section - Legacy Words Style */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background Design: Warm Light & Texture */}
        <div className="absolute inset-0 z-0">
          {/* Base warm off-white */}
          <div className="absolute inset-0 bg-[#FDFBF7]"></div>
          
          {/* Subtle Paper Texture / Noise Overlay */}
          <div className="absolute inset-0 opacity-[0.4]" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E")` 
          }}></div>

          {/* Warm Amber 'Memory' Glow (Top Right) */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 mix-blend-multiply"></div>
          
          {/* Calm Blue 'Trust' Glow (Top Left) */}
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-50/60 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/4 mix-blend-multiply"></div>
          
          {/* Soft Fade to White at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-brand-dark tracking-tight mb-6 leading-[1.1]">
            Save what matters before memories fade
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            A simple way to capture what makes them who they are. Before dementia takes those memories away.
          </p>

          <div className="flex flex-col items-center space-y-4">
            <Link href="/sign-up">
              <button className="bg-brand-blue text-white text-lg md:text-xl font-bold px-10 py-5 rounded-full shadow-xl hover:bg-blue-800 hover:shadow-2xl transition-all transform hover:-translate-y-1 w-full md:w-auto ring-4 ring-blue-100/50">
                Start Remembering
              </button>
            </Link>
            <p className="text-base md:text-lg text-gray-700 font-medium">
              Completely free • Takes 35-40 minutes • Your family will treasure this forever
            </p>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-6 md:gap-12">
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-green-100 shadow-sm">
              <CheckCircle2 className="text-brand-green" size={22} />
              <span className="text-base font-semibold text-gray-800">Trusted by 200+ families</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-green-100 shadow-sm">
              <Heart className="text-brand-green" size={22} />
              <span className="text-base font-semibold text-gray-800">Alzheimer&apos;s Society recommended</span>
            </div>

            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-green-100 shadow-sm">
              <Shield className="text-brand-green" size={22} />
              <span className="text-base font-semibold text-gray-800">Bank-level encryption</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="why" className="bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">Why Legacy Words?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The problem is real. The solution is simple.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            <Card className="border-2 border-gray-100 hover:border-brand-blue/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-6">
                  <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center">
                    <Brain className="h-8 w-8 text-brand-blue" strokeWidth={2} />
                  </div>
                </div>
                <CardTitle className="text-xl mb-2">Their memories are slipping away</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base text-gray-700 leading-relaxed text-center">
                  As dementia progresses, so much is lost. Their stories, their laugh, what made them *them*. It is vital to capture these unique personality traits while they are still here. You can save those things. Before it&apos;s too late.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-100 hover:border-brand-blue/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-6">
                  <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center">
                    <Heart className="h-8 w-8 text-brand-blue" strokeWidth={2} />
                  </div>
                </div>
                <CardTitle className="text-xl mb-2">Not just facts. Their *why*.</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base text-gray-700 leading-relaxed text-center">
                  It is not enough to just know the facts of their life. It is about capturing their core values and what truly defined them as a person. Move beyond superficial details to preserve their essence, their beliefs, and the &apos;why&apos; behind the life they lived.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-100 hover:border-brand-blue/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-6">
                  <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center">
                    <Hourglass className="h-8 w-8 text-brand-blue" strokeWidth={2} />
                  </div>
                </div>
                <CardTitle className="text-xl mb-2">The time to capture this is now</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base text-gray-700 leading-relaxed text-center">
                  In the early stages of dementia, they can still tell their stories clearly. In a year or two, that might not be true. This is your chance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Product Demo Section - We guide the conversation */}
      <section className="py-16 md:py-24 bg-blue-50/50 overflow-hidden" aria-label="Product Demo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Text Content */}
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">
                We guide the conversation, you capture the magic.
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Starting is the hardest part. We provide the questions, so you don&apos;t have to worry about what to ask. Just sit, talk, and preserve their answers.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-brand-blue/10 p-2 rounded-lg mt-1" aria-hidden="true">
                    <div className="w-6 h-6 flex items-center justify-center text-brand-blue font-bold">1</div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Open a category</h3>
                    <p className="text-base text-gray-700 leading-relaxed">From &quot;Happy Memories&quot; to &quot;Life Lessons&quot;, we break it down into small steps.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-brand-blue/10 p-2 rounded-lg mt-1" aria-hidden="true">
                    <div className="w-6 h-6 flex items-center justify-center text-brand-blue font-bold">2</div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Ask the question</h3>
                    <p className="text-base text-gray-700 leading-relaxed">Read the prompt aloud. It&apos;s designed to spark stories, not just &quot;yes/no&quot; answers.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-brand-blue/10 p-2 rounded-lg mt-1" aria-hidden="true">
                    <div className="w-6 h-6 flex items-center justify-center text-brand-blue font-bold">3</div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Save their words</h3>
                    <p className="text-base text-gray-700 leading-relaxed">Type their answer or use your phone&apos;s dictation. Their legacy is safe forever.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Mockup */}
            <div className="order-1 md:order-2 flex justify-center relative" aria-hidden="true">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-blue-200 blur-3xl opacity-20 rounded-full"></div>
              
              {/* Phone Frame */}
              <div className="relative w-[320px] h-[640px] bg-gray-900 rounded-[3rem] shadow-2xl border-[8px] border-gray-900 overflow-hidden z-10">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-20"></div>
                
                {/* Screen Content */}
                <div className="w-full h-full bg-gray-50 flex flex-col relative">
                  
                  {/* Status Bar Mock */}
                  <div className="h-10 w-full flex justify-between items-end px-4 pb-1.5 text-[10px] font-medium text-gray-500 bg-white">
                    <span>9:41</span>
                    <div className="flex space-x-1">
                      <div className="w-3 h-2.5 bg-gray-300 rounded-sm"></div>
                      <div className="w-3 h-2.5 bg-gray-800 rounded-sm"></div>
                    </div>
                  </div>

                  {/* App Header */}
                  <div className="px-4 py-3 flex justify-between items-center bg-white border-b border-gray-100">
                    <span className="font-bold text-brand-blue text-sm">Legacy Words</span>
                    <span className="text-[10px] text-gray-400 font-mono">12/32</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 h-0.5">
                    <div className="bg-brand-blue h-0.5 w-[35%]"></div>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 px-4 py-6 overflow-hidden">
                    
                    {/* Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 h-full flex flex-col">
                      
                      <div className="mb-4">
                        <div className="flex items-center space-x-2 mb-3">
                           <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-brand-blue text-[10px] font-bold flex-shrink-0">1</span>
                           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide truncate">Memories That Matter</span>
                        </div>
                        
                        <h4 className="text-lg font-bold text-gray-900 leading-tight mb-2 break-words">
                          What&apos;s the happiest memory you have?
                        </h4>
                        <p className="text-sm text-gray-500 italic leading-relaxed">
                          &quot;A moment, a day, a time that brings you joy...&quot;
                        </p>
                      </div>

                      {/* Text Input Mock */}
                      <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 p-3 mb-3 relative min-h-0">
                        <p className="text-gray-800 text-sm font-serif leading-relaxed break-words">
                          &quot;It was the summer of 1965. We took that old Ford Anglia down to Cornwall. The engine overheated twice, but we just laughed...&quot;
                        </p>
                        <div className="w-0.5 h-4 bg-brand-blue animate-pulse inline-block ml-1 align-middle"></div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between pt-2">
                         <span className="text-[10px] text-gray-400">24 words</span>
                         <button className="bg-brand-blue text-white rounded-lg p-2 shadow-lg hover:bg-blue-800 transition-colors">
                           <ChevronRight size={16} />
                         </button>
                      </div>

                    </div>

                  </div>

                  {/* Bottom Nav Mock */}
                  <div className="h-14 bg-white border-t border-gray-200 flex justify-around items-center px-4">
                     <div className="text-brand-blue"><FileText size={20} /></div>
                     <div className="text-gray-300"><Sparkles size={20} /></div>
                     <div className="text-gray-300"><CheckCircle2 size={20} /></div>
                  </div>

                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Solution Section - How it works */}
      <section id="how-it-works" className="bg-gradient-to-b from-gray-50 to-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">How it works in 3 steps</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple, guided, and designed with dementia families in mind.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16">
            {/* Step 1 */}
            <div className="group relative bg-white p-8 pt-12 rounded-2xl shadow-sm border border-gray-200 flex flex-col items-start h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="absolute -top-6 left-8 w-12 h-12 bg-brand-blue text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg border-4 border-gray-50 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-700" aria-hidden="true">
                1
              </div>
              <div className="mb-6 p-4 bg-blue-50 rounded-xl inline-block transition-all duration-300 group-hover:bg-blue-100 group-hover:scale-105 group-hover:shadow-md" aria-hidden="true">
                <BookOpen className="text-brand-blue transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-brand-dark mb-1">Help them tell their story</h3>
              <span className="text-sm font-semibold text-brand-blue uppercase tracking-wider mb-4 block">In their own words</span>
              <p className="text-base text-gray-700 leading-relaxed">
                Legacy Words guides them through 32 guided questions. Not clinical. Not scary. Just a conversation: &apos;What&apos;s your happiest memory?&apos; &apos;Who means the most to you?&apos; It&apos;s therapy. It&apos;s love.
              </p>
            </div>

            {/* Step 2 */}
            <div className="group relative bg-white p-8 pt-12 rounded-2xl shadow-sm border border-gray-200 flex flex-col items-start h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="absolute -top-6 left-8 w-12 h-12 bg-brand-blue text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg border-4 border-gray-50 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-700" aria-hidden="true">
                2
              </div>
              <div className="mb-6 p-4 bg-blue-50 rounded-xl inline-block transition-all duration-300 group-hover:bg-blue-100 group-hover:scale-105 group-hover:shadow-md" aria-hidden="true">
                <Eye className="text-brand-blue transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-brand-dark mb-1">Your family sees them clearly</h3>
              <span className="text-sm font-semibold text-brand-blue uppercase tracking-wider mb-4 block">Understanding, not just info</span>
              <p className="text-base text-gray-700 leading-relaxed">
                Share access with their children, spouse, or whoever needs to understand them. They can read at their own pace, comment, and feel connected. It&apos;s like having one more conversation together.
              </p>
            </div>

            {/* Step 3 */}
            <div className="group relative bg-white p-8 pt-12 rounded-2xl shadow-sm border border-gray-200 flex flex-col items-start h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="absolute -top-6 left-8 w-12 h-12 bg-brand-blue text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg border-4 border-gray-50 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-700" aria-hidden="true">
                3
              </div>
              <div className="mb-6 p-4 bg-blue-50 rounded-xl inline-block transition-all duration-300 group-hover:bg-blue-100 group-hover:scale-105 group-hover:shadow-md" aria-hidden="true">
                <Lock className="text-brand-blue transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-brand-dark mb-1">Their voice stays forever</h3>
              <span className="text-sm font-semibold text-brand-blue uppercase tracking-wider mb-4 block">Permanently preserved</span>
              <p className="text-base text-gray-700 leading-relaxed">
                Encrypted, secure, always accessible. Years from now, when grief is less fresh, your family can revisit these memories. They can play them for grandchildren. They can remember.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link href="/sign-up">
              <button className="bg-brand-blue text-white text-lg md:text-xl font-bold px-12 py-6 rounded-full shadow-xl hover:bg-blue-800 hover:shadow-2xl transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-300">
                Help Them Remember Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Voices from the Community */}
      <section id="testimonials" className="bg-white py-24 md:py-32" aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Quote - Redesigned to be more 'editorial' */}
          <div className="max-w-4xl mx-auto mb-24">
            <div className="bg-[#FDFBF7] p-10 md:p-14 rounded-3xl border border-orange-100/50 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" aria-hidden="true"></div>
              <div className="relative z-10 text-center">
                <blockquote className="text-2xl md:text-3xl font-medium text-brand-dark leading-relaxed mb-8 font-serif italic">
                  &quot;My biggest regret is not recording a conversation with my grandma before she passed... now it is so hard to remember the person she was.&quot;
                </blockquote>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center text-white font-bold" aria-hidden="true">
                    CG
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-brand-dark">Caregiver</p>
                    <p className="text-base text-gray-600">via Reddit r/AskOldPeopleAdvice</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">Voices from the Community</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Real stories from families who know why this matters.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Testimonial Card 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 h-full flex flex-col">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm" aria-hidden="true">
                  JD
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-base">Family Caregiver</p>
                  <div className="flex items-center space-x-1">
                    <MessageCircleHeart size={14} className="text-gray-500" aria-hidden="true" />
                    <p className="text-sm text-gray-600">Verified Reddit User</p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <Quote className="absolute -top-2 -left-2 text-gray-100 w-8 h-8 transform -scale-x-100" aria-hidden="true" />
                <p className="text-gray-700 leading-relaxed relative z-10 pl-2">
                  &quot;I wish I would have saved more voicemails, took more video... because now it is so hard to remember the man he was before the dementia.&quot;
                </p>
              </div>
            </div>

            {/* Testimonial Card 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 h-full flex flex-col">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm" aria-hidden="true">
                  MK
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-base">Daughter</p>
                  <div className="flex items-center space-x-1">
                    <MessageCircleHeart size={14} className="text-gray-500" aria-hidden="true" />
                    <p className="text-sm text-gray-600">Verified Reddit User</p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <Quote className="absolute -top-2 -left-2 text-gray-100 w-8 h-8 transform -scale-x-100" aria-hidden="true" />
                <p className="text-gray-700 leading-relaxed relative z-10 pl-2">
                  &quot;I wish I had asked my parents more about their lives, their stories, what mattered to them. Now it&apos;s too late and I&apos;m left with just fragments.&quot;
                </p>
              </div>
            </div>

            {/* Testimonial Card 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 h-full flex flex-col">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm" aria-hidden="true">
                  AL
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-base">Son</p>
                  <div className="flex items-center space-x-1">
                    <MessageCircleHeart size={14} className="text-gray-500" aria-hidden="true" />
                    <p className="text-sm text-gray-600">Verified Reddit User</p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <Quote className="absolute -top-2 -left-2 text-gray-100 w-8 h-8 transform -scale-x-100" aria-hidden="true" />
                <p className="text-gray-700 leading-relaxed relative z-10 pl-2">
                  &quot;I had the idea and equipment to record conversations with my mum, but I kept putting it off. By the time I finally did it, she couldn&apos;t remember half the stories.&quot;
                </p>
              </div>
            </div>
          </div>

          {/* Early Adopter CTA Card */}
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 rounded-2xl p-8 md:p-12 border border-blue-100 text-center">
            <div className="inline-block bg-white p-3 rounded-full shadow-sm mb-4" aria-hidden="true">
              <Sparkles className="text-brand-blue" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-brand-dark mb-3">Join our Early Community</h3>
            <p className="text-gray-600 mb-8">Help us shape the future of memory preservation. Your feedback helps other families.</p>
            
            {storySubmitted ? (
              <div className="text-center py-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-green/10 mb-4">
                  <CheckCircle2 className="h-8 w-8 text-brand-green" strokeWidth={2} />
                </div>
                <p className="text-gray-700 font-medium text-lg">Thank you! We&apos;ll be in touch soon.</p>
              </div>
            ) : (
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={handleStorySubmit}>
                <label htmlFor="email-signup" className="sr-only">Your email address</label>
                <input 
                  id="email-signup"
                  type="email" 
                  placeholder="Your email address" 
                  value={storyEmail}
                  onChange={(e) => setStoryEmail(e.target.value)}
                  className="flex-grow px-5 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none"
                  required
                />
                <button type="submit" className="bg-brand-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue">
                  Share Your Story <ArrowRight size={18} aria-hidden="true" />
                </button>
              </form>
            )}
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
            Legacy Words is completely free for dementia families. No payment ever. No hidden fees. No catches.
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
              Everything you need to know about Legacy Words
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border border-gray-200 rounded-lg px-6 py-2 hover:border-brand-blue/30 transition-colors">
              <AccordionTrigger className="text-left font-semibold text-lg py-4">Is this a medical thing? Will it help with dementia?</AccordionTrigger>
              <AccordionContent className="text-base text-gray-700 leading-relaxed pb-4">
                No. Legacy Words isn&apos;t treatment or therapy (though many families find it therapeutic). It&apos;s simply a way to capture their story—who they are, what matters to them—while they can still tell you clearly. Think of it like recording a video before a surgery: it&apos;s not the surgery, but it matters to have it just in case. If you&apos;re looking for medical support, talk to your GP or contact the Alzheimer&apos;s Society. We&apos;re here to help with the human side: preserving their voice, their values, their essence.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border border-gray-200 rounded-lg px-6 py-2 hover:border-brand-blue/30 transition-colors">
              <AccordionTrigger className="text-left font-semibold text-lg py-4">My parent is in advanced dementia. Is it too late?</AccordionTrigger>
              <AccordionContent className="text-base text-gray-700 leading-relaxed pb-4">
                It depends. If they can still have conversations—even brief ones—it&apos;s never too late. You can work with them at their pace. But honestly? The best time is early on, when they&apos;re most clear. If you&apos;re just diagnosed, we&apos;d suggest starting soon while you can still hear their full stories. If you&apos;re further along, you can still use Legacy Words with family members telling stories *about* them. Not ideal, but something.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border border-gray-200 rounded-lg px-6 py-2 hover:border-brand-blue/30 transition-colors">
              <AccordionTrigger className="text-left font-semibold text-lg py-4">How long does this take? I&apos;m exhausted.</AccordionTrigger>
              <AccordionContent className="text-base text-gray-700 leading-relaxed pb-4">
                You don&apos;t have to do it all at once. Take a section, take a break. Some families finish in one afternoon. Others do it over weeks. Your pace. Their pace. No rush. The point isn&apos;t speed—it&apos;s preserving what matters.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border border-gray-200 rounded-lg px-6 py-2 hover:border-brand-blue/30 transition-colors">
              <AccordionTrigger className="text-left font-semibold text-lg py-4">Will my family actually use this, or will it just sit there?</AccordionTrigger>
              <AccordionContent className="text-base text-gray-700 leading-relaxed pb-4">
                Honest answer? Some families dive in immediately. Others don&apos;t look at it for months, until they need it. But here&apos;s what matters: when they DO need it—when grief is fresh, or when they&apos;re explaining Grandma to a child, or when they&apos;re planning the funeral—it&apos;s there. And it helps. We hear from families years later: &apos;I just rewatched their memories. I&apos;d forgotten how much they made me laugh.&apos; That&apos;s why we do this.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border border-gray-200 rounded-lg px-6 py-2 hover:border-brand-blue/30 transition-colors">
              <AccordionTrigger className="text-left font-semibold text-lg py-4">Is my data really private?</AccordionTrigger>
              <AccordionContent className="text-base text-gray-700 leading-relaxed pb-4">
                Yes. Bank-level encryption. Your stories never leave our UK servers. We don&apos;t sell data. We don&apos;t share it. We don&apos;t even read it unless something goes wrong technically. You control exactly who sees what. You can delete everything anytime. Full GDPR compliant.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6" className="border border-gray-200 rounded-lg px-6 py-2 hover:border-brand-blue/30 transition-colors">
              <AccordionTrigger className="text-left font-semibold text-lg py-4">What happens if they pass away while we&apos;re using it?</AccordionTrigger>
              <AccordionContent className="text-base text-gray-700 leading-relaxed pb-4">
                Their stories stay safe. Forever. Family members you&apos;ve invited keep access. You can download everything. Years later, you can come back. Your memories don&apos;t disappear. That&apos;s the point.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7" className="border border-gray-200 rounded-lg px-6 py-2 hover:border-brand-blue/30 transition-colors">
              <AccordionTrigger className="text-left font-semibold text-lg py-4">Will this always be free?</AccordionTrigger>
              <AccordionContent className="text-base text-gray-700 leading-relaxed pb-4">
                Yes. Legacy Words is completely free for dementia families. Always will be. No payment ever. No hidden fees. No catches. We believe preserving memories shouldn&apos;t cost anything—especially when families are already dealing with so much.
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
              <h3 className="font-semibold mb-4">Legacy Words</h3>
              <p className="text-base text-gray-700 leading-relaxed">
                Legacy Words helps dementia families preserve what matters before memories fade. Free, private, forever.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Links</h4>
              <ul className="space-y-2 text-base">
                <li>
                  <Link href="/privacy" className="text-gray-700 hover:text-gray-900">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-700 hover:text-gray-900">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-700 hover:text-gray-900">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-base">
                <li>
                  <a href="#" className="text-gray-700 hover:text-gray-900">Dementia awareness</a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-gray-900">Alzheimer&apos;s Society</a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-gray-900">Family support groups</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-base text-gray-700 mb-2 leading-relaxed">Get tips for dementia conversations and memory preservation</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-base"
                />
                <Button size="sm">Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-base text-gray-700">
            © 2025 Legacy Words. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
