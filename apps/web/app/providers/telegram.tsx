'use client'
import { useEffect } from 'react'
import { init } from '@telegram-apps/sdk'

// Расширяем глобальный тип Window
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initData?: Record<string, any>
        expand?: () => void
        BackButton?: { show?: () => void }
      }
    }
  }
}

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Инициализация Telegram SDK
    init()

    // Получение launch params напрямую
    const launchParams = window.Telegram?.WebApp?.initData || {}
    console.log('Telegram launch params:', launchParams)

    // Expand to full height и показать back button
    window.Telegram?.WebApp?.expand?.()
    window.Telegram?.WebApp?.BackButton?.show?.()
  }, [])

  return <>{children}</>
}

