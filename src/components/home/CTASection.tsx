'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

export const CTASection: FC = () => {
  return (
    <section className="py-20 bg-gradient-fresh relative overflow-hidden">
      {/* Background Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center text-white"
        >
          {/* Title */}
          <h2 className="text-display-small font-poppins font-bold mb-6">
            Prêt à rafraîchir vos espaces ?
          </h2>

          {/* Description */}
          <p className="text-heading-3 mb-8 text-white/90">
            Réservez dès maintenant votre intervention et découvrez
            <br />
            la différence Fresh Lab'O
          </p>

          {/* CTA Button */}
          <Link href="/booking/estimate">
            <Button 
              size="lg"
              variant="secondary"
              className="bg-white text-primary-cyan hover:bg-primary-orange hover:text-white shadow-xl hover:shadow-2xl mb-12"
            >
              Obtenir mon devis gratuit
              <ArrowRight className="ml-2" />
            </Button>
          </Link>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/90">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center gap-2"
            >
              <Phone className="w-8 h-8 mb-2" />
              <p className="font-semibold">Téléphone</p>
              <a href="tel:0695057796" className="hover:text-white transition-colors">
                06 95 05 77 96
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center gap-2"
            >
              <Mail className="w-8 h-8 mb-2" />
              <p className="font-semibold">Email</p>
              <a href="mailto:contact@freshlabo.com" className="hover:text-white transition-colors">
                contact@freshlabo.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-center gap-2"
            >
              <MapPin className="w-8 h-8 mb-2" />
              <p className="font-semibold">Zone d'intervention</p>
              <p>Paris & Île-de-France</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
