import { VscEdit, VscTrash } from 'react-icons/vsc';
import { HiDotsVertical } from 'react-icons/hi';
import Favicon from '../Favicon/Favicon';
import styles from './LinkItem.module.css';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import Link from 'next/link';
import EditLinkModal from '../modals/EditLinkModal/EditLinkModal';
import { useState } from 'react';

type LinkItemProps = {
  url: string;
  name: string;
  onDeleteClick: () => void;
}

export default function LinkItem({ url, name, onDeleteClick }: LinkItemProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <Link href={url} target="_blank" className={styles.linkItem}>
        <div className={styles.faviconContainer}>
          <Favicon url={url} size={32} />
        </div>
        <div className={styles.name}>{name}</div>
        <div className={styles.url} title={url}>{url}</div>
        <div className={styles.contextContainer}>
          <DropdownMenu label={<HiDotsVertical />} iconOnly>
            <DropdownMenu.Item onClick={() => setIsEditModalOpen(true)}>
              <VscEdit /> Edit
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => onDeleteClick()} danger>
              <VscTrash /> Delete
            </DropdownMenu.Item>
          </DropdownMenu>
        </div>
      </Link>
      <EditLinkModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  );
}