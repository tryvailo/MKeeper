import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = 'force-dynamic';

const DATA_DIR = path.join(process.cwd(), "data");
const SHARED_ACCESS_FILE = path.join(DATA_DIR, "shared_access.json");

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    // Directory might already exist
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

// Write shared access to file
async function writeSharedAccess(data: any[]) {
  try {
    await ensureDataDir();
    await fs.writeFile(SHARED_ACCESS_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    // Ignore file write errors (filesystem not available on Vercel)
    console.warn("File write failed (expected on Vercel):", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = "temp-user"; // Temporary mock user ID

    const { preferenceId, email } = await request.json();

    if (!preferenceId || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Generate unique access token
    const accessToken = crypto.randomBytes(32).toString("hex");

    // Save to file
    const sharedAccess = await readSharedAccess();
    const newAccess = {
      id: `share_${Date.now()}`,
      preference_id: preferenceId,
      shared_with_email: email,
      access_token: accessToken,
      created_at: new Date().toISOString(),
    };
    sharedAccess.push(newAccess);
    await writeSharedAccess(sharedAccess);

    // Generate access link
    const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/family/${accessToken}`;

    // TODO: Send email with link (can use Resend, SendGrid, etc.)
    // For now, just return the link

    return NextResponse.json({
      success: true,
      shareUrl,
      accessToken,
    });
  } catch (error) {
    console.error("Error in share API:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
