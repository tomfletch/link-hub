import { VscEdit, VscTrash } from 'react-icons/vsc';
import { HiDotsVertical } from 'react-icons/hi';
import Favicon from '../Favicon/Favicon';
import styles from './LinkItem.module.css';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

type LinkItemProps = {
  url: string;
  name: string;
}

export default function LinkItem({ url, name }: LinkItemProps) {
  return (
    <div className={styles.linkItem}>
      <div className={styles.faviconContainer}>
        <Favicon url={url} size={32} />
      </div>
      <div className={styles.name}>{name}</div>
      <div className={styles.url} title={url}>{url}</div>
      <div className={styles.contextContainer}>
        <DropdownMenu label={<HiDotsVertical />} iconOnly>
          <DropdownMenu.Item>
            <VscEdit /> Edit
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <VscTrash /> Delete
          </DropdownMenu.Item>
        </DropdownMenu>
      </div>
    </div>
  );
}