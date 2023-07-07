import { FormEvent, useState } from "react";
import { VscNewFolder, VscAdd } from "react-icons/vsc";
import { mutate } from "swr";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import TextInput from "@/components/TextInput/TextInput";

type CreateFolderModalProps = {
  parentId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateFolderModal({ parentId, isOpen, onClose }: CreateFolderModalProps) {
  const [newFolderName, setNewFolderName] = useState('');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

  const onCreateFolder = async (e: FormEvent) => {
    e.preventDefault();
    setIsCreatingFolder(true);
    await fetch(`/api/link-folders`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newFolderName, parentId })
    });
    mutate('/api/users/me/link-folders');
    mutate(`/api/link-folders/${parentId}`)
    onClose();
    setNewFolderName('');
    setIsCreatingFolder(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={onCreateFolder}>
        <Modal.header>
          <VscNewFolder /> Create a New Folder
        </Modal.header>
        <Modal.body>
          <TextInput
            label="Folder Name"
            value={newFolderName}
            setValue={setNewFolderName}
            isDisabled={isCreatingFolder}
          />
        </Modal.body>
        <Modal.footer>
          <Button type="submit">
            Create Folder <VscAdd />
          </Button>
        </Modal.footer>
      </form>
    </Modal>
  );
}