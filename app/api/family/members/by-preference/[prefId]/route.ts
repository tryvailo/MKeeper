import { NextRequest, NextResponse } from "next/server";
import { getFamilyMembers, getCurrentUserId, getUserPreferences } from "@/lib/api";
import { handleApiError, handleUnauthorizedError, handleNotFoundError, handleBadRequestError } from "@/lib/api-error-handler";

export const dynamic = 'force-dynamic';

// GET /api/family/members/by-preference/:prefId - List who has access
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ prefId: string }> }
) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return handleUnauthorizedError();
    }

    const { prefId } = await params;

    if (!prefId || prefId.trim().length === 0) {
      return handleBadRequestError("Preference ID is required");
    }

    // Verify user owns the preferences
    const preferences = await getUserPreferences(userId);
    if (!preferences || preferences.id !== prefId) {
      return handleNotFoundError("Preferences not found");
    }

    // Get family members for this preference
    const members = await getFamilyMembers(prefId);

    return NextResponse.json({ members });
  } catch (error) {
    return handleApiError(error, "Failed to fetch family members");
  }
}
