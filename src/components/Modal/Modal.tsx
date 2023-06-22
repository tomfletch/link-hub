import { ReactNode } from 'react';
import styles from './Modal.module.css';

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export default function Modal({ children, isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalContainer} onClick={() => onClose()}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}


type ModalHeaderProps = {
  children: React.ReactNode;
};

Modal.header = function ModalHeader({ children }: ModalHeaderProps) {
  return (
    <div className={styles.modalHeader}>
      {children}
    </div>
  );
};

type ModalBodyProps = {
  children: React.ReactNode;
};

Modal.body = function ModalBody({ children }: ModalBodyProps) {
  return (
    <div className={styles.modalBody}>
      {children}
    </div>
  );
};


type ModalFooterProps = {
  children: React.ReactNode;
};

Modal.footer = function ModalFooter({ children }: ModalFooterProps) {
  return (
    <div className={styles.modalFooter}>
      {children}
    </div>
  );
};
