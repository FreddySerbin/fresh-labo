import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Nos Services - Fresh Lab\'O',
  description: 'Découvrez tous nos services de nettoyage professionnel : matelas, véhicules, tapis et canapés. Tarifs transparents et intervention rapide.',
};

const services = [
  {
    id: 'matelas',
    name: 'Nettoyage de Matelas',
    emoji: '🛏️',
    description: 'Nettoyage en profondeur de votre matelas pour un sommeil sain et hygiénique.',
    features: [
      'Aspiration complète',
      'Traitement anti-acariens',
      'Élimination des taches',
      'Désinfection profonde',
      'Séchage rapide',
    ],
    prices: [
      { name: '1 Face', price: 60 },
      { name: '2 Faces', price: 80 },
      { name: 'King Size', price: 105 },
    ],
    duration: '45-90 min',
    href: '/services/matelas',
  },
  {
    id: 'vehicules',
    name: 'Nettoyage de Véhicules',
    emoji: '🚗',
    description: 'Nettoyage intérieur complet de votre véhicule pour un habitacle comme neuf.',
    features: [
      'Sièges et tapis',
      'Planche de bord',
      'Portes et garnitures',
      'Traitement anti-odeur disponible',
      'Protection textile',
    ],
    prices: [
      { name: 'Petit (Citadine)', price: 55 },
      { name: 'Moyen (Berline)', price: 65 },
      { name: 'Grand (SUV)', price: 80 },
    ],
    duration: '60-90 min',
    href: '/services/vehicules',
  },
  {
    id: 'tapis',
    name: 'Nettoyage de Tapis',
    emoji: '🧵',
    description: 'Ravivez les couleurs et la douceur de vos tapis avec notre nettoyage professionnel.',
    features: [
      'Tous types de tapis',
      'Traitement adapté aux matériaux',
      'Ravive les couleurs',
      'Élimine les odeurs',
      'Séchage optimal',
    ],
    prices: [
      { name: 'Petit (<2m²)', price: 50 },
      { name: 'Moyen (2-4m²)', price: 90 },
      { name: 'Grand (>4m²)', price: 120 },
    ],
    duration: '30-60 min',
    href: '/services/tapis',
  },
  {
    id: 'canapes',
    name: 'Nettoyage de Canapés',
    emoji: '🛋️',
    description: 'Retrouvez un salon impeccable avec notre nettoyage professionnel de canapés.',
    features: [
      'Tissu, cuir, microfibre',
      'Nettoyage en profondeur',
      'Traitement anti-taches',
      'Désinfection',
      'Nourrissage du cuir',
    ],
    prices: [
      { name: 'Fauteuil', price: 35 },
      { name: '2-3 Places', price: 70 },
      { name: '4+ Places', price: 90 },
    ],
    duration: '30-90 min',
    href: '/services/canapes',
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-dark-navy">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-dark-navy via-dark-blue to-dark-navy text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary-cyan/20 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-orange/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-6">
                Nos Services de Nettoyage <span className="text-gradient-fresh">Professionnel</span>
              </h1>
              <p className="text-xl text-white/80 mb-8">
                Un nettoyage professionnel adapté à chaque besoin.
                Tarifs transparents, intervention rapide, résultats garantis.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-16">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className={`flex flex-col lg:flex-row gap-8 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Image/Icon */}
                  <div className="lg:w-1/3">
                    <div className="relative h-64 rounded-3xl bg-gradient-to-br from-primary-cyan/20 to-primary-orange/20 border-2 border-primary-cyan/30 flex items-center justify-center overflow-hidden shadow-lg shadow-primary-cyan/10 hover:shadow-xl hover:shadow-primary-cyan/20 transition-all">
                      <span className="text-9xl filter drop-shadow-lg">
                        {service.emoji}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:w-2/3 space-y-6">
                    <div>
                      <h2 className="text-4xl text-white font-poppins font-bold mb-4">
                        {service.name}
                      </h2>
                      <p className="text-lg text-white/70">
                        {service.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-primary-cyan flex-shrink-0" />
                          <span className="text-white/80">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Prices */}
                    <div className="bg-dark-blue/50 border border-primary-cyan/30 rounded-2xl p-6 shadow-lg shadow-primary-cyan/10">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl font-poppins font-bold text-white">
                          Tarifs
                        </span>
                        <Clock className="w-5 h-5 text-primary-cyan" />
                        <span className="text-sm text-white/60">{service.duration}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {service.prices.map((price) => (
                          <div key={price.name} className="text-center bg-dark-navy/50 rounded-xl p-4 border border-primary-cyan/20">
                            <div className="text-3xl text-primary-cyan font-poppins font-bold">
                              {price.price}€
                            </div>
                            <div className="text-sm text-white/60 mt-1">{price.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <Link href="/booking">
                      <Button variant="primary" size="lg" className="group bg-primary-cyan hover:bg-primary-cyan/90">
                        Réserver ce service
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary-cyan/10 to-primary-orange/10 border-y border-primary-cyan/30 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-poppins font-bold text-white mb-6">
              Besoin d'un devis personnalisé ?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Obtenez une estimation instantanée et réservez en quelques clics
            </p>
            <Link href="/booking">
              <Button 
                variant="primary" 
                size="lg"
                className="bg-primary-cyan hover:bg-primary-cyan/90 shadow-glow-cyan"
              >
                Obtenir mon devis gratuit
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
