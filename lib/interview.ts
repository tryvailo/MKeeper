// Memory Keeper: Guided Interview Structure (32 questions, 5 categories)
// Based on Memory-Keeper-Strategy-2025.md

export type InterviewStep = 1 | 2 | 3 | 4 | 5 | 6;

export interface InterviewCategory {
  step: InterviewStep;
  title: string;
  englishTitle: string;
  duration: number; // minutes
  questionCount: number;
  psychology: string;
  questions: InterviewQuestion[];
}

export interface InterviewQuestion {
  id: string;
  text: string;
  fieldName: string;
  placeholder?: string;
  required: boolean;
  minLength: number;
  rows?: number;
}

export interface MemoryResponse {
  questionId: string;
  fieldName: string;
  answer: string;
  wordCount: number;
  answeredAt: string;
}

export interface InterviewProgress {
  userId: string;
  currentStep: InterviewStep;
  completedSteps: InterviewStep[];
  responses: MemoryResponse[];
  startedAt: string;
  lastUpdatedAt: string;
  totalTimeSpent: number; // seconds
  totalWordCount: number;
}

// Interview Structure: 5 Categories + Review (Step 6)
export const INTERVIEW_CATEGORIES: InterviewCategory[] = [
  {
    step: 1,
    title: "Memories That Matter",
    englishTitle: "Memories That Matter",
    duration: 8,
    questionCount: 8,
    psychology: "Warm up, get comfortable",
    questions: [
      {
        id: "life_1",
        text: "What's the happiest memory you have?",
        fieldName: "happiest_memory",
        placeholder: "A moment, a day, a time that brings you joy when you think about it...",
        required: true,
        minLength: 10,
        rows: 4,
      },
      {
        id: "life_2",
        text: "Tell me about a vacation or trip you loved",
        fieldName: "favorite_trip",
        placeholder: "Where did you go? Who were you with? What made it special?",
        required: true,
        minLength: 10,
        rows: 4,
      },
      {
        id: "life_3",
        text: "Describe a day you'll never forget",
        fieldName: "unforgettable_day",
        placeholder: "What happened? Why does it stand out in your memory?",
        required: true,
        minLength: 10,
        rows: 4,
      },
      {
        id: "life_4",
        text: "A time you felt most proud of yourself",
        fieldName: "proudest_moment",
        placeholder: "What did you accomplish? How did it make you feel?",
        required: true,
        minLength: 10,
        rows: 4,
      },
      {
        id: "life_5",
        text: "What made you laugh the most in life?",
        fieldName: "biggest_laugh",
        placeholder: "A joke, a moment, a person who always made you smile...",
        required: true,
        minLength: 10,
        rows: 4,
      },
      {
        id: "life_6",
        text: "A moment when you felt truly loved",
        fieldName: "loved_moment",
        placeholder: "When did you feel most loved? Who made you feel that way?",
        required: true,
        minLength: 10,
        rows: 4,
      },
      {
        id: "life_7",
        text: "Your best friend — tell me about them",
        fieldName: "best_friend",
        placeholder: "Who is or was your best friend? What makes them special?",
        required: true,
        minLength: 10,
        rows: 4,
      },
      {
        id: "life_8",
        text: "A time you overcame something difficult",
        fieldName: "overcame_difficulty",
        placeholder: "What challenge did you face? How did you get through it?",
        required: true,
        minLength: 10,
        rows: 4,
      },
    ],
  },
  {
    step: 2,
    title: "Family & Relationships",
    englishTitle: "Family & Relationships",
    duration: 6,
    questionCount: 6,
    psychology: "Natural transition",
    questions: [
      {
        id: "family_1",
        text: "How did you meet your partner/spouse?",
        fieldName: "met_partner",
        placeholder: "Tell us the story of how you met. What was it like?",
        required: true,
        minLength: 10,
        rows: 4,
      },
      {
        id: "family_2",
        text: "Tell me about your children when they were young",
        fieldName: "children_young",
        placeholder: "What were they like? What memories do you have of them growing up?",
        required: true,
        minLength: 10,
        rows: 4,
      },
      {
        id: "family_3",
        text: "A funny family moment you remember",
        fieldName: "funny_family_moment",
        placeholder: "A time your family laughed together. What happened?",
        required: true,
        minLength: 10,
        rows: 4,
      },
      {
        id: "family_4",
        text: "The most important thing you've passed on to your children",
        fieldName: "passed_to_children",
        placeholder: "Values, lessons, traditions, anything you've taught them...",
        required: true,
        minLength: 10,
        rows: 4,
      },
      {
        id: "family_5",
        text: "Your relationship with your own parents",
        fieldName: "relationship_parents",
        placeholder: "What was your relationship like? What did you learn from them?",
        required: true,
        minLength: 10,
        rows: 4,
      },
      {
        id: "family_6",
        text: "A time your family came together",
        fieldName: "family_together",
        placeholder: "When did your family unite? What brought you all together?",
        required: true,
        minLength: 10,
        rows: 4,
      },
    ],
  },
  {
    step: 3,
    title: "Values & Wisdom",
    englishTitle: "Values & Wisdom",
    duration: 8,
    questionCount: 8,
    psychology: "Go deep",
    questions: [
      {
        id: "values_1",
        text: "What matters most to you in life?",
        fieldName: "matters_most",
        placeholder: "What are your core values? What do you hold dear?",
        required: true,
        minLength: 10,
        rows: 4,
      },
      {
        id: "values_2",
        text: "What are you most proud of?",
        fieldName: "most_proud",
        placeholder: "An achievement, a quality, something you've done...",
        required: true,
        minLength: 10,
        rows: 4,
      },
      {
        id: "values_3",
        text: "Life lessons you'd share with young people",
        fieldName: "life_lessons",
        placeholder: "What wisdom would you pass on? What have you learned?",
        required: true,
        minLength: 10,
        rows: 4,
      },
      {
        id: "values_4",
        text: "What brings you peace?",
        fieldName: "brings_peace",
        placeholder: "What calms you? What gives you comfort?",
        required: true,
        minLength: 10,
        rows: 4,
      },
      {
        id: "values_5",
        text: "How do you want to be remembered?",
        fieldName: "how_remembered",
        placeholder: "What legacy do you want to leave? How should people think of you?",
        required: true,
        minLength: 10,
        rows: 4,
      },
      {
        id: "values_6",
        text: "What would you regret not telling your family?",
        fieldName: "regret_not_telling",
        placeholder: "Something important you want them to know. A truth, a feeling...",
        required: true,
        minLength: 10,
        rows: 4,
      },
      {
        id: "values_7",
        text: "Your greatest strength",
        fieldName: "greatest_strength",
        placeholder: "What are you good at? What makes you strong?",
        required: true,
        minLength: 10,
        rows: 4,
      },
      {
        id: "values_8",
        text: "What does love mean to you?",
        fieldName: "love_means",
        placeholder: "How do you define love? What has it taught you?",
        required: true,
        minLength: 10,
        rows: 4,
      },
    ],
  },
  {
    step: 4,
    title: "Interests & Personality",
    englishTitle: "Interests & Personality",
    duration: 5,
    questionCount: 5,
    psychology: "Light relief",
    questions: [
      {
        id: "interests_1",
        text: "What are your favorite hobbies?",
        fieldName: "favorite_hobbies",
        placeholder: "What do you enjoy doing? What activities bring you joy?",
        required: true,
        minLength: 10,
        rows: 3,
      },
      {
        id: "interests_2",
        text: "People who are most important to you",
        fieldName: "important_people",
        placeholder: "Who matters most in your life? Why are they special?",
        required: true,
        minLength: 10,
        rows: 3,
      },
      {
        id: "interests_3",
        text: "Places you love",
        fieldName: "places_love",
        placeholder: "Where do you feel most at home? What places hold special meaning?",
        required: true,
        minLength: 10,
        rows: 3,
      },
      {
        id: "interests_4",
        text: "Your favorite things to do",
        fieldName: "favorite_things",
        placeholder: "What brings you happiness? What do you look forward to?",
        required: true,
        minLength: 10,
        rows: 3,
      },
      {
        id: "interests_5",
        text: "How would you describe your personality?",
        fieldName: "personality",
        placeholder: "What are you like? How would others describe you?",
        required: true,
        minLength: 10,
        rows: 3,
      },
    ],
  },
  {
    step: 5,
    title: "Messages for Loved Ones",
    englishTitle: "Messages for Loved Ones",
    duration: 10,
    questionCount: 5,
    psychology: "Emotional crescendo",
    questions: [
      {
        id: "messages_1",
        text: "A message for your children",
        fieldName: "message_children",
        placeholder: "What you're proud of them for. What you hope for them. A memory you treasure...",
        required: true,
        minLength: 10,
        rows: 5,
      },
      {
        id: "messages_2",
        text: "A message for your spouse/partner",
        fieldName: "message_spouse",
        placeholder: "What your relationship has meant. A memory. Something you want them to remember...",
        required: true,
        minLength: 10,
        rows: 5,
      },
      {
        id: "messages_3",
        text: "A message for your grandchildren",
        fieldName: "message_grandchildren",
        placeholder: "Something you want them to know. A story. Advice. A memory you share...",
        required: true,
        minLength: 10,
        rows: 5,
      },
      {
        id: "messages_4",
        text: "Something you want your family to know",
        fieldName: "message_family",
        placeholder: "Anything else important. A truth, a feeling, something you want them to understand...",
        required: true,
        minLength: 10,
        rows: 5,
      },
      {
        id: "messages_5",
        text: "Anything else you'd like to say?",
        fieldName: "message_other",
        placeholder: "For friends, other family members, anyone else who matters...",
        required: true,
        minLength: 10,
        rows: 5,
      },
    ],
  },
];

// Helper functions
export function getCategoryByStep(step: InterviewStep): InterviewCategory | undefined {
  return INTERVIEW_CATEGORIES.find((cat) => cat.step === step);
}

export function getTotalQuestions(): number {
  return INTERVIEW_CATEGORIES.reduce((total, cat) => total + cat.questionCount, 0);
}

export function getTotalDuration(): number {
  return INTERVIEW_CATEGORIES.reduce((total, cat) => total + cat.duration, 0);
}

export function getAllQuestions(): InterviewQuestion[] {
  return INTERVIEW_CATEGORIES.flatMap((cat) => cat.questions);
}

export function getQuestionById(questionId: string): InterviewQuestion | undefined {
  return getAllQuestions().find((q) => q.id === questionId);
}

export function getQuestionByFieldName(fieldName: string): InterviewQuestion | undefined {
  return getAllQuestions().find((q) => q.fieldName === fieldName);
}

export function calculateWordCount(text: string): number {
  return text.trim().split(/\s+/).filter((word) => word.length > 0).length;
}

export function validateAnswer(answer: string, question: InterviewQuestion): { valid: boolean; error?: string } {
  if (!answer || answer.trim().length === 0) {
    return { valid: false, error: "Please share your answer." };
  }
  if (answer.trim().length < question.minLength) {
    return {
      valid: false,
      error: `Please share a bit more about this... (at least ${question.minLength} characters)`,
    };
  }
  return { valid: true };
}

