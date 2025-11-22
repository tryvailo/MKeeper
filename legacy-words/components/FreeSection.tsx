import React from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

const FreeSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center p-6 bg-brand-green/10 rounded-full mb-8">
          <CheckCircle2 className="text-brand-green w-20 h-20" strokeWidth={1.5} />
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
          Basic features are free forever.
        </h2>
        
        <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
          Every family deserves to preserve their history. The core memory recording tools are completely free for dementia families.
        </p>
        
        <div className="flex items-center justify-center space-x-2 mb-10 text-sm text-gray-500 bg-white inline-block px-4 py-2 rounded-full border border-gray-200 shadow-sm">
          <ShieldCheck size={16} className="text-gray-400" />
          <span>We do not sell your data. Your privacy is our priority.</span>
        </div>

        <button className="bg-brand-blue text-white text-lg md:text-xl font-bold px-12 py-6 rounded-full shadow-xl hover:bg-blue-800 hover:shadow-2xl transition-all transform hover:-translate-y-1">
          Start Remembering
        </button>
      </div>
    </section>
  );
};

export default FreeSection;