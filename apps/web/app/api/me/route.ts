import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

// Проверка токена
function verifyToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  const { initData } = await req.json();

  if (!initData) return NextResponse.json({ error: 'initData required' }, { status: 400 });

  let tgData;
  try {
    tgData = JSON.parse(Buffer.from(initData, 'base64').toString('utf-8'));
  } catch {
    return NextResponse.json({ error: 'Invalid initData' }, { status: 400 });
  }

  let user = await prisma.user.findUnique({ where: { telegramId: BigInt(tgData.id) } });
  if (!user) {
    user = await prisma.user.create({
   {
    telegramId: BigInt(tgData.id),
    username: tgData.username ?? null,
    firstName: tgData.first_name ?? null,
    lastName: tgData.last_name ?? null,
  },
});
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
  return NextResponse.json({ token });
}

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization') || '';
  const token = authHeader.replace('Bearer ', '');
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const payload = verifyToken(token);
  if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    include: { shares: { include: { bookings: true } } },
  });

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const result = {
    id: user.id,
    telegramId: user.telegramId.toString(),
    username: user.username ?? null,
    firstName: user.firstName ?? null,
    lastName: user.lastName ?? null,
    role: user.role,
    shares: user.shares.map(s => ({
      id: s.id,
      propertyId: s.propertyId,
      fraction: s.fraction ?? null,
      bookings: s.bookings.map(b => ({
        id: b.id,
        slotId: b.slotId,
        status: b.status,
        requestedAt: b.requestedAt.toISOString(),
      })),
    })),
  };

  return NextResponse.json(result);
}
