import { NextRequest, NextResponse } from "next/server";
import {
  getFamilyMembers,
  updateFamilyMember,
  deleteFamilyMember,
  getCurrentUserId,
  getUserPreferences,
} from "@/lib/api";
import { createClient } from "@/lib/supabase/server";
import { handleApiError, handleUnauthorizedError, handleNotFoundError, handleBadRequestError, parseJsonBody } from "@/lib/api-error-handler";
import { familyMemberSchema, validateData } from "@/lib/validation";

export const dynamic = 'force-dynamic';

// GET /api/family/members/:memberId - Get a specific family member
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ memberId: string }> }
) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return handleUnauthorizedError();
    }

    const { memberId } = await params;

    if (!memberId || memberId.trim().length === 0) {
      return handleBadRequestError("Member ID is required");
    }

    // Get member from database
    const supabase = await createClient();
    const { data: member, error } = await supabase
      .from("family_members")
      .select("*")
      .eq("id", memberId)
      .single();

    if (error || !member) {
      return handleNotFoundError("Member not found");
    }

    // Verify user owns the preferences
    const preferences = await getUserPreferences(userId);
    if (!preferences || preferences.id !== member.preferences_id) {
      return handleUnauthorizedError("You don't have permission to access this member");
    }

    return NextResponse.json({ member });
  } catch (error) {
    return handleApiError(error, "Failed to fetch member");
  }
}

// PUT /api/family/members/:memberId - Update permissions
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ memberId: string }> }
) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return handleUnauthorizedError();
    }

    const { memberId } = await params;

    if (!memberId || memberId.trim().length === 0) {
      return handleBadRequestError("Member ID is required");
    }

    const bodyResult = await parseJsonBody<{ accessLevel?: string; relationship?: string }>(request);
    if (!bodyResult.success) {
      return bodyResult.response;
    }

    const { accessLevel, relationship } = bodyResult.data;

    // Validate updates if provided
    if (relationship) {
      const relationshipValidation = validateData(
        familyMemberSchema.pick({ relationship: true }),
        { relationship }
      );
      if (!relationshipValidation.success) {
        return handleBadRequestError("Invalid relationship value", relationshipValidation.errors);
      }
    }

    if (accessLevel) {
      const accessLevelValidation = validateData(
        familyMemberSchema.pick({ access_level: true }),
        { access_level: accessLevel }
      );
      if (!accessLevelValidation.success) {
        return handleBadRequestError("Invalid access level", accessLevelValidation.errors);
      }
    }

    const updates: any = {};
    if (accessLevel) {
      updates.access_level = accessLevel;
    }
    if (relationship) {
      updates.relationship = relationship;
    }

    if (Object.keys(updates).length === 0) {
      return handleBadRequestError("No fields to update");
    }

    const updatedMember = await updateFamilyMember(memberId, updates);

    if (!updatedMember) {
      return handleNotFoundError("Member not found or update failed");
    }

    return NextResponse.json({
      success: true,
      member: updatedMember,
    });
  } catch (error) {
    return handleApiError(error, "Failed to update member");
  }
}

// DELETE /api/family/members/:memberId - Delete family member
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ memberId: string }> }
) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return handleUnauthorizedError();
    }

    const { memberId } = await params;

    if (!memberId || memberId.trim().length === 0) {
      return handleBadRequestError("Member ID is required");
    }

    const success = await deleteFamilyMember(memberId);

    if (!success) {
      return handleNotFoundError("Member not found or delete failed");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error, "Failed to delete member");
  }
}
