import jsPDF from "jspdf";
import { UserPreferences } from "@/lib/supabase";

export async function generatePDF(preferences: UserPreferences, userName: string): Promise<void> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPosition = margin;

  // Header
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Legacy Words - Their Story", pageWidth / 2, yPosition, { align: "center" });
  yPosition += 15;

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Created for: ${userName}`, pageWidth / 2, yPosition, { align: "center" });
  yPosition += 20;

  // Basic Information
  if (preferences.age || preferences.location) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Basic Information", margin, yPosition);
    yPosition += 10;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    if (preferences.age) {
      doc.text(`Age: ${preferences.age}`, margin, yPosition);
      yPosition += 7;
    }
    if (preferences.location) {
      doc.text(`Location: ${preferences.location}`, margin, yPosition);
      yPosition += 7;
    }
    yPosition += 5;
  }

  // Funeral Type
  if (preferences.funeral_type) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Funeral Type", margin, yPosition);
    yPosition += 10;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    const funeralTypeText =
      preferences.funeral_type === "cremation_service"
        ? "Cremation + Celebration"
        : preferences.funeral_type === "traditional"
        ? "Traditional Service"
        : preferences.funeral_type === "direct_cremation"
        ? "Direct Cremation"
        : preferences.funeral_type === "eco"
        ? "Eco Funeral"
        : preferences.funeral_type === "unsure"
        ? "I haven't decided yet"
        : "Not specified";
    doc.text(funeralTypeText, margin, yPosition);
    yPosition += 10;
  }

  // Location & Ceremony
  if ((preferences as any).preferred_location || (preferences as any).memorial_service_type) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Location & Ceremony", margin, yPosition);
    yPosition += 10;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    if ((preferences as any).preferred_location) {
      doc.text(`Preferred location: ${(preferences as any).preferred_location}`, margin, yPosition);
      yPosition += 7;
    }
    if ((preferences as any).memorial_service_type) {
      doc.text(`Memorial service type: ${(preferences as any).memorial_service_type}`, margin, yPosition);
      yPosition += 7;
    }
    yPosition += 5;
  }

  // Wishes
  const wishesSections = [
    { title: "General Wishes", content: (preferences as any).wishes },
    { title: "Music Preferences", content: preferences.music_preferences },
    { title: "Flower Preferences", content: preferences.flower_preferences },
    { title: "Guest Preferences", content: (preferences as any).guest_preferences },
    { title: "Readings & Speeches", content: (preferences as any).text_preferences },
  ];

  for (const section of wishesSections) {
    if (section.content) {
      // Check if we need to add a new page
      if (yPosition > 250) {
        doc.addPage();
        yPosition = margin;
      }

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(section.title, margin, yPosition);
      yPosition += 10;

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(section.content, pageWidth - 2 * margin);
      doc.text(lines, margin, yPosition);
      yPosition += lines.length * 7 + 5;
    }
  }

  // Footer
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.text(
      `Page ${i} of ${totalPages} | Generated via MemoryKeeper`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" }
    );
  }

  // Save PDF
  doc.save(`memorykeeper-story-${Date.now()}.pdf`);
}

