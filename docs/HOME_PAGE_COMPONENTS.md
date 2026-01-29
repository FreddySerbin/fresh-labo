# 🏠 Fresh Lab'O - Composants Page d'Accueil

## 📋 Vue d'Ensemble

Ce document contient tous les composants React pour créer une **page d'accueil exceptionnelle** pour Fresh Lab'O.

---

## 1. 🎯 HERO SECTION

### `src/components/home/Hero.tsx`

```typescript
'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Bubbles } from '@/components/common/Bubbles';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

export const Hero: FC = () => {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-dark">
      {/* Background Bubbles Animation */}
      <Bubbles count={8} />
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <Image
              src="/images/logo.png"
              alt="Fresh Lab'O"
              width={200}
              height={200}
              priority
              className="drop-shadow-glow-cyan"
            />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-display-medium md:text-display-large text-white font-poppins font-extrabold leading-tight"
          >
            Rafraîchissez vos espaces
            <br />
            <span className="text-gradient-fresh">
              avec notre service de lavage professionnel
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-heading-2 text-accent-orange font-poppins font-semibold"
          >
            Des prix Fresh pour un résultat impeccable 🧼✨
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-body-large text-gray-200 max-w-2xl mx-auto"
          >
            Nettoyage professionnel de matelas, véhicules, tapis et canapés.
            Intervention rapide, résultats garantis, tarifs transparents.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/booking/estimate">
              <Button 
                size="lg" 
                variant="primary"
                className="group"
              >
                Réserver maintenant
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Button 
              size="lg" 
              variant="secondary"
              onClick={scrollToServices}
            >
              Découvrir nos services
              <Sparkles className="ml-2" />
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap justify-center gap-6 text-sm text-gray-300 pt-8"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <span>500+ clients satisfaits</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span>Intervention rapide</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">💰</span>
              <span>Prix transparents</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          onClick={scrollToServices}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-white hover:text-primary-cyan transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.button>
      </motion.div>
    </section>
  );
};
```

---

## 2. 📦 SERVICES GRID

### `src/components/home/ServicesGrid.tsx`

```typescript
'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  emoji: string;
  description: string;
  startingPrice: number;
  image: string;
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
    image: '/images/services/matelas.jpg',
    href: '/services/matelas',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    id: 'vehicules',
    name: 'Véhicules',
    emoji: '🚗',
    description: 'Intérieur comme neuf, sièges et tapis',
    startingPrice: 55,
    image: '/images/services/vehicule.jpg',
    href: '/services/vehicules',
    color: 'from-cyan-500 to-teal-400',
  },
  {
    id: 'tapis',
    name: 'Tapis',
    emoji: '🧵',
    description: 'Ravivez les couleurs et la douceur',
    startingPrice: 50,
    image: '/images/services/tapis.jpg',
    href: '/services/tapis',
    color: 'from-teal-500 to-emerald-400',
  },
  {
    id: 'canapes',
    name: 'Canapés',
    emoji: '🛋️',
    description: 'Retrouvez un salon impeccable',
    startingPrice: 15,
    image: '/images/services/canape.jpg',
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
```

---

## 3. 🎓 HOW IT WORKS

### `src/components/home/HowItWorks.tsx`

```typescript
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
```

---

## 4. ⭐ WHY CHOOSE US

### `src/components/home/WhyChooseUs.tsx`

```typescript
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
```

---

## 5. 💬 TESTIMONIALS

### `src/components/home/Testimonials.tsx`

```typescript
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
```

---

## 6. 🎉 CTA SECTION

### `src/components/home/CTASection.tsx`

```typescript
'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

export const CTASection: FC = () => {
  return (
    <section className="py-20 bg-gradient-fresh relative overflow-hidden">
      {/* Background Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center text-white"
        >
          {/* Title */}
          <h2 className="text-display-small font-poppins font-bold mb-6">
            Prêt à rafraîchir vos espaces ?
          </h2>

          {/* Description */}
          <p className="text-heading-3 mb-8 text-white/90">
            Réservez dès maintenant votre intervention et découvrez
            <br />
            la différence Fresh Lab'O
          </p>

          {/* CTA Button */}
          <Link href="/booking/estimate">
            <Button 
              size="lg"
              variant="secondary"
              className="bg-white text-primary-cyan hover:bg-primary-orange hover:text-white shadow-xl hover:shadow-2xl mb-12"
            >
              Obtenir mon devis gratuit
              <ArrowRight className="ml-2" />
            </Button>
          </Link>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/90">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center gap-2"
            >
              <Phone className="w-8 h-8 mb-2" />
              <p className="font-semibold">Téléphone</p>
              <a href="tel:0695057796" className="hover:text-white transition-colors">
                06 95 05 77 96
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center gap-2"
            >
              <Mail className="w-8 h-8 mb-2" />
              <p className="font-semibold">Email</p>
              <a href="mailto:contact@freshlabo.com" className="hover:text-white transition-colors">
                contact@freshlabo.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-center gap-2"
            >
              <MapPin className="w-8 h-8 mb-2" />
              <p className="font-semibold">Zone d'intervention</p>
              <p>Paris & Île-de-France</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
```

---

## 7. 🎨 BUBBLES ANIMATION

### `src/components/common/Bubbles.tsx`

```typescript
'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';

interface BubblesProps {
  count?: number;
}

export const Bubbles: FC<BubblesProps> = ({ count = 5 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => {
        const size = 50 + Math.random() * 150;
        const delay = Math.random() * 5;
        const duration = 8 + Math.random() * 4;
        const x = Math.random() * 100;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-primary-cyan/30 to-accent-blue/20"
            style={{
              width: size,
              height: size,
              left: `${x}%`,
              bottom: -size,
            }}
            animate={{
              y: [`0vh`, `-110vh`],
              x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
              scale: [1, 1.2, 0.8, 1],
              opacity: [0, 0.6, 0.4, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </div>
  );
};
```

---

## 8. 📄 PAGE D'ACCUEIL COMPLÈTE

### `src/app/page.tsx`

```typescript
import { Hero } from '@/components/home/Hero';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { HowItWorks } from '@/components/home/HowItWorks';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { Testimonials } from '@/components/home/Testimonials';
import { CTASection } from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ServicesGrid />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
    </main>
  );
}
```

---

## ✅ Checklist d'Intégration

Pour utiliser ces composants avec Cursor:

1. **Créer la structure de dossiers:**
   ```bash
   mkdir -p src/components/{home,common,ui}
   ```

2. **Copier les composants** dans les dossiers appropriés

3. **S'assurer que les dépendances sont installées:**
   ```bash
   npm install framer-motion lucide-react
   ```

4. **Créer le composant Button** (si pas déjà fait):
   - Voir CURSOR_INSTRUCTIONS.md pour l'exemple

5. **Ajouter les images:**
   ```
   public/images/
   ├── logo.png
   └── services/
       ├── matelas.jpg
       ├── vehicule.jpg
       ├── tapis.jpg
       └── canape.jpg
   ```

6. **Tester la page:**
   ```bash
   npm run dev
   ```
   Ouvrir http://localhost:3000

---

## 🎨 Personnalisation

Tous les composants utilisent:
- ✅ Les couleurs Fresh Lab'O (Tailwind config)
- ✅ Les fonts Poppins et Inter
- ✅ Les animations Framer Motion
- ✅ Le design system défini

**Modifiez facilement:**
- Les textes dans chaque composant
- Les images dans `/public/images`
- Les couleurs via Tailwind classes
- Les animations via Framer Motion props

---

Votre **page d'accueil professionnelle** est prête ! 🚀🧼✨
