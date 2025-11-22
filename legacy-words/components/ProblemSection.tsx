import React from 'react';
import { Brain, Heart, Hourglass } from 'lucide-react';
import { ProblemCardProps } from '../types';

const ProblemCard: React.FC<ProblemCardProps> = ({ title, description, Icon }) => (
  <div className="bg-white p-8 rounded-xl border-2 border-gray-100 hover:border-brand-blue/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
    <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-6" aria-hidden="true">
      <Icon className="text-brand-blue" size={32} />
    </div>
    <h3 className="text-xl font-bold text-brand-dark mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">
      {description}
    </p>
  </div>
);

const ProblemSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-white" aria-labelledby="problem-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="problem-heading" className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">Why Legacy Words?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The problem is real. The solution is simple.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          <ProblemCard 
            Icon={Brain}
            title="Their memories are slipping away"
            description="As dementia progresses, so much is lost. Their stories, their laugh, what made them *them*. It is vital to capture these unique personality traits while they are still here. You can save those things. Before it's too late."
          />
          <ProblemCard 
            Icon={Heart}
            title="Not just facts. Their *why*."
            description="It is not enough to just know the facts of their life. It is about capturing their core values and what truly defined them as a person. Move beyond superficial details to preserve their essence, their beliefs, and the 'why' behind the life they lived."
          />
          <ProblemCard 
            Icon={Hourglass}
            title="The time to capture this is now"
            description="In the early stages of dementia, they can still tell their stories clearly. In a year or two, that might not be true. This is your chance."
          />
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;