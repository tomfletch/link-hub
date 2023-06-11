import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/auth';
import { prisma } from '@/db';

export async function GET() {
  const session = await getCurrentSession();

  const linkFolders = await prisma.linkFolder.findMany({
    where: { userId: session?.user.id }
  });

  return NextResponse.json(linkFolders);
}
