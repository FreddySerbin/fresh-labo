'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { 
  Calendar, Clock, MapPin, Loader2, CheckCircle, XCircle, AlertTriangle,
  TrendingUp, DollarSign, Package, Users, Filter, Search, ArrowLeft, Eye
} from 'lucide-react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { toast } from 'sonner'

interface Booking {
  id: string
  booking_number: string
  scheduled_date: string
  scheduled_time_slot: string
  estimated_price: number
  final_price: number | null
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  address: string
  city: string
  client_name: string
  client_email: string
  client_phone: string
  created_at: string
  service: {
    name: string
    category: string
    icon: string
  }
}

export default function AdminPage() {
  const { user, loading: authLoading, signOut } = useAuth()
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [newStatus, setNewStatus] = useState('')
  const [finalPrice, setFinalPrice] = useState('')
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login')
    } else if (user) {
      fetchBookings()
    }
  }, [user, authLoading, router])

  useEffect(() => {
    filterBookings()
  }, [bookings, statusFilter, searchQuery])

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/admin/bookings')
      const data = await response.json()

      if (data.success) {
        setBookings(data.bookings || [])
      } else {
        toast.error('Erreur lors du chargement des réservations')
      }
    } catch (error) {
      console.error('Fetch bookings error:', error)
      toast.error('Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  const filterBookings = () => {
    let filtered = [...bookings]

    // Filtre par statut
    if (statusFilter !== 'all') {
      filtered = filtered.filter(b => b.status === statusFilter)
    }

    // Filtre par recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(b =>
        b.booking_number.toLowerCase().includes(query) ||
        b.client_name.toLowerCase().includes(query) ||
        b.client_email.toLowerCase().includes(query) ||
        b.service.name.toLowerCase().includes(query) ||
        b.city.toLowerCase().includes(query)
      )
    }

    setFilteredBookings(filtered)
  }

  const openStatusModal = (booking: Booking) => {
    setSelectedBooking(booking)
    setNewStatus(booking.status)
    setFinalPrice(booking.final_price?.toString() || booking.estimated_price.toString())
    setShowStatusModal(true)
  }

  const handleUpdateStatus = async () => {
    if (!selectedBooking) return

    setUpdating(true)
    try {
      const response = await fetch(`/api/admin/bookings/${selectedBooking.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          final_price: parseFloat(finalPrice)
        })
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Réservation mise à jour avec succès')
        setShowStatusModal(false)
        fetchBookings()
      } else {
        toast.error(data.error || 'Erreur lors de la mise à jour')
      }
    } catch (error) {
      console.error('Update status error:', error)
      toast.error('Erreur de connexion')
    } finally {
      setUpdating(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle },
      confirmed: { label: 'Confirmée', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      in_progress: { label: 'En cours', color: 'bg-blue-100 text-blue-800', icon: Clock },
      completed: { label: 'Terminée', color: 'bg-gray-100 text-gray-800', icon: CheckCircle },
      cancelled: { label: 'Annulée', color: 'bg-red-100 text-red-800', icon: XCircle },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    const Icon = config.icon

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    )
  }

  // Calcul des statistiques
  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    revenue: bookings
      .filter(b => b.status === 'completed')
      .reduce((sum, b) => sum + (b.final_price || b.estimated_price), 0),
    averagePrice: bookings.length > 0
      ? bookings.reduce((sum, b) => sum + b.estimated_price, 0) / bookings.length
      : 0
  }

  const todayBookings = filteredBookings.filter(b => 
    b.scheduled_date === new Date().toISOString().split('T')[0]
  )

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

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-cyan/10 via-white to-primary-orange/10">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-heading-2 font-poppins font-bold text-primary-cyan">
              Fresh Lab'O - Admin
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-body text-gray-600 hidden sm:inline">
                {user.email}
              </span>
              <Link href="/dashboard">
                <Button variant="secondary" className="flex items-center gap-2">
                  <ArrowLeft className="w-5 h-5" />
                  Dashboard Client
                </Button>
              </Link>
              <Button variant="secondary" onClick={signOut}>
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-poppins font-bold text-dark-blue mb-2">
              Panel Administrateur
            </h1>
            <p className="text-gray-600">
              Gérez toutes les réservations Fresh Lab'O
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="bg-primary-cyan/10 p-4 rounded-full">
                  <Calendar className="w-8 h-8 text-primary-cyan" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">En attente</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-full">
                  <AlertTriangle className="w-8 h-8 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Terminées</p>
                  <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <div className="bg-green-100 p-4 rounded-full">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Chiffre d'affaires</p>
                  <p className="text-3xl font-bold text-primary-cyan">{stats.revenue}€</p>
                </div>
                <div className="bg-primary-cyan/10 p-4 rounded-full">
                  <DollarSign className="w-8 h-8 text-primary-cyan" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher (N°, client, email, service, ville...)"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-cyan focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-cyan focus:border-transparent bg-white"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="pending">En attente</option>
                  <option value="confirmed">Confirmées</option>
                  <option value="in_progress">En cours</option>
                  <option value="completed">Terminées</option>
                  <option value="cancelled">Annulées</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
              <span>{filteredBookings.length} résultat(s)</span>
              {todayBookings.length > 0 && (
                <span className="text-primary-cyan font-semibold">
                  {todayBookings.length} intervention(s) aujourd'hui
                </span>
              )}
            </div>
          </div>

          {/* Bookings List */}
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucune réservation
              </h3>
              <p className="text-gray-600">
                {searchQuery || statusFilter !== 'all' 
                  ? 'Aucun résultat ne correspond à vos critères'
                  : 'Aucune réservation pour le moment'
                }
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Réservation
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Client
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Service
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Date & Heure
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Prix
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-semibold text-gray-900">
                              {booking.booking_number}
                            </div>
                            <div className="text-xs text-gray-500">
                              Créée le {format(new Date(booking.created_at), 'd MMM yyyy', { locale: fr })}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {booking.client_name}
                            </div>
                            <div className="text-xs text-gray-500">{booking.client_email}</div>
                            <div className="text-xs text-gray-500">{booking.client_phone}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{booking.service.icon}</span>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {booking.service.name}
                              </div>
                              <div className="text-xs text-gray-500 flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {booking.city}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {format(new Date(booking.scheduled_date), 'd MMM yyyy', { locale: fr })}
                          </div>
                          <div className="text-xs text-gray-500">
                            {booking.scheduled_time_slot === 'morning' ? 'Matin (8h-12h)' : 'Après-midi (14h-18h)'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            {booking.final_price || booking.estimated_price}€
                          </div>
                          {booking.final_price && booking.final_price !== booking.estimated_price && (
                            <div className="text-xs text-gray-500 line-through">
                              {booking.estimated_price}€
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(booking.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link href={`/dashboard/bookings/${booking.id}`}>
                              <Button variant="secondary" size="sm" className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                Voir
                              </Button>
                            </Link>
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => openStatusModal(booking)}
                              className="flex items-center gap-1"
                            >
                              Modifier
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Status Update Modal */}
      {showStatusModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Modifier la réservation
              </h3>
              <p className="text-sm text-gray-600">
                {selectedBooking.booking_number} - {selectedBooking.client_name}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Statut
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-cyan focus:border-transparent"
                >
                  <option value="pending">En attente</option>
                  <option value="confirmed">Confirmée</option>
                  <option value="in_progress">En cours</option>
                  <option value="completed">Terminée</option>
                  <option value="cancelled">Annulée</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prix final (€)
                </label>
                <input
                  type="number"
                  value={finalPrice}
                  onChange={(e) => setFinalPrice(e.target.value)}
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-cyan focus:border-transparent"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Prix estimé : {selectedBooking.estimated_price}€
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="secondary"
                onClick={() => setShowStatusModal(false)}
                className="flex-1"
                disabled={updating}
              >
                Annuler
              </Button>
              <Button
                variant="primary"
                onClick={handleUpdateStatus}
                disabled={updating}
                className="flex-1 flex items-center justify-center gap-2"
              >
                {updating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Mise à jour...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Enregistrer
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
