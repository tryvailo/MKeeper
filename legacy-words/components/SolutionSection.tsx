import React from 'react';
import { BookOpen, Eye, Lock } from 'lucide-react';
import { StepProps } from '../types';

const StepCard: React.FC<StepProps> = ({ number, title, subtitle, description, Icon }) => (
  <div className="group relative bg-white p-8 pt-12 rounded-2xl shadow-sm border border-gray-200 flex flex-col items-start h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <div className="absolute -top-6 left-8 w-12 h-12 bg-brand-blue text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg border-4 border-gray-50 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-700" aria-hidden="true">
      {number}
    </div>
    <div className="mb-6 p-4 bg-blue-50 rounded-xl inline-block transition-all duration-300 group-hover:bg-blue-100 group-hover:scale-105 group-hover:shadow-md" aria-hidden="true">
      <Icon className="text-brand-blue transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" size={32} />
    </div>
    <h3 className="text-2xl font-bold text-brand-dark mb-1">{title}</h3>
    <span className="text-sm font-semibold text-brand-blue uppercase tracking-wider mb-4 block">{subtitle}</span>
    <p className="text-gray-600 leading-relaxed">
      {description}
    </p>
  </div>
);

const SolutionSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white" aria-labelledby="solution-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 id="solution-heading" className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">How it works in 3 steps</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple, guided, and designed with dementia families in mind.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          <StepCard
            number={1}
            Icon={BookOpen}
            title="Help them tell their story"
            subtitle="In their own words"
            description="Legacy Words guides them through 32 guided questions. Not clinical. Not scary. Just a conversation: 'What's your happiest memory?' 'Who means the most to you?' It's therapy. It's love."
          />
          <StepCard
            number={2}
            Icon={Eye}
            title="Your family sees them clearly"
            subtitle="Understanding, not just info"
            description="Share access with their children, spouse, or whoever needs to understand them. They can read at their own pace, comment, and feel connected. It's like having one more conversation together."
          />
          <StepCard
            number={3}
            Icon={Lock}
            title="Their voice stays forever"
            subtitle="Permanently preserved"
            description="Encrypted, secure, always accessible. Years from now, when grief is less fresh, your family can revisit these memories. They can play them for grandchildren. They can remember."
          />
        </div>

        <div className="text-center">
          <button className="bg-brand-blue text-white text-lg md:text-xl font-bold px-12 py-6 rounded-full shadow-xl hover:bg-blue-800 hover:shadow-2xl transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-300">
            Help Them Remember Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;