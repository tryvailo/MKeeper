import { NextRequest, NextResponse } from "next/server";
import { deleteFamilyMember, getCurrentUserId } from "@/lib/api";
import { createClient } from "@/lib/supabase/server";
import { handleApiError, handleUnauthorizedError, handleNotFoundError, handleBadRequestError } from "@/lib/api-error-handler";

export const dynamic = 'force-dynamic';

// DELETE /api/family/revoke/:memberId - Revoke access
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

    // Get member to find token before deletion
    const supabase = await createClient();
    const { data: member, error: fetchError } = await supabase
      .from("family_members")
      .select("sharing_link_token")
      .eq("id", memberId)
      .single();

    if (fetchError || !member) {
      return handleNotFoundError("Member not found");
    }

    // Delete family member (this will also check ownership)
    const success = await deleteFamilyMember(memberId);

    if (!success) {
      return handleApiError(new Error("Delete failed"), "Failed to revoke access");
    }

    // Remove related shared_access records (legacy support)
    try {
      await supabase
        .from("shared_access")
        .delete()
        .eq("access_token", member.sharing_link_token);
    } catch (error) {
      console.warn("Failed to delete shared_access record:", error);
      // Continue - this is for legacy support
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error, "Failed to revoke access");
  }
}
