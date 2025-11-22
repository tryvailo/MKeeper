import { NextRequest, NextResponse } from "next/server";
import { logActivity, getCurrentUserId } from "@/lib/api";
import { activityLogSchema, validateData } from "@/lib/validation";
import { getUserFriendlyError, isConnectionError } from "@/lib/supabase-error-handler";

export const dynamic = 'force-dynamic';

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

    // Validate input data
    const validation = validateData(activityLogSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", errors: validation.errors },
        { status: 400 }
      );
    }

    const { action, details } = validation.data;

    await logActivity(userId, action, details || undefined);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error logging activity:", error);
    const statusCode = isConnectionError(error) ? 503 : 500;
    return NextResponse.json(
      { error: getUserFriendlyError(error) },
      { status: statusCode }
    );
  }
}
