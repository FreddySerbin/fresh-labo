'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Sparkles, CheckCircle } from 'lucide-react';

interface Step {
  number: number;
  title: string;
  description: string;
  icon: FC<{ className?: string }>;
  color: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: 'Choisissez votre service',
    description: 'Sélectionnez le service dont vous avez besoin et configurez vos options',
    icon: Sparkles,
    color: 'text-primary-cyan',
  },
  {
    number: 2,
    title: 'Réservez en ligne',
    description: 'Choisissez votre créneau et confirmez votre réservation en quelques clics',
    icon: Calendar,
    color: 'text-primary-orange',
  },
  {
    number: 3,
    title: 'Profitez du résultat',
    description: 'Notre équipe intervient chez vous et vous garantit un résultat impeccable',
    icon: CheckCircle,
    color: 'text-success',
  },
];

export const HowItWorks: FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-display-small text-dark-blue font-poppins font-bold mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-body-large text-gray-600 max-w-2xl mx-auto">
            Un processus simple et rapide pour une propreté garantie
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection Lines (Desktop only) */}
            <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-fresh opacity-20" 
                 style={{ top: '80px' }} 
            />

            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* Step Card */}
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-gray-100 hover:border-primary-cyan">
                  {/* Number Badge */}
                  <div className="absolute -top-4 left-8 w-12 h-12 bg-gradient-fresh rounded-full flex items-center justify-center text-white font-bold text-xl shadow-glow-cyan">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className={`${step.color} mb-4 mt-4`}>
                    <step.icon className="w-12 h-12" />
                  </div>

                  {/* Title */}
                  <h3 className="text-heading-2 text-dark-blue font-poppins font-bold mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-body text-gray-600">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
