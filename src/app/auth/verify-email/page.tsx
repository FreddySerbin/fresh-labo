'use client'

import Link from 'next/link'
import { Mail, ArrowLeft, RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function VerifyEmailPage() {
  const [isResending, setIsResending] = useState(false)

  const handleResend = async () => {
    setIsResending(true)
    // TODO: Implémenter la logique de renvoi d'email
    setTimeout(() => {
      toast.success('Email de confirmation renvoyé !')
      setIsResending(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-cyan/10 via-white to-primary-orange/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Icône */}
          <div className="flex justify-center">
            <div className="bg-primary-cyan/10 rounded-full p-6">
              <Mail className="w-16 h-16 text-primary-cyan" />
            </div>
          </div>

          {/* Titre */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Vérifiez votre email
            </h1>
            <p className="text-gray-600">
              Nous avons envoyé un email de confirmation à votre adresse.
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
            <h3 className="font-semibold text-blue-900 text-sm">
              Prochaines étapes :
            </h3>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>Ouvrez votre boîte de réception</li>
              <li>Trouvez l&apos;email de Fresh Lab&apos;O</li>
              <li>Cliquez sur le lien de confirmation</li>
              <li>Vous serez automatiquement connecté</li>
            </ol>
          </div>

          {/* Bouton renvoyer */}
          <button
            onClick={handleResend}
            disabled={isResending}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <RefreshCw className={`w-5 h-5 ${isResending ? 'animate-spin' : ''}`} />
            {isResending ? 'Envoi en cours...' : 'Renvoyer l\'email'}
          </button>

          {/* Lien retour */}
          <div className="text-center">
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 text-primary-cyan hover:text-primary-cyan/80 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à la connexion
            </Link>
          </div>

          {/* Note */}
          <div className="text-center text-xs text-gray-500 border-t pt-4">
            <p>Vous ne trouvez pas l&apos;email ?</p>
            <p>Vérifiez vos spams ou cliquez sur &quot;Renvoyer l&apos;email&quot;</p>
          </div>
        </div>
      </div>
    </div>
  )
}
