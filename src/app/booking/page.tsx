'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'
import { Calendar, Clock, MapPin, FileText, ArrowRight, Check, Loader2 } from 'lucide-react'
import { format, addDays, startOfDay } from 'date-fns'
import { fr } from 'date-fns/locale'

interface Service {
  id: string
  name: string
  description: string
  category: string
  base_price: number
  icon: string
  service_options: ServiceOption[]
}

interface ServiceOption {
  id: string
  name: string
  description: string
  price_modifier: number
  option_type: string
  is_required: boolean
}

interface BookingData {
  service_id: string
  scheduled_date: string
  scheduled_time_slot: 'morning' | 'afternoon'
  address: string
  postal_code: string
  city: string
  access_code?: string
  floor?: string
  special_notes?: string
  selected_options: ServiceOption[]
  estimated_price: number
}

export default function BookingPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  
  const [step, setStep] = useState(1)
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  
  const [bookingData, setBookingData] = useState<BookingData>({
    service_id: '',
    scheduled_date: '',
    scheduled_time_slot: 'morning',
    address: '',
    postal_code: '',
    city: '',
    selected_options: [],
    estimated_price: 0
  })

  // Charger les services
  useEffect(() => {
    fetchServices()
  }, [])

  // Rediriger si non connecté
  useEffect(() => {
    if (!authLoading && !user) {
      toast.error('Vous devez être connecté pour réserver')
      router.push('/auth/login?redirectTo=/booking')
    }
  }, [user, authLoading, router])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services')
      const data = await response.json()
      
      if (data.success) {
        setServices(data.services)
      } else {
        toast.error('Erreur lors du chargement des services')
      }
    } catch (error) {
      console.error('Fetch services error:', error)
      toast.error('Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  const calculatePrice = () => {
    const service = services.find(s => s.id === bookingData.service_id)
    if (!service) return 0

    let total = service.base_price
    bookingData.selected_options.forEach(option => {
      total += option.price_modifier
    })

    return Math.max(0, total)
  }

  const handleServiceSelect = (serviceId: string) => {
    setBookingData({
      ...bookingData,
      service_id: serviceId,
      selected_options: [],
      estimated_price: 0
    })
    setStep(2)
  }

  const handleOptionToggle = (option: ServiceOption) => {
    const isSelected = bookingData.selected_options.some(o => o.id === option.id)
    
    let newOptions
    if (isSelected) {
      newOptions = bookingData.selected_options.filter(o => o.id !== option.id)
    } else {
      newOptions = [...bookingData.selected_options, option]
    }

    setBookingData({
      ...bookingData,
      selected_options: newOptions
    })
  }

  const handleNextStep = () => {
    if (step === 2) {
      const service = services.find(s => s.id === bookingData.service_id)
      const requiredOptions = service?.service_options.filter(o => o.is_required) || []
      const selectedRequiredOptions = requiredOptions.filter(ro =>
        bookingData.selected_options.some(so => so.id === ro.id)
      )

      if (selectedRequiredOptions.length < requiredOptions.length) {
        toast.error('Veuillez sélectionner toutes les options obligatoires')
        return
      }

      const price = calculatePrice()
      setBookingData({ ...bookingData, estimated_price: price })
    }

    if (step === 3) {
      if (!bookingData.scheduled_date || !bookingData.scheduled_time_slot) {
        toast.error('Veuillez sélectionner une date et un créneau')
        return
      }
    }

    if (step === 4) {
      if (!bookingData.address || !bookingData.postal_code || !bookingData.city) {
        toast.error('Veuillez remplir tous les champs obligatoires')
        return
      }
    }

    setStep(step + 1)
  }

  const handlePreviousStep = () => {
    setStep(step - 1)
  }

  const handleSubmit = async () => {
    setSubmitting(true)

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Réservation créée avec succès !')
        router.push(`/booking/confirmation?id=${data.booking.id}`)
      } else {
        toast.error(data.error || 'Erreur lors de la réservation')
      }
    } catch (error) {
      console.error('Booking submission error:', error)
      toast.error('Erreur de connexion')
    } finally {
      setSubmitting(false)
    }
  }

  const selectedService = services.find(s => s.id === bookingData.service_id)

  // Generate available dates (next 30 days, excluding Sundays)
  const availableDates = Array.from({ length: 30 }, (_, i) => {
    const date = addDays(startOfDay(new Date()), i + 1)
    return date.getDay() !== 0 ? date : null // Exclude Sundays
  }).filter(Boolean) as Date[]

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-cyan/10 via-white to-primary-orange/10 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary-cyan animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-cyan/10 via-white to-primary-orange/10 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {['Service', 'Options', 'Date', 'Adresse', 'Confirmation'].map((label, index) => (
              <div key={label} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                  step > index + 1
                    ? 'bg-green-500 text-white'
                    : step === index + 1
                    ? 'bg-primary-cyan text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > index + 1 ? <Check className="w-5 h-5" /> : index + 1}
                </div>
                {index < 4 && (
                  <div className={`w-12 h-1 mx-2 transition-colors ${
                    step > index + 1 ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            {['Service', 'Options', 'Date', 'Adresse', 'Confirmation'].map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Step 1: Sélection du service */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Choisissez votre service</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceSelect(service.id)}
                    className="text-left p-6 border-2 border-gray-200 rounded-xl hover:border-primary-cyan hover:shadow-lg transition-all"
                  >
                    <div className="text-4xl mb-3">{service.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                    <p className="text-xl font-bold text-primary-cyan">
                      À partir de {service.base_price}€
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Sélection des options */}
          {step === 2 && selectedService && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Options pour {selectedService.name}</h2>
                <p className="text-gray-600">Prix de base : {selectedService.base_price}€</p>
              </div>

              <div className="space-y-3">
                {selectedService.service_options.map((option) => {
                  const isSelected = bookingData.selected_options.some(o => o.id === option.id)
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleOptionToggle(option)}
                      className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                        isSelected
                          ? 'border-primary-cyan bg-primary-cyan/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{option.name}</h4>
                            {option.is_required && (
                              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                                Obligatoire
                              </span>
                            )}
                          </div>
                          {option.description && (
                            <p className="text-sm text-gray-600">{option.description}</p>
                          )}
                        </div>
                        <div className="text-right ml-4">
                          <p className={`font-semibold ${
                            option.price_modifier >= 0 ? 'text-primary-orange' : 'text-green-600'
                          }`}>
                            {option.price_modifier >= 0 ? '+' : ''}{option.price_modifier}€
                          </p>
                        </div>
                      </div>
                      <div className={`mt-3 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-primary-cyan bg-primary-cyan' : 'border-gray-300'
                      }`}>
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="bg-primary-cyan/10 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Prix estimé</span>
                  <span className="text-2xl font-bold text-primary-cyan">{calculatePrice()}€</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Sélection de la date */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Choisissez la date</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Date d&apos;intervention
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {availableDates.slice(0, 12).map((date) => {
                    const dateStr = format(date, 'yyyy-MM-dd')
                    const isSelected = bookingData.scheduled_date === dateStr
                    
                    return (
                      <button
                        key={dateStr}
                        onClick={() => setBookingData({ ...bookingData, scheduled_date: dateStr })}
                        className={`p-3 rounded-lg text-center transition-all ${
                          isSelected
                            ? 'bg-primary-cyan text-white shadow-lg'
                            : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                        }`}
                      >
                        <div className="text-xs font-medium">
                          {format(date, 'EEE', { locale: fr })}
                        </div>
                        <div className="text-lg font-bold">
                          {format(date, 'd', { locale: fr })}
                        </div>
                        <div className="text-xs">
                          {format(date, 'MMM', { locale: fr })}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Créneau horaire
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setBookingData({ ...bookingData, scheduled_time_slot: 'morning' })}
                    className={`p-4 rounded-xl text-center transition-all ${
                      bookingData.scheduled_time_slot === 'morning'
                        ? 'bg-primary-cyan text-white shadow-lg'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="text-lg font-semibold mb-1">Matin</div>
                    <div className="text-sm opacity-80">8h00 - 12h00</div>
                  </button>
                  <button
                    onClick={() => setBookingData({ ...bookingData, scheduled_time_slot: 'afternoon' })}
                    className={`p-4 rounded-xl text-center transition-all ${
                      bookingData.scheduled_time_slot === 'afternoon'
                        ? 'bg-primary-cyan text-white shadow-lg'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="text-lg font-semibold mb-1">Après-midi</div>
                    <div className="text-sm opacity-80">14h00 - 18h00</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Adresse */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-primary-cyan" />
                Adresse d&apos;intervention
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse complète *
                  </label>
                  <input
                    type="text"
                    value={bookingData.address}
                    onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-cyan focus:border-transparent"
                    placeholder="12 Rue de la République"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Code postal *
                    </label>
                    <input
                      type="text"
                      value={bookingData.postal_code}
                      onChange={(e) => setBookingData({ ...bookingData, postal_code: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-cyan focus:border-transparent"
                      placeholder="75001"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ville *
                    </label>
                    <input
                      type="text"
                      value={bookingData.city}
                      onChange={(e) => setBookingData({ ...bookingData, city: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-cyan focus:border-transparent"
                      placeholder="Paris"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Code d&apos;accès
                    </label>
                    <input
                      type="text"
                      value={bookingData.access_code || ''}
                      onChange={(e) => setBookingData({ ...bookingData, access_code: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-cyan focus:border-transparent"
                      placeholder="A1234"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Étage
                    </label>
                    <input
                      type="text"
                      value={bookingData.floor || ''}
                      onChange={(e) => setBookingData({ ...bookingData, floor: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-cyan focus:border-transparent"
                      placeholder="3ème"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FileText className="w-4 h-4 inline mr-2" />
                    Informations complémentaires
                  </label>
                  <textarea
                    value={bookingData.special_notes || ''}
                    onChange={(e) => setBookingData({ ...bookingData, special_notes: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-cyan focus:border-transparent"
                    placeholder="Instructions particulières, précisions sur l'accès, etc."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Confirmation */}
          {step === 5 && selectedService && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Récapitulatif de votre réservation</h2>
              
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Service</h3>
                  <p className="text-gray-700">{selectedService.name}</p>
                  <p className="text-sm text-gray-600 mt-1">{selectedService.base_price}€</p>
                </div>

                {bookingData.selected_options.length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Options sélectionnées</h3>
                    <ul className="space-y-1">
                      {bookingData.selected_options.map((option) => (
                        <li key={option.id} className="text-sm text-gray-700 flex justify-between">
                          <span>{option.name}</span>
                          <span className={option.price_modifier >= 0 ? 'text-primary-orange' : 'text-green-600'}>
                            {option.price_modifier >= 0 ? '+' : ''}{option.price_modifier}€
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Date et heure</h3>
                  <p className="text-gray-700">
                    {bookingData.scheduled_date && format(new Date(bookingData.scheduled_date), 'EEEE d MMMM yyyy', { locale: fr })}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {bookingData.scheduled_time_slot === 'morning' ? 'Matin (8h00 - 12h00)' : 'Après-midi (14h00 - 18h00)'}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Adresse</h3>
                  <p className="text-gray-700">{bookingData.address}</p>
                  <p className="text-gray-700">{bookingData.postal_code} {bookingData.city}</p>
                  {bookingData.floor && <p className="text-sm text-gray-600 mt-1">Étage : {bookingData.floor}</p>}
                  {bookingData.access_code && <p className="text-sm text-gray-600">Code : {bookingData.access_code}</p>}
                </div>

                {bookingData.special_notes && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Informations complémentaires</h3>
                    <p className="text-sm text-gray-700">{bookingData.special_notes}</p>
                  </div>
                )}

                <div className="bg-primary-cyan/10 rounded-xl p-6 border-2 border-primary-cyan">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold text-gray-900">Prix total</span>
                    <span className="text-3xl font-bold text-primary-cyan">{bookingData.estimated_price}€</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            {step > 1 && (
              <button
                onClick={handlePreviousStep}
                disabled={submitting}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                Retour
              </button>
            )}
            
            <div className="ml-auto">
              {step < 5 ? (
                <button
                  onClick={handleNextStep}
                  className="px-8 py-3 bg-primary-cyan hover:bg-primary-cyan/90 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                >
                  Continuer
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Confirmation...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      Confirmer la réservation
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
