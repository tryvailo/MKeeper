import { LucideIcon } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TestimonialProps {
  quote: string;
  author: string;
  source: string;
}

export interface StepProps {
  number: number;
  title: string;
  subtitle: string;
  description: string;
  Icon: LucideIcon;
}

export interface ProblemCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
}

export type DashboardView = 'home' | 'memories' | 'family' | 'sharing' | 'reminders' | 'history' | 'view-story' | 'notifications' | 'files' | 'comments' | 'settings';
