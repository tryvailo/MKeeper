import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

const DATA_DIR = path.join(process.cwd(), "data");
const FAMILY_MEMBERS_FILE = path.join(DATA_DIR, "family_members.json");

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

// PUT /api/family/members/:memberId - Update permissions
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ memberId: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { memberId } = await params;
    const { accessLevel, relationship } = await request.json();

    const familyMembers = await readFamilyMembers();
    const memberIndex = familyMembers.findIndex((m: any) => m.id === memberId);

    if (memberIndex === -1) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    // Update member
    if (accessLevel) {
      familyMembers[memberIndex].access_level = accessLevel;
    }
    if (relationship) {
      familyMembers[memberIndex].relationship = relationship;
    }

    await writeFamilyMembers(familyMembers);

    return NextResponse.json({
      success: true,
      member: familyMembers[memberIndex],
    });
  } catch (error) {
    console.error("Error updating member:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

