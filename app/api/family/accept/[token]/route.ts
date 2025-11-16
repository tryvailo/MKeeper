import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

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

// POST /api/family/accept/:token - Accept sharing invitation
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    const familyMembers = await readFamilyMembers();
    const member = familyMembers.find((m: any) => m.sharing_link_token === token);

    if (!member) {
      return NextResponse.json({ error: "Invitation not found" }, { status: 404 });
    }

    if (member.accepted_at) {
      return NextResponse.json({ error: "Invitation already accepted" }, { status: 400 });
    }

    // Update member to accepted
    member.accepted_at = new Date().toISOString();
    await writeFamilyMembers(familyMembers);

    return NextResponse.json({
      success: true,
      member,
    });
  } catch (error) {
    console.error("Error accepting invitation:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

