'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  emoji: string;
  description: string;
  startingPrice: number;
  href: string;
  color: string;
}

const services: Service[] = [
  {
    id: 'matelas',
    name: 'Matelas',
    emoji: '🛏️',
    description: 'Nettoyage en profondeur pour un sommeil sain',
    startingPrice: 60,
    href: '/services/matelas',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    id: 'vehicules',
    name: 'Véhicules',
    emoji: '🚗',
    description: 'Intérieur comme neuf, sièges et tapis',
    startingPrice: 55,
    href: '/services/vehicules',
    color: 'from-cyan-500 to-teal-400',
  },
  {
    id: 'tapis',
    name: 'Tapis',
    emoji: '🧵',
    description: 'Ravivez les couleurs et la douceur',
    startingPrice: 50,
    href: '/services/tapis',
    color: 'from-teal-500 to-emerald-400',
  },
  {
    id: 'canapes',
    name: 'Canapés',
    emoji: '🛋️',
    description: 'Retrouvez un salon impeccable',
    startingPrice: 15,
    href: '/services/canapes',
    color: 'from-orange-500 to-amber-400',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export const ServicesGrid: FC = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
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
            Nos Services
          </h2>
          <p className="text-body-large text-gray-600 max-w-2xl mx-auto">
            Un nettoyage professionnel adapté à chaque besoin.
            Choisissez le service qui vous convient.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>

        {/* View All Services Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-primary-cyan hover:text-primary-orange transition-colors font-semibold"
          >
            Voir tous nos services en détail
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const ServiceCard: FC<{ service: Service }> = ({ service }) => {
  return (
    <motion.div variants={itemVariants}>
      <Link href={service.href}>
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all h-full"
        >
          {/* Image Background */}
          <div className="relative h-48 overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-90`} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl filter drop-shadow-lg">
                {service.emoji}
              </span>
            </div>
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-dark-blue opacity-0 group-hover:opacity-20 transition-opacity" />
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-heading-2 text-dark-blue font-poppins font-bold mb-2">
              {service.name}
            </h3>
            
            <p className="text-body text-gray-600 mb-4">
              {service.description}
            </p>

            {/* Price */}
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-body-small text-gray-500">À partir de</span>
                <p className="text-heading-1 text-primary-orange font-poppins font-bold">
                  {service.startingPrice}€
                </p>
              </div>

              {/* Arrow */}
              <div className="text-primary-cyan group-hover:text-primary-orange transition-colors">
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </div>

          {/* Bottom Border */}
          <div className={`h-1 bg-gradient-to-r ${service.color}`} />
        </motion.div>
      </Link>
    </motion.div>
  );
};
