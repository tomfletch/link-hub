import Header from '@/components/Header/Header'
import LinkFolders from '@/components/LinkFolders/LinkFolders'

type LinkFolderPageProps = {
  params: {
    id: string;
  };
};

export default function LinkFolderPage({ params }: LinkFolderPageProps) {
  return (
    <>
      <Header />
      <LinkFolders currentFolderId={params.id} />
    </>
  )
}
