import { FormEvent, useState } from 'react';
import { VscAdd } from 'react-icons/vsc';
import Button from '../Button/Button';
import styles from './NewLinkForm.module.css';

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
        <label htmlFor="url">
          <span>URL</span>
          <input
            id="url"
            type="text"
            value={url}
            onChange={(e) => setURL(e.target.value)}
            autoComplete="off"
            disabled={isSaving}
          />
        </label>
      </div>
      <div className={styles.field}>
        <label htmlFor="name">
          <span>Name</span>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
            disabled={isSaving}
          />
        </label>
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