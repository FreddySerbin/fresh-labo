'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Calendar, MapPin, Clock, FileText, ArrowRight, Loader2, Download } from 'lucide-react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { toast } from 'sonner'

interface Booking {
  id: string
  booking_number: string
  scheduled_date: string
  scheduled_time_slot: string
  estimated_price: number
  address: string
  postal_code: string
  city: string
  floor?: string
  access_code?: string
  special_notes?: string
  service: {
    name: string
    category: string
    icon: string
  }
}

function ConfirmationContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const bookingId = searchParams.get('id')
  
  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (bookingId) {
      fetchBooking()
    } else {
      toast.error('ID de réservation manquant')
      router.push('/dashboard')
    }
  }, [bookingId])

  const fetchBooking = async () => {
    try {
      const response = await fetch('/api/bookings')
      const data = await response.json()

      if (data.success && data.bookings) {
        const foundBooking = data.bookings.find((b: Booking) => b.id === bookingId)
        if (foundBooking) {
          setBooking(foundBooking)
        } else {
          toast.error('Réservation non trouvée')
          router.push('/dashboard')
        }
      }
    } catch (error) {
      console.error('Fetch booking error:', error)
      toast.error('Erreur lors du chargement')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-primary-cyan/10 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary-cyan animate-spin" />
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Réservation non trouvée</p>
          <Link href="/dashboard" className="text-primary-cyan hover:underline">
            Retour au dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-primary-cyan/10 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Réservation Confirmée !
          </h1>
          <p className="text-lg text-gray-600">
            Numéro de réservation : <span className="font-semibold text-primary-cyan">{booking.booking_number}</span>
          </p>
        </div>

        {/* Confirmation Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          {/* Service Info */}
          <div className="bg-gradient-to-r from-primary-cyan to-primary-cyan/80 text-white p-6">
            <div className="flex items-center gap-4">
              <div className="text-5xl">{booking.service.icon}</div>
              <div>
                <h2 className="text-2xl font-bold">{booking.service.name}</h2>
                <p className="text-primary-cyan-light">Service de nettoyage professionnel</p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 space-y-4">
            {/* Date et Heure */}
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="bg-white p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-primary-cyan" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Date et heure</h3>
                <p className="text-gray-700">
                  {format(new Date(booking.scheduled_date), 'EEEE d MMMM yyyy', { locale: fr })}
                </p>
                <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {booking.scheduled_time_slot === 'morning' 
                    ? 'Matin (8h00 - 12h00)' 
                    : 'Après-midi (14h00 - 18h00)'}
                </p>
              </div>
            </div>

            {/* Adresse */}
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="bg-white p-3 rounded-lg">
                <MapPin className="w-6 h-6 text-primary-cyan" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Adresse d&apos;intervention</h3>
                <p className="text-gray-700">{booking.address}</p>
                <p className="text-gray-700">{booking.postal_code} {booking.city}</p>
                {booking.floor && (
                  <p className="text-sm text-gray-600 mt-1">Étage : {booking.floor}</p>
                )}
                {booking.access_code && (
                  <p className="text-sm text-gray-600">Code d&apos;accès : {booking.access_code}</p>
                )}
              </div>
            </div>

            {/* Notes */}
            {booking.special_notes && (
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-white p-3 rounded-lg">
                  <FileText className="w-6 h-6 text-primary-cyan" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Notes spéciales</h3>
                  <p className="text-gray-700 text-sm">{booking.special_notes}</p>
                </div>
              </div>
            )}

            {/* Prix */}
            <div className="bg-primary-cyan/10 rounded-xl p-6 border-2 border-primary-cyan">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Prix estimé</span>
                <span className="text-3xl font-bold text-primary-cyan">{booking.estimated_price}€</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Le prix final sera confirmé après l&apos;intervention
              </p>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-blue-900 mb-3">Prochaines étapes</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span>Vous recevrez un email de confirmation dans quelques minutes</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span>Notre équipe vous contactera 24h avant l&apos;intervention pour confirmer</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span>Vous pouvez suivre votre réservation depuis votre dashboard</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span>Une facture vous sera envoyée après l&apos;intervention</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/dashboard"
            className="flex-1 bg-primary-cyan hover:bg-primary-cyan/90 text-white font-medium py-4 px-6 rounded-lg transition-colors text-center flex items-center justify-center gap-2"
          >
            <ArrowRight className="w-5 h-5" />
            Voir mes réservations
          </Link>
          
          <button
            onClick={() => {
              toast.info('Téléchargement du PDF à venir')
            }}
            className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-medium py-4 px-6 rounded-lg transition-colors border-2 border-gray-200 flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Télécharger le récapitulatif
          </button>
        </div>

        {/* Contact Info */}
        <div className="text-center mt-8 pt-8 border-t">
          <p className="text-gray-600 mb-2">Une question sur votre réservation ?</p>
          <Link href="/contact" className="text-primary-cyan hover:underline font-medium">
            Contactez notre service client
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-primary-cyan/10 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary-cyan animate-spin" />
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  )
}
