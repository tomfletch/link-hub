import { FormEvent, useState } from 'react';
import { VscAdd } from 'react-icons/vsc';
import Button from '../Button/Button';
import styles from './NewLinkForm.module.css';
import TextInput from '../TextInput/TextInput';

type NewLinkFormProps = {
  linkFolderId: string;
  onAdd: () => void;
};

export function NewLinkForm({ linkFolderId, onAdd }: NewLinkFormProps) {
  const [url, setURL] = useState('');
  const [name, setName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const onAddLink = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await fetch(`/api/link-folders/${linkFolderId}/links`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, name })
    });
    setURL('');
    setName('');
    setIsSaving(false);
    onAdd();
  }

  return (
    <form className={styles.newLinkForm} onSubmit={onAddLink}>
      <div className={styles.field}>
        <TextInput
          label="URL"
          value={url}
          setValue={setURL}
          isDisabled={isSaving}
        />
      </div>
      <div className={styles.field}>
        <TextInput
          label="Name"
          value={name}
          setValue={setName}
          isDisabled={isSaving}
        />
      </div>
      <Button
        type="submit"
        kind="primary"
        disabled={!url || !name}
        isLoading={isSaving}
        loadingText="Saving..."
      >
        Add Link <VscAdd />
      </Button>
    </form>
  );
}