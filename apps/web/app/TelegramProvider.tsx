'use client';

import { useEffect } from 'react';
import { init, isTMA, mockTelegramEnv } from '@telegram-apps/sdk';

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Если не в Telegram — эмулируем окружение
    if (!isTMA('simple')) {
      console.warn('Запуск не в Telegram. Используется мок-окружение.');

      mockTelegramEnv({
        initData: {
          user: {
            id: 123456789,
            firstName: 'Test',
            lastName: 'User',
            username: 'testuser',
            languageCode: 'en',
            isPremium: false,
            allowsWriteToPm: true,
          },
          hash: 'test-hash-fake-1234567890abcdef',
          authDate: Math.floor(Date.now() / 1000),
        },
        themeParams: {
          bgColor: '#17212b',
          textColor: '#f5f5f5',
        },
        version: '7.2',
        platform: 'web',
      });
    }

    // Инициализируем SDK
    init();
  }, []);

  return <>{children}</>;
}
