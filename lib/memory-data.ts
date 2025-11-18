// Memory Keeper: Data structure for new interview format (32 questions)
// This extends the Preferences interface with new interview fields

import { getAllQuestions, type InterviewQuestion } from "./interview";

// New interview response fields (32 questions from 5 categories)
export interface MemoryInterviewData {
  // Category 1: Memories That Matter - 8 questions
  happiest_memory?: string;
  favorite_trip?: string;
  unforgettable_day?: string;
  proudest_moment?: string;
  biggest_laugh?: string;
  loved_moment?: string;
  best_friend?: string;
  overcame_difficulty?: string;

  // Category 2: Family & Relationships - 6 questions
  met_partner?: string;
  children_young?: string;
  funny_family_moment?: string;
  passed_to_children?: string;
  relationship_parents?: string;
  family_together?: string;

  // Category 3: Values & Wisdom - 8 questions
  matters_most?: string;
  most_proud?: string;
  life_lessons?: string;
  brings_peace?: string;
  how_remembered?: string;
  regret_not_telling?: string;
  greatest_strength?: string;
  love_means?: string;

  // Category 4: Interests & Personality - 5 questions
  favorite_hobbies?: string;
  important_people?: string;
  places_love?: string;
  favorite_things?: string;
  personality?: string;

  // Category 5: Messages for Loved Ones - 5 questions
  message_children?: string;
  message_spouse?: string;
  message_grandchildren?: string;
  message_family?: string;
  message_other?: string;
}

// Extended Preferences interface with interview data
export interface MemoryPreferences extends MemoryInterviewData {
  id?: string;
  user_id: string;
  
  // Interview metadata
  interview_version?: number; // Track which version of interview was used
  interview_completed_at?: string;
  interview_started_at?: string;
  interview_total_time?: number; // seconds
  interview_total_words?: number;
  interview_total_questions?: number;
  
  // Legacy fields (kept for backward compatibility)
  name?: string;
  birthplace?: string;
  age?: number;
  location?: string;
  
  // Timestamps
  created_at?: string;
  updated_at?: string;
}

// Helper functions
export function getInterviewDataFromPreferences(prefs: any): MemoryInterviewData {
  const questions = getAllQuestions();
  const interviewData: MemoryInterviewData = {};
  
  // First check interview_data JSONB field (new format)
  const interviewDataFromJson = prefs?.interview_data || {};
  
  questions.forEach((question) => {
    // Check both interview_data JSONB and direct fields (for backward compatibility)
    const value = interviewDataFromJson[question.fieldName] || prefs[question.fieldName];
    if (value && typeof value === 'string') {
      interviewData[question.fieldName as keyof MemoryInterviewData] = value;
    }
  });
  
  return interviewData;
}

export function calculateInterviewStats(data: MemoryInterviewData): {
  totalWords: number;
  totalQuestions: number;
  answeredQuestions: number;
  categories: Record<number, { answered: number; total: number }>;
} {
  const questions = getAllQuestions();
  let totalWords = 0;
  let answeredQuestions = 0;
  const categories: Record<number, { answered: number; total: number }> = {};
  
  questions.forEach((question) => {
    const answer = data[question.fieldName as keyof MemoryInterviewData];
    if (answer && typeof answer === "string" && answer.trim().length >= 10) {
      totalWords += answer.trim().split(/\s+/).filter((w) => w.length > 0).length;
      answeredQuestions++;
      
      // Find category for this question
      const categoryStep = question.id.split("_")[0];
      const stepMap: Record<string, number> = {
        life: 1,
        family: 2,
        values: 3,
        interests: 4,
        messages: 5,
      };
      const step = stepMap[categoryStep] || 0;
      
      if (!categories[step]) {
        categories[step] = { answered: 0, total: 0 };
      }
      categories[step].answered++;
    }
    
    // Count total per category
    const categoryStep = question.id.split("_")[0];
    const stepMap: Record<string, number> = {
      life: 1,
      family: 2,
      values: 3,
      interests: 4,
      messages: 5,
    };
    const step = stepMap[categoryStep] || 0;
    if (!categories[step]) {
      categories[step] = { answered: 0, total: 0 };
    }
    categories[step].total++;
  });
  
  return {
    totalWords,
    totalQuestions: questions.length,
    answeredQuestions,
    categories,
  };
}

