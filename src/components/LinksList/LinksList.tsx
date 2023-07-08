'use client';

import { useState } from 'react';
import { LinkFolder } from '@/types/linkFolder';
import fetcher from '@/utils';
import useSWR from 'swr';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { NewLinkForm } from '../NewLinkForm/NewLinkForm';
import styles from './LinksList.module.css';
import LinkItem from '../LinkItem/LinkItem';
import LinkFolderItem from '../LinkFolderItem/LinkFolderItem';
import { VscEdit, VscNewFolder, VscTrash } from 'react-icons/vsc';
import CreateFolderModal from '../modals/CreateFolderModal/CreateFolderModal';
import { HiDotsVertical } from 'react-icons/hi';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import DeleteConfirmationModal from '../modals/DeleteConfirmationModal/DeleteConfirmationModal';
import { useRouter } from 'next/navigation';

type LinksListProps = {
  currentFolderId: string;
};

export default function LinksList({ currentFolderId }: LinksListProps) {
  const router = useRouter();
  const { data: linkFolder, isLoading, mutate } = useSWR<LinkFolder>(`/api/link-folders/${currentFolderId}`, fetcher, {});
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (isLoading) return <LoadingSpinner />;
  if (!linkFolder) return <h1>Link Folder Not Found</h1>;

  const deleteLink = (deleteLinkId: string) => {
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
      <header className={styles.header}>
        <h1>{linkFolder.name}</h1>
        <div className={styles.linkFolderOptions}>
          <DropdownMenu label={<HiDotsVertical />} iconOnly>
            <DropdownMenu.Item>
              <VscEdit /> Edit
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => setIsNewFolderModalOpen(true)}>
              <VscNewFolder /> New Folder
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => setIsDeleteModalOpen(true)} danger>
              <VscTrash /> Delete
            </DropdownMenu.Item>
          </DropdownMenu>
          <CreateFolderModal
            parentId={linkFolder.id}
            isOpen={isNewFolderModalOpen}
            onClose={() => setIsNewFolderModalOpen(false)}
          />
          <DeleteConfirmationModal
            linkFolderId={linkFolder.id}
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={() => router.push(`/folders/${linkFolder.parentLinkFolderId}`)}
          />
        </div>
      </header>
      <NewLinkForm linkFolderId={linkFolder.id} onAdd={() => mutate()} />
      {linkFolder.childLinkFolders && linkFolder.childLinkFolders.length !== 0 && (
        <div className={styles.linksContainer}>
          {linkFolder.childLinkFolders?.map((linkFolder) => (
            <LinkFolderItem
              key={linkFolder.id}
              id={linkFolder.id}
              name={linkFolder.name}
            />
          ))}
        </div>
      )}
      <div className={styles.linksContainer}>
        {linkFolder.links.map((link) => (
          <LinkItem key={link.id} {...link} onDeleteClick={() => deleteLink(link.id)} />
        ))}
      </div>
    </div>
  );
}