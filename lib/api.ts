import { supabase } from "@/lib/supabase";
import { UserPreferences, ActivityLog } from "@/lib/supabase";

export async function getCurrentUserId(): Promise<string | null> {
  // TEMPORARILY DISABLED: No auth required
  return "temp-user"; // Temporary mock user ID
}

export async function getUserPreferences(userId: string): Promise<UserPreferences | null> {
  const { data, error } = await supabase
    .from("user_preferences")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Error fetching preferences:", error);
    return null;
  }

  return data;
}

export async function saveUserPreferences(preferences: Partial<UserPreferences>): Promise<UserPreferences | null> {
  const userId = await getCurrentUserId();
  if (!userId) return null;

  const preferencesWithUserId = { ...preferences, user_id: userId };

  // Check if record already exists
  const existing = await getUserPreferences(userId);

  let data, error;
  if (existing) {
    // Update existing record
    ({ data, error } = await supabase
      .from("user_preferences")
      .update(preferencesWithUserId)
      .eq("user_id", userId)
      .select()
      .single());
  } else {
    // Create new record
    ({ data, error } = await supabase
      .from("user_preferences")
      .insert(preferencesWithUserId)
      .select()
      .single());
  }

  if (error) {
    console.error("Error saving preferences:", error);
    return null;
  }

  // Log activity
  await logActivity(userId, existing ? "updated_preferences" : "created_preferences");

  return data;
}

export async function logActivity(userId: string, action: string, details?: string): Promise<void> {
  await supabase
    .from("activity_logs")
    .insert({
      user_id: userId,
      action,
      details,
    });
}

export async function getActivityLogs(userId: string): Promise<ActivityLog[]> {
  const { data, error } = await supabase
    .from("activity_logs")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("Error fetching activity logs:", error);
    return [];
  }

  return data || [];
}

