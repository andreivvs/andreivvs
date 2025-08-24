import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, context: any) {
  const { id } = context.params;
  const propertyId = Number(id);

  if (Number.isNaN(propertyId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const property = await prisma.property.findUnique({
    where: { id: propertyId },
    include: { slots: true, shares: true },
  });

  return NextResponse.json(property);
}

export async function POST(req: NextRequest, context: any) {
  const { id } = context.params;
  const propertyId = Number(id);

  if (Number.isNaN(propertyId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const data = await req.json();

  const updated = await prisma.property.update({
    where: { id: propertyId },
    data,
  });

  return NextResponse.json(updated);
}
