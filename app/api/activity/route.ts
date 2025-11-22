import { NextRequest, NextResponse } from "next/server";
import { getActivityLogs, getCurrentUserId } from "@/lib/api";
import { handleApiError, handleUnauthorizedError } from "@/lib/api-error-handler";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return handleUnauthorizedError();
    }

    const logs = await getActivityLogs(userId);

    return NextResponse.json({ logs });
  } catch (error) {
    return handleApiError(error, "Failed to fetch activity logs");
  }
}
