import jsPDF from 'jspdf';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface BookingPDFData {
  booking_number: string;
  created_at: string;
  scheduled_date: string;
  scheduled_time_slot: string;
  service: {
    name: string;
    description: string;
    icon: string;
    base_price: number;
    estimated_duration: number;
  };
  booking_options: Array<{
    quantity: number;
    price_at_booking: number;
    option: {
      name: string;
      description: string;
    };
  }>;
  estimated_price: number;
  final_price: number | null;
  address: string;
  postal_code: string;
  city: string;
  access_code: string | null;
  floor: string | null;
  special_notes: string | null;
  client_name: string;
  client_email: string;
  client_phone: string;
  status: string;
}

export function generateBookingPDF(booking: BookingPDFData): jsPDF {
  const doc = new jsPDF();
  
  // Configuration des couleurs Fresh Lab'O
  const primaryCyan = [0, 191, 255] as const;
  const primaryOrange = [255, 140, 0] as const;
  const darkBlue = [26, 26, 77] as const;
  const gray = [107, 114, 128] as const;
  
  let yPos = 20;
  
  // En-tête avec logo et titre
  doc.setFillColor(...primaryCyan);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text("Fresh Lab'O", 20, 20);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Service de nettoyage professionnel', 20, 28);
  doc.text('06 95 05 77 96 | contact@freshlabo.com', 20, 34);
  
  // Numéro de devis/réservation
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  const rightX = 140;
  doc.text('DEVIS N°', rightX, 20);
  doc.setTextColor(...primaryOrange);
  doc.setFontSize(14);
  doc.text(booking.booking_number, rightX, 28);
  
  yPos = 50;
  
  // Date du document
  doc.setTextColor(...gray);
  doc.setFontSize(9);
  doc.text(`Généré le ${format(new Date(), 'd MMMM yyyy à HH:mm', { locale: fr })}`, 20, yPos);
  
  yPos += 10;
  
  // Ligne de séparation
  doc.setDrawColor(...primaryCyan);
  doc.setLineWidth(0.5);
  doc.line(20, yPos, 190, yPos);
  
  yPos += 10;
  
  // Informations client
  doc.setTextColor(...darkBlue);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('INFORMATIONS CLIENT', 20, yPos);
  
  yPos += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...gray);
  
  doc.text(`Nom : ${booking.client_name}`, 20, yPos);
  yPos += 6;
  doc.text(`Email : ${booking.client_email}`, 20, yPos);
  yPos += 6;
  doc.text(`Téléphone : ${booking.client_phone}`, 20, yPos);
  
  yPos += 10;
  
  // Ligne de séparation
  doc.setDrawColor(...primaryCyan);
  doc.line(20, yPos, 190, yPos);
  
  yPos += 10;
  
  // Détails de l'intervention
  doc.setTextColor(...darkBlue);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('DÉTAILS DE L\'INTERVENTION', 20, yPos);
  
  yPos += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...gray);
  
  doc.text(`Service : ${booking.service.name}`, 20, yPos);
  yPos += 6;
  
  if (booking.service.description) {
    const descLines = doc.splitTextToSize(booking.service.description, 170);
    doc.setFontSize(9);
    doc.text(descLines, 20, yPos);
    yPos += descLines.length * 5;
  }
  
  yPos += 4;
  doc.setFontSize(10);
  doc.text(
    `Date : ${format(new Date(booking.scheduled_date), 'EEEE d MMMM yyyy', { locale: fr })}`,
    20,
    yPos
  );
  yPos += 6;
  
  const timeSlot = booking.scheduled_time_slot === 'morning' 
    ? 'Matin (8h-12h)' 
    : 'Après-midi (14h-18h)';
  doc.text(`Créneau : ${timeSlot}`, 20, yPos);
  yPos += 6;
  
  doc.text(`Durée estimée : ${booking.service.estimated_duration} minutes`, 20, yPos);
  yPos += 6;
  
  doc.text(`Adresse : ${booking.address}`, 20, yPos);
  yPos += 6;
  doc.text(`${booking.postal_code} ${booking.city}`, 20, yPos);
  yPos += 6;
  
  if (booking.floor) {
    doc.text(`Étage : ${booking.floor}`, 20, yPos);
    yPos += 6;
  }
  
  if (booking.access_code) {
    doc.text(`Code d'accès : ${booking.access_code}`, 20, yPos);
    yPos += 6;
  }
  
  if (booking.special_notes) {
    yPos += 4;
    doc.setFont('helvetica', 'bold');
    doc.text('Notes spéciales :', 20, yPos);
    yPos += 6;
    doc.setFont('helvetica', 'normal');
    const notesLines = doc.splitTextToSize(booking.special_notes, 170);
    doc.setFontSize(9);
    doc.text(notesLines, 20, yPos);
    yPos += notesLines.length * 5;
  }
  
  yPos += 10;
  
  // Ligne de séparation
  doc.setDrawColor(...primaryCyan);
  doc.line(20, yPos, 190, yPos);
  
  yPos += 10;
  
  // Détail des prix
  doc.setTextColor(...darkBlue);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('DÉTAIL DU DEVIS', 20, yPos);
  
  yPos += 8;
  
  // En-têtes du tableau
  doc.setFillColor(240, 240, 240);
  doc.rect(20, yPos - 4, 170, 8, 'F');
  
  doc.setFontSize(9);
  doc.setTextColor(...darkBlue);
  doc.text('Désignation', 25, yPos);
  doc.text('Qté', 140, yPos);
  doc.text('Prix', 170, yPos);
  
  yPos += 8;
  
  // Prestation de base
  doc.setFontSize(10);
  doc.setTextColor(...gray);
  doc.setFont('helvetica', 'normal');
  doc.text('Prestation de base', 25, yPos);
  doc.text('1', 140, yPos);
  doc.text(`${booking.service.base_price.toFixed(2)} €`, 170, yPos, { align: 'right' });
  yPos += 6;
  
  // Options
  booking.booking_options.forEach((opt) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.text(opt.option.name, 25, yPos);
    doc.text(opt.quantity.toString(), 140, yPos);
    const optPrice = opt.price_at_booking * opt.quantity;
    doc.text(`${optPrice.toFixed(2)} €`, 170, yPos, { align: 'right' });
    yPos += 6;
  });
  
  yPos += 4;
  
  // Ligne de séparation
  doc.setDrawColor(...primaryCyan);
  doc.setLineWidth(1);
  doc.line(20, yPos, 190, yPos);
  
  yPos += 8;
  
  // Total estimé
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkBlue);
  doc.text('TOTAL ESTIMÉ', 25, yPos);
  
  doc.setTextColor(...primaryCyan);
  doc.setFontSize(14);
  doc.text(`${booking.estimated_price.toFixed(2)} €`, 170, yPos, { align: 'right' });
  
  yPos += 10;
  
  // Prix final si différent
  if (booking.final_price && booking.final_price !== booking.estimated_price) {
    doc.setFontSize(12);
    doc.setTextColor(...darkBlue);
    doc.text('PRIX FINAL', 25, yPos);
    
    doc.setTextColor(...primaryOrange);
    doc.setFontSize(14);
    doc.text(`${booking.final_price.toFixed(2)} €`, 170, yPos, { align: 'right' });
    
    yPos += 10;
  }
  
  // Note de bas de page
  yPos += 5;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(...gray);
  const noteText = '* Le prix final pourra être ajusté après l\'intervention en fonction de l\'état réel constaté.';
  doc.text(noteText, 20, yPos);
  
  // Pied de page
  const footerY = 280;
  doc.setDrawColor(...primaryCyan);
  doc.setLineWidth(0.5);
  doc.line(20, footerY, 190, footerY);
  
  doc.setFontSize(8);
  doc.setTextColor(...gray);
  doc.setFont('helvetica', 'normal');
  doc.text('Fresh Lab\'O - Service de nettoyage professionnel', 105, footerY + 5, { align: 'center' });
  doc.text('Paris & Île-de-France | 06 95 05 77 96 | contact@freshlabo.com', 105, footerY + 10, { align: 'center' });
  
  return doc;
}

export function downloadBookingPDF(booking: BookingPDFData, filename?: string): void {
  const doc = generateBookingPDF(booking);
  const pdfFilename = filename || `Devis_FreshLabO_${booking.booking_number}.pdf`;
  doc.save(pdfFilename);
}
