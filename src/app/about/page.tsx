'use client'

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Users, Award, Target, Heart, Shield, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
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
                À Propos de <span className="text-gradient-fresh">Fresh Lab'O</span>
              </h1>
              <p className="text-xl text-white/80">
                Votre partenaire de confiance pour un nettoyage professionnel
                à Paris et en Île-de-France
              </p>
            </div>
          </div>
        </section>

        {/* Notre Histoire */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl text-white font-poppins font-bold mb-6">
                  Notre Histoire
                </h2>
                <div className="w-20 h-1 bg-gradient-fresh mx-auto mb-8"></div>
              </motion.div>

              <div className="space-y-6">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-lg text-white/80 leading-relaxed"
                >
                  <strong className="text-primary-cyan">Fresh Lab'O</strong> est né d'une passion pour la 
                  propreté et le bien-être. Fondée par des professionnels du nettoyage avec plus de 10 ans 
                  d'expérience, notre entreprise s'est donnée pour mission de rendre le nettoyage 
                  professionnel accessible à tous.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-lg text-white/80 leading-relaxed"
                >
                  Nous croyons que chacun mérite un environnement propre et sain, que ce soit à la maison 
                  ou dans son véhicule. C'est pourquoi nous avons développé une approche moderne du 
                  nettoyage professionnel, combinant techniques éprouvées et technologies innovantes.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-lg text-white/80 leading-relaxed"
                >
                  Aujourd'hui, Fresh Lab'O est fier de servir des centaines de clients satisfaits à Paris 
                  et en Île-de-France, avec un engagement constant envers la qualité, la transparence et 
                  l'excellence du service.
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        {/* Nos Valeurs */}
        <section className="py-20 bg-gradient-to-b from-dark-blue to-dark-navy">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl text-white font-poppins font-bold mb-6">
                Nos Valeurs
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Ce qui guide notre travail au quotidien
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Shield,
                  title: 'Qualité Garantie',
                  description: 'Des résultats impeccables ou nous revenons gratuitement. Votre satisfaction est notre priorité absolue.',
                  color: 'primary-cyan',
                },
                {
                  icon: Heart,
                  title: 'Respect & Intégrité',
                  description: 'Nous traitons votre maison et vos biens avec le plus grand soin, comme s\'ils étaient les nôtres.',
                  color: 'primary-orange',
                },
                {
                  icon: Sparkles,
                  title: 'Innovation',
                  description: 'Nous utilisons les dernières techniques et produits professionnels pour des résultats optimaux.',
                  color: 'primary-cyan',
                },
                {
                  icon: Users,
                  title: 'Proximité Client',
                  description: 'Un service personnalisé et une écoute attentive de vos besoins spécifiques.',
                  color: 'green-400',
                },
                {
                  icon: Target,
                  title: 'Transparence',
                  description: 'Tarifs clairs affichés, pas de frais cachés. Ce que vous voyez est ce que vous payez.',
                  color: 'blue-400',
                },
                {
                  icon: Award,
                  title: 'Excellence',
                  description: 'Des techniciens formés et certifiés, utilisant les meilleures pratiques du secteur.',
                  color: 'primary-orange',
                },
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-dark-blue/50 border-2 border-primary-cyan/30 rounded-2xl p-8 shadow-lg shadow-primary-cyan/10 hover:shadow-xl hover:shadow-primary-cyan/20 transition-all hover:scale-105"
                >
                  <div className={`text-${value.color} mb-4`}>
                    <value.icon className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl text-white font-poppins font-bold mb-3">
                    {value.title}
                  </h3>
                  <p className="text-white/70">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Notre Engagement */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-primary-cyan/10 to-primary-orange/10 border-2 border-primary-cyan/30 rounded-3xl p-12 text-center shadow-lg shadow-primary-cyan/10"
              >
                <h2 className="text-4xl text-white font-poppins font-bold mb-8">
                  Notre Engagement Qualité
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div>
                    <div className="text-5xl font-poppins font-bold text-primary-cyan mb-2">
                      500+
                    </div>
                    <div className="text-white/70">Clients satisfaits</div>
                  </div>
                  <div>
                    <div className="text-5xl font-poppins font-bold text-primary-orange mb-2">
                      4.9/5
                    </div>
                    <div className="text-white/70">Note moyenne</div>
                  </div>
                  <div>
                    <div className="text-5xl font-poppins font-bold text-green-400 mb-2">
                      100%
                    </div>
                    <div className="text-white/70">Satisfaction garantie</div>
                  </div>
                </div>
                <p className="text-lg text-white/80">
                  Nous nous engageons à fournir un service irréprochable à chaque intervention.
                  Votre satisfaction est notre meilleure publicité.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Zone d'Intervention */}
        <section className="py-20 bg-gradient-to-b from-dark-blue to-dark-navy">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl text-white font-poppins font-bold mb-6">
                Zone d'Intervention
              </h2>
              <p className="text-xl text-white/70 mb-8">
                Nous intervenons dans toute la région parisienne :
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Paris 75', 'Hauts-de-Seine 92', 'Seine-Saint-Denis 93', 'Val-de-Marne 94',
                  'Seine-et-Marne 77', 'Yvelines 78', 'Essonne 91', 'Val-d\'Oise 95'].map((zone, index) => (
                  <motion.div 
                    key={zone}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="bg-dark-blue/50 border border-primary-cyan/30 rounded-xl p-4 shadow-lg text-white/90 hover:border-primary-cyan/50 hover:shadow-primary-cyan/20 transition-all"
                  >
                    {zone}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl text-white font-poppins font-bold mb-6">
                Prêt à Découvrir Fresh Lab'O ?
              </h2>
              <p className="text-xl text-white/70 mb-8">
                Rejoignez nos centaines de clients satisfaits et découvrez
                la différence Fresh Lab'O
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/booking">
                  <Button variant="primary" size="lg" className="bg-primary-cyan hover:bg-primary-cyan/90 shadow-glow-cyan">
                    Réserver maintenant
                    <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="secondary" size="lg" className="bg-white/10 hover:bg-white/20 border-white/30">
                    Voir nos services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
