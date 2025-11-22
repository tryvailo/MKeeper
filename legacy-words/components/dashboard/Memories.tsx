import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Save, CheckCircle } from 'lucide-react';
import { DashboardView } from '../../types';

interface MemoriesProps {
  onChangeView: (view: DashboardView) => void;
}

const categories = [
  { id: 1, name: "Memories That Matter", description: "Warm up with happy moments" },
  { id: 2, name: "Family & Relationships", description: "The people who made you who you are" },
  { id: 3, name: "Values & Wisdom", description: "Lessons learned along the way" },
  { id: 4, name: "Interests & Personality", description: "What brings you joy" },
  { id: 5, name: "Messages for Loved Ones", description: "Words for the future" },
];

const allQuestions = [
  // Category 1: Memories That Matter
  { id: 'happiest_memory', categoryId: 1, text: "What's the happiest memory you have?", placeholder: "A moment, a day, a time that brings you joy when you think about it..." },
  { id: 'favorite_trip', categoryId: 1, text: "Tell me about a vacation or trip you loved", placeholder: "Where did you go? Who were you with? What made it special?" },
  { id: 'unforgettable_day', categoryId: 1, text: "Describe a day you'll never forget", placeholder: "What happened? Why does it stand out in your memory?" },
  { id: 'proudest_moment', categoryId: 1, text: "A time you felt most proud of yourself", placeholder: "What did you accomplish? How did it make you feel?" },
  { id: 'biggest_laugh', categoryId: 1, text: "What made you laugh the most in life?", placeholder: "A joke, a moment, a person who always made you smile..." },
  { id: 'loved_moment', categoryId: 1, text: "A moment when you felt truly loved", placeholder: "When did you feel most loved? Who made you feel that way?" },
  { id: 'best_friend', categoryId: 1, text: "Your best friend — tell me about them", placeholder: "Who is or was your best friend? What makes them special?" },
  { id: 'overcame_difficulty', categoryId: 1, text: "A time you overcame something difficult", placeholder: "What challenge did you face? How did you get through it?" },

  // Category 2: Family & Relationships
  { id: 'met_partner', categoryId: 2, text: "How did you meet your partner/spouse?", placeholder: "Tell us the story of how you met. What was it like?" },
  { id: 'children_young', categoryId: 2, text: "Tell me about your children when they were young", placeholder: "What were they like? What memories do you have of them growing up?" },
  { id: 'funny_family_moment', categoryId: 2, text: "A funny family moment you remember", placeholder: "A time your family laughed together. What happened?" },
  { id: 'passed_to_children', categoryId: 2, text: "The most important thing you've passed on to your children", placeholder: "Values, lessons, traditions, anything you've taught them..." },
  { id: 'relationship_parents', categoryId: 2, text: "Your relationship with your own parents", placeholder: "What was your relationship like? What did you learn from them?" },
  { id: 'family_together', categoryId: 2, text: "A time your family came together", placeholder: "When did your family unite? What brought you all together?" },

  // Category 3: Values & Wisdom
  { id: 'matters_most', categoryId: 3, text: "What matters most to you in life?", placeholder: "What are your core values? What do you hold dear?" },
  { id: 'most_proud', categoryId: 3, text: "What are you most proud of?", placeholder: "An achievement, a quality, something you've done..." },
  { id: 'life_lessons', categoryId: 3, text: "Life lessons you'd share with young people", placeholder: "What wisdom would you pass on? What have you learned?" },
  { id: 'brings_peace', categoryId: 3, text: "What brings you peace?", placeholder: "What calms you? What gives you comfort?" },
  { id: 'how_remembered', categoryId: 3, text: "How do you want to be remembered?", placeholder: "What legacy do you want to leave? How should people think of you?" },
  { id: 'regret_not_telling', categoryId: 3, text: "What would you regret not telling your family?", placeholder: "Something important you want them to know. A truth, a feeling..." },
  { id: 'greatest_strength', categoryId: 3, text: "Your greatest strength", placeholder: "What are you good at? What makes you strong?" },
  { id: 'love_means', categoryId: 3, text: "What does love mean to you?", placeholder: "How do you define love? What has it taught you?" },

  // Category 4: Interests & Personality
  { id: 'favorite_hobbies', categoryId: 4, text: "What are your favorite hobbies?", placeholder: "What do you enjoy doing? What activities bring you joy?" },
  { id: 'important_people', categoryId: 4, text: "People who are most important to you", placeholder: "Who matters most in your life? Why are they special?" },
  { id: 'places_love', categoryId: 4, text: "Places you love", placeholder: "Where do you feel most at home? What places hold special meaning?" },
  { id: 'favorite_things', categoryId: 4, text: "Your favorite things to do", placeholder: "What brings you happiness? What do you look forward to?" },
  { id: 'personality', categoryId: 4, text: "How would you describe your personality?", placeholder: "What are you like? How would others describe you?" },

  // Category 5: Messages for Loved Ones
  { id: 'message_children', categoryId: 5, text: "A message for your children", placeholder: "What you're proud of them for. What you hope for them. A memory you treasure..." },
  { id: 'message_spouse', categoryId: 5, text: "A message for your spouse/partner", placeholder: "What your relationship has meant. A memory. Something you want them to remember..." },
  { id: 'message_grandchildren', categoryId: 5, text: "A message for your grandchildren", placeholder: "Something you want them to know. A story. Advice. A memory you share..." },
  { id: 'message_family', categoryId: 5, text: "Something you want your family to know", placeholder: "Anything else important. A truth, a feeling, something you want them to understand..." },
  { id: 'message_other', categoryId: 5, text: "Anything else you'd like to say?", placeholder: "For friends, other family members, anyone else who matters..." },
];

const Memories: React.FC<MemoriesProps> = ({ onChangeView }) => {
  const [activeCategoryId, setActiveCategoryId] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [completedCategories, setCompletedCategories] = useState<number[]>([]);

  const currentQuestions = allQuestions.filter(q => q.categoryId === activeCategoryId);
  const currentCategory = categories.find(c => c.id === activeCategoryId);

  // Calculate progress
  const totalQuestions = allQuestions.length;
  const answeredCount = Object.values(answers).filter(a => a.trim().length > 10).length;
  const totalProgress = Math.round((answeredCount / totalQuestions) * 100);

  const handleTextChange = (id: string, text: string) => {
    setAnswers(prev => ({ ...prev, [id]: text }));
  };

  const handleNext = () => {
    if (activeCategoryId < categories.length) {
      setActiveCategoryId(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      // Finished
      onChangeView('home');
    }
  };

  const handlePrev = () => {
    if (activeCategoryId > 1) {
      setActiveCategoryId(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const getCategoryStatus = (catId: number) => {
    if (catId === activeCategoryId) return 'current';
    // Check if category has at least one answer to consider it "started" or check completion logic
    // For now, simple logic based on active step
    if (catId < activeCategoryId) return 'complete';
    return 'pending';
  };

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => onChangeView('home')}
          className="mr-4 text-gray-500 hover:text-brand-blue transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-3xl font-bold text-brand-dark">Complete Your Story</h2>
      </div>

      {/* Progress Steps */}
      <div className="mb-10">
        <div className="flex justify-between mb-2">
          {categories.map((cat) => {
            const status = getCategoryStatus(cat.id);
            return (
              <div key={cat.id} 
                onClick={() => setActiveCategoryId(cat.id)}
                className="flex flex-col items-center cursor-pointer group w-1/5"
              >
                <span className={`mb-2 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                  status === 'complete' ? 'bg-brand-blue border-brand-blue text-white' :
                  status === 'current' ? 'bg-white border-brand-blue text-brand-blue' :
                  'bg-white border-gray-200 text-gray-400 group-hover:border-gray-300'
                }`}>
                  {status === 'complete' ? <CheckCircle size={16} /> : cat.id}
                </span>
                <span className={`hidden md:block text-xs font-medium text-center ${status === 'current' ? 'text-brand-blue' : 'text-gray-500'}`}>
                  {cat.name}
                </span>
              </div>
            );
          })}
        </div>
        <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden mt-4">
          <div 
            className="bg-brand-blue h-full transition-all duration-500 ease-out" 
            style={{ width: `${totalProgress}%` }}
          ></div>
        </div>
        <div className="text-right text-xs text-gray-500 mt-1">
          {answeredCount} of {totalQuestions} questions answered
        </div>
      </div>

      {/* Category Header */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900">{currentCategory?.name}</h3>
        <p className="text-gray-500">{currentCategory?.description}</p>
      </div>

      {/* Questions List */}
      <div className="space-y-8">
        {currentQuestions.map((q) => (
          <div key={q.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900 leading-relaxed pr-4">
                {q.text}
              </h3>
              {/* Status Indicator */}
              {(!answers[q.id] || answers[q.id].length < 10) ? (
                 <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600 whitespace-nowrap">
                   Not answered yet
                 </span>
              ) : (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-50 text-green-700 whitespace-nowrap">
                   Saved
                 </span>
              )}
            </div>

            <div className="relative">
              <textarea
                className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none min-h-[120px] text-gray-700 leading-relaxed resize-y"
                placeholder={q.placeholder}
                value={answers[q.id] || ''}
                onChange={(e) => handleTextChange(q.id, e.target.value)}
              ></textarea>
              
              <div className="absolute bottom-4 right-4 text-xs text-gray-400 bg-white/80 backdrop-blur-sm px-2 py-1 rounded pointer-events-none">
                {(answers[q.id] || '').split(/\s+/).filter(w => w.length > 0).length} words
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="mt-10 flex justify-between items-center border-t border-gray-200 pt-6">
        <button 
          onClick={handlePrev}
          disabled={activeCategoryId === 1}
          className={`px-6 py-3 font-medium flex items-center gap-2 ${activeCategoryId === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-gray-900'}`}
        >
          <ChevronLeft size={18} /> Previous Category
        </button>
        <div className="flex space-x-4">
          <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Save size={18} /> Save Draft
          </button>
          <button 
            onClick={handleNext}
            className="px-8 py-3 bg-brand-blue text-white font-bold rounded-lg hover:bg-blue-800 shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            {activeCategoryId === categories.length ? 'Finish & Return' : 'Next Category'} <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Memories;