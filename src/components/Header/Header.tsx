import Link from 'next/link';
import styles from './Header.module.css';
import { VscLinkExternal } from 'react-icons/vsc';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <VscLinkExternal size={18} />
        <span>Link</span>Hub
      </Link>
    </header>
  )
}
