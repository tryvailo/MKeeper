import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types

export interface User {
  id: string;
  email: string;
  full_name: string;
  age_range?: "45-54" | "55-64" | "65-74" | "75+";
  location?: string;
  tier: "free" | "premium";
  tier_started_at?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface Preferences {
  id?: string;
  user_id: string;
  age?: number;
  location?: string;
  funeral_type?: "traditional" | "cremation_service" | "direct_cremation" | "eco" | "unsure";
  budget_range?: "1000-2000" | "2000-3500" | "3500-5000" | "5000+" | "unsure";
  executor_name?: string;
  executor_email?: string;
  executor_relationship?: "spouse" | "partner" | "child" | "friend" | "solicitor" | "other";
  ceremony_details?: {
    service?: boolean;
    location?: string;
    religious_requirements?: string;
    preferred_date?: string;
  };
  music_preferences?: string;
  readings_preferences?: string;
  eulogy_by?: string;
  flower_preferences?: string;
  color_preferences?: string;
  decoration_preferences?: string;
  reception_wanted?: boolean;
  reception_venue?: string;
  reception_food?: string;
  reception_budget?: number;
  charity_donations?: string;
  dress_code?: string;
  other_wishes?: string;
  things_not_wanted?: string;
  version?: number;
  created_at?: string;
  updated_at?: string;
}

export interface FamilyMember {
  id?: string;
  preferences_id: string;
  name: string;
  email: string;
  relationship: "spouse" | "partner" | "child" | "friend" | "solicitor" | "other";
  access_level: "view" | "view_and_comment" | "executor";
  sharing_link_token: string;
  invited_at?: string;
  accepted_at?: string;
  created_at?: string;
}

export interface File {
  id?: string;
  preferences_id: string;
  file_name: string;
  file_type: "image" | "audio" | "document" | "other";
  file_size: number;
  storage_path: string;
  uploaded_at?: string;
}

export interface Comment {
  id?: string;
  family_member_id?: string;
  preferences_id: string;
  content: string;
  created_at?: string;
  updated_at?: string;
}

export interface Notification {
  id?: string;
  user_id: string;
  type: "annual_reminder" | "family_update" | "share_accepted" | "new_comment" | "preferences_updated";
  message: string;
  metadata?: any;
  sent_at?: string;
  read_at?: string;
}

export interface Subscription {
  id?: string;
  user_id: string;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  plan: "free" | "premium";
  status: "active" | "cancelled" | "past_due" | "trialing";
  started_at?: string;
  ends_at?: string;
  created_at?: string;
}

// Legacy types for backward compatibility
export interface UserPreferences extends Preferences {}
export interface SharedAccess {
  id?: string;
  preference_id: string;
  shared_with_email: string;
  access_token: string;
  created_at?: string;
}

export interface ActivityLog {
  id?: string;
  user_id: string;
  action: string;
  details?: string;
  created_at?: string;
}

