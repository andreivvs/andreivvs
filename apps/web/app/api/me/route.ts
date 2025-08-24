import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { createHmac } from 'crypto';

// Парсим initData как URL-параметры
function parseInitData(initData: string) {
  const params = new URLSearchParams(initData);
  const data: Record<string, string> = {};
  for (const [key, value] of params) {
    if (key !== 'hash') {
      data[key] = value;
    }
  }
  return { data, hash: params.get('hash') };
}

// Проверяем хеш
function validateTelegramAuth(initData: string, botToken: string): Record<string, string> | null {
  const { data, hash } = parseInitData(initData);
  if (!hash) return null;

  const dataCheckString = Object.keys(data)
    .sort()
    .map((key) => `${key}=${data[key]}`)
    .join('\n');

  const secretKey = createHmac('sha256', 'WebAppData')
    .update(botToken)
    .digest();

  const calculatedHash = createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');

  if (calculatedHash !== hash) return null;

  // Проверяем, что auth_date не старше 24 часов
  const authDate = parseInt(data.auth_date);
  const now = Math.floor(Date.now() / 1000);
  if (now - authDate > 86400) return null;

  return data;
}

export async function POST(req: Request) {
  const body = await req.json();
  const { initData } = body;

  if (!initData) {
    return NextResponse.json({ error: 'initData required' }, { status: 400 });
  }

  const BOT_TOKEN = process.env.BOT_TOKEN;
  if (!BOT_TOKEN) {
    console.error('BOT_TOKEN is not set');
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }

  const userData = validateTelegramAuth(initData, BOT_TOKEN);
  if (!userData) {
    return NextResponse.json({ error: 'Invalid or expired initData' }, { status: 401 });
  }

  // Извлекаем данные пользователя
  const tgId = userData.id;
  const username = userData.username || null;
  const firstName = userData.first_name || null;
  const lastName = userData.last_name || null;

  let user = await prisma.user.findUnique({
    where: { telegramId: BigInt(tgId) },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        telegramId: BigInt(tgId),
        username,
        firstName,
        lastName,
        role: 'OWNER',
      },
    });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
  return NextResponse.json({ token, user: { id: user.id, username, firstName, lastName } });
}
