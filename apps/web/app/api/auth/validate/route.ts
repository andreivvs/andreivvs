import { NextRequest, NextResponse } from 'next/server'
import { isInitDataValid, userFromInitData, tokenForUser } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const initData = body.initData

    if (!initData || !isInitDataValid(initData)) {
      return NextResponse.json({ error: 'invalid initData' }, { status: 401 })
    }

    const user = await userFromInitData(initData)
    if (!user) {
      return NextResponse.json({ error: 'no user' }, { status: 401 })
    }

    // Приведение user к типу, который ожидает tokenForUser
    const token = tokenForUser({ id: user.id.toString(), role: user.role })

    return NextResponse.json({ token })
  } catch (err) {
    console.error('Error in /api/auth/validate:', err)
    return NextResponse.json({ error: 'internal server error' }, { status: 500 })
  }
}
