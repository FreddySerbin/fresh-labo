'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Sparkles } from 'lucide-react'
import { FadeIn } from '@/components/common/FadeIn'

export function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      icon: Calendar,
      title: "Vous choisissez votre service",
      description: "Sélectionnez le service adapté à vos besoins : auto, canapé, matelas..."
    },
    {
      number: "2",
      icon: MapPin,
      title: "Vous réservez un créneau",
      description: "Choisissez la date et l'heure qui vous conviennent. Intervention sous 48h."
    },
    {
      number: "3",
      icon: Sparkles,
      title: "On intervient chez vous",
      description: "Notre équipe arrive avec tout le matériel. Résultat professionnel garanti."
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-dark-blue to-dark-navy relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-cyan/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">
              Comment <span className="text-gradient-fresh">ça marche ?</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Un process simple et efficace pour un résultat impeccable
            </p>
          </div>
        </FadeIn>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative">
            {/* Connecting lines (desktop only) */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-cyan via-primary-orange to-primary-cyan opacity-30" />
            
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-dark-blue/50 border-2 border-primary-cyan/30 rounded-2xl p-8 text-center relative z-10 hover:border-primary-cyan/50 transition-all shadow-lg shadow-primary-cyan/10 hover:shadow-xl hover:shadow-primary-cyan/20">
                  {/* Step number badge */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-fresh rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-20 h-20 bg-primary-cyan/20 rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4">
                    <step.icon className="w-10 h-10 text-primary-cyan" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-poppins font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/70">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Reassurance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-2xl p-8 text-center"
          >
            <h3 className="text-2xl font-poppins font-bold text-white mb-4 flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-primary-cyan" />
              Garantie satisfaction
            </h3>
            <p className="text-white/80 max-w-2xl mx-auto">
              Si vous n'êtes pas satisfait du résultat, nous revenons gratuitement. 
              <span className="text-primary-cyan font-semibold"> Votre satisfaction est notre priorité.</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
