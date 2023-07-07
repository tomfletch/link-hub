import { NextResponse } from 'next/server';
import { prisma } from '@/db';
import { getCurrentSession } from '@/auth';

type NewLinkFolder = {
  name: string;
  parentId: string;
};

export async function POST(request: Request) {
  const newFolderInput = (await request.json()) as NewLinkFolder;
  console.log(newFolderInput)
  const session = await getCurrentSession();
  if (!session) return;

  const newLinkFolder = await prisma.linkFolder.create({
    data: {
      name: newFolderInput.name,
      parentLinkFolderId: newFolderInput.parentId,
      userId: session.user.id,
    }
  });

  return NextResponse.json(newLinkFolder, { status: 201 });
}
