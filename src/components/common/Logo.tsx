'use client'

import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  width?: number
  height?: number
  className?: string
  href?: string
  showText?: boolean
  textSuffix?: string
}

export function Logo({ 
  width = 160, 
  height = 53, 
  className = 'h-10 w-auto',
  href = '/',
  showText = false,
  textSuffix
}: LogoProps) {
  const logoElement = (
    <div className="flex items-center gap-3">
      <Image
        src="/logo.png"
        alt="Fresh Lab'O"
        width={width}
        height={height}
        priority
        className={className}
      />
      {showText && textSuffix && (
        <span className="text-sm font-semibold text-primary-orange bg-primary-orange/10 px-3 py-1 rounded-full">
          {textSuffix}
        </span>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="flex items-center">
        {logoElement}
      </Link>
    )
  }

  return logoElement
}
