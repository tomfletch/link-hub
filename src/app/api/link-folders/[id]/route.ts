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
  await deleteFolderRecursively(params.id);
  return new NextResponse(null, { status: 204 });
}

async function deleteFolderRecursively(folderId: string) {
  const childFolders = await prisma.linkFolder.findMany({
    where: {
      parentLinkFolderId: folderId
    }
  });

  for (const childFolder of childFolders) {
    await deleteFolderRecursively(childFolder.id);
  }

  await prisma.linkFolder.delete({
    where: { id: folderId }
  });
}
