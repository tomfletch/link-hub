import { authOptions } from '@/auth';
import { prisma } from '@/db';
import { LinkFolder } from '@prisma/client';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import styles from './LinkFolders.module.css';

type LinkFoldersListProps = {
  parentLinkFolderId: string | null;
  linkFolders: LinkFolder[];
  currentFolderId?: string;
  depth?: number;
}

function LinkFoldersList({ parentLinkFolderId, linkFolders, currentFolderId, depth = 0 }: LinkFoldersListProps) {
  const thisLinkFolders = linkFolders.filter((f) => f.parentLinkFolderId === parentLinkFolderId);

  if (thisLinkFolders.length === 0) return null;

  return (
    <ul className={styles.linkFoldersList}>
      {thisLinkFolders.map((linkFolder) => (
        <li key={linkFolder.id}>
          <Link
            href={`/folders/${linkFolder.id}`}
            className={`${styles.linkFolderLink} ${currentFolderId === linkFolder.id ? styles.active : ''}`}
            style={{ paddingLeft: `${depth+1}rem`}}
          >
            {linkFolder.name}
          </Link>
          <LinkFoldersList
            parentLinkFolderId={linkFolder.id}
            linkFolders={linkFolders}
            currentFolderId={currentFolderId}
            depth={depth+1}
          />
        </li>
      ))}
    </ul>
  )
}

type LinkFoldersProps = {
  currentFolderId?: string;
};

export default async function LinkFolders({ currentFolderId }: LinkFoldersProps) {
  const session = await getServerSession(authOptions);
  const linkFolders = await prisma.linkFolder.findMany({
    where: { userId: session?.user.id }
  });

  return (
    <nav className={styles.linkFoldersNav}>
      <LinkFoldersList
        parentLinkFolderId={null}
        linkFolders={linkFolders}
        currentFolderId={currentFolderId}
      />
    </nav>
  )
}
