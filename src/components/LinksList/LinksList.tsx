'use client';

import { LinkFolder } from '@/types/linkFolder';
import fetcher from '@/utils';
import useSWR from 'swr';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { NewLinkForm } from '../NewLinkForm/NewLinkForm';
import styles from './LinksList.module.css';
import LinkItem from '../LinkItem/LinkItem';

type LinksListProps = {
  currentFolderId: string;
};

export default function LinksList({ currentFolderId }: LinksListProps) {
  const { data: linkFolder, isLoading, mutate } = useSWR<LinkFolder>(`/api/link-folders/${currentFolderId}`, fetcher, {});

  if (isLoading) return <LoadingSpinner />;
  if (!linkFolder) return <h1>Link Folder Not Found</h1>;

  const deleteLink = (deleteLinkId: string) => {
    console.log('Delete link: ', deleteLinkId);
    mutate(async () => {
      await fetch(`/api/links/${deleteLinkId}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
      });
      return undefined;
    }, {
      populateCache: false,
      optimisticData: { ...linkFolder, links: linkFolder.links.filter((link) => link.id !== deleteLinkId)}
    })
  }

  return (
    <div>
      <header>
        <h1>{linkFolder.name}</h1>
      </header>
      <NewLinkForm linkFolderId={linkFolder.id} onAdd={() => mutate()} />
      <div className={styles.linksContainer}>
        {linkFolder.links.map((link) => (
          <LinkItem key={link.id} {...link} onDeleteClick={() => deleteLink(link.id)} />
        ))}
      </div>
    </div>
  );
}