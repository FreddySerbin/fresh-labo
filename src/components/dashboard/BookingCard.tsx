'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, ChevronRight } from 'lucide-react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

interface BookingCardProps {
  booking: {
    id: string
    booking_number: string
    scheduled_date: string
    scheduled_time_slot: string
    estimated_price: number
    status: string
    address: string
    city: string
    service: {
      name: string
      icon: string
    }
  }
  index?: number
  isPast?: boolean
}

const statusConfig = {
  pending: { 
    label: 'En attente', 
    color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    gradient: 'from-yellow-50 to-yellow-100'
  },
  confirmed: { 
    label: 'Confirmée', 
    color: 'bg-green-100 text-green-800 border-green-300',
    gradient: 'from-green-50 to-green-100'
  },
  in_progress: { 
    label: 'En cours', 
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    gradient: 'from-blue-50 to-blue-100'
  },
  completed: { 
    label: 'Terminée', 
    color: 'bg-gray-100 text-gray-800 border-gray-300',
    gradient: 'from-gray-50 to-gray-100'
  },
  cancelled: { 
    label: 'Annulée', 
    color: 'bg-red-100 text-red-800 border-red-300',
    gradient: 'from-red-50 to-red-100'
  },
}

export function BookingCard({ booking, index = 0, isPast = false }: BookingCardProps) {
  const config = statusConfig[booking.status as keyof typeof statusConfig] || statusConfig.pending

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isPast ? 0.75 : 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, opacity: 1 }}
      className="group relative overflow-hidden"
    >
      {/* Background gradient decoration */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="relative bg-white rounded-xl shadow-lg p-6 border-2 border-transparent group-hover:border-primary-cyan/30 transition-all duration-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <motion.div 
              className="text-5xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {booking.service.icon}
            </motion.div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-cyan transition-colors">
                {booking.service.name}
              </h3>
              <p className="text-sm text-gray-600">N° {booking.booking_number}</p>
            </div>
          </div>
          
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${config.color}`}>
            {config.label}
          </span>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-primary-cyan flex-shrink-0" />
            <span className="truncate">
              {format(new Date(booking.scheduled_date), 'd MMMM yyyy', { locale: fr })}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 text-primary-cyan flex-shrink-0" />
            <span className="truncate">
              {booking.scheduled_time_slot === 'morning' ? 'Matin (8h-12h)' : 'Après-midi (14h-18h)'}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-primary-cyan flex-shrink-0" />
            <span className="truncate">{booking.city}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-2xl font-bold text-primary-cyan">
            {booking.estimated_price}€
          </div>
          
          <Link href={`/dashboard/bookings/${booking.id}`}>
            <Button 
              variant="secondary" 
              size="sm"
              className="group-hover:bg-primary-cyan group-hover:text-white transition-all duration-300"
            >
              <span>Voir détails</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Hover shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
          initial={{ x: '-100%', opacity: 0 }}
          whileHover={{ x: '100%', opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
      </div>
    </motion.div>
  )
}
