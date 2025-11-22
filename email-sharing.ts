// Memory Keeper: Email Sharing Functions
// Generate plain-text and HTML email versions of the story

import { MemoryInterviewData, calculateInterviewStats } from "./memory-data";
import { INTERVIEW_CATEGORIES } from "./interview";

export interface EmailStoryOptions {
  userName?: string;
  includeStatistics?: boolean;
  includeAllCategories?: boolean;
}

/**
 * Generate plain-text email version of the story
 * Formatted for email clients, clickable sections
 */
export function generateEmailStory(
  interviewData: MemoryInterviewData,
  options: EmailStoryOptions = {}
): string {
  const { userName = "Their Story", includeStatistics = true, includeAllCategories = true } = options;
  const stats = calculateInterviewStats(interviewData);

  let email = "";
  const separator = "=".repeat(50);

  // Header
  email += separator + "\n";
  email += "  LEGACY WORDS - " + userName.toUpperCase() + "\n";
  email += separator + "\n\n";

  // Statistics
  if (includeStatistics) {
    email += "Your Story Summary\n";
    email += separator + "\n";
    email += "Questions answered: " + stats.answeredQuestions + " of " + stats.totalQuestions + "\n";
    email += "Words written: " + stats.totalWords.toLocaleString() + "\n";
    email += "Categories completed: " + Object.keys(stats.categories).filter((k) => stats.categories[parseInt(k)].answered > 0).length + " of 5\n\n";
  }

  // Content by Category
  INTERVIEW_CATEGORIES.forEach((category) => {
    const categoryAnswers = category.questions
      .map((q) => ({
        question: q,
        answer: interviewData[q.fieldName as keyof MemoryInterviewData],
      }))
      .filter((item) => {
        const answer = item.answer;
        return answer && typeof answer === "string" && answer.trim().length >= 10;
      });

    if (categoryAnswers.length === 0 && !includeAllCategories) return;

    email += separator + "\n";
    email += category.step + ". " + category.title + "\n";
    email += category.englishTitle + "\n";
    email += separator + "\n\n";

    if (categoryAnswers.length === 0) {
      email += "(Not yet answered)\n\n";
    } else {
      categoryAnswers.forEach(({ question, answer }) => {
        email += "Q: " + question.text + "\n";
        email += "A: " + answer + "\n\n";
      });
    }
  });

  // Footer
  email += separator + "\n";
  email += "Generated via Legacy Words\n";
  email += "legacywords.co.uk\n";
  email += separator + "\n";

  return email;
}

/**
 * Generate HTML email version of the story
 * Beautifully formatted for email clients
 */
export function generateEmailStoryHTML(
  interviewData: MemoryInterviewData,
  options: EmailStoryOptions = {}
): string {
  const { userName = "Their Story", includeStatistics = true, includeAllCategories = true } = options;
  const stats = calculateInterviewStats(interviewData);

  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${userName} - Legacy Words</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #111827; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
      <div style="background-color: #ffffff; border-radius: 8px; padding: 40px; border: 1px solid #e5e7eb;">
        <h1 style="color: #1E40AF; font-size: 28px; margin-bottom: 10px; text-align: center;">Legacy Words</h1>
        <h2 style="color: #374151; font-size: 22px; margin-bottom: 30px; text-align: center; font-weight: normal;">${userName}</h2>
  `;

  // Statistics
  if (includeStatistics) {
    html += `
        <div style="background-color: #eff6ff; border-left: 4px solid #1E40AF; padding: 16px; margin-bottom: 30px; border-radius: 4px;">
          <h3 style="margin-top: 0; color: #1E40AF; font-size: 16px;">Your Story Summary</h3>
          <p style="margin: 8px 0; font-size: 14px; color: #374151;">
            <strong>Questions answered:</strong> ${stats.answeredQuestions} of ${stats.totalQuestions}<br>
            <strong>Words written:</strong> ${stats.totalWords.toLocaleString()}<br>
            <strong>Categories completed:</strong> ${Object.keys(stats.categories).filter((k) => stats.categories[parseInt(k)].answered > 0).length} of 5
          </p>
        </div>
    `;
  }

  // Content by Category
  INTERVIEW_CATEGORIES.forEach((category) => {
    const categoryAnswers = category.questions
      .map((q) => ({
        question: q,
        answer: interviewData[q.fieldName as keyof MemoryInterviewData],
      }))
      .filter((item) => {
        const answer = item.answer;
        return answer && typeof answer === "string" && answer.trim().length >= 10;
      });

    if (categoryAnswers.length === 0 && !includeAllCategories) return;

    html += `
        <div style="margin-bottom: 40px; padding-bottom: 30px; border-bottom: 2px solid #e5e7eb;">
          <h3 style="color: #1E40AF; font-size: 20px; margin-bottom: 5px;">${category.step}. ${category.title}</h3>
          <p style="color: #6B7280; font-size: 14px; margin-bottom: 20px; font-style: italic;">${category.englishTitle}</p>
    `;

    if (categoryAnswers.length === 0) {
      html += `<p style="color: #9CA3AF; font-style: italic;">(Not yet answered)</p>`;
    } else {
      categoryAnswers.forEach(({ question, answer }) => {
        html += `
          <div style="margin-bottom: 24px;">
            <p style="font-weight: 600; color: #374151; margin-bottom: 8px; font-size: 15px;">Q: ${question.text}</p>
            <p style="color: #111827; margin: 0; white-space: pre-wrap; line-height: 1.7;">${answer}</p>
          </div>
        `;
      });
    }

    html += `</div>`;
  });

  // Footer
  html += `
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
          <p style="font-size: 12px; color: #9CA3AF; margin: 0;">
            Generated via Legacy Words<br>
            <a href="https://legacywords.co.uk" style="color: #1E40AF; text-decoration: none;">legacywords.co.uk</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  return html;
}

/**
 * Generate "send to all family" email
 * One-click option to send story to multiple recipients
 */
export function generateFamilyEmail(
  interviewData: MemoryInterviewData,
  recipientEmails: string[],
  senderName: string,
  options: EmailStoryOptions = {}
): { to: string; subject: string; html: string; text: string }[] {
  const emailText = generateEmailStory(interviewData, options);
  const emailHTML = generateEmailStoryHTML(interviewData, options);

  return recipientEmails.map((recipientEmail) => ({
    to: recipientEmail,
    subject: `${senderName} shared their loved one's story with you`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #111827; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #ffffff; border-radius: 8px; padding: 40px; border: 1px solid #e5e7eb;">
          <p style="font-size: 16px; margin-bottom: 20px;">
            Hi there,
          </p>
          <p style="font-size: 16px; margin-bottom: 20px;">
            <strong>${senderName}</strong> wanted to share something important with you: their loved one's story. They've captured memories, values, who they are—and wanted you to have this.
          </p>
          <div style="background-color: #f3f4f6; border-left: 4px solid #1E40AF; padding: 16px; margin: 24px 0; border-radius: 4px;">
            <p style="margin: 0; font-size: 14px; color: #374151;">
              <strong>What is Legacy Words?</strong><br>
              Legacy Words helps dementia families preserve their loved one's story—who they are, what matters to them—before memories fade.
            </p>
          </div>
          <div style="margin: 32px 0;">
            ${(() => {
              const bodyMatch = emailHTML.match(/<body[^>]*>([\s\S]*?)<\/body>/);
              return bodyMatch ? bodyMatch[1] : emailHTML;
            })()}
          </div>
          <p style="font-size: 12px; color: #9CA3AF; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
            With care,<br>
            The Legacy Words Team
          </p>
        </div>
      </body>
      </html>
    `,
    text: `Hi there,\n\n${senderName} wanted to share something important with you: their loved one's story.\n\n${emailText}\n\nWith care,\nThe Legacy Words Team`,
  }));
}

