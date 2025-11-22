import { NextRequest, NextResponse } from "next/server";
import { getFamilyMemberByToken, updateFamilyMember } from "@/lib/api";
import { handleApiError, handleBadRequestError, handleNotFoundError } from "@/lib/api-error-handler";

export const dynamic = 'force-dynamic';

// POST /api/family/accept/:token - Accept sharing invitation
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    if (!token || token.trim().length === 0) {
      return handleBadRequestError("Token is required");
    }

    // Get family member by token
    const member = await getFamilyMemberByToken(token);

    if (!member) {
      return handleNotFoundError("Invitation not found");
    }

    if (member.accepted_at) {
      return handleBadRequestError("Invitation already accepted");
    }

    // Update member to accepted
    const updatedMember = await updateFamilyMember(member.id!, {
      accepted_at: new Date().toISOString(),
    });

    if (!updatedMember) {
      return handleApiError(new Error("Failed to update member"), "Failed to accept invitation");
    }

    return NextResponse.json({
      success: true,
      member: updatedMember,
    });
  } catch (error) {
    return handleApiError(error, "Failed to accept invitation");
  }
}
