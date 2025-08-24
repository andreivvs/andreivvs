import crypto from 'crypto'
import { prisma } from './prisma'
import { sign, verify } from './jwt'
import { NextRequest } from 'next/server'

const BOT_TOKEN = process.env.BOT_TOKEN!

export function isInitDataValid(initData: string) {
  const url = new URLSearchParams(initData)
  const hash = url.get('hash') || ''
  url.delete('hash')
  const dataCheckString = [...url.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join('\n')
  const secret = crypto.createHmac('sha256', 'WebAppData').update(BOT_TOKEN).digest()
  const calc = crypto.createHmac('sha256', secret).update(dataCheckString).digest('hex')
  return calc === hash
}

// Получаем или создаём пользователя в базе
export async function userFromInitData(initData: string) {
  const url = new URLSearchParams(initData)
  const userStr = url.get('user')
  if (!userStr) return null
  const user = JSON.parse(userStr)
  const tgId = BigInt(user.id)
  const dbUser = await prisma.user.upsert({
    where: { telegramId: tgId },
    update: {
      username: user.username || null,
      firstName: user.first_name || null,
      lastName: user.last_name || null
    },
    create: {
      telegramId: tgId,
      username: user.username || null,
      firstName: user.first_name || null,
      lastName: user.last_name || null,
      role: 'OWNER' // по умолчанию
    }
  })
  return dbUser
}

// Проверка авторизации через JWT
export async function requireAuth(req: NextRequest) {
  const header = req.headers.get('authorization') || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return null
  try {
    const payload = verify<{ uid: string; role: string }>(token)
    const user = await prisma.user.findUnique({ where: { id: Number(payload.uid) } })
    return user
  } catch {
    return null
  }
}

// Генерация токена для пользователя
export function tokenForUser(user: { id: string; role: string }): string {
  return sign({ uid: user.id, role: user.role }, '30m')
}
