'use client';

import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  service: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Marie D.',
    service: 'Nettoyage Canapé',
    rating: 5,
    comment: 'Service impeccable ! Mon canapé a retrouvé ses couleurs d\'origine. L\'équipe est professionnelle et ponctuelle. Je recommande vivement !',
    date: 'Janvier 2024',
    avatar: '👩',
  },
  {
    id: 2,
    name: 'Thomas B.',
    service: 'Nettoyage Véhicule',
    rating: 5,
    comment: 'Ma voiture était dans un état lamentable avec des taches partout. Résultat bluffant, comme neuve ! Prix très correct. Merci Fresh Lab\'O !',
    date: 'Janvier 2024',
    avatar: '👨',
  },
  {
    id: 3,
    name: 'Sophie L.',
    service: 'Nettoyage Matelas',
    rating: 5,
    comment: 'J\'avais des doutes mais le résultat est au-delà de mes attentes. Mon matelas est comme neuf et sans odeur. Service rapide et efficace.',
    date: 'Décembre 2023',
    avatar: '👩‍🦰',
  },
];

export const Testimonials: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gray-50">
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
            Ce que disent nos clients
          </h2>
          <p className="text-body-large text-gray-600 max-w-2xl mx-auto">
            Plus de 500 clients satisfaits nous font confiance
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-xl p-8 md:p-12 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-8 left-8 text-primary-cyan opacity-20">
                <Quote className="w-16 h-16" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-primary-orange text-primary-orange" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-heading-3 text-dark-blue font-poppins mb-6 leading-relaxed">
                  "{testimonials[currentIndex].comment}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-fresh rounded-full flex items-center justify-center text-2xl">
                    {testimonials[currentIndex].avatar}
                  </div>
                  <div>
                    <p className="font-bold text-dark-blue">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-body-small text-gray-600">
                      {testimonials[currentIndex].service} • {testimonials[currentIndex].date}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-primary-cyan hover:text-primary-orange"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-primary-cyan w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-primary-cyan hover:text-primary-orange"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
