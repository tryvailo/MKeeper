import { NextRequest, NextResponse } from "next/server";
import { getUserPreferences, saveUserPreferences, getCurrentUserId } from "@/lib/api";
import { Preferences } from "@/lib/supabase";
import { getUserFriendlyError, isConnectionError } from "@/lib/supabase-error-handler";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const preferences = await getUserPreferences(userId);

    return NextResponse.json({ preferences });
  } catch (error) {
    console.error("Error fetching preferences:", error);
    const statusCode = isConnectionError(error) ? 503 : 500;
    return NextResponse.json(
      { error: getUserFriendlyError(error) },
      { status: statusCode }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      console.error("POST /api/preferences: Unauthorized - no user ID");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const preferencesData: Partial<Preferences> = await request.json();
    console.log("POST /api/preferences: Received data for user:", userId);
    console.log("POST /api/preferences: Data keys count:", Object.keys(preferencesData).length);
    console.log("POST /api/preferences: Sample keys:", Object.keys(preferencesData).slice(0, 5));
    
    const savedPreferences = await saveUserPreferences(preferencesData);

    if (!savedPreferences) {
      console.error("POST /api/preferences: saveUserPreferences returned null");
      console.error("POST /api/preferences: This means an error occurred in saveUserPreferences");
      console.error("POST /api/preferences: Check server logs above for error details");
      return NextResponse.json({ 
        error: "Failed to save preferences. Check server console for details.",
        hint: "The save operation failed. Please check the terminal where 'npm run dev' is running for error details."
      }, { status: 500 });
    }

    console.log("POST /api/preferences: Successfully saved preferences");
    return NextResponse.json({ preferences: savedPreferences });
  } catch (error) {
    console.error("POST /api/preferences: Exception:", error);
    console.error("POST /api/preferences: Error stack:", error instanceof Error ? error.stack : "No stack");
    const statusCode = isConnectionError(error) ? 503 : 500;
    return NextResponse.json(
      { error: getUserFriendlyError(error) },
      { status: statusCode }
    );
  }
}
