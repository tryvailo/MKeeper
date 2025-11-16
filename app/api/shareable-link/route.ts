import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createShareableLink, isLinkValid, extendShareableLink, generateShareableURL, getExpirationMessage } from "@/lib/shareable-links";

const DATA_DIR = path.join(process.cwd(), "data");
const SHAREABLE_LINKS_FILE = path.join(DATA_DIR, "shareable_links.json");

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

// Write shareable links to file
async function writeShareableLinks(data: any[]) {
  await ensureDataDir();
  await fs.writeFile(SHAREABLE_LINKS_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// GET /api/shareable-link - Get all shareable links for user
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const links = await readShareableLinks();
    const userLinks = links
      .filter((link: any) => link.user_id === userId)
      .map((link: any) => ({
        ...link,
        shareUrl: generateShareableURL(link.link_token),
        isValid: isLinkValid(link),
        daysRemaining: getExpirationMessage(link),
      }));

    return NextResponse.json({ links: userLinks });
  } catch (error) {
    console.error("Error fetching shareable links:", error);
    return NextResponse.json({ error: "Failed to fetch shareable links" }, { status: 500 });
  }
}

// POST /api/shareable-link - Create a new shareable link
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const links = await readShareableLinks();
    const newLink = createShareableLink(userId);
    
    links.push(newLink);
    await writeShareableLinks(links);

    return NextResponse.json({
      success: true,
      link: {
        ...newLink,
        shareUrl: generateShareableURL(newLink.link_token),
        daysRemaining: getExpirationMessage(newLink),
      },
    });
  } catch (error) {
    console.error("Error creating shareable link:", error);
    return NextResponse.json({ error: "Failed to create shareable link" }, { status: 500 });
  }
}

// PATCH /api/shareable-link - Extend or deactivate a shareable link
export async function PATCH(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { linkId, action } = await request.json();

    if (!linkId || !action) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const links = await readShareableLinks();
    const linkIndex = links.findIndex((link: any) => link.id === linkId && link.user_id === userId);

    if (linkIndex === -1) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    if (action === "extend") {
      links[linkIndex] = extendShareableLink(links[linkIndex]);
    } else if (action === "deactivate") {
      links[linkIndex].is_active = false;
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    await writeShareableLinks(links);

    return NextResponse.json({
      success: true,
      link: {
        ...links[linkIndex],
        shareUrl: generateShareableURL(links[linkIndex].link_token),
        daysRemaining: getExpirationMessage(links[linkIndex]),
      },
    });
  } catch (error) {
    console.error("Error updating shareable link:", error);
    return NextResponse.json({ error: "Failed to update shareable link" }, { status: 500 });
  }
}

