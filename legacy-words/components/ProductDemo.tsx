import React from 'react';
import { FileText, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

const ProductDemo: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-blue-50/50 overflow-hidden" aria-label="Product Demo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">
              We guide the conversation, you capture the magic.
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Starting is the hardest part. We provide the questions, so you don't have to worry about what to ask. Just sit, talk, and preserve their answers.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-brand-blue/10 p-2 rounded-lg mt-1" aria-hidden="true">
                  <div className="w-6 h-6 flex items-center justify-center text-brand-blue font-bold">1</div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Open a category</h3>
                  <p className="text-sm text-gray-600">From "Happy Memories" to "Life Lessons", we break it down into small steps.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-brand-blue/10 p-2 rounded-lg mt-1" aria-hidden="true">
                  <div className="w-6 h-6 flex items-center justify-center text-brand-blue font-bold">2</div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Ask the question</h3>
                  <p className="text-sm text-gray-600">Read the prompt aloud. It's designed to spark stories, not just "yes/no" answers.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-brand-blue/10 p-2 rounded-lg mt-1" aria-hidden="true">
                  <div className="w-6 h-6 flex items-center justify-center text-brand-blue font-bold">3</div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Save their words</h3>
                  <p className="text-sm text-gray-600">Type their answer or use your phone's dictation. Their legacy is safe forever.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Mockup - Hidden from screen readers as it's visual representation of text content */}
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
                <div className="h-12 w-full flex justify-between items-end px-6 pb-2 text-xs font-medium text-gray-500 bg-white">
                  <span>9:41</span>
                  <div className="flex space-x-1">
                    <div className="w-4 h-3 bg-gray-300 rounded-sm"></div>
                    <div className="w-4 h-3 bg-gray-800 rounded-sm"></div>
                  </div>
                </div>

                {/* App Header */}
                <div className="px-6 py-4 flex justify-between items-center bg-white border-b border-gray-100">
                  <span className="font-bold text-brand-blue">Legacy Words</span>
                  <span className="text-xs text-gray-400 font-mono">12/32</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 h-1">
                  <div className="bg-brand-blue h-1 w-[35%]"></div>
                </div>

                {/* Main Content */}
                <div className="flex-1 px-6 py-8 overflow-hidden">
                  
                  {/* Card */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-full flex flex-col">
                    
                    <div className="mb-6">
                      <div className="flex items-center space-x-2 mb-4">
                         <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-brand-blue text-xs font-bold">1</span>
                         <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Memories That Matter</span>
                      </div>
                      
                      <h4 className="text-xl font-bold text-gray-900 leading-snug mb-2">
                        What's the happiest memory you have?
                      </h4>
                      <p className="text-sm text-gray-500 italic">
                        "A moment, a day, a time that brings you joy when you think about it..."
                      </p>
                    </div>

                    {/* Text Input Mock */}
                    <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 p-4 mb-4 relative">
                      <p className="text-gray-800 text-lg font-serif leading-relaxed">
                        "It was the summer of 1965. We took that old Ford Anglia down to Cornwall. The engine overheated twice, but we just laughed..."
                      </p>
                      <div className="w-0.5 h-5 bg-brand-blue animate-pulse inline-block ml-1 align-middle"></div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between pt-2">
                       <span className="text-xs text-gray-400">24 words</span>
                       <button className="bg-brand-blue text-white rounded-lg p-3 shadow-lg hover:bg-blue-800 transition-colors">
                         <ChevronRight size={20} />
                       </button>
                    </div>

                  </div>

                </div>

                {/* Bottom Nav Mock */}
                <div className="h-16 bg-white border-t border-gray-200 flex justify-around items-center px-6">
                   <div className="text-brand-blue"><FileText size={24} /></div>
                   <div className="text-gray-300"><Sparkles size={24} /></div>
                   <div className="text-gray-300"><CheckCircle2 size={24} /></div>
                </div>

              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ProductDemo;