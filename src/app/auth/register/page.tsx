'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { toast } from 'sonner'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const { signUp } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères')
      return
    }

    if (!formData.phone.match(/^0[1-9][0-9]{8}$/)) {
      toast.error('Numéro de téléphone invalide (ex: 0612345678)')
      return
    }

    setLoading(true)

    try {
      await signUp(formData.email, formData.password, {
        full_name: formData.full_name,
        phone: formData.phone,
      })
      router.push('/auth/login')
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de l\'inscription')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-display-small text-dark-blue font-poppins font-bold mb-2">
            Créer un compte
          </h1>
          <p className="text-body text-gray-600">
            Rejoignez Fresh Lab'O et gérez vos réservations
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="full_name" className="block text-body font-medium text-gray-700 mb-2">
              Nom complet *
            </label>
            <input
              type="text"
              id="full_name"
              required
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-cyan focus:border-transparent transition-all"
              placeholder="Jean Dupont"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-body font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-cyan focus:border-transparent transition-all"
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-body font-medium text-gray-700 mb-2">
              Téléphone *
            </label>
            <input
              type="tel"
              id="phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-cyan focus:border-transparent transition-all"
              placeholder="0612345678"
            />
            <p className="mt-1 text-body-small text-gray-500">Format : 10 chiffres sans espaces</p>
          </div>

          <div>
            <label htmlFor="password" className="block text-body font-medium text-gray-700 mb-2">
              Mot de passe *
            </label>
            <input
              type="password"
              id="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-cyan focus:border-transparent transition-all"
              placeholder="••••••••"
            />
            <p className="mt-1 text-body-small text-gray-500">Minimum 6 caractères</p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-body font-medium text-gray-700 mb-2">
              Confirmer le mot de passe *
            </label>
            <input
              type="password"
              id="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-cyan focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              required
              className="w-4 h-4 text-primary-cyan border-gray-300 rounded focus:ring-primary-cyan mt-1"
            />
            <label className="ml-2 text-body-small text-gray-600">
              J'accepte les{' '}
              <Link href="/legal/cgv" className="text-primary-cyan hover:text-primary-orange">
                conditions générales de vente
              </Link>{' '}
              et la{' '}
              <Link href="/legal/privacy" className="text-primary-cyan hover:text-primary-orange">
                politique de confidentialité
              </Link>
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={loading}
          >
            {loading ? 'Création du compte...' : 'Créer mon compte'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-body-small text-gray-600">
            Déjà un compte ?{' '}
            <Link
              href="/auth/login"
              className="text-primary-cyan hover:text-primary-orange font-semibold transition-colors"
            >
              Se connecter
            </Link>
          </p>
        </div>

        <div className="mt-6">
          <Link
            href="/"
            className="text-body-small text-gray-600 hover:text-primary-cyan transition-colors flex items-center justify-center"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  )
}
