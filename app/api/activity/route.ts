import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

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

export async function GET(request: NextRequest) {
  try {
    // TEMPORARILY DISABLED: No auth required for testing
    // const userId = "temp-user"; // Temporary mock user ID
    // }
    const userId = "temp-user"; // Temporary mock user ID

    const activityLogs = await readActivity();
    const userLogs = activityLogs
      .filter((log: any) => log.user_id === userId)
      .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 50);

    return NextResponse.json({ logs: userLogs });
  } catch (error) {
    console.error("Error fetching activity logs:", error);
    return NextResponse.json({ error: "Failed to fetch activity logs" }, { status: 500 });
  }
}
