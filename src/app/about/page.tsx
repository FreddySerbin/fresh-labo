import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Users, Award, Target, Heart, Shield, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'À Propos - Fresh Lab\'O',
  description: 'Découvrez Fresh Lab\'O, votre expert en nettoyage professionnel à Paris et en Île-de-France. Notre histoire, nos valeurs et notre engagement qualité.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-dark text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-display-small md:text-display-medium font-poppins font-bold mb-6">
                À Propos de Fresh Lab'O
              </h1>
              <p className="text-body-large text-gray-300">
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
              <div className="text-center mb-12">
                <h2 className="text-display-small text-dark-blue font-poppins font-bold mb-6">
                  Notre Histoire
                </h2>
                <div className="w-20 h-1 bg-gradient-fresh mx-auto mb-8"></div>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-body-large text-gray-700 leading-relaxed mb-6">
                  <strong className="text-primary-cyan">Fresh Lab'O</strong> est né d'une passion pour la 
                  propreté et le bien-être. Fondée par des professionnels du nettoyage avec plus de 10 ans 
                  d'expérience, notre entreprise s'est donnée pour mission de rendre le nettoyage 
                  professionnel accessible à tous.
                </p>
                <p className="text-body-large text-gray-700 leading-relaxed mb-6">
                  Nous croyons que chacun mérite un environnement propre et sain, que ce soit à la maison 
                  ou dans son véhicule. C'est pourquoi nous avons développé une approche moderne du 
                  nettoyage professionnel, combinant techniques éprouvées et technologies innovantes.
                </p>
                <p className="text-body-large text-gray-700 leading-relaxed">
                  Aujourd'hui, Fresh Lab'O est fier de servir des centaines de clients satisfaits à Paris 
                  et en Île-de-France, avec un engagement constant envers la qualité, la transparence et 
                  l'excellence du service.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Nos Valeurs */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-display-small text-dark-blue font-poppins font-bold mb-6">
                Nos Valeurs
              </h2>
              <p className="text-body-large text-gray-600 max-w-2xl mx-auto">
                Ce qui guide notre travail au quotidien
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Shield,
                  title: 'Qualité Garantie',
                  description: 'Des résultats impeccables ou nous revenons gratuitement. Votre satisfaction est notre priorité absolue.',
                  color: 'text-primary-cyan',
                },
                {
                  icon: Heart,
                  title: 'Respect & Intégrité',
                  description: 'Nous traitons votre maison et vos biens avec le plus grand soin, comme s\'ils étaient les nôtres.',
                  color: 'text-error',
                },
                {
                  icon: Sparkles,
                  title: 'Innovation',
                  description: 'Nous utilisons les dernières techniques et produits professionnels pour des résultats optimaux.',
                  color: 'text-primary-orange',
                },
                {
                  icon: Users,
                  title: 'Proximité Client',
                  description: 'Un service personnalisé et une écoute attentive de vos besoins spécifiques.',
                  color: 'text-success',
                },
                {
                  icon: Target,
                  title: 'Transparence',
                  description: 'Tarifs clairs affichés, pas de frais cachés. Ce que vous voyez est ce que vous payez.',
                  color: 'text-info',
                },
                {
                  icon: Award,
                  title: 'Excellence',
                  description: 'Des techniciens formés et certifiés, utilisant les meilleures pratiques du secteur.',
                  color: 'text-warning',
                },
              ].map((value) => (
                <div
                  key={value.title}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className={`${value.color} mb-4`}>
                    <value.icon className="w-12 h-12" />
                  </div>
                  <h3 className="text-heading-2 text-dark-blue font-poppins font-bold mb-3">
                    {value.title}
                  </h3>
                  <p className="text-body text-gray-600">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Notre Engagement */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-fresh rounded-3xl p-12 text-white text-center">
                <h2 className="text-display-small font-poppins font-bold mb-6">
                  Notre Engagement Qualité
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div>
                    <div className="text-heading-1 font-poppins font-bold mb-2">
                      500+
                    </div>
                    <div className="text-body">Clients satisfaits</div>
                  </div>
                  <div>
                    <div className="text-heading-1 font-poppins font-bold mb-2">
                      4.9/5
                    </div>
                    <div className="text-body">Note moyenne</div>
                  </div>
                  <div>
                    <div className="text-heading-1 font-poppins font-bold mb-2">
                      100%
                    </div>
                    <div className="text-body">Satisfaction garantie</div>
                  </div>
                </div>
                <p className="text-body-large mb-8">
                  Nous nous engageons à fournir un service irréprochable à chaque intervention.
                  Votre satisfaction est notre meilleure publicité.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Zone d'Intervention */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-display-small text-dark-blue font-poppins font-bold mb-6">
                Zone d'Intervention
              </h2>
              <p className="text-body-large text-gray-600 mb-8">
                Nous intervenons dans toute la région parisienne :
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-body text-gray-700">
                {['Paris 75', 'Hauts-de-Seine 92', 'Seine-Saint-Denis 93', 'Val-de-Marne 94',
                  'Seine-et-Marne 77', 'Yvelines 78', 'Essonne 91', 'Val-d\'Oise 95'].map((zone) => (
                  <div key={zone} className="bg-white rounded-lg p-4 shadow">
                    {zone}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-display-small text-dark-blue font-poppins font-bold mb-6">
                Prêt à Découvrir Fresh Lab'O ?
              </h2>
              <p className="text-body-large text-gray-600 mb-8">
                Rejoignez nos centaines de clients satisfaits et découvrez
                la différence Fresh Lab'O
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/booking/estimate">
                  <Button variant="primary" size="lg">
                    Réserver maintenant
                    <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="secondary" size="lg">
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
