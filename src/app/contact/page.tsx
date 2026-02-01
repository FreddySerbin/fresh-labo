'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler l'envoi (à remplacer par l'API réelle)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-dark text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-display-small md:text-display-medium font-poppins font-bold mb-6">
                Contactez-Nous
              </h1>
              <p className="text-body-large text-gray-300">
                Une question ? Un besoin spécifique ? Notre équipe est là pour vous répondre
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                  <div>
                    <h2 className="text-display-small text-dark-blue font-poppins font-bold mb-6">
                      Parlons de Votre Projet
                    </h2>
                    <p className="text-body-large text-gray-600 mb-8">
                      Nous sommes disponibles pour répondre à toutes vos questions
                      et vous accompagner dans vos besoins de nettoyage professionnel.
                    </p>
                  </div>

                  {/* Contact Cards */}
                  <div className="space-y-6">
                    {/* Phone */}
                    <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
                      <div className="w-12 h-12 bg-gradient-fresh rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-heading-3 font-poppins font-bold text-dark-blue mb-2">
                          Téléphone
                        </h3>
                        <a 
                          href="tel:0695057796" 
                          className="text-body-large text-primary-cyan hover:text-primary-orange transition-colors"
                        >
                          06 95 05 77 96
                        </a>
                        <p className="text-body-small text-gray-600 mt-1">
                          Lundi - Samedi : 9h - 19h
                        </p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
                      <div className="w-12 h-12 bg-gradient-warm rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-heading-3 font-poppins font-bold text-dark-blue mb-2">
                          Email
                        </h3>
                        <a 
                          href="mailto:contact@freshlabo.com" 
                          className="text-body-large text-primary-cyan hover:text-primary-orange transition-colors"
                        >
                          contact@freshlabo.com
                        </a>
                        <p className="text-body-small text-gray-600 mt-1">
                          Réponse sous 24h
                        </p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
                      <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-heading-3 font-poppins font-bold text-dark-blue mb-2">
                          Zone d'intervention
                        </h3>
                        <p className="text-body text-gray-700">
                          Paris & Île-de-France
                        </p>
                        <p className="text-body-small text-gray-600 mt-1">
                          Départements 75, 77, 78, 91, 92, 93, 94, 95
                        </p>
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
                      <div className="w-12 h-12 bg-info rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-heading-3 font-poppins font-bold text-dark-blue mb-2">
                          Horaires
                        </h3>
                        <div className="text-body text-gray-700 space-y-1">
                          <p>Lundi - Vendredi : 9h - 19h</p>
                          <p>Samedi : 9h - 18h</p>
                          <p>Dimanche : Sur demande</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10">
                  <h3 className="text-heading-2 text-dark-blue font-poppins font-bold mb-6">
                    Envoyez-nous un Message
                  </h3>

                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-success/10 border border-success rounded-xl text-success">
                      ✓ Message envoyé avec succès ! Nous vous répondrons sous 24h.
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-body font-medium text-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-cyan focus:border-transparent transition-all"
                        placeholder="Votre nom"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-body font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-cyan focus:border-transparent transition-all"
                        placeholder="votre@email.com"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-body font-medium text-gray-700 mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-cyan focus:border-transparent transition-all"
                        placeholder="06 XX XX XX XX"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-body font-medium text-gray-700 mb-2">
                        Sujet *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-cyan focus:border-transparent transition-all"
                      >
                        <option value="">Sélectionnez un sujet</option>
                        <option value="devis">Demande de devis</option>
                        <option value="reservation">Question sur une réservation</option>
                        <option value="service">Question sur un service</option>
                        <option value="reclamation">Réclamation</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-body font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-cyan focus:border-transparent transition-all resize-none"
                        placeholder="Décrivez votre besoin..."
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      isLoading={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                      <Send className="ml-2" />
                    </Button>

                    <p className="text-body-small text-gray-500 text-center">
                      * Champs obligatoires
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Quick Links */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-display-small text-dark-blue font-poppins font-bold mb-6">
                Questions Fréquentes
              </h2>
              <p className="text-body-large text-gray-600 mb-8">
                Consultez notre FAQ pour obtenir des réponses immédiates
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { q: 'Quels sont vos tarifs ?', link: '/services' },
                  { q: 'Zone d\'intervention ?', link: '/about' },
                  { q: 'Comment réserver ?', link: '/booking/estimate' },
                ].map((item) => (
                  <a
                    key={item.q}
                    href={item.link}
                    className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-shadow text-primary-cyan hover:text-primary-orange"
                  >
                    <p className="font-semibold">{item.q}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
