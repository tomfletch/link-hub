'use client';

import { LinkFolder } from '@prisma/client';
import Link from 'next/link';
import styles from './LinkFolders.module.css';
import useSWR from 'swr';
import fetcher from '@/utils';

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

export default function LinkFolders({ currentFolderId }: LinkFoldersProps) {
  const { data: linkFolders } = useSWR<LinkFolder[]>('/api/users/me/link-folders', fetcher, {});

  return (
    <nav className={styles.linkFoldersNav}>
      {linkFolders && (
        <LinkFoldersList
          parentLinkFolderId={null}
          linkFolders={linkFolders}
          currentFolderId={currentFolderId}
        />
      )}
    </nav>
  )
}
