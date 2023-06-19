import { VscFolder } from 'react-icons/vsc';
import styles from './LinkFolderItem.module.css';
import Link from 'next/link';

type LinkFolderItemProps = {
  id: string;
  name: string;
}

export default function LinkFolderItem({ id, name }: LinkFolderItemProps) {
  return (
    <Link href={`/folders/${id}`} className={styles.linkFolderItem}>
      <div className={styles.iconContainer}>
        <VscFolder size={32} />
      </div>
      <div className={styles.name}>{name}</div>
    </Link>
  );
}
