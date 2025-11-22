import React from 'react';
import { CheckCircle2, Heart, Shield } from 'lucide-react';

const Hero: React.FC = () => {
  return (
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
          <button className="bg-brand-blue text-white text-lg md:text-xl font-bold px-10 py-5 rounded-full shadow-xl hover:bg-blue-800 hover:shadow-2xl transition-all transform hover:-translate-y-1 w-full md:w-auto ring-4 ring-blue-100/50">
            Start Remembering
          </button>
          <p className="text-sm md:text-base text-gray-500 font-medium">
            Completely free • Takes 35-40 minutes • Your family will treasure this forever
          </p>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-6 md:gap-12">
          <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-green-100 shadow-sm">
            <CheckCircle2 className="text-brand-green" size={20} />
            <span className="text-sm font-semibold text-gray-700">Trusted by 200+ families</span>
          </div>
          
          <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-green-100 shadow-sm">
            <Heart className="text-brand-green" size={20} />
            <span className="text-sm font-semibold text-gray-700">Alzheimer's Society recommended</span>
          </div>

          <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-green-100 shadow-sm">
            <Shield className="text-brand-green" size={20} />
            <span className="text-sm font-semibold text-gray-700">Bank-level encryption</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;