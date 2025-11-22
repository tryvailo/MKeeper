import { NextRequest, NextResponse } from "next/server";
import {
  getShareableLinks,
  createShareableLink,
  extendShareableLink,
  deactivateShareableLink,
  getCurrentUserId,
} from "@/lib/api";
import { generateShareableURL, getExpirationMessage, isLinkValid } from "@/lib/shareable-links";
import { shareableLinkSchema, validateData } from "@/lib/validation";
import { handleApiError, handleUnauthorizedError, handleBadRequestError, parseJsonBody } from "@/lib/api-error-handler";

export const dynamic = 'force-dynamic';

// GET /api/shareable-link - Get all shareable links for user
export async function GET(request: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return handleUnauthorizedError();
    }

    const { searchParams } = new URL(request.url);
    const preferencesIdParam = searchParams.get("preferencesId");
    const preferencesId = preferencesIdParam ? preferencesIdParam : undefined;

    const links = await getShareableLinks(preferencesId);

    // Add computed fields for frontend
    const linksWithMetadata = links.map((link) => ({
      ...link,
      shareUrl: generateShareableURL(link.link_token),
      isValid: isLinkValid(link as any),
      daysRemaining: getExpirationMessage(link as any),
    }));

    return NextResponse.json({ links: linksWithMetadata });
  } catch (error) {
    return handleApiError(error, "Failed to fetch shareable links");
  }
}

// POST /api/shareable-link - Create a new shareable link
export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return handleUnauthorizedError();
    }

    const bodyResult = await parseJsonBody(request);
    if (!bodyResult.success) {
      return bodyResult.response;
    }

    const body = bodyResult.data;
    
    // Validate input
    const validation = validateData(shareableLinkSchema, body);
    if (!validation.success) {
      return handleBadRequestError("Validation failed", validation.errors);
    }

    const { preferencesId, expirationDays } = validation.data;

    const newLink = await createShareableLink(preferencesId, expirationDays || 30);

    if (!newLink) {
      return NextResponse.json({ error: "Failed to create shareable link" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      link: {
        ...newLink,
        shareUrl: generateShareableURL(newLink.link_token),
        daysRemaining: getExpirationMessage(newLink as any),
      },
    });
  } catch (error) {
    return handleApiError(error, "Failed to create shareable link");
  }
}

// PATCH /api/shareable-link - Extend or deactivate a shareable link
export async function PATCH(request: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return handleUnauthorizedError();
    }

    const bodyResult = await parseJsonBody<{ linkId?: string; action?: string; days?: number }>(request);
    if (!bodyResult.success) {
      return bodyResult.response;
    }

    const { linkId, action, days } = bodyResult.data;

    if (!linkId || !action) {
      return handleBadRequestError("Missing required fields: linkId and action are required");
    }

    let updatedLink;
    if (action === "extend") {
      updatedLink = await extendShareableLink(linkId, days || 30);
    } else if (action === "deactivate") {
      const success = await deactivateShareableLink(linkId);
      if (!success) {
        return NextResponse.json({ error: "Failed to deactivate link" }, { status: 500 });
      }
      // Fetch the updated link
      const links = await getShareableLinks();
      updatedLink = links.find((link) => link.id === linkId);
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    if (!updatedLink) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      link: {
        ...updatedLink,
        shareUrl: generateShareableURL(updatedLink.link_token),
        daysRemaining: getExpirationMessage(updatedLink as any),
      },
    });
  } catch (error) {
    return handleApiError(error, "Failed to update shareable link");
  }
}
