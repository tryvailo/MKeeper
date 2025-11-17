import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

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

// GET /api/family/members/:prefId - List who has access
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ prefId: string }> }
) {
  try {
    const userId = "temp-user"; // Temporary mock user ID

    const { prefId } = await params;

    const familyMembers = await readFamilyMembers();
    const members = familyMembers.filter((m: any) => m.preferences_id === prefId);

    return NextResponse.json({ members });
  } catch (error) {
    console.error("Error fetching family members:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

