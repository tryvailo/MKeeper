// Memory Keeper: Shareable Links Management
// Generate and manage shareable links with 30-day expiration

import crypto from "crypto";

export interface ShareableLink {
  id: string;
  user_id: string;
  link_token: string;
  created_at: string;
  expires_at: string; // 30 days from creation
  is_active: boolean;
  access_count?: number;
  last_accessed_at?: string;
}

/**
 * Generate a unique random token for shareable link
 */
export function generateLinkToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Create a shareable link with 30-day expiration
 */
export function createShareableLink(userId: string): ShareableLink {
  const now = new Date();
  const expiresAt = new Date(now);
  expiresAt.setDate(expiresAt.getDate() + 30); // 30 days from now

  return {
    id: `link_${Date.now()}_${crypto.randomBytes(8).toString("hex")}`,
    user_id: userId,
    link_token: generateLinkToken(),
    created_at: now.toISOString(),
    expires_at: expiresAt.toISOString(),
    is_active: true,
    access_count: 0,
  };
}

/**
 * Check if a shareable link is valid (not expired and active)
 */
export function isLinkValid(link: ShareableLink): boolean {
  if (!link.is_active) return false;
  const now = new Date();
  const expiresAt = new Date(link.expires_at);
  return now < expiresAt;
}

/**
 * Get days remaining until expiration
 */
export function getDaysRemaining(link: ShareableLink): number {
  const now = new Date();
  const expiresAt = new Date(link.expires_at);
  const diffTime = expiresAt.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

/**
 * Extend a shareable link by 30 days
 */
export function extendShareableLink(link: ShareableLink): ShareableLink {
  const expiresAt = new Date(link.expires_at);
  expiresAt.setDate(expiresAt.getDate() + 30); // Add 30 more days

  return {
    ...link,
    expires_at: expiresAt.toISOString(),
  };
}

/**
 * Generate shareable URL
 */
export function generateShareableURL(token: string, baseUrl?: string): string {
  const base = baseUrl || process.env.NEXT_PUBLIC_APP_URL || "https://legacywords.co.uk";
  return `${base}/share/${token}`;
}

/**
 * Format expiration message
 */
export function getExpirationMessage(link: ShareableLink): string {
  const daysRemaining = getDaysRemaining(link);
  
  if (daysRemaining === 0) {
    return "Expired";
  } else if (daysRemaining === 1) {
    return "Expires tomorrow";
  } else if (daysRemaining <= 7) {
    return `Expires in ${daysRemaining} days`;
  } else {
    const weeks = Math.floor(daysRemaining / 7);
    return `Expires in ${weeks} week${weeks > 1 ? "s" : ""}`;
  }
}

