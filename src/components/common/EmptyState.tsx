'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ReactNode } from 'react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
    icon?: LucideIcon
  }
  illustration?: ReactNode
}

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action,
  illustration 
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-2xl mx-auto"
    >
      {illustration ? (
        <div className="mb-6">{illustration}</div>
      ) : (
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
          className="inline-block mb-6"
        >
          <div className="bg-gradient-to-br from-primary-cyan/10 to-primary-orange/10 p-6 rounded-full">
            <Icon className="w-16 h-16 text-gray-300" />
          </div>
        </motion.div>
      )}

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-semibold text-gray-900 mb-3"
      >
        {title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 mb-8 max-w-md mx-auto"
      >
        {description}
      </motion.p>

      {action && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            variant="primary"
            onClick={action.onClick}
            className="inline-flex items-center gap-2"
          >
            {action.icon && <action.icon className="w-5 h-5" />}
            {action.label}
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}
