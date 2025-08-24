export const metadata = { title: 'Bayhan Mini‑App', description: 'Telegram WebApp' }
import './globals.css'
import { TelegramProvider } from './providers/telegram'
import { QueryClientProviderWrapper } from './providers/query-client-provider'
import React from 'react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <QueryClientProviderWrapper>
          <TelegramProvider>{children}</TelegramProvider>
        </QueryClientProviderWrapper>
      </body>
    </html>
  )
}