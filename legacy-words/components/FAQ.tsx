import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQItem } from '../types';

const faqData: FAQItem[] = [
  {
    question: "Is this a medical thing? Will it help with dementia?",
    answer: "No. Legacy Words isn't treatment or therapy (though many families find it therapeutic). It's simply a way to capture their story—who they are, what matters to them—while they can still tell you clearly. Think of it like recording a video before a surgery: it's not the surgery, but it matters to have it just in case. If you're looking for medical support, talk to your GP or contact the Alzheimer's Society."
  },
  {
    question: "My parent is in advanced dementia. Is it too late?",
    answer: "It depends. If they can still have conversations—even brief ones—it's never too late. You can work with them at their pace. But honestly? The best time is early on, when they're most clear. If you're just diagnosed, we'd suggest starting soon while you can still hear their full stories. If you're further along, you can still use Legacy Words with family members telling stories *about* them."
  },
  {
    question: "How long does this take? I'm exhausted.",
    answer: "You don't have to do it all at once. Take a section, take a break. Some families finish in one afternoon. Others do it over weeks. Your pace. Their pace. No rush. The point isn't speed—it's preserving what matters."
  },
  {
    question: "Will my family actually use this, or will it just sit there?",
    answer: "Honest answer? Some families dive in immediately. Others don't look at it for months, until they need it. But here's what matters: when they DO need it—when grief is fresh, or when they're explaining Grandma to a child, or when they're planning the funeral—it's there. And it helps."
  },
  {
    question: "Is my data really private?",
    answer: "Yes. Bank-level encryption. Your stories never leave our UK servers. We don't sell data. We don't share it. We don't even read it unless something goes wrong technically. You control exactly who sees what. You can delete everything anytime."
  },
  {
    question: "What happens if they pass away while we're using it?",
    answer: "Their stories stay safe. Forever. Family members you've invited keep access. You can download everything. Years later, you can come back. Your memories don't disappear. That's the point."
  },
  {
    question: "Will this always be free?",
    answer: "Yes. Legacy Words is completely free for dementia families. Always will be. No payment ever. No hidden fees. No catches. We believe preserving memories shouldn't cost anything—especially when families are already dealing with so much."
  }
];

const FAQItemComponent: React.FC<{ item: FAQItem; index: number }> = ({ item, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = `faq-content-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden hover:border-brand-blue/30 transition-colors">
      <h3>
        <button 
          id={buttonId}
          className="w-full flex justify-between items-center p-6 text-left focus:outline-none focus:bg-gray-50 focus:ring-2 focus:ring-inset focus:ring-brand-blue"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={contentId}
        >
          <span className="text-lg font-semibold text-brand-dark pr-4">{item.question}</span>
          {isOpen ? <ChevronUp className="text-brand-blue min-w-[20px]" aria-hidden="true" /> : <ChevronDown className="text-gray-400 min-w-[20px]" aria-hidden="true" />}
        </button>
      </h3>
      
      <div 
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
        className={`${isOpen ? 'block' : 'hidden'} px-6 pb-6 animate-fadeIn`}
      >
        <p className="text-gray-600 leading-relaxed">{item.answer}</p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-24 md:py-32 bg-white" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="faq-heading" className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">Questions? We Have Answers</h2>
          <p className="text-lg text-gray-600">Everything you need to know about Legacy Words</p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <FAQItemComponent key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;