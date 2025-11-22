import { NextRequest, NextResponse } from "next/server";
import { generateEmailStory, generateEmailStoryHTML, generateFamilyEmail } from "@/lib/email-sharing";
import { sendEmail } from "@/lib/email";
import { getCurrentUserId, logActivity } from "@/lib/api";
import { emailShareSchema, validateData } from "@/lib/validation";
import { handleApiError, handleUnauthorizedError, handleBadRequestError, parseJsonBody } from "@/lib/api-error-handler";

export const dynamic = 'force-dynamic';

// POST /api/email-share - Generate and optionally send email version of story
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

    // Validate input
    const validation = validateData(emailShareSchema, bodyResult.data);
    if (!validation.success) {
      return handleBadRequestError("Validation failed", validation.errors);
    }

    const { interviewData, recipientEmails, senderName, sendEmails = false } = validation.data;

    // Generate email versions
    const emailText = generateEmailStory(interviewData);
    const emailHTML = generateEmailStoryHTML(interviewData);

    // If sending emails, generate and send to recipients
    if (sendEmails && recipientEmails && recipientEmails.length > 0 && senderName) {
      const emails = generateFamilyEmail(interviewData, recipientEmails, senderName);
      
      const results = await Promise.allSettled(
        emails.map((email) => sendEmail({ to: email.to, subject: email.subject, html: email.html }))
      );

      const successCount = results.filter((r) => r.status === "fulfilled").length;
      const failedCount = results.length - successCount;

      // Log activity
      await logActivity(
        userId,
        "shared_via_email",
        `Sent story to ${successCount} recipient(s)`
      );

      return NextResponse.json({
        success: true,
        emailText,
        emailHTML,
        emailsSent: successCount,
        emailsFailed: failedCount,
      });
    }

    // Log activity for email generation
    await logActivity(userId, "generated_email_story", "Generated email version of story");

    // Just return the email content
    return NextResponse.json({
      success: true,
      emailText,
      emailHTML,
    });
  } catch (error) {
    return handleApiError(error, "Failed to process email share");
  }
}
