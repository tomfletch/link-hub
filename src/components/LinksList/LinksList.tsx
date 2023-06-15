'use client';

import { LinkFolder } from '@/types/linkFolder';
import fetcher from '@/utils';
import useSWR from 'swr';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { NewLinkForm } from '../NewLinkForm/NewLinkForm';
import styles from './LinksList.module.css';
import Favicon from '../Favicon/Favicon';

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
              <Favicon url={link.url} size={32} />
            </div>
            <div className={styles.linkName}>{link.name}</div>
            <div className={styles.linkUrl}>{link.url}</div>
          </div>
        ))}
      </div>
    </div>
  );
}