import Favicon from '../Favicon/Favicon';
import styles from './LinkItem.module.css';

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
    </div>
  );
}