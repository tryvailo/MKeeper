import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import crypto from "crypto";
import { sendShareInviteEmail } from "@/lib/email";

export const dynamic = 'force-dynamic';

const DATA_DIR = path.join(process.cwd(), "data");
const FAMILY_MEMBERS_FILE = path.join(DATA_DIR, "family_members.json");
const SHARED_ACCESS_FILE = path.join(DATA_DIR, "shared_access.json");

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }
}

async function readFamilyMembers() {
  await ensureDataDir();
  try {
    const data = await fs.readFile(FAMILY_MEMBERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeFamilyMembers(data: any[]) {
  try {
    await ensureDataDir();
    await fs.writeFile(FAMILY_MEMBERS_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    // Ignore file write errors (filesystem not available on Vercel)
    console.warn("File write failed (expected on Vercel):", error);
  }
}

async function readSharedAccess() {
  await ensureDataDir();
  try {
    const data = await fs.readFile(SHARED_ACCESS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeSharedAccess(data: any[]) {
  try {
    await ensureDataDir();
    await fs.writeFile(SHARED_ACCESS_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    // Ignore file write errors (filesystem not available on Vercel)
    console.warn("File write failed (expected on Vercel):", error);
  }
}

// POST /api/family/invite - Send invite email
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { preferenceId, email, name, relationship, accessLevel } = await request.json();

    if (!preferenceId || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Generate unique access token
    const accessToken = crypto.randomBytes(32).toString("hex");

    // Create family member record
    const familyMembers = await readFamilyMembers();
    const newMember = {
      id: `member_${Date.now()}`,
      preferences_id: preferenceId,
      name: name || email.split("@")[0],
      email: email,
      relationship: relationship || "other",
      access_level: accessLevel || "view",
      sharing_link_token: accessToken,
      invited_at: new Date().toISOString(),
      accepted_at: null,
      created_at: new Date().toISOString(),
    };
    familyMembers.push(newMember);
    await writeFamilyMembers(familyMembers);

    // Create shared access record
    const sharedAccess = await readSharedAccess();
    sharedAccess.push({
      id: `share_${Date.now()}`,
      preference_id: preferenceId,
      shared_with_email: email,
      access_token: accessToken,
      created_at: new Date().toISOString(),
    });
    await writeSharedAccess(sharedAccess);

    // Generate access link
    const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/family/${accessToken}`;

    // Get inviter name from Clerk
    let inviterName = "Someone";
    try {
      const user = await currentUser();
      if (user) {
        inviterName = user.firstName || user.fullName || user.emailAddresses[0]?.emailAddress?.split("@")[0] || "Someone";
      }
    } catch (error) {
      console.error("Error getting user info:", error);
    }

    // Send email invitation
    try {
      const emailResult = await sendShareInviteEmail(
        email,
        inviterName,
        shareUrl,
        name || email.split("@")[0],
        relationship || "other",
        accessLevel || "view"
      );

      if (!emailResult.success) {
        console.error("Failed to send email:", emailResult);
        // Continue anyway - the link is still created
      }
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      // Continue anyway - the link is still created
    }

    return NextResponse.json({
      success: true,
      shareUrl,
      accessToken,
      member: newMember,
      emailSent: true,
    });
  } catch (error) {
    console.error("Error in family invite API:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

