import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

const DATA_DIR = path.join(process.cwd(), "data");
const ACTIVITY_FILE = path.join(DATA_DIR, "activity.json");

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }
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
  try {
    await ensureDataDir();
    await fs.writeFile(ACTIVITY_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    // Ignore file write errors (filesystem not available on Vercel)
    console.warn("File write failed (expected on Vercel):", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    // TEMPORARILY DISABLED: No auth required for testing
    // const { userId } = await auth();
    // if (!userId) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }
    const userId = "temp-user"; // Temporary mock user ID

    const { action, details } = await request.json();

    const activityLogs = await readActivity();
    activityLogs.push({
      id: `log_${Date.now()}`,
      user_id: userId,
      action,
      details,
      created_at: new Date().toISOString(),
    });
    await writeActivity(activityLogs);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error logging activity:", error);
    return NextResponse.json({ error: "Failed to log activity" }, { status: 500 });
  }
}
