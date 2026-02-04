'use client'

import { motion } from 'framer-motion'
import { MapPin, Check } from 'lucide-react'
import { FadeIn } from '@/components/common/FadeIn'

export function ZoneSection() {
  const zones = [
    "Paris",
    "Hauts-de-Seine (92)",
    "Seine-Saint-Denis (93)",
    "Val-de-Marne (94)",
    "Seine-et-Marne (77)",
    "Yvelines (78)",
    "Essonne (91)",
    "Val-d'Oise (95)"
  ]

  return (
    <section className="py-20 bg-dark-navy relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-orange/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-cyan/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">
              Zone <span className="text-gradient-fresh">d'intervention</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Nous intervenons dans toute l'Île-de-France
            </p>
          </div>
        </FadeIn>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-dark-blue/50 border border-primary-cyan/30 rounded-2xl p-8 flex items-center justify-center min-h-[400px] shadow-lg shadow-primary-cyan/10"
            >
              <div className="text-center">
                <MapPin className="w-24 h-24 text-primary-cyan mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-3">
                  Île-de-France
                </h3>
                <p className="text-white/70 mb-6">
                  Paris + toute la région parisienne
                </p>
                <div className="text-6xl">🗼</div>
              </div>
            </motion.div>

            {/* Zones list */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-dark-blue/50 border border-primary-cyan/30 rounded-2xl p-8 shadow-lg shadow-primary-cyan/10"
            >
              <h3 className="text-2xl font-poppins font-bold text-white mb-6">
                Départements couverts
              </h3>
              <ul className="space-y-4">
                {zones.map((zone, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 text-white/90"
                  >
                    <div className="w-6 h-6 bg-primary-cyan/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-primary-cyan" />
                    </div>
                    <span className="text-lg">{zone}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary-cyan/10 to-primary-orange/10 border border-primary-cyan/30 rounded-2xl p-8 text-center"
          >
            <h3 className="text-2xl font-poppins font-bold text-white mb-3">
              Votre zone n'est pas listée ?
            </h3>
            <p className="text-white/70 mb-6">
              Contactez-nous ! Nous étudions toutes les demandes et pouvons nous déplacer selon les besoins.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a 
                href="tel:0695057796"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-cyan hover:bg-primary-cyan/90 text-white font-semibold rounded-lg transition-all"
              >
                <MapPin className="w-5 h-5" />
                06 95 05 77 96
              </a>
              <a 
                href="mailto:contact@freshlabo.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/30 transition-all"
              >
                contact@freshlabo.com
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
