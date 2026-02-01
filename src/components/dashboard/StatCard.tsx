'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { AnimatedCounter } from '@/components/common/AnimatedCounter'
import { ReactNode } from 'react'

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: number
  suffix?: string
  prefix?: string
  color: 'cyan' | 'orange' | 'green' | 'gray' | 'blue' | 'purple'
  trend?: {
    value: number
    isPositive: boolean
  }
  delay?: number
  subtext?: string
}

const colorClasses = {
  cyan: {
    bg: 'bg-primary-cyan/10',
    icon: 'text-primary-cyan',
    text: 'text-primary-cyan',
    border: 'border-primary-cyan/20',
  },
  orange: {
    bg: 'bg-primary-orange/10',
    icon: 'text-primary-orange',
    text: 'text-primary-orange',
    border: 'border-primary-orange/20',
  },
  green: {
    bg: 'bg-green-100',
    icon: 'text-green-600',
    text: 'text-green-600',
    border: 'border-green-200',
  },
  gray: {
    bg: 'bg-gray-100',
    icon: 'text-gray-600',
    text: 'text-gray-900',
    border: 'border-gray-200',
  },
  blue: {
    bg: 'bg-blue-100',
    icon: 'text-blue-600',
    text: 'text-blue-600',
    border: 'border-blue-200',
  },
  purple: {
    bg: 'bg-purple-100',
    icon: 'text-purple-600',
    text: 'text-purple-600',
    border: 'border-purple-200',
  },
}

export function StatCard({
  icon: Icon,
  label,
  value,
  suffix = '',
  prefix = '',
  color,
  trend,
  delay = 0,
  subtext,
}: StatCardProps) {
  const colors = colorClasses[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className={`
        relative overflow-hidden
        bg-white rounded-xl shadow-lg 
        border-2 ${colors.border}
        p-6 
        hover:shadow-xl transition-shadow
      `}
    >
      {/* Background decoration */}
      <div className={`absolute top-0 right-0 w-32 h-32 ${colors.bg} rounded-full -mr-16 -mt-16 opacity-50`} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`${colors.bg} p-3 rounded-xl`}>
            <Icon className={`w-6 h-6 ${colors.icon}`} />
          </div>
          
          {trend && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.2 }}
              className={`
                flex items-center gap-1 text-sm font-semibold
                ${trend.isPositive ? 'text-green-600' : 'text-red-600'}
              `}
            >
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </motion.div>
          )}
        </div>

        <p className="text-sm text-gray-600 mb-2">{label}</p>
        
        <div className={`text-3xl font-bold ${colors.text}`}>
          <AnimatedCounter
            value={value}
            duration={1.5}
            prefix={prefix}
            suffix={suffix}
          />
        </div>

        {subtext && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.3 }}
            className="text-xs text-gray-500 mt-2"
          >
            {subtext}
          </motion.p>
        )}
      </div>

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
        whileHover={{
          opacity: [0, 0.1, 0],
          x: ['-100%', '100%'],
        }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  )
}
