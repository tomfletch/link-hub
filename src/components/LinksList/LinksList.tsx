'use client';

import Image from 'next/image';
import { LinkFolder } from '@/types/linkFolder';
import fetcher from '@/utils';
import useSWR from 'swr';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { NewLinkForm } from '../NewLinkForm/NewLinkForm';
import styles from './LinksList.module.css';

type LinksListProps = {
  currentFolderId: string;
};

export default function LinksList({ currentFolderId }: LinksListProps) {
  const { data: linkFolder, isLoading, mutate } = useSWR<LinkFolder>(`/api/link-folders/${currentFolderId}`, fetcher, {});

  if (isLoading) return <LoadingSpinner />;
  if (!linkFolder) return <h1>Link Folder Not Found</h1>;

  return (
    <div>
      <header>
        <h1>{linkFolder.name}</h1>
      </header>
      <NewLinkForm linkFolderId={linkFolder.id} onAdd={() => mutate()} />
      <div className={styles.linksContainer}>
        {linkFolder.links.map((link) => (
          <div key={link.id} className={styles.link}>
            <div className={styles.faviconContainer}>
              <Image height="32" width="32" src={`http://www.google.com/s2/favicons?sz=32&domain=${link.url}`} alt="" />
            </div>
            <div className={styles.linkName}>{link.name}</div>
            <div className={styles.linkUrl}>{link.url}</div>
          </div>
        ))}
      </div>
    </div>
  );
}