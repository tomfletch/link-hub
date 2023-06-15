import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/auth';
import { prisma } from '@/db';

type RouteParams = {
  id: string;
};

export async function GET(request: Request, { params }: { params: RouteParams }) {
  const session = await getCurrentSession();

  const linkFolder = await prisma.linkFolder.findUnique({
    where: { id: params.id },
    include: { links: true }
  });

  return NextResponse.json(linkFolder);
}
