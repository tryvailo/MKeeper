import type { Preferences, ActivityLog, FamilyMember, ShareableLink, File, Comment, Notification } from "@/lib/supabase";
import crypto from "crypto";
import { generateLinkToken, isLinkValid as validateLinkLogic } from "@/lib/shareable-links";
import { createClient } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";

/**
 * Get current user ID from Supabase Auth
 * Returns null if user is not authenticated
 */
export async function getCurrentUserId(): Promise<string | null> {
  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      return null;
    }
    
    return user.id;
  } catch (error) {
    console.error("Error getting current user ID:", error);
    return null;
  }
}

/**
 * Get current user object from Supabase Auth
 * Returns null if user is not authenticated
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      return null;
    }
    
    return user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

/**
 * Get user preferences from Supabase
 * Uses the 'preferences' table (not 'user_preferences')
 */
export async function getUserPreferences(userId: string): Promise<Preferences | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("preferences")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle(); // Use maybeSingle instead of single to avoid errors when no record exists

    if (error) {
      // Not found is not an error - user might not have preferences yet
      if (error.code === "PGRST116" || error.message?.includes("No rows")) {
        return null;
      }
      console.error("Error fetching preferences:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Exception in getUserPreferences:", error);
    return null;
  }
}

/**
 * Save user preferences to Supabase
 * Creates new record if doesn't exist, updates if exists
 * Uses the 'preferences' table (not 'user_preferences')
 */
export async function saveUserPreferences(preferences: Partial<Preferences>): Promise<Preferences | null> {
  const userId = await getCurrentUserId();
  if (!userId) {
    console.error("Cannot save preferences: user not authenticated");
    return null;
  }
  
  console.log("saveUserPreferences: User ID:", userId);
  console.log("saveUserPreferences: User ID type:", typeof userId);

  // Separate interview data from regular preferences
  const interviewFields = [
    'happiest_memory', 'favorite_trip', 'unforgettable_day', 'proudest_moment', 'biggest_laugh',
    'loved_moment', 'best_friend', 'overcame_difficulty', 'met_partner', 'children_young',
    'funny_family_moment', 'passed_to_children', 'relationship_parents', 'family_together',
    'matters_most', 'most_proud', 'life_lessons', 'brings_peace', 'how_remembered',
    'regret_not_telling', 'greatest_strength', 'love_means', 'favorite_hobbies',
    'important_people', 'places_love', 'favorite_things', 'message_family',
    'message_friends', 'message_children', 'message_partner', 'message_other'
  ];

  const interviewData: Record<string, string> = {};
  const regularPreferences: Partial<Preferences> = {};

  // Split data into interview and regular preferences
  Object.keys(preferences).forEach((key) => {
    const value = preferences[key as keyof Preferences];
    if (interviewFields.includes(key) && value && typeof value === 'string' && value.trim().length > 0) {
      interviewData[key] = value.trim();
    } else if (key !== 'user_id' && key !== 'id' && value !== undefined && value !== null) {
      // Type-safe assignment using type assertion
      (regularPreferences as any)[key] = value;
    }
  });

  // Prepare data for database
  const preferencesWithUserId: any = {
    ...regularPreferences,
    user_id: userId,
  };

  // Add interview data as JSONB if there's any
  if (Object.keys(interviewData).length > 0) {
    preferencesWithUserId.interview_data = interviewData;
  }
  
  // Ensure we have at least some data to save
  if (Object.keys(interviewData).length === 0 && Object.keys(regularPreferences).length === 0) {
    console.warn("No data to save - all fields are empty");
    // Still allow saving empty record (user might want to create a placeholder)
    // But at least ensure we have user_id
    if (!userId) {
      console.error("Cannot save: no user_id and no data");
      return null;
    }
  }

  // Check if record already exists
  const existing = await getUserPreferences(userId);

  const supabase = await createClient();
  let data, error;
  
  // Merge interview data with existing if it exists
  if (existing?.interview_data && Object.keys(interviewData).length > 0) {
    preferencesWithUserId.interview_data = {
      ...(existing.interview_data as Record<string, string>),
      ...interviewData,
    };
  } else if (Object.keys(interviewData).length > 0 && !existing?.interview_data) {
    // No existing interview_data, but we have new data
    preferencesWithUserId.interview_data = interviewData;
  }
  
  // Remove id from update/insert data, but ensure user_id is set correctly
  const { id, ...dataToSave } = preferencesWithUserId;
  
  // Ensure user_id is set correctly for RLS (critical!)
  dataToSave.user_id = userId;
  
  console.log("saveUserPreferences: Data to save keys:", Object.keys(dataToSave));
  console.log("saveUserPreferences: user_id in data:", dataToSave.user_id);
  console.log("saveUserPreferences: user_id type:", typeof dataToSave.user_id);
  console.log("saveUserPreferences: interview_data keys:", dataToSave.interview_data ? Object.keys(dataToSave.interview_data).length : "none");
  console.log("saveUserPreferences: Existing record:", existing ? `Yes (ID: ${existing.id})` : "No");
  
  // Verify user exists in public.users table
  const { data: userCheck, error: userCheckError } = await supabase
    .from("users")
    .select("id, email")
    .eq("id", userId)
    .maybeSingle();
  
  if (userCheckError) {
    console.error("saveUserPreferences: Error checking user existence:", userCheckError);
  } else if (!userCheck) {
    console.error("saveUserPreferences: User not found in public.users table! User ID:", userId);
    console.error("saveUserPreferences: This will cause RLS to fail. User should be created by trigger.");
  } else {
    console.log("saveUserPreferences: User verified in public.users:", userCheck.email);
  }
  
  if (existing?.id) {
    // Update existing record
    ({ data, error } = await supabase
      .from("preferences")
      .update(dataToSave)
      .eq("user_id", userId)
      .select()
      .single());
  } else {
    // Try to insert, but if it fails due to conflict, update instead
    ({ data, error } = await supabase
      .from("preferences")
      .insert(dataToSave)
      .select()
      .single());
      
    // If insert fails with conflict (409), try update instead
    if (error && (error.code === '23505' || error.message?.includes('duplicate') || error.message?.includes('conflict'))) {
      console.log("Insert conflict detected, trying update instead...");
      ({ data, error } = await supabase
        .from("preferences")
        .update(dataToSave)
        .eq("user_id", userId)
        .select()
        .single());
    }
  }

  if (error) {
    console.error("Error saving preferences:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    console.error("Error details:", JSON.stringify(error, null, 2));
    console.error("Attempted to save:", JSON.stringify(dataToSave, null, 2));
    console.error("User ID:", userId);
    console.error("Existing record:", existing ? "Yes (ID: " + existing.id + ")" : "No");
    
    // If it's a conflict error, try one more time with update
    if ((error.code === '23505' || error.message?.includes('duplicate') || error.message?.includes('conflict')) && !existing?.id) {
      console.log("Retrying with update after conflict...");
      const retryResult = await supabase
        .from("preferences")
        .update(dataToSave)
        .eq("user_id", userId)
        .select()
        .single();
        
      if (!retryResult.error) {
        return retryResult.data;
      }
    }
    
    return null;
  }

  // Log activity (non-blocking)
  logActivity(userId, existing?.id ? "updated_preferences" : "created_preferences").catch((err) => {
    console.error("Failed to log activity (non-critical):", err);
  });

  return data;
}

// Legacy export for backward compatibility
export type UserPreferences = Preferences;

export async function logActivity(userId: string, action: string, details?: string): Promise<void> {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("activity_logs")
      .insert({
        user_id: userId,
        action,
        details,
      });
    
    if (error) {
      console.error("Error logging activity:", error);
    }
  } catch (error) {
    console.error("Exception in logActivity:", error);
    // Don't throw - logging is non-critical
  }
}

export async function getActivityLogs(userId: string): Promise<ActivityLog[]> {
  const supabase = await createClient();
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

/**
 * Generate a unique random token for family member sharing link
 */
function generateSharingToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Get all family members for a specific preferences record
 * Verifies that the user owns the preferences before returning members
 */
export async function getFamilyMembers(preferencesId: string, userId?: string): Promise<FamilyMember[]> {
  // Verify user owns the preferences if userId is provided
  if (userId) {
    const preferences = await getUserPreferences(userId);
    if (!preferences || preferences.id !== preferencesId) {
      console.error("User does not own these preferences");
      return [];
    }
  }

  const { data, error } = await supabase
    .from("family_members")
    .select("*")
    .eq("preferences_id", preferencesId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching family members:", error);
    return [];
  }

  return data || [];
}

/**
 * Get family member by sharing token
 * Used for accessing shared preferences via token
 */
export async function getFamilyMemberByToken(token: string): Promise<FamilyMember | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("family_members")
    .select("*")
    .eq("sharing_link_token", token)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null; // Not found
    }
    console.error("Error fetching family member by token:", error);
    return null;
  }

  return data;
}

/**
 * Create a new family member
 * Verifies that the user owns the preferences before creating
 */
export async function createFamilyMember(
  preferencesId: string,
  memberData: Omit<FamilyMember, "id" | "preferences_id" | "sharing_link_token" | "created_at" | "invited_at">
): Promise<FamilyMember | null> {
  const userId = await getCurrentUserId();
  if (!userId) {
    console.error("Cannot create family member: user not authenticated");
    return null;
  }

  // Verify user owns the preferences
  const preferences = await getUserPreferences(userId);
  if (!preferences || preferences.id !== preferencesId) {
    console.error("User does not own these preferences");
    return null;
  }

  // Generate unique sharing token
  const sharingToken = generateSharingToken();

  const { data, error } = await supabase
    .from("family_members")
    .insert({
      preferences_id: preferencesId,
      name: memberData.name,
      email: memberData.email,
      relationship: memberData.relationship || "other",
      access_level: memberData.access_level || "view",
      sharing_link_token: sharingToken,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating family member:", error);
    return null;
  }

  // Log activity
  await logActivity(userId, "created_family_member", `Member: ${memberData.name} (${memberData.email})`);

  return data;
}

/**
 * Update an existing family member
 * Verifies that the user owns the preferences before updating
 */
export async function updateFamilyMember(
  memberId: string,
  updates: Partial<Omit<FamilyMember, "id" | "preferences_id" | "sharing_link_token" | "created_at">>
): Promise<FamilyMember | null> {
  const userId = await getCurrentUserId();
  if (!userId) {
    console.error("Cannot update family member: user not authenticated");
    return null;
  }

  // Get the member to find preferences_id
  const { data: member, error: fetchError } = await supabase
    .from("family_members")
    .select("preferences_id")
    .eq("id", memberId)
    .single();

  if (fetchError || !member) {
    console.error("Family member not found:", fetchError);
    return null;
  }

  // Verify user owns the preferences
  const preferences = await getUserPreferences(userId);
  if (!preferences || preferences.id !== member.preferences_id) {
    console.error("User does not own these preferences");
    return null;
  }

  const { data, error } = await supabase
    .from("family_members")
    .update(updates)
    .eq("id", memberId)
    .select()
    .single();

  if (error) {
    console.error("Error updating family member:", error);
    return null;
  }

  // Log activity
  await logActivity(userId, "updated_family_member", `Member ID: ${memberId}`);

  return data;
}

/**
 * Delete a family member
 * Verifies that the user owns the preferences before deleting
 */
export async function deleteFamilyMember(memberId: string): Promise<boolean> {
  const userId = await getCurrentUserId();
  if (!userId) {
    console.error("Cannot delete family member: user not authenticated");
    return false;
  }

  // Get the member to find preferences_id
  const { data: member, error: fetchError } = await supabase
    .from("family_members")
    .select("preferences_id, name, email")
    .eq("id", memberId)
    .single();

  if (fetchError || !member) {
    console.error("Family member not found:", fetchError);
    return false;
  }

  // Verify user owns the preferences
  const preferences = await getUserPreferences(userId);
  if (!preferences || preferences.id !== member.preferences_id) {
    console.error("User does not own these preferences");
    return false;
  }

  const { error } = await supabase
    .from("family_members")
    .delete()
    .eq("id", memberId);

  if (error) {
    console.error("Error deleting family member:", error);
    return false;
  }

  // Log activity
  await logActivity(userId, "deleted_family_member", `Member: ${member.name} (${member.email})`);

  return true;
}

/**
 * Get all shareable links for the current user
 * Optionally filter by preferences_id
 */
export async function getShareableLinks(preferencesId?: string): Promise<ShareableLink[]> {
  const userId = await getCurrentUserId();
  if (!userId) {
    console.error("Cannot get shareable links: user not authenticated");
    return [];
  }

  let query = supabase
    .from("shareable_links")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (preferencesId) {
    query = query.eq("preferences_id", preferencesId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching shareable links:", error);
    return [];
  }

  return data || [];
}

/**
 * Create a new shareable link
 * Links to user's preferences (or specific preferences_id if provided)
 * Default expiration is 30 days
 */
export async function createShareableLink(
  preferencesId?: string,
  expirationDays: number = 30
): Promise<ShareableLink | null> {
  const userId = await getCurrentUserId();
  if (!userId) {
    console.error("Cannot create shareable link: user not authenticated");
    return null;
  }

  // If preferencesId is provided, verify user owns it
  if (preferencesId) {
    const preferences = await getUserPreferences(userId);
    if (!preferences || preferences.id !== preferencesId) {
      console.error("User does not own these preferences");
      return null;
    }
  }

  // Generate unique token
  const linkToken = generateLinkToken();

  // Calculate expiration date
  const now = new Date();
  const expiresAt = new Date(now);
  expiresAt.setDate(expiresAt.getDate() + expirationDays);

  const { data, error } = await supabase
    .from("shareable_links")
    .insert({
      user_id: userId,
      preferences_id: preferencesId || null,
      link_token: linkToken,
      expires_at: expiresAt.toISOString(),
      is_active: true,
      access_count: 0,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating shareable link:", error);
    return null;
  }

  // Log activity
  await logActivity(userId, "created_shareable_link", `Link token: ${linkToken.substring(0, 8)}...`);

  return data;
}

/**
 * Update an existing shareable link
 * Can extend expiration, activate/deactivate, or update other fields
 */
export async function updateShareableLink(
  linkId: string,
  updates: Partial<Pick<ShareableLink, "expires_at" | "is_active" | "preferences_id">>
): Promise<ShareableLink | null> {
  const userId = await getCurrentUserId();
  if (!userId) {
    console.error("Cannot update shareable link: user not authenticated");
    return null;
  }

  // Verify user owns the link
  const { data: existingLink, error: fetchError } = await supabase
    .from("shareable_links")
    .select("user_id, preferences_id")
    .eq("id", linkId)
    .single();

  if (fetchError || !existingLink) {
    console.error("Shareable link not found:", fetchError);
    return null;
  }

  if (existingLink.user_id !== userId) {
    console.error("User does not own this shareable link");
    return null;
  }

  // If updating preferences_id, verify user owns it
  if (updates.preferences_id && updates.preferences_id !== existingLink.preferences_id) {
    const preferences = await getUserPreferences(userId);
    if (!preferences || preferences.id !== updates.preferences_id) {
      console.error("User does not own these preferences");
      return null;
    }
  }

  // Prepare update data
  const updateData: any = {};
  if (updates.expires_at !== undefined) {
    updateData.expires_at = updates.expires_at;
  }
  if (updates.is_active !== undefined) {
    updateData.is_active = updates.is_active;
  }
  if (updates.preferences_id !== undefined) {
    updateData.preferences_id = updates.preferences_id;
  }

  const { data, error } = await supabase
    .from("shareable_links")
    .update(updateData)
    .eq("id", linkId)
    .select()
    .single();

  if (error) {
    console.error("Error updating shareable link:", error);
    return null;
  }

  // Log activity
  await logActivity(userId, "updated_shareable_link", `Link ID: ${linkId}`);

  return data;
}

/**
 * Extend shareable link expiration by specified number of days
 */
export async function extendShareableLink(linkId: string, days: number = 30): Promise<ShareableLink | null> {
  const userId = await getCurrentUserId();
  if (!userId) {
    console.error("Cannot extend shareable link: user not authenticated");
    return null;
  }

  // Get current link
  const { data: link, error: fetchError } = await supabase
    .from("shareable_links")
    .select("expires_at, user_id")
    .eq("id", linkId)
    .single();

  if (fetchError || !link) {
    console.error("Shareable link not found:", fetchError);
    return null;
  }

  if (link.user_id !== userId) {
    console.error("User does not own this shareable link");
    return null;
  }

  // Calculate new expiration date
  const currentExpiresAt = new Date(link.expires_at);
  const newExpiresAt = new Date(currentExpiresAt);
  newExpiresAt.setDate(newExpiresAt.getDate() + days);

  return updateShareableLink(linkId, { expires_at: newExpiresAt.toISOString() });
}

/**
 * Validate shareable link by token
 * Returns the link if valid, null if invalid or expired
 * Also increments access_count and updates last_accessed_at
 */
export async function validateShareableLink(token: string): Promise<ShareableLink | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("shareable_links")
    .select("*")
    .eq("link_token", token)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null; // Not found
    }
    console.error("Error fetching shareable link by token:", error);
    return null;
  }

  // Check if link is valid using validation logic
  // Type assertion needed because lib/shareable-links.ts has slightly different ShareableLink type
  // but the validation only checks is_active and expires_at which are compatible
  if (!validateLinkLogic(data as any)) {
    return null; // Expired or inactive
  }

  // Update access count and last accessed time
  await supabase
    .from("shareable_links")
    .update({
      access_count: (data.access_count || 0) + 1,
      last_accessed_at: new Date().toISOString(),
    })
    .eq("id", data.id);

  return data;
}

/**
 * Deactivate a shareable link
 */
export async function deactivateShareableLink(linkId: string): Promise<boolean> {
  const result = await updateShareableLink(linkId, { is_active: false });
  return result !== null;
}

/**
 * Upload a file to Supabase Storage and create a record in the files table
 * @param preferencesId - The preferences ID this file belongs to
 * @param file - The file to upload (File object from FormData or File API)
 * @param fileType - Type of file: 'image', 'audio', 'document', or 'other'
 * @returns The created file record or null on error
 */
export async function uploadFile(
  preferencesId: string,
  file: globalThis.File | Blob,
  fileType: "image" | "audio" | "document" | "other" = "other"
): Promise<File | null> {
  const userId = await getCurrentUserId();
  if (!userId) {
    console.error("Cannot upload file: user not authenticated");
    return null;
  }

  // Verify user owns the preferences
  const preferences = await getUserPreferences(userId);
  if (!preferences || preferences.id !== preferencesId) {
    console.error("User does not own these preferences");
    return null;
  }

  try {
    const supabase = await createClient();
    // Get file name (File has name property, Blob might not)
    const fileName = file instanceof globalThis.File ? file.name : `file_${Date.now()}`;
    
    // Generate unique file name to avoid conflicts
    const fileExtension = fileName.split(".").pop() || "";
    const uniqueFileName = `${crypto.randomBytes(16).toString("hex")}.${fileExtension}`;
    const storagePath = `${userId}/${preferencesId}/${uniqueFileName}`;

    // Upload file to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("files")
      .upload(storagePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Error uploading file to storage:", uploadError);
      return null;
    }

    // Create record in files table
    const { data, error } = await supabase
      .from("files")
      .insert({
        preferences_id: preferencesId,
        file_name: fileName,
        file_type: fileType,
        file_size: file.size,
        storage_path: storagePath,
      })
      .select()
      .single();

    if (error) {
      // If database insert fails, try to clean up the uploaded file
      await supabase.storage.from("files").remove([storagePath]);
      console.error("Error creating file record:", error);
      return null;
    }

    // Log activity
    await logActivity(userId, "uploaded_file", `File: ${fileName} (${(file.size / 1024).toFixed(1)} KB)`);

    return data;
  } catch (error) {
    console.error("Unexpected error uploading file:", error);
    return null;
  }
}

/**
 * Get all files for a specific preferences record
 * Verifies that the user owns the preferences before returning files
 */
export async function getFiles(preferencesId: string, userId?: string): Promise<File[]> {
  // Verify user owns the preferences if userId is provided
  if (userId) {
    const preferences = await getUserPreferences(userId);
    if (!preferences || preferences.id !== preferencesId) {
      console.error("User does not own these preferences");
      return [];
    }
  }

  const { data, error } = await supabase
    .from("files")
    .select("*")
    .eq("preferences_id", preferencesId)
    .order("uploaded_at", { ascending: false });

  if (error) {
    console.error("Error fetching files:", error);
    return [];
  }

  return data || [];
}

/**
 * Get a signed URL for downloading a file from Supabase Storage
 * @param fileId - The file ID
 * @param expiresIn - URL expiration time in seconds (default: 3600 = 1 hour)
 * @returns Signed URL or null on error
 */
export async function getFileDownloadUrl(fileId: string, expiresIn: number = 3600): Promise<string | null> {
  const userId = await getCurrentUserId();
  if (!userId) {
    console.error("Cannot get file download URL: user not authenticated");
    return null;
  }

  const supabase = await createClient();
  // Get file record
  const { data: file, error: fetchError } = await supabase
    .from("files")
    .select("storage_path, preferences_id")
    .eq("id", fileId)
    .single();

  if (fetchError || !file) {
    console.error("File not found:", fetchError);
    return null;
  }

  // Verify user owns the preferences
  const preferences = await getUserPreferences(userId);
  if (!preferences || preferences.id !== file.preferences_id) {
    console.error("User does not own these preferences");
    return null;
  }

  // Get signed URL from Supabase Storage
  const { data: urlData, error: urlError } = await supabase.storage
    .from("files")
    .createSignedUrl(file.storage_path, expiresIn);

  if (urlError) {
    console.error("Error creating signed URL:", urlError);
    return null;
  }

  return urlData.signedUrl;
}

/**
 * Delete a file from both Supabase Storage and the database
 * Verifies that the user owns the preferences before deleting
 */
export async function deleteFile(fileId: string): Promise<boolean> {
  const userId = await getCurrentUserId();
  if (!userId) {
    console.error("Cannot delete file: user not authenticated");
    return false;
  }

  const supabase = await createClient();
  // Get file record
  const { data: file, error: fetchError } = await supabase
    .from("files")
    .select("storage_path, preferences_id, file_name")
    .eq("id", fileId)
    .single();

  if (fetchError || !file) {
    console.error("File not found:", fetchError);
    return false;
  }

  // Verify user owns the preferences
  const preferences = await getUserPreferences(userId);
  if (!preferences || preferences.id !== file.preferences_id) {
    console.error("User does not own these preferences");
    return false;
  }

  // Delete file from storage
  const { error: storageError } = await supabase.storage.from("files").remove([file.storage_path]);

  if (storageError) {
    console.error("Error deleting file from storage:", storageError);
    // Continue to delete database record even if storage deletion fails
  }

  // Delete record from database
  const { error: dbError } = await supabase.from("files").delete().eq("id", fileId);

  if (dbError) {
    console.error("Error deleting file record:", dbError);
    return false;
  }

  // Log activity
  await logActivity(userId, "deleted_file", `File: ${file.file_name}`);

  return true;
}

/**
 * Get all comments for a specific preferences record
 * Optionally filter by family_member_id
 */
export async function getComments(preferencesId: string, familyMemberId?: string): Promise<Comment[]> {
  const supabase = await createClient();
  let query = supabase
    .from("comments")
    .select("*")
    .eq("preferences_id", preferencesId)
    .order("created_at", { ascending: false });

  if (familyMemberId) {
    query = query.eq("family_member_id", familyMemberId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching comments:", error);
    return [];
  }

  return data || [];
}

/**
 * Create a new comment
 * Can be created by:
 * - The owner of preferences (family_member_id will be null)
 * - A family member with 'view_and_comment' or 'executor' access level
 */
export async function createComment(
  preferencesId: string,
  content: string,
  familyMemberId?: string
): Promise<Comment | null> {
  const userId = await getCurrentUserId();
  if (!userId) {
    console.error("Cannot create comment: user not authenticated");
    return null;
  }

  // Verify preferences exists and user has access
  const preferences = await getUserPreferences(userId);
  const isOwner = preferences && preferences.id === preferencesId;

  // If user doesn't own preferences, they must be a family member
  if (!isOwner && !familyMemberId) {
    console.error("User does not own these preferences and no family member ID provided");
    return null;
  }

  // If family_member_id is provided, verify it exists and has comment permissions
  if (familyMemberId) {
    const { data: member, error: memberError } = await supabase
      .from("family_members")
      .select("access_level, preferences_id")
      .eq("id", familyMemberId)
      .single();

    if (memberError || !member) {
      console.error("Family member not found:", memberError);
      return null;
    }

    if (member.preferences_id !== preferencesId) {
      console.error("Family member does not belong to these preferences");
      return null;
    }

    // Check access level
    if (member.access_level !== "view_and_comment" && member.access_level !== "executor") {
      console.error("Family member does not have permission to comment");
      return null;
    }
  }

  const { data, error } = await supabase
    .from("comments")
    .insert({
      preferences_id: preferencesId,
      family_member_id: familyMemberId || null,
      content: content.trim(),
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating comment:", error);
    return null;
  }

  // Log activity
  await logActivity(
    userId,
    "created_comment",
    `Comment on preferences: ${preferencesId.substring(0, 8)}...`
  );

  // Create notification for preferences owner if comment is from family member
  // (Notification will be created separately if needed)

  return data;
}

/**
 * Update an existing comment
 * Can be updated by:
 * - The author (family member who created it)
 * - The owner of preferences
 */
export async function updateComment(commentId: string, content: string): Promise<Comment | null> {
  const userId = await getCurrentUserId();
  if (!userId) {
    console.error("Cannot update comment: user not authenticated");
    return null;
  }

  // Get comment with related data
  const { data: comment, error: fetchError } = await supabase
    .from("comments")
    .select("family_member_id, preferences_id")
    .eq("id", commentId)
    .single();

  if (fetchError || !comment) {
    console.error("Comment not found:", fetchError);
    return null;
  }

  // Check if user owns the preferences
  const preferences = await getUserPreferences(userId);
  const isOwner = preferences && preferences.id === comment.preferences_id;

  // If comment has family_member_id, verify user has access
  let canEdit = isOwner;
  if (comment.family_member_id && !isOwner) {
    // In production, we should verify the family member token matches the user
    // For now, we'll allow if user owns preferences
    canEdit = false; // Family members can't edit their comments for now
  }

  if (!canEdit) {
    console.error("User does not have permission to update this comment");
    return null;
  }

  const { data, error } = await supabase
    .from("comments")
    .update({
      content: content.trim(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", commentId)
    .select()
    .single();

  if (error) {
    console.error("Error updating comment:", error);
    return null;
  }

  // Log activity
  await logActivity(userId, "updated_comment", `Comment ID: ${commentId}`);

  return data;
}

/**
 * Delete a comment
 * Can be deleted by:
 * - The author (family member who created it)
 * - The owner of preferences
 */
export async function deleteComment(commentId: string): Promise<boolean> {
  const userId = await getCurrentUserId();
  if (!userId) {
    console.error("Cannot delete comment: user not authenticated");
    return false;
  }

  const supabase = await createClient();
  // Get comment with related data
  const { data: comment, error: fetchError } = await supabase
    .from("comments")
    .select("family_member_id, preferences_id")
    .eq("id", commentId)
    .single();

  if (fetchError || !comment) {
    console.error("Comment not found:", fetchError);
    return false;
  }

  // Check if user owns the preferences
  const preferences = await getUserPreferences(userId);
  const isOwner = preferences && preferences.id === comment.preferences_id;

  // If comment has family_member_id, verify user has access
  let canDelete = isOwner;
  if (comment.family_member_id && !isOwner) {
    // In production, we should verify the family member token matches the user
    // For now, only owner can delete
    canDelete = false;
  }

  if (!canDelete) {
    console.error("User does not have permission to delete this comment");
    return false;
  }

  const { error } = await supabase.from("comments").delete().eq("id", commentId);

  if (error) {
    console.error("Error deleting comment:", error);
    return false;
  }

  // Log activity
  await logActivity(userId, "deleted_comment", `Comment ID: ${commentId}`);

  return true;
}

/**
 * Get all notifications for the current user
 * Optionally filter by read/unread status
 */
export async function getNotifications(unreadOnly: boolean = false): Promise<Notification[]> {
  const userId = await getCurrentUserId();
  if (!userId) {
    console.error("Cannot get notifications: user not authenticated");
    return [];
  }

  let query = supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("sent_at", { ascending: false });

  if (unreadOnly) {
    query = query.is("read_at", null);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }

  return data || [];
}

/**
 * Get count of unread notifications
 */
export async function getUnreadNotificationCount(): Promise<number> {
  const userId = await getCurrentUserId();
  if (!userId) {
    return 0;
  }

  const { count, error } = await supabase
    .from("notifications")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .is("read_at", null);

  if (error) {
    console.error("Error counting unread notifications:", error);
    return 0;
  }

  return count || 0;
}

/**
 * Create a new notification
 * Can be called by system or other users (with proper authorization)
 */
export async function createNotification(
  userId: string,
  type: Notification["type"],
  message: string,
  metadata?: any
): Promise<Notification | null> {
  const { data, error } = await supabase
    .from("notifications")
    .insert({
      user_id: userId,
      type,
      message,
      metadata: metadata || null,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating notification:", error);
    return null;
  }

  return data;
}

/**
 * Mark a notification as read
 */
export async function markAsRead(notificationId: string): Promise<boolean> {
  const userId = await getCurrentUserId();
  if (!userId) {
    console.error("Cannot mark notification as read: user not authenticated");
    return false;
  }

  // Verify notification belongs to user
  const { data: notification, error: fetchError } = await supabase
    .from("notifications")
    .select("user_id, read_at")
    .eq("id", notificationId)
    .single();

  if (fetchError || !notification) {
    console.error("Notification not found:", fetchError);
    return false;
  }

  if (notification.user_id !== userId) {
    console.error("User does not own this notification");
    return false;
  }

  // Only update if not already read
  if (notification.read_at) {
    return true; // Already read
  }

  const { error } = await supabase
    .from("notifications")
    .update({ read_at: new Date().toISOString() })
    .eq("id", notificationId);

  if (error) {
    console.error("Error marking notification as read:", error);
    return false;
  }

  return true;
}

/**
 * Mark all notifications as read for the current user
 */
export async function markAllAsRead(): Promise<boolean> {
  const userId = await getCurrentUserId();
  if (!userId) {
    console.error("Cannot mark notifications as read: user not authenticated");
    return false;
  }

  const { error } = await supabase
    .from("notifications")
    .update({ read_at: new Date().toISOString() })
    .eq("user_id", userId)
    .is("read_at", null);

  if (error) {
    console.error("Error marking all notifications as read:", error);
    return false;
  }

  return true;
}

/**
 * Delete a notification
 */
export async function deleteNotification(notificationId: string): Promise<boolean> {
  const userId = await getCurrentUserId();
  if (!userId) {
    console.error("Cannot delete notification: user not authenticated");
    return false;
  }

  const supabase = await createClient();
  // Verify notification belongs to user
  const { data: notification, error: fetchError } = await supabase
    .from("notifications")
    .select("user_id")
    .eq("id", notificationId)
    .single();

  if (fetchError || !notification) {
    console.error("Notification not found:", fetchError);
    return false;
  }

  if (notification.user_id !== userId) {
    console.error("User does not own this notification");
    return false;
  }

  const { error } = await supabase.from("notifications").delete().eq("id", notificationId);

  if (error) {
    console.error("Error deleting notification:", error);
    return false;
  }

  return true;
}

