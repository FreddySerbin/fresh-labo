import { Resend } from 'resend';
import {
  getBookingConfirmationEmailHTML,
  getBookingConfirmationEmailText,
  getReminderEmailHTML,
  getReminderEmailText,
} from './templates';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_key');

export interface BookingEmailData {
  booking_number: string;
  client_name: string;
  client_email: string;
  service_name: string;
  scheduled_date: string;
  scheduled_time_slot: 'morning' | 'afternoon';
  address: string;
  city: string;
  postal_code: string;
  estimated_price: number;
  estimated_duration: number;
}

class EmailService {
  private fromEmail: string;
  private appName: string;

  constructor() {
    this.fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@freshlabo.com';
    this.appName = process.env.NEXT_PUBLIC_APP_NAME || "Fresh Lab'O";
  }

  /**
   * Send booking confirmation email
   */
  async sendBookingConfirmation(data: BookingEmailData): Promise<{ success: boolean; error?: string }> {
    try {
      const result = await resend.emails.send({
        from: `${this.appName} <${this.fromEmail}>`,
        to: data.client_email,
        subject: `✅ Réservation confirmée - ${data.booking_number}`,
        html: getBookingConfirmationEmailHTML(data),
        text: getBookingConfirmationEmailText(data),
        tags: [
          { name: 'category', value: 'booking_confirmation' },
          { name: 'booking_number', value: data.booking_number },
        ],
      });

      if (result.error) {
        console.error('Error sending confirmation email:', result.error);
        return { success: false, error: result.error.message };
      }

      console.log('Confirmation email sent:', result.data?.id);
      return { success: true };
    } catch (error: any) {
      console.error('Failed to send confirmation email:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Send booking reminder email (24h before)
   */
  async sendBookingReminder(data: BookingEmailData): Promise<{ success: boolean; error?: string }> {
    try {
      const result = await resend.emails.send({
        from: `${this.appName} <${this.fromEmail}>`,
        to: data.client_email,
        subject: `⏰ Rappel : Intervention demain - ${data.booking_number}`,
        html: getReminderEmailHTML(data),
        text: getReminderEmailText(data),
        tags: [
          { name: 'category', value: 'booking_reminder' },
          { name: 'booking_number', value: data.booking_number },
        ],
      });

      if (result.error) {
        console.error('Error sending reminder email:', result.error);
        return { success: false, error: result.error.message };
      }

      console.log('Reminder email sent:', result.data?.id);
      return { success: true };
    } catch (error: any) {
      console.error('Failed to send reminder email:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Send booking cancellation email
   */
  async sendBookingCancellation(
    data: BookingEmailData & { cancellation_reason?: string }
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const result = await resend.emails.send({
        from: `${this.appName} <${this.fromEmail}>`,
        to: data.client_email,
        subject: `❌ Réservation annulée - ${data.booking_number}`,
        html: this.getCancellationEmailHTML(data),
        text: this.getCancellationEmailText(data),
        tags: [
          { name: 'category', value: 'booking_cancellation' },
          { name: 'booking_number', value: data.booking_number },
        ],
      });

      if (result.error) {
        console.error('Error sending cancellation email:', result.error);
        return { success: false, error: result.error.message };
      }

      console.log('Cancellation email sent:', result.data?.id);
      return { success: true };
    } catch (error: any) {
      console.error('Failed to send cancellation email:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Send booking update email
   */
  async sendBookingUpdate(data: BookingEmailData): Promise<{ success: boolean; error?: string }> {
    try {
      const result = await resend.emails.send({
        from: `${this.appName} <${this.fromEmail}>`,
        to: data.client_email,
        subject: `✏️ Réservation modifiée - ${data.booking_number}`,
        html: this.getUpdateEmailHTML(data),
        text: this.getUpdateEmailText(data),
        tags: [
          { name: 'category', value: 'booking_update' },
          { name: 'booking_number', value: data.booking_number },
        ],
      });

      if (result.error) {
        console.error('Error sending update email:', result.error);
        return { success: false, error: result.error.message };
      }

      console.log('Update email sent:', result.data?.id);
      return { success: true };
    } catch (error: any) {
      console.error('Failed to send update email:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Send booking with PDF attachment
   */
  async sendBookingWithPDF(
    data: BookingEmailData,
    pdfBuffer: Buffer
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const result = await resend.emails.send({
        from: `${this.appName} <${this.fromEmail}>`,
        to: data.client_email,
        subject: `📄 Devis Fresh Lab'O - ${data.booking_number}`,
        html: getBookingConfirmationEmailHTML(data),
        text: getBookingConfirmationEmailText(data),
        attachments: [
          {
            filename: `Devis_FreshLabO_${data.booking_number}.pdf`,
            content: pdfBuffer,
          },
        ],
        tags: [
          { name: 'category', value: 'booking_with_pdf' },
          { name: 'booking_number', value: data.booking_number },
        ],
      });

      if (result.error) {
        console.error('Error sending email with PDF:', result.error);
        return { success: false, error: result.error.message };
      }

      console.log('Email with PDF sent:', result.data?.id);
      return { success: true };
    } catch (error: any) {
      console.error('Failed to send email with PDF:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Send contact form email
   */
  async sendContactFormEmail(data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }): Promise<{ success: boolean; error?: string }> {
    try {
      const result = await resend.emails.send({
        from: `${this.appName} <${this.fromEmail}>`,
        to: this.fromEmail, // Send to company email
        replyTo: data.email,
        subject: `📬 Contact : ${data.subject}`,
        html: `
          <h2>Nouveau message de contact</h2>
          <p><strong>Nom :</strong> ${data.name}</p>
          <p><strong>Email :</strong> ${data.email}</p>
          ${data.phone ? `<p><strong>Téléphone :</strong> ${data.phone}</p>` : ''}
          <p><strong>Sujet :</strong> ${data.subject}</p>
          <p><strong>Message :</strong></p>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
        `,
        tags: [{ name: 'category', value: 'contact_form' }],
      });

      if (result.error) {
        console.error('Error sending contact email:', result.error);
        return { success: false, error: result.error.message };
      }

      return { success: true };
    } catch (error: any) {
      console.error('Failed to send contact email:', error);
      return { success: false, error: error.message };
    }
  }

  private getCancellationEmailHTML(data: BookingEmailData & { cancellation_reason?: string }): string {
    return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #374151; }
    .container { max-width: 600px; margin: 0 auto; background: #fff; }
    .header { background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); padding: 40px 30px; text-align: center; color: white; }
    .content { padding: 40px 30px; }
    .info-box { background: #fef2f2; border-left: 4px solid #dc2626; padding: 20px; margin: 20px 0; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Fresh Lab'O</h1>
      <p>Réservation annulée</p>
    </div>
    <div class="content">
      <p>Bonjour ${data.client_name},</p>
      <p>Votre réservation <strong>${data.booking_number}</strong> a été annulée.</p>
      <div class="info-box">
        <p><strong>Service :</strong> ${data.service_name}</p>
        ${data.cancellation_reason ? `<p><strong>Raison :</strong> ${data.cancellation_reason}</p>` : ''}
      </div>
      <p>Nous espérons vous revoir bientôt !</p>
      <p>L'équipe Fresh Lab'O<br>06 95 05 77 96</p>
    </div>
  </div>
</body>
</html>
    `;
  }

  private getCancellationEmailText(data: BookingEmailData & { cancellation_reason?: string }): string {
    return `
Bonjour ${data.client_name},

Votre réservation ${data.booking_number} a été annulée.

Service : ${data.service_name}
${data.cancellation_reason ? `Raison : ${data.cancellation_reason}` : ''}

Nous espérons vous revoir bientôt !

L'équipe Fresh Lab'O
06 95 05 77 96
    `.trim();
  }

  private getUpdateEmailHTML(data: BookingEmailData): string {
    const timeSlot = data.scheduled_time_slot === 'morning' ? 'Matin (8h-12h)' : 'Après-midi (14h-18h)';
    return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #374151; }
    .container { max-width: 600px; margin: 0 auto; background: #fff; }
    .header { background: linear-gradient(135deg, #FF8C00 0%, #FFB347 100%); padding: 40px 30px; text-align: center; color: white; }
    .content { padding: 40px 30px; }
    .info-box { background: #fff7ed; border-left: 4px solid #FF8C00; padding: 20px; margin: 20px 0; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Fresh Lab'O</h1>
      <p>Réservation modifiée</p>
    </div>
    <div class="content">
      <p>Bonjour ${data.client_name},</p>
      <p>Votre réservation <strong>${data.booking_number}</strong> a été mise à jour.</p>
      <div class="info-box">
        <p><strong>Service :</strong> ${data.service_name}</p>
        <p><strong>Date :</strong> ${new Date(data.scheduled_date).toLocaleDateString('fr-FR')}</p>
        <p><strong>Créneau :</strong> ${timeSlot}</p>
        <p><strong>Adresse :</strong> ${data.address}, ${data.postal_code} ${data.city}</p>
      </div>
      <p>À bientôt !</p>
      <p>L'équipe Fresh Lab'O<br>06 95 05 77 96</p>
    </div>
  </div>
</body>
</html>
    `;
  }

  private getUpdateEmailText(data: BookingEmailData): string {
    const timeSlot = data.scheduled_time_slot === 'morning' ? 'Matin (8h-12h)' : 'Après-midi (14h-18h)';
    return `
Bonjour ${data.client_name},

Votre réservation ${data.booking_number} a été mise à jour.

Service : ${data.service_name}
Date : ${new Date(data.scheduled_date).toLocaleDateString('fr-FR')}
Créneau : ${timeSlot}
Adresse : ${data.address}, ${data.postal_code} ${data.city}

À bientôt !

L'équipe Fresh Lab'O
06 95 05 77 96
    `.trim();
  }
}

// Export singleton instance
export const emailService = new EmailService();
