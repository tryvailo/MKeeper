import { NextRequest, NextResponse } from "next/server";
import { validateShareableLink, getUserPreferences } from "@/lib/api";
import { createClient } from "@/lib/supabase/server";
import { handleApiError, handleBadRequestError, handleNotFoundError } from "@/lib/api-error-handler";

export const dynamic = 'force-dynamic';

// GET /api/share/[token] - Get story data via shareable link
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    
    if (!token || token.trim().length === 0) {
      return handleBadRequestError("Token is required");
    }

    // Validate and get the shareable link
    const link = await validateShareableLink(token);

    if (!link) {
      return handleNotFoundError("Link not found or expired");
    }

    // Update access count and last accessed
    const supabase = await createClient();
    await supabase
      .from("shareable_links")
      .update({
        access_count: (link.access_count || 0) + 1,
        last_accessed_at: new Date().toISOString(),
      })
      .eq("id", link.id);

    // Get user preferences (interview data)
    const preferences = await getUserPreferences(link.user_id);

    if (!preferences) {
      return handleNotFoundError("Story not found");
    }

    // Return interview data (only the fields we want to share)
    const interviewData: any = {};
    const fieldsToShare = [
      "happiest_memory", "favorite_trip", "unforgettable_day", "proudest_moment",
      "biggest_laugh", "loved_moment", "best_friend", "overcame_difficulty",
      "met_partner", "children_young", "funny_family_moment", "passed_to_children",
      "relationship_parents", "family_together", "matters_most", "most_proud",
      "life_lessons", "brings_peace", "how_remembered", "regret_not_telling",
      "greatest_strength", "love_means", "favorite_hobbies", "important_people",
      "places_love", "favorite_things", "personality", "message_children",
      "message_spouse", "message_grandchildren", "message_family", "message_other",
    ];

    fieldsToShare.forEach((field) => {
      if ((preferences as any)[field]) {
        interviewData[field] = (preferences as any)[field];
      }
    });

    return NextResponse.json({
      interviewData,
      linkInfo: {
        created_at: link.created_at,
        expires_at: link.expires_at,
        access_count: (link.access_count || 0) + 1,
      },
    });
  } catch (error) {
    return handleApiError(error, "Failed to fetch shared story");
  }
}
