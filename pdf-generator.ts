// Memory Keeper: PDF Generator for new interview structure
// Generates beautiful PDF from 32-question interview responses

import jsPDF from "jspdf";
import {
  INTERVIEW_CATEGORIES,
  getCategoryByStep,
  type InterviewQuestion,
} from "./interview";
import { MemoryInterviewData, calculateInterviewStats } from "./memory-data";

export interface PDFOptions {
  userName?: string;
  includeCoverPage?: boolean;
  includeTableOfContents?: boolean;
  font?: "helvetica" | "times" | "courier";
}

export async function generateMemoryPDF(
  interviewData: MemoryInterviewData,
  options: PDFOptions = {}
): Promise<void> {
  const {
    userName = "Their Story",
    includeCoverPage = true,
    includeTableOfContents = true,
    font = "helvetica",
  } = options;

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  let yPosition = margin;

  // Helper function to add new page if needed
  const checkPageBreak = (requiredSpace: number = 20) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  // Helper function to add text with wrapping
  const addWrappedText = (
    text: string,
    fontSize: number,
    isBold: boolean = false,
    lineHeight: number = 7
  ) => {
    doc.setFontSize(fontSize);
    doc.setFont(font, isBold ? "bold" : "normal");
    const lines = doc.splitTextToSize(text, contentWidth);
    
    lines.forEach((line: string) => {
      checkPageBreak(lineHeight);
      doc.text(line, margin, yPosition);
      yPosition += lineHeight;
    });
    
    yPosition += 3; // Space after text block
  };

  // Cover Page
  if (includeCoverPage) {
    doc.setFillColor(59, 130, 246); // brand-blue
    doc.rect(0, 0, pageWidth, pageHeight, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(32);
    doc.setFont(font, "bold");
    doc.text("Legacy Words", pageWidth / 2, pageHeight / 2 - 20, { align: "center" });
    
    doc.setFontSize(18);
    doc.setFont(font, "normal");
    doc.text("Their Story", pageWidth / 2, pageHeight / 2, { align: "center" });
    
    doc.setFontSize(12);
    doc.text(`Created: ${new Date().toLocaleDateString("en-GB")}`, pageWidth / 2, pageHeight / 2 + 15, { align: "center" });
    
    doc.addPage();
    yPosition = margin;
    doc.setTextColor(0, 0, 0);
  }

  // Table of Contents
  if (includeTableOfContents) {
    addWrappedText("Table of Contents", 18, true, 10);
    yPosition += 5;

    INTERVIEW_CATEGORIES.forEach((category) => {
      const hasAnswers = category.questions.some((q) => {
        const answer = interviewData[q.fieldName as keyof MemoryInterviewData];
        return answer && typeof answer === "string" && answer.trim().length >= 10;
      });
      
      if (hasAnswers) {
        doc.setFontSize(12);
        doc.setFont(font, "normal");
        doc.text(`${category.step}. ${category.title}`, margin, yPosition);
        doc.text(`${category.questionCount} questions`, pageWidth - margin - 30, yPosition, { align: "right" });
        yPosition += 8;
      }
    });

    doc.addPage();
    yPosition = margin;
  }

  // Statistics
  const stats = calculateInterviewStats(interviewData);
  addWrappedText("Your Story - Summary", 18, true, 10);
  yPosition += 5;

  doc.setFontSize(11);
  doc.setFont(font, "normal");
  doc.text(`Total questions answered: ${stats.answeredQuestions} of ${stats.totalQuestions}`, margin, yPosition);
  yPosition += 7;
  doc.text(`Total words: ${stats.totalWords.toLocaleString()}`, margin, yPosition);
  yPosition += 7;
  doc.text(`Time spent: ~${Math.round(stats.totalWords / 100)} minutes`, margin, yPosition);
  yPosition += 15;

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

    if (categoryAnswers.length === 0) return;

    // Category Header
    checkPageBreak(30);
    addWrappedText(`${category.step}. ${category.title}`, 16, true, 10);
    doc.setFontSize(11);
    doc.setFont(font, "italic");
    doc.text(category.englishTitle, margin, yPosition);
    yPosition += 10;

    // Questions and Answers
    categoryAnswers.forEach(({ question, answer }) => {
      checkPageBreak(30);
      
      // Question (as pull-quote style)
      doc.setFillColor(240, 240, 240);
      doc.roundedRect(margin - 2, yPosition - 8, contentWidth + 4, 12, 2, 2, "F");
      
      doc.setFontSize(11);
      doc.setFont(font, "bold");
      doc.setTextColor(59, 130, 246); // brand-blue
      doc.text(`"${question.text}"`, margin, yPosition);
      yPosition += 10;
      doc.setTextColor(0, 0, 0);

      // Answer
      doc.setFontSize(11);
      doc.setFont(font, "normal");
      const answerLines = doc.splitTextToSize(answer || "", contentWidth);
      answerLines.forEach((line: string) => {
        checkPageBreak(7);
        doc.text(line, margin, yPosition);
        yPosition += 7;
      });

      yPosition += 8; // Space between Q&A pairs
    });

    yPosition += 10; // Space between categories
  });

  // Footer on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont(font, "italic");
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Page ${i} of ${totalPages} | Legacy Words - legacywords.co.uk`,
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" }
    );
    doc.setTextColor(0, 0, 0);
  }

  // Save PDF
  const timestamp = new Date().toISOString().split("T")[0];
  doc.save(`memory-keeper-story-${timestamp}.pdf`);
}

// Legacy compatibility function
export async function generatePDF(
  preferences: any,
  userName: string
): Promise<void> {
  // Convert old preferences format to new interview data format
  // Map old fields to new structure, preserving all existing fields
  const interviewData: MemoryInterviewData = {
    // Map old fields to new if they exist
    happiest_memory: preferences.happiest_memory,
    favorite_trip: preferences.favorite_trip,
    proudest_moment: preferences.proudest_moment || preferences.achievements,
    overcame_difficulty: preferences.overcame_difficulty,
    matters_most: preferences.matters_most || preferences.values,
    how_remembered: preferences.how_remembered,
    brings_peace: preferences.brings_peace,
    regret_not_telling: preferences.regret_not_telling,
    message_children: preferences.message_children,
    message_spouse: preferences.message_spouse,
    message_grandchildren: preferences.message_grandchildren,
    message_other: preferences.message_other,
    // Add all other interview fields from preferences
    ...Object.fromEntries(
      Object.entries(preferences).filter(([key]) => {
        // Include all fields that match interview field names
        const interviewFields = [
          "happiest_memory", "favorite_trip", "unforgettable_day", "proudest_moment",
          "biggest_laugh", "loved_moment", "best_friend", "overcame_difficulty",
          "met_partner", "children_young", "funny_family_moment", "passed_to_children",
          "relationship_parents", "family_together", "matters_most", "most_proud",
          "life_lessons", "brings_peace", "how_remembered", "regret_not_telling",
          "greatest_strength", "love_means", "favorite_hobbies", "important_people",
          "places_love", "favorite_things", "personality", "message_children",
          "message_spouse", "message_grandchildren", "message_family", "message_other",
        ];
        return interviewFields.includes(key);
      })
    ),
  };

  await generateMemoryPDF(interviewData, { userName });
}

