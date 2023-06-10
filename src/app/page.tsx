import Link from 'next/link'
import styles from './page.module.css'
import Header from '@/components/Header/Header'
import LinkFolders from '@/components/LinkFolders/LinkFolders'

export default function Home() {
  return (
    <>
      <Header />
      <LinkFolders />
    </>
  )
}
