'use client';

import { useEffect } from 'react';
import { init, isTMA, mockTelegramEnv } from '@telegram-apps/sdk';

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Проверяем, запущено ли приложение в Telegram
    if (!isTMA('simple')) {
      console.warn('Not in Telegram — using mock environment');

      // Эмулируем окружение для разработки
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
          accentTextColor: '#6ab2f2',
          bgColor: '#17212b',
          buttonColor: '#5288c1',
          buttonTextColor: '#ffffff',
          destructiveTextColor: '#ec3942',
          headerBgColor: '#17212b',
          hintColor: '#708499',
          linkColor: '#6ab3f3',
          secondaryBgColor: '#232e3c',
          sectionBgColor: '#17212b',
          sectionHeaderTextColor: '#6ab3f3',
          subtitleTextColor: '#708499',
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
