import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { Prisma } from '@prisma/client'  

export async function GET(req: NextRequest) {
  const user = await requireAuth(req)
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const bookings = await prisma.booking.findMany({
    where: { share: { ownerId: user.id } },
    include: { slot: true, share: { include: { property: true } } },
    orderBy: { requestedAt: 'desc' } // Убедись, что поле requestedAt есть в Booking
  })

  return NextResponse.json(bookings)
}

export async function POST(req: NextRequest) {
  const user = await requireAuth(req)
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { slotId, propertyId } = await req.json()

  // find user's share for this property
  const share = await prisma.share.findFirst({ where: { ownerId: user.id, propertyId } })
  if (!share) return NextResponse.json({ error: 'no share for property' }, { status: 403 })

  // check slot availability
  const slot = await prisma.calendarSlot.findUnique({ where: { id: slotId } })
  if (!slot || slot.propertyId !== propertyId) return NextResponse.json({ error: 'slot not found' }, { status: 404 })
  if (slot.type !== 'AVAILABLE') return NextResponse.json({ error: 'slot not available' }, { status: 409 })

  // create booking and mark slot
  const booking = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const b = await tx.booking.create({
      data: { 
        shareId: share.id, 
        slotId: slot.id, 
        userId: user.id,       // <-- добавлено userId
        status: 'PENDING' 
      }
    })

    await tx.calendarSlot.update({ 
      where: { id: slot.id }, 
      data: { type: 'BOOKED' } 
    })

    return b
  })

  return NextResponse.json(booking, { status: 201 })
}
