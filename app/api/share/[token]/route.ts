import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { isLinkValid } from "@/lib/shareable-links";

export const dynamic = 'force-dynamic';

const DATA_DIR = path.join(process.cwd(), "data");
const SHAREABLE_LINKS_FILE = path.join(DATA_DIR, "shareable_links.json");
const PREFERENCES_FILE = path.join(DATA_DIR, "preferences.json");

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }
}

// Read shareable links from file
async function readShareableLinks() {
  await ensureDataDir();
  try {
    const data = await fs.readFile(SHAREABLE_LINKS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
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

// GET /api/share/[token] - Get story data via shareable link
export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const { token } = params;
    
    if (!token) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    // Find the shareable link
    const links = await readShareableLinks();
    const link = links.find((l: any) => l.link_token === token);

    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    // Check if link is valid (not expired and active)
    if (!isLinkValid(link)) {
      return NextResponse.json({ error: "Link expired" }, { status: 410 }); // 410 Gone
    }

    // Update access count and last accessed
    link.access_count = (link.access_count || 0) + 1;
    link.last_accessed_at = new Date().toISOString();
    try {
      await fs.writeFile(SHAREABLE_LINKS_FILE, JSON.stringify(links, null, 2), "utf-8");
    } catch (error) {
      // Ignore file write errors (filesystem not available on Vercel)
      console.warn("File write failed (expected on Vercel):", error);
    }

    // Get user preferences (interview data)
    const preferences = await readPreferences();
    const userPreferences = preferences[link.user_id];

    if (!userPreferences) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    // Return interview data (only the fields we want to share)
    const interviewData: any = {};
    const fieldsToShare = [
      "happiest_memory", "favorite_trip", "unforgettable_day", "proudest_moment",
      "biggest_laugh", "loved_moment", "best_friend", "overcame_difficulty",
      "met_partner", "children_young", "funny_family_moment", "passed_to_children",
      "relationship_parents", "family_together", "matters_most", "most_proud",
      "life_lessons", "brings_peace", "how_remembered", "regret_not_telling",
      "greatest_strength", "love_means", "favorite_hobbies", "important_people",
      "places_love", "favorite_things", "personality", "message_children",
      "message_spouse", "message_grandchildren", "message_family", "message_other",
    ];

    fieldsToShare.forEach((field) => {
      if (userPreferences[field]) {
        interviewData[field] = userPreferences[field];
      }
    });

    return NextResponse.json({
      interviewData,
      linkInfo: {
        created_at: link.created_at,
        expires_at: link.expires_at,
        access_count: link.access_count,
      },
    });
  } catch (error) {
    console.error("Error in share API:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

