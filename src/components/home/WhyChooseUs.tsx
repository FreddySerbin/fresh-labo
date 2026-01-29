'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { Shield, DollarSign, Zap, Award, Users, Clock } from 'lucide-react';

interface USP {
  icon: FC<{ className?: string }>;
  title: string;
  description: string;
  color: string;
}

const usps: USP[] = [
  {
    icon: Shield,
    title: 'Experts Certifiés',
    description: 'Des professionnels formés aux meilleures techniques de nettoyage',
    color: 'text-primary-cyan',
  },
  {
    icon: DollarSign,
    title: 'Prix Transparents',
    description: 'Tarifs clairs affichés, pas de frais cachés, devis instantané',
    color: 'text-primary-orange',
  },
  {
    icon: Zap,
    title: 'Intervention Rapide',
    description: 'Réservation en ligne, intervention sous 48h, résultats immédiats',
    color: 'text-accent-blue',
  },
  {
    icon: Award,
    title: 'Résultats Garantis',
    description: 'Satisfaction client garantie ou intervention refaite gratuitement',
    color: 'text-success',
  },
  {
    icon: Users,
    title: '500+ Clients Satisfaits',
    description: 'Note moyenne 4.9/5, avis vérifiés, recommandations nombreuses',
    color: 'text-primary-cyan',
  },
  {
    icon: Clock,
    title: 'Flexibilité Horaire',
    description: 'Créneaux adaptés à votre emploi du temps, weekend disponible',
    color: 'text-primary-orange',
  },
];

export const WhyChooseUs: FC = () => {
  return (
    <section className="py-20 bg-gradient-dark text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-display-small font-poppins font-bold mb-4">
            Pourquoi choisir Fresh Lab'O ?
          </h2>
          <p className="text-body-large text-gray-300 max-w-2xl mx-auto">
            Une expertise reconnue pour un service irréprochable
          </p>
        </motion.div>

        {/* USPs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {usps.map((usp, index) => (
            <motion.div
              key={usp.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all border border-white/20 hover:border-primary-cyan h-full">
                {/* Icon */}
                <div className={`${usp.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <usp.icon className="w-10 h-10" />
                </div>

                {/* Title */}
                <h3 className="text-heading-3 font-poppins font-bold mb-2">
                  {usp.title}
                </h3>

                {/* Description */}
                <p className="text-body text-gray-300">
                  {usp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
