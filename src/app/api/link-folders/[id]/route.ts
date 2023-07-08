import { NextResponse } from 'next/server';
import { prisma } from '@/db';

type RouteParams = {
  id: string;
};

export async function GET(request: Request, { params }: { params: RouteParams }) {
  const linkFolder = await prisma.linkFolder.findUnique({
    where: { id: params.id },
    include: { links: true, childLinkFolders: true }
  });

  return NextResponse.json(linkFolder);
}

export async function DELETE(request: Request, { params }: { params: RouteParams }) {
  await prisma.linkFolder.delete({
    where: { id: params.id }
  });

  return new NextResponse(null, { status: 204 });
}
