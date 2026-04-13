import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ChatMessage {
  role: string;
  content: string;
}

export async function exportChatToPDF(
  messages: ChatMessage[],
  blogTitle: string = "Blog Chat Export"
) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const maxWidth = pageWidth - 2 * margin;
  let yPosition = margin;

  // Set colors
  const primaryColor = [59, 130, 246]; // Blue
  const darkBg = [8, 8, 8]; // Black
  const textColor = [242, 240, 234]; // Light text

  // Header
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Chat Export', margin, 25);

  // Metadata
  yPosition = 50;
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  const exportDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  doc.text(`Blog Article: ${blogTitle}`, margin, yPosition);
  yPosition += 8;
  doc.text(`Exported: ${exportDate}`, margin, yPosition);
  yPosition += 8;
  doc.text(`Total Messages: ${messages.length}`, margin, yPosition);
  yPosition += 15;

  // Messages
  doc.setTextColor(...textColor);
  doc.setFontSize(11);
  
  messages.forEach((msg, index) => {
    const isUser = msg.role === 'user';
    const prefix = isUser ? '👤 You: ' : '🤖 Assistant: ';
    
    // Check if we need a new page
    if (yPosition > pageHeight - margin - 20) {
      doc.addPage();
      yPosition = margin;
    }

    // Message header
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(isUser ? 96, 165, 250 : 45, 186, 133);
    doc.text(prefix, margin, yPosition);
    
    yPosition += 6;
    
    // Message content
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...textColor);
    
    const wrappedText = doc.splitTextToSize(msg.content, maxWidth - 10);
    doc.text(wrappedText, margin + 5, yPosition);
    
    yPosition += wrappedText.length * 5 + 8;

    // Separator
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 8;
  });

  // Footer
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  
  for (let i = 1; i <= doc.internal.pages.length; i++) {
    doc.setPage(i);
    doc.text(`Page ${i}`, pageWidth - margin - 20, pageHeight - 10);
    doc.text('© 2025 Sybella Systems', margin, pageHeight - 10);
  }

  // Download
  const fileName = `chat-export-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
}