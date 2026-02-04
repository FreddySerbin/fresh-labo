'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Phone, Calendar, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark-navy via-dark-blue to-dark-navy">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-cyan/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-orange/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-poppins font-bold text-white mb-6 leading-tight">
              Nettoyage intérieur auto<br />
              <span className="text-gradient-fresh">& tissus à domicile</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto"
          >
            Sièges, matelas, canapés — <span className="text-primary-cyan font-semibold">résultat professionnel</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link href="/booking" className="w-full sm:w-auto">
              <Button 
                variant="primary" 
                size="lg"
                className="w-full sm:w-auto text-lg px-8 py-6 bg-primary-cyan hover:bg-primary-cyan/90 shadow-glow-cyan"
              >
                <Calendar className="w-6 h-6 mr-2" />
                Réserver un créneau
              </Button>
            </Link>

            <a href="tel:0695057796" className="w-full sm:w-auto">
              <Button 
                variant="secondary" 
                size="lg"
                className="w-full sm:w-auto text-lg px-8 py-6 bg-white/10 hover:bg-white/20 border-white/30"
              >
                <Phone className="w-6 h-6 mr-2" />
                06 95 05 77 96
              </Button>
            </a>

            <a 
              href="https://wa.me/33695057796" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button 
                variant="secondary" 
                size="lg"
                className="w-full sm:w-auto text-lg px-8 py-6 bg-green-600 hover:bg-green-700 border-green-500"
              >
                <MessageCircle className="w-6 h-6 mr-2" />
                WhatsApp
              </Button>
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-8 text-white/70"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Disponible 7j/7</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary-cyan font-bold text-2xl">+300</span>
              <span>intérieurs nettoyés</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">★★★★★</span>
              <span>4.9/5</span>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16"
          >
            <div className="flex flex-col items-center gap-2 text-white/50">
              <span className="text-sm">Découvrir nos services</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
