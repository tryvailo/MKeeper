import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const DATA_DIR = path.join(process.cwd(), "data");
const PREFERENCES_FILE = path.join(DATA_DIR, "preferences.json");
const SHARED_ACCESS_FILE = path.join(DATA_DIR, "shared_access.json");

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

// Read shared access from file
async function readSharedAccess() {
  await ensureDataDir();
  try {
    const data = await fs.readFile(SHARED_ACCESS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    // Get shared_access record
    const sharedAccessList = await readSharedAccess();
    const sharedAccess = sharedAccessList.find(
      (item: any) => item.access_token === token
    );

    if (!sharedAccess) {
      return NextResponse.json(
        { error: "Access not found or expired" },
        { status: 404 }
      );
    }

    // Get preferences
    const preferences = await readPreferences();
    const userPreferences = Object.values(preferences).find(
      (pref: any) => pref.id === sharedAccess.preference_id
    );

    if (!userPreferences) {
      return NextResponse.json(
        { error: "Preferences not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ preferences: userPreferences });
  } catch (error) {
    console.error("Error fetching shared preferences:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

