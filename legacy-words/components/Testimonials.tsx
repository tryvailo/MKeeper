import React from 'react';
import { Sparkles, ArrowRight, Quote, MessageCircleHeart } from 'lucide-react';
import { TestimonialProps } from '../types';

const TestimonialCard: React.FC<TestimonialProps & { initials: string; color: string }> = ({ quote, author, source, initials, color }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 h-full flex flex-col">
    <div className="flex items-center space-x-3 mb-6">
      <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white font-bold text-sm`} aria-hidden="true">
        {initials}
      </div>
      <div>
        <p className="font-bold text-gray-900 text-sm">{author}</p>
        <div className="flex items-center space-x-1">
          <MessageCircleHeart size={12} className="text-gray-400" aria-hidden="true" />
          <p className="text-xs text-gray-500">{source}</p>
        </div>
      </div>
    </div>
    
    <div className="relative">
      <Quote className="absolute -top-2 -left-2 text-gray-100 w-8 h-8 transform -scale-x-100" aria-hidden="true" />
      <p className="text-gray-700 leading-relaxed relative z-10 pl-2">
        "{quote}"
      </p>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  return (
    <section id="stories" className="py-24 md:py-32 bg-white" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Quote - Redesigned to be more 'editorial' */}
        <div className="max-w-4xl mx-auto mb-24">
           <div className="bg-[#FDFBF7] p-10 md:p-14 rounded-3xl border border-orange-100/50 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" aria-hidden="true"></div>
            <div className="relative z-10 text-center">
              <blockquote className="text-2xl md:text-3xl font-medium text-brand-dark leading-relaxed mb-8 font-serif italic">
                "My biggest regret is not recording a conversation with my grandma before she passed... now it is so hard to remember the person she was."
              </blockquote>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center text-white font-bold" aria-hidden="true">
                  CG
                </div>
                <div className="text-left">
                  <p className="font-bold text-brand-dark">Caregiver</p>
                  <p className="text-sm text-gray-500">via Reddit r/AskOldPeopleAdvice</p>
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
          <TestimonialCard 
            initials="JD"
            color="bg-emerald-500"
            quote="I wish I would have saved more voicemails, took more video... because now it is so hard to remember the man he was before the dementia."
            author="Family Caregiver"
            source="Verified Reddit User"
          />
          <TestimonialCard 
            initials="MK"
            color="bg-blue-500"
            quote="I wish I had asked my parents more about their lives, their stories, what mattered to them. Now it's too late and I'm left with just fragments."
            author="Daughter"
            source="Verified Reddit User"
          />
          <TestimonialCard 
            initials="AL"
            color="bg-indigo-500"
            quote="I had the idea and equipment to record conversations with my mum, but I kept putting it off. By the time I finally did it, she couldn't remember half the stories."
            author="Son"
            source="Verified Reddit User"
          />
        </div>

        {/* Early Adopter CTA Card */}
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 rounded-2xl p-8 md:p-12 border border-blue-100 text-center">
          <div className="inline-block bg-white p-3 rounded-full shadow-sm mb-4" aria-hidden="true">
            <Sparkles className="text-brand-blue" size={28} />
          </div>
          <h3 className="text-2xl font-bold text-brand-dark mb-3">Join our Early Community</h3>
          <p className="text-gray-600 mb-8">Help us shape the future of memory preservation. Your feedback helps other families.</p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="email-signup" className="sr-only">Your email address</label>
            <input 
              id="email-signup"
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-5 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none"
              required
            />
            <button className="bg-brand-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue">
              Share Your Story <ArrowRight size={18} aria-hidden="true" />
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;