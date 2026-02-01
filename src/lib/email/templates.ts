import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface BookingEmailData {
  booking_number: string;
  client_name: string;
  service_name: string;
  scheduled_date: string;
  scheduled_time_slot: 'morning' | 'afternoon';
  address: string;
  city: string;
  postal_code: string;
  estimated_price: number;
  estimated_duration: number;
}

export function getBookingConfirmationEmailHTML(data: BookingEmailData): string {
  const timeSlot = data.scheduled_time_slot === 'morning' 
    ? 'Matin (8h-12h)' 
    : 'Après-midi (14h-18h)';
    
  const formattedDate = format(
    new Date(data.scheduled_date), 
    'EEEE d MMMM yyyy', 
    { locale: fr }
  );

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmation de réservation - Fresh Lab'O</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #374151;
      background-color: #f3f4f6;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background: linear-gradient(135deg, #00BFFF 0%, #0F1035 100%);
      padding: 40px 30px;
      text-align: center;
    }
    .logo {
      font-size: 32px;
      font-weight: bold;
      color: #ffffff;
      margin-bottom: 10px;
    }
    .tagline {
      color: #40E0D0;
      font-size: 14px;
    }
    .content {
      padding: 40px 30px;
    }
    .greeting {
      font-size: 24px;
      font-weight: bold;
      color: #1A1A4D;
      margin-bottom: 20px;
    }
    .confirmation-badge {
      background: linear-gradient(135deg, #40E0D0, #00BFFF);
      color: white;
      padding: 15px 25px;
      border-radius: 12px;
      text-align: center;
      margin: 30px 0;
      font-size: 18px;
      font-weight: bold;
    }
    .booking-number {
      font-size: 24px;
      color: #FF8C00;
      margin-top: 10px;
    }
    .info-section {
      background-color: #f9fafb;
      border-left: 4px solid #00BFFF;
      padding: 20px;
      margin: 20px 0;
      border-radius: 8px;
    }
    .info-title {
      font-size: 18px;
      font-weight: bold;
      color: #1A1A4D;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .info-row {
      display: flex;
      padding: 10px 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .info-row:last-child {
      border-bottom: none;
    }
    .info-label {
      font-weight: 600;
      color: #6b7280;
      min-width: 140px;
    }
    .info-value {
      color: #111827;
      flex: 1;
    }
    .price-section {
      background: linear-gradient(135deg, #fff5eb, #ffe4cc);
      padding: 20px;
      border-radius: 12px;
      margin: 30px 0;
      text-align: center;
    }
    .price-label {
      font-size: 16px;
      color: #7c2d12;
      margin-bottom: 10px;
    }
    .price-value {
      font-size: 36px;
      font-weight: bold;
      color: #FF8C00;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #FF8C00, #FFB347);
      color: white;
      padding: 15px 40px;
      text-decoration: none;
      border-radius: 12px;
      font-weight: bold;
      font-size: 16px;
      margin: 20px 0;
      text-align: center;
    }
    .cta-button:hover {
      opacity: 0.9;
    }
    .tips-section {
      background-color: #ecfeff;
      border: 1px solid #67e8f9;
      border-radius: 12px;
      padding: 20px;
      margin: 30px 0;
    }
    .tips-title {
      font-size: 18px;
      font-weight: bold;
      color: #0e7490;
      margin-bottom: 15px;
    }
    .tips-list {
      list-style: none;
      padding: 0;
    }
    .tips-list li {
      padding: 8px 0;
      padding-left: 30px;
      position: relative;
      color: #155e75;
    }
    .tips-list li:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #00BFFF;
      font-weight: bold;
      font-size: 18px;
    }
    .footer {
      background-color: #1A1A4D;
      color: #9ca3af;
      padding: 30px;
      text-align: center;
      font-size: 14px;
    }
    .footer-links {
      margin: 20px 0;
    }
    .footer-links a {
      color: #40E0D0;
      text-decoration: none;
      margin: 0 15px;
    }
    .footer-links a:hover {
      text-decoration: underline;
    }
    .social-links {
      margin: 20px 0;
    }
    .social-links a {
      display: inline-block;
      margin: 0 10px;
      color: #40E0D0;
      text-decoration: none;
    }
    @media only screen and (max-width: 600px) {
      .content {
        padding: 20px 15px;
      }
      .info-row {
        flex-direction: column;
      }
      .info-label {
        margin-bottom: 5px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="logo">Fresh Lab'O 🧼</div>
      <div class="tagline">Service de nettoyage professionnel</div>
    </div>

    <!-- Content -->
    <div class="content">
      <div class="greeting">Bonjour ${data.client_name},</div>
      
      <p style="font-size: 16px; color: #4b5563; margin-bottom: 20px;">
        Nous sommes ravis de confirmer votre réservation chez Fresh Lab'O ! 
        Votre espace sera bientôt rafraîchi par nos experts.
      </p>

      <!-- Confirmation Badge -->
      <div class="confirmation-badge">
        ✅ Réservation confirmée
        <div class="booking-number">N° ${data.booking_number}</div>
      </div>

      <!-- Service Info -->
      <div class="info-section">
        <div class="info-title">🧼 Détails du service</div>
        <div class="info-row">
          <div class="info-label">Service</div>
          <div class="info-value"><strong>${data.service_name}</strong></div>
        </div>
        <div class="info-row">
          <div class="info-label">Date</div>
          <div class="info-value"><strong>${formattedDate}</strong></div>
        </div>
        <div class="info-row">
          <div class="info-label">Créneau horaire</div>
          <div class="info-value"><strong>${timeSlot}</strong></div>
        </div>
        <div class="info-row">
          <div class="info-label">Durée estimée</div>
          <div class="info-value">${data.estimated_duration} minutes</div>
        </div>
      </div>

      <!-- Location Info -->
      <div class="info-section">
        <div class="info-title">📍 Adresse d'intervention</div>
        <div class="info-row">
          <div class="info-value">
            ${data.address}<br>
            ${data.postal_code} ${data.city}
          </div>
        </div>
      </div>

      <!-- Price -->
      <div class="price-section">
        <div class="price-label">Prix estimé</div>
        <div class="price-value">${data.estimated_price}€</div>
      </div>

      <!-- CTA Button -->
      <div style="text-align: center;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="cta-button">
          Voir ma réservation
        </a>
      </div>

      <!-- Tips Section -->
      <div class="tips-section">
        <div class="tips-title">💡 Pour une intervention optimale</div>
        <ul class="tips-list">
          <li>Assurez-vous que l'espace à nettoyer est accessible</li>
          <li>Prévoyez une prise électrique à proximité</li>
          <li>Retirez les objets fragiles ou personnels</li>
          <li>Nos techniciens vous contacteront 24h avant l'intervention</li>
        </ul>
      </div>

      <p style="font-size: 14px; color: #6b7280; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <strong>Besoin de modifier ou d'annuler ?</strong><br>
        Rendez-vous sur votre <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="color: #00BFFF;">espace client</a> 
        ou contactez-nous au <strong>06 95 05 77 96</strong>
      </p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div style="font-size: 16px; color: #ffffff; margin-bottom: 15px;">
        <strong>Fresh Lab'O</strong>
      </div>
      
      <div class="footer-links">
        <a href="${process.env.NEXT_PUBLIC_APP_URL}">Accueil</a>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/services">Services</a>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/contact">Contact</a>
      </div>

      <div style="margin: 20px 0;">
        📞 06 95 05 77 96<br>
        📧 contact@freshlabo.com<br>
        📍 Paris & Île-de-France
      </div>

      <div style="font-size: 12px; color: #6b7280; margin-top: 20px;">
        © ${new Date().getFullYear()} Fresh Lab'O. Tous droits réservés.
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

export function getBookingConfirmationEmailText(data: BookingEmailData): string {
  const timeSlot = data.scheduled_time_slot === 'morning' 
    ? 'Matin (8h-12h)' 
    : 'Après-midi (14h-18h)';
    
  const formattedDate = format(
    new Date(data.scheduled_date), 
    'EEEE d MMMM yyyy', 
    { locale: fr }
  );

  return `
Bonjour ${data.client_name},

Nous sommes ravis de confirmer votre réservation chez Fresh Lab'O !

✅ RÉSERVATION CONFIRMÉE
N° ${data.booking_number}

🧼 DÉTAILS DU SERVICE
Service: ${data.service_name}
Date: ${formattedDate}
Créneau: ${timeSlot}
Durée estimée: ${data.estimated_duration} minutes

📍 ADRESSE D'INTERVENTION
${data.address}
${data.postal_code} ${data.city}

💰 PRIX ESTIMÉ: ${data.estimated_price}€

💡 CONSEILS POUR UNE INTERVENTION OPTIMALE
- Assurez-vous que l'espace à nettoyer est accessible
- Prévoyez une prise électrique à proximité
- Retirez les objets fragiles ou personnels
- Nos techniciens vous contacteront 24h avant l'intervention

BESOIN DE MODIFIER OU D'ANNULER ?
Rendez-vous sur votre espace client: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard
Ou contactez-nous au 06 95 05 77 96

---
Fresh Lab'O - Service de nettoyage professionnel
📞 06 95 05 77 96 | 📧 contact@freshlabo.com
📍 Paris & Île-de-France

${process.env.NEXT_PUBLIC_APP_URL}
  `.trim();
}

export function getReminderEmailHTML(data: BookingEmailData): string {
  const timeSlot = data.scheduled_time_slot === 'morning' 
    ? 'Matin (8h-12h)' 
    : 'Après-midi (14h-18h)';
    
  const formattedDate = format(
    new Date(data.scheduled_date), 
    'EEEE d MMMM yyyy', 
    { locale: fr }
  );

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rappel - Intervention demain - Fresh Lab'O</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #374151;
      background-color: #f3f4f6;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background: linear-gradient(135deg, #FF8C00 0%, #FFB347 100%);
      padding: 40px 30px;
      text-align: center;
    }
    .logo {
      font-size: 32px;
      font-weight: bold;
      color: #ffffff;
      margin-bottom: 10px;
    }
    .content {
      padding: 40px 30px;
    }
    .alert-badge {
      background: linear-gradient(135deg, #FF8C00, #FFB347);
      color: white;
      padding: 20px;
      border-radius: 12px;
      text-align: center;
      margin: 30px 0;
      font-size: 20px;
      font-weight: bold;
    }
    .info-section {
      background-color: #fff7ed;
      border-left: 4px solid #FF8C00;
      padding: 20px;
      margin: 20px 0;
      border-radius: 8px;
    }
    .info-title {
      font-size: 18px;
      font-weight: bold;
      color: #1A1A4D;
      margin-bottom: 15px;
    }
    .info-row {
      padding: 10px 0;
      border-bottom: 1px solid #fed7aa;
    }
    .info-row:last-child {
      border-bottom: none;
    }
    .info-label {
      font-weight: 600;
      color: #9a3412;
      display: block;
      margin-bottom: 5px;
    }
    .info-value {
      color: #111827;
      font-size: 16px;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #00BFFF, #40E0D0);
      color: white;
      padding: 15px 40px;
      text-decoration: none;
      border-radius: 12px;
      font-weight: bold;
      font-size: 16px;
      margin: 20px 0;
    }
    .footer {
      background-color: #1A1A4D;
      color: #9ca3af;
      padding: 30px;
      text-align: center;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Fresh Lab'O 🧼</div>
    </div>

    <div class="content">
      <div class="alert-badge">
        ⏰ Rappel : Votre intervention est prévue demain !
      </div>

      <p style="font-size: 16px; color: #4b5563; margin-bottom: 30px;">
        Bonjour ${data.client_name},<br><br>
        Nous vous rappelons que votre intervention Fresh Lab'O est programmée pour demain.
        Notre équipe sera ravie de rafraîchir votre espace !
      </p>

      <div class="info-section">
        <div class="info-title">📋 Récapitulatif</div>
        <div class="info-row">
          <div class="info-label">Service</div>
          <div class="info-value"><strong>${data.service_name}</strong></div>
        </div>
        <div class="info-row">
          <div class="info-label">Date</div>
          <div class="info-value"><strong>${formattedDate}</strong></div>
        </div>
        <div class="info-row">
          <div class="info-label">Créneau</div>
          <div class="info-value"><strong>${timeSlot}</strong></div>
        </div>
        <div class="info-row">
          <div class="info-label">Adresse</div>
          <div class="info-value">${data.address}, ${data.postal_code} ${data.city}</div>
        </div>
      </div>

      <div style="background-color: #ecfeff; border-radius: 12px; padding: 20px; margin: 30px 0;">
        <p style="font-size: 16px; color: #0e7490; margin-bottom: 15px;">
          <strong>✓ Vérifiez que tout est prêt :</strong>
        </p>
        <ul style="color: #155e75; padding-left: 20px;">
          <li>L'espace est accessible et dégagé</li>
          <li>Une prise électrique est disponible</li>
          <li>Les objets fragiles sont retirés</li>
        </ul>
      </div>

      <div style="text-align: center;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="cta-button">
          Voir les détails
        </a>
      </div>

      <p style="font-size: 14px; color: #6b7280; margin-top: 30px; text-align: center;">
        Une question ? Contactez-nous au <strong>06 95 05 77 96</strong>
      </p>
    </div>

    <div class="footer">
      <strong>Fresh Lab'O</strong><br>
      📞 06 95 05 77 96 | 📧 contact@freshlabo.com
    </div>
  </div>
</body>
</html>
  `;
}

export function getReminderEmailText(data: BookingEmailData): string {
  const timeSlot = data.scheduled_time_slot === 'morning' 
    ? 'Matin (8h-12h)' 
    : 'Après-midi (14h-18h)';
    
  const formattedDate = format(
    new Date(data.scheduled_date), 
    'EEEE d MMMM yyyy', 
    { locale: fr }
  );

  return `
⏰ RAPPEL : Intervention demain

Bonjour ${data.client_name},

Nous vous rappelons que votre intervention Fresh Lab'O est programmée pour demain.

📋 RÉCAPITULATIF
Service: ${data.service_name}
Date: ${formattedDate}
Créneau: ${timeSlot}
Adresse: ${data.address}, ${data.postal_code} ${data.city}

✓ VÉRIFIEZ QUE TOUT EST PRÊT :
- L'espace est accessible et dégagé
- Une prise électrique est disponible
- Les objets fragiles sont retirés

Une question ? Contactez-nous au 06 95 05 77 96

---
Fresh Lab'O
${process.env.NEXT_PUBLIC_APP_URL}
  `.trim();
}
