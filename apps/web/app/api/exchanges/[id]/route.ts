import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// @ts-expect-error - Next.js не принимает типизацию params, но мы уверены в структуре
export async function POST(req: NextRequest, { params }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Missing exchange ID' }, { status: 400 });
  }

  let exchangeId: bigint;
  try {
    exchangeId = BigInt(id);
  } catch {
    return NextResponse.json({ error: 'Invalid exchange ID format' }, { status: 400 });
  }

  const body = await req.json();
  const { action } = body;

  if (action !== 'APPROVE' && action !== 'REJECT') {
    return NextResponse.json(
      { error: 'Invalid action. Must be "APPROVE" or "REJECT"' },
      { status: 400 }
    );
  }

  const exchange = await prisma.exchange.findUnique({
    where: { id: exchangeId },
  });

  if (!exchange) {
    return NextResponse.json({ error: 'Exchange not found' }, { status: 404 });
  }

  const updatedExchange = await prisma.exchange.update({
    where: { id: exchangeId },
    data: { status: action === 'APPROVE' ? 'APPROVED' : 'REJECTED' },
  });

  return NextResponse.json(updatedExchange);
}
