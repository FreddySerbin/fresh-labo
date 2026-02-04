'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Phone, MessageCircle, X } from 'lucide-react'
import Link from 'next/link'

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-6 right-6 z-50"
        >
          {isExpanded ? (
            // Expanded menu
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-dark-navy border-2 border-primary-cyan/50 rounded-2xl shadow-2xl shadow-primary-cyan/20 p-4 space-y-3"
            >
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <Link
                href="/booking"
                className="flex items-center gap-3 px-6 py-3 bg-primary-cyan hover:bg-primary-cyan/90 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
              >
                <Calendar className="w-5 h-5" />
                Réserver
              </Link>

              <a
                href="tel:0695057796"
                className="flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/30 transition-all whitespace-nowrap"
              >
                <Phone className="w-5 h-5" />
                Appeler
              </a>

              <a
                href="https://wa.me/33695057796"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all whitespace-nowrap"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
            </motion.div>
          ) : (
            // Collapsed button
            <motion.button
              onClick={() => setIsExpanded(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-16 h-16 bg-primary-cyan hover:bg-primary-cyan/90 rounded-full shadow-2xl shadow-primary-cyan/30 flex items-center justify-center text-white group"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Calendar className="w-8 h-8" />
              </motion.div>
              
              {/* Pulse effect */}
              <span className="absolute inset-0 rounded-full bg-primary-cyan/50 animate-ping" />
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
