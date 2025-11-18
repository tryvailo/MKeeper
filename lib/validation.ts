/**
 * Zod validation schemas for API routes
 * Used to validate input data before processing
 */

import { z } from "zod";

// Preferences validation
export const preferencesSchema = z.object({
  age: z.number().int().min(18).max(120).optional(),
  location: z.string().max(200).optional(),
  funeral_type: z.enum(["traditional", "cremation_service", "direct_cremation", "eco", "unsure"]).optional(),
  budget_range: z.enum(["1000-2000", "2000-3500", "3500-5000", "5000+", "unsure"]).optional(),
  executor_name: z.string().max(100).optional(),
  executor_email: z.string().email().max(200).optional(),
  executor_phone: z.string().max(20).optional(),
  // Interview questions (all optional)
  happiest_memory: z.string().max(5000).optional(),
  favorite_trip: z.string().max(5000).optional(),
  unforgettable_day: z.string().max(5000).optional(),
  proudest_moment: z.string().max(5000).optional(),
  biggest_laugh: z.string().max(5000).optional(),
  loved_moment: z.string().max(5000).optional(),
  best_friend: z.string().max(5000).optional(),
  overcame_difficulty: z.string().max(5000).optional(),
  met_partner: z.string().max(5000).optional(),
  children_young: z.string().max(5000).optional(),
  funny_family_moment: z.string().max(5000).optional(),
  passed_to_children: z.string().max(5000).optional(),
  relationship_parents: z.string().max(5000).optional(),
  family_together: z.string().max(5000).optional(),
  matters_most: z.string().max(5000).optional(),
  most_proud: z.string().max(5000).optional(),
  life_lessons: z.string().max(5000).optional(),
  brings_peace: z.string().max(5000).optional(),
  how_remembered: z.string().max(5000).optional(),
  regret_not_telling: z.string().max(5000).optional(),
  greatest_strength: z.string().max(5000).optional(),
  love_means: z.string().max(5000).optional(),
  favorite_hobbies: z.string().max(5000).optional(),
  important_people: z.string().max(5000).optional(),
  places_love: z.string().max(5000).optional(),
  favorite_things: z.string().max(5000).optional(),
  personality: z.string().max(5000).optional(),
  message_children: z.string().max(5000).optional(),
  message_spouse: z.string().max(5000).optional(),
  message_grandchildren: z.string().max(5000).optional(),
  message_family: z.string().max(5000).optional(),
  message_other: z.string().max(5000).optional(),
}).strict();

// Family member validation
// Note: relationship enum matches FamilyMember type from supabase.ts: "spouse" | "partner" | "child" | "friend" | "solicitor" | "other"
export const familyMemberSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(200),
  relationship: z.enum(["spouse", "partner", "child", "friend", "solicitor", "other"]),
  access_level: z.enum(["view", "view_and_comment", "executor"]),
});

// Shareable link validation
export const shareableLinkSchema = z.object({
  preferencesId: z.string().uuid().optional(),
  expirationDays: z.number().int().min(1).max(365).optional(),
});

// Activity log validation
export const activityLogSchema = z.object({
  action: z.string().min(1).max(100),
  details: z.string().max(1000).optional().nullable(),
});

// Comment validation
export const commentSchema = z.object({
  content: z.string().min(1).max(2000),
  familyMemberId: z.string().uuid().optional(),
});

// Notification validation
export const notificationSchema = z.object({
  type: z.enum(["annual_reminder", "family_update", "share_accepted", "new_comment", "preferences_updated"]),
  message: z.string().min(1).max(500),
  metadata: z.record(z.any()).optional(),
});

// File upload validation (for API)
export const fileUploadSchema = z.object({
  fileType: z.enum(["image", "audio", "document", "other"]).optional(),
});

// Email share validation
export const emailShareSchema = z.object({
  interviewData: z.record(z.any()),
  recipientEmails: z.array(z.string().email()).optional(),
  senderName: z.string().max(100).optional(),
  sendEmails: z.boolean().optional(),
});

/**
 * Validate data against a schema and return formatted errors
 */
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; errors: string[] } {
  try {
    const validated = schema.parse(data);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map((err) => {
        const path = err.path.join(".");
        return path ? `${path}: ${err.message}` : err.message;
      });
      return { success: false, errors };
    }
    return { success: false, errors: ["Validation failed"] };
  }
}

