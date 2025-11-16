import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

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
  await ensureDataDir();
  await fs.writeFile(FAMILY_MEMBERS_FILE, JSON.stringify(data, null, 2), "utf-8");
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
  await ensureDataDir();
  await fs.writeFile(SHARED_ACCESS_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// DELETE /api/family/revoke/:memberId - Revoke access
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ memberId: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { memberId } = await params;

    const familyMembers = await readFamilyMembers();
    const member = familyMembers.find((m: any) => m.id === memberId);

    if (!member) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    // Verify user owns the preferences
    // TODO: Add verification that userId matches preference owner

    // Remove member
    const updatedMembers = familyMembers.filter((m: any) => m.id !== memberId);
    await writeFamilyMembers(updatedMembers);

    // Remove shared access
    const sharedAccess = await readSharedAccess();
    const updatedAccess = sharedAccess.filter(
      (sa: any) => sa.access_token !== member.sharing_link_token
    );
    await writeSharedAccess(updatedAccess);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error revoking access:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

