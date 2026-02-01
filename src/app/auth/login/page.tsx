'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { toast } from 'sonner'
import Link from 'next/link'

export default function LoginPage() {
  const { signIn } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await signIn(formData.email, formData.password)
    } catch (error: any) {
      toast.error(error.message || 'Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-display-small text-dark-blue font-poppins font-bold mb-2">
            Connexion
          </h1>
          <p className="text-body text-gray-600">
            Accédez à votre espace Fresh Lab'O
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-body font-medium text-gray-700 mb-2">
              Email
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
            <label htmlFor="password" className="block text-body font-medium text-gray-700 mb-2">
              Mot de passe
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
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-primary-cyan border-gray-300 rounded focus:ring-primary-cyan"
              />
              <span className="ml-2 text-body-small text-gray-600">Se souvenir de moi</span>
            </label>
            <Link
              href="/auth/reset-password"
              className="text-body-small text-primary-cyan hover:text-primary-orange transition-colors"
            >
              Mot de passe oublié ?
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={loading}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-body-small text-gray-600">
            Pas encore de compte ?{' '}
            <Link
              href="/auth/register"
              className="text-primary-cyan hover:text-primary-orange font-semibold transition-colors"
            >
              S'inscrire
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
