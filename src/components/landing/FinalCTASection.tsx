'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Calendar, Phone, MessageCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function FinalCTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-dark-navy via-dark-blue to-dark-navy relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-96 h-96 bg-primary-cyan/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-orange/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-poppins font-bold text-white mb-6">
              Prêt pour un <span className="text-gradient-fresh">intérieur impeccable</span> ?
            </h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Réservez votre créneau en quelques clics et profitez d'un résultat professionnel chez vous
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link href="/booking" className="w-full sm:w-auto">
              <Button 
                variant="primary" 
                size="lg"
                className="w-full sm:w-auto text-xl px-10 py-7 bg-primary-cyan hover:bg-primary-cyan/90 shadow-glow-cyan group"
              >
                <Calendar className="w-7 h-7 mr-3" />
                Réserver maintenant
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Alternative contact methods */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/70"
          >
            <span className="text-lg">Ou contactez-nous :</span>
            
            <a 
              href="tel:0695057796" 
              className="flex items-center gap-2 hover:text-primary-cyan transition-colors group"
            >
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-primary-cyan/20 transition-all">
                <Phone className="w-5 h-5" />
              </div>
              <span className="font-semibold">06 95 05 77 96</span>
            </a>

            <a 
              href="https://wa.me/33695057796" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-green-400 transition-colors group"
            >
              <div className="w-10 h-10 bg-green-600/20 rounded-full flex items-center justify-center group-hover:bg-green-600/40 transition-all">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="font-semibold">WhatsApp</span>
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 pt-12 border-t border-white/10"
          >
            <div className="flex flex-wrap items-center justify-center gap-8 text-white/60">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span>Service rapide</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary-cyan font-bold">✓</span>
                <span>Matériel professionnel</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary-cyan font-bold">✓</span>
                <span>Satisfaction garantie</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">★★★★★</span>
                <span>4.9/5</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
