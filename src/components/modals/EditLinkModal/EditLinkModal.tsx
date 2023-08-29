import { FormEvent, useState } from "react";
import { VscNewFolder, VscAdd, VscEdit } from "react-icons/vsc";
import { mutate } from "swr";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import TextInput from "@/components/TextInput/TextInput";

type EditLinkModalProps = {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditLinkModal({ isOpen, onClose }: EditLinkModalProps) {
  const [newURL, setNewURL] = useState('');
  const [newName, setNewName] = useState('');
  const [isEditingLink, setIsEditingLink] = useState(false);

  const onCreateFolder = async (e: FormEvent) => {
    e.preventDefault();
    setIsEditingLink(true);
    // await fetch(`/api/link-folders`, {
    //   method: 'POST',
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ name: newURL, parentId })
    // });
    // mutate('/api/users/me/link-folders');
    // mutate(`/api/link-folders/${parentId}`)
    // onClose();
    // setNewURL('');
    setIsEditingLink(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={onCreateFolder}>
        <Modal.Header>
          <VscEdit /> Edit Link
        </Modal.Header>
        <Modal.Body>
          <TextInput
            label="URL"
            value={newURL}
            setValue={setNewURL}
            isDisabled={isEditingLink}
          />
          <TextInput
            label="Name"
            value={newName}
            setValue={setNewName}
            isDisabled={isEditingLink}
            autoFocus
          />
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" isLoading={isEditingLink} loadingText="Creating Folder...">
            Edit Link <VscEdit />
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}