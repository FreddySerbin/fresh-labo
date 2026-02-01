'use client'

import { Calendar, Clock, CheckCircle, Euro, TrendingUp, Star } from 'lucide-react'
import { StatCard } from './StatCard'
import { FadeIn } from '@/components/common/FadeIn'

interface StatsSectionProps {
  stats: {
    totalBookings: number
    upcomingBookings: number
    completedBookings: number
    totalSpent: number
    averagePrice: number
    cancelledBookings: number
  }
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <div className="mb-12">
      <FadeIn>
        <h2 className="text-2xl font-poppins font-bold text-dark-blue mb-6">
          📊 Vos statistiques
        </h2>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={Calendar}
          label="Total des réservations"
          value={stats.totalBookings}
          color="cyan"
          delay={0}
          subtext="Depuis votre inscription"
        />

        <StatCard
          icon={Clock}
          label="À venir"
          value={stats.upcomingBookings}
          color="orange"
          delay={0.1}
          subtext="Interventions programmées"
        />

        <StatCard
          icon={CheckCircle}
          label="Terminées"
          value={stats.completedBookings}
          color="green"
          delay={0.2}
          subtext="Services réalisés"
        />

        <StatCard
          icon={Euro}
          label="Total dépensé"
          value={stats.totalSpent}
          suffix="€"
          color="blue"
          delay={0.3}
          subtext="Montant total"
        />

        <StatCard
          icon={TrendingUp}
          label="Prix moyen"
          value={stats.averagePrice}
          suffix="€"
          color="purple"
          delay={0.4}
          subtext="Par intervention"
        />

        <StatCard
          icon={Star}
          label="Taux de complétion"
          value={
            stats.totalBookings > 0
              ? Math.round((stats.completedBookings / stats.totalBookings) * 100)
              : 0
          }
          suffix="%"
          color="cyan"
          delay={0.5}
          subtext={`${stats.cancelledBookings} annulées`}
        />
      </div>
    </div>
  )
}
