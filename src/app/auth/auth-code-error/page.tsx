'use client'

import Link from 'next/link'
import { AlertTriangle, ArrowLeft, Mail } from 'lucide-react'

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Icône */}
          <div className="flex justify-center">
            <div className="bg-red-100 rounded-full p-6">
              <AlertTriangle className="w-16 h-16 text-red-600" />
            </div>
          </div>

          {/* Titre */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Erreur de Vérification
            </h1>
            <p className="text-gray-600">
              Le lien de confirmation a expiré ou est invalide.
            </p>
          </div>

          {/* Solutions */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-2">
            <h3 className="font-semibold text-amber-900 text-sm">
              Que faire ?
            </h3>
            <ul className="text-sm text-amber-800 space-y-1 list-disc list-inside">
              <li>Demandez un nouveau lien de confirmation</li>
              <li>Vérifiez que le lien n&apos;a pas été coupé</li>
              <li>Assurez-vous d&apos;utiliser le dernier email reçu</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              href="/auth/verify-email"
              className="w-full bg-primary-cyan hover:bg-primary-cyan/90 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Demander un nouveau lien
            </Link>

            <Link
              href="/auth/login"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à la connexion
            </Link>
          </div>

          {/* Support */}
          <div className="text-center text-xs text-gray-500 border-t pt-4">
            <p>Besoin d&apos;aide ?</p>
            <Link href="/contact" className="text-primary-cyan hover:underline">
              Contactez notre support
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
