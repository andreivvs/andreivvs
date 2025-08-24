'use client'

import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

type Me = {
  id: number;
  telegramId: string;
  username?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  role: 'OWNER' | 'ADMIN';
};

async function validateAndGetToken(): Promise<string | null> {
  const initData = (window as any)?.Telegram?.WebApp?.initData;
  if (!initData) return null;

  const res = await fetch('/api/me', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ initData }),
  });

  if (!res.ok) return null;

  const data = await res.json();
  localStorage.setItem('token', data.token);
  return data.token;
}

async function fetchJSON<T>(url: string): Promise<T> {
  const token = localStorage.getItem('token') ?? '';
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error('request failed');
  return res.json();
}

export default function Page() {
  const [tokenReady, setTokenReady] = useState(false);
  
 
  useEffect(() => {
    validateAndGetToken().then(() => setTokenReady(true));
  }, []);

  const meQuery = useQuery({
    queryKey: ['me', tokenReady],
    queryFn: () => fetchJSON<Me>('/api/me'),
    enabled: tokenReady,
  });

  if (!tokenReady) return <div className='p-4'>Инициализация…</div>;
  if (meQuery.isLoading) return <div className='p-4'>Загрузка…</div>;
  if (meQuery.isError) return <div className='p-4'>Ошибка авторизации</div>;

  const me = meQuery.data!;
  return (
    <main className='p-4 space-y-4'>
      <h1 className='text-2xl font-semibold'>Здравствуйте, {me.firstName ?? me.username ?? 'владелец'} ✨</h1>
      <p className='text-sm opacity-80'>Ваш Telegram ID: {me.telegramId}</p>
    </main>
  );
}
