import Link from 'next/link';
import styles from './Header.module.css';
import { BiLink } from 'react-icons/bi';
import CurrentUser from '../CurrentUser/CurrentUser';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <BiLink size={22} />
        <span>Link</span>Hub
      </Link>
      <CurrentUser />
    </header>
  )
}
