import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { UserPreferences } from "@/lib/supabase";

const DATA_DIR = path.join(process.cwd(), "data");
const PREFERENCES_FILE = path.join(DATA_DIR, "preferences.json");
const ACTIVITY_FILE = path.join(DATA_DIR, "activity.json");

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }
}

// Read preferences from file
async function readPreferences() {
  await ensureDataDir();
  try {
    const data = await fs.readFile(PREFERENCES_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}

// Write preferences to file
async function writePreferences(data: any) {
  await ensureDataDir();
  await fs.writeFile(PREFERENCES_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// Read activity logs from file
async function readActivity() {
  await ensureDataDir();
  try {
    const data = await fs.readFile(ACTIVITY_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Write activity logs to file
async function writeActivity(data: any[]) {
  await ensureDataDir();
  await fs.writeFile(ACTIVITY_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const preferences = await readPreferences();
    const userPreferences = preferences[userId] || null;

    return NextResponse.json({ preferences: userPreferences });
  } catch (error) {
    console.error("Error fetching preferences:", error);
    return NextResponse.json({ error: "Failed to fetch preferences" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const preferences: Partial<UserPreferences> = await request.json();
    const preferencesData = await readPreferences();
    
    const existing = preferencesData[userId];
    const preferencesWithUserId = {
      ...preferences,
      user_id: userId,
      id: existing?.id || `pref_${Date.now()}`,
      created_at: existing?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    preferencesData[userId] = preferencesWithUserId;
    await writePreferences(preferencesData);

    // Log activity
    const activityLogs = await readActivity();
    activityLogs.push({
      id: `log_${Date.now()}`,
      user_id: userId,
      action: existing ? "updated_preferences" : "created_preferences",
      details: null,
      created_at: new Date().toISOString(),
    });
    await writeActivity(activityLogs);

    return NextResponse.json({ preferences: preferencesWithUserId });
  } catch (error) {
    console.error("Error saving preferences:", error);
    return NextResponse.json({ error: "Failed to save preferences" }, { status: 500 });
  }
}
