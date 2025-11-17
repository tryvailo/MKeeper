import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { generateEmailStory, generateEmailStoryHTML, generateFamilyEmail } from "@/lib/email-sharing";
import { sendEmail } from "@/lib/email";

export const dynamic = 'force-dynamic';

// POST /api/email-share - Generate and optionally send email version of story
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { interviewData, recipientEmails, senderName, sendEmails = false } = await request.json();

    if (!interviewData) {
      return NextResponse.json({ error: "Missing interview data" }, { status: 400 });
    }

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

      return NextResponse.json({
        success: true,
        emailText,
        emailHTML,
        emailsSent: successCount,
        emailsFailed: failedCount,
      });
    }

    // Just return the email content
    return NextResponse.json({
      success: true,
      emailText,
      emailHTML,
    });
  } catch (error) {
    console.error("Error in email-share API:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

