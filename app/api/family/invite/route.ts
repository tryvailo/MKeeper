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
    let newMember;
    try {
      newMember = await createFamilyMember(preferenceId, {
        name: validation.data.name,
        email: validation.data.email,
        relationship: validation.data.relationship,
        access_level: validation.data.access_level,
      });

      if (!newMember) {
        return NextResponse.json({ error: "Failed to create family member" }, { status: 500 });
      }
    } catch (memberError) {
      // Handle duplicate email or self-addition errors
      const errorMessage = memberError instanceof Error ? memberError.message : "Failed to create family member";
      if (errorMessage.includes("already exists") || errorMessage.includes("cannot add yourself")) {
        return NextResponse.json({ error: errorMessage }, { status: 400 });
      }
      throw memberError; // Re-throw other errors
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

    // Validate email format before sending
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Send email invitation with improved error handling
    let emailSent = false;
    let emailError: string | null = null;
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
        emailError = emailResult.message || "Failed to send email";
        console.error("Failed to send email:", emailResult);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error sending email";
      emailError = errorMessage;
      console.error("Error sending email:", errorMessage);
      
      // Don't fail the entire request if email fails - member is still created
      // But log the error for monitoring
    }

    return NextResponse.json({
      success: true,
      shareUrl,
      accessToken: newMember.sharing_link_token,
      member: newMember,
      emailSent,
      emailError: emailError || undefined, // Include error message if email failed
      message: emailSent 
        ? "Family member added and invitation email sent successfully"
        : emailError 
          ? `Family member added, but email could not be sent: ${emailError}. You can share the link manually.`
          : "Family member added successfully",
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
