import { NextRequest, NextResponse } from "next/server";
import { getFamilyMemberByToken, getUserPreferences } from "@/lib/api";
import { createClient } from "@/lib/supabase/server";
import { handleApiError, handleBadRequestError, handleNotFoundError } from "@/lib/api-error-handler";

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    if (!token || token.trim().length === 0) {
      return handleBadRequestError("Token is required");
    }

    // Try to get family member by token first
    let familyMember = await getFamilyMemberByToken(token);

    if (familyMember) {
      // Get preferences for this family member
      const preferences = await getUserPreferences(familyMember.preferences_id);

      if (!preferences) {
        return handleNotFoundError("Preferences not found");
      }

      return NextResponse.json({
        preferences,
        familyMember,
      });
    }

    // Fallback: try shared_access table (legacy support)
    const supabase = await createClient();
    const { data: sharedAccess, error: sharedError } = await supabase
      .from("shared_access")
      .select("preference_id")
      .eq("access_token", token)
      .single();

    if (sharedError || !sharedAccess) {
      return handleNotFoundError("Access not found or expired");
    }

    // Get preferences
    const { data: preferences, error: prefError } = await supabase
      .from("preferences")
      .select("*")
      .eq("id", sharedAccess.preference_id)
      .single();

    if (prefError || !preferences) {
      return handleNotFoundError("Preferences not found");
    }

    return NextResponse.json({ preferences });
  } catch (error) {
    return handleApiError(error, "Failed to fetch shared preferences");
  }
}
