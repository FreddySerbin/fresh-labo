'use client'

import { Toaster } from 'sonner'

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      expand={true}
      richColors
      closeButton
      toastOptions={{
        duration: 4000,
        style: {
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '14px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        },
        className: 'font-inter',
      }}
    />
  )
}
