import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, context: any) {
  const { id } = context.params;
  const propertyId = Number(id);

  if (Number.isNaN(propertyId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const slots = await prisma.calendarSlot.findMany({
    where: { propertyId },
    orderBy: { startDate: "asc" },
    select: {
      id: true,
      startDate: true,
      endDate: true,
      type: true,
      priority: true,
    },
  });

  return NextResponse.json(slots);
}
