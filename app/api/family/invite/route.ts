import { NextRequest, NextResponse } from "next/server";
import {
  createFamilyMember,
  getUserPreferences,
  getCurrentUserId,
  getCurrentUser,
} from "@/lib/api";
import { sendShareInviteEmail } from "@/lib/email";
import { createClient } from "@/lib/supabase/server";
import { familyMemberSchema, validateData } from "@/lib/validation";
import { getUserFriendlyError, isConnectionError } from "@/lib/supabase-error-handler";

export const dynamic = 'force-dynamic';

// POST /api/family/invite - Send invite email
export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const { preferenceId, email, name, relationship: relationshipInput, accessLevel } = body;

    if (!preferenceId || !email) {
      return NextResponse.json({ error: "Missing required fields: preferenceId and email are required" }, { status: 400 });
    }

    // Validate family member data
    const memberData = {
      name: name || email.split("@")[0],
      email,
      relationship: (relationshipInput || "other") as any,
      access_level: (accessLevel || "view") as any,
    };

    const validation = validateData(familyMemberSchema, memberData);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", errors: validation.errors },
        { status: 400 }
      );
    }

    // Verify user owns the preferences
    const preferences = await getUserPreferences(userId);
    if (!preferences || preferences.id !== preferenceId) {
      return NextResponse.json({ error: "Preferences not found" }, { status: 404 });
    }

    // Create family member
    const newMember = await createFamilyMember(preferenceId, {
      name: validation.data.name,
      email: validation.data.email,
      relationship: validation.data.relationship,
      access_level: validation.data.access_level,
    });

    if (!newMember) {
      return NextResponse.json({ error: "Failed to create family member" }, { status: 500 });
    }

    // Create shared access record (legacy support)
    try {
      const supabase = await createClient();
      await supabase.from("shared_access").insert({
        preference_id: preferenceId,
        shared_with_email: email,
        access_token: newMember.sharing_link_token,
      });
    } catch (error) {
      console.warn("Failed to create shared_access record:", error);
      // Continue - this is for legacy support
    }

    // Generate access link
    const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://legacywords.co.uk"}/family/${newMember.sharing_link_token}`;

    // Get inviter name from Supabase Auth
    let inviterName = "Someone";
    try {
      const user = await getCurrentUser();
      if (user) {
        inviterName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Someone";
      }
    } catch (error) {
      console.error("Error getting user info:", error);
    }

    // Send email invitation
    let emailSent = false;
    try {
      const emailResult = await sendShareInviteEmail(
        email,
        inviterName,
        shareUrl,
        newMember.name,
        newMember.relationship,
        newMember.access_level
      );

      emailSent = emailResult.success || false;
      if (!emailSent) {
        console.error("Failed to send email:", emailResult);
      }
    } catch (emailError) {
      console.error("Error sending email:", emailError);
    }

    return NextResponse.json({
      success: true,
      shareUrl,
      accessToken: newMember.sharing_link_token,
      member: newMember,
      emailSent,
    });
  } catch (error) {
    console.error("Error in family invite API:", error);
    const statusCode = isConnectionError(error) ? 503 : 500;
    return NextResponse.json(
      { error: getUserFriendlyError(error) },
      { status: statusCode }
    );
  }
}
