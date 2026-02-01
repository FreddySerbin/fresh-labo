'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { 
  Calendar, Clock, MapPin, Phone, Mail, User, FileText, 
  ArrowLeft, Loader2, AlertTriangle, Edit, X, CheckCircle,
  Download, XCircle
} from 'lucide-react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { toast } from 'sonner'

interface BookingDetail {
  id: string
  booking_number: string
  scheduled_date: string
  scheduled_time_slot: string
  estimated_price: number
  final_price: number | null
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  address: string
  postal_code: string
  city: string
  access_code: string | null
  floor: string | null
  special_notes: string | null
  client_name: string
  client_email: string
  client_phone: string
  cancelled_at: string | null
  cancellation_reason: string | null
  created_at: string
  service: {
    id: string
    name: string
    category: string
    description: string
    icon: string
    base_price: number
    estimated_duration: number
  }
  booking_options: Array<{
    id: string
    quantity: number
    price_at_booking: number
    option: {
      id: string
      name: string
      description: string
      option_type: string
      price_modifier: number
    }
  }>
}

export default function BookingDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [booking, setBooking] = useState<BookingDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [cancelling, setCancelling] = useState(false)
  const [cancellationReason, setCancellationReason] = useState('')
  const [editing, setEditing] = useState(false)
  const [editData, setEditData] = useState({
    scheduled_date: '',
    scheduled_time_slot: '',
    address: '',
    postal_code: '',
    city: '',
    access_code: '',
    floor: '',
    special_notes: ''
  })

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login')
    } else if (user && params.id) {
      fetchBookingDetails()
    }
  }, [user, authLoading, params.id, router])

  const fetchBookingDetails = async () => {
    try {
      const response = await fetch(`/api/bookings/${params.id}`)
      const data = await response.json()

      if (data.success) {
        setBooking(data.booking)
      } else {
        toast.error(data.error || 'Erreur lors du chargement')
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Fetch booking error:', error)
      toast.error('Erreur de connexion')
      router.push('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelBooking = async () => {
    if (!cancellationReason.trim()) {
      toast.error('Veuillez indiquer une raison d\'annulation')
      return
    }

    setCancelling(true)
    try {
      const response = await fetch(`/api/bookings/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'cancel',
          cancellation_reason: cancellationReason
        })
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Réservation annulée avec succès')
        setShowCancelModal(false)
        fetchBookingDetails() // Rafraîchir les données
      } else {
        toast.error(data.error || 'Erreur lors de l\'annulation')
      }
    } catch (error) {
      console.error('Cancel booking error:', error)
      toast.error('Erreur de connexion')
    } finally {
      setCancelling(false)
    }
  }

  const handleEditBooking = async () => {
    if (!editData.scheduled_date || !editData.address || !editData.postal_code || !editData.city) {
      toast.error('Veuillez remplir tous les champs obligatoires')
      return
    }

    setEditing(true)
    try {
      const response = await fetch(`/api/bookings/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update',
          ...editData
        })
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Réservation modifiée avec succès')
        setShowEditModal(false)
        fetchBookingDetails() // Rafraîchir les données
      } else {
        toast.error(data.error || 'Erreur lors de la modification')
      }
    } catch (error) {
      console.error('Edit booking error:', error)
      toast.error('Erreur de connexion')
    } finally {
      setEditing(false)
    }
  }

  const openEditModal = () => {
    if (booking) {
      setEditData({
        scheduled_date: booking.scheduled_date,
        scheduled_time_slot: booking.scheduled_time_slot || 'morning',
        address: booking.address,
        postal_code: booking.postal_code,
        city: booking.city,
        access_code: booking.access_code || '',
        floor: booking.floor || '',
        special_notes: booking.special_notes || ''
      })
      setShowEditModal(true)
    }
  }

  const canCancelBooking = (booking: BookingDetail) => {
    if (!['pending', 'confirmed'].includes(booking.status)) return false
    
    const scheduledDate = new Date(booking.scheduled_date)
    const now = new Date()
    const hoursDiff = (scheduledDate.getTime() - now.getTime()) / (1000 * 60 * 60)
    
    return hoursDiff >= 48
  }

  const canEditBooking = (booking: BookingDetail) => {
    return booking.status === 'pending'
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800 border-yellow-300', icon: AlertTriangle },
      confirmed: { label: 'Confirmée', color: 'bg-green-100 text-green-800 border-green-300', icon: CheckCircle },
      in_progress: { label: 'En cours', color: 'bg-blue-100 text-blue-800 border-blue-300', icon: Clock },
      completed: { label: 'Terminée', color: 'bg-gray-100 text-gray-800 border-gray-300', icon: CheckCircle },
      cancelled: { label: 'Annulée', color: 'bg-red-100 text-red-800 border-red-300', icon: XCircle },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    const Icon = config.icon

    return (
      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border-2 ${config.color}`}>
        <Icon className="w-5 h-5" />
        {config.label}
      </span>
    )
  }

  const downloadPDF = async () => {
    try {
      toast.loading('Génération du PDF...', { id: 'pdf-download' })
      
      const response = await fetch(`/api/bookings/${params.id}/pdf`)
      
      if (!response.ok) {
        throw new Error('Erreur lors de la génération du PDF')
      }
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Devis_FreshLabO_${booking?.booking_number}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      
      toast.success('PDF téléchargé avec succès !', { id: 'pdf-download' })
    } catch (error) {
      console.error('PDF download error:', error)
      toast.error('Erreur lors du téléchargement du PDF', { id: 'pdf-download' })
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary-cyan mx-auto animate-spin" />
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!booking) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-cyan/10 via-white to-primary-orange/10">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-heading-2 font-poppins font-bold text-primary-cyan">
              Fresh Lab'O
            </Link>
            <Link href="/dashboard">
              <Button variant="secondary" className="flex items-center gap-2">
                <ArrowLeft className="w-5 h-5" />
                Retour au dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-6">
                <div className="text-7xl">{booking.service.icon}</div>
                <div>
                  <h1 className="text-3xl font-poppins font-bold text-gray-900 mb-2">
                    {booking.service.name}
                  </h1>
                  <p className="text-lg text-gray-600 mb-2">
                    N° de réservation : <span className="font-semibold text-primary-cyan">{booking.booking_number}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Créée le {format(new Date(booking.created_at), 'd MMMM yyyy à HH:mm', { locale: fr })}
                  </p>
                </div>
              </div>
              {getStatusBadge(booking.status)}
            </div>

            {/* Service Description */}
            {booking.service.description && (
              <p className="text-gray-600 mb-4 pb-4 border-b">
                {booking.service.description}
              </p>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="primary" 
                onClick={downloadPDF}
                className="flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Télécharger PDF
              </Button>
              
              {canEditBooking(booking) && (
                <Button 
                  variant="secondary"
                  onClick={openEditModal}
                  className="flex items-center gap-2"
                >
                  <Edit className="w-5 h-5" />
                  Modifier
                </Button>
              )}
              
              {canCancelBooking(booking) && (
                <Button 
                  variant="secondary"
                  onClick={() => setShowCancelModal(true)}
                  className="flex items-center gap-2 border-red-300 text-red-600 hover:bg-red-50"
                >
                  <XCircle className="w-5 h-5" />
                  Annuler la réservation
                </Button>
              )}
            </div>

            {/* Warning for non-cancellable bookings */}
            {booking.status === 'confirmed' && !canCancelBooking(booking) && (
              <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-semibold mb-1">Annulation impossible</p>
                    <p>L'intervention est prévue dans moins de 48h. Pour annuler, veuillez contacter notre service client.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Cancellation Info */}
            {booking.status === 'cancelled' && booking.cancelled_at && (
              <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-400 rounded">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-red-800">
                    <p className="font-semibold mb-1">Réservation annulée</p>
                    <p>Annulée le {format(new Date(booking.cancelled_at), 'd MMMM yyyy à HH:mm', { locale: fr })}</p>
                    {booking.cancellation_reason && (
                      <p className="mt-1 italic">Raison : {booking.cancellation_reason}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Date & Time */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-primary-cyan" />
                Date et Heure
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Date d'intervention</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {format(new Date(booking.scheduled_date), 'EEEE d MMMM yyyy', { locale: fr })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Créneau horaire</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {booking.scheduled_time_slot === 'morning' ? 'Matin (8h-12h)' : 'Après-midi (14h-18h)'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Durée estimée</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {booking.service.estimated_duration} minutes
                  </p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-primary-cyan" />
                Adresse d'intervention
              </h2>
              <div className="space-y-2">
                <p className="text-lg text-gray-900">{booking.address}</p>
                <p className="text-lg text-gray-900">{booking.postal_code} {booking.city}</p>
                {booking.floor && (
                  <p className="text-sm text-gray-600">Étage : {booking.floor}</p>
                )}
                {booking.access_code && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Code d'accès</p>
                    <p className="text-lg font-mono font-semibold text-gray-900">{booking.access_code}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Client Info & Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Client Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-6 h-6 text-primary-cyan" />
                Informations client
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">{booking.client_name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <a href={`mailto:${booking.client_email}`} className="text-primary-cyan hover:underline">
                    {booking.client_email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <a href={`tel:${booking.client_phone}`} className="text-primary-cyan hover:underline">
                    {booking.client_phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Special Notes */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary-cyan" />
                Notes spéciales
              </h2>
              {booking.special_notes ? (
                <p className="text-gray-700 whitespace-pre-wrap">{booking.special_notes}</p>
              ) : (
                <p className="text-gray-400 italic">Aucune note spéciale</p>
              )}
            </div>
          </div>

          {/* Options & Pricing */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Détails du devis</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-gray-700">Prestation de base</span>
                <span className="font-semibold text-gray-900">{booking.service.base_price}€</span>
              </div>

              {booking.booking_options.map((opt) => (
                <div key={opt.id} className="flex justify-between items-center pb-3 border-b">
                  <div>
                    <span className="text-gray-700">{opt.option.name}</span>
                    {opt.quantity > 1 && (
                      <span className="text-sm text-gray-500 ml-2">x{opt.quantity}</span>
                    )}
                  </div>
                  <span className="font-semibold text-gray-900">
                    {opt.price_at_booking * opt.quantity}€
                  </span>
                </div>
              ))}

              <div className="flex justify-between items-center pt-3">
                <span className="text-xl font-bold text-gray-900">Prix total estimé</span>
                <span className="text-3xl font-bold text-primary-cyan">{booking.estimated_price}€</span>
              </div>

              {booking.final_price && booking.final_price !== booking.estimated_price && (
                <div className="flex justify-between items-center pt-3 border-t-2">
                  <span className="text-xl font-bold text-gray-900">Prix final</span>
                  <span className="text-3xl font-bold text-primary-orange">{booking.final_price}€</span>
                </div>
              )}
            </div>

            <p className="text-sm text-gray-500 italic">
              * Le prix final pourra être ajusté après l'intervention en fonction de l'état réel constaté
            </p>
          </div>
        </div>
      </main>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900">Annuler la réservation</h3>
              <button
                onClick={() => setShowCancelModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Êtes-vous sûr de vouloir annuler cette réservation ? Cette action est irréversible.
              </p>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Raison de l'annulation *
              </label>
              <textarea
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-cyan focus:border-transparent"
                rows={4}
                placeholder="Veuillez indiquer la raison de votre annulation..."
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={() => setShowCancelModal(false)}
                className="flex-1"
                disabled={cancelling}
              >
                Retour
              </Button>
              <Button
                variant="primary"
                onClick={handleCancelBooking}
                disabled={cancelling || !cancellationReason.trim()}
                className="flex-1 bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2"
              >
                {cancelling ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Annulation...
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5" />
                    Confirmer l'annulation
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Modifier la réservation</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
                disabled={editing}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date d'intervention *
                  </label>
                  <input
                    type="date"
                    value={editData.scheduled_date}
                    onChange={(e) => setEditData({ ...editData, scheduled_date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-cyan focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Créneau horaire *
                  </label>
                  <select
                    value={editData.scheduled_time_slot}
                    onChange={(e) => setEditData({ ...editData, scheduled_time_slot: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-cyan focus:border-transparent"
                  >
                    <option value="morning">Matin (8h-12h)</option>
                    <option value="afternoon">Après-midi (14h-18h)</option>
                  </select>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse *
                </label>
                <input
                  type="text"
                  value={editData.address}
                  onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                  placeholder="12 rue de la République"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-cyan focus:border-transparent"
                />
              </div>

              {/* Postal Code & City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Code postal *
                  </label>
                  <input
                    type="text"
                    value={editData.postal_code}
                    onChange={(e) => setEditData({ ...editData, postal_code: e.target.value })}
                    placeholder="75001"
                    maxLength={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-cyan focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ville *
                  </label>
                  <input
                    type="text"
                    value={editData.city}
                    onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                    placeholder="Paris"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-cyan focus:border-transparent"
                  />
                </div>
              </div>

              {/* Floor & Access Code */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Étage (optionnel)
                  </label>
                  <input
                    type="text"
                    value={editData.floor}
                    onChange={(e) => setEditData({ ...editData, floor: e.target.value })}
                    placeholder="3ème étage"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-cyan focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Code d'accès (optionnel)
                  </label>
                  <input
                    type="text"
                    value={editData.access_code}
                    onChange={(e) => setEditData({ ...editData, access_code: e.target.value })}
                    placeholder="A1234B"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-cyan focus:border-transparent"
                  />
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes spéciales (optionnel)
                </label>
                <textarea
                  value={editData.special_notes}
                  onChange={(e) => setEditData({ ...editData, special_notes: e.target.value })}
                  rows={3}
                  placeholder="Informations complémentaires..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-cyan focus:border-transparent"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <Button
                variant="secondary"
                onClick={() => setShowEditModal(false)}
                className="flex-1"
                disabled={editing}
              >
                Annuler
              </Button>
              <Button
                variant="primary"
                onClick={handleEditBooking}
                disabled={editing || !editData.scheduled_date || !editData.address || !editData.postal_code || !editData.city}
                className="flex-1 flex items-center justify-center gap-2"
              >
                {editing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Modification...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Enregistrer les modifications
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
