import Header from '@/components/Header/Header'
import LinkFolders from '@/components/LinkFolders/LinkFolders'
import styles from './page.module.css';
import LinksList from '@/components/LinksList/LinksList';

type LinkFolderPageProps = {
  params: {
    id: string;
  };
};

export default function LinkFolderPage({ params }: LinkFolderPageProps) {
  return (
    <>
      <Header />
      <main className={styles.mainContainer}>
        <LinkFolders currentFolderId={params.id} />
        <LinksList currentFolderId={params.id} />
      </main>
    </>
  )
}
