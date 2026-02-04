'use client'

import { motion } from 'framer-motion'
import { Star, CheckCircle } from 'lucide-react'
import { FadeIn } from '@/components/common/FadeIn'

export function BeforeAfterSection() {
  const testimonials = [
    {
      name: "Sophie M.",
      service: "Nettoyage canapé",
      rating: 5,
      text: "Résultat bluffant ! Mon canapé avait des taches incrustées depuis des années, il est comme neuf.",
      avatar: "👩‍💼"
    },
    {
      name: "Marc L.",
      service: "Intérieur voiture",
      rating: 5,
      text: "Service impeccable, ponctuel et professionnel. Ma voiture a retrouvé son éclat d'origine !",
      avatar: "👨‍💼"
    },
    {
      name: "Julie R.",
      service: "Nettoyage matelas",
      rating: 5,
      text: "Super prestation, très satisfaite du résultat. Je recommande vivement Fresh Lab'O !",
      avatar: "👩"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-dark-navy to-dark-blue relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-cyan to-transparent" />
      
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">
              Résultats <span className="text-gradient-fresh">Avant / Après</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Découvrez la transformation de vos tissus et intérieurs
            </p>
          </div>
        </FadeIn>

        {/* Before/After Grid - Placeholder for real images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {[
            { title: "Siège auto", icon: "🚗" },
            { title: "Canapé tissu", icon: "🛋️" },
            { title: "Matelas", icon: "🛏️" }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-dark-blue/50 border border-primary-cyan/30 rounded-xl overflow-hidden shadow-lg shadow-primary-cyan/10 hover:shadow-xl hover:shadow-primary-cyan/20 transition-all group"
            >
              <div className="aspect-video bg-gradient-to-br from-dark-blue to-dark-navy flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">{item.icon}</div>
                  <div className="flex items-center justify-center gap-4 text-white">
                    <div className="text-center">
                      <div className="text-sm text-white/50 mb-1">AVANT</div>
                      <div className="w-20 h-16 bg-gray-600/50 rounded border border-white/20 flex items-center justify-center text-xs">
                        Sale
                      </div>
                    </div>
                    <div className="text-2xl text-primary-cyan">→</div>
                    <div className="text-center">
                      <div className="text-sm text-white/50 mb-1">APRÈS</div>
                      <div className="w-20 h-16 bg-primary-cyan/20 rounded border border-primary-cyan/50 flex items-center justify-center text-xs">
                        Propre
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm">
                  Résultat professionnel garanti
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <FadeIn>
          <h3 className="text-3xl font-poppins font-bold text-white text-center mb-12">
            Ce que disent nos clients
          </h3>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-dark-blue/50 border border-primary-cyan/30 rounded-xl p-6 shadow-lg shadow-primary-cyan/10 hover:shadow-xl hover:shadow-primary-cyan/20 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-primary-cyan">{testimonial.service}</p>
                </div>
              </div>
              
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-white/70 italic">
                "{testimonial.text}"
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { value: "300+", label: "Clients satisfaits" },
            { value: "4.9/5", label: "Note moyenne" },
            { value: "48h", label: "Délai d'intervention" },
            { value: "100%", label: "Satisfaction garantie" }
          ].map((stat, index) => (
            <div key={index} className="p-6 bg-dark-blue/30 border border-primary-cyan/20 rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-primary-cyan mb-2">{stat.value}</div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
