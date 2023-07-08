import { VscTrash, VscClose } from "react-icons/vsc";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import { FormEvent, useState } from "react";
import { mutate } from "swr";

type DeleteConfirmationModalProps = {
  linkFolderId: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteConfirmationModal({ linkFolderId, isOpen, onClose, onDelete }: DeleteConfirmationModalProps) {
  const [isDeletingFolder, setIsDeletingFolder] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsDeletingFolder(true);
    await fetch(`/api/link-folders/${linkFolderId}`, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" }
    });
    mutate('/api/users/me/link-folders');
    onClose();
    onDelete();
    setIsDeletingFolder(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={onSubmit}>
        <Modal.Header>
          <VscTrash /> Delete Folder
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this folder?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" onClick={onClose}>
            Cancel <VscClose />
          </Button>
          <Button type="submit" kind="danger" isLoading={isDeletingFolder} loadingText="Deleting...">
            Delete <VscTrash />
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}