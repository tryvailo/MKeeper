// Email service mock
// Future integration with Resend will be implemented here

export interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(template: EmailTemplate): Promise<{ success: boolean; messageId?: string; message?: string }> {
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(template.to)) {
    return {
      success: false,
      message: "Invalid email address format",
    };
  }

  try {
    // Mock implementation - in production this will send emails via Resend
    console.log("📧 Email would be sent:", {
      to: template.to,
      subject: template.subject,
      timestamp: new Date().toISOString(),
    });
    
    // In development mode, also log HTML to console for preview
    if (process.env.NODE_ENV === "development") {
      console.log("📧 Email HTML preview:", template.html.substring(0, 200) + "...");
    }

    // Simulate successful email send
    // In production, this would call Resend API here
    return {
      success: true,
      messageId: `mock-${Date.now()}`,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error sending email";
    console.error("Error in sendEmail:", errorMessage);
    return {
      success: false,
      message: errorMessage,
    };
  }
}

export async function sendWelcomeEmail(email: string, name: string) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Legacy Words</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #111827; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #ffffff; border-radius: 8px; padding: 40px; border: 1px solid #e5e7eb;">
        <h1 style="color: #1E40AF; font-size: 28px; margin-bottom: 20px;">Welcome to Legacy Words</h1>
        
        <p style="font-size: 16px; margin-bottom: 20px;">
          Hi ${name},
        </p>
        
        <p style="font-size: 16px; margin-bottom: 20px;">
          Thank you for joining Legacy Words. You've taken an important step to preserve what matters most—their story, their voice, their essence.
        </p>
        
        <div style="background-color: #eff6ff; border-left: 4px solid #1E40AF; padding: 16px; margin: 24px 0; border-radius: 4px;">
          <p style="margin: 0; font-size: 14px; color: #374151;">
            <strong>What's next?</strong><br>
            Start the guided interview (about 35-40 minutes, 32 questions across 5 categories). You can pause anytime and come back later. There's no rush—take it at your pace.
          </p>
        </div>
        
        <div style="text-align: center; margin: 32px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://legacywords.co.uk"}/onboarding" style="display: inline-block; background-color: #1E40AF; color: #ffffff; text-decoration: none; padding: 12px 32px; border-radius: 6px; font-weight: 600; font-size: 16px;">
            Start Capturing Their Story
          </a>
        </div>
        
        <p style="font-size: 14px; color: #6B7280; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
          Legacy Words is completely free. Always will be. No payment ever. No hidden fees.
        </p>
        
        <p style="font-size: 12px; color: #9CA3AF; margin-top: 24px;">
          With care,<br>
          The Legacy Words Team
        </p>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: "Welcome to Legacy Words",
    html,
  });
}

export async function sendShareInviteEmail(
  email: string,
  inviterName: string,
  shareLink: string,
  recipientName?: string,
  relationship?: string,
  accessLevel?: string
) {
  const accessLevelText = 
    accessLevel === "view_and_comment" ? "View & Comment (you can add your own memories)" :
    "View Only";

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>You've been invited to view their story</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #111827; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #ffffff; border-radius: 8px; padding: 40px; border: 1px solid #e5e7eb;">
        <h1 style="color: #1E40AF; font-size: 24px; margin-bottom: 20px;">You've been invited</h1>
        
        <p style="font-size: 16px; margin-bottom: 20px;">
          Hi${recipientName ? ` ${recipientName}` : ""},
        </p>
        
        <p style="font-size: 16px; margin-bottom: 20px;">
          <strong>${inviterName}</strong> has trusted you with something important: their loved one's story. They've captured memories, values, who they are—and wanted you to have access. This will mean everything to their family.
        </p>
        
        <p style="font-size: 16px; margin-bottom: 20px;">
          <strong>Your access level:</strong> ${accessLevelText}
        </p>
        
        <div style="background-color: #f3f4f6; border-left: 4px solid #1E40AF; padding: 16px; margin: 24px 0; border-radius: 4px;">
          <p style="margin: 0; font-size: 14px; color: #374151;">
            <strong>What is Legacy Words?</strong><br>
            Legacy Words helps dementia families preserve their loved one's story—who they are, what matters to them—before memories fade. This helps ensure their voice, values, and essence are preserved forever.
          </p>
        </div>
        
        <div style="text-align: center; margin: 32px 0;">
          <a href="${shareLink}" style="display: inline-block; background-color: #1E40AF; color: #ffffff; text-decoration: none; padding: 12px 32px; border-radius: 6px; font-weight: 600; font-size: 16px;">
            See Their Story
          </a>
        </div>
        
        <p style="font-size: 14px; color: #6B7280; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
          This link is private and secure. Only you have access to view their story.
        </p>
        
        <p style="font-size: 12px; color: #9CA3AF; margin-top: 24px;">
          Not sure why you got this? It might have been sent in error. Just delete the email and carry on.
        </p>
        
        <p style="font-size: 12px; color: #9CA3AF; margin-top: 16px;">
          With care,<br>
          The Legacy Words Team
        </p>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: `${inviterName} shared something important with you`,
    html,
  });
}

export async function sendAnnualReminderEmail(email: string, name: string) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Time to add more memories</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #111827; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #ffffff; border-radius: 8px; padding: 40px; border: 1px solid #e5e7eb;">
        <h1 style="color: #1E40AF; font-size: 24px; margin-bottom: 20px;">Their Story Grows</h1>
        
        <p style="font-size: 16px; margin-bottom: 20px;">
          Hi ${name},
        </p>
        
        <p style="font-size: 16px; margin-bottom: 20px;">
          It's been a while since you added memories to their story. Stories evolve, new moments happen, and there's always more to capture.
        </p>
        
        <p style="font-size: 16px; margin-bottom: 20px;">
          Want to add more memories? Come back anytime. Their story grows with you.
        </p>
        
        <div style="text-align: center; margin: 32px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://legacywords.co.uk"}/dashboard" style="display: inline-block; background-color: #1E40AF; color: #ffffff; text-decoration: none; padding: 12px 32px; border-radius: 6px; font-weight: 600; font-size: 16px;">
            Add More Memories
          </a>
        </div>
        
        <p style="font-size: 14px; color: #6B7280; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
          No pressure. No rush. Just when you're ready.
        </p>
        
        <p style="font-size: 12px; color: #9CA3AF; margin-top: 24px;">
          With care,<br>
          The Legacy Words Team
        </p>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: "Time to add more memories",
    html,
  });
}

