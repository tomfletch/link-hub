'use client';

import { LinkFolder } from '@/types/linkFolder';
import fetcher from '@/utils';
import useSWR from 'swr';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { NewLinkForm } from '../NewLinkForm/NewLinkForm';
import styles from './LinksList.module.css';
import LinkItem from '../LinkItem/LinkItem';
import LinkFolderItem from '../LinkFolderItem/LinkFolderItem';
import Button from '../Button/Button';
import { VscAdd, VscNewFolder } from 'react-icons/vsc';
import Modal from '../Modal/Modal';
import { useState } from 'react';
import TextInput from '../TextInput/TextInput';

type LinksListProps = {
  currentFolderId: string;
};

export default function LinksList({ currentFolderId }: LinksListProps) {
  const { data: linkFolder, isLoading, mutate } = useSWR<LinkFolder>(`/api/link-folders/${currentFolderId}`, fetcher, {});
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

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
      <header className={styles.header}>
        <h1>{linkFolder.name}</h1>
        <div className={styles.linkFolderOptions}>
          <Button kind="secondary" onClick={() => setIsNewFolderModalOpen(true)}>
            New Folder <VscNewFolder />
          </Button>
          <Modal isOpen={isNewFolderModalOpen} onClose={() => setIsNewFolderModalOpen(false)}>
            <Modal.header>
              <VscNewFolder /> Create a New Folder
            </Modal.header>
            <Modal.body>
              <TextInput
                label="Folder Name"
                value={newFolderName}
                setValue={setNewFolderName}
                isDisabled={isCreatingFolder}
              />
            </Modal.body>
            <Modal.footer>
              <Button>Create Folder <VscAdd /></Button>
            </Modal.footer>
          </Modal>
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