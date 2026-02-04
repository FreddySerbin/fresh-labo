'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { motion } from 'framer-motion';

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
      <main className="min-h-screen bg-dark-navy">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-dark-navy via-dark-blue to-dark-navy text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary-cyan/20 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-orange/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-6">
                Contactez<span className="text-gradient-fresh">-Nous</span>
              </h1>
              <p className="text-xl text-white/80">
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
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-3xl text-white font-poppins font-bold mb-6">
                      Parlons de Votre Projet
                    </h2>
                    <p className="text-lg text-white/70 mb-8">
                      Nous sommes disponibles pour répondre à toutes vos questions
                      et vous accompagner dans vos besoins de nettoyage professionnel.
                    </p>
                  </motion.div>

                  {/* Contact Cards */}
                  <div className="space-y-6">
                    {/* Phone */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4 p-6 bg-dark-blue/50 border border-primary-cyan/30 rounded-2xl hover:shadow-lg hover:shadow-primary-cyan/20 transition-all"
                    >
                      <div className="w-12 h-12 bg-primary-cyan/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-primary-cyan" />
                      </div>
                      <div>
                        <h3 className="text-xl font-poppins font-bold text-white mb-2">
                          Téléphone
                        </h3>
                        <a 
                          href="tel:0695057796" 
                          className="text-lg text-primary-cyan hover:text-primary-orange transition-colors"
                        >
                          06 95 05 77 96
                        </a>
                        <p className="text-sm text-white/60 mt-1">
                          Lundi - Samedi : 9h - 19h
                        </p>
                      </div>
                    </motion.div>

                    {/* Email */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4 p-6 bg-dark-blue/50 border border-primary-orange/30 rounded-2xl hover:shadow-lg hover:shadow-primary-orange/20 transition-all"
                    >
                      <div className="w-12 h-12 bg-primary-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-primary-orange" />
                      </div>
                      <div>
                        <h3 className="text-xl font-poppins font-bold text-white mb-2">
                          Email
                        </h3>
                        <a 
                          href="mailto:contact@freshlabo.com" 
                          className="text-lg text-primary-cyan hover:text-primary-orange transition-colors"
                        >
                          contact@freshlabo.com
                        </a>
                        <p className="text-sm text-white/60 mt-1">
                          Réponse sous 24h
                        </p>
                      </div>
                    </motion.div>

                    {/* Location */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4 p-6 bg-dark-blue/50 border border-green-500/30 rounded-2xl hover:shadow-lg hover:shadow-green-500/20 transition-all"
                    >
                      <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-poppins font-bold text-white mb-2">
                          Zone d'intervention
                        </h3>
                        <p className="text-white/80">
                          Paris & Île-de-France
                        </p>
                        <p className="text-sm text-white/60 mt-1">
                          Départements 75, 77, 78, 91, 92, 93, 94, 95
                        </p>
                      </div>
                    </motion.div>

                    {/* Hours */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4 p-6 bg-dark-blue/50 border border-blue-500/30 rounded-2xl hover:shadow-lg hover:shadow-blue-500/20 transition-all"
                    >
                      <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-poppins font-bold text-white mb-2">
                          Horaires
                        </h3>
                        <div className="text-white/80 space-y-1">
                          <p>Lundi - Vendredi : 9h - 19h</p>
                          <p>Samedi : 9h - 18h</p>
                          <p>Dimanche : Sur demande</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-dark-blue/50 border-2 border-primary-cyan/30 rounded-3xl shadow-xl shadow-primary-cyan/10 p-8 lg:p-10"
                >
                  <h3 className="text-2xl text-white font-poppins font-bold mb-6">
                    Envoyez-nous un Message
                  </h3>

                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400">
                      ✓ Message envoyé avec succès ! Nous vous répondrons sous 24h.
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-dark-navy/50 border border-primary-cyan/30 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-primary-cyan focus:border-transparent transition-all"
                        placeholder="Votre nom"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-dark-navy/50 border border-primary-cyan/30 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-primary-cyan focus:border-transparent transition-all"
                        placeholder="votre@email.com"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-dark-navy/50 border border-primary-cyan/30 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-primary-cyan focus:border-transparent transition-all"
                        placeholder="06 XX XX XX XX"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-white/80 mb-2">
                        Sujet *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-dark-navy/50 border border-primary-cyan/30 rounded-xl text-white focus:ring-2 focus:ring-primary-cyan focus:border-transparent transition-all"
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
                      <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-3 bg-dark-navy/50 border border-primary-cyan/30 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-primary-cyan focus:border-transparent transition-all resize-none"
                        placeholder="Décrivez votre besoin..."
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      isLoading={isSubmitting}
                      className="w-full bg-primary-cyan hover:bg-primary-cyan/90 shadow-glow-cyan"
                    >
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                      <Send className="ml-2" />
                    </Button>

                    <p className="text-sm text-white/50 text-center">
                      * Champs obligatoires
                    </p>
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Quick Links */}
        <section className="py-20 bg-gradient-to-b from-dark-blue to-dark-navy">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl text-white font-poppins font-bold mb-6">
                Questions Fréquentes
              </h2>
              <p className="text-xl text-white/70 mb-8">
                Consultez notre FAQ pour obtenir des réponses immédiates
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { q: 'Quels sont vos tarifs ?', link: '/services' },
                  { q: 'Zone d\'intervention ?', link: '/about' },
                  { q: 'Comment réserver ?', link: '/booking' },
                ].map((item, index) => (
                  <motion.a
                    key={item.q}
                    href={item.link}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 bg-dark-blue/50 border border-primary-cyan/30 rounded-xl shadow-lg hover:shadow-primary-cyan/20 text-primary-cyan hover:text-primary-orange hover:border-primary-cyan/50 transition-all"
                  >
                    <p className="font-semibold">{item.q}</p>
                  </motion.a>
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
