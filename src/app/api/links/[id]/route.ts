import { NextResponse } from 'next/server';
import { prisma } from '@/db';
import { getCurrentSession } from '@/auth';

type RouteParams = {
  id: string;
};

export async function DELETE(request: Request, { params }: { params: RouteParams }) {
  const session = await getCurrentSession();
  if (!session) return;

  await prisma.link.delete({ where: { id: params.id } });

  return new NextResponse(null, { status: 204 });
}
