import { NextResponse } from 'next/server';
import { prisma } from '@/db';
import { getCurrentSession } from '@/auth';

type RouteParams = {
  id: string;
};

type NewLink = {
  url: string;
  name: string;
};

export async function POST(request: Request, { params }: { params: RouteParams }) {
  const linkInput = (await request.json()) as NewLink;
  const session = await getCurrentSession();
  if (!session) return;

  const newLink = await prisma.link.create({
    data: {
      url: linkInput.url,
      name: linkInput.name,
      linkFolderId: params.id,
      addedById: session.user.id,
    }
  })

  return NextResponse.json(newLink, { status: 201 });
}
