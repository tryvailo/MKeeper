import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId, getUserPreferences } from "@/lib/api";
import { createClient } from "@/lib/supabase/server";
import crypto from "crypto";
import { handleApiError, handleUnauthorizedError, handleNotFoundError, handleBadRequestError, parseJsonBody } from "@/lib/api-error-handler";
import { z } from "zod";

export const dynamic = 'force-dynamic';

// Schema for share route
const shareSchema = z.object({
  preferenceId: z.string().uuid(),
  email: z.string().email().max(200),
});

export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return handleUnauthorizedError();
    }

    const bodyResult = await parseJsonBody(request);
    if (!bodyResult.success) {
      return bodyResult.response;
    }

    // Validate input
    const validation = shareSchema.safeParse(bodyResult.data);
    if (!validation.success) {
      const errors = validation.error.errors.map((err) => {
        const path = err.path.join(".");
        return path ? `${path}: ${err.message}` : err.message;
      });
      return handleBadRequestError("Validation failed", errors);
    }

    const { preferenceId, email } = validation.data;

    // Verify user owns the preferences
    const preferences = await getUserPreferences(userId);
    if (!preferences || preferences.id !== preferenceId) {
      return handleNotFoundError("Preferences not found");
    }

    // Generate unique access token
    const accessToken = crypto.randomBytes(32).toString("hex");

    // Create shared_access record
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("shared_access")
      .insert({
        preference_id: preferenceId,
        shared_with_email: email,
        access_token: accessToken,
      })
      .select()
      .single();

    if (error) {
      return handleApiError(error, "Failed to create shared access");
    }

    // Generate access link
    const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://legacywords.co.uk"}/share/${accessToken}`;

    return NextResponse.json({
      success: true,
      shareUrl,
      accessToken,
      sharedAccess: data,
    });
  } catch (error) {
    return handleApiError(error, "Failed to create share link");
  }
}
