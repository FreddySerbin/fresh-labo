'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Car, Sofa, Bed, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { FadeIn } from '@/components/common/FadeIn'

export function ServicesSection() {
  const services = [
    {
      icon: Car,
      emoji: "🚗",
      title: "Nettoyage intérieur auto",
      description: "Sièges, tapis, plastiques, vitres — votre voiture comme neuve",
      duration: "2-3 heures",
      price: "80€",
      features: [
        "Aspiration complète",
        "Nettoyage sièges + tapis",
        "Désinfection",
        "Vitres intérieures"
      ]
    },
    {
      icon: Sofa,
      emoji: "🛋️",
      title: "Nettoyage canapé & fauteuil",
      description: "Tissus, cuir, microfibre — toutes matières traitées",
      duration: "1-2 heures",
      price: "60€",
      features: [
        "Détachage profond",
        "Désodorisation",
        "Séchage rapide",
        "Protection textile"
      ]
    },
    {
      icon: Bed,
      emoji: "🛏️",
      title: "Nettoyage matelas",
      description: "Élimination acariens, taches, odeurs — hygiène garantie",
      duration: "1 heure",
      price: "50€",
      features: [
        "Traitement anti-acariens",
        "Désinfection complète",
        "Élimination des odeurs",
        "Séchage rapide"
      ]
    }
  ]

  return (
    <section id="services" className="py-20 bg-dark-navy relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-blue/30 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">
              Nos <span className="text-gradient-fresh">Services</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Des prestations professionnelles adaptées à vos besoins
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-dark-blue/50 border-2 border-primary-cyan/30 rounded-2xl p-8 shadow-lg shadow-primary-cyan/10 hover:shadow-xl hover:shadow-primary-cyan/20 transition-all relative overflow-hidden group"
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-primary-cyan/20 rounded-2xl flex items-center justify-center text-4xl">
                    {service.emoji}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white/60 mb-1">À partir de</div>
                    <div className="text-3xl font-bold text-primary-cyan">{service.price}</div>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-poppins font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-white/70 mb-4">
                  {service.description}
                </p>

                {/* Duration */}
                <div className="flex items-center gap-2 text-white/60 mb-6 pb-6 border-b border-primary-cyan/20">
                  <Clock className="w-4 h-4 text-primary-cyan" />
                  <span className="text-sm">Durée : {service.duration}</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-white/80">
                      <div className="w-1.5 h-1.5 bg-primary-cyan rounded-full" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link href="/booking" className="block">
                  <Button 
                    variant="primary" 
                    className="w-full bg-primary-cyan hover:bg-primary-cyan/90 group"
                  >
                    Réserver maintenant
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-cyan/10 to-primary-orange/10 border border-primary-cyan/30 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-poppins font-bold text-white mb-3">
            Besoin d'un devis personnalisé ?
          </h3>
          <p className="text-white/70 mb-6 max-w-2xl mx-auto">
            Contactez-nous pour une estimation gratuite et sans engagement
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0695057796">
              <Button variant="primary" className="bg-primary-orange hover:bg-primary-orange/90">
                06 95 05 77 96
              </Button>
            </a>
            <a href="https://wa.me/33695057796" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" className="bg-green-600 hover:bg-green-700 border-green-500">
                WhatsApp
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
